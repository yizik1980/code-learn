import type { Lesson } from '../../types'

export const elasticsearchLessons: Lesson[] = [
  {
    id: 'es-intro',
    title: 'מבוא ל-Elasticsearch',
    summary: 'מה זה Elasticsearch, ארכיטקטורה, Inverted Index ומתי להשתמש',
    emoji: '🔍',
    content: [
      { type: 'heading', text: 'מה זה Elasticsearch?' },
      {
        type: 'text',
        text: 'Elasticsearch הוא מנוע חיפוש ואנליטיקה מבוסס-Lucene, מבוזר ו-RESTful. פותח ב-2010, כיום חלק מה-Elastic Stack (ELK). מאפשר חיפוש Full-Text מהיר על כמויות עצומות של נתונים.',
      },
      {
        type: 'table',
        caption: 'Elasticsearch לעומת מסדי נתונים אחרים',
        headers: ['מאפיין', 'Elasticsearch', 'PostgreSQL', 'MongoDB'],
        rows: [
          ['סוג', 'Search Engine', 'Relational DB', 'Document DB'],
          ['חיפוש טקסט חופשי', 'מעולה (native)', 'מוגבל (LIKE)', 'בסיסי'],
          ['אנליטיקה בזמן אמת', 'כן', 'לא', 'חלקי'],
          ['ACID Transactions', 'לא', 'כן', 'חלקי'],
          ['JOIN', 'לא (denormalized)', 'כן', 'לא'],
          ['שימוש עיקרי', 'חיפוש, לוגים, דשבורדים', 'נתונים עסקיים', 'נתונים גמישים'],
        ],
      },
      { type: 'heading', text: 'Inverted Index — הבסיס של חיפוש מהיר' },
      {
        type: 'text',
        text: 'במקום לסרוק כל מסמך, Elasticsearch בונה מראש Inverted Index: מיפוי מכל מילה לרשימת המסמכים שמכילים אותה. כך חיפוש על מיליוני מסמכים לוקח אלפיות שנייה.',
      },
      {
        type: 'code',
        lang: 'text',
        caption: 'Inverted Index — דוגמה',
        code: `מסמכים:
  doc1: "elasticsearch is fast"
  doc2: "elasticsearch is distributed"
  doc3: "search is fast"

Inverted Index:
  "elasticsearch" → [doc1, doc2]
  "is"            → [doc1, doc2, doc3]
  "fast"          → [doc1, doc3]
  "distributed"   → [doc2]
  "search"        → [doc3]

חיפוש "elasticsearch fast":
  → "elasticsearch": [doc1, doc2]
  → "fast":          [doc1, doc3]
  → intersection + scoring → doc1 (מופיעות שתיהן!)`,
      },
      { type: 'heading', text: 'ארכיטקטורה — מינוח בסיסי' },
      {
        type: 'table',
        caption: 'מינוח Elasticsearch מול SQL',
        headers: ['Elasticsearch', 'SQL', 'הסבר'],
        rows: [
          ['Index', 'Database / Table', 'אוסף מסמכים מאותו סוג'],
          ['Document', 'Row', 'יחידת נתונים בפורמט JSON'],
          ['Field', 'Column', 'שדה בתוך מסמך'],
          ['Mapping', 'Schema', 'הגדרת טיפוסי שדות'],
          ['Shard', '-', 'חלק מIndex על Node אחד'],
          ['Node', 'Server', 'מכונה אחת ב-cluster'],
          ['Cluster', 'DB Server', 'קבוצת Nodes'],
        ],
      },
      {
        type: 'code',
        lang: 'text',
        caption: 'ארכיטקטורת Cluster',
        code: `Cluster: "my-cluster"
├── Node 1 (Master + Data)
│   ├── Index "products" — Shard 0 (Primary)
│   └── Index "products" — Shard 1 (Replica)
├── Node 2 (Data)
│   ├── Index "products" — Shard 1 (Primary)
│   └── Index "products" — Shard 0 (Replica)
└── Node 3 (Data)
    └── Index "logs" — Shards 0-2

Master Node  — מנהל cluster state, index creation/deletion
Data Node    — מאחסן ומחפש data
Coordinating — מקבל requests ומפזר לשאר nodes`,
      },
      { type: 'tip', text: 'Elasticsearch מצוין ל: Full-text search (e-commerce, documentation), Log analysis (ELK stack), Real-time analytics, Autocomplete. הוא לא מחליף DB רלציוני — משתמשים בו בנוסף לDB העיקרי כ-search layer.' },
    ],
    questionBank: [
      {
        id: 'ei-q1',
        text: 'מה Inverted Index ומדוע הוא מהיר?',
        options: [
          'אינדקס שעובד בסדר הפוך מסוף לתחילה',
          'מיפוי מכל מילה לרשימת המסמכים המכילים אותה — מאפשר חיפוש בזמן קבוע O(1) במקום סריקה ליניארית',
          'Index שמאחסן נתונים בסדר אלפביתי',
          'סוג של B-Tree Index המשמש ל-SQL',
        ],
        correct: 1,
        explanation: 'Inverted Index = מבנה נתונים שממפה כל token לרשימת מסמכים. במקום לסרוק כל מסמך בחיפוש (O(n)), מחפשים את המילה ב-index (O(1)) ומקבלים מיידית את רשימת המסמכים. זה מה שהופך חיפוש על מיליארדי מסמכים למהיר.',
      },
      {
        id: 'ei-q2',
        text: 'מה ההבדל בין Index ל-Document ב-Elasticsearch?',
        options: [
          'הם זהים — שמות שונים לאותו דבר',
          'Index = אוסף מסמכים מאותו סוג (כמו טבלה); Document = רשומת JSON בודדת (כמו row)',
          'Document = אוסף; Index = רשומה בודדת',
          'Index = שדה; Document = database',
        ],
        correct: 1,
        explanation: 'Index: אוסף מסמכים עם mapping משותף (products, logs, users). Document: יחידת נתונים בודדת בפורמט JSON בתוך index. שינוי מ-ES 7: סוג אחד (type) לindex — לא עוד types מרובים.',
      },
      {
        id: 'ei-q3',
        text: 'מה תפקיד ה-Master Node ב-Elasticsearch cluster?',
        options: [
          'מאחסן את כל הנתונים',
          'מנהל cluster state: יצירת/מחיקת indices, הקצאת shards לnodes, ניטור node failures',
          'מטפל בכל search requests',
          'מנהל authentication ו-authorization בלבד',
        ],
        correct: 1,
        explanation: 'Master Node: מנהל cluster-level operations — cluster state, index creation/deletion, shard allocation, node monitoring. Data Nodes: מאחסנים ומעבדים data. Coordinating Nodes: מקבלים requests ומפזרים. בcluster קטן Node אחד יכול לשמש Master + Data.',
      },
      {
        id: 'ei-q4',
        text: 'מתי Elasticsearch הוא הבחירה הנכונה?',
        options: [
          'כL-source of truth לכל נתוני הApplication',
          'Full-text search, log analytics, autocomplete — כ-search/analytics layer בנוסף ל-DB העיקרי',
          'ACID transactions ונתונים פיננסיים',
          'כDB עיקרי לכל סוגי האפליקציות',
        ],
        correct: 1,
        explanation: 'ES מצוין כ-search layer: e-commerce search, log analysis (ELK), real-time dashboards, autocomplete. לא מתאים כ-source of truth: אין ACID, documents יכולים ללכת לאיבוד. Pattern נפוץ: PostgreSQL (source of truth) + Elasticsearch (search/analytics).',
      },
    ],
  },

  {
    id: 'es-mapping',
    title: 'Index ו-Mapping',
    summary: 'יצירת indices, הגדרת mapping, field types ו-analyzers',
    emoji: '🗺️',
    content: [
      { type: 'heading', text: 'יצירת Index' },
      {
        type: 'code',
        lang: 'json',
        caption: 'PUT /products — יצירת index עם mapping',
        code: `PUT /products
{
  "settings": {
    "number_of_shards": 3,
    "number_of_replicas": 1,
    "analysis": {
      "analyzer": {
        "hebrew_analyzer": {
          "type": "custom",
          "tokenizer": "standard",
          "filter": ["lowercase", "asciifolding"]
        }
      }
    }
  },
  "mappings": {
    "properties": {
      "name":        { "type": "text", "analyzer": "hebrew_analyzer" },
      "description": { "type": "text" },
      "price":       { "type": "float" },
      "stock":       { "type": "integer" },
      "category":    { "type": "keyword" },
      "tags":        { "type": "keyword" },
      "in_stock":    { "type": "boolean" },
      "created_at":  { "type": "date", "format": "yyyy-MM-dd'T'HH:mm:ss" },
      "location": {
        "type": "geo_point"
      },
      "name_suggest": {
        "type": "completion"
      }
    }
  }
}`,
      },
      { type: 'heading', text: 'Field Types חשובים' },
      {
        type: 'table',
        caption: 'Elasticsearch Field Types',
        headers: ['סוג', 'מתי להשתמש', 'דוגמה'],
        rows: [
          ['text', 'Full-text search — מנותח (analyzed)', 'description, title, content'],
          ['keyword', 'Exact match, sort, aggregations — לא מנותח', 'email, status, country, tags'],
          ['integer / long / float', 'מספרים', 'price, age, quantity'],
          ['boolean', 'true/false', 'in_stock, is_active'],
          ['date', 'תאריכים ב-ISO 8601', 'created_at, updated_at'],
          ['geo_point', 'קואורדינטות GPS', 'location, store_coords'],
          ['completion', 'Autocomplete מהיר', 'search_suggest'],
          ['nested', 'מערכים של אובייקטים עם queries', 'comments, variants'],
        ],
      },
      { type: 'heading', text: 'text לעומת keyword — ההבדל הקריטי' },
      {
        type: 'code',
        lang: 'json',
        caption: 'text vs keyword — מתי לבחור',
        code: `// text: מנותח (analyzed) — מחולק למילים, lowercase
// שימוש: full-text search על תוכן חופשי
"title": { "type": "text" }
// "Hello World" → tokens: ["hello", "world"]
// חיפוש "hello" ✅, חיפוש "Hello World" ✅

// keyword: לא מנותח — exact match בלבד
// שימוש: filter, sort, aggregations, exact values
"status": { "type": "keyword" }
// "active" → token: ["active"]
// חיפוש "active" ✅, חיפוש "Active" ❌

// multi-field — שניהם יחד!
"name": {
  "type": "text",
  "fields": {
    "raw": { "type": "keyword" }
  }
}
// search by name (text) + sort/agg by name.raw (keyword)`,
      },
      { type: 'heading', text: 'Dynamic vs Explicit Mapping' },
      {
        type: 'code',
        lang: 'json',
        caption: 'Dynamic mapping settings',
        code: `// Dynamic Mapping (default: true)
// ES מנחש טיפוסים אוטומטית — נוח אך מסוכן
// "price": "42" → text (לא float!) → לא ניתן לעשות range query

// Explicit Mapping (מומלץ ב-production!)
PUT /orders
{
  "mappings": {
    "dynamic": "strict",    // שגיאה על שדות לא מוגדרים
    // "dynamic": "false"   // מתעלם משדות חדשים
    // "dynamic": true      // ברירת מחדל — מנחש
    "properties": {
      "order_id": { "type": "keyword" },
      "total":    { "type": "double" },
      "status":   { "type": "keyword" }
    }
  }
}

// הוספת שדה למapping קיים
PUT /orders/_mapping
{
  "properties": {
    "shipping_address": { "type": "text" }
  }
}
// ⚠️ לא ניתן לשנות טיפוס קיים — צריך reindex!`,
      },
      { type: 'tip', text: 'Mapping Explosion: dynamic mapping על log data יכול ליצור אלפי שדות ולקרוס את הcluster. תמיד הגדר mapping מפורש ב-production. שדות שמספרם לא ידוע — השתמש ב-flattened type. ב-ES 8 ה-limit הברירת מחדל הוא 1000 שדות לindex.' },
    ],
    questionBank: [
      {
        id: 'em-q1',
        text: 'מה ההבדל בין שדה text ל-keyword?',
        options: [
          'text מהיר יותר מkeyword',
          'text מנותח (analyzed) למילים בודדות — מתאים לfull-text; keyword = exact match — מתאים לfilter, sort, aggregations',
          'keyword מנותח; text לא',
          'text תומך ב-numbers, keyword ב-strings',
        ],
        correct: 1,
        explanation: 'text: "Hello World" → ["hello", "world"] — analysis pipeline. חיפוש "world" ✅. keyword: "Hello World" → ["Hello World"] — אין analysis. חיפוש "world" ❌, חיפוש "Hello World" ✅. email, status → keyword. description, title → text.',
      },
      {
        id: 'em-q2',
        text: 'מה multi-field mapping ומדוע הוא שימושי?',
        options: [
          'הגדרת כמה indices לאותו מסמך',
          'שדה יחיד עם כמה ייצוגים — למשל name כtext לחיפוש ו-name.raw כkeyword לsort/aggregation',
          'mapping של כמה טיפוסים שונים לאותו index',
          'שדות שמשתנים לפי queries שונות',
        ],
        correct: 1,
        explanation: 'Multi-field: שדה אחד, כמה mappings. "name": { type: "text", fields: { "raw": { type: "keyword" } } } → חיפוש ב-name (full-text), מיון לפי name.raw (exact). חוסך כפילות במסמך תוך שמירת שני ה-use cases.',
      },
      {
        id: 'em-q3',
        text: 'מה יקרה אם ננסה לשנות טיפוס שדה קיים ב-Elasticsearch?',
        options: [
          'Elasticsearch ישנה את הטיפוס אוטומטית',
          'שגיאה — לא ניתן לשנות mapping קיים. הפתרון: יצירת index חדש עם mapping נכון ו-Reindex',
          'הטיפוס ישתנה רק למסמכים חדשים',
          'השינוי יחול רק אחרי restart',
        ],
        correct: 1,
        explanation: 'Mapping הוא immutable לשדות קיימים — Lucene אינו תומך בשינוי field type. הפתרון: 1. צור index חדש עם mapping נכון. 2. הרץ POST /_reindex לעתק נתונים. 3. שנה alias. זה עיקרון חשוב לתכנון מראש.',
      },
      {
        id: 'em-q4',
        text: 'מה Mapping Explosion ואיך מונעים אותו?',
        options: [
          'קריסת cluster בגלל יותר מדי documents',
          'יצירת אלפי שדות דינמיים (כמו ב-log fields) שמכבידים על cluster memory. מניעה: dynamic: "strict" + mapping מפורש',
          'שגיאה בייצוא mapping גדול',
          'overflow של shard size',
        ],
        correct: 1,
        explanation: 'Dynamic mapping על unstructured logs יכול ליצור אלפי field mappings בcluster state (שנשמר ב-RAM). Limit: 1000 fields per index. פתרונות: dynamic: "strict", flattened type, סינון שדות לפני indexing. ב-production: תמיד explicit mapping.',
      },
    ],
  },

  {
    id: 'es-crud',
    title: 'CRUD — ניהול מסמכים',
    summary: 'הוספה, קריאה, עדכון ומחיקת מסמכים ב-Elasticsearch',
    emoji: '📝',
    content: [
      { type: 'heading', text: 'Index (Create) — הוספת מסמך' },
      {
        type: 'code',
        lang: 'json',
        caption: 'הוספת מסמכים',
        code: `// PUT עם ID ידני
PUT /products/_doc/1
{
  "name": "iPhone 15 Pro",
  "price": 4999.99,
  "category": "smartphones",
  "in_stock": true,
  "created_at": "2024-01-15T10:00:00"
}

// POST — ID אוטומטי
POST /products/_doc
{
  "name": "Samsung Galaxy S24",
  "price": 3999.99,
  "category": "smartphones"
}
// Response: { "_id": "aB3dKp...", "result": "created" }

// Upsert — create or replace
PUT /products/_doc/1?op_type=create
// שגיאה אם קיים: version_conflict_engine_exception

// Bulk API — ביצועי!
POST /_bulk
{ "index": { "_index": "products", "_id": "1" } }
{ "name": "iPhone", "price": 4999 }
{ "index": { "_index": "products", "_id": "2" } }
{ "name": "Samsung", "price": 3999 }
{ "delete": { "_index": "products", "_id": "3" } }`,
      },
      { type: 'heading', text: 'Get — קריאת מסמך' },
      {
        type: 'code',
        lang: 'json',
        caption: 'קריאה לפי ID',
        code: `// קריאת מסמך בודד
GET /products/_doc/1
// Response:
{
  "_index": "products",
  "_id": "1",
  "_version": 2,
  "found": true,
  "_source": {
    "name": "iPhone 15 Pro",
    "price": 4999.99
  }
}

// קריאת שדות ספציפיים
GET /products/_doc/1?_source=name,price

// Multi Get
GET /_mget
{
  "docs": [
    { "_index": "products", "_id": "1" },
    { "_index": "products", "_id": "2" }
  ]
}

// בדיקת קיום
HEAD /products/_doc/1
// 200 = קיים, 404 = לא קיים`,
      },
      { type: 'heading', text: 'Update — עדכון מסמך' },
      {
        type: 'code',
        lang: 'json',
        caption: 'עדכון חלקי ומלא',
        code: `// עדכון חלקי (Partial Update) — רק שדות שצוינו
POST /products/_update/1
{
  "doc": {
    "price": 4799.99,
    "in_stock": false
  }
}

// עדכון עם Script (Painless language)
POST /products/_update/1
{
  "script": {
    "source": "ctx._source.price *= params.discount",
    "params": { "discount": 0.9 }
  }
}

// Upsert — עדכן או צור
POST /products/_update/999
{
  "doc": { "price": 100 },
  "upsert": { "name": "New Product", "price": 100 }
}

// Update by Query — עדכן לפי תנאי
POST /products/_update_by_query
{
  "script": { "source": "ctx._source.in_stock = false" },
  "query": { "term": { "category": "discontinued" } }
}`,
      },
      { type: 'heading', text: 'Delete — מחיקת מסמך' },
      {
        type: 'code',
        lang: 'json',
        caption: 'מחיקה',
        code: `// מחיקת מסמך בודד
DELETE /products/_doc/1

// מחיקה לפי query
POST /products/_delete_by_query
{
  "query": {
    "range": {
      "created_at": { "lt": "2020-01-01" }
    }
  }
}

// מחיקת index שלם (⚠️ לא ניתן לשחזור!)
DELETE /products

// Refresh — חיוני לאחר write בtest
POST /products/_refresh
// ב-production: Elasticsearch עושה refresh אוטומטי כל שנייה

// Versioning — אופטימיסטי
PUT /products/_doc/1?if_seq_no=10&if_primary_term=1
{ "price": 100 }
// שגיאה אם המסמך השתנה מאז — מניעת conflict`,
      },
      { type: 'tip', text: 'Bulk API הוא הדרך הנכונה ל-indexing בכמות. שליחת מסמכים אחד-אחד = overhead עצום. Bulk request של 5-15MB אידיאלי. ב-Node.js: השתמש ב-client.helpers.bulk() עם async generator. Refresh: ב-test בלבד, לא ב-production.' },
    ],
    questionBank: [
      {
        id: 'ec-q1',
        text: 'מה ההבדל בין PUT ל-POST ליצירת מסמך?',
        options: [
          'PUT מהיר יותר מPOST',
          'PUT דורש ID ידני; POST יוצר ID אוטומטי',
          'POST מחייב mapping מוגדר מראש',
          'אין הבדל — הם זהים לחלוטין',
        ],
        correct: 1,
        explanation: 'PUT /index/_doc/ID: יוצר/מחליף מסמך עם ID ידני. POST /index/_doc: יוצר מסמך עם ID שנוצר אוטומטית (UUID). PUT עם ID שקיים = replace (version++). להוספה מאובטחת: op_type=create שיכשל אם ID קיים.',
      },
      {
        id: 'ec-q2',
        text: 'מה _update/_doc עם doc: שונה מ-PUT חדש?',
        options: [
          'הם זהים לחלוטין',
          'POST _update עם doc: מעדכן רק שדות שצוינו; PUT חדש מחליף את כל המסמך',
          'PUT לא תומך בJSON',
          '_update יותר מהיר מPUT',
        ],
        correct: 1,
        explanation: 'Partial Update (POST /_update): רק השדות ב-doc: מתעדכנים, שאר השדות נשמרים. PUT /_doc: מחליף את כל המסמך (_source שלם). בפועל: _update מוריד, מעדכן ומעלה מחדש — אך חוסך שליחת כל השדות.',
      },
      {
        id: 'ec-q3',
        text: 'מדוע Bulk API עדיף על שליחת מסמכים אחד-אחד?',
        options: [
          'Bulk תומך ביותר סוגי operations',
          'חוסך HTTP round-trips: שליחת 1000 docs = בקשה אחת במקום 1000. מפחית network overhead וserialization cost ב-90%+',
          'Bulk מבצע automatic retry על failures',
          'Bulk מדלג על mapping validation',
        ],
        correct: 1,
        explanation: 'כל HTTP request: TCP connection, headers, parsing overhead. 10,000 documents × 1 req = ~10,000 round-trips. Bulk: chunk של 5-15MB = ~1-50 requests. תפוקה: 1 doc/req ≈ 100-500/sec. Bulk ≈ 10,000-50,000/sec. עד 100x מהיר יותר.',
      },
      {
        id: 'ec-q4',
        text: 'מה Optimistic Concurrency Control ב-Elasticsearch?',
        options: [
          'Elasticsearch לא תומך ב-concurrency control',
          'שימוש ב-if_seq_no ו-if_primary_term — עדכון נכשל אם המסמך השתנה מאז הקריאה, מונע lost updates',
          'Pessimistic locking — נועל מסמך לזמן העדכון',
          'Versioning אוטומטי ב-background',
        ],
        correct: 1,
        explanation: 'ES לא תומך ב-locks. Optimistic Concurrency: קרא מסמך (קבל _seq_no, _primary_term) → עדכן עם if_seq_no=X&if_primary_term=Y → אם מישהו שינה בינתיים: version_conflict_engine_exception. הClient מחליט אם לretry. מונע lost updates ב-concurrent scenarios.',
      },
    ],
  },

  {
    id: 'es-query-dsl',
    title: 'Query DSL — חיפוש',
    summary: 'match, term, bool, range queries ו-relevance scoring',
    emoji: '🔎',
    content: [
      { type: 'heading', text: 'Query DSL — מבנה בסיסי' },
      {
        type: 'code',
        lang: 'json',
        caption: 'מבנה Search Request',
        code: `POST /products/_search
{
  "query": { ... },          // מה לחפש
  "from": 0,                 // pagination — offset
  "size": 10,                // כמה תוצאות
  "_source": ["name","price"], // שדות להחזיר
  "sort": [
    { "price": { "order": "asc" } }
  ],
  "highlight": {
    "fields": { "name": {} }  // הדגשת מילות חיפוש
  }
}

// Response
{
  "hits": {
    "total": { "value": 142 },
    "max_score": 2.3,
    "hits": [
      { "_id": "1", "_score": 2.3, "_source": { ... } }
    ]
  }
}`,
      },
      { type: 'heading', text: 'Query Types — עיקריים' },
      {
        type: 'code',
        lang: 'json',
        caption: 'match, term, range, match_phrase',
        code: `// match — full-text search (analyzed)
// "iphone pro" → tokens: ["iphone", "pro"] → OR חיפוש
{ "match": { "name": "iphone pro" } }

// match_phrase — חיפוש ביטוי מדויק בסדר
{ "match_phrase": { "description": "noise cancelling headphones" } }

// term — exact match (לא מנותח) — לkeyword fields
{ "term": { "category": "smartphones" } }

// terms — IN (..) — כמה ערכים
{ "terms": { "category": ["smartphones", "tablets"] } }

// range — טווח מספרים/תאריכים
{
  "range": {
    "price": { "gte": 1000, "lte": 5000 }
  }
}
{
  "range": {
    "created_at": {
      "gte": "now-7d/d",
      "lte": "now/d"
    }
  }
}

// exists — שדה קיים
{ "exists": { "field": "discount_price" } }

// wildcard — לא מומלץ ב-production (איטי!)
{ "wildcard": { "name": "iph*" } }

// prefix — מהיר יותר מwildcard
{ "prefix": { "name": { "value": "iph" } } }`,
      },
      { type: 'heading', text: 'bool Query — שילוב תנאים' },
      {
        type: 'code',
        lang: 'json',
        caption: 'bool query — must, should, filter, must_not',
        code: `POST /products/_search
{
  "query": {
    "bool": {
      "must": [
        { "match": { "name": "iphone" } }
      ],
      "filter": [
        { "term":  { "in_stock": true } },
        { "range": { "price": { "lte": 5000 } } }
      ],
      "should": [
        { "term": { "tags": "sale" } },
        { "term": { "tags": "new" } }
      ],
      "minimum_should_match": 1,
      "must_not": [
        { "term": { "category": "refurbished" } }
      ]
    }
  }
}

// must:     חייב להתאים + משפיע על score
// filter:   חייב להתאים + לא משפיע על score (מהיר + cached!)
// should:   רצוי להתאים + מעלה score
// must_not: חייב לא להתאים + לא משפיע על score`,
      },
      { type: 'heading', text: 'Relevance Scoring — BM25' },
      {
        type: 'code',
        lang: 'json',
        caption: 'Relevance ו-Boosting',
        code: `// Explain — למה document קיבל score זה?
GET /products/_explain/1
{
  "query": { "match": { "name": "iphone" } }
}

// Boosting — העלאת חשיבות שדה
{
  "query": {
    "multi_match": {
      "query": "wireless headphones",
      "fields": ["name^3", "description^1", "tags^2"]
      // name חשוב 3x יותר מdescription
    }
  }
}

// function_score — score מורכב
{
  "query": {
    "function_score": {
      "query": { "match": { "name": "iphone" } },
      "functions": [
        { "field_value_factor": { "field": "rating", "factor": 1.5 } },
        { "gauss": { "price": { "origin": "2000", "scale": "500" } } }
      ],
      "score_mode": "multiply"
    }
  }
}`,
      },
      { type: 'tip', text: 'filter vs must: filter לא משפיע על score ומוחזר ב-cache — תמיד עדיף ל-boolean conditions (in_stock=true, category=X). must מחשב relevance — השתמש רק לfull-text search שצריך ranking. בdashboards ב-Kibana: כמעט הכל filter.' },
    ],
    questionBank: [
      {
        id: 'eq-q1',
        text: 'מה ההבדל בין must ל-filter ב-bool query?',
        options: [
          'הם זהים — שניהם חייבים להתאים',
          'must: חייב להתאים ומשפיע על relevance score; filter: חייב להתאים אך לא מחשב score — מהיר יותר ומוחזר ב-cache',
          'filter יותר מחמיר ממust',
          'must עובד על text, filter על keyword',
        ],
        correct: 1,
        explanation: 'must: matches + contributes to score (TF-IDF/BM25). filter: matches + no score calculation + cached. תוצאה: filter מהיר בהרבה לboolean conditions. Rule: full-text search → must. boolean/range/exact → filter. קוד Kibana Dashboard משתמש כמעט רק ב-filter.',
      },
      {
        id: 'eq-q2',
        text: 'מה ההבדל בין match ל-term?',
        options: [
          'match לmulti-field, term לfield אחד',
          'match מנתח את ה-query (analyzed) — לtext fields. term לא מנתח — exact match לkeyword fields',
          'term תמיד מהיר יותר ממatch',
          'match תומך בwildcards, term לא',
        ],
        correct: 1,
        explanation: 'match: "iPhone Pro" → ["iphone", "pro"] → חיפוש analyzed. מתאים לtext fields. term: "iPhone Pro" → ["iPhone Pro"] → exact match. מתאים לkeyword. שגיאה נפוצה: term על text field לא יצליח כי הfield analyzed אך הquery לא.',
      },
      {
        id: 'eq-q3',
        text: 'מה function_score query מאפשר?',
        options: [
          'הרצת functions ב-Painless script',
          'שינוי relevance score לפי גורמים נוספים — למשל: rating, distance, recency, popularity',
          'חישוב aggregations על query results',
          'יצירת custom analyzers',
        ],
        correct: 1,
        explanation: 'function_score: base query + score modifiers. דוגמאות: field_value_factor (מכפיל score לפי rating), gauss/linear/exp (distance decay — מסמכים קרובים מקבלים score גבוה יותר), random_score (תצוגה רנדומלית עקבית). חיוני ל-e-commerce ranking.',
      },
      {
        id: 'eq-q4',
        text: 'מה minimum_should_match ב-bool query?',
        options: [
          'מינימום documents שייחזרו',
          'מספר מינימלי של should clauses שחייבים להתאים. 1 = לפחות אחת, 2 = לפחות שניים',
          'מינימום score לקבלה בתוצאות',
          'מינימום אורך query',
        ],
        correct: 1,
        explanation: 'should clauses: ברירת מחדל — אפס חייבים להתאים (אם יש must/filter). minimum_should_match: 1 = לפחות should אחת חייבת להתאים. 2 = שניים. "75%" = 75% מהshouldclauses. שימושי: "מצא products שיש להם לפחות אחד מהtags האלה".',
      },
    ],
  },

  {
    id: 'es-aggregations',
    title: 'Aggregations — אנליטיקה',
    summary: 'Metric, Bucket ו-Pipeline aggregations לניתוח נתונים בזמן אמת',
    emoji: '📊',
    content: [
      { type: 'heading', text: 'Aggregations — מבנה כללי' },
      {
        type: 'code',
        lang: 'json',
        caption: 'מבנה aggregation request',
        code: `POST /orders/_search
{
  "size": 0,       // לא נחזיר hits — רק aggregations
  "query": {
    "range": { "date": { "gte": "now-30d" } }
  },
  "aggs": {
    "my_agg_name": {         // שם חופשי
      "agg_type": { ... },   // סוג האggregation
      "aggs": { ... }        // nested aggs
    }
  }
}`,
      },
      { type: 'heading', text: 'Metric Aggregations — מדדים' },
      {
        type: 'code',
        lang: 'json',
        caption: 'avg, sum, min, max, stats, cardinality',
        code: `POST /orders/_search
{
  "size": 0,
  "aggs": {
    "avg_price":     { "avg":   { "field": "total" } },
    "total_revenue": { "sum":   { "field": "total" } },
    "min_price":     { "min":   { "field": "total" } },
    "max_price":     { "max":   { "field": "total" } },
    "order_stats": {
      "stats": { "field": "total" }
      // מחזיר: count, min, max, avg, sum יחד
    },
    "unique_customers": {
      "cardinality": { "field": "customer_id" }
      // HyperLogLog approximation — מהיר מאוד
    },
    "percentile_95": {
      "percentiles": {
        "field": "response_time",
        "percents": [50, 95, 99]
      }
    }
  }
}`,
      },
      { type: 'heading', text: 'Bucket Aggregations — קיבוץ' },
      {
        type: 'code',
        lang: 'json',
        caption: 'terms, range, date_histogram',
        code: `POST /orders/_search
{
  "size": 0,
  "aggs": {
    // terms — קיבוץ לפי ערך (כמו GROUP BY)
    "by_category": {
      "terms": {
        "field": "category",
        "size": 10,         // top 10 categories
        "order": { "_count": "desc" }
      },
      "aggs": {
        "avg_order": { "avg": { "field": "total" } }
      }
    },

    // date_histogram — סדרת זמן
    "orders_over_time": {
      "date_histogram": {
        "field": "date",
        "calendar_interval": "1d",
        "format": "yyyy-MM-dd",
        "min_doc_count": 0     // כלול גם ימים ללא orders
      },
      "aggs": {
        "daily_revenue": { "sum": { "field": "total" } }
      }
    },

    // range — טווחים מותאמים
    "price_ranges": {
      "range": {
        "field": "total",
        "ranges": [
          { "key": "cheap",     "to": 100 },
          { "key": "medium",    "from": 100, "to": 500 },
          { "key": "expensive", "from": 500 }
        ]
      }
    }
  }
}`,
      },
      { type: 'heading', text: 'Nested Aggregations — עוצמה אמיתית' },
      {
        type: 'code',
        lang: 'json',
        caption: 'Dashboard query — מדדים מורכבים',
        code: `// "הכנסה לפי קטגוריה לפי חודש" — Kibana-style
POST /orders/_search
{
  "size": 0,
  "aggs": {
    "by_month": {
      "date_histogram": {
        "field": "date",
        "calendar_interval": "month"
      },
      "aggs": {
        "by_category": {
          "terms": { "field": "category", "size": 5 },
          "aggs": {
            "revenue": { "sum": { "field": "total" } },
            "avg_order": { "avg": { "field": "total" } }
          }
        },
        "monthly_total": { "sum": { "field": "total" } }
      }
    }
  }
}

// Response מציג: כל חודש → top 5 categories → revenue + avg`,
      },
      { type: 'tip', text: 'size: 0 בבקשות aggregation — אל תחזיר documents, רק aggregations. חוסך bandwidth ומהיר יותר. cardinality aggregation משתמש ב-HyperLogLog Sketch — מהיר אך קירוב (~5% error). לdefinitive count — השתמש ב-scripted_metric.' },
    ],
    questionBank: [
      {
        id: 'ea-q1',
        text: 'מה ההבדל בין Metric ל-Bucket aggregation?',
        options: [
          'Metric יותר מהיר מBucket',
          'Metric מחשב מדדים על שדות מספריים (avg, sum, max); Bucket מקבץ documents לדליים (terms, date_histogram)',
          'Bucket מחשב מדדים; Metric מקבץ',
          'הם זהים — שמות שונים לאותו דבר',
        ],
        correct: 1,
        explanation: 'Metric: מספר אחד מחושב — avg(price), sum(revenue), max(score). Bucket: מקבץ documents לקבוצות — by category, by day, by price range. כוח אמיתי: nested aggs = Bucket → Metric (avg revenue per category per month).',
      },
      {
        id: 'ea-q2',
        text: 'מדוע cardinality aggregation מחזיר קירוב ולא ערך מדויק?',
        options: [
          'Elasticsearch לא תומך בcount מדויק',
          'משתמש ב-HyperLogLog Sketch — מבנה נתונים שמשתמש ב-RAM מינימלי (כמה KB) לקירוב COUNT DISTINCT במדויקות ~5%',
          'מדויק רק עד 10,000 ערכים ייחודיים',
          'תלוי בshard count',
        ],
        correct: 1,
        explanation: 'COUNT DISTINCT מדויק דורש שמירת כל הערכים הייחודיים — לא ניתן לסקייל. HyperLogLog: אלגוריתם probabilistic שמשתמש ב-~10KB לקירוב millions of distinct values עם שגיאה של ~5%. לרוב use-cases זה מספיק. למדויק: scripted_metric (יקר יותר).',
      },
      {
        id: 'ea-q3',
        text: 'מה date_histogram aggregation ולמה calendar_interval עדיף על fixed_interval?',
        options: [
          'אין הבדל — שניהם זהים',
          'calendar_interval (1d, 1M, 1y) מתחשב בDST וחודשים בגדלים שונים; fixed_interval (60m, 7d) קבוע תמיד',
          'fixed_interval מהיר יותר מcalendar_interval',
          'calendar_interval עובד רק בUtc',
        ],
        correct: 1,
        explanation: 'fixed_interval: 7d תמיד בדיוק 7*24h. calendar_interval: 1w = שבוע לוח (Sunday-Saturday), 1M = ינואר ≠ פברואר. לdashboards עסקיים: calendar_interval עדיף — "חודש ינואר" משמעותי יותר מ"30 ימים". עם time_zone: "Asia/Jerusalem" לתצוגה נכונה.',
      },
      {
        id: 'ea-q4',
        text: 'מה Pipeline aggregation ומה דוגמה לשימוש?',
        options: [
          'aggregation שפועל על network pipeline',
          'aggregation שמשתמש ב-output של aggregation אחר — למשל: avg_bucket מחשב ממוצע של buckets, derivative מחשב שיפוע',
          'aggregation לstreaming data בלבד',
          'pipeline = aggregation עם nested aggs',
        ],
        correct: 1,
        explanation: 'Pipeline aggs פועלות על תוצאות aggregations אחרות. avg_bucket: ממוצע של daily_revenue buckets. max_bucket: הbucket עם הערך הגבוה. derivative: שינוי בין buckets (trend). cumulative_sum: סכום מצטבר. שימושי לtime-series analytics ב-Kibana.',
      },
    ],
  },

  {
    id: 'es-performance',
    title: 'Shards, Performance ו-Index Lifecycle',
    summary: 'Shards, Replicas, ILM, performance tuning ו-best practices',
    emoji: '⚡',
    content: [
      { type: 'heading', text: 'Shards ו-Replicas — יסודות' },
      {
        type: 'code',
        lang: 'text',
        caption: 'Shards — איך Elasticsearch מחלק נתונים',
        code: `Index "products" עם 3 primary shards + 1 replica:

Node 1:  [P0] [R1] [R2]
Node 2:  [P1] [R0] [R2]
Node 3:  [P2] [R0] [R1]

P = Primary shard — כתיבות קוראות כאן תחילה
R = Replica shard — עותק לזמינות + קריאות מקביל

כמה shards לבחור?
  ● כלל אצבע: 10-50GB לshard
  ● לא ניתן לשנות primary shards לאחר יצירה!
  ● יותר מדי shards = overhead (memory + CPU)
  ● פחות מדי = bottleneck על search parallelism

חישוב: 500GB data / 30GB per shard ≈ 17 shards`,
      },
      { type: 'heading', text: 'Index Lifecycle Management (ILM)' },
      {
        type: 'code',
        lang: 'json',
        caption: 'ILM Policy לlog data',
        code: `PUT /_ilm/policy/logs-policy
{
  "policy": {
    "phases": {
      "hot": {
        "min_age": "0ms",
        "actions": {
          "rollover": {
            "max_size": "50GB",
            "max_age": "1d"
          },
          "set_priority": { "priority": 100 }
        }
      },
      "warm": {
        "min_age": "7d",
        "actions": {
          "shrink":  { "number_of_shards": 1 },
          "forcemerge": { "max_num_segments": 1 },
          "set_priority": { "priority": 50 }
        }
      },
      "cold": {
        "min_age": "30d",
        "actions": {
          "freeze": {},
          "set_priority": { "priority": 0 }
        }
      },
      "delete": {
        "min_age": "90d",
        "actions": { "delete": {} }
      }
    }
  }
}`,
      },
      { type: 'heading', text: 'Performance Tuning' },
      {
        type: 'table',
        caption: 'Performance Best Practices',
        headers: ['תחום', 'Best Practice', 'למה'],
        rows: [
          ['Indexing', 'Bulk API + size 5-15MB', 'מפחית HTTP overhead'],
          ['Indexing', 'refresh_interval: 30s (bulk load)', 'מפחית segment merges'],
          ['Mapping', 'לא לאחסן שדות מיותרים', 'מפחית storage ו-indexing time'],
          ['Queries', 'filter במקום must לbooleans', 'cached + ללא score חישוב'],
          ['Queries', 'אל תשתמש ב-wildcard', 'סריקה ליניארית = איטי'],
          ['Shards', 'לא יותר מ-50GB לshard', 'אחרת merges יקרים'],
          ['Heap', 'לא יותר מ-50% RAM, max 32GB', 'JVM compressed oops'],
          ['Replicas', '0 בזמן bulk load, אחר כך 1', 'מהיר יותר ב-x2'],
        ],
      },
      {
        type: 'code',
        lang: 'json',
        caption: 'הגדרות לבulk indexing מהיר',
        code: `// לפני bulk load — כיבוי refresh ו-replicas
PUT /products/_settings
{
  "index": {
    "refresh_interval": "-1",      // כיבוי refresh
    "number_of_replicas": 0        // אין replicas
  }
}

// bulk load...
POST /_bulk
{ ... }

// אחרי bulk load — החזרה לnormal
PUT /products/_settings
{
  "index": {
    "refresh_interval": "1s",
    "number_of_replicas": 1
  }
}

// Force merge (לread-only historical data)
POST /products/_forcemerge?max_num_segments=1`,
      },
      { type: 'tip', text: 'JVM Heap לElasticsearch: הגדר ל-50% מה-RAM הזמין, מקסימום 30-31GB. מעל 32GB — JVM מאבד compressed object pointers (oops) ומשתמש ביותר זיכרון. דוגמה: שרת 64GB RAM = Elasticsearch heap 30GB, שאר 34GB לOS file system cache.' },
    ],
    questionBank: [
      {
        id: 'ep-q1',
        text: 'מה ההבדל בין Primary Shard ל-Replica Shard?',
        options: [
          'Primary גדול יותר מReplica',
          'Primary: קולט כתיבות תחילה ומגדיר את הנתון; Replica: עותק לזמינות גבוהה + מגביר throughput קריאה',
          'Replica מהיר יותר מPrimary לחיפוש',
          'Primary ו-Replica נמצאים תמיד באותו node',
        ],
        correct: 1,
        explanation: 'Primary shard: כל document נכתב אליו תחילה. Replica: עותק synchronous של Primary — תמיד על node שונה. אם Primary node נכשל, Replica מתמנה ל-Primary. Replicas גם משרתים read requests — מגביר throughput קריאה ליניארית.',
      },
      {
        id: 'ep-q2',
        text: 'מדוע לא ניתן לשנות מספר Primary Shards לאחר יצירת index?',
        options: [
          'הגבלה טכנית של Docker בלבד',
          'document routing מחושב לפי מספר primary shards: shard = hash(id) % num_shards. שינוי ישבש את מיקום כל document',
          'זוהי הגבלה של Lucene בלבד',
          'ניתן לשנות אך רק ב-production mode',
        ],
        correct: 1,
        explanation: 'Routing: כל document ממופה לshard = hash(_id) % number_of_primary_shards. שינוי num_shards = שינוי mapping של כל document = לא ניתן למצוא documents קיימים. הפתרון: Reindex לindex חדש עם מספר shards שונה. לכן: תכנן נכון מהתחלה.',
      },
      {
        id: 'ep-q3',
        text: 'מה ILM ומתי הוא חיוני?',
        options: [
          'כלי לbackup של indices',
          'Index Lifecycle Management — ניהול אוטומטי של מחזור חיים: hot (כתיבה) → warm (קריאה) → cold (archive) → delete',
          'כלי לניטור cluster health',
          'ניהול גרסאות של mappings',
        ],
        correct: 1,
        explanation: 'ILM חיוני לlog/metric data: נתונים חמים (היום) = fast SSD, replicas. נתונים פושרים (שבוע ישן) = HDD, shrink. נתונים קרים (חודש ישן) = frozen/searchable snapshots. מחיקה אוטומטית אחרי 90 יום. חוסך עשרות % בעלויות storage.',
      },
      {
        id: 'ep-q4',
        text: 'מדוע מגבילים JVM Heap ל-30-31GB גם בשרת עם 128GB RAM?',
        options: [
          'Elasticsearch לא יכול להשתמש ביותר מ-32GB RAM',
          'מעל 32GB JVM עובר מ-compressed oops (4 bytes per pointer) ל-full 64-bit pointers (8 bytes) — שימוש גבוה יותר בזיכרון, GC קשה יותר',
          'הגבלת רישיון של Elastic',
          '32GB הוא הmaksimum של DDR4 per channel',
        ],
        correct: 1,
        explanation: 'JVM Compressed Oops: מתחת ל-32GB, JVM משתמש ב-35-bit pointers (4 bytes). מעל 32GB: full 64-bit (8 bytes) — ~50% יותר memory overhead, GC pressureגדל. לכן: 30-31GB heap = maximum. שאר RAM (למשל 34GB מ-64GB) = OS File System Cache שמזרז Lucene reads.',
      },
    ],
  },

  {
    id: 'es-nodejs',
    title: 'Elasticsearch ב-Node.js',
    summary: '@elastic/elasticsearch client, full-text search ו-autocomplete',
    emoji: '🟢',
    content: [
      { type: 'heading', text: 'התקנה וחיבור' },
      {
        type: 'code',
        lang: 'bash',
        caption: 'התקנה',
        code: `npm install @elastic/elasticsearch`,
      },
      {
        type: 'code',
        lang: 'javascript',
        caption: 'חיבור ל-Elasticsearch',
        code: `const { Client } = require('@elastic/elasticsearch');

const client = new Client({
  node: process.env.ELASTICSEARCH_URL || 'http://localhost:9200',
  auth: {
    username: process.env.ES_USERNAME || 'elastic',
    password: process.env.ES_PASSWORD,
  },
  tls: {
    rejectUnauthorized: process.env.NODE_ENV === 'production',
  },
});

// בדיקת חיבור
async function checkConnection() {
  try {
    const info = await client.info();
    console.log('Connected to Elasticsearch:', info.version.number);
  } catch (err) {
    console.error('Connection failed:', err.message);
    process.exit(1);
  }
}`,
      },
      { type: 'heading', text: 'CRUD ב-Node.js' },
      {
        type: 'code',
        lang: 'javascript',
        caption: 'Index, Get, Update, Delete',
        code: `// יצירת/עדכון מסמך
await client.index({
  index: 'products',
  id: product.id,
  document: {
    name: product.name,
    price: product.price,
    category: product.category,
    in_stock: product.stock > 0,
    created_at: new Date().toISOString(),
  },
});

// קריאת מסמך
const { _source } = await client.get({ index: 'products', id: '1' });

// עדכון חלקי
await client.update({
  index: 'products',
  id: '1',
  doc: { price: 4799, in_stock: false },
});

// מחיקה
await client.delete({ index: 'products', id: '1' });

// Bulk indexing — הדרך הנכונה לsync מDB
async function syncProducts(products) {
  const operations = products.flatMap(p => [
    { index: { _index: 'products', _id: p.id } },
    { name: p.name, price: p.price, category: p.category },
  ]);

  const { errors, items } = await client.bulk({ operations });
  if (errors) {
    const failed = items.filter(i => i.index?.error);
    console.error('Bulk errors:', failed.length);
  }
}`,
      },
      { type: 'heading', text: 'Full-Text Search ב-Node.js' },
      {
        type: 'code',
        lang: 'javascript',
        caption: 'Search function מלאה',
        code: `async function searchProducts({ query, category, minPrice, maxPrice, page = 1, size = 10 }) {
  const must = [];
  const filter = [];

  if (query) {
    must.push({
      multi_match: {
        query,
        fields: ['name^3', 'description^1', 'tags^2'],
        fuzziness: 'AUTO',        // סובלנות לשגיאות כתיב
      },
    });
  }

  if (category) filter.push({ term: { category } });
  if (minPrice || maxPrice) {
    filter.push({ range: { price: { gte: minPrice, lte: maxPrice } } });
  }
  filter.push({ term: { in_stock: true } });

  const { hits } = await client.search({
    index: 'products',
    from: (page - 1) * size,
    size,
    query: {
      bool: {
        must: must.length ? must : [{ match_all: {} }],
        filter,
      },
    },
    sort: query ? ['_score'] : [{ price: 'asc' }],
    highlight: {
      fields: { name: {}, description: { fragment_size: 150 } },
    },
  });

  return {
    total: hits.total.value,
    products: hits.hits.map(h => ({ ...h._source, _id: h._id, highlight: h.highlight })),
  };
}`,
      },
      { type: 'heading', text: 'Autocomplete ב-Node.js' },
      {
        type: 'code',
        lang: 'javascript',
        caption: 'Autocomplete עם completion suggester',
        code: `// Mapping לautocomplete
await client.indices.putMapping({
  index: 'products',
  properties: {
    name_suggest: {
      type: 'completion',
      analyzer: 'simple',
    },
  },
});

// Index עם suggest field
await client.index({
  index: 'products',
  document: {
    name: 'iPhone 15 Pro',
    name_suggest: {
      input: ['iPhone', 'iPhone 15', 'iPhone 15 Pro', 'Apple iPhone'],
      weight: 10, // priority
    },
  },
});

// Autocomplete query
async function autocomplete(prefix) {
  const { suggest } = await client.search({
    index: 'products',
    suggest: {
      product_suggest: {
        prefix,
        completion: {
          field: 'name_suggest',
          size: 5,
          fuzzy: { fuzziness: 1 },
        },
      },
    },
  });

  return suggest.product_suggest[0].options.map(o => ({
    text: o.text,
    id: o._id,
  }));
}`,
      },
      { type: 'tip', text: 'Sync strategy: אל תכתוב ישירות ל-Elasticsearch מהAPI. Pattern מומלץ: כתוב ל-PostgreSQL/MongoDB → אחרי commit מוצלח → index ל-Elasticsearch. לsync ראשוני: script עם Bulk API. לsync ongoing: CDC (Change Data Capture) עם Debezium, או queue (Kafka/RabbitMQ).' },
    ],
    questionBank: [
      {
        id: 'en-q1',
        text: 'מה fuzziness: "AUTO" עושה ב-match query?',
        options: [
          'מחפש בכל ה-indices אוטומטית',
          'מאפשר סובלנות לשגיאות כתיב: למילות 1-2 תווים = 0 שגיאות, 3-5 = 1 שגיאה, 6+ = 2 שגיאות',
          'מחפש רק בשדות עם analyzer auto',
          'ממיר את החיפוש לregex אוטומטית',
        ],
        correct: 1,
        explanation: 'fuzziness AUTO: Levenshtein distance — מספר edit operations (insert/delete/substitute/transpose). 0 תווים: 0 שגיאות. 1-2: 0. 3-5: 1. 6+: 2. "iphone" עם fuzziness=1 ימצא גם "iPhon", "iphon". חיוני ל-search UX שסובל שגיאות כתיב.',
      },
      {
        id: 'en-q2',
        text: 'מה completion suggester ולמה הוא מהיר לautocomplete?',
        options: [
          'suggester שמשתמש בmatch_phrase_prefix',
          'מבנה נתונים מיוחד (FST) שנטען ל-heap — in-memory lookup בO(prefix length), מהיר מאוד לautocomplete',
          'suggester שמחפש ב-wildcard',
          'מהיר כי משתמש ב-Redis cache',
        ],
        correct: 1,
        explanation: 'Completion suggester משתמש ב-Finite State Transducer (FST) — in-memory data structure שנטען ב-Node heap. Lookup = O(prefix length), ללא disk I/O. עדיף בהרבה על match_phrase_prefix (שסורק segments) לautocomplete use-case. Tradeoff: צריך לindex מראש את כל הprefixes.',
      },
      {
        id: 'en-q3',
        text: 'מה Pattern נכון לsync בין PostgreSQL ל-Elasticsearch?',
        options: [
          'כתוב ישירות ל-Elasticsearch במקום PostgreSQL',
          'כתוב ל-PostgreSQL תחילה → אחרי commit → index ל-ES. לסינכרון ongoing: CDC (Debezium) או Queue',
          'כתוב לשניהם במקביל ב-transaction',
          'השתמש ב-PostgreSQL FDW לsync אוטומטי',
        ],
        correct: 1,
        explanation: 'ES אינו source of truth. Pattern: DB commit ראשון (ACID) → אחר כך ES index. אם ES נכשל: retry queue. לsync מתמשך: Debezium (CDC מ-PostgreSQL WAL) → Kafka → ES consumer. לsync ראשוני: Bulk API script. מבטיח consistency.',
      },
      {
        id: 'en-q4',
        text: 'מה client.helpers.bulk() שונה מ-client.bulk() רגיל?',
        options: [
          'helpers.bulk() יותר מהיר',
          'helpers.bulk() תומך ב-async generator, chunking אוטומטי, retry על שגיאות ו-stats — עדיף לindexing נתונים גדולים',
          'client.bulk() תומך ביותר operations',
          'הם זהים — רק alias שונה',
        ],
        correct: 1,
        explanation: 'client.helpers.bulk(): High-level helper — תומך ב-async generator (stream data מDB), chunking אוטומטי ל-batches של הגודל הנכון, retry על failures, statistics (indexed, failed). client.bulk(): low-level — חייב לחשב chunks ידנית. לindexing גדול: helpers.bulk() עדיף.',
      },
    ],
  },

  {
    id: 'es-interview',
    title: 'שאלות ראיון — Elasticsearch',
    summary: 'שאלות ראיון נפוצות ב-Elasticsearch עם תשובות מלאות',
    emoji: '🎯',
    content: [
      { type: 'heading', text: 'שאלות ראיון — רמה בינונית' },
      {
        type: 'table',
        caption: 'שאלות ותשובות — ארכיטקטורה',
        headers: ['שאלה', 'תשובה קצרה'],
        rows: [
          ['מה הבדל Shard ל-Replica?', 'Primary shard = unit of data. Replica = copy לzavailability + read throughput'],
          ['מתי תשתמש ב-keyword vs text?', 'keyword: filter/sort/agg (exact). text: full-text search (analyzed)'],
          ['למה לא לשנות primary shards?', 'routing תלוי במספרם: hash(id) % shards — שינוי שובר location של documents'],
          ['מה Near Real-Time (NRT)?', 'documents נכתבים לsegment בRAM ומוצגים לחיפוש אחרי refresh (ברירת מחדל: 1s)'],
          ['מה Yellow/Red cluster status?', 'Green=all shards assigned. Yellow=unassigned replicas. Red=unassigned primary shards'],
        ],
      },
      {
        type: 'table',
        caption: 'שאלות ותשובות — Queries',
        headers: ['שאלה', 'תשובה קצרה'],
        rows: [
          ['filter vs must ב-bool query?', 'filter: no scoring + cached → מהיר. must: contributes to relevance score'],
          ['מה fuzziness?', 'סובלנות לשגיאות כתיב (Levenshtein distance) — AUTO מחשב לפי אורך מילה'],
          ['מה multi_match?', 'חיפוש באותה query על כמה fields + boosting לפי חשיבות'],
          ['מה highlight?', 'מחזיר קטע הטקסט עם המילות חיפוש מודגשות — לUX טוב'],
          ['מה match_all?', 'מחזיר כל documents עם score 1.0 — לdashboards ללא חיפוש'],
        ],
      },
      { type: 'heading', text: 'שאלות System Design' },
      {
        type: 'code',
        lang: 'text',
        caption: 'שאלות System Design נפוצות',
        code: `Q: כיצד תעצב search ל-e-commerce עם מיליון מוצרים?
A: ● Index: products עם 3-5 primary shards + 1 replica
   ● Mapping: name (text+keyword multifield), price (float),
     category (keyword), tags (keyword), in_stock (boolean)
   ● ILM: לא נחוץ (data לא מיושן)
   ● Search: bool query — must: multi_match על name/desc,
     filter: in_stock, category, price range
   ● Relevance: boosting לפי rating + function_score
   ● Autocomplete: completion suggester על name_suggest
   ● Sync: PostgreSQL → Debezium → Kafka → ES consumer

Q: ELK Stack — הסבר ארכיטקטורה
A: Elasticsearch: store + search
   Logstash: pipeline (collect, transform, send)
   Kibana: dashboards + visualization
   Beats (Filebeat, Metricbeat): lightweight shippers
   ↓
   Filebeat (כל server) → Logstash/ingest node →
   Elasticsearch → Kibana dashboards

Q: איך מתמודדים עם index שגדל מ-TB ליום?
A: ILM: hot→warm→cold→delete
   Data Streams: alias → rollover automatically
   Searchable Snapshots: S3 mount לcold data
   Frozen tier: נגיש אך לא ב-RAM

Q: מה Split Brain ואיך ES מונע אותו?
A: Split Brain: שני masters במקביל ← נתונים מתפצלים
   ES Prevention: minimum_master_nodes = (N/2)+1
   ES 7+: election process בnew algorithm — לא צריך לhardcode`,
      },
      { type: 'heading', text: 'Troubleshooting נפוץ בראיון' },
      {
        type: 'code',
        lang: 'json',
        caption: 'שאלות Troubleshooting',
        code: `// Q: לא מוצאים document שזה עתה indexed
// A: Near Real-Time — חיכו לrefresh (1s)
//    או: index עם refresh=wait_for

PUT /products/_doc/1?refresh=wait_for
{ "name": "test" }

// Q: שגיאת "Fielddata is disabled on text fields"
// A: לא ניתן לעשות agg/sort על text field
//    הפתרון: הוסף .keyword sub-field

"name": {
  "type": "text",
  "fields": { "raw": { "type": "keyword" } }
}
// sort על name.raw  ✅

// Q: Cluster status = Yellow
// A: Replica shards לא מוקצות — בד"כ כי יש node אחד בלבד
//    Production חייב לפחות 2 nodes
//    בdevelopment: set replicas to 0

PUT /*/_settings
{ "index": { "number_of_replicas": 0 } }

// Q: OOM (Out of Memory) ב-Elasticsearch
// A: Heap גדול מ-32GB, fielddata cache גדול,
//    יותר מדי shards (כל shard = RAM)
//    פתרון: reduce heap, add nodes, reduce shards`,
      },
      { type: 'tip', text: 'בראיון Elasticsearch: הסבר שאתה מבין את ההבדל text/keyword — זו הטעות הנפוצה ביותר. הוכח שאתה יודע לתכנן mapping מראש. ציין שאתה מכיר ILM לlog data. הדגם הבנת filter vs must לperformance. ראיון סניור: ארכיטקטורת ELK מלאה + sync strategy.' },
    ],
    questionBank: [
      {
        id: 'ei2-q1',
        text: 'בראיון: "מה Yellow cluster status ואיך מתקנים?"',
        options: [
          'Yellow = cluster קורס ודורש restart',
          'Yellow = כל primary shards מוקצים אך חלק מreplicas לא — בד"כ כי אין מספיק nodes. פתרון: הוסף node, או הפחת replicas ב-development',
          'Yellow = performance בעיה בלבד ללא השפעה על data',
          'Yellow = cluster מתחמם יתר על המידה',
        ],
        correct: 1,
        explanation: 'Green: כל shards (primary + replica) מוקצים. Yellow: כל primaries מוקצים, חלק מreplicas לא — data זמין אך ללא redundancy. Red: primary shard לא מוקצה — data loss אפשרי. Development עם node אחד → Yellow (replica לא יכולה להיות על אותו node).',
      },
      {
        id: 'ei2-q2',
        text: 'בראיון: "document indexed אך לא נמצא בחיפוש — למה?"',
        options: [
          'Elasticsearch לא תומך בreal-time search',
          'Near Real-Time (NRT): document נכתב ל-in-memory buffer ונגיש לחיפוש רק אחרי refresh (ברירת מחדל: 1 שנייה)',
          'שגיאת נתב — document הלך לshard שגוי',
          'חייבים לבצע reindex אחרי כל כתיבה',
        ],
        correct: 1,
        explanation: 'NRT: Lucene כותב לin-memory buffer → refresh (כל 1s) → נוצר segment חדש → נגיש לחיפוש. ב-test: POST /index/_refresh או index עם ?refresh=wait_for. ב-production: 1s delay מקובל. GET /_doc/id מחזיר מיד (עובד מtranslog, לא מsegments).',
      },
      {
        id: 'ei2-q3',
        text: 'בראיון: "Fielddata is disabled on text fields" — מה הסיבה והפתרון?',
        options: [
          'text fields לא תומכים בחיפוש',
          'לא ניתן לsort/aggregate על text fields ישירות. פתרון: הוסף sub-field keyword, או הפעל fielddata=true (לא מומלץ — גוזל heap)',
          'צריך לשדרג את גרסת Elasticsearch',
          'שגיאת הרשאות על ה-field',
        ],
        correct: 1,
        explanation: 'text fields = analyzed — כל הערכים מנותחים למילים ולא ניתן לsort/agg על "מה הוזן". Fielddata טוען את כל הvalues ל-heap — יקר מאוד. הפתרון הנכון: keyword sub-field (name.raw) שנבנה ב-mapping מלכתחילה. fielddata=true רק במקרים חריגים.',
      },
      {
        id: 'ei2-q4',
        text: 'בראיון: "כיצד תסנכרן מיליון מוצרים מPostgreSQL ל-Elasticsearch?"',
        options: [
          'כתיבה לשניהם בו זמנית מה-API עם transaction',
          'Bulk API לsync ראשוני + CDC (Debezium → Kafka → Consumer) לsync מתמשך; Elasticsearch אינו source of truth',
          'PostgreSQL Foreign Data Wrapper לElasticsearch',
          'pg_cron שמריץ COPY לES כל דקה',
        ],
        correct: 1,
        explanation: 'Initial sync: script שמושך מDB בbatches ושולח Bulk API ל-ES. Ongoing sync: Debezium עוקב אחרי PostgreSQL WAL (Write-Ahead Log) → שינויים → Kafka topic → ES Consumer שמבצע index/update/delete. מבטיח eventual consistency בלי dual-write transactions.',
      },
      {
        id: 'ei2-q5',
        text: 'מה Data Streams ב-Elasticsearch?',
        options: [
          'Streaming API לקריאת documents',
          'abstraction על גבי time-series indices עם rollover אוטומטי — כותבים לdata stream, ES מנהל את ה-indices מאחורה',
          'real-time streaming כמו Kafka',
          'API לstreaming bulk indexing',
        ],
        correct: 1,
        explanation: 'Data Streams: מיועד לtime-series data (logs, metrics, events). מוגדר פעם אחת → ES יוצר indices אוטומטית (logs-2024.01.01-000001) ומבצע rollover לפי ILM. כותבים תמיד ל-stream name, קוראים מכל ה-backing indices. מחליף דפוס של Index Templates + ILM ידני.',
      },
    ],
  },
]
