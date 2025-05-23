import { CardProps } from '@/types/types'
import Image from 'next/image'
import Link from 'next/link'

export default function Card({
  title,
  description,
  imageSrc,
  altText,
  state = 'NEW',
  href,
  target = '_self',
}: CardProps) {
  const bgColor = (() => {
    switch (state) {
      case 'STARTED':
        return 'bg-sky-200'
      case 'COMPLETED':
        return 'bg-green-200'
      default:
        return 'bg-white'
    }
  })()

  return (
    <Link href={href} className="block h-full" target={target}>
      <div
        className={`${bgColor} flex h-full cursor-pointer flex-col items-center rounded-3xl p-6 text-center shadow-md transition duration-300 hover:shadow-xl`}
      >
        <div className="relative mx-auto mb-4 h-24 w-24 flex-shrink-0">
          {imageSrc && (
            <Image
              src={imageSrc || ''}
              alt={altText || title}
              fill
              className="rounded-full border border-gray-200 object-cover"
            />
          )}
        </div>
        <div className="flex flex-grow flex-col justify-between">
          <h3 className="text-xl font-bold text-gray-800">{title}</h3>
          {description && (
            <p className="mt-2 text-sm text-gray-600">{description}</p>
          )}
        </div>
      </div>
    </Link>
  )
}
