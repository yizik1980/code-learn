import { View, Text, Pressable, ScrollView, StyleSheet } from 'react-native'
import { useSignals } from '@preact/signals-react/runtime'
import type { NativeStackScreenProps } from '@react-navigation/native-stack'
import { courses } from '@codelearn/courses-data'
import type { RootStackParamList } from '../navigation/types'
import { getLessonProgress } from '../store/progress'
import { colors } from '../theme'
import LessonContent from '../components/LessonContent'
import QuizModal from '../components/QuizModal'

type Props = NativeStackScreenProps<RootStackParamList, 'Lesson'>

export default function LessonScreen({ route, navigation }: Props) {
  useSignals()
  const { courseId, lessonId } = route.params
  const course = courses.find((c) => c.id === courseId)

  if (!course || course.comingSoon) {
    return (
      <View style={styles.notFound}>
        <Text style={styles.notFoundText}>הקורס לא נמצא</Text>
      </View>
    )
  }

  const lessonIdx = course.lessons.findIndex((l) => l.id === lessonId)
  const lesson = course.lessons[lessonIdx]
  const prevLesson = lessonIdx > 0 ? course.lessons[lessonIdx - 1] : null
  const nextLesson = lessonIdx < course.lessons.length - 1 ? course.lessons[lessonIdx + 1] : null
  const prog = getLessonProgress(course.id, lessonId)

  if (!lesson) {
    return (
      <View style={styles.notFound}>
        <Text style={styles.notFoundText}>השיעור לא נמצא</Text>
      </View>
    )
  }

  return (
    <View style={styles.screen}>
      <View style={styles.topBar}>
        <Text style={styles.crumb} numberOfLines={1}>
          {course.emoji} {course.title} / {lesson.emoji} {lesson.title}
        </Text>
        <View style={styles.crumbBadge}>
          <Text style={styles.crumbBadgeText}>{lessonIdx + 1} / {course.lessons.length}</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.emoji}>{lesson.emoji}</Text>
        <Text style={styles.title}>{lesson.title}</Text>
        <Text style={styles.summary}>{lesson.summary}</Text>
        {prog?.completed && (
          <View style={[styles.doneBadge, { borderColor: course.color }]}>
            <Text style={{ color: course.color, fontWeight: '700' }}>
              הושלם · {prog.score}/{prog.total} נקודות
            </Text>
          </View>
        )}

        <View style={{ marginTop: 18 }}>
          <LessonContent blocks={lesson.content} />
        </View>

        <QuizModal questions={lesson.questionBank} courseId={course.id} lessonId={lesson.id} progress={prog} />

        <View style={styles.navRow}>
          {prevLesson ? (
            <Pressable
              onPress={() => navigation.push('Lesson', { courseId: course.id, lessonId: prevLesson.id })}
              style={styles.navBtn}
            >
              <Text style={styles.navBtnLabel}>שיעור קודם</Text>
              <Text style={styles.navBtnTitle}>{prevLesson.title}</Text>
            </Pressable>
          ) : (
            <View style={{ flex: 1 }} />
          )}

          {nextLesson ? (
            <Pressable
              onPress={() => navigation.push('Lesson', { courseId: course.id, lessonId: nextLesson.id })}
              style={[styles.navBtn, { backgroundColor: course.color, borderColor: course.color }]}
            >
              <Text style={[styles.navBtnLabel, { color: 'rgba(255,255,255,0.75)' }]}>שיעור הבא</Text>
              <Text style={[styles.navBtnTitle, { color: colors.white }]}>{nextLesson.title}</Text>
            </Pressable>
          ) : (
            <Pressable onPress={() => navigation.goBack()} style={[styles.navBtn, { backgroundColor: colors.amber, borderColor: colors.ink }]}>
              <Text style={[styles.navBtnLabel, { color: '#7a6a30' }]}>הקורס הושלם 🏆</Text>
              <Text style={styles.navBtnTitle}>חזרה לסיכום</Text>
            </Pressable>
          )}
        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.bg },
  topBar: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 10,
    backgroundColor: colors.bg,
    borderBottomWidth: 2,
    borderBottomColor: colors.ink,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  crumb: { flex: 1, fontWeight: '900', color: colors.ink, textAlign: 'right' },
  crumbBadge: { backgroundColor: colors.ink, borderRadius: 8, paddingHorizontal: 10, paddingVertical: 3 },
  crumbBadgeText: { color: colors.bg, fontWeight: '700', fontSize: 12 },
  content: { padding: 18, paddingBottom: 48 },
  emoji: { fontSize: 34, textAlign: 'right' },
  title: { fontSize: 24, fontWeight: '900', color: colors.ink, marginTop: 4, textAlign: 'right' },
  summary: { color: colors.inkSoft, marginTop: 4, textAlign: 'right' },
  doneBadge: { alignSelf: 'flex-end', marginTop: 10, borderWidth: 2, borderRadius: 10, paddingHorizontal: 12, paddingVertical: 4, backgroundColor: colors.greenBg },
  navRow: { flexDirection: 'row', gap: 12, marginTop: 30, paddingTop: 18, borderTopWidth: 2, borderTopColor: colors.border },
  navBtn: { flex: 1, borderWidth: 2, borderColor: colors.ink, borderRadius: 10, paddingHorizontal: 14, paddingVertical: 10, backgroundColor: colors.white },
  navBtnLabel: { fontSize: 12, color: colors.inkFaint, textAlign: 'right' },
  navBtnTitle: { fontWeight: '700', color: colors.ink, textAlign: 'right' },
  notFound: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.bg },
  notFoundText: { fontWeight: '900', fontSize: 18, color: colors.ink },
})
