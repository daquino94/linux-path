#!/usr/bin/env node
import * as fs from 'fs'
import * as path from 'path'

const SUPPORTED_LANGUAGES = [
  'en',
  'it',
  'es',
  'fr',
  'de',
  'pt',
  'ru',
  'ja',
  'ko',
  'zh',
  'ar',
  'hi',
  'nl',
  'sv',
  'no',
  'da',
  'fi',
  'pl',
  'cs',
  'sk',
  'hu',
  'ro',
  'bg',
  'hr',
  'sl',
  'et',
  'lv',
  'lt',
  'el',
  'tr',
  'he',
  'th',
  'vi',
  'id',
  'ms',
  'tl',
  'uk',
  'be',
  'ka',
  'am',
  'sw',
  'zu',
  'af',
  'sq',
  'eu',
  'ca',
  'gl',
  'is',
  'ga',
  'mt',
  'cy',
  'br',
  'fo',
  'kl',
  'se',
  'fi',
  'et',
  'lv',
  'lt',
]

const ROUTING_FILE_PATH = path.join(process.cwd(), 'src/i18n/routing.ts')

function showUsage() {
  console.log('\n📝 Usage: node scripts/addNewLanguage.js <language_code>')
  console.log('\n📋 Examples:')
  console.log('  node scripts/addNewLanguage.js es')
  console.log('\n🌍 Supported languages:', SUPPORTED_LANGUAGES.join(', '))
}

function validateLanguage(langCode) {
  if (!langCode) {
    console.error('❌ Error: You must specify a language code')
    showUsage()
    return false
  }

  if (!SUPPORTED_LANGUAGES.includes(langCode.toLowerCase())) {
    console.error(`❌ Error: "${langCode}" is not a valid language code`)
    console.log('\n🌍 Supported languages:', SUPPORTED_LANGUAGES.join(', '))
    return false
  }

  return true
}

function readRoutingFile() {
  try {
    if (!fs.existsSync(ROUTING_FILE_PATH)) {
      console.error(`❌ Error: File not found: ${ROUTING_FILE_PATH}`)
      return null
    }

    return fs.readFileSync(ROUTING_FILE_PATH, 'utf8')
  } catch (error) {
    console.error('❌ Error reading file:', error.message)
    return null
  }
}

function parseCurrentLanguages(content) {
  try {
    // Extract the Lang type using regex
    const langTypeMatch = content.match(/export type Lang = ([^;\n]+);?/)
    if (!langTypeMatch) {
      throw new Error('Lang type not found in file')
    }

    const langTypes = langTypeMatch[1]
      .split('|')
      .map((lang) => lang.trim().replace(/'/g, ''))

    const localesMatch = content.match(/export const locales = \[([^\]]+)\];?/)
    if (!localesMatch) {
      throw new Error('Locales array not found in file')
    }

    const localesArray = localesMatch[1]
      .split(',')
      .map((lang) => lang.trim().replace(/'/g, ''))
      .filter((lang) => lang.length > 0)

    return { langTypes, localesArray }
  } catch (error) {
    console.error('❌ Error parsing file:', error.message)
    return null
  }
}

function updateRoutingFile(content, newLang, currentData) {
  try {
    // Update the Lang type
    const newLangTypes = [
      ...new Set([...currentData.langTypes, newLang]),
    ].sort()
    const newLangTypeString = newLangTypes
      .map((lang) => `'${lang}'`)
      .join(' | ')

    content = content.replace(
      /export type Lang = [^;\n]+;?/,
      `export type Lang = ${newLangTypeString}`,
    )

    // Update the locales array
    const newLocalesArray = [
      ...new Set([...currentData.localesArray, newLang]),
    ].sort()
    const newLocalesString = newLocalesArray
      .map((lang) => `'${lang}'`)
      .join(', ')

    content = content.replace(
      /export const locales = \[[^\]]+\];?/,
      `export const locales = [${newLocalesString}]`,
    )

    return content
  } catch (error) {
    console.error('❌ Error updating content:', error.message)
    return null
  }
}

function writeRoutingFile(content) {
  try {
    fs.writeFileSync(ROUTING_FILE_PATH, content, 'utf8')
    return true
  } catch (error) {
    console.error('❌ Error writing file:', error.message)
    return false
  }
}

function main() {
  console.log('🌍 Script to add new language to routing\n')
  const newLang = process.argv[2]?.toLowerCase()

  // Validate language code
  if (!validateLanguage(newLang)) {
    process.exit(1)
  }

  const content = readRoutingFile()
  if (!content) {
    process.exit(1)
  }

  // Parse existing languages
  const currentData = parseCurrentLanguages(content)
  if (!currentData) {
    process.exit(1)
  }

  // Check if language already exists
  if (currentData.langTypes.includes(newLang)) {
    console.log(`⚠️  Language "${newLang}" is already present in the file`)
    console.log(
      '📋 Currently supported languages:',
      currentData.langTypes.join(', '),
    )
    process.exit(0)
  }

  const updatedContent = updateRoutingFile(content, newLang, currentData)
  if (!updatedContent) {
    process.exit(1)
  }

  if (!writeRoutingFile(updatedContent)) {
    process.exit(1)
  }

  console.log(`✅ Language "${newLang}" added successfully!`)
  console.log(
    '📋 Languages now supported:',
    [...new Set([...currentData.langTypes, newLang])].sort().join(', '),
  )
}

main()
