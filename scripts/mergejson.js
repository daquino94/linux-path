#!/usr/bin/env node
import * as fs from 'fs'
import * as path from 'path'

function sortJsonRecursively(obj) {
  if (obj === null || obj === undefined) {
    return obj
  }

  if (Array.isArray(obj)) {
    const sortedElements = obj.map((item) => sortJsonRecursively(item))

    // Sort arrays by ID if elements have 'id' property
    if (
      sortedElements.length > 0 &&
      typeof sortedElements[0] === 'object' &&
      sortedElements[0] !== null &&
      'id' in sortedElements[0]
    ) {
      return sortedElements.sort((a, b) => {
        const idA = a.id
        const idB = b.id

        if (typeof idA === 'number' && typeof idB === 'number') {
          return idA - idB
        } else {
          return String(idA).localeCompare(String(idB))
        }
      })
    }

    return sortedElements
  }

  if (typeof obj === 'object') {
    const sortedObj = {}
    const sortedKeys = Object.keys(obj).sort()

    for (const key of sortedKeys) {
      sortedObj[key] = sortJsonRecursively(obj[key])
    }

    return sortedObj
  }

  return obj
}

function getAllJsonFiles(dir) {
  const results = []
  const items = fs.readdirSync(dir)

  for (const item of items) {
    const itemPath = path.join(dir, item)
    const stat = fs.statSync(itemPath)

    if (stat.isDirectory()) {
      results.push(...getAllJsonFiles(itemPath))
    } else if (item.endsWith('.json')) {
      results.push(itemPath)
    }
  }

  return results
}

function processLanguageDirectory(langDir) {
  const langName = path.basename(langDir)
  console.log(`📁 Processing language directory: ${langName}`)

  const jsonFiles = getAllJsonFiles(langDir)
  console.log(`📄 Found ${jsonFiles.length} JSON files`)

  let mergedContent = {
    chapters: [],
    common: {},
  }

  // Track lesson directories to process their home.json files later
  const lessonDirs = new Map()

  for (const file of jsonFiles) {
    try {
      const content = JSON.parse(fs.readFileSync(file, 'utf8'))
      const fileName = path.basename(file, '.json')
      const dirName = path.dirname(file)

      if (fileName === 'common' && path.relative(langDir, dirName) === '') {
        mergedContent.common = content
        continue
      }

      if (fileName === 'home') {
        continue
      }

      const relativePath = path.relative(langDir, dirName)
      const pathParts = relativePath.split(path.sep)

      if (pathParts[0] === 'chapters') {
        const lessonName = pathParts[1]

        if (!lessonDirs.has(lessonName)) {
          lessonDirs.set(
            lessonName,
            path.join(langDir, pathParts[0], lessonName),
          )
        }

        let chapter = mergedContent.chapters.find((c) => c.title === lessonName)
        if (!chapter) {
          chapter = { title: lessonName, lessons: [] }
          mergedContent.chapters.push(chapter)
        }

        if (pathParts.length === 2) {
          chapter.lessons.push(content)
        } else if (pathParts.length > 2) {
          const contentType = pathParts[2]
          content.type = contentType
          chapter.lessons.push(content)
        }
      }
    } catch (error) {
      console.error(`❌ Error processing file ${file}:`, error.message)
    }
  }

  // Process home.json files for each lesson directory
  for (const [lessonName, lessonDir] of lessonDirs) {
    const homeJsonPath = path.join(lessonDir, 'home.json')

    if (fs.existsSync(homeJsonPath)) {
      try {
        const homeContent = JSON.parse(fs.readFileSync(homeJsonPath, 'utf8'))

        const chapter = mergedContent.chapters.find(
          (c) => c.title === lessonName,
        )
        if (chapter) {
          for (const key in homeContent) {
            if (key !== 'lessons') {
              chapter[key] = homeContent[key]
            }
          }
        }
      } catch (error) {
        console.error(
          `❌ Error processing home.json for lesson ${lessonName}: ${error.message}`,
        )
      }
    }
  }

  // Check for root home.json with overall metadata
  const rootHomeJsonPath = path.join(langDir, 'home.json')
  if (fs.existsSync(rootHomeJsonPath)) {
    try {
      const homeContent = JSON.parse(fs.readFileSync(rootHomeJsonPath, 'utf8'))

      if (homeContent && Array.isArray(homeContent.chapters)) {
        for (const homeChapter of homeContent.chapters) {
          const chapter = mergedContent.chapters.find(
            (c) => c.title === homeChapter.title,
          )
          if (chapter) {
            for (const key in homeChapter) {
              if (key !== 'lessons') {
                chapter[key] = homeChapter[key]
              }
            }
          }
        }
      }
    } catch (error) {
      console.error(`❌ Error processing root home.json: ${error.message}`)
    }
  }

  console.log('🔄 Merging and sorting JSON structure...')

  const sortedContent = sortJsonRecursively(mergedContent)
  return sortedContent
}

