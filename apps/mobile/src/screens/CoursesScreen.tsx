import { useState } from 'react'
import { View, Text, TextInput, FlatList, StyleSheet } from 'react-native'
import { useSignals } from '@preact/signals-react/runtime'
import type { NativeStackScreenProps } from '@react-navigation/native-stack'
import { courses } from '@codelearn/courses-data'
import type { RootStackParamList } from '../navigation/types'
import { globalStatsSignal } from '../store/progress'
import { colors } from '../theme'
import CourseCard from '../components/CourseCard'

type Props = NativeStackScreenProps<RootStackParamList, 'Courses'>

export default function CoursesScreen({ navigation }: Props) {
  useSignals()
  const [search, setSearch] = useState('')
  const stats = globalStatsSignal.value

  const available = courses.filter((c) => !c.comingSoon)
  const filtered = search.trim()
    ? available.filter(
        (c) => c.title.toLowerCase().includes(search.toLowerCase()) || c.description.includes(search),
      )
    : available

  return (
    <View style={styles.screen}>
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <Text style={styles.logo} accessibilityRole="header">
            👨‍💻 Code<Text style={styles.logoBadge}> Learn </Text>
          </Text>
          {stats.totalMax > 0 && (
            <View style={styles.scoreBadge} accessibilityLabel={`ניקוד כולל: ${stats.totalScore} מתוך ${stats.totalMax}`}>
              <Text style={styles.scoreBadgeText} aria-hidden>⭐ {stats.totalScore}/{stats.totalMax}</Text>
            </View>
          )}
        </View>
        <TextInput
          value={search}
          onChangeText={setSearch}
          placeholder="חיפוש קורס..."
          placeholderTextColor="#8a8aa0"
          style={styles.search}
          accessibilityLabel="חיפוש קורס"
          accessibilityHint="הקלד כדי לסנן את רשימת הקורסים"
        />
      </View>

      <FlatList
        data={filtered}
        keyExtractor={(c) => c.id}
        contentContainerStyle={styles.listContent}
        ListHeaderComponent={<Text style={styles.sectionTitle} accessibilityRole="header">קורסים זמינים</Text>}
        ListEmptyComponent={<Text style={styles.empty}>לא נמצאו קורסים עבור "{search}"</Text>}
        renderItem={({ item }) => (
          <CourseCard course={item} onPress={() => navigation.navigate('CourseDetail', { courseId: item.id })} />
        )}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.bg },
  header: { backgroundColor: colors.ink, paddingHorizontal: 16, paddingTop: 12, paddingBottom: 14 },
  headerTop: { flexDirection: 'row-reverse', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 },
  logo: { color: colors.white, fontWeight: '900', fontSize: 18 },
  logoBadge: { backgroundColor: colors.green, color: colors.white, borderRadius: 8, overflow: 'hidden' },
  scoreBadge: { backgroundColor: colors.bg, borderWidth: 2, borderColor: colors.green, borderRadius: 8, paddingHorizontal: 10, paddingVertical: 4 },
  scoreBadgeText: { color: colors.ink, fontWeight: '900', fontSize: 13 },
  search: {
    backgroundColor: '#2d2d40',
    borderWidth: 2,
    borderColor: '#3d3d54',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 9,
    color: colors.bg,
    fontWeight: '600',
    textAlign: 'right',
  },
  listContent: { padding: 16, paddingBottom: 40 },
  sectionTitle: { fontSize: 20, fontWeight: '900', color: colors.ink, marginBottom: 14, textAlign: 'right' },
  empty: { textAlign: 'center', paddingVertical: 40, color: '#a0998c', fontWeight: '700' },
})
