import { ui, defaultLang, type UiKey } from './ui'

export function useTranslations(locale: string) {
  return function t(key: UiKey): string {
    return ui[locale as keyof typeof ui]?.[key] ?? ui[defaultLang][key]
  }
}