async function sortSingleJsonFile(
  jsonPath,
  outputPath = null,
  overwrite = false,
) {
  try {
    const absolutePath = path.resolve(jsonPath)

    if (!fs.existsSync(absolutePath)) {
      throw new Error(`File ${absolutePath} does not exist`)
    }

    console.log(`📖 Reading file: ${absolutePath}`)
    const fileContent = fs.readFileSync(absolutePath, 'utf8')
    const jsonData = JSON.parse(fileContent)

    console.log('🔄 Sorting in progress...')
    const sortedJson = sortJsonRecursively(jsonData)

    let finalOutputPath
    if (outputPath) {
      finalOutputPath = path.resolve(outputPath)
    } else if (overwrite) {
      finalOutputPath = absolutePath
    } else {
      const dir = path.dirname(absolutePath)
      const name = path.basename(absolutePath, '.json')
      finalOutputPath = path.join(dir, `${name}_sorted.json`)
    }

    const outputDir = path.dirname(finalOutputPath)
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true })
    }

    fs.writeFileSync(
      finalOutputPath,
      JSON.stringify(sortedJson, null, 2),
      'utf8',
    )

    console.log(`✅ Sorted file saved to: ${finalOutputPath}`)

    const originalSize = fs.statSync(absolutePath).size
    const sortedSize = fs.statSync(finalOutputPath).size

    console.log(`📊 Statistics:`)
    console.log(`   - Original size: ${originalSize} bytes`)
    console.log(`   - Sorted size: ${sortedSize} bytes`)
  } catch (error) {
    console.error('❌ Error:', error.message)
    process.exit(1)
  }
}

function showHelp() {
  console.log(`
🎯 JSON Merger & Sorter - Merge directories or sort single files

USAGE:
  # Sort a single JSON file
  node json-merger-sorter.js <input-file> [options]
  
  # Merge a language directory into a single sorted JSON file
  node json-merger-sorter.js --merge <input-directory> <output-file>

OPTIONS:
  -m, --merge             Merge directory mode
  -o, --output <file>     Specify output file (single file mode only)
  -w, --overwrite         Overwrite original file (single file mode only)
  -h, --help              Show this help message

EXAMPLES:
  # Create a new sorted file with "_sorted" suffix
  node json-merger-sorter.js data.json
  
  # Specify an output file for single file sorting
  node json-merger-sorter.js data.json -o sorted-data.json
  
  # Overwrite the original file
  node json-merger-sorter.js data.json --overwrite
  
  # Merge a language directory into a single sorted file
  node json-merger-sorter.js --merge ./languages/en ./output/en-merged.json
  
  # Use absolute or relative paths
  node json-merger-sorter.js ./folder/data.json -o ./output/sorted.json
`)
}

function parseArgs() {
  const args = process.argv.slice(2)

  if (args.length === 0 || args.includes('-h') || args.includes('--help')) {
    showHelp()
    process.exit(0)
  }

  const mergeIndex = args.findIndex((arg) => arg === '-m' || arg === '--merge')
  if (mergeIndex !== -1) {
    if (args.length < 3) {
      console.error(
        '❌ Error: Merge mode requires input directory and output file',
      )
      process.exit(1)
    }

    const inputDir = args[mergeIndex + 1]
    const outputFile = args[mergeIndex + 2]

    if (!inputDir || !outputFile) {
      console.error(
        '❌ Error: Both input directory and output file are required for merge mode',
      )
      process.exit(1)
    }

    return { mode: 'merge', inputDir, outputFile }
  }

  // Single file mode
  const inputFile = args[0]
  let outputFile = null
  let overwrite = false

  for (let i = 1; i < args.length; i++) {
    const arg = args[i]

    if (arg === '-o' || arg === '--output') {
      if (i + 1 < args.length) {
        outputFile = args[i + 1]
        i++
      } else {
        console.error('❌ Error: --output requires a filename')
        process.exit(1)
      }
    } else if (arg === '-w' || arg === '--overwrite') {
      overwrite = true
    } else {
      console.error(`❌ Error: Unknown option "${arg}"`)
      console.log('Use --help to see available options')
      process.exit(1)
    }
  }

  return { mode: 'single', inputFile, outputFile, overwrite }
}

async function main() {
  console.log('🎯 JSON Merger & Sorter - Advanced JSON processing tool\n')

  try {
    const args = parseArgs()

    if (args.mode === 'merge') {
      console.log(`🔄 Merge mode: Processing directory ${args.inputDir}`)
      console.log(`📁 Output will be saved to: ${args.outputFile}\n`)

      if (!fs.existsSync(args.inputDir)) {
        throw new Error(`Input directory ${args.inputDir} does not exist`)
      }

      if (!fs.statSync(args.inputDir).isDirectory()) {
        throw new Error(`${args.inputDir} is not a directory`)
      }

      const sortedContent = processLanguageDirectory(
        args.inputDir,
        args.outputFile,
      )

      const outputDir = path.dirname(args.outputFile)
      if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true })
      }

      fs.writeFileSync(
        args.outputFile,
        JSON.stringify(sortedContent, null, 2),
        'utf8',
      )
      console.log(`✅ Merged and sorted file created: ${args.outputFile}`)
    } else {
      console.log(`🔄 Single file mode: Processing ${args.inputFile}\n`)
      await sortSingleJsonFile(args.inputFile, args.outputFile, args.overwrite)
    }

    console.log('\n🎉 Operation completed successfully!')
  } catch (error) {
    console.error('\n💥 Operation failed:', error.message)
    process.exit(1)
  }
}

main()
