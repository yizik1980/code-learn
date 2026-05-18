export interface Question {
  id: string
  text: string
  options: string[]
  correct: number
  explanation: string
}

export interface ContentBlock {
  type: 'text' | 'code' | 'tip' | 'heading' | 'table'
  text?: string
  lang?: string
  code?: string
  caption?: string
  headers?: string[]
  rows?: string[][]
}

export interface Lesson {
  id: string
  title: string
  summary: string
  emoji: string
  content: ContentBlock[]
  questionBank: Question[]
}

export interface Course {
  id: string
  title: string
  description: string
  emoji: string
  color: string
  gradient: string
  lessons: Lesson[]
  comingSoon?: boolean
}

export interface LessonProgress {
  completed: boolean
  score: number
  total: number
}

export interface AppProgress {
  [courseId: string]: {
    [lessonId: string]: LessonProgress
  }
}
