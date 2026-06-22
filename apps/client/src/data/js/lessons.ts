import type { Lesson } from '../../types'

export const jsLessons: Lesson[] = [
  {
    id: 'js-intro',
    title: 'מבוא ל-JavaScript',
    summary: 'מה זה JS, איפה הוא רץ ואיך כותבים את השורה הראשונה',
    emoji: '⚡',
    content: [
      { type: 'heading', text: 'מה זה JavaScript?' },
      { type: 'text', text: 'JavaScript היא שפת התכנות של האינטרנט. כל אתר אינטרנט אינטראקטיבי — כפתורים שזזים, טפסים שמגיבים, אנימציות — כולם מופעלים על ידי JavaScript.' },
      { type: 'text', text: 'בניגוד ל-HTML שמגדיר מבנה ו-CSS שמגדיר עיצוב, JavaScript מוסיף התנהגות לדפי האינטרנט.' },
      { type: 'tip', text: 'JavaScript רצה בדפדפן אצל המשתמש (client-side) אבל גם בשרת עם Node.js. אותה שפה — שני מקומות!' },
      { type: 'heading', text: 'הדרך המהירה להתחיל' },
      { type: 'text', text: 'פתח את הדפדפן, לחץ F12, ועבור ל-Console. שם אפשר להריץ JavaScript ישירות!' },
      { type: 'code', lang: 'javascript', caption: 'השורה הראשונה שלך', code: `console.log("שלום עולם!");
// הפלט: שלום עולם!

console.log(2 + 2);
// הפלט: 4

alert("הי!");
// פותח חלון קופץ בדפדפן` },
      { type: 'heading', text: 'הוספת JS לדף HTML' },
      { type: 'text', text: 'כדי להוסיף JavaScript לדף HTML משתמשים בתג script:' },
      { type: 'code', lang: 'html', caption: 'index.html', code: `<!DOCTYPE html>
<html>
<head>
  <title>הדף שלי</title>
</head>
<body>
  <h1>שלום!</h1>

  <!-- JS בתוך הדף -->
  <script>
    console.log("רץ!");
  </script>

  <!-- או קובץ חיצוני -->
  <script src="app.js"></script>
</body>
</html>` },
      { type: 'tip', text: 'מוסיפים את תג script לפני סגירת body כדי שה-HTML ייטען קודם.' },
      { type: 'heading', text: 'תגובות (Comments)' },
      { type: 'text', text: 'תגובות הן שורות קוד שה-JavaScript מתעלם מהן לחלוטין — הן קיימות רק בשביל הקורא האנושי. כתיב // מגיב שורה אחת, ו-/* */ מאפשר תגובה שמשתרעת על מספר שורות. שימו לב שניתן להוסיף תגובה גם בסוף שורת קוד פעילה.' },
      { type: 'code', lang: 'javascript', caption: 'סוגי תגובות', code: `// תגובה בשורה אחת

/* תגובה
   על מספר שורות */

console.log("קוד שרץ"); // גם כאן בצד` },
    ],
    questionBank: [
      {
        id: 'js-intro-q1',
        text: 'מה תפקידו של JavaScript בפיתוח ווב?',
        options: ['עיצוב ויזואלי', 'מבנה הדף', 'הוספת התנהגות ואינטראקטיביות', 'ניהול מסד נתונים'],
        correct: 2,
        explanation: 'JavaScript אחראי על ההתנהגות האינטראקטיבית. HTML = מבנה, CSS = עיצוב, JS = התנהגות.',
      },
      {
        id: 'js-intro-q2',
        text: 'איזה פקודה מדפיסה טקסט לקונסול?',
        options: ['print()', 'echo()', 'console.log()', 'write()'],
        correct: 2,
        explanation: 'console.log() היא הפקודה הסטנדרטית להדפסה לקונסול בדפדפן.',
      },
      {
        id: 'js-intro-q3',
        text: 'איפה אפשר להריץ JS ישירות בלי להקים פרויקט?',
        options: ['בעורך טקסט רגיל', 'ב-Console של הדפדפן (F12)', 'בתוכנת Word', 'ב-Excel'],
        correct: 1,
        explanation: 'לחיצה על F12 פותחת את כלי הפיתוח. לשונית Console מאפשרת להריץ JS ישירות.',
      },
      {
        id: 'js-intro-q4',
        text: 'איפה נכון להכניס תג <script> ב-HTML?',
        options: ['בתוך <head> בלבד', 'לפני סגירת </body>', 'לפני פתיחת <html>', 'בתוך <style>'],
        correct: 1,
        explanation: 'מקובל להכניס את script לפני סגירת body כדי שה-HTML ייטען קודם ואז הסקריפט ירוץ.',
      },
      {
        id: 'js-intro-q5',
        text: 'מה ההבדל בין // לבין /* */ ?',
        options: ['אין הבדל', '// לשורה אחת, /* */ למספר שורות', '// למספר שורות, /* */ לשורה אחת', '// לפונקציות בלבד'],
        correct: 1,
        explanation: '// מגיב שורה אחת. /* */ מגיב בלוק שיכול לפרוש על מספר שורות.',
      },
      {
        id: 'js-intro-q6',
        text: 'מה עושה הפקודה alert()?',
        options: ['מדפיסה לקונסול', 'פותחת חלון קופץ בדפדפן', 'שולחת מייל', 'שומרת קובץ'],
        correct: 1,
        explanation: 'alert() פותחת חלון קופץ עם הטקסט שהעברת. שימושי לבדיקות מהירות.',
      },
      {
        id: 'js-intro-q7',
        text: 'האם JavaScript יכול לרוץ גם בשרת?',
        options: ['לא, רק בדפדפן', 'כן, עם Node.js', 'כן, עם PHP', 'לא, הוא שפת לקוח בלבד'],
        correct: 1,
        explanation: 'Node.js מאפשר להריץ JavaScript בשרת. אותה שפה — גם בדפדפן וגם בשרת.',
      },
      {
        id: 'js-intro-q8',
        text: 'מה יודפס ב-console.log(3 * 4)?',
        options: ['3 * 4', '"12"', '12', 'שגיאה'],
        correct: 2,
        explanation: 'JavaScript מחשב את הביטוי 3 * 4 ומדפיס את התוצאה המספרית 12.',
      },
      {
        id: 'js-intro-q9',
        text: 'מה ההבדל בין JavaScript לJava?',
        options: ['אין הבדל, זו אותה שפה', 'שפות שונות לחלוטין — רק שם דומה', 'Java היא גרסה ישנה של JS', 'JS רץ על JVM'],
        correct: 1,
        explanation: 'JavaScript ו-Java שפות שונות לחלוטין. השם המשותף הוא שיווקי בלבד. Java מקומפלת ומשתמשת ב-JVM, JS מפורשת ורצה בדפדפן.',
      },
      {
        id: 'js-intro-q10',
        text: 'מה זה ECMAScript?',
        options: ['דפדפן מיוחד ל-JS', 'תקן רשמי שמגדיר את שפת JavaScript', 'ספרייה של JavaScript', 'מהדר JS'],
        correct: 1,
        explanation: 'ECMAScript הוא התקן הרשמי שעליו מבוססת JavaScript. ES6 (2015) הייתה מהפכנית — הביאה let, const, arrow functions ועוד.',
      },
      {
        id: 'js-intro-q11',
        text: 'מה יחזיר typeof 42?',
        options: ['"integer"', '"number"', '"float"', '"numeric"'],
        correct: 1,
        explanation: 'ב-JavaScript יש רק טיפוס אחד למספרים: number. אין הבחנה בין integer לfloat.',
      },
      {
        id: 'js-intro-q12',
        text: 'מה זה "dynamically typed" בהקשר של JavaScript?',
        options: ['JS רץ מהר מאוד', 'סוג המשתנה נקבע בזמן ריצה ולא בזמן כתיבה', 'JS מאפשר הגדרת טיפוסים בכל שלב', 'JS לא תומך בטיפוסים בכלל'],
        correct: 1,
        explanation: 'dynamically typed = הטיפוס של משתנה נקבע לפי הערך שנמצא בו בזמן ריצה. let x = 5 זה number, אחר כך x = "שלום" — הופך לstring.',
      },
      {
        id: 'js-intro-q13',
        text: 'מה הפלט של console.log("5" + 3)?',
        options: ['8', '"53"', 'שגיאה', '15'],
        correct: 1,
        explanation: 'כשמחברים string למספר, JS ממיר את המספר ל-string ומחרז. "5" + 3 = "53".',
      },
      {
        id: 'js-intro-q14',
        text: 'מה הפלט של console.log("5" - 3)?',
        options: ['"53"', '"2"', '2', 'שגיאה'],
        correct: 2,
        explanation: 'חיסור לא עובד על strings, אז JS ממיר "5" למספר. 5 - 3 = 2 (מספר).',
      },
      {
        id: 'js-intro-q15',
        text: 'מה זה Vite?',
        options: ['שפת תכנות', 'כלי build מהיר לפרויקטי JavaScript מודרניים', 'ספריית UI', 'מסד נתונים'],
        correct: 1,
        explanation: 'Vite הוא build tool מהיר שמאפשר לפתח React, Vue ועוד בסביבה עם HMR (Hot Module Replacement) מיידי.',
      },
      {
        id: 'js-intro-q16',
        text: 'מה ייצא? console.log(typeof undefined)',
        options: ['"null"', '"void"', '"undefined"', 'שגיאה'],
        correct: 2,
        explanation: 'typeof undefined מחזיר את המחרוזת "undefined".',
      },
    ],
  },
  {
    id: 'js-variables',
    title: 'משתנים וטיפוסי נתונים',
    summary: 'let, const, var — ואיך JS מתייחס למספרים, מחרוזות ובוליאנים',
    emoji: '📦',
    content: [
      { type: 'heading', text: 'הצהרת משתנים' },
      { type: 'text', text: 'משתנה הוא תיבה שמכילה ערך. ב-JavaScript המודרני משתמשים ב-let וב-const.' },
      { type: 'code', lang: 'javascript', caption: 'let ו-const', code: `let age = 25;       // ניתן לשינוי
const name = "דן";  // קבוע — לא ניתן לשינוי

age = 26;           // עובד!
// name = "רון";   // שגיאה! const לא משתנה` },
      { type: 'tip', text: 'ברירת המחדל: השתמש תמיד ב-const. עבור ל-let רק כשאתה יודע שהערך ישתנה.' },
      { type: 'heading', text: 'טיפוסי נתונים' },
      { type: 'text', text: 'JavaScript מכיר שישה טיפוסים פרימיטיביים עיקריים: מספר, מחרוזת, בוליאן, null, undefined וסימבול. שימו לב שאין הפרדה בין מספרים שלמים לעשרוניים — הכול number. כדאי להבחין בין null (ריק בכוונה) לבין undefined (לא אותחל).' },
      { type: 'code', lang: 'javascript', caption: 'הטיפוסים הבסיסיים', code: `// מספר (Number)
let price = 49.99;
let count = 10;

// מחרוזת (String)
let firstName = "שרה";
let greeting = \`שלום, \${firstName}!\`;  // Template literal

// בוליאן (Boolean)
let isLoggedIn = true;
let hasPremium = false;

// ללא ערך
let empty = null;        // ערך ריק מכוון
let notDefined;          // undefined — לא אותחל` },
      { type: 'heading', text: 'Template Literals' },
      { type: 'text', text: 'Template literals הם מחרוזות עם backtick (`) שמאפשרות הכנסת משתנים ישירות:' },
      { type: 'code', lang: 'javascript', caption: 'שרשור מחרוזות', code: `const user = "מיכל";
const score = 95;

// הדרך הישנה:
const msg1 = "שלום " + user + "! הציון שלך: " + score;

// Template literal — הרבה יותר קריא:
const msg2 = \`שלום \${user}! הציון שלך: \${score}\`;

console.log(msg2);
// שלום מיכל! הציון שלך: 95` },
      { type: 'heading', text: 'typeof — בדיקת טיפוס' },
      { type: 'text', text: 'האופרטור typeof מחזיר מחרוזת שמתארת את הטיפוס של הערך. הוא שימושי לבדיקת טיפוסים בזמן ריצה לפני ביצוע פעולות. שימו לב לבאג ההיסטורי המפורסם: typeof null מחזיר "object" ולא "null" — זה שגיאה בשפה שנשמרה לצורך תאימות לאחור.' },
      { type: 'code', lang: 'javascript', caption: 'typeof', code: `console.log(typeof 42);          // "number"
console.log(typeof "שלום");      // "string"
console.log(typeof true);        // "boolean"
console.log(typeof undefined);   // "undefined"
console.log(typeof null);        // "object" — באג היסטורי ב-JS!` },
      { type: 'tip', text: 'JS הוא dynamically typed — משתנה יכול להכיל ערכים מטיפוסים שונים. זה גמיש אבל יכול לגרום לבאגים.' },
    ],
    questionBank: [
      {
        id: 'js-var-q1',
        text: 'מה ההבדל בין let לבין const?',
        options: ['אין הבדל', 'let לשמות, const למספרים', 'let ניתן לשינוי, const קבוע', 'const ניתן לשינוי, let קבוע'],
        correct: 2,
        explanation: 'let מאפשר לשנות את הערך מאוחר יותר. const קבוע — לא ניתן לשנות לאחר ההשמה.',
      },
      {
        id: 'js-var-q2',
        text: 'מה יקרה אם ננסה לשנות ערך של const?',
        options: ['הערך ישתנה', 'שגיאה בזמן ריצה (TypeError)', 'JS יתעלם מהשינוי', 'יווצר משתנה חדש'],
        correct: 1,
        explanation: 'ניסיון לשנות const יזרוק TypeError. const מונע כתיבה לאחר ההצהרה הראשונה.',
      },
      {
        id: 'js-var-q3',
        text: 'מה יודפס? const x = `שלום ${2+3}`; console.log(x)',
        options: ['שלום ${2+3}', 'שלום 5', 'שגיאה', 'שלום 2+3'],
        correct: 1,
        explanation: 'Template literals מחשבים ביטויים בתוך ${}. 2+3 = 5, כך שהתוצאה היא "שלום 5".',
      },
      {
        id: 'js-var-q4',
        text: 'מה יחזיר typeof "123"?',
        options: ['"number"', '"string"', '"integer"', '"text"'],
        correct: 1,
        explanation: '"123" עם גרשיים היא מחרוזת (string), לא מספר, גם אם מכילה ספרות.',
      },
      {
        id: 'js-var-q5',
        text: 'מה ההבדל בין null לבין undefined?',
        options: ['אין הבדל', 'null = ערך ריק מכוון, undefined = לא אותחל', 'undefined = שגיאה, null = תקין', 'שניהם שגיאות'],
        correct: 1,
        explanation: 'null הוא ערך ריק שאנחנו מגדירים בכוונה. undefined נוצר אוטומטית כשמשתנה לא קיבל ערך.',
      },
      {
        id: 'js-var-q6',
        text: 'מה מומלץ להשתמש כברירת מחדל — let או const?',
        options: ['תמיד let', 'תמיד const, ועוברים ל-let כשצריך', 'var תמיד', 'תלוי בשם המשתנה'],
        correct: 1,
        explanation: 'מומלץ להתחיל עם const. זה מונע שינויים בשוגג. עוברים ל-let רק כשיודעים שהערך ישתנה.',
      },
      {
        id: 'js-var-q7',
        text: 'מה יחזיר typeof null?',
        options: ['"null"', '"undefined"', '"object"', '"boolean"'],
        correct: 2,
        explanation: 'typeof null מחזיר "object" — זה באג היסטורי ב-JavaScript שנשמר לצורך תאימות לאחור.',
      },
      {
        id: 'js-var-q8',
        text: 'מה הפלט? let a = 5; let b = a; a = 10; console.log(b)',
        options: ['10', '5', 'undefined', 'שגיאה'],
        correct: 1,
        explanation: 'כשמשמים b = a, מועתק הערך (5). לאחר מכן a השתנה ל-10 אבל b נשאר 5.',
      },
      {
        id: 'js-var-q9',
        text: 'מה ההבדל בין == לבין ===?',
        options: ['אין הבדל', '== בודק ערך בלבד, === בודק ערך וגם טיפוס', '=== מהיר יותר', '== לשוויון, === לזהות'],
        correct: 1,
        explanation: '== מבצע המרת טיפוסים לפני ההשוואה (5 == "5" = true). === בודק גם ערך וגם טיפוס (5 === "5" = false). עדיף תמיד להשתמש ב-===.',
      },
      {
        id: 'js-var-q10',
        text: 'מה מחזיר Number("abc")?',
        options: ['0', 'null', 'NaN', 'שגיאה'],
        correct: 2,
        explanation: 'Number("abc") מחזיר NaN (Not a Number) — ניסיון להמיר מחרוזת לא מספרית למספר.',
      },
      {
        id: 'js-var-q11',
        text: 'מה זה NaN?',
        options: ['מספר גדול מאוד', 'ערך מיוחד שמסמן תוצאה לא מספרית', 'שגיאת JavaScript', 'ערך null'],
        correct: 1,
        explanation: 'NaN = Not a Number. נוצר כשפעולה מספרית נכשלת. typeof NaN === "number" — אחד הדברים המוזרים ב-JS!',
      },
      {
        id: 'js-var-q12',
        text: 'מה מחזיר Boolean(0)?',
        options: ['true', 'false', '0', 'שגיאה'],
        correct: 1,
        explanation: '0 הוא ערך falsy ב-JavaScript. Boolean(0) = false. ערכי falsy: 0, "", null, undefined, NaN, false.',
      },
      {
        id: 'js-var-q13',
        text: 'מה זה hoisting?',
        options: ['העלאת קובץ לשרת', 'JS מעלה הצהרות משתנים/פונקציות לראש ה-scope לפני ריצה', 'קומפילציה של JS', 'המרת טיפוסים'],
        correct: 1,
        explanation: 'Hoisting: JS מעלה הצהרות (var, function) לראש ה-scope. var מאותחל ל-undefined, let/const לא נגישים לפני ההצהרה (Temporal Dead Zone).',
      },
      {
        id: 'js-var-q14',
        text: 'מה ההבדל בין var לבין let?',
        options: ['אין הבדל', 'var מוגבל לbody, let מוגבל לblock', 'var תמיד global, let תמיד local', 'var מהיר יותר'],
        correct: 1,
        explanation: 'var מוגבל לסקופ של פונקציה (function scope). let מוגבל לבלוק {} (block scope). var גם עובר hoisting. עדיף להשתמש ב-let/const.',
      },
      {
        id: 'js-var-q15',
        text: 'מה יודפס? console.log(0.1 + 0.2 === 0.3)',
        options: ['true', 'false', 'שגיאה', '0.3'],
        correct: 1,
        explanation: 'JavaScript (כמו כל שפה שמשתמשת ב-IEEE 754) מייצג נקודה צפה בצורה לא מדויקת. 0.1 + 0.2 = 0.30000000000000004, לא 0.3!',
      },
      {
        id: 'js-var-q16',
        text: 'מה ייצא? let x; console.log(x)',
        options: ['null', '0', 'undefined', 'שגיאה'],
        correct: 2,
        explanation: 'משתנה שהוצהר עם let אך לא אותחל מכיל undefined — JS ברירת המחדל לערך שלא הוגדר.',
      },
    ],
  },
  {
    id: 'js-functions',
    title: 'פונקציות',
    summary: 'הצהרה, ביטויי פונקציה, arrow functions ו-scope',
    emoji: '🔧',
    content: [
      { type: 'heading', text: 'מה זה פונקציה?' },
      { type: 'text', text: 'פונקציה היא בלוק קוד שניתן לשימוש חוזר. מגדירים אותה פעם אחת ומפעילים אותה כמה פעמים שרוצים.' },
      { type: 'code', lang: 'javascript', caption: 'הצהרת פונקציה', code: `function greet(name) {
  return \`שלום, \${name}!\`;
}

console.log(greet("יוסי"));   // שלום, יוסי!
console.log(greet("מירה"));   // שלום, מירה!` },
      { type: 'heading', text: 'ביטוי פונקציה (Function Expression)' },
      { type: 'text', text: 'ביטוי פונקציה (Function Expression) הוא דרך לאחסן פונקציה בתוך משתנה, בדיוק כמו כל ערך אחר. בניגוד ל-function declaration, ביטויי פונקציה לא עוברים hoisting — לא ניתן לקרוא להם לפני שהמשתנה מוגדר. שימו לב לנקודה-פסיק בסוף — זו השמת ערך למשתנה.' },
      { type: 'code', lang: 'javascript', caption: 'פונקציה כמשתנה', code: `const multiply = function(a, b) {
  return a * b;
};

console.log(multiply(3, 4));  // 12` },
      { type: 'heading', text: 'Arrow Functions ←' },
      { type: 'text', text: 'Arrow functions הן כתיב קצר ומודרני לפונקציות:' },
      { type: 'code', lang: 'javascript', caption: 'Arrow function', code: `// פונקציה רגילה:
function add(a, b) { return a + b; }

// Arrow function:
const add = (a, b) => a + b;

// עם גוף:
const square = (n) => {
  const result = n * n;
  return result;
};

// פרמטר יחיד — ניתן בלי סוגריים:
const double = n => n * 2;

console.log(add(3, 5));     // 8
console.log(square(4));     // 16
console.log(double(7));     // 14` },
      { type: 'heading', text: 'פרמטרים ברירת מחדל' },
      { type: 'text', text: 'פרמטרים עם ברירת מחדל מאפשרים לקרוא לפונקציה בלי להעביר את כל הארגומנטים — הפרמטר יקבל את הערך שהגדרנו אם לא הועבר אחד. הברירת המחדל פועלת גם כשמעבירים undefined במפורש. שימו לב שהפרמטרים עם ברירת מחדל צריכים להיות בסוף רשימת הפרמטרים.' },
      { type: 'code', lang: 'javascript', caption: 'Default parameters', code: `function greet(name = "אורח") {
  return \`שלום, \${name}!\`;
}

console.log(greet("דנה"));  // שלום, דנה!
console.log(greet());       // שלום, אורח!` },
      { type: 'tip', text: 'Arrow functions הם הכתיב המועדף בקוד מודרני, במיוחד עבור פונקציות קצרות ו-callbacks.' },
      { type: 'heading', text: 'Scope — היקף משתנים' },
      { type: 'text', text: 'Scope קובע מאיפה בקוד ניתן לגשת למשתנה. משתנה גלובלי נגיש מכל מקום, ומשתנה מקומי נגיש רק בתוך הפונקציה שבה הוגדר. שימו לב שהפונקציה יכולה לקרוא משתנים מה-scope החיצוני שלה (globalVar), אבל הקוד שבחוץ לא יכול לגשת למשתנים הפנימיים שלה.' },
      { type: 'code', lang: 'javascript', caption: 'scope', code: `const globalVar = "גלובלי";

function myFunc() {
  const localVar = "מקומי";
  console.log(globalVar); // עובד!
  console.log(localVar);  // עובד!
}

myFunc();
// console.log(localVar); // שגיאה! localVar לא נגיש מחוץ לפונקציה` },
    ],
    questionBank: [
      {
        id: 'js-func-q1',
        text: 'מה ייצא מ: const f = (x) => x * 2; console.log(f(5))',
        options: ['x * 2', '5', '10', 'שגיאה'],
        correct: 2,
        explanation: 'Arrow function שמכפילה ב-2. f(5) מחשבת 5 * 2 = 10.',
      },
      {
        id: 'js-func-q2',
        text: 'מה ההבדל בין function declaration לבין arrow function?',
        options: ['אין הבדל', 'Arrow function קצרה יותר ומתנהגת אחרת עם this', 'Arrow function יותר איטית', 'Arrow function לא יכולה לקבל פרמטרים'],
        correct: 1,
        explanation: 'Arrow functions קצרות יותר בכתיב ומתנהגות אחרת עם this (inherits מהסביבה החיצונית).',
      },
      {
        id: 'js-func-q3',
        text: 'מה יחזיר greet() אם: function greet(name = "עולם") { return `שלום ${name}`; }',
        options: ['שגיאה', 'שלום undefined', 'שלום עולם', 'שלום'],
        correct: 2,
        explanation: 'כשלא מועבר פרמטר, נוצר ברירת מחדל "עולם". התוצאה: "שלום עולם".',
      },
      {
        id: 'js-func-q4',
        text: 'האם ניתן לגשת למשתנה מקומי מחוץ לפונקציה?',
        options: ['כן', 'לא, יגרום לשגיאה', 'כן, אם מגדירים אותו עם var', 'תלוי בדפדפן'],
        correct: 1,
        explanation: 'משתנה שמוגדר עם let/const בתוך פונקציה הוא מקומי ולא נגיש מחוצה לה.',
      },
      {
        id: 'js-func-q5',
        text: 'מה הכתיב הנכון של arrow function עם פרמטר יחיד?',
        options: ['x => x + 1', '(x) => { x + 1 }', 'function x => x + 1', 'arrow x { x + 1 }'],
        correct: 0,
        explanation: 'Arrow function עם פרמטר יחיד לא חייבת סוגריים. x => x + 1 הוא הכתיב הקצר והנכון.',
      },
      {
        id: 'js-func-q6',
        text: 'מה עושה return בפונקציה?',
        options: ['מדפיס ערך', 'מחזיר ערך ומסיים את ריצת הפונקציה', 'מגדיר משתנה', 'מפעיל פונקציה אחרת'],
        correct: 1,
        explanation: 'return מחזיר ערך למי שהפעיל את הפונקציה ועוצר את ריצתה באותה נקודה.',
      },
      {
        id: 'js-func-q7',
        text: 'מה יודפס? function test() {} console.log(typeof test)',
        options: ['"object"', '"function"', '"undefined"', '"null"'],
        correct: 1,
        explanation: 'typeof על פונקציה מחזיר "function".',
      },
      {
        id: 'js-func-q8',
        text: 'מה יחזיר? const add = (a, b) => { a + b }; add(2, 3)',
        options: ['5', '0', 'undefined', 'שגיאה'],
        correct: 2,
        explanation: 'כשמשתמשים ב-{} ב-arrow function צריך לכתוב return מפורש. ללא return, הפונקציה מחזירה undefined.',
      },
      {
        id: 'js-func-q9',
        text: 'מה זה closure?',
        options: ['סגירת חלון הדפדפן', 'פונקציה שזוכרת את ה-scope שבו נוצרה', 'סיום ריצת script', 'מחלקה ב-JS'],
        correct: 1,
        explanation: 'Closure: פונקציה שמשמרת גישה למשתנים מה-scope החיצוני שבו הוגדרה, גם לאחר שאותו scope סיים לרוץ.',
      },
      {
        id: 'js-func-q10',
        text: 'מה זה callback?',
        options: ['פונקציה שחוזרת לשרת', 'פונקציה שמועברת כארגומנט ומופעלת מאוחר יותר', 'פונקציה רקורסיבית', 'event listener'],
        correct: 1,
        explanation: 'Callback היא פונקציה שמועברת לפונקציה אחרת וקוראת לה. שימושי לאסינכרוניות ו-event handling.',
      },
      {
        id: 'js-func-q11',
        text: 'מה זה Higher-Order Function?',
        options: ['פונקציה מהירה יותר', 'פונקציה שמקבלת פונקציות כארגומנטים או מחזירה פונקציה', 'פונקציה עם קדימות גבוהה', 'פונקציה גלובלית'],
        correct: 1,
        explanation: 'Higher-Order Function: פונקציה שעובדת עם פונקציות אחרות — מקבלת אותן כפרמטרים או מחזירה אותן. דוגמאות: map, filter, reduce.',
      },
      {
        id: 'js-func-q12',
        text: 'מה זה rest parameters (...args)?',
        options: ['עצירה של פונקציה', 'איסוף פרמטרים נוספים למערך', 'Spread Operator', 'פרמטר ברירת מחדל'],
        correct: 1,
        explanation: '...args אוסף את כל הפרמטרים הנוספים שהועברו לפונקציה לתוך מערך. function f(a, ...rest) — rest יכיל את כל הפרמטרים מהשני ואילך.',
      },
      {
        id: 'js-func-q13',
        text: 'מה זה IIFE?',
        options: ['ספריית JavaScript', 'פונקציה שמוגדרת ומופעלת מיד', 'שם של hook ב-React', 'סוג של לולאה'],
        correct: 1,
        explanation: 'IIFE = Immediately Invoked Function Expression. פונקציה שרצה מיידית: (function() { ... })(). נפוץ ליצירת scope מבודד.',
      },
      {
        id: 'js-func-q14',
        text: 'מה יודפס? function greet() {} console.log(greet())',
        options: ['undefined', 'null', 'greet', 'שגיאה'],
        correct: 0,
        explanation: 'פונקציה ללא return מחזירה undefined. console.log(greet()) מדפיס undefined.',
      },
      {
        id: 'js-func-q15',
        text: 'מה ההבדל בין function declaration לfunction expression מבחינת hoisting?',
        options: ['אין הבדל', 'declaration עולה לראש scope עם הגוף — ניתן לקרוא לה לפני ההגדרה. expression לא.', 'expression עולה, declaration לא', 'שניהם עולים'],
        correct: 1,
        explanation: 'function declaration מועלה (hoisted) עם הגוף שלה. function expression (const f = function(){}) עולה רק ההצהרה — קריאה לפני ההגדרה תגרום לשגיאה.',
      },
      {
        id: 'js-func-q16',
        text: 'מה זה recursion?',
        options: ['לולאה מהירה', 'פונקציה שקוראת לעצמה', 'מחזור ב-event loop', 'קריאה לפונקציה חיצונית'],
        correct: 1,
        explanation: 'Recursion: פונקציה שקוראת לעצמה. חייבת תנאי עצירה (base case) כדי לא לגרום לאינסוף קריאות (stack overflow).',
      },
    ],
  },
  {
    id: 'js-arrays',
    title: 'מערכים ושיטות',
    summary: 'יצירה, גישה ושיטות עוצמתיות: map, filter, reduce ועוד',
    emoji: '📚',
    content: [
      { type: 'heading', text: 'מה זה מערך?' },
      { type: 'text', text: 'מערך הוא רשימה מסודרת של ערכים. כל פריט מאוחסן לפי אינדקס שמתחיל מ-0.' },
      { type: 'code', lang: 'javascript', caption: 'יצירה וגישה', code: `const fruits = ["תפוח", "בננה", "ענב"];

console.log(fruits[0]);     // תפוח
console.log(fruits[2]);     // ענב
console.log(fruits.length); // 3

fruits.push("אבטיח");       // הוספה לסוף
fruits.pop();               // הסרה מהסוף
console.log(fruits);        // ["תפוח", "בננה", "ענב"]` },
      { type: 'heading', text: 'map — טרנספורמציה' },
      { type: 'text', text: 'map יוצר מערך חדש על ידי הפעלת פונקציה על כל פריט:' },
      { type: 'code', lang: 'javascript', caption: 'map', code: `const numbers = [1, 2, 3, 4, 5];

const doubled = numbers.map(n => n * 2);
console.log(doubled); // [2, 4, 6, 8, 10]

const names = ["אלי", "דנה", "רון"];
const greetings = names.map(name => \`שלום \${name}\`);
// ["שלום אלי", "שלום דנה", "שלום רון"]` },
      { type: 'heading', text: 'filter — סינון' },
      { type: 'text', text: 'filter יוצרת מערך חדש שמכיל רק את הפריטים שעברו תנאי מסוים. הפונקציה שמועברת ל-filter חייבת להחזיר true (שמור) או false (הוצא). שימו לב שהמערך המקורי לא משתנה כלל — filter תמיד מחזירה מערך חדש עם אותם אובייקטים שסוננו.' },
      { type: 'code', lang: 'javascript', caption: 'filter', code: `const scores = [45, 78, 92, 35, 88, 60];

const passing = scores.filter(score => score >= 60);
console.log(passing); // [78, 92, 88, 60]

const evens = [1,2,3,4,5,6].filter(n => n % 2 === 0);
console.log(evens); // [2, 4, 6]` },
      { type: 'heading', text: 'reduce — צמצום לערך יחיד' },
      { type: 'text', text: 'reduce היא השיטה החזקה ביותר של מערכים — היא "מצמצמת" את כל הפריטים לערך יחיד כלשהו: מספר, מחרוזת, אובייקט, ואפילו מערך חדש. הארגומנט הראשון הוא פונקצית הצבירה שמקבלת accumulator ופריט נוכחי. הארגומנט השני (0 בדוגמה) הוא ערך ההתחלה של ה-accumulator.' },
      { type: 'code', lang: 'javascript', caption: 'reduce', code: `const prices = [10, 25, 8, 43];

const total = prices.reduce((sum, price) => sum + price, 0);
console.log(total); // 86` },
      { type: 'heading', text: 'find & includes' },
      { type: 'text', text: 'includes בודקת האם ערך מסוים קיים במערך ומחזירה true/false — שימושית לבדיקות מהירות. find מחזירה את הפריט הראשון שעומד בתנאי (לא את ה-index ולא מערך, אלא את הפריט עצמו). שימו לב שאם find לא מוצאת כלום, היא מחזירה undefined.' },
      { type: 'code', lang: 'javascript', caption: 'חיפוש במערך', code: `const users = ["דן", "שרה", "אבי"];

console.log(users.includes("שרה")); // true
console.log(users.includes("ז'אן")); // false

const nums = [3, 7, 12, 5];
const found = nums.find(n => n > 10);
console.log(found); // 12` },
      { type: 'tip', text: 'map, filter, reduce לא משנים את המערך המקורי — הם מחזירים מערך חדש. זה עיקרון של תכנות פונקציונלי.' },
    ],
    questionBank: [
      {
        id: 'js-arr-q1',
        text: 'מה יהיה הפלט? [10, 20, 30].map(n => n / 10)',
        options: ['[10, 20, 30]', '[1, 2, 3]', '6', 'שגיאה'],
        correct: 1,
        explanation: 'map מחלק כל אלמנט ב-10. התוצאה: [1, 2, 3].',
      },
      {
        id: 'js-arr-q2',
        text: 'איזה index יש לאלמנט הראשון במערך?',
        options: ['1', '0', '-1', 'תלוי בדפדפן'],
        correct: 1,
        explanation: 'מערכים ב-JavaScript (וברוב שפות התכנות) מתחילים מאינדקס 0.',
      },
      {
        id: 'js-arr-q3',
        text: 'מה עושה filter?',
        options: ['ממיין מערך', 'יוצר מערך חדש עם פריטים שעברו תנאי', 'מוחק פריטים מהמערך המקורי', 'מאחד שני מערכים'],
        correct: 1,
        explanation: 'filter מחזיר מערך חדש עם רק הפריטים שהפונקציה שלהם החזירה true.',
      },
      {
        id: 'js-arr-q4',
        text: 'מה תחזיר [1,2,3].reduce((acc, n) => acc + n, 0)?',
        options: ['[1,2,3]', '6', '0', 'undefined'],
        correct: 1,
        explanation: 'reduce מצטבר: 0+1=1, 1+2=3, 3+3=6. התוצאה היא 6.',
      },
      {
        id: 'js-arr-q5',
        text: 'מה עושה push()?',
        options: ['מוסיף פריט לתחילת המערך', 'מסיר פריט מהסוף', 'מוסיף פריט לסוף המערך', 'ממיין את המערך'],
        correct: 2,
        explanation: 'push() מוסיף אלמנט בסוף המערך ומחזיר את האורך החדש.',
      },
      {
        id: 'js-arr-q6',
        text: 'האם map משנה את המערך המקורי?',
        options: ['כן', 'לא, מחזיר מערך חדש', 'תלוי בפרמטרים', 'רק בדפדפנים ישנים'],
        correct: 1,
        explanation: 'map (כמו filter ו-reduce) לא משנה את המקור — מחזיר מערך חדש. המקור נשמר.',
      },
      {
        id: 'js-arr-q7',
        text: 'מה יחזיר [5,10,15].includes(10)?',
        options: ['1', 'true', '"true"', 'שגיאה'],
        correct: 1,
        explanation: 'includes בודקת אם ערך קיים במערך ומחזירה boolean — true אם קיים.',
      },
      {
        id: 'js-arr-q8',
        text: 'מה תחזיר [3,6,9].find(n => n > 5)?',
        options: ['[6, 9]', '6', 'true', '9'],
        correct: 1,
        explanation: 'find מחזיר את הפריט הראשון שעומד בתנאי. הראשון שגדול מ-5 הוא 6.',
      },
      {
        id: 'js-arr-q9',
        text: 'מה עושה splice(1, 2)?',
        options: ['מחזיר פריטים 1-2 בלי לשנות המקור', 'מסיר 2 פריטים החל מאינדקס 1 ומשנה את המקור', 'מוסיף פריטים', 'ממיין'],
        correct: 1,
        explanation: 'splice משנה את המקור! splice(start, deleteCount) מסיר deleteCount פריטים מ-start. שלא כמו slice שלא משנה.',
      },
      {
        id: 'js-arr-q10',
        text: 'מה ההבדל בין slice לסplice?',
        options: ['אין הבדל', 'slice לא משנה את המקור, splice משנה', 'splice לא משנה את המקור, slice משנה', 'slice מסיר, splice מוסיף'],
        correct: 1,
        explanation: 'slice(start, end) מחזיר חלק מהמערך בלי לשנות את המקור. splice(start, count) משנה את המערך המקורי.',
      },
      {
        id: 'js-arr-q11',
        text: 'מה מחזיר [1,2,3].some(n => n > 2)?',
        options: ['[3]', 'false', 'true', '3'],
        correct: 2,
        explanation: 'some() מחזיר true אם לפחות פריט אחד עומד בתנאי. 3 > 2, לכן התוצאה true.',
      },
      {
        id: 'js-arr-q12',
        text: 'מה מחזיר [1,2,3].every(n => n > 0)?',
        options: ['false', 'true', '[1,2,3]', '3'],
        correct: 1,
        explanation: 'every() מחזיר true רק אם כל הפריטים עומדים בתנאי. כולם גדולים מ-0, לכן true.',
      },
      {
        id: 'js-arr-q13',
        text: 'מה עושה Array.from("שלום")?',
        options: ['שגיאה', '["ש","ל","ו","מ"]', '"שלום"', '5'],
        correct: 1,
        explanation: 'Array.from ממיר iterable (כמו string) למערך. כל תו הופך לאלמנט.',
      },
      {
        id: 'js-arr-q14',
        text: 'מה מחזיר [1, [2, 3], [4, [5]]].flat()?',
        options: ['[1,2,3,4,[5]]', '[1,2,3,4,5]', '[[1],[2,3],[4,[5]]]', 'שגיאה'],
        correct: 0,
        explanation: 'flat() ברמה 1 (ברירת מחדל) מוציא רק רמה אחת. [4,[5]] הופך ל-4,[5]. לשטח הכל: flat(Infinity).',
      },
      {
        id: 'js-arr-q15',
        text: 'מה עושה unshift()?',
        options: ['מסיר פריט מהתחלה', 'מוסיף פריטים לתחילת המערך', 'מפך את המערך', 'ממיין'],
        correct: 1,
        explanation: 'unshift() מוסיף פריטים לתחילת המערך ומחזיר את האורך החדש. ההפך של push().',
      },
      {
        id: 'js-arr-q16',
        text: 'מה יחזיר ["c","a","b"].sort()?',
        options: ['["c","a","b"]', '["a","b","c"]', '["b","a","c"]', 'שגיאה'],
        correct: 1,
        explanation: 'sort() ממיין את המקור in-place ומחזיר אותו ממוין. ברירת מחדל: סדר לקסיקוגרפי (אלפביתי).',
      },
    ],
  },
  {
    id: 'js-objects',
    title: 'אובייקטים ו-Destructuring',
    summary: 'יצירת אובייקטים, גישה לתכונות, methods ופירוק אלגנטי',
    emoji: '🧩',
    content: [
      { type: 'heading', text: 'מה זה אובייקט?' },
      { type: 'text', text: 'אובייקט הוא אוסף של תכונות (properties) בצורת זוגות key-value. הוא מאפשר לקבץ מידע קשור ביחד.' },
      { type: 'code', lang: 'javascript', caption: 'יצירת אובייקט', code: `const person = {
  name: "שרה",
  age: 28,
  city: "תל אביב",
};

// גישה בנקודה:
console.log(person.name); // שרה

// גישה בסוגריים מרובעים:
console.log(person["age"]); // 28

// הוספה/שינוי:
person.email = "sarah@example.com";
person.age = 29;` },
      { type: 'heading', text: 'Methods — פונקציות באובייקט' },
      { type: 'text', text: 'Method היא פונקציה שמוגדרת כתכונה של אובייקט ויש לה גישה לאותו אובייקט דרך this. בדוגמה, כל קריאה ל-add מחזירה this — את האובייקט עצמו — מה שמאפשר שרשרת קריאות (method chaining). שימו לב ש-arrow functions לא מתאימות ל-methods כי הן לא מגדירות this משלהן.' },
      { type: 'code', lang: 'javascript', caption: 'Methods', code: `const calculator = {
  value: 0,
  add(n) {
    this.value += n;
    return this;
  },
  result() {
    return this.value;
  },
};

calculator.add(5).add(3);
console.log(calculator.result()); // 8` },
      { type: 'heading', text: 'Destructuring — פירוק אובייקטים' },
      { type: 'text', text: 'Destructuring מאפשר לחלץ תכונות מאובייקט ישירות למשתנים בשורה אחת, במקום לכתוב user.name, user.age וכו\' בנפרד. אפשר לתת שם חדש למשתנה עם נקודותיים (name: fullName), ולהגדיר ברירת מחדל עם = לתכונות שאולי לא קיימות. שימו לב שזה תבנית נפוצה מאוד ב-React לפרמטרי props.' },
      { type: 'code', lang: 'javascript', caption: 'Object destructuring', code: `const user = {
  name: "אלי",
  age: 32,
  country: "ישראל",
};

// בלי destructuring:
const name1 = user.name;
const age1 = user.age;

// עם destructuring:
const { name, age, country } = user;
console.log(name);    // אלי
console.log(age);     // 32

// עם שם שונה:
const { name: fullName } = user;
console.log(fullName); // אלי

// עם ברירת מחדל:
const { city = "לא ידוע" } = user;
console.log(city); // לא ידוע` },
      { type: 'heading', text: 'Spread Operator' },
      { type: 'text', text: 'Spread Operator (...) "פורש" את כל תכונות האובייקט לתוך אובייקט חדש. כך אפשר למזג אובייקטים או ליצור עותקים רדודים בלי לשנות את המקור. שימו לב להתנגשויות — כשאותה תכונה מופיעה בשני האובייקטים, הערך שמופיע אחרון מנצח, ולכן סדר ה-spread חשוב.' },
      { type: 'code', lang: 'javascript', caption: 'שיכפול ומיזוג אובייקטים', code: `const base = { color: "אדום", size: "גדול" };
const extra = { weight: 500, color: "כחול" };

// מיזוג (extra מנצח בהתנגשות):
const merged = { ...base, ...extra };
console.log(merged);
// { color: "כחול", size: "גדול", weight: 500 }

// עותק:
const copy = { ...base };` },
      { type: 'tip', text: 'Destructuring ו-Spread הם כלים חיוניים ב-React. תפגוש אותם בכל קומפוננטה.' },
    ],
    questionBank: [
      {
        id: 'js-obj-q1',
        text: 'מה יודפס? const p = { name: "דן", age: 30 }; console.log(p.name)',
        options: ['{ name: "דן" }', '"דן"', '30', 'שגיאה'],
        correct: 1,
        explanation: 'גישה בנקודה מחזירה את הערך של התכונה. p.name מחזיר "דן".',
      },
      {
        id: 'js-obj-q2',
        text: 'מה עושה const { x, y } = point?',
        options: ['מוחק x ו-y מ-point', 'יוצר משתנים x ו-y עם הערכים מ-point', 'מעתיק את כל point', 'שגיאה'],
        correct: 1,
        explanation: 'Destructuring חולץ תכונות לתוך משתנים. x ו-y יקבלו את הערכים המתאימים מ-point.',
      },
      {
        id: 'js-obj-q3',
        text: 'מה יהיה { ...{ a: 1 }, ...{ a: 2, b: 3 } }?',
        options: ['{ a: 1, b: 3 }', '{ a: 2, b: 3 }', '{ a: 1, a: 2, b: 3 }', 'שגיאה'],
        correct: 1,
        explanation: 'בהתנגשות, הערך האחרון מנצח. a: 2 מחליף את a: 1. התוצאה: { a: 2, b: 3 }.',
      },
      {
        id: 'js-obj-q4',
        text: 'איך ניגשים לתכונה ששמה נמצא במשתנה?',
        options: ['obj.varName', 'obj[varName]', 'obj->varName', 'obj::varName'],
        correct: 1,
        explanation: 'כשהשם דינמי (במשתנה), משתמשים בסוגריים מרובעים: obj[varName].',
      },
      {
        id: 'js-obj-q5',
        text: 'מה עושה this בתוך method של אובייקט?',
        options: ['מצביע על window', 'מצביע על האובייקט שהפעיל את ה-method', 'שגיאה תמיד', 'מצביע על הפונקציה עצמה'],
        correct: 1,
        explanation: 'בתוך method רגיל, this מצביע על האובייקט שממנו הופעל ה-method.',
      },
      {
        id: 'js-obj-q6',
        text: 'מה יודפס? const { a = 10 } = {}; console.log(a)',
        options: ['undefined', '{}', '10', 'שגיאה'],
        correct: 2,
        explanation: 'כשהתכונה לא קיימת באובייקט, ברירת המחדל נכנסת לפעולה. a יהיה 10.',
      },
      {
        id: 'js-obj-q7',
        text: 'איך מוסיפים תכונה חדשה לאובייקט קיים?',
        options: ['obj.add("key", value)', 'obj.push({key: value})', 'obj.newKey = value', 'obj.insert(key, value)'],
        correct: 2,
        explanation: 'פשוט מגדירים obj.newKey = value. אם התכונה קיימת, הערך יתעדכן.',
      },
      {
        id: 'js-obj-q8',
        text: 'מה מחזיר Object.keys({ a: 1, b: 2, c: 3 })?',
        options: ['[1, 2, 3]', '["a", "b", "c"]', '{ a, b, c }', '3'],
        correct: 1,
        explanation: 'Object.keys() מחזיר מערך של שמות התכונות (המפתחות) של האובייקט.',
      },
      {
        id: 'js-obj-q9',
        text: 'מה מחזיר Object.values({ a: 1, b: 2 })?',
        options: ['["a","b"]', '[1, 2]', '[["a",1],["b",2]]', '2'],
        correct: 1,
        explanation: 'Object.values() מחזיר מערך של הערכים של האובייקט.',
      },
      {
        id: 'js-obj-q10',
        text: 'מה מחזיר Object.entries({ x: 10 })?',
        options: ['["x"]', '[10]', '[["x", 10]]', '{ x: 10 }'],
        correct: 2,
        explanation: 'Object.entries() מחזיר מערך של זוגות [key, value]. שימושי לאיטרציה על אובייקט.',
      },
      {
        id: 'js-obj-q11',
        text: 'מה זה optional chaining (?.)?',
        options: ['בדיקת שוויון', 'גישה לתכונה בלי זריקת שגיאה אם הערך null/undefined', 'ברירת מחדל', 'spread operator'],
        correct: 1,
        explanation: 'user?.address?.city — אם user או address הם null/undefined, מחזיר undefined בלי לזרוק שגיאה. מונע "Cannot read property of undefined".',
      },
      {
        id: 'js-obj-q12',
        text: 'מה עושה nullish coalescing (??)?',
        options: ['בודק null בלבד', 'מחזיר את הצד הימני אם הצד השמאלי הוא null/undefined', 'מחזיר ערך default לכל falsy', 'שגיאה'],
        correct: 1,
        explanation: 'a ?? b מחזיר b רק אם a הוא null או undefined. שלא כמו || שמחזיר b גם ל-0, "", false.',
      },
      {
        id: 'js-obj-q13',
        text: 'האם אפשר להוסיף תכונה לאובייקט שהוגדר עם const?',
        options: ['לא, const מונע כל שינוי', 'כן, const מונע רק השמה מחדש של המשתנה עצמו', 'כן, אבל רק עם Object.assign', 'רק אם השדה הוגדר מראש'],
        correct: 1,
        explanation: 'const מונע שינוי ה-reference (לא ניתן לעשות obj = {}), אבל לא מונע שינוי תוכן האובייקט. obj.newProp = 1 עובד.',
      },
      {
        id: 'js-obj-q14',
        text: 'מה עושה Object.freeze()?',
        options: ['מצמיד את האובייקט לזיכרון', 'מונע כל שינוי לאובייקט', 'מקצה זיכרון', 'מסיר כל התכונות'],
        correct: 1,
        explanation: 'Object.freeze() מקפיא את האובייקט — לא ניתן להוסיף, למחוק, או לשנות תכונות.',
      },
      {
        id: 'js-obj-q15',
        text: 'מה מחזיר "hello".length?',
        options: ['undefined', '5', 'שגיאה — length לא קיים על string', '"5"'],
        correct: 1,
        explanation: 'Strings ב-JS הם primitive אך JS עוטף אותם אוטומטית ב-String object שיש לו תכונת length.',
      },
      {
        id: 'js-obj-q16',
        text: 'מה זה Shorthand Property?',
        options: ['const name = "אלי"; const obj = { name: name }', 'const name = "אלי"; const obj = { name }', 'שניהם זהים', 'כתיב b בלבד'],
        correct: 2,
        explanation: 'Shorthand: כש-key ו-variable שמם זהה, אפשר לכתוב { name } במקום { name: name }. שניהם תוצאה זהה.',
      },
    ],
  },
  {
    id: 'js-dom',
    title: 'DOM ואירועים',
    summary: 'שינוי דף HTML עם JS, האזנה לאירועים ואינטראקציה עם המשתמש',
    emoji: '🖱️',
    content: [
      { type: 'heading', text: 'מה זה DOM?' },
      { type: 'text', text: 'DOM (Document Object Model) הוא ייצוג של דף HTML כעץ של אובייקטים. JavaScript יכול לגשת ולשנות כל אלמנט בדף.' },
      { type: 'code', lang: 'javascript', caption: 'בחירת אלמנטים', code: `// לפי ID:
const title = document.getElementById("main-title");

// לפי CSS selector:
const btn = document.querySelector(".my-button");
const allItems = document.querySelectorAll("li");

// שינוי תוכן:
title.textContent = "כותרת חדשה!";
title.innerHTML = "<strong>מודגש</strong>";

// שינוי סגנון:
title.style.color = "blue";
title.style.fontSize = "2rem";` },
      { type: 'heading', text: 'אירועים (Events)' },
      { type: 'text', text: 'אירועים הם פעולות שהמשתמש מבצע: לחיצה, הקלדה, hover וכו\'. אנחנו "מאזינים" לאירועים עם addEventListener.' },
      { type: 'code', lang: 'javascript', caption: 'addEventListener', code: `const button = document.querySelector("#myBtn");

button.addEventListener("click", function() {
  console.log("לחצת!");
});

// או עם arrow function:
button.addEventListener("click", () => {
  alert("שלום!");
});

// אירועי מקלדת:
document.addEventListener("keydown", (e) => {
  console.log("לחצת על:", e.key);
});` },
      { type: 'heading', text: 'שינוי Classes' },
      { type: 'text', text: 'classList הוא ממשק נוח לניהול ה-classes של אלמנט HTML מבלי לכתוב ישירות ל-className. עם add ו-remove אפשר להוסיף ולהסיר classes, וה-toggle פועל כמתג — שימושי לפתיחה/סגירה של תפריטים ומצבי dark mode. שימו לב ש-contains מחזיר boolean ואפשר להשתמש בו בתנאים לפני פעולות.' },
      { type: 'code', lang: 'javascript', caption: 'classList', code: `const box = document.querySelector(".box");

box.classList.add("active");      // הוספת class
box.classList.remove("hidden");   // הסרת class
box.classList.toggle("dark");     // הוספה/הסרה לחילופין
box.classList.contains("active"); // בדיקה — true/false` },
      { type: 'heading', text: 'טפסים' },
      { type: 'text', text: 'קריאת תוכן שדה input נעשית דרך התכונה value. כאשר המשתמש לוחץ על כפתור שליחה, קוראים את input.value, מעבדים אותו, ואפשר לנקות את השדה על ידי השמת מחרוזת ריקה. שימו לב שחשוב תמיד לבדוק שה-value לא ריק לפני עיבוד הנתון.' },
      { type: 'code', lang: 'javascript', caption: 'עבודה עם input', code: `const input = document.querySelector("#nameInput");
const btn = document.querySelector("#submitBtn");

btn.addEventListener("click", () => {
  const value = input.value;
  console.log("הוכנס:", value);
  input.value = ""; // ניקוי שדה
});` },
      { type: 'tip', text: 'innerHTML מאפשר הזרקת HTML אבל עלול להוות סיכון אבטחה (XSS). textContent בטוח יותר עבור טקסט רגיל.' },
    ],
    questionBank: [
      {
        id: 'js-dom-q1',
        text: 'מה עושה document.querySelector(".box")?',
        options: ['בוחר את כל האלמנטים עם class=box', 'בוחר את הראשון עם class=box', 'יוצר אלמנט חדש', 'בוחר לפי ID'],
        correct: 1,
        explanation: 'querySelector מחזיר את האלמנט הראשון שתואם ל-selector. עם . בוחרים לפי class.',
      },
      {
        id: 'js-dom-q2',
        text: 'מה ההבדל בין textContent לבין innerHTML?',
        options: ['אין הבדל', 'textContent מטפל בטקסט בלבד, innerHTML מפרש HTML', 'innerHTML מהיר יותר תמיד', 'textContent לא קיים ב-JS'],
        correct: 1,
        explanation: 'textContent מגדיר טקסט גולמי (בטוח). innerHTML מפרש HTML — חזק יותר אבל עלול לגרום לבאגי אבטחה.',
      },
      {
        id: 'js-dom-q3',
        text: 'מה עושה addEventListener("click", fn)?',
        options: ['מסיר event listener', 'מוסיף האזנה לאירוע לחיצה', 'מפעיל fn מיד', 'יוצר כפתור'],
        correct: 1,
        explanation: 'addEventListener רושם פונקציה שתופעל בכל פעם שהאירוע המצוין קורה.',
      },
      {
        id: 'js-dom-q4',
        text: 'איך קוראים את הטקסט שהמשתמש הכניס ב-input?',
        options: ['input.text', 'input.content', 'input.value', 'input.data'],
        correct: 2,
        explanation: 'input.value מכיל את הטקסט הנוכחי ב-input. אפשר גם לשנות אותו.',
      },
      {
        id: 'js-dom-q5',
        text: 'מה עושה classList.toggle("dark")?',
        options: ['תמיד מוסיף "dark"', 'תמיד מסיר "dark"', 'מוסיף אם לא קיים, מסיר אם קיים', 'בודק אם "dark" קיים'],
        correct: 2,
        explanation: 'toggle פועל כמתג: אם ה-class קיים — מסיר אותו. אם לא קיים — מוסיף.',
      },
      {
        id: 'js-dom-q6',
        text: 'מה מחזיר document.querySelectorAll("p")?',
        options: ['אלמנט אחד', 'NodeList של כל אלמנטי p', 'מערך רגיל', 'שגיאה'],
        correct: 1,
        explanation: 'querySelectorAll מחזיר NodeList (דומה למערך) של כל האלמנטים שתואמים.',
      },
      {
        id: 'js-dom-q7',
        text: 'מה מכיל e.key ב-addEventListener("keydown", (e) => ...)?',
        options: ['קוד ASCII של המקש', 'שם המקש שנלחץ', 'עמדת המקלדת', 'צבע הרקע'],
        correct: 1,
        explanation: 'e.key מכיל את שם המקש כמחרוזת: "Enter", "a", "ArrowUp" וכו\'.',
      },
      {
        id: 'js-dom-q8',
        text: 'מה יעשה element.style.display = "none"?',
        options: ['ימחק את האלמנט מה-DOM', 'יסתיר את האלמנט (מרחב נשמר)', 'יסתיר את האלמנט (מרחב לא נשמר)', 'ישנה את הצבע'],
        correct: 2,
        explanation: 'display: none מסתיר את האלמנט לחלוטין — לא נראה ולא תופס מקום בדף.',
      },
      {
        id: 'js-dom-q9',
        text: 'מה ההבדל בין getElementById לquerySelector("#id")?',
        options: ['אין הבדל בתוצאה', 'getElementById מהיר יותר — ישיר, querySelector מפרש CSS selector', 'querySelector מהיר יותר', 'getElementById מחזיר NodeList'],
        correct: 1,
        explanation: 'שניהם מחזירים אלמנט אחד, אך getElementById מהיר יותר בגלל lookup ישיר ב-DOM. querySelector גמיש יותר כי מקבל כל CSS selector.',
      },
      {
        id: 'js-dom-q10',
        text: 'מה עושה element.appendChild(child)?',
        options: ['מוסיף child לפני element', 'מוסיף child כאחרון בין הצאצאים של element', 'מחליף את element ב-child', 'מעתיק element'],
        correct: 1,
        explanation: 'appendChild מוסיף אלמנט כצאצא אחרון. לדוגמה: ul.appendChild(li) מוסיף li בסוף הרשימה.',
      },
      {
        id: 'js-dom-q11',
        text: 'מה זה event bubbling?',
        options: ['אנימציה של אלמנטים', 'אירוע מתפשט מהאלמנט שעליו קרה למעלה עד document', 'יצירת אירועים חדשים', 'לולאת events'],
        correct: 1,
        explanation: 'כשלוחצים על כפתור בתוך div, האירוע "מבעבע" גם ל-div, לbody, ל-document. ניתן לעצור עם stopPropagation().',
      },
      {
        id: 'js-dom-q12',
        text: 'מה עושה event.preventDefault()?',
        options: ['מוחק את ה-event', 'מונע את התנהגות ברירת המחדל של הדפדפן', 'עוצר את bubbling', 'מסיר event listener'],
        correct: 1,
        explanation: 'preventDefault() מונע את הפעולה הדיפולטית. לדוגמה, מניעת שליחת טופס בלי validation: form.addEventListener("submit", e => e.preventDefault()).',
      },
      {
        id: 'js-dom-q13',
        text: 'מה עושה document.createElement("div")?',
        options: ['מוצא div קיים', 'יוצר אלמנט div חדש בזיכרון (לא מוסיף ל-DOM)', 'מוחק div', 'שולח div לשרת'],
        correct: 1,
        explanation: 'createElement יוצר אלמנט חדש אבל לא מוסיף אותו ל-DOM. צריך אחר כך להשתמש ב-appendChild/insertBefore/append.',
      },
      {
        id: 'js-dom-q14',
        text: 'מה ההבדל בין visibility:hidden לdisplay:none?',
        options: ['אין הבדל', 'visibility:hidden מסתיר אך שומר מקום; display:none מסיר לחלוטין', 'display:none שומר מקום; visibility:hidden לא', 'שניהם זהים'],
        correct: 1,
        explanation: 'visibility: hidden מסתיר את האלמנט אבל הוא ממשיך לתפוס מקום בדף. display: none מוציא אותו לחלוטין מה-layout.',
      },
      {
        id: 'js-dom-q15',
        text: 'מה זה DOMContentLoaded?',
        options: ['אירוע שנורה כשהדף נטען לגמרי כולל תמונות', 'אירוע שנורה כשה-HTML פורסר וה-DOM מוכן, לפני תמונות', 'אירוע לחיצה', 'טעינת CSS'],
        correct: 1,
        explanation: 'DOMContentLoaded נורה מוקדם יותר מ-window.onload — ה-DOM מוכן, אבל תמונות וstyle sheets עדיין עלולים להיות בטעינה.',
      },
      {
        id: 'js-dom-q16',
        text: 'מה עושה element.remove()?',
        options: ['מסתיר את האלמנט', 'מסיר את האלמנט מה-DOM לגמרי', 'ריק את תוכן האלמנט', 'מוחק את ה-class'],
        correct: 1,
        explanation: 'element.remove() מסיר את האלמנט מה-DOM. לאחר קריאה זו, האלמנט לא יופיע יותר בדף.',
      },
    ],
  },
  {
    id: 'js-async',
    title: 'Async/Await ו-Fetch',
    summary: 'תכנות אסינכרוני, Promises ושליפת נתונים מ-API',
    emoji: '🌐',
    content: [
      { type: 'heading', text: 'למה אסינכרוני?' },
      { type: 'text', text: 'פעולות כמו שליפת נתונים מרשת לוקחות זמן. אם JS היה מחכה לכל פעולה — הדף היה קופא. לכן JS מטפל בפעולות ארוכות בצורה אסינכרונית.' },
      { type: 'heading', text: 'Promises' },
      { type: 'text', text: 'Promise הוא אובייקט שמייצג פעולה אסינכרונית שתסתיים בעתיד — בהצלחה (resolve) או בכישלון (reject). ב-then מגדירים מה לעשות אחרי הצלחה, וב-catch מטפלים בשגיאות. שימו לב ל-setTimeout שמדמה כאן פעולה שלוקחת שתי שניות — כמו בקשת רשת אמיתית.' },
      { type: 'code', lang: 'javascript', caption: 'Promise', code: `const promise = new Promise((resolve, reject) => {
  // סימולציה של פעולה ארוכה:
  setTimeout(() => {
    resolve("הצליח! 🎉");
    // או reject("נכשל :(");
  }, 2000);
});

promise
  .then(result => console.log(result))  // הצליח
  .catch(error => console.log(error));  // נכשל` },
      { type: 'heading', text: 'async/await — כתיב נקי יותר' },
      { type: 'text', text: 'async/await הוא סינטקס מודרני שמאפשר לכתוב קוד אסינכרוני שנראה כמו קוד סינכרוני רגיל. המילה await "עוצרת" את הריצה בתוך הפונקציה עד שה-Promise מסתיים, אבל לא חוסמת את שאר האפליקציה. שימו לב ש-try/catch חיוני — בלעדיו שגיאות רשת לא יטופלו.' },
      { type: 'code', lang: 'javascript', caption: 'async/await', code: `async function fetchUser(id) {
  try {
    const response = await fetch(\`https://api.example.com/users/\${id}\`);
    const user = await response.json();
    return user;
  } catch (error) {
    console.error("שגיאה:", error);
  }
}

// שימוש:
const user = await fetchUser(1);
console.log(user.name);` },
      { type: 'heading', text: 'Fetch API' },
      { type: 'text', text: 'Fetch API היא הדרך המובנית בדפדפן לבצע בקשות HTTP. קריאת GET פשוטה דורשת רק כתובת URL, אבל קריאת POST דורשת גם method, headers ו-body עם הנתונים בפורמט JSON. שימו לב שצריך שתי פעולות await — אחת לקבלת ה-Response ואחת לקריאת גוף התשובה כ-JSON.' },
      { type: 'code', lang: 'javascript', caption: 'שליפת נתונים', code: `async function getJoke() {
  const res = await fetch("https://api.chucknorris.io/jokes/random");
  const data = await res.json();
  console.log(data.value);
}

// POST — שליחת נתונים:
async function createUser(userData) {
  const res = await fetch("/api/users", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });
  return res.json();
}` },
      { type: 'tip', text: 'תמיד עטוף async/await ב-try/catch. בקשות רשת יכולות להיכשל מסיבות רבות.' },
      { type: 'heading', text: 'Promise.all — מקביליות' },
      { type: 'text', text: 'Promise.all מאפשרת לשגר כמה בקשות רשת בו-זמנית ולחכות שכולן יסתיימו — הרבה יותר יעיל מ-await אחד אחרי השני. התוצאה מוחזרת כמערך בסדר שהוגדר, בלי תלות באיזו בקשה הסתיימה ראשונה. שימו לב שאם אחת הבקשות נכשלת, Promise.all נכשל כולו.' },
      { type: 'code', lang: 'javascript', caption: 'מספר בקשות במקביל', code: `async function loadDashboard() {
  // במקום לחכות לכל אחד בנפרד:
  const [user, posts, notifications] = await Promise.all([
    fetch("/api/user").then(r => r.json()),
    fetch("/api/posts").then(r => r.json()),
    fetch("/api/notifications").then(r => r.json()),
  ]);

  console.log(user, posts, notifications);
}` },
    ],
    questionBank: [
      {
        id: 'js-async-q1',
        text: 'מה זה Promise?',
        options: ['מערך של ערכים', 'אובייקט שמייצג ערך שיהיה זמין בעתיד', 'פונקציה שרצה מיד', 'לולאה אסינכרונית'],
        correct: 1,
        explanation: 'Promise מייצג פעולה אסינכרונית שיכולה להצליח (resolve) או להיכשל (reject).',
      },
      {
        id: 'js-async-q2',
        text: 'מה עושה await?',
        options: ['מעצור את כל ה-JavaScript', 'ממתין לסיום Promise לפני המשך', 'מבטל פעולות אסינכרוניות', 'פותח חיבור רשת'],
        correct: 1,
        explanation: 'await ממתין לסיום Promise בלי לחסום את שאר הקוד. ניתן לשימוש רק בתוך async function.',
      },
      {
        id: 'js-async-q3',
        text: 'למה צריך .json() אחרי fetch?',
        options: ['לוודא שה-URL תקין', 'כי fetch מחזיר Response ולא את הנתונים עצמם', 'לפורמט JSON', 'זה לא חובה'],
        correct: 1,
        explanation: 'fetch מחזיר Response object. .json() הוא method שקורא את גוף התגובה ומפרש אותו כ-JSON.',
      },
      {
        id: 'js-async-q4',
        text: 'מה עושה Promise.all()?',
        options: ['מריץ promises אחד אחרי השני', 'מריץ promises במקביל וממתין לכולם', 'מבחר בהצלחה הראשונה', 'מבטל את כולם'],
        correct: 1,
        explanation: 'Promise.all מריץ את כל ה-promises במקביל וממתין עד שכולם יסתיימו — יעיל יותר מ-await אחד אחרי השני.',
      },
      {
        id: 'js-async-q5',
        text: 'מה עושה try/catch עם async/await?',
        options: ['מואץ את הקוד', 'תופס שגיאות מ-promises שנכשלו', 'יוצר promise חדש', 'ביטול ה-await'],
        correct: 1,
        explanation: 'try/catch תופס שגיאות ב-async code — Promise שנכשל (reject) יגיע ל-catch.',
      },
      {
        id: 'js-async-q6',
        text: 'מה חייב לקדם פונקציה שמשתמשת ב-await?',
        options: ['const', 'function', 'async', 'await'],
        correct: 2,
        explanation: 'await ניתן לשימוש רק בתוך פונקציה שמוגדרת עם async.',
      },
      {
        id: 'js-async-q7',
        text: 'איזה HTTP method שולחים ב-fetch כדי לשלוח נתונים חדשים?',
        options: ['GET', 'POST', 'SEND', 'PUSH'],
        correct: 1,
        explanation: 'POST משמש לשליחת נתונים חדשים. GET לשליפה, PUT/PATCH לעדכון, DELETE למחיקה.',
      },
      {
        id: 'js-async-q8',
        text: 'מה יקרה אם fetch נכשל (שגיאת רשת) ואין try/catch?',
        options: ['יוחזר null', 'הפרומיס ידחה (reject) ושגיאה לא מטופלת', 'יוחזר מחרוזת ריקה', 'JS ימשיך כרגיל'],
        correct: 1,
        explanation: 'שגיאת רשת תגרום ל-Promise להידחות. בלי catch, זה יהיה Unhandled Promise Rejection.',
      },
      {
        id: 'js-async-q9',
        text: 'מה ההבדל בין setTimeout לsetInterval?',
        options: ['אין הבדל', 'setTimeout רץ פעם אחת אחרי עיכוב, setInterval חוזר על עצמו', 'setInterval רץ פעם אחת, setTimeout חוזר', 'שניהם רצים מיד'],
        correct: 1,
        explanation: 'setTimeout(fn, 1000) — fn תרוץ פעם אחת אחרי שניה. setInterval(fn, 1000) — fn תרוץ כל שניה עד clearInterval.',
      },
      {
        id: 'js-async-q10',
        text: 'מה זה Event Loop?',
        options: ['לולאת for על events', 'מנגנון שמאפשר ל-JS להיות אסינכרוני למרות שהוא single-threaded', 'ספריית events', 'מאגר events'],
        correct: 1,
        explanation: 'Event Loop: JS הוא single-threaded. Event Loop בודק אם ה-call stack ריק — אם כן, מעביר callback מה-queue לstack. כך עובדת האסינכרוניות.',
      },
      {
        id: 'js-async-q11',
        text: 'מה מחזיר async function תמיד?',
        options: ['void', 'הערך שב-return', 'Promise שמכיל את הערך', 'undefined'],
        correct: 2,
        explanation: 'async function תמיד מחזירה Promise. גם אם כותבים return 5, מבחוץ מקבלים Promise שמתממש ל-5.',
      },
      {
        id: 'js-async-q12',
        text: 'מה ההבדל בין Promise.all לPromise.allSettled?',
        options: ['אין הבדל', 'Promise.all נכשל אם אחד נכשל; allSettled ממתין לכולם בלי קשר', 'allSettled מהיר יותר', 'Promise.all עדיף תמיד'],
        correct: 1,
        explanation: 'Promise.all: אם promise אחד נכשל, כולם נכשלים. Promise.allSettled: ממתין לכולם — מחזיר מערך עם status וvalue/reason לכל promise.',
      },
      {
        id: 'js-async-q13',
        text: 'מה מחזיר fetch() לפני שה-response מגיע?',
        options: ['null', 'Promise שנמצא ב-pending', 'Response object ריק', 'undefined'],
        correct: 1,
        explanation: 'fetch() מחזיר מיד Promise במצב pending. כשה-server מגיב, ה-Promise יתממש עם Response object.',
      },
      {
        id: 'js-async-q14',
        text: 'מה יודפס? console.log(1); setTimeout(()=>console.log(2),0); console.log(3)',
        options: ['1,2,3', '1,3,2', '2,1,3', '3,2,1'],
        correct: 1,
        explanation: 'setTimeout עם 0ms עדיין נכנס לתור callbacks. ה-call stack מסיים: 1, 3 — ואז callback: 2. סדר: 1,3,2.',
      },
      {
        id: 'js-async-q15',
        text: 'האם fetch מזרוק שגיאה כשהשרת מחזיר 404?',
        options: ['כן, תמיד', 'לא — רק שגיאות רשת גורמות ל-reject. 404 הוא response תקין', 'כן, כל HTTP error מזרוק', 'תלוי בדפדפן'],
        correct: 1,
        explanation: 'fetch נכשל (reject) רק בשגיאות רשת. 404, 500 — כולם response "מוצלח" מבחינת fetch. בודקים עם res.ok או res.status.',
      },
      {
        id: 'js-async-q16',
        text: 'מה מחזיר Promise.race()?',
        options: ['ממתין לכל הpromises', 'מחזיר את ה-promise הראשון שהסתיים (הצלחה או כישלון)', 'מחזיר את המהיר ביותר בהצלחה בלבד', 'שגיאה'],
        correct: 1,
        explanation: 'Promise.race() מתממש (או נכשל) עם ה-promise הראשון שסיים — לא משנה אם הצליח או נכשל.',
      },
    ],
  },
]
