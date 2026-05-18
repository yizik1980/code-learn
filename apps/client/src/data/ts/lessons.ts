import type { Lesson } from '../../types'

export const tsLessons: Lesson[] = [
  {
    id: 'ts-intro',
    title: 'מבוא ל-TypeScript',
    summary: 'למה TypeScript, איך מגדירים טיפוסים ומה זה type safety',
    emoji: '🔷',
    content: [
      { type: 'heading', text: 'מה זה TypeScript?' },
      { type: 'text', text: 'TypeScript היא JavaScript עם טיפוסים. היא מאפשרת לך להגדיר מה סוג הנתונים שכל משתנה, פרמטר ופונקציה מצפים לקבל — ומגלה שגיאות לפני שהקוד רץ.' },
      { type: 'tip', text: 'TypeScript מתורגם (compiled) ל-JavaScript רגיל לפני הרצה. הדפדפן לא מבין TS ישירות.' },
      { type: 'heading', text: 'הגדרת טיפוסים בסיסיים' },
      { type: 'code', lang: 'typescript', caption: 'type annotations', code: `let name: string = "דן";
let age: number = 25;
let isActive: boolean = true;

// TS מגלה שגיאות:
// name = 42;  // שגיאה! number לא תואם ל-string

// TS יכול להסיק טיפוסים אוטומטית:
let city = "תל אביב";  // TS יודע שזה string
// city = 100;          // שגיאה!` },
      { type: 'heading', text: 'טיפוסי מערכים ו-tuples' },
      { type: 'code', lang: 'typescript', caption: 'Arrays ו-Tuples', code: `// מערך של מספרים:
const scores: number[] = [90, 85, 78];

// מערך של מחרוזות:
const names: string[] = ["אלי", "שרה"];

// Tuple — מערך עם אורך וטיפוסים קבועים:
const point: [number, number] = [10, 20];
const person: [string, number] = ["דן", 28];` },
      { type: 'heading', text: 'פונקציות עם טיפוסים' },
      { type: 'code', lang: 'typescript', caption: 'typed functions', code: `function add(a: number, b: number): number {
  return a + b;
}

// Arrow function:
const greet = (name: string): string => {
  return \`שלום, \${name}!\`;
};

// void — לא מחזיר כלום:
function logMessage(msg: string): void {
  console.log(msg);
}

// optional parameter עם ?:
function createUser(name: string, age?: number) {
  return { name, age: age ?? 0 };
}` },
      { type: 'heading', text: 'Union Types' },
      { type: 'code', lang: 'typescript', caption: 'Union — כמה טיפוסים אפשריים', code: `let id: string | number;
id = "abc-123";  // עובד
id = 456;        // עובד
// id = true;   // שגיאה!

function formatId(id: string | number): string {
  if (typeof id === "string") {
    return id.toUpperCase();
  }
  return id.toString();
}` },
    ],
    questionBank: [
      {
        id: 'ts-intro-q1',
        text: 'מה TypeScript מוסיפה מעל JavaScript?',
        options: ['מהירות ריצה', 'מערכת טיפוסים סטטית', 'תמיכה ב-HTML', 'ספרייה של UI'],
        correct: 1,
        explanation: 'TypeScript מוסיפה type system סטטית שמגלה שגיאות בזמן קומפילציה, לפני ריצה.',
      },
      {
        id: 'ts-intro-q2',
        text: 'מה יקרה אם נגדיר let x: number = "שלום"?',
        options: ['x יהיה "שלום"', 'שגיאת TypeScript בזמן קומפילציה', 'JS יתרגם אוטומטית', 'x יהיה NaN'],
        correct: 1,
        explanation: 'TS יזהה שאנחנו מנסים להשים string בתוך number ויוציא שגיאה לפני הרצה.',
      },
      {
        id: 'ts-intro-q3',
        text: 'מה זה Type Inference?',
        options: ['הצהרת טיפוס ידנית', 'TS מנחש את הטיפוס אוטומטית לפי הערך', 'המרה בין טיפוסים', 'Union Type'],
        correct: 1,
        explanation: 'Type Inference: כשכותבים let x = 5, TS יודע שזה number בלי שנצטרך לכתוב : number.',
      },
      {
        id: 'ts-intro-q4',
        text: 'מה מייצג הטיפוס void?',
        options: ['ערך ריק', 'פונקציה שלא מחזירה ערך', 'מספר אפס', 'null ו-undefined'],
        correct: 1,
        explanation: 'void משמש לציון שפונקציה לא מחזירה ערך משמעותי (return ריק או ללא return).',
      },
      {
        id: 'ts-intro-q5',
        text: 'מה זה Union Type?',
        options: ['חיבור של שני מערכים', 'טיפוס שיכול להיות אחד מכמה אפשרויות', 'ממשק בין modules', 'ירושה'],
        correct: 1,
        explanation: 'Union Type (עם |) מאפשר משתנה להכיל ערכים מכמה טיפוסים: string | number.',
      },
      {
        id: 'ts-intro-q6',
        text: 'מה מייצג ? בפרמטר: function f(name?: string)?',
        options: ['name חייב להיות string', 'name הוא optional — ניתן לא להעביר', 'name יכול להיות כל טיפוס', 'שגיאת syntax'],
        correct: 1,
        explanation: '? מסמן פרמטר אופציונלי. ניתן לקרוא לפונקציה בלי להעביר אותו.',
      },
      {
        id: 'ts-intro-q7',
        text: 'מה הוא הטיפוס הנכון עבור מערך של מחרוזות?',
        options: ['string', 'Array', 'string[]', 'strings'],
        correct: 2,
        explanation: 'מערך של strings מוגדר כ-string[] (או Array<string> כתחביר חלופי).',
      },
      {
        id: 'ts-intro-q8',
        text: 'מה זה Tuple ב-TypeScript?',
        options: ['אובייקט עם שני מפתחות', 'מערך עם מספר ידוע של אלמנטים בטיפוסים ספציפיים', 'פונקציה שמחזירה זוג ערכים', 'Union של שני טיפוסים'],
        correct: 1,
        explanation: 'Tuple הוא מערך עם אורך קבוע שבו כל מיקום מוגדר עם טיפוס: [string, number].',
      },
    ],
  },
  {
    id: 'ts-interfaces',
    title: 'Interfaces ו-Type Aliases',
    summary: 'הגדרת מבנה אובייקטים עם interface ו-type, ושימוש ב-readonly ו-optional',
    emoji: '📋',
    content: [
      { type: 'heading', text: 'Interface — הגדרת מבנה אובייקט' },
      { type: 'text', text: 'Interface מגדיר את "חוזה" האובייקט — אילו תכונות הוא חייב להכיל ואיזה טיפוס יש לכל אחת.' },
      { type: 'code', lang: 'typescript', caption: 'interface', code: `interface User {
  id: number;
  name: string;
  email: string;
  age?: number;        // optional
  readonly createdAt: Date; // לא ניתן לשינוי
}

const user: User = {
  id: 1,
  name: "שרה",
  email: "sarah@example.com",
  createdAt: new Date(),
};

// user.createdAt = new Date(); // שגיאה! readonly` },
      { type: 'heading', text: 'Type Alias' },
      { type: 'code', lang: 'typescript', caption: 'type', code: `type Point = {
  x: number;
  y: number;
};

type Status = "active" | "inactive" | "pending";

type ID = string | number;

const point: Point = { x: 10, y: 20 };
const status: Status = "active";
// const bad: Status = "unknown"; // שגיאה!` },
      { type: 'heading', text: 'Interface vs Type — מתי להשתמש?' },
      { type: 'tip', text: 'Interface: עדיף לאובייקטים ו-classes — ניתן להרחבה (extend). Type: עדיף ל-union types, tuples ו-types מורכבים.' },
      { type: 'heading', text: 'הרחבת Interface' },
      { type: 'code', lang: 'typescript', caption: 'extends', code: `interface Animal {
  name: string;
  sound(): string;
}

interface Dog extends Animal {
  breed: string;
}

const dog: Dog = {
  name: "רקס",
  breed: "לברדור",
  sound: () => "הב הב",
};` },
      { type: 'heading', text: 'Intersection Types' },
      { type: 'code', lang: 'typescript', caption: 'שילוב עם &', code: `type Named = { name: string };
type Aged = { age: number };

// שילוב עם &:
type Person = Named & Aged;

const person: Person = {
  name: "אלי",
  age: 30,
};` },
    ],
    questionBank: [
      {
        id: 'ts-int-q1',
        text: 'מה מגדיר interface?',
        options: ['פונקציה מיוחדת', 'מבנה שאובייקטים חייבים לעמוד בו', 'class מופשט', 'module'],
        correct: 1,
        explanation: 'Interface מגדיר חוזה: אילו תכונות ואיזה טיפוסים על אובייקט לקיים.',
      },
      {
        id: 'ts-int-q2',
        text: 'מה עושה ? בתכונה של interface?',
        options: ['מוחק את התכונה', 'הופך אותה לאופציונלית', 'מגדיר ערך ברירת מחדל', 'מגדיר כ-readonly'],
        correct: 1,
        explanation: 'שדה עם ? הוא optional — האובייקט יכול לכלול אותו אבל לא חייב.',
      },
      {
        id: 'ts-int-q3',
        text: 'מה עושה readonly בתכונת interface?',
        options: ['מגדיר כ-private', 'מונע שינוי לאחר אתחול', 'מגדיר ערך קבוע בזמן קומפילציה', 'מסמן כ-optional'],
        correct: 1,
        explanation: 'readonly מאפשר להגדיר את הערך פעם אחת (בעת יצירה), אבל מונע שינויים מאוחרים יותר.',
      },
      {
        id: 'ts-int-q4',
        text: 'מה עושה type Status = "open" | "closed"?',
        options: ['מגדיר enum', 'מגדיר union type עם ערכים ספציפיים', 'interface עם שני שדות', 'class עם מצבים'],
        correct: 1,
        explanation: 'Literal Union Type — Status יכול להיות רק "open" או "closed". ניסיון עם ערך אחר יגרום לשגיאה.',
      },
      {
        id: 'ts-int-q5',
        text: 'מה ההבדל העיקרי בין interface לבין type?',
        options: ['אין הבדל', 'interface ניתן להרחבה וcomposable, type גמיש יותר ל-unions', 'type מהיר יותר', 'interface לא תומך ב-optional'],
        correct: 1,
        explanation: 'interface מצטיין ב-extends ו-declaration merging. type מצטיין ב-unions, intersections ו-mapped types.',
      },
      {
        id: 'ts-int-q6',
        text: 'מה עושה interface Child extends Parent?',
        options: ['מבטל את Parent', 'יוצר interface חדש שיש בו את כל שדות Parent בנוסף לחדשים', 'מעתיק רק שדות optional', 'מגדיר class'],
        correct: 1,
        explanation: 'extends מאפשר ל-interface לרשת את כל שדות ה-interface האב ולהוסיף שדות חדשים.',
      },
      {
        id: 'ts-int-q7',
        text: 'מה יעשה Intersection Type: type AB = A & B?',
        options: ['מחזיר union', 'יוצר טיפוס עם כל השדות של A וגם של B', 'שגיאה', 'מחזיר רק שדות משותפים'],
        correct: 1,
        explanation: 'Intersection (&) יוצר טיפוס שמכיל את כל השדות מכל הטיפוסים המשותפים.',
      },
      {
        id: 'ts-int-q8',
        text: 'מה יקרה אם ניסיון לשנות readonly property?',
        options: ['הערך ישתנה', 'TS ירים שגיאת קומפילציה', 'JS יתעלם', 'יוחזר undefined'],
        correct: 1,
        explanation: 'TS מגלה ניסיון לשנות readonly property ומוציא שגיאת קומפילציה.',
      },
    ],
  },
  {
    id: 'ts-generics',
    title: 'Generics',
    summary: 'פונקציות וטיפוסים גנריים לשימוש חוזר בטוח-טיפוסים',
    emoji: '🧬',
    content: [
      { type: 'heading', text: 'מה זה Generics?' },
      { type: 'text', text: 'Generics מאפשרים לכתוב פונקציות ו-classes שעובדים עם כל טיפוס תוך שמירה על type safety. במקום לכתוב את אותה לוגיקה פעמים — פעם אחת גנרית.' },
      { type: 'code', lang: 'typescript', caption: 'פונקציה גנרית בסיסית', code: `// בלי generics — any מאבד type safety:
function identity(value: any): any {
  return value;
}

// עם generics — שומרים על הטיפוס:
function identity<T>(value: T): T {
  return value;
}

const num = identity<number>(42);    // num: number
const str = identity<string>("שלום"); // str: string
// TS יכול להסיק אוטומטית:
const bool = identity(true);          // bool: boolean` },
      { type: 'heading', text: 'Generic בפונקציות מערך' },
      { type: 'code', lang: 'typescript', caption: 'Generic עם מערכים', code: `function first<T>(arr: T[]): T | undefined {
  return arr[0];
}

const firstNum = first([1, 2, 3]);     // number | undefined
const firstStr = first(["a", "b"]);    // string | undefined

function wrap<T>(value: T): T[] {
  return [value];
}` },
      { type: 'heading', text: 'Generic Interfaces' },
      { type: 'code', lang: 'typescript', caption: 'Generic interface', code: `interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
}

interface User {
  id: number;
  name: string;
}

// שימוש:
const userResponse: ApiResponse<User> = {
  data: { id: 1, name: "שרה" },
  status: 200,
  message: "success",
};

const usersResponse: ApiResponse<User[]> = {
  data: [{ id: 1, name: "שרה" }],
  status: 200,
  message: "success",
};` },
      { type: 'heading', text: 'Constraints — הגבלת Generics' },
      { type: 'code', lang: 'typescript', caption: 'extends constraint', code: `// T חייב להיות עם תכונה length:
function printLength<T extends { length: number }>(item: T): void {
  console.log(item.length);
}

printLength("שלום");    // 4
printLength([1, 2, 3]); // 3
// printLength(42);     // שגיאה! number לא ל-length` },
      { type: 'tip', text: 'Generics הם הבסיס לספריות כמו React. כל useState<T>, useRef<T> הם generic!' },
    ],
    questionBank: [
      {
        id: 'ts-gen-q1',
        text: 'למה משתמשים ב-Generics?',
        options: ['לביצועים טובים יותר', 'לשימוש חוזר בקוד תוך שמירת type safety', 'לקיצור הקוד', 'לירושה'],
        correct: 1,
        explanation: 'Generics מאפשרים לכתוב קוד גמיש שעובד עם כל טיפוס בלי להקריב type safety.',
      },
      {
        id: 'ts-gen-q2',
        text: 'מה משמעות ה-T ב-function identity<T>(val: T): T?',
        options: ['Type של TypeScript', 'פרמטר טיפוס שיוגדר בזמן שימוש', 'string בלבד', 'ערך ברירת מחדל'],
        correct: 1,
        explanation: 'T הוא type parameter — placeholder לטיפוס שיסופק בעת קריאה לפונקציה.',
      },
      {
        id: 'ts-gen-q3',
        text: 'מה יהיה הטיפוס של first([1,2,3]) אם function first<T>(arr: T[]): T?',
        options: ['any', 'number', 'number[]', 'T'],
        correct: 1,
        explanation: 'TS מסיק ש-T = number מהמערך. לכן first([1,2,3]) מחזיר number.',
      },
      {
        id: 'ts-gen-q4',
        text: 'מה עושה <T extends string>?',
        options: ['T חייב להיות תת-מחלקה של string', 'T מוגבל לטיפוסים שניתנים להשמה ל-string', 'T = string תמיד', 'שגיאה'],
        correct: 1,
        explanation: 'extends ב-generic constraint מגביל את T לטיפוסים שמתאימים לסוג הנתון.',
      },
      {
        id: 'ts-gen-q5',
        text: 'מה מחזיר ApiResponse<User> אם ApiResponse<T> = { data: T }?',
        options: ['{ data: any }', '{ data: User }', 'User', 'שגיאה'],
        correct: 1,
        explanation: 'Generic interface — T מוחלף ב-User. התוצאה: { data: User, ... }.',
      },
      {
        id: 'ts-gen-q6',
        text: 'האם TS יכול להסיק generic type אוטומטית?',
        options: ['לא, תמיד צריך לכתוב', 'כן, כשניתן להסיק מהארגומנטים', 'רק עם any', 'רק ב-interfaces'],
        correct: 1,
        explanation: 'TS לרוב מסיק את ה-generic type מהארגומנטים. identity(42) → T=number אוטומטית.',
      },
      {
        id: 'ts-gen-q7',
        text: 'מה ההבדל בין any לבין Generic?',
        options: ['אין הבדל', 'any מאבד type safety, generic שומר עליה', 'generic יותר איטי', 'any עדיף תמיד'],
        correct: 1,
        explanation: 'any משבית בדיקות טיפוסים לחלוטין. Generic שומר על הקשר בין טיפוסי הקלט והפלט.',
      },
      {
        id: 'ts-gen-q8',
        text: 'מה זה useState<number>() ב-React?',
        options: ['שגיאה ב-React', 'Generic hook עם TS — מגדיר שה-state הוא מסוג number', 'casting ל-number', 'ספריית React בלבד'],
        correct: 1,
        explanation: 'useState<number>() הוא שימוש ב-generic hook. TS יידע שהערך הוא number וה-setter מקבל number.',
      },
    ],
  },
  {
    id: 'ts-utility-types',
    title: 'Utility Types',
    summary: 'Partial, Required, Pick, Omit, Record ועוד — כלים מובנים לטיפול בטיפוסים',
    emoji: '🛠️',
    content: [
      { type: 'heading', text: 'מה זה Utility Types?' },
      { type: 'text', text: 'TypeScript מגיעה עם utility types מובנים שמאפשרים לשנות ולהרכיב טיפוסים קיימים בקלות.' },
      { type: 'heading', text: 'Partial — כל השדות אופציונליים' },
      { type: 'code', lang: 'typescript', caption: 'Partial<T>', code: `interface User {
  id: number;
  name: string;
  email: string;
}

// כל השדות הופכים ל-optional:
type PartialUser = Partial<User>;
// { id?: number; name?: string; email?: string }

function updateUser(id: number, data: Partial<User>) {
  // יכול לקבל רק חלק מהשדות
}

updateUser(1, { name: "שם חדש" }); // עובד!` },
      { type: 'heading', text: 'Pick ו-Omit — בחירה/הסרה של שדות' },
      { type: 'code', lang: 'typescript', caption: 'Pick & Omit', code: `interface User {
  id: number;
  name: string;
  email: string;
  password: string;
}

// רק שדות נבחרים:
type PublicUser = Pick<User, "id" | "name" | "email">;

// כל השדות פרט:
type UserWithoutPassword = Omit<User, "password">;

const safeUser: PublicUser = {
  id: 1,
  name: "שרה",
  email: "sarah@example.com",
};` },
      { type: 'heading', text: 'Required — כל השדות חובה' },
      { type: 'code', lang: 'typescript', caption: 'Required<T>', code: `interface Config {
  host?: string;
  port?: number;
  debug?: boolean;
}

// מסיר את ה-? מכל השדות:
type StrictConfig = Required<Config>;
// { host: string; port: number; debug: boolean }` },
      { type: 'heading', text: 'Record — מפה עם טיפוסים' },
      { type: 'code', lang: 'typescript', caption: 'Record<K, V>', code: `type Role = "admin" | "user" | "guest";

const permissions: Record<Role, string[]> = {
  admin: ["read", "write", "delete"],
  user: ["read", "write"],
  guest: ["read"],
};

// מילון כללי:
const cache: Record<string, number> = {};
cache["key1"] = 100;` },
      { type: 'tip', text: 'Utility types הם כלי חיוני. Partial שימושי במיוחד עבור update functions ו-React props.' },
    ],
    questionBank: [
      {
        id: 'ts-util-q1',
        text: 'מה עושה Partial<User>?',
        options: ['מוחק מחצית מהשדות', 'הופך את כל שדות User לאופציונליים', 'בוחר שדות לפי שם', 'מגדיר User חלקי חדש'],
        correct: 1,
        explanation: 'Partial<T> לוקח כל שדה ב-T ומוסיף ? — הופך אותם לאופציונליים.',
      },
      {
        id: 'ts-util-q2',
        text: 'מה יכיל Pick<User, "name" | "email">?',
        options: ['User בלי name ו-email', 'רק name ו-email מ-User', 'כל שדות User', 'User עם name ו-email חובה'],
        correct: 1,
        explanation: 'Pick בוחר רק את השדות הנקובים מה-interface. התוצאה: { name: string; email: string }.',
      },
      {
        id: 'ts-util-q3',
        text: 'מה ההבדל בין Pick לבין Omit?',
        options: ['אין הבדל', 'Pick בוחר שדות, Omit מסיר שדות', 'Omit בוחר שדות, Pick מסיר', 'Pick ל-string, Omit למספרים'],
        correct: 1,
        explanation: 'Pick<T, K> — רק השדות שציינת. Omit<T, K> — כל השדות פרט לאלו שציינת.',
      },
      {
        id: 'ts-util-q4',
        text: 'מה עושה Required<Config>?',
        options: ['מוסיף ? לכל השדות', 'מסיר ? מכל השדות — כל שדה הופך לחובה', 'מוחק שדות ריקים', 'מגדיר ערכי ברירת מחדל'],
        correct: 1,
        explanation: 'Required<T> הוא ההפך מ-Partial — מסיר את ? ומגדיר כל שדה כחובה.',
      },
      {
        id: 'ts-util-q5',
        text: 'מה זה Record<string, number>?',
        options: ['מערך של מחרוזות ומספרים', 'object עם מפתחות string וערכים number', 'Tuple', 'Union Type'],
        correct: 1,
        explanation: 'Record<K, V> מגדיר object שבו כל מפתח הוא מטיפוס K וכל ערך מטיפוס V.',
      },
      {
        id: 'ts-util-q6',
        text: 'למה Partial שימושי ב-update functions?',
        options: ['כי update מחזיר void', 'כי update מקבל רק חלק מהשדות לעדכון', 'כי Partial מהיר יותר', 'כי מחייב user interface'],
        correct: 1,
        explanation: 'בפונקציית update רוצים לאפשר לשדות להיות אופציונליים — לעדכן רק מה שנדרש.',
      },
      {
        id: 'ts-util-q7',
        text: 'מה יהיה טיפוס המפתחות ב-Record<"a" | "b", number>?',
        options: ['string', 'number', '"a" | "b" בלבד', 'any'],
        correct: 2,
        explanation: 'Record<"a"|"b", number> מחייב שיהיו בדיוק המפתחות "a" ו-"b" — לא יותר ולא פחות.',
      },
      {
        id: 'ts-util-q8',
        text: 'מהם Utility Types?',
        options: ['ספריה חיצונית', 'טיפוסים מובנים ב-TS שמשנים טיפוסים קיימים', 'פונקציות עזר', 'קיצורי דרך ל-console'],
        correct: 1,
        explanation: 'Utility Types הם טיפוסים גנריים מובנים ב-TypeScript שמאפשרים טרנספורמציות על טיפוסים קיימים.',
      },
    ],
  },
  {
    id: 'ts-classes',
    title: 'Classes ב-TypeScript',
    summary: 'OOP עם TypeScript: access modifiers, implements, abstract classes',
    emoji: '🏗️',
    content: [
      { type: 'heading', text: 'Classes עם TypeScript' },
      { type: 'text', text: 'TypeScript מחזק את ה-classes של JavaScript עם access modifiers, typed properties וממשקים.' },
      { type: 'code', lang: 'typescript', caption: 'Class בסיסי', code: `class Person {
  public name: string;
  private age: number;
  readonly id: number;

  constructor(name: string, age: number, id: number) {
    this.name = name;
    this.age = age;
    this.id = id;
  }

  greet(): string {
    return \`שלום, אני \${this.name}\`;
  }

  getAge(): number {
    return this.age;
  }
}

const p = new Person("דן", 25, 1);
console.log(p.name);     // עובד
// console.log(p.age);   // שגיאה! private` },
      { type: 'heading', text: 'קיצור: Parameter Properties' },
      { type: 'code', lang: 'typescript', caption: 'קיצור constructor', code: `// במקום להגדיר ולהשים ידנית:
class User {
  constructor(
    public name: string,
    private email: string,
    readonly id: number,
  ) {}
  // name, email ו-id נוצרים אוטומטית!
}` },
      { type: 'heading', text: 'Implements — מימוש Interface' },
      { type: 'code', lang: 'typescript', caption: 'implements', code: `interface Printable {
  print(): void;
  getTitle(): string;
}

class Document implements Printable {
  constructor(private title: string) {}

  print(): void {
    console.log(\`מדפיס: \${this.title}\`);
  }

  getTitle(): string {
    return this.title;
  }
}` },
      { type: 'heading', text: 'ירושה (Inheritance)' },
      { type: 'code', lang: 'typescript', caption: 'extends', code: `class Animal {
  constructor(protected name: string) {}
  speak(): string {
    return \`\${this.name} עושה רעש\`;
  }
}

class Dog extends Animal {
  constructor(name: string, private breed: string) {
    super(name);
  }
  speak(): string {
    return \`\${this.name} נובח: הב הב!\`;
  }
}

const dog = new Dog("רקס", "לברדור");
console.log(dog.speak()); // רקס נובח: הב הב!` },
      { type: 'tip', text: 'protected מאפשר גישה לתכונה מהמחלקה ומתת-מחלקות — בניגוד ל-private שרק מהמחלקה עצמה.' },
    ],
    questionBank: [
      {
        id: 'ts-cls-q1',
        text: 'מה ההבדל בין public לבין private?',
        options: ['אין הבדל ב-TS', 'public נגיש מכל מקום, private רק מהמחלקה', 'private נגיש מכל מקום, public רק מהמחלקה', 'public לפונקציות, private לתכונות'],
        correct: 1,
        explanation: 'public נגיש מכל מקום. private נגיש רק מתוך אותה מחלקה. זה ה-access control של TS.',
      },
      {
        id: 'ts-cls-q2',
        text: 'מה עושה implements ב-class?',
        options: ['גורם ל-class לרשת מ-class אחר', 'מחייב את ה-class לממש את כל שדות ומתודות ה-interface', 'יוצר instance חדש', 'מגדיר constructor'],
        correct: 1,
        explanation: 'implements מחייב את ה-class לספק את כל מה שה-interface מגדיר. TS ייצור שגיאה אם חסר משהו.',
      },
      {
        id: 'ts-cls-q3',
        text: 'מה זה protected?',
        options: ['כמו private', 'נגיש מהמחלקה ומתת-מחלקות אבל לא מחוץ', 'כמו public', 'נגיש רק בשעת קומפילציה'],
        correct: 1,
        explanation: 'protected — בין public ל-private. נגיש מהמחלקה ומה-subclasses שלה, אבל לא מחוץ להיררכיה.',
      },
      {
        id: 'ts-cls-q4',
        text: 'מה עושה super() בתוך constructor?',
        options: ['יוצר instance חדש', 'קורא ל-constructor של מחלקת האב', 'מגדיר static method', 'שגיאה תמיד'],
        correct: 1,
        explanation: 'ב-subclass חייבים לקרוא ל-super() לפני שניגשים ל-this. זה מפעיל את constructor מחלקת האב.',
      },
      {
        id: 'ts-cls-q5',
        text: 'מה עושה Parameter Properties ב-constructor?',
        options: ['מגדיר ברירות מחדל', 'יוצר אוטומטית property ומשים אותה בבת אחת', 'מגדיר static props', 'שגיאת syntax'],
        correct: 1,
        explanation: 'constructor(public name: string) מגדיר ומשים this.name בקיצור — פחות boilerplate.',
      },
      {
        id: 'ts-cls-q6',
        text: 'מה ההבדל בין extends לבין implements?',
        options: ['אין הבדל', 'extends יורש מ-class, implements מממש interface', 'implements יורש, extends מממש', 'שניהם לירושה'],
        correct: 1,
        explanation: 'extends לירושת class (code reuse). implements להתחייבות לממש interface (contract).',
      },
      {
        id: 'ts-cls-q7',
        text: 'האם class יכול לממש כמה interfaces?',
        options: ['לא, רק אחד', 'כן, עם פסיק: implements A, B', 'כן, עם extends', 'רק עם generic'],
        correct: 1,
        explanation: 'class יכול לממש כמה interfaces: class Foo implements Bar, Baz { }',
      },
      {
        id: 'ts-cls-q8',
        text: 'מה יקרה אם class implements interface אבל חסרה מתודה?',
        options: ['JS ירוץ בלי שגיאה', 'TS ייצור שגיאת קומפילציה', 'המתודה תיווצר אוטומטית', 'warning בלי error'],
        correct: 1,
        explanation: 'TS בודק שהמחלקה מממשת את הכל. מתודה חסרה = שגיאה ברורה בזמן כתיבת הקוד.',
      },
    ],
  },
]
