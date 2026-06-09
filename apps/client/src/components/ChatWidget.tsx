import { useState, useEffect, useRef, useCallback } from 'react'
import { useSignals } from '@preact/signals-react/runtime'
import { getUserData } from '../utils/userStorage'
import { userAvatarSignal, setUserAvatar } from '../signals/userName'
import { getMessages, addMessage, clearMessages } from '../utils/chatDb'

import type { ChatMessage } from '../utils/chatDb'

const AVATARS = [
  '🐶','🐱','🐭','🐰','🦊','🐻','🐼','🐨','🐯','🦁',
  '🐮','🐸','🐵','🐧','🦄','🐺','🦋','🐢','🦉','🐙',
  '🦅','🦖','🚀','🔥','💎','⚡','🌈','🎮','🎸','🦸',
]

const apiBase = (import.meta.env.VITE_API_URL as string | undefined) || 'http://localhost:3001'
const WS_URL = apiBase.replace(/^http/, 'ws') + '/ws/chat'
const RECONNECT_MS = 3000
const ORIGINAL_TITLE = document.title

function formatTime(at: number) {
  return new Date(at).toLocaleTimeString('he-IL', { hour: '2-digit', minute: '2-digit' })
}

function playSend() {
  const ctx = new AudioContext()
  const osc = ctx.createOscillator()
  const gain = ctx.createGain()
  osc.connect(gain)
  gain.connect(ctx.destination)
  osc.type = 'sine'
  osc.frequency.setValueAtTime(880, ctx.currentTime)
  osc.frequency.exponentialRampToValueAtTime(660, ctx.currentTime + 0.12)
  gain.gain.setValueAtTime(0.25, ctx.currentTime)
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.12)
  osc.start(ctx.currentTime)
  osc.stop(ctx.currentTime + 0.12)
  osc.onended = () => ctx.close()
}

function playReceive() {
  const ctx = new AudioContext()
  const gain = ctx.createGain()
  gain.connect(ctx.destination)
  gain.gain.setValueAtTime(0.2, ctx.currentTime)
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.28)
  ;[440, 550].forEach((freq, i) => {
    const osc = ctx.createOscillator()
    osc.connect(gain)
    osc.type = 'sine'
    osc.frequency.setValueAtTime(freq, ctx.currentTime + i * 0.1)
    osc.start(ctx.currentTime + i * 0.1)
    osc.stop(ctx.currentTime + i * 0.1 + 0.12)
    osc.onended = () => { if (i === 1) ctx.close() }
  })
}

function requestNotificationPermission() {
  if ('Notification' in window && Notification.permission === 'default') {
    Notification.requestPermission()
  }
}

function sendDesktopNotification(name: string, avatar: string, text: string) {
  if (!('Notification' in window) || Notification.permission !== 'granted') return
  new Notification(`${avatar} ${name}`, { body: text, icon: '/favicon.ico' })
}

