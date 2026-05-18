import type { Lesson } from '../../types'

export const reactLessons: Lesson[] = [
  {
    id: 'react-intro',
    title: 'מבוא ל-React',
    summary: 'מה זה React, קומפוננטות, JSX ולמה זה שינה את עולם הפרונטאנד',
    emoji: '⚛️',
    content: [
      { type: 'heading', text: 'מה זה React?' },
      { type: 'text', text: 'React היא ספריית JavaScript לבניית ממשקי משתמש. פותחה על ידי Meta (Facebook) ב-2013 ושינתה את הדרך שבה בונים אפליקציות ווב.' },
      { type: 'text', text: 'הרעיון המרכזי: מחלקים את ה-UI לקומפוננטות עצמאיות קטנות שכל אחת מנהלת את ה-state שלה.' },
      { type: 'heading', text: 'JSX — JavaScript + HTML' },
      { type: 'text', text: 'JSX מאפשר לכתוב HTML בתוך JavaScript. נראה מוזר בהתחלה, אבל מאוד נוח בפועל:' },
      { type: 'code', lang: 'jsx', caption: 'קומפוננטה ראשונה', code: `function Welcome() {
  const name = "דן";

  return (
    <div>
      <h1>שלום, {name}!</h1>
      <p>ברוך הבא ל-React</p>
    </div>
  );
}

// שימוש:
// <Welcome />` },
      { type: 'tip', text: 'JSX מתורגם ל-React.createElement() מאחורי הקלעים. הדפדפן לא מבין JSX — Vite/Babel מתרגמים אותו.' },
      { type: 'heading', text: 'כללי JSX חשובים' },
      { type: 'code', lang: 'jsx', caption: 'כללי JSX', code: `function MyComponent() {
  const isLoggedIn = true;
  const items = ["תפוח", "בננה", "ענב"];

  return (
    // חייב אלמנט שורשי אחד (או Fragment):
    <>
      {/* תגובות ב-JSX */}

      {/* ביטויים JS עם {}: */}
      <p>הסכום: {2 + 2}</p>

      {/* class הופך ל-className: */}
      <div className="container">

        {/* rendering מותנה: */}
        {isLoggedIn && <span>מחובר ✓</span>}

        {/* רשימה — חייב key: */}
        <ul>
          {items.map(item => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
    </>
  );
}` },
      { type: 'heading', text: 'Props — העברת נתונים' },
      { type: 'code', lang: 'jsx', caption: 'Props', code: `function Button({ text, color = "blue", onClick }) {
  return (
    <button
      style={{ backgroundColor: color }}
      onClick={onClick}
    >
      {text}
    </button>
  );
}

// שימוש:
<Button text="לחץ" color="green" onClick={() => alert("לחצת!")} />` },
    ],
    questionBank: [
      {
        id: 'react-intro-q1',
        text: 'מה זה JSX?',
        options: ['שפת תכנות חדשה', 'HTML בתוך JavaScript לתיאור UI', 'ספריית CSS', 'מסד נתונים של React'],
        correct: 1,
        explanation: 'JSX הוא syntax extension שמאפשר לכתוב תחביר דמוי-HTML בתוך JavaScript. מתורגם ל-React.createElement().',
      },
      {
        id: 'react-intro-q2',
        text: 'כיצד מוסיפים class לאלמנט ב-JSX?',
        options: ['class="name"', 'className="name"', 'cssClass="name"', 'style.class="name"'],
        correct: 1,
        explanation: 'ב-JSX class הוא מילה שמורה ב-JS, לכן משתמשים ב-className.',
      },
      {
        id: 'react-intro-q3',
        text: 'מה חובה להוסיף לכל אלמנט ברשימה שמרנדרים עם map?',
        options: ['id', 'key', 'index', 'ref'],
        correct: 1,
        explanation: 'key עוזר ל-React לזהות אלמנטים ולעדכן אותם ביעילות. חייב להיות ייחודי בין אחים.',
      },
      {
        id: 'react-intro-q4',
        text: 'מה זה Props?',
        options: ['State פנימי', 'נתונים שמועברים לקומפוננטה מהורה', 'אירועים של DOM', 'CSS ב-JS'],
        correct: 1,
        explanation: 'Props (properties) הם נתונים שקומפוננטת הורה מעבירה לילד. כמו פרמטרים של פונקציה.',
      },
      {
        id: 'react-intro-q5',
        text: 'איך מציגים ביטוי JavaScript בתוך JSX?',
        options: ['בין $ לבין $', 'בין { לבין }', 'בין [ לבין ]', 'בין <js> לבין </js>'],
        correct: 1,
        explanation: 'ב-JSX, כל ביטוי JavaScript חייב להיות בתוך {}. לדוגמה: {user.name} או {2+2}.',
      },
      {
        id: 'react-intro-q6',
        text: 'מה זה Fragment ב-React (<>...</>)?',
        options: ['תגית HTML מיוחדת', 'מכל שמאפשר החזרת כמה אלמנטים בלי תגית עוטפת', 'קומפוננטה מיוחדת', 'אירוע React'],
        correct: 1,
        explanation: 'Fragment (<> </>) מאפשר לקבץ אלמנטים בלי להוסיף div מיותר ל-DOM.',
      },
      {
        id: 'react-intro-q7',
        text: 'האם Props ניתנים לשינוי על ידי הקומפוננטה שמקבלת אותם?',
        options: ['כן, תמיד', 'לא, Props הם read-only', 'כן, עם setState', 'רק event handlers'],
        correct: 1,
        explanation: 'Props הם read-only. קומפוננטה לא צריכה לשנות את ה-props שלה — רק לקרוא ולהשתמש.',
      },
      {
        id: 'react-intro-q8',
        text: 'מה זה קומפוננטה ב-React?',
        options: ['קובץ CSS', 'פונקציה שמחזירה JSX', 'מסד נתונים', 'server-side script'],
        correct: 1,
        explanation: 'קומפוננטה היא פונקציה (או class) שמקבלת props ומחזירה JSX לתיאור מה להציג.',
      },
    ],
  },
  {
    id: 'react-state',
    title: 'useState — ניהול State',
    summary: 'איך קומפוננטות זוכרות מידע, מתי React מרנדרת מחדש ומה לא לעשות',
    emoji: '🔄',
    content: [
      { type: 'heading', text: 'מה זה State?' },
      { type: 'text', text: 'State הוא הזיכרון של קומפוננטה — מידע שיכול להשתנות לאורך זמן ושגורם ל-React לרנדר מחדש כשמשתנה.' },
      { type: 'code', lang: 'jsx', caption: 'useState — דוגמה בסיסית', code: `import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>ספירה: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        הגדל
      </button>
      <button onClick={() => setCount(0)}>
        אפס
      </button>
    </div>
  );
}` },
      { type: 'heading', text: 'useState עם אובייקטים' },
      { type: 'code', lang: 'jsx', caption: 'State מורכב', code: `function UserForm() {
  const [user, setUser] = useState({
    name: "",
    email: "",
  });

  function handleNameChange(e) {
    // חובה לשמור על שאר השדות:
    setUser({ ...user, name: e.target.value });
  }

  return (
    <form>
      <input
        value={user.name}
        onChange={handleNameChange}
        placeholder="שם"
      />
      <p>שם: {user.name}</p>
    </form>
  );
}` },
      { type: 'tip', text: 'לעולם אל תשנה state ישירות! state.count++ לא יגרום לרנדור. תמיד השתמש ב-setter: setCount(count + 1).' },
      { type: 'heading', text: 'Functional Updates' },
      { type: 'code', lang: 'jsx', caption: 'עדכון על בסיס הערך הקודם', code: `// כשה-update תלוי בערך הקודם — עדיף:
setCount(prev => prev + 1);

// זה בטוח יותר מ:
setCount(count + 1);
// (כשיש כמה updates מהירים זה אחר זה)` },
      { type: 'heading', text: 'דוגמה — Toggle' },
      { type: 'code', lang: 'jsx', caption: 'toggle state', code: `function DarkModeToggle() {
  const [isDark, setIsDark] = useState(false);

  return (
    <div style={{ background: isDark ? "#111" : "#fff" }}>
      <button onClick={() => setIsDark(prev => !prev)}>
        {isDark ? "☀️ מצב בהיר" : "🌙 מצב כהה"}
      </button>
    </div>
  );
}` },
    ],
    questionBank: [
      {
        id: 'react-state-q1',
        text: 'מה מחזיר useState(0)?',
        options: ['0', 'פונקציה', '[currentValue, setterFunction]', 'React component'],
        correct: 2,
        explanation: 'useState מחזיר array של שני אלמנטים: הערך הנוכחי ופונקציה לשינויו. לרוב מפרקים עם destructuring.',
      },
      {
        id: 'react-state-q2',
        text: 'מה קורה כש-setter של useState נקרא?',
        options: ['הדף מתרענן (F5)', 'הקומפוננטה מרנדרת מחדש עם הערך החדש', 'הקובץ נשמר', 'כלום'],
        correct: 1,
        explanation: 'כש-setter נקרא, React מתזמן רנדר מחדש של הקומפוננטה עם הערך החדש.',
      },
      {
        id: 'react-state-q3',
        text: 'למה אסור לשנות state ישירות (state.value++)?',
        options: ['מסיבות אבטחה', 'React לא יזהה שינוי ולא ירנדר מחדש', 'זה פחות מהיר', 'שגיאת TypeScript'],
        correct: 1,
        explanation: 'React מזהה שינוי state דרך ה-setter. שינוי ישיר לא מפעיל רנדר מחדש, ה-UI נשאר ישן.',
      },
      {
        id: 'react-state-q4',
        text: 'מה עושה setUser({ ...user, name: "חדש" })?',
        options: ['מוחק את כל user', 'עושה spread לכל השדות ומחליף רק name', 'יוצר user חדש עם name בלבד', 'שגיאה'],
        correct: 1,
        explanation: 'Spread operator מעתיק את כל שדות user הקיים ואז מחליף את name. שאר השדות נשמרים.',
      },
      {
        id: 'react-state-q5',
        text: 'מה ההבדל בין setCount(count+1) לבין setCount(prev => prev+1)?',
        options: ['אין הבדל', 'הצורה הפונקציונלית בטוחה יותר ב-updates מרובים', 'הצורה הישירה בטוחה יותר', 'שני הכתיבים שגויים'],
        correct: 1,
        explanation: 'setCount(prev => prev+1) תמיד עובד על הערך העדכני ביותר. שימושי כש-updates מרובים קורים ביחד.',
      },
      {
        id: 'react-state-q6',
        text: 'מה יקרה אם קוראים לאותו setter פעמיים בה-event handler?',
        options: ['שתי רנדורות', 'רנדור אחד עם הערך האחרון (batching)', 'שגיאה', 'הראשון ינצח'],
        correct: 1,
        explanation: 'React עושה batching — מאגד מספר updates ומרנדר פעם אחת. לכן functional update בטוח יותר.',
      },
      {
        id: 'react-state-q7',
        text: 'מה הערך ההתחלתי ב-useState([])?',
        options: ['null', 'undefined', 'מערך ריק', '0'],
        correct: 2,
        explanation: 'הארגומנט של useState הוא הערך ההתחלתי. useState([]) מאתחל עם מערך ריק.',
      },
      {
        id: 'react-state-q8',
        text: 'האם ניתן לקרוא לכמה useState בקומפוננטה אחת?',
        options: ['לא, רק אחד', 'כן, כמה שרוצים', 'מקסימום שלושה', 'רק עם useReducer'],
        correct: 1,
        explanation: 'ניתן להגדיר כמה hooks שרוצים. React עוקב אחרי הסדר שבו קראו להם.',
      },
    ],
  },
  {
    id: 'react-effects',
    title: 'useEffect — תופעות לוואי',
    summary: 'שליפת נתונים, subscriptions, timers ו-cleanup',
    emoji: '⚡',
    content: [
      { type: 'heading', text: 'מה זה useEffect?' },
      { type: 'text', text: 'useEffect מאפשר לבצע פעולות שאינן חלק מהרנדור: שליפת API, subscriptions, שינוי document.title, timers וכו\'.' },
      { type: 'code', lang: 'jsx', caption: 'useEffect בסיסי', code: `import { useState, useEffect } from 'react';

function UserProfile({ userId }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // רץ אחרי כל רנדור שבו userId השתנה
    async function fetchUser() {
      setLoading(true);
      const res = await fetch(\`/api/users/\${userId}\`);
      const data = await res.json();
      setUser(data);
      setLoading(false);
    }

    fetchUser();
  }, [userId]); // dependency array

  if (loading) return <p>טוען...</p>;
  return <h1>{user?.name}</h1>;
}` },
      { type: 'heading', text: 'Dependency Array' },
      { type: 'code', lang: 'jsx', caption: 'מתי useEffect רץ', code: `// רץ אחרי כל רנדור:
useEffect(() => { ... });

// רץ רק פעם אחת (mount):
useEffect(() => { ... }, []);

// רץ רק כש-count משתנה:
useEffect(() => { ... }, [count]);

// רץ כש-a או b משתנים:
useEffect(() => { ... }, [a, b]);` },
      { type: 'heading', text: 'Cleanup — ניקוי' },
      { type: 'code', lang: 'jsx', caption: 'return cleanup function', code: `useEffect(() => {
  const timer = setInterval(() => {
    setCount(c => c + 1);
  }, 1000);

  // cleanup — מנקה כשהקומפוננטה יוצאת מה-DOM
  // או לפני שה-effect רץ שוב:
  return () => clearInterval(timer);
}, []);` },
      { type: 'heading', text: 'document.title' },
      { type: 'code', lang: 'jsx', caption: 'עדכון כותרת הדף', code: `function App() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    document.title = \`ספרת \${count} פעמים\`;
  }, [count]);

  return (
    <button onClick={() => setCount(c => c + 1)}>
      לחץ ({count})
    </button>
  );
}` },
      { type: 'tip', text: 'הכלל הזהב: אל תשים כל דבר ב-useEffect. שינויי state בתגובה לאירועים שייכים ב-event handlers, לא ב-effect.' },
    ],
    questionBank: [
      {
        id: 'react-eff-q1',
        text: 'מה עושה ה-dependency array ב-useEffect?',
        options: ['מגדיר מה ה-effect מחזיר', 'קובע מתי ה-effect ירוץ — רק כשהערכים האלו משתנים', 'מגדיר את הפרמטרים', 'זה אופציונלי ולא משנה'],
        correct: 1,
        explanation: 'הmassive array קובע מתי ה-effect יופעל מחדש. ריק=[]: פעם אחת. [val]: בכל שינוי של val.',
      },
      {
        id: 'react-eff-q2',
        text: 'מה עושה הפונקציה שמוחזרת מתוך useEffect?',
        options: ['מגדירה את הפלט', 'cleanup — מנקה לפני רנדור הבא או יציאת קומפוננטה', 'הפעלת effect נוסף', 'return חובה תמיד'],
        correct: 1,
        explanation: 'ה-cleanup function רצה לפני שה-effect רץ שוב, ולפני שהקומפוננטה יוצאת. משמש לניקוי timers, subscriptions.',
      },
      {
        id: 'react-eff-q3',
        text: 'useEffect(() => {...}, []) — מתי ירוץ?',
        options: ['אחרי כל רנדור', 'רק פעם אחת בעת mount', 'אף פעם', 'כל שנייה'],
        correct: 1,
        explanation: 'Dependency array ריקה = ה-effect רץ רק פעם אחת אחרי הרנדור הראשון (mount).',
      },
      {
        id: 'react-eff-q4',
        text: 'מה זה "תופעת לוואי" (side effect)?',
        options: ['שגיאה בקוד', 'פעולה שמתרחשת מחוץ לחישוב ה-render: API call, timer, DOM', 'prop שהשתנה', 're-render'],
        correct: 1,
        explanation: 'Side effect הוא כל פעולה שמשפיעה על משהו מחוץ לרנדור: fetch, setTimeout, addEventListener.',
      },
      {
        id: 'react-eff-q5',
        text: 'מה יקרה אם שוכחים cleanup ל-setInterval?',
        options: ['כלום', 'ה-interval ימשיך לרוץ גם אחרי שהקומפוננטה הוסרת — memory leak', 'שגיאה', 'ה-interval יעצר אוטומטית'],
        correct: 1,
        explanation: 'בלי cleanup, ה-interval ממשיך לרוץ ועלול לגרום לבאגים ולזיכרון שלא משתחרר.',
      },
      {
        id: 'react-eff-q6',
        text: 'מה הסדר הנכון? רנדור → useEffect או useEffect → רנדור?',
        options: ['useEffect → רנדור', 'רנדור → useEffect', 'במקביל', 'תלוי ב-dependency array'],
        correct: 1,
        explanation: 'useEffect רץ תמיד אחרי שה-DOM עודכן ברנדור. זה מבטיח שה-DOM מוכן לפני הפעולה.',
      },
      {
        id: 'react-eff-q7',
        text: 'האם מותר לשים async function ישירות ב-useEffect(() => async () => {})?',
        options: ['כן, עדיף כך', 'לא, useEffect לא מחזיר Promise — צריך פונקציה פנימית', 'כן אם יש await', 'רק עם Suspense'],
        correct: 1,
        explanation: 'useEffect מצפה לפונקציית cleanup או undefined. Promise שהוחזר יתעלם ממנו. צריך async function פנימי.',
      },
      {
        id: 'react-eff-q8',
        text: 'מה יקרה אם dependency array חסר ב-useEffect?',
        options: ['ה-effect לא ירוץ', 'ה-effect ירוץ אחרי כל רנדור', 'שגיאה', 'ה-effect ירוץ פעם אחת'],
        correct: 1,
        explanation: 'ללא dependency array, ה-effect רץ אחרי כל רנדור. לרוב זה לא מה שרוצים.',
      },
    ],
  },
  {
    id: 'react-forms',
    title: 'טפסים ואירועים',
    summary: 'Controlled components, onChange, onSubmit, ולוגיקת validation',
    emoji: '📝',
    content: [
      { type: 'heading', text: 'Controlled Components' },
      { type: 'text', text: 'ב-React, הגישה המועדפת היא Controlled Components — ה-state מנהל את ערך ה-input בכל עת.' },
      { type: 'code', lang: 'jsx', caption: 'Controlled input', code: `function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e) {
    e.preventDefault(); // מונע reload של הדף
    console.log("מתחבר:", email);
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        placeholder="אימייל"
      />
      <input
        type="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        placeholder="סיסמה"
      />
      <button type="submit">כניסה</button>
    </form>
  );
}` },
      { type: 'heading', text: 'Validation' },
      { type: 'code', lang: 'jsx', caption: 'ולידציה פשוטה', code: `function SignupForm() {
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  function validate() {
    if (name.trim().length < 2) {
      setError("שם חייב להיות לפחות 2 תווים");
      return false;
    }
    setError("");
    return true;
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (validate()) {
      console.log("שולח:", name);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={name}
        onChange={e => setName(e.target.value)}
        placeholder="שם מלא"
      />
      {error && <p style={{ color: "red" }}>{error}</p>}
      <button type="submit">הרשמה</button>
    </form>
  );
}` },
      { type: 'heading', text: 'Select ו-Checkbox' },
      { type: 'code', lang: 'jsx', caption: 'סוגי inputs', code: `function Preferences() {
  const [lang, setLang] = useState("he");
  const [agree, setAgree] = useState(false);

  return (
    <div>
      <select value={lang} onChange={e => setLang(e.target.value)}>
        <option value="he">עברית</option>
        <option value="en">English</option>
      </select>

      <label>
        <input
          type="checkbox"
          checked={agree}
          onChange={e => setAgree(e.target.checked)}
        />
        מסכים לתנאים
      </label>
    </div>
  );
}` },
      { type: 'tip', text: 'e.preventDefault() חיוני ב-onSubmit — בלעדיו הדף יתרענן ותאבד את ה-state.' },
    ],
    questionBank: [
      {
        id: 'react-form-q1',
        text: 'מה זה Controlled Component?',
        options: ['קומפוננטה שמייצאת נתונים', 'input שערכו מנוהל ע"י React state', 'קומפוננטה עם ref', 'form ללא submit'],
        correct: 1,
        explanation: 'Controlled Component: הערך ב-input תמיד משקף את ה-state ועודכן דרך onChange.',
      },
      {
        id: 'react-form-q2',
        text: 'למה קוראים ל-e.preventDefault() ב-onSubmit?',
        options: ['לניקוי הטופס', 'למניעת reload הדף שב-HTML ברירת המחדל', 'לאיפוס state', 'לבדיקת ולידציה'],
        correct: 1,
        explanation: 'submit של form ב-HTML גורם ל-page reload. e.preventDefault() מונע זאת כדי שנוכל לטפל בבקשה ב-JS.',
      },
      {
        id: 'react-form-q3',
        text: 'מאיפה שולפים את ערך ה-input ב-onChange?',
        options: ['e.value', 'e.target.value', 'event.input', 'this.value'],
        correct: 1,
        explanation: 'ב-event handler, e.target הוא אלמנט ה-DOM. e.target.value הוא הטקסט הנוכחי.',
      },
      {
        id: 'react-form-q4',
        text: 'מה צריך לקשר ל-checkbox בניגוד ל-text input?',
        options: ['value + onChange', 'checked + onChange עם e.target.checked', 'defaultValue', 'checked + onToggle'],
        correct: 1,
        explanation: 'לchecbox: checked={booleanState} ו-onChange שמשתמש ב-e.target.checked (boolean).',
      },
      {
        id: 'react-form-q5',
        text: 'מה ההבדל בין value לבין defaultValue ב-input?',
        options: ['אין הבדל', 'value = controlled (React שולט), defaultValue = uncontrolled (HTML שולט)', 'defaultValue עדיף', 'value רק לסיסמאות'],
        correct: 1,
        explanation: 'value יוצר controlled input שReact שולט בו. defaultValue הוא ערך התחלתי בלבד (HTML handles).',
      },
      {
        id: 'react-form-q6',
        text: 'מה יקרה אם input יש לו value ללא onChange?',
        options: ['עובד רגיל', 'ה-input יהיה read-only ו-React יאזהיר', 'שגיאה', 'הערך ישתנה אבל state לא'],
        correct: 1,
        explanation: 'Input עם value בלי onChange = controlled read-only. React יאזהיר כי הערך לא יכול להשתנות.',
      },
      {
        id: 'react-form-q7',
        text: 'מה עושה e.target ב-event handler?',
        options: ['הפונקציה שרצה', 'האלמנט ה-DOM שהפיק את האירוע', 'ה-component', 'state הנוכחי'],
        correct: 1,
        explanation: 'e.target הוא אלמנט ה-DOM שגרם לאירוע — ה-input שהוקלד בו, הכפתור שנלחץ וכו\'.',
      },
      {
        id: 'react-form-q8',
        text: 'מה הייתה ה-best practice לניהול כמה שדות בטופס?',
        options: ['useState אחד לכל הטופס', 'useState נפרד לכל שדה, או אובייקט אחד עם spread', 'ב-URL params', 'localStorage בלבד'],
        correct: 1,
        explanation: 'שתי גישות: useState נפרד לכל שדה (פשוט), או useState אחד עם אובייקט ועדכון עם spread (מרוכז).',
      },
    ],
  },
  {
    id: 'react-hooks',
    title: 'Hooks מתקדמים',
    summary: 'useRef, useCallback, useMemo ו-custom hooks לשימוש חוזר',
    emoji: '🪝',
    content: [
      { type: 'heading', text: 'useRef — גישה ל-DOM וערכים עקשניים' },
      { type: 'code', lang: 'jsx', caption: 'useRef', code: `import { useRef, useEffect } from 'react';

function AutoFocusInput() {
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus(); // גישה ישירה ל-DOM
  }, []);

  return <input ref={inputRef} placeholder="אני מקבל focus" />;
}

// useRef לשמירת ערך בין רנדורים (לא גורם לרנדור):
function Timer() {
  const [count, setCount] = useState(0);
  const timerRef = useRef(null);

  function start() {
    timerRef.current = setInterval(() => {
      setCount(c => c + 1);
    }, 1000);
  }

  function stop() {
    clearInterval(timerRef.current);
  }

  return (
    <div>
      <p>{count}</p>
      <button onClick={start}>התחל</button>
      <button onClick={stop}>עצור</button>
    </div>
  );
}` },
      { type: 'heading', text: 'Custom Hooks — שימוש חוזר בלוגיקה' },
      { type: 'code', lang: 'jsx', caption: 'custom hook', code: `// Hook מותאם לשליפת נתונים:
function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(url)
      .then(r => r.json())
      .then(setData)
      .catch(setError)
      .finally(() => setLoading(false));
  }, [url]);

  return { data, loading, error };
}

// שימוש:
function Users() {
  const { data, loading, error } = useFetch("/api/users");

  if (loading) return <p>טוען...</p>;
  if (error) return <p>שגיאה!</p>;
  return <ul>{data.map(u => <li key={u.id}>{u.name}</li>)}</ul>;
}` },
      { type: 'heading', text: 'useMemo ו-useCallback' },
      { type: 'code', lang: 'jsx', caption: 'אופטימיזציה', code: `// useMemo — מחשב ערך רק כשהתלויות משתנות:
const expensiveResult = useMemo(() => {
  return items.filter(i => i.active).length;
}, [items]);

// useCallback — שומר על reference של פונקציה:
const handleClick = useCallback(() => {
  doSomething(id);
}, [id]);` },
      { type: 'tip', text: 'Custom hooks חייבים להתחיל עם "use". זה מאפשר ל-React לזהות שהם hooks ולהחיל את החוקים.' },
    ],
    questionBank: [
      {
        id: 'react-hooks-q1',
        text: 'מה עושה useRef?',
        options: ['יוצר state חדש', 'מחזיק reference לאלמנט DOM או ערך שנשמר בין רנדורים', 'מגדיר context', 'מאזין לאירועים'],
        correct: 1,
        explanation: 'useRef מחזיר object עם .current. משמש לגישה ל-DOM ולשמירת ערכים שלא גורמים לרנדור.',
      },
      {
        id: 'react-hooks-q2',
        text: 'מה ההבדל בין useRef לבין useState?',
        options: ['אין הבדל', 'שינוי ref לא גורם לרנדור, שינוי state כן', 'ref לפונקציות, state למספרים', 'useState יותר מהיר'],
        correct: 1,
        explanation: 'שינוי .current ב-ref שקט — לא מפעיל רנדור. שינוי state מפעיל רנדור. כל אחד למטרה אחרת.',
      },
      {
        id: 'react-hooks-q3',
        text: 'מה זה Custom Hook?',
        options: ['hook מובנה ב-React', 'פונקציה שמשתמשת בhooks ואפשר לשתף בין קומפוננטות', 'HOC', 'Context Provider'],
        correct: 1,
        explanation: 'Custom hook היא פונקציה שמתחילה ב-use ומשתמשת ב-hooks הבנויים. מאפשרת שיתוף לוגיקה.',
      },
      {
        id: 'react-hooks-q4',
        text: 'מדוע custom hooks חייבים להתחיל ב-"use"?',
        options: ['קונבנציה בלבד', 'React/linter מזהים hooks על פי זה ומחילים את חוקי hooks', 'הכרחי לקומפילציה', 'מסיבות ביצועים'],
        correct: 1,
        explanation: 'הקידומת use מאפשרת ל-eslint-plugin-react-hooks ו-React עצמה לזהות ולאכוף את חוקי hooks.',
      },
      {
        id: 'react-hooks-q5',
        text: 'מה עושה useMemo?',
        options: ['שומר component ב-memory', 'מחשב ערך מחדש רק כשהתלויות משתנות', 'מבטל רנדורים מיותרים', 'שומר callbacks'],
        correct: 1,
        explanation: 'useMemo מעביר חישוב יקר ושומר את התוצאה. יחשב מחדש רק כשהערכים ב-dependency array ישתנו.',
      },
      {
        id: 'react-hooks-q6',
        text: 'מה עושה useCallback?',
        options: ['מפעיל callback אוטומטית', 'שומר reference קבוע לפונקציה — מונע יצירה מחדש בכל רנדור', 'מאזין לאירועים', 'יוצר custom event'],
        correct: 1,
        explanation: 'useCallback מחזיר את אותו reference של הפונקציה בין רנדורים (אלא אם תלויות משתנות). שימושי עם memo.',
      },
      {
        id: 'react-hooks-q7',
        text: 'מה מחזיר useFetch({ data, loading, error })?',
        options: ['Promise', 'Observable', 'אובייקט עם נתוני הבקשה ומצבה', 'מערך כמו useState'],
        correct: 2,
        explanation: 'Custom hooks יכולים להחזיר כל דבר — מקובל להחזיר אובייקט עם data, loading ו-error.',
      },
      {
        id: 'react-hooks-q8',
        text: 'מה הכלל הראשון של Hooks?',
        options: ['משתמשים רק ב-class components', 'קוראים להם רק ב-top level של קומפוננטה, לא בתנאים/לולאות', 'רק פונקציה async', 'קוראים להם רק ב-useEffect'],
        correct: 1,
        explanation: 'Rules of Hooks: קוראים להם רק ב-top level (לא בתנאים, לולאות, או פונקציות מקוננות).',
      },
    ],
  },
]
