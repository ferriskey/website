import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { createRequire } from 'node:module'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import test from 'node:test'
import vm from 'node:vm'
import ts from 'typescript'
import { normalizeLocale, getClientLocale } from '../../../packages/ui/src/lib/locale.ts'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
function loadModule(file, globals = {}) {
  const source = readFileSync(file, 'utf8')
  const { outputText } = ts.transpileModule(source, {
    compilerOptions: { module: ts.ModuleKind.CommonJS },
  })
  const exports = {}
  const require = (id) =>
    id.startsWith('.')
      ? loadModule(resolve(dirname(file), `${id}.ts`), globals)
      : createRequire(import.meta.url)(id)
  vm.runInNewContext(outputText, { exports, require, ...globals }, { filename: file })
  return exports
}

test('Chinese browser locales map to the appropriate script', () => {
  for (const language of ['zh', 'zh-CN', 'zh-SG', 'zh-Hans', 'ZH-hans-CN', 'zh-Hans-HK']) {
    assert.equal(normalizeLocale(language), 'zh-CN')
  }
  for (const language of ['zh-TW', 'zh-HK', 'zh-MO', 'zh-Hant', 'zh-Hant-HK']) {
    assert.equal(normalizeLocale(language), 'zh-TW')
  }
  assert.equal(normalizeLocale('fr-CA'), 'fr')
  assert.equal(normalizeLocale('de-DE'), undefined)
})

test('saved choice wins and unsupported browser languages fall through', () => {
  const originalDocument = globalThis.document
  const originalNavigator = Object.getOwnPropertyDescriptor(globalThis, 'navigator')
  try {
    globalThis.document = { cookie: 'locale=zh-TW' }
    Object.defineProperty(globalThis, 'navigator', {
      configurable: true,
      value: { languages: ['de-DE', 'zh-CN'], language: 'de-DE' },
    })
    assert.equal(getClientLocale(), 'zh-TW')
    globalThis.document.cookie = 'locale=unsupported'
    assert.equal(getClientLocale(), 'zh-CN')
    navigator.languages = ['de-DE']
    assert.equal(getClientLocale(), 'en')
  } finally {
    globalThis.document = originalDocument
    if (originalNavigator) Object.defineProperty(globalThis, 'navigator', originalNavigator)
    else delete globalThis.navigator
  }
})

test('both Chinese dictionaries cover every English UI key', () => {
  for (const file of [resolve(root, 'src/i18n/ui.ts'), resolve(root, '../blog/src/i18n/ui.ts')]) {
    const { ui } = loadModule(file)
    for (const locale of ['zh-CN', 'zh-TW']) {
      assert.deepEqual(Object.keys(ui[locale]).sort(), Object.keys(ui.en).sort())
      for (const text of Object.values(ui[locale])) assert.ok(text.length > 0)
    }
  }
})

test('live switching restores English and leaves unknown keys intact', () => {
  const elements = [
    { dataset: { t: 'nav.getStarted' }, textContent: 'Get Started' },
    { dataset: { t: 'unknown' }, textContent: 'Original' },
  ]
  const anchors = [
    { href: 'https://docs.example.com/en/discover/getting-started#authenticate' },
    { href: 'https://blog.example.com/en/article' },
  ]
  const listeners = {}
  let locale = 'zh-CN'
  const { ui } = loadModule(resolve(root, 'src/i18n/ui.ts'))
  const source = readFileSync(resolve(root, 'src/i18n/client.ts'), 'utf8').replace(
    /^import .*$/gm,
    '',
  )
  const document = {
    documentElement: { lang: 'en' },
    querySelectorAll: (selector) =>
      selector === '[data-t]' ? elements : selector === 'a[href]' ? anchors : [],
    addEventListener: (event, fn) => {
      listeners[event] = fn
    },
  }
  const window = {
    location: { origin: 'https://example.com' },
    addEventListener: (event, fn) => {
      listeners[event] = fn
    },
  }
  vm.runInNewContext(ts.transpileModule(source, {}).outputText, {
    document,
    window,
    URL,
    ui,
    getClientLocale: () => locale,
  })
  assert.equal(elements[0].textContent, '开始使用')
  assert.equal(document.documentElement.lang, 'zh-CN')
  assert.equal(
    anchors[0].href,
    'https://docs.example.com/zh-CN/discover/getting-started#authenticate',
  )
  assert.equal(anchors[1].href, 'https://blog.example.com/en/article')
  locale = 'zh-TW'
  listeners['ferriskey:locale-change']()
  assert.equal(elements[0].textContent, '開始使用')
  locale = 'en'
  listeners['astro:after-swap']()
  assert.equal(elements[0].textContent, 'Get Started')
  assert.equal(anchors[0].href, 'https://docs.example.com/en/discover/getting-started#authenticate')
  assert.equal(elements[1].textContent, 'Original')
})
