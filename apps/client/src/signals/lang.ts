import { signal } from '@preact/signals-react'

export type Lang = 'he' | 'en'

function initLang(): Lang {
  const stored = localStorage.getItem('cl_lang') as Lang | null
  return stored ?? 'he'
}

export const langSignal = signal<Lang>(initLang())

export function setLang(lang: Lang) {
  langSignal.value = lang
  localStorage.setItem('cl_lang', lang)
  document.documentElement.lang = lang
  document.documentElement.dir = lang === 'he' ? 'rtl' : 'ltr'
}
