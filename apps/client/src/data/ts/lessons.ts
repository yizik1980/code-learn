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
      {
        id: 'ts-intro-q9',
        text: 'מה זה any ב-TypeScript ומתי להימנע ממנו?',
        options: ['טיפוס שמאפשר ל-TS להסיק אוטומטית', 'טיפוס שמשבית בדיקות — עדיף להימנע ממנו', 'טיפוס לערכים ריקים', 'טיפוס מהיר יותר'],
        correct: 1,
        explanation: 'any מבטל את type checking לחלוטין. שימוש בו הורס את ה-type safety שהוא הסיבה לעבוד עם TS. מומלץ להשתמש ב-unknown כשצריך גמישות.',
      },
      {
        id: 'ts-intro-q10',
        text: 'מה ההבדל בין any לבין unknown?',
        options: ['אין הבדל', 'any מאפשר כל פעולה; unknown מחייב narrowing לפני שימוש', 'unknown יותר מסוכן', 'any מהיר יותר'],
        correct: 1,
        explanation: 'unknown בטוח יותר מany: חייבים לצמצם (narrow) את הטיפוס לפני שמשתמשים בו. any מאפשר הכל בלי בדיקה.',
      },
      {
        id: 'ts-intro-q11',
        text: 'מה ייצא? function add(a: number, b: number) { return a + b } — מה הטיפוס של הפלט?',
        options: ['void', 'any', 'number — TS מסיק אוטומטית', 'חייב לציין ידנית'],
        correct: 2,
        explanation: 'TS מסיק את טיפוס הפלט מה-return statement. return a + b כשa,b הם number → פלט number.',
      },
      {
        id: 'ts-intro-q12',
        text: 'מה זה Type Narrowing?',
        options: ['צמצום מספר הטיפוסים', 'בדיקה שמצמצמת union type לטיפוס ספציפי בתוך בלוק', 'הסרת טיפוסים', 'Generic constraint'],
        correct: 1,
        explanation: 'Narrowing: בתוך if (typeof x === "string") { } TS יודע ש-x הוא string. הקוד מצמצם את האפשרויות.',
      },
      {
        id: 'ts-intro-q13',
        text: 'מה זה Enum ב-TypeScript?',
        options: ['מערך של קבועים', 'קבוצה של ערכים בעלי שם — כמו categories', 'interface מיוחד', 'type alias'],
        correct: 1,
        explanation: 'enum Direction { Up, Down, Left, Right } — יוצר קבוצה של ערכים בעלי שם. נפוץ לייצוג states, directions, statuses.',
      },
      {
        id: 'ts-intro-q14',
        text: 'מה זה never ב-TypeScript?',
        options: ['ערך null', 'טיפוס שמייצג ערך שלא יכול לקרות לעולם', 'undefined', 'void'],
        correct: 1,
        explanation: 'never: פונקציה שתמיד זורקת שגיאה, או code path שלא יגיע לשם. שימושי ל-exhaustive checks ב-switch.',
      },
      {
        id: 'ts-intro-q15',
        text: 'מה ייצא? const arr: readonly number[] = [1,2,3]; arr.push(4)',
        options: ['[1,2,3,4]', 'שגיאת TypeScript', 'undefined', 'שגיאת runtime'],
        correct: 1,
        explanation: 'readonly array לא מאפשר שינויים. TS ייצור שגיאת קומפילציה על push, pop, splice וכו\'.',
      },
      {
        id: 'ts-intro-q16',
        text: 'מה זה tsconfig.json?',
        options: ['קובץ package', 'קובץ הגדרות הקומפילציה של TypeScript', 'קובץ environment', 'קובץ routes'],
        correct: 1,
        explanation: 'tsconfig.json מגדיר איך המהדר של TS עובד: target (ES version), strict mode, paths, outDir ועוד.',
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
      {
        id: 'ts-int-q9',
        text: 'מה זה Declaration Merging ב-interface?',
        options: ['מחיקת interface', 'הצהרת אותו interface שוב מוסיפה שדות לממשק הקיים', 'שגיאת TS', 'מיזוג של שני types'],
        correct: 1,
        explanation: 'interface User { name: string } ואחר כך interface User { age: number } — TS ממזג לממשק עם שניהם. תכונה זו קיימת ב-interface אך לא ב-type.',
      },
      {
        id: 'ts-int-q10',
        text: 'מה זה Literal Type?',
        options: ['טיפוס בסיסי', 'ערך ספציפי כטיפוס: type Dir = "left" | "right"', 'string בלבד', 'Union Type'],
        correct: 1,
        explanation: 'Literal type: "left" הוא טיפוס שמאפשר רק את הערך "left". שימושי לdiscriminated unions ו-API responses.',
      },
      {
        id: 'ts-int-q11',
        text: 'מה זה Discriminated Union?',
        options: ['Union עם שגיאה', 'Union שיש לו שדה "מבדיל" ייחודי שTS יכול לנרו לפיו', 'intersection type', 'Generic union'],
        correct: 1,
        explanation: 'type Shape = {kind:"circle"; r:number} | {kind:"square"; side:number} — kind הוא הdiscriminant. TS מצמצם לפי kind.',
      },
      {
        id: 'ts-int-q12',
        text: 'מה עדיף — type alias לObject או interface?',
        options: ['תמיד type', 'תמיד interface', 'interface עדיף לאובייקטים — ניתן להרחבה ולmerging', 'אין הבדל כלל'],
        correct: 2,
        explanation: 'מוסכמה ב-TS: interface לאובייקטים ו-classes (ניתן לextend ולmerge). type לunions, tuples, mapped types ופונקציות.',
      },
      {
        id: 'ts-int-q13',
        text: 'מה זה Mapped Type?',
        options: ['מיפוי בין interfaces', 'טיפוס שנוצר ע"י איטרציה על מפתחות טיפוס קיים', 'Record', 'Generic'],
        correct: 1,
        explanation: 'type Optional<T> = { [K in keyof T]?: T[K] } — עובר על כל מפתח ב-T ויוצר שדה optional. זה הבסיס של Partial, Required ועוד.',
      },
      {
        id: 'ts-int-q14',
        text: 'מה זה keyof?',
        options: ['מחזיר את מפתחות אובייקט בזמן ריצה', 'operator שמחזיר union של כל שמות המפתחות של טיפוס', 'כמו Object.keys()', 'שגיאה'],
        correct: 1,
        explanation: 'keyof User מחזיר "id" | "name" | "email" — union של כל שמות השדות. נפוץ ב-generic functions ו-mapped types.',
      },
      {
        id: 'ts-int-q15',
        text: 'מה זה Conditional Type?',
        options: ['if/else ב-TS', 'T extends U ? X : Y — טיפוס שנקבע לפי תנאי', 'narrowing', 'type guard'],
        correct: 1,
        explanation: 'type IsString<T> = T extends string ? true : false — Conditional types מאפשרים לוגיקה של if/else ברמת הטיפוסים.',
      },
      {
        id: 'ts-int-q16',
        text: 'מה זה Type Guard?',
        options: ['אבטחת TypeScript', 'פונקציה שמצמצמת טיפוס: function isString(x): x is string', 'Interface מיוחד', 'readonly'],
        correct: 1,
        explanation: 'Type Guard: function isString(x: unknown): x is string { return typeof x === "string" } — בתוך if(isString(val)), TS יודע ש-val הוא string.',
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
      {
        id: 'ts-gen-q9',
        text: 'מה זה Default Type Parameter?',
        options: ['ערך ברירת מחדל לgeneric', 'function identity<T = string>(val: T): T — T הוא string אם לא הועבר', 'תמיד שגיאה', 'Generic constraint'],
        correct: 1,
        explanation: 'function f<T = string>() — אם לא מציינים T, ברירת המחדל היא string. עובד כמו default parameter אבל לטיפוסים.',
      },
      {
        id: 'ts-gen-q10',
        text: 'מה ייצא? function getFirst<T>(arr: T[]): T | undefined { return arr[0] } — מה הטיפוס של getFirst(["a","b"])?',
        options: ['any', 'string', 'string | undefined', 'T'],
        correct: 2,
        explanation: 'TS מסיק T=string. אבל arr[0] יכול להיות undefined (אם המערך ריק), לכן הפלט: string | undefined.',
      },
      {
        id: 'ts-gen-q11',
        text: 'מה זה Generic Class?',
        options: ['class עם generic parameter: class Stack<T> { items: T[] }', 'class שמשתמש ב-any', 'abstract class', 'class עם interface'],
        correct: 0,
        explanation: 'class Stack<T> { items: T[] = []; push(item: T) {} pop(): T | undefined {} } — class generic שעובד עם כל טיפוס תוך שמירת type safety.',
      },
      {
        id: 'ts-gen-q12',
        text: 'מה זה ReturnType<T> utility type?',
        options: ['מחזיר את פרמטרי הפונקציה', 'מחלץ את טיפוס הפלט של פונקציה', 'מחזיר void', 'Generic constraint'],
        correct: 1,
        explanation: 'ReturnType<typeof myFunc> מחלץ את הטיפוס שהפונקציה מחזירה. שימושי כשלא ידוע מראש מה הפלט.',
      },
      {
        id: 'ts-gen-q13',
        text: 'מה זה Parameters<T> utility type?',
        options: ['מחלץ את טיפוסי הפרמטרים של פונקציה כ-tuple', 'מחזיר את הפלט', 'Generic constraint', 'שגיאה'],
        correct: 0,
        explanation: 'Parameters<typeof fn> מחזיר tuple של טיפוסי הפרמטרים. אם fn(a: string, b: number) → Parameters → [string, number].',
      },
      {
        id: 'ts-gen-q14',
        text: 'מה זה Awaited<T> utility type?',
        options: ['ממתין ל-Promise', 'מחלץ את הטיפוס שבתוך Promise', 'async function', 'שגיאה'],
        correct: 1,
        explanation: 'Awaited<Promise<string>> = string. מחלץ את הטיפוס שPromise מתממש אליו — שימושי עם async functions.',
      },
      {
        id: 'ts-gen-q15',
        text: 'מה עדיף — Generic או overloads לפונקציה עם כמה טיפוסים אפשריים?',
        options: ['תמיד overloads', 'Generic כשהלוגיקה זהה — overloads כשהתנהגות שונה לפי טיפוס', 'תמיד Generic', 'תמיד any'],
        correct: 1,
        explanation: 'אם אותה לוגיקה עובדת לכל טיפוס — Generic. אם יש התנהגות שונה בין טיפוסים (string vs number) — overloads יותר ברורים.',
      },
      {
        id: 'ts-gen-q16',
        text: 'מה זה infer ב-Conditional Types?',
        options: ['TypeScript מסיק אוטומטית', 'keyword בתוך conditional type שמחלץ טיפוס: T extends Promise<infer U> ? U : T', 'Generic default', 'Type guard'],
        correct: 1,
        explanation: 'infer: type Unwrap<T> = T extends Promise<infer U> ? U : T — U נקבע ל-unwrapped type של Promise.',
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
      {
        id: 'ts-util-q9',
        text: 'מה עושה Readonly<T>?',
        options: ['מסיר את כל השדות', 'הופך את כל שדות T ל-readonly', 'מגדיר כ-private', 'כמו Partial'],
        correct: 1,
        explanation: 'Readonly<T> — כל שדה הופך ל-readonly, ניסיון לשנות יגרום לשגיאת TS. שימושי ל-immutable objects.',
      },
      {
        id: 'ts-util-q10',
        text: 'מה עושה NonNullable<T>?',
        options: ['מוסיף null', 'מסיר null ו-undefined מה-union', 'הופך ל-required', 'מחזיר boolean'],
        correct: 1,
        explanation: 'NonNullable<string | null | undefined> = string. מסיר null ו-undefined מהטיפוס.',
      },
      {
        id: 'ts-util-q11',
        text: 'מה ההבדל בין Partial<T> לRequired<T>?',
        options: ['אין הבדל', 'Partial הופך שדות לאופציונליים, Required הופך שדות לחובה', 'Required ל-readonly', 'Partial מוחק שדות'],
        correct: 1,
        explanation: 'Partial<T> מוסיף ? לכל שדה. Required<T> מסיר ? מכל שדה. הפכים מושלמים זה לזה.',
      },
      {
        id: 'ts-util-q12',
        text: 'מה יהיה? type T = Exclude<"a" | "b" | "c", "a">',
        options: ['"a"', '"b" | "c"', '"a" | "b" | "c"', 'שגיאה'],
        correct: 1,
        explanation: 'Exclude<Union, Members> מסיר member מ-union. Exclude<"a"|"b"|"c", "a"> = "b" | "c".',
      },
      {
        id: 'ts-util-q13',
        text: 'מה זה Extract<T, U>?',
        options: ['מסיר מT את מה שנמצא בU', 'שומר מT רק מה שנמצא גם בU', 'מחלץ generic', 'כמו Pick'],
        correct: 1,
        explanation: 'Extract<"a"|"b"|"c", "a"|"d"> = "a" — שומר רק את החיתוך. ההפך של Exclude.',
      },
      {
        id: 'ts-util-q14',
        text: 'מה זה ReturnType<T>?',
        options: ['פרמטרי constructor כ-tuple', 'מחלץ את טיפוס הפלט של פונקציה', 'generic class', 'שגיאה'],
        correct: 1,
        explanation: 'ReturnType<typeof myFunc> מחלץ את הטיפוס שהפונקציה מחזירה. שימושי כשלא ידוע מראש מה הפלט.',
      },
      {
        id: 'ts-util-q15',
        text: 'מה עושה InstanceType<T>?',
        options: ['מחזיר את סוג ה-constructor', 'מחזיר את הטיפוס של instance שנוצר מה-class', 'Generic default', 'שגיאה'],
        correct: 1,
        explanation: 'InstanceType<typeof MyClass> = MyClass. מחזיר את הטיפוס של ה-instance.',
      },
      {
        id: 'ts-util-q16',
        text: 'מה זה Template Literal Type?',
        options: ['template string בJS', 'יצירת string types עם template syntax: `Hello ${string}`', 'const בTS', 'Literal union'],
        correct: 1,
        explanation: 'Template Literal Type מאפשר ליצור טיפוסי string דינמיים: type EventName = `on${string}`. מאפשר pattern matching על strings.',
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
      {
        id: 'ts-cls-q9',
        text: 'מה זה abstract class?',
        options: ['class ריק', 'class שלא ניתן ליצור ממנו instance ישיר — חייב לרשת ממנו', 'class עם private בלבד', 'interface עם קוד'],
        correct: 1,
        explanation: 'abstract class מגדיר מבנה בסיס וגם יכול לכלול מימוש. לא ניתן new AbstractClass() — חייבים subclass שממש את abstract methods.',
      },
      {
        id: 'ts-cls-q10',
        text: 'מה זה static method?',
        options: ['method שלא ניתן לשנות', 'method שנגיש דרך ה-class עצמו, לא דרך instance', 'method שרץ פעם אחת', 'private method'],
        correct: 1,
        explanation: 'static: MyClass.myMethod() — קוראים לו ישירות מה-class. לא צריך ליצור instance. שימושי ל-utility functions ו-factory methods.',
      },
      {
        id: 'ts-cls-q11',
        text: 'מה עושה override ב-TS 4.3+?',
        options: ['מחליף method מה-parent', 'מסמן במפורש שמתודה עוקפת מtה-parent — TS מוודא שהיא קיימת שם', 'מגדיר כ-abstract', 'public method'],
        correct: 1,
        explanation: 'override keyword מציין שהמתודה עוקפת את זו של האב. אם המתודה לא קיימת ב-parent, TS ייצור שגיאה — מונע bugs עקב שינוי שם.',
      },
      {
        id: 'ts-cls-q12',
        text: 'מה ההבדל בין class לinterface מבחינת runtime?',
        options: ['אין הבדל', 'class קיים ב-JavaScript runtime; interface נמחק בקומפילציה', 'interface נשמר, class לא', 'שניהם נשמרים'],
        correct: 1,
        explanation: 'Interface הוא TypeScript בלבד — נמחק בקומפילציה לJS. Class הופך ל-constructor function בJS וקיים בruntime.',
      },
      {
        id: 'ts-cls-q13',
        text: 'מה זה getter/setter ב-class?',
        options: ['method רגיל', 'get/set — תכונה שנקראת/נכתבת עם syntax של property אבל יש לה לוגיקה', 'readonly property', 'static property'],
        correct: 1,
        explanation: 'get name() { return this._name } set name(v) { this._name = v.trim() } — נגישות כ-obj.name אבל עם לוגיקה פנימית.',
      },
      {
        id: 'ts-cls-q14',
        text: 'כמה classes יכול class לרשת מהם ב-TS?',
        options: ['אחד בלבד (extends אחד)', 'כמה שרוצים', 'שניים', 'אין מגבלה עם interface'],
        correct: 0,
        explanation: 'TS (כמו JS) תומך ב-single inheritance — class יכול לרשת ממחלקה אחת בלבד. אבל יכול לממש כמה interfaces.',
      },
      {
        id: 'ts-cls-q15',
        text: 'מה זה Mixin Pattern ב-TypeScript?',
        options: ['ערבוב classes', 'טכניקה לשילוב התנהגויות ממספר מקורות בלי ירושה מרובה', 'abstract class', 'Generic class'],
        correct: 1,
        explanation: 'Mixins מאפשרים לשלב קטעי התנהגות ממספר מקורות. מאחר שTS לא תומך בmulti-inheritance, Mixins הם הפתרון.',
      },
      {
        id: 'ts-cls-q16',
        text: 'מה זה Decorator ב-TypeScript?',
        options: ['CSS decorator', 'פונקציה שמעטרת class/method ומוסיפה לו התנהגות', 'interface מיוחד', 'Abstract method'],
        correct: 1,
        explanation: '@Component(...) — Decorator הוא פונקציה שמופעלת על class/method/property ומוסיפה metadata או התנהגות. נפוץ ב-Angular.',
      },
    ],
  },
]
