import { View, Text, ScrollView, StyleSheet } from 'react-native'
import { colors } from '../theme'

interface Props {
  code: string
  caption?: string
}

export default function CodeBlock({ code, caption }: Props) {
  return (
    <View style={styles.wrap}>
      {caption && (
        <View style={styles.captionBar}>
          <View style={[styles.dot, { backgroundColor: '#ef444480' }]} />
          <View style={[styles.dot, { backgroundColor: '#eab30880' }]} />
          <View style={[styles.dot, { backgroundColor: '#22c55e80' }]} />
          <Text style={styles.captionText}>{caption}</Text>
        </View>
      )}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.codeScroll}>
        <Text style={styles.codeText}>{code.trim()}</Text>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  wrap: { marginVertical: 10, borderRadius: 12, overflow: 'hidden' },
  captionBar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#1e2433',
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
  dot: { width: 10, height: 10, borderRadius: 5 },
  captionText: { color: '#94a3b8', marginRight: 6, fontSize: 12 },
  codeScroll: { backgroundColor: colors.code },
  codeText: {
    color: '#e6edf3',
    fontFamily: 'monospace',
    fontSize: 14,
    lineHeight: 22,
    padding: 16,
  },
})
