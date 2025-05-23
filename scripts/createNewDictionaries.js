#!/usr/bin/env node
import * as fs from 'fs'
import * as path from 'path'

const SUPPORTED_LANGUAGES = [
  'aa',
  'ab',
  'ae',
  'af',
  'ak',
  'am',
  'an',
  'ar',
  'as',
  'av',
  'ay',
  'az',
  'ba',
  'be',
  'bg',
  'bh',
  'bi',
  'bm',
  'bn',
  'bo',
  'br',
  'bs',
  'ca',
  'ce',
  'ch',
  'co',
  'cr',
  'cs',
  'cu',
  'cv',
  'cy',
  'da',
  'de',
  'dv',
  'dz',
  'ee',
  'el',
  'en',
  'eo',
  'es',
  'et',
  'eu',
  'fa',
  'ff',
  'fi',
  'fj',
  'fo',
  'fr',
  'fy',
  'ga',
  'gd',
  'gl',
  'gn',
  'gu',
  'gv',
  'ha',
  'he',
  'hi',
  'ho',
  'hr',
  'ht',
  'hu',
  'hy',
  'hz',
  'ia',
  'id',
  'ie',
  'ig',
  'ii',
  'ik',
  'io',
  'is',
  'it',
  'iu',
  'ja',
  'jv',
  'ka',
  'kg',
  'ki',
  'kj',
  'kk',
  'kl',
  'km',
  'kn',
  'ko',
  'kr',
  'ks',
  'ku',
  'kv',
  'kw',
  'ky',
  'la',
  'lb',
  'lg',
  'li',
  'ln',
  'lo',
  'lt',
  'lu',
  'lv',
  'mg',
  'mh',
  'mi',
  'mk',
  'ml',
  'mn',
  'mr',
  'ms',
  'mt',
  'my',
  'na',
  'nb',
  'nd',
  'ne',
  'ng',
  'nl',
  'nn',
  'no',
  'nr',
  'nv',
  'ny',
  'oc',
  'oj',
  'om',
  'or',
  'os',
  'pa',
  'pi',
  'pl',
  'ps',
  'pt',
  'qu',
  'rm',
  'rn',
  'ro',
  'ru',
  'rw',
  'sa',
  'sc',
  'sd',
  'se',
  'sg',
  'si',
  'sk',
  'sl',
  'sm',
  'sn',
  'so',
  'sq',
  'sr',
  'ss',
  'st',
  'su',
  'sv',
  'sw',
  'ta',
  'te',
  'tg',
  'th',
  'ti',
  'tk',
  'tl',
  'tn',
  'to',
  'tr',
  'ts',
  'tt',
  'tw',
  'ty',
  'ug',
  'uk',
  'ur',
  'uz',
  've',
  'vi',
  'vo',
  'wa',
  'wo',
  'xh',
  'yi',
  'yo',
  'za',
  'zh',
  'zu',
]

const DICTIONARIES_PATH = './dictionaries'
const MASTER_LANGUAGE = 'en'

async function createNewDictionary() {
  try {
    const languageCode = process.argv[2]

    if (!languageCode) {
      console.error('❌ Error: Please specify a language code')
      console.log('💡 Usage: npm run createNewDictionary <language_code>')
      console.log('💡 Example: npm run createNewDictionary it')
      process.exit(1)
    }

    const normalizedLangCode = languageCode.toLowerCase()

    console.log(`🔍 Checking language code: ${normalizedLangCode}`)

    if (!SUPPORTED_LANGUAGES.includes(normalizedLangCode)) {
      console.error(
        `❌ Error: '${normalizedLangCode}' is not a valid language code`,
      )
      console.log(
        '💡 Supported language codes include: it, en, es, fr, de, pt, ru, ja, zh, ar, etc.',
      )
      process.exit(1)
    }

    console.log(`✅ Valid language code: ${normalizedLangCode}`)

    const targetPath = path.join(DICTIONARIES_PATH, normalizedLangCode)
    const masterPath = path.join(DICTIONARIES_PATH, MASTER_LANGUAGE)

    // Check if the target folder already exists
    try {
      await fs.promises.access(targetPath)
      console.error(
        `❌ Error: The folder for language '${normalizedLangCode}' already exists at ${targetPath}`,
      )
      process.exit(1)
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      console.log(`✅ The folder for '${normalizedLangCode}' doesn't exist yet`)
    }

    try {
      await fs.promises.access(masterPath)
      console.log(`✅ Master folder found: ${masterPath}`)
    } catch (error) {
      console.error(
        `❌ Error: Master folder '${MASTER_LANGUAGE}' not found at ${masterPath}`,
        error,
      )
      process.exit(1)
    }

    console.log(
      `📂 Copying master folder from ${masterPath} to ${targetPath}...`,
    )
    await copyDirectory(masterPath, targetPath)

    console.log(
      `🎉 Success! Dictionary for '${normalizedLangCode}' created at ${targetPath}`,
    )
    console.log(
      `💡 You can now edit the translation files in the ${targetPath} folder`,
    )
  } catch (error) {
    console.error('❌ Error while creating dictionary:', error.message)
    process.exit(1)
  }
}

async function copyDirectory(src, dest) {
  try {
    await fs.promises.mkdir(dest, { recursive: true })

    const entries = await fs.promises.readdir(src, { withFileTypes: true })

    for (const entry of entries) {
      const srcPath = path.join(src, entry.name)
      const destPath = path.join(dest, entry.name)

      if (entry.isDirectory()) {
        await copyDirectory(srcPath, destPath)
      } else {
        await fs.promises.copyFile(srcPath, destPath)
        console.log(`  📄 Copied: ${entry.name}`)
      }
    }
  } catch (error) {
    throw new Error(
      `Error while copying from ${src} to ${dest}: ${error.message}`,
    )
  }
}

createNewDictionary()
