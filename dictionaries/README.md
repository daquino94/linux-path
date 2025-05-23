# Dictionaries Documentation

## Overview

The dictionaries system provides internationalization (i18n) support for the Linux Path platform. It enables content translation across multiple languages while maintaining a structured, organized approach to managing translations for chapters, lessons, and common UI components.

The system uses JSON files to store translations, with English (`en`) serving as the master language. All other languages are derived from and validated against the English dictionary to ensure consistency and completeness.

### Key Features

- **Hierarchical Structure**: Organized by language → chapters → lessons
- **Master Language System**: English serves as the reference for all translations
- **Automated Validation**: Built-in tools to check translation completeness
- **Easy Deployment**: Streamlined release process for updated translations
- **Component Translations**: Shared translations for common UI elements

---

## Table of Contents

- [Folder Structure](#folder-structure)
- [File Types](#file-types)
  - [Common Translations](#common-translations)
  - [Chapter Home](#chapter-home)
  - [Lesson Files](#lesson-files)
- [Management Commands](#management-commands)
  - [Create New Dictionary](#create-new-dictionary)
  - [Release Dictionaries](#release-dictionaries)
  - [Add New Language](#add-new-language)
  - [Validation Check](#validation-check)
- [Best Practices](#best-practices)

---

## Folder Structure

The dictionaries follow a consistent hierarchical structure that organizes translations by language and content type:

```md
├── dictionaries/
│   ├── en/                          # Master language (English)
│   │   ├── chapters/
│   │   │   ├── chapterName/
│   │   │   │   ├── lessonName.json
│   │   │   │   ├── lessonName.json
│   │   │   │   └── home.json
│   │   │   ├── anotherChapter/
│   │   │   │   ├── lessonName.json
│   │   │   │   ├── lessonName.json
│   │   │   │   ├── lessonName.json
│   │   │   │   └── home.json
│   │   └── common.json
│   │
│   ├── it/                          # Italian translations
│   │   ├── chapters/
│   │   │   ├── chapterName/
│   │   │   │   ├── lessonName.json
│   │   │   │   ├── lessonName.json
│   │   │   │   └── home.json
│   │   │   ├── anotherChapter/
│   │   │   │   ├── lessonName.json
│   │   │   │   ├── lessonName.json
│   │   │   │   ├── lessonName.json
│   │   │   │   └── home.json
│   │   └── common.json
│   │
│   └── [other-languages]/          # Additional language codes
```

---

## File Types

### Common Translations

**File**: `dictionaries/<LANG_CODE>/common.json`

Contains shared translations for UI components, navigation elements, and common interface text. This file includes translations for components that appear across multiple pages.

**⚠️ Important**: HTML tags are not allowed in any field within this file.

```json
{
    "hero": {
        "image": "/images/penguinLaptop.png",
        "title": "Unlock the power of Linux",
        "subtitle": "A new life for LinuxJourney......"
    },
    "resources": {
        "hero": {
            "image": "/images/penguinBook.png",
            "title": "Learn Linux the Fun Way",
            "subtitle": "Master the art of Linux-fu with interactive and free lessons."
        },
        "data": [
            {
                "image": "/images/link.png",
                "title": "Official Ubuntu tutorial",
                "description": "A step-by-step guide for beginners......",
                "href": "https://ubuntu.com/tutorials/command-line-for-beginners"
            },
            {
                "image": "/images/book.png",
                "title": "The Linux Programming Interface: A Linux and UNIX System",
                "description": "For serious Linux-users, great start into kernel programming.",
                "href": "https://......"
            }
        ]
    },
    "chapterWrapper": {
        "content": "Content",
        "exerciseAndQuiz": "Exercise & quiz"
    },
    "navbar": {
        "siteName": "Linux Path",
        "home": "Home",
        "lessons": "Lessons",
        "resources": "Resources",
        "language": "Language"
    },
    "exerciseBox": {
        "exercise": "Exercise"
    },
    "quizBox": {
        "quiz": "Quiz",
        "checkAnswer": "Check Answer",
        "showCorrectAnswer": "Show correct answer",
        "correctAnswer": "Correct answer: ",
        "placeholderAnswer": "Type your answer here"
    }
}
```

### Chapter Home

**File**: `dictionaries/<LANG_CODE>/chapters/<CHAPTER_NAME>/home.json`

Contains general information about a specific chapter, including metadata that appears on chapter overview pages.

**⚠️ Important**: HTML tags are not allowed in any field within this file.

```json
{
    "id": 18,
    "title": "Subnetting",
    "description": "Learn about subnets and how to do subnet arithmetic!",
    "image": "/images/chapters/subnetting.png",
    "slug": "subnetting"
}
```

### Lesson Files

**File**: `dictionaries/<LANG_CODE>/chapters/<CHAPTER_NAME>/<LESSON_NAME>.json`

Contains all content specific to individual lessons, including the main content, quiz questions, and metadata.

**✅ HTML Allowed**: The `lessonContent` field supports HTML tags for enhanced content formatting and presentation.

```json
{
    "id": 5,
    "title": "Ubuntu",
    "lessonContent": "<b>Overview</b>\nOne of the most popular Linux distributions...",
    "quizQuestion": "What operating system is Ubuntu based off of?",
    "quizAnswer": "Debian",
    "slug": "ubuntu"
}
```

---

## Management Commands

### Create New Dictionary

Creates a new language dictionary by cloning the master English dictionary structure. All content will need to be translated after creation.

```bash
npm run createNewDictionaries <LANG_CODE>
```

**Example**:
```bash
npm run createNewDictionaries fr  # Creates French dictionary
```

**What it does**:
- Copies entire English dictionary structure
- Creates all necessary folders and files
- Preserves JSON structure with English content as placeholders
- Ready for translation work to begin

### Release Dictionaries

Merges and deploys dictionary files for a specific language to the live site. This command processes all translation files for the specified language and releases them to the `src/messages/<LANG_CODE>` directory.

```bash
npm_config_lang=<LANG_CODE> npm run releaseDictionaries:lang
```

**Example**:
```bash
npm_config_lang=it npm run releaseDictionaries:lang  # Releases Italian translations
```

**What it does**:
- Merges all dictionary files for the specified language
- Validates file structure and content
- Deploys translations to the appropriate source directory
- Makes translations available to the live application

### Add New Language

**⚠️ Use Only for New Languages**: This command should only be executed when adding a completely new language to the site for the first time.

```bash
npm run addNewLangToSite <LANG_CODE>
```

**Example**:
```bash
npm run addNewLangToSite de  # Adds German language support
```

**What it does**:
- Modifies the `src/i18n/routing.ts` configuration file
- Registers the new language in the application's routing system
- Enables the language selector to include the new option

### Validation Check

Performs comprehensive validation of all translation dictionaries against the master English dictionary. This ensures translation completeness and identifies missing keys.

```bash
npm run checkDictionaries
```

**What it does**:
- Compares all language dictionaries against English (master)
- Identifies missing translation keys
- Reports inconsistencies in file structure
- Prompts to add missing keys interactively
- Provides detailed location information for issues

**⚠️ Important**: Missing keys can cause runtime errors in the application. It's recommended to add missing keys when prompted to maintain application stability.

---

## Best Practices

### Translation Guidelines

1. **Maintain Consistency**: Use consistent terminology across all lessons within a language
2. **Preserve Formatting**: Keep the same JSON structure and key names as the English version
3. **Cultural Adaptation**: Adapt content culturally when direct translation doesn't convey the intended meaning
4. **Regular Validation**: Run `npm run checkDictionaries` frequently during translation work

### File Management

1. **Use Proper Language Codes**: Follow ISO 639-1 language codes (e.g., `en`, `it`, `fr`, `de`)
2. **Backup Before Changes**: Always backup dictionaries before making bulk changes
3. **Test After Release**: Verify translations appear correctly after running release commands
4. **Version Control**: Commit translation changes with descriptive commit messages

### Development Workflow

1. **Create Dictionary**: Use `createNewDictionaries` for new languages
2. **Translate Content**: Work through files systematically, chapter by chapter
3. **Validate Regularly**: Run checks to ensure completeness
4. **Test Locally**: Release to development environment first
5. **Deploy**: Use release commands to deploy to production

### Troubleshooting

- **Missing Keys Error**: Run `npm run checkDictionaries` and add missing translations
- **Deployment Issues**: Ensure language is properly registered with `addNewLangToSite`
- **Formatting Problems**: Verify JSON syntax and structure matches English version
- **HTML Rendering**: Check that HTML tags are only used in `lessonContent` fields where allowed