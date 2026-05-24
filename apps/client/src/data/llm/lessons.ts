import type { Lesson } from '../../types'

export const llmLessons: Lesson[] = [
  {
    id: 'llm-intro',
    title: 'מבוא ל-LLM ו-MCP',
    summary: 'מה זה מודלי שפה גדולים, איך עובד MCP ולמה זה משנה את אופן בניית מערכות',
    emoji: '🤖',
    content: [
      { type: 'heading', text: 'מה זה LLM?' },
      {
        type: 'text',
        text: 'LLM (Large Language Model) הוא מודל AI שאומן על כמויות עצומות של טקסט ומסוגל להבין ולייצר שפה טבעית. מודלים כמו Claude, GPT-4 ו-Gemini יכולים לענות על שאלות, לכתוב קוד, לסכם מסמכים ולנהל שיחות מורכבות.',
      },
      {
        type: 'table',
        caption: 'מושגי יסוד ב-LLM',
        headers: ['מושג', 'הסבר'],
        rows: [
          ['Token', 'יחידת עיבוד — בערך 4 תווים באנגלית. "Hello world" = 2 tokens'],
          ['Context Window', 'כמות ה-tokens שהמודל יכול לזכור בשיחה אחת (Claude: עד 200K)'],
          ['Temperature', 'רמת היצירתיות: 0 = דטרמיניסטי, 1 = יצירתי ומגוון'],
          ['System Prompt', 'הוראות קבועות שמגדירות את אופי המודל לכל השיחה'],
          ['Inference', 'תהליך יצירת התשובה — המודל מחשב token אחד בכל פעם'],
        ],
      },
      { type: 'heading', text: 'מה זה MCP?' },
      {
        type: 'text',
        text: 'MCP (Model Context Protocol) הוא פרוטוקול פתוח שפיתחה Anthropic ב-2024. הוא מאפשר ל-LLM להתחבר לכלים ומקורות נתונים חיצוניים בצורה סטנדרטית — כמו USB שמחבר כל מכשיר לכל מחשב. במקום לבנות integration ייעודי לכל שירות, כותבים MCP Server אחד שכל מודל AI יכול להשתמש בו.',
      },
      {
        type: 'tip',
        text: 'לפני MCP: כל חברה בנתה חיבורים שונים לכל מודל. אחרי MCP: כותבים server אחד — עובד עם Claude, Cursor, VS Code Copilot ועוד.',
      },
      {
        type: 'table',
        caption: 'MCP לעומת REST API רגיל',
        headers: ['נושא', 'REST API', 'MCP Server'],
        rows: [
          ['מי קורא', 'קוד שכתבתם', 'מודל ה-AI עצמו'],
          ['איך יודע מה לקרוא', 'לוגיקה ידנית', 'מבין מהקשר השיחה'],
          ['סטנדרטיזציה', 'כל API שונה', 'פרוטוקול אחד לכולם'],
          ['פורמט', 'HTTP + JSON', 'JSON-RPC over stdio/SSE'],
          ['דוגמה', 'GET /api/notes', 'tool: get_notes(courseId, lessonId)'],
        ],
      },
      { type: 'heading', text: 'ארכיטקטורת MCP' },
      {
        type: 'code',
        lang: 'text',
        caption: 'זרימת MCP — Host → Client → Server',
        code: `┌─────────────────────────────────┐
│  MCP Host (Claude Desktop / IDE) │
│  ┌─────────────┐                 │
│  │ MCP Client  │◄──────────────┐ │
│  └──────┬──────┘               │ │
└─────────┼───────────────────────┘
          │ JSON-RPC
    ┌─────▼──────┐    ┌──────────────┐
    │ MCP Server │───►│  Your System │
    │ (your code)│    │  DB / API /  │
    └────────────┘    │  File System │
                      └──────────────┘

1. Host (Claude) שואל: "מה הכלים הזמינים?"
2. Server מחזיר: רשימת tools + schemas
3. User: "תביא לי את ההערות של שיעור SQL"
4. Claude בוחר tool: get_notes({courseId: "sql", lessonId: "join"})
5. Server מריץ ומחזיר תוצאה
6. Claude מנסח תשובה סופית`,
      },
    ],
    questionBank: [
      {
        id: 'llm-intro-q1',
        text: 'מה זה Token בהקשר של LLM?',
        options: [
          'מפתח API לאימות',
          'יחידת עיבוד — בערך 4 תווים, שהמודל מעבד בכל צעד',
          'שם המשתמש בשיחה',
          'קובץ הגדרות',
        ],
        correct: 1,
        explanation: 'Token הוא יחידת עיבוד בסיסית. "Hello world" = 2 tokens. עלות API מחושבת לפי tokens. Context window מוגדר ב-tokens.',
      },
      {
        id: 'llm-intro-q2',
        text: 'מה תפקיד MCP (Model Context Protocol)?',
        options: [
          'פרוטוקול להצפנת תקשורת',
          'פרוטוקול סטנדרטי שמאפשר ל-LLM להתחבר לכלים ומקורות נתונים חיצוניים',
          'שפת תכנות לכתיבת AI',
          'מסד נתונים לאחסון שיחות',
        ],
        correct: 1,
        explanation: 'MCP הוא "USB ל-AI" — סטנדרט פתוח שמאפשר לכל מודל AI להתחבר לכל שירות שכתוב כ-MCP Server, ללא integration ייחודי.',
      },
      {
        id: 'llm-intro-q3',
        text: 'מה ההבדל בין Temperature=0 ל-Temperature=1?',
        options: [
          'אין הבדל',
          'Temperature=0 דטרמיניסטי (תשובה קבועה), Temperature=1 יצירתי ומגוון',
          'Temperature=0 מהיר יותר',
          'Temperature=1 משתמש ביותר tokens',
        ],
        correct: 1,
        explanation: 'Temperature שולט ברמת האקראיות. 0 = תמיד אותה תשובה (טוב לקוד/עובדות). גבוה = יצירתי יותר (טוב לכתיבה יצירתית).',
      },
      {
        id: 'llm-intro-q4',
        text: 'מה זה Context Window?',
        options: [
          'חלון ממשק המשתמש',
          'הגדרת גודל גופן',
          'כמות ה-tokens שהמודל יכול לזכור בשיחה אחת',
          'מספר המשתמשים המקביליים',
        ],
        correct: 2,
        explanation: 'Context Window הוא "זיכרון" של המודל לשיחה. Claude תומך עד 200K tokens. ברגע שהשיחה חורגת — המודל "שוכח" חלק ממנה.',
      },
      {
        id: 'llm-intro-q5',
        text: 'מה תפקיד System Prompt ב-LLM?',
        options: [
          'להפעיל את המודל',
          'הוראות קבועות שמגדירות את אופי ותפקיד המודל לכל השיחה',
          'להגדיר את מסד הנתונים',
          'לאמת את המשתמש',
        ],
        correct: 1,
        explanation: 'System Prompt הוא ה"אישיות" של הבוט. "אתה מורה ל-SQL, עונה בעברית, מסביר בדוגמאות". נשלח עם כל שאלה ומגדיר את ההקשר.',
      },
      {
        id: 'llm-intro-q6',
        text: 'מה הפרוטוקול שמשתמש בו MCP לתקשורת?',
        options: [
          'HTTP/REST',
          'GraphQL',
          'JSON-RPC over stdio או SSE',
          'WebSockets בלבד',
        ],
        correct: 2,
        explanation: 'MCP משתמש ב-JSON-RPC — פרוטוקול קריאה לפונקציות מרוחקות בפורמט JSON. התעבורה היא דרך stdio (תהליכים) או SSE (HTTP streaming).',
      },
      {
        id: 'llm-intro-q7',
        text: 'מי ה-"Host" במושגי MCP?',
        options: [
          'שרת מסד הנתונים',
          'האפליקציה שמכילה את ה-LLM ומנהלת את ה-MCP Clients (כמו Claude Desktop)',
          'שרת ה-API החיצוני',
          'המפתח שכותב את הקוד',
        ],
        correct: 1,
        explanation: 'Host הוא האפליקציה שמריצה את ה-LLM ומנהלת חיבורים ל-MCP Servers. דוגמאות: Claude Desktop, Cursor IDE, VS Code + Copilot.',
      },
      {
        id: 'llm-intro-q8',
        text: 'מה היתרון העיקרי של MCP על פני שילוב ישיר (hard-coded integration)?',
        options: [
          'MCP מהיר יותר',
          'MCP זול יותר',
          'כותבים MCP Server אחד שעובד עם כל מודל AI תואם, ללא שינוי קוד',
          'MCP תומך בעברית',
        ],
        correct: 2,
        explanation: 'כמו USB — כותבים driver אחד, עובד עם כל מחשב. MCP Server אחד עובד עם Claude, GPT, Gemini וכל מודל שתומך בפרוטוקול.',
      },
    ],
  },

  {
    id: 'mcp-server-nodejs',
    title: 'MCP Server ב-Node.js',
    summary: 'בניית MCP Server מאפס — הגדרת tools, resources ו-prompts עם @modelcontextprotocol/sdk',
    emoji: '🔌',
    content: [
      { type: 'heading', text: 'התקנה וסביבה' },
      {
        type: 'code',
        lang: 'bash',
        caption: 'יצירת פרויקט MCP Server',
        code: `mkdir my-mcp-server && cd my-mcp-server
npm init -y

# SDK רשמי של MCP + Zod לvalidation
npm install @modelcontextprotocol/sdk zod

# TypeScript (מומלץ)
npm install -D typescript @types/node tsx`,
      },
      { type: 'heading', text: 'MCP Server בסיסי' },
      {
        type: 'code',
        lang: 'typescript',
        caption: 'server.ts — MCP Server עם tool אחד',
        code: `import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js'
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js'
import { z } from 'zod'

// יצירת ה-server
const server = new McpServer({
  name: 'codelearn-server',
  version: '1.0.0',
})

// הגדרת Tool — פונקציה שה-LLM יכול לקרוא
server.tool(
  'get_lesson_notes',
  'מחזיר הערות של משתמש לשיעור ספציפי',
  {
    courseId: z.string().describe('מזהה הקורס, למשל: sql, javascript'),
    lessonId: z.string().describe('מזהה השיעור, למשל: sql-join'),
    userToken: z.string().uuid().describe('מזהה ייחודי של המשתמש'),
  },
  async ({ courseId, lessonId, userToken }) => {
    const res = await fetch(
      \`https://api.codelearn.com/api/notes?courseId=\${courseId}&lessonId=\${lessonId}&userToken=\${userToken}\`
    )
    const notes = await res.json()

    return {
      content: [
        {
          type: 'text',
          text: notes.length
            ? notes.map((n: any) => \`• \${n.content}\`).join('\\n')
            : 'אין הערות לשיעור זה',
        },
      ],
    }
  },
)

// חיבור דרך stdio (לשימוש ב-Claude Desktop)
const transport = new StdioServerTransport()
await server.connect(transport)`,
      },
      { type: 'heading', text: 'הגדרת מספר Tools' },
      {
        type: 'code',
        lang: 'typescript',
        caption: 'server עם כמה tools — שאלות, הערות ופרוגרס',
        code: `import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js'
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js'
import { z } from 'zod'

const BASE_URL = process.env.API_URL ?? 'http://localhost:3001'
const server = new McpServer({ name: 'codelearn', version: '1.0.0' })

// Tool 1: שמירת הערה
server.tool(
  'save_note',
  'שומר הערה חדשה לשיעור',
  {
    userToken: z.string().uuid(),
    courseId: z.string(),
    lessonId: z.string(),
    content: z.string().max(5000),
  },
  async (params) => {
    const res = await fetch(\`\${BASE_URL}/api/notes\`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params),
    })
    const data = await res.json()
    return {
      content: [{ type: 'text', text: \`הערה נשמרה בהצלחה (id: \${data.id})\` }],
    }
  },
)

// Tool 2: סיכום קורס
server.tool(
  'get_course_summary',
  'מחזיר רשימת שיעורים וסטטוס השלמה',
  { courseId: z.enum(['sql', 'javascript', 'typescript', 'react', 'cloud', 'devops']) },
  async ({ courseId }) => {
    // כאן אפשר לשלוף מה-DB את ההתקדמות
    const summary = \`קורס \${courseId}: 5/9 שיעורים הושלמו\`
    return { content: [{ type: 'text', text: summary }] }
  },
)

const transport = new StdioServerTransport()
await server.connect(transport)`,
      },
      { type: 'heading', text: 'Resources — מידע סטטי' },
      {
        type: 'text',
        text: 'בנוסף ל-Tools (פעולות), MCP תומך ב-Resources — קבצים או URI-ים שה-LLM יכול לקרוא. מתאים לתיעוד, קבצי הגדרות, schema של מסד נתונים.',
      },
      {
        type: 'code',
        lang: 'typescript',
        caption: 'Resource — חשיפת schema של מסד הנתונים',
        code: `server.resource(
  'db-schema',
  'schema://notes-table',
  async (uri) => ({
    contents: [
      {
        uri: uri.href,
        mimeType: 'text/plain',
        text: \`
          TABLE notes (
            id         SERIAL PRIMARY KEY,
            user_token TEXT NOT NULL,
            course_id  TEXT NOT NULL,
            lesson_id  TEXT NOT NULL,
            content    TEXT NOT NULL,
            created_at TIMESTAMPTZ DEFAULT NOW()
          )
        \`,
      },
    ],
  }),
)`,
      },
      {
        type: 'code',
        lang: 'json',
        caption: 'claude_desktop_config.json — חיבור ל-Claude Desktop',
        code: `{
  "mcpServers": {
    "codelearn": {
      "command": "node",
      "args": ["/path/to/my-mcp-server/dist/server.js"],
      "env": {
        "API_URL": "https://codelearn-api.onrender.com"
      }
    }
  }
}`,
      },
      {
        type: 'tip',
        text: 'הריצו את ה-server עם npx tsx server.ts לפיתוח. לפרודקשן — קמפלו ל-JS. ה-server מקבל בקשות מ-Claude דרך stdin ומחזיר תשובות ל-stdout.',
      },
    ],
    questionBank: [
      {
        id: 'mcp-server-q1',
        text: 'מה הפונקציה server.tool() עושה ב-MCP?',
        options: [
          'יוצרת REST endpoint',
          'מגדירה פונקציה שה-LLM יכול לקרוא לה עם schema של פרמטרים',
          'מגדירה middleware',
          'מתחברת למסד נתונים',
        ],
        correct: 1,
        explanation: 'server.tool() רושם "כלי" שה-LLM יכול לבחור לקרוא לו. כולל שם, תיאור (ה-LLM קורא אותו!) וסכמת Zod לוולידציה.',
      },
      {
        id: 'mcp-server-q2',
        text: 'למה חשוב לכתוב תיאור טוב ל-tool?',
        options: [
          'לא חשוב, רק הקוד משנה',
          'לתיעוד אנושי בלבד',
          'ה-LLM קורא את התיאור כדי להחליט מתי ואיך להשתמש ב-tool',
          'לצורכי logging',
        ],
        correct: 2,
        explanation: 'ה-LLM מקבל את שם ה-tool + התיאור ומחליט אוטומטית אם להשתמש בו. תיאור גרוע → ה-AI לא יקרא ל-tool בזמן הנכון.',
      },
      {
        id: 'mcp-server-q3',
        text: 'מה ההבדל בין Tool ל-Resource ב-MCP?',
        options: [
          'אין הבדל',
          'Tool = פעולה אקטיבית (כתיבה/שאילתה), Resource = קריאת מידע סטטי',
          'Resource מהיר יותר',
          'Tool רק לקריאה, Resource לכתיבה',
        ],
        correct: 1,
        explanation: 'Tool = פונקציה שמריצים (API call, DB query). Resource = URI שניתן לקרוא ממנו (קובץ, schema, תיעוד). ה-LLM בוחר לפי הצורך.',
      },
      {
        id: 'mcp-server-q4',
        text: 'מה StdioServerTransport?',
        options: [
          'חיבור HTTP',
          'מנגנון תקשורת דרך stdin/stdout — מתאים ל-Claude Desktop',
          'חיבור WebSocket',
          'מנגנון logging',
        ],
        correct: 1,
        explanation: 'StdioServerTransport מאפשר ל-Claude Desktop להפעיל את ה-server כ-subprocess ולתקשר איתו דרך stdin/stdout. SSEServerTransport משמש לחיבורי HTTP.',
      },
      {
        id: 'mcp-server-q5',
        text: 'מה Zod עושה ב-MCP Server?',
        options: [
          'מייצר תיעוד HTML',
          'מגדיר schema לפרמטרים של ה-tool ומוודא שה-LLM שלח ערכים תקינים',
          'מנהל sessions',
          'מנהל חיבורי DB',
        ],
        correct: 1,
        explanation: 'Zod מגדיר את טיפוסי הפרמטרים. ה-SDK מייצר מתוכו JSON Schema שה-LLM משתמש בו כדי לדעת מה לשלוח. גם מוודא runtime validity.',
      },
      {
        id: 'mcp-server-q6',
        text: 'מה מכיל claude_desktop_config.json?',
        options: [
          'קוד ה-server עצמו',
          'הגדרות החיבור — פקודת הפעלה, ארגומנטים ומשתני סביבה לכל MCP Server',
          'הגדרות עיצוב',
          'רשימת משתמשים',
        ],
        correct: 1,
        explanation: 'הקובץ מגדיר לClaude Desktop אילו MCP Servers להפעיל ואיך — command, args, env. Claude מפעיל אותם כ-subprocesses בהפעלה.',
      },
      {
        id: 'mcp-server-q7',
        text: 'מה מחזיר handler של tool ב-MCP?',
        options: [
          'מחרוזת טקסט בלבד',
          'אובייקט עם content array — יכול להכיל text, image או resource',
          'JSON שרירותי',
          'HTTP Response',
        ],
        correct: 1,
        explanation: 'Handler מחזיר { content: [...] } — מערך של content blocks. type:"text" הוא הנפוץ ביותר. אפשר גם type:"image" לתמונות.',
      },
      {
        id: 'mcp-server-q8',
        text: 'באיזה npm package משתמשים לבניית MCP Server רשמי?',
        options: [
          '@anthropic-ai/sdk',
          '@openai/mcp',
          '@modelcontextprotocol/sdk',
          'mcp-server',
        ],
        correct: 2,
        explanation: '@modelcontextprotocol/sdk הוא ה-SDK הרשמי של Anthropic לבניית MCP Servers ו-Clients. מכיל McpServer, StdioServerTransport ועוד.',
      },
    ],
  },

  {
    id: 'claude-api-nodejs',
    title: 'Claude API ב-Node.js',
    summary: 'שימוש ב-Anthropic SDK — Messages API, Tool Use ו-Streaming לבניית אפליקציות AI',
    emoji: '⚡',
    content: [
      { type: 'heading', text: 'התקנה' },
      {
        type: 'code',
        lang: 'bash',
        caption: 'התקנת Anthropic SDK',
        code: `npm install @anthropic-ai/sdk

# משתנה סביבה:
# ANTHROPIC_API_KEY=sk-ant-...`,
      },
      { type: 'heading', text: 'Messages API — שיחה בסיסית' },
      {
        type: 'code',
        lang: 'typescript',
        caption: 'שאלה פשוטה ל-Claude',
        code: `import Anthropic from '@anthropic-ai/sdk'

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
})

const message = await client.messages.create({
  model: 'claude-opus-4-5',
  max_tokens: 1024,
  system: 'אתה מורה ל-SQL. עונה תמיד בעברית עם דוגמאות קוד.',
  messages: [
    {
      role: 'user',
      content: 'הסבר מה זה LEFT JOIN ובמה הוא שונה מ-INNER JOIN',
    },
  ],
})

console.log(message.content[0].text)
// → "LEFT JOIN מחזיר את כל השורות מהטבלה השמאלית..."`,
      },
      { type: 'heading', text: 'שיחה רב-סיבובית (Multi-turn)' },
      {
        type: 'code',
        lang: 'typescript',
        caption: 'היסטוריית שיחה — שמירת context',
        code: `import Anthropic from '@anthropic-ai/sdk'

const client = new Anthropic()
const history: Anthropic.MessageParam[] = []

async function chat(userMessage: string): Promise<string> {
  history.push({ role: 'user', content: userMessage })

  const response = await client.messages.create({
    model: 'claude-opus-4-5',
    max_tokens: 2048,
    system: 'אתה עוזר לימודים חכם לאתר CodeLearn.',
    messages: history,
  })

  const assistantText = response.content[0].type === 'text'
    ? response.content[0].text
    : ''

  history.push({ role: 'assistant', content: assistantText })
  return assistantText
}

// שיחה:
await chat('מה זה JOIN ב-SQL?')
await chat('תן לי דוגמה עם שתי טבלאות')
await chat('ומה ההבדל מ-LEFT JOIN?')  // יזכר את הקונטקסט!`,
      },
      { type: 'heading', text: 'Tool Use — קריאה לפונקציות' },
      {
        type: 'text',
        text: 'Tool Use מאפשר ל-Claude לקרוא לפונקציות שאתם מגדירים. הוא מקבל רשימת tools, מחליט מתי לקרוא להם ושולח בחזרה את הפרמטרים. אתם מריצים את הפונקציה ומחזירים את התוצאה.',
      },
      {
        type: 'code',
        lang: 'typescript',
        caption: 'Tool Use — Claude שמחליט מה לחפש',
        code: `import Anthropic from '@anthropic-ai/sdk'

const client = new Anthropic()

// הגדרת tools שClaude יכול לקרוא
const tools: Anthropic.Tool[] = [
  {
    name: 'get_notes',
    description: 'מחזיר הערות של המשתמש לשיעור מסוים',
    input_schema: {
      type: 'object' as const,
      properties: {
        courseId: { type: 'string', description: 'מזהה הקורס' },
        lessonId: { type: 'string', description: 'מזהה השיעור' },
      },
      required: ['courseId', 'lessonId'],
    },
  },
]

// סימולציית פונקציה אמיתית
async function getNotes(courseId: string, lessonId: string) {
  return [{ content: 'JOIN מחבר בין טבלאות לפי מפתח משותף' }]
}

async function askWithTools(question: string) {
  // שלב 1: Claude מחליט אם צריך tool
  const response = await client.messages.create({
    model: 'claude-opus-4-5',
    max_tokens: 1024,
    tools,
    messages: [{ role: 'user', content: question }],
  })

  // שלב 2: אם Claude רוצה לקרוא ל-tool
  if (response.stop_reason === 'tool_use') {
    const toolUse = response.content.find((c) => c.type === 'tool_use')
    if (!toolUse || toolUse.type !== 'tool_use') return

    const { courseId, lessonId } = toolUse.input as any
    const result = await getNotes(courseId, lessonId)

    // שלב 3: מחזירים תוצאה ל-Claude לניסוח תשובה
    const finalResponse = await client.messages.create({
      model: 'claude-opus-4-5',
      max_tokens: 1024,
      tools,
      messages: [
        { role: 'user', content: question },
        { role: 'assistant', content: response.content },
        {
          role: 'user',
          content: [
            {
              type: 'tool_result',
              tool_use_id: toolUse.id,
              content: JSON.stringify(result),
            },
          ],
        },
      ],
    })

    return finalResponse.content[0].type === 'text'
      ? finalResponse.content[0].text
      : ''
  }

  return response.content[0].type === 'text' ? response.content[0].text : ''
}

const answer = await askWithTools('מה ההערות שלי על שיעור JOIN ב-SQL?')
console.log(answer)`,
      },
      { type: 'heading', text: 'Streaming — תשובה בזמן אמת' },
      {
        type: 'code',
        lang: 'typescript',
        caption: 'Streaming — הצגת תשובה token אחר token',
        code: `import Anthropic from '@anthropic-ai/sdk'

const client = new Anthropic()

// Express endpoint עם streaming
import express from 'express'
const app = express()

app.get('/api/ai/explain', async (req, res) => {
  const { topic } = req.query as { topic: string }

  res.setHeader('Content-Type', 'text/event-stream')
  res.setHeader('Cache-Control', 'no-cache')

  const stream = client.messages.stream({
    model: 'claude-opus-4-5',
    max_tokens: 1024,
    messages: [{ role: 'user', content: \`הסבר: \${topic}\` }],
  })

  for await (const event of stream) {
    if (
      event.type === 'content_block_delta' &&
      event.delta.type === 'text_delta'
    ) {
      res.write(\`data: \${JSON.stringify({ text: event.delta.text })}\\n\\n\`)
    }
  }

  res.write('data: [DONE]\\n\\n')
  res.end()
})`,
      },
      {
        type: 'tip',
        text: 'מודלים זמינים: claude-opus-4-5 (הכי חכם), claude-sonnet-4-6 (מהיר+חכם), claude-haiku-4-5 (הכי מהיר וזול). לרוב הפרויקטים Sonnet הוא האיזון הטוב ביותר.',
      },
    ],
    questionBank: [
      {
        id: 'claude-api-q1',
        text: 'מה max_tokens קובע ב-Messages API?',
        options: [
          'אורך ה-prompt המקסימלי',
          'מספר השיחות המקסימלי',
          'אורך התשובה המקסימלי שClaude יייצר',
          'גודל ה-context window',
        ],
        correct: 2,
        explanation: 'max_tokens מגביל את אורך התשובה. הinput (prompt) לא מוגבל על ידי max_tokens — הוא מוגבל על ידי ה-context window של המודל.',
      },
      {
        id: 'claude-api-q2',
        text: 'איך שומרים context בשיחה רב-סיבובית?',
        options: [
          'Claude שומר אוטומטית',
          'מעבירים את היסטוריית ה-messages בכל קריאה ל-API',
          'משתמשים בsession',
          'שומרים ב-cookie',
        ],
        correct: 1,
        explanation: 'ה-API הוא stateless — אין "זיכרון" אוטומטי. כל קריאה צריכה לכלול את כל ה-messages הקודמים (role: user/assistant) כדי שClaude יזכור הקשר.',
      },
      {
        id: 'claude-api-q3',
        text: 'מה stop_reason: "tool_use" מציין?',
        options: [
          'Claude סיים את התשובה',
          'Claude בחר לקרוא ל-tool ומחכה לתוצאה לפני שממשיך',
          'קרתה שגיאה',
          'הגענו ל-max_tokens',
        ],
        correct: 1,
        explanation: 'כש-Claude רוצה להשתמש ב-tool, הוא מחזיר stop_reason: "tool_use". עליכם להריץ את ה-tool, להחזיר tool_result ולקרוא ל-API שוב.',
      },
      {
        id: 'claude-api-q4',
        text: 'מה היתרון של Streaming ב-Claude API?',
        options: [
          'זול יותר',
          'מדויק יותר',
          'המשתמש רואה את התשובה מתחילה לצאת מיד — חוויה טובה יותר בממשקי שיחה',
          'מהיר יותר סה"כ',
        ],
        correct: 2,
        explanation: 'Streaming = הגעת tokens בזמן אמת במקום לחכות לתשובה המלאה. זמן סה"כ זהה, אבל משתמש רואה תגובה מיד — מה שמרגיש הרבה יותר מהיר.',
      },
      {
        id: 'claude-api-q5',
        text: 'מה input_schema ב-tool definition?',
        options: [
          'הגדרת הפלט של ה-tool',
          'JSON Schema המגדיר מה הפרמטרים שClaude צריך לשלוח לtool',
          'הגדרת authentication',
          'הגדרת rate limit',
        ],
        correct: 1,
        explanation: 'input_schema הוא JSON Schema (type, properties, required). Claude קורא אותו ומוודא שהוא שולח את כל הפרמטרים הנדרשים בפורמט הנכון.',
      },
      {
        id: 'claude-api-q6',
        text: 'מה ההבדל בין claude-opus-4-5 ל-claude-haiku-4-5?',
        options: [
          'Opus תומך בעברית, Haiku לא',
          'Opus מדויק ועמוק יותר אך יקר ואיטי; Haiku מהיר וזול אך פחות עמוק',
          'Haiku תומך בtools, Opus לא',
          'אין הבדל משמעותי',
        ],
        correct: 1,
        explanation: 'משפחת Claude: Opus = הכי חכם (מחקר מורכב), Sonnet = איזון (production), Haiku = הכי מהיר וזול (classification, tasks פשוטים).',
      },
      {
        id: 'claude-api-q7',
        text: 'מה system parameter ב-Messages API?',
        options: [
          'שם המערכת',
          'הוראות קבועות שמגדירות אופי ותפקיד Claude לכל השיחה',
          'גרסת ה-API',
          'שפת התשובה בלבד',
        ],
        correct: 1,
        explanation: 'system = System Prompt. "אתה מורה לSQL, עונה תמיד בעברית, לא עונה על שאלות שאינן קשורות ללימודים". מוחל על כל ה-conversation.',
      },
      {
        id: 'claude-api-q8',
        text: 'מה role: "assistant" ב-messages history?',
        options: [
          'הודעה מהמנהל',
          'תשובה קודמת של Claude שמוסיפים לhistory כדי לשמור context',
          'system message',
          'הודעת שגיאה',
        ],
        correct: 1,
        explanation: 'בשיחה מרובת סיבובים המסרים מתחלפים: user→assistant→user→assistant. מוסיפים את תשובות Claude (role: assistant) לhistory כדי שהוא יזכור מה אמר.',
      },
    ],
  },

  {
    id: 'llm-dotnet',
    title: 'LLM Integration ב-C# .NET',
    summary: 'שימוש ב-Claude API ו-MCP מ-C# — Anthropic.SDK, HttpClient ו-Tool Use',
    emoji: '🔷',
    content: [
      { type: 'heading', text: 'התקנה — NuGet Packages' },
      {
        type: 'code',
        lang: 'bash',
        caption: 'התקנת Anthropic.SDK דרך NuGet',
        code: `dotnet new webapi -n CodeLearnAI
cd CodeLearnAI

# SDK רשמי של Anthropic ל-.NET
dotnet add package Anthropic.SDK

# לחלופין עם HttpClient ישיר (ללא תלויות נוספות):
# dotnet add package System.Net.Http.Json`,
      },
      { type: 'heading', text: 'Messages API — שיחה בסיסית' },
      {
        type: 'code',
        lang: 'csharp',
        caption: 'Program.cs — שאלה פשוטה ל-Claude',
        code: `using Anthropic.SDK;
using Anthropic.SDK.Messaging;

var apiKey = Environment.GetEnvironmentVariable("ANTHROPIC_API_KEY")
  ?? throw new InvalidOperationException("ANTHROPIC_API_KEY not set");

var client = new AnthropicClient(new APIAuthentication(apiKey));

var request = new MessageParameters
{
    Model = AnthropicModels.Claude3Sonnet,
    MaxTokens = 1024,
    System = "אתה מורה ל-SQL. עונה תמיד בעברית עם דוגמאות.",
    Messages = new List<Message>
    {
        new(RoleType.User, "הסבר מה זה LEFT JOIN ובמה הוא שונה מ-INNER JOIN")
    }
};

var response = await client.Messages.GetClaudeMessageAsync(request);
Console.WriteLine(response.Content[0].Text);`,
      },
      { type: 'heading', text: 'HttpClient ישיר — ללא SDK' },
      {
        type: 'code',
        lang: 'csharp',
        caption: 'AnthropicService.cs — גישה ישירה ל-API',
        code: `using System.Net.Http.Json;
using System.Text.Json;

public class AnthropicService
{
    private readonly HttpClient _http;
    private const string BaseUrl = "https://api.anthropic.com/v1";

    public AnthropicService(string apiKey)
    {
        _http = new HttpClient();
        _http.DefaultRequestHeaders.Add("x-api-key", apiKey);
        _http.DefaultRequestHeaders.Add("anthropic-version", "2023-06-01");
    }

    public async Task<string> AskAsync(string userMessage, string? system = null)
    {
        var body = new
        {
            model = "claude-opus-4-5",
            max_tokens = 1024,
            system,
            messages = new[]
            {
                new { role = "user", content = userMessage }
            }
        };

        var res = await _http.PostAsJsonAsync($"{BaseUrl}/messages", body);
        res.EnsureSuccessStatusCode();

        var json = await res.Content.ReadFromJsonAsync<JsonElement>();
        return json
            .GetProperty("content")[0]
            .GetProperty("text")
            .GetString() ?? string.Empty;
    }
}`,
      },
      { type: 'heading', text: 'Tool Use ב-C#' },
      {
        type: 'code',
        lang: 'csharp',
        caption: 'Tool Use — Claude שמחליט מה לקרוא',
        code: `using Anthropic.SDK;
using Anthropic.SDK.Messaging;

var client = new AnthropicClient(new APIAuthentication(apiKey));

// הגדרת tools
var tools = new List<Tool>
{
    new()
    {
        Name = "get_lesson_notes",
        Description = "מחזיר הערות לשיעור ספציפי",
        InputSchema = new InputSchema
        {
            Type = "object",
            Properties = new Dictionary<string, Property>
            {
                ["courseId"] = new() { Type = "string", Description = "מזהה הקורס" },
                ["lessonId"] = new() { Type = "string", Description = "מזהה השיעור" },
            },
            Required = ["courseId", "lessonId"]
        }
    }
};

var messages = new List<Message>
{
    new(RoleType.User, "מה ההערות שלי על שיעור JOIN ב-SQL?")
};

// סיבוב ראשון — Claude מחליט לקרוא ל-tool
var response = await client.Messages.GetClaudeMessageAsync(new MessageParameters
{
    Model = AnthropicModels.Claude3Sonnet,
    MaxTokens = 1024,
    Tools = tools,
    Messages = messages,
});

if (response.StopReason == StopReason.ToolUse)
{
    var toolUse = response.Content.OfType<ToolUseContent>().First();

    // הרצת הפונקציה בפועל
    var notes = await FetchNotesFromDb(
        toolUse.Input["courseId"].ToString()!,
        toolUse.Input["lessonId"].ToString()!
    );

    // מחזירים תוצאה ל-Claude
    messages.Add(new(RoleType.Assistant, response.Content));
    messages.Add(new(RoleType.User, new List<ContentBase>
    {
        new ToolResultContent
        {
            ToolUseId = toolUse.Id,
            Content = JsonSerializer.Serialize(notes)
        }
    }));

    var finalResponse = await client.Messages.GetClaudeMessageAsync(
        new MessageParameters { Model = AnthropicModels.Claude3Sonnet,
            MaxTokens = 1024, Tools = tools, Messages = messages });

    Console.WriteLine(finalResponse.Content.OfType<TextContent>().First().Text);
}`,
      },
      { type: 'heading', text: 'Dependency Injection ב-ASP.NET Core' },
      {
        type: 'code',
        lang: 'csharp',
        caption: 'Program.cs — רישום שירות Claude ב-DI',
        code: `var builder = WebApplication.CreateBuilder(args);

// רישום AnthropicService
builder.Services.AddSingleton(sp =>
    new AnthropicService(
        builder.Configuration["Anthropic:ApiKey"]
          ?? throw new InvalidOperationException()
    ));

builder.Services.AddControllers();

var app = builder.Build();
app.MapControllers();
app.Run();`,
      },
      {
        type: 'code',
        lang: 'csharp',
        caption: 'AiController.cs — endpoint לשאלות AI',
        code: `[ApiController]
[Route("api/[controller]")]
public class AiController : ControllerBase
{
    private readonly AnthropicService _ai;

    public AiController(AnthropicService ai) => _ai = ai;

    [HttpPost("explain")]
    public async Task<IActionResult> Explain([FromBody] ExplainRequest req)
    {
        if (string.IsNullOrWhiteSpace(req.Topic))
            return BadRequest("topic is required");

        var answer = await _ai.AskAsync(
            $"הסבר בקצרה: {req.Topic}",
            system: "אתה מורה ל-SQL. עונה בעברית, קצר ומדויק."
        );

        return Ok(new { answer });
    }
}

public record ExplainRequest(string Topic);`,
      },
    ],
    questionBank: [
      {
        id: 'dotnet-q1',
        text: 'מה NuGet Package משתמשים בו ל-Anthropic ב-C#?',
        options: ['Anthropic.Net', 'Claude.SDK', 'Anthropic.SDK', 'AI.Anthropic'],
        correct: 2,
        explanation: 'Anthropic.SDK הוא ה-SDK הרשמי ל-.NET. מותקן דרך: dotnet add package Anthropic.SDK',
      },
      {
        id: 'dotnet-q2',
        text: 'מה היתרון של HttpClient ישיר על פני Anthropic.SDK?',
        options: [
          'HttpClient מהיר יותר',
          'HttpClient לא דורש תלויות נוספות — מתאים כשרוצים שליטה מלאה על הבקשה',
          'HttpClient תומך ב-streaming',
          'אין הבדל',
        ],
        correct: 1,
        explanation: 'HttpClient ישיר מאפשר שליטה מלאה על הבקשה ואינו תלוי בSDK חיצוני. Anthropic.SDK נוח יותר ותומך ב-typed models.',
      },
      {
        id: 'dotnet-q3',
        text: 'איך מגדירים Tool ב-Anthropic.SDK ל-C#?',
        options: [
          'באמצעות Attribute על method',
          'אובייקט Tool עם Name, Description ו-InputSchema המגדיר את הפרמטרים',
          'קובץ JSON נפרד',
          'Interface מיוחד',
        ],
        correct: 1,
        explanation: 'Tool = { Name, Description, InputSchema { Type, Properties, Required } }. InputSchema הוא JSON Schema שClaude משתמש בו כדי לדעת מה לשלוח.',
      },
      {
        id: 'dotnet-q4',
        text: 'מה StopReason.ToolUse מציין ב-C#?',
        options: [
          'שגיאה',
          'סוף השיחה',
          'Claude בחר לקרוא ל-tool — צריך להריץ ולהחזיר תוצאה',
          'Timeout',
        ],
        correct: 2,
        explanation: 'כש-response.StopReason == StopReason.ToolUse, Claude רוצה לקרוא ל-tool. מריצים אותו, מוסיפים ToolResultContent למסרים וקוראים ל-API שוב.',
      },
      {
        id: 'dotnet-q5',
        text: 'מה Dependency Injection עושה ב-ASP.NET Core לשירות AI?',
        options: [
          'מגביל גישה ל-API',
          'רושם את השירות כ-Singleton כדי שיהיה מופע אחד משותף לכל הבקשות',
          'מצפין את ה-API Key',
          'יוצר connection pool',
        ],
        correct: 1,
        explanation: 'AddSingleton רושם AnthropicService כמופע אחד שכל הcontrollers מקבלים דרך constructor injection. חוסך יצירת HttpClient בכל בקשה.',
      },
      {
        id: 'dotnet-q6',
        text: 'מה ToolResultContent משמש לו ב-C# Tool Use?',
        options: [
          'הגדרת ה-tool',
          'החזרת תוצאת ה-tool ל-Claude כדי שינסח תשובה סופית',
          'logging של ה-tool',
          'validation של הפרמטרים',
        ],
        correct: 1,
        explanation: 'אחרי שמריצים את ה-tool, מוסיפים ToolResultContent { ToolUseId, Content } לרשימת המסרים. Claude מקבל את התוצאה ומנסח תשובה סופית.',
      },
      {
        id: 'dotnet-q7',
        text: 'מה כותרת anthropic-version משמשת לה?',
        options: [
          'גרסת ה-SDK',
          'גרסת .NET',
          'Header נדרש ב-API שמציין את גרסת ה-API בשימוש',
          'Header אופציונלי לstatistics',
        ],
        correct: 2,
        explanation: 'anthropic-version: "2023-06-01" הוא Header חובה בכל בקשה ל-Anthropic API. מציין את גרסת הAPI כדי לשמור על backwards compatibility.',
      },
      {
        id: 'dotnet-q8',
        text: 'מה record ExplainRequest(string Topic) עושה ב-C#?',
        options: [
          'מגדיר interface',
          'מגדיר class לרישום ל-DB',
          'מגדיר immutable data class קצר (C# 9+) לmapping של JSON body',
          'מגדיר enum',
        ],
        correct: 2,
        explanation: 'record ב-C# 9+ הוא data class immutable קצר. [FromBody] ExplainRequest req ממפה אוטומטית את JSON body לפרמטרים של ה-record.',
      },
    ],
  },

  {
    id: 'mcp-existing-system',
    title: 'שילוב MCP עם מערכת קיימת',
    summary: 'איך מחברים MCP Server למערכת Node.js קיימת — דוגמה מלאה עם הAPI של CodeLearn',
    emoji: '🔗',
    content: [
      { type: 'heading', text: 'הגישה: MCP Adapter Pattern' },
      {
        type: 'text',
        text: 'במקום לשכתב את המערכת הקיימת, כותבים MCP Server שעוטף את ה-API הקיים. ה-server מתרגם קריאות MCP לבקשות HTTP רגילות — כך המערכת המקורית לא משתנה כלל.',
      },
      {
        type: 'table',
        caption: 'ארכיטקטורת Adapter',
        headers: ['שכבה', 'תפקיד', 'טכנולוגיה'],
        rows: [
          ['Claude / AI Host', 'שואל שאלות, בוחר tools', 'Claude Desktop / API'],
          ['MCP Server', 'מתרגם MCP → HTTP', 'Node.js + @modelcontextprotocol/sdk'],
          ['Existing API', 'לוגיקה עסקית, DB', 'Express.js קיים'],
          ['PostgreSQL', 'אחסון נתונים', 'ללא שינוי'],
        ],
      },
      { type: 'heading', text: 'MCP Server שעוטף את CodeLearn API' },
      {
        type: 'code',
        lang: 'typescript',
        caption: 'codelearn-mcp/server.ts — Adapter מלא',
        code: `import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js'
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js'
import { z } from 'zod'

const API_BASE = process.env.API_URL ?? 'http://localhost:3001'
const server = new McpServer({ name: 'codelearn', version: '1.0.0' })

// ─── Helper ───────────────────────────────────────────────────────────────────

async function api(path: string, options?: RequestInit) {
  const res = await fetch(\`\${API_BASE}\${path}\`, {
    ...options,
    headers: { 'Content-Type': 'application/json', ...options?.headers },
  })
  if (!res.ok) throw new Error(\`API error \${res.status}: \${await res.text()}\`)
  return res.json()
}

// ─── Tools ────────────────────────────────────────────────────────────────────

server.tool(
  'get_notes',
  'מחזיר את כל ההערות של משתמש לשיעור מסוים',
  {
    userToken: z.string().uuid().describe('מזהה המשתמש'),
    courseId: z.string().describe('קורס: sql / javascript / typescript / react'),
    lessonId: z.string().describe('מזהה השיעור'),
  },
  async ({ userToken, courseId, lessonId }) => {
    const params = new URLSearchParams({ userToken, courseId, lessonId })
    const notes = await api(\`/api/notes?\${params}\`)

    const text = notes.length
      ? notes.map((n: any, i: number) => \`\${i + 1}. \${n.content}\`).join('\\n')
      : 'אין הערות לשיעור זה עדיין.'

    return { content: [{ type: 'text', text }] }
  },
)

server.tool(
  'save_note',
  'שומר הערה חדשה לשיעור',
  {
    userToken: z.string().uuid(),
    courseId: z.string(),
    lessonId: z.string(),
    content: z.string().min(1).max(5000).describe('תוכן ההערה'),
  },
  async (params) => {
    const note = await api('/api/notes', {
      method: 'POST',
      body: JSON.stringify(params),
    })
    return {
      content: [{ type: 'text', text: \`✓ ההערה נשמרה (id: \${note.id})\` }],
    }
  },
)

server.tool(
  'delete_note',
  'מוחק הערה לפי מזהה',
  {
    id: z.number().positive().describe('מזהה ההערה למחיקה'),
    userToken: z.string().uuid(),
  },
  async ({ id, userToken }) => {
    await api(\`/api/notes/\${id}\`, {
      method: 'DELETE',
      body: JSON.stringify({ userToken }),
    })
    return { content: [{ type: 'text', text: \`✓ הערה \${id} נמחקה\` }] }
  },
)

// ─── Resource: API health ─────────────────────────────────────────────────────

server.resource(
  'api-health',
  'health://codelearn-api',
  async () => {
    const health = await api('/api/health').catch(() => ({ status: 'error' }))
    return {
      contents: [
        {
          uri: 'health://codelearn-api',
          mimeType: 'application/json',
          text: JSON.stringify(health, null, 2),
        },
      ],
    }
  },
)

const transport = new StdioServerTransport()
await server.connect(transport)`,
      },
      { type: 'heading', text: 'שימוש: Agent שמנהל הערות אוטומטית' },
      {
        type: 'code',
        lang: 'typescript',
        caption: 'agent.ts — Claude משתמש ב-MCP לניהול הערות',
        code: `import Anthropic from '@anthropic-ai/sdk'

// זה לא MCP Client — זה Claude API ישיר עם Tool Use
// ה-MCP Server רץ בנפרד ו-Claude Desktop מחבר ביניהם

const client = new Anthropic()

// דוגמה לשימוש ב-Tool Use ישיר דרך Claude API:
const tools: Anthropic.Tool[] = [
  {
    name: 'summarize_notes',
    description: 'מסכם את כל ההערות של משתמש ומחזיר נקודות עיקריות',
    input_schema: {
      type: 'object' as const,
      properties: {
        notes: {
          type: 'array',
          items: { type: 'string' },
          description: 'רשימת ההערות לסיכום',
        },
      },
      required: ['notes'],
    },
  },
]

async function aiStudyAssistant(userMessage: string, userToken: string) {
  // 1. שלוף הערות מה-API
  const params = new URLSearchParams({
    userToken,
    courseId: 'sql',
    lessonId: 'sql-join',
  })
  const notes = await fetch(\`/api/notes?\${params}\`).then((r) => r.json())
  const notesText = notes.map((n: any) => n.content).join('\\n')

  // 2. שאל את Claude עם context ההערות
  const response = await client.messages.create({
    model: 'claude-opus-4-5',
    max_tokens: 2048,
    system: \`אתה עוזר לימודים. להלן ההערות של המשתמש:
\\n\${notesText}\\n
ענה על שאלות בהתבסס על ההערות, ואם חסר מידע — ציין זאת.\`,
    messages: [{ role: 'user', content: userMessage }],
  })

  return response.content[0].type === 'text' ? response.content[0].text : ''
}

// שימוש:
const answer = await aiStudyAssistant(
  'על מה צריך לחזור לפי ההערות שלי?',
  'my-user-token-uuid',
)
console.log(answer)`,
      },
      {
        type: 'tip',
        text: 'הפרד בין MCP Server (לחיבור Claude Desktop/IDE) לבין Tool Use ישיר (לAPI calls מתוך הקוד שלך). MCP = לחיבור כלי AI חיצוניים. Tool Use = לכתיבת agents בקוד.',
      },
      { type: 'heading', text: 'package.json של ה-MCP Server' },
      {
        type: 'code',
        lang: 'json',
        caption: 'codelearn-mcp/package.json',
        code: `{
  "name": "codelearn-mcp",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "build": "tsc",
    "start": "node dist/server.js",
    "dev": "tsx server.ts"
  },
  "dependencies": {
    "@modelcontextprotocol/sdk": "^1.0.0",
    "zod": "^3.22.0"
  },
  "devDependencies": {
    "typescript": "^5.0.0",
    "tsx": "^4.0.0",
    "@types/node": "^20.0.0"
  }
}`,
      },
    ],
    questionBank: [
      {
        id: 'mcp-integration-q1',
        text: 'מה Adapter Pattern ב-MCP Integration?',
        options: [
          'שכתוב מלא של המערכת הקיימת',
          'MCP Server שעוטף API קיים ומתרגם קריאות MCP ל-HTTP — ללא שינוי המערכת המקורית',
          'הוספת MCP ישירות ל-Express',
          'שימוש ב-WebSocket במקום HTTP',
        ],
        correct: 1,
        explanation: 'Adapter Pattern = שכבת תרגום. MCP Server מקבל קריאות מ-Claude, מתרגם אותן לבקשות HTTP לAPI הקיים, ומחזיר תוצאות. הAPI המקורי לא יודע על MCP.',
      },
      {
        id: 'mcp-integration-q2',
        text: 'מה ההבדל בין MCP Server ל-Tool Use ישיר ב-Claude API?',
        options: [
          'אין הבדל',
          'MCP לחיבור כלים חיצוניים כמו Claude Desktop; Tool Use לבניית agents בקוד שלך',
          'MCP מהיר יותר',
          'Tool Use רק ל-Python',
        ],
        correct: 1,
        explanation: 'MCP Server = protocol לחיבור Claude Desktop/IDE לכלים חיצוניים. Tool Use = API feature לבניית agents בקוד שלך שקורא לClaudeAPI ישירות.',
      },
      {
        id: 'mcp-integration-q3',
        text: 'למה עדיף לעטוף API קיים ב-MCP במקום לכתוב מחדש?',
        options: [
          'MCP מהיר יותר',
          'שמירת לוגיקה עסקית קיימת, validations, אבטחה — ה-MCP Server הוא רק שכבת adapter',
          'קל יותר לתחזוקה',
          'חסכון בעלות',
        ],
        correct: 1,
        explanation: 'הAPI הקיים כבר כולל validation, rate limiting, auth, error handling. ה-MCP Server עוטף אותו ולא משכפל לוגיקה. שינוי ב-API — MCP Server לא צריך להשתנות.',
      },
      {
        id: 'mcp-integration-q4',
        text: 'מה z.string().uuid() עושה בהגדרת tool ב-MCP?',
        options: [
          'מגדיר שהפרמטר הוא מחרוזת UUID תקינה — Zod מוודא runtime ומייצר schema',
          'יוצר UUID חדש',
          'מצפין את הפרמטר',
          'מגדיר שם הפרמטר',
        ],
        correct: 0,
        explanation: 'z.string().uuid() = Zod validator שמאמת שהערך הוא UUID בפורמט תקין. גם מייצר JSON Schema שClaude משתמש בו לדעת מה לשלוח.',
      },
      {
        id: 'mcp-integration-q5',
        text: 'מה type: "module" ב-package.json עושה?',
        options: [
          'מגדיר שהפרויקט CommonJS',
          'מגדיר שהפרויקט משתמש ב-ES Modules (import/export) במקום CommonJS (require)',
          'מגביל גישה לmodule',
          'הגדרת גרסת node',
        ],
        correct: 1,
        explanation: '"type": "module" הופך את כל קבצי ה-.js ל-ES Modules. @modelcontextprotocol/sdk דורש ESM. ב-TypeScript צריך לוודא שהcompiler מייצר ES Modules.',
      },
      {
        id: 'mcp-integration-q6',
        text: 'איך עדיף להעביר API_URL ל-MCP Server?',
        options: [
          'hard-coded ב-source code',
          'משתנה סביבה — process.env.API_URL עם ברירת מחדל לdevelopment',
          'קובץ config.json',
          'command line argument',
        ],
        correct: 1,
        explanation: 'env var עם fallback: process.env.API_URL ?? "http://localhost:3001". בdev עובד ללא הגדרה. בprod מגדירים דרך claude_desktop_config.json תחת env.',
      },
      {
        id: 'mcp-integration-q7',
        text: 'מה Resource לעומת Tool מתאים להחזיר?',
        options: [
          'Resource לפעולות כתיבה, Tool לקריאה',
          'Resource למידע סטטי/תיעוד; Tool לפעולות דינמיות שדורשות פרמטרים',
          'אין הבדל',
          'Resource מהיר יותר',
        ],
        correct: 1,
        explanation: 'Resource = URI שניתן לקרוא (schema, docs, config). Tool = פעולה עם פרמטרים (query DB, call API). Claude בוחר את הכלי הנכון לפי הצורך.',
      },
      {
        id: 'mcp-integration-q8',
        text: 'מה היתרון של הוספת context ההערות ל-System Prompt לעומת Tool Use?',
        options: [
          'System Prompt מהיר יותר',
          'כשיודעים מראש מה המידע הרלוונטי — עדיף לטעון מראש. Tool Use מתאים כשClaude צריך להחליט מה לשלוף',
          'Tool Use יקר יותר',
          'System Prompt תומך בעברית טוב יותר',
        ],
        correct: 1,
        explanation: 'System Prompt עם context = פחות round-trips, פשוט יותר. Tool Use = גמיש, Claude מחליט מה צריך. לשאלות פשוטות עם context ידוע — System Prompt עדיף.',
      },
    ],
  },

  {
    id: 'csharp-modern',
    title: 'C# מודרני — כל החידושים',
    summary: 'Primary Constructors, Records, Pattern Matching, Collection Expressions ועוד — C# 12/13',
    emoji: '🔷',
    content: [
      { type: 'heading', text: 'Top-Level Statements, Global Usings & File-Scoped Namespaces' },
      {
        type: 'text',
        text: 'C# 10-12 הביאו פישוט דרמטי של ה-boilerplate. כיום Program.cs יכול להיות שורה אחת, using מוגדרים גלובלית, ו-namespace מוצהר בשורה אחת.',
      },
      {
        type: 'code',
        lang: 'csharp',
        caption: 'לפני (C# 9) ואחרי (C# 10+)',
        code: `// ─── לפני (C# 9) ─────────────────────────────────────────
using System;
using System.Collections.Generic;

namespace MyApp
{
    class Program
    {
        static async Task Main(string[] args)
        {
            Console.WriteLine("Hello");
        }
    }
}

// ─── אחרי (C# 10+) ────────────────────────────────────────
// GlobalUsings.cs — חל על כל הפרויקט
global using System.Text.Json;
global using Microsoft.AspNetCore.Builder;

// File-scoped namespace (ללא סוגריים):
namespace MyApp;

// Top-level statements — ישירות ב-Program.cs:
Console.WriteLine("Hello");
await DoWorkAsync();`,
      },
      { type: 'heading', text: 'Primary Constructors — C# 12' },
      {
        type: 'text',
        text: 'Primary Constructor מגדיר פרמטרים ישירות על ה-class/struct — ללא צורך ב-constructor body נפרד. הפרמטרים נגישים בכל הגוף של ה-class.',
      },
      {
        type: 'code',
        lang: 'csharp',
        caption: 'Primary Constructor — לפני ואחרי',
        code: `// ─── לפני (C# 11) ────────────────────────────────────────
public class AnthropicService
{
    private readonly HttpClient _http;
    private readonly string _apiKey;

    public AnthropicService(HttpClient http, string apiKey)
    {
        _http = http;
        _apiKey = apiKey;
    }

    public Task<string> AskAsync(string q) =>
        SendRequest(_http, _apiKey, q);
}

// ─── אחרי (C# 12) — Primary Constructor ───────────────────
public class AnthropicService(HttpClient http, string apiKey)
{
    // http ו-apiKey נגישים ישירות בכל הclass
    public Task<string> AskAsync(string q) =>
        SendRequest(http, apiKey, q);
}

// גם על record — קצר במיוחד:
public record NoteDto(int Id, string Content, DateTime CreatedAt);`,
      },
      { type: 'heading', text: 'Records — Immutability ו-Value Semantics' },
      {
        type: 'code',
        lang: 'csharp',
        caption: 'record, record struct, with expression',
        code: `// record class — immutable reference type
public record Message(string Role, string Content);

// record struct — immutable value type (stack allocated)
public readonly record struct Point(double X, double Y);

// with expression — יוצר עותק עם שינויים
var original = new Message("user", "מה זה SQL?");
var modified = original with { Content = "מה זה JOIN?" };

// Deconstruction — פירוק אוטומטי
var (role, content) = original;
Console.WriteLine(role);    // "user"
Console.WriteLine(content); // "מה זה SQL?"

// Equality — מבוסס על ערכים, לא reference
var m1 = new Message("user", "hello");
var m2 = new Message("user", "hello");
Console.WriteLine(m1 == m2); // true! (בclass רגיל היה false)

// שימוש מעשי — DTO לClaude API
public record ClaudeRequest(
    string Model,
    int MaxTokens,
    string? System,
    IReadOnlyList<Message> Messages
);`,
      },
      { type: 'heading', text: 'Pattern Matching — C# 8-12' },
      {
        type: 'code',
        lang: 'csharp',
        caption: 'switch expression, property pattern, list pattern',
        code: `// ─── Switch Expression (C# 8) ────────────────────────────
string GetModelTier(string model) => model switch
{
    var m when m.Contains("opus")   => "premium",
    var m when m.Contains("sonnet") => "standard",
    var m when m.Contains("haiku")  => "economy",
    _                               => "unknown",
};

// ─── Property Pattern (C# 8) ──────────────────────────────
string DescribeNote(NoteDto note) => note switch
{
    { Content.Length: 0 }         => "הערה ריקה",
    { Content.Length: < 50 }      => "הערה קצרה",
    { Content.Length: >= 50 }     => "הערה מפורטת",
};

// ─── Positional Pattern (C# 8) ────────────────────────────
bool IsOrigin(Point p) => p is (0, 0);

// ─── List Pattern (C# 11) ─────────────────────────────────
string DescribeList(int[] nums) => nums switch
{
    []          => "ריק",
    [var only]  => $"איבר יחיד: {only}",
    [var f, ..] => $"מתחיל ב-{f}",
};

// ─── Type Pattern + Guard (C# 9) ─────────────────────────
object ProcessResponse(object response) => response switch
{
    string s when s.Length > 0 => $"טקסט: {s}",
    int n when n > 0           => $"מספר חיובי: {n}",
    null                       => "null",
    _                          => "לא מוכר",
};`,
      },
      { type: 'heading', text: 'Collection Expressions — C# 12' },
      {
        type: 'code',
        lang: 'csharp',
        caption: 'תחביר [ ] אחיד לכל סוגי האוספים',
        code: `// ─── לפני (C# 11) ────────────────────────────────────────
var list1 = new List<string> { "sql", "javascript" };
var arr1  = new string[] { "a", "b", "c" };
var span1 = new Span<int>(new[] { 1, 2, 3 });

// ─── אחרי (C# 12) — Collection Expression ─────────────────
List<string>    list2 = ["sql", "javascript", "react"];
string[]        arr2  = ["a", "b", "c"];
Span<int>       span2 = [1, 2, 3];
ImmutableArray<int> imm = [1, 2, 3];

// Spread operator (..) — שרשור אוספים
string[] courses  = ["sql", "javascript"];
string[] more     = ["react", "typescript"];
string[] all      = [..courses, ..more, "devops"];
// ["sql", "javascript", "react", "typescript", "devops"]

// שימוש מעשי — בניית messages לClaude API
Message[] history =
[
    new("system", "אתה מורה לSQL"),
    new("user",   "מה זה JOIN?"),
];

Message[] withAnswer = [..history, new("assistant", "JOIN מחבר טבלאות...")];`,
      },
      { type: 'heading', text: 'Required Members & Init-Only — C# 11' },
      {
        type: 'code',
        lang: 'csharp',
        caption: 'required + init — אכיפת אתחול בזמן קומפילציה',
        code: `// required — חייב להיות מאותחל ב-object initializer
public class NoteCreateRequest
{
    public required string UserToken { get; init; }
    public required string CourseId  { get; init; }
    public required string LessonId  { get; init; }
    public required string Content   { get; init; }
    public DateTime CreatedAt { get; init; } = DateTime.UtcNow;
}

// ✓ תקין — כל required properties מאותחלים
var req = new NoteCreateRequest
{
    UserToken = "uuid-here",
    CourseId  = "sql",
    LessonId  = "sql-join",
    Content   = "JOIN מחבר טבלאות לפי מפתח",
};

// ✗ שגיאת קומפילציה — חסר UserToken
var bad = new NoteCreateRequest
{
    CourseId = "sql",
    // CS9035: Required member 'UserToken' must be set
};

// init — ניתן להגדיר רק בזמן אתחול, לא אחר כך
req.Content = "שינוי"; // ✗ CS8852: Init-only property`,
      },
      { type: 'heading', text: 'Nullable Reference Types — C# 8' },
      {
        type: 'code',
        lang: 'csharp',
        caption: 'null safety בזמן קומפילציה',
        code: `// הפעלה ב-csproj:
// <Nullable>enable</Nullable>

// ─── ללא nullable annotations ─────────────────────────────
string name = null; // ✗ Warning: cannot assign null

// ─── עם nullable (?) ──────────────────────────────────────
string? name = null;  // ✓ מפורש — nullable
string  req  = "hi";  // ✓ מובטח — not-null

// Null-forgiving operator (!) — "אני יודע שזה לא null"
string definitelySet = GetValue()!;

// Null-conditional + Null-coalescing
string? apiKey = Environment.GetEnvironmentVariable("API_KEY");
string key = apiKey ?? throw new InvalidOperationException("API_KEY not set");

int length = apiKey?.Length ?? 0;

// Pattern matching עם nulls
void Process(string? input)
{
    if (input is null) return;
    // כאן הקומפיילר יודע ש-input לא null
    Console.WriteLine(input.ToUpper());
}

// שימוש מעשי — תשובה מClaude API
public record ClaudeResponse(
    string Id,
    string? StopReason,    // nullable — עלול להיות null
    IReadOnlyList<ContentBlock> Content
);`,
      },
      { type: 'heading', text: 'Async/Await מתקדם — IAsyncEnumerable ו-ValueTask' },
      {
        type: 'code',
        lang: 'csharp',
        caption: 'Streaming תשובות מClaude עם IAsyncEnumerable',
        code: `using System.Runtime.CompilerServices;
using System.Text.Json;

// IAsyncEnumerable — streaming שמשתמש ב-yield
public async IAsyncEnumerable<string> StreamClaudeAsync(
    string question,
    [EnumeratorCancellation] CancellationToken ct = default)
{
    using var response = await _http.PostAsync(
        "https://api.anthropic.com/v1/messages",
        new StringContent(JsonSerializer.Serialize(new
        {
            model = "claude-opus-4-5",
            max_tokens = 1024,
            stream = true,
            messages = new[] { new { role = "user", content = question } }
        })),
        ct);

    await foreach (var line in ReadLinesAsync(response.Content, ct))
    {
        if (!line.StartsWith("data: ")) continue;
        var json = JsonDocument.Parse(line[6..]);
        var type = json.RootElement.GetProperty("type").GetString();

        if (type == "content_block_delta")
        {
            var text = json.RootElement
                .GetProperty("delta")
                .GetProperty("text")
                .GetString();
            if (text is not null) yield return text;
        }
    }
}

// צריכת ה-stream ב-controller:
[HttpGet("stream")]
public async IAsyncEnumerable<string> Stream(string question)
{
    await foreach (var chunk in _aiService.StreamClaudeAsync(question))
    {
        yield return chunk;
    }
}

// ValueTask — לפעולות שלרוב סינכרוניות (cache hit)
public ValueTask<string?> GetCachedNoteAsync(int id)
{
    if (_cache.TryGetValue(id, out var note))
        return ValueTask.FromResult<string?>(note); // ללא async overhead

    return new ValueTask<string?>(FetchFromDbAsync(id)); // async רק כשצריך
}`,
      },
      { type: 'heading', text: 'LINQ מודרני — C# 9-12' },
      {
        type: 'code',
        lang: 'csharp',
        caption: 'Chunk, DistinctBy, MinBy, MaxBy, Index — חידושי LINQ',
        code: `var notes = await GetAllNotesAsync();

// ─── Chunk (C# 6+ / .NET 6) ───────────────────────────────
// חלוקה לקבוצות — שימושי לbatch processing עם LLM
foreach (var batch in notes.Chunk(10))
{
    await ProcessBatchWithAiAsync(batch); // 10 הערות בכל קריאה
}

// ─── DistinctBy (.NET 6) ──────────────────────────────────
var uniqueCourses = notes.DistinctBy(n => n.CourseId).ToList();

// ─── MinBy / MaxBy (.NET 6) ───────────────────────────────
var oldest = notes.MinBy(n => n.CreatedAt);
var newest = notes.MaxBy(n => n.CreatedAt);

// ─── Index (.NET 9) ───────────────────────────────────────
foreach (var (index, note) in notes.Index())
{
    Console.WriteLine($"{index + 1}. {note.Content}");
}

// ─── CountBy (.NET 9) ─────────────────────────────────────
var notesPerCourse = notes.CountBy(n => n.CourseId);
// [("sql", 12), ("javascript", 8), ...]

// ─── LINQ + Pattern Matching ──────────────────────────────
var longNotes = notes
    .Where(n => n is { Content.Length: > 200 })
    .OrderByDescending(n => n.CreatedAt)
    .Take(5)
    .Select(n => n with { Content = n.Content[..100] + "..." });`,
      },
      {
        type: 'tip',
        text: 'C# 13 (.NET 9) הוסיף: params Collections (params IEnumerable<T>), Lock type חדש, partial properties, ו-ref/unsafe ב-async. השדרוג הגדול הבא הוא C# 14 עם Extensions.',
      },
    ],
    questionBank: [
      {
        id: 'csharp-modern-q1',
        text: 'מה Primary Constructor עושה ב-C# 12?',
        options: [
          'מגדיר constructor פרטי',
          'מאפשר הגדרת פרמטרים ישירות על ה-class — נגישים בכל הגוף ללא שדות נוספים',
          'מחליף את ה-Main method',
          'מגדיר constructor ראשי לירושה',
        ],
        correct: 1,
        explanation: 'Primary Constructor: class Service(HttpClient http) מגדיר פרמטר http שנגיש בכל ה-class. חוסך את כל ה-boilerplate של שדה פרטי + constructor body.',
      },
      {
        id: 'csharp-modern-q2',
        text: 'מה with expression עושה ב-record?',
        options: [
          'משנה את ה-record המקורי',
          'יוצר עותק חדש של ה-record עם שינויים בשדות שצוינו — המקורי נשאר ללא שינוי',
          'ממזג שני records',
          'ממיר record לclass',
        ],
        correct: 1,
        explanation: 'var updated = original with { Content = "חדש" } יוצר עותק חדש עם Content ששונה — שאר השדות מועתקים. Records הם immutable — לא ניתן לשנות אותם.',
      },
      {
        id: 'csharp-modern-q3',
        text: 'מה spread operator (..) עושה ב-Collection Expressions?',
        options: [
          'מחלק אוסף לשניים',
          'משרשר אוספים: [..arr1, ..arr2] יוצר אוסף חדש עם כל האיברים',
          'מספק range של אינדקסים',
          'מאפשר destructuring',
        ],
        correct: 1,
        explanation: '[..courses, ..more, "devops"] שקול ל-courses.Concat(more).Append("devops"). עובד על List, Array, Span ועוד — בתחביר אחיד.',
      },
      {
        id: 'csharp-modern-q4',
        text: 'מה required modifier עושה על property?',
        options: [
          'הופך לprivate',
          'אוכף שה-property חייב להיות מאותחל ב-object initializer — שגיאת קומפילציה אחרת',
          'הופך ל-readonly',
          'מגדיר ברירת מחדל',
        ],
        correct: 1,
        explanation: 'required = אכיפה בזמן קומפילציה. אם תשכח לאתחל required property ב-new MyClass { ... }, תקבל CS9035. עדיף על בדיקות null בruntime.',
      },
      {
        id: 'csharp-modern-q5',
        text: 'מה IAsyncEnumerable<T> מאפשר?',
        options: [
          'iteration אסינכרוני — כל איבר מגיע async עם await foreach',
          'LINQ על async collections',
          'parallel iteration',
          'infinite lists',
        ],
        correct: 0,
        explanation: 'IAsyncEnumerable<T> + await foreach = streaming נתונים. מושלם לstreaming תשובות מLLM — כל chunk מגיע מיד כשClaude מייצר אותו.',
      },
      {
        id: 'csharp-modern-q6',
        text: 'מה היתרון של ValueTask על Task?',
        options: [
          'ValueTask מהיר יותר תמיד',
          'ValueTask מתאים לפעולות שלרוב מסתיימות סינכרונית (cache hit) — חוסך allocation',
          'ValueTask תומך בcancellation',
          'ValueTask מאפשר multiple await',
        ],
        correct: 1,
        explanation: 'Task תמיד allocates heap object. ValueTask יכול לחזור synchronously ללא allocation. מתאים לcache lookups, reads שלרוב מוכנים מיד.',
      },
      {
        id: 'csharp-modern-q7',
        text: 'מה List Pattern עושה ב-C# 11?',
        options: [
          'ממיר List לarray',
          'מאפשר pattern matching על collections: [] ריק, [x] איבר יחיד, [x, ..] מתחיל ב-x',
          'מגדיר list literal',
          'מחפש בlist',
        ],
        correct: 1,
        explanation: 'nums switch { [] => "ריק", [var x] => $"יחיד: {x}", [var f, var s, ..] => $"מתחיל ב-{f},{s}" } — pattern matching מלא על גודל ותוכן האוסף.',
      },
      {
        id: 'csharp-modern-q8',
        text: 'מה Chunk() עושה ב-LINQ (.NET 6)?',
        options: [
          'חותך string',
          'מחלק IEnumerable לקבוצות בגודל קבוע — שימושי לbatch processing',
          'מפצל לשניים שווים',
          'מקבץ לפי key',
        ],
        correct: 1,
        explanation: 'notes.Chunk(10) מחזיר IEnumerable<T[]> — כל קבוצה עם עד 10 איברים. שימושי מאוד לשליחת batches ל-LLM API כדי לא לחרוג מmax_tokens.',
      },
    ],
  },
]
