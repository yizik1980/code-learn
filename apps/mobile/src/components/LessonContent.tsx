import { View, Text, StyleSheet } from 'react-native'
import type { ContentBlock } from '@codelearn/courses-data'
import { colors } from '../theme'
import CodeBlock from './CodeBlock'
import TableModal from './TableModal'

interface Props {
  blocks: ContentBlock[]
}

export default function LessonContent({ blocks }: Props) {
  return (
    <View style={styles.wrap}>
      {blocks.map((block, i) => {
        switch (block.type) {
          case 'heading':
            return (
              <Text key={i} style={[styles.heading, i === 0 && { marginTop: 0 }]}>
                {block.text}
              </Text>
            )
          case 'text':
            return (
              <Text key={i} style={styles.text}>
                {block.text}
              </Text>
            )
          case 'tip':
            return (
              <View key={i} style={styles.tip}>
                <Text style={styles.tipEmoji}>💡</Text>
                <Text style={styles.tipText}>{block.text}</Text>
              </View>
            )
          case 'code':
            return <CodeBlock key={i} code={block.code ?? ''} caption={block.caption} />
          case 'table':
            return (
              <TableModal
                key={i}
                headers={block.headers ?? []}
                rows={block.rows ?? []}
                caption={block.caption}
              />
            )
          default:
            return null
        }
      })}
    </View>
  )
}

const styles = StyleSheet.create({
  wrap: { gap: 10 },
  heading: {
    fontSize: 22,
    fontWeight: '900',
    color: colors.ink,
    marginTop: 26,
    marginBottom: 4,
    textAlign: 'right',
  },
  text: { color: '#3a3a50', fontSize: 16, lineHeight: 24, textAlign: 'right' },
  tip: {
    flexDirection: 'row-reverse',
    gap: 10,
    marginVertical: 8,
    backgroundColor: colors.amberBg,
    borderWidth: 2,
    borderColor: colors.amber,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  tipEmoji: { fontSize: 18 },
  tipText: { flex: 1, color: colors.amberText, lineHeight: 22, textAlign: 'right' },
})
