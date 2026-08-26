import type { Lesson } from '../../types'

export const notebooklmLessons: Lesson[] = [
  {
    id: 'nblm-intro',
    title: 'מה זה NotebookLM?',
    summary: 'הכרות עם הכלי של Google — AI שקורא את המסמכים שלך ועונה רק על בסיסם',
    emoji: '📓',
    content: [
      { type: 'heading', text: 'NotebookLM — ה-AI שמבין את המסמכים שלך' },
      { type: 'text', text: 'NotebookLM הוא כלי מחקר ועריכה מבית Google שמאפשר לך להעלות מסמכים, מצגות, קישורי YouTube, אתרים ועוד — ואז לשוחח עם ה-AI על בסיס אותם מקורות בלבד. בניגוד ל-ChatGPT שמסתמך על ידע כללי, NotebookLM מסתמך אך ורק על מה שהעלאת.' },
      { type: 'tip', text: 'NotebookLM לא "ממציא" — כל תשובה מגיעה עם ציטוט מדויק למקור. אם הוא לא מצא תשובה במסמכים, הוא יאמר זאת.' },
      { type: 'heading', text: 'מה אפשר להעלות?' },
      {
        type: 'table',
        caption: 'סוגי מקורות נתמכים',
        headers: ['סוג', 'פורמט', 'דוגמה לשימוש'],
        rows: [
          ['PDF', 'עד 500,000 מילים', 'ספרי לימוד, מחקרים, חוזים'],
          ['Google Docs / Slides', 'ישירות מ-Drive', 'מצגות, עבודות, פרוטוקולים'],
          ['אתרי אינטרנט', 'URL בלבד', 'ויקיפדיה, תיעוד טכני, מאמרים'],
          ['YouTube', 'קישור לסרטון', 'הרצאות, webinars, ראיונות'],
          ['קבצי טקסט', 'TXT, Markdown', 'קוד, הערות, logs'],
          ['Google Sheets', 'גיליונות אלקטרוניים', 'נתונים, טבלאות, רשימות'],
        ],
      },
      { type: 'heading', text: 'למה NotebookLM שונה?' },
      { type: 'code', lang: 'text', caption: 'NotebookLM vs ChatGPT', code: `ChatGPT / Claude (ידע כללי):
  ✅ ידע רחב על כל נושא
  ❌ עשוי להמציא פרטים (hallucination)
  ❌ לא מכיר את המסמכים שלך
  ❌ תשובות ללא ציטוטים

NotebookLM:
  ✅ מסתמך רק על מה שהעלית
  ✅ כל תשובה עם ציטוט מדויק
  ✅ מאפשר cross-reference בין מסמכים
  ✅ אפס hallucinations על מחוץ למקורות` },
      { type: 'heading', text: 'מה אפשר לייצר?' },
      { type: 'text', text: 'מעבר לשאלות ותשובות, NotebookLM יכול לייצר: סיכומים, מדריכי לימוד, FAQ, ציר זמן, Audio Overview (פודקאסט AI), מפות מחשבה ועוד.' },
      { type: 'tip', text: 'NotebookLM חינמי לשימוש בסיסי. מהדורת NotebookLM Plus (בתשלום) מציעה יותר מחברות, מקורות ואיכות גבוהה יותר של Audio Overview.' },
    ],
    questionBank: [
      {
        id: 'nblm-intro-q1',
        text: 'מה ההבדל המרכזי בין NotebookLM ל-ChatGPT?',
        options: [
          'NotebookLM מהיר יותר',
          'NotebookLM מסתמך רק על המסמכים שהעלית, לא על ידע כללי',
          'ChatGPT יודע לקרוא PDF',
          'NotebookLM מיועד לתכנות בלבד',
        ],
        correct: 1,
        explanation: 'NotebookLM פועל אך ורק מתוך המקורות שהעלית. כל תשובה מגיעה עם ציטוט מדויק למקור, ואין hallucinations מחוץ למסמכים שלך.',
      },
      {
        id: 'nblm-intro-q2',
        text: 'איזה פורמט אינו נתמך כמקור ב-NotebookLM?',
        options: ['PDF', 'קישור YouTube', 'קובץ WAV (אודיו)', 'Google Docs'],
        correct: 2,
        explanation: 'NotebookLM לא תומך בקבצי אודיו גולמיים (WAV, MP3). אפשר להעלות קישור YouTube שיש לו כתוביות, אבל לא קובץ אודיו ישיר.',
      },
      {
        id: 'nblm-intro-q3',
        text: 'מה NotebookLM עושה כשהוא לא מוצא תשובה במקורות?',
        options: [
          'ממציא תשובה מסבירת-פנים',
          'מחפש באינטרנט',
          'מודיע שהמידע לא קיים במקורות',
          'מציג שגיאה',
        ],
        correct: 2,
        explanation: 'NotebookLM מודיע שהמידע אינו קיים בין המקורות שהועלו. זו בדיוק נקודת החוזק שלו — הוא לא ממציא תשובות.',
      },
      {
        id: 'nblm-intro-q4',
        text: 'כמה מקורות אפשר להוסיף לנייד אחד ב-NotebookLM החינמי?',
        options: ['5', '20', '50', '100'],
        correct: 2,
        explanation: 'ב-NotebookLM החינמי ניתן להוסיף עד 50 מקורות לכל Notebook. NotebookLM Plus מאפשר עד 300 מקורות.',
      },
    ],
  },
  {
    id: 'nblm-sources',
    title: 'הוספת מקורות',
    summary: 'איך להעלות PDFs, קישורי YouTube, אתרים ו-Google Docs — ועצות לארגון',
    emoji: '📎',
    content: [
      { type: 'heading', text: 'יצירת Notebook ראשון' },
      { type: 'text', text: 'לאחר כניסה ל-notebooklm.google.com, לחץ על "New notebook". תקבל מחברת ריקה עם פאנל המקורות בצד שמאל. שם תוסיף את כל המסמכים שרוצה לנתח.' },
      { type: 'heading', text: 'שיטות הוספת מקורות' },
      { type: 'code', lang: 'text', caption: 'ארבע דרכים להוסיף מקורות', code: `1. Upload — גרור קובץ PDF/TXT או לחץ Browse
   מגבלה: 200MB לקובץ, 500,000 מילים

2. Google Drive — בחר Doc/Slide/Sheet ישירות מ-Drive
   מתעדכן אוטומטית כשתשנה את הקובץ ב-Drive!

3. Link — הדבק URL של אתר או YouTube
   אתרים: מצריך גישה ציבורית (לא paywall)
   YouTube: חייב שיהיו כתוביות

4. Paste text — הדבק טקסט ישיר בתיבה
   שימושי לדברים קצרים: emails, notes, code snippets` },
      { type: 'heading', text: 'טיפים לארגון מקורות' },
      {
        type: 'table',
        caption: 'שיטות עבודה עם מקורות',
        headers: ['מצב', 'המלצה'],
        rows: [
          ['מסמכים רבים בנושא אחד', 'צור Notebook נפרד לכל פרויקט/נושא'],
          ['קישור YouTube ללא כתוביות', 'הוסף כתוביות ידניות ב-YouTube Studio קודם'],
          ['PDF סרוק (תמונה בלבד)', 'השתמש ב-OCR תחילה (Adobe, Google Drive) כדי להפוך לטקסט'],
          ['אתר עם paywall', 'העתק-הדבק את הטקסט ישירות כ-Paste Text'],
          ['Google Docs שמתעדכן', 'הוסף ישירות מ-Drive — NotebookLM יסנכרן'],
        ],
      },
      { type: 'heading', text: 'ניהול מקורות' },
      { type: 'text', text: 'בפאנל המקורות אפשר: לבחור אילו מקורות "פעילים" (NotebookLM יסתמך רק עליהם), לשנות שם מקור, לרענן מקור ש-Google Drive עדכן, ולמחוק מקורות שאינם רלוונטיים.' },
      { type: 'tip', text: 'לפני שאתה שואל שאלה — וודא שה-checkboxes ליד המקורות הרלוונטיים מסומנים. NotebookLM יחפש רק בין המקורות הפעילים.' },
    ],
    questionBank: [
      {
        id: 'nblm-sources-q1',
        text: 'מה קורה כשמוסיפים Google Doc כמקור ומשנים אותו מאוחר יותר?',
        options: [
          'NotebookLM לא יודע על השינויים',
          'צריך למחוק ולהוסיף מחדש',
          'NotebookLM מתעדכן אוטומטית',
          'רק עם רענון ידני',
        ],
        correct: 2,
        explanation: 'מקורות מ-Google Drive (Docs/Slides/Sheets) מתעדכנים אוטומטית. כשתשנה את הקובץ ב-Drive, NotebookLM ישקף את השינויים.',
      },
      {
        id: 'nblm-sources-q2',
        text: 'מה הדרך הטובה לאנוסף קישור YouTube שאין לו כתוביות?',
        options: [
          'NotebookLM מסתדר בלי כתוביות',
          'לא ניתן בכלל',
          'להוסיף כתוביות ב-YouTube Studio לפני ההוספה',
          'להעלות את הסרטון כקובץ וידאו',
        ],
        correct: 2,
        explanation: 'NotebookLM קורא כתוביות YouTube, לא אודיו. אם הסרטון ללא כתוביות — הוסף כתוביות ידניות ב-YouTube Studio ואז הוסף את הקישור.',
      },
      {
        id: 'nblm-sources-q3',
        text: 'מה "Paste text" ב-NotebookLM?',
        options: [
          'לדביק כתובת URL',
          'להדביק טקסט ישיר ללא קובץ — שימושי לemails ו-snippets',
          'לדביק תמונה',
          'לייצא טקסט מהnotebook',
        ],
        correct: 1,
        explanation: '"Paste text" מאפשר לך להזין טקסט ישיר ללא קובץ. מושלם לאימיילים, הערות, קטעי קוד, או כל טקסט קצר שאין לו קובץ.',
      },
      {
        id: 'nblm-sources-q4',
        text: 'כיצד NotebookLM מחליט אילו מקורות לחפש בהם?',
        options: [
          'מחפש בכולם תמיד',
          'רק במקורות שסומנו בchecked בפאנל המקורות',
          'לפי תאריך ההוספה',
          'לפי גודל הקובץ',
        ],
        correct: 1,
        explanation: 'רק מקורות שה-checkbox שלהם מסומן בפאנל המקורות "פעילים". ניתן לבחור תת-קבוצה של מקורות לשאלה ספציפית.',
      },
    ],
  },
  {
    id: 'nblm-chat',
    title: 'שיחה חכמה עם המקורות',
    summary: 'איך לשאול שאלות, לקבל ציטוטים, ולחצות בין מסמכים שונים',
    emoji: '💬',
    content: [
      { type: 'heading', text: 'ממשק השיחה' },
      { type: 'text', text: 'אחרי הוספת מקורות, תחצה לפאנל השיחה (Chat) בצד ימין. שם אפשר לכתוב כל שאלה, ו-NotebookLM יענה על בסיס המסמכים שהעלית בלבד.' },
      { type: 'heading', text: 'סוגי שאלות שעובדות טוב' },
      { type: 'code', lang: 'text', caption: 'דוגמאות לשאלות אפקטיביות', code: `📌 שאלות עובדות:
"מה הטענה המרכזית של המחבר?"
"תסכם את הפרק השלישי ב-5 נקודות"
"מה ההבדל בין X ל-Y לפי המסמכים?"
"מצא כל האזכורים של [מונח] בין המסמכים"
"האם יש סתירות בין המסמכים על נושא X?"
"תן דוגמאות לטענה שX גורם ל-Y"

🚫 שאלות שלא יתנו תשובה טובה:
"מה דעתך האישית?"  ← לNotebookLM אין דעה
"מה קורה בחדשות היום?"  ← לא במקורות שלך
"תמציא לי דוגמה"  ← הוא לא ממציא` },
      { type: 'heading', text: 'ציטוטים מדויקים' },
      { type: 'text', text: 'כל תשובה של NotebookLM מגיעה עם כפתורי ציטוט בצורת מספרים בסוגריים מרובעים [1][2]. לחיצה עליהם פותחת את המקור המדויק — הדף, הפסקה, הדקה בוידאו — שמצדיק את התשובה.' },
      { type: 'heading', text: 'Cross-Reference בין מסמכים' },
      { type: 'code', lang: 'text', caption: 'שאלות השוואה בין מקורות', code: `"השווה את הגישות של מסמך A ומסמך B לנושא X"
"אילו נקודות חוזרות בכל המסמכים?"
"מה מסמך B מוסיף שלא קיים ב-A?"
"תרכז את כל ההגדרות של [מושג] מכל המסמכים"` },
      { type: 'heading', text: 'Inline Citations — לינקים לתוך המסמך' },
      { type: 'text', text: 'כשNotebookLM עונה, לחיצה על הציטוט [1] תפתח אוטומטית את ה-PDF/Doc ותדגיש את הקטע הרלוונטי. זה חוסך חיפוש ידני ומאפשר לאמת כל טענה.' },
      { type: 'tip', text: 'בתחתית כל תשובה יש כפתור "Suggest follow-up questions" — NotebookLM מציע שאלות המשך רלוונטיות שאולי לא חשבת עליהן.' },
    ],
    questionBank: [
      {
        id: 'nblm-chat-q1',
        text: 'מה הסוגריים המרובעים [1][2] בתשובות של NotebookLM?',
        options: [
          'מספרי הערות שוליים',
          'ציטוטים לינקוטיים — לחיצה מובילה לקטע המדויק במקור',
          'אינדקס של מקורות',
          'מספרי פסקאות',
        ],
        correct: 1,
        explanation: 'לחיצה על [1] תפתח את המקור ותדגיש את הקטע הספציפי שמצדיק את התשובה. זה מאפשר אימות מיידי של כל טענה.',
      },
      {
        id: 'nblm-chat-q2',
        text: 'איזו שאלה תיתן תשובה טובה ב-NotebookLM?',
        options: [
          '"מה דעתך על הנושא?"',
          '"תמציא לי דוגמה שלא קיימת במסמכים"',
          '"השווה את הגישות בין מסמך A ל-B לנושא X"',
          '"מה קורה בעולם היום?"',
        ],
        correct: 2,
        explanation: 'NotebookLM מצטיין בהשוואות בין מסמכים, סיכומים, ומציאת דפוסים — כל עוד המידע קיים במקורות שהועלו.',
      },
      {
        id: 'nblm-chat-q3',
        text: 'מה "Suggest follow-up questions" ב-NotebookLM?',
        options: [
          'הצעות לשאלות של שאלנים אחרים',
          'NotebookLM מציע שאלות המשך רלוונטיות לשיחה',
          'שאלות מבחן אוטומטיות',
          'שאלות שנשאלו בעבר',
        ],
        correct: 1,
        explanation: 'בתחתית כל תשובה NotebookLM מציע שאלות המשך — מה עוד כדאי לחקור בהמשך לתשובה שקיבלת. שימושי מאוד לחקירה עמוקה יותר.',
      },
      {
        id: 'nblm-chat-q4',
        text: 'מה יקרה אם תשאל NotebookLM על נושא שלא קיים במקורות?',
        options: [
          'יחפש באינטרנט',
          'ימציא תשובה',
          'יאמר שהמידע לא נמצא במקורות שהועלו',
          'יקרוס',
        ],
        correct: 2,
        explanation: 'NotebookLM מודיע שהמידע לא קיים בין המקורות. זו נקודת חוזקו — שקיפות מלאה לגבי גבולות הידע שלו.',
      },
    ],
  },
  {
    id: 'nblm-outputs',
    title: 'יצירת תוצרים חכמים',
    summary: 'סיכומים, FAQ, מדריכי לימוד, ציר זמן — תוצרים מוכנים בלחיצה',
    emoji: '📄',
    content: [
      { type: 'heading', text: 'Studio — מרכז יצירת התוצרים' },
      { type: 'text', text: 'לשונית Studio (בחלקה העליון של NotebookLM) היא המקום שבו יוצרים תוצרים מובנים. NotebookLM מציע מגוון "Notebook Guides" שמייצרים תוצרים שונים מהמקורות שהעלית.' },
      { type: 'heading', text: 'תוצרים מובנים זמינים' },
      {
        type: 'table',
        caption: 'סוגי תוצרים ב-NotebookLM',
        headers: ['תוצר', 'מה הוא מייצר', 'מתאים ל'],
        rows: [
          ['Study Guide', 'מדריך לימוד עם נושאים מרכזיים, הגדרות ושאלות', 'הכנה לבחינות, למידת חומר חדש'],
          ['FAQ', 'שאלות ותשובות נפוצות מהמסמכים', 'הכנת תמיכה, סיכום ועדות'],
          ['Briefing Doc', 'סיכום מנהלים — עיקרי הדברים', 'עדכון מנהלים, סיכום פגישה'],
          ['Timeline', 'ציר זמן של אירועים מהמסמכים', 'היסטוריה, פרויקטים, תהליכים'],
          ['Table of Contents', 'תוכן עניינים מובנה', 'ניווט במסמכים ארוכים'],
          ['Audio Overview', 'פודקאסט AI של שני דוברים', 'למידה תוך נסיעה, סקירה מהירה'],
        ],
      },
      { type: 'heading', text: 'יצירת Study Guide מדויק' },
      { type: 'code', lang: 'text', caption: 'פרומפטים לשיפור Study Guide', code: `לחץ על "Study Guide" ב-Studio, ואחר כך במידת הצורך:

"הוסף לשיעור הלמידה שאלות מבחן על כל נושא"
"הוסף הגדרות למונחים מקצועיים"
"ארגן לפי רמת קושי — מתחיל עד מתקדם"
"הוסף דוגמאות מהמסמכים לכל נקודה"` },
      { type: 'heading', text: 'Custom Output — תוצר מותאם אישית' },
      { type: 'text', text: 'מעבר לתוצרים המובנים, ניתן לכתוב בקשה חופשית ב-Studio: "תייצר מצגת PowerPoint outline", "תכתוב email סיכום לפגישה", "תייצר pros/cons table" — NotebookLM יבנה תוצר בהתאם.' },
      { type: 'tip', text: 'תוצרים שנוצרו ב-Studio נשמרים בלשונית "Notes" ואפשר לערוך אותם, להעתיק לDocs, לשתף, ולהוסיף הערות אישיות.' },
    ],
    questionBank: [
      {
        id: 'nblm-output-q1',
        text: 'מה "Briefing Doc" ב-NotebookLM?',
        options: [
          'תוצר עם שאלות מבחן',
          'סיכום מנהלים עם עיקרי הדברים מהמסמכים',
          'ציר זמן של אירועים',
          'מדריך לשימוש בNotebookLM',
        ],
        correct: 1,
        explanation: 'Briefing Doc הוא סיכום קצר ומרוכז של עיקרי הדברים — מושלם לעדכון מנהלים, הכנה לפגישה, או סיכום מהיר לפני שיחה.',
      },
      {
        id: 'nblm-output-q2',
        text: 'איפה נשמרים התוצרים שנוצרו ב-Studio?',
        options: [
          'מורדים אוטומטית',
          'נשלחים לאימייל',
          'נשמרים בלשונית Notes ואפשר לערוך אותם',
          'נמחקים אחרי הסשן',
        ],
        correct: 2,
        explanation: 'תוצרי Studio נשמרים ב-Notes panel — ניתן לערוך, להעתיק ל-Google Docs, לשתף, ולהוסיף הערות אישיות.',
      },
      {
        id: 'nblm-output-q3',
        text: 'מה ניתן לייצר עם "Custom Output" ב-Studio?',
        options: [
          'רק FAQ',
          'כל תוצר שתתאר בחופשיות — outline, email, טבלה ועוד',
          'רק Study Guide',
          'רק Audio Overview',
        ],
        correct: 1,
        explanation: 'Custom Output מאפשר לבקש כל תוצר שתרצה: "תייצר מצגת outline", "תכתוב email סיכום", "תייצר pros/cons" — NotebookLM יבנה בהתאם.',
      },
      {
        id: 'nblm-output-q4',
        text: 'מה התוצר "Timeline" של NotebookLM?',
        options: [
          'ציר זמן אישי של שימוש בNotebookLM',
          'ציר זמן של אירועים שמופיעים במסמכים שהועלו',
          'לוח שנה',
          'היסטוריית שיחות',
        ],
        correct: 1,
        explanation: 'NotebookLM מחלץ אירועים ותאריכים מהמסמכים שלך ומסדר אותם בציר זמן כרונולוגי. שימושי לניתוח היסטוריה, פרויקטים ותהליכים.',
      },
    ],
  },
  {
    id: 'nblm-audio',
    title: 'Audio Overview — הפודקאסט האוטומטי',
    summary: 'איך ליצור פודקאסט AI מהמסמכים שלך ולהתאים אותו לצרכים',
    emoji: '🎙️',
    content: [
      { type: 'heading', text: 'מה זה Audio Overview?' },
      { type: 'text', text: 'Audio Overview הוא אחד התכונות המדהימות ביותר של NotebookLM — הוא מייצר שיחת פודקאסט בין שני דוברי AI (גבר ואישה) שדנים במסמכים שהעלית. השיחה נשמעת טבעית, כולל הפסקות, תגובות, ואפילו "רגעי גילוי".' },
      { type: 'tip', text: 'Audio Overview עובד רק באנגלית כרגע. אם המסמכים שלך בעברית, שקול לכתוב Summary בעברית שלהם ואז להעלות אותו לNotebook נפרד ביחד עם בקשה ב-Customize.' },
      { type: 'heading', text: 'יצירת Audio Overview' },
      { type: 'code', lang: 'text', caption: 'שלבים ליצירת פודקאסט', code: `1. ב-Studio לחץ על "Audio Overview"
2. לחץ "Generate" — NotebookLM ייצר שיחה (3-15 דקות)
3. הפודקאסט יופיע בחלק העליון של Studio
4. ניתן:
   - להאזין ישירות בדפדפן
   - להוריד כקובץ MP3
   - לחזור ולהאזין בכל עת` },
      { type: 'heading', text: 'Customize — להתאים את הפודקאסט' },
      { type: 'text', text: 'לפני לחיצה על Generate, לחץ על "Customize" כדי לתת הנחיות לפודקאסט. זה ה-feature שהופך Audio Overview מכלל לכלי מדויק.' },
      { type: 'code', lang: 'text', caption: 'דוגמאות ל-Customize', code: `"Focus on the practical applications only"
"Explain this as if to a complete beginner"
"Deep dive on chapter 3 — skip the introduction"
"Discuss the controversies and debates"
"Make it suitable for a 5-minute commute"
"Include specific examples from the text"
"Focus on the comparison between approach A and B"` },
      { type: 'heading', text: 'שימושים מעשיים' },
      {
        type: 'table',
        caption: 'מתי Audio Overview שימושי',
        headers: ['מצב', 'שימוש ב-Audio Overview'],
        rows: [
          ['נסיעה לעבודה', 'האזן לסיכום של מחקר חדש ב-10 דקות'],
          ['הכנה לבחינה', 'פודקאסט שמסביר את הנושאים תוך כדי ריצה'],
          ['הכנת קהל', 'שלח פודקאסט לחברי הצוות לפני פגישה'],
          ['סקירת ספר', 'קבל תחושה מהירה לפני קריאה מעמיקה'],
          ['נגישות', 'חומר לימודי לאנשים שמעדיפים האזנה לקריאה'],
        ],
      },
      { type: 'tip', text: 'אם רוצה פודקאסט ארוך יותר — הוסף יותר מקורות. פחות מקורות = פודקאסט קצר יותר. הזמן נקבע אוטומטית לפי כמות החומר.' },
    ],
    questionBank: [
      {
        id: 'nblm-audio-q1',
        text: 'מה Audio Overview ב-NotebookLM?',
        options: [
          'הקלטת הקול שלך',
          'שיחת פודקאסט בין שני דוברי AI על בסיס המסמכים שלך',
          'ממיר טקסט לקול גולמי',
          'תמלול של YouTube',
        ],
        correct: 1,
        explanation: 'Audio Overview מייצר שיחת פודקאסט טבעית בין שני דוברי AI (גבר ואישה) שדנים בתוכן המסמכים שלך. ניתן להוריד כ-MP3.',
      },
      {
        id: 'nblm-audio-q2',
        text: 'מה "Customize" מאפשר לפני יצירת Audio Overview?',
        options: [
          'בחירת שפה',
          'שינוי קולות הדוברים',
          'הנחיות לכיוון הפודקאסט — נושא מיקוד, עומק, קהל יעד',
          'בחירת אורך מדויק',
        ],
        correct: 2,
        explanation: 'Customize מאפשר לכוון את הפודקאסט: "Focus on beginners", "Deep dive on chapter X", "Compare approaches A and B" — תוצאות ממוקדות בהרבה.',
      },
      {
        id: 'nblm-audio-q3',
        text: 'באיזו שפה Audio Overview זמין?',
        options: [
          'כל שפה',
          'עברית ואנגלית',
          'אנגלית בלבד כרגע',
          'שפת המסמך האחרון שהועלה',
        ],
        correct: 2,
        explanation: 'Audio Overview זמין כרגע באנגלית בלבד. למסמכים בעברית, ניתן לכתוב Summary באנגלית ולהשתמש בו כבסיס לפודקאסט.',
      },
      {
        id: 'nblm-audio-q4',
        text: 'כיצד אפשר לאזין ל-Audio Overview שנוצר?',
        options: [
          'רק באוזניות Bluetooth',
          'ישירות בדפדפן, או להוריד כ-MP3',
          'רק דרך האפליקציה הניידת',
          'שליחה לאימייל בלבד',
        ],
        correct: 1,
        explanation: 'ניתן להאזין ישירות בדפדפן NotebookLM, או להוריד כקובץ MP3 ולהאזין בכל נגן. הפודקאסט נשמר ב-Studio לשימוש חוזר.',
      },
    ],
  },
  {
    id: 'nblm-usecases',
    title: 'מקרי שימוש מתקדמים',
    summary: 'מחקר אקדמי, ניהול ידע, עסקי ומשפטי — NotebookLM בפעולה',
    emoji: '🔬',
    content: [
      { type: 'heading', text: 'NotebookLM לסטודנטים ואקדמאים' },
      { type: 'code', lang: 'text', caption: 'workflow לסטודנטים', code: `שלב 1: העלה את כל ה-PDFs של הקורס + ספר הלימוד
שלב 2: בקש Study Guide + FAQ
שלב 3: שאל שאלות הכנה לבחינה:
  "מה השאלות שסביר שיופיעו בבחינה על נושא X?"
  "הסבר לי את ההבדל בין Y ל-Z כמו שמסביר פרופסור"
שלב 4: צור Audio Overview לחזרה תוך כדי נסיעה
שלב 5: שאל על כל מה שלא הבנת בהרצאה` },
      { type: 'heading', text: 'NotebookLM לניהול ידע בארגון' },
      { type: 'code', lang: 'text', caption: 'workflow לצוות', code: `Notebook לכל פרויקט/לקוח:
  מקורות: Docs, Sheets, ממיילים (העתק-הדבק), פרוטוקולים

שאלות שימושיות:
  "מה היו ההחלטות שהתקבלו בפגישות?"
  "מה סוכם עם לקוח X לגבי Y?"
  "האם יש סתירות בין מה שסוכם ב-Q1 ל-Q2?"
  "תייצר סיכום לפגישה הבאה"

שיתוף: NotebookLM Plus מאפשר Notebook משותף לצוות` },
      { type: 'heading', text: 'NotebookLM לניתוח מסמכים משפטיים' },
      {
        type: 'table',
        caption: 'שימושים משפטיים',
        headers: ['מטלה', 'שאלה לNotebookLM'],
        rows: [
          ['קריאת חוזה', '"מה ההתחייבויות של כל צד?"'],
          ['ניהול סיכונים', '"מה הסעיפים שמגבילים אחריות?"'],
          ['השוואת גרסאות', '"מה השתנה בין גרסה 1 ל-2 של החוזה?"'],
          ['חיפוש תקדימים', '"מצא כל האזכורים של [סעיף] במסמכים"'],
          ['מיפוי מונחים', '"תייצר גלוסרי של מונחים משפטיים מהחוזה"'],
        ],
      },
      { type: 'heading', text: 'NotebookLM לעיתונאים וחוקרים' },
      { type: 'text', text: 'עיתונאים משתמשים בNotebookLM להעלאת עשרות דוחות ממשלתיים, פרסומים, ודוחות כספיים — ואז לחצות ביניהם לאיתור דפוסים וסתירות שנסתרות בכמויות גדולות של טקסט.' },
      { type: 'tip', text: 'חשוב: NotebookLM שומר את הנתונים שלך פרטיים — הם לא משמשים לאימון מודלים. בטוח לשימוש עם מסמכים חסויים (אם כי כל העלאה לענן כרוכה בסיכון מסוים).' },
    ],
    questionBank: [
      {
        id: 'nblm-uc-q1',
        text: 'איך NotebookLM עוזר לסטודנטים להכין בחינה?',
        options: [
          'כותב בשבילם את הבחינה',
          'מייצר Study Guide, FAQ, ועונה על שאלות חזרה מהחומר',
          'שולח התראות על מועד הבחינה',
          'מחפש שאלות בחינה מאינטרנט',
        ],
        correct: 1,
        explanation: 'NotebookLM מייצר Study Guide, FAQ, מדמה שאלות בחינה, ומסביר כל מה שלא הובן — כל זאת מתוך חומר הלימוד שהעלאת.',
      },
      {
        id: 'nblm-uc-q2',
        text: 'מה היתרון של NotebookLM לניתוח חוזים?',
        options: [
          'הוא עורך דין מוסמך',
          'מאפשר cross-reference מהיר בין סעיפים ומציאת סתירות ושינויים',
          'מוחק סעיפים בעייתיים',
          'מתרגם אוטומטית',
        ],
        correct: 1,
        explanation: 'NotebookLM מאפשר השוואה מהירה בין גרסאות חוזה, מיפוי התחייבויות, מציאת סתירות, ויצירת גלוסרי — כל זה בעשרות שניות.',
      },
      {
        id: 'nblm-uc-q3',
        text: 'האם Google משתמשת בתוכן שמעלים לNotebookLM לאימון מודלים?',
        options: [
          'כן, תמיד',
          'רק עם הסכמה',
          'לא — הנתונים פרטיים ולא משמשים לאימון',
          'רק מסמכים פומביים',
        ],
        correct: 2,
        explanation: 'Google הצהירה שתוכן שמועלה לNotebookLM לא משמש לאימון מודלים. המסמכים שלך נשארים פרטיים בחשבון Google שלך.',
      },
      {
        id: 'nblm-uc-q4',
        text: 'מה NotebookLM Plus מוסיף על הגרסה החינמית?',
        options: [
          'רק Audio Overview',
          'יותר Notebooks, יותר מקורות לנייד, שיתוף לצוות ואיכות גבוהה יותר',
          'תמיכה בעברית',
          'ללא פרסומות',
        ],
        correct: 1,
        explanation: 'NotebookLM Plus מוסיף: יותר Notebooks, עד 300 מקורות לנייד (לעומת 50), שיתוף Notebook לצוות, ואיכות גבוהה יותר של Audio Overview.',
      },
    ],
  },
  {
    id: 'nblm-tips',
    title: 'טיפים ו-Best Practices',
    summary: 'טיפים מהשטח, מלכודות נפוצות, ואינטגרציה עם Google Workspace',
    emoji: '⭐',
    content: [
      { type: 'heading', text: 'כללי הזהב של NotebookLM' },
      {
        type: 'table',
        caption: 'עשה ואל תעשה',
        headers: ['✅ עשה', '❌ אל תעשה'],
        rows: [
          ['תמיד בדוק ציטוטים לפני שאתה מצטט', 'לסמוך על תוצר בלי לאמת'],
          ['חלק לNotebooks נפרדים לפי נושא', 'לערבב כל הנושאים בנייד אחד'],
          ['השתמש ב-Customize לפני Audio Overview', 'ליצור פודקאסט כללי בלי כיוון'],
          ['בקש follow-up questions', 'להסתפק בתשובה הראשונה'],
          ['ציין מה אתה מחפש ביוזמת השאלה', 'שאלות עמומות מדי'],
          ['שמור תוצרים חשובים ב-Google Docs', 'לא לייצא תוצרים חשובים'],
        ],
      },
      { type: 'heading', text: 'אינטגרציה עם Google Workspace' },
      { type: 'code', lang: 'text', caption: 'workflow עם Google Workspace', code: `Google Meet → פרוטוקול ב-Google Docs → מקור בNotebookLM
  "סכם את ההחלטות שהתקבלו"
  "מי אחראי על מה?"
  "מה נשאר פתוח?"

Gmail → העתק תוכן מייל → Paste Text
  "מה הדרישות שהלקוח ביקש?"

Google Sheets → הוסף ישירות מ-Drive
  "מה הפרויקטים שחרגו מהתקציב?"

Google Slides → הוסף מ-Drive
  "תסכם את המצגת ב-5 נקודות"` },
      { type: 'heading', text: 'מגבלות שחשוב לדעת' },
      { type: 'code', lang: 'text', caption: 'מה NotebookLM לא יכול', code: `❌ לא יכול לגשת לאינטרנט בזמן אמת
   → לחדשות עדכניות, ה-AI לא יועיל

❌ לא זוכר שיחות קודמות בין סשנים
   → שיחה חדשה = context חדש (אבל הnotebook נשמר)

❌ לא יכול לבצע חישובים מורכבים
   → לניתוח נתוני Excel — עדיף Google Sheets AI

❌ לא תומך ב-PDFs ממוסמנים (scanned only)
   → הפוך ל-OCR תחילה (Adobe, Google Drive)

❌ Audio Overview רק באנגלית
   → למסמכים בעברית — כתוב Summary באנגלית` },
      { type: 'heading', text: 'Prompt Engineering לNotebookLM' },
      { type: 'code', lang: 'text', caption: 'פרומפטים שעובדים טוב', code: `במקום: "תסביר לי X"
כתוב: "תסביר X לאדם שמגיע מרקע של [תחום]"

במקום: "מה חשוב כאן?"
כתוב: "מה 3 הנקודות הכי חשובות שצריך לזכור?"

במקום: "תסכם"
כתוב: "תסכם ב-5 bullets כל אחד ב-2 שורות מקסימום"

במקום: "השווה"
כתוב: "תייצר טבלת השוואה עם עמודות: קריטריון, A, B, מסקנה"` },
      { type: 'tip', text: 'NotebookLM הוא כלי לאנשים שיש להם מסמכים — לא ChatGPT. אם אין לך מסמכים להעלות, תוצאות יהיו מוגבלות. הכוח שלו הוא ניתוח מה שיש לך.' },
    ],
    questionBank: [
      {
        id: 'nblm-tips-q1',
        text: 'מה המגבלה הגדולה של NotebookLM לגבי מידע עדכני?',
        options: [
          'לא תומך בקבצים חדשים',
          'לא יכול לגשת לאינטרנט — לא יודע על חדשות שלא הועלו',
          'חוסם מידע מחדשות',
          'לא מעדכן מקורות מ-Drive',
        ],
        correct: 1,
        explanation: 'NotebookLM לא גולש באינטרנט בזמן אמת. הוא יודע רק מה שהעלית. לחדשות עדכניות, ייל האחרון שהועלה הוא המקור.',
      },
      {
        id: 'nblm-tips-q2',
        text: 'מה הדרך הטובה לייצר טבלת השוואה ב-NotebookLM?',
        options: [
          '"השווה X ו-Y"',
          '"תייצר טבלת השוואה עם עמודות: קריטריון, X, Y, מסקנה"',
          '"מה ההבדל?"',
          '"תסביר את שניהם"',
        ],
        correct: 1,
        explanation: 'פרומפטים מובנים עם הנחיית פורמט ("טבלה עם עמודות: ...") מייצרים תוצאות הרבה יותר שימושיות ומאורגנות.',
      },
      {
        id: 'nblm-tips-q3',
        text: 'מה NotebookLM זוכר בין סשנים שונים?',
        options: [
          'את כל השיחות הקודמות',
          'את המקורות שהועלו בלבד — לא את השיחות',
          'לא זוכר כלום',
          'זוכר הכל',
        ],
        correct: 1,
        explanation: 'NotebookLM שומר את הMקורות ותוצרי Studio בין סשנים, אבל לא את היסטוריית השיחות. שיחה חדשה מתחילה מחדש עם אותם מקורות.',
      },
      {
        id: 'nblm-tips-q4',
        text: 'כיצד כדאי לנסח שאלה כדי לקבל תשובה מפורטת יותר?',
        options: [
          'לשאול שאלות קצרות',
          'לציין פורמט, קהל יעד ומספר נקודות רצוי',
          'לכתוב בעברית בלבד',
          'להשתמש במילות מפתח',
        ],
        correct: 1,
        explanation: '"תסביר לתלמיד תיכון ב-5 נקודות" תיתן תשובה טובה יותר מ-"תסביר X". ציון פורמט, קהל יעד ואורך מדויק משפר דרמטית את התוצאות.',
      },
    ],
  },
  {
    id: 'nblm-research',
    title: 'מחקר עמוק ואקדמי',
    summary: 'NotebookLM ככלי מחקר — ניתוח מאמרים, ניהול ביבליוגרפיה וכתיבה אקדמית',
    emoji: '🎓',
    content: [
      { type: 'heading', text: 'NotebookLM לכתיבת עבודת גמר' },
      { type: 'code', lang: 'text', caption: 'workflow לכתיבה אקדמית', code: `שלב 1 — איסוף ספרות:
  העלה PDFs של מאמרים, ספרים, עבודות קודמות
  כוון: 10-50 מאמרים לנושא אחד

שלב 2 — ניתוח ראשוני:
  "מה הטענות המרכזיות בספרות על X?"
  "מה קונצנזוס החוקרים ומה שנוי במחלוקת?"

שלב 3 — מיפוי פערים:
  "מה שאלות מחקר שלא נענו בין המסמכים?"
  "מה הביקורת שחוקרים X ו-Y מעלים?"

שלב 4 — כתיבה:
  "כתוב Literature Review על X לפי ה-APA style"
  "תייצר citations מהמקורות לטענה הזו"` },
      { type: 'heading', text: 'ניהול ביבליוגרפיה' },
      { type: 'text', text: 'NotebookLM יכול לחלץ מידע ביבליוגרפי ממאמרים שהעלית ולארגן אותו. למרות שאינו מחליף כלים ייעודיים כמו Zotero, הוא מהיר לחיפוש ולהשוואה.' },
      { type: 'code', lang: 'text', caption: 'שאלות לניהול ספרות', code: `"מי הסתמך על מאמרו של [חוקר]?"
"מה השנים שמוזכרות בביבליוגרפיה?"
"אילו מאמרים עוסקים ספציפית ב-[נושא צר]?"
"מה השיטות המחקריות שנעשה בהן שימוש?"
"מה גודל המדגם ב-studies השונים?"` },
      { type: 'heading', text: 'ניתוח נתונים איכותניים' },
      { type: 'text', text: 'חוקרים איכותניים משתמשים ב-NotebookLM לניתוח ראיונות, תצפיות ותעוד שטח. הכלי מצוין למציאת נושאים חוזרים (Themes) ולאחזור ציטוטים ספציפיים.' },
      { type: 'code', lang: 'text', caption: 'Thematic Analysis עם NotebookLM', code: `"מה ה-themes העיקריים שעולים מהראיונות?"
"מה המשתתפים אמרו על נושא X?"
"מצא ציטוטים שמדגימים קושי/שמחה/התנגדות"
"האם יש סתירות בין מה שמשתתף A ל-B אמרו?"
"מה ה-outliers — תגובות שונות מהכלל?"` },
      { type: 'tip', text: 'עבודה אקדמית: תמיד ודא ציטוטים ב-NotebookLM מול המקורות המקוריים. AI יכול לצטט נכון אבל להחמיץ context. NotebookLM עוזר למצוא — הפרשנות שלך.' },
    ],
    questionBank: [
      {
        id: 'nblm-research-q1',
        text: 'מה הצעד הראשון בשימוש ב-NotebookLM לכתיבת Literature Review?',
        options: [
          'לכתוב מיד את הLiterature Review',
          'להעלות PDFs של המאמרים הרלוונטיים ולבקש ניתוח טענות מרכזיות',
          'ליצור Audio Overview',
          'לצור FAQ תחילה',
        ],
        correct: 1,
        explanation: 'תחילה מעלים את ספרות המחקר, אחר כך שואלים על טענות מרכזיות, קונצנזוס ומחלוקות — ורק לאחר הבנה עמוקה מתחילים לכתוב.',
      },
      {
        id: 'nblm-research-q2',
        text: 'לאיזו מטרה NotebookLM שימושי ב-Thematic Analysis?',
        options: [
          'ניתוח סטטיסטי של נתונים',
          'מציאת themes חוזרים ואחזור ציטוטים ספציפיים מראיונות',
          'יצירת שאלוני מחקר',
          'ניתוח תמונות',
        ],
        correct: 1,
        explanation: 'NotebookLM מצוין לניתוח איכותני — מוצא נושאים חוזרים בראיונות, מאחזר ציטוטים לפי נושא, ומזהה outliers וסתירות בין משתתפים.',
      },
      {
        id: 'nblm-research-q3',
        text: 'מה NotebookLM לא יכול לעשות בניהול ביבליוגרפיה?',
        options: [
          'לחפש מאמרים לפי נושא',
          'לייצר citations בפורמט APA/MLA אוטומטית וייצאן לZotero',
          'לסכם מאמרים',
          'להשוות בין מאמרים',
        ],
        correct: 1,
        explanation: 'NotebookLM לא מחליף כלי ביבליוגרפיה כמו Zotero. הוא יכול לעזור בניסוח citations, אבל ייצוא אוטומטי לרשימות ביבליוגרפיה הוא מחוץ לתחומו.',
      },
      {
        id: 'nblm-research-q4',
        text: 'מה חשוב לזכור בעת שימוש ב-NotebookLM לעבודה אקדמית?',
        options: [
          'NotebookLM מחליף קריאת המקורות',
          'לסמוך על ציטוטים בלי לאמת',
          'תמיד לאמת ציטוטים מול המקורות המקוריים — AI מסייע, לא מחליף',
          'ניתן להשתמש בתוצרים ישירות בלי עריכה',
        ],
        correct: 2,
        explanation: 'NotebookLM הוא כלי עזר — לא מחליף קריאה ופרשנות. תמיד אמת ציטוטים מול המקורות. הוא יכול לחמוץ context, להציג ציטוט חלקי, או לפרש בצורה שגויה.',
      },
    ],
  },
]
