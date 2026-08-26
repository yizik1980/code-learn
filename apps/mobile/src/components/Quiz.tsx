import { useState, useMemo } from 'react'
import { View, Text, Pressable, StyleSheet } from 'react-native'
import type { Question } from '@codelearn/courses-data'
import { pickRandom, calcScore } from '../utils/quiz'
import { saveProgress } from '../store/progress'
import { colors } from '../theme'

interface Props {
  questions: Question[]
  courseId: string
  lessonId: string
  onComplete?: (score: number, total: number) => void
}

const QUIZ_SIZE = 5

export default function Quiz({ questions, courseId, lessonId, onComplete }: Props) {
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
    return <QuizResults picked={picked} answers={answers} score={score} total={picked.length} pct={pct} onRetry={handleRetry} />
  }

  const isCorrect = checked && selected === current.correct
  const isWrong = checked && selected !== current.correct

  return (
    <View>
      <View style={styles.progressRow}>
        <Text style={styles.progressLabel}>שאלה {currentIdx + 1} מתוך {picked.length}</Text>
        <View style={styles.dots}>
          {picked.map((_, i) => (
            <View
              key={i}
              style={[
                styles.dot,
                {
                  backgroundColor: i < currentIdx ? colors.green : i === currentIdx ? colors.ink : '#e0e0e8',
                  borderColor: i < currentIdx ? colors.green : i === currentIdx ? colors.ink : '#c0c0cc',
                },
              ]}
            />
          ))}
        </View>
      </View>

      <Text style={styles.question}>{current.text}</Text>

      <View style={{ gap: 8, marginBottom: 16 }}>
        {current.options.map((opt, i) => {
          let bg: string = colors.white
          let border = '#c4c4cc'
          let textColor = '#3a3a50'

          if (!checked) {
            if (selected === i) {
              bg = colors.blueBg
              border = colors.blue
              textColor = colors.blueText
            }
          } else if (i === current.correct) {
            bg = colors.greenBg
            border = colors.green
            textColor = colors.greenText
          } else if (selected === i && isWrong) {
            bg = colors.redBg
            border = colors.red
            textColor = colors.redText
          } else {
            bg = '#f8f8f8'
            border = '#e0e0e8'
            textColor = '#a0a0b8'
          }

          return (
            <Pressable
              key={i}
              onPress={() => handleSelect(i)}
              style={[styles.option, { backgroundColor: bg, borderColor: border }]}
            >
              <View style={[styles.optionLetter, { borderColor: border }]}>
                <Text style={{ color: textColor, fontWeight: '900' }}>{String.fromCharCode(65 + i)}</Text>
              </View>
              <Text style={{ flex: 1, color: textColor, fontWeight: '600', textAlign: 'right' }}>{opt}</Text>
              {checked && i === current.correct && <Text style={{ color: colors.green, fontWeight: '900' }}>✓</Text>}
              {checked && selected === i && isWrong && <Text style={{ color: colors.red, fontWeight: '900' }}>✗</Text>}
            </Pressable>
          )
        })}
      </View>

      {checked && (
        <View
          style={[
            styles.explanation,
            { backgroundColor: isCorrect ? colors.greenBg : colors.redBg, borderColor: isCorrect ? colors.green : colors.red },
          ]}
        >
          <Text style={{ color: isCorrect ? colors.greenText : colors.redText, lineHeight: 22 }}>
            <Text style={{ fontWeight: '900' }}>{isCorrect ? '✓ נכון! ' : '✗ לא נכון. '}</Text>
            {current.explanation}
          </Text>
        </View>
      )}

      <View style={{ alignItems: 'flex-end' }}>
        {!checked ? (
          <Pressable
            onPress={handleCheck}
            disabled={selected === null}
            style={[styles.actionBtn, { backgroundColor: colors.blue, opacity: selected === null ? 0.5 : 1 }]}
          >
            <Text style={styles.actionBtnText}>בדוק</Text>
          </Pressable>
        ) : (
          <Pressable onPress={handleNext} style={[styles.actionBtn, { backgroundColor: colors.green }]}>
            <Text style={styles.actionBtnText}>{isLast ? 'סיים ←' : 'הבא ←'}</Text>
          </Pressable>
        )}
      </View>
    </View>
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
    pct === 100 ? 'מושלם! שלטת בחומר!' : pct >= 80 ? 'כל הכבוד!' : pct >= 60 ? 'לא רע! כדאי לחזור על הנושאים שפספסת' : 'נסה שוב — הצלחה!'
  const scoreColor = pct >= 80 ? colors.green : pct >= 60 ? colors.amber : colors.red

  return (
    <View>
      <View style={{ alignItems: 'center', marginBottom: 20 }}>
        <Text style={{ fontSize: 44 }}>{emoji}</Text>
        <Text style={{ fontSize: 28, fontWeight: '900', color: colors.ink, marginTop: 6 }}>
          {score} / {total} נקודות
        </Text>
        <Text style={{ color: colors.inkSoft, marginTop: 4, marginBottom: 12 }}>{msg}</Text>
        <View style={styles.scoreBarTrack}>
          <View style={[styles.scoreBarFill, { width: `${pct}%`, backgroundColor: scoreColor }]} />
        </View>
        <Text style={{ color: scoreColor, fontWeight: '700', marginTop: 4 }}>{pct}%</Text>
      </View>

      <View style={{ gap: 8, marginBottom: 20 }}>
        {picked.map((q, i) => {
          const correct = answers[i] === q.correct
          return (
            <View
              key={q.id}
              style={{
                borderRadius: 12,
                paddingHorizontal: 14,
                paddingVertical: 10,
                backgroundColor: correct ? colors.greenBg : colors.redBg,
                borderWidth: 2,
                borderColor: correct ? colors.green : colors.red,
              }}
            >
              <View style={{ flexDirection: 'row-reverse', gap: 8 }}>
                <Text style={{ color: correct ? colors.green : colors.red, fontWeight: '900' }}>{correct ? '✓' : '✗'}</Text>
                <View style={{ flex: 1 }}>
                  <Text style={{ fontWeight: '600', color: colors.ink, textAlign: 'right' }}>{q.text}</Text>
                  {!correct && (
                    <Text style={{ color: colors.inkFaint, marginTop: 2, textAlign: 'right' }}>
                      התשובה הנכונה: <Text style={{ fontWeight: '700', color: colors.green }}>{q.options[q.correct]}</Text>
                    </Text>
                  )}
                </View>
              </View>
            </View>
          )
        })}
      </View>

      <Pressable onPress={onRetry} style={styles.retryBtn}>
        <Text style={{ color: colors.ink, fontWeight: '700' }}>נסה שוב עם שאלות אחרות</Text>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  progressRow: { flexDirection: 'row-reverse', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 },
  progressLabel: { color: colors.inkFaint },
  dots: { flexDirection: 'row-reverse', gap: 6 },
  dot: { width: 10, height: 10, borderRadius: 5, borderWidth: 1.5 },
  question: { fontWeight: '700', color: colors.ink, marginBottom: 16, lineHeight: 24, textAlign: 'right' },
  option: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    gap: 10,
    borderWidth: 2,
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  optionLetter: {
    width: 26,
    height: 26,
    borderRadius: 13,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  explanation: { borderRadius: 12, borderWidth: 2, paddingHorizontal: 14, paddingVertical: 10, marginBottom: 16 },
  actionBtn: { borderRadius: 10, paddingHorizontal: 22, paddingVertical: 12, borderWidth: 2, borderColor: colors.ink },
  actionBtnText: { color: colors.white, fontWeight: '900', fontSize: 15 },
  scoreBarTrack: { width: '100%', height: 12, borderRadius: 8, backgroundColor: colors.border, borderWidth: 2, borderColor: colors.ink, overflow: 'hidden' },
  scoreBarFill: { height: '100%', borderRadius: 8 },
  retryBtn: { width: '100%', paddingVertical: 12, borderRadius: 10, borderWidth: 2, borderColor: colors.ink, alignItems: 'center', backgroundColor: colors.white },
})
