import type { Lesson } from '../../types'

export const csharpLessons: Lesson[] = [
  // ─── שיעור 1 ───────────────────────────────────────────────────────────────
  {
    id: 'csharp-language',
    title: 'תכונות שפה — C# 10-13',
    summary: 'כל החידושים בשפה: Primary Constructors, Records, Pattern Matching, Collection Expressions ועוד',
    emoji: '🔷',
    content: [
      { type: 'heading', text: 'Top-Level Statements, Global Usings, File-Scoped Namespace' },
      {
        type: 'code',
        lang: 'csharp',
        caption: 'C# 10 — ביטול boilerplate',
        code: `// GlobalUsings.cs — חל על כל הפרויקט
global using System.Text.Json;
global using Microsoft.AspNetCore.Builder;
global using Microsoft.Extensions.DependencyInjection;

// File-scoped namespace — שורה אחת, ללא סוגריים
namespace MyApp.Services;

// Top-level statements — Program.cs ללא class/Main
var builder = WebApplication.CreateBuilder(args);
builder.Services.AddSingleton<NoteService>();
var app = builder.Build();
app.MapGet("/", () => "CodeLearn API");
app.Run();`,
      },
      { type: 'heading', text: 'Primary Constructors — C# 12' },
      {
        type: 'code',
        lang: 'csharp',
        caption: 'פרמטרים ישירות על ה-class ללא boilerplate',
        code: `// לפני C# 12
public class NoteService
{
    private readonly NoteRepository _repo;
    private readonly ILogger<NoteService> _log;
    public NoteService(NoteRepository repo, ILogger<NoteService> log)
    { _repo = repo; _log = log; }
}

// C# 12 — Primary Constructor
public class NoteService(NoteRepository repo, ILogger<NoteService> log)
{
    public async Task<Note[]> GetAsync(string userId) =>
        await repo.FindAsync(userId); // repo נגיש ישירות

    public void Log(string msg) => log.LogInformation(msg);
}

// גם על structs ו-interfaces:
public interface IParser<T>(string Format);
public readonly struct Point(double X, double Y)
{
    public double Distance => Math.Sqrt(X * X + Y * Y);
}`,
      },
      { type: 'heading', text: 'Records — Value Semantics ו-Immutability' },
      {
        type: 'code',
        lang: 'csharp',
        caption: 'record, record struct, with, deconstruct',
        code: `// record class — immutable reference type, equality by value
public record NoteDto(int Id, string Content, DateTimeOffset CreatedAt);

// record struct — value type (stack), C# 10
public readonly record struct Coordinates(double Lat, double Lng);

// with — non-destructive mutation
var original = new NoteDto(1, "JOIN מחבר טבלאות", DateTimeOffset.UtcNow);
var updated  = original with { Content = "LEFT JOIN שומר שורות ריקות" };

// Deconstruction אוטומטי
var (id, content, date) = original;

// Equality by value (לא reference!)
var a = new NoteDto(1, "hello", DateTimeOffset.MinValue);
var b = new NoteDto(1, "hello", DateTimeOffset.MinValue);
Console.WriteLine(a == b); // true

// Inheritance ב-records
public record Entity(int Id, DateTimeOffset CreatedAt);
public record Note(int Id, DateTimeOffset CreatedAt, string Content)
    : Entity(Id, CreatedAt);`,
      },
      { type: 'heading', text: 'Pattern Matching — C# 8-13' },
      {
        type: 'code',
        lang: 'csharp',
        caption: 'switch expression, list pattern, property pattern',
        code: `// Switch Expression (C# 8)
string Tier(string model) => model switch
{
    var m when m.Contains("opus")   => "premium",
    var m when m.Contains("sonnet") => "standard",
    var m when m.Contains("haiku")  => "economy",
    _                               => throw new ArgumentException(model),
};

// Property Pattern (C# 8) — nested
string Describe(NoteDto n) => n switch
{
    { Content.Length: 0 }          => "ריקה",
    { Content.Length: < 100 }      => "קצרה",
    { CreatedAt.Year: 2024 }       => "מ-2024",
    _                              => "רגילה",
};

// List Pattern (C# 11)
string DescribeList<T>(IList<T> list) => list switch
{
    []              => "ריק",
    [var only]      => $"איבר יחיד",
    [var f, var s]  => $"שניים",
    [var f, ..]     => $"מתחיל ב-{f}",
};

// Type Pattern + Guard
decimal Discount(object customer) => customer switch
{
    Student { GPA: >= 3.5 }     => 0.30m,
    Student                      => 0.15m,
    Employee { YearsWorked: > 5} => 0.20m,
    _                            => 0m,
};`,
      },
      { type: 'heading', text: 'Collection Expressions & Spread — C# 12' },
      {
        type: 'code',
        lang: 'csharp',
        caption: 'תחביר [ ] אחיד + spread operator',
        code: `// תחביר אחיד לכל סוגי האוספים
int[]            arr  = [1, 2, 3];
List<string>     list = ["sql", "react"];
Span<byte>       span = [0x48, 0x65, 0x6C];
ImmutableArray<int> im = [10, 20, 30];

// Spread (..) — שרשור
string[] backend  = ["sql", "csharp", "devops"];
string[] frontend = ["react", "typescript"];
string[] all      = [..backend, ..frontend, "cloud"];

// שימוש ב-Dictionary
Dictionary<string, int> scores = new()
{
    ["sql"]        = 90,
    ["javascript"] = 85,
};`,
      },
      { type: 'heading', text: 'Required, Init-Only & Raw String Literals' },
      {
        type: 'code',
        lang: 'csharp',
        caption: 'required, init, """ Raw Strings """',
        code: `// required — אכיפת אתחול בקומפילציה (C# 11)
public class CreateNoteRequest
{
    public required string UserToken { get; init; }
    public required string CourseId  { get; init; }
    public required string Content   { get; init; }
    public DateTimeOffset CreatedAt  { get; init; } = DateTimeOffset.UtcNow;
}

// ✓ תקין
var req = new CreateNoteRequest
{
    UserToken = "uuid",
    CourseId  = "sql",
    Content   = "JOIN...",
};

// ✗ CS9035 — חסר UserToken
var bad = new CreateNoteRequest { CourseId = "sql" };

// Raw String Literals (C# 11) — ללא escape
string sql = """
    SELECT id, content, created_at
    FROM notes
    WHERE user_token = @token
      AND course_id  = @courseId
    ORDER BY created_at DESC
    LIMIT 20
    """;

// עם interpolation:
string json = $"""
    {{ "courseId": "{courseId}", "lessonId": "{lessonId}" }}
    """;`,
      },
      {
        type: 'tip',
        text: 'C# 13 (.NET 9) חידושים: params IEnumerable<T>, System.Threading.Lock חדש (עדיף על lock{}), partial properties, ו-\\e escape sequence לESC character.',
      },
    ],
    questionBank: [
      {
        id: 'csharp-lang-q1',
        text: 'מה global using עושה?',
        options: [
          'מייבא namespace לקובץ אחד בלבד',
          'מייבא namespace לכל קבצי הפרויקט — ללא צורך לחזור ב-using בכל קובץ',
          'מגדיר alias',
          'מוחק namespace',
        ],
        correct: 1,
        explanation: 'global using System.Text.Json בקובץ אחד = כל קבצי הפרויקט יכולים להשתמש ב-JsonSerializer ללא using נוסף. מצוין ל-SDK נפוצים.',
      },
      {
        id: 'csharp-lang-q2',
        text: 'מה היתרון של record על class רגיל?',
        options: [
          'record מהיר יותר',
          'record מספק equality by value, with expression, ו-deconstruction אוטומטיים',
          'record תומך בירושה',
          'record לא צריך constructor',
        ],
        correct: 1,
        explanation: 'record: (1) a == b בודק ערכים לא reference, (2) with { Prop = x } יוצר עותק, (3) var (x, y) = record מפרק אוטומטית. class צריך לממש הכל ידנית.',
      },
      {
        id: 'csharp-lang-q3',
        text: 'מה spread operator (..) עושה ב-Collection Expressions?',
        options: [
          'מחלק אוסף לחלקים',
          'משרשר תוכן אוסף לתוך אוסף חדש: [..arr1, ..arr2]',
          'מגדיר טווח אינדקסים',
          'מבצע destructuring',
        ],
        correct: 1,
        explanation: '[..a, ..b, "extra"] = כל איברי a + כל איברי b + "extra" באוסף חדש. עובד על List, Array, Span ועוד בתחביר אחיד.',
      },
      {
        id: 'csharp-lang-q4',
        text: 'מה List Pattern [var f, ..] בודק?',
        options: [
          'שהאוסף ריק',
          'שהאוסף מכיל בדיוק איבר אחד',
          'שהאוסף מכיל לפחות איבר אחד — f הוא האיבר הראשון, .. שאר האוסף',
          'שכל האיברים שווים',
        ],
        correct: 2,
        explanation: '[var f, ..] = האוסף לא ריק, f = הראשון, .. = כל השאר (כמו params). [var f, var s, ..] = לפחות שניים. [] = בדיוק ריק.',
      },
      {
        id: 'csharp-lang-q5',
        text: 'מה init accessor שונה מ-set?',
        options: [
          'init מהיר יותר',
          'init ניתן להגדיר רק בזמן object initialization — לא ניתן לשנות אחר כך',
          'init פרטי, set ציבורי',
          'אין הבדל',
        ],
        correct: 1,
        explanation: 'init = write-once: ניתן להגדיר ב-new MyClass { Prop = x } אבל לא אחר כך. מאפשר immutability אמיתית בלי לוותר על object initializer syntax.',
      },
      {
        id: 'csharp-lang-q6',
        text: 'מה Raw String Literal (""") פותר?',
        options: [
          'ביצועים של strings',
          'הצורך ב-escape characters — כותבים JSON, SQL, HTML כמו שהם ללא \\ ו-\\n',
          'תמיכה בעברית',
          'string compression',
        ],
        correct: 1,
        explanation: '""" מאפשר כתיבת strings מרובות שורות עם " בתוכן ללא escape. מושלם ל-SQL queries, JSON templates, HTML snippets.',
      },
      {
        id: 'csharp-lang-q7',
        text: 'מה required modifier מבטיח?',
        options: [
          'שה-property לא null בruntime',
          'שגיאת קומפילציה אם לא אותחל ב-object initializer — אכיפה סטטית',
          'שה-property חייב להיות public',
          'שה-property הוא virtual',
        ],
        correct: 1,
        explanation: 'required = CS9035 בזמן קומפילציה אם לא סופק ב-new MyClass { RequiredProp = x }. עדיף על ArgumentNullException שמגיע רק בruntime.',
      },
      {
        id: 'csharp-lang-q8',
        text: 'מה Primary Constructor חוסך לעומת constructor רגיל?',
        options: [
          'חוסך את כל הלוגיקה',
          'חוסך הגדרת שדות פרטיים + assignment ב-constructor body — הפרמטרים נגישים ישירות',
          'חוסך DI registration',
          'חוסך interface implementation',
        ],
        correct: 1,
        explanation: 'class Svc(Repo repo) = ללא private readonly Repo _repo; ו-constructor body עם _repo = repo. הפרמטר repo נגיש ישירות בכל המחלקה.',
      },
    ],
  },

  // ─── שיעור 2 ───────────────────────────────────────────────────────────────
  {
    id: 'csharp-async-linq',
    title: 'Async, LINQ ו-Functional Patterns',
    summary: 'Task, ValueTask, IAsyncEnumerable, CancellationToken, LINQ חדש ו-Functional C#',
    emoji: '⚡',
    content: [
      { type: 'heading', text: 'async/await — כללי זהב' },
      {
        type: 'code',
        lang: 'csharp',
        caption: 'Async Best Practices',
        code: `// ✓ ConfigureAwait(false) בספריות — מונע deadlocks
public async Task<Note[]> GetNotesAsync(string userId, CancellationToken ct = default)
{
    var results = await _db.Notes
        .Where(n => n.UserId == userId)
        .ToListAsync(ct)
        .ConfigureAwait(false);
    return [..results];
}

// ✗ async void — לעולם לא! (חוץ מevent handlers)
// public async void Load() { ... } — exceptions נאבדות!

// ✓ Task.WhenAll — מקביליות
var (notes, progress) = await (
    GetNotesAsync(userId, ct),
    GetProgressAsync(userId, ct)
).WhenAll(); // C# sugar

// ידנית:
var t1 = GetNotesAsync(userId, ct);
var t2 = GetProgressAsync(userId, ct);
await Task.WhenAll(t1, t2);
var notes    = await t1;
var progress = await t2;

// ✓ Task.WhenAny — race — הראשון שמסיים
var fastest = await Task.WhenAny(
    FetchFromCache(key, ct),
    FetchFromDb(key, ct)
);
return await fastest;`,
      },
      { type: 'heading', text: 'CancellationToken — ביטול מדויק' },
      {
        type: 'code',
        lang: 'csharp',
        caption: 'CancellationToken בכל שכבה',
        code: `// Controller — ASP.NET Core מזריק אוטומטית
[HttpGet("notes")]
public async Task<IActionResult> GetNotes(
    string userId,
    CancellationToken ct)  // ← ה-framework מבטל כשהלקוח מנתק
{
    var notes = await _service.GetNotesAsync(userId, ct);
    return Ok(notes);
}

// Service — מעביר הלאה
public async Task<Note[]> GetNotesAsync(string userId, CancellationToken ct)
{
    ct.ThrowIfCancellationRequested();
    return await _repo.FindAsync(userId, ct);
}

// יצירת token עצמאי עם timeout
using var cts = new CancellationTokenSource(TimeSpan.FromSeconds(10));
var notes = await _service.GetNotesAsync(userId, cts.Token);

// שרשור tokens
using var linked = CancellationTokenSource.CreateLinkedTokenSource(
    requestCt, manualCt);
await DoWorkAsync(linked.Token);`,
      },
      { type: 'heading', text: 'ValueTask — חיסכון ב-Allocation' },
      {
        type: 'code',
        lang: 'csharp',
        caption: 'ValueTask לפעולות שלרוב סינכרוניות',
        code: `// Task תמיד מקצה Heap object — גם כשהתוצאה מוכנה מיד
public async Task<string?> GetCached_BAD(string key)
{
    if (_cache.TryGetValue(key, out var val)) return val; // מקצה Task מיותר!
    return await _db.GetAsync(key);
}

// ValueTask — ללא allocation כשהערך מוכן
public ValueTask<string?> GetCached(string key)
{
    if (_cache.TryGetValue(key, out var val))
        return ValueTask.FromResult<string?>(val); // zero allocation

    return new ValueTask<string?>(FetchAndCacheAsync(key));
}

private async Task<string?> FetchAndCacheAsync(string key)
{
    var val = await _db.GetAsync(key);
    _cache[key] = val;
    return val;
}

// חשוב: ValueTask ניתן ל-await רק פעם אחת!
var vt = GetCached("key");
var r1 = await vt; // ✓
var r2 = await vt; // ✗ undefined behavior`,
      },
      { type: 'heading', text: 'IAsyncEnumerable — Streaming נתונים' },
      {
        type: 'code',
        lang: 'csharp',
        caption: 'yield return באסינכרוניות',
        code: `// מחזיר נתונים אחד-אחד ללא טעינת הכל לזיכרון
public async IAsyncEnumerable<Note> StreamUserNotesAsync(
    string userId,
    [EnumeratorCancellation] CancellationToken ct = default)
{
    await foreach (var note in _db.Notes
        .Where(n => n.UserId == userId)
        .AsAsyncEnumerable()
        .WithCancellation(ct))
    {
        yield return note; // שולח מיד כשמוכן
    }
}

// Streaming תשובות מ-LLM (Claude API)
public async IAsyncEnumerable<string> StreamAiAsync(
    string prompt,
    [EnumeratorCancellation] CancellationToken ct = default)
{
    using var response = await _http.PostAsync("/v1/messages", ..., ct);
    await foreach (var line in ReadSseAsync(response, ct))
    {
        if (line.StartsWith("data: "))
            yield return ParseChunk(line[6..]);
    }
}

// צריכה ב-controller עם Server-Sent Events
[HttpGet("stream")]
public async IAsyncEnumerable<string> Stream(string prompt,
    [EnumeratorCancellation] CancellationToken ct)
{
    await foreach (var chunk in _ai.StreamAiAsync(prompt, ct))
        yield return chunk;
}`,
      },
      { type: 'heading', text: 'LINQ חידושים — .NET 6-9' },
      {
        type: 'code',
        lang: 'csharp',
        caption: 'Chunk, DistinctBy, CountBy, Index, AggregateBy',
        code: `var notes = await _db.Notes.ToListAsync();

// Chunk (.NET 6) — batch processing
foreach (var batch in notes.Chunk(10))
    await SendBatchToAiAsync(batch);

// DistinctBy (.NET 6) — distinct לפי key
var uniqueAuthors = notes.DistinctBy(n => n.UserId);

// MinBy / MaxBy (.NET 6)
var oldest = notes.MinBy(n => n.CreatedAt);
var newest = notes.MaxBy(n => n.CreatedAt);

// Index (.NET 9) — enumeration עם אינדקס
foreach (var (i, note) in notes.Index())
    Console.WriteLine($"{i + 1}. {note.Content}");

// CountBy (.NET 9) — ספירה לפי key
var perCourse = notes.CountBy(n => n.CourseId);
// [("sql", 12), ("react", 8)]

// AggregateBy (.NET 9) — aggregate לפי key
var avgLengthByCourse = notes.AggregateBy(
    n => n.CourseId,
    seed: (count: 0, total: 0),
    (acc, n) => (acc.count + 1, acc.total + n.Content.Length))
  .Select(kv => (kv.Key, Avg: (double)kv.Value.total / kv.Value.count));

// Zip שלישי (.NET 6)
var zipped = names.Zip(scores, dates);

// Order / OrderDescending (.NET 7) — ללא lambda
var sorted = notes.Order(); // Comparable
var desc   = notes.OrderDescending();`,
      },
      { type: 'heading', text: 'Functional Patterns — Pipeline ו-Option' },
      {
        type: 'code',
        lang: 'csharp',
        caption: 'Result type, Maybe pattern, מתודות שרשרת',
        code: `// Result<T> — שגיאות כערכים, לא exceptions
public readonly record struct Result<T>(T? Value, string? Error)
{
    public bool IsSuccess => Error is null;
    public static Result<T> Ok(T value)    => new(value, null);
    public static Result<T> Fail(string e) => new(default, e);
}

// שימוש — ללא try/catch
public async Task<Result<Note>> CreateNoteAsync(CreateNoteRequest req)
{
    if (string.IsNullOrEmpty(req.Content))
        return Result<Note>.Fail("תוכן ריק");

    if (req.Content.Length > 5000)
        return Result<Note>.Fail("תוכן ארוך מדי");

    var note = await _repo.InsertAsync(req);
    return Result<Note>.Ok(note);
}

// LINQ-style chaining על Result
var result = await CreateNoteAsync(req);
var message = result switch
{
    { IsSuccess: true, Value: var note } => $"נשמר: {note.Id}",
    { Error: var err }                   => $"שגיאה: {err}",
};`,
      },
    ],
    questionBank: [
      {
        id: 'async-linq-q1',
        text: 'למה יש להימנע מ-async void?',
        options: [
          'זה איטי יותר',
          'Exceptions שנזרקות ב-async void לא ניתנות לתפיסה — האפליקציה קורסת בשקט',
          'זה deprecated',
          'זה עובד רק ב-console apps',
        ],
        correct: 1,
        explanation: 'ב-async Task אפשר לתפוס exceptions. ב-async void הן עולות ל-SynchronizationContext ולרוב קורסות את ה-process. מותר רק ב-event handlers.',
      },
      {
        id: 'async-linq-q2',
        text: 'מתי עדיף ValueTask על Task?',
        options: [
          'תמיד',
          'כשפעולה לרוב מסתיימת סינכרונית (cache hit, buffer ready) — חוסך heap allocation',
          'כשצריך await מרובה',
          'כשמשתמשים ב-ConfigureAwait',
        ],
        correct: 1,
        explanation: 'ValueTask = zero allocation כשהערך מוכן מיד (FromResult). Task תמיד מקצה. חשוב: ValueTask ניתן ל-await רק פעם אחת.',
      },
      {
        id: 'async-linq-q3',
        text: 'מה IAsyncEnumerable<T> מאפשר שTask<List<T>> לא?',
        options: [
          'ביצועים טובים יותר',
          'החזרת פריטים אחד-אחד ברגע שמוכנים — ללא המתנה לסיום כל הנתונים',
          'תמיכה בcancellation',
          'concurrent access',
        ],
        correct: 1,
        explanation: 'IAsyncEnumerable + yield return = streaming. צד המקבל מקבל כל פריט מיד. Task<List<T>> מחכה עד שכל הנתונים מוכנים לפני שמחזיר.',
      },
      {
        id: 'async-linq-q4',
        text: 'מה Task.WhenAll vs Task.WhenAny?',
        options: [
          'אין הבדל',
          'WhenAll מחכה לכל ה-tasks; WhenAny מחכה לראשון שמסיים',
          'WhenAll מהיר יותר',
          'WhenAny מבטל את השאר',
        ],
        correct: 1,
        explanation: 'WhenAll = מקביליות, מחכה לכולם. WhenAny = race pattern — מחזיר מיד כשהראשון מסיים. לשניהם: exceptions נאספות ונזרקות יחד.',
      },
      {
        id: 'async-linq-q5',
        text: 'מה Chunk() עושה ב-LINQ?',
        options: [
          'חותך string',
          'מחלק IEnumerable לקבוצות בגודל קבוע',
          'מסנן ערכים',
          'ממיין',
        ],
        correct: 1,
        explanation: 'notes.Chunk(10) → IEnumerable<Note[]> עם קבוצות של עד 10. מושלם לbatch processing — שליחת 10 הערות בכל קריאה לAI API.',
      },
      {
        id: 'async-linq-q6',
        text: 'מה CountBy() (.NET 9) עושה?',
        options: [
          'סופר כמה פעמים כל ערך מופיע לפי key',
          'מוסיף index לכל איבר',
          'ממיין לפי מספר',
          'מחזיר distinct count',
        ],
        correct: 0,
        explanation: 'notes.CountBy(n => n.CourseId) → [("sql", 12), ("react", 8)]. שקול ל-GroupBy().Select(g => (g.Key, g.Count())) אבל יעיל יותר.',
      },
      {
        id: 'async-linq-q7',
        text: 'מה ConfigureAwait(false) עושה?',
        options: [
          'מבטל את ה-await',
          'מונע capture של SynchronizationContext — חשוב בספריות למניעת deadlocks',
          'מוסיף timeout',
          'מאפשר await מרובה',
        ],
        correct: 1,
        explanation: 'ב-UI/ASP.NET יש SynchronizationContext. ב-await ללא ConfigureAwait המשך הקוד חוזר לContext המקורי — עלול לגרום deadlock. בספריות: תמיד ConfigureAwait(false).',
      },
      {
        id: 'async-linq-q8',
        text: 'מה היתרון של Result<T> לעומת exceptions?',
        options: [
          'מהיר יותר',
          'שגיאות הן חלק מה-type system — הקורא חייב לטפל בהן, ולא יכול לשכוח',
          'קל יותר לקרוא',
          'תומך ב-async',
        ],
        correct: 1,
        explanation: 'Result<T> = שגיאה כערך. הקורא מוכרח להתמודד עם IsSuccess/Error. Exception יכול "לברוח" ולא להיות מטופל. Result נפוץ בFunctional Programming.',
      },
    ],
  },

  // ─── שיעור 3 ───────────────────────────────────────────────────────────────
  {
    id: 'csharp-performance',
    title: 'ביצועים — Span, Memory ו-Native AOT',
    summary: 'Span<T>, Memory<T>, ArrayPool, Unsafe, Source Generators ו-Native AOT',
    emoji: '🚀',
    content: [
      { type: 'heading', text: 'Span<T> — עבודה ללא Allocation' },
      {
        type: 'text',
        text: 'Span<T> הוא struct שמייצג view על זיכרון רציף — מערך, stack, unmanaged. עבודה עם Span לא מקצה heap ולכן מהירה ולא לוחצת על GC.',
      },
      {
        type: 'code',
        lang: 'csharp',
        caption: 'Span<T> — slicing ופרסינג ללא allocation',
        code: `// פרסינג string ללא יצירת substrings
ReadOnlySpan<char> ParseCourseId(ReadOnlySpan<char> input)
{
    var idx = input.IndexOf('/');
    return idx >= 0 ? input[..idx] : input;
}

// קריאה:
var courseId = ParseCourseId("sql/lesson-1"); // אין allocation!

// StackAlloc — מערך על ה-stack (עד ~1KB)
Span<int> buffer = stackalloc int[128];
for (int i = 0; i < buffer.Length; i++)
    buffer[i] = i * 2;

// Span על מערך קיים
int[] arr = [1, 2, 3, 4, 5];
var slice = arr.AsSpan(1, 3); // {2, 3, 4} — ללא העתקה
slice[0] = 99; // משנה את arr[1] !

// int.TryParse עם Span (ללא boxing)
ReadOnlySpan<char> numStr = "42";
if (int.TryParse(numStr, out int value))
    Console.WriteLine(value);`,
      },
      { type: 'heading', text: 'Memory<T> — Async-safe Span' },
      {
        type: 'code',
        lang: 'csharp',
        caption: 'Memory<T> לעבודה async',
        code: `// Span לא עובר דרך await — Memory כן
public async Task ProcessChunksAsync(Memory<byte> data, CancellationToken ct)
{
    int offset = 0;
    while (offset < data.Length)
    {
        var chunk = data.Slice(offset, Math.Min(4096, data.Length - offset));
        await _stream.WriteAsync(chunk, ct); // Memory עובר ל-async
        offset += chunk.Length;
    }
}

// ArrayPool — שימוש חוזר במערכים
using System.Buffers;

public async Task<string> ReadResponseAsync(HttpResponseMessage res)
{
    var buffer = ArrayPool<byte>.Shared.Rent(8192); // שאל מהpool
    try
    {
        var mem = buffer.AsMemory();
        var read = await res.Content.ReadAsByteArrayAsync();
        return Encoding.UTF8.GetString(read);
    }
    finally
    {
        ArrayPool<byte>.Shared.Return(buffer); // החזר לpool
    }
}`,
      },
      { type: 'heading', text: 'Source Generators — קוד שנוצר בזמן קומפילציה' },
      {
        type: 'code',
        lang: 'csharp',
        caption: 'JsonSerializerContext, LoggerMessage',
        code: `// ─── JsonSourceGeneration — JSON ללא reflection ────────────
[JsonSerializable(typeof(NoteDto))]
[JsonSerializable(typeof(CreateNoteRequest))]
[JsonSerializable(typeof(List<NoteDto>))]
internal partial class AppJsonContext : JsonSerializerContext { }

// שימוש — יותר מהיר ותואם ל-Native AOT
var json = JsonSerializer.Serialize(note, AppJsonContext.Default.NoteDto);
var dto  = JsonSerializer.Deserialize(json, AppJsonContext.Default.NoteDto);

// ─── LoggerMessage — Logging מבוסס Source Generator ─────────
public partial class NoteService(ILogger<NoteService> logger)
{
    [LoggerMessage(Level = LogLevel.Information, Message = "Note saved: {NoteId}")]
    private partial void LogNoteSaved(int noteId);

    [LoggerMessage(Level = LogLevel.Error, Message = "Failed to save note for {UserId}")]
    private partial void LogSaveFailed(string userId);

    public async Task SaveAsync(CreateNoteRequest req)
    {
        var note = await _repo.InsertAsync(req);
        LogNoteSaved(note.Id); // מהיר מ-logger.LogInformation()
    }
}`,
      },
      { type: 'heading', text: 'Native AOT — .NET 8' },
      {
        type: 'code',
        lang: 'csharp',
        caption: 'Native AOT — binary מהיר ללא JIT',
        code: `// csproj — הפעלת Native AOT
<PropertyGroup>
    <PublishAot>true</PublishAot>
    <InvariantGlobalization>true</InvariantGlobalization>
</PropertyGroup>

// publish:
// dotnet publish -r linux-x64 -c Release
// → binary עצמאי, ~10MB, startup < 10ms

// הגבלות Native AOT:
// ✗ Reflection (המשתמש ב-GetType().GetMethods() וכו')
// ✗ dynamic
// ✗ Assembly.Load בruntime
// ✓ Source Generators (JsonSourceGeneration, LoggerMessage)
// ✓ Minimal API
// ✓ gRPC

// דוגמת Minimal API תואמת AOT:
var builder = WebApplication.CreateSlimBuilder(args); // Slim = AOT-optimized
builder.Services.ConfigureHttpJsonOptions(opts =>
{
    opts.SerializerOptions.TypeInfoResolverChain.Insert(0, AppJsonContext.Default);
});

var app = builder.Build();
app.MapGet("/notes/{id}", (int id, NoteService svc) => svc.GetAsync(id));
app.Run();`,
      },
      { type: 'heading', text: 'Frozen Collections — .NET 8' },
      {
        type: 'code',
        lang: 'csharp',
        caption: 'FrozenDictionary ו-FrozenSet — read-only מהיר',
        code: `using System.Collections.Frozen;

// FrozenDictionary — lookup מהיר עבור נתונים שלא משתנים
var courseColors = new Dictionary<string, string>
{
    ["sql"]        = "#10b981",
    ["javascript"] = "#f59e0b",
    ["typescript"] = "#6366f1",
    ["react"]      = "#06b6d4",
}.ToFrozenDictionary();

// Lookup מהיר (מותאם לקריאה בלבד)
if (courseColors.TryGetValue("sql", out var color))
    Console.WriteLine(color); // #10b981

// FrozenSet — contains() מהיר
FrozenSet<string> validCourses =
    new[] { "sql", "javascript", "typescript", "react", "cloud", "devops" }
    .ToFrozenSet();

bool isValid = validCourses.Contains("sql"); // ✓

// SearchValues (.NET 8) — חיפוש תווים מהיר
var dangerous = SearchValues.Create("<>\"'&");
bool hasDangerous = content.AsSpan().IndexOfAny(dangerous) >= 0;`,
      },
    ],
    questionBank: [
      {
        id: 'perf-q1',
        text: 'מה Span<T> מאפשר שמערך רגיל לא?',
        options: [
          'גישה מקבילית',
          'עבודה על slice של זיכרון ללא allocation — על מערך, stack, או unmanaged memory',
          'גדלים דינמיים',
          'type safety',
        ],
        correct: 1,
        explanation: 'Span<T> = view על זיכרון קיים. arr.AsSpan(1, 3) לא מעתיק — מצביע על אותו זיכרון. slicing ופרסינג ללא allocation = פחות לחץ על GC.',
      },
      {
        id: 'perf-q2',
        text: 'מדוע לא ניתן להשתמש ב-Span<T> ב-async methods?',
        options: [
          'Span לא thread-safe',
          'Span הוא ref struct — חי על ה-stack בלבד, לא ניתן לשמור במחלקות async state machine',
          'Span לא תומך ב-await',
          'Span גדול מדי',
        ],
        correct: 1,
        explanation: 'Span הוא ref struct — קיים רק על ה-stack. async methods ממירות את הקוד ל-state machine שחי על ה-heap. לכן Span לא יכול לחצות await — משתמשים ב-Memory<T>.',
      },
      {
        id: 'perf-q3',
        text: 'מה ArrayPool<T> פותר?',
        options: [
          'מגביל גודל מערכים',
          'מאפשר שימוש חוזר במערכים ללא allocation בכל פעם — מפחית GC pressure',
          'מאפשר thread-safe access',
          'מספק SIMD operations',
        ],
        correct: 1,
        explanation: 'ArrayPool.Shared.Rent(size) מחזיר מערך מה-pool (קיים). Return() מחזיר לpool. מתאים לbuffers זמניים — חוסך אלפי allocations בעומס גבוה.',
      },
      {
        id: 'perf-q4',
        text: 'מה Source Generator עושה?',
        options: [
          'מייצר קוד בruntime',
          'מייצר קוד C# בזמן קומפילציה — מאפשר reflection-free JSON, logging מהיר',
          'מייצר tests אוטומטיים',
          'מייצר documentation',
        ],
        correct: 1,
        explanation: 'Source Generator רץ במהלך build ומוסיף קוד C# לפרויקט. JsonSourceGeneration מייצר JSON serialization ללא reflection — מהיר יותר ותואם Native AOT.',
      },
      {
        id: 'perf-q5',
        text: 'מה Native AOT מאפשר?',
        options: [
          'הרצה ב-browser',
          'קומפילציה לbinary עצמאי ללא JIT — startup מהיר, memory נמוך, תואם containers',
          'debug קל יותר',
          'תמיכה בdynamic types',
        ],
        correct: 1,
        explanation: 'Native AOT = Ahead-of-Time compilation. Binary עצמאי ללא .NET runtime, startup < 10ms, memory נמוך. מושלם לmicroservices ו-Lambda functions.',
      },
      {
        id: 'perf-q6',
        text: 'מה FrozenDictionary שונה מ-Dictionary רגיל?',
        options: [
          'FrozenDictionary תומך בconcurrency',
          'FrozenDictionary read-only ומותאם לlookup מהיר — internal structure מותאמת לאחר freeze',
          'FrozenDictionary קטן יותר',
          'FrozenDictionary תומך ב-null keys',
        ],
        correct: 1,
        explanation: 'FrozenDictionary עובר אופטימיזציה בזמן ToFrozenDictionary() — ה-structure הפנימי מותאם לread בלבד. TryGetValue() מהיר יותר מDictionary רגיל.',
      },
      {
        id: 'perf-q7',
        text: 'מה stackalloc עושה?',
        options: [
          'מקצה מערך על ה-heap',
          'מקצה buffer על ה-stack — ללא GC, אוטומטי משוחרר בסוף ה-scope',
          'מקצה זיכרון unmanaged',
          'מאתחל מערך בגודל קבוע',
        ],
        correct: 1,
        explanation: 'Span<int> buf = stackalloc int[128] מקצה 512 bytes על ה-stack. אין GC, אין allocation. מוגבל לגדלים קטנים (~1KB) ולא עובר דרך await.',
      },
      {
        id: 'perf-q8',
        text: 'מה SearchValues<T> (.NET 8) משפר?',
        options: [
          'חיפוש בmaps',
          'חיפוש מהיר של קבוצת תווים/bytes בתוך span — מותאם ל-SIMD instructions',
          'full-text search',
          'LINQ queries',
        ],
        correct: 1,
        explanation: 'SearchValues.Create("<>\"\'&") יוצר structure מותאמת. span.IndexOfAny(sv) מהיר משמעותית מלולאה ידנית. מושלם לsanitization ו-parsing מהיר.',
      },
    ],
  },

  // ─── שיעור 4 ───────────────────────────────────────────────────────────────
  {
    id: 'aspnet-minimal-api',
    title: 'ASP.NET Core — Minimal API & Middleware',
    summary: 'Minimal API, Rate Limiting, Output Caching, Health Checks ו-IExceptionHandler',
    emoji: '🌐',
    content: [
      { type: 'heading', text: 'Minimal API — ASP.NET Core 6+' },
      {
        type: 'code',
        lang: 'csharp',
        caption: 'Program.cs — API מלא ב-~30 שורות',
        code: `var builder = WebApplication.CreateBuilder(args);

// ─── Services ─────────────────────────────────────────────
builder.Services.AddSqlite<AppDbContext>(builder.Configuration["Db:Connection"]);
builder.Services.AddScoped<NoteService>();

// ─── Middleware ───────────────────────────────────────────
builder.Services.AddRateLimiter(opts => opts
    .AddFixedWindowLimiter("global", o =>
    {
        o.Window            = TimeSpan.FromMinutes(15);
        o.PermitLimit       = 200;
        o.QueueProcessingOrder = QueueProcessingOrder.OldestFirst;
    }));

builder.Services.AddOutputCache(opts =>
    opts.AddBasePolicy(b => b.Expire(TimeSpan.FromMinutes(1))));

builder.Services.AddExceptionHandler<GlobalExceptionHandler>();
builder.Services.AddProblemDetails();

var app = builder.Build();

// ─── Middleware Pipeline ──────────────────────────────────
app.UseExceptionHandler();
app.UseRateLimiter();
app.UseOutputCache();

// ─── Routes ───────────────────────────────────────────────
var notes = app.MapGroup("/api/notes").RequireRateLimiting("global");

notes.MapGet("/",    NoteEndpoints.GetAll);
notes.MapPost("/",   NoteEndpoints.Create);
notes.MapDelete("/{id:int}", NoteEndpoints.Delete);

app.MapHealthChecks("/health");
app.Run();`,
      },
      { type: 'heading', text: 'Route Groups ו-TypedResults' },
      {
        type: 'code',
        lang: 'csharp',
        caption: 'NoteEndpoints.cs — handlers עם TypedResults',
        code: `public static class NoteEndpoints
{
    // TypedResults — OpenAPI-friendly, type-safe
    public static async Task<Results<Ok<NoteDto[]>, BadRequest<string>>>
        GetAll(string userId, NoteService svc, CancellationToken ct)
    {
        if (string.IsNullOrEmpty(userId))
            return TypedResults.BadRequest("userId חסר");

        var notes = await svc.GetAllAsync(userId, ct);
        return TypedResults.Ok(notes);
    }

    public static async Task<Results<Created<NoteDto>, ValidationProblem>>
        Create(CreateNoteRequest req, NoteService svc, CancellationToken ct)
    {
        var errors = Validate(req);
        if (errors.Any())
            return TypedResults.ValidationProblem(errors);

        var note = await svc.CreateAsync(req, ct);
        return TypedResults.Created($"/api/notes/{note.Id}", note);
    }

    public static async Task<Results<NoContent, NotFound>>
        Delete(int id, string userId, NoteService svc, CancellationToken ct)
    {
        var deleted = await svc.DeleteAsync(id, userId, ct);
        return deleted ? TypedResults.NoContent() : TypedResults.NotFound();
    }

    private static Dictionary<string, string[]> Validate(CreateNoteRequest req)
    {
        var errors = new Dictionary<string, string[]>();
        if (string.IsNullOrEmpty(req.Content))
            errors["content"] = ["תוכן ריק"];
        if (req.Content?.Length > 5000)
            errors["content"] = ["תוכן ארוך מדי"];
        return errors;
    }
}`,
      },
      { type: 'heading', text: 'Rate Limiting — .NET 7' },
      {
        type: 'code',
        lang: 'csharp',
        caption: 'Fixed Window, Sliding Window ו-Concurrency Limiter',
        code: `builder.Services.AddRateLimiter(opts =>
{
    // Fixed Window — N בקשות בחלון זמן קבוע
    opts.AddFixedWindowLimiter("api", o =>
    {
        o.Window      = TimeSpan.FromMinutes(15);
        o.PermitLimit = 200;
    });

    // Sliding Window — חלון גולש (מדויק יותר)
    opts.AddSlidingWindowLimiter("writes", o =>
    {
        o.Window            = TimeSpan.FromMinutes(15);
        o.PermitLimit       = 30;
        o.SegmentsPerWindow = 3;
    });

    // Concurrency — מגביל בקשות מקביליות
    opts.AddConcurrencyLimiter("heavy", o =>
    {
        o.PermitLimit         = 10;
        o.QueueLimit          = 5;
        o.QueueProcessingOrder = QueueProcessingOrder.NewestFirst;
    });

    // תגובה כשנחסם
    opts.OnRejected = async (ctx, ct) =>
    {
        ctx.HttpContext.Response.StatusCode = 429;
        await ctx.HttpContext.Response.WriteAsJsonAsync(
            new { error = "יותר מדי בקשות — נסה שוב בעוד כמה דקות" }, ct);
    };
});

// שימוש:
app.MapPost("/api/notes", NoteEndpoints.Create)
    .RequireRateLimiting("writes");`,
      },
      { type: 'heading', text: 'Output Cache, Health Checks ו-IExceptionHandler' },
      {
        type: 'code',
        lang: 'csharp',
        caption: 'Output Caching, Health, Exception handling',
        code: `// ─── Output Cache (.NET 7) ───────────────────────────────
builder.Services.AddOutputCache(opts =>
{
    opts.AddPolicy("notes", b => b
        .Expire(TimeSpan.FromSeconds(30))
        .SetVaryByQuery("userId", "courseId", "lessonId")
        .Tag("notes")); // לinvalidation ממוקדת
});

app.MapGet("/api/notes", NoteEndpoints.GetAll)
    .CacheOutput("notes");

// invalidation ידני (למשל אחרי POST):
await cache.EvictByTagAsync("notes", ct);

// ─── Health Checks (.NET 8) ───────────────────────────────
builder.Services.AddHealthChecks()
    .AddDbContextCheck<AppDbContext>("db")
    .AddUrlGroup(new Uri("https://api.anthropic.com"), "anthropic-api")
    .AddCheck("storage", () =>
        Directory.Exists("/data")
            ? HealthCheckResult.Healthy()
            : HealthCheckResult.Unhealthy("storage missing"));

app.MapHealthChecks("/health", new HealthCheckOptions
{
    ResponseWriter = UIResponseWriter.WriteHealthCheckUIResponse
});

// ─── Global Exception Handler (.NET 8) ───────────────────
public class GlobalExceptionHandler(ILogger<GlobalExceptionHandler> log)
    : IExceptionHandler
{
    public async ValueTask<bool> TryHandleAsync(
        HttpContext ctx, Exception ex, CancellationToken ct)
    {
        log.LogError(ex, "Unhandled exception");

        ctx.Response.StatusCode = ex switch
        {
            NotFoundException => 404,
            ValidationException => 400,
            _ => 500
        };

        await ctx.Response.WriteAsJsonAsync(
            new { error = "שגיאת שרת" }, ct);

        return true; // handled
    }
}`,
      },
    ],
    questionBank: [
      {
        id: 'aspnet-q1',
        text: 'מה MapGroup() עושה ב-Minimal API?',
        options: [
          'מקבץ routes עם prefix משותף — מאפשר להחיל middleware/auth על קבוצה שלמה',
          'מייצר controllers',
          'מגדיר version של API',
          'מוסיף CORS',
        ],
        correct: 0,
        explanation: 'app.MapGroup("/api/notes") יוצר קבוצה עם prefix. כל route שמוגדר עליה יורש /api/notes. אפשר להוסיף .RequireAuthorization() / .RequireRateLimiting() לכולן.',
      },
      {
        id: 'aspnet-q2',
        text: 'מה TypedResults שונה מ-Results?',
        options: [
          'TypedResults מהיר יותר',
          'TypedResults מחזיר Generic type — OpenAPI יודע את מבנה התשובות, type-safe יותר',
          'Results רק ל-JSON',
          'אין הבדל',
        ],
        correct: 1,
        explanation: 'TypedResults.Ok<NoteDto[]>(...) מחזיר Results<Ok<NoteDto[]>, ...>. Swagger/OpenAPI יכול להסיק אוטומטית את schemas התשובות. Results מחזיר IResult ללא type info.',
      },
      {
        id: 'aspnet-q3',
        text: 'מה ההבדל בין Fixed Window ל-Sliding Window Rate Limiting?',
        options: [
          'אין הבדל',
          'Fixed = חלון קפצני (reset בדיוק כל N שניות); Sliding = חלון גולש (מדויק, מונע burst בגבול חלון)',
          'Sliding מהיר יותר',
          'Fixed תומך בקווים',
        ],
        correct: 1,
        explanation: 'Fixed Window: 200 ב-15 דק׳. ב-14:59 שולחים 200 ואחר כך עוד 200. Sliding: מסתכל על ה-15 דק׳ האחרונות בכל רגע — מונע burst כזה.',
      },
      {
        id: 'aspnet-q4',
        text: 'מה IExceptionHandler (.NET 8) עושה?',
        options: [
          'מחליף try/catch',
          'מגדיר global error handler — תופס exceptions שלא טופלו ומחזיר תשובה מותאמת',
          'מוסיף logging אוטומטי',
          'מגדיר validation',
        ],
        correct: 1,
        explanation: 'IExceptionHandler.TryHandleAsync() קורה לפני שה-exception מגיע ל-middleware stack. אפשר לבחור status code לפי סוג ה-exception ולהחזיר ProblemDetails.',
      },
      {
        id: 'aspnet-q5',
        text: 'מה Output Cache שונה מ-Response Cache?',
        options: [
          'Output Cache בצד שרת בלבד — שולט מלא, תומך בinvalidation ממוקדת לפי tag',
          'Response Cache מהיר יותר',
          'Output Cache מצריך Redis',
          'אין הבדל',
        ],
        correct: 0,
        explanation: 'Output Cache (.NET 7) = caching בצד שרת עם API לinvalidation: cache.EvictByTagAsync("notes"). Response Cache = Cache-Control headers לbrowser/proxy — אין שליטה.',
      },
      {
        id: 'aspnet-q6',
        text: 'מה app.MapHealthChecks() מאפשר?',
        options: [
          'בדיקת syntax',
          'endpoint שמחזיר סטטוס בריאות של השירות — DB, dependencies חיצוניים ועוד',
          'unit testing',
          'profiling',
        ],
        correct: 1,
        explanation: 'Health Check endpoint מחזיר Healthy/Degraded/Unhealthy עם פירוט. Load Balancers ו-Kubernetes קוראים לו לדעת אם להפנות תעבורה לinstance.',
      },
      {
        id: 'aspnet-q7',
        text: 'מה Concurrency Limiter מגביל לעומת Fixed Window?',
        options: [
          'Concurrency מגביל בקשות בפרק זמן',
          'Concurrency מגביל כמות בקשות מקביליות — לא בפרק זמן אלא בו-זמנית',
          'הם זהים',
          'Concurrency מגביל לפי IP',
        ],
        correct: 1,
        explanation: 'ConcurrencyLimiter(PermitLimit: 10) = לכל היותר 10 בקשות מעובדות בו-זמנית. מתאים לoperations כבדים (AI calls, DB-heavy) ולא לlimiting לפי זמן.',
      },
      {
        id: 'aspnet-q8',
        text: 'מה SetVaryByQuery() ב-Output Cache עושה?',
        options: [
          'מגדיר שה-cache שונה לפי query parameters — כל שילוב userId+courseId מקבל cache נפרד',
          'מגדיר את TTL',
          'מגדיר את גודל ה-cache',
          'מאפשר invalidation',
        ],
        correct: 0,
        explanation: '.SetVaryByQuery("userId", "courseId") = /api/notes?userId=A&courseId=sql מקבל cache נפרד מ-?userId=B. ללא זה — כל המשתמשים מקבלים אותו cache!',
      },
    ],
  },

  // ─── שיעור 5 ───────────────────────────────────────────────────────────────
  {
    id: 'dotnet-di-options',
    title: 'DI, Configuration ו-Options Pattern',
    summary: 'Dependency Injection מתקדם, Keyed Services, IOptions, TimeProvider ו-Generic Host',
    emoji: '🔧',
    content: [
      { type: 'heading', text: 'מה זה Dependency Injection ולמה הוא חשוב?' },
      {
        type: 'text',
        text: 'Dependency Injection (DI) הוא עיקרון עיצוב שבו אובייקט לא יוצר את התלויות שלו בעצמו — הוא מקבל אותן מבחוץ. במקום ש-NoteService ייצור בעצמו NoteRepository, הוא מקבל אותו דרך ה-constructor. כך הקוד נשאר מנותק, ניתן לבדיקה, וניתן להחלפה.',
      },
      {
        type: 'code',
        lang: 'csharp',
        caption: 'הבעיה: ללא DI — תלות קשיחה שקשה לבדוק ולשנות',
        code: `// ✗ ללא DI — NoteService יוצר את התלויות שלו
public class NoteService
{
    private readonly NoteRepository _repo;
    private readonly ILogger<NoteService> _log;

    public NoteService()
    {
        _repo = new NoteRepository("Server=prod-db;..."); // קשור לDB ספציפי
        _log  = new ConsoleLogger();                       // קשור למימוש ספציפי
    }

    public async Task<Note[]> GetAsync(string userId) =>
        await _repo.FindAsync(userId);
}

// בעיות:
// 1. לא ניתן לבדוק — new NoteService() תמיד יוצר חיבור אמיתי לDB
// 2. לא ניתן להחליף — רוצים Redis cache? צריך לשנות את NoteService
// 3. לא ניתן לשתף — כל new NoteService() פותח חיבור DB חדש`,
      },
      {
        type: 'code',
        lang: 'csharp',
        caption: 'הפתרון: עם DI — מנותק, ניתן לבדיקה, ניתן להחלפה',
        code: `// ✓ עם DI — NoteService מקבל תלויות מבחוץ
public class NoteService(INoteRepository repo, ILogger<NoteService> log)
{
    public async Task<Note[]> GetAsync(string userId) =>
        await repo.FindAsync(userId);
}

// ─── Registration — מגדירים מה יינתן ────────────────────
builder.Services.AddScoped<INoteRepository, NoteRepository>();
builder.Services.AddScoped<NoteService>();

// ─── בבדיקות — מחליפים את המימוש ────────────────────────
var fakeRepo = new FakeNoteRepository([note1, note2]);
var svc = new NoteService(fakeRepo, NullLogger<NoteService>.Instance);
// ✓ בדיקה בלי DB אמיתי, בלי network, בלי config

// ─── יתרונות DI ───────────────────────────────────────────
// 1. Testability  — מחליפים מימושים אמיתיים ב-fakes/mocks
// 2. Flexibility  — מחליפים NoteRepository ב-CachedNoteRepository ללא שינוי קוד
// 3. Lifecycle    — ה-container מנהל Singleton/Scoped/Transient
// 4. Separation   — NoteService לא יודע איך NoteRepository נוצר`,
      },
      {
        type: 'tip',
        text: 'עיקרון DI נובע מ-Dependency Inversion Principle (ה-D ב-SOLID): מחלקות צריכות להסתמך על abstractions (interfaces) ולא על מימושים קונקרטיים. ASP.NET Core מגיע עם DI container מובנה — ללא צורך בספריות חיצוניות.',
      },
      { type: 'heading', text: 'Dependency Injection — Lifetimes' },
      {
        type: 'table',
        caption: 'Lifetime: מתי נוצר מופע חדש',
        headers: ['Lifetime', 'מתי חי', 'מתאים ל'],
        rows: [
          ['Singleton', 'כל חיי האפליקציה — מופע אחד', 'Cache, Config, HttpClient factory'],
          ['Scoped', 'לכל HTTP request — מופע אחד לבקשה', 'DbContext, Unit of Work, Services'],
          ['Transient', 'בכל inject — מופע חדש', 'Stateless helpers, lightweight services'],
        ],
      },
      {
        type: 'code',
        lang: 'csharp',
        caption: 'DI Registration — כל השיטות',
        code: `var builder = WebApplication.CreateBuilder(args);
var services = builder.Services;

// ─── רישום בסיסי ──────────────────────────────────────────
services.AddSingleton<ICacheService, RedisCacheService>();
services.AddScoped<INoteService, NoteService>();
services.AddTransient<IEmailSender, SmtpEmailSender>();

// Factory — לוגיקת יצירה מורכבת
services.AddSingleton<AnthropicService>(sp =>
{
    var config = sp.GetRequiredService<IConfiguration>();
    var apiKey = config["Anthropic:ApiKey"]
        ?? throw new InvalidOperationException("API key missing");
    return new AnthropicService(apiKey);
});

// ─── Keyed Services (.NET 8) ──────────────────────────────
services.AddKeyedSingleton<IStorage, LocalStorage>("local");
services.AddKeyedSingleton<IStorage, S3Storage>("cloud");

// Inject:
public class NoteService([FromKeyedServices("cloud")] IStorage storage) { }

// ─── Open Generics ────────────────────────────────────────
services.AddSingleton(typeof(IRepository<>), typeof(Repository<>));`,
      },
      { type: 'heading', text: 'Options Pattern — Configuration מוקטינת' },
      {
        type: 'code',
        lang: 'csharp',
        caption: 'IOptions, IOptionsSnapshot, IOptionsMonitor',
        code: `// appsettings.json
{
  "Anthropic": {
    "ApiKey": "sk-ant-...",
    "Model": "claude-opus-4-5",
    "MaxTokens": 2048,
    "TimeoutSeconds": 30
  }
}

// Model עם Validation
public class AnthropicOptions
{
    public const string Section = "Anthropic";

    [Required] public required string ApiKey     { get; init; }
    [Required] public required string Model      { get; init; }
    [Range(1, 100_000)] public int MaxTokens     { get; init; } = 1024;
    [Range(1, 300)]     public int TimeoutSeconds { get; init; } = 30;
}

// Registration
builder.Services
    .AddOptions<AnthropicOptions>()
    .BindConfiguration(AnthropicOptions.Section)
    .ValidateDataAnnotations()  // בודק [Required] ו-[Range]
    .ValidateOnStart();         // נכשל בהפעלה ולא בruntime!

// Inject:
// IOptions<T>        — ערך קבוע לכל חיי האפליקציה
// IOptionsSnapshot<T>— מתעדכן לכל request (Scoped)
// IOptionsMonitor<T> — מתעדכן בזמן אמת (Singleton)
public class AiService(IOptions<AnthropicOptions> options)
{
    private readonly AnthropicOptions _cfg = options.Value;

    public Task<string> AskAsync(string q) =>
        SendRequest(_cfg.ApiKey, _cfg.Model, _cfg.MaxTokens, q);
}`,
      },
      { type: 'heading', text: 'TimeProvider — .NET 8' },
      {
        type: 'code',
        lang: 'csharp',
        caption: 'TimeProvider — testable time abstraction',
        code: `// לפני .NET 8 — לא ניתן לtest
public class NoteService
{
    public Note Create(string content) =>
        new() { Content = content, CreatedAt = DateTime.UtcNow }; // לא testable!
}

// .NET 8 — TimeProvider
public class NoteService(TimeProvider time)
{
    public Note Create(string content) =>
        new() { Content = content, CreatedAt = time.GetUtcNow() }; // ✓ testable
}

// Registration:
builder.Services.AddSingleton(TimeProvider.System);

// ב-Tests — FakeTimeProvider:
var fakeTime = new FakeTimeProvider(
    new DateTimeOffset(2025, 1, 1, 0, 0, 0, TimeSpan.Zero));

var service = new NoteService(fakeTime);
var note = service.Create("test");
Assert.Equal(new DateTime(2025, 1, 1), note.CreatedAt.DateTime);

fakeTime.Advance(TimeSpan.FromDays(1)); // זזים קדימה בזמן
// גם Timers ו-CancellationToken timeouts עובדים עם FakeTimeProvider`,
      },
      { type: 'heading', text: 'Generic Host — Background Services' },
      {
        type: 'code',
        lang: 'csharp',
        caption: 'IHostedService ו-BackgroundService',
        code: `// BackgroundService — רץ ברקע לכל אורך חיי האפליקציה
public class NotesCleanupService(
    IServiceScopeFactory scopeFactory,
    ILogger<NotesCleanupService> log,
    TimeProvider time) : BackgroundService
{
    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        // await בהתחלה — מאפשר לשאר ה-app להפעיל
        await Task.Yield();

        while (!stoppingToken.IsCancellationRequested)
        {
            try
            {
                await CleanOldNotesAsync(stoppingToken);
                log.LogInformation("Cleanup done at {Time}", time.GetUtcNow());
            }
            catch (Exception ex) when (ex is not OperationCanceledException)
            {
                log.LogError(ex, "Cleanup failed");
            }

            await Task.Delay(TimeSpan.FromHours(24), stoppingToken);
        }
    }

    private async Task CleanOldNotesAsync(CancellationToken ct)
    {
        // צריך Scope כי DbContext הוא Scoped ואנחנו Singleton
        await using var scope = scopeFactory.CreateAsyncScope();
        var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
        var cutoff = DateTime.UtcNow.AddDays(-365);
        await db.Notes.Where(n => n.CreatedAt < cutoff).ExecuteDeleteAsync(ct);
    }
}

// Registration:
builder.Services.AddHostedService<NotesCleanupService>();`,
      },
    ],
    questionBank: [
      {
        id: 'di-q0a',
        text: 'מה הבעיה העיקרית בקוד שיוצר תלויות בעצמו (ללא DI)?',
        options: [
          'הקוד איטי יותר',
          'הקוד קשה לבדיקה — לא ניתן להחליף מימושים אמיתיים ב-fakes בבדיקות',
          'הקוד לא קומפיל',
          'הקוד לא תומך ב-async',
        ],
        correct: 1,
        explanation: 'כשמחלקה יוצרת תלויות בעצמה (new Repository(connStr)), כל בדיקה דורשת DB אמיתי, network, config. עם DI: מחליפים את הrepository ב-fake ובודקים ללא תשתית.',
      },
      {
        id: 'di-q0b',
        text: 'מה Dependency Inversion Principle אומר?',
        options: [
          'מחלקות בכירות לא תלויות בנמוכות — שניהן תלויות ב-interface משותף',
          'יש להשתמש רק ב-Singleton',
          'אסור לירשת מחלקות',
          'כל מחלקה צריכה לנהל את עצמה',
        ],
        correct: 0,
        explanation: 'DIP (ה-D ב-SOLID): NoteService לא תלוי ב-NoteRepository הקונקרטי — שניהם תלויים ב-INoteRepository. כך ניתן להחליף מימוש (SQL → Redis → InMemory) ללא שינוי NoteService.',
      },
      {
        id: 'di-q1',
        text: 'מה ההבדל בין Singleton ל-Scoped?',
        options: [
          'Singleton לprod, Scoped לdev',
          'Singleton = מופע אחד לכל האפליקציה; Scoped = מופע אחד לכל HTTP request',
          'Scoped מהיר יותר',
          'Singleton thread-safe, Scoped לא',
        ],
        correct: 1,
        explanation: 'Singleton חי כל האפליקציה — מושלם לcache, config, HttpClient. Scoped חי request אחד — מושלם לDbContext. Transient = חדש בכל inject.',
      },
      {
        id: 'di-q2',
        text: 'מה Keyed Services (.NET 8) פותר?',
        options: [
          'רישום services מוצפנים',
          'רישום מימושים מרובים של אותו interface בשמות שונים — inject לפי key',
          'service discovery',
          'versioning של services',
        ],
        correct: 1,
        explanation: 'AddKeyedSingleton<IStorage, S3Storage>("cloud") רושם S3Storage כ-"cloud". Inject עם [FromKeyedServices("cloud")] IStorage. פותר את בעיית "אחד מרובים".',
      },
      {
        id: 'di-q3',
        text: 'מה ValidateOnStart() עושה ב-Options?',
        options: [
          'מבטל validation',
          'בודק שה-options תקינים בהפעלת האפליקציה — נכשל מיד ולא בזמן שימוש ראשון',
          'מאמת JSON schema',
          'בודק database connection',
        ],
        correct: 1,
        explanation: 'ללא ValidateOnStart: validation קורה בפעם הראשונה שקוראים ל-.Value — אולי אחרי שעות. עם ValidateOnStart: האפליקציה לא עולה עם config שגוי.',
      },
      {
        id: 'di-q4',
        text: 'מה ההבדל בין IOptions<T> ל-IOptionsMonitor<T>?',
        options: [
          'אין הבדל',
          'IOptions = ערך קבוע מהפעלה; IOptionsMonitor = מתעדכן אוטומטית כשappsettings משתנה',
          'IOptionsMonitor תומך בvalidation',
          'IOptions מהיר יותר',
        ],
        correct: 1,
        explanation: 'IOptions.Value קבוע לכל חיי האפליקציה. IOptionsMonitor.CurrentValue מתעדכן כשappsettings.json משתנה בruntime (hot reload). מתאים לfeature flags.',
      },
      {
        id: 'di-q5',
        text: 'מה TimeProvider פותר שDateTime.UtcNow לא?',
        options: [
          'TimeProvider מהיר יותר',
          'TimeProvider ניתן להחליף בTests — FakeTimeProvider מאפשר שליטה על הזמן בבדיקות',
          'TimeProvider תומך בtimezones',
          'TimeProvider thread-safe',
        ],
        correct: 1,
        explanation: 'DateTime.UtcNow בקוד = לא ניתן לtest. TimeProvider = inject + FakeTimeProvider בtest. אפשר לשנות זמן, להריץ timers, לבדוק expiration logic.',
      },
      {
        id: 'di-q6',
        text: 'למה BackgroundService צריך IServiceScopeFactory לגישה ל-DbContext?',
        options: [
          'כי DbContext לא thread-safe',
          'כי BackgroundService הוא Singleton ו-DbContext הוא Scoped — לא ניתן ל-inject ישירות',
          'כי DbContext כבד',
          'כי EF Core דורש זאת',
        ],
        correct: 1,
        explanation: 'Captive Dependency Problem: Singleton לא יכול להחזיק Scoped service. הפתרון: IServiceScopeFactory ליצירת scope חדש בכל פעולה.',
      },
      {
        id: 'di-q7',
        text: 'מה await Task.Yield() עושה בתחילת BackgroundService?',
        options: [
          'מוסיף delay',
          'מחזיר שליטה ל-scheduler — מאפשר לשאר ה-app להמשיך לעלות לפני שה-background רץ',
          'מאתחל את ה-service',
          'בודק cancellation',
        ],
        correct: 1,
        explanation: 'ללא Task.Yield: ExecuteAsync חוסמת את startup עד שה-background service "מתחיל". Task.Yield() מחזיר שליטה מיד ומאפשר לApp לסיים startup תחילה.',
      },
      {
        id: 'di-q8',
        text: 'מה catch (Exception ex) when (ex is not OperationCanceledException) עושה?',
        options: [
          'תופס כל exception',
          'תופס exceptions חוץ מOperationCanceledException — מאפשר לstoppingToken לבטל כרגיל',
          'מתעד exceptions',
          'מנסה מחדש',
        ],
        correct: 1,
        explanation: 'OperationCanceledException נזרקת כשstoppingToken מבוטל (shutdown). אם תתפוס אותה, ה-loop ימשיך. כדאי לתת לה "לעלות" — ה-while יבדוק stoppingToken.IsCancellationRequested.',
      },
    ],
  },

  // ─── שיעור 6 ───────────────────────────────────────────────────────────────
  {
    id: 'dotnet-ef-core',
    title: 'Entity Framework Core מודרני',
    summary: 'EF Core 8-9: Bulk operations, JSON Columns, Compiled Queries, Raw SQL ו-Interceptors',
    emoji: '🗄️',
    content: [
      { type: 'heading', text: 'DbContext & Configuration מודרני' },
      {
        type: 'code',
        lang: 'csharp',
        caption: 'AppDbContext.cs — EF Core 8+',
        code: `public class AppDbContext(DbContextOptions<AppDbContext> options)
    : DbContext(options)  // Primary Constructor!
{
    public DbSet<Note>   Notes   => Set<Note>();
    public DbSet<Course> Courses => Set<Course>();

    protected override void OnModelCreating(ModelBuilder mb)
    {
        mb.ApplyConfigurationsFromAssembly(typeof(AppDbContext).Assembly);
    }
}

// Entity Configuration — Fluent API נפרד
public class NoteConfiguration : IEntityTypeConfiguration<Note>
{
    public void Configure(EntityTypeBuilder<Note> b)
    {
        b.HasKey(n => n.Id);
        b.Property(n => n.UserId).HasMaxLength(36).IsRequired();
        b.Property(n => n.Content).HasMaxLength(5000).IsRequired();
        b.Property(n => n.CreatedAt).HasDefaultValueSql("NOW()");

        b.HasIndex(n => new { n.UserId, n.CourseId, n.LessonId })
         .HasDatabaseName("ix_notes_lookup");

        // JSON Column (EF Core 8) — שדה JSON בDB
        b.OwnsOne(n => n.Metadata, m =>
        {
            m.ToJson();
            m.Property(x => x.Tags).HasMaxLength(200);
        });
    }
}`,
      },
      { type: 'heading', text: 'Bulk Operations — EF Core 7-8' },
      {
        type: 'code',
        lang: 'csharp',
        caption: 'ExecuteUpdateAsync ו-ExecuteDeleteAsync',
        code: `// ─── לפני EF Core 7 — N+1 queries ────────────────────────
var oldNotes = await db.Notes
    .Where(n => n.CreatedAt < cutoff)
    .ToListAsync();

foreach (var note in oldNotes) // N queries!
    db.Notes.Remove(note);

await db.SaveChangesAsync();

// ─── EF Core 7+ — Single DELETE query ────────────────────
await db.Notes
    .Where(n => n.CreatedAt < cutoff)
    .ExecuteDeleteAsync(ct);
// → DELETE FROM notes WHERE created_at < @cutoff

// ─── ExecuteUpdateAsync — Single UPDATE ───────────────────
await db.Notes
    .Where(n => n.UserId == userId && n.CourseId == courseId)
    .ExecuteUpdateAsync(s => s
        .SetProperty(n => n.ArchivedAt, DateTimeOffset.UtcNow)
        .SetProperty(n => n.IsArchived, true),
        ct);
// → UPDATE notes SET archived_at=..., is_archived=true WHERE ...

// ExecuteDelete/Update מעקפים את ה-ChangeTracker — הרבה יותר מהיר!`,
      },
      { type: 'heading', text: 'Compiled Queries — ביצועים ב-Hot Path' },
      {
        type: 'code',
        lang: 'csharp',
        caption: 'EF.CompileAsyncQuery — קומפילציה חד-פעמית',
        code: `// ה-query מתורגם ל-SQL פעם אחת בלבד (בהגדרה) ולא בכל call
public static class NoteQueries
{
    // Compiled Query — נוצר פעם אחת
    private static readonly Func<AppDbContext, string, string, string, IAsyncEnumerable<NoteDto>>
        GetByUserCourse = EF.CompileAsyncQuery(
            (AppDbContext db, string userId, string courseId, string lessonId) =>
                db.Notes
                  .Where(n => n.UserId == userId
                           && n.CourseId == courseId
                           && n.LessonId == lessonId)
                  .OrderBy(n => n.CreatedAt)
                  .Select(n => new NoteDto(n.Id, n.Content, n.CreatedAt)));

    // שימוש:
    public static IAsyncEnumerable<NoteDto> GetAsync(
        AppDbContext db, string userId, string courseId, string lessonId)
        => GetByUserCourse(db, userId, courseId, lessonId);
}

// בservice:
var notes = await NoteQueries
    .GetAsync(_db, userId, courseId, lessonId)
    .ToArrayAsync(ct);`,
      },
      { type: 'heading', text: 'JSON Columns & Interceptors — EF Core 8' },
      {
        type: 'code',
        lang: 'csharp',
        caption: 'JSON בDB + Interceptor לlogging',
        code: `// ─── JSON Columns (EF Core 8) ────────────────────────────
public class Note
{
    public int Id { get; init; }
    public required string Content { get; set; }
    public NoteMetadata Metadata { get; set; } = new(); // → stored as JSON
}

public class NoteMetadata
{
    public List<string> Tags { get; set; } = [];
    public int ViewCount    { get; set; }
    public string? AiSummary { get; set; }
}

// LINQ על JSON column:
var tagged = await db.Notes
    .Where(n => n.Metadata.Tags.Contains("important"))
    .ToListAsync(ct);
// → SELECT ... WHERE metadata->>'Tags' @> '["important"]'

// ─── Interceptors — cross-cutting concerns ────────────────
public class SlowQueryInterceptor(ILogger<SlowQueryInterceptor> log)
    : DbCommandInterceptor
{
    private static readonly TimeSpan Threshold = TimeSpan.FromMilliseconds(200);

    public override async ValueTask<DbDataReader> ReaderExecutedAsync(
        DbCommand cmd,
        CommandExecutedEventData data,
        DbDataReader result,
        CancellationToken ct = default)
    {
        if (data.Duration > Threshold)
            log.LogWarning("Slow query ({Ms}ms): {Sql}",
                data.Duration.TotalMilliseconds, cmd.CommandText);

        return result;
    }
}

// Registration:
builder.Services.AddDbContext<AppDbContext>((sp, opts) =>
    opts.UseNpgsql(conn)
        .AddInterceptors(sp.GetRequiredService<SlowQueryInterceptor>()));
builder.Services.AddSingleton<SlowQueryInterceptor>();`,
      },
      { type: 'heading', text: 'Raw SQL & Split Queries' },
      {
        type: 'code',
        lang: 'csharp',
        caption: 'FromSql, SqlQuery, Split Query',
        code: `// ─── FromSql — Raw SQL עם entity mapping ─────────────────
var notes = await db.Notes
    .FromSql($"""
        SELECT * FROM notes
        WHERE user_id = {userId}
          AND content ILIKE {'%' + keyword + '%'}
        ORDER BY created_at DESC
        LIMIT 20
        """)
    .ToListAsync(ct);
// Interpolation בטוח! מתורגם ל-parameterized query אוטומטית

// ─── SqlQuery — Raw SQL לתוצאות שאינן entities ──────────
var stats = await db.Database
    .SqlQuery<CourseStats>($"""
        SELECT course_id  AS CourseId,
               COUNT(*)   AS NoteCount,
               MAX(created_at) AS LastNoteAt
        FROM notes
        WHERE user_id = {userId}
        GROUP BY course_id
        """)
    .ToListAsync(ct);

// ─── Split Query — פותר cartesian explosion ──────────────
var coursesWithLessons = await db.Courses
    .Include(c => c.Lessons)
        .ThenInclude(l => l.Questions)
    .AsSplitQuery() // 3 queries נפרדות במקום JOIN ענק
    .ToListAsync(ct);`,
      },
    ],
    questionBank: [
      {
        id: 'ef-q1',
        text: 'מה ExecuteDeleteAsync() עושה שלפניו לא היה?',
        options: [
          'מוחק entity יחיד',
          'מריץ DELETE query אחד ישירות ב-DB ללא טעינה לזיכרון — EF Core 7+',
          'מוחק cascade',
          'מוחק ב-transaction',
        ],
        correct: 1,
        explanation: 'לפני: ToList() → foreach Remove → SaveChanges = N+1 queries + כל הנתונים בזיכרון. ExecuteDeleteAsync = query אחד: DELETE FROM ... WHERE. הרבה יותר מהיר לmass delete.',
      },
      {
        id: 'ef-q2',
        text: 'מה Compiled Query משפר?',
        options: [
          'הQuery מהיר יותר ב-DB',
          'תרגום ה-LINQ ל-SQL קורה פעם אחת בלבד — חוסך CPU בכל קריאה חוזרת',
          'מאפשר queries מקביליות',
          'מאפשר caching',
        ],
        correct: 1,
        explanation: 'בכל EF Core query רגיל: LINQ → expression tree → SQL בכל קריאה. Compiled Query: תרגום פעם אחת ב-startup. מתאים ל-hot paths עם אלפי קריאות לדקה.',
      },
      {
        id: 'ef-q3',
        text: 'מה JSON Columns ב-EF Core 8 מאפשר?',
        options: [
          'שמירת entities כ-JSON files',
          'מיפוי owned type לעמודת JSON בDB — LINQ עובד ישירות על תוכן ה-JSON',
          'serialization מהיר',
          'schema-less database',
        ],
        correct: 1,
        explanation: '.ToJson() שומר owned type כ-JSON בעמודה אחת. ניתן לשאול עם LINQ: .Where(n => n.Metadata.Tags.Contains("x")) → SQL עם JSON operators של הDB.',
      },
      {
        id: 'ef-q4',
        text: 'מה IEntityTypeConfiguration<T> עושה?',
        options: [
          'מגדיר validation',
          'מפריד את הגדרת ה-mapping של entity לקובץ נפרד — קוד נקי, SRP',
          'מגדיר ירושה',
          'מגדיר caching',
        ],
        correct: 1,
        explanation: 'במקום להגדיר הכל ב-OnModelCreating: כל entity מקבל Configuration class משלו. ApplyConfigurationsFromAssembly טוען הכל אוטומטית.',
      },
      {
        id: 'ef-q5',
        text: 'מה Split Query פותר?',
        options: [
          'queries מקביליות',
          'Cartesian Explosion — כשInclude מרובה גורם לJOIN שמייצר שורות כפולות עצומות',
          'N+1 problem',
          'טעינה עצלה',
        ],
        correct: 1,
        explanation: 'Course עם 100 Lessons, כל Lesson עם 50 Questions = Course JOIN Lesson JOIN Question = 5000 שורות! AsSplitQuery() = 3 queries נפרדות, הרבה פחות נתונים.',
      },
      {
        id: 'ef-q6',
        text: 'מה Interceptor ב-EF Core מאפשר?',
        options: [
          'שינוי ה-connection string',
          'יירוט פעולות DB (query, save, connect) להוספת cross-cutting concerns כמו logging, caching',
          'validation לפני שמירה',
          'encryption',
        ],
        correct: 1,
        explanation: 'DbCommandInterceptor יורט queries לפני/אחרי ביצוע. SaveChangesInterceptor לפני/אחרי SaveChanges. מושלם לslow query detection, audit log, soft delete.',
      },
      {
        id: 'ef-q7',
        text: 'מדוע FromSql עם string interpolation בטוח ב-EF Core?',
        options: [
          'EF Core לא מאפשר interpolation',
          'EF Core ממיר interpolation ל-parameterized query אוטומטית — מונע SQL Injection',
          'הערכים מסוננים',
          'EF Core מצפין',
        ],
        correct: 1,
        explanation: 'FromSql($"... WHERE id = {userId}") → EF Core יוצר @p0 parameter. לא raw string concatenation. אם רוצים raw SQL ללא הגנה — צריך FromSqlRaw (לא מומלץ).',
      },
      {
        id: 'ef-q8',
        text: 'מה ExecuteUpdateAsync עדיף על SaveChanges לעדכון המוני?',
        options: [
          'ExecuteUpdate יותר קריא',
          'ExecuteUpdate = SQL UPDATE אחד ישיר; SaveChanges = טעינה לזיכרון + change tracking + N queries',
          'ExecuteUpdate תומך בtransactions',
          'ExecuteUpdate מהיר ב-10%',
        ],
        correct: 1,
        explanation: 'עדכון 10,000 רשומות: SaveChanges = 10,000 records בזיכרון + change tracking overhead + 10,000 UPDATEs. ExecuteUpdateAsync = UPDATE ... WHERE ... — query אחד.',
      },
    ],
  },
]
