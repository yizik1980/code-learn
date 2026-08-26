import AsyncStorage from '@react-native-async-storage/async-storage'
import { signal, computed } from '@preact/signals-react'

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

const STORAGE_KEY = 'codelearn_progress'

export const progressSignal = signal<AppProgress>({})
export const progressLoadedSignal = signal(false)

export async function loadProgress() {
  try {
    const stored = await AsyncStorage.getItem(STORAGE_KEY)
    progressSignal.value = stored ? (JSON.parse(stored) as AppProgress) : {}
  } catch {
    progressSignal.value = {}
  } finally {
    progressLoadedSignal.value = true
  }
}

export function saveProgress(
  courseId: string,
  lessonId: string,
  score: number,
  total: number,
) {
  const current = progressSignal.value
  progressSignal.value = {
    ...current,
    [courseId]: {
      ...current[courseId],
      [lessonId]: { completed: true, score, total },
    },
  }
  AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(progressSignal.value)).catch(() => {})
}

export function getLessonProgress(courseId: string, lessonId: string) {
  return progressSignal.value[courseId]?.[lessonId]
}

export function getCourseStats(courseId: string, totalLessons: number) {
  const courseProgress = progressSignal.value[courseId] ?? {}
  const completedCount = Object.values(courseProgress).filter((l) => l.completed).length
  const totalScore = Object.values(courseProgress).reduce((sum, l) => sum + l.score, 0)
  const totalMax = Object.values(courseProgress).reduce((sum, l) => sum + l.total, 0)
  return {
    completed: completedCount,
    total: totalLessons,
    score: totalScore,
    maxScore: totalMax,
    percent: totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0,
  }
}

export const globalStatsSignal = computed(() => {
  let totalScore = 0
  let totalMax = 0
  for (const course of Object.values(progressSignal.value)) {
    for (const lesson of Object.values(course)) {
      totalScore += lesson.score
      totalMax += lesson.total
    }
  }
  return { totalScore, totalMax }
})
