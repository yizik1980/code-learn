import { signal } from '@preact/signals-react'
import { getUserData, saveUserData } from '../utils/userStorage'

export const userNameSignal = signal<string>(getUserData().name)
export const userAvatarSignal = signal<string>(getUserData().avatar)

export function setUserName(name: string) {
  userNameSignal.value = name
  saveUserData({ name })
}

export function setUserAvatar(avatar: string) {
  userAvatarSignal.value = avatar
  saveUserData({ avatar })
}
