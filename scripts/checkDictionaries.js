#!/usr/bin/env node
import * as fs from 'fs'
import * as path from 'path'
import * as readline from 'readline'

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

async function main() {
  const folderPath = 'src/messages'

  try {
    if (!fs.existsSync(folderPath)) {
      console.error(`The directory "${folderPath}" does not exist!`)
      rl.close()
      return
    }

    const masterFilePath = path.join(folderPath, 'en.json')
    if (!fs.existsSync(masterFilePath)) {
      console.error(
        'Master file "en.json" not found in the specified directory!',
      )
      rl.close()
      return
    }

    const masterContent = fs.readFileSync(masterFilePath, 'utf8')
    const masterJson = JSON.parse(masterContent)
    const masterKeys = extractKeys(masterJson)

    console.log(`\nMaster file loaded: ${masterFilePath}`)
    console.log(`Number of keys in master file: ${masterKeys.length}`)

    const files = fs
      .readdirSync(folderPath)
      .filter((file) => file.endsWith('.json') && file !== 'en.json')
      .map((file) => path.join(folderPath, file))

    if (files.length === 0) {
      console.log('No other translation files found besides en.json')
      rl.close()
      return
    }

    console.log(`\nFound ${files.length} translation files to check`)

    for (const file of files) {
      const fileName = path.basename(file)
      console.log(`\nAnalyzing file: ${fileName}`)

      const fileContent = fs.readFileSync(file, 'utf8')
      const fileJson = JSON.parse(fileContent)
      const fileKeys = extractKeys(fileJson)

      const missingKeys = findMissingKeys(masterKeys, fileKeys)
      const obsoleteKeys = findMissingKeys(fileKeys, masterKeys)

      let updatedJson = JSON.parse(JSON.stringify(fileJson))
      let needsUpdate = false

      if (missingKeys.length > 0) {
        console.log(
          `❌ Found ${missingKeys.length} missing keys in ${fileName}:`,
        )
        missingKeys.forEach((key) => {
          const value = getValueByKeyPath(masterJson, key)
          console.log(`   - ${key}: "${value}"`)
        })

        const answer = await askQuestion(
          `\nDo you want to add the ${missingKeys.length} missing keys to ${fileName}? (y/n): `,
        )

        if (answer.toLowerCase() === 'y') {
          for (const key of missingKeys) {
            const value = getValueByKeyPath(masterJson, key)
            setValueByKeyPath(updatedJson, key, value)
          }
          needsUpdate = true
          console.log(
            `✅ Added ${missingKeys.length} missing keys to ${fileName}`,
          )
        } else {
          console.log(`⏩ No missing keys added to ${fileName}`)
        }
      } else {
        console.log(`✅ No missing keys in ${fileName}`)
      }

      if (obsoleteKeys.length > 0) {
        console.log(
          `\n⚠️ Found ${obsoleteKeys.length} obsolete keys in ${fileName} (not in master file):`,
        )
        obsoleteKeys.forEach((key) => {
          const value = getValueByKeyPath(fileJson, key)
          console.log(`   - ${key}: "${value}"`)
        })

        const answer = await askQuestion(
          `\nDo you want to remove the ${obsoleteKeys.length} obsolete keys from ${fileName}? (y/n): `,
        )

        if (answer.toLowerCase() === 'y') {
          for (const key of obsoleteKeys) {
            removeKeyByPath(updatedJson, key)
          }
          needsUpdate = true
          console.log(
            `✅ Removed ${obsoleteKeys.length} obsolete keys from ${fileName}`,
          )
        } else {
          console.log(`⏩ No obsolete keys removed from ${fileName}`)
        }
      } else {
        console.log(`✅ No obsolete keys in ${fileName}`)
      }

      if (needsUpdate) {
        fs.writeFileSync(file, JSON.stringify(updatedJson, null, 2), 'utf8')
        console.log(`✅ File ${fileName} successfully updated!`)
      } else {
        console.log(`⏩ No changes made to ${fileName}`)
      }
    }

    console.log('\nOperation completed successfully!')
  } catch (error) {
    console.error(
      'An error occurred:',
      error instanceof Error ? error.message : String(error),
    )
  } finally {
    rl.close()
  }
}

function askQuestion(question) {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer)
    })
  })
}

function extractKeys(obj, prefix = '') {
  let keys = []

  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const newKey = prefix ? `${prefix}.${key}` : key

      if (
        typeof obj[key] === 'object' &&
        obj[key] !== null &&
        !Array.isArray(obj[key])
      ) {
        keys = keys.concat(extractKeys(obj[key], newKey))
      } else {
        keys.push(newKey)
      }
    }
  }

  return keys
}

function findMissingKeys(sourceKeys, targetKeys) {
  return sourceKeys.filter((key) => !targetKeys.includes(key))
}

function getValueByKeyPath(obj, path) {
  const parts = path.split('.')
  let current = obj

  for (const part of parts) {
    if (current[part] === undefined) {
      return undefined
    }
    current = current[part]
  }

  return current
}

function setValueByKeyPath(obj, path, value) {
  const parts = path.split('.')
  let current = obj

  for (let i = 0; i < parts.length - 1; i++) {
    const part = parts[i]
    if (current[part] === undefined) {
      current[part] = {}
    }
    current = current[part]
  }

  current[parts[parts.length - 1]] = value
}

function removeKeyByPath(obj, path) {
  const parts = path.split('.')
  const lastPart = parts.pop()
  let current = obj

  for (const part of parts) {
    if (current[part] === undefined || typeof current[part] !== 'object') {
      return
    }
    current = current[part]
  }

  if (
    lastPart !== undefined &&
    Object.prototype.hasOwnProperty.call(current, lastPart)
  ) {
    delete current[lastPart]
  }

  if (parts.length > 0 && Object.keys(current).length === 0) {
    removeKeyByPath(obj, parts.join('.'))
  }
}

main()
