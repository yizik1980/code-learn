import { useState } from 'react'
import { View, Text, Pressable, Modal, ScrollView, StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import type { Question } from '@codelearn/courses-data'
import type { LessonProgress } from '../store/progress'
import { colors } from '../theme'
import { brutalCard } from './brutalStyle'
import Quiz from './Quiz'

interface Props {
  questions: Question[]
  courseId: string
  lessonId: string
  progress?: LessonProgress
}

export default function QuizModal({ questions, courseId, lessonId, progress }: Props) {
  const [open, setOpen] = useState(false)
  const [quizKey, setQuizKey] = useState(0)
  const done = progress?.completed

  function handleOpen() {
    setQuizKey((k) => k + 1)
    setOpen(true)
  }

  return (
    <>
      <View style={[styles.card, brutalCard(colors.ink)]}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardHeaderEmoji}>🧠</Text>
          <View style={{ flex: 1 }}>
            <Text style={styles.cardHeaderTitle}>בחן את עצמך</Text>
            <Text style={styles.cardHeaderSub}>{Math.min(5, questions.length)} שאלות אקראיות מתוך {questions.length}</Text>
          </View>
          {done && (
            <View style={styles.doneBadge}>
              <Text style={styles.doneBadgeText}>{progress.score}/{progress.total} ✓</Text>
            </View>
          )}
        </View>
        <View style={styles.cardBody}>
          <Text style={{ color: colors.inkSoft }}>{done ? 'הבחינה הושלמה' : 'מוכן לבדוק את עצמך?'}</Text>
          <Pressable
            onPress={handleOpen}
            style={[styles.startBtn, { backgroundColor: done ? colors.white : colors.blue, borderColor: colors.ink }]}
          >
            <Text style={{ color: done ? colors.ink : colors.white, fontWeight: '900' }}>
              {done ? 'נסה שוב' : 'התחל בחינה ←'}
            </Text>
          </Pressable>
        </View>
      </View>

      <Modal visible={open} animationType="slide" onRequestClose={() => setOpen(false)}>
        <SafeAreaView style={{ flex: 1, backgroundColor: colors.bg }}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalHeaderTitle}>🧠 בחינה</Text>
            <Pressable style={styles.closeBtn} onPress={() => setOpen(false)}>
              <Text style={styles.closeBtnText}>✕</Text>
            </Pressable>
          </View>
          <ScrollView contentContainerStyle={{ padding: 18 }}>
            <Quiz
              key={quizKey}
              questions={questions}
              courseId={courseId}
              lessonId={lessonId}
              onComplete={(score, total) => {
                if (score === total) setTimeout(() => setOpen(false), 1800)
              }}
            />
          </ScrollView>
        </SafeAreaView>
      </Modal>
    </>
  )
}

const styles = StyleSheet.create({
  card: { marginTop: 20, overflow: 'hidden', backgroundColor: colors.white },
  cardHeader: { flexDirection: 'row-reverse', alignItems: 'center', gap: 10, backgroundColor: colors.ink, paddingHorizontal: 18, paddingVertical: 12 },
  cardHeaderEmoji: { fontSize: 20 },
  cardHeaderTitle: { color: colors.white, fontWeight: '900', textAlign: 'right' },
  cardHeaderSub: { color: '#9090b0', fontSize: 12, textAlign: 'right' },
  doneBadge: { backgroundColor: colors.green, borderWidth: 2, borderColor: colors.white, borderRadius: 8, paddingHorizontal: 10, paddingVertical: 2 },
  doneBadgeText: { color: colors.white, fontWeight: '900' },
  cardBody: { flexDirection: 'row-reverse', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 18, paddingVertical: 12 },
  startBtn: { borderWidth: 2, borderRadius: 10, paddingHorizontal: 18, paddingVertical: 10 },
  modalHeader: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.ink,
    paddingHorizontal: 18,
    paddingVertical: 14,
  },
  modalHeaderTitle: { color: colors.white, fontWeight: '900', fontSize: 16 },
  closeBtn: { width: 32, height: 32, borderRadius: 8, backgroundColor: 'rgba(255,255,255,0.1)', borderWidth: 1.5, borderColor: 'rgba(255,255,255,0.25)', alignItems: 'center', justifyContent: 'center' },
  closeBtnText: { color: colors.white, fontWeight: '900' },
})
