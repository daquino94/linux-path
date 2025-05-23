import Image from 'next/image'

export default function Hero({
  image,
  title,
  subtitle,
}: {
  image: string
  title: string
  subtitle?: string
}) {
  return (
    <section className="h-md bg-sky-800 py-15 text-white">
      <div className="mx-auto max-w-6xl px-6 text-center">
        <div className="mb-8 flex justify-center">
          <Image
            src={image}
            alt="Penguin with laptop"
            width={200}
            height={200}
          />
        </div>
        <h2 className="mb-4 text-4xl font-extrabold md:text-5xl">{title}</h2>
        {subtitle && (
          <p className="mb-8 text-lg text-white/90 md:text-xl">{subtitle}</p>
        )}
      </div>
    </section>
  )
}
