import { useState, useMemo } from 'react'
import type { Question } from '@codelearn/courses-data'
import { pickRandom, calcScore } from '../utils/quiz'
import { saveProgress } from '../signals/progress'

interface Props {
  questions: Question[]
  courseId: string
  lessonId: string
  onComplete?: (score: number, total: number) => void
  onStep?: () => void
  embedded?: boolean
}

const QUIZ_SIZE = 5

export default function Quiz({ questions, courseId, lessonId, onComplete, onStep, embedded }: Props) {
  const picked = useMemo(() => pickRandom(questions, QUIZ_SIZE), [questions])

  const [currentIdx, setCurrentIdx] = useState(0)
  const [selected, setSelected] = useState<number | null>(null)
  const [checked, setChecked] = useState(false)
  const [answers, setAnswers] = useState<(number | null)[]>(new Array(picked.length).fill(null))
  const [done, setDone] = useState(false)

  const current = picked[currentIdx]
  const isLast = currentIdx === picked.length - 1

  function handleSelect(idx: number) {
    if (checked) return
    setSelected(idx)
  }

  function handleCheck() {
    if (selected === null) return
    setChecked(true)
    const next = [...answers]
    next[currentIdx] = selected
    setAnswers(next)
  }

  function handleNext() {
    const finalAnswers = [...answers]
    finalAnswers[currentIdx] = selected
    if (isLast) {
      const score = calcScore(picked, finalAnswers)
      saveProgress(courseId, lessonId, score, picked.length)
      setAnswers(finalAnswers)
      setDone(true)
      onComplete?.(score, picked.length)
    } else {
      setAnswers(finalAnswers)
      setCurrentIdx((i) => i + 1)
      setSelected(null)
      setChecked(false)
      onStep?.()
    }
  }

  function handleRetry() {
    setCurrentIdx(0)
    setSelected(null)
    setChecked(false)
    setAnswers(new Array(picked.length).fill(null))
    setDone(false)
  }

  if (done) {
    const score = calcScore(picked, answers)
    const pct = Math.round((score / picked.length) * 100)
    return (
      <QuizResults
        picked={picked}
        answers={answers}
        score={score}
        total={picked.length}
        pct={pct}
        onRetry={handleRetry}
      />
    )
  }

  const isCorrect = checked && selected === current.correct
  const isWrong = checked && selected !== current.correct

  return (
    <div>
      {embedded && (
        <div className="flex items-center justify-between mb-4">
          <span style={{ color: '#8080a0', fontSize: '0.95rem' }}>
            שאלה {currentIdx + 1} מתוך {picked.length}
          </span>
          <ProgressDots picked={picked} currentIdx={currentIdx} />
        </div>
      )}

      {/* Question */}
      <p className="font-bold mb-4 leading-relaxed" style={{ color: '#1c1c2e' }}>
        {current.text}
      </p>

      {/* Options */}
      <div className="space-y-2 mb-4">
        {current.options.map((opt, i) => {
          let bg = '#fff'
          let border = '#c4c4cc'
          let shadow = '2px 2px 0 #c4c4cc'
          let color = '#3a3a50'

          if (!checked) {
            if (selected === i) {
              bg = '#eff6ff'
              border = '#3b82f6'
              shadow = '2px 2px 0 #3b82f6'
              color = '#1d4ed8'
            }
          } else {
            if (i === current.correct) {
              bg = '#f0fdf8'
              border = '#10b981'
              shadow = '2px 2px 0 #10b981'
              color = '#065f46'
            } else if (selected === i && isWrong) {
              bg = '#fef2f2'
              border = '#ef4444'
              shadow = '2px 2px 0 #ef4444'
              color = '#991b1b'
            } else {
              bg = '#f8f8f8'
              border = '#e0e0e8'
              shadow = 'none'
              color = '#a0a0b8'
            }
          }

          return (
            <button
              key={i}
              className="w-full text-right px-4 py-3 font-semibold transition-all cursor-pointer"
              style={{
                background: bg,
                border: `2px solid ${border}`,
                boxShadow: shadow,
                borderRadius: 10,
                color,
              }}
              onClick={() => handleSelect(i)}
            >
              <span className="flex items-center gap-3">
                <span
                  className="w-7 h-7 rounded-full flex items-center justify-center shrink-0 font-black text-sm"
                  style={{ border: `2px solid ${border}`, color }}
                >
                  {String.fromCharCode(65 + i)}
                </span>
                {opt}
                {checked && i === current.correct && (
                  <span className="mr-auto font-black" style={{ color: '#10b981' }}>✓</span>
                )}
                {checked && selected === i && isWrong && (
                  <span className="mr-auto font-black" style={{ color: '#ef4444' }}>✗</span>
                )}
              </span>
            </button>
          )
        })}
      </div>

      {/* Explanation */}
      {checked && (
        <div
          className="rounded-xl px-4 py-3 mb-4 leading-relaxed font-medium"
          style={{
            background: isCorrect ? '#f0fdf8' : '#fef2f2',
            border: `2px solid ${isCorrect ? '#10b981' : '#ef4444'}`,
            boxShadow: `3px 3px 0 ${isCorrect ? '#10b981' : '#ef4444'}`,
            color: isCorrect ? '#065f46' : '#991b1b',
          }}
        >
          <span className="font-black ml-2">{isCorrect ? '✓ נכון!' : '✗ לא נכון.'}</span>
          {current.explanation}
        </div>
      )}

      {/* Action */}
      <div className="flex justify-end">
        {!checked ? (
          <button
            onClick={handleCheck}
            disabled={selected === null}
            className="brutal-btn px-6 py-2.5 font-black"
            style={{ background: '#3b82f6', color: '#fff', fontSize: '1rem' }}
          >
            בדוק
          </button>
        ) : (
          <button
            onClick={handleNext}
            className="brutal-btn px-6 py-2.5 font-black"
            style={{ background: '#10b981', color: '#fff', fontSize: '1rem' }}
          >
            {isLast ? 'סיים ←' : 'הבא ←'}
          </button>
        )}
      </div>
    </div>
  )
}

