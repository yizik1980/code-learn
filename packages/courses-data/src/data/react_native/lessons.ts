import type { Lesson } from '../../types'

export const reactNativeLessons: Lesson[] = [
  {
    id: 'rn-intro',
    title: 'מבוא ל-React Native',
    summary: 'מה זה React Native, Expo, ואיך מריצים את האפליקציה הראשונה',
    emoji: '📱',
    content: [
      { type: 'heading', text: 'מה זה React Native?' },
      { type: 'text', text: 'React Native מאפשר לבנות אפליקציות מובייל אמיתיות ל-iOS ו-Android עם JavaScript ו-React. בניגוד ל-PWA, הקוד מתורגם לקומפוננטות native — כפתורים, רשימות וטקסט של מערכת ההפעלה.' },
      { type: 'tip', text: 'אפליקציות כמו Facebook, Instagram, Shopify ו-Discord בנויות עם React Native.' },
      { type: 'heading', text: 'Expo — הדרך המהירה להתחיל' },
      { type: 'text', text: 'Expo היא פלטפורמה מעל React Native שמסירה את כאב ההגדרות. אין צורך ב-Xcode או Android Studio כדי להתחיל.' },
      { type: 'text', text: 'שלוש הפקודות האלו מספיקות כדי להריץ אפליקציה ראשונה: יצירת הפרויקט, כניסה לתיקייה, והפעלת שרת הפיתוח. לאחר ש-expo start רץ, תוצג QR code בטרמינל — סרקו אותה עם אפליקציית Expo Go בטלפון וראו את האפליקציה חיה.' },
      { type: 'code', lang: 'bash', caption: 'יצירת פרויקט חדש עם Expo', code: `npx create-expo-app MyApp
cd MyApp
npx expo start` },
      { type: 'text', text: 'לאחר ההרצה, סרקו את ה-QR עם אפליקציית Expo Go בטלפון — האפליקציה תיפתח מיד.' },
      { type: 'heading', text: 'מבנה הפרויקט' },
      { type: 'text', text: 'מבנה התיקיות של פרויקט Expo מבוסס על Expo Router: תיקיית app/ מכילה את כל המסכים, כאשר כל קובץ הופך אוטומטית למסלול ניווט. app.json מכיל את כל הגדרות האפליקציה כמו שם, אייקון ו-splash screen. שימו לב שהגישה הזו דומה לNext.js ומייתרת הגדרת routes ידנית.' },
      { type: 'code', lang: 'text', caption: 'קבצים עיקריים', code: `MyApp/
├── app/              ← מסכים (Expo Router)
│   └── index.tsx     ← מסך הבית
├── components/       ← קומפוננטות משותפות
├── assets/           ← תמונות, פונטים
└── app.json          ← הגדרות האפליקציה` },
      { type: 'heading', text: 'Hello World ב-React Native' },
      { type: 'text', text: 'הדוגמה הראשונה מציגה את ההבדל המרכזי מ-React Web: אין HTML — יש קומפוננטות native. View מחליפה div, Text מחליפה כל אלמנט טקסט. StyleSheet.create() מחליפה CSS, עם אותם מאפיינים אך בcamelCase. שימו לב שכל טקסט חייב להיות עטוף ב-Text, אחרת ייזרק שגיאה.' },
      { type: 'code', lang: 'tsx', caption: 'app/index.tsx', code: `import { View, Text, StyleSheet } from 'react-native';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>שלום עולם! 👋</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});` },
    ],
    questionBank: [
      {
        id: 'rn-intro-q1',
        text: 'מה ההבדל העיקרי בין React Native ל-PWA?',
        options: ['אין הבדל', 'RN מתורגם לקומפוננטות native של הטלפון', 'PWA מהיר יותר', 'RN רק ל-iOS'],
        correct: 1,
        explanation: 'React Native מתורגם לקומפוננטות native אמיתיות (UIView ב-iOS, View ב-Android) ולא רץ בדפדפן.',
      },
      {
        id: 'rn-intro-q2',
        text: 'מה היתרון של Expo על פני React Native CLI רגיל?',
        options: ['מהיר יותר', 'לא צריך Xcode/Android Studio כדי להתחיל', 'תומך רק ב-Android', 'בחינם בלבד'],
        correct: 1,
        explanation: 'Expo מסיר את הצורך להגדיר סביבות פיתוח native מסובכות. מספיק סמארטפון עם Expo Go.',
      },
      {
        id: 'rn-intro-q3',
        text: 'באיזה קובץ מגדירים את שם האפליקציה ב-Expo?',
        options: ['package.json', 'index.tsx', 'app.json', 'metro.config.js'],
        correct: 2,
        explanation: 'app.json מכיל את הגדרות האפליקציה — שם, אייקון, splash screen, הרשאות ועוד.',
      },
      {
        id: 'rn-intro-q4',
        text: 'מה הפקודה להרצת פרויקט Expo?',
        options: ['npm start', 'npx expo start', 'expo run', 'react-native start'],
        correct: 1,
        explanation: 'npx expo start מפעיל את שרת הפיתוח של Expo ומציג QR לסריקה עם Expo Go.',
      },
    ],
  },
  {
    id: 'rn-core-components',
    title: 'קומפוננטות ליבה',
    summary: 'View, Text, Image, TouchableOpacity — אבני הבניין של כל מסך',
    emoji: '🧱',
    content: [
      { type: 'heading', text: 'אין div — יש View' },
      { type: 'text', text: 'ב-React Native אין HTML. במקום div משתמשים ב-View, במקום p ו-h1 משתמשים ב-Text. כל טקסט חייב להיות בתוך קומפוננטת Text.' },
      { type: 'text', text: 'הדוגמה מציגה קומפוננטת ProfileCard עם תמונה, שם ותפקיד. שימו לב שתמונות ברשת מועברות כ-{ uri: "..." } ולא כ-src. לתמונות עגולות משתמשים ב-borderRadius עם מחצית מהגודל. style מועבר כobject ישירות, ללא קובץ CSS חיצוני.' },
      { type: 'code', lang: 'tsx', caption: 'קומפוננטות בסיסיות', code: `import { View, Text, Image, ScrollView } from 'react-native';

export default function ProfileCard() {
  return (
    <View style={{ padding: 16, backgroundColor: '#f5f5f5' }}>
      <Image
        source={{ uri: 'https://picsum.photos/100' }}
        style={{ width: 80, height: 80, borderRadius: 40 }}
      />
      <Text style={{ fontSize: 20, fontWeight: 'bold', marginTop: 8 }}>
        יוסי כהן
      </Text>
      <Text style={{ color: '#666' }}>
        מפתח Full Stack
      </Text>
    </View>
  );
}` },
      { type: 'heading', text: 'כפתורים וגעת — Touchable' },
      { type: 'text', text: 'אין <button> ב-React Native — יש TouchableOpacity ו-Pressable. TouchableOpacity מעמעם את האלמנט בלחיצה. Pressable חדש ומתקדם יותר — ה-style שלו יכול לקבל פונקציה שמקבלת { pressed } ומחזירה style דינמי. שימו לב שגם כאן כל טקסט הכפתור חייב להיות עטוף ב-Text.' },
      { type: 'code', lang: 'tsx', caption: 'כפתורים', code: `import { TouchableOpacity, Pressable, Text, Alert } from 'react-native';

// TouchableOpacity — מעמעם בלחיצה
<TouchableOpacity
  onPress={() => Alert.alert('לחצת!')}
  style={{ backgroundColor: '#10b981', padding: 12, borderRadius: 8 }}
>
  <Text style={{ color: '#fff', textAlign: 'center' }}>לחץ עלי</Text>
</TouchableOpacity>

// Pressable — גמיש יותר, תומך ב-style דינמי
<Pressable
  onPress={() => Alert.alert('!היי')}
  style={({ pressed }) => ({
    opacity: pressed ? 0.7 : 1,
    backgroundColor: '#6366f1',
    padding: 12,
    borderRadius: 8,
  })}
>
  <Text style={{ color: '#fff' }}>Pressable</Text>
</Pressable>` },
      { type: 'heading', text: 'ScrollView לתוכן ארוך' },
      { type: 'text', text: 'ScrollView מאפשרת גלילה על תוכן שחורג מגבולות המסך. שימו לב לשימוש ב-contentContainerStyle (ולא style) להגדרת padding בתוך ה-ScrollView. לרשימות ארוכות עם מאות פריטים, העדיפו FlatList שמרנדרת רק פריטים גלויים ואינה טוענת את הכל לזיכרון.' },
      { type: 'code', lang: 'tsx', caption: 'גלילה', code: `import { ScrollView, Text } from 'react-native';

export default function LongPage() {
  return (
    <ScrollView contentContainerStyle={{ padding: 16 }}>
      {Array.from({ length: 20 }, (_, i) => (
        <Text key={i} style={{ marginBottom: 8 }}>
          שורה {i + 1}
        </Text>
      ))}
    </ScrollView>
  );
}` },
      {
        type: 'table',
        caption: 'HTML → React Native',
        headers: ['HTML/Web', 'React Native'],
        rows: [
          ['<div>', '<View>'],
          ['<p>, <h1>-<h6>', '<Text>'],
          ['<img>', '<Image>'],
          ['<button>', '<TouchableOpacity> / <Pressable>'],
          ['<input>', '<TextInput>'],
          ['<ul> + overflow:scroll', '<ScrollView> / <FlatList>'],
        ],
      },
    ],
    questionBank: [
      {
        id: 'rn-core-q1',
        text: 'מה משתמשים במקום div ב-React Native?',
        options: ['Box', 'Container', 'View', 'Section'],
        correct: 2,
        explanation: 'View היא הקומפוננטה הבסיסית לפריסה ב-React Native, מקבילה ל-div ב-HTML.',
      },
      {
        id: 'rn-core-q2',
        text: 'מה קורה אם נכתוב טקסט ישירות בתוך View ללא Text?',
        options: ['עובד בסדר', 'מוצג באדום', 'שגיאה בזמן ריצה', 'מוצג ריק'],
        correct: 2,
        explanation: 'ב-React Native כל טקסט חייב להיות עטוף בקומפוננטת Text. טקסט חשוף ב-View יגרום לשגיאה.',
      },
      {
        id: 'rn-core-q3',
        text: 'מה ההבדל בין TouchableOpacity ל-Pressable?',
        options: ['אין הבדל', 'Pressable חדש יותר ותומך ב-style דינמי', 'TouchableOpacity רק ל-iOS', 'Pressable רק ל-Android'],
        correct: 1,
        explanation: 'Pressable הוא ה-API החדש והגמיש יותר. style יכול לקבל פונקציה שמקבלת { pressed } לעיצוב דינמי.',
      },
      {
        id: 'rn-core-q4',
        text: 'מתי להשתמש ב-FlatList במקום ScrollView?',
        options: ['תמיד', 'לרשימות ארוכות ודינמיות', 'רק לתמונות', 'רק ב-iOS'],
        correct: 1,
        explanation: 'FlatList מרנדרת רק את הפריטים הנראים במסך (virtualization). ScrollView מרנדרת הכל — לא יעיל לרשימות ארוכות.',
      },
    ],
  },
  {
    id: 'rn-styling',
    title: 'עיצוב ו-Flexbox',
    summary: 'StyleSheet, Flexbox, צבעים, מרווחים — עיצוב מסכים ב-React Native',
    emoji: '🎨',
    content: [
      { type: 'heading', text: 'StyleSheet — CSS של React Native' },
      { type: 'text', text: 'ב-React Native אין CSS. משתמשים ב-StyleSheet.create() שמקבל אובייקט עם מאפייני עיצוב בcamelCase.' },
      { type: 'text', text: 'הדוגמה מציגה כרטיס (Card) עם shadow. שימו לב ל-elevation: 3 שמוסיף צל ב-Android (shadowColor/shadowOffset לא עובדים ב-Android). borderRadius, padding ו-margin עובדים כמו ב-CSS. shadowOpacity ו-shadowRadius הם iOS בלבד.' },
      { type: 'code', lang: 'tsx', caption: 'StyleSheet.create', code: `import { View, Text, StyleSheet } from 'react-native';

export default function Card() {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>כותרת</Text>
      <Text style={styles.body}>תוכן הכרטיס</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    margin: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,  // Android shadow
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1c1c2e',
    marginBottom: 4,
  },
  body: {
    fontSize: 14,
    color: '#5a5a72',
  },
});` },
      { type: 'heading', text: 'Flexbox ב-React Native' },
      { type: 'text', text: 'ב-React Native ברירת המחדל היא flex ו-flexDirection: "column" (לא row כמו בווב). כל View הוא Flex container.' },
      { type: 'text', text: 'שלוש הדוגמאות מציגות תבניות Flexbox נפוצות: שורה אופקית עם חלוקת מקום יחסית (flex: 1 ו-flex: 2), מרכוז מלא עם alignItems+justifyContent: center, ו-space-between לפריסת שני אלמנטים בקצוות. שימו לב שgap עובד מ-React Native 0.71 ומחליף marginRight/marginBottom.' },
      { type: 'code', lang: 'tsx', caption: 'פריסה עם Flexbox', code: `// שורה אופקית
<View style={{ flexDirection: 'row', gap: 8 }}>
  <View style={{ flex: 1, backgroundColor: '#10b981', height: 50 }} />
  <View style={{ flex: 2, backgroundColor: '#6366f1', height: 50 }} />
</View>

// ממורכז לגמרי
<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
  <Text>במרכז</Text>
</View>

// space-between
<View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 16 }}>
  <Text>שמאל</Text>
  <Text>ימין</Text>
</View>` },
      { type: 'heading', text: 'גדלים ויחידות' },
      { type: 'text', text: 'ב-React Native כל המידות הן ב-dp (density-independent pixels) — ללא יחידת מידה. אין px, em, rem.' },
      { type: 'text', text: 'Dimensions.get("window") מחזיר את רוחב וגובה המסך ב-dp. שימו לב לשתי גישות: שימוש ברוחב המלא עם width: width, ושימוש באחוזים עם width: "80%". לרוחב מלא רספונסיבי, גישת האחוזים היא לרוב עדיפה ומתאימה לכל גדלי מסך.' },
      { type: 'code', lang: 'tsx', caption: 'Dimensions API', code: `import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

// רוחב מסך מלא
<View style={{ width: width, height: 200 }} />

// אחוזים
<View style={{ width: '80%', alignSelf: 'center' }} />` },
      { type: 'tip', text: 'shadowColor/shadowOffset עובד ב-iOS. ב-Android משתמשים ב-elevation לצלל.' },
    ],
    questionBank: [
      {
        id: 'rn-style-q1',
        text: 'מה ברירת המחדל של flexDirection ב-React Native?',
        options: ['row', 'column', 'row-reverse', 'none'],
        correct: 1,
        explanation: 'בניגוד לווב (row), ב-React Native ברירת המחדל היא column — אלמנטים מסתדרים מלמעלה למטה.',
      },
      {
        id: 'rn-style-q2',
        text: 'כיצד מוסיפים צל (shadow) ב-Android ב-React Native?',
        options: ['boxShadow', 'shadowColor', 'elevation', 'dropShadow'],
        correct: 2,
        explanation: 'Android משתמש ב-elevation לצלל. iOS משתמש ב-shadowColor, shadowOffset, shadowOpacity, shadowRadius.',
      },
      {
        id: 'rn-style-q3',
        text: 'באיזה יחידה מציינים גדלים ב-React Native?',
        options: ['px', 'em', 'dp (ללא יחידה)', 'rem'],
        correct: 2,
        explanation: 'ב-React Native כל המידות הן ב-dp (density-independent pixels). כותבים מספר בלבד, ללא יחידה.',
      },
      {
        id: 'rn-style-q4',
        text: 'מה עושה flex: 1 על View?',
        options: ['קובע font size 1', 'ממלא את כל המקום הפנוי', 'מגדיר border של 1px', 'מסתיר את האלמנט'],
        correct: 1,
        explanation: 'flex: 1 גורם ל-View לתפוס את כל המקום הפנוי הזמין בתוך הcontainer שלו.',
      },
    ],
  },
  {
    id: 'rn-state',
    title: 'State ואירועים',
    summary: 'useState, TextInput, לחיצות ועדכון UI בזמן אמת',
    emoji: '⚡',
    content: [
      { type: 'heading', text: 'useState ב-React Native' },
      { type: 'text', text: 'useState עובד בדיוק כמו ב-React רגיל — משנים state, הקומפוננטה מתרנדרת מחדש.' },
      { type: 'text', text: 'Counter פשוט מדגים state management: שני כפתורים + ו-− שמעדכנים count. שימו לב לשימוש ב-c => c - 1 (functional update) במקום count - 1 — זה מבטיח שמשתמשים בערך העדכני ביותר של state, חשוב לפעולות מהירות. ה-StyleSheet מוגדר מחוץ לקומפוננטה למניעת יצירה מחדש בכל render.' },
      { type: 'code', lang: 'tsx', caption: 'Counter פשוט', code: `import { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function Counter() {
  const [count, setCount] = useState(0);

  return (
    <View style={styles.container}>
      <Text style={styles.count}>{count}</Text>

      <View style={{ flexDirection: 'row', gap: 16 }}>
        <TouchableOpacity style={styles.btn} onPress={() => setCount(c => c - 1)}>
          <Text style={styles.btnText}>−</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn} onPress={() => setCount(c => c + 1)}>
          <Text style={styles.btnText}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 24 },
  count: { fontSize: 64, fontWeight: 'bold' },
  btn: { backgroundColor: '#10b981', width: 56, height: 56, borderRadius: 28, alignItems: 'center', justifyContent: 'center' },
  btnText: { color: '#fff', fontSize: 28, fontWeight: 'bold' },
});` },
      { type: 'heading', text: 'TextInput — קלט מהמשתמש' },
      { type: 'text', text: 'TextInput עם controlled input — value ו-onChangeText — עובד כמו <input> ב-React. שימו לב ל-autoCapitalize="words" שמגדיל את האות הראשונה בכל מילה. textAlign: "right" מתאים לעברית. הצגת ברכה מותנית (name ? ...) מדגימה rendering דינמי.' },
      { type: 'code', lang: 'tsx', caption: 'TextInput עם controlled input', code: `import { useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

export default function NameForm() {
  const [name, setName] = useState('');

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="הכנס שם..."
        value={name}
        onChangeText={setName}
        autoCapitalize="words"
      />
      {name ? (
        <Text style={styles.greeting}>שלום, {name}! 👋</Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 24, gap: 16 },
  input: {
    borderWidth: 2,
    borderColor: '#1c1c2e',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    textAlign: 'right',
  },
  greeting: { fontSize: 20, fontWeight: 'bold', textAlign: 'center' },
});` },
      { type: 'tip', text: 'השתמשו ב-KeyboardAvoidingView כדי שהמקלדת לא תכסה את שדות הקלט.' },
    ],
    questionBank: [
      {
        id: 'rn-state-q1',
        text: 'מה האירוע שמאזינים לו ב-TextInput כשהמשתמש מקליד?',
        options: ['onChange', 'onChangeText', 'onInput', 'onKeyPress'],
        correct: 1,
        explanation: 'onChangeText מקבל את הטקסט המעודכן ישירות כstring, בלי צורך ב-e.target.value כמו בווב.',
      },
      {
        id: 'rn-state-q2',
        text: 'מה קורה כשמשנים state ב-React Native?',
        options: ['דף מתרענן', 'הקומפוננטה מתרנדרת מחדש', 'כלום', 'כל האפליקציה מתרנדרת'],
        correct: 1,
        explanation: 'שינוי state גורם רק לקומפוננטה הספציפית ולילדיה לעשות re-render — בדיוק כמו ב-React.',
      },
      {
        id: 'rn-state-q3',
        text: 'מה הבעיה שפותרת KeyboardAvoidingView?',
        options: ['מסתירה את המקלדת', 'מונעת מהמקלדת לכסות שדות קלט', 'משנה את שפת המקלדת', 'מוסיפה אנימציה'],
        correct: 1,
        explanation: 'כשמקלדת נפתחת, היא מכסה חלק מהמסך. KeyboardAvoidingView מזיזה את התוכן למעלה כדי שהקלט יישאר גלוי.',
      },
      {
        id: 'rn-state-q4',
        text: 'כיצד מאתחלים useState עם ערך ברירת מחדל ריק?',
        options: ['useState(null)', 'useState("")', 'useState()', 'שניים ושלושה נכונים'],
        correct: 3,
        explanation: 'אפשר useState("") למחרוזת ריקה, useState(null) לNull, או useState() שמחזיר undefined. הבחירה תלויה בשימוש.',
      },
    ],
  },
  {
    id: 'rn-navigation',
    title: 'ניווט בין מסכים',
    summary: 'Expo Router, Stack, Tabs — מעבר בין מסכים ב-React Native',
    emoji: '🗺️',
    content: [
      { type: 'heading', text: 'Expo Router — ניווט מבוסס קבצים' },
      { type: 'text', text: 'Expo Router (v3+) עובד כמו Next.js — כל קובץ ב-app/ הופך למסך. אין צורך להגדיר routes ידנית.' },
      { type: 'text', text: 'מבנה התיקיות מגדיר אוטומטית את מסלולי הניווט. תיקיות בסוגריים כמו (tabs) הן group routes שלא מופיעות ב-URL. קבצי [id].tsx הם דינמיים ומקבלים פרמטרים. _layout.tsx מגדיר ה-layout המשותף לכל המסכים בתיקייה — מקום לTab Bar, Stack navigator ועוד.' },
      { type: 'code', lang: 'text', caption: 'מבנה תיקיות = מסלולים', code: `app/
├── index.tsx          → "/"  (מסך הבית)
├── profile.tsx        → "/profile"
├── (tabs)/
│   ├── _layout.tsx    → הגדרת Tab Bar
│   ├── home.tsx       → Tab ראשון
│   └── settings.tsx   → Tab שני
└── product/
    └── [id].tsx       → "/product/123" (דינמי)` },
      { type: 'heading', text: 'ניווט בין מסכים' },
      { type: 'text', text: 'יש שתי דרכים לנווט: Link לניווט declarative (כמו <a> ב-HTML), ו-useRouter לניווט פרוגרמטי (לאחר שמירת נתונים, לדוגמה). שימו לב ל-router.push לעומת router.replace — push מוסיף ל-stack ומאפשר לחזור, replace מחליף את המסך הנוכחי ולא שומר היסטוריה. לניווט עם פרמטרים מעבירים את הערך ישירות ב-URL.' },
      { type: 'code', lang: 'tsx', caption: 'Link ו-useRouter', code: `import { Link, useRouter } from 'expo-router';
import { View, TouchableOpacity, Text } from 'react-native';

export default function HomeScreen() {
  const router = useRouter();

  return (
    <View>
      {/* ניווט עם Link */}
      <Link href="/profile">
        <Text>לפרופיל שלי</Text>
      </Link>

      {/* ניווט פרוגרמטי */}
      <TouchableOpacity onPress={() => router.push('/settings')}>
        <Text>הגדרות</Text>
      </TouchableOpacity>

      {/* ניווט עם פרמטר */}
      <TouchableOpacity onPress={() => router.push('/product/42')}>
        <Text>מוצר 42</Text>
      </TouchableOpacity>
    </View>
  );
}` },
      { type: 'heading', text: 'Tab Bar' },
      { type: 'text', text: '_layout.tsx בתוך (tabs) מגדיר את ה-Tab Bar בתחתית המסך. כל Tabs.Screen מייצג לשונית אחת, עם שם (שמתאים לשם הקובץ), כותרת ואייקון. tabBarActiveTintColor קובע את צבע הלשונית הפעילה. שימו לב שאייקונים ב-React Native הם בדרך כלל קומפוננטות ולא string — כאן משתמשים ב-Emoji לפשטות.' },
      { type: 'code', lang: 'tsx', caption: 'app/(tabs)/_layout.tsx', code: `import { Tabs } from 'expo-router';

export default function TabsLayout() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: '#10b981' }}>
      <Tabs.Screen
        name="home"
        options={{ title: 'בית', tabBarIcon: () => <Text>🏠</Text> }}
      />
      <Tabs.Screen
        name="settings"
        options={{ title: 'הגדרות', tabBarIcon: () => <Text>⚙️</Text> }}
      />
    </Tabs>
  );
}` },
      { type: 'tip', text: 'useLocalSearchParams() מחלץ פרמטרים דינמיים מה-URL: const { id } = useLocalSearchParams().' },
    ],
    questionBank: [
      {
        id: 'rn-nav-q1',
        text: 'איך Expo Router מגדיר מסלולים?',
        options: ['קובץ routes.ts', 'לפי מבנה תיקיות ב-app/', 'ב-app.json', 'עם registerRoute()'],
        correct: 1,
        explanation: 'Expo Router הוא file-based routing — כל קובץ ב-app/ הופך אוטומטית למסלול, כמו Next.js.',
      },
      {
        id: 'rn-nav-q2',
        text: 'מה ההבדל בין router.push() ל-router.replace()?',
        options: ['אין הבדל', 'push מוסיף ל-stack, replace מחליף את המסך הנוכחי', 'replace מהיר יותר', 'push רק לTabs'],
        correct: 1,
        explanation: 'push מוסיף מסך ל-stack (אפשר לחזור אחורה). replace מחליף את המסך הנוכחי בלי להוסיף ל-history.',
      },
      {
        id: 'rn-nav-q3',
        text: 'איך קוראים פרמטר דינמי כמו /product/[id] ב-Expo Router?',
        options: ['useParams()', 'useRoute().params', 'useLocalSearchParams()', 'getParam("id")'],
        correct: 2,
        explanation: 'useLocalSearchParams() מחזיר אובייקט עם כל הפרמטרים הדינמיים של המסלול הנוכחי.',
      },
      {
        id: 'rn-nav-q4',
        text: 'איפה מגדירים את עיצוב ה-Tab Bar?',
        options: ['בכל מסך בנפרד', 'ב-app.json', 'ב-_layout.tsx של ה-(tabs)', 'ב-App.tsx הראשי'],
        correct: 2,
        explanation: '_layout.tsx בתוך תיקיית (tabs) מגדיר את ה-Tab Bar, הצבעים, האייקונים וכותרות הלשוניות.',
      },
    ],
  },
  {
    id: 'rn-lists',
    title: 'רשימות ו-FlatList',
    summary: 'FlatList, SectionList, pull-to-refresh — הצגת נתונים ביעילות',
    emoji: '📋',
    content: [
      { type: 'heading', text: 'FlatList — רשימה יעילה' },
      { type: 'text', text: 'FlatList מרנדרת רק את הפריטים הנראים על המסך (virtualization). מתאימה לרשימות ארוכות — אנשי קשר, פידים, תוצאות חיפוש.' },
      { type: 'text', text: 'FlatList מקבלת data (המערך), keyExtractor (מחזיר מזהה ייחודי לכל פריט) ו-renderItem (פונקציה שמרנדרת כל פריט). שימו לב ל-ItemSeparatorComponent שמציג מפריד בין פריטים ללא צורך להוסיף margin לכל פריט. הפרדת UserRow לקומפוננטה נפרדת משפרת קריאות וביצועים.' },
      { type: 'code', lang: 'tsx', caption: 'FlatList בסיסי', code: `import { FlatList, View, Text, StyleSheet } from 'react-native';

const DATA = [
  { id: '1', name: 'דוד כהן', role: 'מפתח Frontend' },
  { id: '2', name: 'שרה לוי', role: 'מפתחת Backend' },
  { id: '3', name: 'יוסי גל', role: 'Full Stack' },
];

function UserRow({ item }: { item: typeof DATA[0] }) {
  return (
    <View style={styles.row}>
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.role}>{item.role}</Text>
    </View>
  );
}

export default function UserList() {
  return (
    <FlatList
      data={DATA}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <UserRow item={item} />}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
    />
  );
}

const styles = StyleSheet.create({
  row: { padding: 16 },
  name: { fontSize: 16, fontWeight: 'bold' },
  role: { color: '#5a5a72', marginTop: 2 },
  separator: { height: 1, backgroundColor: '#e5e7eb' },
});` },
      { type: 'heading', text: 'Pull to Refresh' },
      { type: 'text', text: 'Pull to Refresh מאפשר למשתמש לרענן את הרשימה על ידי משיכה למטה. מוסיפים refreshControl ל-FlatList עם RefreshControl שמקבל שני props: refreshing (האם כרגע מרענן) ו-onRefresh (callback). שימו לב לשימוש ב-useCallback למניעת יצירת פונקציה חדשה בכל render.' },
      { type: 'code', lang: 'tsx', caption: 'רענון בגרירה', code: `import { useState, useCallback } from 'react';
import { FlatList, RefreshControl } from 'react-native';

export default function RefreshableList() {
  const [refreshing, setRefreshing] = useState(false);
  const [data, setData] = useState(initialData);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    const fresh = await fetchData();
    setData(fresh);
    setRefreshing(false);
  }, []);

  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <Row item={item} />}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    />
  );
}` },
      { type: 'heading', text: 'SectionList — רשימה עם קטגוריות' },
      { type: 'text', text: 'SectionList דומה ל-FlatList אך תומכת בקבוצות עם כותרות — כמו רשימת אנשי קשר מסודרת לפי אות ראשונה. הנתונים מועברים כמערך של sections, כשכל section מכיל title ו-data. renderSectionHeader מציג כותרת לכל קבוצה. שימו לב לשימוש ב-backgroundColor בכותרת כדי שתישאר גלויה בגלילה.' },
      { type: 'code', lang: 'tsx', caption: 'רשימה עם כותרות קבוצות', code: `import { SectionList, Text, View } from 'react-native';

const SECTIONS = [
  { title: 'Frontend', data: ['React', 'Vue', 'Angular'] },
  { title: 'Backend', data: ['Node.js', 'Python', 'Go'] },
];

<SectionList
  sections={SECTIONS}
  keyExtractor={(item, i) => item + i}
  renderItem={({ item }) => <Text style={{ padding: 12 }}>{item}</Text>}
  renderSectionHeader={({ section: { title } }) => (
    <Text style={{ fontWeight: 'bold', backgroundColor: '#f3f4f6', padding: 8 }}>
      {title}
    </Text>
  )}
/>` },
      { type: 'tip', text: 'תמיד הגדירו keyExtractor — בלעדיו React לא יכול לזהות שינויים ברשימה ביעילות.' },
    ],
    questionBank: [
      {
        id: 'rn-list-q1',
        text: 'מדוע FlatList עדיף על ScrollView לרשימות ארוכות?',
        options: ['נראה יפה יותר', 'מרנדר רק פריטים גלויים (virtualization)', 'תומך ב-pull-to-refresh', 'קל יותר לעיצוב'],
        correct: 1,
        explanation: 'FlatList מרנדר רק את הפריטים שנראים על המסך. ScrollView מרנדר הכל — בזבוז זיכרון לרשימות ארוכות.',
      },
      {
        id: 'rn-list-q2',
        text: 'מה עושה keyExtractor ב-FlatList?',
        options: ['מסדר לפי מפתח', 'מספק מזהה ייחודי לכל פריט', 'מצפין נתונים', 'מגדיר מפתח keyboard'],
        correct: 1,
        explanation: 'keyExtractor מספק לReact מזהה ייחודי לכל פריט כדי לעקוב אחר שינויים ביעילות.',
      },
      {
        id: 'rn-list-q3',
        text: 'מה מוסיפים ל-FlatList כדי לאפשר pull-to-refresh?',
        options: ['onRefresh prop', 'refreshControl עם RefreshControl', 'pullable={true}', 'swipeRefresh prop'],
        correct: 1,
        explanation: 'מוסיפים refreshControl={<RefreshControl refreshing={bool} onRefresh={fn} />} ל-FlatList.',
      },
      {
        id: 'rn-list-q4',
        text: 'מה ההבדל בין FlatList ל-SectionList?',
        options: ['אין הבדל', 'SectionList תומכת בקבוצות עם כותרות', 'FlatList מהיר יותר', 'SectionList רק ל-iOS'],
        correct: 1,
        explanation: 'SectionList מאפשרת לקבץ פריטים לקטגוריות עם כותרת לכל קטגוריה, כמו אנשי קשר מסודרים לפי אות.',
      },
    ],
  },
  {
    id: 'rn-api',
    title: 'Fetch ו-AsyncStorage',
    summary: 'קריאות API, loading states, שמירה מקומית עם AsyncStorage',
    emoji: '🌐',
    content: [
      { type: 'heading', text: 'fetch ב-React Native' },
      { type: 'text', text: 'fetch עובד בדיוק כמו בדפדפן — אותו API. משתמשים ב-useEffect לטעינת נתונים בעת טעינת הקומפוננטה.' },
      { type: 'text', text: 'הדוגמה מציגה פטרן מלא לטעינת נתונים: שלושה states (posts, loading, error), fetch ב-useEffect עם [] ריק שמריץ פעם אחת, טיפול בshגיאה, והצגת ActivityIndicator בזמן טעינה. שימו לב לשרשרת .then().catch().finally() — finally מבטיח ש-setLoading(false) תמיד יקרה בסוף.' },
      { type: 'code', lang: 'tsx', caption: 'טעינת נתונים מ-API', code: `import { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator } from 'react-native';

type Post = { id: number; title: string; body: string };

export default function PostsFeed() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts?_limit=20')
      .then((res) => res.json())
      .then((data) => setPosts(data))
      .catch(() => setError('שגיאה בטעינת הנתונים'))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <ActivityIndicator style={{ flex: 1 }} size="large" />;
  if (error) return <Text style={{ padding: 16, color: 'red' }}>{error}</Text>;

  return (
    <FlatList
      data={posts}
      keyExtractor={(item) => String(item.id)}
      renderItem={({ item }) => (
        <View style={{ padding: 16, borderBottomWidth: 1, borderColor: '#e5e7eb' }}>
          <Text style={{ fontWeight: 'bold', marginBottom: 4 }}>{item.title}</Text>
          <Text style={{ color: '#5a5a72' }}>{item.body}</Text>
        </View>
      )}
    />
  );
}` },
      { type: 'heading', text: 'AsyncStorage — שמירה מקומית' },
      { type: 'text', text: 'AsyncStorage הוא כמו localStorage של הדפדפן — שומר נתונים על המכשיר בין הפעלות האפליקציה.' },
      { type: 'text', text: 'AsyncStorage לא כלול ב-React Native Core ודורש התקנה נפרדת. שימוש ב-npx expo install (ולא npm install) מבטיח התקנת הגרסה התואמת לגרסת Expo שלכם. לאחר ההתקנה, יש לבצע rebuild של האפליקציה.' },
      { type: 'code', lang: 'bash', caption: 'התקנה', code: `npx expo install @react-native-async-storage/async-storage` },
      { type: 'text', text: 'AsyncStorage שומר key-value pairs כ-strings בלבד. setItem שומר, getItem קורא (מחזיר null אם לא קיים), removeItem מוחק. שימו לב שאובייקטים דורשים JSON.stringify לפני שמירה ו-JSON.parse בקריאה. כל הפעולות אסינכרוניות ומחזירות Promise.' },
      { type: 'code', lang: 'tsx', caption: 'שמירה וקריאה', code: `import AsyncStorage from '@react-native-async-storage/async-storage';

// שמירה
await AsyncStorage.setItem('username', 'דוד');
await AsyncStorage.setItem('settings', JSON.stringify({ theme: 'dark' }));

// קריאה
const username = await AsyncStorage.getItem('username');
const raw = await AsyncStorage.getItem('settings');
const settings = raw ? JSON.parse(raw) : null;

// מחיקה
await AsyncStorage.removeItem('username');` },
      { type: 'heading', text: 'ActivityIndicator — אינדיקטור טעינה' },
      { type: 'text', text: 'ActivityIndicator מציגה את ה-spinner הנייטיב של מערכת ההפעלה — כדורים ב-iOS ועיגול מסתובב ב-Android. Props עיקריים: size ("small" או "large") ו-color. לתצוגה מרכזית על כל המסך, עוטפים ב-View עם flex: 1 ו-alignItems + justifyContent: center.' },
      { type: 'code', lang: 'tsx', caption: 'Spinner native', code: `import { ActivityIndicator, View } from 'react-native';

// Spinner של מערכת ההפעלה
<ActivityIndicator size="large" color="#10b981" />

// במרכז המסך
<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
  <ActivityIndicator size="large" />
</View>` },
      { type: 'tip', text: 'השתמשו בספריית react-query או SWR לניהול cache, loading ו-error states בצורה נקייה יותר.' },
    ],
    questionBank: [
      {
        id: 'rn-api-q1',
        text: 'ב-React Native, כיצד קוראים ל-API בטעינת הקומפוננטה?',
        options: ['componentDidMount', 'useEffect עם [] ריק', 'onLoad prop', 'useFetch()'],
        correct: 1,
        explanation: 'useEffect עם תלויות ריקות [] רץ פעם אחת בטעינת הקומפוננטה — המקום הנכון לקריאות API.',
      },
      {
        id: 'rn-api-q2',
        text: 'מה AsyncStorage מאפשר לעשות?',
        options: ['שמירת נתונים בענן', 'שמירת נתונים מקומית על המכשיר', 'הצפנת קוד', 'שמירת תמונות'],
        correct: 1,
        explanation: 'AsyncStorage שומר key-value pairs על המכשיר — הנתונים נשמרים בין הפעלות האפליקציה.',
      },
      {
        id: 'rn-api-q3',
        text: 'מה מציגה קומפוננטת ActivityIndicator?',
        options: ['Progress bar', 'Spinner טעינה native של הOS', 'אחוז טעינה', 'הודעת שגיאה'],
        correct: 1,
        explanation: 'ActivityIndicator מציגה את spinner הטעינה של מערכת ההפעלה — כדורים ב-iOS, עיגול ב-Android.',
      },
      {
        id: 'rn-api-q4',
        text: 'כיצד שומרים אובייקט ב-AsyncStorage?',
        options: ['שמירה ישירה', 'JSON.stringify לפני שמירה', 'Object.save()', 'אי אפשר לשמור אובייקטים'],
        correct: 1,
        explanation: 'AsyncStorage שומר strings בלבד. אובייקטים חייבים להיות ממורים עם JSON.stringify() לפני שמירה ו-JSON.parse() בקריאה.',
      },
    ],
  },
  {
    id: 'rn-publish',
    title: 'בנייה ופרסום',
    summary: 'EAS Build, פרסום ל-App Store ו-Google Play, OTA updates',
    emoji: '🚀',
    content: [
      { type: 'heading', text: 'EAS — Expo Application Services' },
      { type: 'text', text: 'EAS Build הוא שירות הענן של Expo לבניית קבצי .ipa (iOS) ו-.aab (Android) מוכנים לפרסום — ללא Xcode ו-Android Studio.' },
      { type: 'text', text: 'הגדרת EAS דורשת התקנת eas-cli גלובלית, login לחשבון Expo, ו-build:configure שיוצר קובץ eas.json. קובץ זה מגדיר פרופילי בנייה שונים — preview לבדיקות ו-production לחנויות. שימו לב שפרסום ב-iOS דורש חשבון Apple Developer בעלות שנתית.' },
      { type: 'code', lang: 'bash', caption: 'הגדרת EAS', code: `npm install -g eas-cli
eas login
eas build:configure   # יוצר eas.json` },
      { type: 'heading', text: 'בניית האפליקציה' },
      { type: 'text', text: 'eas build מבצע את הבנייה בענן Expo ולא על המחשב שלכם. פרופיל preview בונה APK לבדיקות ישירות על מכשיר Android ללא חנות. פרופיל production בונה AAB לפרסום ב-Google Play ו-IPA ל-App Store. autoIncrement מגדיל אוטומטית את מספר הגרסה בכל build.' },
      { type: 'code', lang: 'bash', caption: 'פקודות בנייה', code: `# בניה ל-Android (APK לבדיקה)
eas build --platform android --profile preview

# בניה ל-iOS (דורש Apple Developer Account)
eas build --platform ios --profile production

# בניה לשני הפלטפורמות
eas build --platform all` },
      { type: 'heading', text: 'eas.json — פרופילי בנייה' },
      { type: 'text', text: 'eas.json מגדיר פרופילי בנייה שונים — כל פרופיל עם הגדרות שונות לפי המטרה. preview מגדיר buildType: apk ל-Android (קובץ להתקנה ישירה), production מגדיר autoIncrement לגרסאות אוטומטיות. ניתן להוסיף env vars ו-distribution settings לכל פרופיל.' },
      { type: 'code', lang: 'json', caption: 'eas.json', code: `{
  "build": {
    "preview": {
      "android": { "buildType": "apk" }
    },
    "production": {
      "autoIncrement": true
    }
  }
}` },
      { type: 'heading', text: 'OTA Updates — עדכון ללא חנות' },
      { type: 'text', text: 'EAS Update מאפשר לדחוף עדכוני JavaScript ישירות לאפליקציות מותקנות — ללא עדכון בחנות.' },
      { type: 'text', text: 'eas update שולח את ה-JavaScript bundle החדש לשרתי Expo. בפתיחת האפליקציה הבאה, המשתמש יורד את ה-bundle החדש אוטומטית. הflag --branch מציין את ה-environment (production, staging), ו---message מתעד מה השתנה. שימו לב: OTA עובד רק לשינויים ב-JS, לא לשינויים native.' },
      { type: 'code', lang: 'bash', caption: 'EAS Update', code: `# שליחת עדכון OTA לכל המשתמשים
eas update --branch production --message "תיקון באג בחיפוש"` },
      {
        type: 'table',
        caption: 'דרישות לפרסום',
        headers: ['פלטפורמה', 'חשבון נדרש', 'עלות שנתית'],
        rows: [
          ['Google Play', 'Google Play Console', '$25 (חד פעמי)'],
          ['App Store', 'Apple Developer Program', '$99/שנה'],
        ],
      },
      { type: 'tip', text: 'עדכוני OTA עובדים רק לשינויים ב-JavaScript. שינויים ב-native code (הוספת package עם native module) דורשים בנייה מחדש.' },
    ],
    questionBank: [
      {
        id: 'rn-pub-q1',
        text: 'מה EAS Build מאפשר לעשות?',
        options: ['בדיקות אוטומטיות', 'בניית קבצי .ipa ו-.aab בענן ללא Xcode', 'פרסום אוטומטי לחנויות', 'ניטור crashes'],
        correct: 1,
        explanation: 'EAS Build בונה קבצי אפליקציה native בענן — מבלי שתצטרכו להתקין Xcode או Android Studio.',
      },
      {
        id: 'rn-pub-q2',
        text: 'מה זה OTA Update?',
        options: ['עדכון דרך חנות האפליקציות', 'עדכון JavaScript ישירות למשתמשים ללא חנות', 'עדכון מערכת ההפעלה', 'עדכון SDK של Expo'],
        correct: 1,
        explanation: 'OTA (Over The Air) מאפשר לדחוף עדכוני JS לאפליקציות מותקנות מיד — ללא תהליך אישור בחנות.',
      },
      {
        id: 'rn-pub-q3',
        text: 'כמה עולה לפרסם ב-Google Play?',
        options: ['$99 בשנה', '$25 חד פעמי', 'חינם', '$10 לאפליקציה'],
        correct: 1,
        explanation: 'Google Play גובה $25 חד פעמי לרישום. Apple Developer Program גובה $99 לשנה.',
      },
      {
        id: 'rn-pub-q4',
        text: 'מתי OTA Update לא יספיק ויצטרכו לבנות מחדש?',
        options: ['בכל שינוי', 'כשמוסיפים package עם native module', 'כשמשנים צבעים', 'כשמוסיפים מסך חדש'],
        correct: 1,
        explanation: 'OTA עובד רק לשינויים ב-JavaScript. הוספת native module (למשל מצלמה, GPS) דורשת בנייה מחדש ועדכון בחנות.',
      },
    ],
  },
]
