import Link from 'next/link'
import Image from 'next/image'
import { FaReddit, FaGithub, FaCoffee } from 'react-icons/fa'

const Footer: React.FC = () => {
  return (
    <footer className="bg-sky-800 px-6 py-6 text-white">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between sm:flex-row">
        <div className="mb-4 sm:mb-0">
          <Link href="https://aquinodaniel.com">
            <div className="flex items-center">
              <Image src="/images/da.png" alt="Logo" width={48} height={48} />
            </div>
          </Link>
        </div>

        <div className="flex space-x-6">
          <Link
            href={'https://github.com/daquino94/linux-path'}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="transition-colors duration-200 hover:text-orange-400"
          >
            <FaGithub size={24} />
          </Link>

          <Link
            href={'https://buymeacoffee.com/balsamic9239'}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Buy Me A Coffee"
            className="transition-colors duration-200 hover:text-orange-400"
          >
            <FaCoffee size={24} />
          </Link>

          <Link
            href={'https://www.reddit.com/r/linuxPath/'}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Reddit"
            className="transition-colors duration-200 hover:text-orange-400"
          >
            <FaReddit size={24} />
          </Link>
        </div>
      </div>
    </footer>
  )
}

export default Footer