export default function ChatWidget() {
  useSignals()
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [unread, setUnread] = useState(0)
  const [input, setInput] = useState('')
  const [connected, setConnected] = useState(false)
  const [avatarPickerOpen, setAvatarPickerOpen] = useState(false)
  const wsRef = useRef<WebSocket | null>(null)
  const reconnectRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const openRef = useRef(false)
  const bottomRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const userData = getUserData()
  const userId = userData.token.slice(0, 8)
  const userName = userData.name || 'אנונימי'
  const myAvatar = userAvatarSignal.value

  useEffect(() => {
    getMessages().then((msgs) => {
      setMessages(msgs)
      if (!localStorage.getItem('cl_welcomed')) {
        localStorage.setItem('cl_welcomed', '1')
        const welcome: ChatMessage = {
          id: 'welcome-' + Date.now(),
          text: 'ברוך בואך לאתר יחודי שמשתדל להתייעל כל יום 🙌\nאם יש איזה נושא או תת-נושא שהיית רוצה לעדכן — אשמח אם תשאיר הודעה בצ\'אט!',
          userId: 'system',
          name: 'צוות CodeLearn',
          avatar: '👨‍💻',
          at: Date.now(),
          direction: 'in',
        }
        addMessage(welcome)
        setMessages((prev) => [...prev, welcome])
      }
    })
  }, [])

  useEffect(() => { requestNotificationPermission() }, [])

  useEffect(() => { openRef.current = open }, [open])

  // Document title
  useEffect(() => {
    document.title = !open && unread > 0 ? `(${unread}) ${ORIGINAL_TITLE}` : ORIGINAL_TITLE
    return () => { document.title = ORIGINAL_TITLE }
  }, [unread, open])

  const connect = useCallback(() => {
    const ws = new WebSocket(WS_URL)
    wsRef.current = ws
    ws.onopen = () => setConnected(true)
    ws.onmessage = (e: MessageEvent) => {
      try {
        const data = JSON.parse(e.data as string)
        if (data.type !== 'message') return
        const isOwn = data.userId === userId
        const msg: ChatMessage = {
          id: data.id,
          text: data.text,
          userId: data.userId,
          name: data.name,
          avatar: data.avatar || '🐶',
          at: data.at,
          direction: isOwn ? 'out' : 'in',
        }
        setMessages((prev) => [...prev, msg])
        addMessage(msg)
        if (isOwn) {
          playSend()
        } else {
          playReceive()
          if (!openRef.current) {
            setUnread((n) => n + 1)
            if (!document.hasFocus()) sendDesktopNotification(msg.name, msg.avatar, msg.text)
          }
        }
      } catch {}
    }
    ws.onclose = () => {
      setConnected(false)
      reconnectRef.current = setTimeout(connect, RECONNECT_MS)
    }
    ws.onerror = () => ws.close()
  }, [userId])

  useEffect(() => {
    connect()
    return () => {
      if (reconnectRef.current) clearTimeout(reconnectRef.current)
      wsRef.current?.close()
    }
  }, [connect])

  function handleOpen() {
    setOpen((v) => {
      if (!v) setUnread(0)
      return !v
    })
    setAvatarPickerOpen(false)
  }

  useEffect(() => {
    if (open) {
      bottomRef.current?.scrollIntoView()
      inputRef.current?.focus()
    }
  }, [open, messages.length])

  function send() {
    const text = input.trim()
    if (!text || wsRef.current?.readyState !== WebSocket.OPEN) return
    wsRef.current.send(JSON.stringify({ type: 'message', text, userId, name: userName, avatar: myAvatar }))
    setInput('')
  }

  function handleKey(e: React.KeyboardEvent) {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send() }
  }

  return (
    <>
      {/* Popup */}
      {open && (
        <div
          role="dialog"
          aria-label="צ'אט"
          aria-modal="true"
          className="fixed z-50 flex flex-col"
          style={{
            bottom: 88,
            left: 24,
            width: 360,
            height: 480,
            background: '#fef9f0',
            border: '2px solid #1c1c2e',
            boxShadow: '6px 6px 0 #1c1c2e',
            borderRadius: 16,
          }}
        >
          {/* Header */}
          <div
            className="relative flex items-center justify-between px-4 py-3"
            style={{ background: '#1c1c2e', borderRadius: '14px 14px 0 0', color: '#fef9f0' }}
          >
            <div className="flex items-center gap-2">
              <span className="text-xl">💬</span>
              <span className="font-black text-sm">צ'אט</span>
              <span
                className="w-2 h-2 rounded-full"
                style={{ background: connected ? '#10b981' : '#f59e0b' }}
              />
            </div>

            <div className="flex items-center gap-3">
              {/* Avatar picker button */}
              <button
                onClick={() => setAvatarPickerOpen((v) => !v)}
                title="שנה אווטאר"
                aria-label="שנה אווטאר"
                aria-expanded={avatarPickerOpen}
                className="text-xl leading-none"
                style={{ background: 'none', border: 'none', cursor: 'pointer' }}
              >
                {myAvatar}
              </button>
              <button
                onClick={() => { clearMessages(); setMessages([]) }}
                aria-label="נקה את כל ההודעות"
                className="text-xs opacity-60 hover:opacity-100"
                style={{ color: '#fef9f0' }}
              >
                נקה
              </button>
              <button
                onClick={() => setOpen(false)}
                title="סגור צ'אט"
                className="flex items-center justify-center opacity-70 hover:opacity-100"
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: '#fef9f0',
                  fontSize: 18,
                  lineHeight: 1,
                  padding: '0 2px',
                }}
              >
                ✕
              </button>
            </div>

            {/* Avatar picker dropdown */}
            {avatarPickerOpen && (
              <div
                className="absolute top-full left-0 right-0 z-10 p-3"
                style={{
                  background: '#fef9f0',
                  border: '2px solid #1c1c2e',
                  borderTop: 'none',
                  borderRadius: '0 0 12px 12px',
                  boxShadow: '4px 4px 0 #1c1c2e',
                }}
              >
                <p className="text-xs font-bold mb-2 text-right" style={{ color: '#5a5a72' }}>
                  בחר אווטאר
                </p>
                <div className="grid grid-cols-6 gap-1">
                  {AVATARS.map((em) => (
                    <button
                      key={em}
                      onClick={() => { setUserAvatar(em); setAvatarPickerOpen(false) }}
                      className="flex items-center justify-center text-xl"
                      style={{
                        height: 38,
                        borderRadius: 8,
                        border: myAvatar === em ? '2px solid #10b981' : '2px solid #e8e0d4',
                        background: myAvatar === em ? '#f0fdf9' : '#fff',
                        cursor: 'pointer',
                        transition: 'all 0.1s',
                      }}
                    >
                      {em}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-3 py-3 flex flex-col gap-3" role="log" aria-live="polite" aria-label="הודעות צ'אט">
            {messages.length === 0 && (
              <p className="text-center text-sm mt-8" style={{ color: '#a0998c' }}>
                אין הודעות עדיין — שלח משהו!
              </p>
            )}
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex items-end gap-2 ${msg.direction === 'out' ? 'flex-row-reverse' : 'flex-row'}`}
              >
                {/* Avatar */}
                <span
                  className="flex-shrink-0 flex items-center justify-center text-lg"
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: 8,
                    border: '2px solid #1c1c2e',
                    background: '#fff',
                    boxShadow: '1px 1px 0 #1c1c2e',
                  }}
                >
                  {msg.avatar}
                </span>

                <div className={`flex flex-col gap-0.5 max-w-[75%] ${msg.direction === 'out' ? 'items-end' : 'items-start'}`}>
                  <span className="text-xs font-bold" style={{ color: '#5a5a72' }}>
                    {msg.direction === 'out' ? 'אתה' : msg.name}
                  </span>
                  <div
                    className="px-3 py-2 text-sm"
                    style={{
                      background: msg.direction === 'out' ? '#1c1c2e' : '#fff',
                      color: msg.direction === 'out' ? '#fef9f0' : '#1c1c2e',
                      border: '2px solid #1c1c2e',
                      borderRadius: msg.direction === 'out' ? '12px 12px 12px 4px' : '12px 12px 4px 12px',
                      boxShadow: '2px 2px 0 #1c1c2e',
                      wordBreak: 'break-word',
                    }}
                  >
                    {msg.text}
                  </div>
                  <span className="text-xs" style={{ color: '#c4b8a4' }}>
                    {formatTime(msg.at)}
                  </span>
                </div>
              </div>
            ))}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div className="flex gap-2 p-3" style={{ borderTop: '2px solid #e8e0d4' }}>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKey}
              placeholder={connected ? 'כתוב הודעה...' : 'מתחבר...'}
              aria-label="הקלד הודעה לצ'אט"
              disabled={!connected}
              maxLength={500}
              className="flex-1 px-3 py-2 text-sm font-medium"
              style={{
                background: '#fff',
                border: '2px solid #1c1c2e',
                borderRadius: 8,
                color: '#1c1c2e',
                outline: 'none',
              }}
            />
            <button
              onClick={send}
              disabled={!input.trim() || !connected}
              className="px-3 py-2 font-black text-sm"
              style={{
                background: input.trim() && connected ? '#10b981' : '#c4b8a4',
                color: '#fff',
                border: '2px solid #1c1c2e',
                boxShadow: '2px 2px 0 #1c1c2e',
                borderRadius: 8,
                cursor: input.trim() && connected ? 'pointer' : 'not-allowed',
                transition: 'background 0.15s',
              }}
            >
              ➤
            </button>
          </div>
        </div>
      )}

      {/* Floating button */}
      <div className="fixed z-50" style={{ bottom: 24, left: 24 }}>
        <button
          onClick={handleOpen}
          className="relative flex items-center justify-center"
          style={{
            width: 56,
            height: 56,
            background: '#1c1c2e',
            border: '2px solid #1c1c2e',
            boxShadow: open ? '2px 2px 0 #10b981' : '4px 4px 0 #10b981',
            borderRadius: 16,
            cursor: 'pointer',
            fontSize: open ? 22 : 26,
            transition: 'box-shadow 0.15s',
          }}
          title={open ? "סגור צ'אט" : "פתח צ'אט"}
          aria-label={open ? "סגור צ'אט" : "פתח צ'אט"}
          aria-expanded={open}
          aria-haspopup="dialog"
        >
          {open ? '✕' : myAvatar}
          {!open && unread > 0 && (
            <span
              className="absolute flex items-center justify-center font-black"
              style={{
                top: -8,
                right: -8,
                minWidth: 20,
                height: 20,
                padding: '0 5px',
                background: '#ef4444',
                color: '#fff',
                border: '2px solid #1c1c2e',
                borderRadius: 10,
                fontSize: 11,
                lineHeight: 1,
              }}
            >
              {unread > 99 ? '99+' : unread}
            </span>
          )}
        </button>
      </div>
    </>
  )
}
