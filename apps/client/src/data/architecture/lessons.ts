import type { Lesson } from '../../types'

export const architectureLessons: Lesson[] = [
  {
    id: 'intro',
    title: 'מבוא לארכיטקטורת תוכנה',
    summary: 'מה זה ארכיטקטורה, מהם NFR, ADR ואיך מקבלים החלטות ארכיטקטוניות',
    emoji: '🏗️',
    content: [
      { type: 'heading', text: 'מה זה ארכיטקטורת תוכנה?' },
      {
        type: 'text',
        text: 'ארכיטקטורת תוכנה היא הקבלת ההחלטות הגדולות — אלה שקשה לשנות אחר כך. כיצד מחולקת המערכת לרכיבים, איך הם מתקשרים, ואיך ישיגו את הדרישות הלא-פונקציונליות: מהירות, אמינות, ביטחון, יכולת הרחבה.',
      },
      { type: 'heading', text: 'Functional vs Non-Functional Requirements' },
      {
        type: 'table',
        caption: 'סוגי דרישות',
        headers: ['סוג', 'שאלה', 'דוגמה'],
        rows: [
          ['Functional (FR)', 'מה המערכת עושה?', 'משתמש יכול לבצע הזמנה'],
          ['Non-Functional (NFR)', 'כמה טוב היא עושה זאת?', 'ההזמנה מתבצעת תוך 200ms'],
          ['Constraint', 'מה אסור/חייב?', 'חייב לרוץ על AWS, GDPR'],
        ],
      },
      { type: 'heading', text: 'Quality Attributes (ה-"ilities")' },
      {
        type: 'table',
        caption: 'תכונות איכות עיקריות',
        headers: ['תכונה', 'משמעות'],
        rows: [
          ['Scalability', 'יכולת להתמודד עם עומס גובר'],
          ['Availability', 'אחוז הזמן שהמערכת זמינה (SLA)'],
          ['Reliability', 'עמידות בתקלות — מספר שגיאות לזמן'],
          ['Maintainability', 'כמה קל לשנות ולתקן'],
          ['Security', 'הגנה מפני גישה לא מורשית'],
          ['Performance', 'מהירות תגובה ו-throughput'],
          ['Observability', 'יכולת לצפות במצב הפנימי'],
        ],
      },
      { type: 'heading', text: 'Architecture Decision Records (ADR)' },
      {
        type: 'text',
        text: 'ADR הוא מסמך קצר שמתעד החלטה ארכיטקטונית: מה ההקשר, מה ההחלטה, מה החלופות שנדחו ולמה. כאשר מישהו חדש מצטרף לצוות — הוא מבין מיד למה הדברים כפי שהם.',
      },
      {
        type: 'code',
        lang: 'markdown',
        caption: 'תבנית ADR סטנדרטית',
        code: `# ADR-001: שימוש ב-PostgreSQL כמסד נתונים ראשי

## Status: Accepted

## Context
המערכת צריכה לשמור נתוני משתמשים עם קשרים מורכבים
ולתמוך בעסקאות ACID.

## Decision
נשתמש ב-PostgreSQL.

## Alternatives Considered
- MySQL — פחות תמיכה ב-JSON ו-window functions
- MongoDB — לא מתאים לנתונים רלציוניים
- DynamoDB — vendor lock-in, מורכבות בשאילתות

## Consequences
+ ACID, JSON support, extensions עשירות
- צוות צריך להכיר PostgreSQL-specific features`,
      },
      {
        type: 'tip',
        text: 'ארכיטקטורה טובה היא זו שמקשה לעשות דברים לא נכונים — לא זו שמשאירה הכל גמיש.',
      },
    ],
    questionBank: [
      {
        id: 'q1',
        text: 'מה ההבדל בין Functional לבין Non-Functional Requirement?',
        options: [
          'FR מתאר מה המערכת עושה, NFR מתאר כמה טוב',
          'FR קשור ל-backend בלבד, NFR ל-frontend',
          'FR נכתב על ידי מפתחים, NFR על ידי לקוחות',
          'אין הבדל — שניהם מתארים תכונות המערכת',
        ],
        correct: 0,
        explanation: 'FR = מה המערכת עושה (פונקציונליות). NFR = כמה טוב היא עושה זאת (ביצועים, זמינות, אבטחה).',
      },
      {
        id: 'q2',
        text: 'מה מטרת ה-ADR?',
        options: [
          'תיעוד החלטות ארכיטקטוניות כולל ההקשר והחלופות',
          'בדיקה אוטומטית של הארכיטקטורה',
          'ניטור ביצועי המערכת בזמן אמת',
          'הגדרת ה-API בין שירותים',
        ],
        correct: 0,
        explanation: 'ADR מתעד למה התקבלה החלטה ארכיטקטונית — ההקשר, ההחלטה, החלופות שנדחו. זה מאפשר לאנשים חדשים להבין את המערכת.',
      },
      {
        id: 'q3',
        text: 'מה זה Availability?',
        options: [
          'אחוז הזמן שהמערכת זמינה ותקינה',
          'מספר הבקשות שהמערכת מטפלת בשנייה',
          'זמן התגובה הממוצע לבקשה',
          'כמה קל לפרוס גרסה חדשה',
        ],
        correct: 0,
        explanation: 'Availability = אחוז הזמן שהמערכת עובדת. SLA של 99.9% = ~8.7 שעות downtime לשנה.',
      },
      {
        id: 'q4',
        text: 'מה זה Observability?',
        options: [
          'היכולת להבין את המצב הפנימי של המערכת מתוך הפלטים שלה',
          'ניהול הרשאות גישה למערכת',
          'בדיקת ביצועים לפני עליה לאוויר',
          'מעקב אחרי שינויים בקוד',
        ],
        correct: 0,
        explanation: 'Observability = logs + metrics + traces — היכולת לשאול שאלות שלא ידעת מראש שתשאל על מצב המערכת.',
      },
      {
        id: 'q5',
        text: 'מה ה-"ilities" מייצגות?',
        options: [
          'תכונות איכות של מערכת — scalability, reliability, maintainability ועוד',
          'ספריות JavaScript פופולריות',
          'שלבי פיתוח ב-Agile',
          'פרוטוקולי תקשורת בין שירותים',
        ],
        correct: 0,
        explanation: 'ה-"ilities" הן תכונות האיכות הלא-פונקציונליות — scalability, reliability, maintainability, security ועוד.',
      },
    ],
  },

  {
    id: 'monolith-vs-microservices',
    title: 'מונוליט מול מיקרוסרביסים',
    summary: 'מתי מונוליט עדיף, מתי מיקרוסרביסים — tradeoffs, strangler fig ו-decomposition',
    emoji: '🔀',
    content: [
      { type: 'heading', text: 'מה זה מונוליט?' },
      {
        type: 'text',
        text: 'מונוליט הוא יחידה פריסתית אחת — כל הקוד בתהליך אחד. זה לא "רע" — רוב מערכות מצליחות התחילו כמונוליט. הבעיה מתחילה כשהמונוליט גדל מאוד ומאות מפתחים עובדים עליו.',
      },
      {
        type: 'table',
        caption: 'מונוליט מול מיקרוסרביסים',
        headers: ['נושא', 'מונוליט', 'מיקרוסרביסים'],
        rows: [
          ['פיתוח ראשוני', '✅ פשוט ומהיר', '❌ תשתית מורכבת מהיום הראשון'],
          ['פריסה', '✅ פשוטה — artifact אחד', '❌ כל שירות בנפרד'],
          ['סקיילינג', '❌ הכל ביחד', '✅ שירות ספציפי בלבד'],
          ['תקלה מבודדת', '❌ תקלה אחת מוריד הכל', '✅ שירות אחד נפגע'],
          ['debug וטרייסינג', '✅ log אחד, stack trace ברור', '❌ distributed tracing נדרש'],
          ['שכפול נתונים', '✅ DB אחד, joins קלים', '❌ כל שירות DB משלו'],
          ['טכנולוגיות', '❌ stack אחד', '✅ כל שירות בשפה מתאימה'],
        ],
      },
      { type: 'heading', text: 'Modular Monolith — האמצע הבריא' },
      {
        type: 'text',
        text: 'Modular Monolith הוא מונוליט שמחולק פנימית למודולים ברורים עם גבולות מוגדרים — כמו מיקרוסרביסים, רק בתוך אותו תהליך. קל יותר לפתח, ואפשר לחלק לשירותים בעתיד כשיש צורך אמיתי.',
      },
      {
        type: 'code',
        lang: 'text',
        caption: 'מבנה Modular Monolith',
        code: `src/
  modules/
    orders/
      OrderService.ts       ← לוגיקה
      OrderRepository.ts    ← DB access
      OrderController.ts    ← HTTP
      order.types.ts
    users/
      UserService.ts
      UserRepository.ts
      UserController.ts
    payments/
      PaymentService.ts
      PaymentRepository.ts

כלל: module לא קורא ישירות ל-repository של module אחר
      תקשורת רק דרך service interface`,
      },
      { type: 'heading', text: 'Strangler Fig Pattern' },
      {
        type: 'text',
        text: 'Strangler Fig הוא דפוס למעבר הדרגתי ממונוליט למיקרוסרביסים. במקום להחליף הכל בבת אחת (מסוכן!), שמים proxy מול המונוליט ומנתבים בהדרגה יכולות לשירותים חדשים.',
      },
      {
        type: 'code',
        lang: 'text',
        caption: 'Strangler Fig — שלבים',
        code: `שלב 1: מונוליט עונה לכל
Client → Proxy → Monolith

שלב 2: שירות Payments חדש
Client → Proxy → /payments/* → PaymentService (new)
                → /*          → Monolith (old)

שלב 3: שירות Orders חדש
Client → Proxy → /payments/* → PaymentService
                → /orders/*  → OrderService (new)
                → /*          → Monolith (shrinking)

שלב 4: המונוליט מוחלף לחלוטין`,
      },
      {
        type: 'tip',
        text: 'מיקרוסרביסים הם פתרון לבעיות של ארגון גדול עם צוותים עצמאיים — לא פתרון טכני טהור. אל תתחיל בהם אם הצוות קטן.',
      },
    ],
    questionBank: [
      {
        id: 'q1',
        text: 'מה היתרון הגדול של מיקרוסרביסים על פני מונוליט?',
        options: [
          'סקיילינג עצמאי של כל שירות ובידוד תקלות',
          'פיתוח מהיר יותר בשלבים הראשונים',
          'קל יותר ל-debug ולעקוב אחרי שגיאות',
          'DB אחד משותף לכל השירותים',
        ],
        correct: 0,
        explanation: 'מיקרוסרביסים מאפשרים לסקייל שירות ספציפי (לא הכל) ולבודד תקלות — שירות אחד נופל לא מוריד את המערכת.',
      },
      {
        id: 'q2',
        text: 'מה זה Modular Monolith?',
        options: [
          'מונוליט עם חלוקה פנימית ברורה למודולים עם גבולות מוגדרים',
          'מונוליט שרץ על מספר שרתים',
          'מיקרוסרביסים שנפרסים יחד',
          'מונוליט שכתוב בכמה שפות',
        ],
        correct: 0,
        explanation: 'Modular Monolith שומר על פשטות הפריסה של מונוליט עם ארגון פנימי נקי — גבולות ברורים בין מודולים.',
      },
      {
        id: 'q3',
        text: 'מה הסיכון הגדול במעבר חד ("big bang") ממונוליט למיקרוסרביסים?',
        options: [
          'כשלון בו-זמני של כל הרכיבים החדשים ללא יכולת rollback',
          'עלויות שרת גבוהות יותר',
          'קוד שכפול בין שירותים',
          'בעיות ב-UI בלבד',
        ],
        correct: 0,
        explanation: 'Big bang = מחליפים הכל בבת אחת. אם משהו לא עובד — אי אפשר לחזור. Strangler Fig הוא הגישה הבטוחה יותר.',
      },
      {
        id: 'q4',
        text: 'מה מטרת ה-Proxy ב-Strangler Fig?',
        options: [
          'ניתוב בקשות לשירות הישן או החדש לפי הנתיב',
          'הצפנת תקשורת בין שירותים',
          'שמירת cache לשאילתות נפוצות',
          'בדיקת הרשאות משתמשים',
        ],
        correct: 0,
        explanation: 'Proxy מחליט לפי ה-route לאן לנתב — לשירות החדש שכבר מוכן, או למונוליט הישן. כך ניתן להעביר הדרגתית.',
      },
      {
        id: 'q5',
        text: 'מונוליט מתאים יותר כאשר:',
        options: [
          'הצוות קטן והמערכת בשלבי ה-MVP הראשונים',
          'יש מאות מפתחים שעובדים במקביל',
          'דרוש סקיילינג עצמאי של רכיבים שונים',
          'כל שירות צריך שפת תכנות אחרת',
        ],
        correct: 0,
        explanation: 'מונוליט אידיאלי לצוות קטן ו-MVP — פשוט לפתח ולתחזק. מיקרוסרביסים מביאים ערך כשיש ארגון גדול עם צוותים עצמאיים.',
      },
    ],
  },

  {
    id: 'layered-clean-arch',
    title: 'Layered & Clean Architecture',
    summary: 'N-Tier, Hexagonal (Ports & Adapters) ו-Clean Architecture — הפרדת אחריות ותלויות',
    emoji: '🧅',
    content: [
      { type: 'heading', text: 'Layered Architecture (N-Tier)' },
      {
        type: 'text',
        text: 'הארכיטקטורה השכבתית מחלקת את האפליקציה לשכבות אנכיות — כל שכבה מדברת רק עם השכבה שמתחתיה. הכי נפוצה: Presentation → Business Logic → Data Access.',
      },
      {
        type: 'code',
        lang: 'text',
        caption: '3-Tier Architecture',
        code: `┌─────────────────────────┐
│  Presentation Layer     │  HTTP Controllers, API endpoints
│  (Controller)           │
└────────────┬────────────┘
             ↓
┌─────────────────────────┐
│  Business Logic Layer   │  Services, Domain Logic, Validation
│  (Service)              │
└────────────┬────────────┘
             ↓
┌─────────────────────────┐
│  Data Access Layer      │  Repositories, DB Queries, ORM
│  (Repository)           │
└─────────────────────────┘`,
      },
      { type: 'heading', text: 'הבעיה: תלות כלפי מטה' },
      {
        type: 'text',
        text: 'בארכיטקטורה שכבתית קלאסית — לוגיקת העסק תלויה ב-DB. אם משנים מ-SQL ל-MongoDB — צריך לשנות גם את ה-Service. זה פוגע ב-testability ובגמישות.',
      },
      { type: 'heading', text: 'Hexagonal Architecture (Ports & Adapters)' },
      {
        type: 'text',
        text: 'הרעיון: הליבה (domain) לא יודעת כלום על העולם החיצון — לא על HTTP, לא על DB. היא מגדירה Ports (interfaces), וה-Adapters מממשים אותם. ה-dependency מצביעה פנימה — לתוך ה-domain.',
      },
      {
        type: 'code',
        lang: 'typescript',
        caption: 'Ports & Adapters — הפרדת ה-domain מה-infrastructure',
        code: `// Port — interface שה-domain מגדיר
interface UserRepository {
  findById(id: string): Promise<User | null>
  save(user: User): Promise<User>
}

// Domain Service — לא יודע כלום על DB
class UserService {
  constructor(private repo: UserRepository) {}

  async promoteToAdmin(userId: string): Promise<void> {
    const user = await this.repo.findById(userId)
    if (!user) throw new Error('User not found')
    user.role = 'admin'
    await this.repo.save(user)
  }
}

// Adapter — מממש את ה-port עם PostgreSQL
class PostgresUserRepository implements UserRepository {
  async findById(id: string) {
    return db.query('SELECT * FROM users WHERE id=$1', [id])
  }
  async save(user: User) {
    return db.query('UPDATE users SET ...', [...])
  }
}

// Adapter חלופי לבדיקות
class InMemoryUserRepository implements UserRepository {
  private store = new Map<string, User>()
  async findById(id: string) { return this.store.get(id) ?? null }
  async save(user: User) { this.store.set(user.id, user); return user }
}`,
      },
      { type: 'heading', text: 'Clean Architecture' },
      {
        type: 'text',
        text: 'Clean Architecture של Uncle Bob מרחיבה את הרעיון עם 4 טבעות מקוננות. כלל הזהב: תלויות מצביעות רק פנימה — השכבה הפנימית לא יודעת על השכבה החיצונית.',
      },
      {
        type: 'code',
        lang: 'text',
        caption: 'Clean Architecture — 4 טבעות',
        code: `         ┌─────────────────────────┐
         │     Frameworks &        │  Express, React, Postgres
         │     Drivers             │  (Infrastructure)
         │   ┌─────────────────┐   │
         │   │   Interface     │   │  Controllers, Presenters
         │   │   Adapters      │   │  Repositories (impl)
         │   │  ┌───────────┐  │   │
         │   │  │  Use Cases│  │   │  Application Business Rules
         │   │  │ ┌───────┐ │  │   │
         │   │  │ │Entities│ │  │   │  Enterprise Business Rules
         │   │  │ └───────┘ │  │   │  (Domain Models)
         │   │  └───────────┘  │   │
         │   └─────────────────┘   │
         └─────────────────────────┘
         ← תלויות מצביעות פנימה בלבד →`,
      },
      {
        type: 'tip',
        text: 'Clean Architecture מוסיפה boilerplate רב — הכי מתאימה לאפליקציות עם לוגיקת עסק מורכבת ולא ל-CRUD פשוט.',
      },
    ],
    questionBank: [
      {
        id: 'q1',
        text: 'מה הבעיה בארכיטקטורה שכבתית קלאסית?',
        options: [
          'שכבת העסקים תלויה בשכבת ה-DB — קשה לבדוק ולהחליף',
          'אי אפשר להוסיף שכבות נוספות',
          'ביצועים איטיים בגלל המעברים בין שכבות',
          'לא תומכת ב-REST API',
        ],
        correct: 0,
        explanation: 'בשכבתית קלאסית ה-Service יודע על ה-Repository הספציפי. שינוי ה-DB = שינוי ה-Service. Hexagonal פותר זאת עם interfaces.',
      },
      {
        id: 'q2',
        text: 'מה זה Port ב-Hexagonal Architecture?',
        options: [
          'Interface שה-domain מגדיר ומצפה שה-infrastructure יממש',
          'פורט רשת שה-שירות מאזין עליו',
          'שכבת ה-DB בארכיטקטורה',
          'ה-HTTP controller של ה-API',
        ],
        correct: 0,
        explanation: 'Port הוא interface — חוזה שה-domain מגדיר. ה-Adapter (infrastructure) מממש אותו. כך ה-domain לא תלוי ב-DB ספציפי.',
      },
      {
        id: 'q3',
        text: 'מה "כלל הזהב" ב-Clean Architecture?',
        options: [
          'תלויות מצביעות רק פנימה — שכבה פנימית לא יודעת על חיצונית',
          'כל שכבה חייבת להכיל בדיוק 3 מחלקות',
          'ה-DB חייב להיות בשכבה הפנימית ביותר',
          'אסור להשתמש ב-ORM',
        ],
        correct: 0,
        explanation: 'הכלל: dependencies point inward. ה-Use Cases לא יודעים על Express או PostgreSQL. זה מאפשר להחליף framework בלי לגעת בלוגיקה.',
      },
      {
        id: 'q4',
        text: 'מה היתרון הגדול של Ports & Adapters לבדיקות?',
        options: [
          'אפשר להחליף ה-DB ב-in-memory implementation בלי לשנות את ה-domain',
          'הבדיקות רצות מהר יותר',
          'אין צורך לכתוב unit tests',
          'הבדיקות כותבות את עצמן אוטומטית',
        ],
        correct: 0,
        explanation: 'InMemoryRepository מממש את אותו interface כמו PostgresRepository. ה-Service לא מבחין — הבדיקות מהירות, ללא DB אמיתי.',
      },
      {
        id: 'q5',
        text: 'מתי Clean Architecture הכי מתאימה?',
        options: [
          'אפליקציות עם לוגיקת עסק מורכבת שתשתנה לאורך זמן',
          'CRUD פשוט עם DB אחד',
          'APIs קטנים עם כמה endpoints',
          'סקריפטים חד-פעמיים',
        ],
        correct: 0,
        explanation: 'Clean Architecture מוסיפה boilerplate ומורכבות. היא משתלמת רק כשיש לוגיקת עסק שמשתנה ואנחנו רוצים להגן עליה מה-infrastructure.',
      },
    ],
  },

  {
    id: 'ddd',
    title: 'Domain-Driven Design (DDD)',
    summary: 'Bounded Contexts, Aggregates, Entities, Value Objects ו-Ubiquitous Language',
    emoji: '🗺️',
    content: [
      { type: 'heading', text: 'מה זה DDD?' },
      {
        type: 'text',
        text: 'Domain-Driven Design (Eric Evans, 2003) היא גישה לפיתוח שמציבה את מודל הדומיין — לוגיקת העסק — במרכז. הקוד צריך לשקף את עולם הבעיה, לא את מגבלות הטכנולוגיה.',
      },
      { type: 'heading', text: 'Ubiquitous Language' },
      {
        type: 'text',
        text: 'שפה משותפת בין מפתחים לבין domain experts (אנשי עסקים). כשה-PM אומר "הזמנה" — הקוד גם אומר Order, לא purchase_record. זה מונע תרגומים שגויים.',
      },
      { type: 'heading', text: 'Bounded Context' },
      {
        type: 'text',
        text: 'Bounded Context הוא גבול שבתוכו מודל מסוים תקף. "לקוח" במערכת ה-CRM שונה מ"לקוח" במערכת החיוב — שתי מחלקות Customer שונות, שני contexts שונים.',
      },
      {
        type: 'table',
        caption: 'אותו מונח — contexts שונים',
        headers: ['מונח', 'Sales Context', 'Billing Context', 'Support Context'],
        rows: [
          ['Customer', 'ליד + הזדמנות', 'חשבון + חיוב', 'פנייה + SLA'],
          ['Order', 'הצעת מחיר', 'חשבונית', 'בקשת שירות'],
          ['Product', 'קטלוג + מחיר', 'SKU + מס', 'מק"ט + תיאור'],
        ],
      },
      { type: 'heading', text: 'Building Blocks' },
      {
        type: 'code',
        lang: 'typescript',
        caption: 'Entity, Value Object ו-Aggregate',
        code: `// Value Object — זהות לפי ערך, immutable
class Money {
  constructor(
    readonly amount: number,
    readonly currency: string,
  ) {
    if (amount < 0) throw new Error('Amount cannot be negative')
  }

  add(other: Money): Money {
    if (this.currency !== other.currency) throw new Error('Currency mismatch')
    return new Money(this.amount + other.amount, this.currency)
  }

  equals(other: Money): boolean {
    return this.amount === other.amount && this.currency === other.currency
  }
}

// Entity — זהות לפי ID
class OrderItem {
  constructor(
    readonly id: string,
    readonly productId: string,
    private quantity: number,
    readonly unitPrice: Money,
  ) {}

  get total(): Money {
    return new Money(this.unitPrice.amount * this.quantity, this.unitPrice.currency)
  }
}

// Aggregate Root — שומר על invariants
class Order {
  private _items: OrderItem[] = []
  private _status: 'pending' | 'confirmed' | 'shipped' = 'pending'

  constructor(readonly id: string, readonly customerId: string) {}

  addItem(productId: string, qty: number, price: Money): void {
    if (this._status !== 'pending') throw new Error('Cannot modify confirmed order')
    const item = new OrderItem(crypto.randomUUID(), productId, qty, price)
    this._items.push(item)
  }

  confirm(): void {
    if (this._items.length === 0) throw new Error('Cannot confirm empty order')
    this._status = 'confirmed'
  }

  get total(): Money {
    return this._items.reduce(
      (sum, item) => sum.add(item.total),
      new Money(0, 'ILS'),
    )
  }
}`,
      },
      {
        type: 'table',
        caption: 'Entity vs Value Object',
        headers: ['', 'Entity', 'Value Object'],
        rows: [
          ['זהות', 'לפי ID', 'לפי ערכים'],
          ['מוטבילות', 'לרוב mutable', 'תמיד immutable'],
          ['דוגמה', 'Order, User, Product', 'Money, Address, Email'],
          ['שוויון', 'id1 === id2', 'amount1 === amount2 && currency1 === currency2'],
        ],
      },
      {
        type: 'tip',
        text: 'Aggregate Root הוא "שומר השער" — גישה לנתונים בתוך ה-Aggregate תמיד דרכו בלבד. הוא אחראי על כל ה-invariants.',
      },
    ],
    questionBank: [
      {
        id: 'q1',
        text: 'מה זה Ubiquitous Language?',
        options: [
          'שפה משותפת בין מפתחים לאנשי עסקים שמשתקפת בקוד',
          'שפת תכנות שרצה על כל פלטפורמה',
          'ה-API שמחבר בין מיקרוסרביסים',
          'שיטת תיעוד קוד אוטומטית',
        ],
        correct: 0,
        explanation: 'Ubiquitous Language = אותם מונחים בכל מקום: שיחות, לוח, קוד. מונע תרגומים שגויים בין עולם העסקים לקוד.',
      },
      {
        id: 'q2',
        text: 'מה ההבדל בין Entity לבין Value Object?',
        options: [
          'Entity מזוהה לפי ID, Value Object מזוהה לפי ערכיו',
          'Entity שמור ב-DB, Value Object בזיכרון בלבד',
          'Entity הוא immutable, Value Object הוא mutable',
          'אין הבדל — זו סתם מינוח שונה',
        ],
        correct: 0,
        explanation: 'Entity = זהות לפי ID (שני Orders שונים גם אם תוכנם זהה). Value Object = זהות לפי ערך (שני Money(100, "ILS") הם שווים).',
      },
      {
        id: 'q3',
        text: 'למה Value Objects צריכים להיות immutable?',
        options: [
          'כדי למנוע state bugs — שינוי Money אחד לא ישפיע על העתקות',
          'כי JavaScript לא תומך במוטציה',
          'כי הם שמורים ב-cache',
          'כדי לחסוך זיכרון',
        ],
        correct: 0,
        explanation: 'אם Money היה mutable, שינוי שלו במקום אחד ישפיע בכל מקום שהועבר אליו. Immutability מבטיחה שה-VO תמיד מייצג את אותו ערך.',
      },
      {
        id: 'q4',
        text: 'מה תפקיד ה-Aggregate Root?',
        options: [
          'שמירה על invariants ושליטה בגישה לכל הרכיבים בתוך ה-Aggregate',
          'שמירת נתונים ב-DB',
          'ניהול תקשורת בין Bounded Contexts',
          'הגדרת ה-API החיצוני',
        ],
        correct: 0,
        explanation: 'Aggregate Root הוא "שומר השער" — רק דרכו ניגשים לרכיבים בתוך ה-Aggregate. הוא מבטיח שה-invariants של כל ה-Aggregate נשמרים.',
      },
      {
        id: 'q5',
        text: 'למה יש Bounded Contexts שונים לאותו מונח כמו "לקוח"?',
        options: [
          'כי "לקוח" פירושו שונה בהקשרים שונים — Sales, Billing, Support',
          'כי כל DB שומר גרסה שונה',
          'כי כל מיקרוסרביס חייב DB נפרד',
          'מסיבות ביצועים בלבד',
        ],
        correct: 0,
        explanation: 'Bounded Context מגדיר איפה מודל מסוים תקף. "לקוח" ב-Sales = ליד. "לקוח" ב-Billing = חשבון לחיוב. אותו מילה, מודלים שונים.',
      },
    ],
  },

  {
    id: 'api-design',
    title: 'API Design — REST, GraphQL & gRPC',
    summary: 'עקרונות REST, versioning, GraphQL tradeoffs, gRPC ומתי להשתמש בכל אחד',
    emoji: '🔌',
    content: [
      { type: 'heading', text: 'REST — עקרונות ליבה' },
      {
        type: 'text',
        text: 'REST (Representational State Transfer) הוא סגנון ארכיטקטוני המבוסס על HTTP. ה-API מנהל resources, והפעולות מתבצעות דרך HTTP methods.',
      },
      {
        type: 'table',
        caption: 'HTTP Methods ב-REST',
        headers: ['Method', 'פעולה', 'Idempotent?', 'דוגמה'],
        rows: [
          ['GET', 'קריאה', '✅ כן', 'GET /users/42'],
          ['POST', 'יצירה', '❌ לא', 'POST /users'],
          ['PUT', 'החלפה מלאה', '✅ כן', 'PUT /users/42'],
          ['PATCH', 'עדכון חלקי', '✅ כן', 'PATCH /users/42'],
          ['DELETE', 'מחיקה', '✅ כן', 'DELETE /users/42'],
        ],
      },
      {
        type: 'code',
        lang: 'text',
        caption: 'REST URL conventions',
        code: `✅ נכון — resources ברבים, היררכיה ברורה
GET    /users              → רשימת משתמשים
POST   /users              → יצירת משתמש
GET    /users/42           → משתמש ספציפי
PATCH  /users/42           → עדכון משתמש
DELETE /users/42           → מחיקת משתמש
GET    /users/42/orders    → הזמנות של משתמש
POST   /users/42/orders    → הזמנה חדשה למשתמש

❌ לא נכון
GET  /getUser?id=42
POST /createNewUser
GET  /user/getAllOrders/42`,
      },
      { type: 'heading', text: 'API Versioning' },
      {
        type: 'table',
        caption: 'שיטות גרסאות ב-API',
        headers: ['שיטה', 'דוגמה', 'יתרון', 'חיסרון'],
        rows: [
          ['URL Path', '/api/v1/users', 'פשוט, ברור ב-logs', 'מזהם ה-URL'],
          ['Header', 'Api-Version: 2024-01', 'URL נקי', 'פחות גלוי'],
          ['Query Param', '/users?version=2', 'קל לבדיקה', 'מסורבל'],
        ],
      },
      { type: 'heading', text: 'GraphQL' },
      {
        type: 'text',
        text: 'GraphQL מאפשר ל-client לבקש בדיוק את השדות שהוא צריך — לא יותר ולא פחות. פותר under-fetching (צריך כמה קריאות) ו-over-fetching (מקבל יותר ממה שצריך).',
      },
      {
        type: 'code',
        lang: 'graphql',
        caption: 'GraphQL Query — רק מה שצריך',
        code: `# REST: GET /users/42 מחזיר 20 שדות, צריך רק 3
# GraphQL: מבקשים בדיוק מה שצריך
query {
  user(id: "42") {
    name
    email
    orders(last: 5) {
      id
      total
      status
    }
  }
}`,
      },
      {
        type: 'table',
        caption: 'REST vs GraphQL vs gRPC',
        headers: ['קריטריון', 'REST', 'GraphQL', 'gRPC'],
        rows: [
          ['מתאים ל', 'Public API כללי', 'Mobile / BFF', 'Internal microservices'],
          ['פרוטוקול', 'HTTP/1.1+', 'HTTP/1.1+', 'HTTP/2'],
          ['סכמה', 'OpenAPI (אופציונלי)', 'חובה (SDL)', 'חובה (Protobuf)'],
          ['ביצועים', 'טוב', 'טוב', 'מצוין (binary)'],
          ['קושי', 'נמוך', 'בינוני', 'גבוה'],
          ['Browser support', '✅', '✅', '❌ (דורש proxy)'],
        ],
      },
      {
        type: 'tip',
        text: 'gRPC מתאים לתקשורת פנימית בין מיקרוסרביסים (ביצועים גבוהים, type-safe). GraphQL מתאים ל-BFF מול mobile. REST לכל השאר.',
      },
    ],
    questionBank: [
      {
        id: 'q1',
        text: 'מה זה idempotent operation?',
        options: [
          'פעולה שניתן לקרוא לה מספר פעמים ותמיד תניב אותו תוצאה',
          'פעולה שרצה רק פעם אחת',
          'פעולה ללא תופעות לוואי',
          'פעולה שמחזירה תמיד 200 OK',
        ],
        correct: 0,
        explanation: 'Idempotent = אותה תוצאה כמה שלא תקרא. DELETE /users/42 פעמיים = אותה תוצאה (המשתמש לא קיים). POST /users פעמיים = שני משתמשים חדשים.',
      },
      {
        id: 'q2',
        text: 'מה זה Over-fetching ב-REST?',
        options: [
          'ה-API מחזיר יותר נתונים ממה שה-client צריך',
          'ה-client שולח יותר בקשות ממה שנדרש',
          'ה-server מעבד יותר בקשות ממה שהוא יכול',
          'הנתונים נשלחים מוצפנים מדי פעמים',
        ],
        correct: 0,
        explanation: 'Over-fetching = REST מחזיר 20 שדות, ה-client צריך רק 3. GraphQL פותר זאת — ה-client מגדיר בדיוק אילו שדות הוא רוצה.',
      },
      {
        id: 'q3',
        text: 'מתי gRPC עדיף על REST?',
        options: [
          'תקשורת פנימית בין מיקרוסרביסים שדורשת ביצועים גבוהים',
          'Public API שנגיש מה-browser',
          'Mobile apps שצריכות גמישות בשדות',
          'Webhooks ו-callbacks',
        ],
        correct: 0,
        explanation: 'gRPC = HTTP/2 + Protobuf (binary) = ביצועים מעולים ו-type-safe. אך לא נתמך ישירות בדפדפן — מיועד לתקשורת פנימית.',
      },
      {
        id: 'q4',
        text: 'מה הכלל לגבי HTTP Method ב-REST — יצירת משאב?',
        options: [
          'POST — כי יצירה אינה idempotent',
          'GET — כי זו בקשה חדשה',
          'PUT — כי אנחנו שולחים נתונים',
          'PATCH — כי אנחנו מעדכנים',
        ],
        correct: 0,
        explanation: 'POST ליצירה — כי POST אינו idempotent. שתי קריאות POST /users יצרו שני משתמשים. PUT לעדכון מלא (idempotent).',
      },
      {
        id: 'q5',
        text: 'מה היתרון של URL Path versioning (/api/v1/...)?',
        options: [
          'פשוט, גלוי ב-logs ב-browser, קל לבדיקה',
          'לא מזהם את ה-URL',
          'ביצועים טובים יותר',
          'אבטחה משופרת',
        ],
        correct: 0,
        explanation: 'URL path versioning (/api/v1/) הכי נפוץ ופשוט — גלוי ב-URL, ב-logs, בכלי debugging. החיסרון: URL ארוך יותר.',
      },
    ],
  },

  {
    id: 'data-architecture',
    title: 'ארכיטקטורת נתונים',
    summary: 'בחירת DB, CQRS, Event Sourcing, Polyglot Persistence ואסטרטגיות caching',
    emoji: '💾',
    content: [
      { type: 'heading', text: 'בחירת מסד נתונים' },
      {
        type: 'table',
        caption: 'סוגי מסדי נתונים',
        headers: ['סוג', 'דוגמאות', 'מתאים ל'],
        rows: [
          ['Relational (SQL)', 'PostgreSQL, MySQL', 'נתונים מובנים, transactions, joins מורכבים'],
          ['Document', 'MongoDB, Firestore', 'נתונים גמישים, JSON, שינויי schema תכופים'],
          ['Key-Value', 'Redis, DynamoDB', 'cache, sessions, leaderboards — גישה מהירה ב-O(1)'],
          ['Column-Family', 'Cassandra, HBase', 'כתיבה מאסיבית, time-series, IoT'],
          ['Graph', 'Neo4j, Amazon Neptune', 'רשתות חברתיות, recommendations, קשרים מורכבים'],
          ['Search', 'Elasticsearch', 'full-text search, log analytics, faceted search'],
        ],
      },
      { type: 'heading', text: 'CQRS — Command Query Responsibility Segregation' },
      {
        type: 'text',
        text: 'CQRS מפריד בין כתיבה (Commands) לקריאה (Queries). ה-Write Side מבצע validation ושומר events. ה-Read Side בונה projections מותאמות לצריכה — לא חייבות להיות באותו DB.',
      },
      {
        type: 'code',
        lang: 'typescript',
        caption: 'CQRS — הפרדה בין Commands לQueries',
        code: `// Command — שינוי מצב
interface PlaceOrderCommand {
  customerId: string
  items: { productId: string; qty: number }[]
}

class PlaceOrderHandler {
  async handle(cmd: PlaceOrderCommand): Promise<string> {
    const order = Order.create(cmd.customerId, cmd.items)
    await this.orderRepo.save(order)
    await this.eventBus.publish(new OrderPlacedEvent(order))
    return order.id
  }
}

// Query — קריאה בלבד, מותאמת לתצוגה
interface OrderSummaryQuery {
  customerId: string
  limit: number
}

class OrderSummaryHandler {
  // קורא מ-Read DB (denormalized, מהיר)
  async handle(q: OrderSummaryQuery): Promise<OrderSummaryDto[]> {
    return this.readDb.query(
      'SELECT * FROM order_summaries WHERE customer_id=$1 LIMIT $2',
      [q.customerId, q.limit],
    )
  }
}`,
      },
      { type: 'heading', text: 'Event Sourcing' },
      {
        type: 'text',
        text: 'במקום לשמור את המצב הנוכחי, Event Sourcing שומר את רצף ה-events שיצרו את המצב. המצב הנוכחי = replay של כל ה-events. תמיד יש audit log מלא.',
      },
      {
        type: 'code',
        lang: 'text',
        caption: 'Event Store vs State Store',
        code: `// State Store (רגיל)
orders table:
  id=1, status="shipped", total=250

// Event Store (Event Sourcing)
events table:
  orderId=1, event="OrderCreated",  data={items:[...]},     at=10:00
  orderId=1, event="PaymentReceived",data={amount:250},     at=10:05
  orderId=1, event="OrderShipped",  data={trackingId:"X"},  at=14:00

מצב נוכחי = replay: Created → PaymentReceived → Shipped`,
      },
      { type: 'heading', text: 'Caching Strategies' },
      {
        type: 'table',
        caption: 'אסטרטגיות caching',
        headers: ['אסטרטגיה', 'תיאור', 'מתאים ל'],
        rows: [
          ['Cache-Aside', 'App מנהל: בדוק cache → DB miss → כתוב ל-cache', 'הכי נפוץ, גמיש'],
          ['Write-Through', 'כתיבה ל-cache וגם ל-DB בו-זמנית', 'קריאות תכופות אחרי כתיבה'],
          ['Write-Behind', 'כתיבה ל-cache מיד, DB אחר כך async', 'עומס כתיבה גבוה'],
          ['Read-Through', 'Cache מושך מה-DB אוטומטית ב-miss', 'פשטות — logic ב-cache layer'],
        ],
      },
      {
        type: 'tip',
        text: 'Cache invalidation היא אחת מ"שתי הבעיות הקשות ב-CS". תמיד הגדר TTL — עדיף stale data קצת מאשר cache שלא נמחק לעולם.',
      },
    ],
    questionBank: [
      {
        id: 'q1',
        text: 'מתי מתאים להשתמש ב-Graph Database?',
        options: [
          'כשהנתונים והיחסים ביניהם הם העיקר — רשתות חברתיות, recommendations',
          'כשצריך transactions ACID',
          'כשיש כמות גדולה של time-series data',
          'כשצריך full-text search',
        ],
        correct: 0,
        explanation: 'Graph DB (Neo4j) מתאים לנתונים שבהם הקשרים הם העיקר: "חברים של חברים", "מי רכש מה שאתה רכשת". SQL joins מורכבים מאוד לזה.',
      },
      {
        id: 'q2',
        text: 'מה עיקרון CQRS?',
        options: [
          'הפרדה בין מודל הכתיבה (Commands) למודל הקריאה (Queries)',
          'שמירת כל ה-queries ב-cache',
          'שימוש ב-DB נפרד לכל microservice',
          'כתיבה אסינכרונית לכל ה-DBs',
        ],
        correct: 0,
        explanation: 'CQRS = Write Side (validation, business rules) ו-Read Side (denormalized projections) — נפרדים. ה-Read Side יכול להיות מסד נתונים שונה, מהיר לקריאה.',
      },
      {
        id: 'q3',
        text: 'מה היתרון הגדול של Event Sourcing?',
        options: [
          'audit log מלא — תמיד אפשר לדעת מה קרה ומתי ולבנות מחדש כל מצב',
          'ביצועים טובים יותר בקריאה',
          'schema פשוט יותר ב-DB',
          'אין צורך ב-backup',
        ],
        correct: 0,
        explanation: 'Event Sourcing = היסטוריה מלאה. אפשר לחזור לכל נקודת זמן, לעשות debugging של מה שקרה, ולבנות projections חדשות מה-events הישנים.',
      },
      {
        id: 'q4',
        text: 'מה זה Cache-Aside pattern?',
        options: [
          'האפליקציה בודקת cache → miss → שואלת DB → שומרת ב-cache',
          'הכתיבה ל-DB מתבצעת תמיד דרך ה-cache',
          'ה-cache מחליף את ה-DB לחלוטין',
          'ה-cache מתעדכן אוטומטית כשה-DB משתנה',
        ],
        correct: 0,
        explanation: 'Cache-Aside: app בודקת cache → hit: מחזירה מהר. miss: שואלת DB, שומרת ב-cache, מחזירה. הכי נפוץ עם Redis.',
      },
      {
        id: 'q5',
        text: 'למה חשוב להגדיר TTL על cache?',
        options: [
          'כדי שנתונים ישנים לא יישארו ל-cache לנצח — cache invalidation',
          'כדי לשפר את ביצועי ה-cache',
          'כי Redis דורש TTL חובה',
          'כדי לחסוך כסף בעלויות ה-cache',
        ],
        correct: 0,
        explanation: 'Cache invalidation קשה. TTL מבטיח שאחרי זמן מוגדר הנתונים יימחקו ויוקראו מחדש — מונע stale data לנצח.',
      },
    ],
  },

  {
    id: 'scalability-resilience',
    title: 'Scalability & Resilience',
    summary: 'Load balancing, Circuit Breaker, Bulkhead, Retry, CAP Theorem ו-Rate Limiting',
    emoji: '⚡',
    content: [
      { type: 'heading', text: 'Horizontal vs Vertical Scaling' },
      {
        type: 'table',
        caption: 'שתי גישות scaling',
        headers: ['', 'Vertical (Scale Up)', 'Horizontal (Scale Out)'],
        rows: [
          ['מה זה', 'שרת גדול יותר (RAM, CPU)', 'יותר שרתים קטנים'],
          ['מגבלה', 'יש תקרה — hardware limit', 'כמעט ללא מגבלה'],
          ['Single point of failure', '❌ כן', '✅ לא'],
          ['עלות', 'יקר מאוד בגדלים גדולים', 'גמיש, pay-as-you-go'],
          ['מתאים ל', 'DB שקשה לפצל', 'Stateless services'],
        ],
      },
      { type: 'heading', text: 'Circuit Breaker' },
      {
        type: 'text',
        text: 'כששירות B כושל, אל תמשיך לשלוח בקשות אליו — זה מצמיע threads ועלול לגרום ל-cascade failure. Circuit Breaker "פותח" אחרי X כשלונות ועוצר את התעבורה.',
      },
      {
        type: 'code',
        lang: 'text',
        caption: 'מצבי Circuit Breaker',
        code: `CLOSED (רגיל)
  → כל בקשה עוברת
  → אם שיעור כשלונות > 50%: עבור ל-OPEN

OPEN (מנותק)
  → כל בקשה נכשלת מיד (fail fast)
  → אחרי 30 שניות: עבור ל-HALF-OPEN

HALF-OPEN (בבדיקה)
  → בקשה אחת "ניסיון"
  → אם הצליחה: חזור ל-CLOSED
  → אם נכשלה: חזור ל-OPEN`,
      },
      { type: 'heading', text: 'Bulkhead Pattern' },
      {
        type: 'text',
        text: 'Bulkhead (מחיצות בספינה) מבדד משאבים בין שירותים. אם שירות A ממלא את ה-thread pool שלו — זה לא ישפיע על שירות B. מונע cascade failure.',
      },
      {
        type: 'code',
        lang: 'typescript',
        caption: 'Retry with Exponential Backoff',
        code: `async function withRetry<T>(
  fn: () => Promise<T>,
  maxAttempts = 3,
  baseDelayMs = 100,
): Promise<T> {
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      return await fn()
    } catch (err) {
      if (attempt === maxAttempts) throw err
      // Exponential backoff + jitter
      const delay = baseDelayMs * 2 ** (attempt - 1) + Math.random() * 50
      await new Promise((r) => setTimeout(r, delay))
    }
  }
  throw new Error('unreachable')
}

// שימוש
const result = await withRetry(() => paymentService.charge(order))`,
      },
      { type: 'heading', text: 'CAP Theorem' },
      {
        type: 'text',
        text: 'ב-distributed system — אפשר לקבל רק 2 מתוך 3: Consistency, Availability, Partition Tolerance. ו-Partition Tolerance הוא בעצם חובה (רשתות תמיד עלולות להיכשל). אז הבחירה האמיתית: CP או AP.',
      },
      {
        type: 'table',
        caption: 'CAP — CP vs AP',
        headers: ['', 'CP (Consistent + Partition Tolerant)', 'AP (Available + Partition Tolerant)'],
        rows: [
          ['בזמן partition', 'מחזיר שגיאה (לא זמין)', 'מחזיר נתונים ישנים (stale)'],
          ['דוגמאות', 'HBase, Zookeeper, Spanner', 'Cassandra, DynamoDB, CouchDB'],
          ['מתאים ל', 'מערכות פיננסיות, transactions', 'shopping cart, social feeds'],
        ],
      },
      {
        type: 'tip',
        text: 'Rate Limiting מגן מפני abuse ו-DDoS. חשב לפי Leaky Bucket (גלישה חלקה) או Token Bucket (פיצוצים קצרים מותרים). תמיד החזר 429 עם Retry-After header.',
      },
    ],
    questionBank: [
      {
        id: 'q1',
        text: 'מה ה-Circuit Breaker פותר?',
        options: [
          'עצירת cascade failure כששירות downstream כושל',
          'הצפנת תקשורת בין שירותים',
          'ניתוב עומסים בין instances',
          'שמירת state בין בקשות',
        ],
        correct: 0,
        explanation: 'Circuit Breaker עוצר בקשות לשירות כושל במקום להמשיך לנסות. זה מונע cascade failure — שירות אחד שנופל לא יוריד את כולם.',
      },
      {
        id: 'q2',
        text: 'מה זה Exponential Backoff?',
        options: [
          'כל retry ממתין זמן ארוך יותר מהקודם — מונע flood על שירות כושל',
          'הפחתת מספר ה-retries בהדרגה',
          'הגדלת ה-timeout בכל ניסיון',
          'ביטול בקשות ישנות כשמגיעות חדשות',
        ],
        correct: 0,
        explanation: 'Exponential Backoff: attempt 1 → 100ms, attempt 2 → 200ms, attempt 3 → 400ms. מונע שכולם יפגעו בשירות כושל בו-זמנית.',
      },
      {
        id: 'q3',
        text: 'מה הבחירה האמיתית שה-CAP Theorem מציב?',
        options: [
          'CP או AP — כי Partition Tolerance הוא חובה ברשתות',
          'Consistency או Availability בלבד',
          'SQL או NoSQL',
          'Sync או Async',
        ],
        correct: 0,
        explanation: 'Partition Tolerance הוא חובה — רשתות תמיד עלולות להיכשל. אז הבחירה היא: CP (consistency + שגיאה בpartition) או AP (זמינות + stale data).',
      },
      {
        id: 'q4',
        text: 'מה Bulkhead מגן מפניו?',
        options: [
          'שירות אחד שממלא משאבים לא ישפיע על שירותים אחרים',
          'חדירת זדונית למערכת',
          'אובדן נתונים בכשל חומרה',
          'בקשות כפולות מה-client',
        ],
        correct: 0,
        explanation: 'Bulkhead מבדד thread pools/connections בין שירותים. אם service A "נחנק" — ה-threads של service B ממשיכים לעבוד.',
      },
      {
        id: 'q5',
        text: 'מה ההבדל בין Vertical לבין Horizontal Scaling?',
        options: [
          'Vertical = שרת גדול יותר; Horizontal = יותר שרתים',
          'Vertical = יותר שרתים; Horizontal = שרת גדול יותר',
          'Vertical = scaling של DB; Horizontal = scaling של frontend',
          'אין הבדל מהותי',
        ],
        correct: 0,
        explanation: 'Scale Up (Vertical) = שדרוג שרת קיים. Scale Out (Horizontal) = הוספת שרתים. Horizontal עדיף לאפליקציות stateless — גמיש ואין single point of failure.',
      },
    ],
  },

  {
    id: 'security-architecture',
    title: 'Security Architecture',
    summary: 'Authentication, Authorization, Zero-Trust, Defense in Depth ו-OWASP Top 10',
    emoji: '🔐',
    content: [
      { type: 'heading', text: 'Authentication vs Authorization' },
      {
        type: 'table',
        caption: 'הבדל בין Authentication לAuthorization',
        headers: ['', 'Authentication (AuthN)', 'Authorization (AuthZ)'],
        rows: [
          ['שאלה', 'מי אתה?', 'מה מותר לך לעשות?'],
          ['מנגנון', 'JWT, OAuth2, SAML, Passkeys', 'RBAC, ABAC, Policies'],
          ['מתי', 'בהתחברות', 'בכל בקשה'],
          ['דוגמה', 'הזן סיסמה, קבל token', 'token יש role=admin → מותר לך'],
        ],
      },
      { type: 'heading', text: 'JWT — JSON Web Token' },
      {
        type: 'code',
        lang: 'text',
        caption: 'מבנה JWT',
        code: `header.payload.signature

Header:  { "alg": "HS256", "typ": "JWT" }
Payload: { "sub": "user123", "role": "admin", "exp": 1700000000 }
Signature: HMACSHA256(base64(header) + "." + base64(payload), secret)

⚠️ Payload מקודד ב-base64 — לא מוצפן!
   אל תשמור מידע רגיש ב-JWT (סיסמאות, כרטיס אשראי)

✅ שמור exp קצר (15 דקות) + Refresh Token להארכה`,
      },
      { type: 'heading', text: 'Zero-Trust Architecture' },
      {
        type: 'text',
        text: '"Never trust, always verify" — גם בקשות מה-internal network אינן מהימנות. כל שירות מאמת כל בקשה, ללא קשר למקורה. מגן מפני lateral movement לאחר פריצה.',
      },
      {
        type: 'table',
        caption: 'מודל ישן vs Zero-Trust',
        headers: ['', 'Perimeter Security (ישן)', 'Zero-Trust (מודרני)'],
        rows: [
          ['הנחת יסוד', 'מה שבתוך הרשת — מהימן', 'שום דבר לא מהימן, תמיד'],
          ['אימות', 'פעם אחת בכניסה', 'כל בקשה, כל שירות'],
          ['הרשאות', 'גורפות לפי רשת', 'Least Privilege — מינימום הכרחי'],
          ['כשל פריצה', 'גישה לכל הרשת', 'גישה מוגבלת לרכיב שנפרץ'],
        ],
      },
      { type: 'heading', text: 'Defense in Depth' },
      {
        type: 'code',
        lang: 'text',
        caption: 'שכבות הגנה',
        code: `Layer 1: Network     — Firewall, WAF, DDoS protection
Layer 2: Perimeter    — API Gateway, Rate Limiting, TLS
Layer 3: Application  — Input validation, CORS, CSP headers
Layer 4: Data         — Encryption at rest, field-level encryption
Layer 5: Identity     — MFA, least privilege, short-lived tokens
Layer 6: Monitoring   — SIEM, anomaly detection, alerts`,
      },
      { type: 'heading', text: 'OWASP Top 10 — הבעיות הנפוצות' },
      {
        type: 'table',
        caption: 'OWASP Top 10 (2021)',
        headers: ['#', 'בעיה', 'מניעה'],
        rows: [
          ['A01', 'Broken Access Control', 'Deny by default, בדוק הרשאות server-side'],
          ['A02', 'Cryptographic Failures', 'TLS, אל תאחסן plaintext passwords, AES-256'],
          ['A03', 'Injection (SQL, XSS)', 'Parameterized queries, sanitize input, CSP'],
          ['A05', 'Security Misconfiguration', 'Secrets מחוץ לקוד, disable debug, headers'],
          ['A07', 'Auth Failures', 'MFA, rate limit login, secure session management'],
          ['A09', 'Logging Failures', 'Log auth events, errors — אבל אל תלוג סיסמאות'],
        ],
      },
      {
        type: 'tip',
        text: 'הכלל הכי חשוב: Least Privilege. כל שירות, משתמש, ו-DB user צריך הרשאות מינימליות בלבד. גם אם נפרץ — הנזק מוגבל.',
      },
    ],
    questionBank: [
      {
        id: 'q1',
        text: 'מה ההבדל בין Authentication לAuthorization?',
        options: [
          'Authentication = מי אתה; Authorization = מה מותר לך',
          'Authentication = מה מותר לך; Authorization = מי אתה',
          'שניהם מתייחסים לאותו דבר — הוכחת זהות',
          'Authentication לאנשים, Authorization לשירותים',
        ],
        correct: 0,
        explanation: 'AuthN = מי אתה (התחברות, JWT). AuthZ = מה מותר לך (בדיקת הרשאות בכל בקשה). חובה לבצע שניהם.',
      },
      {
        id: 'q2',
        text: 'מדוע אסור לשמור מידע רגיש ב-JWT payload?',
        options: [
          'ה-payload מקודד ב-base64 בלבד — כל אחד יכול לפענח אותו',
          'ה-JWT מוצפן ולכן לא ניתן לקרוא אותו',
          'JWT לא יכול לשמור מידע מורכב',
          'מגבלת גודל של 256 bytes',
        ],
        correct: 0,
        explanation: 'JWT payload = base64 encoding, לא הצפנה. כל אחד יכול לפענח: atob(token.split(".")[1]). אל תשמור שם סיסמאות, PII, או סודות.',
      },
      {
        id: 'q3',
        text: 'מה עיקרון Zero-Trust?',
        options: [
          'Never trust, always verify — גם בקשות פנימיות מאומתות תמיד',
          'אמון מלא לכל מה שבתוך ה-network הפנימי',
          'אל תאמין לקוד open source',
          'אל תאמין לספקי ענן חיצוניים',
        ],
        correct: 0,
        explanation: 'Zero-Trust: "assume breach" — גם אחרי שנכנסת לרשת אתה לא מהימן. כל בקשה מאומתת. מגן מפני lateral movement.',
      },
      {
        id: 'q4',
        text: 'מה Defense in Depth?',
        options: [
          'הגנה בשכבות — אם שכבה אחת נכשלת, השכבות הנוספות מגנות',
          'הצפנה כפולה של כל הנתונים',
          'שימוש בשני firewalls במקום אחד',
          'בדיקות ביטחון אוטומטיות בכל commit',
        ],
        correct: 0,
        explanation: 'Defense in Depth = מספר שכבות הגנה עצמאיות. Firewall נפרץ? יש עוד WAF, Input Validation, Encryption. אף שכבה אחת לא "מספיקה".',
      },
      {
        id: 'q5',
        text: 'מה ה-OWASP Top 10 מייצג?',
        options: [
          'רשימת 10 הפגיעויות הנפוצות ביותר ב-web applications',
          '10 עקרונות לכתיבת קוד מאובטח',
          '10 כלים לבדיקות ביטחון',
          '10 תקני הצפנה מומלצים',
        ],
        correct: 0,
        explanation: 'OWASP Top 10 = הפגיעויות הנפוצות והמסוכנות ביותר. Broken Access Control, Injection, Auth Failures — כל מפתח חייב להכיר אותן.',
      },
    ],
  },

  {
    id: 'observability',
    title: 'Observability & System Design',
    summary: 'Logs, Metrics, Traces — ה-3 עמודי תווך, SLA/SLO/SLI ותכנון system design',
    emoji: '🔭',
    content: [
      { type: 'heading', text: 'שלושה עמודי Observability' },
      {
        type: 'table',
        caption: 'Logs, Metrics, Traces',
        headers: ['עמוד', 'מה זה', 'כלים', 'מתאים ל'],
        rows: [
          ['Logs', 'רצף אירועים טקסטואלי', 'ELK, Loki, CloudWatch', 'debug מפורט, שגיאות'],
          ['Metrics', 'מדידות מספריות לאורך זמן', 'Prometheus, DataDog', 'alerting, dashboards'],
          ['Traces', 'מעקב בקשה דרך שירותים', 'Jaeger, Zipkin, OTEL', 'latency, distributed debug'],
        ],
      },
      { type: 'heading', text: 'SLA, SLO, SLI' },
      {
        type: 'code',
        lang: 'text',
        caption: 'ההיררכיה',
        code: `SLI (Service Level Indicator)
  המדד עצמו — מה אנחנו מודדים
  "99.2% מהבקשות הצליחו השבוע"

SLO (Service Level Objective)
  היעד הפנימי שלנו
  "99.5% availability לאורך 30 יום"

SLA (Service Level Agreement)
  ההתחייבות החוזית ללקוח
  "99.9% availability — אחרת קרדיט"

Error Budget = SLO - מה שנמדד בפועל
  "נותרו לנו 0.4% downtime לחודש הנוכחי"`,
      },
      { type: 'heading', text: 'Structured Logging' },
      {
        type: 'code',
        lang: 'typescript',
        caption: 'Structured vs Unstructured Logging',
        code: `// ❌ Unstructured — קשה לחפש ולנתח
console.log('User 42 placed order 99 for $250 at 14:30')

// ✅ Structured — JSON, ניתן לעשות query
logger.info({
  event: 'order.placed',
  userId: '42',
  orderId: '99',
  amount: 250,
  currency: 'ILS',
  duration_ms: 45,
  traceId: 'abc-123',    // קישור ל-trace
})

// Correlation ID — עוקב אחרי בקשה דרך שירותים
app.use((req, res, next) => {
  req.traceId = req.headers['x-trace-id'] ?? crypto.randomUUID()
  res.setHeader('x-trace-id', req.traceId)
  next()
})`,
      },
      { type: 'heading', text: 'System Design Interview — מסגרת עבודה' },
      {
        type: 'code',
        lang: 'text',
        caption: 'צעדים לתכנון מערכת',
        code: `1. Clarify Requirements (5 דקות)
   - כמה משתמשים? כמה בקשות/שנייה?
   - Read heavy או Write heavy?
   - Consistency חשוב או Availability?
   - Latency requirements?

2. Capacity Estimation
   - 1M users × 10 requests/day = 115 req/sec
   - Storage: 1KB/request × 10M req/day = 10GB/day

3. High-Level Design
   - API Gateway → Services → DBs → Cache
   - Client → CDN → Load Balancer → App Servers

4. Deep Dive — ה-bottlenecks
   - איפה ה-hotspot? DB reads? Writes?
   - איפה צריך cache?
   - איפה צריך queue?

5. Trade-offs
   - Explain what you gave up and why`,
      },
      {
        type: 'tip',
        text: 'ב-System Design: אמור בקול רם את ה-trade-offs שאתה בוחר. אין תשובה "נכונה" — יש החלטות מנומקות. האינטרוויואר רוצה לשמוע את תהליך החשיבה.',
      },
    ],
    questionBank: [
      {
        id: 'q1',
        text: 'מה ההבדל בין Metrics לבין Logs?',
        options: [
          'Metrics = מספרים לאורך זמן לאלרטים; Logs = אירועים טקסטואליים לdebug',
          'Metrics לפרודקשן, Logs לפיתוח בלבד',
          'Metrics שמורים ב-DB, Logs בקבצים',
          'Logs מהירים יותר ממetrics',
        ],
        correct: 0,
        explanation: 'Metrics (כמה req/sec, error rate) → dashboards ו-alerts. Logs (מה קרה בדיוק ב-request הזה) → debugging. משלימים זה את זה.',
      },
      {
        id: 'q2',
        text: 'מה Error Budget?',
        options: [
          'כמה downtime נותר מה-SLO לחודש הנוכחי',
          'תקציב לתיקון bugs',
          'מספר השגיאות המותר ב-code review',
          'עלות ה-on-call לחודש',
        ],
        correct: 0,
        explanation: 'Error Budget = SLO - ביצועים בפועל. אם SLO = 99.9% ואני ב-99.7% — נוצלו 0.2% מתוך 0.1% = חרגתי! אי אפשר לפרוס features חדשים.',
      },
      {
        id: 'q3',
        text: 'למה Distributed Tracing חשוב במיקרוסרביסים?',
        options: [
          'עוקב אחרי בקשה דרך כמה שירותים — מוצא איפה ה-latency',
          'מצפין תקשורת בין שירותים',
          'מאחד את כל ה-logs לקובץ אחד',
          'מאזן עומסים בין instances',
        ],
        correct: 0,
        explanation: 'Trace עוקב אחרי בקשה מהכניסה ועד הסוף דרך כל השירותים. Span אחד לכל שירות — רואים איפה 400ms מה-600ms הסה"כ.',
      },
      {
        id: 'q4',
        text: 'מה SLA?',
        options: [
          'התחייבות חוזית לרמת שירות — אם מפרים, יש קרדיט',
          'היעד הפנימי של הצוות לזמינות',
          'המדד שאנחנו מודדים',
          'רשימת התכונות שיהיו זמינות',
        ],
        correct: 0,
        explanation: 'SLA = Service Level Agreement, חוזה עם הלקוח. "99.9% uptime, אחרת 10% קרדיט". SLO הוא היעד הפנימי — בד"כ קצת יותר גבוה מה-SLA כ-buffer.',
      },
      {
        id: 'q5',
        text: 'מה הצעד הראשון ב-System Design Interview?',
        options: [
          'Clarify requirements — כמה משתמשים, read/write heavy, latency',
          'שרטוט ה-DB schema',
          'בחירת cloud provider',
          'הגדרת ה-API endpoints',
        ],
        correct: 0,
        explanation: 'תמיד קודם: Clarify Requirements. 1M users vs 1B users = ארכיטקטורה שונה לחלוטין. אל תתחיל לתכנן בלי לדעת את ה-scale.',
      },
    ],
  },
]
