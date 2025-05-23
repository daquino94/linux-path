'use client'
import { useState, useEffect } from 'react'
import { FiMenu, FiX } from 'react-icons/fi'
import { FaGithub, FaReddit } from 'react-icons/fa'
import { BiGlobe } from 'react-icons/bi'
import { Link, usePathname, useRouter } from '@/i18n/navigation'
import { useLocale, useTranslations } from 'next-intl'
import { locales } from '@/i18n/routing'
import Image from 'next/image'

export default function Navbar() {
  const router = useRouter()
  const pathname = usePathname()
  const currentLocale = useLocale()
  const t = useTranslations('common.navbar')

  const [menuOpen, setMenuOpen] = useState(false)
  const [langDropdownOpen, setLangDropdownOpen] = useState(false)

  const currentLanguage =
    locales.find((lang) => lang === currentLocale) || locales[0]

  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === '/'
    }
    return pathname.startsWith(href)
  }

  const getLinkClasses = (href: string, isMobile = false) => {
    const baseClasses = isMobile
      ? 'block rounded-md px-3 py-2 text-base font-medium transition-colors'
      : 'transition-colors duration-200'

    const activeClasses = isMobile
      ? 'bg-sky-50 font-medium text-orange-600 dark:bg-sky-700 dark:text-orange-400'
      : 'text-orange-600 font-semibold dark:text-orange-400 border-b-2 border-orange-600 dark:border-orange-400 pb-1'

    const inactiveClasses = isMobile
      ? 'text-sky-700 hover:bg-sky-100 hover:text-orange-400 dark:text-sky-200 dark:hover:bg-sky-600'
      : 'text-sky-700 hover:text-orange-400 dark:text-sky-200'

    return `${baseClasses} ${isActive(href) ? activeClasses : inactiveClasses}`
  }

  const handleLanguageChange = (langCode: string) => {
    if (langCode !== currentLocale) {
      router.push(pathname, { locale: langCode })
    }
    setLangDropdownOpen(false)
    setMenuOpen(false)
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement
      if (langDropdownOpen && !target.closest('.language-selector')) {
        setLangDropdownOpen(false)
      }
      if (menuOpen && !target.closest('.mobile-menu-container')) {
        setMenuOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [langDropdownOpen, menuOpen])

  return (
    <nav className="bg-white shadow-md dark:bg-sky-800">
      <div className="mx-auto px-4">
        <div className="flex h-16 justify-between">
          {/* Logo and main nav items */}
          <div className="flex items-center">
            <div className="flex flex-shrink-0 items-center">
              <Image
                src="/images/penguinLaptop.png"
                alt="Logo"
                width={40}
                height={40}
              />
              <Link
                href="/"
                className="text-xl font-bold text-orange-600 dark:text-orange-400"
              >
                {t('siteName')}
              </Link>
            </div>

            {/* Desktop menu */}
            <div className="hidden md:ml-6 md:flex md:items-center md:space-x-4">
              <Link href="/" className={getLinkClasses('/')}>
                {t('home')}
              </Link>
              <Link href="/resources" className={getLinkClasses('/resources')}>
                {t('resources')}
              </Link>
            </div>
          </div>

          {/* Right side items - social and language selector */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            <Link
              href="https://github.com/daquino94/linux-path"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sky-700 transition-colors duration-200 hover:text-orange-400 dark:text-sky-200"
              aria-label="GitHub repository"
            >
              <FaGithub size={23} />
            </Link>

            <Link
              href={'https://www.reddit.com/r/linuxPath/'}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Reddit"
              className="text-sky-700 transition-colors duration-200 hover:text-orange-400 dark:text-sky-200"
            >
              <FaReddit size={24} />
            </Link>

            {/* Language selector desktop */}
            <div className="language-selector relative">
              <button
                onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                className="flex items-center gap-2 rounded px-3 py-1.5 text-sky-700 transition-colors duration-200 hover:text-orange-400 focus:ring-2 focus:ring-orange-400 focus:outline-none dark:text-sky-200"
                aria-label="Select language"
              >
                <BiGlobe size={23} />
                <span className="text-sm font-medium">
                  {currentLanguage.toUpperCase()}
                </span>
                <svg
                  className="h-4 w-4"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>

              {langDropdownOpen && (
                <div className="absolute right-0 z-20 mt-2 w-auto rounded-md border border-sky-200 bg-white py-1 shadow-lg dark:border-sky-700 dark:bg-sky-800">
                  {locales.map((lang) => (
                    <button
                      key={lang}
                      onClick={() => handleLanguageChange(lang)}
                      className={`flex w-full cursor-pointer items-center px-4 py-2 text-left text-sm text-sky-700 transition-colors duration-200 hover:bg-sky-100 hover:text-orange-400 dark:text-sky-200 dark:hover:bg-sky-600 ${
                        lang === currentLocale
                          ? 'bg-sky-50 font-medium text-orange-600 dark:bg-sky-700 dark:text-orange-400'
                          : ''
                      }`}
                    >
                      {lang.toUpperCase()}
                      {lang === currentLocale && (
                        <span className="ml-4 text-orange-600 dark:text-orange-400">
                          ✓
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="mobile-menu-container flex items-center md:hidden">
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="rounded-md p-2 text-sky-700 transition-colors hover:bg-sky-100 hover:text-orange-400 focus:ring-2 focus:ring-orange-400 focus:outline-none dark:text-sky-200 dark:hover:bg-sky-600"
                aria-label="Main menu"
                aria-expanded={menuOpen}
              >
                {menuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="mobile-menu-container md:hidden">
          <div className="space-y-1 border-t border-sky-200 bg-white px-2 pt-2 pb-3 dark:border-sky-700 dark:bg-sky-800">
            {/* Mobile navigation links */}
            <Link
              href="/"
              className={getLinkClasses('/', true)}
              onClick={() => setMenuOpen(false)}
            >
              {t('home')}
            </Link>
            <Link
              href="/resources"
              className={getLinkClasses('/resources', true)}
              onClick={() => setMenuOpen(false)}
            >
              {t('resources')}
            </Link>

            {/* Mobile social */}
            <Link
              href="https://github.com/daquino94/linux-path"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 rounded-md px-3 py-2 text-base font-medium text-sky-700 transition-colors hover:bg-sky-100 hover:text-orange-400 dark:text-sky-200 dark:hover:bg-sky-600"
              aria-label="GitHub repository"
            >
              <FaGithub size={20} />
              GitHub
            </Link>
            <Link
              href="https://www.reddit.com/r/linuxPath/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 rounded-md px-3 py-2 text-base font-medium text-sky-700 transition-colors hover:bg-sky-100 hover:text-orange-400 dark:text-sky-200 dark:hover:bg-sky-600"
              aria-label="Reddit"
            >
              <FaReddit size={20} />
              Reddit
            </Link>

            {/* Mobile llanguage selector */}
            <div className="px-3 py-2">
              <div className="mb-2 text-sm font-medium text-sky-500 dark:text-sky-400">
                {t('language') || 'Language'}
              </div>
              <div className="space-y-1">
                {locales.map((lang) => (
                  <button
                    key={lang}
                    onClick={() => handleLanguageChange(lang)}
                    className={`flex w-full items-center rounded-md px-3 py-2 text-left text-sm transition-colors ${
                      lang === currentLocale
                        ? 'bg-sky-100 font-medium text-orange-600 dark:bg-sky-700 dark:text-orange-400'
                        : 'text-sky-700 hover:bg-sky-50 hover:text-orange-400 dark:text-sky-200 dark:hover:bg-sky-600'
                    }`}
                  >
                    <BiGlobe size={16} className="mr-2" />
                    {lang.toUpperCase()}
                    {lang === currentLocale && (
                      <span className="ml-auto text-orange-600 dark:text-orange-400">
                        ✓
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
