import type { Lesson } from '../../types'

export const sqlLessons: Lesson[] = [
  {
    id: 'intro',
    title: 'מבוא ל-SQL',
    summary: 'מה זה SQL, מה זה מסד נתונים, ואיך הכל עובד',
    emoji: '🗄️',
    content: [
      {
        type: 'heading',
        text: 'מה זה מסד נתונים?',
      },
      {
        type: 'text',
        text: 'מסד נתונים הוא מקום מאורגן לשמירת מידע. תחשבו על זה כמו קבצי Excel ענקיים — אבל הרבה יותר חזקים, מהירים, ומאובטחים. כל אפליקציה שאתם מכירים — פייסבוק, אמזון, הבנק שלכם — שומרת את המידע שלה במסד נתונים.',
      },
      {
        type: 'heading',
        text: 'מה זה SQL?',
      },
      {
        type: 'text',
        text: 'SQL זה ראשי תיבות של Structured Query Language — שפת שאילתות מובנית. זוהי השפה שבה אנחנו "מדברים" עם מסד הנתונים. רוצים לקבל נתונים? לשנות נתונים? למחוק? הכל נעשה דרך SQL.',
      },
      {
        type: 'tip',
        text: 'SQL מבוטאת "סיקוול" או "אס-קיו-אל" — שתי הגיות נפוצות ומקובלות.',
      },
      {
        type: 'heading',
        text: 'טבלאות, שורות ועמודות',
      },
      {
        type: 'text',
        text: 'המידע במסד הנתונים מאורגן בטבלאות. כל טבלה מכילה עמודות (columns) — שהן סוגי המידע, ושורות (rows) — שהן הרשומות הבודדות.',
      },
      {
        type: 'table',
        caption: 'טבלת customers — לקוחות',
        headers: ['id', 'name', 'city', 'age'],
        rows: [
          ['1', 'דוד כהן', 'תל אביב', '30'],
          ['2', 'שרה לוי', 'חיפה', '25'],
          ['3', 'יוסי גל', 'ירושלים', '45'],
        ],
      },
      {
        type: 'heading',
        text: 'מפתח ראשי (Primary Key)',
      },
      {
        type: 'text',
        text: 'כל טבלה בדרך כלל מכילה עמודת id — מזהה ייחודי לכל שורה. זה נקרא "מפתח ראשי". הוא מבטיח שנוכל למצוא כל רשומה בדיוק.',
      },
      {
        type: 'code',
        lang: 'sql',
        caption: 'הצגת כל תוכן הטבלה',
        code: `-- הסימן -- מציין הערה (comment) שלא מתבצעת
-- נציג את כל הלקוחות:
SELECT * FROM customers;

-- תוצאה:
-- id | name     | city      | age
-- 1  | דוד כהן  | תל אביב  | 30
-- 2  | שרה לוי  | חיפה      | 25
-- 3  | יוסי גל  | ירושלים  | 45`,
      },
      {
        type: 'tip',
        text: 'SQL לא תלוי רישיות — SELECT, select, ו-Select עושים בדיוק אותו הדבר. מקובל לכתוב מילות מפתח באותיות גדולות.',
      },
    ],
    questionBank: [
      {
        id: 'q1',
        text: 'מה ראשי התיבות של SQL?',
        options: [
          'Search Quick Language',
          'Structured Query Language',
          'System Question Logic',
          'Simple Query Library',
        ],
        correct: 1,
        explanation: 'SQL = Structured Query Language — שפת שאילתות מובנית לניהול מסדי נתונים.',
      },
      {
        id: 'q2',
        text: 'מה תפקיד המפתח הראשי (Primary Key)?',
        options: [
          'עמודה שמכילה את שם הטבלה',
          'השורה הראשונה בטבלה',
          'מזהה ייחודי לכל שורה',
          'סיסמה לגישה למסד הנתונים',
        ],
        correct: 2,
        explanation: 'המפתח הראשי הוא מזהה ייחודי לכל שורה — בדרך כלל עמודת id. הוא מבטיח שנוכל לזהות כל רשומה בצורה חד-משמעית.',
      },
      {
        id: 'q3',
        text: 'מה ההבדל בין שורה לעמודה בטבלת SQL?',
        options: [
          'אין הבדל, זה אותו הדבר',
          'שורה = שדה נתונים, עמודה = רשומה',
          'שורה = רשומה אחת, עמודה = סוג נתון',
          'שורה = טבלה, עמודה = מסד נתונים',
        ],
        correct: 2,
        explanation: 'שורה (row/record) היא רשומה בודדת — למשל, לקוח אחד. עמודה (column/field) היא סוג של מידע — למשל, "שם" או "גיל".',
      },
      {
        id: 'q4',
        text: 'מה הוא RDBMS?',
        options: [
          'שפת תכנות לאינטרנט',
          'מערכת לניהול מסדי נתונים יחסיים',
          'סוג של שרת ווב',
          'פרוטוקול תקשורת רשת',
        ],
        correct: 1,
        explanation: 'RDBMS = Relational Database Management System — מערכת לניהול מסדי נתונים יחסיים. דוגמאות: MySQL, PostgreSQL, SQLite.',
      },
      {
        id: 'q5',
        text: 'SQL תלויה רישיות?',
        options: [
          'כן, חייבים לכתוב הכל באותיות גדולות',
          'כן, חייבים לכתוב הכל באותיות קטנות',
          'לא, SELECT, select ו-Select זהים',
          'תלוי בסוג מסד הנתונים',
        ],
        correct: 2,
        explanation: 'SQL אינה תלויה רישיות. SELECT, select, ו-Select כולם עובדים. המוסכמה היא לכתוב מילות מפתח באותיות גדולות לקריאות.',
      },
      {
        id: 'q6',
        text: 'איזה מהבאים הוא מסד נתונים יחסי (RDBMS)?',
        options: ['MongoDB', 'Redis', 'PostgreSQL', 'Cassandra'],
        correct: 2,
        explanation: 'PostgreSQL הוא RDBMS — מסד נתונים יחסי שמשתמש ב-SQL. MongoDB ו-Redis הם NoSQL, וגם Cassandra.',
      },
      {
        id: 'q7',
        text: 'כמה טבלאות יכול מסד נתונים להכיל?',
        options: ['רק אחת', 'לכל היותר 10', 'לכל היותר 100', 'כמה שרוצים'],
        correct: 3,
        explanation: 'מסד נתונים יכול להכיל אלפי טבלאות. בפרויקטים גדולים רגיל לראות עשרות עד מאות טבלאות.',
      },
      {
        id: 'q8',
        text: 'מה עושה הסימן -- ב-SQL?',
        options: [
          'מחסיר ערך',
          'מסמן תחילת שאילתה',
          'מסמן הערה — הטקסט אחריו לא מתבצע',
          'מחבר שתי שאילתות',
        ],
        correct: 2,
        explanation: 'הסימן -- מסמן הערה (comment). כל מה שאחריו באותה שורה מתעלם ממנו מסד הנתונים. שימושי להסברים בקוד.',
      },
    ],
  },

  {
    id: 'select',
    title: 'SELECT — בחירת נתונים',
    summary: 'איך שולפים נתונים מטבלה — כולם או ספציפיים',
    emoji: '🔍',
    content: [
      {
        type: 'heading',
        text: 'SELECT — הפקודה הכי חשובה',
      },
      {
        type: 'text',
        text: 'SELECT היא הפקודה שבה נשתמש הכי הרבה. היא מאפשרת לשלוף נתונים מטבלה. בצורתה הפשוטה ביותר: בחר עמודות → מ(FROM) טבלה.',
      },
      {
        type: 'code',
        lang: 'sql',
        caption: 'SELECT בסיסי',
        code: `-- כוכבית (*) = כל העמודות
SELECT * FROM products;

-- בחירת עמודות ספציפיות
SELECT name, price FROM products;

-- ניתן לבחור כמה עמודות שרוצים
SELECT id, name, category, price FROM products;`,
      },
      {
        type: 'heading',
        text: 'כינויים עם AS',
      },
      {
        type: 'text',
        text: 'לפעמים שם העמודה במסד הנתונים לא נוח לקריאה. עם AS ניתן לתת לה שם אחר בתוצאות בלבד — הטבלה עצמה לא משתנה.',
      },
      {
        type: 'code',
        lang: 'sql',
        caption: 'כינויים עם AS',
        code: `SELECT
  name        AS product_name,
  price       AS cost,
  category    AS type
FROM products;

-- ניתן גם ללא AS (לא מומלץ אבל עובד):
SELECT name product_name FROM products;`,
      },
      {
        type: 'heading',
        text: 'DISTINCT — הסרת כפילויות',
      },
      {
        type: 'text',
        text: 'אם רוצים לראות רשימה של כל הערכים הייחודיים בעמודה — בלי כפילויות — משתמשים ב-DISTINCT.',
      },
      {
        type: 'code',
        lang: 'sql',
        caption: 'DISTINCT',
        code: `-- כמה ערים שונות יש ללקוחות?
SELECT DISTINCT city FROM customers;

-- אם יש 100 לקוחות מ-5 ערים, נקבל 5 שורות בלבד

-- ניתן להשתמש עם כמה עמודות
SELECT DISTINCT city, country FROM customers;`,
      },
      {
        type: 'tip',
        text: 'SELECT * נוח לבדיקות מהירות, אבל בקוד ייצור עדיף לציין עמודות ספציפיות — כך הקוד ברור יותר והשאילתה מהירה יותר.',
      },
    ],
    questionBank: [
      {
        id: 'q1',
        text: 'מה מחזירה השאילתה SELECT * FROM employees?',
        options: [
          'רק העמודה הראשונה',
          'רק השורה הראשונה',
          'כל השורות וכל העמודות',
          'מחיקת כל הנתונים',
        ],
        correct: 2,
        explanation: 'SELECT * FROM table מחזירה את כל השורות וכל העמודות מהטבלה. הכוכבית (*) אומרת "כל העמודות".',
      },
      {
        id: 'q2',
        text: 'מה עושה DISTINCT?',
        options: [
          'ממיין את התוצאות מהקטן לגדול',
          'מחזיר שורה אחת בלבד',
          'מסיר שורות עם ערכים כפולים',
          'בוחר עמודות ספציפיות',
        ],
        correct: 2,
        explanation: 'DISTINCT מסיר כפילויות — כל ערך (או שילוב ערכים) מופיע פעם אחת בלבד בתוצאות.',
      },
      {
        id: 'q3',
        text: 'איזו שאילתה נכונה לתת כינוי לעמודה?',
        options: [
          'SELECT name CALLED full_name FROM users',
          'SELECT name AS full_name FROM users',
          'SELECT name = full_name FROM users',
          'SELECT name RENAME full_name FROM users',
        ],
        correct: 1,
        explanation: 'AS משמש לכינוי (alias). הכינוי מופיע בכותרת העמודה בתוצאות אבל לא משנה את שם העמודה בטבלה.',
      },
      {
        id: 'q4',
        text: 'אם יש 200 לקוחות מ-8 ערים שונות, כמה שורות יחזיר SELECT DISTINCT city FROM customers?',
        options: ['200', '8', '1', 'תלוי בגודל הטבלה'],
        correct: 1,
        explanation: 'DISTINCT מחזיר רק את הערים הייחודיות. אם יש 8 ערים שונות, נקבל בדיוק 8 שורות — ללא קשר לכמה לקוחות יש.',
      },
      {
        id: 'q5',
        text: 'מהו הסדר הנכון של SELECT?',
        options: [
          'FROM table SELECT columns',
          'SELECT columns FROM table',
          'GET columns FROM table',
          'FETCH columns FROM table',
        ],
        correct: 1,
        explanation: 'הסדר הנכון הוא SELECT columns FROM table. SELECT תמיד בא ראשון, אחריו שמות העמודות, ואחריו FROM ושם הטבלה.',
      },
      {
        id: 'q6',
        text: 'כמה עמודות יחזיר SELECT id, name, email, age FROM users?',
        options: ['1', '2', '3', '4'],
        correct: 3,
        explanation: 'ציינו 4 עמודות (id, name, email, age) — לכן נקבל 4 עמודות. מספר השורות תלוי בכמה שורות יש בטבלה.',
      },
      {
        id: 'q7',
        text: 'מה יחזיר SELECT 2 + 3?',
        options: [
          'שגיאה — חייב FROM',
          '5',
          '"2 + 3" כמחרוזת',
          'NULL',
        ],
        correct: 1,
        explanation: 'ב-SQL ניתן לחשב ביטויים ישירות ב-SELECT ללא FROM. SELECT 2+3 יחזיר 5.',
      },
      {
        id: 'q8',
        text: 'מה ההבדל בין SELECT name, city ל-SELECT *?',
        options: [
          'אין הבדל',
          'SELECT * מהיר יותר תמיד',
          'SELECT name, city מחזיר רק 2 עמודות; SELECT * מחזיר את כולן',
          'SELECT name, city מחזיר פחות שורות',
        ],
        correct: 2,
        explanation: 'SELECT name, city מחזיר בדיוק 2 עמודות; SELECT * מחזיר את כל העמודות בטבלה. מספר השורות זהה בשניהם.',
      },
      {
        id: 'q9',
        text: 'מה מחזיר SELECT DISTINCT city, country FROM users?',
        options: [
          'כל הערים הייחודיות בלבד',
          'כל המדינות הייחודיות בלבד',
          'כל הצירופים הייחודיים של עיר + מדינה',
          'שגיאה — DISTINCT רק לעמודה אחת',
        ],
        correct: 2,
        explanation: 'DISTINCT עם כמה עמודות מסיר שורות שבהן הצירוף של כל העמודות זהה. למשל תל אביב + ישראל יופיע פעם אחת.',
      },
      {
        id: 'q10',
        text: 'מה כינוי (alias) ב-SQL?',
        options: [
          'שם חלופי לעמודה שמשנה את הטבלה לצמיתות',
          'שם חלופי שמופיע בתוצאות בלבד',
          'סוג של עמודה מוסתרת',
          'קיצור דרך לכתיבת שאילתה',
        ],
        correct: 1,
        explanation: 'כינוי (alias) הוא שם זמני לעמודה בתוצאות. הוא לא משנה דבר בטבלה עצמה — רק את כותרת העמודה במה שאנחנו רואים.',
      },
    ],
  },

  {
    id: 'where',
    title: 'WHERE — סינון נתונים',
    summary: 'איך מוצאים בדיוק את מה שצריך עם תנאים',
    emoji: '🎯',
    content: [
      {
        type: 'heading',
        text: 'WHERE — הגדרת תנאים',
      },
      {
        type: 'text',
        text: 'WHERE מאפשר לנו לסנן תוצאות — לקבל רק את השורות שעונות על תנאי מסוים. בלי WHERE, מקבלים את כל הטבלה.',
      },
      {
        type: 'code',
        lang: 'sql',
        caption: 'תנאים בסיסיים',
        code: `-- לקוחות מתל אביב
SELECT * FROM customers WHERE city = 'תל אביב';

-- מוצרים שמחיר גבוה מ-100
SELECT * FROM products WHERE price > 100;

-- עובדים שגילם שונה מ-30
SELECT * FROM employees WHERE age != 30;

-- אופרטורי השוואה: = > < >= <= != (או <>)`,
      },
      {
        type: 'heading',
        text: 'AND, OR, NOT — שילוב תנאים',
      },
      {
        type: 'code',
        lang: 'sql',
        caption: 'שילוב תנאים',
        code: `-- AND: שני התנאים חייבים להתקיים
SELECT * FROM customers
WHERE city = 'תל אביב' AND age > 30;

-- OR: מספיק שאחד מהתנאים מתקיים
SELECT * FROM customers
WHERE city = 'תל אביב' OR city = 'חיפה';

-- NOT: הפוך את התנאי
SELECT * FROM products WHERE NOT category = 'ריהוט';`,
      },
      {
        type: 'heading',
        text: 'BETWEEN, IN, LIKE',
      },
      {
        type: 'code',
        lang: 'sql',
        caption: 'BETWEEN, IN, LIKE',
        code: `-- BETWEEN: בתוך טווח (כולל את הקצוות)
SELECT * FROM products WHERE price BETWEEN 50 AND 200;

-- IN: רשימת ערכים אפשריים
SELECT * FROM customers
WHERE city IN ('תל אביב', 'חיפה', 'ירושלים');

-- LIKE: חיפוש לפי תבנית
-- % = כל מספר תווים, _ = תו בודד
SELECT * FROM customers WHERE name LIKE 'ד%';     -- מתחיל ב-ד
SELECT * FROM customers WHERE name LIKE '%כהן';   -- מסתיים בכהן
SELECT * FROM products WHERE name LIKE '%כיסא%';  -- מכיל "כיסא"`,
      },
      {
        type: 'heading',
        text: 'IS NULL — ערכים חסרים',
      },
      {
        type: 'code',
        lang: 'sql',
        caption: 'NULL — ערך חסר',
        code: `-- לקוחות שאין להם כתובת אימייל
SELECT * FROM customers WHERE email IS NULL;

-- לקוחות שיש להם אימייל
SELECT * FROM customers WHERE email IS NOT NULL;

-- שימו לב: WHERE email = NULL לא עובד!
-- תמיד משתמשים IS NULL / IS NOT NULL`,
      },
      {
        type: 'tip',
        text: 'NULL אינו אפס ואינו מחרוזת ריקה — הוא "אין ערך". לכן לא ניתן להשוות אליו עם = אלא רק עם IS NULL.',
      },
    ],
    questionBank: [
      {
        id: 'q1',
        text: 'מה תחזיר: SELECT * FROM products WHERE price > 100?',
        options: [
          'כל המוצרים',
          'מוצרים שמחירם גדול מ-100',
          'המוצר הכי יקר',
          'מחיקת מוצרים יקרים',
        ],
        correct: 1,
        explanation: 'WHERE price > 100 מסנן ומחזיר רק שורות שבהן הערך בעמודת price גדול מ-100.',
      },
      {
        id: 'q2',
        text: 'מה ההבדל בין AND לבין OR?',
        options: [
          'AND = אחד התנאים, OR = כולם',
          'AND = כל התנאים חייבים, OR = מספיק אחד',
          'AND מהיר יותר מ-OR',
          'אין הבדל — שניהם מחברים תנאים',
        ],
        correct: 1,
        explanation: 'AND דורש שכל התנאים יתקיימו. OR דורש שלפחות תנאי אחד יתקיים. AND "מצמצם" תוצאות, OR "מרחיב" אותן.',
      },
      {
        id: 'q3',
        text: 'מה יחזיר: WHERE name LIKE \'א%\'?',
        options: [
          'שמות שמכילים א',
          'שמות שמסתיימים ב-א',
          'שמות שמתחילים ב-א',
          'שמות שאורכם כמו א',
        ],
        correct: 2,
        explanation: 'ב-LIKE, % מייצג כל רצף תווים. \'א%\' = מתחיל ב-א ואחריו כל תו שהוא. \'%א\' = מסתיים ב-א.',
      },
      {
        id: 'q4',
        text: 'מה עושה BETWEEN 20 AND 40?',
        options: [
          'ערכים גדולים מ-20 וקטנים מ-40 (לא כולל)',
          'ערכים בין 20 ל-40 כולל הקצוות',
          'ערכים שונים מ-20 ומ-40',
          'ממוצע בין 20 ל-40',
        ],
        correct: 1,
        explanation: 'BETWEEN כולל את הקצוות. WHERE age BETWEEN 20 AND 40 שקול ל: WHERE age >= 20 AND age <= 40.',
      },
      {
        id: 'q5',
        text: 'מה יחזיר: WHERE city IN (\'תל אביב\', \'חיפה\')?',
        options: [
          'לקוחות שאינם מתל אביב ומחיפה',
          'לקוחות מתל אביב ומחיפה',
          'שגיאה — IN לא תומך בעברית',
          'רק הלקוח הראשון מכל עיר',
        ],
        correct: 1,
        explanation: 'IN בודק אם הערך נמצא ברשימה. city IN (\'תל אביב\', \'חיפה\') מחזיר שורות שהעיר שלהן היא תל אביב או חיפה.',
      },
      {
        id: 'q6',
        text: 'איך בודקים אם עמודה ריקה (NULL)?',
        options: [
          'WHERE email = NULL',
          'WHERE email == NULL',
          'WHERE email IS NULL',
          'WHERE email = \'\'',
        ],
        correct: 2,
        explanation: 'NULL הוא מיוחד — לא ניתן להשוות אליו עם =. חייבים להשתמש ב-IS NULL (או IS NOT NULL).',
      },
      {
        id: 'q7',
        text: 'מה מחזיר: WHERE name LIKE \'%כהן%\'?',
        options: [
          'שמות שמתחילים בכהן',
          'שמות שמסתיימים בכהן',
          'שמות שמכילים "כהן" בכל מקום',
          'שמות שהם בדיוק "כהן"',
        ],
        correct: 2,
        explanation: '\'%כהן%\' — % בשני הצדדים אומר: "כהן" יכול להיות בכל מקום בשם. דוד כהן, כהן יוסי, בן-כהן — כולם יוחזרו.',
      },
      {
        id: 'q8',
        text: 'מה יחזיר: WHERE city = \'תל אביב\' AND age > 25?',
        options: [
          'כל לקוחות תל אביב + כל מי שגילם מעל 25',
          'לקוחות מתל אביב שגילם מעל 25 בלבד',
          'כל הלקוחות מעל 25 מכל הערים',
          'שגיאה',
        ],
        correct: 1,
        explanation: 'AND דורש שניהם: חייבים להיות מתל אביב וגם גילם חייב להיות מעל 25. רק לקוחות שעומדים בשני התנאים יוחזרו.',
      },
      {
        id: 'q9',
        text: 'מה ההבדל בין NULL לבין \'\'?',
        options: [
          'אין הבדל',
          'NULL = ערך חסר לחלוטין; \'\' = מחרוזת ריקה',
          'NULL = אפס; \'\' = מחרוזת ריקה',
          'NULL גדול יותר מ-\'\'',
        ],
        correct: 1,
        explanation: 'NULL אומר "אין ערך כלל" — הנתון לא הוזן. \'\' היא מחרוזת ריקה — הנתון הוזן אבל ריק. זה הבדל חשוב!',
      },
      {
        id: 'q10',
        text: 'מה עושה NOT לפני תנאי?',
        options: [
          'מגביר את חוזק התנאי',
          'הופך את התנאי — מחזיר את ההיפך',
          'מוסיף תנאי נוסף',
          'מוחק תנאים קודמים',
        ],
        correct: 1,
        explanation: 'NOT הופך את התנאי. NOT category = \'ריהוט\' = כל המוצרים שאינם ריהוט. NOT IN, NOT LIKE, NOT BETWEEN — כולם עובדים אותו הדבר.',
      },
    ],
  },

  {
    id: 'order-limit',
    title: 'ORDER BY ו-LIMIT — מיון וחיתוך',
    summary: 'איך ממיינים תוצאות ומגבילים כמה נקבל',
    emoji: '📊',
    content: [
      {
        type: 'heading',
        text: 'ORDER BY — מיון תוצאות',
      },
      {
        type: 'text',
        text: 'ORDER BY מאפשר לקבל את התוצאות ממוינות לפי עמודה כלשהי. ברירת המחדל היא סדר עולה (ASC). ניתן לציין DESC לסדר יורד.',
      },
      {
        type: 'code',
        lang: 'sql',
        caption: 'ORDER BY — מיון',
        code: `-- מיון לפי שם — א' עד ת' (עולה, ברירת מחדל)
SELECT * FROM customers ORDER BY name ASC;

-- מיון לפי מחיר — מהיקר לזול (יורד)
SELECT * FROM products ORDER BY price DESC;

-- מיון לפי כמה עמודות:
-- קודם לפי עיר, בתוך כל עיר — לפי שם
SELECT * FROM customers ORDER BY city, name;`,
      },
      {
        type: 'heading',
        text: 'LIMIT — הגבלת כמות תוצאות',
      },
      {
        type: 'code',
        lang: 'sql',
        caption: 'LIMIT',
        code: `-- קבל רק 10 שורות
SELECT * FROM products LIMIT 10;

-- 5 המוצרים הכי יקרים
SELECT * FROM products ORDER BY price DESC LIMIT 5;

-- אם הטבלה קטנה — LIMIT לא גורם לשגיאה
-- אם יש 30 שורות ו-LIMIT 100, נקבל 30`,
      },
      {
        type: 'heading',
        text: 'OFFSET — דפדוף (Pagination)',
      },
      {
        type: 'text',
        text: 'OFFSET מאפשר לדלג על מספר שורות. בשילוב עם LIMIT זה מאפשר לממש "עמודים" — כמו בחיפוש Google.',
      },
      {
        type: 'code',
        lang: 'sql',
        caption: 'LIMIT + OFFSET לדפדוף',
        code: `-- עמוד 1: שורות 1-10
SELECT * FROM products ORDER BY id LIMIT 10 OFFSET 0;

-- עמוד 2: שורות 11-20
SELECT * FROM products ORDER BY id LIMIT 10 OFFSET 10;

-- עמוד 3: שורות 21-30
SELECT * FROM products ORDER BY id LIMIT 10 OFFSET 20;`,
      },
      {
        type: 'heading',
        text: 'הסדר הנכון של הפסוקיות',
      },
      {
        type: 'code',
        lang: 'sql',
        caption: 'סדר כתיבה נכון',
        code: `SELECT name, price
FROM products
WHERE category = 'אלקטרוניקה'
ORDER BY price DESC
LIMIT 5;

-- הסדר: SELECT → FROM → WHERE → ORDER BY → LIMIT`,
      },
      {
        type: 'tip',
        text: 'חשוב לזכור: ORDER BY, LIMIT ו-OFFSET חייבים לבוא אחרי WHERE. הסדר הקבוע: SELECT → FROM → WHERE → ORDER BY → LIMIT → OFFSET.',
      },
    ],
    questionBank: [
      {
        id: 'q1',
        text: 'מהי ברירת המחדל של ORDER BY?',
        options: [
          'DESC — מהגדול לקטן',
          'ASC — מהקטן לגדול',
          'סדר אקראי',
          'לפי id',
        ],
        correct: 1,
        explanation: 'ברירת המחדל היא ASC (Ascending = עולה). ORDER BY name שקול ל-ORDER BY name ASC.',
      },
      {
        id: 'q2',
        text: 'מה עושה LIMIT 5?',
        options: [
          'מחזיר 5 עמודות בלבד',
          'מחזיר לכל היותר 5 שורות',
          'מדלג על 5 שורות ראשונות',
          'מגביל ל-5 תנאים ב-WHERE',
        ],
        correct: 1,
        explanation: 'LIMIT קובע את המספר המקסימלי של שורות שיוחזרו. LIMIT 5 = לכל היותר 5 שורות.',
      },
      {
        id: 'q3',
        text: 'לקבלת שורות 11-20 (עמוד שני), מה נכתוב?',
        options: [
          'LIMIT 10 OFFSET 10',
          'LIMIT 20 OFFSET 10',
          'LIMIT 10 OFFSET 11',
          'LIMIT 11 TO 20',
        ],
        correct: 0,
        explanation: 'LIMIT 10 OFFSET 10 = קח 10 שורות, דלג על 10 הראשונות. כך מקבלים שורות 11-20.',
      },
      {
        id: 'q4',
        text: 'מה יחזיר: ORDER BY price DESC?',
        options: [
          'מחירים מהנמוך לגבוה',
          'מחירים מהגבוה לנמוך',
          'מחירים בסדר אלפביתי',
          'שגיאה',
        ],
        correct: 1,
        explanation: 'DESC = Descending = יורד. ORDER BY price DESC ממיין מהמחיר הגבוה ביותר לנמוך ביותר.',
      },
      {
        id: 'q5',
        text: 'מה הסדר הנכון לכתיבה?',
        options: [
          'ORDER BY, WHERE, LIMIT',
          'WHERE, ORDER BY, LIMIT',
          'LIMIT, WHERE, ORDER BY',
          'WHERE, LIMIT, ORDER BY',
        ],
        correct: 1,
        explanation: 'הסדר הנכון: SELECT → FROM → WHERE → ORDER BY → LIMIT. WHERE תמיד לפני ORDER BY ולפני LIMIT.',
      },
      {
        id: 'q6',
        text: 'מה יחזיר: SELECT * FROM users ORDER BY name ASC LIMIT 1?',
        options: [
          'המשתמש עם ה-id הקטן ביותר',
          'המשתמש ששמו ראשון אלפביתית',
          'משתמש אקראי',
          'שגיאה',
        ],
        correct: 1,
        explanation: 'ORDER BY name ASC ממיין לפי שם אלפביתית (א-ת). LIMIT 1 לוקח רק את הראשון — כלומר השם הראשון אלפביתית.',
      },
      {
        id: 'q7',
        text: 'כמה שורות יחזיר LIMIT 100 אם יש רק 30 שורות בטבלה?',
        options: ['שגיאה', '0', '30', '100 עם NULL בשאר'],
        correct: 2,
        explanation: 'LIMIT הוא מקסימום, לא מינימום. אם יש 30 שורות, LIMIT 100 יחזיר את כל ה-30 ולא יזרוק שגיאה.',
      },
      {
        id: 'q8',
        text: 'מה עושה ORDER BY city, name?',
        options: [
          'ממיין רק לפי עיר',
          'ממיין רק לפי שם',
          'ממיין לפי עיר; בתוך כל עיר — לפי שם',
          'שגיאה — ניתן למיין רק לפי עמודה אחת',
        ],
        correct: 2,
        explanation: 'ניתן למיין לפי כמה עמודות. קודם ממיינים לפי city, ואם יש לקוחות עם אותה עיר — ממיינים ביניהם לפי name.',
      },
    ],
  },

  {
    id: 'join',
    title: 'JOIN — חיבור טבלאות',
    summary: 'איך מחברים מידע ממספר טבלאות יחד',
    emoji: '🔗',
    content: [
      {
        type: 'heading',
        text: 'למה צריך JOIN?',
      },
      {
        type: 'text',
        text: 'במסדי נתונים, המידע מפוזר על פני כמה טבלאות. למשל: טבלת הזמנות מכילה רק את מזהה הלקוח (customer_id), לא את שמו. JOIN מאפשר לחבר את המידע מכמה טבלאות לתוצאה אחת.',
      },
      {
        type: 'table',
        caption: 'טבלת orders — הזמנות',
        headers: ['id', 'customer_id', 'product', 'amount'],
        rows: [
          ['1', '2', 'מחשב נייד', '4500'],
          ['2', '1', 'עכבר', '120'],
          ['3', '2', 'מקלדת', '250'],
        ],
      },
      {
        type: 'heading',
        text: 'INNER JOIN — שורות תואמות בלבד',
      },
      {
        type: 'code',
        lang: 'sql',
        caption: 'INNER JOIN',
        code: `-- כל ההזמנות + שם הלקוח
SELECT
  orders.id,
  customers.name,
  orders.product,
  orders.amount
FROM orders
INNER JOIN customers ON orders.customer_id = customers.id;

-- ניתן להשתמש בקיצורי שמות (aliases) לטבלאות
SELECT o.id, c.name, o.product, o.amount
FROM orders o
INNER JOIN customers c ON o.customer_id = c.id;`,
      },
      {
        type: 'tip',
        text: 'INNER JOIN מחזיר רק שורות שיש להן תואם בשתי הטבלאות. לקוח ללא הזמנות — לא יופיע. הזמנה ללא לקוח תואם — לא תופיע.',
      },
      {
        type: 'heading',
        text: 'LEFT JOIN — כל השורות מהשמאל',
      },
      {
        type: 'code',
        lang: 'sql',
        caption: 'LEFT JOIN',
        code: `-- כל הלקוחות, גם אלה שלא הזמינו
SELECT c.name, o.product, o.amount
FROM customers c
LEFT JOIN orders o ON c.id = o.customer_id;

-- לקוח שלא הזמין יופיע עם NULL בעמודות orders
-- name: דוד כהן | product: NULL | amount: NULL`,
      },
      {
        type: 'heading',
        text: 'RIGHT JOIN — כל השורות מהימין',
      },
      {
        type: 'code',
        lang: 'sql',
        caption: 'RIGHT JOIN',
        code: `-- כל ההזמנות, גם אם הלקוח לא קיים (נדיר)
SELECT c.name, o.product
FROM customers c
RIGHT JOIN orders o ON c.id = o.customer_id;

-- שימוש: RIGHT JOIN פחות נפוץ מ-LEFT JOIN
-- בדרך כלל ניתן להחליף בהיפוך סדר הטבלאות + LEFT JOIN`,
      },
      {
        type: 'tip',
        text: 'הכי נפוץ: INNER JOIN ו-LEFT JOIN. אם אתם לא בטוחים — INNER JOIN מחזיר רק שורות תואמות, LEFT JOIN מחזיר הכל מהטבלה הראשונה.',
      },
    ],
    questionBank: [
      {
        id: 'q1',
        text: 'מה עושה INNER JOIN?',
        options: [
          'מחזיר את כל שורות הטבלה הראשונה',
          'מחזיר רק שורות שיש להן תואם בשתי הטבלאות',
          'מאחד שתי טבלאות לטבלה חדשה לצמיתות',
          'מכפיל את כמות השורות',
        ],
        correct: 1,
        explanation: 'INNER JOIN מחזיר רק שורות שעונות על תנאי ה-ON — כלומר, יש להן רשומה תואמת בשתי הטבלאות.',
      },
      {
        id: 'q2',
        text: 'מה ההבדל בין LEFT JOIN לבין INNER JOIN?',
        options: [
          'אין הבדל',
          'LEFT JOIN מחזיר גם שורות ללא תואם בטבלה הימנית',
          'INNER JOIN מחזיר יותר שורות',
          'LEFT JOIN מהיר יותר',
        ],
        correct: 1,
        explanation: 'LEFT JOIN מחזיר את כל שורות הטבלה השמאלית, גם אם אין להן תואם בימין (עם NULL). INNER JOIN דורש תואם בשתיהן.',
      },
      {
        id: 'q3',
        text: 'מה מגדיר ON ב-JOIN?',
        options: [
          'את העמודות שרוצים לראות',
          'את תנאי החיבור בין הטבלאות',
          'את סדר המיון',
          'את מספר השורות',
        ],
        correct: 1,
        explanation: 'ON מגדיר כיצד הטבלאות מחוברות — על איזה שדה מתבצע ההתאמה. למשל: ON orders.customer_id = customers.id.',
      },
      {
        id: 'q4',
        text: 'מה יחזיר LEFT JOIN כשאין תואם בטבלה הימנית?',
        options: [
          'השורה לא תופיע בתוצאות',
          'NULL בעמודות הטבלה הימנית',
          '0 בעמודות הטבלה הימנית',
          'שגיאה',
        ],
        correct: 1,
        explanation: 'ב-LEFT JOIN, שורות מהטבלה השמאלית שאין להן תואם יוחזרו עם NULL בכל עמודות הטבלה הימנית.',
      },
      {
        id: 'q5',
        text: 'כיצד מציינים מאיזו טבלה עמודת id כשיש ל-2 טבלאות עמודה בשם id?',
        options: [
          'id1 ו-id2',
          'שם_טבלה.id',
          'SQL מבין אוטומטית',
          'חייבים לשנות את שמות העמודות',
        ],
        correct: 1,
        explanation: 'כותבים table_name.column_name. למשל: customers.id ו-orders.id. אפשר גם לתת alias לטבלה: c.id ו-o.id.',
      },
      {
        id: 'q6',
        text: 'אם יש 5 לקוחות ו-8 הזמנות, כמה שורות יחזיר INNER JOIN?',
        options: [
          '40 (5×8)',
          '13 (5+8)',
          'תלוי בכמה הזמנות מצאו לקוח תואם',
          '5',
        ],
        correct: 2,
        explanation: 'INNER JOIN מחזיר רק שורות תואמות. אם 4 הזמנות יש להן לקוח תואם, נקבל 4 שורות. תלוי בנתונים בפועל.',
      },
      {
        id: 'q7',
        text: 'כשכותבים FROM orders o, מה o?',
        options: [
          'שגיאה — o אינו מילת מפתח',
          'alias (כינוי) לטבלה orders',
          'שם עמודה',
          'תנאי סינון',
        ],
        correct: 1,
        explanation: 'o הוא alias (כינוי) לטבלה orders. במקום לכתוב orders.id בכל מקום, כותבים o.id. מקצר ומקל על הקריאה.',
      },
      {
        id: 'q8',
        text: 'מה ייחודי ב-RIGHT JOIN לעומת LEFT JOIN?',
        options: [
          'RIGHT JOIN מהיר יותר',
          'RIGHT JOIN מחזיר את כל שורות הטבלה הימנית, גם ללא תואם בשמאל',
          'RIGHT JOIN מחזיר רק שורות תואמות',
          'אין הבדל',
        ],
        correct: 1,
        explanation: 'RIGHT JOIN זה כמו LEFT JOIN אבל הפוך — מחזיר את כל שורות הטבלה הימנית. ניתן תמיד להחליף RIGHT JOIN ב-LEFT JOIN עם החלפת סדר הטבלאות.',
      },
      {
        id: 'q9',
        text: 'ניתן לבצע JOIN על יותר מ-2 טבלאות?',
        options: [
          'לא, JOIN אפשרי רק בין 2 טבלאות',
          'כן, ניתן לשרשר JOIN-ים',
          'כן, אבל רק עד 3 טבלאות',
          'תלוי במסד הנתונים',
        ],
        correct: 1,
        explanation: 'ניתן לשרשר JOIN-ים: FROM a JOIN b ON ... JOIN c ON ... JOIN d ON ... כמה שצריך.',
      },
      {
        id: 'q10',
        text: 'מה יחזיר INNER JOIN על שתי טבלאות ללא שום שורות תואמות?',
        options: [
          'שגיאה',
          'NULL',
          'תוצאה ריקה — 0 שורות',
          'שתי הטבלאות כולן',
        ],
        correct: 2,
        explanation: 'אם אין תואמים בכלל, INNER JOIN מחזיר 0 שורות — תוצאה ריקה. זה תקין ולא גורם לשגיאה.',
      },
    ],
  },

  {
    id: 'aggregation',
    title: 'צבירה וקיבוץ',
    summary: 'COUNT, SUM, AVG, GROUP BY, HAVING — לסכם ולנתח נתונים',
    emoji: '📈',
    content: [
      {
        type: 'heading',
        text: 'פונקציות צבירה',
      },
      {
        type: 'text',
        text: 'פונקציות צבירה מחשבות ערך אחד מתוך קבוצת שורות. הן חיוניות לאנליזה — ספירה, סכום, ממוצע, מינימום ומקסימום.',
      },
      {
        type: 'code',
        lang: 'sql',
        caption: 'פונקציות צבירה בסיסיות',
        code: `-- כמה מוצרים יש?
SELECT COUNT(*) AS total_products FROM products;

-- סכום כל המכירות
SELECT SUM(amount) AS total_sales FROM orders;

-- ממוצע מחיר מוצרים
SELECT AVG(price) AS avg_price FROM products;

-- המחיר הנמוך והגבוה ביותר
SELECT MIN(price) AS cheapest, MAX(price) AS most_expensive
FROM products;`,
      },
      {
        type: 'heading',
        text: 'GROUP BY — קיבוץ לפי קטגוריה',
      },
      {
        type: 'text',
        text: 'GROUP BY מקבץ שורות עם ערך זהה ומאפשר לחשב צבירה לכל קבוצה בנפרד.',
      },
      {
        type: 'code',
        lang: 'sql',
        caption: 'GROUP BY',
        code: `-- כמה לקוחות בכל עיר?
SELECT city, COUNT(*) AS total
FROM customers
GROUP BY city;

-- סכום מכירות לפי חודש
SELECT
  MONTH(order_date) AS month,
  SUM(amount) AS monthly_sales
FROM orders
GROUP BY MONTH(order_date)
ORDER BY month;`,
      },
      {
        type: 'tip',
        text: 'כלל חשוב: בשאילתה עם GROUP BY, בחלק ה-SELECT ניתן לכלול רק עמודות שנמצאות ב-GROUP BY, או עמודות בתוך פונקציית צבירה.',
      },
      {
        type: 'heading',
        text: 'HAVING — סינון על קבוצות',
      },
      {
        type: 'text',
        text: 'HAVING עובד כמו WHERE, אבל על קבוצות אחרי GROUP BY — לא על שורות בודדות.',
      },
      {
        type: 'code',
        lang: 'sql',
        caption: 'HAVING',
        code: `-- ערים עם יותר מ-10 לקוחות
SELECT city, COUNT(*) AS total
FROM customers
GROUP BY city
HAVING COUNT(*) > 10;

-- מחלקות שממוצע משכורתן מעל 15,000
SELECT department, AVG(salary) AS avg_sal
FROM employees
GROUP BY department
HAVING AVG(salary) > 15000
ORDER BY avg_sal DESC;`,
      },
      {
        type: 'code',
        lang: 'sql',
        caption: 'WHERE לעומת HAVING',
        code: `-- WHERE מסנן לפני הקיבוץ
-- HAVING מסנן אחרי הקיבוץ

SELECT city, COUNT(*) AS total
FROM customers
WHERE age > 18          -- קודם: מסנן שורות לפי גיל
GROUP BY city
HAVING COUNT(*) > 5;    -- אחר כך: מסנן ערים לפי כמות`,
      },
    ],
    questionBank: [
      {
        id: 'q1',
        text: 'מה עושה COUNT(*)?',
        options: [
          'מחשב ממוצע',
          'מחזיר את הסכום הכולל',
          'סופר את מספר השורות',
          'מחזיר את הערך הגבוה ביותר',
        ],
        correct: 2,
        explanation: 'COUNT(*) סופר את מספר השורות בתוצאה. COUNT(column) סופר שורות שבהן העמודה אינה NULL.',
      },
      {
        id: 'q2',
        text: 'מה ההבדל העיקרי בין WHERE לבין HAVING?',
        options: [
          'הם זהים לחלוטין',
          'WHERE מסנן שורות לפני GROUP BY; HAVING מסנן קבוצות אחרי GROUP BY',
          'HAVING מסנן שורות; WHERE מסנן קבוצות',
          'WHERE רק לטקסט; HAVING רק למספרים',
        ],
        correct: 1,
        explanation: 'WHERE פועל על שורות בודדות לפני הקיבוץ. HAVING פועל על קבוצות אחרי GROUP BY. לא ניתן להשתמש ב-HAVING ללא GROUP BY בדרך כלל.',
      },
      {
        id: 'q3',
        text: 'מה יחזיר SELECT MAX(price) FROM products?',
        options: [
          'ממוצע המחירים',
          'המחיר הגבוה ביותר',
          'סכום המחירים',
          'מספר המוצרים',
        ],
        correct: 1,
        explanation: 'MAX מחזיר את הערך הגדול ביותר בעמודה. MIN מחזיר את הקטן ביותר.',
      },
      {
        id: 'q4',
        text: 'מה עושה GROUP BY city?',
        options: [
          'ממיין לפי עיר',
          'מוחק שורות כפולות',
          'מקבץ שורות עם אותה עיר כדי לחשב צבירה',
          'בוחר רק עיר אחת',
        ],
        correct: 2,
        explanation: 'GROUP BY מקבץ את כל השורות עם אותו ערך בעיר לקבוצה אחת, ומאפשר לחשב COUNT/SUM/AVG לכל קבוצה בנפרד.',
      },
      {
        id: 'q5',
        text: 'מה יחזיר SELECT AVG(age) FROM students?',
        options: [
          'הגיל הגבוה ביותר',
          'הגיל הנמוך ביותר',
          'ממוצע גילאי הסטודנטים',
          'סכום כל הגילאים',
        ],
        correct: 2,
        explanation: 'AVG מחשב את הממוצע — סכום כל הערכים חלקי מספר הערכים.',
      },
      {
        id: 'q6',
        text: 'בשאילתה עם GROUP BY, מה ניתן לכלול ב-SELECT?',
        options: [
          'כל עמודה שרוצים',
          'רק עמודות שב-GROUP BY או פונקציות צבירה',
          'רק פונקציות צבירה',
          'רק עמודות שב-GROUP BY',
        ],
        correct: 1,
        explanation: 'כלל חשוב: ב-SELECT עם GROUP BY — כל עמודה חייבת להיות ב-GROUP BY, או בתוך פונקציית צבירה (COUNT, SUM, AVG, MIN, MAX).',
      },
      {
        id: 'q7',
        text: 'מה יחזיר: SELECT city, COUNT(*) FROM customers GROUP BY city HAVING COUNT(*) > 5?',
        options: [
          'כל הערים',
          'ערים עם יותר מ-5 לקוחות',
          'ערים עם פחות מ-5 לקוחות',
          'הלקוחות ה-5 הראשונים בכל עיר',
        ],
        correct: 1,
        explanation: 'HAVING COUNT(*) > 5 מסנן ומחזיר רק קבוצות (ערים) שמספר השורות בהן גדול מ-5.',
      },
      {
        id: 'q8',
        text: 'מה ההבדל בין COUNT(*) לבין COUNT(email)?',
        options: [
          'אין הבדל',
          'COUNT(*) סופר את כל השורות; COUNT(email) לא סופר שורות עם email=NULL',
          'COUNT(email) סופר הכל; COUNT(*) לא סופר NULL',
          'COUNT(*) מהיר יותר',
        ],
        correct: 1,
        explanation: 'COUNT(*) סופר את כל השורות ללא קשר ל-NULL. COUNT(column) סופר רק שורות שבהן הערך בעמודה אינו NULL.',
      },
      {
        id: 'q9',
        text: 'מה יחזיר: SELECT MIN(salary) FROM employees WHERE dept = \'פיתוח\'?',
        options: [
          'ממוצע משכורת אנשי פיתוח',
          'המשכורת הנמוכה ביותר באנשי פיתוח',
          'כמות אנשי פיתוח',
          'שגיאה',
        ],
        correct: 1,
        explanation: 'WHERE מסנן קודם לאנשי פיתוח, ואז MIN מוצא את המשכורת הנמוכה ביותר בתוך הקבוצה הזו.',
      },
      {
        id: 'q10',
        text: 'מה SUM(amount) מחזיר?',
        options: [
          'את הסכום הממוצע',
          'את הסכום הגבוה ביותר',
          'את סכום כל ערכי העמודה',
          'את מספר הרשומות',
        ],
        correct: 2,
        explanation: 'SUM מחשב את סכום כל הערכים בעמודה. לדוגמה, SUM(amount) יחזיר את סך כל ההזמנות.',
      },
    ],
  },

  {
    id: 'dml',
    title: 'שינוי נתונים — INSERT, UPDATE, DELETE',
    summary: 'הוספה, עדכון ומחיקה של נתונים בטבלה',
    emoji: '✏️',
    content: [
      {
        type: 'heading',
        text: 'INSERT INTO — הוספת נתונים',
      },
      {
        type: 'text',
        text: 'INSERT INTO מוסיף שורות חדשות לטבלה. מציינים את שמות העמודות ואת הערכים שרוצים להכניס.',
      },
      {
        type: 'code',
        lang: 'sql',
        caption: 'INSERT INTO',
        code: `-- הוספת לקוח אחד
INSERT INTO customers (name, city, age)
VALUES ('רחל גולד', 'באר שבע', 28);

-- הוספת כמה לקוחות בבת אחת
INSERT INTO customers (name, city, age)
VALUES
  ('משה גרין', 'נתניה', 35),
  ('אורלי בן', 'רמת גן', 22),
  ('יעל שמש', 'פתח תקווה', 41);

-- אם משמיטים עמודה — היא תקבל NULL (או ברירת מחדל)
INSERT INTO customers (name) VALUES ('אורן לוי');`,
      },
      {
        type: 'heading',
        text: 'UPDATE — עדכון נתונים',
      },
      {
        type: 'code',
        lang: 'sql',
        caption: 'UPDATE',
        code: `-- עדכון עיר ללקוח ספציפי (לפי id)
UPDATE customers
SET city = 'ירושלים'
WHERE id = 5;

-- עדכון כמה שדות בבת אחת
UPDATE employees
SET salary = salary * 1.1,
    title = 'בכיר'
WHERE department = 'פיתוח' AND years_exp > 5;`,
      },
      {
        type: 'tip',
        text: '⚠️ תמיד כתבו WHERE ב-UPDATE! בלי WHERE — תעדכנו את כל השורות בטבלה. לפני UPDATE גדול, בצעו קודם SELECT עם אותו WHERE לאימות.',
      },
      {
        type: 'heading',
        text: 'DELETE — מחיקת נתונים',
      },
      {
        type: 'code',
        lang: 'sql',
        caption: 'DELETE',
        code: `-- מחיקת לקוח ספציפי
DELETE FROM customers WHERE id = 3;

-- מחיקת כל הלקוחות מעיר מסוימת
DELETE FROM customers WHERE city = 'חיפה';

-- מחיקת כל השורות (⚠️ מסוכן!)
-- DELETE FROM customers;
-- TRUNCATE TABLE customers; -- מהיר יותר, מוחק הכל`,
      },
      {
        type: 'tip',
        text: '⚠️ DELETE ללא WHERE ימחק את כל השורות בטבלה! תמיד בדקו שיש WHERE. לפני מחיקה גדולה — גבו את הנתונים.',
      },
    ],
    questionBank: [
      {
        id: 'q1',
        text: 'מה עושה INSERT INTO?',
        options: [
          'מעדכן שורה קיימת',
          'מוסיף שורה חדשה לטבלה',
          'מחזיר נתונים מהטבלה',
          'מוחק שורה',
        ],
        correct: 1,
        explanation: 'INSERT INTO מוסיף שורות חדשות לטבלה. הוא לא משנה שורות קיימות — לזה משמש UPDATE.',
      },
      {
        id: 'q2',
        text: 'מה יקרה אם נשכח WHERE ב-UPDATE?',
        options: [
          'SQL יזרוק שגיאה',
          'יעדכן שורה אחת אקראית',
          'יעדכן את כל השורות בטבלה',
          'לא יעשה כלום',
        ],
        correct: 2,
        explanation: 'ללא WHERE, UPDATE מעדכן את כל השורות בטבלה! זה באג נפוץ ומסוכן — תמיד ציינו WHERE כשמעדכנים.',
      },
      {
        id: 'q3',
        text: 'מה הסדר הנכון ב-INSERT?',
        options: [
          'VALUES, INSERT INTO, שמות עמודות',
          'INSERT INTO table (columns) VALUES (values)',
          'INSERT VALUES INTO table',
          'INTO table INSERT values',
        ],
        correct: 1,
        explanation: 'הסדר: INSERT INTO table_name (col1, col2) VALUES (val1, val2). העמודות מתאימות לערכים לפי הסדר.',
      },
      {
        id: 'q4',
        text: 'מה יקרה אם נשכח WHERE ב-DELETE?',
        options: [
          'SQL יזרוק שגיאה',
          'ימחק שורה אחת אקראית',
          'ימחק את כל השורות בטבלה',
          'לא יעשה כלום',
        ],
        correct: 2,
        explanation: 'DELETE ללא WHERE מוחק את כל השורות! אחד הבאגים הכי מסוכנים. תמיד אמתו עם SELECT לפני DELETE גדול.',
      },
      {
        id: 'q5',
        text: 'כיצד מוסיפים ערך NULL לעמודה?',
        options: [
          'VALUES (\'טקסט\', 0)',
          'VALUES (\'טקסט\', NULL)',
          'VALUES (\'טקסט\', EMPTY)',
          'לא ניתן להוסיף NULL',
        ],
        correct: 1,
        explanation: 'כותבים NULL ישירות בתוך VALUES. אפשר גם להשמיט את העמודה מהרשימה — אז תקבל NULL אוטומטית (אם אין ברירת מחדל).',
      },
      {
        id: 'q6',
        text: 'מה יעשה: UPDATE products SET price = price * 1.1 WHERE category = \'אלקטרוניקה\'?',
        options: [
          'ימחק מוצרי אלקטרוניקה',
          'יוסיף 10% למחיר כל מוצרי האלקטרוניקה',
          'ישנה את שם הקטגוריה',
          'שגיאה',
        ],
        correct: 1,
        explanation: 'price * 1.1 = מחיר × 1.1 = תוספת של 10%. ה-WHERE מגביל לקטגוריית אלקטרוניקה בלבד.',
      },
      {
        id: 'q7',
        text: 'האם ניתן להוסיף כמה שורות בבת אחת עם INSERT?',
        options: [
          'לא, רק שורה אחת בכל פעם',
          'כן, עם כמה VALUES מופרדים בפסיק',
          'כן, אבל רק עד 10 שורות',
          'תלוי במסד הנתונים',
        ],
        correct: 1,
        explanation: 'ניתן להוסיף כמה שורות בבת אחת: INSERT INTO table (cols) VALUES (row1), (row2), (row3). זה יעיל יותר מכמה INSERT נפרדים.',
      },
      {
        id: 'q8',
        text: 'מה ניתן לעדכן ב-SET של UPDATE?',
        options: [
          'רק ערכים קבועים',
          'ערך קבוע, ביטוי מחושב, או תת-שאילתה',
          'רק SELECT',
          'שם עמודה בלבד',
        ],
        correct: 1,
        explanation: 'ב-SET ניתן לשים: ערך קבוע (SET name = \'יוסי\'), ביטוי (SET price = price * 1.1), או תת-שאילתה (SET x = (SELECT ...)).',
      },
    ],
  },

  {
    id: 'subqueries',
    title: 'שאילתות מקוננות (Subqueries)',
    summary: 'שאילתה בתוך שאילתה — לפתרון בעיות מורכבות',
    emoji: '🪆',
    content: [
      {
        type: 'heading',
        text: 'מה זה Subquery?',
      },
      {
        type: 'text',
        text: 'Subquery (תת-שאילתה / שאילתה מקוננת) היא שאילתת SELECT שנמצאת בתוך שאילתה אחרת. התת-שאילתה מתבצעת קודם, ותוצאתה משמשת את השאילתה החיצונית.',
      },
      {
        type: 'heading',
        text: 'Subquery ב-WHERE',
      },
      {
        type: 'code',
        lang: 'sql',
        caption: 'Subquery ב-WHERE',
        code: `-- מוצרים שמחירם גבוה מהממוצע
SELECT name, price
FROM products
WHERE price > (SELECT AVG(price) FROM products);

-- לקוחות שביצעו לפחות הזמנה אחת
SELECT * FROM customers
WHERE id IN (SELECT customer_id FROM orders);

-- הטבלה הפנימית מוערכת קודם:
-- 1. SELECT customer_id FROM orders → רשימת מזהים
-- 2. SELECT * FROM customers WHERE id IN (רשימה הזו)`,
      },
      {
        type: 'heading',
        text: 'EXISTS — בדיקת קיום',
      },
      {
        type: 'code',
        lang: 'sql',
        caption: 'EXISTS',
        code: `-- לקוחות שיש להם הזמנות (עם EXISTS)
SELECT * FROM customers c
WHERE EXISTS (
  SELECT 1
  FROM orders o
  WHERE o.customer_id = c.id
);

-- EXISTS בודק: האם התת-שאילתה מחזירה לפחות שורה אחת?
-- אם כן → true, השורה נכללת`,
      },
      {
        type: 'heading',
        text: 'Subquery ב-FROM — טבלה נגזרת',
      },
      {
        type: 'code',
        lang: 'sql',
        caption: 'Derived Table',
        code: `-- ממוצע הזמנות לפי לקוח, ואז סינון
SELECT c.name, sub.avg_amount
FROM customers c
JOIN (
  SELECT customer_id, AVG(amount) AS avg_amount
  FROM orders
  GROUP BY customer_id
) sub ON c.id = sub.customer_id
WHERE sub.avg_amount > 500;

-- ה-subquery ב-FROM (נקרא "derived table") חייב לקבל alias
-- כאן: alias = sub`,
      },
      {
        type: 'tip',
        text: 'כשה-Subquery ב-FROM — הוא חייב לקבל alias (כינוי). ה-SQL לא יעבוד ללא alias לטבלה הנגזרת.',
      },
    ],
    questionBank: [
      {
        id: 'q1',
        text: 'מה זה Subquery?',
        options: [
          'JOIN של שתי טבלאות',
          'שאילתת SELECT שנמצאת בתוך שאילתה אחרת',
          'פונקציית צבירה',
          'עדכון של טבלה מקוננת',
        ],
        correct: 1,
        explanation: 'Subquery = תת-שאילתה = שאילתת SELECT בתוך שאילתה אחרת. התת-שאילתה מתבצעת קודם ותוצאתה משמשת את השאילתה החיצונית.',
      },
      {
        id: 'q2',
        text: 'היכן ניתן להשתמש ב-Subquery?',
        options: [
          'רק ב-WHERE',
          'רק ב-FROM',
          'ב-WHERE, FROM, SELECT, HAVING ועוד',
          'לא ניתן לקנן שאילתות',
        ],
        correct: 2,
        explanation: 'Subquery ניתן לכתוב ב-WHERE, ב-FROM, ב-SELECT, ב-HAVING, ועוד. זה מאד גמיש.',
      },
      {
        id: 'q3',
        text: 'מה יחזיר: WHERE price > (SELECT AVG(price) FROM products)?',
        options: [
          'מוצרים שמחירם שווה לממוצע',
          'מוצרים שמחירם גבוה מהממוצע',
          'המוצר הזול ביותר',
          'שגיאה',
        ],
        correct: 1,
        explanation: 'תחילה מחשבים את הממוצע (תת-שאילתה), ואז מחזירים רק מוצרים שמחירם גבוה מהממוצע הזה.',
      },
      {
        id: 'q4',
        text: 'מה בודק EXISTS?',
        options: [
          'האם ערך קיים בעמודה',
          'האם תת-שאילתה מחזירה לפחות שורה אחת',
          'האם הטבלה קיימת',
          'האם מסד הנתונים פעיל',
        ],
        correct: 1,
        explanation: 'EXISTS מחזיר true אם התת-שאילתה מחזירה לפחות שורה אחת, false אם התוצאה ריקה. הוא לא מתייחס לתוכן — רק לקיום.',
      },
      {
        id: 'q5',
        text: 'מה חייב להיות ל-Subquery שמשמש כטבלה ב-FROM?',
        options: [
          'PRIMARY KEY',
          'alias (כינוי)',
          'ORDER BY',
          'LIMIT',
        ],
        correct: 1,
        explanation: 'Subquery שמשמש ב-FROM (derived table) חייב לקבל alias. ללא alias — SQL יזרוק שגיאה.',
      },
      {
        id: 'q6',
        text: 'מה ההבדל בין IN לבין EXISTS בשימוש עם תת-שאילתה?',
        options: [
          'IN תמיד מהיר יותר',
          'EXISTS מתאים יותר לתת-שאילתות גדולות; IN לרשימות קטנות',
          'אין הבדל בכלל',
          'EXISTS רק לבדיקת NULL',
        ],
        correct: 1,
        explanation: 'שניהם יכולים לפתור בעיות דומות. בפועל: EXISTS לרוב יעיל יותר לתת-שאילתות גדולות כי הוא עוצר עם מציאת התוצאה הראשונה.',
      },
      {
        id: 'q7',
        text: 'מה סדר הביצוע: שאילתה חיצונית או פנימית?',
        options: [
          'השאילתה החיצונית מתבצעת קודם',
          'התת-שאילתה הפנימית מתבצעת קודם',
          'שתיהן במקביל',
          'תלוי ב-SQL',
        ],
        correct: 1,
        explanation: 'התת-שאילתה (הפנימית) מתבצעת קודם, ותוצאתה מועברת לשאילתה החיצונית. זה הרצף הלוגי.',
      },
      {
        id: 'q8',
        text: 'מה יחזיר Subquery שמחזיר יותר מערך אחד בתוך WHERE = ?',
        options: [
          'יחזיר את הערך הראשון',
          'יחזיר את כל הערכים',
          'שגיאה — חייב להשתמש IN במקום =',
          'NULL',
        ],
        correct: 2,
        explanation: 'כשמשתמשים ב-= עם תת-שאילתה, SQL מצפה לקבל ערך בודד. אם התת-שאילתה מחזירה יותר מערך אחד — שגיאה. במקרה כזה השתמשו ב-IN.',
      },
    ],
  },

  {
    id: 'indexes',
    title: 'אינדקסים וביצועים',
    summary: 'למה שאילתות איטיות ואיך לזרז אותן עם אינדקסים',
    emoji: '⚡',
    content: [
      {
        type: 'heading',
        text: 'הבעיה: Full Table Scan',
      },
      {
        type: 'text',
        text: 'כשמסד הנתונים מחפש שורות, הוא צריך לעבור על כולן. בטבלה עם מיליון שורות — זה איטי מאד. זה נקרא "Full Table Scan" — סריקה של כל הטבלה.',
      },
      {
        type: 'heading',
        text: 'מה זה אינדקס (Index)?',
      },
      {
        type: 'text',
        text: 'אינדקס הוא מבנה נתונים נפרד שמסייע למסד הנתונים למצוא שורות מהר — בלי לסרוק את כל הטבלה. דמיינו אותו כמו אינדקס בסוף ספר — במקום לחפש בכל הספר, ישירות לדף המבוקש.',
      },
      {
        type: 'code',
        lang: 'sql',
        caption: 'יצירה ומחיקה של אינדקס',
        code: `-- יצירת אינדקס על עמודת email
CREATE INDEX idx_customers_email
ON customers(email);

-- אינדקס ייחודי — מונע כפילויות
CREATE UNIQUE INDEX idx_users_email
ON users(email);

-- אינדקס על כמה עמודות (composite index)
CREATE INDEX idx_orders_customer_date
ON orders(customer_id, order_date);

-- מחיקת אינדקס
DROP INDEX idx_customers_email;`,
      },
      {
        type: 'heading',
        text: 'מתי לשים אינדקס?',
      },
      {
        type: 'text',
        text: 'אינדקסים מאיצים קריאה (SELECT), אבל מאטים כתיבה (INSERT/UPDATE/DELETE) כי גם האינדקס צריך להתעדכן. כדאי להוסיף אינדקס על עמודות שבהן מחפשים הרבה (WHERE, JOIN, ORDER BY).',
      },
      {
        type: 'code',
        lang: 'sql',
        caption: 'EXPLAIN — ניתוח שאילתה',
        code: `-- EXPLAIN מראה כיצד מסד הנתונים מבצע את השאילתה
EXPLAIN SELECT * FROM orders WHERE customer_id = 5;

-- בלי אינדקס: type = ALL (full table scan)
-- עם אינדקס: type = ref או index (מהיר!)`,
      },
      {
        type: 'tip',
        text: 'PRIMARY KEY ו-UNIQUE הם אינדקסים אוטומטיים — מסד הנתונים יוצר אותם בעצמו. עמודות id תמיד מחוברות לאינדקס.',
      },
    ],
    questionBank: [
      {
        id: 'q1',
        text: 'מה בעיית Full Table Scan?',
        options: [
          'הטבלה לא מלאה',
          'מסד הנתונים עובר על כל השורות כדי למצוא תוצאות — איטי בטבלאות גדולות',
          'הטבלה נסרקת פעמיים',
          'השאילתה מחזירה יותר מדי שורות',
        ],
        correct: 1,
        explanation: 'ללא אינדקס, מסד הנתונים חייב לבדוק כל שורה. בטבלה עם מיליון שורות — זה יקח הרבה זמן.',
      },
      {
        id: 'q2',
        text: 'מה אינדקס עושה?',
        options: [
          'מוסיף עמודה חדשה לטבלה',
          'מאפשר חיפוש מהיר ללא סריקת כל הטבלה',
          'ממיין את הטבלה לצמיתות',
          'מונע כפילויות',
        ],
        correct: 1,
        explanation: 'אינדקס הוא מבנה נתונים נפרד שמאפשר מציאה מהירה של שורות — כמו אינדקס בספר, ישירות לדף הרלוונטי.',
      },
      {
        id: 'q3',
        text: 'מה חיסרון של אינדקסים?',
        options: [
          'הם מאטים שאילתות SELECT',
          'הם לוקחים מקום ומאטים INSERT/UPDATE/DELETE',
          'הם לא עובדים עם WHERE',
          'ניתן להוסיף אינדקס אחד בלבד',
        ],
        correct: 1,
        explanation: 'אינדקסים מאיצים קריאה אבל מאטים כתיבה — כי בכל שינוי בטבלה, גם האינדקס צריך להתעדכן. כמו כן הם לוקחים מקום בדיסק.',
      },
      {
        id: 'q4',
        text: 'מה ייחודי ב-UNIQUE INDEX?',
        options: [
          'הוא מהיר יותר מאינדקס רגיל',
          'הוא מונע ערכים כפולים בעמודה',
          'הוא עובד רק עם PRIMARY KEY',
          'הוא מחיר אוטומטית',
        ],
        correct: 1,
        explanation: 'UNIQUE INDEX מאיץ חיפוש וגם מבטיח שכל ערך יופיע פעם אחת בלבד. שימושי לאימייל, שם משתמש, מספר תעודת זהות וכו\'.',
      },
      {
        id: 'q5',
        text: 'אינדקס על PRIMARY KEY נוצר אוטומטית?',
        options: [
          'לא, חייבים ליצור אותו ידנית',
          'כן, מסד הנתונים יוצר אינדקס אוטומטית על PRIMARY KEY',
          'תלוי בסוג מסד הנתונים',
          'רק ב-MySQL',
        ],
        correct: 1,
        explanation: 'PRIMARY KEY ו-UNIQUE constraint תמיד יוצרים אינדקס אוטומטית. לכן שאילתות לפי id תמיד מהירות.',
      },
      {
        id: 'q6',
        text: 'מה EXPLAIN מאפשר לנו לראות?',
        options: [
          'את תוצאות השאילתה',
          'כיצד מסד הנתונים מתכנן לבצע את השאילתה — האם משתמש באינדקס',
          'שגיאות בשאילתה',
          'את מבנה הטבלה',
        ],
        correct: 1,
        explanation: 'EXPLAIN מציג את "תכנית הביצוע" — האם מסד הנתונים ישתמש באינדקס או יבצע Full Table Scan. כלי חשוב לאופטימיזציה.',
      },
      {
        id: 'q7',
        text: 'על אילו עמודות מומלץ ליצור אינדקס?',
        options: [
          'על כל העמודות',
          'רק על PRIMARY KEY',
          'על עמודות שמשמשות לחיפוש ב-WHERE, JOIN, ORDER BY',
          'על עמודות עם ערכים ייחודיים בלבד',
        ],
        correct: 2,
        explanation: 'אינדקס הכי שימושי על עמודות שמחפשים בהן הרבה — WHERE, JOIN, ORDER BY. להוסיף על הכל פוגע בביצועי כתיבה.',
      },
      {
        id: 'q8',
        text: 'מה Composite Index?',
        options: [
          'אינדקס שנוצר אוטומטית',
          'אינדקס על כמה עמודות יחד',
          'אינדקס ייחודי',
          'אינדקס שמכסה את כל הטבלה',
        ],
        correct: 1,
        explanation: 'Composite Index הוא אינדקס שמכסה כמה עמודות. שימושי כשמחפשים לפי שילוב עמודות, למשל: WHERE customer_id = X AND order_date > Y.',
      },
    ],
  },
]
