import type { Lesson } from '../../types'

export const patternsLessons: Lesson[] = [
  {
    id: 'solid-principles',
    title: 'עקרונות SOLID',
    summary: 'חמשת עקרונות התכנות המונחה-עצמים — SRP, OCP, LSP, ISP, DIP עם דוגמאות TypeScript',
    emoji: '🏛️',
    content: [
      { type: 'heading', text: 'מה זה SOLID?' },
      {
        type: 'text',
        text: 'SOLID הם 5 עקרונות שנוסחו על ידי Robert C. Martin ("Uncle Bob") לכתיבת קוד מונחה-עצמים שקל לתחזק, להרחיב ולבדוק. כל אות היא עקרון נפרד.',
      },
      {
        type: 'table',
        caption: 'חמשת עקרונות SOLID',
        headers: ['אות', 'עיקרון', 'בקצרה'],
        rows: [
          ['S', 'Single Responsibility', 'class אחד — אחריות אחת'],
          ['O', 'Open/Closed', 'פתוח להרחבה, סגור לשינוי'],
          ['L', 'Liskov Substitution', 'תת-מחלקה חייבת להחליף את הבסיס'],
          ['I', 'Interface Segregation', 'interfaces קטנים וממוקדים'],
          ['D', 'Dependency Inversion', 'תלה ב-abstractions, לא ב-concretions'],
        ],
      },
      { type: 'heading', text: 'S — Single Responsibility Principle' },
      {
        type: 'text',
        text: 'הדוגמה מציגה את ההבדל בין class שמפר SRP לבין עיצוב נכון. שימו לב כיצד UserService הראשון מכיל validation, DB access, שליחת email ולוגינג — ארבע אחריות שונות. גרסת ה-SRP מפצלת כל אחריות ל-class נפרד ומחברת אותם דרך constructor injection.',
      },
      {
        type: 'code',
        lang: 'typescript',
        caption: 'SRP — class עם אחריות אחת בלבד',
        code: `// ✗ פגיעה ב-SRP — class אחד עושה כל: לוגיקה + DB + email
class UserService {
  createUser(data: UserData) {
    // validates
    // saves to DB
    // sends welcome email
    // logs to file
  }
}

// ✓ SRP — כל class אחריות אחת
class UserValidator {
  validate(data: UserData): void { /* ... */ }
}

class UserRepository {
  save(user: User): Promise<User> { /* ... */ }
}

class EmailService {
  sendWelcome(email: string): Promise<void> { /* ... */ }
}

class UserService {
  constructor(
    private validator: UserValidator,
    private repo: UserRepository,
    private email: EmailService,
  ) {}

  async createUser(data: UserData): Promise<User> {
    this.validator.validate(data)
    const user = await this.repo.save(new User(data))
    await this.email.sendWelcome(user.email)
    return user
  }
}`,
      },
      { type: 'heading', text: 'O — Open/Closed Principle' },
      {
        type: 'text',
        text: 'OCP אומר שהוספת פונקציונליות חדשה לא אמורה לדרוש שינוי בקוד קיים ובדוק. הדוגמה מציגה חישוב הנחות: הגישה השגויה מחייבת לפתוח את calcDiscount ולהוסיף if בכל פעם; הגישה הנכונה מגדירה interface DiscountStrategy שכל סוג הנחה חדש מממש — קוד קיים נשאר ללא שינוי.',
      },
      {
        type: 'code',
        lang: 'typescript',
        caption: 'OCP — הוספת דיסקאונט חדש בלי לשנות קוד קיים',
        code: `// ✗ פגיעה ב-OCP — כל סוג חדש מחייב שינוי בפונקציה
function calcDiscount(user: User, type: string): number {
  if (type === 'premium') return user.total * 0.2
  if (type === 'vip') return user.total * 0.35
  // כשיגיע "employee" — צריך לפתוח ולשנות את הפונקציה
  return 0
}

// ✓ OCP — interface פתוח להרחבה, לא לשינוי
interface DiscountStrategy {
  calculate(total: number): number
}

class PremiumDiscount implements DiscountStrategy {
  calculate(total: number) { return total * 0.2 }
}

class VipDiscount implements DiscountStrategy {
  calculate(total: number) { return total * 0.35 }
}

// DiscountStrategy חדש = class חדש, אפס שינוי בקוד קיים
class EmployeeDiscount implements DiscountStrategy {
  calculate(total: number) { return total * 0.5 }
}

class OrderService {
  applyDiscount(total: number, strategy: DiscountStrategy): number {
    return total - strategy.calculate(total)
  }
}`,
      },
      { type: 'heading', text: 'L — Liskov Substitution Principle' },
      {
        type: 'text',
        text: 'LSP אומר שתת-מחלקה חייבת להחליף את הבסיס שלה בלי להפתיע. הדוגמה הקלאסית: Square שיורש מ-Rectangle שובר את הנחות ה-caller כי שינוי width משנה גם את height. הפתרון הנכון: שני classes נפרדים שמממשים את אותו interface Shape, בלי ירושה מיותרת.',
      },
      {
        type: 'code',
        lang: 'typescript',
        caption: 'LSP — תת-מחלקה חייבת לעבוד היכן שהבסיס עובד',
        code: `// ✗ פגיעה ב-LSP — Square שובר את ה-contract של Rectangle
class Rectangle {
  constructor(public width: number, public height: number) {}
  area() { return this.width * this.height }
}

class Square extends Rectangle {
  set width(v: number) { super.width = v; super.height = v }   // שובר הנחות!
  set height(v: number) { super.width = v; super.height = v }
}

function doubleWidth(rect: Rectangle) {
  rect.width *= 2
  // מצפה: area = width*2 * height
  // Square: ישנה גם height → area = (width*2)²  — הפתעה!
}

// ✓ LSP — hierarchy נכון, ללא הפרת contract
interface Shape {
  area(): number
}

class Rectangle implements Shape {
  constructor(public width: number, public height: number) {}
  area() { return this.width * this.height }
}

class Square implements Shape {
  constructor(public side: number) {}
  area() { return this.side ** 2 }
}`,
      },
      { type: 'heading', text: 'I — Interface Segregation & D — Dependency Inversion' },
      {
        type: 'text',
        text: 'הדוגמה מציגה שני עקרונות יחד. ISP: interface Worker שמכיל eat() מאלץ את RobotWorker לממש מתודה לא רלוונטית — הפתרון הוא interfaces ממוקדים Workable ו-Eatable בנפרד. DIP: OrderService שיוצר ישירות MySqlOrderRepository הוא coupled; הפתרון הוא injection של interface OrderRepository שמאפשר החלפת implementation.',
      },
      {
        type: 'code',
        lang: 'typescript',
        caption: 'ISP + DIP — interfaces קטנים ותלות ב-abstractions',
        code: `// ✗ ISP — interface שמן שמאלץ מימוש לא רלוונטי
interface Worker {
  work(): void
  eat(): void   // Robot לא אוכל!
}

// ✓ ISP — interfaces ממוקדים
interface Workable { work(): void }
interface Eatable  { eat(): void  }

class HumanWorker implements Workable, Eatable {
  work() { console.log('working') }
  eat()  { console.log('eating')  }
}

class RobotWorker implements Workable {
  work() { console.log('beep boop') }
  // לא מממש eat — לא צריך!
}

// ──────────────────────────────────────────────
// ✗ DIP — תלות ישירה ב-implementation
class OrderService {
  private repo = new MySqlOrderRepository()  // coupled!
}

// ✓ DIP — תלות ב-interface, injection מבחוץ
interface OrderRepository {
  save(order: Order): Promise<Order>
  findById(id: string): Promise<Order | null>
}

class OrderService {
  constructor(private repo: OrderRepository) {}  // DI ✓
  // עכשיו אפשר להזריק MySql, Postgres, InMemory, Mock...
}`,
      },
      {
        type: 'tip',
        text: 'SOLID הוא כלי, לא דת. לא כל class זקוק לכל 5 עקרונות. יישם אותם בהדרגה כשהקוד גדל ומורכב — over-engineering ביום הראשון גרוע לא פחות מ-no-engineering.',
      },
    ],
    questionBank: [
      {
        id: 'solid-q1',
        text: 'מה עקרון ה-Single Responsibility אומר?',
        options: [
          'פונקציה חייבת לעשות פעולה אחת בלבד',
          'class צריך להיות בעל סיבה אחת לשינוי — אחריות אחת בלבד',
          'אפשר לרשת רק ממחלקה אחת',
          'כל method חייב להחזיר ערך יחיד',
        ],
        correct: 1,
        explanation: 'SRP: class שמכיל לוגיקה + DB + email ישתנה מ-3 סיבות שונות. class ממוקד ישתנה מסיבה אחת — קל יותר לתחזוקה ולבדיקה.',
      },
      {
        id: 'solid-q2',
        text: 'מה פירוש "פתוח להרחבה, סגור לשינוי" (OCP)?',
        options: [
          'קוד חייב להיות קריא',
          'מוסיפים פונקציונליות חדשה דרך הרחבה (ירושה/interface), לא על ידי שינוי קוד קיים',
          'class לא יכול לשנות את המצב שלו',
          'כל method צריך להיות public',
        ],
        correct: 1,
        explanation: 'OCP: תוסיף DiscountStrategy חדש = class חדש, לא שינוי ב-OrderService. הקוד הקיים לא "נשבר" וה-tests הקיימים ממשיכים לעבור.',
      },
      {
        id: 'solid-q3',
        text: 'למה Square extends Rectangle שובר את עקרון Liskov?',
        options: [
          'כי Square לא צריך ירושה',
          'כי משתמשים שמשתמשים ב-Rectangle מצפים ל-contract מסוים — Square שובר אותו (שינוי width ישנה גם height)',
          'כי Rectangle גדול יותר מ-Square',
          'כי TypeScript לא תומך בזה',
        ],
        correct: 1,
        explanation: 'LSP: אם פונקציה שמקבלת Rectangle עובדת נכון — היא חייבת לעבוד גם עם Square ללא הפתעות. Square ששינוי צד אחד משנה את השני — הפתעה!',
      },
      {
        id: 'solid-q4',
        text: 'מה הבעיה ב-interface שמן שמכיל eat() ו-work()?',
        options: [
          'אין בעיה — interface יכול להכיל הכל',
          'מחלקות שלא צריכות את כל המתודות מאולצות לממש them ריק או לזרוק exception',
          'interface שמן מאט ביצועים',
          'JavaScript לא תומך ב-interfaces גדולים',
        ],
        correct: 1,
        explanation: 'ISP: RobotWorker שמממש eat() { throw new Error("robots don\'t eat") } הוא code smell. עדיף Workable + Eatable — כל class מממש רק מה שרלוונטי.',
      },
      {
        id: 'solid-q5',
        text: 'מה Dependency Inversion משיג?',
        options: [
          'מהפך את סדר הפעולות',
          'מודולים ברמה גבוהה לא תלויים במימוש ספציפי — תלויים ב-interface, מאפשר החלפת implementations',
          'מסיר תלויות לחלוטין',
          'מאיץ את זמן הקמפול',
        ],
        correct: 1,
        explanation: 'DIP: OrderService שתלוי ב-OrderRepository interface אפשר לבדוק עם InMemoryOrderRepository, לפרוס עם PostgresOrderRepository — ללא שינוי ב-OrderService.',
      },
    ],
  },

  {
    id: 'creational-patterns',
    title: 'Creational Patterns',
    summary: 'Factory Method, Abstract Factory, Builder ו-Singleton — patterns ליצירת אובייקטים',
    emoji: '🏗️',
    content: [
      { type: 'heading', text: 'מה הם Creational Patterns?' },
      {
        type: 'text',
        text: 'Creational Patterns עוסקים ב-איך יוצרים אובייקטים. הם מסתירים את לוגיקת היצירה ומאפשרים גמישות — לשנות מה נוצר, איך נוצר, ומי אחראי על היצירה — בלי לשנות את הקוד שמשתמש באובייקטים.',
      },
      { type: 'heading', text: 'Factory Method' },
      {
        type: 'text',
        text: 'Factory Method מסתיר את לוגיקת יצירת ה-object מהקוד שמשתמש בו. הדוגמה מציגה מערכת התראות: הקוד שמפעיל notify לא יודע האם ייווצר Email, SMS או Push — NotificationFactory מחליטה לפי נתוני המשתמש. שימו לב שכל implementation מממש את אותו Notification interface, מה שמאפשר למבצע ה-notify לקרוא ל-send() בלי לדעת את הסוג.',
      },
      {
        type: 'code',
        lang: 'typescript',
        caption: 'Factory Method — הפקידי ל-subclass מה ליצור',
        code: `// Factory Method: מגדירים interface ליצירה, subclasses מחליטים מה
interface Notification {
  send(message: string): Promise<void>
}

class EmailNotification implements Notification {
  constructor(private to: string) {}
  async send(message: string) { console.log(\`Email to \${this.to}: \${message}\`) }
}

class SmsNotification implements Notification {
  constructor(private phone: string) {}
  async send(message: string) { console.log(\`SMS to \${this.phone}: \${message}\`) }
}

class PushNotification implements Notification {
  constructor(private deviceToken: string) {}
  async send(message: string) { console.log(\`Push: \${message}\`) }
}

// Factory — מסתיר את ה-new ומחליט לפי קונטקסט
class NotificationFactory {
  static create(user: User): Notification {
    if (user.pushEnabled && user.deviceToken) {
      return new PushNotification(user.deviceToken)
    }
    if (user.phone) {
      return new SmsNotification(user.phone)
    }
    return new EmailNotification(user.email)
  }
}

// קוד שמשתמש — לא יודע ולא אכפת לו מה נוצר
async function notify(user: User, message: string) {
  const notif = NotificationFactory.create(user)
  await notif.send(message)
}`,
      },
      { type: 'heading', text: 'Builder — בניית אובייקטים מורכבים' },
      {
        type: 'text',
        text: 'Builder Pattern פותר את בעיית ה-constructor עם פרמטרים רבים שקשה לקרוא. הדוגמה מציגה QueryBuilder שבונה SQL query שלב אחר שלב. שימו לב שכל method מחזירה this — זה מה שמאפשר את ה-method chaining הקריא. רק ב-build() ה-object הסופי נוצר.',
      },
      {
        type: 'code',
        lang: 'typescript',
        caption: 'Builder Pattern — fluent API לבניית אובייקט שלב אחר שלב',
        code: `// הבעיה: constructor עם הרבה פרמטרים אופציונליים
// new QueryBuilder('users', true, false, null, 10, 0, ['id','name'], 'id DESC') — בלתי קריא

class QueryBuilder {
  private table = ''
  private conditions: string[] = []
  private selectedCols = ['*']
  private limitVal?: number
  private offsetVal = 0
  private orderByVal?: string

  from(table: string): this {
    this.table = table
    return this  // חשוב — מאפשר chaining
  }

  select(...cols: string[]): this {
    this.selectedCols = cols
    return this
  }

  where(condition: string): this {
    this.conditions.push(condition)
    return this
  }

  limit(n: number): this {
    this.limitVal = n
    return this
  }

  offset(n: number): this {
    this.offsetVal = n
    return this
  }

  orderBy(col: string, dir: 'ASC' | 'DESC' = 'ASC'): this {
    this.orderByVal = \`\${col} \${dir}\`
    return this
  }

  build(): string {
    let q = \`SELECT \${this.selectedCols.join(', ')} FROM \${this.table}\`
    if (this.conditions.length) q += \` WHERE \${this.conditions.join(' AND ')}\`
    if (this.orderByVal) q += \` ORDER BY \${this.orderByVal}\`
    if (this.limitVal)   q += \` LIMIT \${this.limitVal}\`
    if (this.offsetVal)  q += \` OFFSET \${this.offsetVal}\`
    return q
  }
}

// שימוש — קריא ומובן
const query = new QueryBuilder()
  .from('users')
  .select('id', 'name', 'email')
  .where('active = true')
  .where('age > 18')
  .orderBy('name')
  .limit(20)
  .offset(40)
  .build()
// SELECT id, name, email FROM users WHERE active = true AND age > 18 ORDER BY name ASC LIMIT 20 OFFSET 40`,
      },
      { type: 'heading', text: 'Singleton — instance אחד בלבד' },
      {
        type: 'text',
        text: 'Singleton מבטיח שייווצר רק instance אחד מסוים של class לאורך חיי האפליקציה. הדוגמה מציגה ConfigManager עם constructor פרטי שמונע יצירה ישירה, ו-getInstance() שיוצר אותו רק בפעם הראשונה. שימו לב לאזהרה — Singleton הוא לעיתים anti-pattern כי הוא global state שמקשה על בדיקות.',
      },
      {
        type: 'code',
        lang: 'typescript',
        caption: 'Singleton — מבטיח instance יחיד, נדיר שצריך אותו',
        code: `// Singleton קלאסי — thread-safe ב-Node.js (single threaded)
class ConfigManager {
  private static instance: ConfigManager | null = null
  private config: Record<string, string> = {}

  private constructor() {
    // קריאת config פעם אחת
    this.config = { apiUrl: process.env.API_URL ?? '', debug: process.env.DEBUG ?? 'false' }
  }

  static getInstance(): ConfigManager {
    if (!ConfigManager.instance) {
      ConfigManager.instance = new ConfigManager()
    }
    return ConfigManager.instance
  }

  get(key: string): string {
    return this.config[key] ?? ''
  }
}

// שימוש
const cfg = ConfigManager.getInstance()
console.log(cfg.get('apiUrl'))

// ⚠️ Singleton בדרך כלל בעייתי — קשה לבדוק, global state
// עדיף: inject את ה-ConfigManager דרך DI container
// Singleton = anti-pattern ברוב המקרים מחוץ ל-module-level singletons`,
      },
      {
        type: 'tip',
        text: 'ב-Node.js module system, כל require/import של אותו module מחזיר את אותו instance — Singleton בחינם. אין צורך במחלקת Singleton מיוחדת ב-99% מהמקרים.',
      },
    ],
    questionBank: [
      {
        id: 'creational-q1',
        text: 'מה Factory Method מאפשר?',
        options: [
          'יצירת object ללא constructor',
          'הפרדה בין קוד שמשתמש ב-object לבין קוד שיוצר אותו — הקוד הקורא לא יודע איזה type בדיוק נוצר',
          'יצירת objects במקביל',
          'מניעת יצירת כפולות',
        ],
        correct: 1,
        explanation: 'NotificationFactory.create(user) מחזיר Email/SMS/Push לפי הקונטקסט. הקוד שקורא לו מטפל ב-Notification interface ולא יודע מה בדיוק קיבל.',
      },
      {
        id: 'creational-q2',
        text: 'מתי Builder Pattern מתאים?',
        options: [
          'כשיוצרים object בשורה אחת',
          'כשה-object מורכב עם הרבה פרמטרים אופציונליים — Builder מאפשר fluent API קריא',
          'כשצריך רק instance אחד',
          'כשיוצרים families של objects קשורים',
        ],
        correct: 1,
        explanation: 'Builder = תרופה ל-"telescoping constructor" — constructor עם 8 פרמטרים אופציונליים שחצים מהם null. query.from("users").where(...).limit(20) הרבה יותר קריא.',
      },
      {
        id: 'creational-q3',
        text: 'מה return this בפונקציות Builder עושה?',
        options: [
          'מחזיר את ה-class עצמו',
          'מאפשר method chaining — כל קריאה מחזירה את ה-builder עצמו כך שאפשר לשרשר קריאות',
          'מסיים את הבנייה',
          'מאפס את ה-builder',
        ],
        correct: 1,
        explanation: 'return this = מחזיר את ה-instance של ה-builder. מאפשר builder.from("users").select("id").limit(10) — כל method מחזיר builder לשרשור הבא.',
      },
      {
        id: 'creational-q4',
        text: 'מה הבעיה העיקרית עם Singleton Pattern?',
        options: [
          'הוא איטי',
          'Global state — קשה לבדוק (tests תלויים זה בזה), מסתיר תלויות, קשה להחליף ב-testing',
          'הוא לא thread-safe',
          'TypeScript לא תומך בו',
        ],
        correct: 1,
        explanation: 'Singleton = global variable מחופש. שני tests שמשנים את ה-Singleton ישפיעו אחד על השני. עדיף DI — מזריקים instance חדש לכל test.',
      },
      {
        id: 'creational-q5',
        text: 'כיצד Node.js מספק Singleton בחינם?',
        options: [
          'כל class ב-Node.js הוא Singleton אוטומטי',
          'Module caching — אותו import/require של אותו קובץ תמיד מחזיר את אותו instance',
          'Node.js מריץ קוד פעם אחת בלבד',
          'JavaScript מונע יצירת כפולות',
        ],
        correct: 1,
        explanation: 'Node.js cache-ת modules. import { db } from "./db" בכל קובץ → אותו db instance. אין צורך במחלקת Singleton ידנית — המודול עצמו הוא ה-Singleton.',
      },
    ],
  },

  {
    id: 'structural-patterns',
    title: 'Structural Patterns',
    summary: 'Adapter, Decorator, Facade ו-Proxy — patterns לארגון מבנה הקוד ויחסי מחלקות',
    emoji: '🏗️',
    content: [
      { type: 'heading', text: 'Adapter — גשר בין interfaces לא תואמים' },
      {
        type: 'text',
        text: 'Adapter מתרגם בין interface של ספרייה חיצונית לbין interface פנימי שהמערכת מצפה לו. הדוגמה מציגה PinoAdapter שעוטף את ספריית Pino ומספק את Logger interface הפנימי. שימו לב שה-API של Pino שונה — הסדר של הפרמטרים הפוך — ה-Adapter מטפל בהמרה השקופה לצרכן.',
      },
      {
        type: 'code',
        lang: 'typescript',
        caption: 'Adapter — עוטף ספרייה חיצונית ב-interface פנימי',
        code: `// הבעיה: API פנימי מצפה ל-Logger אחד, יש לנו Pino
interface Logger {
  info(msg: string, meta?: object): void
  error(msg: string, error?: Error): void
}

// Pino API שונה לחלוטין
import pino from 'pino'
const pinoLogger = pino()

// Adapter — מתאים Pino ל-Logger שלנו
class PinoAdapter implements Logger {
  private logger = pino()

  info(msg: string, meta?: object) {
    this.logger.info(meta ?? {}, msg)
  }

  error(msg: string, error?: Error) {
    this.logger.error({ err: error }, msg)
  }
}

// שימוש — הקוד לא יודע שמדובר ב-Pino
const logger: Logger = new PinoAdapter()
logger.info('User created', { userId: '123' })

// מחר נחליף ל-Winston? כותבים WinstonAdapter — אפס שינוי בשאר הקוד`,
      },
      { type: 'heading', text: 'Decorator — הוספת התנהגות ללא ירושה' },
      {
        type: 'text',
        text: 'Decorator Pattern מוסיף התנהגות ל-object קיים בזמן ריצה, ללא ירושה. הדוגמה מציגה FileDataSource שאפשר לעטוף ב-EncryptionDecorator וב-CompressionDecorator — ניתן לשכב אותם בכל סדר. שימו לב שכל Decorator מממש את אותו DataSource interface — ה-caller לא יודע בכמה שכבות עטוף ה-object.',
      },
      {
        type: 'code',
        lang: 'typescript',
        caption: 'Decorator — עוטף object ומוסיף התנהגות',
        code: `interface DataSource {
  read(): string
  write(data: string): void
}

class FileDataSource implements DataSource {
  constructor(private filename: string) {}
  read() { return \`data from \${this.filename}\` }
  write(data: string) { console.log(\`writing to \${this.filename}: \${data}\`) }
}

// Decorator בסיסי — עוטף DataSource
abstract class DataSourceDecorator implements DataSource {
  constructor(protected wrapped: DataSource) {}
  read() { return this.wrapped.read() }
  write(data: string) { this.wrapped.write(data) }
}

// Decorator ספציפי — מוסיף הצפנה
class EncryptionDecorator extends DataSourceDecorator {
  read() {
    return this.decrypt(this.wrapped.read())
  }
  write(data: string) {
    this.wrapped.write(this.encrypt(data))
  }
  private encrypt(data: string) { return Buffer.from(data).toString('base64') }
  private decrypt(data: string) { return Buffer.from(data, 'base64').toString() }
}

// Decorator נוסף — מוסיף compression
class CompressionDecorator extends DataSourceDecorator {
  read() { return this.decompress(this.wrapped.read()) }
  write(data: string) { this.wrapped.write(this.compress(data)) }
  private compress(data: string) { return \`[compressed]\${data}\` }
  private decompress(data: string) { return data.replace('[compressed]', '') }
}

// שכבות שניתן להרכיב חופשי — כמו בצל
const source: DataSource =
  new EncryptionDecorator(
    new CompressionDecorator(
      new FileDataSource('data.txt')
    )
  )

source.write('Hello')  // → compress → encrypt → write to file`,
      },
      { type: 'heading', text: 'Facade — interface פשוט למערכת מורכבת' },
      {
        type: 'text',
        text: 'Facade מספק API פשוט אחד למערכת מורכבת שמורכבת מחלקים רבים. הדוגמה מציגה OrderFacade שמאחד inventory, payment, shipping ו-notification לפעולה אחת. שימו לב שה-caller צריך רק שורה אחת — facade.placeOrder() — ולא צריך לדעת כלל על הסדר הנכון לקרוא לכל שירות.',
      },
      {
        type: 'code',
        lang: 'typescript',
        caption: 'Facade — מסתיר מורכבות מאחורי API פשוט',
        code: `// מערכת הזמנה מורכבת — הרבה חלקים
class InventoryService {
  reserve(productId: string, qty: number) { /* ... */ }
}
class PaymentService {
  charge(userId: string, amount: number): string { return 'tx-1' }
}
class ShippingService {
  createLabel(orderId: string, address: string): string { return 'label-1' }
}
class NotificationService {
  sendOrderConfirmation(email: string, orderId: string) { /* ... */ }
}

// Facade — interface אחד פשוט לכל המורכבות
class OrderFacade {
  private inventory = new InventoryService()
  private payment = new PaymentService()
  private shipping = new ShippingService()
  private notification = new NotificationService()

  async placeOrder(order: OrderRequest): Promise<OrderResult> {
    this.inventory.reserve(order.productId, order.qty)
    const txId = this.payment.charge(order.userId, order.total)
    const label = this.shipping.createLabel(order.id, order.address)
    this.notification.sendOrderConfirmation(order.email, order.id)

    return { txId, shippingLabel: label, status: 'confirmed' }
  }
}

// קוד שמשתמש — שורה אחת
const facade = new OrderFacade()
const result = await facade.placeOrder(orderRequest)`,
      },
      { type: 'heading', text: 'Proxy — שליטה על גישה ל-object' },
      {
        type: 'text',
        text: 'Proxy מוסיף שכבת ביניים שמשלטת על גישה ל-object אמיתי. הדוגמה מציגה CachingUserRepository שיורט קריאות ל-findById — בודק cache לפני שפונה ל-DB. שימו לב שה-Proxy מממש את אותו UserRepository interface כמו ה-DatabaseUserRepository, כך שהצרכן לא יודע שיש caching layer.',
      },
      {
        type: 'code',
        lang: 'typescript',
        caption: 'Proxy — caching + lazy loading + logging',
        code: `interface UserRepository {
  findById(id: string): Promise<User | null>
}

class DatabaseUserRepository implements UserRepository {
  async findById(id: string): Promise<User | null> {
    console.log(\`DB query for user \${id}\`)
    return { id, name: 'Alice', email: 'alice@test.com' }
  }
}

// Caching Proxy — מונע שאילתות כפולות
class CachingUserRepository implements UserRepository {
  private cache = new Map<string, User>()

  constructor(private real: UserRepository) {}

  async findById(id: string): Promise<User | null> {
    if (this.cache.has(id)) {
      console.log(\`Cache hit for \${id}\`)
      return this.cache.get(id)!
    }
    const user = await this.real.findById(id)
    if (user) this.cache.set(id, user)
    return user
  }
}

// ה-Proxy שקוף לצרכן — אותו interface
const repo: UserRepository = new CachingUserRepository(
  new DatabaseUserRepository()
)

await repo.findById('u1')  // DB query
await repo.findById('u1')  // Cache hit — ללא DB`,
      },
    ],
    questionBank: [
      {
        id: 'structural-q1',
        text: 'מתי Adapter Pattern שימושי?',
        options: [
          'כשצריך לשנות ביצועים',
          'כשצריך לחבר ספרייה חיצונית (עם API שונה) ל-interface פנימי קיים בלי לשנות שאר הקוד',
          'כשצריך להוסיף logging',
          'כשיוצרים object מורכב',
        ],
        correct: 1,
        explanation: 'Adapter = "plug adapter" לאלקטרוניקה. PinoAdapter עוטף את Pino ומספק את Logger interface שהמערכת מצפה לו. מחר מחליפים Pino = כותבים Adapter חדש בלבד.',
      },
      {
        id: 'structural-q2',
        text: 'מה היתרון של Decorator על ירושה?',
        options: [
          'Decorator מהיר יותר',
          'ניתן לשלב Decorators בזמן ריצה ולערום אותם בחופשיות; ירושה קשיחה ומוגבלת',
          'Decorator לא דורש interface',
          'Decorator עובד רק עם async',
        ],
        correct: 1,
        explanation: 'עם ירושה: EncryptedCompressedFile, EncryptedFile, CompressedFile = explosion. עם Decorator: new Encryption(new Compression(file)) — כל שילוב אפשרי בזמן ריצה.',
      },
      {
        id: 'structural-q3',
        text: 'מה Facade Pattern עושה?',
        options: [
          'מסתיר את ה-implementation',
          'מספק interface פשוט לתת-מערכת מורכבת — מקטין את ה-coupling בין הלקוח למערכת',
          'מגן על גישה ל-object',
          'מאפשר שכבות של התנהגות',
        ],
        correct: 1,
        explanation: 'OrderFacade.placeOrder() = שורה אחת לקורא. מאחורי הקלעים: inventory + payment + shipping + notification. הלקוח לא צריך לדעת על המורכבות.',
      },
      {
        id: 'structural-q4',
        text: 'מה Proxy Pattern מאפשר?',
        options: [
          'יצירת objects בזול',
          'שכבת ביניים שמשלטת על גישה ל-object אמיתי — caching, logging, authorization, lazy init',
          'תרגום בין interfaces',
          'הוספת התנהגות ללא שינוי קוד',
        ],
        correct: 1,
        explanation: 'CachingProxy יורט קריאות ל-findById ובודק cache לפני שפונה ל-DB. AuthorizationProxy יבדוק הרשאות. LazyProxy יצור ה-object האמיתי רק בשימוש הראשון.',
      },
      {
        id: 'structural-q5',
        text: 'מה ההבדל בין Adapter ל-Facade?',
        options: [
          'אין הבדל',
          'Adapter מתאים interface קיים לinterface אחר; Facade יוצר interface פשוט חדש למערכת מורכבת',
          'Facade עובד רק עם classes',
          'Adapter משמש רק ל-legacy code',
        ],
        correct: 1,
        explanation: 'Adapter: ממיר X→Y. Facade: מפשט מורכבות. Adapter לא מוסיף פונקציונליות — רק ממיר. Facade מסתיר מורכבות ומפשט — לא בהכרח ממיר.',
      },
    ],
  },

  {
    id: 'behavioral-patterns',
    title: 'Behavioral Patterns',
    summary: 'Observer, Strategy, Command ו-Chain of Responsibility — patterns לתקשורת והתנהגות',
    emoji: '🎭',
    content: [
      { type: 'heading', text: 'Observer — event system' },
      {
        type: 'text',
        text: 'Observer Pattern מאפשר ל-producers לפרסם events מבלי לדעת מי מאזין. הדוגמה מציגה EventEmitter גנרי עם type safety מלא — שימו לב לטיפוס OrderEvents שמגדיר אילו events קיימים ואיזה payload לכל אחד. פונקציית ה-unsubscribe שמוחזרת מ-on() חשובה למניעת memory leaks.',
      },
      {
        type: 'code',
        lang: 'typescript',
        caption: 'Observer Pattern — publish/subscribe בסיסי',
        code: `// Observer: מנוי מקבל הודעה כשהמצב משתנה
type EventHandler<T> = (data: T) => void

class EventEmitter<Events extends Record<string, unknown>> {
  private listeners = new Map<keyof Events, Set<EventHandler<any>>>()

  on<K extends keyof Events>(event: K, handler: EventHandler<Events[K]>): () => void {
    if (!this.listeners.has(event)) this.listeners.set(event, new Set())
    this.listeners.get(event)!.add(handler)
    // מחזיר פונקציית unsubscribe
    return () => this.listeners.get(event)?.delete(handler)
  }

  emit<K extends keyof Events>(event: K, data: Events[K]): void {
    this.listeners.get(event)?.forEach(handler => handler(data))
  }
}

// שימוש
type OrderEvents = {
  'order.created': { id: string; total: number }
  'order.shipped': { id: string; trackingNumber: string }
}

const orderBus = new EventEmitter<OrderEvents>()

// Observers — מנויים עצמאיים
const unsubEmail = orderBus.on('order.created', ({ id, total }) => {
  console.log(\`Sending confirmation email for order \${id}, total: \${total}\`)
})

orderBus.on('order.created', ({ id }) => {
  console.log(\`Updating inventory for order \${id}\`)
})

// Publisher
orderBus.emit('order.created', { id: 'o-1', total: 250 })
// → שני handlers נקראו

unsubEmail()  // הסר מנוי ה-email`,
      },
      { type: 'heading', text: 'Strategy — החלפת אלגוריתם בזמן ריצה' },
      {
        type: 'text',
        text: 'Strategy Pattern מפריד אלגוריתמים למחלקות נפרדות שניתן להחליף בזמן ריצה. הדוגמה מציגה מערכת תשלומים עם שלוש strategies: CreditCard, PayPal ו-Crypto. שימו לב ש-Checkout לא מכיל שום if/else לגבי שיטת תשלום — הוא פשוט קורא ל-strategy.pay() ומשאיר את הלוגיקה לכל strategy.',
      },
      {
        type: 'code',
        lang: 'typescript',
        caption: 'Strategy — בחירת אלגוריתם מיון/תשלום דינמית',
        code: `// Strategy: משפחה של אלגוריתמים — כל אחד בנפרד, ניתנים להחלפה
interface PaymentStrategy {
  pay(amount: number, details: PaymentDetails): Promise<PaymentResult>
}

class CreditCardStrategy implements PaymentStrategy {
  async pay(amount: number, details: PaymentDetails) {
    console.log(\`Charging \${amount} to card ending \${details.last4}\`)
    return { success: true, transactionId: 'cc-1' }
  }
}

class PayPalStrategy implements PaymentStrategy {
  async pay(amount: number, details: PaymentDetails) {
    console.log(\`PayPal charge \${amount} to \${details.email}\`)
    return { success: true, transactionId: 'pp-1' }
  }
}

class CryptoStrategy implements PaymentStrategy {
  async pay(amount: number, details: PaymentDetails) {
    console.log(\`Crypto tx \${amount} to \${details.wallet}\`)
    return { success: true, transactionId: 'btc-1' }
  }
}

// Context — משתמש ב-strategy ללא תלות במימוש
class Checkout {
  private strategy: PaymentStrategy

  setStrategy(strategy: PaymentStrategy) {
    this.strategy = strategy
  }

  async pay(amount: number, details: PaymentDetails) {
    return this.strategy.pay(amount, details)
  }
}

// שימוש — בחירה בזמן ריצה לפי ה-user
const checkout = new Checkout()
checkout.setStrategy(user.prefersCrypto ? new CryptoStrategy() : new CreditCardStrategy())
await checkout.pay(200, paymentDetails)`,
      },
      { type: 'heading', text: 'Command — encapsulate פעולה כאובייקט' },
      {
        type: 'text',
        text: 'Command Pattern הופך פעולות לאובייקטים שניתן לשמור, לבצע ולבטל. הדוגמה מציגה TextEditor עם undo/redo — כל InsertTextCommand שומר את ה-content הקודם ב-previousContent. שימו לב שה-editor לא יודע מה בדיוק הפקודה עושה — הוא רק שומר ב-history ויודע להפעיל execute() ו-undo().',
      },
      {
        type: 'code',
        lang: 'typescript',
        caption: 'Command Pattern — undo/redo, queue, history',
        code: `interface Command {
  execute(): void
  undo(): void
}

class TextEditor {
  private content = ''
  private history: Command[] = []

  executeCommand(command: Command): void {
    command.execute()
    this.history.push(command)
  }

  undoLast(): void {
    const command = this.history.pop()
    command?.undo()
  }

  getText() { return this.content }
  setText(text: string) { this.content = text }
}

class InsertTextCommand implements Command {
  private previousContent = ''

  constructor(
    private editor: TextEditor,
    private textToInsert: string,
    private position: number,
  ) {}

  execute() {
    this.previousContent = this.editor.getText()
    const text = this.editor.getText()
    this.editor.setText(
      text.slice(0, this.position) + this.textToInsert + text.slice(this.position)
    )
  }

  undo() {
    this.editor.setText(this.previousContent)
  }
}

// שימוש
const editor = new TextEditor()
editor.executeCommand(new InsertTextCommand(editor, 'Hello', 0))
editor.executeCommand(new InsertTextCommand(editor, ' World', 5))
console.log(editor.getText())  // "Hello World"
editor.undoLast()
console.log(editor.getText())  // "Hello"`,
      },
      { type: 'heading', text: 'Chain of Responsibility — שרשרת מטפלים' },
      {
        type: 'text',
        text: 'Chain of Responsibility מעביר בקשה דרך שרשרת של handlers — כל handler מחליט אם לטפל בה או להעביר הלאה. הדוגמה מציגה pipeline של Auth, RateLimit ו-Logging שמזכיר מאוד Express middleware. שימו לב ל-setNext() שמאפשר לבנות את השרשרת בגמישות ו-passToNext() שמעביר הלאה.',
      },
      {
        type: 'code',
        lang: 'typescript',
        caption: 'Chain of Responsibility — middleware pipeline',
        code: `// כל handler מחליט אם לטפל או להעביר הלאה
abstract class RequestHandler {
  private next: RequestHandler | null = null

  setNext(handler: RequestHandler): RequestHandler {
    this.next = handler
    return handler  // מאפשר chaining
  }

  protected passToNext(request: Request): Response | null {
    return this.next?.handle(request) ?? null
  }

  abstract handle(request: Request): Response | null
}

class AuthHandler extends RequestHandler {
  handle(req: Request): Response | null {
    if (!req.headers.authorization) {
      return { status: 401, body: 'Unauthorized' }
    }
    return this.passToNext(req)
  }
}

class RateLimitHandler extends RequestHandler {
  private counts = new Map<string, number>()

  handle(req: Request): Response | null {
    const ip = req.ip
    const count = (this.counts.get(ip) ?? 0) + 1
    this.counts.set(ip, count)
    if (count > 100) return { status: 429, body: 'Too Many Requests' }
    return this.passToNext(req)
  }
}

class LoggingHandler extends RequestHandler {
  handle(req: Request): Response | null {
    console.log(\`\${new Date().toISOString()} \${req.method} \${req.url}\`)
    const response = this.passToNext(req)
    console.log(\`→ \${response?.status}\`)
    return response
  }
}

// הרכבת השרשרת
const auth = new AuthHandler()
const rateLimit = new RateLimitHandler()
const logging = new LoggingHandler()

logging.setNext(auth).setNext(rateLimit)
// logging → auth → rateLimit → [route handler]`,
      },
    ],
    questionBank: [
      {
        id: 'behavioral-q1',
        text: 'מה Observer Pattern פותר?',
        options: [
          'יצירת objects',
          'coupling — event producer לא צריך לדעת מי מאזין. מוסיפים/מסירים listeners ללא שינוי ב-producer',
          'caching של נתונים',
          'המרת interfaces',
        ],
        correct: 1,
        explanation: 'OrderService לא יודע ש-EmailService, InventoryService ו-AnalyticsService מאזינים. כל אחד subscribes לאירועים — decoupling מלא.',
      },
      {
        id: 'behavioral-q2',
        text: 'מה ההבדל בין Strategy ל-if/else?',
        options: [
          'Strategy מהיר יותר',
          'Strategy מבודד כל אלגוריתם ב-class נפרד — מוסיפים אלגוריתם חדש ללא שינוי בקוד קיים (OCP)',
          'Strategy עובד רק עם async',
          'Strategy לא מאפשר החלפה בזמן ריצה',
        ],
        correct: 1,
        explanation: 'if/else: כל payment type חדש = פותחים את Checkout ומוסיפים case. Strategy: מוסיפים class חדש. הקוד הקיים לא משתנה. עונה על OCP.',
      },
      {
        id: 'behavioral-q3',
        text: 'מה הופך Command Pattern לשימושי לundo/redo?',
        options: [
          'Command שומר את כל ה-state',
          'כל Command מכיל execute() ו-undo() — ניתן לשמור היסטוריה של Commands ולבטל אחורה',
          'Command מהיר יותר מ-function call',
          'Command מאפשר הרצה מקבילה',
        ],
        correct: 1,
        explanation: 'Command encapsulates פעולה + מצב קודם. stack של Commands = history. pop() + undo() = undo. ניתן גם לqueue, serialize, ולבצע ב-thread אחר.',
      },
      {
        id: 'behavioral-q4',
        text: 'מה Chain of Responsibility דומה ל-middleware ב-Express?',
        options: [
          'שניהם מבוססי HTTP',
          'שניהם — כל handler מחליט אם לטפל בבקשה (return response) או להעביר הלאה (next())',
          'שניהם async בלבד',
          'שניהם דורשים TypeScript',
        ],
        correct: 1,
        explanation: 'Express middleware: (req, res, next) => {} — next() = passToNext. אותו pattern. Auth middleware בודק token — אם invalid, מחזיר 401. אם valid, קורא ל-next().',
      },
      {
        id: 'behavioral-q5',
        text: 'מה unsubscribe (ביטול מנוי) חשוב ב-Observer Pattern?',
        options: [
          'לשפר ביצועים',
          'למנוע memory leaks — listener שלא נמחק שומר reference לאובייקט ומונע garbage collection',
          'לאפשר יצירת listeners חדשים',
          'לוגינג של events',
        ],
        correct: 1,
        explanation: 'Component ש-subscribe ב-mount ולא unsubscribe ב-destroy → memory leak. ה-EventEmitter שומר reference ל-handler → ה-component לא נאסף ב-GC.',
      },
    ],
  },

  {
    id: 'event-driven-design',
    title: 'Event-Driven Architecture',
    summary: 'Events, Commands, Queries, Event Bus, Pub/Sub ו-Domain Events — תכנון מערכות מבוססות אירועים',
    emoji: '⚡',
    content: [
      { type: 'heading', text: 'מה זה Event-Driven Architecture?' },
      {
        type: 'text',
        text: 'Event-Driven Architecture (EDA) היא סגנון ארכיטקטורה שבו מודולים מתקשרים דרך events ולא קריאות ישירות. Producer מפרסם event — Consumer מאזין ומגיב. מאפשר decoupling גבוה, scalability, ו-loose coupling בין services.',
      },
      {
        type: 'table',
        caption: 'Events vs Commands vs Queries',
        headers: ['סוג', 'כיוון', 'שם', 'מגיב'],
        rows: [
          ['Event', 'publish (broadcast)', 'בעבר: OrderCreated', 'אפס עד רבים'],
          ['Command', 'שלח לנמען ספציפי', 'פקודה: CreateOrder', 'אחד בדיוק'],
          ['Query', 'בקשה עם תשובה', 'שאלה: GetOrder', 'אחד, מחזיר נתון'],
        ],
      },
      { type: 'heading', text: 'Domain Events — events עסקיים' },
      {
        type: 'text',
        text: 'Domain Events מייצגים דברים שקרו בעסק — עובדות שלא ניתן לשנות. הדוגמה מציגה OrderCreatedEvent ו-OrderShippedEvent עם כל השדות הדרושים. שימו לב ש-readonly על כל שדה מדגיש את ה-immutability, ושמות בלשון עבר (Created, Shipped) הם קונוונציה חשובה שמבטאת שהאירוע כבר קרה.',
      },
      {
        type: 'code',
        lang: 'typescript',
        caption: 'Domain Events — events שמייצגים דברים שקרו',
        code: `// Event: משהו קרה בעבר — immutable, named in past tense
interface DomainEvent {
  readonly eventId: string
  readonly occurredAt: Date
  readonly eventType: string
}

class OrderCreatedEvent implements DomainEvent {
  readonly eventId = crypto.randomUUID()
  readonly occurredAt = new Date()
  readonly eventType = 'order.created'

  constructor(
    readonly orderId: string,
    readonly customerId: string,
    readonly items: OrderItem[],
    readonly total: number,
  ) {}
}

class OrderShippedEvent implements DomainEvent {
  readonly eventId = crypto.randomUUID()
  readonly occurredAt = new Date()
  readonly eventType = 'order.shipped'

  constructor(
    readonly orderId: string,
    readonly trackingNumber: string,
    readonly estimatedDelivery: Date,
  ) {}
}

// Event Handler — מגיב לevents
interface EventHandler<T extends DomainEvent> {
  handle(event: T): Promise<void>
}

class SendOrderConfirmationHandler implements EventHandler<OrderCreatedEvent> {
  async handle(event: OrderCreatedEvent) {
    console.log(\`Sending confirmation for order \${event.orderId}\`)
    // שלח email, SMS וכד'
  }
}

class UpdateInventoryHandler implements EventHandler<OrderCreatedEvent> {
  async handle(event: OrderCreatedEvent) {
    for (const item of event.items) {
      console.log(\`Reserving \${item.qty}x \${item.productId}\`)
    }
  }
}`,
      },
      { type: 'heading', text: 'Event Bus — ציר התקשורת' },
      {
        type: 'text',
        text: 'EventBus הוא הגורם המתווך שמחבר בין publishers לconsumers. הדוגמה מציגה in-process EventBus שמאפשר לרשום handlers לפי eventType ולפרסם events. שימו לב ש-OrderService מפרסם event ולא יודע מי מאזין — ה-coupling הוא רק ל-EventBus ולא לשירותים ספציפיים.',
      },
      {
        type: 'code',
        lang: 'typescript',
        caption: 'In-Process Event Bus — pub/sub פשוט',
        code: `class EventBus {
  private handlers = new Map<string, EventHandler<any>[]>()

  subscribe<T extends DomainEvent>(
    eventType: string,
    handler: EventHandler<T>,
  ): void {
    const existing = this.handlers.get(eventType) ?? []
    this.handlers.set(eventType, [...existing, handler])
  }

  async publish(event: DomainEvent): Promise<void> {
    const eventHandlers = this.handlers.get(event.eventType) ?? []
    await Promise.all(eventHandlers.map(h => h.handle(event)))
  }
}

// הרכבה — Composition Root
const bus = new EventBus()

bus.subscribe('order.created', new SendOrderConfirmationHandler())
bus.subscribe('order.created', new UpdateInventoryHandler())
bus.subscribe('order.created', new CreateInvoiceHandler())

// שימוש ב-service
class OrderService {
  constructor(
    private orderRepo: OrderRepository,
    private bus: EventBus,
  ) {}

  async createOrder(request: CreateOrderRequest): Promise<Order> {
    const order = Order.create(request)
    await this.orderRepo.save(order)

    // מפרסם event — לא יודע מי מאזין
    await this.bus.publish(new OrderCreatedEvent(
      order.id,
      order.customerId,
      order.items,
      order.total,
    ))

    return order
  }
}`,
      },
      { type: 'heading', text: 'Async Events עם Message Queue' },
      {
        type: 'text',
        text: 'Outbox Pattern פותר את בעיית dual-write: אם שמרנו הזמנה ב-DB אבל ה-publish נכשל, נקבל inconsistency. הפתרון: שומרים גם את ה-event ב-outbox_events table באותה טרנזקציה — אם ה-transaction נכשל הכל מתבטל. Worker נפרד מפרסם events שעוד לא פורסמו.',
      },
      {
        type: 'code',
        lang: 'typescript',
        caption: 'Outbox Pattern — events אמינים עם DB',
        code: `// הבעיה: אם שמרנו ב-DB אבל publish נכשל → inconsistency
// פתרון: Outbox Pattern — שמור event ב-DB, publish בנפרד

// בטרנזקציה אחת: שמור order + event ב-outbox table
async function createOrderWithOutbox(
  request: CreateOrderRequest,
  db: Database,
): Promise<void> {
  await db.transaction(async (trx) => {
    const order = await trx('orders').insert(Order.create(request))

    await trx('outbox_events').insert({
      id: crypto.randomUUID(),
      event_type: 'order.created',
      payload: JSON.stringify({ orderId: order.id, ...request }),
      created_at: new Date(),
      published: false,
    })
  })
  // אם ה-transaction נכשל — גם ה-event לא נשמר ✓
}

// Worker נפרד — מפרסם events מה-outbox
async function outboxPublisher(db: Database, broker: MessageBroker) {
  const pending = await db('outbox_events').where({ published: false }).limit(100)

  for (const row of pending) {
    await broker.publish(row.event_type, JSON.parse(row.payload))
    await db('outbox_events').where({ id: row.id }).update({ published: true })
  }
}`,
      },
      {
        type: 'tip',
        text: 'Events צריכים להיות immutable ו-self-contained — כל המידע הדרוש לצרכן. אל תשלחו רק id ותאלצו את ה-consumer לעשות query נוסף — זה "Anemic Event" anti-pattern.',
      },
    ],
    questionBank: [
      {
        id: 'eda-q1',
        text: 'מה ההבדל בין Event ל-Command?',
        options: [
          'אין הבדל — שניהם מסרים',
          'Event = משהו שקרה (broadcast, מגיבים אפס עד רבים); Command = פקודה לנמען ספציפי לעשות משהו',
          'Command אסינכרוני, Event סינכרוני',
          'Event מכיל נתונים, Command לא',
        ],
        correct: 1,
        explanation: 'OrderCreated = event — "זה קרה, מי שמעניין אותו יגיב". CreateOrder = command — "עשה זאת עכשיו". Event לא מצפה לתשובה, Command לא בהכרח.',
      },
      {
        id: 'eda-q2',
        text: 'למה Events נקראים בלשון עבר (OrderCreated, UserRegistered)?',
        options: [
          'מסורת בלבד',
          'כי Event מייצג עובדה שכבר קרתה — immutable, לא ניתן לבטל את העבר',
          'כי זה קל יותר לקריאה',
          'כי Message Brokers דורשים זאת',
        ],
        correct: 1,
        explanation: 'Event = עובדה היסטורית. לא ניתן "לבטל" שהזמנה נוצרה. אם צריך לבטל — מפרסמים OrderCancelled event חדש. ה-event הישן נשאר בhistory.',
      },
      {
        id: 'eda-q3',
        text: 'מה הבעיה ב-"Anemic Event" (event עם id בלבד)?',
        options: [
          'אין בעיה — id מספיק',
          'Consumers נאלצים לעשות query נוסף לקבל נתונים — coupling ו-chatty communication',
          'id לא ייחודי מספיק',
          'Message Broker לא תומך',
        ],
        correct: 1,
        explanation: 'OrderCreated עם orderId בלבד → כל consumer צריך GET /orders/{id}. Self-contained event כולל את כל הנתונים הדרושים — אפס queries נוספים.',
      },
      {
        id: 'eda-q4',
        text: 'מה Outbox Pattern פותר?',
        options: [
          'ניהול תורים',
          'Dual-write problem — מבטיח שאם שמרנו ב-DB, ה-event יפורסם בסופו של דבר גם אם השרת נפל',
          'ניתוב events',
          'filtering של events',
        ],
        correct: 1,
        explanation: 'ללא Outbox: save(order) + publish(event) — אם publish נכשל אחרי save, יש הזמנה ב-DB בלי event. Outbox: הכל בטרנזקציה אחת → atomic. Worker מפרסם בנפרד.',
      },
      {
        id: 'eda-q5',
        text: 'מה יתרון EDA על direct service calls?',
        options: [
          'EDA מהיר יותר תמיד',
          'Loose coupling — OrderService לא יודע על EmailService, InventoryService. מוסיפים consumer חדש ללא שינוי ב-producer',
          'EDA פשוט יותר',
          'EDA עובד ללא DB',
        ],
        correct: 1,
        explanation: 'OrderService.createOrder שקורא ישירות ל-emailService.send() + inventoryService.reserve() = tight coupling. EDA: מפרסמים event — כל service עצמאי מאזין. מוסיפים Analytics service חדש ללא שינוי.',
      },
    ],
  },

  {
    id: 'cqrs-event-sourcing',
    title: 'CQRS ו-Event Sourcing',
    summary: 'הפרדת reads מ-writes עם CQRS, שמירת היסטוריה מלאה עם Event Sourcing, ו-Projections',
    emoji: '📚',
    content: [
      { type: 'heading', text: 'CQRS — Command Query Responsibility Segregation' },
      {
        type: 'text',
        text: 'CQRS מבדיל בין שתי אחריות: Commands (פקודות שמשנות state) ו-Queries (שאילתות שקוראות state). ניתן לאופטימז כל צד בנפרד — write side עם לוגיקה עסקית, read side עם views מותאמים לצרכי UI.',
      },
      {
        type: 'table',
        caption: 'CQRS — שני צדדים',
        headers: ['Command Side', 'Query Side'],
        rows: [
          ['שינוי state', 'קריאת state בלבד'],
          ['לוגיקה עסקית, validations', 'מהיר, מותאם ל-UI'],
          ['מחזיר void / ID', 'מחזיר DTO מותאם'],
          ['Write DB (נרמל)', 'Read DB / cache (מינורמל)'],
        ],
      },
      {
        type: 'code',
        lang: 'typescript',
        caption: 'CQRS — Commands ו-Queries נפרדים',
        code: `// ── Command Side ──────────────────────────────────────────
interface Command {}
interface CommandHandler<C extends Command> {
  handle(command: C): Promise<void>
}

class CreateOrderCommand implements Command {
  constructor(
    readonly customerId: string,
    readonly items: { productId: string; qty: number; price: number }[],
  ) {}
}

class CreateOrderHandler implements CommandHandler<CreateOrderCommand> {
  constructor(private orderRepo: OrderRepository, private bus: EventBus) {}

  async handle(cmd: CreateOrderCommand): Promise<void> {
    const order = Order.create(cmd.customerId, cmd.items)
    await this.orderRepo.save(order)
    await this.bus.publish(new OrderCreatedEvent(order.id, cmd.customerId, order.total))
  }
}

// ── Query Side ────────────────────────────────────────────
interface Query<TResult> {}

class GetOrderSummaryQuery implements Query<OrderSummaryDTO> {
  constructor(readonly customerId: string) {}
}

// Read model — DTO מותאם לצרכי UI, לא domain model
interface OrderSummaryDTO {
  orderId: string
  status: string
  total: number
  itemCount: number
  createdAt: string
}

class GetOrderSummaryHandler {
  constructor(private readDb: ReadDatabase) {}

  async handle(query: GetOrderSummaryQuery): Promise<OrderSummaryDTO[]> {
    // שאילתה על read DB מינורמלית — מהירה
    return this.readDb.query(\`
      SELECT o.id, o.status, o.total, COUNT(i.id) as item_count, o.created_at
      FROM order_summaries o
      JOIN order_items i ON i.order_id = o.id
      WHERE o.customer_id = $1
      GROUP BY o.id
    \`, [query.customerId])
  }
}`,
      },
      { type: 'heading', text: 'Event Sourcing — שמירת היסטוריה כ-events' },
      {
        type: 'text',
        text: 'Event Sourcing: במקום לשמור את המצב הנוכחי של entity, שומרים את כל ה-events שגרמו לו להגיע למצב זה. המצב הנוכחי = replay של כל ה-events.',
      },
      {
        type: 'code',
        lang: 'typescript',
        caption: 'Event Sourcing — BankAccount',
        code: `// Events
class AccountOpened implements DomainEvent {
  readonly eventType = 'account.opened'
  readonly eventId = crypto.randomUUID()
  readonly occurredAt = new Date()
  constructor(readonly accountId: string, readonly initialBalance: number) {}
}

class MoneyDeposited implements DomainEvent {
  readonly eventType = 'account.deposited'
  readonly eventId = crypto.randomUUID()
  readonly occurredAt = new Date()
  constructor(readonly accountId: string, readonly amount: number) {}
}

class MoneyWithdrawn implements DomainEvent {
  readonly eventType = 'account.withdrawn'
  readonly eventId = crypto.randomUUID()
  readonly occurredAt = new Date()
  constructor(readonly accountId: string, readonly amount: number) {}
}

// Aggregate — בנוי מ-events
class BankAccount {
  private balance = 0
  private readonly uncommittedEvents: DomainEvent[] = []

  // מבנה מ-event history
  static fromEvents(events: DomainEvent[]): BankAccount {
    const account = new BankAccount()
    events.forEach(e => account.apply(e))
    return account
  }

  open(accountId: string, initialBalance: number) {
    this.raiseEvent(new AccountOpened(accountId, initialBalance))
  }

  deposit(accountId: string, amount: number) {
    if (amount <= 0) throw new Error('Amount must be positive')
    this.raiseEvent(new MoneyDeposited(accountId, amount))
  }

  withdraw(accountId: string, amount: number) {
    if (amount > this.balance) throw new Error('Insufficient funds')
    this.raiseEvent(new MoneyWithdrawn(accountId, amount))
  }

  private raiseEvent(event: DomainEvent) {
    this.apply(event)
    this.uncommittedEvents.push(event)
  }

  // apply — עדכון state מ-event
  private apply(event: DomainEvent) {
    if (event instanceof AccountOpened)  this.balance = event.initialBalance
    if (event instanceof MoneyDeposited) this.balance += event.amount
    if (event instanceof MoneyWithdrawn) this.balance -= event.amount
  }

  getBalance() { return this.balance }
  getUncommittedEvents() { return [...this.uncommittedEvents] }
}

// Event Store
class EventStore {
  private store = new Map<string, DomainEvent[]>()

  append(aggregateId: string, events: DomainEvent[]) {
    const existing = this.store.get(aggregateId) ?? []
    this.store.set(aggregateId, [...existing, ...events])
  }

  getEvents(aggregateId: string): DomainEvent[] {
    return this.store.get(aggregateId) ?? []
  }
}`,
      },
      { type: 'heading', text: 'Projections — Read Models מ-Events' },
      {
        type: 'text',
        text: 'Projection מאזינה ל-event stream ובונה view מותאם לצרכי קריאה. הדוגמה מציגה שתי projections שונות מאותו event stream: AccountBalanceProjection ליתרה נוכחית, ו-AccountActivityProjection לפעילות. שימו לב שניתן לבנות כמה projections שונות מאותם events — ואפילו לבנות מחדש מה-event history אם נדרש.',
      },
      {
        type: 'code',
        lang: 'typescript',
        caption: 'Projection — בניית read model מ-event stream',
        code: `// Projection: מאזין לevents ובונה view מותאם לקריאה
class AccountBalanceProjection {
  private balances = new Map<string, number>()

  // מעדכן view לכל event
  on(event: DomainEvent) {
    if (event instanceof AccountOpened) {
      this.balances.set(event.accountId, event.initialBalance)
    }
    if (event instanceof MoneyDeposited) {
      const current = this.balances.get(event.accountId) ?? 0
      this.balances.set(event.accountId, current + event.amount)
    }
    if (event instanceof MoneyWithdrawn) {
      const current = this.balances.get(event.accountId) ?? 0
      this.balances.set(event.accountId, current - event.amount)
    }
  }

  getBalance(accountId: string): number {
    return this.balances.get(accountId) ?? 0
  }
}

// ניתן לבנות כמה projections שונות מאותם events
class AccountActivityProjection {
  private activity: { accountId: string; action: string; amount: number; date: Date }[] = []

  on(event: DomainEvent) {
    if (event instanceof MoneyDeposited) {
      this.activity.push({ accountId: event.accountId, action: 'deposit', amount: event.amount, date: event.occurredAt })
    }
    if (event instanceof MoneyWithdrawn) {
      this.activity.push({ accountId: event.accountId, action: 'withdrawal', amount: event.amount, date: event.occurredAt })
    }
  }

  getActivity(accountId: string) {
    return this.activity.filter(a => a.accountId === accountId)
  }
}`,
      },
      {
        type: 'tip',
        text: 'CQRS ו-Event Sourcing הם כלים חזקים — אבל מורכבים. CQRS בלי Event Sourcing שימושי כבר ב-systems בינוניים. Event Sourcing מתאים כשזקוקים לaudit trail מלא, time travel, או replay. לא לכל project.',
      },
    ],
    questionBank: [
      {
        id: 'cqrs-q1',
        text: 'מה CQRS מבדיל?',
        options: [
          'Frontend מ-Backend',
          'Commands (write, שינוי state) מ-Queries (read, קריאת state) — שתי אחריות, שני models',
          'Sync מ-Async',
          'DB מ-Cache',
        ],
        correct: 1,
        explanation: 'CQRS: Command handler שומר, מאמת, מפרסם events. Query handler שולף DTO מותאם ל-UI. כל צד מואופטם בנפרד — write DB מנרמל, read DB מינורמלי.',
      },
      {
        id: 'cqrs-q2',
        text: 'מה יתרון Read Model נפרד ב-CQRS?',
        options: [
          'חוסך זיכרון',
          'ניתן לאופטימז queries לצרכי UI ללא שינוי Domain Model — pre-computed views, denormalized data',
          'מונע cache invalidation',
          'מאפשר SQL',
        ],
        correct: 1,
        explanation: 'Domain model מותאם לloגיקה עסקית. Read model מותאם לUI — JOIN מוכן, שדות מחושבים. אפשר לשנות read model ללא נגיעה בwrite side.',
      },
      {
        id: 'cqrs-q3',
        text: 'מה Event Sourcing שומר ב-DB?',
        options: [
          'את המצב הנוכחי של כל entity',
          'את כל ה-events שקרו — המצב הנוכחי מחושב ב-replay. כל השינויים ב-history',
          'רק את ה-event האחרון',
          'Snapshots כל שעה',
        ],
        correct: 1,
        explanation: 'Event Sourcing: אין UPDATE, רק INSERT events. BankAccount.balance = replay של AccountOpened + כל MoneyDeposited - כל MoneyWithdrawn. היסטוריה מלאה.',
      },
      {
        id: 'cqrs-q4',
        text: 'מה Projection עושה ב-Event Sourcing?',
        options: [
          'שומר events',
          'מאזין ל-event stream ובונה view מותאם לקריאה — ניתן לבנות כמה projections שונות מאותם events',
          'מאמת events',
          'שולח events ל-Message Broker',
        ],
        correct: 1,
        explanation: 'מאותם events: AccountBalanceProjection (יתרה נוכחית), AccountActivityProjection (פעילות). שתי views שונות לחלוטין — אותו event stream. ניתן גם לrebuild מאפס.',
      },
      {
        id: 'cqrs-q5',
        text: 'מה היתרון של Event Sourcing ל-audit ו-debugging?',
        options: [
          'logs מהירים יותר',
          'היסטוריה מלאה ובלתי ניתנת למחיקה — time travel (מה היה ה-state בתאריך X), audit trail, replay',
          'חוסך DB storage',
          'מאפשר DELETE ב-SQL',
        ],
        correct: 1,
        explanation: 'Event Sourcing: "מה היה יתרת החשבון ב-1.1.2024?" = replay events עד לתאריך. "מי שינה X?" = מסתכלים ב-event stream. Regulatory compliance, bug investigation.',
      },
    ],
  },
]
