import { useState } from 'react'
import { setUserName, setUserAvatar } from '../signals/userName'

const AVATARS = [
  '🐶','🐱','🐭','🐰','🦊','🐻','🐼','🐨','🐯','🦁',
  '🐮','🐸','🐵','🐧','🦄','🐺','🦋','🐢','🦉','🐙',
  '🦅','🦖','🚀','🔥','💎','⚡','🌈','🎮','🎸','🦸',
]

interface Props {
  onClose: () => void
}

export default function NamePromptModal({ onClose }: Props) {
  const [step, setStep] = useState<'name' | 'avatar'>('name')
  const [name, setName] = useState('')
  const [avatar, setAvatar] = useState('🐶')

  function handleNameNext(e: React.FormEvent) {
    e.preventDefault()
    if (!name.trim()) return
    setStep('avatar')
  }

  function handleFinish() {
    setUserName(name.trim())
    setUserAvatar(avatar)
    onClose()
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ background: 'rgba(28,28,46,0.55)' }}
    >
      <div
        className="brutal-card flex flex-col gap-5 p-8"
        style={{ width: 360, background: '#fef9f0' }}
      >
        {step === 'name' ? (
          <form onSubmit={handleNameNext} className="flex flex-col gap-5">
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
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="הכנס את שמך..."
              maxLength={30}
              className="brutal-input w-full px-4 py-3 text-lg font-bold text-right"
              style={{ background: '#fff', color: '#1c1c2e' }}
            />
            <button
              type="submit"
              disabled={!name.trim()}
              className="brutal-btn w-full py-3 font-black text-lg"
              style={{
                background: name.trim() ? '#10b981' : '#c4b8a4',
                color: '#fff',
                cursor: name.trim() ? 'pointer' : 'not-allowed',
              }}
            >
              הבא →
            </button>
          </form>
        ) : (
          <div className="flex flex-col gap-5">
            <div className="text-5xl text-center">{avatar}</div>
            <h2 className="font-black text-2xl text-center" style={{ color: '#1c1c2e' }}>
              בחר אווטאר
            </h2>
            <p className="text-center text-sm" style={{ color: '#5a5a72' }}>
              יוצג לצד ההודעות שלך בצ'אט
            </p>
            <div className="grid grid-cols-6 gap-2">
              {AVATARS.map((em) => (
                <button
                  key={em}
                  onClick={() => setAvatar(em)}
                  className="flex items-center justify-center text-2xl"
                  style={{
                    height: 44,
                    borderRadius: 10,
                    border: avatar === em ? '2px solid #10b981' : '2px solid #e8e0d4',
                    background: avatar === em ? '#f0fdf9' : '#fff',
                    boxShadow: avatar === em ? '2px 2px 0 #10b981' : '1px 1px 0 #c4b8a4',
                    cursor: 'pointer',
                    transition: 'all 0.1s',
                  }}
                >
                  {em}
                </button>
              ))}
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setStep('name')}
                className="flex-1 py-3 font-black text-sm"
                style={{
                  background: '#fff',
                  color: '#1c1c2e',
                  border: '2px solid #1c1c2e',
                  boxShadow: '2px 2px 0 #1c1c2e',
                  borderRadius: 8,
                  cursor: 'pointer',
                }}
              >
                ← חזור
              </button>
              <button
                onClick={handleFinish}
                className="flex-1 py-3 font-black text-sm"
                style={{
                  background: '#10b981',
                  color: '#fff',
                  border: '2px solid #1c1c2e',
                  boxShadow: '2px 2px 0 #1c1c2e',
                  borderRadius: 8,
                  cursor: 'pointer',
                }}
              >
                בוא נתחיל! 🚀
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
