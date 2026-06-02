import { useState } from 'react'
import { setUserName } from '../signals/userName'

interface Props {
  onClose: () => void
}

export default function NamePromptModal({ onClose }: Props) {
  const [value, setValue] = useState('')

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const trimmed = value.trim()
    if (!trimmed) return
    setUserName(trimmed)
    onClose()
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ background: 'rgba(28,28,46,0.55)' }}
    >
      <form
        onSubmit={handleSubmit}
        className="brutal-card flex flex-col gap-5 p-8"
        style={{ width: 340, background: '#fef9f0' }}
      >
        <div className="text-5xl text-center">👋</div>
        <h2 className="font-black text-2xl text-center" style={{ color: '#1c1c2e' }}>
          היי! מה שמך?
        </h2>
        <p className="text-center text-sm" style={{ color: '#5a5a72' }}>
          נשתמש בשמך כדי לברך אותך בכל כניסה
        </p>
        <input
          autoFocus
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="הכנס את שמך..."
          maxLength={30}
          className="brutal-input w-full px-4 py-3 text-lg font-bold text-right"
          style={{ background: '#fff', color: '#1c1c2e' }}
        />
        <button
          type="submit"
          disabled={!value.trim()}
          className="brutal-btn w-full py-3 font-black text-lg"
          style={{
            background: value.trim() ? '#10b981' : '#c4b8a4',
            color: '#fff',
            cursor: value.trim() ? 'pointer' : 'not-allowed',
          }}
        >
          בוא נתחיל!
        </button>
      </form>
    </div>
  )
}
