import { useState } from 'react'
import { View, Text, Pressable, Modal, ScrollView, StyleSheet } from 'react-native'
import { colors } from '../theme'
import { brutalCard } from './brutalStyle'

interface Props {
  headers: string[]
  rows: string[][]
  caption?: string
}

function extractTableName(caption: string): string {
  const match = caption.match(/[a-zA-Z_][a-zA-Z0-9_]*/)
  return match ? match[0] : 'my_table'
}

export default function TableModal({ headers, rows, caption = '' }: Props) {
  const [open, setOpen] = useState(false)
  const tableName = extractTableName(caption)

  return (
    <>
      <Pressable style={[styles.trigger, brutalCard(colors.ink)]} onPress={() => setOpen(true)}>
        <Text style={styles.triggerEmoji}>📊</Text>
        <Text style={styles.triggerLabel}>{caption || tableName}</Text>
        <View style={styles.triggerBadge}>
          <Text style={styles.triggerBadgeText}>
            {rows.length} שורות · {headers.length} עמודות
          </Text>
        </View>
      </Pressable>

      <Modal visible={open} transparent animationType="fade" onRequestClose={() => setOpen(false)}>
        <Pressable style={styles.overlay} onPress={() => setOpen(false)}>
          <Pressable style={[styles.dialog, brutalCard(colors.ink)]} onPress={(e) => e.stopPropagation()}>
            <View style={styles.dialogHeader}>
              <Text style={styles.dialogTitle}>📊 {caption || tableName}</Text>
              <Pressable style={styles.closeBtn} onPress={() => setOpen(false)}>
                <Text style={styles.closeBtnText}>✕</Text>
              </Pressable>
            </View>
            <ScrollView style={{ maxHeight: 420 }}>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <View>
                  <View style={styles.headerRow}>
                    {headers.map((h) => (
                      <Text key={h} style={styles.headerCell}>{h}</Text>
                    ))}
                  </View>
                  {rows.map((row, i) => (
                    <View
                      key={i}
                      style={[styles.dataRow, { backgroundColor: i % 2 === 0 ? colors.white : '#faf8f4' }]}
                    >
                      {row.map((cell, j) => (
                        <Text key={j} style={styles.dataCell}>{cell}</Text>
                      ))}
                    </View>
                  ))}
                </View>
              </ScrollView>
            </ScrollView>
          </Pressable>
        </Pressable>
      </Modal>
    </>
  )
}

const CELL_WIDTH = 110

const styles = StyleSheet.create({
  trigger: {
    marginVertical: 8,
    flexDirection: 'row-reverse',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: colors.white,
  },
  triggerEmoji: { fontSize: 20 },
  triggerLabel: { flex: 1, fontWeight: '700', color: colors.ink, textAlign: 'right' },
  triggerBadge: {
    backgroundColor: '#f0ece4',
    borderWidth: 1.5,
    borderColor: colors.cardBorder,
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  triggerBadgeText: { color: '#7a6a5a', fontSize: 12, fontWeight: '600' },
  overlay: { flex: 1, backgroundColor: 'rgba(28,28,46,0.6)', alignItems: 'center', justifyContent: 'center', padding: 16 },
  dialog: { width: '100%', maxWidth: 480, backgroundColor: colors.bg, overflow: 'hidden' },
  dialogHeader: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.ink,
    paddingHorizontal: 18,
    paddingVertical: 14,
  },
  dialogTitle: { color: colors.white, fontWeight: '900', fontSize: 16 },
  closeBtn: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderWidth: 1.5,
    borderColor: 'rgba(255,255,255,0.25)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeBtnText: { color: colors.white, fontWeight: '900' },
  headerRow: { flexDirection: 'row', backgroundColor: colors.ink },
  headerCell: {
    width: CELL_WIDTH,
    paddingHorizontal: 12,
    paddingVertical: 10,
    color: colors.green,
    fontFamily: 'monospace',
    fontWeight: '700',
  },
  dataRow: { flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: colors.border },
  dataCell: { width: CELL_WIDTH, paddingHorizontal: 12, paddingVertical: 10, color: '#3a3a50', fontFamily: 'monospace' },
})
