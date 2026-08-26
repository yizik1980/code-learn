import type { Lesson } from '../../types'

export const testingLessons: Lesson[] = [
  {
    id: 'testing-intro',
    title: 'מבוא לבדיקות',
    summary: 'פירמידת הבדיקות, הבדל בין unit/integration/e2e, למה לבדוק ואיך לחשוב על coverage',
    emoji: '🧪',
    content: [
      { type: 'heading', text: 'למה לכתוב בדיקות?' },
      {
        type: 'text',
        text: 'בדיקות אוטומטיות מאפשרות לשנות קוד בביטחון — אתם יודעים מיד אם שברתם משהו. ללא בדיקות, כל refactor הוא הימור. עם בדיקות טובות אפשר לשפר ארכיטקטורה, לשדרג ספריות ולהוסיף features מבלי לפחד.',
      },
      {
        type: 'table',
        caption: 'פירמידת הבדיקות — 3 שכבות',
        headers: ['סוג', 'מה בודק', 'מהירות', 'כמות מומלצת'],
        rows: [
          ['Unit', 'פונקציה/מחלקה אחת באיזולציה', 'מילישניות', 'הרבה (70%)'],
          ['Integration', 'כמה רכיבים יחד — API, DB, שירותים', 'שניות', 'בינוני (20%)'],
          ['E2E', 'זרימה שלמה דרך ה-UI', 'דקות', 'מעט (10%)'],
        ],
      },
      { type: 'heading', text: 'Unit vs Integration vs E2E' },
      {
        type: 'text',
        text: 'הדוגמה מציגה את אותה פונקציית הנחה נבדקת בשלוש רמות שונות. Unit test בודק את הפונקציה לבד בלי DB. Integration test בודק את ה-API endpoint עם middleware ו-DB. E2E test בודק את כל הזרימה דרך הbrowser ומוודא שהמשתמש רואה את המחיר הנכון. שימו לב שכל רמה מוסיפה ביטחון אך גם עולה יותר בזמן ריצה.',
      },
      {
        type: 'code',
        lang: 'typescript',
        caption: 'דוגמה — אותה לוגיקה, 3 רמות בדיקה',
        code: `// הפונקציה שנבדוק
function calculateDiscount(price: number, userType: 'regular' | 'premium'): number {
  if (userType === 'premium') return price * 0.8
  return price
}

// ── Unit test ──────────────────────────────────────────────
// בודק את הפונקציה לבד, ללא DB או HTTP
test('premium user gets 20% discount', () => {
  expect(calculateDiscount(100, 'premium')).toBe(80)
})

// ── Integration test ───────────────────────────────────────
// בודק את ה-API endpoint כולל middleware ו-DB אמיתי (או in-memory)
test('POST /orders applies premium discount', async () => {
  const res = await request(app)
    .post('/orders')
    .send({ userId: 'premium-user-1', productId: 'p1', price: 100 })
  expect(res.body.total).toBe(80)
})

// ── E2E test ───────────────────────────────────────────────
// בודק את כל הזרימה דרך ה-browser
test('premium user sees discounted price at checkout', async () => {
  await page.goto('/products/p1')
  await page.click('button[data-testid="add-to-cart"]')
  await page.goto('/checkout')
  await expect(page.locator('[data-testid="total"]')).toHaveText('₪80')
})`,
      },
      { type: 'heading', text: 'Code Coverage — מה זה ומה לא' },
      {
        type: 'text',
        text: 'Coverage מודד איזה אחוז מהקוד רץ בזמן הבדיקות. 100% coverage לא מבטיח שהקוד נכון — רק שהוא רץ. עדיף 70% coverage עם בדיקות משמעותיות על 100% עם בדיקות שלא בודקות כלום.',
      },
      {
        type: 'tip',
        text: 'כלל אצבע: בדוק behavior, לא implementation. "משתמש premium מקבל הנחה" — לא "הפונקציה קוראת ל-multiply".',
      },
      {
        type: 'table',
        caption: 'כלי בדיקה נפוצים ב-2024',
        headers: ['כלי', 'שימוש', 'הערות'],
        rows: [
          ['Vitest', 'Unit + Integration ב-Vite/Node', 'מהיר, תואם ל-Jest API'],
          ['Jest', 'Unit + Integration — Node.js קלאסי', 'הנפוץ ביותר, אקוסיסטם עשיר'],
          ['React Testing Library', 'רכיבי React', 'מדמה שימוש אמיתי, לא internals'],
          ['Supertest', 'HTTP API בדיקות', 'מריץ Express ב-memory ללא port'],
          ['Playwright / Cypress', 'E2E בדיקות', 'browser אמיתי, screenshot על כשלון'],
          ['xUnit + WebApplicationFactory', '.NET Integration', 'בדיקות ASP.NET Core מלאות'],
        ],
      },
    ],
    questionBank: [
      {
        id: 'testing-intro-q1',
        text: 'מה ההבדל העיקרי בין Unit test ל-Integration test?',
        options: [
          'Unit test מהיר יותר רק כי הוא קצר יותר',
          'Unit test בודק רכיב אחד באיזולציה; Integration test בודק כמה רכיבים יחד',
          'Integration test רץ רק ב-production',
          'אין הבדל — שניהם בודקים אותו דבר',
        ],
        correct: 1,
        explanation: 'Unit test מבדיל את הרכיב (mock לכל dependency). Integration test מחבר כמה שכבות — למשל API + DB + middleware.',
      },
      {
        id: 'testing-intro-q2',
        text: 'לפי פירמידת הבדיקות, איזה סוג בדיקות צריך להיות הכי נפוץ?',
        options: ['E2E', 'Integration', 'Unit', 'Performance'],
        correct: 2,
        explanation: 'Unit tests — מהירות, זולות לתחזוקה ומספקות פידבק מיידי. הפירמידה: הרבה unit, בינוני integration, מעט E2E.',
      },
      {
        id: 'testing-intro-q3',
        text: 'מה הבעיה ב-100% code coverage כמטרה יחידה?',
        options: [
          'זה בלתי אפשרי',
          'זה גורם לבדיקות איטיות',
          'Coverage מודד שהקוד רץ, לא שהוא נכון — אפשר לקבל 100% עם בדיקות חסרות משמעות',
          'Jest לא תומך בזה',
        ],
        correct: 2,
        explanation: 'Coverage = כמה שורות קוד רצו. בדיקה שקוראת לפונקציה ולא בודקת את התוצאה תגדיל coverage אבל לא תמצא bugs.',
      },
      {
        id: 'testing-intro-q4',
        text: 'מה עדיף לבדוק בבדיקות?',
        options: [
          'Implementation (איך הפונקציה ממומשת פנימית)',
          'Behavior (מה הפונקציה עושה מנקודת המשתמש)',
          'מספר השורות בפונקציה',
          'שם המשתנים הפנימיים',
        ],
        correct: 1,
        explanation: 'Behavior testing עמידה לשינויים. אם תשנה implementation פנימי — הבדיקה עדיין תעבור. בדיקת implementation שבירה לכל refactor.',
      },
      {
        id: 'testing-intro-q5',
        text: 'מה Supertest עושה?',
        options: [
          'מריץ בדיקות E2E בדפדפן',
          'מריץ Express/HTTP server ב-memory ומאפשר בדיקות API ללא port אמיתי',
          'מייצר נתוני בדיקה (fixtures)',
          'כלי לבדיקות ביצועים',
        ],
        correct: 1,
        explanation: 'Supertest עוטף את ה-Express app ומאפשר לשלוח HTTP requests בבדיקות ללא הפעלת server אמיתי — מהיר וללא port conflicts.',
      },
    ],
  },

  {
    id: 'jest-vitest',
    title: 'Jest ו-Vitest',
    summary: 'כתיבת unit tests — describe, it, expect, matchers, async, hooks ו-test doubles',
    emoji: '⚡',
    content: [
      { type: 'heading', text: 'Vitest — התקנה וקונפיגורציה' },
      {
        type: 'text',
        text: 'Vitest הוא framework בדיקות מהיר שמשתלב ישירות עם Vite ומשתמש באותה קונפיגורציה. ההתקנה דורשת שני חבילות — vitest עצמו ו-coverage-v8 לדוחות כיסוי. שימו לב שמוסיפים שתי פקודות לpackage.json — אחת להרצה רגילה ואחת עם דוח coverage.',
      },
      {
        type: 'code',
        lang: 'bash',
        caption: 'הוספת Vitest לפרויקט Vite/Node',
        code: `npm install -D vitest @vitest/coverage-v8

# vite.config.ts — הוספת הגדרת test
# package.json:
# "test": "vitest",
# "test:coverage": "vitest --coverage"`,
      },
      {
        type: 'text',
        text: 'vite.config.ts עם הגדרות test קובע את סביבת הריצה ואת התנהגות הבדיקות. environment: "node" מתאים לבדיקות backend, ו-"jsdom" מדמה browser לבדיקות React. שימו לב להגדרת setupFiles — קובץ זה ירוץ לפני כל suite ומאפשר לאתחל matchers כמו jest-dom.',
      },
      {
        type: 'code',
        lang: 'typescript',
        caption: 'vite.config.ts — הגדרת test environment',
        code: `import { defineConfig } from 'vite'
import { defineConfig as defineTestConfig } from 'vitest/config'

export default defineConfig({
  test: {
    environment: 'node',      // או 'jsdom' לבדיקות React
    globals: true,            // describe/it/expect ללא import
    setupFiles: ['./src/test/setup.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html'],
      exclude: ['node_modules', 'src/test'],
    },
  },
})`,
      },
      { type: 'heading', text: 'מבנה בסיסי' },
      {
        type: 'text',
        text: 'describe מקבץ בדיקות קשורות יחד, ו-it (או test) מגדיר בדיקה בודדת עם שם תיאורי. beforeEach יוצר instance חדש של CartService לפני כל בדיקה כדי למנוע state משותף. שימו לב לבדיקת הזריקת exception — expect(() => fn()).toThrow() עוטף את הקריאה ב-lambda כדי לתפוס את ה-exception.',
      },
      {
        type: 'code',
        lang: 'typescript',
        caption: 'describe / it / expect — מבנה בדיקה',
        code: `import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { CartService } from './CartService'

describe('CartService', () => {
  let cart: CartService

  // רץ לפני כל בדיקה — מאפס state
  beforeEach(() => {
    cart = new CartService()
  })

  it('starts empty', () => {
    expect(cart.items).toHaveLength(0)
    expect(cart.total).toBe(0)
  })

  it('adds item and updates total', () => {
    cart.add({ id: '1', name: 'Book', price: 50, qty: 2 })
    expect(cart.items).toHaveLength(1)
    expect(cart.total).toBe(100)
  })

  it('removes item by id', () => {
    cart.add({ id: '1', name: 'Book', price: 50, qty: 1 })
    cart.remove('1')
    expect(cart.items).toHaveLength(0)
  })

  it('throws when quantity is zero', () => {
    expect(() => cart.add({ id: '1', name: 'Book', price: 50, qty: 0 }))
      .toThrow('Quantity must be positive')
  })
})`,
      },
      { type: 'heading', text: 'Matchers חשובים' },
      {
        type: 'text',
        text: 'Matchers הם הפעלות שבודקות ערכים בדרכים שונות — toBe לשוויון מדויק, toEqual לבדיקה עמוקה של אובייקטים, ו-toContain לבדיקת כלילה. ההבדל בין toBe ל-toEqual קריטי — toBe משתמש ב-=== ולכן ייכשל על שני אובייקטים זהים ב-reference שונה. שימו לב ל-not שמאפשר לשלול כל matcher.',
      },
      {
        type: 'code',
        lang: 'typescript',
        caption: 'expect() matchers — הנפוצים ביותר',
        code: `// ── ערכים ────────────────────────────────────────────────
expect(value).toBe(42)            // ===
expect(value).toEqual({ a: 1 })   // deep equality (אובייקטים)
expect(value).toBeNull()
expect(value).toBeUndefined()
expect(value).toBeTruthy()
expect(value).toBeFalsy()

// ── מספרים ────────────────────────────────────────────────
expect(3.14).toBeCloseTo(3.1, 1)  // floating point
expect(10).toBeGreaterThan(5)
expect(10).toBeLessThanOrEqual(10)

// ── מחרוזות ───────────────────────────────────────────────
expect('hello world').toContain('world')
expect('user@example.com').toMatch(/^\\w+@\\w+\\.\\w+$/)

// ── מערכים ────────────────────────────────────────────────
expect([1, 2, 3]).toHaveLength(3)
expect([1, 2, 3]).toContain(2)
expect([{ id: 1 }, { id: 2 }]).toEqual(expect.arrayContaining([{ id: 1 }]))

// ── שגיאות ────────────────────────────────────────────────
expect(() => risky()).toThrow()
expect(() => risky()).toThrow('specific message')
expect(() => risky()).toThrow(ValidationError)

// ── שלילה ────────────────────────────────────────────────
expect(value).not.toBeNull()`,
      },
      { type: 'heading', text: 'Async Testing' },
      {
        type: 'text',
        text: 'בדיקת קוד async מחייבת שימוש ב-async/await כדי שהבדיקה תחכה לתוצאה לפני שתבדוק אותה. rejects.toThrow() בודק שPromise נדחה עם שגיאה מסוימת. שימו לב שחייבים לשים await לפני expect(promise).rejects — בלי זה הבדיקה תסתיים לפני שה-promise נפתר ותעבור תמיד.',
      },
      {
        type: 'code',
        lang: 'typescript',
        caption: 'בדיקת קוד אסינכרוני — Promises ו-async/await',
        code: `import { describe, it, expect } from 'vitest'
import { fetchUser } from './api'

describe('fetchUser', () => {
  // ── async/await — הדרך המועדפת ────────────────────────
  it('returns user data', async () => {
    const user = await fetchUser('u1')
    expect(user.name).toBe('Alice')
  })

  // ── בדיקת rejection ───────────────────────────────────
  it('throws on invalid id', async () => {
    await expect(fetchUser('')).rejects.toThrow('Invalid user id')
  })

  // ── rejects עם error type ────────────────────────────
  it('throws NotFoundError for unknown user', async () => {
    await expect(fetchUser('unknown')).rejects.toBeInstanceOf(NotFoundError)
  })
})`,
      },
      {
        type: 'tip',
        text: 'תמיד await בדיקות async — בדיקה שלא מחכה ל-promise תעבור גם אם ה-assertion כשל. Vitest/Jest לא תמיד מזהירים על כך.',
      },
    ],
    questionBank: [
      {
        id: 'jest-vitest-q1',
        text: 'מה ההבדל בין toBe ל-toEqual?',
        options: [
          'אין הבדל — שניהם זהים',
          'toBe בודק === (reference); toEqual בודק deep equality (מתאים לאובייקטים)',
          'toEqual מהיר יותר',
          'toBe תומך רק במספרים',
        ],
        correct: 1,
        explanation: 'toBe({a:1}) ייכשל כי שני אובייקטים שונים ב-memory. toEqual({a:1}) יצליח כי הוא משווה את הערכים בעומק.',
      },
      {
        id: 'jest-vitest-q2',
        text: 'למה צריך beforeEach לאתחל את האובייקט הנבדק?',
        options: [
          'כדי לחסוך זיכרון',
          'כדי שכל בדיקה תתחיל עם state נקי ולא תושפע מבדיקות קודמות',
          'כי Jest דורש זאת',
          'כדי לשפר ביצועים',
        ],
        correct: 1,
        explanation: 'State שנשמר בין בדיקות גורם לתלויות בסדר הריצה — בדיקה שעובדת לבד נכשלת כשרצה אחרי בדיקה אחרת. beforeEach מבטיח isolation.',
      },
      {
        id: 'jest-vitest-q3',
        text: 'מה יקרה אם לא נשים await לפני expect(asyncFn()).rejects?',
        options: [
          'הבדיקה תכשל בודאות',
          'הבדיקה תעבור גם אם הפונקציה לא זרקה שגיאה',
          'הקוד לא יקמפל',
          'הבדיקה תרוץ פעמיים',
        ],
        correct: 1,
        explanation: 'ללא await, הבדיקה מסתיימת לפני שה-promise נפתר. Vitest/Jest יסמנו pass אוטומטי כי לא חיכו לתוצאה.',
      },
      {
        id: 'jest-vitest-q4',
        text: 'מה toBeCloseTo מיועד לבדוק?',
        options: [
          'מחרוזות שדומות אחת לשנייה',
          'מספרים שקרובים זה לזה בטולרנס מסוים — לטיפול בשגיאות floating point',
          'תאריכים קרובים',
          'אובייקטים עם מפתחות דומים',
        ],
        correct: 1,
        explanation: '0.1 + 0.2 = 0.30000000000000004 ב-JavaScript. expect(0.1 + 0.2).toBeCloseTo(0.3) יעבור כי הוא מאפשר טולרנס קטן.',
      },
      {
        id: 'jest-vitest-q5',
        text: 'מה globals: true עושה בהגדרת Vitest?',
        options: [
          'מגדיר משתנים גלובליים בקוד הייצור',
          'מאפשר להשתמש ב-describe/it/expect ללא import בכל קובץ בדיקה',
          'מפעיל בדיקות בכל הקבצים בו-זמנית',
          'מחלק את הבדיקות לפי קבצים',
        ],
        correct: 1,
        explanation: 'ברירת המחדל דורשת import מפורש. globals: true חוסך את ה-imports ומקרב ל-Jest API הקלאסי.',
      },
    ],
  },

  {
    id: 'testing-mocking',
    title: 'Mocking ו-Test Doubles',
    summary: 'vi.fn(), vi.spyOn(), mock modules, MSW לבדיקות HTTP — איך לבודד קוד מ-dependencies חיצוניות',
    emoji: '🎭',
    content: [
      { type: 'heading', text: 'מה זה Mock ולמה?' },
      {
        type: 'text',
        text: 'Mock הוא תחליף מלאכותי ל-dependency חיצוני. כשבודקים פונקציה שקוראת ל-DB, ל-API חיצוני, או שולחת email — לא רוצים שהבדיקה תשפיע על מערכות אמיתיות. Mock מאפשר לשלוט בתשובה ולאמת שהקריאה בוצעה.',
      },
      {
        type: 'table',
        caption: 'סוגי Test Doubles',
        headers: ['סוג', 'מה עושה', 'מתי להשתמש'],
        rows: [
          ['Stub', 'מחזיר ערך קבוע', 'כשצריך תוצאה מוגדרת מראש'],
          ['Mock', 'מתעד קריאות + מחזיר ערך', 'כשרוצים לאמת שפונקציה נקראה'],
          ['Spy', 'עוטף פונקציה אמיתית ומתעד', 'כשרוצים לעקוב ללא החלפה'],
          ['Fake', 'מימוש עבודה פשוט (in-memory DB)', 'כשה-stub מסובך מדי'],
        ],
      },
      { type: 'heading', text: 'vi.fn() — יצירת Mock Function' },
      {
        type: 'text',
        text: 'vi.fn() יוצר פונקציה מזויפת שניתן לשלוט בתשובה שלה ולאמת כיצד נקראה. הדוגמה מציגה OrderService שמקבל את charge ו-saveOrder כ-dependencies — כך ניתן לבדוק שה-service קורא לתשלום לפני שמירה, ושאם התשלום נכשל הוזמנה אינה נשמרת. שימו לב ל-expect.objectContaining שבודק רק חלק מהאובייקט.',
      },
      {
        type: 'code',
        lang: 'typescript',
        caption: 'vi.fn() — יצירה, שליטה ואימות',
        code: `import { vi, describe, it, expect, beforeEach } from 'vitest'
import { OrderService } from './OrderService'

describe('OrderService', () => {
  it('calls payment gateway and saves order', async () => {
    // יצירת mock function
    const mockCharge = vi.fn().mockResolvedValue({ transactionId: 'tx-123', success: true })
    const mockSaveOrder = vi.fn().mockResolvedValue({ id: 'order-1' })

    const service = new OrderService({
      charge: mockCharge,
      saveOrder: mockSaveOrder,
    })

    await service.createOrder({ userId: 'u1', amount: 200 })

    // אימות שהפונקציות נקראו
    expect(mockCharge).toHaveBeenCalledOnce()
    expect(mockCharge).toHaveBeenCalledWith({ userId: 'u1', amount: 200 })
    expect(mockSaveOrder).toHaveBeenCalledWith(
      expect.objectContaining({ transactionId: 'tx-123' })
    )
  })

  it('does not save order if payment fails', async () => {
    const mockCharge = vi.fn().mockRejectedValue(new Error('Card declined'))
    const mockSaveOrder = vi.fn()

    const service = new OrderService({ charge: mockCharge, saveOrder: mockSaveOrder })

    await expect(service.createOrder({ userId: 'u1', amount: 200 })).rejects.toThrow('Card declined')
    expect(mockSaveOrder).not.toHaveBeenCalled()  // חשוב — לא שומרים הזמנה כושלת
  })
})`,
      },
      { type: 'heading', text: 'vi.mock() — Mock Module שלם' },
      {
        type: 'text',
        text: 'vi.mock() מחליף module שלם בגרסה מזויפת לכל משך קובץ הבדיקה. חשוב להגדיר אותו לפני ה-imports שמשתמשים בו — Vitest מרים אותו לראש הקובץ אוטומטית. שימו לב לדפוס הנפוץ: UserService.register קורא ל-sendEmail, ואנחנו בודקים שנקרא עם הפרמטרים הנכונים ללא שליחת email אמיתי.',
      },
      {
        type: 'code',
        lang: 'typescript',
        caption: 'vi.mock() — החלפת ייבוא שלם',
        code: `import { vi, describe, it, expect } from 'vitest'

// מוק ה-module לפני ה-import שמשתמש בו
vi.mock('./emailService', () => ({
  sendEmail: vi.fn().mockResolvedValue({ messageId: 'msg-1' }),
}))

// ייבוא אחרי המוק — יקבל את הגרסה המזויפת
import { sendEmail } from './emailService'
import { UserService } from './UserService'

describe('UserService.register', () => {
  it('sends welcome email on registration', async () => {
    const service = new UserService()
    await service.register({ email: 'alice@test.com', name: 'Alice' })

    expect(sendEmail).toHaveBeenCalledWith({
      to: 'alice@test.com',
      subject: 'Welcome!',
      body: expect.stringContaining('Alice'),
    })
  })
})`,
      },
      { type: 'heading', text: 'vi.spyOn() — עקיבה ללא החלפה' },
      {
        type: 'text',
        text: 'vi.spyOn() עוטף מתודה קיימת ומתעד קריאות מבלי להחליף את המימוש כברירת מחדל. שימושי לאימות שלוגיקה כמו Logger.error נקראת בתנאים מסוימים. שימו לב ל-afterEach(() => vi.restoreAllMocks()) שחייב להופיע כדי שה-spy לא ישפיע על בדיקות אחרות — ללא restore, הspy יישאר פעיל.',
      },
      {
        type: 'code',
        lang: 'typescript',
        caption: 'spyOn — עוטף מתודה קיימת',
        code: `import { vi, describe, it, expect, afterEach } from 'vitest'
import { Logger } from './Logger'
import { processData } from './processData'

describe('processData', () => {
  afterEach(() => vi.restoreAllMocks())  // מחזיר את ה-originals

  it('logs when processing fails', async () => {
    const logSpy = vi.spyOn(Logger, 'error')
    const badData = null

    await processData(badData)

    expect(logSpy).toHaveBeenCalledWith(
      'processData failed',
      expect.any(Error)
    )
  })

  it('can override return value temporarily', () => {
    const dateSpy = vi.spyOn(Date, 'now').mockReturnValue(1700000000000)
    // עכשיו Date.now() = 1700000000000 רק בבדיקה זו
    expect(Date.now()).toBe(1700000000000)
  })
})`,
      },
      { type: 'heading', text: 'MSW — Mock Service Worker לבדיקות HTTP' },
      {
        type: 'text',
        text: 'MSW (Mock Service Worker) יורט HTTP requests ברמת הרשת ומחזיר תשובות מוגדרות — ללא שינוי בקוד הייצור. handlers מוגדרים בסגנון Express ומאפשרים לסמוך על userId שונים. שימו לב ל-server.use() בתוך בדיקה — מאפשר להוסיף override זמני רק לבדיקה ספציפית, ו-resetHandlers() בafterEach מנקה אותו.',
      },
      {
        type: 'code',
        lang: 'typescript',
        caption: 'MSW — יירוט HTTP requests בבדיקות',
        code: `import { setupServer } from 'msw/node'
import { http, HttpResponse } from 'msw'
import { describe, it, expect, beforeAll, afterAll, afterEach } from 'vitest'
import { getUser } from './userApi'

// הגדרת handlers — כמו Express routes אבל ל-mock
const server = setupServer(
  http.get('https://api.example.com/users/:id', ({ params }) => {
    if (params.id === '1') {
      return HttpResponse.json({ id: '1', name: 'Alice', role: 'admin' })
    }
    return HttpResponse.json({ error: 'Not found' }, { status: 404 })
  }),
)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())  // מנקה overrides ספציפיים לבדיקה
afterAll(() => server.close())

describe('getUser', () => {
  it('fetches user successfully', async () => {
    const user = await getUser('1')
    expect(user.name).toBe('Alice')
  })

  it('handles 404', async () => {
    await expect(getUser('999')).rejects.toThrow('Not found')
  })

  it('handles network error', async () => {
    // override רק לבדיקה זו
    server.use(http.get('*', () => HttpResponse.error()))
    await expect(getUser('1')).rejects.toThrow()
  })
})`,
      },
      {
        type: 'tip',
        text: 'MSW עובד גם ב-browser (בדיקות E2E) וגם ב-Node (unit/integration). אותם handlers — שני סביבות. עדיף על vi.mock() לבדיקות HTTP כי לא נוגע ב-implementation.',
      },
    ],
    questionBank: [
      {
        id: 'testing-mocking-q1',
        text: 'מה ההבדל בין vi.fn() ל-vi.spyOn()?',
        options: [
          'אין הבדל',
          'vi.fn() יוצר פונקציה חדשה לחלוטין; vi.spyOn() עוטף פונקציה קיימת ומתעד קריאות',
          'vi.spyOn() מהיר יותר',
          'vi.fn() עובד רק עם async',
        ],
        correct: 1,
        explanation: 'vi.fn() = חוט בובה חדש. vi.spyOn(obj, "method") = מצלמה על מתודה קיימת — ניתן לאחר מכן לשחזר את המקורי עם restoreAllMocks.',
      },
      {
        id: 'testing-mocking-q2',
        text: 'מה vi.mock() עושה?',
        options: [
          'יוצר בדיקה אוטומטית',
          'מחליף module ייבוא שלם בגרסה מזויפת לכל משך הבדיקות',
          'מדמה latency רשת',
          'רץ את הבדיקות במקביל',
        ],
        correct: 1,
        explanation: 'vi.mock("./module") מיירט את ה-import וממיר אותו לגרסה שאתם שולטים בה. כל קוד שיוביל מה-module הזה יקבל את ה-mock.',
      },
      {
        id: 'testing-mocking-q3',
        text: 'מה היתרון של MSW על vi.mock() לבדיקות HTTP?',
        options: [
          'MSW מהיר יותר',
          'MSW יירוט HTTP ברמת הרשת ולא ב-implementation — אותם handlers עובדים ב-browser וב-Node',
          'MSW תומך ב-GraphQL',
          'vi.mock לא יכול לבדוק HTTP',
        ],
        correct: 1,
        explanation: 'vi.mock עוטף את הפונקציה שקוראת ל-fetch. MSW יירוט את ה-fetch עצמו ברמת הרשת — יותר קרוב לדרך שהקוד עובד ב-production.',
      },
      {
        id: 'testing-mocking-q4',
        text: 'למה חשוב לקרוא vi.restoreAllMocks() או server.resetHandlers() אחרי כל בדיקה?',
        options: [
          'כדי לפנות זיכרון',
          'כדי שה-mocks מבדיקה אחת לא ישפיעו על בדיקות אחרות',
          'כדי לשפר מהירות',
          'כי Vitest דורש זאת בצורה מפורשת',
        ],
        correct: 1,
        explanation: 'Mock שנשאר פעיל בין בדיקות יכול לגרום לתוצאות שגויות. afterEach cleanup = isolation.',
      },
      {
        id: 'testing-mocking-q5',
        text: 'מה .mockResolvedValue() עושה?',
        options: [
          'גורם ל-mock לזרוק שגיאה',
          'גורם ל-mock function לחזור כ-Promise שנפתר לערך הנתון',
          'שומר את ערך ה-mock לשימוש חוזר',
          'מגדיר mock לפונקציה סינכרונית',
        ],
        correct: 1,
        explanation: '.mockResolvedValue(x) = vi.fn().mockImplementation(() => Promise.resolve(x)). שורטקאט לאסינכרוני.',
      },
    ],
  },

  {
    id: 'react-testing',
    title: 'React Testing Library',
    summary: 'בדיקות קומפוננטות React — render, screen, userEvent, waitFor, וגישת "test like a user"',
    emoji: '⚛️',
    content: [
      { type: 'heading', text: 'עקרון RTL — בדוק כמו משתמש' },
      {
        type: 'text',
        text: 'React Testing Library (RTL) בנויה על עיקרון אחד: "The more your tests resemble the way your software is used, the more confidence they can give you." — בדוק מה המשתמש רואה ועושה, לא את ה-state הפנימי של הקומפוננטה.',
      },
      {
        type: 'text',
        text: 'React Testing Library דורשת שלוש חבילות — הספרייה עצמה, user-event לסימולציית אינטראקציות, ו-jest-dom לmatchers כמו toBeInTheDocument. עם Vitest צריך גם jsdom שמספק סביבת browser מדומה. שימו לב שsetup.ts מייבא את jest-dom פעם אחת ומגדיר את הmatchers לכל הבדיקות.',
      },
      {
        type: 'code',
        lang: 'bash',
        caption: 'התקנה',
        code: `npm install -D @testing-library/react @testing-library/user-event @testing-library/jest-dom
# עם Vitest:
npm install -D vitest jsdom`,
      },
      {
        type: 'text',
        text: 'קובץ setup.ts מייבא את jest-dom שמוסיף matchers ייעודיים לבדיקות DOM. matchers כמו toBeInTheDocument, toBeDisabled ו-toHaveTextContent קריאים יותר מאשר לבדוק את ה-DOM ישירות. שימו לב שמספיק שורה אחת בקובץ הzה — כל ה-matchers מיובאים אוטומטית.',
      },
      {
        type: 'code',
        lang: 'typescript',
        caption: 'src/test/setup.ts — הגדרת environment',
        code: `import '@testing-library/jest-dom'  // matchers כמו toBeInTheDocument, toBeDisabled`,
      },
      { type: 'heading', text: 'בדיקה ראשונה — render ו-screen' },
      {
        type: 'text',
        text: 'render() מרנדר קומפוננטה לDOM מדומה, ו-screen מספק גישה לאלמנטים שנוצרו. getByRole הוא ה-query המומלץ כי הוא בודק accessibility — כפתור שנמצא getByRole("button") חייב לקבל role נגיש. שימו לב שבדיקת src של תמונה משתמשת ב-getByRole("img") ולא getByTagName — זה הדרך הנכונה.',
      },
      {
        type: 'code',
        lang: 'tsx',
        caption: 'בדיקת קומפוננטה פשוטה',
        code: `import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { GreetingCard } from './GreetingCard'

describe('GreetingCard', () => {
  it('displays user name', () => {
    render(<GreetingCard name="Alice" />)

    // screen.getBy* — זורק אם לא נמצא
    expect(screen.getByText('שלום, Alice!')).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /ברוך הבא/i })).toBeInTheDocument()
  })

  it('shows avatar with alt text', () => {
    render(<GreetingCard name="Alice" avatarUrl="/alice.jpg" />)
    const img = screen.getByRole('img', { name: 'תמונת פרופיל של Alice' })
    expect(img).toHaveAttribute('src', '/alice.jpg')
  })
})`,
      },
      { type: 'heading', text: 'Queries — מציאת אלמנטים' },
      {
        type: 'table',
        caption: 'screen queries — סדר עדיפויות',
        headers: ['Query', 'מוצא לפי', 'מתי להשתמש'],
        rows: [
          ['getByRole', 'role (button, heading, textbox...)', 'ראשון — נגישות ומשתמש'],
          ['getByLabelText', 'label של input', 'fields של form'],
          ['getByPlaceholderText', 'placeholder', 'כשאין label'],
          ['getByText', 'תוכן טקסט', 'כפתורים, כותרות, paragraphs'],
          ['getByTestId', 'data-testid', 'אחרון — כשאין אלטרנטיבה'],
          ['queryBy*', 'כמו getBy, מחזיר null', 'כשמצפים שהאלמנט לא קיים'],
          ['findBy*', 'async, ממתין לאלמנט', 'אחרי פעולה אסינכרונית'],
        ],
      },
      { type: 'heading', text: 'userEvent — אינטראקציה' },
      {
        type: 'text',
        text: 'userEvent מדמה אינטראקציות משתמש אמיתיות — לחיצה, הקלדה, focus — ברצף הנכון של events. user.type() מדמה הקלדה תו-תו, ו-user.click() שולח את כל ה-events שdrowser שולח בלחיצה אמיתית. שימו לב ל-userEvent.setup() שיוצר instance — זה הדרך המומלצת שמאפשרת עקביות בין events.',
      },
      {
        type: 'code',
        lang: 'tsx',
        caption: 'userEvent — סימולציית פעולות משתמש',
        code: `import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import { LoginForm } from './LoginForm'

describe('LoginForm', () => {
  it('calls onSubmit with credentials', async () => {
    const handleSubmit = vi.fn()
    const user = userEvent.setup()  // יצירת instance — יותר מדויק

    render(<LoginForm onSubmit={handleSubmit} />)

    await user.type(screen.getByLabelText('אימייל'), 'alice@test.com')
    await user.type(screen.getByLabelText('סיסמה'), 'password123')
    await user.click(screen.getByRole('button', { name: 'כניסה' }))

    expect(handleSubmit).toHaveBeenCalledWith({
      email: 'alice@test.com',
      password: 'password123',
    })
  })

  it('shows error for invalid email', async () => {
    const user = userEvent.setup()
    render(<LoginForm onSubmit={vi.fn()} />)

    await user.type(screen.getByLabelText('אימייל'), 'not-an-email')
    await user.click(screen.getByRole('button', { name: 'כניסה' }))

    expect(screen.getByRole('alert')).toHaveTextContent('אימייל לא תקין')
  })
})`,
      },
      { type: 'heading', text: 'Async — waitFor ו-findBy' },
      {
        type: 'text',
        text: 'קומפוננטה שטוענת נתונים מAPI משנה את ה-DOM אחרי שהbetch מסתיים — לא מיד. findByText ממתין עד שהאלמנט מופיע, ו-queryByText מחזיר null אם לא קיים. שימו לב לדפוס הנפוץ: בודקים שspinner מוצג בתחילה, ואחרי await findBy... בודקים שהנתונים הופיעו וה-spinner נעלם.',
      },
      {
        type: 'code',
        lang: 'tsx',
        caption: 'בדיקת קומפוננטה שטוענת נתונים מ-API',
        code: `import { render, screen, waitFor } from '@testing-library/react'
import { setupServer } from 'msw/node'
import { http, HttpResponse } from 'msw'
import { UserProfile } from './UserProfile'

const server = setupServer(
  http.get('/api/users/1', () =>
    HttpResponse.json({ id: '1', name: 'Alice', bio: 'מפתחת full-stack' })
  ),
)

beforeAll(() => server.listen())
afterAll(() => server.close())

it('shows loading then user data', async () => {
  render(<UserProfile userId="1" />)

  // בזמן הטעינה
  expect(screen.getByText('טוען...')).toBeInTheDocument()

  // findBy* = queryBy* + waitFor — ממתין עד שמופיע
  const name = await screen.findByText('Alice')
  expect(name).toBeInTheDocument()
  expect(screen.getByText('מפתחת full-stack')).toBeInTheDocument()
  expect(screen.queryByText('טוען...')).not.toBeInTheDocument()
})`,
      },
      {
        type: 'tip',
        text: 'הימנע מ-getByTestId — זה אומר שאין attribute נגיש שמתאר את האלמנט. הוסף role, aria-label, או label במקום.',
      },
    ],
    questionBank: [
      {
        id: 'react-testing-q1',
        text: 'מה ההבדל בין getByText ל-queryByText?',
        options: [
          'אין הבדל',
          'getByText זורק שגיאה אם לא נמצא; queryByText מחזיר null',
          'queryByText מחפש בכל ה-DOM',
          'getByText עובד רק עם כפתורים',
        ],
        correct: 1,
        explanation: 'getBy* — לאלמנטים שאמורים להיות. queryBy* — לאלמנטים שאולי לא קיימים (לבדיקת אי-קיום). findBy* — async.',
      },
      {
        id: 'react-testing-q2',
        text: 'איזה query מומלץ להשתמש בו ראשון לפי RTL?',
        options: ['getByTestId', 'getByClassName', 'getByRole', 'getByPlaceholderText'],
        correct: 2,
        explanation: 'getByRole מחקה איך screen readers מתפעלים — בודק נגישות ומשתמש בפועל. כשמשתמשים ב-getByRole הבדיקות מוודאות גם שהאפליקציה נגישה.',
      },
      {
        id: 'react-testing-q3',
        text: 'למה משתמשים ב-findBy* ולא ב-getBy* אחרי פעולה אסינכרונית?',
        options: [
          'findBy מהיר יותר',
          'findBy ממתין (עם timeout) עד שהאלמנט מופיע ב-DOM — מתאים לאחרי fetch/state update',
          'getBy לא עובד ב-async',
          'findBy עובד רק עם React Query',
        ],
        correct: 1,
        explanation: 'getBy* בודק ב-snapshot רגעי. אחרי שמשתמש לוחץ כפתור ומתחיל fetch — האלמנט עדיין לא קיים. findBy ממתין עד 1000ms כברירת מחדל.',
      },
      {
        id: 'react-testing-q4',
        text: 'מה userEvent.setup() משפר על fire ב-fireEvent?',
        options: [
          'userEvent.setup מהיר יותר',
          'userEvent מדמה אינטראקציה אמיתית (hover, focus, keyboard events בסדר נכון); fireEvent שולח event בודד',
          'fireEvent לא עובד עם React 18',
          'userEvent.setup תומך ב-TypeScript',
        ],
        correct: 1,
        explanation: 'לחיצת כפתור אמיתית = pointerover, pointerenter, mouseover, mousedown, mouseup, click. userEvent.click() מדמה את כל הרצף. fireEvent.click() שולח רק click.',
      },
      {
        id: 'react-testing-q5',
        text: 'מתי נשתמש ב-waitFor?',
        options: [
          'כשרוצים לעכב בדיקה',
          'כשצריך לחכות שassertion יתאמת — לאחר פעולה שגורמת לשינוי async ב-DOM',
          'כתחליף ל-async/await',
          'רק עם setTimeout',
        ],
        correct: 1,
        explanation: 'waitFor(() => expect(...)) ממתין בלולאה עד שה-assertion עובר. שימושי כשה-DOM משתנה אחרי state update שלא קשור ישירות לfetch.',
      },
    ],
  },

  {
    id: 'integration-api',
    title: 'Integration Tests — API ו-DB',
    summary: 'בדיקות API מלאות עם Supertest ו-in-memory DB, test fixtures, ו-teardown נכון',
    emoji: '🔗',
    content: [
      { type: 'heading', text: 'Supertest — בדיקות HTTP ללא server אמיתי' },
      {
        type: 'text',
        text: 'Supertest עוטף Express app ומאפשר לשלוח HTTP requests ישירות ללא port אמיתי. ההתקנה כוללת את הpackage עצמו ו-types לTypeScript. שימו לב שמדובר בחבילת devDependency בלבד — היא לא צריכה להיות בproduction.',
      },
      {
        type: 'code',
        lang: 'bash',
        caption: 'התקנה',
        code: `npm install -D supertest @types/supertest`,
      },
      {
        type: 'text',
        text: 'כדי ש-Supertest יוכל לעטוף את ה-app, חייבים להפריד בין יצירת האפליקציה להפעלתה. app.ts מגדיר את ה-routes ו-middleware ומייצא את ה-app, בעוד index.ts קורא ל-app.listen(). שימו לב לתגובה הכחולה בקוד — זה ההסבר למה לא קוראים listen כאן.',
      },
      {
        type: 'code',
        lang: 'typescript',
        caption: 'app.ts — Express app ללא app.listen()',
        code: `import express from 'express'
import { notesRouter } from './routes/notes'

export const app = express()
app.use(express.json())
app.use('/api/notes', notesRouter)

// ✓ לא קוראים ל-app.listen() כאן — Supertest מטפל בזה`,
      },
      {
        type: 'text',
        text: 'הדוגמה מציגה integration test מלא לAPI של הערות. beforeAll מריץ migrations, beforeEach מנקה נתוני המשתמש הספציפי, ו-afterAll סוגר את חיבור הDB. שימו לב לבדיקת "רק הערות של המשתמש המבוקש" — נתון second user מוכנס, ובודקים שהquery מחזיר רק הערה אחת של TEST_USER.',
      },
      {
        type: 'code',
        lang: 'typescript',
        caption: 'notes.integration.test.ts — בדיקת API מלאה',
        code: `import request from 'supertest'
import { describe, it, expect, beforeAll, afterAll, beforeEach } from 'vitest'
import { app } from '../app'
import { db } from '../db'

const TEST_USER = 'test-user-uuid-1234'

beforeAll(async () => {
  // יצירת טבלאות test (DB נפרד או in-memory)
  await db.migrate.latest()
})

beforeEach(async () => {
  // ניקוי נתונים לפני כל בדיקה
  await db('notes').where({ user_token: TEST_USER }).delete()
})

afterAll(async () => {
  await db.destroy()
})

describe('POST /api/notes', () => {
  it('creates a note and returns 201', async () => {
    const res = await request(app)
      .post('/api/notes')
      .send({
        userToken: TEST_USER,
        courseId: 'sql',
        lessonId: 'sql-join',
        content: 'JOIN מחבר טבלאות לפי תנאי',
      })

    expect(res.status).toBe(201)
    expect(res.body).toMatchObject({
      id: expect.any(Number),
      content: 'JOIN מחבר טבלאות לפי תנאי',
      courseId: 'sql',
    })
  })

  it('returns 400 for missing content', async () => {
    const res = await request(app)
      .post('/api/notes')
      .send({ userToken: TEST_USER, courseId: 'sql', lessonId: 'sql-join' })

    expect(res.status).toBe(400)
    expect(res.body.error).toContain('content')
  })

  it('returns 400 for content too long', async () => {
    const res = await request(app)
      .post('/api/notes')
      .send({
        userToken: TEST_USER,
        courseId: 'sql',
        lessonId: 'sql-join',
        content: 'a'.repeat(5001),
      })

    expect(res.status).toBe(400)
  })
})

describe('GET /api/notes', () => {
  it('returns only notes for the requesting user', async () => {
    // הכנת נתונים
    await db('notes').insert([
      { user_token: TEST_USER, course_id: 'sql', lesson_id: 'join', content: 'הערה שלי' },
      { user_token: 'other-user', course_id: 'sql', lesson_id: 'join', content: 'הערה של אחר' },
    ])

    const res = await request(app)
      .get('/api/notes')
      .query({ userToken: TEST_USER, courseId: 'sql', lessonId: 'join' })

    expect(res.status).toBe(200)
    expect(res.body).toHaveLength(1)
    expect(res.body[0].content).toBe('הערה שלי')
  })
})`,
      },
      { type: 'heading', text: 'In-Memory DB עם better-sqlite3' },
      {
        type: 'text',
        text: 'better-sqlite3 עם ":memory:" יוצר DB שחי בזיכרון בלבד ונמחק אוטומטית בסיום הבדיקה. אין צורך בהגדרת connection string חיצוני, ואין I/O לדיסק — מה שהופך בדיקות DB למהירות מאוד. שימו לב שניתן ליצור את הschema ישירות בקוד הבדיקה ולהזריק את ה-DB לapp דרך dependency injection.',
      },
      {
        type: 'code',
        lang: 'typescript',
        caption: 'in-memory SQLite לבדיקות — מהיר ועצמאי',
        code: `import Database from 'better-sqlite3'

// ':memory:' = DB שחי רק בזיכרון, נמחק בסיום הבדיקה
const testDb = new Database(':memory:')

testDb.exec(\`
  CREATE TABLE notes (
    id         INTEGER PRIMARY KEY AUTOINCREMENT,
    user_token TEXT NOT NULL,
    course_id  TEXT NOT NULL,
    lesson_id  TEXT NOT NULL,
    content    TEXT NOT NULL,
    created_at TEXT DEFAULT (datetime('now'))
  )
\`)

// inject ה-DB לתוך ה-app לבדיקות
// (dependency injection — אותו pattern כמו ב-production רק עם DB אחר)`,
      },
      { type: 'heading', text: 'Test Fixtures' },
      {
        type: 'text',
        text: 'Factory functions לבדיקות יוצרות אובייקטים עם ערכי ברירת מחדל הגיוניים ומאפשרות override רק לשדות הרלוונטיים לבדיקה. זה מונע קוד boilerplate חוזר ומקל על קריאת הבדיקה — ברור מיד מה מיוחד בבדיקה הנוכחית. שימו לב שה-overrides משתמש בspread operator שמאפשר לדרוס כל subset של שדות.',
      },
      {
        type: 'code',
        lang: 'typescript',
        caption: 'fixtures.ts — factory functions לנתוני בדיקה',
        code: `// factories — יוצרות אובייקטים עם ערכי ברירת מחדל הגיוניים
export const createNote = (overrides: Partial<Note> = {}): Note => ({
  id: Math.floor(Math.random() * 10000),
  userToken: 'test-user-1',
  courseId: 'sql',
  lessonId: 'sql-intro',
  content: 'הערת בדיקה',
  createdAt: new Date().toISOString(),
  ...overrides,
})

// שימוש בבדיקה
const note = createNote({ courseId: 'react', content: 'הערה על React' })
// → { id: 4521, userToken: 'test-user-1', courseId: 'react', lessonId: 'sql-intro', ... }`,
      },
      {
        type: 'tip',
        text: 'הפרד DB של בדיקות מ-DB של פיתוח — בעל .env.test עם DATABASE_URL אחר. אף פעם אל תריץ integration tests מול DB של production.',
      },
    ],
    questionBank: [
      {
        id: 'integration-api-q1',
        text: 'למה ב-app.ts לא קוראים ל-app.listen() אלא רק ב-index.ts?',
        options: [
          'כי listen לא עובד ב-TypeScript',
          'כדי ש-Supertest יוכל לייבא ולהריץ את ה-app ללא port אמיתי בבדיקות',
          'כי זה דורש יותר זיכרון',
          'כי Express לא תומך ב-listen ב-tests',
        ],
        correct: 1,
        explanation: 'Supertest עוטף את ה-app ויוצר HTTP server פנימי זמני. אם app.ts מפעיל listen — בדיקות יתחרו על port וייכשלו.',
      },
      {
        id: 'integration-api-q2',
        text: 'מה beforeEach שמנקה נתונים עושה לבדיקות?',
        options: [
          'מאיץ את הבדיקות',
          'מבטיח isolation — כל בדיקה מתחילה עם DB נקי ולא מושפעת מבדיקות קודמות',
          'מאפס את ה-server',
          'מוחק את כל ה-DB',
        ],
        correct: 1,
        explanation: 'ללא cleanup, נתונים מבדיקה A ישפיעו על בדיקה B. beforeEach מבטיח שכל בדיקה רצה בסביבה צפויה ועצמאית.',
      },
      {
        id: 'integration-api-q3',
        text: 'מה היתרון של in-memory SQLite לבדיקות?',
        options: [
          'תואם ב-100% ל-PostgreSQL',
          'מהיר מאוד (אין I/O לדיסק), לא דורש הגדרת DB חיצוני, נמחק אוטומטית בסיום',
          'תומך ב-full-text search',
          'עובד רק ב-Node 20',
        ],
        correct: 1,
        explanation: ':memory: DB חי בזיכרון — אין disk I/O, אין cleanup. אך שים לב: SQLite שונה מ-PostgreSQL בכמה SQL features — עדיף לבדוק גם על DB זהה ל-production.',
      },
      {
        id: 'integration-api-q4',
        text: 'מה factory function לנתוני בדיקה (fixtures) מספקת?',
        options: [
          'ביצועים טובים יותר',
          'ערכי ברירת מחדל הגיוניים עם אפשרות override — מונעת קוד boilerplate חוזר בבדיקות',
          'מנגנון migration אוטומטי',
          'אימות schema',
        ],
        correct: 1,
        explanation: 'במקום לכתוב אובייקט מלא בכל בדיקה — factory + overrides. createNote({ courseId: "react" }) = כל שאר השדות מקבלים ברירת מחדל הגיוניים.',
      },
      {
        id: 'integration-api-q5',
        text: 'מה request(app).send() ב-Supertest שולח?',
        options: [
          'WebSocket message',
          'HTTP request body בפורמט JSON לאפליקציה הנבדקת',
          'GraphQL query',
          'Server-Sent Event',
        ],
        correct: 1,
        explanation: 'request(app).post("/api/notes").send({...}) = HTTP POST עם JSON body. Supertest אוטומטית מגדיר Content-Type: application/json.',
      },
    ],
  },

  {
    id: 'dotnet-testing',
    title: 'Testing ב-.NET — xUnit ו-WebApplicationFactory',
    summary: 'Unit tests עם xUnit ו-NSubstitute, Integration tests עם WebApplicationFactory ו-EF Core in-memory',
    emoji: '🔷',
    content: [
      { type: 'heading', text: 'xUnit — Unit Tests ב-C#' },
      {
        type: 'text',
        text: 'xUnit הוא framework הבדיקות המומלץ ב-.NET מודרני. NSubstitute מספק mocking קל לקריאה, ו-FluentAssertions הופך assertions לקריאות יותר עם הודעות שגיאה מפורטות. שימו לב שהפקודה יוצרת פרויקט נפרד — מקובל ב-.NET שלכל פרויקט יש פרויקט בדיקות מקביל.',
      },
      {
        type: 'code',
        lang: 'bash',
        caption: 'יצירת פרויקט בדיקות',
        code: `dotnet new xunit -n MyApp.Tests
cd MyApp.Tests

# NSubstitute — מוק framework מומלץ ב-.NET
dotnet add package NSubstitute

# FluentAssertions — assertions קריאות יותר
dotnet add package FluentAssertions`,
      },
      {
        type: 'text',
        text: 'xUnit משתמש ב-[Fact] לבדיקה בודדת וב-[Theory] לבדיקה פרמטרית שרצה מספר פעמים עם ערכים שונים. Constructor של test class מחליף את beforeEach — xUnit יוצר instance חדש לפני כל [Fact]. שימו לב לדפוס Arrange-Act-Assert ולאמירה שבודקת exception — act.Should().Throw<ArgumentException>().',
      },
      {
        type: 'code',
        lang: 'csharp',
        caption: 'xUnit — מבנה בסיסי עם Fact ו-Theory',
        code: `using Xunit;
using FluentAssertions;

public class DiscountServiceTests
{
    private readonly DiscountService _sut;  // sut = System Under Test

    public DiscountServiceTests()
    {
        // Constructor = BeforeEach ב-xUnit (נקרא לפני כל [Fact])
        _sut = new DiscountService();
    }

    [Fact]
    public void PremiumUser_Gets20PercentDiscount()
    {
        // Arrange
        var user = new User { Type = UserType.Premium };

        // Act
        var discount = _sut.Calculate(user, originalPrice: 100m);

        // Assert — FluentAssertions
        discount.Should().Be(80m);
    }

    // Theory = Fact עם פרמטרים — מריץ כמה פעמים עם ערכים שונים
    [Theory]
    [InlineData(100, UserType.Regular, 100)]
    [InlineData(100, UserType.Premium, 80)]
    [InlineData(200, UserType.Premium, 160)]
    public void CalculatesCorrectDiscount(decimal price, UserType type, decimal expected)
    {
        var user = new User { Type = type };
        _sut.Calculate(user, price).Should().Be(expected);
    }

    [Fact]
    public void ThrowsArgumentException_WhenPriceIsNegative()
    {
        var user = new User { Type = UserType.Regular };

        Action act = () => _sut.Calculate(user, -1m);

        act.Should().Throw<ArgumentException>()
           .WithMessage("*price*");
    }
}`,
      },
      { type: 'heading', text: 'NSubstitute — Mocking ב-.NET' },
      {
        type: 'text',
        text: 'NSubstitute יוצר mock objects בתחביר קריא ונקי. Substitute.For<T>() מייצר מימוש מזויף של כל interface. הדוגמה מציגה OrderService שמקבל IPaymentGateway ו-IOrderRepository — ובודק שה-service מפעיל charge לפני save ולא שומר הזמנה שהתשלום שלה נכשל. שימו לב לשימוש ב-Arg.Is<T>() לבדיקה מדויקת של ארגומנט.',
      },
      {
        type: 'code',
        lang: 'csharp',
        caption: 'NSubstitute — mock dependencies',
        code: `using NSubstitute;
using Xunit;

public class OrderServiceTests
{
    private readonly IPaymentGateway _paymentGateway;
    private readonly IOrderRepository _orderRepo;
    private readonly OrderService _sut;

    public OrderServiceTests()
    {
        // יצירת substitutes (mocks)
        _paymentGateway = Substitute.For<IPaymentGateway>();
        _orderRepo = Substitute.For<IOrderRepository>();
        _sut = new OrderService(_paymentGateway, _orderRepo);
    }

    [Fact]
    public async Task CreateOrder_ChargesAndSaves()
    {
        // Arrange — הגדרת תשובות
        _paymentGateway.ChargeAsync(Arg.Any<decimal>())
            .Returns(new PaymentResult { TransactionId = "tx-1", Success = true });

        // Act
        await _sut.CreateOrderAsync(new OrderRequest { UserId = "u1", Amount = 200 });

        // Assert — אימות קריאות
        await _paymentGateway.Received(1).ChargeAsync(200m);
        await _orderRepo.Received(1).SaveAsync(
            Arg.Is<Order>(o => o.TransactionId == "tx-1")
        );
    }

    [Fact]
    public async Task CreateOrder_DoesNotSave_WhenPaymentFails()
    {
        _paymentGateway.ChargeAsync(Arg.Any<decimal>())
            .Returns(new PaymentResult { Success = false });

        await Assert.ThrowsAsync<PaymentFailedException>(
            () => _sut.CreateOrderAsync(new OrderRequest { Amount = 100 })
        );

        await _orderRepo.DidNotReceive().SaveAsync(Arg.Any<Order>());
    }
}`,
      },
      { type: 'heading', text: 'WebApplicationFactory — Integration Tests' },
      {
        type: 'text',
        text: 'WebApplicationFactory מריצה את כל ה-ASP.NET Core pipeline בזיכרון — middleware, routing, DI — ומחליפה את ה-DbContext ב-in-memory database. IClassFixture מבטיח שהfactory נוצרת פעם אחת לכל test class. שימו לב לשימוש ב-Guid.NewGuid() בשם ה-DB — מונע collision בין בדיקות שרצות במקביל.',
      },
      {
        type: 'code',
        lang: 'csharp',
        caption: 'Integration test — ASP.NET Core in-memory',
        code: `using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using System.Net.Http.Json;

// CustomWebApplicationFactory — מחליף ה-DB ל-in-memory
public class TestWebFactory : WebApplicationFactory<Program>
{
    protected override void ConfigureWebHost(IWebHostBuilder builder)
    {
        builder.ConfigureServices(services =>
        {
            // הסרת ה-DbContext האמיתי
            var dbDescriptor = services.Single(d => d.ServiceType == typeof(DbContextOptions<AppDbContext>));
            services.Remove(dbDescriptor);

            // הוספת in-memory DB
            services.AddDbContext<AppDbContext>(options =>
                options.UseInMemoryDatabase("TestDb_" + Guid.NewGuid()));
        });
    }
}

public class NotesApiTests : IClassFixture<TestWebFactory>
{
    private readonly HttpClient _client;

    public NotesApiTests(TestWebFactory factory)
    {
        _client = factory.CreateClient();
    }

    [Fact]
    public async Task PostNote_Returns201_WithValidData()
    {
        var note = new { UserToken = "user-1", CourseId = "sql", LessonId = "join", Content = "הערה" };

        var response = await _client.PostAsJsonAsync("/api/notes", note);

        response.StatusCode.Should().Be(HttpStatusCode.Created);
        var created = await response.Content.ReadFromJsonAsync<NoteDto>();
        created!.Content.Should().Be("הערה");
    }

    [Fact]
    public async Task PostNote_Returns400_WhenContentMissing()
    {
        var invalid = new { UserToken = "user-1", CourseId = "sql", LessonId = "join" };

        var response = await _client.PostAsJsonAsync("/api/notes", invalid);

        response.StatusCode.Should().Be(HttpStatusCode.BadRequest);
    }
}`,
      },
      {
        type: 'tip',
        text: 'IClassFixture<T> ב-xUnit = factory נוצרת פעם אחת לכל ה-test class. מהיר יותר מיצירת factory בכל בדיקה. השתמש ב-IAsyncLifetime לניקוי אסינכרוני.',
      },
      { type: 'heading', text: 'FluentAssertions — assertions קריאות' },
      {
        type: 'text',
        text: 'FluentAssertions מחליף את Assert הקלאסי בתחביר נקי שנקרא כמו משפט באנגלית. כשבדיקה נכשלת, הודעת השגיאה מפורטת יותר ומצביעה מדויק על מה השתבש. שימו לב לשרשרת — act.Should().Throw<ArgumentException>().WithMessage("*price*").And.ParamName — מאפשר לבדוק כמה תכונות של exception בביטוי אחד.',
      },
      {
        type: 'code',
        lang: 'csharp',
        caption: 'FluentAssertions לעומת Assert קלאסי',
        code: `// Assert קלאסי — פחות קריא
Assert.Equal(80m, discount);
Assert.True(user.IsActive);
Assert.Contains("error", message);

// FluentAssertions — קריא ועם הודעות שגיאה טובות יותר
discount.Should().Be(80m);
user.IsActive.Should().BeTrue();
message.Should().Contain("error");

// Collections
users.Should().HaveCount(3);
users.Should().ContainSingle(u => u.Role == "admin");
users.Should().AllSatisfy(u => u.IsActive.Should().BeTrue());

// Exceptions
act.Should().Throw<ArgumentException>()
   .WithMessage("*price*")
   .And.ParamName.Should().Be("price");

// Async
await act.Should().ThrowAsync<NotFoundException>();`,
      },
    ],
    questionBank: [
      {
        id: 'dotnet-testing-q1',
        text: 'מה ההבדל בין [Fact] ל-[Theory] ב-xUnit?',
        options: [
          'אין הבדל',
          '[Fact] — בדיקה בודדת; [Theory] — בדיקה עם פרמטרים, רצה כמה פעמים עם [InlineData] שונים',
          '[Theory] מהיר יותר',
          '[Fact] עובד רק עם async',
        ],
        correct: 1,
        explanation: '[Theory] + [InlineData(...)] = parametrized test. xUnit מריץ אותה פעם לכל InlineData — מצויין לבדיקת edge cases מרובים.',
      },
      {
        id: 'dotnet-testing-q2',
        text: 'מה Substitute.For<IPaymentGateway>() עושה?',
        options: [
          'יוצר instance אמיתי של PaymentGateway',
          'יוצר mock object שמממש את הinterface ומאפשר לשלוט בתשובות ולאמת קריאות',
          'מריץ הזרקת תלויות',
          'מגדיר interface חדש',
        ],
        correct: 1,
        explanation: 'NSubstitute יוצר מחלקה מזויפת שמממשת את ה-interface. אפשר להגדיר Returns() לכל מתודה ולאחר מכן לאמת עם Received() שנקראה.',
      },
      {
        id: 'dotnet-testing-q3',
        text: 'מה WebApplicationFactory עושה?',
        options: [
          'מריצה server אמיתי על port 5000',
          'יוצרת in-process test server של ASP.NET Core — מאפשרת HTTP requests בזיכרון ללא network',
          'מייצרת API documentation',
          'בודקת authentication',
        ],
        correct: 1,
        explanation: 'WebApplicationFactory מריצה את כל ה-ASP.NET pipeline (middleware, routing, DI) בזיכרון. HttpClient שנוצר ממנה שולח requests ישירות לאפליקציה.',
      },
      {
        id: 'dotnet-testing-q4',
        text: 'למה מחליפים את DbContext ל-in-memory ב-WebApplicationFactory?',
        options: [
          'כי EF Core לא עובד ב-tests',
          'כדי לבודד בדיקות מ-DB אמיתי — מהיר, אין צורך ב-connection string, ניתן לאפס בין בדיקות',
          'כי in-memory יותר מהיר ב-production',
          'כי SQL Server לא תומך ב-transactions',
        ],
        correct: 1,
        explanation: 'UseInMemoryDatabase = DB ב-RAM שנוצר ונמחק עם הבדיקה. אין setup חיצוני, אין cleanup מורכב, כל בדיקה מקבלת DB נקי.',
      },
      {
        id: 'dotnet-testing-q5',
        text: 'מה IClassFixture<T> עושה ב-xUnit?',
        options: [
          'מריץ כל בדיקה בthread נפרד',
          'יוצר instance אחד של T לכל ה-test class, חוסך overhead של יצירה חוזרת',
          'מגדיר סדר הרצה',
          'מוסיף logging לבדיקות',
        ],
        correct: 1,
        explanation: 'IClassFixture<WebAppFactory> = factory נוצרת פעם אחת, כל הבדיקות בclass חולקות אותה. מהיר יותר מ-new factory() לכל בדיקה, ומאפשר cleanup עם IAsyncLifetime.',
      },
    ],
  },
]
