const BASE = import.meta.env.VITE_API_URL ?? ''

export interface Note {
  id: number
  content: string
  created_at: string
}

export async function fetchNotes(userToken: string, courseId: string, lessonId: string): Promise<Note[]> {
  const params = new URLSearchParams({ userToken, courseId, lessonId })
  const res = await fetch(`${BASE}/api/notes?${params}`)
  if (!res.ok) throw new Error('fetch notes failed')
  return res.json()
}

export async function createNote(
  userToken: string,
  courseId: string,
  lessonId: string,
  content: string,
): Promise<Note> {
  const res = await fetch(`${BASE}/api/notes`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userToken, courseId, lessonId, content }),
  })
  if (!res.ok) throw new Error('create note failed')
  return res.json()
}

export async function deleteNote(id: number, userToken: string): Promise<void> {
  await fetch(`${BASE}/api/notes/${id}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userToken }),
  })
}
