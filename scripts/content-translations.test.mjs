import assert from 'node:assert/strict'
import { readFileSync, readdirSync, existsSync } from 'node:fs'
import { resolve, dirname, join } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { createRequire } from 'node:module'
import test from 'node:test'
import vm from 'node:vm'
import ts from 'typescript'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const locales = ['zh-CN', 'zh-TW']
function files(directory) {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) =>
    entry.isDirectory() ? files(join(directory, entry.name)) : [join(directory, entry.name)],
  )
}
function source(file) {
  return readFileSync(file, 'utf8')
}
function codeBlocks(text) {
  return [...text.matchAll(/^```[^\n]*\n[\s\S]*?^```/gm)].map((m) => m[0])
}
function frontmatter(text) {
  return /^---\n([\s\S]*?)\n---/
    .exec(text)?.[1]
    .split('\n')
    .filter((line) => !/^(title|description|short_description|permalink):/.test(line))
    .join('\n')
}
function loadModule(file) {
  const exports = {}
  const require = (id) => loadModule(resolve(dirname(file), `${id}.ts`))
  const { outputText } = ts.transpileModule(source(file), {
    compilerOptions: { module: ts.ModuleKind.CommonJS },
  })
  vm.runInNewContext(outputText, { exports, require }, { filename: file })
  return exports
}

for (const [name, directory] of [
  ['documentation', 'apps/docs/src/content/docs'],
  ['articles', 'apps/blog/src/content/posts'],
]) {
  const english = files(resolve(root, directory)).filter(
    (file) => file.includes('/en/') && file.endsWith('.mdx'),
  )
  test(`every English ${name} page has complete Chinese counterparts with unchanged examples`, () => {
    assert.ok(english.length > 0)
    for (const file of english) {
      const original = source(file)
      for (const locale of locales) {
        const translatedFile = file.replace('/en/', `/${locale}/`)
        assert.ok(existsSync(translatedFile), translatedFile)
        const translated = source(translatedFile)
        const permalink = /^permalink: (.+)$/m.exec(original)?.[1]
        if (permalink)
          assert.ok(translated.includes('permalink: ' + permalink.replace('/en/', `/${locale}/`)))
        assert.equal(
          frontmatter(translated),
          frontmatter(original),
          `non-translatable metadata: ${translatedFile}`,
        )
        assert.deepEqual(
          codeBlocks(translated),
          codeBlocks(original),
          `code examples: ${translatedFile}`,
        )
        const prose = translated.replace(/^```[^\n]*\n[\s\S]*?^```/gm, '')
        const originalProse = original.replace(/^```[^\n]*\n[\s\S]*?^```/gm, '')
        const identifiers = [...originalProse.matchAll(/(?<!`)`([^`\n]+)`(?!`)/g)].map((m) => m[1])
        for (const identifier of identifiers) {
          assert.ok(
            prose.includes('`' + identifier + '`'),
            `inline identifier ${identifier}: ${translatedFile}`,
          )
        }

        assert.ok(
          (prose.match(/\p{Script=Han}/gu)?.length ?? 0) > 30,
          `missing Chinese prose: ${translatedFile}`,
        )
        assert.equal(
          (translated.match(/^#{1,6} /gm) ?? []).length,
          (original.match(/^#{1,6} /gm) ?? []).length,
          `section count: ${translatedFile}`,
        )
        assert.ok(!/(?:X\d{4}X|ZXQ|QXZ)/.test(prose), `unresolved placeholder: ${translatedFile}`)
      }
    }
  })
}

test('every documentation category has translated metadata and preserves navigation settings', () => {
  const english = files(resolve(root, 'apps/docs/src/content/docs')).filter(
    (file) => file.includes('/en/') && file.endsWith('_meta.json'),
  )
  for (const file of english) {
    const original = JSON.parse(source(file))
    for (const locale of locales) {
      const translated = JSON.parse(source(file.replace('/en/', `/${locale}/`)))
      const { title, ...settings } = translated
      const { title: originalTitle, ...originalSettings } = original
      assert.ok(title)
      assert.deepEqual(settings, originalSettings)
    }
  }
})

test('both Chinese release dictionaries cover every release and highlight', () => {
  const { releaseNotes, releaseNoteTranslations } = loadModule(
    resolve(root, 'apps/website/src/lib/release-notes.ts'),
  )
  for (const locale of locales) {
    assert.equal(Object.keys(releaseNoteTranslations[locale]).length, releaseNotes.length)
    for (const release of releaseNotes) {
      const translated = releaseNoteTranslations[locale][release.version]
      assert.ok(translated, `${locale}/${release.version}`)
      assert.ok(/\p{Script=Han}/u.test(translated.title))
      assert.ok(/\p{Script=Han}/u.test(translated.summary))
      assert.equal(translated.highlights.length, release.highlights.length)
      for (const highlight of translated.highlights) assert.ok(/\p{Script=Han}/u.test(highlight))
      assert.equal(Boolean(translated.transition), Boolean(release.transition))
    }
  }
})

test('reading time accounts for Chinese prose and mixed-language articles', () => {
  const { getReadingTime } = loadModule(resolve(root, 'apps/blog/src/lib/posts.ts'))
  assert.equal(getReadingTime('身份认证'.repeat(200)), 2)
  assert.equal(getReadingTime('word '.repeat(200) + '身份认证'.repeat(100)), 2)
})

test('Chinese documentation preserves parsed inline code and links', async () => {
  const docsRequire = createRequire(resolve(root, 'apps/docs/package.json'))
  const mdxRequire = createRequire(docsRequire.resolve('@astrojs/mdx'))
  const { createProcessor } = await import(pathToFileURL(mdxRequire.resolve('@mdx-js/mdx')))
  const { default: gfm } = await import(pathToFileURL(mdxRequire.resolve('remark-gfm')))
  const { default: directive } = await import(
    pathToFileURL(docsRequire.resolve('remark-directive'))
  )
  const parser = createProcessor({ format: 'mdx', remarkPlugins: [gfm, directive] })
  function inspect(text) {
    const codes = new Set()
    const links = new Set()
    function walk(node) {
      if (node.type === 'inlineCode') codes.add(node.value)
      if (node.type === 'link') links.add(node.url)
      if (node.attributes?.href) links.add(node.attributes.href)
      for (const child of node.children ?? []) walk(child)
    }
    walk(parser.parse(text.replace(/^---\n[\s\S]*?\n---\n/, '')))
    return { codes, links }
  }
  const english = files(resolve(root, 'apps/docs/src/content/docs')).filter(
    (file) => file.includes('/en/') && file.endsWith('.mdx'),
  )
  for (const file of english) {
    const original = inspect(source(file))
    for (const locale of locales) {
      const translatedFile = file.replace('/en/', `/${locale}/`)
      const translated = inspect(source(translatedFile))
      for (const code of original.codes)
        assert.ok(translated.codes.has(code), `inline code ${code}: ${translatedFile}`)
      for (const link of original.links)
        assert.ok(
          translated.links.has(link.replace(/^\/en\//, `/${locale}/`)),
          `link ${link}: ${translatedFile}`,
        )
    }
  }
})
