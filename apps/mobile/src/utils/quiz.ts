import type { Question } from '@codelearn/courses-data'

export function pickRandom<T>(arr: T[], count: number): T[] {
  const shuffled = [...arr].sort(() => Math.random() - 0.5)
  return shuffled.slice(0, Math.min(count, arr.length))
}

export function calcScore(questions: Question[], answers: (number | null)[]): number {
  return questions.reduce((score, q, i) => score + (answers[i] === q.correct ? 1 : 0), 0)
}
