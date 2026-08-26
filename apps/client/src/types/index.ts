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
