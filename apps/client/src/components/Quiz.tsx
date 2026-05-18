import { useState, useMemo } from 'react'
import type { Question } from '../types'
import { pickRandom, calcScore } from '../utils/quiz'
import { saveProgress } from '../signals/progress'

interface Props {
  questions: Question[]
  courseId: string
  lessonId: string
  onComplete?: (score: number, total: number) => void
  embedded?: boolean
}

const QUIZ_SIZE = 5

export default function Quiz({ questions, courseId, lessonId, onComplete, embedded }: Props) {
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
      {/* Progress header */}
      {!embedded && (
        <div className="bg-[#1a1a28] px-6 py-4 flex items-center justify-between border-b border-white/10 rounded-t-2xl">
          <h3 className="text-xl font-bold text-white flex items-center gap-2">
            🧠 בחן את עצמך
          </h3>
          <ProgressDots picked={picked} currentIdx={currentIdx} />
        </div>
      )}

      {embedded && (
        <div className="flex items-center justify-between mb-6">
          <span className="text-lg text-slate-400">
            שאלה {currentIdx + 1} מתוך {picked.length}
          </span>
          <ProgressDots picked={picked} currentIdx={currentIdx} />
        </div>
      )}

      <div className={embedded ? '' : 'p-6'}>
        {/* Question */}
        <p className="text-2xl font-semibold text-white mb-6 leading-relaxed">
          {current.text}
        </p>

        {/* Options */}
        <div className="space-y-3 mb-6">
          {current.options.map((opt, i) => {
            let style =
              'w-full text-right px-5 py-4 rounded-xl border text-xl transition-all cursor-pointer '

            if (!checked) {
              style += selected === i
                ? 'border-emerald-500 bg-emerald-500/15 text-white'
                : 'border-white/10 bg-white/4 text-slate-300 hover:border-white/25 hover:bg-white/8'
            } else {
              if (i === current.correct) {
                style += 'border-emerald-500 bg-emerald-500/20 text-emerald-300'
              } else if (selected === i && isWrong) {
                style += 'border-red-500 bg-red-500/20 text-red-300'
              } else {
                style += 'border-white/5 bg-white/2 text-slate-500'
              }
            }

            return (
              <button key={i} className={style} onClick={() => handleSelect(i)}>
                <span className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full border border-current flex items-center justify-center text-base shrink-0 font-mono">
                    {String.fromCharCode(65 + i)}
                  </span>
                  {opt}
                  {checked && i === current.correct && (
                    <span className="mr-auto text-emerald-400 text-xl">✓</span>
                  )}
                  {checked && selected === i && isWrong && (
                    <span className="mr-auto text-red-400 text-xl">✗</span>
                  )}
                </span>
              </button>
            )
          })}
        </div>

        {/* Explanation */}
        {checked && (
          <div
            className={`rounded-xl px-5 py-4 mb-5 text-xl leading-relaxed ${
              isCorrect
                ? 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-300'
                : 'bg-red-500/10 border border-red-500/30 text-red-300'
            }`}
          >
            <span className="font-bold ml-2">{isCorrect ? '✓ נכון!' : '✗ לא נכון.'}</span>
            {current.explanation}
          </div>
        )}

        {/* Action */}
        <div className="flex justify-end">
          {!checked ? (
            <button
              onClick={handleCheck}
              disabled={selected === null}
              className="px-7 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-30 disabled:cursor-not-allowed text-white text-xl font-semibold transition-all"
            >
              בדוק
            </button>
          ) : (
            <button
              onClick={handleNext}
              className="px-7 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xl font-semibold transition-all"
            >
              {isLast ? 'סיים ←' : 'הבא ←'}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

function ProgressDots({
  picked,
  currentIdx,
}: {
  picked: Question[]
  currentIdx: number
}) {
  return (
    <div className="flex items-center gap-2">
      {picked.map((_, i) => (
        <span
          key={i}
          className={`w-3 h-3 rounded-full transition-all ${
            i < currentIdx
              ? 'bg-emerald-500'
              : i === currentIdx
              ? 'bg-white'
              : 'bg-white/20'
          }`}
        />
      ))}
      <span className="text-slate-400 text-base mr-2">
        {currentIdx + 1} / {picked.length}
      </span>
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

  return (
    <div>
      {/* Score summary */}
      <div className="text-center mb-8">
        <div className="text-6xl mb-3">{emoji}</div>
        <div className="text-4xl font-black text-white mb-2">
          {score} / {total} נקודות
        </div>
        <div className="text-2xl text-slate-400 mb-5">{msg}</div>
        <div className="w-full bg-white/10 rounded-full h-4 overflow-hidden">
          <div
            className="h-4 rounded-full transition-all duration-700"
            style={{
              width: `${pct}%`,
              background:
                pct >= 80
                  ? 'linear-gradient(90deg, #10b981, #34d399)'
                  : pct >= 60
                  ? 'linear-gradient(90deg, #f59e0b, #fbbf24)'
                  : 'linear-gradient(90deg, #ef4444, #f87171)',
            }}
          />
        </div>
        <div className="text-slate-500 text-lg mt-2">{pct}%</div>
      </div>

      {/* Per-question breakdown */}
      <div className="space-y-3 mb-8">
        {picked.map((q, i) => {
          const correct = answers[i] === q.correct
          return (
            <div
              key={q.id}
              className={`rounded-xl px-5 py-4 border ${
                correct
                  ? 'border-emerald-500/30 bg-emerald-500/8'
                  : 'border-red-500/30 bg-red-500/8'
              }`}
            >
              <div className="flex items-start gap-3">
                <span
                  className={`text-xl mt-0.5 shrink-0 ${
                    correct ? 'text-emerald-400' : 'text-red-400'
                  }`}
                >
                  {correct ? '✓' : '✗'}
                </span>
                <div className="flex-1">
                  <p className="text-white text-lg font-medium mb-1">{q.text}</p>
                  {!correct && (
                    <p className="text-slate-400 text-base">
                      התשובה הנכונה:{' '}
                      <span className="text-emerald-400">{q.options[q.correct]}</span>
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
        className="w-full py-4 rounded-xl bg-white/6 border border-white/10 text-white text-xl hover:bg-white/10 transition-all"
      >
        נסה שוב עם שאלות אחרות
      </button>
    </div>
  )
}
