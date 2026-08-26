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
      {
        id: 'q9',
        text: 'מה ההבדל בין MySQL לPostgreSQL?',
        options: [
          'אין הבדל, שניהם זהים',
          'שניהם RDBMS אך שונים בתכונות — PostgreSQL תומך ביותר תקנים ותכונות מתקדמות',
          'MySQL לא תומך ב-SQL',
          'PostgreSQL בלבד בחינמי',
        ],
        correct: 1,
        explanation: 'שניהם RDBMS פופולריים. PostgreSQL ידוע בציות לתקנים ותמיכה ב-JSON, window functions ועוד. MySQL ידוע בפשטותו ומהירותו.',
      },
      {
        id: 'q10',
        text: 'מה זה Foreign Key?',
        options: [
          'מפתח ראשי של טבלה זרה',
          'עמודה שמקשרת לפרייםרי קי של טבלה אחרת',
          'מפתח מוצפן',
          'מפתח שמסמן NULL',
        ],
        correct: 1,
        explanation: 'Foreign Key הוא עמודה שמתייחסת ל-Primary Key של טבלה אחרת. מבטיח Referential Integrity — לא ניתן להוסיף הזמנה ללקוח שלא קיים.',
      },
      {
        id: 'q11',
        text: 'מה זה Normalization?',
        options: [
          'המרת נתונים לאותיות קטנות',
          'ארגון מסד הנתונים להפחתת כפילויות ושיפור עקביות',
          'מיון הנתונים',
          'הצפנת הנתונים',
        ],
        correct: 1,
        explanation: 'Normalization הוא תהליך ארגון הטבלאות כדי להפחית כפילויות ולשפר עקביות. כולל כללים (Normal Forms) כמו 1NF, 2NF, 3NF.',
      },
      {
        id: 'q12',
        text: 'מה זה Transaction ב-SQL?',
        options: [
          'שליחת נתונים לרשת',
          'קבוצת פעולות שמתבצעות יחד — הכל מצליח או הכל נכשל',
          'תשלום כספי',
          'גיבוי נתונים',
        ],
        correct: 1,
        explanation: 'Transaction: BEGIN → פעולות → COMMIT (הצלחה) / ROLLBACK (ביטול). מבטיח Atomicity — לא יתכן מצב שבו חלק מהפעולות הצליחו.',
      },
      {
        id: 'q13',
        text: 'מה ראשי התיבות ACID?',
        options: [
          'Array, Class, Index, Data',
          'Atomicity, Consistency, Isolation, Durability',
          'Add, Create, Insert, Delete',
          'Auto, Commit, Index, Drop',
        ],
        correct: 1,
        explanation: 'ACID: Atomicity (הכל או כלום), Consistency (עקביות), Isolation (בידוד בין transactions), Durability (עמידות — גם לאחר crash).',
      },
      {
        id: 'q14',
        text: 'מה ההבדל בין DDL לDML?',
        options: [
          'אין הבדל',
          'DDL מגדיר מבנה (CREATE, ALTER, DROP); DML מניפולציה על נתונים (INSERT, UPDATE, DELETE)',
          'DML מגדיר מבנה; DDL מניפולציה',
          'שניהם לשליפת נתונים',
        ],
        correct: 1,
        explanation: 'DDL = Data Definition Language (CREATE TABLE, ALTER, DROP). DML = Data Manipulation Language (INSERT, UPDATE, DELETE, SELECT).',
      },
      {
        id: 'q15',
        text: 'מה ה-Constraint NOT NULL?',
        options: [
          'עמודה שחייבת להיות ריקה',
          'עמודה שאסור לה להכיל NULL — חייב ערך',
          'עמודה עם ערך ברירת מחדל',
          'מגביל לפי NULL בלבד',
        ],
        correct: 1,
        explanation: 'NOT NULL Constraint מונע הכנסת שורה בלי ערך לאותה עמודה. אם לא מציינים — ברירת המחדל היא שהעמודה מותרת NULL.',
      },
      {
        id: 'q16',
        text: 'מה SERIAL / AUTO_INCREMENT?',
        options: [
          'מספר אקראי',
          'עמודה שמספרת אוטומטית — כל שורה חדשה מקבלת מספר גדול ב-1',
          'תאריך אוטומטי',
          'מונה גלובלי',
        ],
        correct: 1,
        explanation: 'SERIAL (PostgreSQL) / AUTO_INCREMENT (MySQL) יוצרים מספר עולה אוטומטית לכל שורה חדשה. מקובל לעמודת id.',
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
      {
        id: 'q11',
        text: 'מה יחזיר SELECT UPPER(name) FROM users?',
        options: [
          'שגיאה — UPPER לא קיים',
          'שמות באותיות גדולות',
          'שמות באותיות קטנות',
          'מספר התווים בשם',
        ],
        correct: 1,
        explanation: 'UPPER() ממיר מחרוזת לאותיות גדולות. LOWER() לאותיות קטנות. פונקציות מחרוזת נפוצות ב-SQL.',
      },
      {
        id: 'q12',
        text: 'מה ההבדל בין CHAR(10) לVARCHAR(10)?',
        options: [
          'אין הבדל',
          'CHAR תמיד 10 תווים (ממלא ברווחים); VARCHAR עד 10 תווים (גמיש)',
          'VARCHAR תמיד 10 תווים; CHAR גמיש',
          'CHAR לאותיות בלבד; VARCHAR לכל תו',
        ],
        correct: 1,
        explanation: 'CHAR(10): אורך קבוע — תמיד תופס 10 תווים. VARCHAR(10): אורך משתנה — תופס רק מה שצריך. VARCHAR יעיל יותר לאחסון.',
      },
      {
        id: 'q13',
        text: 'מה יחזיר SELECT LENGTH("שלום")?',
        options: [
          '4',
          '8 (כי כל תו עברי הוא 2 bytes)',
          'שגיאה',
          'NULL',
        ],
        correct: 0,
        explanation: 'LENGTH() מחזיר את מספר התווים (או bytes, תלוי ב-DBMS). בהקשר של תווים — "שלום" הוא 4 תווים.',
      },
      {
        id: 'q14',
        text: 'מה יחזיר SELECT COALESCE(NULL, NULL, "ברירת מחדל")?',
        options: [
          'NULL',
          '"ברירת מחדל"',
          'שגיאה',
          '0',
        ],
        correct: 1,
        explanation: 'COALESCE מחזיר את הערך הראשון שאינו NULL מהרשימה. שימושי להחלפת NULL בערך ברירת מחדל.',
      },
      {
        id: 'q15',
        text: 'מה זה VIEW ב-SQL?',
        options: [
          'גרסה מהירה של טבלה',
          'שאילתה ששמורה בשם ונראית כמו טבלה',
          'חיבור בין שתי טבלאות',
          'backup של הנתונים',
        ],
        correct: 1,
        explanation: 'VIEW הוא שאילתה ששמורה בשם. SELECT * FROM my_view נראה כאילו מדובר בטבלה, אבל בפועל מתבצעת שאילתה מסוימת.',
      },
      {
        id: 'q16',
        text: 'איזה operator משמש לחיבור שתי שאילתות ללא כפילויות?',
        options: [
          'JOIN',
          'UNION',
          'MERGE',
          'CONCAT',
        ],
        correct: 1,
        explanation: 'UNION מחבר תוצאות של שתי SELECT ומסיר כפילויות. UNION ALL שומר כפילויות ומהיר יותר.',
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
        type: 'text',
        text: 'AND מחזיר שורה רק כשכל התנאים מתקיימים יחד, OR מספיק לו תנאי אחד, ו-NOT הופך תנאי לנגדו. שימו לב שסדר הקדימויות הוא AND לפני OR — בדיוק כמו כפל לפני חיבור — ולכן מומלץ להשתמש בסוגריים לבהירות.',
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
        type: 'text',
        text: 'BETWEEN בודק טווח ערכים (כולל קצוות), IN מחליף שרשרת OR על אותה עמודה, ו-LIKE מאפשר חיפוש לפי תבנית עם wildcards. שימו לב ש-% מייצג כל רצף תווים בעוד שקו תחתי _ מייצג תו בודד בלבד.',
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
        type: 'text',
        text: 'NULL הוא ערך מיוחד שמשמעותו "נתון לא ידוע" — הוא לא אפס ולא מחרוזת ריקה. בגלל כך, השוואה רגילה עם = לא עובדת עם NULL ויש להשתמש תמיד ב-IS NULL או IS NOT NULL. זהו בלבול נפוץ בקרב מפתחים מתחילים.',
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
      {
        id: 'q11',
        text: 'מה עושה LIKE \'_א%\'?',
        options: [
          'מחרוזות שמתחילות ב-א',
          'מחרוזות שהתו הראשון הוא כלשהו, השני א, ואחריהם כל תו',
          'מחרוזות שמכילות א בדיוק פעם אחת',
          'שגיאה',
        ],
        correct: 1,
        explanation: '_ מייצג תו בודד כלשהו. \'\' + \'א\' + \'%\' = תו ראשון כלשהו + א + כל המשך שהוא. לדוגמה: "בא", "גאה" יתאימו.',
      },
      {
        id: 'q12',
        text: 'מה יחזיר WHERE age BETWEEN 20 AND 30?',
        options: [
          'גיל מ-21 עד 29 (לא כולל הקצוות)',
          'גיל מ-20 עד 30 (כולל הקצוות)',
          'שגיאה — BETWEEN לא חוקי',
          'גיל מ-20 עד 29',
        ],
        correct: 1,
        explanation: 'BETWEEN הוא inclusive — כולל את שני הקצוות. age BETWEEN 20 AND 30 = age >= 20 AND age <= 30.',
      },
      {
        id: 'q13',
        text: 'איך מסננים לפי כמה ערכים ב-IN?',
        options: [
          'WHERE city = "תל אביב" OR city = "חיפה" OR city = "ירושלים"',
          'WHERE city IN ("תל אביב", "חיפה", "ירושלים")',
          'שניהם נכונים, IN קצר יותר',
          'IN לא קיים ב-SQL',
        ],
        correct: 2,
        explanation: 'שניהם נכונים ומחזירים אותה תוצאה. IN הוא קיצור קריא יותר של כמה OR.',
      },
      {
        id: 'q14',
        text: 'מה יחזיר WHERE price IS NOT NULL AND price > 0?',
        options: [
          'כל המוצרים',
          'מוצרים עם מחיר שאינו NULL וגם גדול מ-0',
          'שגיאה — לא ניתן לשלב IS NOT NULL עם השוואה',
          'מוצרים עם מחיר NULL',
        ],
        correct: 1,
        explanation: 'ניתן לשלב IS NOT NULL עם AND/OR לתנאים מורכבים. כאן: רק מוצרים שיש להם מחיר (לא NULL) ומחירם חיובי.',
      },
      {
        id: 'q15',
        text: 'מה סדר הקדימויות בין AND לOR?',
        options: [
          'שוים — מחושב משמאל לימין',
          'OR קודם ל-AND',
          'AND קודם ל-OR',
          'תלוי בסוגריים בלבד',
        ],
        correct: 2,
        explanation: 'AND מחושב לפני OR (כמו כפל לפני חיבור). city="תא" OR city="חיפה" AND age>25 = city="תא" OR (city="חיפה" AND age>25). סוגריים תמיד עדיפים לבהירות.',
      },
      {
        id: 'q16',
        text: 'מה עושה WHERE name LIKE \'%\\\%%\'?',
        options: [
          'שגיאה',
          'שמות שמכילים את הסימן % ממש',
          'שמות שמכילים אחוז כלשהו',
          'כל השמות',
        ],
        correct: 1,
        explanation: 'כדי לחפש את הסימן % ממש (ולא כ-wildcard), מבצעים escaping עם \\% (או ESCAPE clause). מחפשים literal %.',
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
        type: 'text',
        text: 'LIMIT מגביל את מספר השורות שיוחזרו מהשאילתה. הוא שימושי להצגת תצוגה מקדימה, מניעת עומס נתונים, ומציאת top-N תוצאות. אם הטבלה קטנה מה-LIMIT שהגדרנו, פשוט מוחזרות כל השורות ללא שגיאה.',
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
        type: 'text',
        text: 'לשאילתת SELECT יש סדר כתיבה קבוע שחייבים לשמור עליו: SELECT → FROM → WHERE → ORDER BY → LIMIT → OFFSET. כל שינוי בסדר יגרום לשגיאת syntax. שימו לב שהסדר הלוגי של ביצוע שונה מסדר הכתיבה.',
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
      {
        id: 'q9',
        text: 'מה ההבדל בין ASC לDESC?',
        options: [
          'ASC = מחרוזות, DESC = מספרים',
          'ASC = סדר עולה, DESC = סדר יורד',
          'ASC = כולל NULL, DESC = ללא NULL',
          'אין הבדל',
        ],
        correct: 1,
        explanation: 'ASC (Ascending) = מהקטן לגדול, מא\' לת\'. DESC (Descending) = מהגדול לקטן. ברירת המחדל היא ASC.',
      },
      {
        id: 'q10',
        text: 'איפה מופיעים ערכי NULL בסדר מיון?',
        options: [
          'תמיד ראשונים',
          'תמיד אחרונים',
          'תלוי ב-DBMS — PostgreSQL: NULL גדול, MySQL: NULL קטן',
          'NULL מסולק אוטומטית',
        ],
        correct: 2,
        explanation: 'הטיפול ב-NULL בsort שונה בין DBMS. ניתן לשלוט: ORDER BY col NULLS FIRST / NULLS LAST (PostgreSQL).',
      },
      {
        id: 'q11',
        text: 'מה יחזיר SELECT * FROM products ORDER BY price DESC LIMIT 3?',
        options: [
          '3 מוצרים הזולים ביותר',
          '3 מוצרים היקרים ביותר',
          'כל המוצרים ממוינים',
          'שגיאה',
        ],
        correct: 1,
        explanation: 'ORDER BY price DESC ממיין מהיקר לזול, ואז LIMIT 3 מחזיר רק 3 ראשונים = 3 היקרים ביותר.',
      },
      {
        id: 'q12',
        text: 'מה זה Pagination (עימוד)?',
        options: [
          'מיון תוצאות',
          'חלוקת תוצאות לעמודים עם LIMIT וOFFSET',
          'הגבלה של עמודות',
          'גיבוי נתונים',
        ],
        correct: 1,
        explanation: 'Pagination: עמוד 1 = LIMIT 10 OFFSET 0, עמוד 2 = LIMIT 10 OFFSET 10. חיוני לאפליקציות עם הרבה נתונים.',
      },
      {
        id: 'q13',
        text: 'מה מחזיר SELECT * FROM employees ORDER BY salary DESC LIMIT 1?',
        options: [
          'העובד עם השכר הנמוך',
          'העובד עם השכר הגבוה ביותר',
          'ממוצע השכר',
          'שגיאה',
        ],
        correct: 1,
        explanation: 'ORDER BY salary DESC ממיין מהגבוה לנמוך, LIMIT 1 מחזיר רק את הראשון = בעל השכר הגבוה ביותר.',
      },
      {
        id: 'q14',
        text: 'מה יחזיר SELECT UPPER(city), COUNT(*) FROM customers GROUP BY UPPER(city) ORDER BY 2 DESC?',
        options: [
          'שגיאה',
          'ערים ממוינות לפי מספר לקוחות, מהרב לפחות',
          'ערים ממוינות אלפביתית',
          'COUNT בלבד',
        ],
        correct: 1,
        explanation: 'ORDER BY 2 = מיין לפי העמודה השנייה בSELECT (COUNT(*)). DESC = מהגדול לקטן. UPPER מנרמל את שם העיר.',
      },
      {
        id: 'q15',
        text: 'מה ORDER BY עושה ל-NULL כשמשתמשים ב-NULLS LAST?',
        options: [
          'מוחק NULL',
          'מניח NULL בסוף הרשימה',
          'מניח NULL בראש הרשימה',
          'שגיאה',
        ],
        correct: 1,
        explanation: 'NULLS LAST מוצא NULL לסוף, NULLS FIRST לראש. תכונה של PostgreSQL ו-Oracle שנותנת שליטה על מיקום NULL.',
      },
      {
        id: 'q16',
        text: 'מה ייצא מ-OFFSET 10?',
        options: [
          'יחזיר 10 שורות',
          'ידלג על 10 השורות הראשונות',
          'יחזיר שורות 1-10',
          'שגיאה',
        ],
        correct: 1,
        explanation: 'OFFSET 10 מדלג על 10 הרשומות הראשונות. בשילוב עם LIMIT 10 — OFFSET 10 = עמוד שני.',
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
        type: 'text',
        text: 'INNER JOIN מחבר שתי טבלאות לפי תנאי ה-ON ומחזיר רק שורות שיש להן התאמה בשתיהן. לקוח ללא הזמנות לא יופיע בתוצאה, וגם הזמנה ללא לקוח תואם תיעלם. שימו לב לשימוש ב-alias (o, c) לקיצור שמות הטבלאות — זה מקצר ומבהיר את הקוד.',
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
        type: 'text',
        text: 'LEFT JOIN מחזיר את כל השורות מהטבלה השמאלית (customers), גם אלו שאין להן התאמה בטבלה הימנית (orders). שורות ללא התאמה יקבלו NULL בעמודות הטבלה הימנית. זה שימושי כשרוצים לראות גם לקוחות שלא ביצעו הזמנות.',
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
        type: 'text',
        text: 'RIGHT JOIN הוא כמו LEFT JOIN אבל הכיוון הפוך — כל שורות הטבלה הימנית נשמרות. בפועל, RIGHT JOIN נדיר בשימוש כי תמיד ניתן להחליפו ב-LEFT JOIN עם שינוי סדר הטבלאות. שימו לב שההבדל הוא רק לגבי שמירת שורות ללא התאמה.',
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
      {
        id: 'q11',
        text: 'מה ההבדל בין INNER JOIN לCROSS JOIN?',
        options: [
          'אין הבדל',
          'INNER JOIN מחזיר שורות תואמות בלבד; CROSS JOIN מחזיר כל צירוף אפשרי',
          'CROSS JOIN מהיר יותר',
          'INNER JOIN ל-2 טבלאות, CROSS JOIN ליותר',
        ],
        correct: 1,
        explanation: 'CROSS JOIN (Cartesian Product) מחזיר כל שורה מטבלה A × כל שורה מטבלה B. עם 10 ו-10 שורות = 100 תוצאות!',
      },
      {
        id: 'q12',
        text: 'מה SELF JOIN?',
        options: [
          'JOIN של טבלה עם עצמה',
          'JOIN ללא ON',
          'JOIN על PRIMARY KEY',
          'שגיאה',
        ],
        correct: 0,
        explanation: 'SELF JOIN מחבר טבלה עם עצמה. שימושי לדוגמה למציאת עובדים ומנהליהם כשהנתונים בטבלה אחת.',
      },
      {
        id: 'q13',
        text: 'מה יקרה אם שוכחים את ON ב-INNER JOIN?',
        options: [
          'מחזיר תוצאות רגילות',
          'שגיאה syntax',
          'CROSS JOIN — כל צירוף אפשרי',
          'NULL לכל שורה',
        ],
        correct: 1,
        explanation: 'ב-SQL מודרני, JOIN ללא ON יגרום לשגיאת syntax (בדרך כלל). בסינטקס ישן, טבלאות ב-FROM ללא JOIN הוא Cartesian product.',
      },
      {
        id: 'q14',
        text: 'מה USING(column) ב-JOIN?',
        options: [
          'כינוי ל-ON',
          'קיצור כשעמודת JOIN שמה זהה בשתי הטבלאות: JOIN b USING(id)',
          'שגיאה',
          'LEFT JOIN בלבד',
        ],
        correct: 1,
        explanation: 'USING(col) קיצור ל-ON a.col = b.col כשהעמודה שמה זהה בשתי הטבלאות. USING(customer_id) = ON orders.customer_id = customers.customer_id.',
      },
      {
        id: 'q15',
        text: 'מה ייצא מ: SELECT c.name, COUNT(o.id) FROM customers c LEFT JOIN orders o ON c.id=o.customer_id GROUP BY c.id?',
        options: [
          'רק לקוחות עם הזמנות',
          'כל הלקוחות, כולל אלה ללא הזמנות עם COUNT=0',
          'שגיאה',
          'כל ההזמנות ללא לקוחות',
        ],
        correct: 1,
        explanation: 'LEFT JOIN + GROUP BY: לקוחות ללא הזמנות יכללו עם COUNT(o.id)=0. INNER JOIN היה מחזיר רק לקוחות עם לפחות הזמנה אחת.',
      },
      {
        id: 'q16',
        text: 'איך מחברים 3 טבלאות customers, orders, products?',
        options: [
          'FROM customers, orders, products',
          'FROM customers JOIN orders ON ... JOIN products ON ...',
          'FROM customers UNION orders UNION products',
          'לא ניתן',
        ],
        correct: 1,
        explanation: 'ניתן לשרשר JOIN-ים. FROM customers c JOIN orders o ON c.id=o.customer_id JOIN products p ON o.product_id=p.id.',
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
        type: 'text',
        text: 'ההבדל בין WHERE ל-HAVING הוא בשלב הסינון: WHERE פועל על שורות בודדות לפני הקיבוץ, ו-HAVING פועל על הקבוצות שנוצרו אחרי GROUP BY. לכן לא ניתן לכתוב WHERE COUNT(*) > 5 — פונקציות צבירה ב-WHERE הן שגיאה.',
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
      {
        id: 'q11',
        text: 'מה יחזיר COUNT(*) לעומת COUNT(email)?',
        options: [
          'תמיד אותה תוצאה',
          'COUNT(*) סופר את כל השורות; COUNT(email) סופר רק שורות שבהן email לא NULL',
          'COUNT(email) מהיר יותר',
          'שגיאה',
        ],
        correct: 1,
        explanation: 'COUNT(*) סופר כל שורה. COUNT(col) מדלג על NULL. אם 10 מ-100 אנשים חסר להם email, COUNT(*) = 100, COUNT(email) = 90.',
      },
      {
        id: 'q12',
        text: 'מה עושה ROLLUP ב-GROUP BY?',
        options: [
          'מחזיר תת-סכומים לכל רמת קיבוץ',
          'ממיין את הקבוצות',
          'מסיר קבוצות ריקות',
          'שגיאה ב-SQL בסיסי',
        ],
        correct: 0,
        explanation: 'GROUP BY city, country WITH ROLLUP מחזיר גם subtotals לכל עיר, subtotals לכל מדינה, ו-grand total. שימושי לדוחות.',
      },
      {
        id: 'q13',
        text: 'מה יחזיר SELECT dept, AVG(salary) FROM employees GROUP BY dept ORDER BY AVG(salary) DESC?',
        options: [
          'שגיאה — לא ניתן להשתמש ב-AVG ב-ORDER BY',
          'ממוצע שכר לפי מחלקה, ממוין מהגבוה לנמוך',
          'כל השכרות',
          'שם המחלקה בלבד',
        ],
        correct: 1,
        explanation: 'ניתן להשתמש באגרגציות ב-ORDER BY. התוצאה: מחלקות ממוינות לפי ממוצע השכר שלהן בסדר יורד.',
      },
      {
        id: 'q14',
        text: 'מה ההבדל בין HAVING COUNT(*) > 5 לWHERE COUNT(*) > 5?',
        options: [
          'אין הבדל',
          'HAVING עובד אחרי GROUP BY; WHERE לא ניתן להשתמש בו עם aggregate functions',
          'WHERE מהיר יותר',
          'שניהם חוקיים',
        ],
        correct: 1,
        explanation: 'WHERE מסנן שורות לפני קיבוץ. HAVING מסנן אחרי קיבוץ. לא ניתן לכתוב WHERE COUNT(*) > 5 — זה שגיאה.',
      },
      {
        id: 'q15',
        text: 'מה יחזיר SELECT city, SUM(price) FROM orders GROUP BY city HAVING SUM(price) > 10000?',
        options: [
          'כל הערים',
          'ערים שסך ההזמנות שלהן מעל 10,000',
          'הזמנות מעל 10,000 בלבד',
          'שגיאה',
        ],
        correct: 1,
        explanation: 'HAVING מסנן קבוצות לאחר GROUP BY. כאן מוצאים ערים שסך המכירות (SUM) גבוה מ-10,000.',
      },
      {
        id: 'q16',
        text: 'מה זה Window Function לעומת GROUP BY?',
        options: [
          'אין הבדל',
          'Window Function מחשב אגרגציה אבל שומר כל שורה בנפרד; GROUP BY ממזג לשורה אחת לקבוצה',
          'GROUP BY מהיר יותר תמיד',
          'Window Function לא קיים ב-SQL',
        ],
        correct: 1,
        explanation: 'OVER() הוא Window Function: SELECT name, salary, AVG(salary) OVER() FROM employees — כל שורה שמורה, עם הממוצע הכללי ליד.',
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
        type: 'text',
        text: 'UPDATE משנה ערכים בשורות קיימות. חייבים לציין SET עם העמודות שרוצים לשנות, ומומלץ מאוד להוסיף WHERE כדי לא לעדכן את כל הטבלה בשוגג. ניתן לעדכן כמה עמודות בבת אחת, ואפילו לחשב ערכים חדשים על בסיס הערך הקיים (כמו salary * 1.1).',
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
        type: 'text',
        text: 'DELETE מוחק שורות מהטבלה לצמיתות — אין undo אוטומטי. תמיד יש לציין WHERE כדי לא למחוק את כל הנתונים. שיטה בטוחה: כתבו קודם SELECT עם אותו WHERE כדי לראות בדיוק מה יימחק, ורק אז החליפו ל-DELETE.',
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
      {
        id: 'q9',
        text: 'מה TRUNCATE TABLE שונה מDELETE ללא WHERE?',
        options: [
          'אין הבדל',
          'TRUNCATE מהיר ולא ניתן ל-ROLLBACK; DELETE ניתן ל-ROLLBACK ומוציא triggers',
          'DELETE מהיר יותר',
          'TRUNCATE לא קיים ב-SQL',
        ],
        correct: 1,
        explanation: 'TRUNCATE מוחק את כל הנתונים במהירות ומאפס AUTO_INCREMENT, אך לרוב לא ניתן ל-ROLLBACK. DELETE מפעיל triggers ו-constraints ואפשר לבטל.',
      },
      {
        id: 'q10',
        text: 'מה INSERT INTO ... SELECT עושה?',
        options: [
          'בוחר ומוחק',
          'מוסיף שורות מתוצאת SELECT — copy נתונים בין טבלאות',
          'שגיאה',
          'UPDATE ו-SELECT יחד',
        ],
        correct: 1,
        explanation: 'INSERT INTO new_table SELECT * FROM old_table WHERE ... — מאפשר להעתיק נתונים מטבלה לטבלה בשאילתה אחת.',
      },
      {
        id: 'q11',
        text: 'מה ON CONFLICT / ON DUPLICATE KEY UPDATE?',
        options: [
          'מוחק שורות כפולות',
          'כשהוספה נכשלת (key קיים) — מעדכן במקום',
          'INSERT כפול',
          'שגיאה',
        ],
        correct: 1,
        explanation: 'UPSERT: INSERT ... ON CONFLICT DO UPDATE. אם PRIMARY KEY כבר קיים, מעדכן את הרשומה במקום לזרוק שגיאה. שימושי לsync נתונים.',
      },
      {
        id: 'q12',
        text: 'מה RETURNING ב-PostgreSQL אחרי INSERT/UPDATE/DELETE?',
        options: [
          'חוזר לתחילת השאילתה',
          'מחזיר את השורות שהושפעו — כולל ערכים שנוצרו אוטומטית כמו id',
          'שגיאה',
          'COMMIT אוטומטי',
        ],
        correct: 1,
        explanation: 'INSERT INTO users (name) VALUES ("שרה") RETURNING id — מחזיר את ה-id שנוצר אוטומטית. מונע SELECT נוסף.',
      },
      {
        id: 'q13',
        text: 'מה DEFAULT ב-INSERT?',
        options: [
          'שגיאה',
          'INSERT INTO t (name, created_at) VALUES ("שרה", DEFAULT) — משתמש בברירת המחדל של העמודה',
          'NULL',
          'מחזיר את ברירת המחדל',
        ],
        correct: 1,
        explanation: 'כשמציינים DEFAULT ב-VALUES, מסד הנתונים ישתמש בערך ברירת המחדל שהוגדר ל-CREATE TABLE. שימושי לתאריכים ואינדקסים.',
      },
      {
        id: 'q14',
        text: 'מה יעשה DELETE FROM orders WHERE customer_id NOT IN (SELECT id FROM customers)?',
        options: [
          'ימחק את כל ההזמנות',
          'ימחק הזמנות של לקוחות שנמחקו (Orphaned records)',
          'שגיאה',
          'לא ימחק כלום',
        ],
        correct: 1,
        explanation: 'שאילתה זו מוחקת הזמנות (Orphaned records) ששייכות ללקוחות שלא קיימים יותר. ניקוי נתונים חשוב.',
      },
      {
        id: 'q15',
        text: 'מה UPDATE עם JOIN עושה?',
        options: [
          'שגיאה — UPDATE לא תומך JOIN',
          'מעדכן שורות לפי תנאי מטבלה אחרת',
          'JOIN על נתונים חדשים',
          'SELECT בלבד',
        ],
        correct: 1,
        explanation: 'UPDATE orders o JOIN customers c ON o.customer_id=c.id SET o.discount=0.1 WHERE c.city="תל אביב" — מעדכן הזמנות לפי נתוני לקוח.',
      },
      {
        id: 'q16',
        text: 'איך מוודאים שלא מוחקים את כל הטבלה בשוגג?',
        options: [
          'אין דרך',
          'תמיד להוסיף WHERE ולאמת עם SELECT לפני DELETE',
          'לבצע LOCK TABLE',
          'לשנות permissions',
        ],
        correct: 1,
        explanation: 'Best practice: כתוב תחילה SELECT עם אותה WHERE כדי לראות מה תמחק. אז שנה ל-DELETE. גם Transaction + ROLLBACK שימושי לבדיקה.',
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
        type: 'text',
        text: 'Subquery ב-WHERE מאפשר להשתמש בתוצאת שאילתה אחרת כתנאי סינון. התת-שאילתה מבוצעת קודם, ותוצאתה משמשת את השאילתה החיצונית. שימו לב שעם = אפשר להחזיר רק ערך בודד, בעוד שעם IN ניתן להחזיר רשימה שלמה.',
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
        type: 'text',
        text: 'EXISTS בודק אם תת-שאילתה מחזירה לפחות שורה אחת — הוא לא מסתכל על התוכן אלא רק על הקיום. EXISTS יעיל במיוחד כשהתת-שאילתה גדולה, כי הוא מפסיק לחפש ברגע שמוצאת שורה ראשונה. שימו לב שכותבים SELECT 1 ולא SELECT * — התוכן לא חשוב.',
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
        type: 'text',
        text: 'כשמשתמשים בתת-שאילתה ב-FROM, היא נקראת "Derived Table" — טבלה נגזרת. זה מאפשר לבצע חישוב מורכב (כמו GROUP BY עם AVG) ואז לסנן על תוצאתו. חובה לתת alias לטבלה הנגזרת — בלי alias SQL יזרוק שגיאה.',
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
      {
        id: 'q9',
        text: 'מה זה Correlated Subquery?',
        options: [
          'תת-שאילתה רגילה',
          'תת-שאילתה שמתייחסת לעמודה מהשאילתה החיצונית ורצה מחדש לכל שורה',
          'תת-שאילתה ב-FROM',
          'שגיאה',
        ],
        correct: 1,
        explanation: 'Correlated Subquery: SELECT * FROM emp e WHERE salary > (SELECT AVG(salary) FROM emp WHERE dept = e.dept) — ה-e.dept מגיע מהשאילתה החיצונית.',
      },
      {
        id: 'q10',
        text: 'מה ההבדל בין Correlated לUncorrelated Subquery?',
        options: [
          'אין הבדל',
          'Uncorrelated רצה פעם אחת ותוצאתה קבועה; Correlated רצה לכל שורה',
          'Correlated מהיר יותר',
          'רק Uncorrelated ניתן לביצוע',
        ],
        correct: 1,
        explanation: 'Uncorrelated: תת-שאילתה עצמאית שמתבצעת פעם אחת. Correlated: תלויה בשאילתה החיצונית, מתבצעת לכל שורה — יכולה להיות איטית יותר.',
      },
      {
        id: 'q11',
        text: 'מה CTE (Common Table Expression) עם WITH?',
        options: [
          'View',
          'תת-שאילתה ששמה ניתן מראש וניתן להתייחס אליה בשאילתה הראשית',
          'temporary table',
          'INDEX מיוחד',
        ],
        correct: 1,
        explanation: 'WITH recent AS (SELECT ... FROM ...) SELECT * FROM recent WHERE ... — CTE שיפור קריאות על פני Subquery מקוננת. גם מאפשר קריאות חוזרות לאותה תת-שאילתה.',
      },
      {
        id: 'q12',
        text: 'מה ALL ב-WHERE salary > ALL(SELECT salary FROM interns)?',
        options: [
          'שגיאה',
          'salary גדול מכל שכרות המתמחים — גדול מהמקסימום',
          'salary גדול ממוצע שכרות',
          'salary גדול ממינימום שכרות',
        ],
        correct: 1,
        explanation: 'x > ALL(subquery) = x גדול מכל ערך בתת-שאילתה = גדול מהמקסימום. x > ANY = גדול מלפחות ערך אחד = גדול מהמינימום.',
      },
      {
        id: 'q13',
        text: 'מה ANY / SOME?',
        options: [
          'בדיקת קיום',
          'x > ANY(subquery) = x גדול מלפחות ערך אחד',
          'x = כל הערכים',
          'שגיאה',
        ],
        correct: 1,
        explanation: 'ANY (או SOME — שם נרדף) בודק אם x עומד בתנאי מול לפחות ערך אחד מהתת-שאילתה. price > ANY(SELECT price FROM cheap_products) = מחיר שגבוה מלפחות מחיר זול אחד.',
      },
      {
        id: 'q14',
        text: 'מה NOT EXISTS עושה?',
        options: [
          'כמו NOT IN',
          'מחזיר שורות שלהן אין התאמה בתת-שאילתה',
          'בדיקת NULL',
          'שגיאה',
        ],
        correct: 1,
        explanation: 'NOT EXISTS הופך את EXISTS. SELECT * FROM customers c WHERE NOT EXISTS (SELECT 1 FROM orders o WHERE o.customer_id=c.id) = לקוחות ללא הזמנות.',
      },
      {
        id: 'q15',
        text: 'מה Scalar Subquery?',
        options: [
          'תת-שאילתה שמחזירה יותר מערך אחד',
          'תת-שאילתה שמחזירה בדיוק ערך אחד (שורה+עמודה)',
          'תת-שאילתה ב-FROM',
          'CROSS JOIN',
        ],
        correct: 1,
        explanation: 'Scalar Subquery: (SELECT MAX(price) FROM products) — מחזיר בדיוק ערך אחד. ניתן להשתמש בה כמו ערך רגיל: SELECT name, (SELECT MAX(p) FROM ...) FROM ...',
      },
      {
        id: 'q16',
        text: 'מה Derived Table?',
        options: [
          'טבלה שנוצרת אוטומטית',
          'תת-שאילתה שמשמשת ב-FROM כאילו היא טבלה',
          'VIEW',
          'CTE',
        ],
        correct: 1,
        explanation: 'FROM (SELECT city, COUNT(*) cnt FROM customers GROUP BY city) AS city_counts WHERE cnt > 5 — תת-שאילתה ב-FROM נקראת Derived Table. חייבת alias.',
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
      {
        id: 'q9',
        text: 'האם אינדקס פוגע בביצועי כתיבה?',
        options: [
          'לא, אינדקס תמיד מיטיב',
          'כן — בכל INSERT/UPDATE/DELETE מסד הנתונים צריך לעדכן גם את האינדקס',
          'רק ב-DELETE',
          'רק כשיש יותר מאינדקס אחד',
        ],
        correct: 1,
        explanation: 'אינדקס = tradeoff: שיפור קריאה, אך עלות כתיבה. כל INSERT/UPDATE/DELETE מחייב עדכון גם של האינדקס. לכן לא כדאי לאנדקס הכל.',
      },
      {
        id: 'q10',
        text: 'מה Covering Index?',
        options: [
          'אינדקס שמכסה את כל הטבלה',
          'אינדקס שמכיל את כל העמודות שהשאילתה צריכה — ללא גישה לטבלה עצמה',
          'UNIQUE index',
          'PRIMARY KEY',
        ],
        correct: 1,
        explanation: 'Covering Index: כשהאינדקס מכיל את כל העמודות שSELECT צריך, מסד הנתונים לא צריך לגשת לטבלה כלל. מהיר מאוד.',
      },
      {
        id: 'q11',
        text: 'מתי Full Table Scan טוב יותר מאינדקס?',
        options: [
          'לעולם לא',
          'כשמחזירים חלק גדול מהטבלה — overhead של אינדקס עולה על הרווח',
          'רק בטבלאות קטנות',
          'רק ב-SELECT *',
        ],
        correct: 1,
        explanation: 'כשמחזירים >10-20% מהשורות, מסד הנתונים לרוב יבחר Full Table Scan על פני אינדקס. כלל אצבע: אינדקס עוזר לשאילתות סלקטיביות מאוד.',
      },
      {
        id: 'q12',
        text: 'מה Partial Index?',
        options: [
          'אינדקס חלקי על עמודה',
          'אינדקס שחל רק על שורות שעומדות בתנאי מסוים',
          'אינדקס על חצי מהטבלה',
          'COMPOSITE INDEX',
        ],
        correct: 1,
        explanation: 'Partial Index (PostgreSQL): CREATE INDEX ON orders(status) WHERE status=\'pending\' — אינדקס רק על הזמנות ממתינות. קטן וממוקד יותר.',
      },
      {
        id: 'q13',
        text: 'מה ANALYZE עושה ב-SQL?',
        options: [
          'מוחק שורות שגויות',
          'עדכון סטטיסטיקות עבור ה-query planner — מאפשר תכנון שאילתות טוב יותר',
          'יוצר אינדקס',
          'מריץ EXPLAIN',
        ],
        correct: 1,
        explanation: 'ANALYZE מעדכן את הסטטיסטיקות שמסד הנתונים משתמש בהן לתכנון שאילתות. בלי סטטיסטיקות עדכניות, ה-planner עלול לבחור תכנית גרועה.',
      },
      {
        id: 'q14',
        text: 'מה Cardinality של אינדקס?',
        options: [
          'גודל האינדקס בbytes',
          'מספר הערכים הייחודיים בעמודה — גבוה = אינדקס יעיל יותר',
          'מספר השורות בטבלה',
          'מספר האינדקסים',
        ],
        correct: 1,
        explanation: 'Cardinality גבוה (כמו email — כולם שונים) = אינדקס יעיל מאוד. Cardinality נמוך (כמו gender עם 2 ערכים) = אינדקס לא שווה כמעט.',
      },
      {
        id: 'q15',
        text: 'מה שם EXPLAIN ANALYZE לעומת EXPLAIN?',
        options: [
          'אין הבדל',
          'EXPLAIN מציג תכנית בלבד; EXPLAIN ANALYZE מריץ ומציג נתונים אמיתיים',
          'ANALYZE מהיר יותר',
          'EXPLAIN ANALYZE לא קיים',
        ],
        correct: 1,
        explanation: 'EXPLAIN ANALYZE מריץ את השאילתה ומציג זמנים אמיתיים לצד הזמן המוערך. מאפשר לראות היכן נמצא צוואר הבקבוק.',
      },
      {
        id: 'q16',
        text: 'מתי מומלץ ל-DROP INDEX?',
        options: [
          'לעולם לא',
          'כשהאינדקס לא בשימוש, או פוגע בביצועי כתיבה מבלי לשפר קריאה',
          'רק כשיש מלא אינדקסים',
          'לפני DELETE בלבד',
        ],
        correct: 1,
        explanation: 'כלי ניטור יכולים לזהות אינדקסים שלא בשימוש. pg_stat_user_indexes ב-PostgreSQL מציג כמה פעמים כל אינדקס שימש.',
      },
    ],
  },

  {
    id: 'views',
    title: 'Views — תצוגות וירטואליות',
    summary: 'יצירת "טבלאות מדומות" לפישוט שאילתות מורכבות ואבטחת מידע',
    emoji: '🪟',
    content: [
      { type: 'heading', text: 'מה זה View?' },
      { type: 'text', text: 'View היא שאילתת SELECT שמורה בשם. היא מתנהגת כמו טבלה — אפשר לבצע עליה SELECT, לסנן אותה ולחבר אותה עם טבלאות אחרות. אבל היא לא מאחסנת נתונים בעצמה — בכל פעם שניגשים אליה, השאילתה שמאחוריה מתבצעת מחדש.' },
      { type: 'tip', text: 'View מאפשר להסתיר מורכבות: במקום לכתוב JOIN ארוך כל פעם — שומרים אותו כ-View ומשתמשים בשמו.' },
      { type: 'heading', text: 'יצירת View' },
      { type: 'text', text: 'CREATE VIEW שומר שאילתה בשם כך שניתן לקרוא לה מאוחר יותר כאילו היא טבלה. כאן אנו שומרים JOIN מורכב של orders עם customers בשם order_details, ואז מרשים לשאול עליו עם WHERE ו-ORDER BY בדיוק כמו טבלה אמיתית.' },
      { type: 'code', lang: 'sql', caption: 'CREATE VIEW', code: `-- יצירת view של הזמנות עם שם הלקוח
CREATE VIEW order_details AS
SELECT
  o.id          AS order_id,
  c.name        AS customer_name,
  o.amount,
  o.order_date
FROM orders o
JOIN customers c ON o.customer_id = c.id;

-- שימוש ב-view בדיוק כמו טבלה:
SELECT * FROM order_details
WHERE amount > 500
ORDER BY order_date DESC;` },
      { type: 'heading', text: 'View לאבטחת מידע' },
      { type: 'text', text: 'View שימושי להסתרת עמודות רגישות. ניתן לתת למשתמש גישה ל-View בלבד — בלי גישה לטבלה המקורית עם שדות כמו סיסמה או מספר כרטיס אשראי.' },
      { type: 'code', lang: 'sql', caption: 'View ציבורי בלי שדות רגישים', code: `-- הטבלה המקורית:
-- users(id, name, email, password_hash, credit_card)

-- View בטוח שחושף רק מה שמותר:
CREATE VIEW public_users AS
SELECT id, name, email
FROM users;

-- המשתמש רואה רק זאת:
SELECT * FROM public_users;` },
      { type: 'heading', text: 'עדכון ומחיקת View' },
      { type: 'text', text: 'CREATE OR REPLACE VIEW מאפשר לשנות הגדרת View קיים בלי למחוק ולייצר מחדש. DROP VIEW מוחק רק את ההגדרה — הנתונים בטבלאות המקוריות לא נפגעים. שימו לב שהשינוי ב-View משפיע על כל מי שמשתמש בו.' },
      { type: 'code', lang: 'sql', caption: 'ניהול Views', code: `-- עדכון view קיים:
CREATE OR REPLACE VIEW order_details AS
SELECT
  o.id,
  c.name AS customer_name,
  o.amount,
  o.order_date,
  o.status   -- הוספנו עמודה חדשה
FROM orders o
JOIN customers c ON o.customer_id = c.id;

-- מחיקת view:
DROP VIEW order_details;

-- רשימת כל ה-views:
SHOW FULL TABLES WHERE Table_type = 'VIEW';` },
      { type: 'heading', text: 'View מוחמר עם WITH CHECK OPTION' },
      { type: 'text', text: 'WITH CHECK OPTION מוסיף הגנה לView שמאפשר כתיבה: כל INSERT או UPDATE שיתבצע דרך ה-View חייב לעמוד בתנאי ה-WHERE שלו. ניסיון להכניס שורה שתצא מ-View (למשל status=cancelled לתוך active_orders) יגרום לשגיאה.' },
      { type: 'code', lang: 'sql', caption: 'WITH CHECK OPTION', code: `-- View שמאפשר לראות ולשנות רק הזמנות פעילות:
CREATE VIEW active_orders AS
SELECT * FROM orders
WHERE status = 'active'
WITH CHECK OPTION;

-- הכנסה דרך ה-View — יבדוק שהשורה תואמת את ה-WHERE:
INSERT INTO active_orders (customer_id, amount, status)
VALUES (1, 300, 'active');  -- עובד

-- INSERT עם status אחר ייכשל:
-- VALUES (1, 300, 'cancelled');  -- שגיאה!` },
    ],
    questionBank: [
      {
        id: 'views-q1',
        text: 'מה זה View ב-SQL?',
        options: [
          'טבלה פיזית שמאחסנת נתונים',
          'שאילתת SELECT שמורה בשם שמתנהגת כמו טבלה',
          'גיבוי של טבלה',
          'אינדקס מיוחד',
        ],
        correct: 1,
        explanation: 'View היא שאילתה שמורה. היא לא מאחסנת נתונים — בכל גישה השאילתה שמתחתיה מתבצעת מחדש.',
      },
      {
        id: 'views-q2',
        text: 'מה היתרון העיקרי של View?',
        options: [
          'מהירות אחסון גבוהה יותר',
          'פישוט שאילתות מורכבות וניהול הרשאות גישה',
          'הגדלת שטח דיסק',
          'תמיכה ב-NoSQL',
        ],
        correct: 1,
        explanation: 'View חוסך כתיבה חוזרת של שאילתות מורכבות ומאפשר הסתרת שדות רגישים ממשתמשים.',
      },
      {
        id: 'views-q3',
        text: 'האם View מאחסן נתונים פיזית?',
        options: [
          'כן, כמו טבלה רגילה',
          'לא — הנתונים מגיעים מהטבלאות המקוריות בכל גישה',
          'תלוי בסוג מסד הנתונים',
          'רק אם הגדרנו MATERIALIZED',
        ],
        correct: 1,
        explanation: 'View רגיל לא מאחסן נתונים. בכל שאילתה על ה-View, מסד הנתונים מבצע את הגדרת ה-View על הטבלאות המקוריות.',
      },
      {
        id: 'views-q4',
        text: 'איך מעדכנים View קיים?',
        options: [
          'ALTER VIEW',
          'UPDATE VIEW',
          'CREATE OR REPLACE VIEW',
          'MODIFY VIEW',
        ],
        correct: 2,
        explanation: 'CREATE OR REPLACE VIEW מחליף את הגדרת ה-View הקיים בגרסה החדשה ללא מחיקה ידנית.',
      },
      {
        id: 'views-q5',
        text: 'מה עושה WITH CHECK OPTION ב-View?',
        options: [
          'מוסיף בדיקת ביצועים',
          'מבטיח ש-INSERT/UPDATE דרך ה-View יעמדו בתנאי ה-WHERE של ה-View',
          'מאפשר מחיקה דרך ה-View',
          'יוצר אינדקס על ה-View',
        ],
        correct: 1,
        explanation: 'WITH CHECK OPTION מונע שינויים שגורמים לשורה "לצאת" מהגדרת ה-View, שמירה על עקביות.',
      },
      {
        id: 'views-q6',
        text: 'מה ההבדל בין View לטבלה מבחינת שימוש ב-SELECT?',
        options: [
          'View לא תומך ב-WHERE',
          'אין הבדל — ניתן לכתוב SELECT על View בדיוק כמו על טבלה',
          'View מחזיר תמיד את כל העמודות',
          'SELECT על View איטי תמיד',
        ],
        correct: 1,
        explanation: 'View מתנהג בדיוק כמו טבלה ב-SELECT — אפשר לסנן, למיין, לחבר עם טבלאות אחרות.',
      },
      {
        id: 'views-q7',
        text: 'מדוע View שימושי לאבטחת מידע?',
        options: [
          'הוא מצפין נתונים',
          'ניתן לתת גישה ל-View בלבד ולהסתיר שדות רגישים מהטבלה המקורית',
          'הוא מחייב סיסמה לכל שאילתה',
          'View נשמר בצורה מוצפנת',
        ],
        correct: 1,
        explanation: 'נותנים למשתמש הרשאה ל-View שחושף רק עמודות מסוימות — בלי גישה ישירה לטבלה עם כל השדות.',
      },
      {
        id: 'views-q8',
        text: 'איך מוחקים View?',
        options: [
          'DELETE VIEW view_name',
          'REMOVE VIEW view_name',
          'DROP VIEW view_name',
          'TRUNCATE VIEW view_name',
        ],
        correct: 2,
        explanation: 'DROP VIEW מוחק את הגדרת ה-View. הנתונים בטבלאות המקוריות אינם נמחקים.',
      },
    ],
  },

  {
    id: 'transactions',
    title: 'טרנזקציות ו-ACID',
    summary: 'כיצד מסד הנתונים שומר על שלמות הנתונים עם COMMIT, ROLLBACK ו-SAVEPOINT',
    emoji: '🔒',
    content: [
      { type: 'heading', text: 'מה זה טרנזקציה?' },
      { type: 'text', text: 'טרנזקציה היא קבוצת פעולות שמתבצעות כיחידה אחת. או שכולן מצליחות — או שאף אחת לא מתבצעת. הדוגמה הקלאסית: העברת כסף בין חשבונות — חובה ששתי הפעולות (חיוב + זיכוי) יצליחו יחד.' },
      { type: 'tip', text: 'בלי טרנזקציות, קריסת השרת באמצע פעולה יכולה להשאיר את הנתונים במצב שבור — לחייב חשבון אחד בלי לזכות את השני.' },
      { type: 'heading', text: 'BEGIN, COMMIT, ROLLBACK' },
      { type: 'text', text: 'BEGIN מתחיל טרנזקציה, COMMIT שומר את כל השינויים לצמיתות, ו-ROLLBACK מבטל הכל. הדוגמה מדגימה העברת כסף: שתי פעולות UPDATE חייבות להצליח ביחד — אם אחת נכשלת, ROLLBACK מחזיר למצב המקורי. שימו לב שמקובל לכתוב קוד טיפול בשגיאות שקורא ל-ROLLBACK אוטומטית.' },
      { type: 'code', lang: 'sql', caption: 'טרנזקציה בסיסית', code: `-- תחילת טרנזקציה:
BEGIN;

-- חיוב מחשבון המקור:
UPDATE accounts
SET balance = balance - 500
WHERE id = 1;

-- זיכוי חשבון היעד:
UPDATE accounts
SET balance = balance + 500
WHERE id = 2;

-- הכל הצליח — שמירה:
COMMIT;

-- אם הייתה שגיאה — ביטול הכל:
-- ROLLBACK;` },
      { type: 'heading', text: 'ROLLBACK — ביטול טרנזקציה' },
      { type: 'text', text: 'ROLLBACK מבטל את כל השינויים שנעשו מאז ה-BEGIN ומחזיר את הנתונים למצבם המקורי. הדוגמה מראה תרחיש של בדיקת תקינות אחרי UPDATE — אם התוצאה לא הגיונית (כמות מלאי שלילית), מבטלים את כל הפעולה.',
      },
      { type: 'code', lang: 'sql', caption: 'טיפול בשגיאות', code: `BEGIN;

UPDATE inventory SET quantity = quantity - 10
WHERE product_id = 42;

-- בדיקה: האם הכמות שלילית?
-- אם כן — נבטל:
ROLLBACK;

-- אם הכל תקין — נשמור:
-- COMMIT;` },
      { type: 'heading', text: 'SAVEPOINT — נקודות שמירה' },
      { type: 'text', text: 'SAVEPOINT מאפשר לקבוע נקודות ביניים בתוך טרנזקציה. אם שלב מסוים נכשל, ניתן לחזור לנקודת השמירה האחרונה ולא להתחיל מהתחלה. שימושי בטרנזקציות מורכבות עם מספר שלבים, כשחלק מהעבודה כבר בוצעה ורוצים לשמר אותה.' },
      { type: 'code', lang: 'sql', caption: 'SAVEPOINT', code: `BEGIN;

INSERT INTO orders (customer_id, amount) VALUES (1, 200);

SAVEPOINT after_order;  -- נקודת שמירה ביניים

INSERT INTO order_items (order_id, product_id) VALUES (LAST_INSERT_ID(), 5);

-- אם שלב זה נכשל — חזרה לנקודת השמירה (לא לתחילה):
ROLLBACK TO SAVEPOINT after_order;

-- ממשיכים מ-SAVEPOINT:
INSERT INTO order_items (order_id, product_id) VALUES (LAST_INSERT_ID(), 7);

COMMIT;` },
      { type: 'heading', text: 'ACID — עקרונות טרנזקציה' },
      { type: 'text', text: 'ACID הוא ראשי תיבות של ארבעת עקרונות הטרנזקציה:' },
      {
        type: 'table',
        caption: 'ACID properties',
        headers: ['עיקרון', 'משמעות'],
        rows: [
          ['Atomicity — אטומיות', 'הכל או כלום — אין מצב חלקי'],
          ['Consistency — עקביות', 'הנתונים עוברים ממצב תקין למצב תקין'],
          ['Isolation — בידוד', 'טרנזקציות מקבילות לא מפריעות זו לזו'],
          ['Durability — עמידות', 'אחרי COMMIT הנתונים שמורים לצמיתות'],
        ],
      },
      { type: 'heading', text: 'רמות בידוד (Isolation Levels)' },
      { type: 'text', text: 'רמת הבידוד קובעת עד כמה טרנזקציה אחת "רואה" שינויים של טרנזקציות אחרות שרצות במקביל. READ UNCOMMITTED הכי מהיר אבל גם הכי מסוכן, SERIALIZABLE הכי בטוח אבל אט. ברירת המחדל שונה בין PostgreSQL (READ COMMITTED) לMySQL (REPEATABLE READ).' },
      { type: 'code', lang: 'sql', caption: 'הגדרת isolation level', code: `-- READ UNCOMMITTED — קורא נתונים לא מחויבים (מסוכן)
SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED;

-- READ COMMITTED — ברירת מחדל ב-PostgreSQL
SET TRANSACTION ISOLATION LEVEL READ COMMITTED;

-- REPEATABLE READ — ברירת מחדל ב-MySQL/InnoDB
SET TRANSACTION ISOLATION LEVEL REPEATABLE READ;

-- SERIALIZABLE — הכי בטוח, הכי איטי
SET TRANSACTION ISOLATION LEVEL SERIALIZABLE;` },
    ],
    questionBank: [
      {
        id: 'tx-q1',
        text: 'מה מבטיחה טרנזקציה?',
        options: [
          'שהשאילתה תהיה מהירה',
          'שקבוצת פעולות תתבצע כולה יחד או לא תתבצע כלל',
          'שלא יהיו כפילויות',
          'שהנתונים יהיו ממוינים',
        ],
        correct: 1,
        explanation: 'טרנזקציה מבטיחה אטומיות — הכל מצליח או הכל מבוטל. אין מצב חלקי שמשאיר נתונים שבורים.',
      },
      {
        id: 'tx-q2',
        text: 'מה עושה ROLLBACK?',
        options: [
          'שומר את כל השינויים',
          'מבטל את כל השינויים מאז BEGIN',
          'מוחק את הטבלה',
          'חוזר לגרסה הקודמת של הסכמה',
        ],
        correct: 1,
        explanation: 'ROLLBACK מבטל את כל השינויים שנעשו מאז תחילת הטרנזקציה (BEGIN), מחזיר למצב המקורי.',
      },
      {
        id: 'tx-q3',
        text: 'מה ה-A ב-ACID מייצג?',
        options: [
          'Authentication — אימות',
          'Atomicity — אטומיות (הכל או כלום)',
          'Availability — זמינות',
          'Authorization — הרשאה',
        ],
        correct: 1,
        explanation: 'Atomicity מבטיחה שהטרנזקציה לא תתבצע חלקית. כל הפעולות מצליחות יחד — או אף אחת.',
      },
      {
        id: 'tx-q4',
        text: 'מה מאפשר SAVEPOINT?',
        options: [
          'שמירה בקובץ חיצוני',
          'הגדרת נקודת חזרה ביניים בתוך טרנזקציה',
          'יצירת גיבוי אוטומטי',
          'ביצוע COMMIT חלקי',
        ],
        correct: 1,
        explanation: 'SAVEPOINT מגדיר נקודה בתוך הטרנזקציה. אפשר לחזור אליה עם ROLLBACK TO SAVEPOINT בלי לבטל את כל הטרנזקציה.',
      },
      {
        id: 'tx-q5',
        text: 'מה ה-D ב-ACID מייצג?',
        options: [
          'Deletion — מחיקה',
          'Durability — עמידות (נתונים שמורים לאחר COMMIT)',
          'Distribution — חלוקה',
          'Dependency — תלות',
        ],
        correct: 1,
        explanation: 'Durability מבטיחה שלאחר COMMIT הנתונים שמורים לצמיתות — גם אם השרת קורס מיד לאחר מכן.',
      },
      {
        id: 'tx-q6',
        text: 'מה COMMIT עושה?',
        options: [
          'מתחיל טרנזקציה חדשה',
          'מבטל את הטרנזקציה',
          'שומר את כל השינויים שנעשו בטרנזקציה לצמיתות',
          'בודק שגיאות בשאילתה',
        ],
        correct: 2,
        explanation: 'COMMIT מסיים את הטרנזקציה בהצלחה ושומר את כל השינויים לצמיתות במסד הנתונים.',
      },
      {
        id: 'tx-q7',
        text: 'מה I ב-ACID מייצג?',
        options: [
          'Indexing — אינדוקס',
          'Isolation — בידוד בין טרנזקציות מקבילות',
          'Insertion — הכנסה',
          'Integration — אינטגרציה',
        ],
        correct: 1,
        explanation: 'Isolation מבטיחה שטרנזקציות מקבילות לא "רואות" שינויים של זו בזו עד לסיום COMMIT.',
      },
      {
        id: 'tx-q8',
        text: 'מה SERIALIZABLE isolation level מבטיח?',
        options: [
          'מהירות מרבית',
          'שטרנזקציות מקבילות יתנהגו כאילו רצו אחת אחרי השנייה — הכי בטוח',
          'שלא ניתן להריץ טרנזקציות בו-זמנית',
          'אחסון בקובץ טקסט',
        ],
        correct: 1,
        explanation: 'SERIALIZABLE הוא הרמה הגבוהה ביותר — מבטיח בידוד מוחלט. הכי בטוח אבל גם הכי איטי בגלל נעילות.',
      },
    ],
  },

  {
    id: 'procedures',
    title: 'Stored Procedures וטריגרים',
    summary: 'פרוצדורות מאוחסנות, פונקציות ו-Triggers — לוגיקה עסקית ישירות במסד הנתונים',
    emoji: '⚙️',
    content: [
      { type: 'heading', text: 'מה זה Stored Procedure?' },
      { type: 'text', text: 'Stored Procedure (פרוצדורה מאוחסנת) היא בלוק קוד SQL שמור במסד הנתונים בשם. ניתן להפעיל אותה בפקודה אחת, להעביר פרמטרים, ולכלול לוגיקה מורכבת: לולאות, תנאים, טיפול בשגיאות.' },
      { type: 'tip', text: 'Stored Procedures מקטינות תנועת רשת (לוגיקה רצה בצד השרת), שימושיות לפעולות חוזרות וניתנות לשיתוף בין אפליקציות שונות.' },
      { type: 'heading', text: 'יצירת Procedure' },
      { type: 'text', text: 'CREATE PROCEDURE מגדיר בלוק קוד עם שם ופרמטרים. פרמטרי IN מקבלים ערך מהקורא, ופרמטרי OUT מחזירים ערך חזרה. DELIMITER שינוי נחוץ ב-MySQL כדי להגיד לפרסר שה-; בתוך גוף הפרוצדורה הוא לא סוף ה-statement החיצוני.' },
      { type: 'code', lang: 'sql', caption: 'CREATE PROCEDURE', code: `DELIMITER //

CREATE PROCEDURE get_customer_orders(
  IN customer_id INT,        -- פרמטר קלט
  IN min_amount  DECIMAL,
  OUT order_count INT        -- פרמטר פלט
)
BEGIN
  -- גוף הפרוצדורה:
  SELECT * FROM orders
  WHERE orders.customer_id = customer_id
    AND amount >= min_amount;

  -- מחזיר את מספר הרשומות דרך פרמטר OUT:
  SELECT COUNT(*) INTO order_count
  FROM orders
  WHERE orders.customer_id = customer_id;
END //

DELIMITER ;

-- הפעלה:
CALL get_customer_orders(1, 100, @count);
SELECT @count;` },
      { type: 'heading', text: 'לוגיקה בתוך Procedure' },
      { type: 'text', text: 'בגוף Procedure ניתן להשתמש ב-DECLARE להגדרת משתנים מקומיים, ב-IF/THEN/ELSE לתנאים, וב-SELECT INTO לשמירת תוצאה במשתנה. הדוגמה מראה Procedure שמחיל הנחה על הזמנה רק אם הסכום מעל סף מסוים — לוגיקה עסקית שמוגנת ומרוכזת בצד מסד הנתונים.' },
      { type: 'code', lang: 'sql', caption: 'תנאים ולולאות', code: `DELIMITER //

CREATE PROCEDURE apply_discount(
  IN order_id   INT,
  IN discount   DECIMAL(5,2)
)
BEGIN
  DECLARE current_amount DECIMAL(10,2);

  -- שליפת הסכום הנוכחי:
  SELECT amount INTO current_amount
  FROM orders WHERE id = order_id;

  -- תנאי:
  IF current_amount > 1000 THEN
    UPDATE orders
    SET amount = amount * (1 - discount / 100)
    WHERE id = order_id;
    SELECT 'הנחה הוחלה' AS result;
  ELSE
    SELECT 'ההזמנה קטנה מדי להנחה' AS result;
  END IF;
END //

DELIMITER ;` },
      { type: 'heading', text: 'Stored Functions' },
      { type: 'text', text: 'Function דומה ל-Procedure אבל מחזירה ערך בודד וניתן להשתמש בה ישירות בתוך שאילתת SELECT.' },
      { type: 'code', lang: 'sql', caption: 'CREATE FUNCTION', code: `DELIMITER //

CREATE FUNCTION get_vat_price(
  price DECIMAL(10,2)
) RETURNS DECIMAL(10,2)
DETERMINISTIC
BEGIN
  RETURN price * 1.17;  -- מחיר כולל מע"מ 17%
END //

DELIMITER ;

-- שימוש ישיר ב-SELECT:
SELECT
  product_name,
  price,
  get_vat_price(price) AS price_with_vat
FROM products;` },
      { type: 'heading', text: 'Triggers — טריגרים' },
      { type: 'text', text: 'Trigger הוא קוד שמופעל אוטומטית בעקבות אירוע בטבלה: INSERT, UPDATE או DELETE. לא קוראים לו ישירות — הוא מופעל מאליו. שני הטריגרים בדוגמה מראים שימושים נפוצים: עדכון שדה updated_at בכל שינוי, ורישום audit log בכל מחיקה — שניהם דורשים אפס קוד באפליקציה.' },
      { type: 'code', lang: 'sql', caption: 'CREATE TRIGGER', code: `-- Trigger שמעדכן updated_at אוטומטית:
CREATE TRIGGER before_order_update
BEFORE UPDATE ON orders
FOR EACH ROW
BEGIN
  SET NEW.updated_at = NOW();
END;

-- Trigger שמוסיף ל-audit log אחרי מחיקה:
CREATE TRIGGER after_order_delete
AFTER DELETE ON orders
FOR EACH ROW
BEGIN
  INSERT INTO audit_log (
    action, table_name, record_id, deleted_at
  )
  VALUES (
    'DELETE', 'orders', OLD.id, NOW()
  );
END;` },
      { type: 'tip', text: 'ב-Trigger: NEW מייצג את השורה החדשה (אחרי שינוי), OLD מייצג את השורה הישנה (לפני שינוי). ב-DELETE אין NEW, ב-INSERT אין OLD.' },
      { type: 'heading', text: 'ניהול Procedures' },
      { type: 'text', text: 'SHOW PROCEDURE STATUS מציג את כל ה-Procedures הקיימות בבסיס הנתונים, ו-SHOW CREATE PROCEDURE מציג את הקוד המלא שלהן. DROP PROCEDURE מוחק Procedure ו-DROP TRIGGER מוחק טריגר. שימוש ב-IF EXISTS מונע שגיאה אם הפרוצדורה לא קיימת.' },
      { type: 'code', lang: 'sql', caption: 'רשימה, הצגה ומחיקה', code: `-- רשימת כל ה-procedures:
SHOW PROCEDURE STATUS WHERE Db = 'my_database';

-- הצגת הקוד של procedure:
SHOW CREATE PROCEDURE get_customer_orders;

-- מחיקה:
DROP PROCEDURE IF EXISTS get_customer_orders;
DROP FUNCTION IF EXISTS get_vat_price;
DROP TRIGGER IF EXISTS before_order_update;` },
    ],
    questionBank: [
      {
        id: 'proc-q1',
        text: 'מה זה Stored Procedure?',
        options: [
          'טבלה מיוחדת לאחסון נתונים',
          'בלוק קוד SQL שמור במסד הנתונים שניתן לקרוא לו בשם',
          'אינדקס מסוג מיוחד',
          'גיבוי אוטומטי',
        ],
        correct: 1,
        explanation: 'Stored Procedure הוא קוד SQL שמור בשם. ניתן להפעיל עם CALL, לקבל פרמטרים, ולכלול לוגיקה מורכבת.',
      },
      {
        id: 'proc-q2',
        text: 'מה ההבדל בין IN לבין OUT בפרמטרים של Procedure?',
        options: [
          'אין הבדל',
          'IN מעביר ערך לפרוצדורה, OUT מחזיר ערך מהפרוצדורה',
          'OUT מעביר ערך לפרוצדורה, IN מחזיר',
          'IN למחרוזות, OUT למספרים',
        ],
        correct: 1,
        explanation: 'IN — ערך שמועבר לפרוצדורה. OUT — משתנה שהפרוצדורה תמלא בתוצאה. INOUT — גם וגם.',
      },
      {
        id: 'proc-q3',
        text: 'מה ההבדל בין Function לבין Procedure?',
        options: [
          'אין הבדל',
          'Function מחזירה ערך בודד וניתן להשתמש בה ב-SELECT, Procedure לא',
          'Procedure מהירה יותר',
          'Function לא יכולה לקבל פרמטרים',
        ],
        correct: 1,
        explanation: 'Function מחזירה ערך בודד דרך RETURN וניתן להשתמש בה כחלק משאילתה. Procedure מופעלת עם CALL ויכולה להחזיר תוצאות מרובות.',
      },
      {
        id: 'proc-q4',
        text: 'מה זה Trigger?',
        options: [
          'פרמטר של Procedure',
          'קוד שמופעל אוטומטית בעקבות אירוע בטבלה (INSERT/UPDATE/DELETE)',
          'סוג של View',
          'פקודה לביצוע עסקה',
        ],
        correct: 1,
        explanation: 'Trigger מופעל אוטומטית כשמתרחש אירוע על טבלה. לא קוראים לו ישירות — המסד קורא לו.',
      },
      {
        id: 'proc-q5',
        text: 'מה מייצג NEW בתוך Trigger?',
        options: [
          'הטבלה החדשה',
          'השורה החדשה שנכנסת (ב-INSERT) או הערכים החדשים (ב-UPDATE)',
          'הטריגר הקודם',
          'ערך NULL',
        ],
        correct: 1,
        explanation: 'NEW מייצג את השורה כפי שתיראה אחרי הפעולה. זמין ב-INSERT וב-UPDATE. ב-DELETE רק OLD זמין.',
      },
      {
        id: 'proc-q6',
        text: 'מה מייצג OLD בתוך Trigger?',
        options: [
          'הגרסה הישנה של ה-Trigger',
          'השורה לפני השינוי — ערכים שהיו לפני UPDATE/DELETE',
          'שם הטבלה הישנה',
          'לא קיים ב-SQL',
        ],
        correct: 1,
        explanation: 'OLD מייצג את השורה לפני השינוי. זמין ב-UPDATE וב-DELETE. ב-INSERT אין OLD.',
      },
      {
        id: 'proc-q7',
        text: 'מתי Trigger מסוג BEFORE רץ?',
        options: [
          'אחרי הפעולה על הטבלה',
          'לפני שהפעולה (INSERT/UPDATE/DELETE) מתבצעת על הטבלה',
          'רק בתחילת טרנזקציה',
          'רק בסוף היום',
        ],
        correct: 1,
        explanation: 'BEFORE Trigger רץ לפני הפעולה — מאפשר לשנות ערכים (כמו SET NEW.updated_at) לפני שנכתבים.',
      },
      {
        id: 'proc-q8',
        text: 'מה היתרון של Stored Procedure על פני שאילתות מהאפליקציה?',
        options: [
          'יותר קל לכתיבה',
          'הלוגיקה רצה בצד השרת — מפחיתה תנועת רשת ומאפשרת שיתוף בין אפליקציות',
          'מהירה יותר תמיד',
          'לא צריך הרשאות',
        ],
        correct: 1,
        explanation: 'Procedure רצה בצד השרת — שולחים קריאה אחת במקום שאילתות מרובות, מה שחוסך תנועת רשת וזמן round-trip.',
      },
    ],
  },

  {
    id: 'window-functions',
    title: 'Window Functions — פונקציות חלון',
    summary: 'ROW_NUMBER, RANK, PARTITION BY, LAG/LEAD — ניתוח נתונים מתקדם',
    emoji: '📊',
    content: [
      { type: 'heading', text: 'מה זה Window Function?' },
      { type: 'text', text: 'Window Function מבצעת חישוב על קבוצת שורות הקשורות לשורה הנוכחית — בדומה ל-GROUP BY, אבל בלי לקמץ (collapse) את השורות לתוצאה אחת. כל שורה נשמרת, ומקבלת ערך מחושב.' },
      { type: 'tip', text: 'Window Functions נכתבות עם OVER() — זה מה שמגדיר את "החלון" של השורות שיחושבו עבור כל שורה.' },
      { type: 'heading', text: 'ROW_NUMBER, RANK, DENSE_RANK' },
      { type: 'text', text: 'שלוש פונקציות האמיקום מחזירות מספר סידורי לכל שורה לפי סדר מסוים. ההבדל ביניהן מתגלה כשיש שוויון: ROW_NUMBER תמיד ייחודי (אקראי בשוויון), RANK מדלג על המספר הבא, ו-DENSE_RANK לא מדלג. שימו לב שכולן משתמשות ב-OVER(ORDER BY ...) לקביעת הסדר.' },
      { type: 'code', lang: 'sql', caption: 'מיקום שורות', code: `SELECT
  name,
  department,
  salary,
  ROW_NUMBER() OVER (ORDER BY salary DESC)  AS row_num,
  RANK()       OVER (ORDER BY salary DESC)  AS rank_pos,
  DENSE_RANK() OVER (ORDER BY salary DESC)  AS dense_rank
FROM employees;

-- ההבדל:
-- ROW_NUMBER: 1,2,3,4,5 — תמיד רציף
-- RANK:       1,2,2,4,5 — מדלג אחרי שוויון
-- DENSE_RANK: 1,2,2,3,4 — לא מדלג` },
      { type: 'heading', text: 'PARTITION BY — חלוקה לקבוצות' },
      { type: 'text', text: 'PARTITION BY מחלק את השורות לקבוצות — כל קבוצה מקבלת "חלון" משל עצמה. כמו GROUP BY אבל בלי לאבד שורות.' },
      { type: 'code', lang: 'sql', caption: 'PARTITION BY', code: `-- דירוג עובדים בתוך כל מחלקה בנפרד:
SELECT
  name,
  department,
  salary,
  RANK() OVER (
    PARTITION BY department   -- חלק לפי מחלקה
    ORDER BY salary DESC      -- מיין לפי שכר
  ) AS rank_in_dept
FROM employees;

-- תוצאה:
-- שם       | מחלקה  | שכר  | דירוג
-- אלי       | פיתוח  | 20000| 1
-- שרה      | פיתוח  | 18000| 2
-- דן        | מכירות | 15000| 1
-- מירה     | מכירות | 12000| 2` },
      { type: 'heading', text: 'SUM ו-AVG עם OVER' },
      { type: 'text', text: 'פונקציות צבירה רגילות (SUM, AVG) הופכות ל-Window Functions כשמוסיפים להן OVER(). כל שורה מקבלת את הסכום הכולל של הקבוצה שלה — בלי לאבד את השורה. הדוגמה מחשבת לכל עובד את סכום שכר המחלקה שלו ואת אחוזו מהמחלקה, הכל בשאילתה אחת.' },
      { type: 'code', lang: 'sql', caption: 'צבירה ב-Window', code: `SELECT
  name,
  department,
  salary,
  -- סכום שכר כל המחלקה (עבור כל שורה):
  SUM(salary) OVER (PARTITION BY department) AS dept_total,
  -- אחוז מתוך סכום המחלקה:
  ROUND(salary * 100.0 /
    SUM(salary) OVER (PARTITION BY department), 1) AS pct_of_dept,
  -- ממוצע כללי:
  AVG(salary) OVER () AS company_avg
FROM employees;` },
      { type: 'heading', text: 'LAG ו-LEAD — השוואה לשורה קודמת/הבאה' },
      { type: 'text', text: 'LAG מחזיר ערך מהשורה הקודמת לפי הסדר ב-OVER, ו-LEAD מחזיר ערך מהשורה הבאה. הם שימושיים מאוד לניתוח מגמות ושינויים לאורך זמן — כמו השוואת מכירות חודש לחודש. הפרמטר השלישי (0 בדוגמה) הוא ערך ברירת מחדל כשאין שורה קודמת.' },
      { type: 'code', lang: 'sql', caption: 'LAG / LEAD', code: `SELECT
  order_date,
  amount,
  -- הסכום מהחודש הקודם:
  LAG(amount, 1) OVER (ORDER BY order_date)  AS prev_month,
  -- הסכום לחודש הבא:
  LEAD(amount, 1) OVER (ORDER BY order_date) AS next_month,
  -- שינוי מהחודש הקודם:
  amount - LAG(amount, 1, 0) OVER (ORDER BY order_date) AS change
FROM monthly_sales;` },
      { type: 'heading', text: 'NTILE — חלוקה לאחוזונים' },
      { type: 'text', text: 'NTILE(n) מחלק את השורות ל-n קבוצות שוות בגודלן ומחזיר לכל שורה מספר הקבוצה. NTILE(4) יוצר רבעונים (quartiles) — שימושי לניתוח לקוחות לפי ביצועים. שימו לב שה-ORDER BY בתוך OVER קובע לפי מה מדרגים את הקבוצות.' },
      { type: 'code', lang: 'sql', caption: 'NTILE', code: `-- חלוקת לקוחות ל-4 רבעונים לפי רכישות:
SELECT
  customer_name,
  total_purchases,
  NTILE(4) OVER (ORDER BY total_purchases DESC) AS quartile
FROM customer_summary;
-- quartile=1: הרוכשים הכי הרבה (25% עליון)
-- quartile=4: הרוכשים הכי מעט (25% תחתון)` },
    ],
    questionBank: [
      {
        id: 'wf-q1',
        text: 'מה ההבדל בין Window Function לבין GROUP BY?',
        options: [
          'אין הבדל',
          'Window Function מחשבת על קבוצת שורות אבל שומרת כל שורה בנפרד, GROUP BY מקמץ לשורה אחת',
          'GROUP BY מהיר יותר תמיד',
          'Window Function עובדת רק עם JOIN',
        ],
        correct: 1,
        explanation: 'GROUP BY מחזיר שורה אחת לקבוצה. Window Function מחשבת על הקבוצה אבל מחזירה את כל השורות המקוריות.',
      },
      {
        id: 'wf-q2',
        text: 'מה עושה PARTITION BY?',
        options: [
          'מחלק את הטבלה לקבצים',
          'מחלק את השורות לקבוצות — כל קבוצה מקבלת "חלון" נפרד לחישוב',
          'ממיין את התוצאות',
          'מגביל את מספר השורות',
        ],
        correct: 1,
        explanation: 'PARTITION BY מגדיר תת-קבוצות בתוך ה-window. כמו GROUP BY אבל שורות לא נמחקות.',
      },
      {
        id: 'wf-q3',
        text: 'מה ההבדל בין RANK לבין DENSE_RANK?',
        options: [
          'אין הבדל',
          'RANK מדלג אחרי שוויון (1,2,2,4), DENSE_RANK לא מדלג (1,2,2,3)',
          'DENSE_RANK מדלג, RANK לא',
          'RANK רק למספרים, DENSE_RANK לכל טיפוס',
        ],
        correct: 1,
        explanation: 'כששתי שורות שוות ב-RANK: הבאה תקפוץ למספר 4 (מדלגת על 3). ב-DENSE_RANK: הבאה תקבל 3 ללא דילוג.',
      },
      {
        id: 'wf-q4',
        text: 'מה עושה LAG(salary, 1)?',
        options: [
          'מחשב את השכר הממוצע',
          'מחזיר את ערך salary מהשורה הקודמת לפי הסדר',
          'מחזיר את השורה הבאה',
          'מחשב הפרש שכר',
        ],
        correct: 1,
        explanation: 'LAG(col, n) מחזיר את הערך מ-n שורות לאחור לפי הסדר ב-OVER. שימושי להשוואה עם נקודות קודמות.',
      },
      {
        id: 'wf-q5',
        text: 'מה ROW_NUMBER() מחזיר?',
        options: [
          'מספר השורה הפיזית בטבלה',
          'מספר רציף ייחודי לכל שורה לפי הסדר שהוגדר ב-OVER',
          'מספר השורות בטבלה',
          'מזהה השורה (id)',
        ],
        correct: 1,
        explanation: 'ROW_NUMBER() נותן 1,2,3,4... לפי הסדר ב-ORDER BY שב-OVER. תמיד ייחודי — גם בשוויון.',
      },
      {
        id: 'wf-q6',
        text: 'מה המילה השמורה שמגדירה Window Function?',
        options: ['WITH', 'OVER', 'WINDOW', 'PARTITION'],
        correct: 1,
        explanation: 'כל Window Function משתמשת ב-OVER() — זה מה שמגדיר את "החלון" ומבדיל אותה מפונקציה רגילה.',
      },
      {
        id: 'wf-q7',
        text: 'מה NTILE(4) עושה?',
        options: [
          'מחלק את הערכים ל-4 עמודות',
          'מחלק את השורות ל-4 קבוצות שוות בגודלן (רבעונים)',
          'בוחר 4 שורות אקראיות',
          'מחשב ממוצע של 4 שורות',
        ],
        correct: 1,
        explanation: 'NTILE(n) מחלק את השורות ל-n קבוצות שוות. NTILE(4) יוצר 4 רבעונים — שימושי לניתוח אחוזונים.',
      },
      {
        id: 'wf-q8',
        text: 'מה יחזיר SUM(salary) OVER (PARTITION BY department)?',
        options: [
          'סכום שכר כל החברה בשורה אחת',
          'לכל שורת עובד — סכום השכר הכולל של המחלקה שלו',
          'ממוצע שכר המחלקה',
          'מספר העובדים במחלקה',
        ],
        correct: 1,
        explanation: 'כל שורת עובד תקבל את סכום השכר של כל עובדי המחלקה שלו — בלי לאבד שורות.',
      },
    ],
  },
]