function ProgressDots({ picked, currentIdx }: { picked: Question[]; currentIdx: number }) {
  return (
    <div className="flex items-center gap-1.5">
      {picked.map((_, i) => (
        <span
          key={i}
          className="rounded-full transition-all"
          style={{
            width: 10,
            height: 10,
            background:
              i < currentIdx ? '#10b981' : i === currentIdx ? '#1c1c2e' : '#e0e0e8',
            border: '1.5px solid',
            borderColor: i < currentIdx ? '#10b981' : i === currentIdx ? '#1c1c2e' : '#c0c0cc',
            display: 'inline-block',
          }}
        />
      ))}
    </div>
  )
}

function QuizResults({
  picked,
  answers,
  score,
  total,
  pct,
  onRetry,
}: {
  picked: Question[]
  answers: (number | null)[]
  score: number
  total: number
  pct: number
  onRetry: () => void
}) {
  const emoji = pct === 100 ? '🏆' : pct >= 80 ? '🌟' : pct >= 60 ? '👍' : '💪'
  const msg =
    pct === 100
      ? 'מושלם! שלטת בחומר!'
      : pct >= 80
      ? 'כל הכבוד!'
      : pct >= 60
      ? 'לא רע! כדאי לחזור על הנושאים שפספסת'
      : 'נסה שוב — הצלחה!'

  const scoreColor = pct >= 80 ? '#10b981' : pct >= 60 ? '#f59e0b' : '#ef4444'

  return (
    <div>
      <div className="text-center mb-5">
        <div style={{ fontSize: '3rem' }} className="mb-2">{emoji}</div>
        <div className="font-black mb-1" style={{ fontSize: '2rem', color: '#1c1c2e' }}>
          {score} / {total} נקודות
        </div>
        <div className="mb-4" style={{ color: '#5a5a72' }}>{msg}</div>

        {/* Score bar */}
        <div
          className="w-full rounded-full overflow-hidden"
          style={{ height: 12, background: '#e8e4dc', border: '2px solid #1c1c2e' }}
        >
          <div
            className="h-full rounded-full transition-all duration-700"
            style={{ width: `${pct}%`, background: scoreColor }}
          />
        </div>
        <div className="mt-1 font-bold" style={{ color: scoreColor, fontSize: '0.95rem' }}>
          {pct}%
        </div>
      </div>

      <div className="space-y-2 mb-5">
        {picked.map((q, i) => {
          const correct = answers[i] === q.correct
          return (
            <div
              key={q.id}
              className="rounded-xl px-4 py-3"
              style={{
                background: correct ? '#f0fdf8' : '#fef2f2',
                border: `2px solid ${correct ? '#10b981' : '#ef4444'}`,
              }}
            >
              <div className="flex items-start gap-2">
                <span
                  className="mt-0.5 shrink-0 font-black"
                  style={{ color: correct ? '#10b981' : '#ef4444' }}
                >
                  {correct ? '✓' : '✗'}
                </span>
                <div className="flex-1">
                  <p className="font-semibold" style={{ color: '#1c1c2e' }}>{q.text}</p>
                  {!correct && (
                    <p style={{ color: '#8080a0', fontSize: '0.9rem' }} className="mt-0.5">
                      התשובה הנכונה:{' '}
                      <span className="font-bold" style={{ color: '#10b981' }}>
                        {q.options[q.correct]}
                      </span>
                    </p>
                  )}
                </div>
              </div>
            </div>
          )
        })}
      </div>

      <button
        onClick={onRetry}
        className="brutal-btn w-full py-2.5 font-bold"
        style={{ background: '#fff', color: '#1c1c2e', fontSize: '1rem' }}
      >
        נסה שוב עם שאלות אחרות
      </button>
    </div>
  )
}
