import type { Lesson } from '../../types'

export const ragLessons: Lesson[] = [
  {
    id: 'rag-embeddings',
    title: 'Embeddings — ייצוג טקסט כווקטורים',
    summary: 'איך הופכים טקסט לוקטורים מספריים, ואיך מודדים דמיון ביניהם — הבסיס לכל מערכת RAG',
    emoji: '🔢',
    content: [
      { type: 'heading', text: 'למה בכלל צריך RAG?' },
      {
        type: 'text',
        text: 'מודל שפה (LLM) יודע רק את מה שהוא ראה באימון — הוא לא מכיר את המסמכים הפרטיים שלכם, את הנתונים העדכניים, או את מסד הנתונים הפנימי של החברה. RAG (Retrieval-Augmented Generation) פותר את זה: לפני ששואלים את המודל, שולפים ("Retrieve") את הקטעים הרלוונטיים ממאגר הידע שלכם, ומצרפים אותם לשאלה כ-context. כך המודל עונה על סמך מידע אמיתי ועדכני, במקום "לנחש" מהזיכרון שלו.',
      },
      { type: 'heading', text: 'מה זה Embedding?' },
      {
        type: 'text',
        text: 'Embedding הוא ייצוג מספרי (וקטור) של משמעות הטקסט — בדרך כלל מערך של כמה מאות עד כמה אלפי מספרים (floats). הרעיון המרכזי: משפטים בעלי משמעות דומה מקבלים וקטורים "קרובים" במרחב הרב-ממדי, גם אם המילים שונות לגמרי. "כלב רץ בפארק" ו-"הכלבלב שיחק בגינה הציבורית" יקבלו embeddings דומים, למרות שאין ביניהם אף מילה זהה.',
      },
      {
        type: 'tip',
        text: 'זה ההבדל המהותי בין embeddings לחיפוש מילות מפתח רגיל: חיפוש מבוסס embeddings מבין משמעות (semantic search), לא רק התאמת טקסט מדויקת.',
      },
      { type: 'heading', text: 'איך מודדים דמיון בין וקטורים?' },
      {
        type: 'text',
        text: 'המדד הנפוץ ביותר הוא Cosine Similarity — הוא מודד את הזווית בין שני וקטורים, לא את האורך שלהם. הערך נע בין 1-‏ (הפוכים לגמרי) ל-1 (זהים בכיוון). ככל שהזווית קטנה יותר (הווקטורים "מצביעים" לאותו כיוון), כך המשמעות דומה יותר.',
      },
      {
        type: 'code',
        lang: 'python',
        caption: 'חישוב Cosine Similarity ויצירת embeddings עם Voyage AI',
        code: `import numpy as np
import requests

def cosine_similarity(a: list[float], b: list[float]) -> float:
    a, b = np.array(a), np.array(b)
    return float(np.dot(a, b) / (np.linalg.norm(a) * np.linalg.norm(b)))

# Anthropic לא מספקת API ל-embeddings משלה — הספק המומלץ הוא Voyage AI
def embed(texts: list[str]) -> list[list[float]]:
    res = requests.post(
        "https://api.voyageai.com/v1/embeddings",
        headers={"Authorization": f"Bearer {VOYAGE_API_KEY}"},
        json={"input": texts, "model": "voyage-3"},
    )
    return [item["embedding"] for item in res.json()["data"]]

vectors = embed(["כלב רץ בפארק", "הכלבלב שיחק בגינה הציבורית", "מניית אפל עלתה היום"])
print(cosine_similarity(vectors[0], vectors[1]))  # → ~0.85 (דומים מאוד)
print(cosine_similarity(vectors[0], vectors[2]))  # → ~0.15 (לא קשורים)`,
      },
      { type: 'heading', text: 'מודלי Embedding נפוצים' },
      {
        type: 'table',
        caption: 'השוואת מודלי Embedding מובילים',
        headers: ['מודל', 'ספק', 'מימדים', 'הערה'],
        rows: [
          ['voyage-3', 'Voyage AI', '1024', 'מומלץ ע"י Anthropic לשימוש עם Claude'],
          ['text-embedding-3-small', 'OpenAI', '1536', 'זול ומהיר, איכות טובה'],
          ['text-embedding-3-large', 'OpenAI', '3072', 'איכות גבוהה, יקר ואיטי יותר'],
          ['embed-v3', 'Cohere', '1024', 'תמיכה רב-לשונית חזקה'],
          ['bge-small-en', 'BAAI (open source)', '384', 'ריצה עצמית (self-hosted), קל'],
          ['all-MiniLM-L6-v2', 'sentence-transformers', '384', 'קליל מאוד, טוב לפרוטוטייפ מקומי'],
        ],
      },
      {
        type: 'tip',
        text: 'מספר המימדים משפיע ישירות על גודל האחסון (מימד × מספר החתיכות) ועל מהירות החיפוש. מימדים גבוהים יותר בדרך כלל משפרים דיוק — אך לא תמיד שווה את העלות הנוספת.',
      },
      { type: 'heading', text: 'Embeddings ב-Node.js' },
      {
        type: 'text',
        text: 'אותה קריאה בדיוק אפשר לבצע מ-Node.js — שימושי כשבונים pipeline של RAG בתוך שרת Express קיים. שימו לב שחשוב תמיד להשתמש **באותו מודל embedding** גם למסמכים וגם לשאילתות — לא ניתן להשוות וקטורים שנוצרו על ידי מודלים שונים.',
      },
      {
        type: 'code',
        lang: 'typescript',
        caption: 'embed.ts — קריאה ל-Voyage AI מ-Node.js',
        code: `async function embed(texts: string[]): Promise<number[][]> {
  const res = await fetch('https://api.voyageai.com/v1/embeddings', {
    method: 'POST',
    headers: {
      Authorization: \`Bearer \${process.env.VOYAGE_API_KEY}\`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ input: texts, model: 'voyage-3' }),
  })
  const data = await res.json()
  return data.data.map((item: { embedding: number[] }) => item.embedding)
}

const [vec] = await embed(['מה זה LEFT JOIN?'])
console.log(vec.length) // → 1024`,
      },
    ],
    questionBank: [
      {
        id: 'rag-embeddings-q1',
        text: 'מה זה Embedding?',
        options: [
          'קובץ הגדרות של מודל',
          'ייצוג מספרי (וקטור) של המשמעות הסמנטית של טקסט',
          'שם אחר ל-token',
          'מנגנון הצפנה של טקסט',
        ],
        correct: 1,
        explanation: 'Embedding הוא וקטור מספרי שמייצג משמעות. טקסטים בעלי משמעות דומה מקבלים וקטורים קרובים במרחב הרב-ממדי, גם אם המילים שונות.',
      },
      {
        id: 'rag-embeddings-q2',
        text: 'מה בדיוק מודד Cosine Similarity?',
        options: [
          'את המרחק האוקלידי בין נקודות',
          'את הזווית בין שני וקטורים — לא את האורך שלהם',
          'את מספר המילים המשותפות',
          'את מהירות החישוב',
        ],
        correct: 1,
        explanation: 'Cosine Similarity מודד זווית (כיוון), לא אורך. ערך 1 = זהים בכיוון, 0- = הפוכים לגמרי. זה הופך אותו לחסין לאורך טקסט שונה.',
      },
      {
        id: 'rag-embeddings-q3',
        text: 'למה חיפוש מבוסס embeddings עדיף לעיתים על חיפוש מילות מפתח רגיל?',
        options: [
          'הוא תמיד מהיר יותר',
          'הוא מבין משמעות (synonyms, ניסוח שונה), לא רק התאמה מדויקת של מילים',
          'הוא לא דורש אינדקס',
          'הוא זול יותר תמיד',
        ],
        correct: 1,
        explanation: 'חיפוש סמנטי מוצא "הכלבלב שיחק בגינה" כתוצאה רלוונטית לשאילתה "כלב רץ בפארק" — למרות שאין מילה משותפת. חיפוש מילות מפתח היה מפספס את זה.',
      },
      {
        id: 'rag-embeddings-q4',
        text: 'איזה ספק Anthropic ממליצה עליו ל-embeddings, מכיוון ש-Claude עצמו לא מספק API כזה?',
        options: ['OpenAI בלבד', 'Voyage AI', 'Google', 'Meta'],
        correct: 1,
        explanation: 'Anthropic לא מציעה API ל-embeddings משל עצמה, וממליצה על Voyage AI (למשל מודל voyage-3) כשילוב מומלץ לצד Claude.',
      },
      {
        id: 'rag-embeddings-q5',
        text: 'למה חשוב להשתמש באותו מודל embedding גם למסמכים וגם לשאילתות?',
        options: [
          'זה לא באמת חשוב',
          'וקטורים שנוצרו על ידי מודלים שונים לא ניתנים להשוואה משמעותית',
          'זה משפיע רק על המחיר',
          'רק כדי לחסוך בקריאות API',
        ],
        correct: 1,
        explanation: 'כל מודל embedding "ממפה" משמעות למרחב וקטורי שונה משלו. השוואת וקטורים ממודלים שונים היא כמו להשוות מרחקים בקילומטרים למיילים בלי המרה.',
      },
      {
        id: 'rag-embeddings-q6',
        text: 'מה ההשפעה העיקרית של מספר המימדים (dimensions) של embedding?',
        options: [
          'אין לזה שום השפעה',
          'משפיע על גודל האחסון ומהירות החיפוש, ולעיתים על דיוק',
          'קובע את שפת הטקסט',
          'קובע את אורך הטקסט המקסימלי',
        ],
        correct: 1,
        explanation: 'וקטור עם יותר מימדים תופס יותר מקום באחסון ומאט חיפוש. לרוב מימדים גבוהים יותר משפרים ייצוג משמעות, אך זה לא ליניארי ולא תמיד שווה את העלות.',
      },
    ],
  },

  {
    id: 'rag-vector-db',
    title: 'Vector DB — מסדי נתונים וקטוריים',
    summary: 'איך מאחסנים מיליוני embeddings וחוזרים אליהם במילישניות — ANN, HNSW וכלים מובילים',
    emoji: '🗂️',
    content: [
      { type: 'heading', text: 'מה זה Vector Database?' },
      {
        type: 'text',
        text: 'מסד נתונים וקטורי הוא מסד נתונים שמותאם במיוחד לאחסון וקטורים רב-ממדיים ולחיפוש מהיר של "השכנים הקרובים ביותר" (Nearest Neighbors) ביניהם. סריקה מלאה (linear scan) על מיליוני וקטורים כדי למצוא את הדומים ביותר לוקחת יותר מדי זמן — Vector DB פותר את זה עם אינדקסים ייעודיים שהופכים חיפוש לכמעט מיידי.',
      },
      { type: 'heading', text: 'החיפוש: Approximate Nearest Neighbor (ANN)' },
      {
        type: 'text',
        text: 'חיפוש שכן קרוב **מדויק** דורש השוואה מול כל וקטור באוסף — יקר מדי בקנה מידה גדול. אלגוריתמי ANN (Approximate Nearest Neighbor) מוותרים על מעט מדיוק תמורת שיפור עצום במהירות, בעזרת מבני נתונים חכמים כמו גרפים (HNSW) או אשכולות (IVF).',
      },
      { type: 'heading', text: 'HNSW — האינדקס הכי נפוץ' },
      {
        type: 'text',
        text: 'HNSW (Hierarchical Navigable Small World) בונה גרף רב-שכבתי: השכבות העליונות דלילות ומאפשרות "קפיצות" ארוכות ומהירות במרחב, השכבות התחתונות צפופות ומדויקות. חיפוש מתחיל למעלה וזוחל למטה, ומגיע לתשובה טובה מאוד תוך בדיקת שבריר קטן מהוקטורים בלבד. זהו האינדקס שברירת המחדל ברוב מסדי הנתונים הוקטוריים המודרניים.',
      },
      {
        type: 'code',
        lang: 'python',
        caption: 'שימוש ב-Chroma — Vector DB מקומי לפרוטוטייפ מהיר',
        code: `import chromadb

client = chromadb.Client()
collection = client.create_collection("codelearn-docs")

collection.add(
    ids=["doc1", "doc2", "doc3"],
    embeddings=[[0.12, 0.98, ...], [0.45, 0.11, ...], [0.33, 0.67, ...]],
    documents=["JOIN מחבר בין טבלאות", "INDEX מאיץ שאילתות", "VIEW הוא טבלה וירטואלית"],
    metadatas=[{"course": "sql"}, {"course": "sql"}, {"course": "sql"}],
)

results = collection.query(
    query_embeddings=[[0.14, 0.95, ...]],
    n_results=2,
)
print(results["documents"])  # → 2 המסמכים הכי דומים לשאילתה`,
      },
      { type: 'heading', text: 'Metadata Filtering' },
      {
        type: 'text',
        text: 'לרוב לא רוצים לחפש בכל האוסף — רק בתת-קבוצה רלוונטית (למשל: רק מסמכים של המשתמש הנוכחי, או רק שיעורי SQL). Vector DB טובים תומכים בסינון לפי metadata **יחד עם** חיפוש וקטורי, בשאילתה אחת.',
      },
      {
        type: 'code',
        lang: 'python',
        caption: 'Qdrant — חיפוש וקטורי עם סינון metadata',
        code: `from qdrant_client import QdrantClient
from qdrant_client.models import Filter, FieldCondition, MatchValue

client = QdrantClient(url="http://localhost:6333")

results = client.search(
    collection_name="codelearn-docs",
    query_vector=query_embedding,
    query_filter=Filter(
        must=[FieldCondition(key="course", match=MatchValue(value="sql"))]
    ),
    limit=5,
)`,
      },
      { type: 'heading', text: 'איזה Vector DB לבחור?' },
      {
        type: 'table',
        caption: 'השוואת מסדי נתונים וקטוריים נפוצים',
        headers: ['כלי', 'סוג', 'מתי מתאים'],
        rows: [
          ['Pinecone', 'מנוהל בענן', 'רוצים פתרון מוכן ללא תחזוקה, סקייל גדול'],
          ['Qdrant', 'open source', 'סינון metadata מתקדם, ריצה עצמית או ענן'],
          ['Weaviate', 'open source', 'חיפוש hybrid מובנה, GraphQL API'],
          ['Milvus', 'open source', 'סקייל ענק, native ל-Kubernetes'],
          ['Chroma', 'מקומי / embedded', 'פרוטוטייפ מהיר, פיתוח מקומי'],
          ['pgvector', 'תוסף ל-Postgres', 'כבר עובדים עם Postgres, לא רוצים תשתית נוספת'],
        ],
      },
      {
        type: 'tip',
        text: 'כלל אצבע: אם כבר יש לכם Postgres בפרודקשן — התחילו עם pgvector לפני שאתם מוסיפים תשתית חדשה. עברו ל-Pinecone/Qdrant/Milvus רק כשהסקייל או דרישות הביצועים דורשים זאת.',
      },
    ],
    questionBank: [
      {
        id: 'rag-vectordb-q1',
        text: 'מה הבעיה שמסד נתונים וקטורי פותר, שלא ניתן לפתור יעיל עם סריקה מלאה של טבלה רגילה?',
        options: [
          'אחסון קבצים גדולים',
          'חיפוש מהיר של השכנים הקרובים ביותר בין מיליוני וקטורים',
          'ניהול הרשאות משתמשים',
          'גיבוי אוטומטי',
        ],
        correct: 1,
        explanation: 'סריקה מלאה על מיליוני וקטורים איטית מדי. Vector DB משתמש באינדקסים ייעודיים (כמו HNSW) כדי להחזיר תוצאות דומות כמעט מיידית.',
      },
      {
        id: 'rag-vectordb-q2',
        text: 'מה זה ANN (Approximate Nearest Neighbor) ומה ה-trade-off שלו?',
        options: [
          'חיפוש מדויק לחלוטין, איטי',
          'אלגוריתם שמוותר על מעט דיוק תמורת שיפור עצום במהירות',
          'שיטת הצפנה של וקטורים',
          'פרוטוקול תקשורת בין שרתים',
        ],
        correct: 1,
        explanation: 'ANN לא מבטיח את התוצאה המדויקת ביותר תמיד, אלא תוצאה קרובה מאוד — במחיר בדיקה של שבריר קטן מהנתונים, מה שהופך חיפוש בקנה מידה גדול לאפשרי.',
      },
      {
        id: 'rag-vectordb-q3',
        text: 'מהו HNSW?',
        options: [
          'שפת שאילתות ל-Vector DB',
          'מבנה אינדקס גרפי רב-שכבתי לחיפוש דמיון מהיר',
          'פרוטוקול אבטחה',
          'פורמט קובץ לאחסון embeddings',
        ],
        correct: 1,
        explanation: 'HNSW בונה גרף רב-שכבתי — שכבות עליונות דלילות לקפיצות מהירות, שכבות תחתונות צפופות לדיוק. זהו אינדקס ברירת המחדל ברוב הכלים המודרניים.',
      },
      {
        id: 'rag-vectordb-q4',
        text: 'למה שימושי לשלב Metadata Filtering יחד עם חיפוש וקטורי?',
        options: [
          'זה מאיץ בלבד את הכתיבה לדאטהבייס',
          'מאפשר לצמצם את החיפוש לתת-קבוצה רלוונטית (למשל, מסמכי משתמש ספציפי)',
          'זה חובה טכנית ואי אפשר בלעדיו',
          'זה מחליף לגמרי את הצורך בחיפוש וקטורי',
        ],
        correct: 1,
        explanation: 'רוב מקרי השימוש דורשים לחפש רק בתת-קבוצה (course, user_id, תאריך). Metadata filtering מאפשר לשלב תנאי SQL-כמו ביחד עם דמיון וקטורי, בשאילתה אחת.',
      },
      {
        id: 'rag-vectordb-q5',
        text: 'מתי הגיוני להתחיל עם pgvector במקום להוסיף Vector DB ייעודי חדש?',
        options: [
          'אף פעם, תמיד עדיף כלי ייעודי',
          'כשכבר יש לכם Postgres בפרודקשן ואין דרישות סקייל קיצוניות',
          'רק לפרויקטים קטנים מאוד ללא נתונים',
          'רק כשמשתמשים ב-MongoDB',
        ],
        correct: 1,
        explanation: 'pgvector הוא תוסף ל-Postgres שמאפשר חיפוש וקטורי בתוך מסד הנתונים הקיים — חוסך הוספת תשתית ותחזוקה נוספת כשהיא לא ממש נדרשת.',
      },
      {
        id: 'rag-vectordb-q6',
        text: 'איזה כלי מתאים במיוחד לפרוטוטייפ מהיר ולפיתוח מקומי, ללא צורך בשרת נפרד?',
        options: ['Milvus', 'Pinecone', 'Chroma', 'Weaviate Cloud'],
        correct: 2,
        explanation: 'Chroma רץ מקומית (embedded) בקלות רבה — ללא הקמת שרת נפרד — ולכן מתאים מאוד לפיתוח ולבדיקות מהירות לפני מעבר לפתרון production-grade.',
      },
    ],
  },

  {
    id: 'rag-chunking',
    title: 'Chunking — פירוק מסמכים לחתיכות',
    summary: 'איך מחלקים מסמכים ארוכים לחתיכות שאפשר לשלוף בדיוק — אסטרטגיות, גודל ו-overlap',
    emoji: '✂️',
    content: [
      { type: 'heading', text: 'למה בכלל מפרקים מסמכים?' },
      {
        type: 'text',
        text: 'אי אפשר פשוט להטמיע (embed) מסמך שלם כווקטור אחד — מסמך ארוך מערבב יותר מדי נושאים, וה-embedding שייווצר יהיה "מטושטש" וממוצע, לא ממוקד. בנוסף, גם אם המודל מקבל context window ענק, אתם רוצים לשלוח לו רק את הקטע הרלוונטי לשאלה — לא מסמך של 50 עמודים. Chunking פותר את שתי הבעיות: הוא מחלק מסמכים לחתיכות קטנות וממוקדות שאפשר להטמיע ולשלוף בנפרד.',
      },
      { type: 'heading', text: 'השיטה הבסיסית: חיתוך לפי גודל קבוע' },
      {
        type: 'text',
        text: 'הגישה הפשוטה ביותר: לחתוך כל N תווים או tokens. הבעיה: חיתוך "עיוור" עלול לקטוע משפט בדיוק באמצע. לכן כמעט תמיד משתמשים ב-Recursive Character Splitting — מנסה לחתוך קודם לפי פסקאות, ואם חתיכה עדיין גדולה מדי — לפי משפטים, ואז לפי מילים, כדי לשמור על גבולות טבעיים ככל האפשר.',
      },
      {
        type: 'code',
        lang: 'python',
        caption: 'LangChain — Recursive Character Text Splitter',
        code: `from langchain.text_splitter import RecursiveCharacterTextSplitter

splitter = RecursiveCharacterTextSplitter(
    chunk_size=800,      # תווים לכל חתיכה (בקירוב)
    chunk_overlap=120,   # חפיפה בין חתיכות סמוכות
    separators=["\\n\\n", "\\n", ". ", " "],  # מנסה לחתוך בגבול טבעי, בסדר הזה
)

chunks = splitter.split_text(long_document_text)
print(len(chunks))       # → למשל 34 חתיכות
print(chunks[0][:100])   # → תחילת החתיכה הראשונה`,
      },
      { type: 'heading', text: 'Overlap — למה חופפים בין חתיכות?' },
      {
        type: 'text',
        text: 'אם חותכים בדיוק בגבול, משפט מפתח יכול "להיקטע" בין שתי חתיכות ולאבד את ההקשר שלו בשתיהן. Overlap (למשל 100-150 תווים חופפים) מבטיח שמידע שנמצא קרוב לגבול יופיע במלואו בלפחות חתיכה אחת, ושומר על רציפות הקשרית בין חתיכות סמוכות.',
      },
      { type: 'heading', text: 'Chunking לפי משמעות (Semantic Chunking)' },
      {
        type: 'text',
        text: 'שיטה מתקדמת יותר: לחשב embedding לכל משפט, ולזהות היכן המשמעות "קופצת" משמעותית ממשפט למשפט — שם, ולא במיקום שרירותי, לחתוך חתיכה חדשה. זה יקר יותר חישובית (דורש embedding לכל משפט מראש) אבל מייצר חתיכות שכל אחת עוסקת בנושא אחד מגובש.',
      },
      {
        type: 'table',
        caption: 'השוואת אסטרטגיות Chunking',
        headers: ['שיטה', 'יתרון', 'חיסרון'],
        rows: [
          ['גודל קבוע (Fixed-size)', 'פשוט ומהיר', 'עלול לקטוע באמצע משפט'],
          ['לפי משפטים', 'מכבד גבולות דקדוקיים', 'חתיכות בגדלים לא אחידים'],
          ['Recursive (פסקה→משפט→מילה)', 'איזון טוב בין מבנה לגודל — ברירת המחדל הנפוצה', 'עדיין לא "מבין" משמעות'],
          ['סמנטי (Semantic)', 'כל חתיכה עוסקת בנושא אחד קוהרנטי', 'יקר חישובית, מורכב יותר ליישום'],
          ['לפי מבנה מסמך (Markdown/HTML)', 'מנצל כותרות/סעיפים קיימים', 'תלוי שהמסמך אכן מובנה'],
        ],
      },
      {
        type: 'tip',
        text: 'נקודת התחלה סבירה לרוב הפרויקטים: chunk_size של 500-1000 tokens עם overlap של 10%-20%. כוונו את זה לפי בדיקות (evaluation) על שאלות אמיתיות, לא לפי תחושת בטן.',
      },
    ],
    questionBank: [
      {
        id: 'rag-chunking-q1',
        text: 'למה לא כדאי להטמיע מסמך שלם וארוך כ-embedding יחיד?',
        options: [
          'זה עולה יותר כסף תמיד',
          'ה-embedding יהיה "מטושטש" — ממוצע בין נושאים רבים, לא ממוקד',
          'זה טכנית בלתי אפשרי',
          'זה מפר את גבולות ה-context window תמיד',
        ],
        correct: 1,
        explanation: 'מסמך ארוך מערבב נושאים רבים. embedding יחיד לכל המסמך מאבד את היכולת להבדיל בין חלקים שונים ורלוונטיים לשאלות שונות.',
      },
      {
        id: 'rag-chunking-q2',
        text: 'מה תפקיד ה-overlap בין חתיכות?',
        options: [
          'להגדיל את מספר החתיכות בכוונה',
          'למנוע אובדן הקשר של מידע שנמצא בדיוק על גבול בין חתיכות',
          'לשפר את מהירות ה-embedding',
          'להקטין את גודל האחסון',
        ],
        correct: 1,
        explanation: 'ללא overlap, משפט קריטי שנמצא בדיוק על הגבול בין שתי חתיכות עלול להיקטע ולאבד הקשר בשתיהן. חפיפה מבטיחה שהוא יופיע במלואו לפחות פעם אחת.',
      },
      {
        id: 'rag-chunking-q3',
        text: 'מהי נקודת התחלה סבירה לגודל חתיכה (chunk size) ברוב הפרויקטים?',
        options: ['5-10 tokens', 'כ-500-1000 tokens', '50,000 tokens', 'תמיד המסמך השלם'],
        correct: 1,
        explanation: '500-1000 tokens הוא איזון סביר בין מספיק הקשר לבין מיקוד. הערך האופטימלי בפועל תלוי בפרויקט ונקבע ע"י בדיקות (evaluation).',
      },
      {
        id: 'rag-chunking-q4',
        text: 'מהו Semantic Chunking?',
        options: [
          'חיתוך לפי מספר תווים קבוע',
          'חיתוך במקומות שבהם המשמעות (embedding) קופצת משמעותית בין משפטים',
          'חיתוך אקראי',
          'חיתוך לפי אורך שם הקובץ',
        ],
        correct: 1,
        explanation: 'Semantic Chunking מחשב embedding לכל משפט ומזהה שינויי משמעות — כך כל חתיכה שנוצרת עוסקת בנושא אחד קוהרנטי, במחיר עלות חישוב גבוהה יותר.',
      },
      {
        id: 'rag-chunking-q5',
        text: 'איזו שיטת chunking משמשת כברירת מחדל נפוצה, כי היא מאזנת מבנה טבעי עם גודל אחיד?',
        options: ['גודל קבוע ללא הבחנה', 'Recursive Character Splitting (פסקה → משפט → מילה)', 'חיתוך אקראי', 'ללא חיתוך בכלל'],
        correct: 1,
        explanation: 'Recursive Character Splitting מנסה תחילה לחתוך בגבולות טבעיים (פסקאות, משפטים) ורק כשצריך יורד לרמת מילים — נותן תוצאה מאוזנת בפרקטיקה.',
      },
      {
        id: 'rag-chunking-q6',
        text: 'מה עלול לקרות אם חתיכות (chunks) קטנות מדי?',
        options: [
          'שום דבר, קטן תמיד עדיף',
          'עלולות לאבד הקשר ולהפוך לפרגמנטים לא מובנים בפני עצמם',
          'הן ייקחו יותר זמן להטמיע',
          'הן ישפרו אוטומטית את דיוק ה-retrieval',
        ],
        correct: 1,
        explanation: 'חתיכה קטנה מדי עלולה לאבד את ההקשר הדרוש להבנתה בפני עצמה — לדוגמה "הוא עלה ב-15%" בלי לדעת על מה מדובר. יש לאזן בין גודל להקשר.',
      },
    ],
  },

  {
    id: 'rag-retrieval',
    title: 'Retrieval — שליפת מידע רלוונטי',
    summary: 'תהליך ה-retrieval המלא — top-k, חיפוש היברידי (Hybrid Search) ו-MMR לגיוון תוצאות',
    emoji: '🎯',
    content: [
      { type: 'heading', text: 'תהליך ה-Retrieval המלא' },
      {
        type: 'text',
        text: 'זהו הצינור (pipeline) הבסיסי שבו כל מערכת RAG משתמשת: (1) המשתמש שואל שאלה. (2) מטמיעים (embed) את השאלה **באותו מודל embedding** ששימש למסמכים. (3) מחפשים ב-Vector DB את החתיכות הכי דומות לוקטור השאלה. (4) מחזירים את ה-top-k התוצאות. (5) מצרפים אותן כ-context לפרומפט שנשלח ל-LLM, שמנסח תשובה על סמך המידע שסופק.',
      },
      {
        type: 'code',
        lang: 'text',
        caption: 'הצינור המלא — משאלה עד תשובה',
        code: `שאלת משתמש: "מה ההבדל בין LEFT JOIN ל-INNER JOIN?"
        │
        ▼
   embed(question) ──► [0.12, 0.87, ...]  (וקטור שאלה)
        │
        ▼
  Vector DB.search(vector, k=5) ──► 5 חתיכות הכי דומות
        │
        ▼
  בניית פרומפט:
    "בהתבסס על המידע הבא, ענה על השאלה:
     [חתיכה 1] [חתיכה 2] ... [חתיכה 5]
     שאלה: מה ההבדל בין LEFT JOIN ל-INNER JOIN?"
        │
        ▼
      Claude ──► תשובה מבוססת מקורות אמיתיים`,
      },
      { type: 'heading', text: 'Top-K — כמה תוצאות להביא?' },
      {
        type: 'text',
        text: 'k קטן מדי (1-2) מסתכן בפספוס מידע רלוונטי שפשוט לא נבחר. k גדול מדי (20+) מציף את ה-context ב"רעש" — מידע לא רלוונטי שגם עולה יותר טוקנים, וגם עלול לפגוע בתשובה (למודלים יש נטייה "לשכוח" מידע שנמצא באמצע context ארוך — תופעה שמכונה Lost in the Middle). k=3-8 הוא טווח נפוץ ומאוזן.',
      },
      { type: 'heading', text: 'Hybrid Search — וקטורי + מילות מפתח' },
      {
        type: 'text',
        text: 'חיפוש וקטורי מצוין בהבנת משמעות, אבל חלש בהתאמת מונחים מדויקים — מספרי מוצר, קודי שגיאה, שמות פרטיים נדירים. חיפוש מילות מפתח קלאסי (BM25) מצטיין בדיוק כאן, אבל מפספס ניסוח שונה עם אותה משמעות. Hybrid Search משלב את שני הציונים — לרוב באמצעות Reciprocal Rank Fusion (RRF) — ומקבל את היתרונות של שתי הגישות.',
      },
      {
        type: 'table',
        caption: 'וקטורי לעומת מילות מפתח לעומת Hybrid',
        headers: ['שיטה', 'חזק ב-', 'חלש ב-'],
        rows: [
          ['חיפוש וקטורי בלבד', 'ניסוח שונה, נרדפות, שאלות טבעיות', 'מונחים מדויקים, קודים, מספרים'],
          ['BM25 (מילות מפתח)', 'התאמה מדויקת, מונחים נדירים', 'ניסוח שונה, שאלות עקיפות'],
          ['Hybrid (RRF)', 'משלב את שני היתרונות', 'מורכבות יישום מעט גבוהה יותר'],
        ],
      },
      {
        type: 'code',
        lang: 'python',
        caption: 'שילוב ציוני וקטורי + BM25 עם Reciprocal Rank Fusion',
        code: `def reciprocal_rank_fusion(vector_ranks: dict, bm25_ranks: dict, k: int = 60) -> dict:
    scores: dict[str, float] = {}
    for doc_id, rank in vector_ranks.items():
        scores[doc_id] = scores.get(doc_id, 0) + 1 / (k + rank)
    for doc_id, rank in bm25_ranks.items():
        scores[doc_id] = scores.get(doc_id, 0) + 1 / (k + rank)
    return dict(sorted(scores.items(), key=lambda x: x[1], reverse=True))`,
      },
      { type: 'heading', text: 'MMR — גיוון בתוצאות' },
      {
        type: 'text',
        text: 'לפעמים ה-top-5 תוצאות הן כולן וריאציות כמעט זהות של אותו קטע — לא מוסיפות מידע חדש. MMR (Maximal Marginal Relevance) בוחר תוצאות תוך איזון בין רלוונטיות לשאלה לבין שוני מהתוצאות שכבר נבחרו, כך שהסט הסופי מכסה טווח רחב יותר של מידע רלוונטי, לא רק חזרה על אותו קטע.',
      },
      {
        type: 'tip',
        text: 'זכרו את "Lost in the Middle": כשמצרפים כמה חתיכות לפרומפט, שקלו לסדר את החשובות ביותר בתחילת ה-context או בסופו — לא לקבור אותן באמצע.',
      },
    ],
    questionBank: [
      {
        id: 'rag-retrieval-q1',
        text: 'מה חייבים לעשות לשאלת המשתמש לפני שמחפשים ב-Vector DB?',
        options: [
          'לתרגם אותה לאנגלית',
          'להטמיע אותה (embed) באותו מודל embedding ששימש למסמכים',
          'לשמור אותה בקובץ טקסט',
          'לבצע עליה stemming ידני',
        ],
        correct: 1,
        explanation: 'כדי להשוות בין השאלה למסמכים במרחב הוקטורי, חייבים ליצור embedding לשאלה באותו מודל בדיוק ששימש להטמעת המסמכים.',
      },
      {
        id: 'rag-retrieval-q2',
        text: 'למה בחירת k (מספר התוצאות) היא trade-off?',
        options: [
          'אין שום trade-off, ככל שיותר כך טוב יותר תמיד',
          'k קטן מדי מפספס מידע, k גדול מדי מוסיף רעש ועלול לפגוע בתשומת הלב של המודל',
          'k משפיע רק על העלות הכספית',
          'k חייב להיות תמיד 1',
        ],
        correct: 1,
        explanation: 'k קטן מסתכן בפספוס מידע חשוב. k גדול מדי מכניס רעש לקונטקסט ומעלה סיכון לתופעת Lost in the Middle, שבה המודל "מתעלם" ממידע באמצע context ארוך.',
      },
      {
        id: 'rag-retrieval-q3',
        text: 'מהו BM25?',
        options: [
          'מודל embedding מתקדם',
          'אלגוריתם חיפוש קלאסי מבוסס מילות מפתח/תדירות מונחים',
          'מסד נתונים וקטורי',
          'שיטת reranking',
        ],
        correct: 1,
        explanation: 'BM25 הוא אלגוריתם חיפוש טקסט קלאסי (לא מבוסס embeddings) שמדרג מסמכים לפי התאמת מילות מפתח ותדירותן — חזק בזיהוי מונחים מדויקים.',
      },
      {
        id: 'rag-retrieval-q4',
        text: 'למה כדאי לשלב Hybrid Search (וקטורי + מילות מפתח) במקום להסתפק בוקטורי בלבד?',
        options: [
          'זה תמיד זול יותר',
          'חיפוש וקטורי לבדו עלול לפספס מונחים מדויקים (קודים, מספרים) שחיפוש מילות מפתח תופס',
          'זה מבטל את הצורך ב-embeddings',
          'זה חובה בכל Vector DB',
        ],
        correct: 1,
        explanation: 'חיפוש וקטורי מצוין בהבנת משמעות אך חלש בהתאמות מדויקות (קוד שגיאה, מספר מוצר). Hybrid Search משלב את שני היתרונות בעזרת מנגנון כמו RRF.',
      },
      {
        id: 'rag-retrieval-q5',
        text: 'מה מטרת MMR (Maximal Marginal Relevance)?',
        options: [
          'להאיץ את מהירות החיפוש',
          'לגוון את התוצאות ולהימנע מהחזרת כמה תוצאות כמעט-זהות',
          'להקטין את מספר המימדים של הוקטור',
          'לתרגם את התוצאות לעברית',
        ],
        correct: 1,
        explanation: 'MMR בוחר תוצאות שמאזנות בין רלוונטיות גבוהה לבין שוני מהתוצאות שכבר נבחרו — כך הסט הסופי מכסה יותר היבטים של המידע הרלוונטי, במקום לחזור על אותו קטע.',
      },
      {
        id: 'rag-retrieval-q6',
        text: 'מהי תופעת "Lost in the Middle"?',
        options: [
          'המודל מאבד חיבור לאינטרנט',
          'מודלי שפה נוטים לשים פחות תשומת לב למידע שנמצא באמצע context ארוך',
          'שגיאת חיבור ל-Vector DB',
          'אובדן וקטורים בזמן אינדוקס',
        ],
        correct: 1,
        explanation: 'מחקרים הראו שמודלי שפה "זוכרים" פחות טוב מידע שממוקם באמצע פרומפט ארוך, לעומת ההתחלה או הסוף — שיקול חשוב בסידור החתיכות שמצרפים לפרומפט.',
      },
    ],
  },

  {
    id: 'rag-reranking',
    title: 'Reranking — שיפור סדר התוצאות',
    summary: 'למה retrieval לבד לא מספיק — Bi-Encoder מול Cross-Encoder, ופייפליין דו-שלבי',
    emoji: '📈',
    content: [
      { type: 'heading', text: 'למה Retrieval לבד לא מספיק?' },
      {
        type: 'text',
        text: 'ה-retrieval הראשוני (חיפוש וקטורי) מותאם למהירות על פני מיליוני מסמכים — לא לדיוק מושלם. לעיתים קרובות החתיכה הכי רלוונטית באמת מדורגת במקום ה-7 ולא הראשון. Reranking מוסיף שלב שני, איטי יותר אך מדויק בהרבה, שמריץ מודל חזק **רק** על מספר קטן של מועמדים (למשל 20-50 שכבר עברו סינון ראשוני) — ומסדר אותם מחדש לפי רלוונטיות אמיתית.',
      },
      { type: 'heading', text: 'Bi-Encoder מול Cross-Encoder' },
      {
        type: 'text',
        text: 'חיפוש וקטורי רגיל משתמש ב-Bi-Encoder: השאלה והמסמך מוטמעים (embedded) **בנפרד**, ואז משווים בין הווקטורים. זה מהיר כי embeddings של מסמכים מחושבים מראש ונשמרים. Cross-Encoder, לעומת זאת, מקבל את השאלה והמסמך **יחד** כקלט אחד למודל, ומחזיר ציון רלוונטיות מדויק מאוד — אבל חייב לרוץ בזמן אמת לכל זוג, ולכן איטי מכדי להריץ על מיליוני מסמכים.',
      },
      {
        type: 'table',
        caption: 'Bi-Encoder לעומת Cross-Encoder',
        headers: ['תכונה', 'Bi-Encoder', 'Cross-Encoder'],
        rows: [
          ['איך עובד', 'מטמיע שאלה ומסמך בנפרד, משווה וקטורים', 'מעבד שאלה+מסמך יחד, מחזיר ציון ישיר'],
          ['מהירות', 'מהיר מאוד (embeddings מוכנים מראש)', 'איטי — חייב לרוץ per-pair'],
          ['דיוק', 'טוב', 'גבוה משמעותית'],
          ['שימוש טיפוסי', 'retrieval ראשוני על כל האוסף', 'reranking על מועמדים מצומצמים בלבד'],
        ],
      },
      { type: 'heading', text: 'כלים נפוצים ל-Reranking' },
      {
        type: 'text',
        text: 'יש שירותי rerank מנוהלים (Cohere Rerank, Voyage rerank) שמקבלים שאלה ורשימת מסמכים ומחזירים אותם מסודרים מחדש — נוח כי לא צריך להריץ מודל בעצמכם. לחלופין, אפשר להריץ Cross-Encoder בעצמכם (self-hosted) עם ספריות פתוחות כמו sentence-transformers, למשל מודל ms-marco-MiniLM או bge-reranker.',
      },
      {
        type: 'code',
        lang: 'python',
        caption: 'Reranking עם Cohere Rerank API',
        code: `import cohere

co = cohere.Client(COHERE_API_KEY)

response = co.rerank(
    query="מה ההבדל בין LEFT JOIN ל-INNER JOIN?",
    documents=[
        "INNER JOIN מחזיר רק שורות תואמות בשתי הטבלאות",
        "מחיר המניה עלה השבוע",
        "LEFT JOIN מחזיר את כל שורות הטבלה השמאלית, גם ללא התאמה",
    ],
    top_n=2,
    model="rerank-v3.5",
)
for r in response.results:
    print(r.index, r.relevance_score)  # → 2 (0.97), 0 (0.89)`,
      },
      {
        type: 'code',
        lang: 'python',
        caption: 'Cross-Encoder עצמאי (self-hosted) עם sentence-transformers',
        code: `from sentence_transformers import CrossEncoder

model = CrossEncoder("cross-encoder/ms-marco-MiniLM-L-6-v2")

pairs = [(query, doc) for doc in candidate_docs]
scores = model.predict(pairs)

reranked = sorted(zip(candidate_docs, scores), key=lambda x: x[1], reverse=True)
top_5 = [doc for doc, score in reranked[:5]]`,
      },
      {
        type: 'tip',
        text: 'הדפוס הסטנדרטי: שלפו רחב וזול (vector search, k=50), ואז דייקו צר ויקר (rerank, top 5) — ורק את ה-5 הסופיים שלחו ל-LLM. כך משלמים במהירות רק על השלב שבאמת חייב אותה.',
      },
    ],
    questionBank: [
      {
        id: 'rag-reranking-q1',
        text: 'למה מוסיפים שלב reranking אחרי ה-retrieval הראשוני?',
        options: [
          'כדי לחסוך כסף',
          'כי retrieval ראשוני (וקטורי) מהיר אך פחות מדויק — reranking מדייק את הסדר על סט מצומצם',
          'כדי להחליף לגמרי את ה-Vector DB',
          'כי embeddings לא עובדים בעברית',
        ],
        correct: 1,
        explanation: 'Retrieval וקטורי מותאם למהירות על פני כל האוסף. Reranking מריץ מודל מדויק ואיטי יותר רק על מספר קטן של מועמדים, ומשפר משמעותית את איכות הסדר הסופי.',
      },
      {
        id: 'rag-reranking-q2',
        text: 'מה ההבדל המרכזי בין Bi-Encoder ל-Cross-Encoder?',
        options: [
          'אין הבדל אמיתי',
          'Bi-Encoder מטמיע שאלה ומסמך בנפרד (מהיר); Cross-Encoder מעבד אותם יחד (מדויק אך איטי)',
          'Cross-Encoder תמיד מהיר יותר',
          'Bi-Encoder עובד רק על טקסט קצר',
        ],
        correct: 1,
        explanation: 'Bi-Encoder מאפשר חישוב embeddings מראש לכל מסמך (מהיר בזמן חיפוש). Cross-Encoder מעבד את הזוג יחד בכל פעם מחדש — מדויק הרבה יותר, אך לא ניתן לחשב מראש.',
      },
      {
        id: 'rag-reranking-q3',
        text: 'למה לא מריצים Cross-Encoder ישירות על כל האוסף במקום חיפוש וקטורי?',
        options: [
          'זה בלתי אפשרי טכנית',
          'זה יקר ואיטי מדי — חייב לחשב ציון per-pair בזמן אמת לכל מסמך',
          'Cross-Encoder לא תומך בעברית',
          'אין סיבה, זו פרקטיקה נפוצה',
        ],
        correct: 1,
        explanation: 'Cross-Encoder לא ניתן לחשב מראש (הוא תלוי בזוג שאלה+מסמך ספציפי), ולכן הרצתו על מיליוני מסמכים לכל שאלה תהיה איטית מדי. לכן מריצים אותו רק על שכבת המועמדים המצומצמת.',
      },
      {
        id: 'rag-reranking-q4',
        text: 'איך נראה פייפליין דו-שלבי טיפוסי ל-retrieval באיכות גבוהה?',
        options: [
          'רק reranking בלי retrieval כלל',
          'שליפה רחבה ומהירה (vector search, k~50) ואז דיוק צר (rerank, top 5) לפני שליחה ל-LLM',
          'שליחת כל המסמכים ל-LLM ישירות',
          'שימוש ב-BM25 בלבד ללא embeddings',
        ],
        correct: 1,
        explanation: 'הדפוס הנפוץ: שלב ראשון זול ומהיר על כל האוסף (vector search), שלב שני יקר ומדויק רק על תת-קבוצה קטנה (rerank) — משיג גם מהירות וגם דיוק.',
      },
      {
        id: 'rag-reranking-q5',
        text: 'שם שירות rerank מנוהל (managed API) שהוזכר בשיעור:',
        options: ['Cohere Rerank', 'AWS S3', 'Redis', 'Nginx'],
        correct: 0,
        explanation: 'Cohere Rerank (וגם Voyage rerank) הם שירותי API מנוהלים שמקבלים שאלה ורשימת מסמכים ומחזירים אותם מדורגים מחדש לפי רלוונטיות.',
      },
      {
        id: 'rag-reranking-q6',
        text: 'איך אפשר להריץ reranking עצמאית (self-hosted) בלי API חיצוני?',
        options: [
          'זה בלתי אפשרי, חובה API',
          'עם ספרייה כמו sentence-transformers ומודל CrossEncoder מתאים',
          'רק דרך שינוי ה-Vector DB',
          'על ידי הגדלת k בלבד',
        ],
        correct: 1,
        explanation: 'sentence-transformers מספקת מודלי CrossEncoder פתוחים (כמו ms-marco-MiniLM) שניתן להריץ מקומית ולקבל ציוני רלוונטיות ללא תלות בשירות חיצוני.',
      },
    ],
  },

  {
    id: 'rag-pdf',
    title: 'RAG עם מסמכי PDF',
    summary: 'פייפליין מלא — מחילוץ טקסט מ-PDF ועד תשובה עם ציטוט מקור ומספר עמוד',
    emoji: '📄',
    content: [
      { type: 'heading', text: 'האתגר במסמכי PDF' },
      {
        type: 'text',
        text: 'PDF הוא פורמט ויזואלי-לייאאוט, לא פורמט טקסט מובנה. חילוץ טקסט נקי ממנו מסובך יותר משנדמה: עמודות מרובות עלולות להתערבב בסדר קריאה שגוי, כותרות עליונות/תחתונות חוזרות בכל עמוד, טבלאות נשברות לשורות מפוזרות, ומסמכים סרוקים (תמונה, לא טקסט אמיתי) דורשים OCR נפרד לפני שיש בכלל טקסט לעבוד איתו.',
      },
      { type: 'heading', text: 'שלב 1: חילוץ טקסט' },
      {
        type: 'table',
        caption: 'כלים לחילוץ טקסט מ-PDF',
        headers: ['כלי', 'שפה', 'הערה'],
        rows: [
          ['pdf-parse', 'Node.js', 'פשוט ומהיר, מאבד לעיתים מבנה לייאאוט'],
          ['pdfplumber', 'Python', 'טוב לזיהוי טבלאות ומיקום מדויק'],
          ['PyMuPDF (fitz)', 'Python', 'מהיר, תומך גם בחילוץ תמונות'],
          ['unstructured', 'Python', 'המודע ביותר ללייאאוט — כותרות, טבלאות, רשימות'],
          ['Tesseract (OCR)', 'רב-לשוני', 'חובה עבור PDF סרוק (תמונה בלבד, ללא שכבת טקסט)'],
        ],
      },
      {
        type: 'code',
        lang: 'typescript',
        caption: 'חילוץ טקסט מ-PDF ב-Node.js',
        code: `import pdfParse from 'pdf-parse'
import { readFile } from 'node:fs/promises'

async function extractText(filePath: string): Promise<string> {
  const buffer = await readFile(filePath)
  const data = await pdfParse(buffer)
  return data.text
}

const text = await extractText('./docs/employee-handbook.pdf')
console.log(text.slice(0, 200))`,
      },
      { type: 'heading', text: 'שלב 2: ניקוי, Chunking והטמעה' },
      {
        type: 'text',
        text: 'אחרי חילוץ הטקסט הגולמי, מנקים רעש חוזר (כותרות/כותרות תחתונות שחוזרות בכל עמוד, מספרי עמוד בודדים), מחלקים לחתיכות (ראו שיעור Chunking), ומטמיעים כל חתיכה. חשוב מאוד: שמרו את **מספר העמוד** כ-metadata לצד כל חתיכה — זה מה שיאפשר בהמשך לצטט מקור מדויק בתשובה.',
      },
      {
        type: 'code',
        lang: 'typescript',
        caption: 'פייפליין מלא — extract → chunk → embed → store',
        code: `import { RecursiveCharacterTextSplitter } from '@langchain/textsplitters'

async function ingestPdf(filePath: string, sourceId: string) {
  const rawText = await extractText(filePath)
  const cleanText = rawText.replace(/Page \\d+ of \\d+/g, '') // ניקוי כותרת חוזרת

  const splitter = new RecursiveCharacterTextSplitter({ chunkSize: 800, chunkOverlap: 120 })
  const chunks = await splitter.splitText(cleanText)

  const vectors = await embed(chunks) // מהשיעור על Embeddings

  await vectorDb.upsert(
    chunks.map((chunk, i) => ({
      id: \`\${sourceId}-chunk-\${i}\`,
      vector: vectors[i],
      payload: { text: chunk, source: sourceId, chunkIndex: i },
    })),
  )
}`,
      },
      { type: 'heading', text: 'שלב 3: שאילתה מלאה (End-to-End)' },
      {
        type: 'text',
        text: 'בזמן שאילתה: מטמיעים את שאלת המשתמש, שולפים את החתיכות הרלוונטיות ביותר עם ה-metadata שלהן, בונים פרומפט שמפריד בבירור בין המקורות (עם מספור), ומבקשים מ-Claude לענות **ולציין באיזה מקור השתמש**.',
      },
      {
        type: 'code',
        lang: 'typescript',
        caption: 'שאילתה מלאה עם ציטוט מקור',
        code: `async function askPdf(question: string, sourceId: string) {
  const [queryVector] = await embed([question])
  const results = await vectorDb.search(queryVector, { filter: { source: sourceId }, limit: 5 })

  const context = results
    .map((r, i) => \`[מקור \${i + 1}]: \${r.payload.text}\`)
    .join('\\n\\n')

  const message = await client.messages.create({
    model: 'claude-opus-4-5',
    max_tokens: 1024,
    system: 'ענה רק על סמך המקורות שסופקו. ציין תמיד באיזה מקור (מספר) השתמשת.',
    messages: [{ role: 'user', content: \`מקורות:\\n\${context}\\n\\nשאלה: \${question}\` }],
  })

  return message.content[0].type === 'text' ? message.content[0].text : ''
}`,
      },
      {
        type: 'tip',
        text: 'תמיד שמרו מספר עמוד (ולא רק שם קובץ) כ-metadata לצד כל חתיכה. במסמכים משפטיים, טכניים או רגולטוריים, היכולת להצביע על "עמוד 14" היא מה שהופך מערכת RAG מ"נחמד" ל"אמין".',
      },
    ],
    questionBank: [
      {
        id: 'rag-pdf-q1',
        text: 'למה חילוץ טקסט מ-PDF מורכב יותר מקריאת קובץ טקסט רגיל?',
        options: [
          'PDF תמיד גדול מדי',
          'PDF הוא פורמט ויזואלי-לייאאוט (עמודות, כותרות חוזרות, טבלאות) ולא טקסט מובנה',
          'PDF תמיד מוצפן',
          'אין באמת הבדל',
        ],
        correct: 1,
        explanation: 'PDF שומר מיקום ויזואלי של תווים על העמוד, לא זרימת טקסט לוגית. עמודות, כותרות חוזרות וטבלאות דורשים טיפול מיוחד בחילוץ.',
      },
      {
        id: 'rag-pdf-q2',
        text: 'מה נדרש כדי לחלץ טקסט מ-PDF שהוא בעצם תמונה סרוקה?',
        options: [
          'שום דבר מיוחד, pdf-parse רגיל מספיק',
          'OCR (כמו Tesseract) שממיר את התמונה לטקסט',
          'הגדלת chunk_size',
          'שימוש במודל embedding גדול יותר',
        ],
        correct: 1,
        explanation: 'PDF סרוק הוא בעצם תמונה — אין בו שכבת טקסט לחלץ. OCR נדרש כדי "לקרוא" את הטקסט מהתמונה לפני שאפשר להמשיך בפייפליין ה-RAG הרגיל.',
      },
      {
        id: 'rag-pdf-q3',
        text: 'למה חשוב לשמור מספר עמוד כ-metadata לצד כל חתיכה במערכת RAG על PDF?',
        options: [
          'זה לא באמת חשוב',
          'מאפשר לצטט מקור מדויק בתשובה — קריטי לאמינות במסמכים משפטיים/טכניים',
          'זה משפר את מהירות ה-embedding',
          'זה נדרש טכנית ע"י כל Vector DB',
        ],
        correct: 1,
        explanation: 'שמירת מספר עמוד מאפשרת למערכת (ולממשק המשתמש) להצביע בדיוק מאיפה הגיע המידע — יכולת קריטית לאמון במסמכים משפטיים, טכניים או רגולטוריים.',
      },
      {
        id: 'rag-pdf-q4',
        text: 'מה סדר הצעדים הנכון בפייפליין RAG על PDF?',
        options: [
          'הטמעה → חילוץ טקסט → chunking',
          'חילוץ טקסט → ניקוי וחלוקה לחתיכות → הטמעה → אחסון ב-Vector DB',
          'שליפה → הטמעה → חילוץ טקסט',
          'אחסון → חילוץ טקסט → מחיקה',
        ],
        correct: 1,
        explanation: 'הסדר הנכון: קודם מחלצים טקסט גולמי, מנקים ומחלקים לחתיכות, מטמיעים כל חתיכה, ואז שומרים ב-Vector DB. בזמן שאילתה — מטמיעים את השאלה ושולפים.',
      },
      {
        id: 'rag-pdf-q5',
        text: 'שם ספרייה ל-Node.js לחילוץ טקסט מ-PDF שהוזכרה בשיעור:',
        options: ['express', 'pdf-parse', 'zod', 'chromadb'],
        correct: 1,
        explanation: 'pdf-parse היא ספריית Node.js פשוטה ומהירה לחילוץ טקסט מקבצי PDF, מתאימה לשלב הראשון בפייפליין RAG.',
      },
      {
        id: 'rag-pdf-q6',
        text: 'איזה סוג רעש נפוץ צריך לנקות מטקסט שחולץ מ-PDF רב-עמודי?',
        options: [
          'שגיאות כתיב',
          'כותרות עליונות/תחתונות שחוזרות בכל עמוד (למשל "עמוד X מתוך Y")',
          'רווחים בין מילים',
          'סימני פיסוק',
        ],
        correct: 1,
        explanation: 'טקסטים שחוזרים על עצמם בכל עמוד (כותרות, מספרי עמוד, footer של החברה) מוסיפים רעש מיותר לחתיכות ועלולים לפגוע באיכות ה-retrieval — כדאי לנקות אותם.',
      },
    ],
  },

  {
    id: 'rag-sql-mongo',
    title: 'RAG עם SQL/Mongo',
    summary: 'שתי גישות ל-RAG על נתונים מובנים — Text-to-SQL, ו-vector search מובנה בתוך Postgres/MongoDB',
    emoji: '🧮',
    content: [
      { type: 'heading', text: 'שתי גישות ל-RAG על נתונים מובנים' },
      {
        type: 'text',
        text: 'נתונים מובנים (טבלאות SQL, מסמכי Mongo) לא מתאימים ישירות ל"חתיכות פרוזה" כמו מסמכי טקסט. יש שתי גישות עיקריות: (1) **Text-to-SQL/Query** — המודל עצמו מייצר שאילתה (SQL או Mongo aggregation) מהשפה הטבעית, מריצים אותה, ומחזירים את התוצאות. (2) **RAG מבוסס embedding על נתונים מובנים** — מטמיעים שדות טקסט (תיאורים, הערות) ושומרים את הווקטור לצד כל שורה/מסמך, ואז משלבים חיפוש וקטורי עם השדה המובנה.',
      },
      { type: 'heading', text: 'גישה 1: Text-to-SQL עם Claude' },
      {
        type: 'text',
        text: 'נותנים ל-Claude תיאור של הסכמה (שמות טבלאות/עמודות וטיפוסים) ואת שאלת המשתמש, ומבקשים ממנו לייצר שאילתת SQL בלבד (SELECT). לפני הרצה — מוודאים שהשאילתה היא read-only (אין DROP/DELETE/UPDATE/INSERT), ומריצים אותה מול משתמש DB עם הרשאות קריאה בלבד. לבסוף מחזירים את התוצאות ל-Claude כדי שינסח תשובה בשפה טבעית.',
      },
      {
        type: 'code',
        lang: 'typescript',
        caption: 'Text-to-SQL — מפרומפט לתשובה, עם ולידציה בסיסית',
        code: `const FORBIDDEN = /\\b(DROP|DELETE|UPDATE|INSERT|ALTER|TRUNCATE|;--)\\b/i

async function askDatabase(question: string): Promise<string> {
  const schema = \`
    TABLE courses (id TEXT, title TEXT, lessons_count INT)
    TABLE progress (user_id TEXT, course_id TEXT, completed_lessons INT)
  \`

  const sqlResponse = await client.messages.create({
    model: 'claude-opus-4-5',
    max_tokens: 300,
    system: \`אתה מייצר שאילתת SQL בלבד (SELECT), ללא כל טקסט נוסף, על סמך הסכמה:\\n\${schema}\`,
    messages: [{ role: 'user', content: question }],
  })

  const sql = sqlResponse.content[0].type === 'text' ? sqlResponse.content[0].text.trim() : ''

  if (FORBIDDEN.test(sql) || !/^select/i.test(sql)) {
    throw new Error('שאילתה לא בטוחה — נדחתה')
  }

  // מריצים רק מול DB user עם הרשאות קריאה בלבד (read-only role)
  const rows = await readOnlyDb.query(sql)

  const finalResponse = await client.messages.create({
    model: 'claude-opus-4-5',
    max_tokens: 500,
    messages: [
      { role: 'user', content: question },
      { role: 'user', content: \`תוצאות השאילתה: \${JSON.stringify(rows)}. נסח תשובה בעברית.\` },
    ],
  })

  return finalResponse.content[0].type === 'text' ? finalResponse.content[0].text : ''
}`,
      },
      {
        type: 'tip',
        text: 'לעולם אל תריצו SQL שנוצר ע"י LLM מול connection עם הרשאות כתיבה. תמיד: משתמש DB עם הרשאות קריאה בלבד (read-only role), רשימת חסימה למילות מפתח מסוכנות, הגבלת timeout ו-LIMIT על מספר השורות.',
      },
      { type: 'heading', text: 'גישה 2: RAG מבוסס embedding על Postgres (pgvector)' },
      {
        type: 'text',
        text: 'עם תוסף pgvector אפשר להוסיף עמודת וקטור לטבלה קיימת, להטמיע שדה טקסט (למשל תיאור מוצר), ואז לשלב תנאי SQL רגיל (WHERE) עם מיון לפי דמיון וקטורי (ORDER BY) — הכל בשאילתה אחת, בלי תשתית נפרדת.',
      },
      {
        type: 'code',
        lang: 'sql',
        caption: 'pgvector — עמודת embedding בתוך טבלה קיימת',
        code: `CREATE EXTENSION IF NOT EXISTS vector;

ALTER TABLE products ADD COLUMN embedding vector(1024);

-- חיפוש היברידי: סינון SQL רגיל + מיון לפי דמיון וקטורי
SELECT id, name, description
FROM products
WHERE category = 'electronics' AND in_stock = true
ORDER BY embedding <=> '[0.12, 0.87, ...]'  -- מרחק קוסינוס
LIMIT 5;`,
      },
      { type: 'heading', text: 'RAG על MongoDB — Atlas Vector Search' },
      {
        type: 'text',
        text: 'MongoDB Atlas מציע אינדקס וקטורי מובנה (Atlas Vector Search) שמאפשר לשמור שדה embedding בתוך מסמך רגיל, ולהריץ שלב $vectorSearch בתוך aggregation pipeline — יחד עם שלבי $match רגילים לסינון.',
      },
      {
        type: 'code',
        lang: 'javascript',
        caption: 'MongoDB Atlas Vector Search — aggregation pipeline',
        code: `const results = await db.collection('lessons').aggregate([
  {
    $vectorSearch: {
      index: 'lessons_vector_index',
      path: 'embedding',
      queryVector: queryEmbedding,
      numCandidates: 100,
      limit: 5,
    },
  },
  { $match: { course: 'sql' } },
  { $project: { title: 1, summary: 1, score: { $meta: 'vectorSearchScore' } } },
]).toArray()`,
      },
      {
        type: 'table',
        caption: 'Text-to-Query לעומת RAG מבוסס embedding על DB קיים',
        headers: ['היבט', 'Text-to-SQL/Query', 'Embedding-based RAG על DB'],
        rows: [
          ['מתי מתאים', 'שאלות אגרגציה/חישוב מדויקות ("כמה משתמשים...")', 'שאלות "מצא לי דומה ל..." על שדות טקסט'],
          ['סיכון עיקרי', 'שאילתה מסוכנת/שגויה שנוצרה ע"י המודל', 'תכנון מימדים ואינדקס וקטורי מראש'],
          ['תשתית נדרשת', 'DB read-only role + ולידציה', 'תוסף/פיצ׳ר וקטורי (pgvector / Atlas Vector Search)'],
          ['יתרון מרכזי', 'מדויק מספרית — לא "מנחש" ערכים', 'משלב סינון מובנה + דמיון סמנטי בשאילתה אחת'],
        ],
      },
    ],
    questionBank: [
      {
        id: 'rag-sqlmongo-q1',
        text: 'מהן שתי הגישות העיקריות ל-RAG על נתונים מובנים (SQL/Mongo)?',
        options: [
          'רק חיפוש מילות מפתח',
          'Text-to-SQL/Query שהמודל מייצר, ו-RAG מבוסס embedding שמוטמע לצד השורות/מסמכים',
          'רק Vector DB נפרד לגמרי',
          'אין דרך לעשות RAG על נתונים מובנים',
        ],
        correct: 1,
        explanation: 'גישה אחת נותנת למודל לייצר שאילתה (SQL/Mongo) ולהריץ אותה. גישה שנייה מטמיעה שדות טקסט ושומרת embedding לצד הנתונים המובנים לחיפוש וקטורי משולב.',
      },
      {
        id: 'rag-sqlmongo-q2',
        text: 'למה חובה להריץ SQL שנוצר ע"י LLM מול משתמש DB עם הרשאות קריאה בלבד?',
        options: [
          'זה לא באמת חובה',
          'למנוע מהמודל (או מתקיפת prompt injection) להריץ פעולות הרסניות כמו DROP/DELETE',
          'זה משפר ביצועים בלבד',
          'רק כדי לחסוך בעלויות',
        ],
        correct: 1,
        explanation: 'שאילתה שנוצרת ע"י LLM היא קלט לא מהימן. הרצתה מול חיבור read-only-בלבד מבטיחה שגם אם נוצרה שאילתה מסוכנת — היא לא תוכל לשנות או למחוק נתונים.',
      },
      {
        id: 'rag-sqlmongo-q3',
        text: 'איזה תוסף Postgres מאפשר לאחסן ולשלוף וקטורים ישירות בתוך שאילתת SQL?',
        options: ['pg_stat', 'pgvector', 'pgcrypto', 'pg_trgm'],
        correct: 1,
        explanation: 'pgvector מוסיף טיפוס עמודה vector ואופרטורים למרחק (כמו <=> לקוסינוס), ומאפשר לשלב חיפוש וקטורי עם תנאי SQL רגילים באותה שאילתה.',
      },
      {
        id: 'rag-sqlmongo-q4',
        text: 'מה מאפשר Atlas Vector Search ב-MongoDB?',
        options: [
          'גיבוי אוטומטי של מסמכים',
          'שלב $vectorSearch באגגרגציה שמריץ חיפוש דמיון וקטורי, ניתן לשילוב עם $match',
          'הצפנת שדות ברמת מסמך',
          'ריצה מקבילה של שאילתות'],
        correct: 1,
        explanation: 'Atlas Vector Search מוסיף שלב $vectorSearch לפייפליין aggregation, שמאפשר חיפוש ANN על שדה embedding בתוך מסמכי Mongo רגילים, ולשלב אותו עם שלבי סינון רגילים.',
      },
      {
        id: 'rag-sqlmongo-q5',
        text: 'מה היתרון המרכזי של הטמעת embedding ישירות בתוך DB קיים (pgvector / Atlas), לעומת Vector DB נפרד?',
        options: [
          'תמיד מהיר יותר בכל מקרה',
          'מאפשר לשלב תנאי סינון מובנים (WHERE/match) עם חיפוש וקטורי בשאילתה אחת, בלי תשתית נוספת',
          'לא צריך embeddings בכלל',
          'מבטל את הצורך ב-chunking'],
        correct: 1,
        explanation: 'הטמעה בתוך DB קיים חוסכת תשתית נפרדת וסנכרון בין שני מקורות נתונים, ומאפשרת שאילתה אחת שמשלבת סינון SQL/Mongo רגיל עם דמיון וקטורי.',
      },
      {
        id: 'rag-sqlmongo-q6',
        text: 'מתי גישת Text-to-SQL מתאימה יותר מ-RAG מבוסס embedding?',
        options: [
          'תמיד — עדיפה בכל מקרה',
          'לשאלות מדויקות/אגרגטיביות ("כמה", "ממוצע", "לפי תאריך") שדורשות ערך מדויק מהנתונים',
          'רק כשאין בכלל מסד נתונים',
          'רק כשמדובר בטקסט חופשי בלבד'],
        correct: 1,
        explanation: 'Text-to-SQL מצטיין בשאלות שדורשות חישוב/אגרגציה מדויקים על הנתונים (COUNT, AVG, סינון תאריכים) — משהו שחיפוש דמיון סמנטי לא נועד לספק.',
      },
    ],
  },
]
