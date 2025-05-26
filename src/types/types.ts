export interface MainContentProps {
  lessonName: string
  children: React.ReactNode
}

export interface ExerciseBoxProps {
  exercises: string[]
}

export interface QuizBoxProps {
  question: string
  correctAnswer: string
  nextLessonSlug?: string
}

export interface Dictionary {
  chapters: Chapter[]
  common: Common
}

export interface Chapter {
  description: string
  id: number
  image?: string
  lessons: Lesson[]
  title: string
  slug: string
}

export interface Lesson {
  id: number
  exercise: string
  lessonContent: string
  quizAnswer: string
  quizQuestion: string
  title: string
  slug: string
}

export interface Common {
  hero: Hero
  navbar: Navbar
  resources: Resource
}
export interface Footer {
  content1: string
  content2: string
  content3: string
  href1: string
  href2: string
  href3: string
  textLink1: string
  textLink2: string
  textLink3: string
  title1: string
  title2: string
  title3: string
}
export interface Resource {
  description: string
  href: string
  image: string
  title: string
}

export interface CardProps {
  title: string
  description?: string
  imageSrc?: string
  altText?: string
  completed?: boolean
  state?: State
  href: string
  target?: Target
}

export interface Donate {
  title: string
}

export interface Hero {
  subtitle: string
  title: string
}

export interface Navbar {
  home: string
  lessons: string
}
export type State = 'NEW' | 'STARTED' | 'COMPLETED'
export type Target = '_self' | '_blank' | '_parent' | '_top'
