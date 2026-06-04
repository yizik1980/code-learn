import type { Lesson } from '../../types'

export const vibeCodingLessons: Lesson[] = [
  {
    id: 'vibe-intro',
    title: 'מה זה Vibe Coding?',
    summary: 'הגישה החדשה לפיתוח תוכנה עם AI — לתאר במילים, לקבל קוד, לזרום',
    emoji: '✨',
    content: [
      { type: 'heading', text: 'Vibe Coding — תכנות בזרימה' },
      { type: 'text', text: 'Vibe Coding היא גישת פיתוח שבה במקום לכתוב כל שורת קוד ידנית, אתה מתאר מה אתה רוצה לבנות ב-AI, הוא מייצר את הקוד, ואתה מנחה, בודק ומחזק. הטרמין הוטבע על ידי Andrej Karpathy ב-2025 וסחף את עולם הפיתוח.' },
      { type: 'tip', text: '"The hottest new programming language is English" — Andrej Karpathy. תאר מה אתה רוצה, לא איך לממש אותו.' },
      { type: 'heading', text: 'הכלים המרכזיים' },
      {
        type: 'table',
        caption: 'כלי Vibe Coding פופולריים',
        headers: ['כלי', 'מה הוא עושה', 'מתאים ל'],
        rows: [
          ['Claude Code', 'AI שמבין את כל הפרויקט וכותב/עורך קבצים', 'פרויקטים קיימים, refactoring'],
          ['Cursor', 'IDE עם AI משולב — Composer לכתיבה, Chat להסברים', 'פיתוח יום-יומי'],
          ['v0 (Vercel)', 'מייצר UI מתיאור טקסט — React + Tailwind', 'macOS: פרונטאנד מהיר'],
          ['Bolt.new', 'אפליקציה שלמה מתיאור — stack מלא', 'פרוטוטייפ ראשוני'],
          ['GitHub Copilot', 'השלמת קוד ב-IDE בזמן הקלדה', 'עבודה בתוך קוד קיים'],
        ],
      },
      { type: 'heading', text: 'המעבר בין מצבים' },
      { type: 'text', text: 'Vibe Coding לא אומר לוותר על ידע. ככל שאתה מבין יותר קוד — תוצאות ה-AI יהיו טובות יותר. אתה הארכיטקט, ה-AI הוא הפועל. אתה מנחה, בודק, מתקן.' },
      { type: 'code', lang: 'text', caption: 'זרימת עבודה בסיסית', code: `1. תאר את מה שרוצה לבנות (בעברית/אנגלית)
2. ה-AI מייצר קוד
3. הרץ ובדוק — האם זה עובד?
4. אם לא — תאר את הבעיה ל-AI
5. חזור על התהליך עד שעובד
6. בדוק שאתה מבין את הקוד שנוצר` },
      { type: 'tip', text: 'תמיד הרץ את הקוד שה-AI כתב לפני שאתה ממשיך. לא לסמוך עיוורון — AI יכול להיות בטוח ולטעות.' },
    ],
    questionBank: [
      {
        id: 'vibe-intro-q1',
        text: 'מי טבע את המושג Vibe Coding?',
        options: ['Sam Altman', 'Andrej Karpathy', 'Linus Torvalds', 'Jeff Atwood'],
        correct: 1,
        explanation: 'Andrej Karpathy (מייסד-שותף של OpenAI לשעבר) טבע את המושג ב-2025 ותיאר את הגישה שבה מתארים לאמוד מה רוצים במקום לכתוב קוד.',
      },
      {
        id: 'vibe-intro-q2',
        text: 'מה ההגדרה הכי מדויקת של Vibe Coding?',
        options: ['כתיבת קוד בלי לבדוק', 'פיתוח תוכנה בהנחיית AI תוך תיאור במילים', 'שימוש בתבניות קוד מוכנות', 'תכנות זוגי עם שותף'],
        correct: 1,
        explanation: 'Vibe Coding היא גישה שבה המפתח מנחה AI בשפה טבעית, ה-AI כותב את הקוד, והמפתח בודק ומנחה. הידע של המפתח קובע את איכות התוצאה.',
      },
      {
        id: 'vibe-intro-q3',
        text: 'מה תפקיד המפתח ב-Vibe Coding?',
        options: ['כותב כל קוד ידנית', 'בודק ומנחה — ארכיטקט', 'רק מריץ קוד', 'כותב פרומפטים בלבד'],
        correct: 1,
        explanation: 'המפתח הוא הארכיטקט — מגדיר מה לבנות, מנחה את ה-AI, בודק תוצאות, ומוודא שהקוד נכון ומובן.',
      },
      {
        id: 'vibe-intro-q4',
        text: 'איזה כלי מתאים יותר ליצירת UI מתיאור טקסט בלבד?',
        options: ['GitHub Copilot', 'Claude Code', 'v0 by Vercel', 'Cursor'],
        correct: 2,
        explanation: 'v0 של Vercel מתמחה בייצור UI (React + Tailwind) מתיאור טקסט. מושלם ליצירת מסכים מהירה בלי להתחיל מאפס.',
      },
    ],
  },
  {
    id: 'vibe-prompts',
    title: 'כתיבת פרומפטים לקוד',
    summary: 'איך לתאר מה שאתה רוצה כדי לקבל קוד טוב — טכניקות ודוגמאות',
    emoji: '💬',
    content: [
      { type: 'heading', text: 'הפרומפט הוא הכל' },
      { type: 'text', text: 'איכות הקוד שה-AI מייצר תלויה ישירות באיכות הפרומפט שלך. פרומפט מעורפל = קוד מעורפל. פרומפט מדויק = קוד מדויק.' },
      { type: 'heading', text: 'מבנה פרומפט טוב' },
      { type: 'code', lang: 'text', caption: 'תבנית פרומפט אפקטיבית', code: `[הקשר] — מה הפרויקט, מה ה-stack
[מה לבנות] — תיאור ברור של הפיצ'ר
[דרישות] — אילוצים, סגנון, גודל
[דוגמה] — אם יש, ציין איך זה צריך לנראות

דוגמה טובה:
"אני בונה אפליקציית React עם TypeScript ו-Tailwind.
תוסיף קומפוננטת כרטיס משתמש שמציגה: תמונה, שם, תפקיד ו-3 כפתורי פעולה.
הסגנון צריך להיות minimal ו-dark mode.
השתמש ב-shadcn/ui לכפתורים."` },
      { type: 'heading', text: 'טכניקות מתקדמות' },
      {
        type: 'table',
        caption: 'טכניקות פרומפטינג לקוד',
        headers: ['טכניקה', 'מתי להשתמש', 'דוגמה'],
        rows: [
          ['Context first', 'תמיד — תאר את הפרויקט קודם', '"אני ב-Next.js 14 עם App Router..."'],
          ['Step by step', 'לוגיקה מורכבת', '"קודם צור טיפוסי TypeScript, אחר כך..."'],
          ['Show example', 'כשיש פלט צפוי', '"הקלט: {name, age} — הפלט צריך להיות..."'],
          ['Constraints', 'למנוע קוד לא רצוי', '"ללא external libraries, רק Vanilla JS"'],
          ['Persona', 'לסגנון ספציפי', '"כמו senior dev שכותב clean code..."'],
        ],
      },
      { type: 'heading', text: 'פרומפטים לתיקון שגיאות' },
      { type: 'code', lang: 'text', caption: 'תבנית לבאגים', code: `"הקוד הבא נותן שגיאה:
[הדבק את הקוד]

השגיאה:
[הדבק את הודעת השגיאה]

מה ציפיתי שיקרה:
[תאר את ההתנהגות הצפויה]

מה קורה בפועל:
[תאר מה קורה]"` },
      { type: 'tip', text: 'אל תשאל "למה זה לא עובד?" — שאל "הנה הקוד, הנה השגיאה, הנה ההתנהגות הצפויה, מה הבעיה?"' },
    ],
    questionBank: [
      {
        id: 'vibe-prompt-q1',
        text: 'מה ההבדל בין פרומפט טוב לרע לקוד?',
        options: ['אורך הפרומפט', 'מידת הספציפיות — הקשר, דרישות ואילוצים', 'שפת הפרומפט', 'מספר השאלות'],
        correct: 1,
        explanation: 'פרומפט טוב כולל: הקשר (הפרויקט ו-stack), מה בדיוק לבנות, דרישות ואילוצים. פרומפט מעורפל מביא קוד מעורפל.',
      },
      {
        id: 'vibe-prompt-q2',
        text: 'כיצד הכי נכון לדווח על באג ל-AI?',
        options: ['לשאול "למה זה לא עובד?"', 'לתת קוד + הודעת שגיאה + התנהגות צפויה', 'לתאר רגשית את הבעיה', 'לשאול "תתקן לי"'],
        correct: 1,
        explanation: 'AI צריך עובדות: הקוד הבעייתי, הודעת השגיאה המדויקת, והתנהגות צפויה לעומת בפועל. ככל שיותר מידע — תיקון טוב יותר.',
      },
      {
        id: 'vibe-prompt-q3',
        text: 'מה טכניקת "Context first"?',
        options: ['לשים הדוגמה ראשונה', 'לתאר את הפרויקט וה-stack לפני הבקשה', 'לכתוב בקוד לפני הטקסט', 'לשאול שאלות מקדימות'],
        correct: 1,
        explanation: 'לפני שאתה מבקש משהו, ספר ל-AI על הפרויקט: "אני ב-React 18 עם TypeScript ו-Vite..." זה עוזר ל-AI לייצר קוד מתאים לסביבה שלך.',
      },
      {
        id: 'vibe-prompt-q4',
        text: 'כיצד אפשר לאלץ AI לא להשתמש ב-external libraries?',
        options: ['לא אפשרי', 'constraint בפרומפט: "ללא ספריות חיצוניות"', 'לשנות הגדרות', 'לשאול בעברית'],
        correct: 1,
        explanation: 'הוספת constraints לפרומפט עובדת מצוין. "ללא external libraries", "רק Vanilla CSS", "בלי jQuery" — AI יכבד את ההגבלות.',
      },
    ],
  },
  {
    id: 'vibe-workflow',
    title: 'Workflow מלא עם AI',
    summary: 'מרעיון לקוד עובד — תהליך העבודה המלא עם כלי AI',
    emoji: '🔄',
    content: [
      { type: 'heading', text: 'שלב 1 — הגדרת הפרויקט' },
      { type: 'text', text: 'לפני שמתחילים לכתוב קוד, כדאי לשוחח עם ה-AI על הארכיטקטורה. הוא יכול לעזור לבחור את ה-stack הנכון, להזהיר מבעיות עתידיות ולהציע מבנה תיקיות.' },
      { type: 'code', lang: 'text', caption: 'פרומפט לתכנון ראשוני', code: `"אני רוצה לבנות אפליקציית Todo List
עם: משתמשים, קטגוריות, תאריכי יעד ורמות עדיפות.
הפרונטאנד יהיה React, הבקאנד Node.js.

האם אתה ממליץ על מסד נתונים SQL או NoSQL?
מה יהיה מבנה הנתונים המומלץ?
האם יש בעיות שיכולות לצוץ בהמשך?"` },
      { type: 'heading', text: 'שלב 2 — בנייה מדרגתית (Iterative)' },
      { type: 'text', text: 'לא לבקש הכל בבת אחת. בנה פיצ\'ר אחד, בדוק שעובד, ואז המשך לפיצ\'ר הבא. זה מונע בלאגן ומקל על דיבאגינג.' },
      { type: 'code', lang: 'text', caption: 'סדר בנייה נכון', code: `✅ טוב — בנייה שלב אחר שלב:
1. "תיצור מבנה בסיסי של קומפוננטת TodoList ריקה"
2. "תוסיף אפשרות להוסיף Todo חדש"
3. "תוסיף אפשרות לסמן כהושלם"
4. "תוסיף פילטור לפי קטגוריה"

❌ רע — הכל בבת אחת:
"תיצור TodoApp מלא עם משתמשים, קטגוריות,
תאריכים, פרויוריטי, עריכה, מחיקה, sync..."` },
      { type: 'heading', text: 'שלב 3 — Code Review עם AI' },
      { type: 'code', lang: 'text', caption: 'פרומפט לסקירת קוד', code: `"תסקור את הקוד הזה ותחפש:
1. בעיות ביצועים
2. בעיות אבטחה
3. קוד שניתן לפשט
4. edge cases שלא מטופלים

[הדבק קוד]"` },
      { type: 'heading', text: 'שלב 4 — Documentation' },
      { type: 'code', lang: 'text', caption: 'פרומפט לתיעוד', code: `"תכתוב README לפרויקט הזה:
- מה זה עושה (2-3 משפטים)
- דרישות מקדימות
- הוראות התקנה
- איך להשתמש
- API reference (אם יש)

[הדבק קוד / מבנה פרויקט]"` },
      { type: 'tip', text: 'Commit אחרי כל פיצ\'ר שעובד. אם ה-AI יעשה עסק — תמיד יש לאן לחזור.' },
    ],
    questionBank: [
      {
        id: 'vibe-workflow-q1',
        text: 'מה עיקרון "בנייה מדרגתית" ב-Vibe Coding?',
        options: ['לבנות הכל בבת אחת', 'לבנות פיצ\'ר אחד, לבדוק, ואז להמשיך', 'לחכות שה-AI יסיים הכל', 'לכתוב קוד לפני שמבקשים מ-AI'],
        correct: 1,
        explanation: 'בנייה iterative — פיצ\'ר אחד בכל פעם — מקלה על דיבאגינג ומונעת קוד מסובך שקשה לתקן. ה-AI יעיל יותר עם בקשות ממוקדות.',
      },
      {
        id: 'vibe-workflow-q2',
        text: 'מדוע חשוב לעשות git commit אחרי כל פיצ\'ר עובד?',
        options: ['לשמור היסטוריה לצרכי קורות חיים', 'כדי שאפשר יהיה לחזור אם AI יקלקל', 'חובה חוקית', 'אין סיבה מיוחדת'],
        correct: 1,
        explanation: 'AI יכול לשבש קוד עובד. עם commit תקין לפני כל שינוי גדול, אפשר תמיד לחזור למצב יציב עם git reset.',
      },
      {
        id: 'vibe-workflow-q3',
        text: 'מה כדאי לשאול AI בשלב התכנון הראשוני?',
        options: ['להתחיל לכתוב קוד מיד', 'לשאול על ארכיטקטורה, stack ובעיות אפשריות', 'לבקש README', 'לשאול על עיצוב בלבד'],
        correct: 1,
        explanation: 'השלב הראשון הוא שיחת ארכיטקטורה — AI יכול להזהיר מבעיות עתידיות, להציע stack מתאים, ולעזור לתכנן מבנה נתונים טוב לפני שמתחילים.',
      },
      {
        id: 'vibe-workflow-q4',
        text: 'מה AI יכול לעשות בסקירת קוד (Code Review)?',
        options: ['רק למצוא שגיאות syntax', 'למצוא בעיות ביצועים, אבטחה, edge cases ועוד', 'רק לעצב קוד', 'לבדוק אם הקוד עובד'],
        correct: 1,
        explanation: 'AI מצוין ב-code review — יכול לזהות: security vulnerabilities, performance issues, code smells, missing edge cases ועוד, אם שואלים אותו נכון.',
      },
    ],
  },
  {
    id: 'vibe-debug',
    title: 'Debug ו-Refactor עם AI',
    summary: 'לתקן באגים ולשפר קוד קיים בעזרת AI — טכניקות ופרומפטים',
    emoji: '🔧',
    content: [
      { type: 'heading', text: 'גישת Debug אפקטיבית' },
      { type: 'text', text: 'כשיש באג — אל תלחץ "תתקן". תן ל-AI את כל המידע: הקוד, השגיאה, מה ציפית, מה קיבלת. ככל שיותר context — תיקון מדויק יותר.' },
      { type: 'code', lang: 'text', caption: 'שיחת debug מדגמית', code: `אתה: "הפונקציה הזו אמורה לסנן רשימה לפי תאריך
      אבל היא מחזירה רשימה ריקה תמיד:

      const filterByDate = (items, date) => {
        return items.filter(item => item.date === date)
      }

      קלט: items=[{date:'2024-01-15'}], date='2024-01-15'
      פלט: []"

Claude: "הבעיה היא שהשוואת strings. item.date ו-date
        הם אובייקטים שונים — אחד Date ואחד string.

        const filterByDate = (items, date) => {
          return items.filter(item =>
            new Date(item.date).toDateString() ===
            new Date(date).toDateString()
          )
        }"` },
      { type: 'heading', text: 'Refactoring עם AI' },
      { type: 'text', text: 'AI מצוין בשיפור קוד קיים — לפשט לוגיקה, לחלק לפונקציות קטנות, ולהחיל design patterns.' },
      { type: 'code', lang: 'text', caption: 'פרומפטים לrefactoring', code: `// פישוט:
"הקוד הזה עובד אבל מסובך מדי. תפשט אותו
ללא שינוי פונקציונליות: [קוד]"

// חלוקה לפונקציות:
"הפונקציה הזו עושה יותר מדי דברים. תחלק אותה
לפונקציות קטנות עם שם ברור: [קוד]"

// TypeScript:
"תוסיף TypeScript types לקוד הזה: [קוד JS]"

// Performance:
"תמצא מה מאט את הקוד הזה ותשפר: [קוד]"` },
      { type: 'heading', text: 'כשה-AI טועה' },
      { type: 'text', text: 'AI יכול לייצר קוד שנראה נכון אבל לא עובד. אסטרטגיות להתמודדות:' },
      { type: 'code', lang: 'text', caption: 'מה לעשות כשה-AI טועה', code: `1. "הקוד שלך לא עובד. השגיאה: [שגיאה]. נסה שוב."
2. "גישה אחרת — אולי [רעיון] יעבוד טוב יותר?"
3. "תסביר לי מה הקוד הזה עושה שלב שלב"
   (לזהות אם הוא הבין את הבעיה)
4. לפתוח שיחה חדשה ולנסח מחדש` },
      { type: 'tip', text: 'אם ה-AI נתקע על אותה שגיאה 3 פעמים — פתח שיחה חדשה ותאר את הבעיה אחרת. Context ישן יכול "לתקוע" את ה-AI.' },
    ],
    questionBank: [
      {
        id: 'vibe-debug-q1',
        text: 'מה המידע החשוב ביותר לספק ל-AI לדיבאגינג?',
        options: ['שם הקובץ', 'קוד + הודעת שגיאה + קלט ופלט צפוי לעומת בפועל', 'רק הודעת השגיאה', 'שם הפרויקט'],
        correct: 1,
        explanation: 'לדיבאגינג יעיל צריך: הקוד הבעייתי, הודעת השגיאה המדויקת, הקלט שהשתמשת בו, והפלט שציפית לקבל לעומת מה שקיבלת בפועל.',
      },
      {
        id: 'vibe-debug-q2',
        text: 'מה כדאי לעשות כשה-AI נתקע על אותה שגיאה שלוש פעמים?',
        options: ['לוותר', 'לפתוח שיחה חדשה ולנסח את הבעיה אחרת', 'להמשיך לשאול אותה שאלה', 'לשנות שפת תכנות'],
        correct: 1,
        explanation: 'context ישן יכול "לתקוע" את ה-AI. שיחה חדשה עם ניסוח אחר לרוב עוזרת — ה-AI מגיע "נקי" ועשוי לגשת לבעיה מזווית אחרת.',
      },
      {
        id: 'vibe-debug-q3',
        text: 'לאיזה סוג refactoring AI מצוין במיוחד?',
        options: ['שינוי שמות משתנים בלבד', 'פישוט לוגיקה, חלוקה לפונקציות, הוספת types', 'שינוי frameworks', 'מחיקת קוד בלבד'],
        correct: 1,
        explanation: 'AI מצוין ב: פישוט קוד מורכב, חלוקת פונקציות גדולות לקטנות, הוספת TypeScript types לקוד JS, ואיתור bottlenecks בביצועים.',
      },
      {
        id: 'vibe-debug-q4',
        text: 'כיצד לוודא שה-AI הבין את הבעיה נכון?',
        options: ['לסמוך שהבין', 'לבקש ממנו להסביר את הקוד שלו שלב שלב', 'לבדוק על ידי הרצה', 'לא ניתן לדעת'],
        correct: 1,
        explanation: '"תסביר לי מה הקוד הזה עושה שלב שלב" — אם ה-AI מתאר משהו שגוי, תדע שהוא לא הבין את הבעיה ותוכל לתקן את הניסוח.',
      },
    ],
  },
  {
    id: 'vibe-testing',
    title: 'Testing עם AI',
    summary: 'כתיבת טסטים, מציאת edge cases ו-TDD בעזרת AI',
    emoji: '🧪',
    content: [
      { type: 'heading', text: 'AI + Testing = Combo מנצח' },
      { type: 'text', text: 'כתיבת טסטים היא משימה שרוב המפתחים מדחים — היא חשובה אבל משעממת. AI הופך אותה להרבה יותר מהירה. ה-AI יכול: לייצר טסטים לקוד קיים, למצוא edge cases שלא חשבת עליהם, ולכתוב mock data מציאותי.' },
      { type: 'code', lang: 'text', caption: 'פרומפטים לbacking', code: `// טסטים לקוד קיים:
"תכתוב Jest unit tests לפונקציה הזו.
כלול: happy path, edge cases ו-error cases:
[הדבק פונקציה]"

// Edge cases:
"מה ה-edge cases שאני צריך לטסט
בפונקציה הזו? [פונקציה]"

// Mock data:
"תייצר 10 אובייקטי users מציאותיים
לפי הסכמה הזו: [interface]"

// Integration test:
"תכתוב supertest test ל-endpoint הזה:
POST /api/users שמקבל {name, email} [קוד route]"` },
      { type: 'heading', text: 'TDD עם AI' },
      { type: 'text', text: 'TDD (Test Driven Development) עם AI: כתוב את הדרישות, בקש טסטים, ואז בקש קוד שעובר את הטסטים.' },
      { type: 'code', lang: 'text', caption: 'TDD flow עם AI', code: `שלב 1 — הגדר דרישות:
"פונקציה calculateDiscount שמקבלת מחיר וקוד קופון.
קופון SAVE10 = 10% הנחה.
קופון VIP = 25% הנחה.
קופון לא קיים = שגיאה."

שלב 2 — בקש טסטים:
"תכתוב Jest tests לדרישות האלה"

שלב 3 — בקש מימוש:
"תכתוב את הפונקציה כך שתעבור את הטסטים"` },
      { type: 'heading', text: 'Snapshot Testing' },
      { type: 'code', lang: 'text', caption: 'פרומפט לReact Testing', code: `"תכתוב React Testing Library tests
לקומפוננטת Button הזו.
בדוק: rendering, click handler, disabled state:
[קוד קומפוננטה]"` },
      { type: 'tip', text: 'בקש מ-AI "מה ה-edge cases שיכולים לשבור את הקוד הזה?" — לפעמים הוא מוצא בעיות שלא חשבת עליהן.' },
    ],
    questionBank: [
      {
        id: 'vibe-test-q1',
        text: 'מה היתרון הגדול של AI בכתיבת טסטים?',
        options: ['הטסטים תמיד מושלמים', 'מהיר בייצור טסטים, edge cases ומock data', 'לא צריך להריץ טסטים', 'מחליף את הצורך בבדיקות ידניות'],
        correct: 1,
        explanation: 'AI מאיץ דרמטית את כתיבת הטסטים — מייצר happy path, edge cases ו-error cases מהר, וגם מציע edge cases שלא חשבת עליהם.',
      },
      {
        id: 'vibe-test-q2',
        text: 'מהו סדר הפעולות ב-TDD עם AI?',
        options: ['קוד → טסטים → refactor', 'דרישות → טסטים → קוד שעובר אותם', 'טסטים → דרישות → קוד', 'קוד → דרישות → טסטים'],
        correct: 1,
        explanation: 'TDD עם AI: קודם מגדירים דרישות בשפה טבעית, אחר כך מבקשים מה-AI לכתוב טסטים על בסיסן, ולבסוף מבקשים מימוש שעובר את הטסטים.',
      },
      {
        id: 'vibe-test-q3',
        text: 'מה לבקש מ-AI כדי למצוא בעיות נסתרות בקוד?',
        options: ['"תבדוק את הקוד"', '"מה ה-edge cases שיכולים לשבור את הקוד הזה?"', '"תתקן שגיאות"', '"תכתוב documentation"'],
        correct: 1,
        explanation: 'הפרומפט "מה ה-edge cases שיכולים לשבור את הקוד הזה?" מאלץ את ה-AI לחשוב ביקורתית ולמצוא תרחישים קצה שלא חשבת עליהם.',
      },
      {
        id: 'vibe-test-q4',
        text: 'מה AI יכול לייצר עבור בדיקות?',
        options: ['רק unit tests', 'unit tests, integration tests, mock data ועוד', 'רק mock data', 'רק snapshot tests'],
        correct: 1,
        explanation: 'AI יכול לכתוב: unit tests, integration tests, E2E test outlines, mock data מציאותי, mocks ו-stubs — כל מה שצריך לסביבת בדיקות מלאה.',
      },
    ],
  },
  {
    id: 'vibe-bestpractices',
    title: 'Best Practices & מלכודות',
    summary: 'מה לעשות ומה להימנע ממנו ב-Vibe Coding — ניסיון מהשטח',
    emoji: '⚠️',
    content: [
      { type: 'heading', text: 'כללי הזהב של Vibe Coding' },
      {
        type: 'table',
        caption: 'עשה ואל תעשה',
        headers: ['✅ עשה', '❌ אל תעשה'],
        rows: [
          ['תמיד הרץ קוד לפני שממשיכים', 'לקבל קוד ולא לבדוק אותו'],
          ['Build iteratively — פיצ\'ר אחד בכל פעם', 'לבקש אפליקציה שלמה בבת אחת'],
          ['Commit אחרי כל milestone', 'לעבוד ימים ללא commit'],
          ['לוודא שאתה מבין את הקוד שנוצר', 'copy-paste עיוור'],
          ['לתת הקשר מלא בכל שיחה', 'פרומפטים מעורפלים'],
          ['לבקש הסבר על קוד שלא מובן', 'להשאיר קוד לא מובן בפרויקט'],
        ],
      },
      { type: 'heading', text: 'Security — האזהרה הגדולה' },
      { type: 'text', text: 'AI לא תמיד כותב קוד מאובטח. תמיד בדוק: SQL injection, XSS, חשיפת מידע רגיש, secrets ב-code, הרשאות לא נכונות.' },
      { type: 'code', lang: 'text', caption: 'פרומפט סקירת אבטחה', code: `"תסרוק את הקוד הזה לבעיות אבטחה:
- SQL/NoSQL injection
- XSS vulnerabilities
- Exposed secrets או sensitive data
- Authentication/Authorization issues
- Data validation בצד שרת

[הדבק קוד]"` },
      { type: 'heading', text: 'מלכודות נפוצות' },
      { type: 'code', lang: 'text', caption: 'טעויות שחוזרות', code: `❌ "Hallucination" — AI ממציא APIs שלא קיימות
   → תמיד בדוק documentation רשמי

❌ Outdated knowledge — AI עשוי לכתוב בגרסה ישנה
   → ציין גרסה: "React 18, Node 20, TypeScript 5.3"

❌ Over-engineering — AI לפעמים מוסיף מורכבות מיותרת
   → בקש "את הפתרון הפשוט ביותר שעובד"

❌ Context loss בשיחות ארוכות — AI "שוכח" החלטות קודמות
   → שיחות חדשות לנושאים חדשים` },
      { type: 'heading', text: 'מתי לא להשתמש ב-AI?' },
      { type: 'text', text: 'AI הוא כלי, לא פתרון לכל בעיה. ישנם מקרים שבהם עדיף לכתוב קוד ידנית: כשצריך להבין לעומק אלגוריתם, לפרויקטים קריטיים שדורשים security review מקצועי, וכשה-AI חוזר על אותה שגיאה.' },
      { type: 'tip', text: 'Vibe Coding עובד הכי טוב כשיש לך base knowledge. ככל שאתה מבין יותר — AI יעיל יותר עבורך.' },
    ],
    questionBank: [
      {
        id: 'vibe-bp-q1',
        text: 'מה ה-"Hallucination" בהקשר של AI לקוד?',
        options: ['AI שמסרב לענות', 'AI שממציא APIs, functions או ספריות שלא קיימות', 'AI שכותב קוד לאט', 'AI שחוזר על שגיאות'],
        correct: 1,
        explanation: 'Hallucination = AI ממציא דברים שנראים אמיתיים אבל לא קיימים. למשל API method שלא קיים, ספריה שהמציא. תמיד לבדוק ב-documentation הרשמי.',
      },
      {
        id: 'vibe-bp-q2',
        text: 'מדוע כדאי לציין גרסאות ספציפיות בפרומפט?',
        options: ['לא משנה', 'AI עשוי לכתוב syntax ישן — גרסה מדויקת מונעת את זה', 'לעזור ל-AI להיות מהיר יותר', 'רק לDocumentation'],
        correct: 1,
        explanation: 'ה-training data של AI יש תאריך ניתוק. ציון גרסה ("React 18", "TypeScript 5.3") עוזר לו לכתוב syntax עדכני ולא deprecated APIs.',
      },
      {
        id: 'vibe-bp-q3',
        text: 'מה לעשות כשה-AI מייצר פתרון מסובך מדי?',
        options: ['לקבל אותו כמו שהוא', 'לבקש "את הפתרון הפשוט ביותר שעובד"', 'לשנות כלי AI', 'לכתוב ידנית'],
        correct: 1,
        explanation: 'AI לפעמים over-engineers פתרונות. הפרומפט "את הפתרון הפשוט ביותר" מכוון אותו לפשטות. YAGNI — You Ain\'t Gonna Need It.',
      },
      {
        id: 'vibe-bp-q4',
        text: 'מה הסכנה הגדולה ביותר של copy-paste עיוור מ-AI?',
        options: ['קוד לא מסודר', 'בעיות אבטחה, קוד לא מובן ותלות בלי הבנה', 'קוד לא מתועד', 'שגיאות syntax'],
        correct: 1,
        explanation: 'Copy-paste עיוור מסוכן: אתה עשוי להכניס בעיות אבטחה שלא ידעת, קוד שלא תוכל לתחזק, ולאבד הבנה של הפרויקט שלך.',
      },
    ],
  },
]
