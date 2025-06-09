import { defineRouting } from 'next-intl/routing'

/* 
  -------------------PLEASE DONT EDIT THIS FILE------------------------
  it will be edited when you run `npm run addNewLangToSite <LANG_CODE>`
  -------------------------------<3------------------------------------
*/
export interface Locales {
  lang: Lang
}

export type Lang = 'de' | 'en' | 'es' | 'fr' | 'hi' | 'ja' | 'pt' | 'ru' | 'zh'
export const locales = ['de', 'en', 'es', 'fr', 'hi', 'ja', 'pt', 'ru', 'zh']

export const localesObject = locales.map((e) => ({ lang: e }))

export const routing = defineRouting({
  // A list of all locales that are supported
  locales: locales,

  // Used when no locale matches
  defaultLocale: 'en',
})
