import { signal } from '@preact/signals-react'
import { getUserData, saveUserData } from '../utils/userStorage'

export const userNameSignal = signal<string>(getUserData().name)

export function setUserName(name: string) {
  userNameSignal.value = name
  saveUserData({ name })
}
