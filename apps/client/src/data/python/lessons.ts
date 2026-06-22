import type { Lesson } from '../../types'

export const pythonLessons: Lesson[] = [
  {
    id: 'py-intro',
    title: 'מבוא ל-Python',
    summary: 'מה זה Python, למה ללמוד אותה, ואיך כותבים את השורה הראשונה',
    emoji: '🐍',
    content: [
      { type: 'heading', text: 'מה זה Python?' },
      { type: 'text', text: 'Python היא אחת משפות התכנות הפופולריות בעולם. משתמשים בה לכל דבר — אתרי אינטרנט, ניתוח נתונים, בינה מלאכותית, סקריפטים אוטומטיים ועוד. הסיבה לפופולריות? הקוד קריא כמעט כמו אנגלית.' },
      { type: 'tip', text: 'Python נולדה ב-1991 ועוצבה להיות קלה לקריאה ולכתיבה. שם השפה מגיע מהתוכנית "Monty Python\'s Flying Circus" ולא מהנחש!' },
      { type: 'heading', text: 'print — הדפסה למסך' },
      { type: 'text', text: 'הפקודה הראשונה שכל מתכנת Python לומד היא print(). היא מדפיסה טקסט או ערכים למסך.' },
      { type: 'code', lang: 'python', caption: 'שלום עולם!', code: `print("שלום עולם!")
# פלט: שלום עולם!

print("Python", "כיף", "ללמוד")
# פלט: Python כיף ללמוד

print(42)
# פלט: 42` },
      { type: 'heading', text: 'תגובות (Comments)' },
      { type: 'text', text: 'תגובות הן שורות שPython מתעלמת מהן — הן לנו, המתכנתים, כדי להסביר את הקוד.' },
      { type: 'code', lang: 'python', caption: 'תגובות בקוד', code: `# זו תגובה בשורה אחת

print("קוד רץ")  # גם תגובה לצד קוד

"""
תגובה על
מספר שורות
נקראת docstring
"""` },
      { type: 'heading', text: 'Python לא צריכה סוגריים מסולסלים' },
      { type: 'text', text: 'בניגוד לרוב השפות, Python משתמשת ב-indentation (הזחה) להגדרת בלוקי קוד — ללא {} ולא נקודה-פסיק בסוף שורה.' },
      { type: 'code', lang: 'python', caption: 'Python מסתמכת על הזחה', code: `if True:
    print("מוזח פנימה")
    print("שתי שורות באותו בלוק")
print("חזרה לחוץ")` },
    ],
    questionBank: [
      {
        id: 'py-intro-q1',
        text: 'מה עושה הפקודה print() ב-Python?',
        options: ['מדפיסה לנייר', 'מציגה טקסט או ערכים במסך', 'שומרת קובץ', 'מוחקת משתנה'],
        correct: 1,
        explanation: 'print() מציגה את הארגומנטים שמעבירים לה ישירות לפלט הסטנדרטי (המסך/קונסול).',
      },
      {
        id: 'py-intro-q2',
        text: 'איך מסמנים תגובה בשורה אחת ב-Python?',
        options: ['// תגובה', '/* תגובה */', '# תגובה', '-- תגובה'],
        correct: 2,
        explanation: 'ב-Python משתמשים ב-# לתגובות בשורה אחת.',
      },
      {
        id: 'py-intro-q3',
        text: 'כיצד Python מגדירה בלוקי קוד (במקום {})?',
        options: ['סוגריים עגולים', 'נקודה-פסיק', 'הזחה (indentation)', 'מילת begin/end'],
        correct: 2,
        explanation: 'Python משתמשת בהזחה (4 רווחים לרוב) להגדרת בלוקים. זה הופך את הקוד לקריא יותר.',
      },
      {
        id: 'py-intro-q4',
        text: 'מאיפה מגיע שם השפה Python?',
        options: ['מהנחש פייתון', 'מ-Monty Python\'s Flying Circus', 'משם ממציא השפה', 'מראשי תיבות'],
        correct: 1,
        explanation: 'Guido van Rossum, יוצר Python, אהב את התוכנית הקומית "Monty Python\'s Flying Circus" ושם את השפה על שמה.',
      },
    ],
  },
  {
    id: 'py-variables',
    title: 'משתנים וטיפוסים',
    summary: 'int, float, str, bool — איך שומרים מידע ב-Python',
    emoji: '📦',
    content: [
      { type: 'heading', text: 'מה זה משתנה?' },
      { type: 'text', text: 'משתנה הוא תיבה עם שם שבה אפשר לשמור ערך. ב-Python לא צריך להצהיר על הטיפוס — Python מבינה לבד.' },
      { type: 'code', lang: 'python', caption: 'יצירת משתנים', code: `name = "דוד"
age = 30
height = 1.75
is_student = True

print(name)    # דוד
print(age)     # 30
print(height)  # 1.75` },
      { type: 'heading', text: 'טיפוסי נתונים בסיסיים' },
      {
        type: 'table',
        caption: 'טיפוסים נפוצים ב-Python',
        headers: ['טיפוס', 'שם בPython', 'דוגמה'],
        rows: [
          ['מספר שלם', 'int', '42, -7, 0'],
          ['מספר עשרוני', 'float', '3.14, -0.5'],
          ['מחרוזת', 'str', '"שלום", \'Python\''],
          ['בוליאני', 'bool', 'True, False'],
        ],
      },
      { type: 'heading', text: 'פונקציית type()' },
      { type: 'text', text: 'רוצים לדעת מה הטיפוס של משתנה? השתמשו ב-type().' },
      { type: 'code', lang: 'python', caption: 'בדיקת טיפוס', code: `x = 10
print(type(x))        # <class 'int'>

y = "שלום"
print(type(y))        # <class 'str'>

z = 3.14
print(type(z))        # <class 'float'>` },
      { type: 'heading', text: 'המרת טיפוסים' },
      { type: 'text', text: 'casting היא המרה ידנית מטיפוס לטיפוס. הקוד מדגים שמחרוזת "42" אינה מספר — צריך int() כדי להפוך אותה לכזו. שימו לב שניסיון להמיר מחרוזת שאינה מספר יגרום לשגיאה בזמן ריצה.' },
      { type: 'code', lang: 'python', caption: 'casting — המרה בין טיפוסים', code: `n = "42"
print(type(n))        # str

n_int = int(n)
print(type(n_int))    # int
print(n_int + 8)      # 50

f = float("3.14")     # str → float
s = str(100)          # int → str` },
      { type: 'tip', text: 'Python היא dynamically typed — הטיפוס נקבע בזמן ריצה. אפשר להכניס לאותו משתנה ערכים מסוגים שונים.' },
    ],
    questionBank: [
      {
        id: 'py-vars-q1',
        text: 'מה יציג הקוד: x = 5; print(type(x))?',
        options: ["'number'", "<class 'int'>", "<class 'float'>", 'int'],
        correct: 1,
        explanation: "type() מחזירה את הטיפוס בפורמט <class 'type'>. עבור מספר שלם זה <class 'int'>.",
      },
      {
        id: 'py-vars-q2',
        text: 'מה הטיפוס של הערך True ב-Python?',
        options: ['int', 'str', 'bool', 'bit'],
        correct: 2,
        explanation: 'True ו-False הם ערכי bool (בוליאני) ב-Python.',
      },
      {
        id: 'py-vars-q3',
        text: 'כיצד ממירים מחרוזת "10" למספר שלם?',
        options: ['number("10")', 'int("10")', 'parse("10")', 'integer("10")'],
        correct: 1,
        explanation: 'int() ממירה ערכים לשלם. float() לעשרוני, str() למחרוזת.',
      },
      {
        id: 'py-vars-q4',
        text: 'מה ב-Python ייחודי לגבי הצהרת משתנים?',
        options: ['חייב לציין טיפוס', 'לא צריך להצהיר על הטיפוס', 'חייב להשתמש ב-var', 'חייב להשתמש ב-let'],
        correct: 1,
        explanation: 'Python היא dynamically typed — הטיפוס נקבע אוטומטית לפי הערך שמכניסים.',
      },
    ],
  },
  {
    id: 'py-strings',
    title: 'מחרוזות ופעולות',
    summary: 'f-strings, שרשור, פעולות על מחרוזות ואריתמטיקה בסיסית',
    emoji: '✂️',
    content: [
      { type: 'heading', text: 'פעולות מתמטיות' },
      { type: 'text', text: 'Python תומכת בכל פעולות החשבון הבסיסיות ובכמה נוספות. שני האופרטורים הייחודיים שכדאי לזכור: // לחילוק שלם (ללא שארית) ו-** לחזקה. שימו לב ש-% מחזיר את השארית של החילוק, שימושי למאוד לבדיקת זוגיות.' },
      { type: 'code', lang: 'python', caption: 'אריתמטיקה בסיסית', code: `print(5 + 3)   # 8   חיבור
print(10 - 4)  # 6   חיסור
print(3 * 4)   # 12  כפל
print(10 / 3)  # 3.333...  חילוק
print(10 // 3) # 3   חילוק שלם
print(10 % 3)  # 1   שארית
print(2 ** 8)  # 256 חזקה` },
      { type: 'heading', text: 'עבודה עם מחרוזות' },
      { type: 'text', text: 'מחרוזות ב-Python ניתנות לשרשור (חיבור) עם + ולמדידה עם len(). שימו לב ש-len() סופר תווים ולא מילים, כולל רווחים — לכן "שלום עולם" בת 9 תווים (5 + רווח + 4 = 10 במקרה זה).' },
      { type: 'code', lang: 'python', caption: 'שרשור ואורך', code: `first = "שלום"
second = " עולם"
full = first + second
print(full)          # שלום עולם

print(len(full))     # 9 — אורך המחרוזת` },
      { type: 'heading', text: 'f-strings — הדרך המומלצת' },
      { type: 'text', text: 'f-strings מאפשרות להכניס משתנים ישירות לתוך מחרוזת בצורה נקייה וקריאה.' },
      { type: 'code', lang: 'python', caption: 'f-strings', code: `name = "שרה"
age = 28
print(f"שמי {name} ואני בת {age}")
# שמי שרה ואני בת 28

price = 9.99
print(f"המחיר הוא {price:.2f} ₪")
# המחיר הוא 9.99 ₪` },
      { type: 'heading', text: 'מתודות על מחרוזות' },
      { type: 'text', text: 'מחרוזות ב-Python מגיעות עם מגוון מתודות מובנות. שימו לב שכל מתודה מחזירה מחרוזת חדשה ולא משנה את המקורית, כי מחרוזות הן immutable. replace() ו-split() שימושיות במיוחד לעיבוד טקסט.' },
      { type: 'code', lang: 'python', caption: 'מתודות נפוצות', code: `s = "  Python  "
print(s.strip())        # "Python" — מחיקת רווחים
print(s.upper())        # "  PYTHON  "
print(s.lower())        # "  python  "

msg = "שלום עולם"
print(msg.replace("עולם", "Python"))  # שלום Python
print(msg.split(" "))  # ['שלום', 'עולם']
print(msg.startswith("שלום"))  # True` },
      { type: 'tip', text: 'מחרוזות ב-Python הן immutable — לא משנים אותן, יוצרים מחרוזת חדשה.' },
    ],
    questionBank: [
      {
        id: 'py-str-q1',
        text: 'מה הפלט של: print(10 // 3)?',
        options: ['3.33', '3', '1', '4'],
        correct: 1,
        explanation: '// הוא חילוק שלם — מחזיר רק את החלק השלם של החילוק. 10 // 3 = 3.',
      },
      {
        id: 'py-str-q2',
        text: 'מה יציג: name = "עמית"; print(f"שלום {name}")?',
        options: ['שלום {name}', 'שלום עמית', 'f"שלום עמית"', 'שגיאה'],
        correct: 1,
        explanation: 'f-string עם {} מחליף את שם המשתנה בערכו. הפלט יהיה: שלום עמית.',
      },
      {
        id: 'py-str-q3',
        text: 'איזה אופרטור מחשב חזקה ב-Python?',
        options: ['^', '**', 'pow', '^^'],
        correct: 1,
        explanation: 'ב-Python ** הוא אופרטור החזקה. 2 ** 8 = 256.',
      },
      {
        id: 'py-str-q4',
        text: 'מה עושה מתודת .strip() על מחרוזת?',
        options: ['מחלקת למילים', 'מוחקת רווחים מהצדדים', 'הופכת לאותיות קטנות', 'מחזירה את האורך'],
        correct: 1,
        explanation: '.strip() מסירה רווחים (ותווי מעבר שורה) מתחילת ומסוף המחרוזת.',
      },
    ],
  },
  {
    id: 'py-conditions',
    title: 'תנאים',
    summary: 'if, elif, else — קבלת החלטות בקוד',
    emoji: '🔀',
    content: [
      { type: 'heading', text: 'if / elif / else' },
      { type: 'text', text: 'תנאים מאפשרים לקוד לקבל החלטות. אם תנאי מסוים מתקיים — בצע פעולה אחת, אחרת — פעולה אחרת.' },
      { type: 'code', lang: 'python', caption: 'מבנה בסיסי', code: `age = 20

if age >= 18:
    print("מותר")
elif age >= 13:
    print("נוער")
else:
    print("ילד")

# פלט: מותר` },
      { type: 'heading', text: 'אופרטורי השוואה' },
      {
        type: 'table',
        caption: 'אופרטורים',
        headers: ['אופרטור', 'משמעות', 'דוגמה'],
        rows: [
          ['==', 'שווה', 'x == 5'],
          ['!=', 'לא שווה', 'x != 0'],
          ['>', 'גדול מ', 'x > 10'],
          ['<', 'קטן מ', 'x < 10'],
          ['>=', 'גדול שווה', 'x >= 5'],
          ['<=', 'קטן שווה', 'x <= 5'],
        ],
      },
      { type: 'heading', text: 'אופרטורים לוגיים' },
      { type: 'text', text: 'ב-Python משתמשים במילים and, or, not במקום הסמלים && ו-|| שמוכרים משפות אחרות. הקוד מדגים שילוב של תנאי מספרי עם תנאי בוליאני — שני התנאים יחד (and) מחזירים True רק אם שניהם מתקיימים.' },
      { type: 'code', lang: 'python', caption: 'and, or, not', code: `score = 85
vip = True

if score >= 80 and vip:
    print("גישה מלאה")

if score < 50 or not vip:
    print("גישה מוגבלת")` },
      { type: 'heading', text: 'תנאי בשורה אחת (Ternary)' },
      { type: 'text', text: 'ב-Python ניתן לכתוב תנאי פשוט בשורה אחת בתחביר: ערך_אם_אמת if תנאי else ערך_אם_שקר. זה שימושי להשמות קצרות, אך לתנאים מורכבים עדיף להשתמש ב-if רגיל לשמירה על קריאות.' },
      { type: 'code', lang: 'python', caption: 'ternary expression', code: `age = 20
status = "מבוגר" if age >= 18 else "קטין"
print(status)  # מבוגר` },
      { type: 'tip', text: 'ב-Python משתמשים ב-and, or, not בעברית לוגית — לא &&, ||, ! כמו בשפות אחרות.' },
    ],
    questionBank: [
      {
        id: 'py-cond-q1',
        text: 'מה הפלט של: x = 7; print("גדול" if x > 5 else "קטן")?',
        options: ['קטן', 'גדול', 'True', 'שגיאה'],
        correct: 1,
        explanation: 'x = 7 שגדול מ-5, לכן הביטוי הternary יחזיר "גדול".',
      },
      {
        id: 'py-cond-q2',
        text: 'כמה תנאי elif אפשר לשים אחרי if אחד?',
        options: ['אחד בלבד', 'שניים מקסימום', 'כמה שרוצים', 'אף אחד'],
        correct: 2,
        explanation: 'אפשר להוסיף כמה תנאי elif שרוצים לאחר ה-if הראשון.',
      },
      {
        id: 'py-cond-q3',
        text: 'מה ההבדל בין = ל-== ב-Python?',
        options: ['אין הבדל', '= השמה, == השוואה', '== השמה, = השוואה', '= לשלמים, == לכולם'],
        correct: 1,
        explanation: '= משמש להשמת ערך למשתנה. == משמש להשוואת שני ערכים.',
      },
      {
        id: 'py-cond-q4',
        text: 'כיצד כותבים AND לוגי ב-Python?',
        options: ['&&', '&', 'and', 'AND'],
        correct: 2,
        explanation: 'ב-Python משתמשים במילים and, or, not (לא בסמלים && ו-||).',
      },
    ],
  },
  {
    id: 'py-loops',
    title: 'לולאות',
    summary: 'for, while, range, break, continue — חזרה על פעולות',
    emoji: '🔁',
    content: [
      { type: 'heading', text: 'לולאת for' },
      { type: 'text', text: 'לולאת for עוברת על פריטים ברצף — רשימה, טווח מספרים, מחרוזת.' },
      { type: 'code', lang: 'python', caption: 'for בסיסי', code: `fruits = ["תפוח", "בננה", "תפוז"]
for fruit in fruits:
    print(fruit)
# תפוח
# בננה
# תפוז` },
      { type: 'heading', text: 'range() — טווח מספרים' },
      { type: 'text', text: 'range() מייצרת טווח מספרים ומשמשת לולאות for כמעט בכל תוכנית Python. שימו לב לשלושת הצורות: range(n) מ-0 עד n-1, range(start, stop) עם ערך התחלה, ו-range(start, stop, step) עם קפיצות — למשל כל מספר זוגי.' },
      { type: 'code', lang: 'python', caption: 'range', code: `for i in range(5):
    print(i)         # 0, 1, 2, 3, 4

for i in range(1, 6):
    print(i)         # 1, 2, 3, 4, 5

for i in range(0, 10, 2):
    print(i)         # 0, 2, 4, 6, 8` },
      { type: 'heading', text: 'לולאת while' },
      { type: 'text', text: 'לולאת while רצה כל עוד תנאי מסוים מתקיים. הקוד מציג דפוס קלאסי: אתחול משתנה, בדיקת תנאי, ועדכון המשתנה בתוך הלולאה. חשוב לוודא שהמשתנה מתקדם — אחרת הלולאה תרוץ לנצח (infinite loop).' },
      { type: 'code', lang: 'python', caption: 'while', code: `count = 0
while count < 5:
    print(count)
    count += 1
# 0, 1, 2, 3, 4` },
      { type: 'heading', text: 'break ו-continue' },
      { type: 'text', text: 'break ו-continue נותנים שליטה עדינה בזרימת הלולאה. break עוצר את הלולאה לגמרי מיד, בעוד continue מדלג לאיטרציה הבאה מבלי לסיים את הנוכחית. שימו לב בדוגמה: break מסיים בדיוק כשמגיעים ל-5, ו-continue מדלג על כל מספרים זוגיים.' },
      { type: 'code', lang: 'python', caption: 'שליטה בלולאה', code: `for i in range(10):
    if i == 5:
        break        # עוצר את הלולאה לגמרי
    print(i)
# 0, 1, 2, 3, 4

for i in range(10):
    if i % 2 == 0:
        continue     # מדלג לאיטרציה הבאה
    print(i)
# 1, 3, 5, 7, 9` },
      { type: 'tip', text: 'enumerate() מחזיר גם אינדקס וגם ערך: for i, val in enumerate(list).' },
    ],
    questionBank: [
      {
        id: 'py-loop-q1',
        text: 'מה מדפיס: for i in range(3): print(i)?',
        options: ['1 2 3', '0 1 2', '0 1 2 3', '1 2'],
        correct: 1,
        explanation: 'range(3) מייצר 0, 1, 2. range מתחיל מ-0 כברירת מחדל ולא כולל את הערך העליון.',
      },
      {
        id: 'py-loop-q2',
        text: 'מה עושה break בלולאה?',
        options: ['מדלג לאיטרציה הבאה', 'עוצר את הלולאה לגמרי', 'חוזר לתחילת הלולאה', 'גורם לשגיאה'],
        correct: 1,
        explanation: 'break עוצר את הלולאה לגמרי וממשיך מהשורה שאחריה.',
      },
      {
        id: 'py-loop-q3',
        text: 'מה ההבדל בין for ל-while?',
        options: ['אין הבדל', 'for — מספר ידוע של פעמים, while — תנאי', 'while — מהיר יותר', 'for — רק למספרים'],
        correct: 1,
        explanation: 'for מתאים כשיודעים כמה פעמים לרוץ (על רצף). while רץ כל עוד תנאי מסוים נכון.',
      },
      {
        id: 'py-loop-q4',
        text: 'מה עושה continue בלולאה?',
        options: ['עוצר לגמרי', 'מדלג לאיטרציה הבאה', 'מחזיר ערך', 'מאתחל מחדש'],
        correct: 1,
        explanation: 'continue מדלג לאיטרציה הבאה — מפסיק את הריצה הנוכחית אבל הלולאה ממשיכה.',
      },
    ],
  },
  {
    id: 'py-functions',
    title: 'פונקציות',
    summary: 'def, return, ארגומנטים, ברירות מחדל ו-scope',
    emoji: '⚙️',
    content: [
      { type: 'heading', text: 'מה זה פונקציה?' },
      { type: 'text', text: 'פונקציה היא בלוק קוד עם שם שאפשר לקרוא לו שוב ושוב. היא עוזרת לנו לא לכתוב את אותו קוד פעמים.' },
      { type: 'code', lang: 'python', caption: 'פונקציה בסיסית', code: `def greet():
    print("שלום!")

greet()   # שלום!
greet()   # שלום!` },
      { type: 'heading', text: 'ארגומנטים ו-return' },
      { type: 'text', text: 'פונקציה יכולה לקבל פרמטרים ולהחזיר ערך באמצעות return. הקוד מציג שתי פונקציות: add שמחשבת סכום ומחזירה מספר, ו-greet שמחזירה מחרוזת בשיטת f-string. שימו לב שהפונקציה נקראת עם ארגומנטים בסדר שבו הפרמטרים הוגדרו.' },
      { type: 'code', lang: 'python', caption: 'פרמטרים והחזרת ערך', code: `def add(a, b):
    return a + b

result = add(3, 7)
print(result)  # 10

def greet(name):
    return f"שלום, {name}!"

print(greet("משה"))  # שלום, משה!` },
      { type: 'heading', text: 'ברירות מחדל (Default Values)' },
      { type: 'text', text: 'פרמטר עם ערך ברירת מחדל הופך לאופציונלי — אפשר לקרוא לפונקציה עם או בלי הארגומנט הזה. הקוד מדגים שאם לא מעבירים greeting, תשמש ברירת המחדל "שלום". פרמטרים עם ברירות מחדל חייבים להופיע אחרי פרמטרים ללא ברירת מחדל.' },
      { type: 'code', lang: 'python', caption: 'ערכי ברירת מחדל', code: `def greet(name, greeting="שלום"):
    return f"{greeting}, {name}!"

print(greet("דנה"))             # שלום, דנה!
print(greet("דנה", "היי"))      # היי, דנה!` },
      { type: 'heading', text: 'args ו-kwargs' },
      { type: 'text', text: '*args מאפשר לפונקציה לקבל כמות בלתי מוגדרת של ארגומנטים שמגיעים כ-tuple. **kwargs מקבל ארגומנטים מתויגים (keyword) כ-dictionary. שימו לב ש-sum() היא פונקציה מובנית ב-Python שמסכמת כל iterable, כולל tuple.' },
      { type: 'code', lang: 'python', caption: 'מספר משתנה של ארגומנטים', code: `def total(*args):
    return sum(args)

print(total(1, 2, 3))       # 6
print(total(10, 20, 30, 40)) # 100

def show_info(**kwargs):
    for key, value in kwargs.items():
        print(f"{key}: {value}")

show_info(name="רון", age=25)` },
      { type: 'tip', text: 'פונקציה ללא return מחזירה None באופן אוטומטי.' },
    ],
    questionBank: [
      {
        id: 'py-func-q1',
        text: 'מה מילת המפתח להגדרת פונקציה ב-Python?',
        options: ['function', 'func', 'def', 'fn'],
        correct: 2,
        explanation: 'ב-Python מגדירים פונקציה עם מילת המפתח def.',
      },
      {
        id: 'py-func-q2',
        text: 'מה מחזירה פונקציה שאין בה return?',
        options: ['0', '""', 'None', 'שגיאה'],
        correct: 2,
        explanation: 'פונקציה ללא return מחזירה None — ערך מיוחד המייצג "כלום".',
      },
      {
        id: 'py-func-q3',
        text: 'מה עושה *args בפונקציה?',
        options: ['מכפיל את הארגומנט', 'מאפשר מספר משתנה של ארגומנטים', 'מסמן ארגומנט חובה', 'מגדיר ברירת מחדל'],
        correct: 1,
        explanation: '*args מאפשר להעביר כמות משתנה של ארגומנטים, שנאספים ל-tuple.',
      },
      {
        id: 'py-func-q4',
        text: 'כיצד מגדירים ערך ברירת מחדל לפרמטר?',
        options: ['def f(x = 5)', 'def f(x default 5)', 'def f(x: 5)', 'def f(x || 5)'],
        correct: 0,
        explanation: 'ערך ברירת מחדל מוגדר עם = בהגדרת הפרמטר: def greet(name="עולם").',
      },
    ],
  },
  {
    id: 'py-collections',
    title: 'רשימות ומילונים',
    summary: 'list, dict, tuple, set — אוספי נתונים ב-Python',
    emoji: '📚',
    content: [
      { type: 'heading', text: 'רשימה (List)' },
      { type: 'text', text: 'List היא אוסף מסודר של פריטים הניתנים לשינוי. מסומנת בסוגריים מרובעים.' },
      { type: 'code', lang: 'python', caption: 'עבודה עם List', code: `fruits = ["תפוח", "בננה", "תפוז"]

print(fruits[0])       # תפוח (אינדקס מ-0)
print(fruits[-1])      # תפוז (מהסוף)

fruits.append("ענב")  # הוספה בסוף
fruits.remove("בננה") # מחיקה לפי ערך
print(len(fruits))     # 3

fruits.sort()          # מיון` },
      { type: 'heading', text: 'מילון (Dictionary)' },
      { type: 'text', text: 'Dictionary שומר זוגות key:value. גישה לפי מפתח במקום אינדקס.' },
      { type: 'code', lang: 'python', caption: 'עבודה עם Dict', code: `person = {
    "name": "יעל",
    "age": 30,
    "city": "תל אביב"
}

print(person["name"])       # יעל
person["email"] = "y@y.com" # הוספת מפתח
print(person.get("phone", "לא קיים"))  # לא קיים

for key, value in person.items():
    print(f"{key}: {value}")` },
      { type: 'heading', text: 'Tuple ו-Set' },
      { type: 'text', text: 'Tuple הוא כמו רשימה אך בלתי ניתנת לשינוי — מתאים לנתונים קבועים כמו קואורדינטות. Set הוא אוסף ללא כפילויות וללא סדר קבוע. שימו לב: כשמוסיפים "python" פעם שנייה ל-set הוא פשוט לא מתווסף — זו ההתנהגות המכוונת.' },
      { type: 'code', lang: 'python', caption: 'tuple וset', code: `# Tuple — כמו list אבל לא ניתן לשינוי
coords = (32.08, 34.78)
print(coords[0])   # 32.08

# Set — ללא כפילויות, לא מסודר
tags = {"python", "code", "python"}
print(tags)  # {'python', 'code'} — ללא כפילות` },
      { type: 'tip', text: 'List Comprehension: [x*2 for x in range(5)] מייצר [0,2,4,6,8] בשורה אחת.' },
    ],
    questionBank: [
      {
        id: 'py-coll-q1',
        text: 'מה ההבדל בין List ל-Tuple?',
        options: ['אין הבדל', 'List ניתן לשינוי, Tuple לא', 'Tuple ניתן לשינוי, List לא', 'List מהיר יותר'],
        correct: 1,
        explanation: 'List ניתן לשינוי (mutable) — אפשר להוסיף ולמחוק. Tuple הוא immutable — לא ניתן לשנות אחרי יצירה.',
      },
      {
        id: 'py-coll-q2',
        text: 'כיצד מוסיפים פריט לסוף List?',
        options: ['list.add()', 'list.push()', 'list.append()', 'list.insert()'],
        correct: 2,
        explanation: '.append() מוסיף פריט לסוף הרשימה. .insert(i, val) מוסיף במיקום ספציפי.',
      },
      {
        id: 'py-coll-q3',
        text: 'מה ייחודי ב-Set?',
        options: ['מסודר לפי מפתח', 'מאפשר כפילויות', 'לא מאפשר כפילויות', 'רק מספרים'],
        correct: 2,
        explanation: 'Set לא שומר כפילויות — כל ערך מופיע פעם אחת. שימושי לסינון ערכים כפולים.',
      },
      {
        id: 'py-coll-q4',
        text: 'כיצד גישה בטוחה לערך ב-dict שאולי לא קיים?',
        options: ['dict[key]', 'dict.get(key)', 'dict.get(key, default)', 'dict.find(key)'],
        correct: 2,
        explanation: 'dict.get(key, default) מחזיר את הערך אם קיים, אחרת מחזיר את default. dict[key] יזרוק KeyError אם לא קיים.',
      },
    ],
  },
  {
    id: 'py-files-errors',
    title: 'קבצים וטיפול בשגיאות',
    summary: 'open, read, write, try/except — עבודה עם קבצים ושגיאות',
    emoji: '🛡️',
    content: [
      { type: 'heading', text: 'קריאה וכתיבה של קבצים' },
      { type: 'text', text: 'הקוד מציג שלוש פעולות נפוצות עם קבצים: כתיבה, קריאה של כל התוכן, וקריאה שורה-שורה. שימו לב לשימוש ב-with open() — הוא מבטיח שהקובץ ייסגר אוטומטית גם אם תתרחש שגיאה, וחובה לציין encoding="utf-8" לתמיכה בעברית.' },
      { type: 'code', lang: 'python', caption: 'פתיחת קובץ', code: `# כתיבה לקובץ
with open("output.txt", "w", encoding="utf-8") as f:
    f.write("שורה ראשונה\\n")
    f.write("שורה שנייה\\n")

# קריאה מקובץ
with open("output.txt", "r", encoding="utf-8") as f:
    content = f.read()
    print(content)

# קריאה שורה שורה
with open("output.txt", "r", encoding="utf-8") as f:
    for line in f:
        print(line.strip())` },
      {
        type: 'table',
        caption: 'מצבי פתיחת קובץ',
        headers: ['מצב', 'משמעות'],
        rows: [
          ['"r"', 'קריאה בלבד (ברירת מחדל)'],
          ['"w"', 'כתיבה — מוחק תוכן קיים'],
          ['"a"', 'הוספה לסוף הקובץ'],
          ['"r+"', 'קריאה וכתיבה'],
        ],
      },
      { type: 'heading', text: 'try / except — טיפול בשגיאות' },
      { type: 'text', text: 'try/except מאפשר לתוכנית להמשיך לרוץ גם כשמתרחשת שגיאה. הקוד מדגים תפיסה של סוגי שגיאות ספציפיים: ValueError לקלט לא מספרי ו-ZeroDivisionError לחלוקה באפס. בלוק finally תמיד יופעל — שמיד לניקוי משאבים.' },
      { type: 'code', lang: 'python', caption: 'טיפול בשגיאות', code: `try:
    num = int(input("הכנס מספר: "))
    result = 10 / num
    print(f"התוצאה: {result}")
except ValueError:
    print("זה לא מספר!")
except ZeroDivisionError:
    print("אי אפשר לחלק באפס!")
except Exception as e:
    print(f"שגיאה כללית: {e}")
finally:
    print("תמיד מתבצע — סיום")` },
      { type: 'heading', text: 'raise — זריקת שגיאה' },
      { type: 'text', text: 'לפעמים רוצים לזרוק שגיאה מכוון — למשל כשהקלט לא תקין. הקוד מדגים פונקציה שבודקת תנאי ומשתמשת ב-raise כדי להודיע על קלט בעייתי. ה-caller לוכד את השגיאה ב-except ומציג הודעה ידידותית.' },
      { type: 'code', lang: 'python', caption: 'זריקת שגיאה ידנית', code: `def divide(a, b):
    if b == 0:
        raise ValueError("המחלק לא יכול להיות אפס")
    return a / b

try:
    print(divide(10, 0))
except ValueError as e:
    print(e)  # המחלק לא יכול להיות אפס` },
      { type: 'tip', text: 'השתמשו ב-with open() תמיד — הוא סוגר את הקובץ אוטומטית גם במקרה של שגיאה.' },
    ],
    questionBank: [
      {
        id: 'py-files-q1',
        text: 'מה קורה אם פותחים קובץ במצב "w" וכבר יש בו תוכן?',
        options: ['מוסיף לסוף', 'שגיאה', 'התוכן הקיים נמחק', 'הקובץ לא נפתח'],
        correct: 2,
        explanation: '"w" מוחק את כל התוכן הקיים ומתחיל מחדש. השתמשו ב-"a" להוספה לסוף.',
      },
      {
        id: 'py-files-q2',
        text: 'מה עושה בלוק finally?',
        options: ['רץ רק אם יש שגיאה', 'רץ רק אם אין שגיאה', 'תמיד רץ בסוף', 'עוצר את התוכנית'],
        correct: 2,
        explanation: 'finally תמיד מתבצע — בין אם הייתה שגיאה ובין אם לא. מתאים לניקוי משאבים.',
      },
      {
        id: 'py-files-q3',
        text: 'למה להשתמש ב-with open() במקום open() רגיל?',
        options: ['מהיר יותר', 'סוגר קובץ אוטומטית', 'תומך בעברית', 'פותח קבצים מרובים'],
        correct: 1,
        explanation: 'with סוגר את הקובץ אוטומטית בסיום הבלוק — גם אם קרתה שגיאה. זה מונע דליפת משאבים.',
      },
      {
        id: 'py-files-q4',
        text: 'כיצד תופסים סוג שגיאה ספציפי ב-Python?',
        options: ['catch(TypeError)', 'except TypeError:', 'on error TypeError:', 'handle TypeError:'],
        correct: 1,
        explanation: 'ב-Python משתמשים ב-except TypeName: לתפיסת שגיאה ספציפית.',
      },
    ],
  },
]
