import { useState, useEffect, useRef } from 'react'
import { fetchNotes, createNote, deleteNote } from '../utils/notesApi'
import { getUserToken } from '../utils/userToken'
import type { Note } from '../utils/notesApi'

interface Props {
  courseId: string
  lessonId: string
  color?: string
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleString('he-IL', {
    day: '2-digit', month: '2-digit', year: '2-digit',
    hour: '2-digit', minute: '2-digit',
  })
}

export default function NoteBox({ courseId, lessonId, color = '#10b981' }: Props) {
  const userToken = getUserToken()
  const [notes, setNotes] = useState<Note[]>([])
  const [text, setText] = useState('')
  const [saving, setSaving] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    setLoading(true)
    fetchNotes(userToken, courseId, lessonId)
      .then(setNotes)
      .catch(() => setError('לא ניתן לטעון הערות'))
      .finally(() => setLoading(false))
  }, [courseId, lessonId])

  async function handleSave() {
    if (!text.trim()) return
    setSaving(true)
    setError(null)
    try {
      const note = await createNote(userToken, courseId, lessonId, text)
      setNotes((prev) => [...prev, note])
      setText('')
      textareaRef.current?.focus()
    } catch {
      setError('שמירה נכשלה — נסה שוב')
    } finally {
      setSaving(false)
    }
  }

  async function handleDelete(id: number) {
    await deleteNote(id, userToken)
    setNotes((prev) => prev.filter((n) => n.id !== id))
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') handleSave()
  }

  return (
    <div
      className="mt-8"
      style={{
        background: '#fff',
        border: '2px solid #1c1c2e',
        boxShadow: '4px 4px 0 #1c1c2e',
        borderRadius: 16,
        overflow: 'hidden',
      }}
    >
      {/* Header */}
      <div
        className="px-5 py-3 flex items-center gap-2"
        style={{ background: '#1c1c2e', borderBottom: '2px solid #1c1c2e' }}
      >
        <span style={{ fontSize: '1.2rem' }}>📝</span>
        <h3 className="font-black" style={{ color: '#fff', fontSize: '1rem' }}>
          הערות שלי
        </h3>
        {notes.length > 0 && (
          <span
            className="font-black"
            style={{
              background: color,
              color: '#fff',
              borderRadius: 6,
              padding: '1px 8px',
              fontSize: '0.8rem',
              marginRight: 'auto',
            }}
          >
            {notes.length}
          </span>
        )}
      </div>

      <div className="px-5 py-4">
        {/* Saved notes */}
        {loading ? (
          <p style={{ color: '#a0998c', fontSize: '0.9rem' }}>טוען הערות...</p>
        ) : (
          notes.length > 0 && (
            <div className="space-y-2 mb-4">
              {notes.map((note) => (
                <div
                  key={note.id}
                  className="flex items-start gap-3 rounded-xl px-4 py-3"
                  style={{
                    background: '#fef9f0',
                    border: '1.5px solid #e8e4dc',
                  }}
                >
                  <div className="flex-1 min-w-0">
                    <p
                      className="leading-relaxed whitespace-pre-wrap"
                      style={{ color: '#2a2a3e', fontSize: '0.95rem' }}
                    >
                      {note.content}
                    </p>
                    <p className="mt-1" style={{ color: '#a0998c', fontSize: '0.78rem' }}>
                      {formatDate(note.created_at)}
                    </p>
                  </div>
                  <button
                    onClick={() => handleDelete(note.id)}
                    className="shrink-0 w-7 h-7 flex items-center justify-center transition-opacity hover:opacity-70"
                    style={{
                      background: '#fef2f2',
                      border: '1.5px solid #fca5a5',
                      borderRadius: 7,
                      color: '#ef4444',
                      fontSize: '0.8rem',
                    }}
                    title="מחק הערה"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          )
        )}

        {/* Input */}
        <textarea
          ref={textareaRef}
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="כתוב הערה לשיעור הזה... (Ctrl+Enter לשמירה)"
          rows={3}
          style={{
            width: '100%',
            resize: 'vertical',
            background: '#fef9f0',
            border: '2px solid #c4b8a4',
            borderRadius: 10,
            padding: '10px 14px',
            fontSize: '0.95rem',
            color: '#1c1c2e',
            fontFamily: 'inherit',
            outline: 'none',
            boxSizing: 'border-box',
          }}
          onFocus={(e) => (e.currentTarget.style.borderColor = color)}
          onBlur={(e) => (e.currentTarget.style.borderColor = '#c4b8a4')}
        />

        {error && (
          <p className="mt-1" style={{ color: '#ef4444', fontSize: '0.85rem' }}>
            {error}
          </p>
        )}

        <div className="flex justify-end mt-2">
          <button
            onClick={handleSave}
            disabled={saving || !text.trim()}
            className="brutal-btn px-5 py-2 font-black"
            style={{
              background: text.trim() ? color : '#e8e4dc',
              color: text.trim() ? '#fff' : '#a0998c',
              fontSize: '0.95rem',
              cursor: text.trim() ? 'pointer' : 'not-allowed',
            }}
          >
            {saving ? 'שומר...' : 'שמור הערה ←'}
          </button>
        </div>
      </div>
    </div>
  )
}
