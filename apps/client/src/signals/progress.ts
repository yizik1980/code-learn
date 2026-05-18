import { signal, computed } from '@preact/signals-react'
import type { AppProgress } from '../types'

const STORAGE_KEY = 'codelearn_progress'

function loadFromStorage(): AppProgress {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    return stored ? (JSON.parse(stored) as AppProgress) : {}
  } catch {
    return {}
  }
}

export const progressSignal = signal<AppProgress>(loadFromStorage())

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
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progressSignal.value))
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
