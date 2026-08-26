import { useEffect } from 'react'
import { I18nManager } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
import type { RootStackParamList } from './src/navigation/types'
import { loadProgress } from './src/store/progress'
import { colors } from './src/theme'
import CoursesScreen from './src/screens/CoursesScreen'
import CourseDetailScreen from './src/screens/CourseDetailScreen'
import LessonScreen from './src/screens/LessonScreen'

if (!I18nManager.isRTL) {
  I18nManager.allowRTL(true)
  I18nManager.forceRTL(true)
  // Layout direction only fully applies after the next reload of the JS bundle.
}

const Stack = createNativeStackNavigator<RootStackParamList>()

export default function App() {
  useEffect(() => {
    loadProgress()
  }, [])

  return (
    <SafeAreaProvider>
      <StatusBar style="light" />
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerStyle: { backgroundColor: colors.ink },
            headerTintColor: colors.white,
            headerTitleStyle: { fontWeight: '900' },
            contentStyle: { backgroundColor: colors.bg },
          }}
        >
          <Stack.Screen name="Courses" component={CoursesScreen} options={{ title: 'CodeLearn' }} />
          <Stack.Screen name="CourseDetail" component={CourseDetailScreen} options={{ title: 'קורס' }} />
          <Stack.Screen name="Lesson" component={LessonScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  )
}
