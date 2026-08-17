import type { Lesson } from '../../types'

export const nodejsLessons: Lesson[] = [
  {
    id: 'nodejs-intro',
    title: 'מבוא ל-Node.js',
    summary: 'מה זה Node.js, ה-Event Loop, Non-blocking I/O ומתי להשתמש',
    emoji: '🟢',
    content: [
      { type: 'heading', text: 'מה זה Node.js?' },
      {
        type: 'text',
        text: 'Node.js הוא סביבת ריצה (Runtime) ל-JavaScript מחוץ לדפדפן. הוא בנוי על מנוע V8 של Chrome ומאפשר לכתוב קוד server-side ב-JavaScript. הוחל ב-2009 על ידי Ryan Dahl.',
      },
      {
        type: 'table',
        caption: 'Node.js לעומת שפות Server-Side אחרות',
        headers: ['מאפיין', 'Node.js', 'Python/Django', 'Java/Spring'],
        rows: [
          ['שפה', 'JavaScript', 'Python', 'Java'],
          ['I/O Model', 'Non-blocking (async)', 'Blocking (sync)', 'Blocking / Thread-per-request'],
          ['ביצועים', 'מצוין ל-I/O-heavy', 'טוב', 'מצוין ל-CPU-heavy'],
          ['אקוסיסטם', 'npm — הכי גדול בעולם', 'pip — ענק', 'Maven/Gradle — מבוגר'],
          ['Learning Curve', 'נמוך (JS ידוע)', 'נמוך', 'גבוה'],
        ],
      },
      { type: 'heading', text: 'Event Loop — הלב של Node.js' },
      {
        type: 'text',
        text: 'Node.js הוא Single-Threaded אך לא חסום — הוא משתמש ב-Event Loop כדי לטפל בבקשות במקביל. במקום להמתין לתגובה מ-DB או קובץ, Node.js רושם callback ומטפל בבקשה הבאה.',
      },
      {
        type: 'code',
        lang: 'text',
        caption: 'Event Loop — סדר פעולות',
        code: `Call Stack → Node APIs (libuv) → Callback Queue → Event Loop → Call Stack

שלבי ה-Event Loop (לפי סדר):
  1. timers        — setTimeout, setInterval callbacks
  2. pending I/O   — I/O callbacks נדחו מ-iteration קודם
  3. idle/prepare  — שימוש פנימי
  4. poll          — קליטת I/O events חדשים (הכי חשוב!)
  5. check         — setImmediate callbacks
  6. close         — close events (socket.on('close'))

process.nextTick() — רץ לפני כל שלב (microtask queue)
Promise.resolve()  — רץ לפני כל שלב (microtask queue)`,
      },
      {
        type: 'code',
        lang: 'javascript',
        caption: 'דוגמה — סדר הרצה',
        code: `console.log('1');

setTimeout(() => console.log('2'), 0);

Promise.resolve().then(() => console.log('3'));

process.nextTick(() => console.log('4'));

console.log('5');

// Output: 1, 5, 4, 3, 2
// nextTick → Promise → setTimeout`,
      },
      { type: 'heading', text: 'Blocking vs Non-Blocking' },
      {
        type: 'code',
        lang: 'javascript',
        caption: 'Non-blocking I/O',
        code: `const fs = require('fs');

// ❌ Blocking — חוסם את כל ה-thread
const data = fs.readFileSync('file.txt', 'utf8');
console.log(data); // ממתין לקובץ

// ✅ Non-blocking — ממשיך לעבד בקשות אחרות
fs.readFile('file.txt', 'utf8', (err, data) => {
  if (err) throw err;
  console.log(data);
});
console.log('זה ירוץ לפני הקריאה מסתיימת');`,
      },
      { type: 'tip', text: 'Node.js מצוין ל-I/O-heavy applications: APIs, Chat servers, Streaming. הוא לא מתאים ל-CPU-heavy tasks כמו חישובים כבדים — אלה חוסמים את ה-Event Loop לכולם. לחישובים כבדים: Worker Threads או שירות נפרד.' },
    ],
    questionBank: [
      {
        id: 'ni-q1',
        text: 'מה הבסיס הטכני של Node.js?',
        options: [
          'מנוע SpiderMonkey של Firefox + libuv',
          'מנוע V8 של Chrome + libuv לניהול I/O אסינכרוני',
          'מנוע JavaScriptCore של Safari',
          'JVM של Java עם JavaScript wrapper',
        ],
        correct: 1,
        explanation: 'Node.js = V8 (JS engine מ-Chrome, מקמפל JS ל-machine code) + libuv (C library לניהול Event Loop, I/O אסינכרוני, Thread Pool). V8 מריץ את הקוד; libuv מנהל את ה-async operations ו-Event Loop.',
      },
      {
        id: 'ni-q2',
        text: 'מה סדר ההרצה הנכון? setTimeout(fn, 0), Promise.resolve().then(fn), process.nextTick(fn)',
        options: [
          'setTimeout → Promise → nextTick',
          'Promise → nextTick → setTimeout',
          'nextTick → Promise → setTimeout',
          'הכל רץ במקביל',
        ],
        correct: 2,
        explanation: 'process.nextTick() רץ ראשון (לפני כל I/O event), אחריו Microtasks (Promises), ורק אחריהם Macrotasks כמו setTimeout. זה קריטי להבנת async behavior ב-Node.js.',
      },
      {
        id: 'ni-q3',
        text: 'מתי Node.js הוא הבחירה הנכונה?',
        options: [
          'חישוב מטריצות גדולות ו-Machine Learning',
          'עיבוד וידאו ו-Image Processing כבד',
          'REST APIs, Real-time apps, Streaming, Microservices',
          'מסדי נתונים relational מורכבים בלבד',
        ],
        correct: 2,
        explanation: 'Node.js מזהיר ב-I/O-heavy scenarios: HTTP APIs, WebSockets, Chat apps, Streaming. ה-Event Loop המאפשר לטפל בהרבה בקשות במקביל עם thread אחד. CPU-heavy tasks (ML, video encoding) ייחסמו את ה-Event Loop.',
      },
      {
        id: 'ni-q4',
        text: 'מה ההבדל בין Blocking ל-Non-blocking I/O?',
        options: [
          'Blocking מהיר יותר, Non-blocking איטי יותר',
          'Blocking מחכה לסיום הפעולה לפני המשך; Non-blocking ממשיך ומקבל תוצאה ב-callback/promise',
          'הם זהים בתפקוד אך שונים בסינטקס',
          'Non-blocking לא תומך ב-error handling',
        ],
        correct: 1,
        explanation: 'Blocking: fs.readFileSync() — ה-thread מחכה. Non-blocking: fs.readFile() — Node.js שולח לlibuv thread pool ומיד חוזר. זה מאפשר לטפל באלפי בקשות במקביל עם thread אחד.',
      },
      {
        id: 'ni-q5',
        text: 'מה יקרה אם נריץ חישוב CPU-כבד ב-Event Loop של Node.js?',
        options: [
          'Node.js ייצור thread חדש אוטומטית',
          'החישוב יחולק בין ה-CPUs הזמינים',
          'ה-Event Loop ייחסם וכל הבקשות האחרות יעצרו עד לסיום החישוב',
          'Node.js יזרוק שגיאה ויעצור',
        ],
        correct: 2,
        explanation: 'Node.js הוא Single-Threaded. חישוב כבד (כמו while(true) או Fibonacci גדול) חוסם את ה-Event Loop כולו — אף בקשה אחרת לא תוכל להתעבד. הפתרון: Worker Threads, child_process, או להעביר לשירות נפרד.',
      },
    ],
  },

  {
    id: 'nodejs-modules',
    title: 'מודולים ו-npm',
    summary: 'CommonJS, ES Modules, package.json ו-npm — ניהול תלויות ב-Node.js',
    emoji: '📦',
    content: [
      { type: 'heading', text: 'CommonJS (CJS) — המערכת הקלאסית' },
      {
        type: 'code',
        lang: 'javascript',
        caption: 'CommonJS require/module.exports',
        code: `// math.js — ייצוא
function add(a, b) { return a + b; }
function multiply(a, b) { return a * b; }

module.exports = { add, multiply };
// או: module.exports.add = add;

// app.js — ייבוא
const { add, multiply } = require('./math');
const fs = require('fs');        // Built-in module
const express = require('express'); // npm package

console.log(add(2, 3)); // 5`,
      },
      { type: 'heading', text: 'ES Modules (ESM) — הסטנדרט המודרני' },
      {
        type: 'code',
        lang: 'javascript',
        caption: 'ES Modules import/export',
        code: `// math.mjs (או package.json: "type": "module")
export function add(a, b) { return a + b; }
export const PI = 3.14159;
export default class Calculator { /* ... */ }

// app.mjs — ייבוא
import Calculator, { add, PI } from './math.mjs';
import { readFile } from 'fs/promises';  // named import
import * as Math from './math.mjs';      // namespace import

// Dynamic import — טוען בזמן ריצה
const module = await import('./math.mjs');`,
      },
      {
        type: 'table',
        caption: 'CJS לעומת ESM',
        headers: ['מאפיין', 'CommonJS (CJS)', 'ES Modules (ESM)'],
        rows: [
          ['Syntax', 'require() / module.exports', 'import / export'],
          ['Loading', 'Synchronous (מיידי)', 'Asynchronous (async)'],
          ['__dirname', 'זמין', 'לא זמין (השתמש ב-import.meta.url)'],
          ['Top-level await', 'לא', 'כן'],
          ['Tree-shaking', 'קשה', 'מלא'],
          ['קובץ', '.js / .cjs', '.mjs או "type":"module"'],
        ],
      },
      { type: 'heading', text: 'package.json — לב הפרויקט' },
      {
        type: 'code',
        lang: 'json',
        caption: 'package.json מלא',
        code: `{
  "name": "my-api",
  "version": "1.0.0",
  "description": "REST API with Node.js",
  "main": "src/index.js",
  "type": "module",
  "scripts": {
    "start": "node src/index.js",
    "dev": "nodemon src/index.js",
    "test": "jest",
    "build": "tsc"
  },
  "dependencies": {
    "express": "^4.18.2",
    "dotenv": "^16.3.1"
  },
  "devDependencies": {
    "nodemon": "^3.0.2",
    "jest": "^29.7.0"
  },
  "engines": {
    "node": ">=18.0.0"
  }
}`,
      },
      { type: 'heading', text: 'npm — פקודות חיוניות' },
      {
        type: 'code',
        lang: 'bash',
        caption: 'npm commands',
        code: `# אתחול פרויקט
npm init -y

# התקנת packages
npm install express          # dependency
npm install -D nodemon       # devDependency
npm install -g typescript    # global

# הסרה
npm uninstall express

# הפעלת scripts
npm start
npm run dev
npm test

# בדיקת גרסאות
npm outdated
npm update

# audit אבטחה
npm audit
npm audit fix

# package-lock.json — נעילת גרסאות מדויקות (commit לgit!)`,
      },
      { type: 'tip', text: 'Semantic Versioning: "^4.18.2" = תאים עם 4.x.x (major קבוע). "~4.18.2" = תאים עם 4.18.x (major+minor קבועים). "4.18.2" = גרסה מדויקת בלבד. תמיד commit את package-lock.json לgit — הוא מבטיח גרסאות זהות בכל סביבה.' },
    ],
    questionBank: [
      {
        id: 'nm-q1',
        text: 'מה ההבדל בין dependencies ל-devDependencies?',
        options: [
          'אין הבדל — הם זהים לחלוטין',
          'dependencies = נדרש ב-production; devDependencies = כלי פיתוח בלבד (test, build, linting)',
          'devDependencies = נדרש ב-production; dependencies = כלי פיתוח',
          'dependencies מותקן גלובלי; devDependencies מקומי בלבד',
        ],
        correct: 1,
        explanation: 'dependencies: express, mongoose — נדרש בפרודקשן כדי שהאפליקציה תרוץ. devDependencies: jest, nodemon, eslint, typescript — נדרש רק בפיתוח, לא ב-production build. npm install --production לא מתקין devDependencies.',
      },
      {
        id: 'nm-q2',
        text: 'מה יתרון ES Modules על CommonJS?',
        options: [
          'CJS מהיר יותר מ-ESM',
          'ESM תומך ב-Top-level await, Tree-shaking, ו-Static analysis — CJS נטען synchronously ולא תומך בTree-shaking',
          'CJS תואם לכל הדפדפנים ו-ESM לא',
          'אין הבדל מעשי',
        ],
        correct: 1,
        explanation: 'ESM יתרונות: Top-level await, Static imports (מאפשר Tree-shaking), תואם לדפדפנים ול-Node.js. CJS: synchronous (require חוסם), לא תומך ב-Tree-shaking. מודרן Node.js projects מעדיפים ESM.',
      },
      {
        id: 'nm-q3',
        text: 'מה תפקיד package-lock.json?',
        options: [
          'מונע הוספת packages חדשים',
          'נועל גרסאות מדויקות של כל dependency (כולל transitive) לשחזור מדויק של הסביבה',
          'מגדיר permissions לpackages',
          'מאחסן את הקוד המותקן של packages',
        ],
        correct: 1,
        explanation: 'package-lock.json מכיל גרסאות מדויקות + checksums של כל package וה-transitive dependencies שלו. מבטיח ש-npm install ייצר תוצאה זהה בכל מכונה. חייב להיות ב-git.',
      },
      {
        id: 'nm-q4',
        text: 'כיצד נכון להשתמש ב-__dirname ב-ES Modules?',
        options: [
          '__dirname זמין גם ב-ESM ללא שינוי',
          'import __dirname from "path"',
          'const __dirname = new URL(".", import.meta.url).pathname',
          '__dirname לא ניתן להשתמש בו ב-ESM בשום אופן',
        ],
        correct: 2,
        explanation: '__dirname ו-__filename הם globals של CJS בלבד. ב-ESM: import.meta.url מכיל את ה-URL של הקובץ הנוכחי. const __dirname = new URL(".", import.meta.url).pathname לקבלת directory path.',
      },
    ],
  },

  {
    id: 'nodejs-express',
    title: 'Express.js — בניית REST API',
    summary: 'HTTP, Express middleware, routing ובניית REST API מלא',
    emoji: '🚂',
    content: [
      { type: 'heading', text: 'Express.js — Framework בסיסי' },
      {
        type: 'code',
        lang: 'javascript',
        caption: 'Express — הגדרה בסיסית',
        code: `const express = require('express');
const app = express();

// Middleware גלובלי
app.use(express.json());              // parse JSON body
app.use(express.urlencoded({ extended: true })); // parse form data

// Route פשוט
app.get('/', (req, res) => {
  res.json({ message: 'Hello World' });
});

// Route עם path parameter
app.get('/users/:id', (req, res) => {
  const { id } = req.params;
  res.json({ userId: id });
});

// Query params: GET /users?page=2&limit=10
app.get('/users', (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  res.json({ page, limit });
});

app.listen(3000, () => console.log('Server on port 3000'));`,
      },
      { type: 'heading', text: 'Middleware — צינור העיבוד' },
      {
        type: 'text',
        text: 'Middleware הוא פונקציה שמקבלת (req, res, next) ויכולה לשנות את הבקשה, לסיים אותה, או להעביר לmiddleware הבא. הסדר חשוב מאוד.',
      },
      {
        type: 'code',
        lang: 'javascript',
        caption: 'Middleware מותאם אישית',
        code: `// Logger Middleware
function logger(req, res, next) {
  console.log(\`\${req.method} \${req.url} - \${new Date().toISOString()}\`);
  next(); // חיוני! בלי next() הבקשה נתקעת
}

// Auth Middleware
function authenticate(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'No token' });

  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch {
    res.status(403).json({ error: 'Invalid token' });
  }
}

// Error Middleware — חייב להיות עם 4 פרמטרים
function errorHandler(err, req, res, next) {
  console.error(err.stack);
  res.status(err.status || 500).json({ error: err.message });
}

app.use(logger);
app.use('/api', authenticate); // רק לroutes עם /api
app.use(errorHandler);         // תמיד בסוף`,
      },
      { type: 'heading', text: 'Router — ארגון Routes' },
      {
        type: 'code',
        lang: 'javascript',
        caption: 'Express Router',
        code: `// routes/users.js
const router = require('express').Router();

router.get('/', async (req, res, next) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    next(err); // מעביר לerror middleware
  }
});

router.post('/', async (req, res, next) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch (err) {
    next(err);
  }
});

router.put('/:id', async (req, res, next) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  } catch (err) {
    next(err);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
});

module.exports = router;

// app.js
app.use('/api/users', require('./routes/users'));`,
      },
      {
        type: 'table',
        caption: 'HTTP Status Codes חשובים',
        headers: ['קוד', 'משמעות', 'מתי להשתמש'],
        rows: [
          ['200', 'OK', 'GET, PUT ב-success'],
          ['201', 'Created', 'POST שיצר משאב'],
          ['204', 'No Content', 'DELETE ב-success'],
          ['400', 'Bad Request', 'בקשה שגויה מהלקוח'],
          ['401', 'Unauthorized', 'לא מחובר'],
          ['403', 'Forbidden', 'מחובר אך חסר הרשאות'],
          ['404', 'Not Found', 'משאב לא נמצא'],
          ['409', 'Conflict', 'כפילות (email קיים)'],
          ['422', 'Unprocessable Entity', 'Validation error'],
          ['500', 'Internal Server Error', 'שגיאת שרת'],
        ],
      },
      { type: 'tip', text: 'Express 5 (stable מ-2024) תומך ב-async handlers ישירות — שגיאות שנזרקות ב-async routes מועברות אוטומטית לerror middleware בלי צורך ב-try/catch. בExpress 4 חייב לעטוף ב-try/catch ולקרוא ל-next(err).' },
    ],
    questionBank: [
      {
        id: 'ex-q1',
        text: 'מה תפקיד next() ב-Express Middleware?',
        options: [
          'שולח response ללקוח',
          'מעביר עיבוד ה-request ל-middleware הבא בשרשרת',
          'מאתחל מחדש את ה-request',
          'מסיים את החיבור',
        ],
        correct: 1,
        explanation: 'next() מעביר את ה-request ל-middleware/route הבא. בלי קריאה ל-next() (ובלי לשלוח response) — הבקשה נתקעת ו-timeout. next(err) — מעביר לerror handling middleware (4 params).',
      },
      {
        id: 'ex-q2',
        text: 'מה ההבדל בין req.params, req.query ו-req.body?',
        options: [
          'הם זהים — כולם מקבלים נתונים מהלקוח',
          'req.params: URL path (:id), req.query: query string (?page=1), req.body: request body (POST/PUT JSON)',
          'req.body עובד רק עם GET requests',
          'req.params זמין רק ב-POST requests',
        ],
        correct: 1,
        explanation: 'req.params: /users/:id → req.params.id. req.query: /users?page=2&sort=name → req.query.page. req.body: נתוני body של POST/PUT/PATCH (JSON עם express.json() middleware). כל אחד ממקור שונה.',
      },
      {
        id: 'ex-q3',
        text: 'מה מייחד Error Handling Middleware ב-Express?',
        options: [
          'הוא חייב להיות הראשון ברשימת ה-middleware',
          'הוא מקבל 4 פרמטרים: (err, req, res, next) — Express מזהה אותו ע"פ מספר הפרמטרים',
          'הוא רץ אוטומטית לפני כל route',
          'הוא מוגדר עם app.error() במקום app.use()',
        ],
        correct: 1,
        explanation: 'Express מזהה Error Middleware לפי מספר הפרמטרים — חייבים להיות בדיוק 4: (err, req, res, next). חייב להיות מוגדר אחרי כל ה-routes האחרים. next(err) מכל middleware/route ידלג ישר אליו.',
      },
      {
        id: 'ex-q4',
        text: 'מה Status Code נכון לשלוח כשמוחקים משאב בהצלחה?',
        options: ['200 OK', '201 Created', '204 No Content', '404 Not Found'],
        correct: 2,
        explanation: '204 No Content — מציין הצלחה ללא תוכן בתגובה. אין body. 200 OK עם body גם קביל. 201 = יצירה (POST). 404 = לא נמצא. DELETE שהצליח = 204.',
      },
    ],
  },

  {
    id: 'nodejs-async',
    title: 'Async Programming',
    summary: 'Callbacks, Promises, async/await ו-error handling אסינכרוני',
    emoji: '⏳',
    content: [
      { type: 'heading', text: 'האבולוציה של Async ב-Node.js' },
      {
        type: 'code',
        lang: 'javascript',
        caption: 'Callbacks — הגישה הישנה',
        code: `// Callback Hell — "Pyramid of Doom"
fs.readFile('users.json', 'utf8', (err, data) => {
  if (err) return handleError(err);

  const users = JSON.parse(data);
  db.query('SELECT * FROM orders', (err, orders) => {
    if (err) return handleError(err);

    sendEmail(users[0].email, orders, (err, result) => {
      if (err) return handleError(err);
      console.log('Done!'); // קשה לקרוא ולתחזק
    });
  });
});`,
      },
      {
        type: 'code',
        lang: 'javascript',
        caption: 'Promises — שיפור משמעותי',
        code: `// Promise chain
fetchUser(userId)
  .then(user => fetchOrders(user.id))
  .then(orders => sendEmail(orders))
  .then(result => console.log('Done!', result))
  .catch(err => console.error('Error:', err))
  .finally(() => db.close());

// יצירת Promise
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Promise.all — במקביל
const [users, products] = await Promise.all([
  fetch('/api/users').then(r => r.json()),
  fetch('/api/products').then(r => r.json()),
]);

// Promise.allSettled — כולם, גם אם נכשלו
const results = await Promise.allSettled([p1, p2, p3]);
results.forEach(({ status, value, reason }) => { /* ... */ });

// Promise.race — הראשון שמסיים
const fastest = await Promise.race([fetch('/api1'), fetch('/api2')]);`,
      },
      {
        type: 'code',
        lang: 'javascript',
        caption: 'async/await — הסטנדרט המודרני',
        code: `// async/await — קריא כמו קוד synchronous
async function processUser(userId) {
  try {
    const user = await fetchUser(userId);      // מחכה לPromise
    const orders = await fetchOrders(user.id);
    const result = await sendEmail(user.email, orders);
    return result;
  } catch (err) {
    console.error('Failed:', err.message);
    throw err; // re-throw אם נדרש
  }
}

// Top-level await (ESM בלבד)
const config = await loadConfig();

// async עם Array methods
const users = [1, 2, 3];

// ✅ נכון — מקביל
const results = await Promise.all(users.map(id => fetchUser(id)));

// ❌ שגוי — סדרתי (איטי!)
for (const id of users) {
  const user = await fetchUser(id); // כל אחד מחכה לקודם
}`,
      },
      { type: 'heading', text: 'Error Handling אסינכרוני' },
      {
        type: 'code',
        lang: 'javascript',
        caption: 'Async Error Patterns',
        code: `// Pattern 1: try/catch
async function getUser(id) {
  try {
    const user = await db.findById(id);
    if (!user) throw new Error('User not found'); // custom error
    return user;
  } catch (err) {
    if (err.code === 'ECONNREFUSED') throw new DatabaseError(err);
    throw err;
  }
}

// Pattern 2: Unhandled Rejection
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  process.exit(1); // בפרודקשן — לצאת ולהפעיל מחדש
});

// Pattern 3: Custom Error Classes
class AppError extends Error {
  constructor(message, statusCode = 500) {
    super(message);
    this.statusCode = statusCode;
    this.name = this.constructor.name;
  }
}

class NotFoundError extends AppError {
  constructor(resource) {
    super(\`\${resource} not found\`, 404);
  }
}

throw new NotFoundError('User');`,
      },
      { type: 'tip', text: 'תמיד handle את unhandledRejection ו-uncaughtException ב-Node.js. Promise שנכשל בלי .catch() — יגרום ל-UnhandledPromiseRejection. ב-Node.js 15+ זה קורס את התהליך. בפרודקשן: הוסף process.on("unhandledRejection") ותצא בשגיאה לאפשר ל-PM2/K8s להפעיל מחדש.' },
    ],
    questionBank: [
      {
        id: 'as-q1',
        text: 'מה ההבדל בין Promise.all ל-Promise.allSettled?',
        options: [
          'הם זהים לחלוטין',
          'Promise.all נכשל אם Promise אחד נכשל; Promise.allSettled מחכה לכולם ומחזיר status לכל אחד',
          'Promise.allSettled מהיר יותר מ-Promise.all',
          'Promise.all תומך רק ב-2 promises',
        ],
        correct: 1,
        explanation: 'Promise.all: fail-fast — אם Promise אחד נכשל, כולם נכשלים מיד. Promise.allSettled: מחכה לכולם, מחזיר [{ status: "fulfilled", value }, { status: "rejected", reason }]. השתמש ב-allSettled כשאתה רוצה לדעת מה קרה לכל Promise בנפרד.',
      },
      {
        id: 'as-q2',
        text: 'מה הבעיה בקוד זה? for (const id of ids) { await fetchUser(id); }',
        options: [
          'await לא עובד בתוך for loop',
          'הקוד טוב ויעיל',
          'כל fetchUser מחכה לקודם — הפעולות רצות סדרתית במקום במקביל (איטי)',
          'for loop לא תומך ב-async',
        ],
        correct: 2,
        explanation: 'for..of עם await = סדרתי. אם יש 10 משתמשים ו-fetchUser לוקח 100ms — סה"כ 1000ms. הפתרון: Promise.all(ids.map(id => fetchUser(id))) = 100ms בלבד (במקביל). השתמש ב-for..of רק כשסדרתיות הכרחית.',
      },
      {
        id: 'as-q3',
        text: 'מה יקרה ב-Node.js 15+ אם Promise נכשל בלי .catch()?',
        options: [
          'השגיאה תתעלם בשקט',
          'UnhandledPromiseRejection — ב-Node.js 15+ הprocess קורס',
          'Node.js יפעיל retry אוטומטי',
          'השגיאה תודפס לconsole בלבד',
        ],
        correct: 1,
        explanation: 'ב-Node.js 15+ UnhandledPromiseRejection גורם ל-process.exit(1). לפני כן — Warning בלבד. בפרודקשן: תמיד .catch() או try/catch על async. הוסף process.on("unhandledRejection", ...) כ-safety net.',
      },
      {
        id: 'as-q4',
        text: 'מה async function מחזירה תמיד?',
        options: [
          'ערך מהסוג שהוגדר ב-return',
          'Promise — גם אם הפונקציה synchronous',
          'undefined',
          'הוא תלוי ב-await שבתוכה',
        ],
        correct: 1,
        explanation: 'async function תמיד מחזירה Promise. async function() { return 42; } שקול ל-Promise.resolve(42). זה מאפשר לקרוא לה עם await או .then(). גם פונקציה async שזורקת שגיאה מחזירה Promise.reject(err).',
      },
    ],
  },

  {
    id: 'nodejs-streams',
    title: 'Streams, Buffers ו-Events',
    summary: 'Node.js Streams, EventEmitter, Buffer ועיבוד נתונים גדולים',
    emoji: '🌊',
    content: [
      { type: 'heading', text: 'למה Streams?' },
      {
        type: 'text',
        text: 'Streams מאפשרים לעבד נתונים גדולים חתיכה-חתיכה במקום לטעון הכל לזיכרון. קובץ של 10GB ניתן לעיבוד עם פחות מ-64KB RAM.',
      },
      {
        type: 'table',
        caption: 'סוגי Streams',
        headers: ['סוג', 'כיוון', 'דוגמה'],
        rows: [
          ['Readable', 'קריאה בלבד', 'fs.createReadStream, http.IncomingMessage'],
          ['Writable', 'כתיבה בלבד', 'fs.createWriteStream, http.ServerResponse'],
          ['Duplex', 'שני כיוונים', 'TCP Socket, net.Socket'],
          ['Transform', 'שינוי בזמן עיבוד', 'zlib.createGzip, crypto.createCipher'],
        ],
      },
      {
        type: 'code',
        lang: 'javascript',
        caption: 'Streams — דוגמאות',
        code: `const fs = require('fs');
const zlib = require('zlib');
const { pipeline, Transform } = require('stream');

// ✅ Stream — זיכרון יעיל
fs.createReadStream('bigfile.csv')
  .pipe(fs.createWriteStream('output.csv'));

// Compress קובץ עם pipeline (עדיף על pipe — handle errors)
pipeline(
  fs.createReadStream('input.txt'),
  zlib.createGzip(),
  fs.createWriteStream('output.txt.gz'),
  (err) => {
    if (err) console.error('Pipeline failed:', err);
    else console.log('Done');
  }
);

// Transform Stream מותאם
const upperCase = new Transform({
  transform(chunk, encoding, callback) {
    callback(null, chunk.toString().toUpperCase());
  }
});

process.stdin.pipe(upperCase).pipe(process.stdout);

// ❌ גרוע — טוען הכל לזיכרון
const data = fs.readFileSync('bigfile.csv'); // Out of Memory!`,
      },
      { type: 'heading', text: 'EventEmitter — מנגנון Events' },
      {
        type: 'code',
        lang: 'javascript',
        caption: 'EventEmitter',
        code: `const { EventEmitter } = require('events');

class OrderService extends EventEmitter {
  async createOrder(data) {
    const order = await db.orders.create(data);
    this.emit('order:created', order);         // שידור event
    this.emit('notification', { type: 'new-order', order });
    return order;
  }
}

const orderService = new OrderService();

// הקשבה לevents
orderService.on('order:created', async (order) => {
  await emailService.sendConfirmation(order);
  console.log('Email sent for order:', order.id);
});

orderService.on('order:created', async (order) => {
  await inventoryService.reserve(order.items);
});

// once — הקשבה חד-פעמית
orderService.once('ready', () => console.log('Service ready'));

// הסרת listener
const handler = (order) => { /* ... */ };
orderService.on('order:created', handler);
orderService.off('order:created', handler); // הסרה`,
      },
      { type: 'heading', text: 'Buffer — עיבוד Binary Data' },
      {
        type: 'code',
        lang: 'javascript',
        caption: 'Buffer basics',
        code: `// יצירת Buffer
const buf1 = Buffer.from('Hello World', 'utf8');
const buf2 = Buffer.alloc(10);                    // 10 bytes אפסים
const buf3 = Buffer.from([0x48, 0x65, 0x6c, 0x6c, 0x6f]); // Hex

// המרות
console.log(buf1.toString('utf8'));   // 'Hello World'
console.log(buf1.toString('base64')); // 'SGVsbG8gV29ybGQ='
console.log(buf1.toString('hex'));    // '48656c6c6f...'

// שרשור Buffers
const combined = Buffer.concat([buf1, buf2]);

// Buffer.byteLength
console.log(Buffer.byteLength('שלום', 'utf8')); // 8 (לא 4!)
console.log('שלום'.length);                     // 4 (chars)

// Images, files, binary — הכל עובר כBuffer ב-Node.js`,
      },
      { type: 'tip', text: 'backpressure ב-Streams: כש-Readable מהיר מ-Writable, נתונים נצברים בזיכרון. הפתרון: pipe() מנהל backpressure אוטומטית. בStream ידני: בדוק את הreturn value של write() — אם false, המתן לאירוע drain לפני כתיבה נוספת.' },
    ],
    questionBank: [
      {
        id: 'st-q1',
        text: 'מה היתרון העיקרי של Streams על קריאת קובץ שלם לזיכרון?',
        options: [
          'Streams תמיד מהירים יותר',
          'Streams מאפשרים עיבוד נתונים chunk-by-chunk — קובץ 10GB ניתן לעיבוד עם מינימום RAM',
          'Streams תומכים רק בקריאת טקסט',
          'אין הבדל מעשי לקבצים מתחת ל-1GB',
        ],
        correct: 1,
        explanation: 'fs.readFileSync על קובץ 10GB = 10GB RAM נדרש. fs.createReadStream = Buffer של 64KB בלבד בכל זמן נתון. Streams חיוניים לnetwork transfers, file processing, video streaming. pipeline() עדיף על pipe() כי מטפל ב-errors.',
      },
      {
        id: 'st-q2',
        text: 'מה ההבדל בין Duplex ל-Transform Stream?',
        options: [
          'הם זהים לחלוטין',
          'Duplex: read ו-write עצמאיים (TCP socket); Transform: שינוי data בזמן עיבוד (input → modified output)',
          'Transform מהיר יותר מDuplex',
          'Duplex תומך רק בטקסט, Transform בbinary',
        ],
        correct: 1,
        explanation: 'Duplex: שני channels עצמאיים (מה שנכתב ≠ מה שנקרא). דוגמה: TCP socket. Transform: pipeline שמשנה את הdata (input → transform → output). דוגמה: zlib.createGzip (compress), crypto.createCipher (encrypt).',
      },
      {
        id: 'st-q3',
        text: 'מה backpressure ב-Node.js Streams?',
        options: [
          'לחץ על השרת ממשתמשים רבים',
          'מצב שבו Readable מהיר מ-Writable — נתונים מצטברים; pipe() מנהל זאת אוטומטית',
          'שגיאה שמתרחשת כשStream נסגר',
          'Timeout שמתרחש בהעדר נתונים',
        ],
        correct: 1,
        explanation: 'Backpressure: כשmessage producer מהיר מconsumer. pipe() מנהל זאת: כשwritable.write() מחזיר false, readable.pause() נקרא. כש-drain נפלט, readable.resume(). בלי backpressure handling — RAM ייגמר.',
      },
      {
        id: 'st-q4',
        text: 'מה EventEmitter.once() שונה מ-on()?',
        options: [
          'once() יותר מהיר מon()',
          'once() מאזין לevent פעם אחת בלבד, ואז מסיר את עצמו אוטומטית',
          'once() תומך רק בevents מותאמים',
          'אין הבדל — הם שקולים',
        ],
        correct: 1,
        explanation: 'on(): מאזין לכל הפעמים שהevent נפלט. once(): מאזין פעם אחת ומסיר את עצמו אחרי הפעלה ראשונה. שימושי ל-"ready" events, חיבורים חד-פעמיים, initialization.',
      },
    ],
  },

  {
    id: 'nodejs-fs-env',
    title: 'File System, Environment ו-Process',
    summary: 'fs module, path, env variables ו-process management',
    emoji: '🗂️',
    content: [
      { type: 'heading', text: 'fs Module — ניהול קבצים' },
      {
        type: 'code',
        lang: 'javascript',
        caption: 'fs/promises — async API מודרני',
        code: `const { readFile, writeFile, mkdir, readdir, stat, unlink } = require('fs/promises');

// קריאה
const content = await readFile('config.json', 'utf8');
const parsed = JSON.parse(content);

// כתיבה
await writeFile('output.json', JSON.stringify(data, null, 2), 'utf8');

// append
await writeFile('log.txt', 'new line\n', { flag: 'a' });

// יצירת directory (recursive = לא נכשל אם קיים)
await mkdir('logs/2024', { recursive: true });

// קריאת directory
const files = await readdir('./src');

// מידע על קובץ
const info = await stat('file.txt');
console.log(info.size, info.isFile(), info.isDirectory(), info.mtime);

// מחיקה
await unlink('temp.txt');

// Copy
const { copyFile } = require('fs/promises');
await copyFile('source.txt', 'dest.txt');`,
      },
      { type: 'heading', text: 'path Module' },
      {
        type: 'code',
        lang: 'javascript',
        caption: 'path — ניהול נתיבים',
        code: `const path = require('path');

// חיבור נתיבים (עובד על כל OS)
const filePath = path.join(__dirname, 'data', 'users.json');
// Windows: C:\\project\\data\\users.json
// Linux:   /project/data/users.json

// resolve — absolute path
const abs = path.resolve('src', 'index.js'); // מ-cwd

// פרסור
const p = '/home/user/project/src/index.js';
path.dirname(p);   // '/home/user/project/src'
path.basename(p);  // 'index.js'
path.extname(p);   // '.js'
path.parse(p);     // { root, dir, base, ext, name }

// ESM equivalent (אין __dirname)
import { fileURLToPath } from 'url';
import { dirname } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);`,
      },
      { type: 'heading', text: 'Environment Variables ו-dotenv' },
      {
        type: 'code',
        lang: 'javascript',
        caption: '.env ו-process.env',
        code: `// .env (לא מ-commit לgit!)
DATABASE_URL=mongodb://localhost:27017/myapp
JWT_SECRET=super-secret-key-change-in-prod
PORT=3000
NODE_ENV=development

// .env.example (כן לcommit — תבנית ריקה)
DATABASE_URL=
JWT_SECRET=
PORT=

// index.js — טוען .env
require('dotenv').config(); // בcjs
// או: import 'dotenv/config'; בesm

const port = process.env.PORT || 3000;
const dbUrl = process.env.DATABASE_URL;

if (!dbUrl) throw new Error('DATABASE_URL is required');

// Node.js 20.6+ — built-in .env support
// node --env-file=.env server.js`,
      },
      { type: 'heading', text: 'process — ניהול התהליך' },
      {
        type: 'code',
        lang: 'javascript',
        caption: 'process object',
        code: `// args שורת הפקודה
// node app.js --port 3000 --env prod
const args = process.argv.slice(2); // ['--port', '3000']

// סביבה
process.env.NODE_ENV    // 'development'/'production'/'test'
process.cwd()           // Current Working Directory
process.pid             // Process ID
process.version         // Node.js version
process.platform        // 'linux'/'win32'/'darwin'

// exit
process.exit(0);  // success
process.exit(1);  // failure

// Signal handling
process.on('SIGTERM', async () => {
  console.log('Shutting down gracefully...');
  await server.close();
  await db.disconnect();
  process.exit(0);
});

process.on('SIGINT', () => process.emit('SIGTERM')); // Ctrl+C

// Uncaught errors
process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
  process.exit(1);
});`,
      },
      { type: 'tip', text: 'Graceful Shutdown חיוני ב-production: כשהשרת מקבל SIGTERM (ממ-K8s, PM2 restart), סגור בקשות קיימות בלי לקבל חדשות, סגור DB connections, ורק אז צא. בלי זה — בקשות באמצע עיבוד ינותקו בכח.' },
    ],
    questionBank: [
      {
        id: 'fe-q1',
        text: 'מדוע חשוב לא לcommit קובץ .env לgit?',
        options: [
          '.env לא תואם לgit syntax',
          '.env מכיל secrets (passwords, API keys, JWT secrets) — חשיפתם מסכנת את המערכת',
          '.env גדול מדי עבור git',
          'dotenv לא עובד עם git repositories',
        ],
        correct: 1,
        explanation: '.env מכיל credentials רגישים. commit שלו ל-public repo = חשיפת passwords, API keys, JWT secrets לכולם. תמיד הוסף .env ל-.gitignore. commit .env.example עם שדות ריקים כתבנית לסביבת פיתוח.',
      },
      {
        id: 'fe-q2',
        text: 'מה path.join() שונה מחיבור strings ידני?',
        options: [
          'אין הבדל — path.join(a, b) === a + "/" + b',
          'path.join() מטפל ב-path separators בצורה cross-platform (/ בLinux, \\ בWindows) ומנרמל ../ ו-//',
          'path.join() עובד רק עם absolute paths',
          'path.join() יכול לטפל רק ב-2 segments',
        ],
        correct: 1,
        explanation: 'path.join() נרמל separators לפי OS, מסיר // כפולים, מטפל ב-../. בלי זה: code שעובד בLinux נכשל בWindows. תמיד השתמש ב-path.join(__dirname, "data", "file.txt") ולא ב-__dirname + "/data/file.txt".',
      },
      {
        id: 'fe-q3',
        text: 'מה Graceful Shutdown ומדוע הוא חשוב?',
        options: [
          'כיבוי מהיר ע"י process.exit(0) מיד',
          'תהליך שמגיב לSIGTERM: מפסיק קבלת בקשות חדשות, מסיים בקשות קיימות, סוגר DB connections, ורק אז יוצא',
          'Restart אוטומטי של השרת בכל שעה',
          'גיבוי נתונים לפני כיבוי',
        ],
        correct: 1,
        explanation: 'Graceful Shutdown: K8s/PM2 שולחים SIGTERM לפני הרג התהליך. בלי handling: בקשות ב-flight נחתכות → 500 errors ללקוחות. עם handling: הפסק לקבל חדשות, המתן לסיום קיימות, סגור DB, צא. חיוני ל-zero-downtime deployments.',
      },
    ],
  },

  {
    id: 'nodejs-security',
    title: 'אבטחה ו-Performance',
    summary: 'CORS, Helmet, Rate Limiting, Clustering ו-PM2',
    emoji: '🔒',
    content: [
      { type: 'heading', text: 'אבטחת Express — Basics' },
      {
        type: 'code',
        lang: 'javascript',
        caption: 'Helmet, CORS, Rate Limiting',
        code: `const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const rateLimit = require('express-rate-limit');

const app = express();

// Helmet — HTTP security headers
app.use(helmet());
// מגדיר: X-Frame-Options, X-XSS-Protection,
//         Content-Security-Policy, X-Content-Type-Options...

// CORS — Cross-Origin Resource Sharing
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,            // cookies/auth headers
  optionsSuccessStatus: 200,
}));

// Rate Limiting — מניעת abuse
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 דקות
  max: 100,                   // 100 בקשות לwindow
  message: { error: 'Too many requests' },
  standardHeaders: true,
  legacyHeaders: false,
});

app.use('/api/', limiter);

// Auth rate limit מחמיר יותר
const authLimiter = rateLimit({ windowMs: 60000, max: 5 });
app.use('/api/auth/', authLimiter);`,
      },
      { type: 'heading', text: 'Input Validation ו-Sanitization' },
      {
        type: 'code',
        lang: 'javascript',
        caption: 'Joi Validation',
        code: `const Joi = require('joi');

const userSchema = Joi.object({
  name: Joi.string().min(2).max(50).required(),
  email: Joi.string().email().required(),
  age: Joi.number().integer().min(18).max(120),
  password: Joi.string().min(8).pattern(/^(?=.*[A-Z])(?=.*\d)/).required(),
});

// Validation Middleware
function validate(schema) {
  return (req, res, next) => {
    const { error, value } = schema.validate(req.body, { abortEarly: false });
    if (error) {
      return res.status(422).json({
        errors: error.details.map(d => ({ field: d.path[0], message: d.message }))
      });
    }
    req.body = value; // sanitized value
    next();
  };
}

app.post('/api/users', validate(userSchema), createUser);

// SQL Injection Prevention — תמיד parameterized queries!
// ❌ גרוע
db.query(\`SELECT * FROM users WHERE email = '\${email}'\`);
// ✅ טוב
db.query('SELECT * FROM users WHERE email = $1', [email]);`,
      },
      { type: 'heading', text: 'Performance — Clustering' },
      {
        type: 'code',
        lang: 'javascript',
        caption: 'Cluster Module',
        code: `const cluster = require('cluster');
const os = require('os');
const app = require('./app');

if (cluster.isPrimary) {
  const numCPUs = os.cpus().length; // מספר cores
  console.log(\`Primary \${process.pid}: forking \${numCPUs} workers\`);

  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code) => {
    console.log(\`Worker \${worker.pid} died. Restarting...\`);
    cluster.fork(); // restart אוטומטי
  });

} else {
  // כל worker מאזין לאותו port
  app.listen(3000, () => {
    console.log(\`Worker \${process.pid} started\`);
  });
}

// Node.js 22: --experimental-default-type
// PM2 עושה זאת אוטומטית: pm2 start app.js -i max`,
      },
      {
        type: 'table',
        caption: 'PM2 — פקודות חיוניות',
        headers: ['פקודה', 'מה עושה'],
        rows: [
          ['pm2 start app.js -i max', 'הפעל עם Cluster mode (כל CPUs)'],
          ['pm2 list', 'הצג כל processes'],
          ['pm2 logs', 'הצג logs בזמן אמת'],
          ['pm2 restart app', 'Restart ללא downtime'],
          ['pm2 stop app', 'עצור process'],
          ['pm2 monit', 'Dashboard ב-terminal'],
          ['pm2 save && pm2 startup', 'Auto-start בboot'],
        ],
      },
      { type: 'tip', text: 'אל תשמור secrets ב-code! השתמש ב-environment variables בלבד. ב-production: AWS Secrets Manager, HashiCorp Vault, או Kubernetes Secrets. JWT secrets חייבים להיות חזקים (256-bit random). תמיד hash passwords עם bcrypt (cost factor ≥ 12), לא MD5/SHA1.' },
    ],
    questionBank: [
      {
        id: 'sec-q1',
        text: 'מה Helmet עושה ב-Express?',
        options: [
          'מצפין את תוכן הבקשות',
          'מגדיר HTTP security headers כמו Content-Security-Policy, X-Frame-Options למניעת XSS, Clickjacking',
          'מאמת JWT tokens',
          'מגביל את מספר הבקשות לשרת',
        ],
        correct: 1,
        explanation: 'helmet() מגדיר 15+ HTTP headers אבטחתיים: Content-Security-Policy (מונע XSS injection), X-Frame-Options (מונע Clickjacking), X-Content-Type-Options (מונע MIME sniffing), ועוד. שורה אחת מחליפה configuration ידנית רב-שורתית.',
      },
      {
        id: 'sec-q2',
        text: 'מה CORS ומדוע הוא נדרש?',
        options: [
          'מנגנון הצפנה לHTTPS',
          'Same-Origin Policy של הדפדפן חוסמת cross-origin requests; CORS headers מאפשרים לשרת לאשר origins ספציפיים',
          'פרוטוקול לAuthentication',
          'כלי לcompression של תגובות',
        ],
        correct: 1,
        explanation: 'Browser Same-Origin Policy: JavaScript ב-frontend.com לא יכול לפנות ל-api.backend.com בלי אישור. CORS headers (Access-Control-Allow-Origin) מאפשרים לשרת לאשר origins ספציפיים. בלי CORS: browser חוסם את ה-response.',
      },
      {
        id: 'sec-q3',
        text: 'מדוע חשוב להשתמש ב-Parameterized Queries ב-Node.js?',
        options: [
          'הם מהירים יותר',
          'הם מונעים SQL Injection על ידי הפרדה בין קוד SQL לנתוני משתמש',
          'הם תומכים ביותר databases',
          'הם תואמים לכל גרסאות Node.js',
        ],
        correct: 1,
        explanation: 'SQL Injection: string concatenation מאפשר למשתמש להזריק SQL: email = "x\' OR 1=1--". Parameterized: db.query("SELECT WHERE email=$1", [email]) — הDB מטפל בנתונים כ-data בלבד, לא code. זה ה-OWASP #1 vulnerability.',
      },
      {
        id: 'sec-q4',
        text: 'מה Cluster mode ב-Node.js ומה יתרונו?',
        options: [
          'מאחסן נתונים ב-multiple databases',
          'מפעיל כמה instances של האפליקציה (אחד לכל CPU core) לניצול מלא של multi-core processors',
          'מחלק בקשות בין שרתים שונים',
          'מקביל פעולות I/O בלבד',
        ],
        correct: 1,
        explanation: 'Node.js Single-Threaded = משתמש רק ב-core אחד. Cluster fork worker לכל CPU core — שרת עם 8 cores = 8 workers = עד 8x throughput. כולם מאזינים לאותו port, OS מחלק load. PM2 -i max אוטומטי.',
      },
    ],
  },

  {
    id: 'nodejs-testing',
    title: 'Testing ו-Debugging ב-Node.js',
    summary: 'Unit tests עם Jest, Integration tests, Debugging ו-Logging',
    emoji: '🧪',
    content: [
      { type: 'heading', text: 'Jest ב-Node.js' },
      {
        type: 'code',
        lang: 'javascript',
        caption: 'Unit Testing עם Jest',
        code: `// math.js
function add(a, b) { return a + b; }
function divide(a, b) {
  if (b === 0) throw new Error('Division by zero');
  return a / b;
}
module.exports = { add, divide };

// math.test.js
const { add, divide } = require('./math');

describe('Math functions', () => {
  describe('add', () => {
    test('adds two positive numbers', () => {
      expect(add(2, 3)).toBe(5);
    });

    test('handles negative numbers', () => {
      expect(add(-1, 1)).toBe(0);
    });
  });

  describe('divide', () => {
    test('divides correctly', () => {
      expect(divide(10, 2)).toBe(5);
    });

    test('throws on division by zero', () => {
      expect(() => divide(5, 0)).toThrow('Division by zero');
    });
  });
});`,
      },
      { type: 'heading', text: 'Mocking ב-Jest' },
      {
        type: 'code',
        lang: 'javascript',
        caption: 'Mock functions ו-modules',
        code: `// userService.test.js
jest.mock('../db');
const db = require('../db');
const userService = require('../services/userService');

describe('UserService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('getUser returns user from db', async () => {
    const mockUser = { id: 1, name: 'Alice' };
    db.findById.mockResolvedValue(mockUser);

    const user = await userService.getUser(1);

    expect(db.findById).toHaveBeenCalledWith(1);
    expect(user).toEqual(mockUser);
  });

  test('getUser throws when not found', async () => {
    db.findById.mockResolvedValue(null);

    await expect(userService.getUser(999))
      .rejects.toThrow('User not found');
  });
});`,
      },
      { type: 'heading', text: 'Supertest — Integration Tests' },
      {
        type: 'code',
        lang: 'javascript',
        caption: 'API Testing עם Supertest',
        code: `const request = require('supertest');
const app = require('../app');
const db = require('../db');

describe('Users API', () => {
  beforeAll(async () => await db.connect());
  afterAll(async () => await db.disconnect());
  afterEach(async () => await db.clearCollections());

  describe('GET /api/users', () => {
    test('returns empty array when no users', async () => {
      const res = await request(app).get('/api/users');
      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual([]);
    });

    test('returns all users', async () => {
      await User.create({ name: 'Alice', email: 'a@test.com' });

      const res = await request(app).get('/api/users');
      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveLength(1);
      expect(res.body[0].name).toBe('Alice');
    });
  });

  describe('POST /api/users', () => {
    test('creates user with valid data', async () => {
      const res = await request(app)
        .post('/api/users')
        .send({ name: 'Bob', email: 'bob@test.com' });

      expect(res.statusCode).toBe(201);
      expect(res.body.name).toBe('Bob');
    });

    test('returns 422 with invalid email', async () => {
      const res = await request(app)
        .post('/api/users')
        .send({ name: 'Bob', email: 'not-an-email' });

      expect(res.statusCode).toBe(422);
    });
  });
});`,
      },
      { type: 'heading', text: 'Logging ו-Debugging' },
      {
        type: 'code',
        lang: 'javascript',
        caption: 'Winston Logger',
        code: `const winston = require('winston');

const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    process.env.NODE_ENV === 'production'
      ? winston.format.json()
      : winston.format.prettyPrint()
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
    new winston.transports.File({ filename: 'logs/combined.log' }),
  ],
});

// שימוש
logger.info('Server started', { port: 3000 });
logger.error('DB connection failed', { error: err.message, stack: err.stack });
logger.debug('Query executed', { sql, params, duration: '12ms' });

// Debugging: node --inspect app.js
// ואז: chrome://inspect`,
      },
      { type: 'tip', text: 'כלל ה-Testing Pyramid: הרבה unit tests (מהירים, זולים), פחות integration tests (בינוניים), ועוד פחות E2E tests (איטיים, יקרים). Coverage ≥ 80% — אבל coverage גבוה לא מבטיח איכות. בדוק behavior, לא implementation.' },
    ],
    questionBank: [
      {
        id: 'te-q1',
        text: 'מה ההבדל בין jest.mock() ל-jest.spyOn()?',
        options: [
          'הם זהים לחלוטין',
          'jest.mock() מחליף module שלם; jest.spyOn() עוקב ומאפשר לשנות method ספציפית תוך שמירת original implementation',
          'spyOn() עובד רק עם async functions',
          'mock() עובד רק עם external packages',
        ],
        correct: 1,
        explanation: 'jest.mock("./module") = module כולו הוחלף ב-auto-mock. jest.spyOn(obj, "method") = עוטף method קיימת, מאפשר לבדוק קריאות ולשנות behavior, תוך שמירת original code. mockRestore() מחזיר את המקורי.',
      },
      {
        id: 'te-q2',
        text: 'מה Supertest מאפשר לנו לבדוק?',
        options: [
          'בדיקות UI בלבד',
          'שליחת HTTP requests לאפליקציה Express בלי להפעיל שרת אמיתי — Integration tests מלאים ל-API',
          'בדיקות performance בלבד',
          'כיסוי code בלבד',
        ],
        correct: 1,
        explanation: 'Supertest מאפשר לבדוק HTTP endpoints: request(app).get("/users") שולח GET request ישירות לאפליקציה בלי port listening. ניתן לבדוק status codes, response body, headers. אידיאל לAPI integration tests.',
      },
      {
        id: 'te-q3',
        text: 'מה beforeEach/afterEach עושים ב-Jest?',
        options: [
          'רצים לפני/אחרי כל test suite',
          'רצים לפני/אחרי כל test בתוך ה-describe',
          'רצים פעם אחת בתחילת/סוף הfailure',
          'מגדירים את timeout של כל test',
        ],
        correct: 1,
        explanation: 'beforeEach: הגדרת מצב ראשוני לפני כל test (reset mocks, clear DB). afterEach: ניקוי אחרי כל test. beforeAll/afterAll: רצים פעם אחת לכל describe (DB connect/disconnect). חיוני לtest isolation.',
      },
    ],
  },

  {
    id: 'nodejs-interview',
    title: 'שאלות ראיון — Node.js',
    summary: 'שאלות ראיון נפוצות ב-Node.js עם תשובות מלאות',
    emoji: '🎯',
    content: [
      { type: 'heading', text: 'שאלות ראיון — רמה בינונית' },
      {
        type: 'table',
        caption: 'שאלות ותשובות — Event Loop & Async',
        headers: ['שאלה', 'תשובה קצרה'],
        rows: [
          ['מה Event Loop?', 'מנגנון שמנהל async operations ב-Single Thread — בודק callback queue ומעביר לCall Stack'],
          ['הבדל setTimeout(fn,0) vs setImmediate()?', 'setImmediate() רץ ב-check phase (אחרי I/O); setTimeout(fn,0) ב-timers phase — אחרי poll'],
          ['מה process.nextTick()?', 'רץ לפני כל I/O event ב-Event Loop — עדיפות גבוהה מPromises'],
          ['מה Promise.race()?', 'מחזיר תוצאה של הPromise הראשון שמסיים (resolved או rejected)'],
          ['מה Worker Threads?', 'מאפשר הרצת JavaScript ב-threads נפרדים לCPU-intensive tasks בלי לחסום Event Loop'],
        ],
      },
      {
        type: 'table',
        caption: 'שאלות ותשובות — ארכיטקטורה',
        headers: ['שאלה', 'תשובה קצרה'],
        rows: [
          ['מה Middleware ב-Express?', 'פונקציה (req, res, next) שמעבדת request לפני/אחרי handler'],
          ['הבדל CJS vs ESM?', 'CJS: require/module.exports, sync, Node.js-only. ESM: import/export, async, universal'],
          ['מה Stream vs Buffer?', 'Buffer: חתיכת data בזיכרון. Stream: זרם נתונים chunk-by-chunk לחיסכון בזיכרון'],
          ['איך מונעים SQL Injection?', 'Parameterized queries בלבד — לא string concatenation עם user input'],
          ['מה CORS?', 'HTTP headers שמאפשרים לשרת לאשר cross-origin requests מdomain ספציפי'],
        ],
      },
      { type: 'heading', text: 'שאלות System Design' },
      {
        type: 'code',
        lang: 'text',
        caption: 'שאלות ותשובות System Design',
        code: `Q: איך מסקלים Node.js application?
A: 1. Cluster (multi-core) — pm2 start -i max
   2. Horizontal scaling — כמה instances + Load Balancer
   3. Caching — Redis לנתונים חוזרים
   4. Database optimization — indexes, connection pooling
   5. Async everywhere — לא לחסום Event Loop

Q: איך מטפלים ב-shared state בין Workers ב-Cluster?
A: ● Workers לא חולקים זיכרון
   ● Redis — Session, Cache, Queue (Bull)
   ● Database — state ב-DB משותף
   ● IPC messages — inter-process communication

Q: איך Node.js מטפל ב-10,000 concurrent connections?
A: Event Loop + Non-blocking I/O: בקשה מגיעה → שולח I/O
   → callback queue → בינתיים טיפול ב-9,999 הנוספות.
   Thread Pool (libuv, 4 threads ב-default) לפעולות I/O כבדות.

Q: מה הרצת pm2 startup עושה?
A: מגדיר process manager להפעלה אוטומטית ב-OS boot.
   pm2 save שומר רשימת processes הנוכחיים לrestoration.

Q: מה ההבדל בין Monolith ל-Microservices ב-Node.js?
A: Monolith: קל לפיתוח, קשה לסקייל. Microservices:
   כל service נפרד (process/container), תקשורת ב-HTTP/gRPC/Queue.
   Node.js מצוין ל-API Gateway ו-lightweight microservices.`,
      },
      { type: 'heading', text: 'Coding Challenges — נפוצים בראיון' },
      {
        type: 'code',
        lang: 'javascript',
        caption: 'Implement rate limiter, debounce, retry',
        code: `// 1. Rate Limiter פשוט
function createRateLimiter(max, windowMs) {
  const requests = new Map(); // ip → [timestamps]

  return (ip) => {
    const now = Date.now();
    const userRequests = requests.get(ip) || [];
    const recent = userRequests.filter(t => now - t < windowMs);

    if (recent.length >= max) return false;
    requests.set(ip, [...recent, now]);
    return true;
  };
}

// 2. Retry עם exponential backoff
async function withRetry(fn, { retries = 3, delay = 1000 } = {}) {
  for (let i = 0; i <= retries; i++) {
    try {
      return await fn();
    } catch (err) {
      if (i === retries) throw err;
      await new Promise(r => setTimeout(r, delay * Math.pow(2, i)));
    }
  }
}

// 3. Promise Pool — limit concurrency
async function promisePool(tasks, limit) {
  const results = [];
  const executing = new Set();

  for (const task of tasks) {
    const promise = task().then(r => { results.push(r); executing.delete(promise); });
    executing.add(promise);
    if (executing.size >= limit) await Promise.race(executing);
  }

  await Promise.all(executing);
  return results;
}`,
      },
      { type: 'tip', text: 'טיפים לראיון Node.js: תמיד הסבר את Event Loop בעומק. הדגם שאתה מבין את ההבדל בין I/O-bound ל-CPU-bound. ציין שאתה מכיר את סכנות חסימת Event Loop. הראה ידע ב-async patterns, error handling וsecurity basics.' },
    ],
    questionBank: [
      {
        id: 'int-q1',
        text: 'בראיון: "הסבר כיצד Node.js מטפל ב-10,000 בקשות במקביל עם thread אחד"',
        options: [
          'Node.js משקר — הוא בעצם multi-threaded',
          'Event Loop מקבל בקשה, שולח I/O ל-libuv thread pool, ממשיך לבקשה הבאה; כשI/O גמר — callback מחכה בqueue',
          'Node.js מקבל רק 1000 בקשות ודוחה את השאר',
          'כל בקשה רצה בmicro-thread נפרד',
        ],
        correct: 1,
        explanation: 'Non-blocking I/O + Event Loop: בקשה נכנסת → Node.js מגיש ל-libuv (thread pool) לI/O → Event Loop חוזר לבקשה הבאה → כש-I/O נגמר, callback נכנס לqueue → Event Loop מעביר ל-Call Stack. עיקר הזמן הוא I/O, לא CPU, לכן thread אחד מספיק.',
      },
      {
        id: 'int-q2',
        text: 'בראיון: "כיצד תטפל ב-shared state בין Worker instances?"',
        options: [
          'global variables משותפות לכולם',
          'Redis לsession/cache/queues; Database ל-persistent state; Workers לא חולקים זיכרון',
          'Workers חולקים אוטומטית את ה-heap',
          'SharedArrayBuffer לכל הנתונים',
        ],
        correct: 1,
        explanation: 'Workers ב-Cluster לא חולקים זיכרון. פתרונות: Redis (session storage, caching, pub/sub, queues כמו Bull/BullMQ). Database משותף. Message passing ב-IPC. SharedArrayBuffer + Worker Threads — לdata עם concurrency גבוה. בחר Redis בד"כ.',
      },
      {
        id: 'int-q3',
        text: 'בראיון: "מה יקרה אם תריץ while(true) ב-Node.js?"',
        options: [
          'יפתח thread חדש ויסיים את הloop',
          'ה-Event Loop ייחסם לחלוטין — אף I/O callback לא יטופל, השרת יהפוך ל-"frozen"',
          'Node.js יזהה ויעצור את הloop אחרי שניה',
          'רק ה-worker הנוכחי ייחסם, שאר workers ימשיכו',
        ],
        correct: 1,
        explanation: 'while(true) = infinite synchronous code = Event Loop נחסם לנצח. אף callback לא יוכל לרוץ — setTimeout, I/O, כלום. השרת הופך ל-"dead" בלי crash. לכן CPU-intensive tasks חייבים ב-Worker Threads. זאת שאלת ראיון קלאסית לבחינת הבנת Event Loop.',
      },
      {
        id: 'int-q4',
        text: 'מה הבדל בין libuv Thread Pool ל-Event Loop Thread?',
        options: [
          'הם זהים — אותו thread',
          'Event Loop = single JS thread. libuv Thread Pool = 4 threads C/C++ לI/O כבד (disk, DNS, crypto). JS thread מקבל callback כשגמרו',
          'libuv מנהל את ה-JS execution; Event Loop מנהל I/O',
          'Thread Pool מריץ את ה-middlewares; Event Loop מנהל HTTP connections',
        ],
        correct: 1,
        explanation: 'Event Loop: thread אחד שמריץ JavaScript, מנהל timers, callbacks. libuv Thread Pool (ברירת מחדל: 4 threads): מריץ blocking operations ב-background — fs operations, DNS lookup, crypto, zlib. כשגמרו, callback נכנס ל-Event Loop queue. UV_THREADPOOL_SIZE לשינוי גודל.',
      },
      {
        id: 'int-q5',
        text: 'בראיון: "מה Memory Leak ב-Node.js וכיצד תזהה אותו?"',
        options: [
          'Memory Leak = Node.js קורס מיד עם שגיאה',
          'Memory שנאסף אך לא משוחרר — זיכרון גדל ללא גבול. זיהוי: --inspect + Chrome DevTools heap snapshots, או clinic.js',
          'Memory Leak מתרחש רק ב-Python, לא ב-Node.js',
          'Memory Leak = קובץ גדול מדי שנטען לזיכרון',
        ],
        correct: 1,
        explanation: 'Memory Leak: objects שנשמרים בזיכרון ב-reference אך לא נחוצים — Garbage Collector לא יכול לנקות. סיבות נפוצות: global variables, closures שמחזיקים references, event listeners שלא הוסרו. זיהוי: process.memoryUsage(), --inspect + Chrome DevTools, clinic.js, heapdump.',
      },
    ],
  },
]
