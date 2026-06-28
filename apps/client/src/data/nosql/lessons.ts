import type { Lesson } from '../../types'

export const nosqlLessons: Lesson[] = [
  {
    id: 'nosql-intro',
    title: 'מבוא ל-NoSQL ו-MongoDB',
    summary: 'מה זה NoSQL, למה MongoDB, מסמכים ואוספים — הבסיס',
    emoji: '🍃',
    content: [
      { type: 'heading', text: 'מה זה NoSQL?' },
      { type: 'text', text: 'NoSQL (Not Only SQL) הן מסדי נתונים שאינם מבוססים על טבלאות וסכמה קשיחה. הם מתאימים לנתונים גמישים, כמויות עצומות, וצורות שונות של מידע. קיימים 4 סוגים עיקריים: Document, Key-Value, Column-Family ו-Graph.' },
      {
        type: 'table',
        caption: 'SQL לעומת MongoDB',
        headers: ['SQL', 'MongoDB', 'משמעות'],
        rows: [
          ['Database', 'Database', 'מסד הנתונים'],
          ['Table', 'Collection', 'אוסף רשומות'],
          ['Row', 'Document', 'רשומה בודדת'],
          ['Column', 'Field', 'שדה'],
          ['JOIN', '$lookup', 'חיבור בין אוספים'],
          ['INDEX', 'Index', 'אינדקס לביצועים'],
        ],
      },
      { type: 'heading', text: 'מסמך ב-MongoDB' },
      { type: 'text', text: 'MongoDB שומרת מסמכים בפורמט BSON (Binary JSON). מסמך יכול להכיל שדות מקוננים, מערכים, ואובייקטים — ללא סכמה קשיחה.' },
      { type: 'code', lang: 'json', caption: 'דוגמת מסמך', code: `{
  "_id": ObjectId("64a1f2b3c4d5e6f7a8b9c0d1"),
  "name": "דוד כהן",
  "email": "david@example.com",
  "age": 30,
  "address": {
    "city": "תל אביב",
    "street": "דיזנגוף 100"
  },
  "tags": ["developer", "nodejs", "mongodb"],
  "createdAt": ISODate("2024-01-15T10:30:00Z")
}` },
      { type: 'heading', text: 'מתי לבחור MongoDB?' },
      { type: 'text', text: 'MongoDB מתאים לתרחישים שבהם המבנה גמיש, הנתונים שונים בין רשומות, או שצריך scaling אופקי. הוא פחות מתאים למקרים עם קשרים מורכבים בין ישויות או עסקאות ACID מסובכות. שימו לב שהבחירה בין SQL ל-NoSQL תלויה בדרישות הפרויקט הספציפי.' },
      { type: 'code', lang: 'text', caption: 'שימושים אידיאלים', code: `✅ מתאים:
- נתונים בעלי מבנה משתנה (e-commerce, CMS)
- קטלוגים עם מאפיינים שונים לכל מוצר
- אפליקציות real-time (צ'אט, לוגים)
- Horizontal scaling (sharding)

❌ פחות מתאים:
- נתונים עם קשרים מורכבים רבים
- עסקאות (transactions) מורכבות
- דוחות BI מסובכים` },
      { type: 'tip', text: 'MongoDB Atlas — הגרסה בענן של MongoDB — מציעה tier חינמי (512MB) מתאים ללמידה ופרויקטים קטנים.' },
    ],
    questionBank: [
      {
        id: 'nosql-intro-q1',
        text: 'מה המקביל ל-"Table" ב-SQL עבור MongoDB?',
        options: ['Document', 'Collection', 'Database', 'Field'],
        correct: 1,
        explanation: 'Collection ב-MongoDB מקביל ל-Table ב-SQL. Collection מכיל Documents (מקביל ל-Rows).',
      },
      {
        id: 'nosql-intro-q2',
        text: 'באיזה פורמט MongoDB שומרת מסמכים?',
        options: ['JSON', 'XML', 'BSON', 'CSV'],
        correct: 2,
        explanation: 'MongoDB משתמשת ב-BSON (Binary JSON) — גרסה בינארית של JSON שתומכת בטיפוסים נוספים כמו Date ו-ObjectId.',
      },
      {
        id: 'nosql-intro-q3',
        text: 'מה השדה המיוחד שMongoDB מוסיפה אוטומטית לכל מסמך?',
        options: ['id', '_id', 'uuid', 'primary_key'],
        correct: 1,
        explanation: 'MongoDB מוסיפה _id לכל מסמך אוטומטית — ברירת המחדל היא ObjectId (12 bytes המכילים timestamp, machine ID ו-counter).',
      },
      {
        id: 'nosql-intro-q4',
        text: 'מה היתרון המרכזי של MongoDB על SQL לנתונים עם מבנה משתנה?',
        options: ['מהיר יותר תמיד', 'Schema-less — כל מסמך יכול להיות שונה', 'תומך ב-JOIN', 'זול יותר'],
        correct: 1,
        explanation: 'MongoDB היא schema-less — כל מסמך יכול להכיל שדות שונים. אין צורך ב-ALTER TABLE כשמוסיפים שדה חדש.',
      },
    ],
  },
  {
    id: 'nosql-crud',
    title: 'CRUD — יצירה, קריאה, עדכון ומחיקה',
    summary: 'insertOne, find, updateOne, deleteOne — פעולות בסיסיות ב-MongoDB',
    emoji: '✏️',
    content: [
      { type: 'heading', text: 'INSERT — הוספת מסמכים' },
      { type: 'text', text: 'insertOne מוסיף מסמך יחיד ו-insertMany מוסיף מספר מסמכים בבת אחת. MongoDB מוסיפה אוטומטית שדה _id לכל מסמך אם לא ציינו אחד. שימו לב שמסמכים שונים יכולים להכיל שדות שונים — אין צורך בסכמה אחידה.' },
      { type: 'code', lang: 'javascript', caption: 'הוספת מסמכים', code: `// הוספת מסמך יחיד
db.users.insertOne({
  name: "שרה לוי",
  email: "sara@example.com",
  age: 28,
  role: "admin"
})

// הוספת מסמכים מרובים
db.users.insertMany([
  { name: "יוסי", age: 35 },
  { name: "רות",  age: 22 },
  { name: "אמיר", age: 41 }
])` },
      { type: 'heading', text: 'FIND — שאילתות קריאה' },
      { type: 'text', text: 'find מחזיר cursor למסמכים התואמים לפילטר, ו-findOne מחזיר מסמך בודד. הארגומנט השני הוא projection שמגדיר אילו שדות להחזיר (1=כלול, 0=הסתר). שימו לב שניתן לשרשר sort, skip ו-limit על cursor — בדיוק כמו ORDER BY, OFFSET ו-LIMIT ב-SQL.' },
      { type: 'code', lang: 'javascript', caption: 'קריאת מסמכים', code: `// כל המסמכים
db.users.find()

// סינון לפי שדה
db.users.find({ role: "admin" })

// מסמך יחיד
db.users.findOne({ email: "sara@example.com" })

// projection — אילו שדות להחזיר
db.users.find(
  { role: "admin" },
  { name: 1, email: 1, _id: 0 }  // 1=כן, 0=לא
)

// מיון, דילוג, הגבלה
db.users.find()
  .sort({ age: -1 })   // -1 = יורד, 1 = עולה
  .skip(10)
  .limit(5)` },
      { type: 'heading', text: 'UPDATE — עדכון מסמכים' },
      { type: 'text', text: '$set מעדכן שדות ספציפיים מבלי לפגוע בשאר המסמך — חשוב: בלי $set, MongoDB תחליף את המסמך כולו! $inc מגדיל ערך מספרי, ו-upsert יוצר מסמך חדש אם לא נמצאה התאמה. שימו לב שהארגומנט הראשון הוא filter ולא המסמך עצמו.' },
      { type: 'code', lang: 'javascript', caption: 'עדכון מסמכים', code: `// עדכון שדה בודד
db.users.updateOne(
  { email: "sara@example.com" },       // filter
  { $set: { role: "superadmin" } }     // update
)

// עדכון מרובים + הוספת שדה
db.users.updateMany(
  { age: { $lt: 30 } },
  { $set: { group: "junior" } }
)

// increment — הגדלת ערך
db.users.updateOne(
  { name: "יוסי" },
  { $inc: { loginCount: 1 } }
)

// upsert — עדכן אם קיים, הוסף אם לא
db.users.updateOne(
  { email: "new@example.com" },
  { $set: { name: "חדש" } },
  { upsert: true }
)` },
      { type: 'heading', text: 'DELETE — מחיקת מסמכים' },
      { type: 'text', text: 'deleteOne מוחק את המסמך הראשון שתואם לפילטר, ו-deleteMany מוחק את כולם. מחיקה עם {} (פילטר ריק) מוחקת את כל האוסף. שימו לב לעצה החשובה: תמיד בצעו find עם אותו פילטר לפני deleteMany כדי לאמת מה עומד להימחק.' },
      { type: 'code', lang: 'javascript', caption: 'מחיקה', code: `// מחיקת מסמך אחד
db.users.deleteOne({ email: "sara@example.com" })

// מחיקת רבים לפי תנאי
db.users.deleteMany({ role: "guest" })

// מחיקת כל האוסף
db.users.deleteMany({})` },
      { type: 'tip', text: 'תמיד בדוק את ה-filter עם find() לפני deleteMany() — מחיקה לא ניתנת לביטול!' },
    ],
    questionBank: [
      {
        id: 'nosql-crud-q1',
        text: 'מה האופרטור לעדכון שדה קיים ב-MongoDB?',
        options: ['$update', '$set', '$change', '$modify'],
        correct: 1,
        explanation: '$set מעדכן שדות ספציפיים מבלי לשנות את שאר המסמך. בלי $set, MongoDB תחליף את כל המסמך.',
      },
      {
        id: 'nosql-crud-q2',
        text: 'כיצד מחזירים רק שדות מסוימים ב-find()?',
        options: ['SELECT', 'projection — {field: 1}', 'COLUMNS', '$fields'],
        correct: 1,
        explanation: 'הארגומנט השני ב-find() הוא projection. {name: 1, email: 1, _id: 0} מחזיר רק name ו-email ללא _id.',
      },
      {
        id: 'nosql-crud-q3',
        text: 'מה עושה { upsert: true } ב-updateOne?',
        options: ['מחזיר את המסמך הישן', 'מוסיף מסמך אם לא קיים, מעדכן אם קיים', 'מעדכן את כולם', 'מחיק ומוסיף מחדש'],
        correct: 1,
        explanation: 'upsert = update + insert. אם המסמך לא נמצא לפי ה-filter — הוא נוצר. אם קיים — מתעדכן.',
      },
      {
        id: 'nosql-crud-q4',
        text: 'מה האופרטור להגדלת ערך מספרי?',
        options: ['$add', '$plus', '$inc', '$increment'],
        correct: 2,
        explanation: '$inc מגדיל (או מקטין עם ערך שלילי) שדה מספרי. { $inc: { count: 1 } } מוסיף 1 לשדה count.',
      },
    ],
  },
  {
    id: 'nosql-query-operators',
    title: 'אופרטורי שאילתה מתקדמים',
    summary: '$gt, $in, $regex, $elemMatch — סינון מדויק של מסמכים',
    emoji: '🔍',
    content: [
      { type: 'heading', text: 'אופרטורי השוואה' },
      { type: 'text', text: 'אופרטורי השוואה ב-MongoDB מתחילים ב-$ ומשמשים בתוך אובייקט שאילתה. $gt (greater than), $lt (less than), $gte/$lte (or equal), $ne (not equal), $in (בתוך רשימה), $nin (מחוץ לרשימה). ניתן לשלב כמה אופרטורים על אותו שדה באובייקט אחד — כמו price: { $gt: 100, $lte: 500 }.' },
      { type: 'code', lang: 'javascript', caption: 'Comparison Operators', code: `// גדול מ / קטן מ
db.products.find({ price: { $gt: 100, $lte: 500 } })

// שווה / לא שווה
db.users.find({ status: { $ne: "banned" } })

// רשימת ערכים
db.orders.find({ status: { $in: ["pending", "processing"] } })

// מחוץ לרשימה
db.orders.find({ status: { $nin: ["cancelled", "refunded"] } })` },
      { type: 'heading', text: 'אופרטורים לוגיים' },
      { type: 'text', text: '$and ו-$or מקבלים מערך של תנאים — $and דורש שכולם יתקיימו, $or מספיק לו אחד. שימו לב שכשמציינים כמה שדות באובייקט אחד, MongoDB מתייחסת לזה כ-$and מרומז. $or חובה לכתוב אותו מפורשות עם המפתח $or.' },
      { type: 'code', lang: 'javascript', caption: 'Logical Operators', code: `// AND — כל התנאים
db.users.find({
  $and: [
    { age: { $gte: 18 } },
    { role: "customer" }
  ]
})
// שקול ל:
db.users.find({ age: { $gte: 18 }, role: "customer" })

// OR — אחד מהתנאים
db.products.find({
  $or: [
    { category: "electronics" },
    { price: { $lt: 50 } }
  ]
})

// NOT
db.users.find({ age: { $not: { $lt: 18 } } })` },
      { type: 'heading', text: 'חיפוש טקסט ומערכים' },
      { type: 'text', text: 'MongoDB מאפשר חיפוש regex ישירות על שדות מחרוזת. כשמחפשים ערך בשדה שהוא מערך, MongoDB בודקת אוטומטית אם הערך כלול — אין צורך ב-operator מיוחד. $elemMatch נדרש רק כשצריך לבדוק כמה תנאים על אותו אלמנט מערך.' },
      { type: 'code', lang: 'javascript', caption: 'Text & Array', code: `// Regex — חיפוש חלקי
db.products.find({ name: { $regex: "phone", $options: "i" } })

// מערך — מכיל ערך
db.users.find({ tags: "mongodb" })

// מערך — מכיל את כולם
db.users.find({ tags: { $all: ["nodejs", "mongodb"] } })

// elemMatch — תנאי על אלמנט במערך
db.orders.find({
  items: {
    $elemMatch: { product: "laptop", qty: { $gt: 2 } }
  }
})

// שדה קיים
db.users.find({ phone: { $exists: true } })

// סוג שדה
db.data.find({ value: { $type: "string" } })` },
      { type: 'tip', text: 'אינדקס Text מאפשר חיפוש טקסט מלא מהיר: db.collection.createIndex({ name: "text" }) ואז db.collection.find({ $text: { $search: "מילת חיפוש" } }).' },
    ],
    questionBank: [
      {
        id: 'nosql-query-q1',
        text: 'כיצד מוצאים מסמכים עם price גדול מ-100 וקטן או שווה ל-500?',
        options: ['{ price: [100, 500] }', '{ price: { $gt: 100, $lte: 500 } }', '{ price: BETWEEN(100,500) }', '{ price: { $range: [100,500] } }'],
        correct: 1,
        explanation: '$gt (greater than) ו-$lte (less than or equal) משולבים באובייקט אחד לשדה: { price: { $gt: 100, $lte: 500 } }.',
      },
      {
        id: 'nosql-query-q2',
        text: 'מה האופרטור לחיפוש מסמך שמכיל ערך מסוים במערך?',
        options: ['$contains', '$in', '$elemMatch', 'פשוט { field: value }'],
        correct: 3,
        explanation: 'בMongoDB, { tags: "mongodb" } מוצא מסמכים שב-tags (גם מערך) יש את הערך "mongodb". פשוט וישיר!',
      },
      {
        id: 'nosql-query-q3',
        text: 'מה $elemMatch עושה?',
        options: ['בודק אם מערך ריק', 'מוצא מסמכים שאלמנט במערך עומד בכמה תנאים', 'מחזיר אלמנט ספציפי', 'סופר אלמנטים'],
        correct: 1,
        explanation: '$elemMatch מאפשר לבדוק שאותו אלמנט במערך עומד בכמה תנאים. ללא $elemMatch, התנאים יכולים להתפצל בין אלמנטים שונים.',
      },
      {
        id: 'nosql-query-q4',
        text: 'כיצד מחפשים מסמכים שיש להם שדה מסוים (בכל ערך)?',
        options: ['{ field: "*" }', '{ field: { $exists: true } }', '{ field: { $any: true } }', '{ field: { $notNull: true } }'],
        correct: 1,
        explanation: '$exists בודק אם השדה קיים במסמך. { phone: { $exists: true } } מחזיר רק מסמכים שיש להם שדה phone.',
      },
    ],
  },
  {
    id: 'nosql-aggregation',
    title: 'Aggregation Pipeline',
    summary: '$match, $group, $project, $sort, $unwind — ניתוח ועיבוד נתונים',
    emoji: '📊',
    content: [
      { type: 'heading', text: 'מה זה Aggregation Pipeline?' },
      { type: 'text', text: 'Aggregation Pipeline הוא מנגנון עיבוד נתונים ב-MongoDB. הנתונים עוברים דרך שלבים (stages) ברצף — כל שלב מקבל את הפלט של הקודם ומייצר פלט חדש. זה המקבילה ל-GROUP BY, JOIN, HAVING ב-SQL.' },
      { type: 'code', lang: 'javascript', caption: 'מבנה Pipeline', code: `db.orders.aggregate([
  { $match: ... },    // stage 1 — סינון
  { $group: ... },    // stage 2 — קיבוץ
  { $project: ... },  // stage 3 — בחירת שדות
  { $sort: ... },     // stage 4 — מיון
  { $limit: 10 }      // stage 5 — הגבלה
])` },
      { type: 'heading', text: '$match — סינון' },
      { type: 'text', text: '$match פועל בדיוק כמו find — מסנן מסמכים לפי תנאים. ההבדל הוא שהוא חלק מ-pipeline ומשמש לסינון לפני שלבים כבדים כמו $group. שימוש ב-$match בתחילת ה-pipeline חיוני לביצועים: הוא מפחית את כמות הנתונים שעוברים לשלבים הבאים ויכול להשתמש באינדקסים.' },
      { type: 'code', lang: 'javascript', caption: '$match', code: `// כמו find() — מסנן מסמכים
db.orders.aggregate([
  { $match: {
    status: "completed",
    createdAt: { $gte: new Date("2024-01-01") }
  }}
])
// 💡 תמיד שים $match ראשון — מפחית את כמות הנתונים לשלבים הבאים` },
      { type: 'heading', text: '$group — קיבוץ וסיכום' },
      { type: 'text', text: '$group קובץ מסמכים לפי שדה _id ומחשב צבירות על כל קבוצה. שדה _id הוא המפתח שלפיו מקובצים — כמו GROUP BY ב-SQL. $sum, $count, $avg, $max, $min הם פונקציות הצבירה. שימו לב ש-{ _id: null } פירושו "ללא קיבוץ — חשב על כולם יחד".' },
      { type: 'code', lang: 'javascript', caption: '$group', code: `// סך הזמנות לפי לקוח
db.orders.aggregate([
  { $group: {
    _id: "$customerId",          // קבץ לפי שדה זה
    totalAmount: { $sum: "$amount" },
    orderCount:  { $count: {} },
    avgAmount:   { $avg: "$amount" },
    maxAmount:   { $max: "$amount" }
  }}
])

// קיבוץ לפי מספר שדות
{ $group: {
  _id: { year: { $year: "$date" }, category: "$category" },
  total: { $sum: "$amount" }
}}

// ללא קיבוץ — סיכום כולל
{ $group: { _id: null, grandTotal: { $sum: "$amount" } } }` },
      { type: 'heading', text: '$project — עיצוב הפלט' },
      { type: 'text', text: '$project מאפשר לבחור אילו שדות לכלול, להסתיר שדות, ולחשב שדות חדשים עם ביטויים. 1 = כלול, 0 = הסתר. ניתן ליצור שדות חדשים לגמרי עם ביטויים כמו $concat לחיבור מחרוזות או $cond לתנאים. שימו לב שאי אפשר לשלב כלול והסתר (1 ו-0) על שדות שונים — אלא על _id.' },
      { type: 'code', lang: 'javascript', caption: '$project', code: `db.users.aggregate([
  { $project: {
    name: 1,                              // כלול
    email: 1,
    _id: 0,                               // הסתר
    fullName: { $concat: ["$firstName", " ", "$lastName"] },
    ageGroup: {
      $cond: {
        if: { $gte: ["$age", 18] },
        then: "adult",
        else: "minor"
      }
    }
  }}
])` },
      { type: 'heading', text: '$unwind — פריסת מערכים' },
      { type: 'text', text: '$unwind הופך מסמך עם מערך לכמה מסמכים — אחד לכל אלמנט. מסמך עם tags: ["a","b","c"] יהפוך לשלושה מסמכים נפרדים. זה שימושי לניתוח ספירה של אלמנטים בתוך מערכים — כמו ספירת תגיות פופולריות בדוגמה.' },
      { type: 'code', lang: 'javascript', caption: '$unwind', code: `// מסמך עם מערך:
// { _id: 1, tags: ["a", "b", "c"] }

// לאחר $unwind:
// { _id: 1, tags: "a" }
// { _id: 1, tags: "b" }
// { _id: 1, tags: "c" }

db.posts.aggregate([
  { $unwind: "$tags" },
  { $group: { _id: "$tags", count: { $count: {} } } },
  { $sort: { count: -1 } },
  { $limit: 10 }
])
// → top 10 תגיות פופולריות` },
    ],
    questionBank: [
      {
        id: 'nosql-agg-q1',
        text: 'מדוע כדאי לשים $match בתחילת ה-pipeline?',
        options: ['חובה לשים ראשון', 'מפחית נתונים מוקדם — שלבים הבאים יעילים יותר', 'רק ה-$match הראשון עובד', 'שיפור קריאות'],
        correct: 1,
        explanation: '$match מוקדם מפחית את כמות המסמכים שעוברים לשלבים הבאים. MongoDB יכול להשתמש גם באינדקסים ב-$match ראשון.',
      },
      {
        id: 'nosql-agg-q2',
        text: 'מה צריך להיות ב-_id של $group כדי לקבל סיכום כולל (ללא קיבוץ)?',
        options: ['{ _id: "$all" }', '{ _id: "*" }', '{ _id: null }', '{ _id: 0 }'],
        correct: 2,
        explanation: '{ _id: null } ב-$group אומר "אל תקבץ — חשב על כל המסמכים יחד". מתאים לסכום כולל, ממוצע כללי וכו\'.',
      },
      {
        id: 'nosql-agg-q3',
        text: 'מה עושה $unwind?',
        options: ['מסיר כפילויות', 'פורס מערך ל-מסמכים נפרדים — אחד לכל אלמנט', 'ממיין מערך', 'מחבר מערכים'],
        correct: 1,
        explanation: '$unwind הופך מסמך עם מערך [a,b,c] לשלושה מסמכים נפרדים. שימושי לניתוח אלמנטים בודדים במערך.',
      },
      {
        id: 'nosql-agg-q4',
        text: 'איזה operator ב-$project יוצר שדה חדש מחיבור מחרוזות?',
        options: ['$join', '$merge', '$concat', '$combine'],
        correct: 2,
        explanation: '$concat מחבר מחרוזות: { $concat: ["$first", " ", "$last"] }. אפשר לשלב שדות וטקסט קבוע.',
      },
    ],
  },
  {
    id: 'nosql-lookup',
    title: '$lookup — חיבור בין אוספים',
    summary: 'JOIN ב-MongoDB — חיבור מסמכים ממספר Collections, שלב אחרי שלב',
    emoji: '🔗',
    content: [
      { type: 'heading', text: 'מה זה $lookup?' },
      { type: 'text', text: '$lookup הוא שלב ב-Aggregation Pipeline שמבצע LEFT OUTER JOIN בין שני collections. בדיוק כמו JOIN ב-SQL — אתה לוקח נתונים מאוסף אחד ומצרף אליהם נתונים מאוסף שני, לפי שדה משותף.' },
      {
        type: 'table',
        caption: 'SQL JOIN לעומת MongoDB $lookup',
        headers: ['SQL', 'MongoDB'],
        rows: [
          ['FROM orders JOIN customers', 'db.orders.aggregate([$lookup])'],
          ['ON orders.customerId = customers._id', 'localField: "customerId", foreignField: "_id"'],
          ['AS c', 'as: "customer"'],
          ['מחזיר שורה שטוחה', 'מחזיר מערך — צריך $unwind לשיטוח'],
        ],
      },
      { type: 'heading', text: 'הנתונים לדוגמה — שני Collections' },
      { type: 'text', text: 'נניח שיש לנו שני collections: orders (הזמנות) ו-customers (לקוחות). לכל הזמנה יש customerId שמצביע על הלקוח.' },
      { type: 'code', lang: 'javascript', caption: 'הנתונים ההתחלתיים', code: `// ── Collection: customers ──────────────────────────
{ _id: ObjectId("AAA"), name: "דוד",  city: "תל אביב" }
{ _id: ObjectId("BBB"), name: "שרה",  city: "ירושלים"  }
{ _id: ObjectId("CCC"), name: "יוסי", city: "חיפה"     }

// ── Collection: orders ──────────────────────────────
{ _id: 1, customerId: ObjectId("AAA"), amount: 250 }
{ _id: 2, customerId: ObjectId("BBB"), amount: 180 }
{ _id: 3, customerId: ObjectId("AAA"), amount: 420 }
{ _id: 4, customerId: ObjectId("BBB"), amount: 95  }` },
      { type: 'heading', text: 'שלב 1 — $lookup בסיסי' },
      { type: 'text', text: 'ה-$lookup בסיסי מקבל 4 שדות: from (שם האוסף החיצוני), localField (השדה שלנו), foreignField (השדה באוסף החיצוני), ו-as (שם השדה החדש שיצורף).' },
      { type: 'code', lang: 'javascript', caption: '$lookup — ארבעת השדות הבסיסיים', code: `db.orders.aggregate([
  {
    $lookup: {
      from: "customers",        // חפש באוסף customers
      localField: "customerId", // הנה שדה ה-orders שלי
      foreignField: "_id",      // מצא מסמך customers שה-_id שלו תואם
      as: "customerData"        // שמור תוצאה בשדה חדש בשם customerData
    }
  }
])` },
      { type: 'text', text: 'הנה מה שמוחזר אחרי $lookup — שימו לב שהשדה customerData הוא מערך ולא אובייקט, גם כשיש רק התאמה אחת. זה כי $lookup תמיד מחזיר מערך (יכולים להיות כמה התאמות). כדי לגשת ל-customerData.name, נצטרך קודם לשטח עם $unwind.' },
      { type: 'code', lang: 'javascript', caption: 'תוצאה אחרי $lookup', code: `// MongoDB מחזיר כל הזמנה + customerData כ-מערך:

{ _id: 1, customerId: ObjectId("AAA"), amount: 250,
  customerData: [{ _id: ObjectId("AAA"), name: "דוד", city: "תל אביב" }]
}
{ _id: 2, customerId: ObjectId("BBB"), amount: 180,
  customerData: [{ _id: ObjectId("BBB"), name: "שרה", city: "ירושלים" }]
}
{ _id: 3, customerId: ObjectId("AAA"), amount: 420,
  customerData: [{ _id: ObjectId("AAA"), name: "דוד", city: "תל אביב" }]
}

// ⚠️ שים לב: customerData הוא מערך [] — לא אובייקט!
// זה כי יכולים להיות כמה התאמות. נתקן עם $unwind.` },
      { type: 'heading', text: 'שלב 2 — $unwind לשיטוח המערך' },
      { type: 'text', text: '$lookup תמיד מחזיר מערך. אם בדרך כלל צפויה התאמה אחת בלבד (כמו lookup לפי _id), $unwind הופך את [{ name: "דוד" }] לאובייקט ישיר { name: "דוד" }.' },
      { type: 'code', lang: 'javascript', caption: '$lookup + $unwind', code: `db.orders.aggregate([
  {
    $lookup: {
      from: "customers",
      localField: "customerId",
      foreignField: "_id",
      as: "customerData"
    }
  },
  {
    $unwind: "$customerData"
    // אפשרות בטוחה יותר:
    // $unwind: { path: "$customerData", preserveNullAndEmptyArrays: true }
    // preserveNullAndEmptyArrays: true — שומר הזמנות גם אם לא מצאנו לקוח
  }
])` },
      { type: 'text', text: 'לאחר $unwind, customerData הוא עכשיו אובייקט ישיר ולא מערך. ניתן כעת לגשת לשדות שלו עם customerData.name ו-customerData.city. שימו לב לאפשרות preserveNullAndEmptyArrays: true שחשובה כשלא לכל מסמך בטוח יש התאמה.' },
      { type: 'code', lang: 'javascript', caption: 'תוצאה אחרי $unwind', code: `// עכשיו customerData הוא אובייקט — לא מערך:

{ _id: 1, customerId: ObjectId("AAA"), amount: 250,
  customerData: { _id: ObjectId("AAA"), name: "דוד", city: "תל אביב" }
}
{ _id: 2, customerId: ObjectId("BBB"), amount: 180,
  customerData: { _id: ObjectId("BBB"), name: "שרה", city: "ירושלים" }
}
// ...

// ✅ עכשיו אפשר לגשת ל: customerData.name, customerData.city` },
      { type: 'heading', text: 'שלב 3 — $project לנקות שדות מיותרים' },
      { type: 'text', text: 'אחרי $lookup + $unwind יש לנו הרבה שדות. $project מאפשר לבחור רק מה שצריך, ולשנות שמות אם רוצים.' },
      { type: 'code', lang: 'javascript', caption: '$project — בחירת שדות', code: `db.orders.aggregate([
  { $lookup: { from: "customers", localField: "customerId", foreignField: "_id", as: "customerData" } },
  { $unwind: "$customerData" },
  {
    $project: {
      _id: 0,                       // הסתר _id
      orderId: "$_id",              // שנה שם ל-orderId
      amount: 1,                    // הצג amount
      customerName: "$customerData.name",  // שדה מקונן → שטוח
      city: "$customerData.city"
    }
  }
])

// תוצאה סופית — נקיה ומובנת:
// { orderId: 1, amount: 250, customerName: "דוד",  city: "תל אביב" }
// { orderId: 2, amount: 180, customerName: "שרה",  city: "ירושלים" }
// { orderId: 3, amount: 420, customerName: "דוד",  city: "תל אביב" }
// { orderId: 4, amount: 95,  customerName: "שרה",  city: "ירושלים" }` },
      { type: 'heading', text: 'דוגמה מלאה — דוח TOP לקוחות, שלב-אחרי-שלב' },
      { type: 'text', text: 'נבנה דוח שמראה את הלקוחות הכי פעילים: כמה הזמנות כל אחד עשה, וכמה הוציא בסך הכל. נעקוב אחרי הנתונים בכל שלב.' },
      { type: 'code', lang: 'javascript', caption: 'שלב א׳ — $match: סנן הזמנות מ-2024 בלבד', code: `db.orders.aggregate([
  {
    $match: {
      createdAt: { $gte: new Date("2024-01-01") }
    }
  }
])

// לפני: 4 הזמנות
// אחרי:  נניח שנשארו 3 (הזמנה 4 ישנה)
// { _id: 1, customerId: "AAA", amount: 250, createdAt: 2024-03-01 }
// { _id: 2, customerId: "BBB", amount: 180, createdAt: 2024-03-05 }
// { _id: 3, customerId: "AAA", amount: 420, createdAt: 2024-04-01 }` },
      { type: 'text', text: 'שלב ב׳ מצרף את פרטי הלקוח לכל הזמנה: $lookup מביא את המסמך מ-customers, ו-$unwind הופך את המערך לאובייקט. אחרי שני השלבים כל הזמנה כוללת customerData עם שם העיר ושם הלקוח.' },
      { type: 'code', lang: 'javascript', caption: 'שלב ב׳ — $lookup + $unwind: הוסף פרטי לקוח', code: `// ממשיכים את ה-pipeline:
  {
    $lookup: {
      from: "customers",
      localField: "customerId",
      foreignField: "_id",
      as: "customerData"
    }
  },
  { $unwind: "$customerData" }

// אחרי שני השלבים — כל הזמנה כוללת עכשיו את הלקוח שלה:
// { _id: 1, amount: 250, customerData: { name: "דוד", city: "תל אביב" }, ... }
// { _id: 2, amount: 180, customerData: { name: "שרה", city: "ירושלים"  }, ... }
// { _id: 3, amount: 420, customerData: { name: "דוד", city: "תל אביב" }, ... }` },
      { type: 'text', text: 'שלב ג׳ מקבץ את ההזמנות לפי לקוח ומחשב סטטיסטיקות. $first משמש לשם הלקוח כי הוא זהה בכל הזמנות של אותו לקוח. $count סופר הזמנות ו-$sum מסכם סכומים. שימו לב שה-_id של הקבוצה הוא מזהה הלקוח.' },
      { type: 'code', lang: 'javascript', caption: 'שלב ג׳ — $group: קבץ לפי לקוח וחשב סטטיסטיקות', code: `  {
    $group: {
      _id: "$customerData._id",              // מפתח הקיבוץ: מזהה הלקוח
      customerName: { $first: "$customerData.name" }, // שם (ב-$first כי שווה בכל הזמנות)
      totalOrders: { $count: {} },            // ספור הזמנות
      totalAmount: { $sum: "$amount" }        // סכם סכומים
    }
  }

// אחרי $group — שורה אחת לכל לקוח:
// { _id: "AAA", customerName: "דוד", totalOrders: 2, totalAmount: 670 }
// { _id: "BBB", customerName: "שרה", totalOrders: 1, totalAmount: 180 }` },
      { type: 'text', text: 'השלבים האחרונים ממיינים את התוצאות מהלקוח עם הסכום הגבוה ביותר ומגבילים ל-10 תוצאות. -1 ב-$sort פירושו סדר יורד (מהגדול לקטן). $limit עצמאי פועל על הנתונים שנותרו אחרי כל השלבים הקודמים.' },
      { type: 'code', lang: 'javascript', caption: 'שלבים ד׳-ה׳ — $sort + $limit: מיין והגבל', code: `  { $sort:  { totalAmount: -1 } },  // מהגדול לקטן
  { $limit: 10 }                    // top 10 בלבד

// תוצאה סופית — מדורגת:
// { customerName: "דוד", totalOrders: 2, totalAmount: 670 }
// { customerName: "שרה", totalOrders: 1, totalAmount: 180 }` },
      { type: 'text', text: 'כאן כל השלבים מחוברים לפעולה אחת מלאה. שימו לב לסדר ולהיגיון: קודם מסננים ($match), אז מצרפים נתונים ($lookup + $unwind), אז מקבצים ומחשבים ($group), ולבסוף ממיינים ומגבילים. כל שלב מקבל את פלט הקודם ומייצר פלט חדש.' },
      { type: 'code', lang: 'javascript', caption: 'ה-Pipeline המלא — הכל ביחד', code: `db.orders.aggregate([
  // א. רק הזמנות מ-2024
  { $match: { createdAt: { $gte: new Date("2024-01-01") } } },

  // ב. צרף פרטי לקוח
  { $lookup: { from: "customers", localField: "customerId", foreignField: "_id", as: "customerData" } },
  { $unwind: "$customerData" },

  // ג. קבץ לפי לקוח
  { $group: {
      _id: "$customerData._id",
      customerName: { $first: "$customerData.name" },
      totalOrders: { $count: {} },
      totalAmount: { $sum: "$amount" }
  }},

  // ד. מיין — הכי הרבה כסף קודם
  { $sort: { totalAmount: -1 } },

  // ה. top 10 בלבד
  { $limit: 10 }
])` },
      { type: 'heading', text: '$lookup מתקדם — עם pipeline פנימי' },
      { type: 'text', text: 'כשצריך תנאים מורכבים מעבר לשיוויון פשוט, אפשר להשתמש ב-lookup עם pipeline. let מגדיר משתנים מהמסמך הנוכחי, ואז pipeline משתמש בהם.' },
      { type: 'code', lang: 'javascript', caption: '$lookup עם pipeline — הזמנה עם פרטי מוצרים', code: `// כל הזמנה מכילה מערך של מזהי מוצרים:
// { _id: 1, items: [ObjectId("P1"), ObjectId("P2")], amount: 350 }

db.orders.aggregate([
  {
    $lookup: {
      from: "products",

      // let: "ייצא" שדות מה-order הנוכחי לשימוש ב-pipeline
      let: { itemIds: "$items" },   // $$itemIds = הערך של items מה-order

      pipeline: [
        {
          $match: {
            // $expr נדרש כשמשווים שדות (לא ערכים קבועים)
            $expr: { $in: ["$_id", "$$itemIds"] }
            //            ↑ שדה products._id    ↑ משתנה מה-let
          }
        },
        // החזר רק שדות רלוונטיים — חסוך bandwidth
        { $project: { name: 1, price: 1, _id: 0 } }
      ],

      as: "productDetails"
    }
  }
])

// תוצאה:
// { _id: 1, amount: 350,
//   productDetails: [
//     { name: "עט",  price: 15 },
//     { name: "מחברת", price: 25 }
//   ]
// }` },
      { type: 'tip', text: 'ביצועים: צור אינדקס על השדות שמשמשים ל-JOIN. למשל: db.orders.createIndex({ customerId: 1 }) — הופך $lookup לעשרות מונים מהיר יותר על collections גדולים.' },
    ],
    questionBank: [
      {
        id: 'nosql-lookup-q1',
        text: 'מה המקביל ל-$lookup ב-SQL?',
        options: ['UNION', 'GROUP BY', 'LEFT OUTER JOIN', 'HAVING'],
        correct: 2,
        explanation: '$lookup מבצע LEFT OUTER JOIN — כל מסמך מה-collection המקורי נשאר, ושדות מה-collection החיצוני מצורפים (כמערך) כשיש התאמה.',
      },
      {
        id: 'nosql-lookup-q2',
        text: 'מה $lookup מחזיר בשדה ה-as?',
        options: ['אובייקט יחיד', 'מערך של מסמכים תואמים', 'מספר ההתאמות', 'null אם לא נמצא'],
        correct: 1,
        explanation: '$lookup תמיד מחזיר מערך ב-as. אם נמצאה התאמה אחת — מערך עם אלמנט אחד. אם לא נמצא — מערך ריק [].',
      },
      {
        id: 'nosql-lookup-q3',
        text: 'מדוע משתמשים ב-$unwind אחרי $lookup?',
        options: ['חובה לתפקוד', 'להמיר מערך [תוצאה] לאובייקט בודד', 'לסנן תוצאות', 'לשפר ביצועים'],
        correct: 1,
        explanation: '$lookup מחזיר מערך. $unwind "פורס" אותו כך שבמקום customerData: [{ name: "דוד" }] תקבל customerData: { name: "דוד" } — נוח יותר לגישה לשדות.',
      },
      {
        id: 'nosql-lookup-q4',
        text: 'מה preserveNullAndEmptyArrays עושה ב-$unwind?',
        options: ['מסיר מסמכים ריקים', 'שומר מסמכים גם אם ה-$lookup לא מצא התאמה', 'ממלא ערכים null', 'מוסיף מערכים ריקים'],
        correct: 1,
        explanation: 'ב-$unwind, מסמכים עם מערך ריק (ללא התאמה ב-$lookup) נמחקים כברירת מחדל. preserveNullAndEmptyArrays: true שומר אותם — שימושי כש-JOIN הוא אופציונלי.',
      },
      {
        id: 'nosql-lookup-q5',
        text: 'מתי משתמשים ב-$lookup עם let ו-pipeline במקום הצורה הבסיסית?',
        options: [
          'תמיד — זה הצורה המומלצת',
          'כשצריך תנאי JOIN מורכב מעבר לשיוויון בין שני שדות',
          'כשיש יותר מ-10 מסמכים',
          'רק ב-MongoDB Atlas',
        ],
        correct: 1,
        explanation: 'הצורה הבסיסית (localField/foreignField) עובדת לשיוויון פשוט. let+pipeline נדרש כשצריך $in, $gt, תנאים מרובים, או pipeline מלא על ה-collection החיצוני.',
      },
    ],
  },
  {
    id: 'nosql-lookup',
    title: '$lookup — חיבור בין אוספים',
    summary: 'JOIN ב-MongoDB — חיבור מסמכים ממספר Collections, שלב אחרי שלב',
    emoji: '🔗',
    content: [
      { type: 'heading', text: 'מה זה $lookup?' },
      { type: 'text', text: '$lookup הוא שלב ב-Aggregation Pipeline שמבצע LEFT OUTER JOIN בין שני collections. בדיוק כמו JOIN ב-SQL — אתה לוקח נתונים מאוסף אחד ומצרף אליהם נתונים מאוסף שני, לפי שדה משותף.' },
      {
        type: 'table',
        caption: 'SQL JOIN לעומת MongoDB $lookup',
        headers: ['SQL', 'MongoDB'],
        rows: [
          ['FROM orders JOIN customers', 'db.orders.aggregate([$lookup])'],
          ['ON orders.customerId = customers._id', 'localField: "customerId", foreignField: "_id"'],
          ['AS c', 'as: "customer"'],
          ['מחזיר שורה שטוחה', 'מחזיר מערך — צריך $unwind לשיטוח'],
        ],
      },
      { type: 'heading', text: 'הנתונים לדוגמה — שני Collections' },
      { type: 'text', text: 'נניח שיש לנו שני collections: orders (הזמנות) ו-customers (לקוחות). לכל הזמנה יש customerId שמצביע על הלקוח.' },
      { type: 'code', lang: 'javascript', caption: 'הנתונים ההתחלתיים', code: `// ── Collection: customers ──────────────────────────
{ _id: ObjectId("AAA"), name: "דוד",  city: "תל אביב" }
{ _id: ObjectId("BBB"), name: "שרה",  city: "ירושלים"  }
{ _id: ObjectId("CCC"), name: "יוסי", city: "חיפה"     }

// ── Collection: orders ──────────────────────────────
{ _id: 1, customerId: ObjectId("AAA"), amount: 250 }
{ _id: 2, customerId: ObjectId("BBB"), amount: 180 }
{ _id: 3, customerId: ObjectId("AAA"), amount: 420 }
{ _id: 4, customerId: ObjectId("BBB"), amount: 95  }` },
      { type: 'heading', text: 'שלב 1 — $lookup בסיסי' },
      { type: 'text', text: 'ה-$lookup בסיסי מקבל 4 שדות: from (שם האוסף החיצוני), localField (השדה שלנו), foreignField (השדה באוסף החיצוני), ו-as (שם השדה החדש שיצורף).' },
      { type: 'code', lang: 'javascript', caption: '$lookup — ארבעת השדות הבסיסיים', code: `db.orders.aggregate([
  {
    $lookup: {
      from: "customers",        // חפש באוסף customers
      localField: "customerId", // הנה שדה ה-orders שלי
      foreignField: "_id",      // מצא מסמך customers שה-_id שלו תואם
      as: "customerData"        // שמור תוצאה בשדה חדש בשם customerData
    }
  }
])` },
      { type: 'text', text: 'הנה מה שמוחזר אחרי $lookup — שימו לב שהשדה customerData הוא מערך ולא אובייקט, גם כשיש רק התאמה אחת. זה כי $lookup תמיד מחזיר מערך (יכולים להיות כמה התאמות). כדי לגשת ל-customerData.name, נצטרך קודם לשטח עם $unwind.' },
      { type: 'code', lang: 'javascript', caption: 'תוצאה אחרי $lookup', code: `// MongoDB מחזיר כל הזמנה + customerData כ-מערך:

{ _id: 1, customerId: ObjectId("AAA"), amount: 250,
  customerData: [{ _id: ObjectId("AAA"), name: "דוד", city: "תל אביב" }]
}
{ _id: 2, customerId: ObjectId("BBB"), amount: 180,
  customerData: [{ _id: ObjectId("BBB"), name: "שרה", city: "ירושלים" }]
}
{ _id: 3, customerId: ObjectId("AAA"), amount: 420,
  customerData: [{ _id: ObjectId("AAA"), name: "דוד", city: "תל אביב" }]
}

// ⚠️ שים לב: customerData הוא מערך [] — לא אובייקט!
// זה כי יכולים להיות כמה התאמות. נתקן עם $unwind.` },
      { type: 'heading', text: 'שלב 2 — $unwind לשיטוח המערך' },
      { type: 'text', text: '$lookup תמיד מחזיר מערך. אם בדרך כלל צפויה התאמה אחת בלבד (כמו lookup לפי _id), $unwind הופך את [{ name: "דוד" }] לאובייקט ישיר { name: "דוד" }.' },
      { type: 'code', lang: 'javascript', caption: '$lookup + $unwind', code: `db.orders.aggregate([
  {
    $lookup: {
      from: "customers",
      localField: "customerId",
      foreignField: "_id",
      as: "customerData"
    }
  },
  {
    $unwind: "$customerData"
    // אפשרות בטוחה יותר:
    // $unwind: { path: "$customerData", preserveNullAndEmptyArrays: true }
    // preserveNullAndEmptyArrays: true — שומר הזמנות גם אם לא מצאנו לקוח
  }
])` },
      { type: 'text', text: 'לאחר $unwind, customerData הוא עכשיו אובייקט ישיר ולא מערך. ניתן כעת לגשת לשדות שלו עם customerData.name ו-customerData.city. שימו לב לאפשרות preserveNullAndEmptyArrays: true שחשובה כשלא לכל מסמך בטוח יש התאמה.' },
      { type: 'code', lang: 'javascript', caption: 'תוצאה אחרי $unwind', code: `// עכשיו customerData הוא אובייקט — לא מערך:

{ _id: 1, customerId: ObjectId("AAA"), amount: 250,
  customerData: { _id: ObjectId("AAA"), name: "דוד", city: "תל אביב" }
}
{ _id: 2, customerId: ObjectId("BBB"), amount: 180,
  customerData: { _id: ObjectId("BBB"), name: "שרה", city: "ירושלים" }
}
// ...

// ✅ עכשיו אפשר לגשת ל: customerData.name, customerData.city` },
      { type: 'heading', text: 'שלב 3 — $project לנקות שדות מיותרים' },
      { type: 'text', text: 'אחרי $lookup + $unwind יש לנו הרבה שדות. $project מאפשר לבחור רק מה שצריך, ולשנות שמות אם רוצים.' },
      { type: 'code', lang: 'javascript', caption: '$project — בחירת שדות', code: `db.orders.aggregate([
  { $lookup: { from: "customers", localField: "customerId", foreignField: "_id", as: "customerData" } },
  { $unwind: "$customerData" },
  {
    $project: {
      _id: 0,                       // הסתר _id
      orderId: "$_id",              // שנה שם ל-orderId
      amount: 1,                    // הצג amount
      customerName: "$customerData.name",  // שדה מקונן → שטוח
      city: "$customerData.city"
    }
  }
])

// תוצאה סופית — נקיה ומובנת:
// { orderId: 1, amount: 250, customerName: "דוד",  city: "תל אביב" }
// { orderId: 2, amount: 180, customerName: "שרה",  city: "ירושלים" }
// { orderId: 3, amount: 420, customerName: "דוד",  city: "תל אביב" }
// { orderId: 4, amount: 95,  customerName: "שרה",  city: "ירושלים" }` },
      { type: 'heading', text: 'דוגמה מלאה — דוח TOP לקוחות, שלב-אחרי-שלב' },
      { type: 'text', text: 'נבנה דוח שמראה את הלקוחות הכי פעילים: כמה הזמנות כל אחד עשה, וכמה הוציא בסך הכל. נעקוב אחרי הנתונים בכל שלב.' },
      { type: 'code', lang: 'javascript', caption: 'שלב א׳ — $match: סנן הזמנות מ-2024 בלבד', code: `db.orders.aggregate([
  {
    $match: {
      createdAt: { $gte: new Date("2024-01-01") }
    }
  }
])

// לפני: 4 הזמנות
// אחרי:  נניח שנשארו 3 (הזמנה 4 ישנה)
// { _id: 1, customerId: "AAA", amount: 250, createdAt: 2024-03-01 }
// { _id: 2, customerId: "BBB", amount: 180, createdAt: 2024-03-05 }
// { _id: 3, customerId: "AAA", amount: 420, createdAt: 2024-04-01 }` },
      { type: 'text', text: 'שלב ב׳ מצרף את פרטי הלקוח לכל הזמנה: $lookup מביא את המסמך מ-customers, ו-$unwind הופך את המערך לאובייקט. אחרי שני השלבים כל הזמנה כוללת customerData עם שם העיר ושם הלקוח.' },
      { type: 'code', lang: 'javascript', caption: 'שלב ב׳ — $lookup + $unwind: הוסף פרטי לקוח', code: `// ממשיכים את ה-pipeline:
  {
    $lookup: {
      from: "customers",
      localField: "customerId",
      foreignField: "_id",
      as: "customerData"
    }
  },
  { $unwind: "$customerData" }

// אחרי שני השלבים — כל הזמנה כוללת עכשיו את הלקוח שלה:
// { _id: 1, amount: 250, customerData: { name: "דוד", city: "תל אביב" }, ... }
// { _id: 2, amount: 180, customerData: { name: "שרה", city: "ירושלים"  }, ... }
// { _id: 3, amount: 420, customerData: { name: "דוד", city: "תל אביב" }, ... }` },
      { type: 'text', text: 'שלב ג׳ מקבץ את ההזמנות לפי לקוח ומחשב סטטיסטיקות. $first משמש לשם הלקוח כי הוא זהה בכל הזמנות של אותו לקוח. $count סופר הזמנות ו-$sum מסכם סכומים. שימו לב שה-_id של הקבוצה הוא מזהה הלקוח.' },
      { type: 'code', lang: 'javascript', caption: 'שלב ג׳ — $group: קבץ לפי לקוח וחשב סטטיסטיקות', code: `  {
    $group: {
      _id: "$customerData._id",              // מפתח הקיבוץ: מזהה הלקוח
      customerName: { $first: "$customerData.name" }, // שם (ב-$first כי שווה בכל הזמנות)
      totalOrders: { $count: {} },            // ספור הזמנות
      totalAmount: { $sum: "$amount" }        // סכם סכומים
    }
  }

// אחרי $group — שורה אחת לכל לקוח:
// { _id: "AAA", customerName: "דוד", totalOrders: 2, totalAmount: 670 }
// { _id: "BBB", customerName: "שרה", totalOrders: 1, totalAmount: 180 }` },
      { type: 'text', text: 'השלבים האחרונים ממיינים את התוצאות מהלקוח עם הסכום הגבוה ביותר ומגבילים ל-10 תוצאות. -1 ב-$sort פירושו סדר יורד (מהגדול לקטן). $limit עצמאי פועל על הנתונים שנותרו אחרי כל השלבים הקודמים.' },
      { type: 'code', lang: 'javascript', caption: 'שלבים ד׳-ה׳ — $sort + $limit: מיין והגבל', code: `  { $sort:  { totalAmount: -1 } },  // מהגדול לקטן
  { $limit: 10 }                    // top 10 בלבד

// תוצאה סופית — מדורגת:
// { customerName: "דוד", totalOrders: 2, totalAmount: 670 }
// { customerName: "שרה", totalOrders: 1, totalAmount: 180 }` },
      { type: 'text', text: 'כאן כל השלבים מחוברים לפעולה אחת מלאה. שימו לב לסדר ולהיגיון: קודם מסננים ($match), אז מצרפים נתונים ($lookup + $unwind), אז מקבצים ומחשבים ($group), ולבסוף ממיינים ומגבילים. כל שלב מקבל את פלט הקודם ומייצר פלט חדש.' },
      { type: 'code', lang: 'javascript', caption: 'ה-Pipeline המלא — הכל ביחד', code: `db.orders.aggregate([
  // א. רק הזמנות מ-2024
  { $match: { createdAt: { $gte: new Date("2024-01-01") } } },

  // ב. צרף פרטי לקוח
  { $lookup: { from: "customers", localField: "customerId", foreignField: "_id", as: "customerData" } },
  { $unwind: "$customerData" },

  // ג. קבץ לפי לקוח
  { $group: {
      _id: "$customerData._id",
      customerName: { $first: "$customerData.name" },
      totalOrders: { $count: {} },
      totalAmount: { $sum: "$amount" }
  }},

  // ד. מיין — הכי הרבה כסף קודם
  { $sort: { totalAmount: -1 } },

  // ה. top 10 בלבד
  { $limit: 10 }
])` },
      { type: 'heading', text: '$lookup מתקדם — עם pipeline פנימי' },
      { type: 'text', text: 'כשצריך תנאים מורכבים מעבר לשיוויון פשוט, אפשר להשתמש ב-lookup עם pipeline. let מגדיר משתנים מהמסמך הנוכחי, ואז pipeline משתמש בהם.' },
      { type: 'code', lang: 'javascript', caption: '$lookup עם pipeline — הזמנה עם פרטי מוצרים', code: `// כל הזמנה מכילה מערך של מזהי מוצרים:
// { _id: 1, items: [ObjectId("P1"), ObjectId("P2")], amount: 350 }

db.orders.aggregate([
  {
    $lookup: {
      from: "products",

      // let: "ייצא" שדות מה-order הנוכחי לשימוש ב-pipeline
      let: { itemIds: "$items" },   // $$itemIds = הערך של items מה-order

      pipeline: [
        {
          $match: {
            // $expr נדרש כשמשווים שדות (לא ערכים קבועים)
            $expr: { $in: ["$_id", "$$itemIds"] }
            //            ↑ שדה products._id    ↑ משתנה מה-let
          }
        },
        // החזר רק שדות רלוונטיים — חסוך bandwidth
        { $project: { name: 1, price: 1, _id: 0 } }
      ],

      as: "productDetails"
    }
  }
])

// תוצאה:
// { _id: 1, amount: 350,
//   productDetails: [
//     { name: "עט",  price: 15 },
//     { name: "מחברת", price: 25 }
//   ]
// }` },
      { type: 'tip', text: 'ביצועים: צור אינדקס על השדות שמשמשים ל-JOIN. למשל: db.orders.createIndex({ customerId: 1 }) — הופך $lookup לעשרות מונים מהיר יותר על collections גדולים.' },
    ],
    questionBank: [
      {
        id: 'nosql-lookup-q1',
        text: 'מה המקביל ל-$lookup ב-SQL?',
        options: ['UNION', 'GROUP BY', 'LEFT OUTER JOIN', 'HAVING'],
        correct: 2,
        explanation: '$lookup מבצע LEFT OUTER JOIN — כל מסמך מה-collection המקורי נשאר, ושדות מה-collection החיצוני מצורפים (כמערך) כשיש התאמה.',
      },
      {
        id: 'nosql-lookup-q2',
        text: 'מה $lookup מחזיר בשדה ה-as?',
        options: ['אובייקט יחיד', 'מערך של מסמכים תואמים', 'מספר ההתאמות', 'null אם לא נמצא'],
        correct: 1,
        explanation: '$lookup תמיד מחזיר מערך ב-as. אם נמצאה התאמה אחת — מערך עם אלמנט אחד. אם לא נמצא — מערך ריק [].',
      },
      {
        id: 'nosql-lookup-q3',
        text: 'מדוע משתמשים ב-$unwind אחרי $lookup?',
        options: ['חובה לתפקוד', 'להמיר מערך [תוצאה] לאובייקט בודד', 'לסנן תוצאות', 'לשפר ביצועים'],
        correct: 1,
        explanation: '$lookup מחזיר מערך. $unwind "פורס" אותו כך שבמקום customerData: [{ name: "דוד" }] תקבל customerData: { name: "דוד" } — נוח יותר לגישה לשדות.',
      },
      {
        id: 'nosql-lookup-q4',
        text: 'מה preserveNullAndEmptyArrays עושה ב-$unwind?',
        options: ['מסיר מסמכים ריקים', 'שומר מסמכים גם אם ה-$lookup לא מצא התאמה', 'ממלא ערכים null', 'מוסיף מערכים ריקים'],
        correct: 1,
        explanation: 'ב-$unwind, מסמכים עם מערך ריק (ללא התאמה ב-$lookup) נמחקים כברירת מחדל. preserveNullAndEmptyArrays: true שומר אותם — שימושי כש-JOIN הוא אופציונלי.',
      },
      {
        id: 'nosql-lookup-q5',
        text: 'מתי משתמשים ב-$lookup עם let ו-pipeline במקום הצורה הבסיסית?',
        options: [
          'תמיד — זה הצורה המומלצת',
          'כשצריך תנאי JOIN מורכב מעבר לשיוויון בין שני שדות',
          'כשיש יותר מ-10 מסמכים',
          'רק ב-MongoDB Atlas',
        ],
        correct: 1,
        explanation: 'הצורה הבסיסית (localField/foreignField) עובדת לשיוויון פשוט. let+pipeline נדרש כשצריך $in, $gt, תנאים מרובים, או pipeline מלא על ה-collection החיצוני.',
      },
    ],
  },
  {
    id: 'nosql-indexes',
    title: 'Indexes — ביצועים ומהירות',
    summary: 'אינדקסים ב-MongoDB — סוגים, יצירה, ניתוח ב-explain()',
    emoji: '⚡',
    content: [
      { type: 'heading', text: 'למה אינדקסים?' },
      { type: 'text', text: 'ללא אינדקס, MongoDB סורקת את כל המסמכים (COLLSCAN) — איטי מאוד לאוספים גדולים. אינדקס יוצר מבנה B-Tree שמאפשר חיפוש מהיר (IXSCAN).' },
      { type: 'code', lang: 'javascript', caption: 'יצירת אינדקסים', code: `// אינדקס על שדה יחיד
db.users.createIndex({ email: 1 })   // 1=עולה, -1=יורד

// אינדקס ייחודי — מונע כפילויות
db.users.createIndex({ email: 1 }, { unique: true })

// אינדקס מורכב — על כמה שדות
db.orders.createIndex({ customerId: 1, createdAt: -1 })

// אינדקס TTL — מחיקה אוטומטית אחרי זמן
db.sessions.createIndex(
  { createdAt: 1 },
  { expireAfterSeconds: 3600 }  // מחיקה אחרי שעה
)

// אינדקס Text — חיפוש טקסט מלא
db.articles.createIndex({ title: "text", content: "text" })

// רשימת אינדקסים
db.users.getIndexes()

// מחיקת אינדקס
db.users.dropIndex({ email: 1 })` },
      { type: 'heading', text: 'explain() — ניתוח שאילתה' },
      { type: 'text', text: 'explain("executionStats") מריץ את השאילתה ומחזיר מידע על איך MongoDB ביצעה אותה. המפתח הוא לחפש ב-winningPlan.stage: "IXSCAN" אומר שהשתמשנו באינדקס (מהיר), "COLLSCAN" אומר שסרקנו הכל (איטי). אם totalDocsExamined גדול בהרבה מ-nReturned, צריך אינדקס.' },
      { type: 'code', lang: 'javascript', caption: 'explain לניתוח ביצועים', code: `// בדוק אם שאילתה משתמשת באינדקס
db.users.find({ email: "test@test.com" }).explain("executionStats")

// בפלט חפש:
// winningPlan.stage:
//   "COLLSCAN" → סריקת כל האוסף (איטי!) ❌
//   "IXSCAN"   → שימוש באינדקס (מהיר!) ✅

// nReturned → כמה מסמכים הוחזרו
// totalDocsExamined → כמה נסרקו
// אם totalDocsExamined >> nReturned → צריך אינדקס!` },
      {
        type: 'table',
        caption: 'סוגי אינדקסים נפוצים',
        headers: ['סוג', 'שימוש', 'דוגמה'],
        rows: [
          ['Single Field', 'חיפוש לפי שדה אחד', 'createIndex({ email: 1 })'],
          ['Compound', 'חיפוש לפי כמה שדות', 'createIndex({ city: 1, age: -1 })'],
          ['Unique', 'מניעת כפילויות', 'createIndex({ email: 1 }, { unique: true })'],
          ['Text', 'חיפוש טקסט מלא', 'createIndex({ title: "text" })'],
          ['TTL', 'מחיקה אוטומטית', 'createIndex({ at: 1 }, { expireAfterSeconds: 86400 })'],
          ['Sparse', 'רק מסמכים עם השדה', 'createIndex({ phone: 1 }, { sparse: true })'],
        ],
      },
      { type: 'tip', text: 'ESR Rule לאינדקסים מורכבים: Equality → Sort → Range. השדות שמחפשים בשווה קודם, מיון אחר כך, ולבסוף טווחים.' },
    ],
    questionBank: [
      {
        id: 'nosql-idx-q1',
        text: 'מה ה-stage שמעיד שאין אינדקס בשאילתה?',
        options: ['IXSCAN', 'COLLSCAN', 'FETCH', 'SORT'],
        correct: 1,
        explanation: 'COLLSCAN (Collection Scan) = MongoDB סורקת את כל המסמכים. זה איטי לאוספים גדולים. IXSCAN = שימוש באינדקס = מהיר.',
      },
      {
        id: 'nosql-idx-q2',
        text: 'מה TTL Index עושה?',
        options: ['מאיץ שאילתות טקסט', 'מוחק מסמכים אוטומטית אחרי זמן קבוע', 'מונע כפילויות', 'מאנדקס שדות null'],
        correct: 1,
        explanation: 'TTL (Time To Live) Index מוחק מסמכים אוטומטית לאחר expireAfterSeconds שניות. מתאים ל-sessions, logs, cache.',
      },
      {
        id: 'nosql-idx-q3',
        text: 'מה ESR Rule לאינדקסים מורכבים?',
        options: ['Error → Sort → Range', 'Equality → Sort → Range', 'Exists → Select → Return', 'Equal → Skip → Retrieve'],
        correct: 1,
        explanation: 'ESR = Equality → Sort → Range. בנה compound index כך: שדות שמחפשים בשווה (=) קודם, שדות מיון אחר כך, שדות טווח ($gt/$lt) בסוף.',
      },
      {
        id: 'nosql-idx-q4',
        text: 'מה כדאי לבדוק ב-explain() לאיתור בעיות ביצועים?',
        options: ['שם ה-collection', 'הפרש בין totalDocsExamined ל-nReturned', 'גודל המסמך', 'גרסת MongoDB'],
        correct: 1,
        explanation: 'אם totalDocsExamined >> nReturned — MongoDB בודקת הרבה מסמכים ומחזירה מעט. זה סימן לצורך באינדקס.',
      },
    ],
  },
  {
    id: 'nosql-schema',
    title: 'Schema Design — embed vs reference',
    summary: 'כיצד לתכנן מבנה נתונים ב-MongoDB — מתי לקנן ומתי לפצל',
    emoji: '🏗️',
    content: [
      { type: 'heading', text: 'שתי גישות עיקריות' },
      { type: 'text', text: 'ב-MongoDB יש שתי דרכים לייצג קשרים בין ישויות: Embedding (קינון נתונים בתוך מסמך) ו-Referencing (שמירת מזהה ו-$lookup בזמן שאילתה). הבחירה ביניהם משפיעה דרמטית על הביצועים.' },
      { type: 'heading', text: 'Embedding — קינון' },
      { type: 'text', text: 'Embedding שומר נתונים קשורים בתוך המסמך עצמו — כתובת ורשימת טלפונים ישירות אצל המשתמש. היתרון הוא שקריאת המסמך מחזירה הכל בפעולה אחת ללא JOIN. החיסרון הוא כפילות נתונים אם אותה ישות שייכת לכמה מסמכים, ומגבלת 16MB למסמך.' },
      { type: 'code', lang: 'javascript', caption: 'Embedded Document', code: `// כל הנתונים במסמך אחד
{
  _id: ObjectId("..."),
  name: "דוד כהן",
  address: {                    // ← מקונן
    street: "דיזנגוף 100",
    city: "תל אביב",
    zip: "63461"
  },
  phones: [                     // ← מערך מקונן
    { type: "mobile", number: "050-1234567" },
    { type: "home",   number: "03-1234567" }
  ]
}

// ✅ קריאה במסמך אחד — מהיר
// ✅ עדכון אטומי
// ❌ כפילות נתונים אם ישות משותפת לרבים
// ❌ מסמך גדול אם יש הרבה תת-ישויות` },
      { type: 'heading', text: 'Referencing — הפניה' },
      { type: 'text', text: 'Referencing שומר רק את המזהה של ישות אחרת, ומשתמש ב-$lookup בזמן שאילתה. זה שימושי כשנתונים משותפים לכמה מסמכים — עדכון במקום אחד משתקף בכל מקום. החיסרון הוא עלות $lookup בכל קריאה שדורשת את הנתונים המקושרים.' },
      { type: 'code', lang: 'javascript', caption: 'Referenced Document', code: `// orders collection
{
  _id: ObjectId("order1"),
  customerId: ObjectId("cust1"),  // ← הפניה
  items: [
    { productId: ObjectId("prod1"), qty: 2 },
    { productId: ObjectId("prod2"), qty: 1 }
  ],
  amount: 350
}

// customers collection (נפרד)
{
  _id: ObjectId("cust1"),
  name: "שרה לוי",
  email: "sara@example.com"
}

// ✅ ללא כפילות — עדכון במקום אחד
// ✅ מסמכים קטנים
// ❌ דורש $lookup לקריאה מלאה (עלות)` },
      { type: 'heading', text: 'כלל האצבע לבחירה' },
      {
        type: 'table',
        caption: 'כללי אצבע: Embed vs. Reference',
        headers: ['קריטריון', 'Embed', 'Reference'],
        rows: [
          ['סוג קשר', '"One-to-Few" (עד ~100)', '"One-to-Many" / "Many-to-Many"'],
          ['גודל נתונים מקושרים', 'קטן ומוגבל', 'גדול / לא מוגבל'],
          ['שיתוף נתונים', 'ייחודי למסמך אחד', 'משותף למסמכים רבים'],
          ['תדירות עדכון', 'נדירה', 'תדירה (עדיף reference)'],
          ['תדירות גישה', 'תמיד ניגשים יחד', 'לפעמים ניגשים בנפרד'],
        ],
      },
      { type: 'heading', text: 'דפוסים מתקדמים: Hybrid Pattern' },
      { type: 'text', text: 'ה-Hybrid Pattern משלב הפניה (לשמירת קשר) עם snapshot (לשמירת ערכים בזמן האירוע). בהזמנה שומרים גם את productId (הפניה) וגם את המחיר ושם המוצר בזמן הקנייה (snapshot). כך גם אם המחיר ישתנה בעתיד, ההזמנה הישנה תשמור את המחיר המקורי.' },
      { type: 'code', lang: 'javascript', caption: 'דפוס היברידי: הפניה + Snapshot', code: `// הזמנה עם פרטי מוצר מקוננים (snapshot)
// + הפניה ל-product המקורי
{
  _id: ObjectId("order1"),
  customerId: ObjectId("cust1"),
  items: [{
    productId: ObjectId("prod1"),    // ← הפניה (Reference)
    name: "מחשב נייד",               // ← Snapshot (מחיר ושם בזמן הקנייה)
    price: 4500,
    qty: 1
  }]
}
// אם המחיר ישתנה — ההזמנה הישנה תשמור את המחיר המקורי ✅` },
      { type: 'tip', text: '"Design your schema for the queries you run, not for the data you store." — תכנן לפי השאילתות, לא לפי הנתונים.' },
    ],
    questionBank: [
      {
        id: 'nosql-schema-q1',
        text: 'מתי Embedding עדיף על Referencing?',
        options: ['תמיד', 'כשהנתונים גדולים ומשתנים תדיר', 'כשהנתונים קטנים וייחודיים לאובייקט', 'רק ב-many-to-many'],
        correct: 2,
        explanation: 'Embedding מתאים כשהנתונים קטנים, ייחודיים לאובייקט אחד, ונגישים יחד תמיד. דוגמה טובה: כתובת של משתמש.',
      },
      {
        id: 'nosql-schema-q2',
        text: 'מה הסיכון בהגדלת מסמכים מקוננים ללא הגבלה?',
        options: ['אין סיכון', 'MongoDB מגבילה מסמך ל-16MB ומסמכים גדולים איטיים', 'הנתונים נמחקים', 'אינדקסים לא עובדים'],
        correct: 1,
        explanation: 'מסמך MongoDB מוגבל ל-16MB. מסמכים גדולים גם איטיים לקריאה ועדכון. ל-"one-to-many" גדול — עדיף Referencing.',
      },
      {
        id: 'nosql-schema-q3',
        text: 'מה הסיבה לשמור snapshot של מחיר בהזמנה במקום הפניה למוצר?',
        options: ['מהיר יותר', 'שמירת המחיר בזמן הקנייה גם אם המחיר יעלה', 'חסכון ב-storage', 'הפניה לא עובדת'],
        correct: 1,
        explanation: 'Snapshot pattern: שמירת עותק של הנתונים בזמן האירוע. אם מחיר המוצר ישתנה — ההזמנה הישנה תשמור את המחיר המקורי.',
      },
      {
        id: 'nosql-schema-q4',
        text: 'מה העיקרון המרכזי בתכנון schema ב-MongoDB?',
        options: ['לפי נורמליזציה כמו SQL', 'לפי השאילתות שרצים, לא לפי הנתונים', 'כמה שיותר Embedding', 'כמה שפחות אוספים'],
        correct: 1,
        explanation: 'ב-MongoDB, תכנן את ה-schema לפי השאילתות הנפוצות ביותר. אם תמיד קוראים משתמש עם הכתובת — embed. אם לפעמים — reference.',
      },
    ],
  },
  {
    id: 'nosql-mongoose',
    title: 'Mongoose ו-MongoDB Atlas',
    summary: 'ODM בNode.js, Schema Validation, ו-MongoDB בענן',
    emoji: '🌿',
    content: [
      { type: 'heading', text: 'מה זה Mongoose?' },
      { type: 'text', text: 'Mongoose הוא ODM (Object Document Mapper) ל-Node.js. הוא מוסיף schema validation, middleware hooks, ו-model-based queries על גבי ה-MongoDB driver הרגיל.' },
      { type: 'code', lang: 'bash', caption: 'התקנה', code: `npm install mongoose` },
      { type: 'text', text: 'בקוד זה אנו מגדירים Schema עם כל סוגי validation: required, unique, min/max לגיל, enum לתפקידים ו-default לתאריך יצירה. Schema עם Mongoose נותן מבנה קבוע למסמכים ומבטיח שנתונים שגויים לא יישמרו. שימו לב לפונקציה mongoose.model שיוצרת את Model.' },
      { type: 'code', lang: 'javascript', caption: 'חיבור ו-Schema', code: `import mongoose from 'mongoose'

// חיבור
await mongoose.connect('mongodb+srv://user:pass@cluster.mongodb.net/mydb')

// הגדרת Schema
const userSchema = new mongoose.Schema({
  name:  { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  age:   { type: Number, min: 0, max: 120 },
  role:  { type: String, enum: ['user', 'admin'], default: 'user' },
  tags:  [String],
  address: {
    city:   String,
    street: String,
  },
  createdAt: { type: Date, default: Date.now },
})

// Model
const User = mongoose.model('User', userSchema)` },
      { type: 'heading', text: 'CRUD עם Mongoose' },
      { type: 'text', text: 'Mongoose מספקת API נוח לפעולות CRUD: create, find, findById, findOne לקריאה, findByIdAndUpdate לעדכון ו-findByIdAndDelete למחיקה. שימו לב ל-lean() שמחזיר plain JS object במקום Mongoose Document — מהיר יותר כשלא צריך validation או hooks.' },
      { type: 'code', lang: 'javascript', caption: 'פעולות CRUD', code: `// יצירה
const user = await User.create({
  name: 'דוד כהן',
  email: 'david@example.com',
  age: 30
})

// קריאה
const users = await User.find({ role: 'admin' }).select('name email').lean()
const one   = await User.findById(id)
const found = await User.findOne({ email: 'david@example.com' })

// עדכון
await User.findByIdAndUpdate(id, { $set: { age: 31 } }, { new: true })

// מחיקה
await User.findByIdAndDelete(id)

// Aggregation
const stats = await User.aggregate([
  { $group: { _id: '$role', count: { $count: {} } } }
])` },
      { type: 'heading', text: 'Middleware (Hooks)' },
      { type: 'text', text: 'Hooks ב-Mongoose הם פונקציות שרצות לפני (pre) או אחרי (post) אירועים כמו save, findOneAndDelete. הדוגמה מראה הצפנת סיסמה אוטומטית לפני כל שמירה — isModified מוודא שמצפינים רק כשהסיסמה שונתה. כך לוגיקת אבטחה מרוכזת במודל ולא מפוזרת בקוד.' },
      { type: 'code', lang: 'javascript', caption: 'Pre/Post Hooks', code: `import bcrypt from 'bcrypt'

// הצפן סיסמה לפני שמירה
userSchema.pre('save', async function(next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 12)
  }
  next()
})

// לוג אחרי מחיקה
userSchema.post('findOneAndDelete', function(doc) {
  if (doc) console.log('User ' + doc.email + ' was deleted')
})` },
      { type: 'heading', text: 'MongoDB Atlas' },
      { type: 'text', text: 'MongoDB Atlas הוא שירות ענן מנוהל של MongoDB שמאפשר להקים cluster תוך דקות. ה-Free Tier (M0) מספיק ללמידה ופרויקטים קטנים עם 512MB. שימו לב שה-connection string שמתקבל מ-Atlas כולל את שם המשתמש, הסיסמה ושם ה-cluster — שמרו אותו ב-.env ולא ב-קוד.' },
      { type: 'code', lang: 'text', caption: 'הקמת Atlas בחינם', code: `1. cloud.mongodb.com → Create Free Account
2. Create Cluster → M0 (Free Tier, 512MB)
3. Database Access → Add User (username + password)
4. Network Access → Allow from anywhere (0.0.0.0/0) לפיתוח
5. Connect → Drivers → העתק connection string

mongodb+srv://<user>:<password>@cluster.mongodb.net/<dbname>` },
      { type: 'tip', text: 'השתמש ב-lean() כשלא צריך Mongoose Document מלא — מחזיר plain JS object ומהיר יותר ב-~30%.' },
    ],
    questionBank: [
      {
        id: 'nosql-mongoose-q1',
        text: 'מה היתרון של Mongoose על פני MongoDB Driver רגיל?',
        options: ['מהיר יותר', 'Schema validation, middleware ו-model-based queries', 'תומך ב-SQL', 'גרסה חינמית'],
        correct: 1,
        explanation: 'Mongoose מוסיף שכבה מעל ה-driver: Schema עם validation, pre/post hooks, virtual fields, ו-populate (כמו $lookup אוטומטי).',
      },
      {
        id: 'nosql-mongoose-q2',
        text: 'מה עושה lean() בשאילתת Mongoose?',
        options: ['מסנן שדות ריקים', 'מחזיר Plain JS object במקום Mongoose Document', 'ממיר ל-JSON', 'מפחית נתונים'],
        correct: 1,
        explanation: 'lean() מחזיר Plain JavaScript object ללא כל ה-overhead של Mongoose Document (methods, getters, setters). מהיר יותר לקריאה בלבד.',
      },
      {
        id: 'nosql-mongoose-q3',
        text: 'מה mongoose pre hook מאפשר?',
        options: ['ביצוע פעולה לפני event מסוים (שמירה, מחיקה וכו\')', 'יצירת אינדקס', 'חיבור ל-Atlas', 'validation של שאילתה'],
        correct: 0,
        explanation: 'Pre hooks רצים לפני event (save, findOneAndDelete, validate וכו\'). שימושי להצפנת סיסמאות, timestamp updates, audit log.',
      },
      {
        id: 'nosql-mongoose-q4',
        text: 'מה כולל MongoDB Atlas Free Tier?',
        options: ['ללא הגבלה', '512MB storage, shared cluster, ללא credit card', '1GB + backup', 'ללא גבלת זמן ו-10GB'],
        correct: 1,
        explanation: 'M0 (Free Tier) של Atlas כולל: 512MB storage, shared cluster (M0), ללא credit card נדרש. מתאים ללמידה ופרויקטים קטנים.',
      },
    ],
  },
]
