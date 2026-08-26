import { ViewStyle } from 'react-native'

export function brutalCard(borderColor: string, shadowColor = borderColor): ViewStyle {
  return {
    borderWidth: 2,
    borderColor,
    borderRadius: 14,
    boxShadow: `3px 3px 0px ${shadowColor}`,
  } as ViewStyle
}
