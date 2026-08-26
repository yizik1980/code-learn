import { View, Text, Pressable, FlatList, StyleSheet } from 'react-native'
import { useSignals } from '@preact/signals-react/runtime'
import type { NativeStackScreenProps } from '@react-navigation/native-stack'
import { courses } from '@codelearn/courses-data'
import type { RootStackParamList } from '../navigation/types'
import { getLessonProgress, getCourseStats } from '../store/progress'
import { colors } from '../theme'
import { brutalCard } from '../components/brutalStyle'

type Props = NativeStackScreenProps<RootStackParamList, 'CourseDetail'>

export default function CourseDetailScreen({ route, navigation }: Props) {
  useSignals()
  const { courseId } = route.params
  const course = courses.find((c) => c.id === courseId)

  if (!course || course.comingSoon) {
    return (
      <View style={styles.notFound}>
        <Text style={styles.notFoundText}>הקורס לא נמצא</Text>
      </View>
    )
  }

  const stats = getCourseStats(course.id, course.lessons.length)

  return (
    <View style={styles.screen}>
      <FlatList
        data={course.lessons}
        keyExtractor={(l) => l.id}
        contentContainerStyle={styles.listContent}
        ListHeaderComponent={
          <View style={{ marginBottom: 20 }}>
            <Text style={styles.emoji} aria-hidden>{course.emoji}</Text>
            <Text style={styles.title} accessibilityRole="header">{course.title}</Text>
            <Text style={styles.description}>{course.description}</Text>

            <View
              style={[styles.progressCard, brutalCard(colors.ink)]}
              accessibilityRole="progressbar"
              accessibilityValue={{ min: 0, max: 100, now: stats.percent }}
              accessibilityLabel={`התקדמות בקורס: ${stats.completed} מתוך ${stats.total} שיעורים${stats.maxScore > 0 ? `, ${stats.score} מתוך ${stats.maxScore} נקודות` : ''}`}
            >
              <View style={styles.progressCardHeader} aria-hidden>
                <Text style={{ fontWeight: '900', color: colors.ink }}>התקדמות</Text>
                <Text style={{ fontWeight: '900', color: course.color }}>
                  {stats.completed} / {stats.total} שיעורים
                </Text>
              </View>
              <View style={styles.progressTrack} aria-hidden>
                <View style={[styles.progressFill, { width: `${stats.percent}%`, backgroundColor: course.color }]} />
              </View>
              {stats.maxScore > 0 && (
                <Text style={styles.progressScore} aria-hidden>⭐ {stats.score} / {stats.maxScore} נקודות</Text>
              )}
            </View>
          </View>
        }
        renderItem={({ item: lesson, index: idx }) => {
          const prog = getLessonProgress(course.id, lesson.id)
          const lessonLabel = `שיעור ${idx + 1}: ${lesson.title}. ${lesson.summary}. ${
            prog?.completed ? `הושלם, ${prog.score} מתוך ${prog.total} נקודות` : 'טרם הושלם'
          }`
          return (
            <Pressable
              onPress={() => navigation.navigate('Lesson', { courseId: course.id, lessonId: lesson.id })}
              style={[
                styles.lessonCard,
                brutalCard(prog?.completed ? course.color : colors.ink),
                { backgroundColor: prog?.completed ? colors.greenBg : colors.white },
              ]}
              accessibilityRole="button"
              accessibilityLabel={lessonLabel}
            >
              <View
                style={[
                  styles.lessonBadge,
                  {
                    backgroundColor: prog?.completed ? course.color : '#f0ece4',
                    borderColor: prog?.completed ? course.color : colors.cardBorder,
                  },
                ]}
                aria-hidden
              >
                <Text style={{ color: prog?.completed ? colors.white : colors.inkSoft, fontWeight: '900' }}>
                  {prog?.completed ? '✓' : idx + 1}
                </Text>
              </View>
              <View style={{ flex: 1 }} aria-hidden>
                <Text style={styles.lessonTitle}>{lesson.emoji} {lesson.title}</Text>
                <Text style={styles.lessonSummary}>{lesson.summary}</Text>
              </View>
              {prog?.completed && (
                <View style={[styles.scoreBadge, { backgroundColor: course.color }]} aria-hidden>
                  <Text style={styles.scoreBadgeText}>{prog.score}/{prog.total}</Text>
                </View>
              )}
            </Pressable>
          )
        }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.bg },
  listContent: { padding: 18, paddingBottom: 40 },
  emoji: { fontSize: 40, marginBottom: 8, textAlign: 'right' },
  title: { fontSize: 26, fontWeight: '900', color: colors.ink, marginBottom: 6, textAlign: 'right' },
  description: { color: colors.inkSoft, fontSize: 15, marginBottom: 16, textAlign: 'right' },
  progressCard: { padding: 16, backgroundColor: colors.white },
  progressCardHeader: { flexDirection: 'row-reverse', justifyContent: 'space-between', marginBottom: 10 },
  progressTrack: { height: 10, borderRadius: 8, backgroundColor: colors.border, borderWidth: 1.5, borderColor: colors.ink, overflow: 'hidden' },
  progressFill: { height: '100%', borderRadius: 8 },
  progressScore: { marginTop: 8, color: colors.inkFaint },
  lessonCard: { flexDirection: 'row-reverse', alignItems: 'center', gap: 12, padding: 14, marginBottom: 10 },
  lessonBadge: { width: 40, height: 40, borderRadius: 20, borderWidth: 2, alignItems: 'center', justifyContent: 'center' },
  lessonTitle: { fontWeight: '900', color: colors.ink, fontSize: 15, textAlign: 'right' },
  lessonSummary: { color: colors.inkFaint, fontSize: 13, textAlign: 'right' },
  scoreBadge: { borderWidth: 2, borderColor: colors.ink, borderRadius: 8, paddingHorizontal: 8, paddingVertical: 2 },
  scoreBadgeText: { color: colors.white, fontWeight: '900', fontSize: 12 },
  notFound: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.bg },
  notFoundText: { fontWeight: '900', fontSize: 18, color: colors.ink },
})
