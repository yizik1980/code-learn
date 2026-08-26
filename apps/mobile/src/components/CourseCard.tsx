import { View, Text, Pressable, StyleSheet } from 'react-native'
import type { Course } from '@codelearn/courses-data'
import { getCourseStats } from '../store/progress'
import { colors } from '../theme'
import { brutalCard } from './brutalStyle'

interface Props {
  course: Course
  onPress: () => void
}

export default function CourseCard({ course, onPress }: Props) {
  const stats = getCourseStats(course.id, course.lessons.length)
  const pct = stats.percent

  return (
    <Pressable onPress={onPress} style={[styles.card, brutalCard(colors.ink)]}>
      <View style={styles.headerRow}>
        <Text style={styles.emoji}>{course.emoji}</Text>
        {pct > 0 && (
          <View style={[styles.pctBadge, { backgroundColor: course.color }]}>
            <Text style={styles.pctBadgeText}>{pct}% הושלם</Text>
          </View>
        )}
      </View>

      <Text style={styles.title}>{course.title}</Text>
      <Text style={styles.description}>{course.description}</Text>

      <View style={styles.statsRow}>
        <Text style={styles.statsText}>{stats.completed} / {course.lessons.length} הושלמו</Text>
        <Text style={styles.statsText}>{course.lessons.length} שיעורים</Text>
      </View>

      <View style={styles.progressTrack}>
        <View style={[styles.progressFill, { width: `${pct}%`, backgroundColor: course.color }]} />
      </View>

      <View
        style={[
          styles.cta,
          { backgroundColor: pct === 0 ? course.color : colors.white, borderColor: colors.ink },
        ]}
      >
        <Text style={{ color: pct === 0 ? colors.white : colors.ink, fontWeight: '900' }}>
          {stats.completed === 0 ? 'התחל ללמוד ←' : 'המשך ←'}
        </Text>
      </View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  card: { padding: 18, marginBottom: 14, backgroundColor: colors.white },
  headerRow: { flexDirection: 'row-reverse', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 },
  emoji: { fontSize: 30 },
  pctBadge: { borderWidth: 2, borderColor: colors.ink, borderRadius: 8, paddingHorizontal: 10, paddingVertical: 2 },
  pctBadgeText: { color: colors.white, fontWeight: '900', fontSize: 12 },
  title: { fontSize: 19, fontWeight: '900', color: colors.ink, marginBottom: 4, textAlign: 'right' },
  description: { color: colors.inkSoft, fontSize: 14, marginBottom: 14, textAlign: 'right' },
  statsRow: { flexDirection: 'row-reverse', justifyContent: 'space-between', marginBottom: 10 },
  statsText: { color: colors.inkFaint, fontSize: 13 },
  progressTrack: { height: 8, borderRadius: 8, backgroundColor: colors.border, borderWidth: 1.5, borderColor: colors.ink, overflow: 'hidden', marginBottom: 14 },
  progressFill: { height: '100%', borderRadius: 8 },
  cta: { borderWidth: 2, borderRadius: 10, paddingVertical: 11, alignItems: 'center' },
})
