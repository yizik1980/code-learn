import type { Lesson } from '../../types'

export const etlLessons: Lesson[] = [
  // ─── שיעור 1 ───────────────────────────────────────────────────────────────
  {
    id: 'dwh-intro',
    title: 'מבוא ל-Data Warehouse',
    summary: 'OLTP vs OLAP, מהו DWH, למה צריך אותו וארכיטקטורת Star Schema',
    emoji: '🏛️',
    content: [
      { type: 'heading', text: 'OLTP vs OLAP — שתי עולמות שונים' },
      {
        type: 'text',
        text: 'מסד נתונים תפעולי (OLTP) מותאם לטרנזקציות מהירות — הכנסה, עדכון, מחיקה. Data Warehouse (OLAP) מותאם לניתוח — שאילתות מורכבות על כמויות גדולות של נתונים היסטוריים. הם שני פתרונות לשני בעיות שונות לחלוטין.',
      },
      {
        type: 'table',
        caption: 'OLTP לעומת OLAP',
        headers: ['מאפיין', 'OLTP', 'OLAP / DWH'],
        rows: [
          ['מטרה', 'טרנזקציות יומיומיות', 'ניתוח והחלטות עסקיות'],
          ['נתונים', 'נוכחיים, מעודכנים', 'היסטוריים, מצטברים'],
          ['שאילתות', 'פשוטות, מהירות (ms)', 'מורכבות, ארוכות (שניות-דקות)'],
          ['עדכונים', 'INSERT/UPDATE/DELETE תכופים', 'בעיקר INSERT מצטבר'],
          ['משתמשים', 'אלפי משתמשי end-user', 'מעטים — אנליסטים, BI'],
          ['דוגמה', 'מסד של חנות, CRM, ERP', 'Data Warehouse, Data Mart'],
        ],
      },
      { type: 'heading', text: 'Data Warehouse — הגדרה ויעד' },
      {
        type: 'text',
        text: 'Data Warehouse הוא מאגר נתונים מרכזי שמשלב נתוניםממקורות שונים (ERP, CRM, לוגים, APIs) לצורך ניתוח, דיווח ו-BI. הנתונים עוברים תהליך ETL (Extract, Transform, Load) לפני כניסתם ל-DWH כדי להיות עקביים, נקיים ומאוחדים.',
      },
      {
        type: 'code',
        lang: 'sql',
        caption: 'דוגמה — שאילתת DWH טיפוסית (מכירות לפי רבעון)',
        code: `-- שאילתה ב-DWH: מכירות לפי קטגוריה ורבעון
SELECT
    d.year,
    d.quarter,
    p.category,
    SUM(f.revenue)      AS total_revenue,
    COUNT(f.order_id)   AS order_count,
    AVG(f.revenue)      AS avg_order_value
FROM fact_sales f
JOIN dim_date    d ON f.date_key    = d.date_key
JOIN dim_product p ON f.product_key = p.product_key
JOIN dim_customer c ON f.customer_key = c.customer_key
WHERE d.year BETWEEN 2023 AND 2025
  AND c.region = 'Israel'
GROUP BY d.year, d.quarter, p.category
ORDER BY d.year, d.quarter, total_revenue DESC;

-- אותה שאילתה ב-OLTP תשאל עשרות טבלאות נרמליזציה
-- ותיקח דקות — ב-DWH: שניות`,
      },
      { type: 'heading', text: 'Star Schema — לב ה-DWH' },
      {
        type: 'text',
        text: 'Star Schema הוא מודל הנתונים הנפוץ ביותר ב-DWH. מורכב מטבלת Fact מרכזית (מדידות מספריות) המחוברת לטבלאות Dimension (הקשר עסקי). השם "כוכב" מגיע מהצורה הויזואלית — fact במרכז, dimensions בשוליים.',
      },
      {
        type: 'code',
        lang: 'sql',
        caption: 'Star Schema — DDL מלא לדוגמה של מכירות',
        code: `-- ─── Dimension Tables ─────────────────────────────────────

CREATE TABLE dim_date (
    date_key        INT PRIMARY KEY,       -- 20240115
    full_date       DATE NOT NULL,
    day_of_week     SMALLINT,
    day_name        VARCHAR(10),
    month_num       SMALLINT,
    month_name      VARCHAR(10),
    quarter         SMALLINT,
    year            SMALLINT,
    is_weekend      BOOLEAN,
    is_holiday      BOOLEAN
);

CREATE TABLE dim_product (
    product_key     SERIAL PRIMARY KEY,
    product_id      VARCHAR(50) NOT NULL,  -- מפתח עסקי מה-source
    product_name    VARCHAR(200),
    category        VARCHAR(100),
    sub_category    VARCHAR(100),
    brand           VARCHAR(100),
    unit_price      DECIMAL(10,2),
    -- SCD Type 2 columns
    valid_from      DATE NOT NULL,
    valid_to        DATE,
    is_current      BOOLEAN DEFAULT TRUE
);

CREATE TABLE dim_customer (
    customer_key    SERIAL PRIMARY KEY,
    customer_id     VARCHAR(50) NOT NULL,
    full_name       VARCHAR(200),
    email           VARCHAR(200),
    region          VARCHAR(100),
    country         VARCHAR(100),
    customer_segment VARCHAR(50)           -- Premium / Standard / New
);

-- ─── Fact Table ────────────────────────────────────────────

CREATE TABLE fact_sales (
    sale_key        BIGSERIAL PRIMARY KEY,
    -- Foreign Keys לdimensions
    date_key        INT REFERENCES dim_date(date_key),
    product_key     INT REFERENCES dim_product(product_key),
    customer_key    INT REFERENCES dim_customer(customer_key),
    -- Measures (מדידות מספריות)
    quantity        INT NOT NULL,
    unit_price      DECIMAL(10,2),
    discount_pct    DECIMAL(5,2) DEFAULT 0,
    revenue         DECIMAL(12,2) NOT NULL,
    cost            DECIMAL(12,2),
    profit          DECIMAL(12,2)
);`,
      },
      {
        type: 'tip',
        text: 'כלל אצבע: Fact tables מכילות מדידות (revenue, quantity, count) ו-Foreign Keys. Dimension tables מכילות תיאורים (שמות, קטגוריות, תאריכים). אל תנרמל Dimensions — redundancy מותר ב-DWH לטובת ביצועי query.',
      },
    ],
    questionBank: [
      {
        id: 'dwh-q1',
        text: 'מה ההבדל העיקרי בין OLTP ל-OLAP?',
        options: [
          'OLTP מהיר יותר תמיד',
          'OLTP מותאם לטרנזקציות מהירות; OLAP מותאם לניתוח על נתונים היסטוריים',
          'OLAP מאחסן יותר נתונים',
          'OLTP משתמש ב-SQL, OLAP לא',
        ],
        correct: 1,
        explanation: 'OLTP (Online Transaction Processing) = INSERT/UPDATE/DELETE מהיר לאלפי משתמשים. OLAP (Online Analytical Processing) = שאילתות ניתוח מורכבות על גיגה/טרה-בייט של נתונים היסטוריים.',
      },
      {
        id: 'dwh-q2',
        text: 'מה מכיל Fact Table בStar Schema?',
        options: [
          'תיאורים של מוצרים ולקוחות',
          'מדידות מספריות (revenue, quantity) ו-Foreign Keys לDimensions',
          'נתוני עובדים',
          'לוגים של מערכת',
        ],
        correct: 1,
        explanation: 'Fact Table = מה קרה (מדידות). Dimension = הקשר (מי, מה, מתי, איפה). fact_sales מכיל revenue, quantity, cost ו-FKs לdate/product/customer.',
      },
      {
        id: 'dwh-q3',
        text: 'למה מותר ל-Dimension Tables להיות לא מנורמלות (denormalized)?',
        options: [
          'כי זה קל יותר לפתח',
          'כי ב-DWH ביצועי Query חשובים יותר מחיסכון במקום — JOIN מעטים = שאילתות מהירות',
          'כי OLAP לא תומך ב-normalization',
          'כי נתוני Dimension לא משתנים',
        ],
        correct: 1,
        explanation: 'ב-OLTP נרמול חוסך מקום ומונע anomalies. ב-DWH: עדיפים joins מינימליים לביצועים. dim_product מכיל category, sub_category, brand בטבלה אחת — גם אם יש כפילויות.',
      },
      {
        id: 'dwh-q4',
        text: 'מה date_key INT (כמו 20240115) עדיף על DATE column?',
        options: [
          'INT קטן יותר מ-DATE',
          'INT מאפשר partition pruning מהיר, join יעיל יותר, ופחות overhead בשאילתות ניתוח',
          'DATE לא נתמך ב-DWH',
          'אין הבדל',
        ],
        correct: 1,
        explanation: 'Surrogate key מספרי (20240115) = join מהיר על INT לעומת DATE. גם מאפשר partition by year/month פשוט. dim_date מחזיקה את כל האטריביוטים הנגזרים (quarter, is_weekend) ללא חישוב בזמן query.',
      },
      {
        id: 'dwh-q5',
        text: 'מה מייחד Data Warehouse לעומת Data Lake?',
        options: [
          'DWH זול יותר',
          'DWH מכיל נתונים מובנים ומעובדים עם schema קשיח; Data Lake מכיל נתונים גולמיים בכל פורמט',
          'DWH יותר גדול',
          'Data Lake לא ניתן לשאול ב-SQL',
        ],
        correct: 1,
        explanation: 'DWH: schema-on-write, נתונים נקיים, מתאים ל-BI. Data Lake: schema-on-read, כל פורמט (JSON, Parquet, CSV), מתאים ל-Data Science ו-ML. ה-Lakehouse משלב את שניהם.',
      },
    ],
  },

  // ─── שיעור 2 ───────────────────────────────────────────────────────────────
  {
    id: 'dwh-modeling',
    title: 'מודל נתונים מתקדם — SCD, Snowflake ו-Data Vault',
    summary: 'Slowly Changing Dimensions, Snowflake Schema, Data Vault 2.0 ו-Fact Table Types',
    emoji: '📐',
    content: [
      { type: 'heading', text: 'Slowly Changing Dimensions (SCD)' },
      {
        type: 'text',
        text: 'נתוני Dimension משתנים לאורך זמן — לקוח עבר לאזור אחר, מוצר שינה קטגוריה. SCD מגדיר אסטרטגיה לניהול שינויים היסטוריים. הסוגים הנפוצים: Type 1 (דריסה), Type 2 (שמירת היסטוריה), Type 3 (שמירת ערך קודם).',
      },
      {
        type: 'table',
        caption: 'SCD Types — השוואה',
        headers: ['Type', 'אסטרטגיה', 'מתי להשתמש', 'חיסרון'],
        rows: [
          ['Type 1', 'דורס ערך ישן', 'כשהיסטוריה לא חשובה (תיקון שגיאה)', 'אין היסטוריה'],
          ['Type 2', 'שורה חדשה עם valid_from/to', 'ניתוח היסטורי מדויק', 'הטבלה גדלה'],
          ['Type 3', 'עמודה "prev_value"', 'שמירת ערך אחד אחורה', 'רק שינוי אחד'],
          ['Type 4', 'טבלת היסטוריה נפרדת', 'שינויים תכופים מאוד', 'JOIN נוסף'],
          ['Type 6', '1+2+3 משולב', 'גמישות מקסימלית', 'מורכב לתחזוקה'],
        ],
      },
      {
        type: 'code',
        lang: 'sql',
        caption: 'SCD Type 2 — מימוש ועדכון',
        code: `-- dim_customer עם SCD Type 2
CREATE TABLE dim_customer (
    customer_key    SERIAL PRIMARY KEY,      -- surrogate key
    customer_id     VARCHAR(50) NOT NULL,    -- business key (מה-source)
    full_name       VARCHAR(200),
    region          VARCHAR(100),
    customer_segment VARCHAR(50),
    -- SCD Type 2 tracking
    valid_from      DATE NOT NULL DEFAULT CURRENT_DATE,
    valid_to        DATE,                    -- NULL = שורה נוכחית
    is_current      BOOLEAN DEFAULT TRUE,
    row_hash        CHAR(64)                 -- hash לזיהוי שינויים
);

-- ─── עדכון SCD Type 2 ─────────────────────────────────────
-- לקוח עבר מ-"North" ל-"South"

-- שלב 1: סגור שורה ישנה
UPDATE dim_customer
SET valid_to   = CURRENT_DATE - 1,
    is_current = FALSE
WHERE customer_id = 'CUST-001'
  AND is_current = TRUE;

-- שלב 2: הכנס שורה חדשה
INSERT INTO dim_customer
    (customer_id, full_name, region, customer_segment, valid_from, valid_to, is_current)
VALUES
    ('CUST-001', 'ישראל ישראלי', 'South', 'Premium', CURRENT_DATE, NULL, TRUE);

-- ─── שאילתה היסטורית ──────────────────────────────────────
-- מכירות לפי האזור שהלקוח היה בו בזמן הקנייה
SELECT
    c.region,
    SUM(f.revenue) AS revenue
FROM fact_sales f
JOIN dim_customer c ON f.customer_key = c.customer_key
    -- ה-join מביא את הDimension שהיה נכון בתאריך המכירה
GROUP BY c.region;`,
      },
      { type: 'heading', text: 'Snowflake Schema — נרמול Dimensions' },
      {
        type: 'code',
        lang: 'sql',
        caption: 'Snowflake Schema — Dimension מנורמל',
        code: `-- Star Schema: dim_product מכיל הכל
-- Snowflake Schema: category בטבלה נפרדת

-- ─── Snowflake: טבלאות נפרדות ─────────────────────────────
CREATE TABLE dim_category (
    category_key    SERIAL PRIMARY KEY,
    category_name   VARCHAR(100) NOT NULL,
    department      VARCHAR(100),
    is_active       BOOLEAN DEFAULT TRUE
);

CREATE TABLE dim_sub_category (
    sub_category_key SERIAL PRIMARY KEY,
    sub_category_name VARCHAR(100),
    category_key    INT REFERENCES dim_category(category_key)
);

CREATE TABLE dim_product (
    product_key     SERIAL PRIMARY KEY,
    product_id      VARCHAR(50),
    product_name    VARCHAR(200),
    sub_category_key INT REFERENCES dim_sub_category(sub_category_key),
    brand           VARCHAR(100),
    unit_price      DECIMAL(10,2)
);

-- ─── שאילתה ב-Snowflake — יותר JOINs ─────────────────────
SELECT
    cat.department,
    cat.category_name,
    SUM(f.revenue) AS revenue
FROM fact_sales f
JOIN dim_product p     ON f.product_key      = p.product_key
JOIN dim_sub_category s ON p.sub_category_key = s.sub_category_key
JOIN dim_category cat   ON s.category_key     = cat.category_key
GROUP BY cat.department, cat.category_name;

-- Star vs Snowflake:
-- Star: פשוט, query מהיר, redundancy
-- Snowflake: נקי, חיסכון מקום, query איטי יותר`,
      },
      { type: 'heading', text: 'סוגי Fact Tables' },
      {
        type: 'table',
        caption: 'Fact Table Types',
        headers: ['סוג', 'תיאור', 'דוגמה'],
        rows: [
          ['Transaction Fact', 'שורה לכל טרנזקציה', 'fact_sales — מכירה אחת = שורה אחת'],
          ['Periodic Snapshot', 'מצב ביום/שבוע/חודש', 'fact_inventory — מלאי כל יום'],
          ['Accumulating Snapshot', 'שורה לתהליך עם מספר שלבים', 'fact_order_pipeline — מהזמנה עד אספקה'],
          ['Factless Fact', 'ללא מדידות, רק events', 'fact_page_views — ביקור בעמוד'],
        ],
      },
      {
        type: 'code',
        lang: 'sql',
        caption: 'Accumulating Snapshot — מעקב pipeline',
        code: `-- מעקב אחרי הזמנה מתחילה ועד סגירה
CREATE TABLE fact_order_pipeline (
    order_key           BIGSERIAL PRIMARY KEY,
    order_id            VARCHAR(50) NOT NULL,
    -- Dimension Keys
    customer_key        INT,
    product_key         INT,
    -- Date Keys לכל שלב (NULL עד שקורה)
    order_date_key      INT,
    payment_date_key    INT,
    ship_date_key       INT,
    delivery_date_key   INT,
    return_date_key     INT,       -- NULL אם לא הוחזר
    -- Measures
    order_amount        DECIMAL(10,2),
    -- Lag measures (חישוב בין שלבים)
    days_to_payment     INT GENERATED ALWAYS AS (
        payment_date_key - order_date_key
    ) STORED,
    days_to_delivery    INT GENERATED ALWAYS AS (
        delivery_date_key - order_date_key
    ) STORED
);

-- עדכון: כשהזמנה נשלחת, מעדכנים את השורה הקיימת
UPDATE fact_order_pipeline
SET ship_date_key = 20240320
WHERE order_id = 'ORD-12345';`,
      },
      {
        type: 'tip',
        text: 'Star Schema עדיף לרוב המקרים — פשוט יותר ומהיר יותר ל-BI. Snowflake Schema מתאים כשה-Dimensions גדולים מאוד ויש חיסכון מקום משמעותי. Data Vault 2.0 מתאים לארגונים גדולים עם שינויים תכופים במקורות.',
      },
    ],
    questionBank: [
      {
        id: 'modeling-q1',
        text: 'מה SCD Type 2 עושה כשלקוח משנה אזור?',
        options: [
          'מוחק שורה ישנה',
          'מוסיף שורה חדשה ומסמן את הישנה כלא-נוכחית עם valid_to',
          'מעדכן את השורה הקיימת',
          'יוצר טבלה חדשה',
        ],
        correct: 1,
        explanation: 'SCD Type 2: (1) UPDATE שורה ישנה: valid_to = היום-1, is_current=FALSE. (2) INSERT שורה חדשה עם הערך החדש ו-valid_from=היום. כך יש היסטוריה מלאה.',
      },
      {
        id: 'modeling-q2',
        text: 'מה ההבדל בין Star Schema ל-Snowflake Schema?',
        options: [
          'Star גדול יותר',
          'Star: Dimensions מנורמלות חלקית (flat); Snowflake: Dimensions מנורמלות לחלוטין עם JOINs נוספים',
          'Snowflake מהיר יותר',
          'אין הבדל',
        ],
        correct: 1,
        explanation: 'Star: dim_product מכיל category בתוכו. Snowflake: category בטבלה נפרדת עם FK. Star = פחות JOINs = מהיר יותר ל-BI. Snowflake = יותר נקי, חיסכון מקום, אבל query מורכב.',
      },
      {
        id: 'modeling-q3',
        text: 'מה Factless Fact Table?',
        options: [
          'Fact Table ללא Primary Key',
          'Fact Table ללא מדידות מספריות — מתעד events (דף נצפה, תלמיד נרשם לקורס)',
          'Fact Table ריק',
          'Fact Table עם NULL values',
        ],
        correct: 1,
        explanation: 'Factless Fact = רק Foreign Keys, ללא measures. fact_page_views(date_key, user_key, page_key) = מי ראה מה מתי. ניתן לספור: COUNT(*) = כמה צפיות.',
      },
      {
        id: 'modeling-q4',
        text: 'מה Accumulating Snapshot Fact שונה מTransaction Fact?',
        options: [
          'Accumulating מהיר יותר',
          'Accumulating מייצג תהליך מרובה שלבים — שורה אחת מתעדכנת ככל שהתהליך מתקדם',
          'Transaction שומר היסטוריה',
          'אין הבדל',
        ],
        correct: 1,
        explanation: 'Transaction: שורה חדשה לכל event (לא משתנות). Accumulating: שורה אחת להזמנה, מתעדכנת כשנשלחת/נמסרת/הוחזרה. מאפשר לחשב days_to_delivery ו-pipeline bottlenecks.',
      },
      {
        id: 'modeling-q5',
        text: 'למה Row Hash שימושי ב-SCD?',
        options: [
          'להצפנת נתונים',
          'לזיהוי מהיר אם שורה השתנתה — משווים hash מה-source ל-hash ב-DWH',
          'לדחיסת נתונים',
          'לביצועי JOIN',
        ],
        correct: 1,
        explanation: 'row_hash = MD5/SHA של כל עמודות Dimension. ב-ETL: מחשבים hash של נתון חדש ומשווים לקיים — אם שווה, אין שינוי. זה מהיר הרבה יותר מהשוואת עמודה-עמודה.',
      },
    ],
  },

  // ─── שיעור 3 ───────────────────────────────────────────────────────────────
  {
    id: 'etl-extract',
    title: 'ETL — Extract: חילוץ נתונים',
    summary: 'מקורות נתונים, Full Load vs Incremental, Change Data Capture (CDC) ו-API Extraction',
    emoji: '⛏️',
    content: [
      { type: 'heading', text: 'מקורות נתונים נפוצים ואסטרטגיות חילוץ' },
      {
        type: 'table',
        caption: 'מקורות Extract וכלים מתאימים',
        headers: ['מקור', 'פרוטוקול', 'אסטרטגיה'],
        rows: [
          ['SQL Database', 'JDBC/ODBC', 'Incremental by updated_at / CDC'],
          ['REST API', 'HTTP/JSON', 'Pagination, cursor-based'],
          ['Files (CSV/Parquet)', 'S3/SFTP', 'Full load, detect new files'],
          ['Kafka/Event Stream', 'Kafka Protocol', 'Streaming / micro-batch'],
          ['ERP/CRM (SAP, Salesforce)', 'SOAP/REST/Bulk API', 'Bulk Export + CDC'],
          ['Logs (CloudWatch, Datadog)', 'Log API', 'Tail + parse'],
        ],
      },
      { type: 'heading', text: 'Full Load vs Incremental Load' },
      {
        type: 'code',
        lang: 'sql',
        caption: 'Incremental Load — חילוץ רק מה שהשתנה',
        code: `-- ─── Full Load: טעינה מלאה בכל פעם ────────────────────────
-- SELECT * FROM orders
-- פשוט אבל: איטי, עומס על ה-OLTP, מתאים רק לטבלאות קטנות

-- ─── Incremental Load: רק שינויים חדשים ─────────────────
-- הכרחי: עמודה updated_at על טבלת המקור

-- שמירת watermark (נקודת ציון אחרונה)
CREATE TABLE etl_watermarks (
    table_name      VARCHAR(100) PRIMARY KEY,
    last_loaded_at  TIMESTAMP NOT NULL DEFAULT '1970-01-01'
);

-- Extract incremental:
SELECT *
FROM source_orders
WHERE updated_at > (
    SELECT last_loaded_at
    FROM etl_watermarks
    WHERE table_name = 'orders'
)
ORDER BY updated_at;

-- אחרי עיבוד מוצלח — עדכן watermark
UPDATE etl_watermarks
SET last_loaded_at = NOW()
WHERE table_name = 'orders';

-- ─── בעיית Late-Arriving Data ─────────────────────────────
-- נתונים שמגיעים באיחור (out-of-order events)
-- פתרון: watermark עם buffer
SELECT *
FROM source_orders
WHERE updated_at > (last_loaded_at - INTERVAL '2 hours')
  AND updated_at <= NOW() - INTERVAL '5 minutes';`,
      },
      { type: 'heading', text: 'Change Data Capture (CDC)' },
      {
        type: 'text',
        text: 'CDC מאפשר לחלץ שינויים (INSERT/UPDATE/DELETE) ממסד נתונים בזמן אמת, ללא polling. הכלי הפופולרי ביותר הוא Debezium שקורא את ה-transaction log של הDB.',
      },
      {
        type: 'code',
        lang: 'sql',
        caption: 'CDC עם Debezium — הגדרה ב-PostgreSQL',
        code: `-- ─── PostgreSQL: הפעלת Logical Replication ──────────────
-- postgresql.conf:
-- wal_level = logical
-- max_replication_slots = 4

-- יצירת Replication Slot ל-Debezium
SELECT pg_create_logical_replication_slot(
    'debezium_slot',
    'pgoutput'
);

-- Publication: אילו טבלאות ל-stream
CREATE PUBLICATION dwh_pub
FOR TABLE orders, customers, products;

-- ─── Debezium connector config (JSON) ────────────────────`,
      },
      {
        type: 'code',
        lang: 'json',
        caption: 'Debezium connector config',
        code: `{
  "name": "postgres-cdc-connector",
  "config": {
    "connector.class": "io.debezium.connector.postgresql.PostgresConnector",
    "database.hostname": "prod-db.internal",
    "database.port": "5432",
    "database.user": "debezium",
    "database.password": "\${DB_PASSWORD}",
    "database.dbname": "production",
    "database.server.name": "prod",
    "plugin.name": "pgoutput",
    "publication.name": "dwh_pub",
    "slot.name": "debezium_slot",
    "topic.prefix": "cdc",
    "transforms": "unwrap",
    "transforms.unwrap.type": "io.debezium.transforms.ExtractNewRecordState",
    "transforms.unwrap.add.fields": "op,source.ts_ms"
  }
}
// Kafka topics שייווצרו: cdc.public.orders, cdc.public.customers
// כל message = { op: "c"/"u"/"d", before: {...}, after: {...} }`,
      },
      { type: 'heading', text: 'API Extraction — Pagination ו-Rate Limits' },
      {
        type: 'code',
        lang: 'python',
        caption: 'API Extract עם Pagination, Retry ו-Rate Limiting',
        code: `import httpx, time, logging
from datetime import datetime, timedelta
from typing import Iterator

logger = logging.getLogger(__name__)

def extract_salesforce_opportunities(
    base_url: str,
    access_token: str,
    since: datetime,
    batch_size: int = 200
) -> Iterator[dict]:
    """חילוץ הזדמנויות מ-Salesforce עם pagination ו-retry."""

    headers = {"Authorization": f"Bearer {access_token}"}
    url = f"{base_url}/services/data/v60.0/query"
    soql = f"""
        SELECT Id, Name, Amount, StageName, CloseDate, AccountId
        FROM Opportunity
        WHERE LastModifiedDate > {since.strftime('%Y-%m-%dT%H:%M:%SZ')}
        ORDER BY LastModifiedDate ASC
        LIMIT {batch_size}
    """

    next_url = None
    page = 0

    with httpx.Client(timeout=30) as client:
        while True:
            for attempt in range(3):
                try:
                    if next_url:
                        resp = client.get(next_url, headers=headers)
                    else:
                        resp = client.get(url, headers=headers, params={"q": soql})

                    if resp.status_code == 429:  # Rate limit
                        retry_after = int(resp.headers.get("Retry-After", 60))
                        logger.warning(f"Rate limited. Sleeping {retry_after}s")
                        time.sleep(retry_after)
                        continue

                    resp.raise_for_status()
                    break
                except httpx.HTTPError as e:
                    if attempt == 2:
                        raise
                    time.sleep(2 ** attempt)  # exponential backoff

            data = resp.json()
            page += 1
            logger.info(f"Page {page}: {len(data['records'])} records")

            yield from data["records"]

            if data.get("done"):
                break
            next_url = base_url + data["nextRecordsUrl"]`,
      },
      {
        type: 'tip',
        text: 'CDC (Debezium + Kafka) עדיף על Polling כשצריך latency נמוך ונתונים בזמן אמת. Polling (Incremental by updated_at) מספיק לרוב תרחישי BI שרצים לילה. חובה לוודא שלטבלאות המקור יש עמודת updated_at עם index.',
      },
    ],
    questionBank: [
      {
        id: 'extract-q1',
        text: 'מה הבעיה ב-Full Load לכל ריצה של ETL?',
        options: [
          'Full Load מורכב מדי',
          'טוען את כל הנתונים בכל פעם — עומס על ה-OLTP, איטי, לא מתאים לטבלאות גדולות',
          'Full Load לא תומך ב-SQL',
          'Full Load מוחק נתונים',
        ],
        correct: 1,
        explanation: 'Full Load = SELECT * בכל ריצה. לטבלה עם 100M שורות: hours של query, עומס על ה-prod DB, network traffic. Incremental = רק השינויים מהריצה האחרונה.',
      },
      {
        id: 'extract-q2',
        text: 'מה CDC (Change Data Capture) עושה?',
        options: [
          'מצפין נתונים',
          'מזהה ומעביר שינויים (INSERT/UPDATE/DELETE) ממסד נתונים בזמן אמת דרך transaction log',
          'מבצע backup',
          'מנרמל נתונים',
        ],
        correct: 1,
        explanation: 'CDC (Debezium) קורא את WAL (Write-Ahead Log) של PostgreSQL. כל טרנזקציה ב-prod מגיעה ל-Kafka topic תוך שניות. ללא polling, ללא עומס על ה-DB.',
      },
      {
        id: 'extract-q3',
        text: 'מה בעיית Late-Arriving Data?',
        options: [
          'נתונים שמגיעים בפורמט שגוי',
          'events שמגיעים מאוחר מה-timestamp שלהם — לדוגמה: מכירה ב-23:55 שמגיעה ל-ETL אחרי חצות',
          'API שמחזיר תגובה איטית',
          'נתונים כפולים',
        ],
        correct: 1,
        explanation: 'Late data: event קרה ב-23:55 אבל הגיע ל-pipeline ב-00:05. ה-ETL של יום קודם כבר רץ. פתרון: watermark עם buffer (קח 2 שעות אחורה) ו-upsert בDWH.',
      },
      {
        id: 'extract-q4',
        text: 'מה Exponential Backoff עושה ב-API Extraction?',
        options: [
          'מאיץ בקשות',
          'מגדיל את זמן ההמתנה בין ניסיונות חוזרים (1s, 2s, 4s) כדי לא להעמיס על ה-API',
          'מבטל בקשות כושלות',
          'מקביל בקשות',
        ],
        correct: 1,
        explanation: 'attempt 0: wait 1s. attempt 1: wait 2s. attempt 2: wait 4s. כך לא מוסיפים עומס כשה-API כבר עמוס. אחרי 3 ניסיונות — raise exception לטיפול upstream.',
      },
      {
        id: 'extract-q5',
        text: 'למה Watermark נשמר בטבלה נפרדת ולא בזיכרון?',
        options: [
          'כי זיכרון מהיר מדי',
          'כי ב-restart של ה-pipeline צריך לזכור עד אין הגענו — טבלה = persistence',
          'כי SQL עדיף על RAM',
          'כי watermark גדול מדי לזיכרון',
        ],
        correct: 1,
        explanation: 'אם ה-ETL process נופל ומתחיל מחדש, הzatermark בזיכרון אבד. שמירה ב-DB מבטיחה שבריצה הבאה נמשיך מאיפה שהפסקנו ולא נעבד מחדש כל הנתונים.',
      },
    ],
  },

  // ─── שיעור 4 ───────────────────────────────────────────────────────────────
  {
    id: 'etl-transform-load',
    title: 'ETL — Transform & Load',
    summary: 'טרנספורמציות נפוצות, dbt, אסטרטגיות Load, Upsert ו-Merge',
    emoji: '🔄',
    content: [
      { type: 'heading', text: 'Transform — טרנספורמציות נפוצות' },
      {
        type: 'table',
        caption: 'סוגי Transformations',
        headers: ['סוג', 'דוגמה'],
        rows: [
          ['Data Cleansing', 'נרמול שמות, הסרת רווחים, תיקון encoding'],
          ['Data Type Conversion', 'string "2024-01-15" → DATE, "1,234.56" → DECIMAL'],
          ['Deduplication', 'הסרת שורות כפולות לפי business key'],
          ['Standardization', 'ISO country codes, מטבע ל-USD, timezone ל-UTC'],
          ['Aggregation', 'SUM/AVG/COUNT לרמת גרגר גבוהה יותר'],
          ['Lookup & Enrichment', 'מזהה לקוח → customer_key מה-Dimension'],
          ['Derived Columns', 'profit = revenue - cost, age = today - birth_date'],
          ['Null Handling', 'COALESCE, ערכי ברירת מחדל, Unknown members'],
        ],
      },
      {
        type: 'code',
        lang: 'sql',
        caption: 'Transform — SQL טיפוסי לשלב staging',
        code: `-- ─── Staging: נתונים גולמיים ────────────────────────────
CREATE TABLE stg_orders AS
SELECT
    -- Cleansing & Normalization
    TRIM(UPPER(order_id))           AS order_id,
    TRIM(customer_id)               AS customer_id,

    -- Type Conversion
    TO_DATE(order_date, 'DD/MM/YYYY') AS order_date,
    REPLACE(amount, ',', '')::DECIMAL(10,2) AS amount,

    -- Standardization
    UPPER(TRIM(status))             AS status,
    CASE currency
        WHEN 'ILS' THEN amount / 3.7  -- המרה ל-USD
        ELSE amount
    END                             AS amount_usd,

    -- Null Handling
    COALESCE(notes, 'N/A')          AS notes,
    COALESCE(discount_pct, 0)       AS discount_pct,

    -- Derived
    amount * (1 - COALESCE(discount_pct, 0) / 100) AS net_amount,

    -- Audit
    NOW()                           AS etl_loaded_at,
    'orders_api_v2'                 AS etl_source

FROM raw_orders
WHERE order_id IS NOT NULL           -- סינון invalid records
  AND amount > 0;

-- ─── Deduplication ────────────────────────────────────────
WITH dedup AS (
    SELECT *,
        ROW_NUMBER() OVER (
            PARTITION BY order_id
            ORDER BY updated_at DESC
        ) AS rn
    FROM stg_orders
)
SELECT * FROM dedup WHERE rn = 1;`,
      },
      { type: 'heading', text: 'dbt — Transform כקוד' },
      {
        type: 'text',
        text: 'dbt (data build tool) הפך לסטנדרט ה-Transform בעולם ה-modern data stack. כותבים SQL models, dbt מנהל את סדר הרצה, dependency graph, testing ו-documentation אוטומטי.',
      },
      {
        type: 'code',
        lang: 'sql',
        caption: 'dbt model — fct_sales.sql',
        code: `-- models/marts/fct_sales.sql
{{
  config(
    materialized = 'incremental',
    unique_key   = 'sale_id',
    on_schema_change = 'append_new_columns'
  )
}}

WITH orders AS (
    SELECT * FROM {{ ref('stg_orders') }}      -- reference לmodel אחר
    {% if is_incremental() %}
        WHERE order_date > (SELECT MAX(order_date) FROM {{ this }})
    {% endif %}
),

customers AS (
    SELECT * FROM {{ ref('dim_customers') }}
),

products AS (
    SELECT * FROM {{ ref('dim_products') }}
)

SELECT
    o.order_id                              AS sale_id,
    c.customer_key,
    p.product_key,
    {{ date_to_key('o.order_date') }}       AS date_key,   -- macro
    o.quantity,
    o.unit_price,
    o.discount_pct,
    o.quantity * o.unit_price * (1 - o.discount_pct / 100) AS revenue,
    o.quantity * p.cost_price               AS cost,
    revenue - cost                          AS profit
FROM orders o
LEFT JOIN customers c ON o.customer_id = c.customer_id
LEFT JOIN products  p ON o.product_id  = p.product_id`,
      },
      {
        type: 'code',
        lang: 'yaml',
        caption: 'dbt tests — schema.yml',
        code: `# models/marts/schema.yml
models:
  - name: fct_sales
    description: "Fact table for all sales transactions"
    columns:
      - name: sale_id
        description: "Unique sale identifier"
        tests:
          - unique
          - not_null

      - name: customer_key
        tests:
          - not_null
          - relationships:
              to: ref('dim_customers')
              field: customer_key

      - name: revenue
        tests:
          - not_null
          - dbt_utils.expression_is_true:
              expression: ">= 0"

      - name: date_key
        tests:
          - not_null
          - accepted_range:
              min_value: 20200101
              max_value: 20301231`,
      },
      { type: 'heading', text: 'Load — אסטרטגיות טעינה ל-DWH' },
      {
        type: 'code',
        lang: 'sql',
        caption: 'MERGE (Upsert) — הטעינה הנפוצה ביותר',
        code: `-- ─── MERGE: Update אם קיים, Insert אם חדש ─────────────
MERGE INTO dim_customer AS target
USING staging_customers AS source
ON target.customer_id = source.customer_id
   AND target.is_current = TRUE

-- שינוי זוהה — SCD Type 2: סגור ישן, פתח חדש
WHEN MATCHED AND source.row_hash != target.row_hash THEN
    UPDATE SET
        target.valid_to   = CURRENT_DATE - 1,
        target.is_current = FALSE

-- לקוח חדש
WHEN NOT MATCHED THEN
    INSERT (customer_id, full_name, region, segment,
            valid_from, valid_to, is_current, row_hash)
    VALUES (source.customer_id, source.full_name,
            source.region, source.segment,
            CURRENT_DATE, NULL, TRUE, source.row_hash);

-- ─── INSERT שורות חדשות לאחר ה-MERGE ─────────────────────
INSERT INTO dim_customer
    (customer_id, full_name, region, segment,
     valid_from, valid_to, is_current, row_hash)
SELECT
    customer_id, full_name, region, segment,
    CURRENT_DATE, NULL, TRUE, row_hash
FROM staging_customers s
WHERE s.row_hash != (
    SELECT row_hash FROM dim_customer
    WHERE customer_id = s.customer_id AND is_current = TRUE
);

-- ─── TRUNCATE + INSERT (Full Refresh) ─────────────────────
-- מתאים לDimension קטנות שמשתנות לעיתים נדירות
TRUNCATE TABLE dim_product;
INSERT INTO dim_product SELECT * FROM staging_products;`,
      },
      {
        type: 'tip',
        text: 'בחירת Load Strategy: Dimension קטנה (<100K שורות) → TRUNCATE+INSERT. Dimension גדולה עם SCD → MERGE. Fact Table → INSERT בלבד (לא מעדכנים עובדות). Fact היסטורי גדול → Partition-based load.',
      },
    ],
    questionBank: [
      {
        id: 'transform-q1',
        text: 'למה מעבירים נתוני Fact ל-staging table לפני ה-DWH?',
        options: [
          'כי ה-DWH לא תומך ב-INSERT ישיר',
          'staging = אזור ביניים לנקות, לאמת ולהעשיר נתונים לפני שהם נוגעים ב-DWH הרשמי',
          'כי staging מהיר יותר',
          'כי staging מצפין נתונים',
        ],
        correct: 1,
        explanation: 'Staging: raw → clean. אם ה-ETL נכשל, DWH לא מושפע. מאפשר re-run ללא השלכות. גם נותן "נקודת ציון" לdebug — ניתן לבדוק מה הגיע לפני ה-transform.',
      },
      {
        id: 'transform-q2',
        text: 'מה dbt ref() עושה?',
        options: [
          'מייבא קובץ SQL חיצוני',
          'יוצר dependency בין models — dbt מחשב את סדר הרצה ומבטיח שdependencies רצות לפני',
          'מגדיר schema',
          'יוצר index',
        ],
        correct: 1,
        explanation: '{{ ref("stg_orders") }} = "תלוי ב-stg_orders". dbt בונה DAG (Directed Acyclic Graph) ומריץ models בסדר הנכון. גם מחליף לשם ה-schema הנכון בכל environment.',
      },
      {
        id: 'transform-q3',
        text: 'מה הבדל בין materialized=\'table\' ל-\'incremental\' ב-dbt?',
        options: [
          'אין הבדל',
          'table: מחשב מחדש את כל הנתונים; incremental: מוסיף רק שורות חדשות/שונות',
          'incremental מהיר יותר תמיד',
          'table תומך ב-SCD',
        ],
        correct: 1,
        explanation: 'table: DROP + CREATE כל ריצה. incremental: רק שורות חדשות מאז הריצה האחרונה (is_incremental() = TRUE). לFact Tables גדולים: incremental חוסך שעות.',
      },
      {
        id: 'transform-q4',
        text: 'מה MERGE statement עושה?',
        options: [
          'מאחד שתי טבלאות לאחת',
          'מבצע INSERT אם שורה לא קיימת, UPDATE אם קיימת — atomically',
          'מוחק שורות כפולות',
          'יוצר view',
        ],
        correct: 1,
        explanation: 'MERGE (aka Upsert) = WHEN MATCHED: UPDATE, WHEN NOT MATCHED: INSERT. אטומי — אין race condition. מושלם לSCD Type 1 ולטעינת Dimension tables.',
      },
      {
        id: 'transform-q5',
        text: 'מתי נכון להשתמש ב-TRUNCATE+INSERT לטעינת Dimension?',
        options: [
          'תמיד',
          'לDimension קטנה (<100K שורות) שאין בה SCD Type 2 — מהיר ופשוט לתחזוקה',
          'רק לFact Tables',
          'כשאין MERGE תמיכה',
        ],
        correct: 1,
        explanation: 'TRUNCATE+INSERT: מחיקה מלאה + הכנסה מחדש. פשוט ובטוח לdimension קטנות. לdimension גדולה עם SCD Type 2 — TRUNCATE מוחקת את ההיסטוריה! צריך MERGE.',
      },
    ],
  },

  // ─── שיעור 5 ───────────────────────────────────────────────────────────────
  {
    id: 'modern-data-stack',
    title: 'Modern Data Stack ו-Lakehouse Architecture',
    summary: 'Apache Airflow, Medallion Architecture, Delta Lake, Data Lakehouse ו-כלי ETL מודרניים',
    emoji: '🏗️',
    content: [
      { type: 'heading', text: 'Modern Data Stack — תמונה כוללת' },
      {
        type: 'table',
        caption: 'שכבות ה-Modern Data Stack',
        headers: ['שכבה', 'פתרונות נפוצים', 'תפקיד'],
        rows: [
          ['Data Sources', 'PostgreSQL, Salesforce, Stripe, Logs', 'מקורות הנתונים'],
          ['Ingestion', 'Fivetran, Airbyte, Debezium, Kafka', 'חילוץ והעברה'],
          ['Storage', 'Snowflake, BigQuery, Redshift, Delta Lake', 'אחסון DWH / Lakehouse'],
          ['Transform', 'dbt, Apache Spark, Flink', 'ETL Transform'],
          ['Orchestration', 'Apache Airflow, Dagster, Prefect', 'תיזמון ותיאום'],
          ['BI & Analytics', 'Looker, Tableau, Metabase, Power BI', 'דשבורדים ו-Reports'],
          ['Data Quality', 'Great Expectations, dbt tests, Monte Carlo', 'ניטור איכות'],
        ],
      },
      { type: 'heading', text: 'Medallion Architecture — Bronze / Silver / Gold' },
      {
        type: 'text',
        text: 'Medallion Architecture (ארכיטקטורת מדליון) מגדירה שלוש שכבות ב-Data Lake/Lakehouse: Bronze (גולמי), Silver (נקי), Gold (מוכן לעסק). כל שכבה מוסיפה ערך ואמינות.',
      },
      {
        type: 'code',
        lang: 'python',
        caption: 'Medallion Architecture עם PySpark ו-Delta Lake',
        code: `from pyspark.sql import SparkSession
from pyspark.sql.functions import (
    col, trim, upper, to_date, coalesce,
    lit, current_timestamp, md5, concat_ws
)
from delta.tables import DeltaTable

spark = SparkSession.builder \
    .config("spark.jars.packages", "io.delta:delta-core_2.12:2.4.0") \
    .getOrCreate()

# ─── Bronze: שמירת נתונים גולמיים כמו שהם ────────────────
def load_bronze(source_path: str, table: str):
    df = spark.read.json(source_path)   # קרא כמו שהוא
    df = df.withColumn("_ingested_at", current_timestamp()) \
           .withColumn("_source_file", lit(source_path))

    df.write \
      .format("delta") \
      .mode("append") \
      .option("mergeSchema", "true") \
      .save(f"s3://datalake/bronze/{table}")

# ─── Silver: ניקוי ונרמול ─────────────────────────────────
def process_silver_orders():
    bronze = spark.read.format("delta").load("s3://datalake/bronze/orders")

    silver = bronze \
        .filter(col("order_id").isNotNull()) \
        .filter(col("amount") > 0) \
        .withColumn("order_id",    trim(upper(col("order_id")))) \
        .withColumn("order_date",  to_date(col("order_date"), "dd/MM/yyyy")) \
        .withColumn("amount_usd",  col("amount") / 3.7) \
        .withColumn("discount",    coalesce(col("discount_pct"), lit(0))) \
        .withColumn("net_amount",  col("amount_usd") * (1 - col("discount") / 100)) \
        .withColumn("_silver_at",  current_timestamp()) \
        .dropDuplicates(["order_id"])   # dedup

    # Upsert ל-Silver Delta table
    if DeltaTable.isDeltaTable(spark, "s3://datalake/silver/orders"):
        DeltaTable.forPath(spark, "s3://datalake/silver/orders") \
            .alias("t") \
            .merge(silver.alias("s"), "t.order_id = s.order_id") \
            .whenMatchedUpdateAll() \
            .whenNotMatchedInsertAll() \
            .execute()
    else:
        silver.write.format("delta").save("s3://datalake/silver/orders")

# ─── Gold: אגרגציות עסקיות ──────────────────────────────
def build_gold_daily_sales():
    silver_orders    = spark.read.format("delta").load("s3://datalake/silver/orders")
    silver_customers = spark.read.format("delta").load("s3://datalake/silver/customers")

    gold = silver_orders \
        .join(silver_customers, "customer_id", "left") \
        .groupBy("order_date", "region") \
        .agg(
            {"net_amount": "sum", "order_id": "count"}
        ) \
        .withColumnRenamed("sum(net_amount)",  "total_revenue") \
        .withColumnRenamed("count(order_id)",  "order_count")

    gold.write \
        .format("delta") \
        .mode("overwrite") \
        .option("overwriteSchema", "true") \
        .partitionBy("order_date") \
        .save("s3://datalake/gold/daily_sales_by_region")`,
      },
      { type: 'heading', text: 'Apache Airflow — Orchestration' },
      {
        type: 'code',
        lang: 'python',
        caption: 'Airflow DAG — pipeline מלא של ETL',
        code: `from airflow import DAG
from airflow.operators.python import PythonOperator
from airflow.providers.postgres.operators.postgres import PostgresOperator
from airflow.utils.dates import days_ago
from datetime import timedelta

default_args = {
    "owner": "data-team",
    "retries": 2,
    "retry_delay": timedelta(minutes=5),
    "email_on_failure": True,
    "email": ["data-alerts@company.com"],
}

with DAG(
    dag_id="etl_sales_pipeline",
    default_args=default_args,
    schedule_interval="0 2 * * *",    # כל לילה ב-02:00
    start_date=days_ago(1),
    catchup=False,
    tags=["etl", "sales"],
) as dag:

    # שלב 1: חילוץ מ-OLTP ל-Staging
    extract_orders = PythonOperator(
        task_id="extract_orders",
        python_callable=extract_orders_incremental,
        op_kwargs={"conn_id": "postgres_prod", "table": "orders"},
    )

    # שלב 2: טרנספורמציה ב-staging
    transform_staging = PostgresOperator(
        task_id="transform_staging",
        postgres_conn_id="postgres_dwh",
        sql="sql/transform_stg_orders.sql",
    )

    # שלב 3: עדכון Dimension
    load_dim_customers = PythonOperator(
        task_id="load_dim_customers",
        python_callable=upsert_dim_customers,
    )

    # שלב 4: טעינת Fact
    load_fact_sales = PostgresOperator(
        task_id="load_fact_sales",
        postgres_conn_id="postgres_dwh",
        sql="sql/load_fact_sales.sql",
    )

    # שלב 5: בדיקות איכות
    run_dbt_tests = BashOperator(
        task_id="run_dbt_tests",
        bash_command="dbt test --select fct_sales dim_customers",
    )

    # הגדרת תלויות
    extract_orders >> transform_staging >> load_dim_customers >> load_fact_sales >> run_dbt_tests`,
      },
      {
        type: 'tip',
        text: 'Medallion Architecture: Bronze = append-only, אסור לשנות. Silver = טעינה idempotent (אפשר לרוץ שוב ולקבל אותה תוצאה). Gold = אגרגציות שמשתנות — overwrite. Delta Lake מאפשר ACID transactions על S3.',
      },
    ],
    questionBank: [
      {
        id: 'stack-q1',
        text: 'מה תפקיד שכבת Bronze ב-Medallion Architecture?',
        options: [
          'אחסון נתונים מנורמלים',
          'שמירת נתונים גולמיים כמו שהם, ללא שינוי — מאפשר replay מלא אם Transform טועה',
          'אגרגציות עסקיות',
          'backup של הDB',
        ],
        correct: 1,
        explanation: 'Bronze = Landing Zone. נתונים גולמיים, append-only, לא משנים אותם. אם Transform מחר טועה, יש raw data לreprocess. "Source of truth" לכל השכבות הבאות.',
      },
      {
        id: 'stack-q2',
        text: 'מה Apache Airflow עושה בpipeline ETL?',
        options: [
          'מבצע Transform',
          'Orchestration — מתזמן, מנהל תלויות בין tasks, מטפל בכשלונות ו-retries',
          'מאחסן נתונים',
          'מנרמל schema',
        ],
        correct: 1,
        explanation: 'Airflow = מנהל ה-workflow. מגדיר: מה רץ לפני מה (DAG), מתי רץ (schedule), כמה פעמים לנסות (retries), מה לעשות בכישלון (alerts). לא מבצע ETL בעצמו — קורא לכלים אחרים.',
      },
      {
        id: 'stack-q3',
        text: 'מה Delta Lake מוסיף על S3 רגיל?',
        options: [
          'דחיסה',
          'ACID transactions, schema enforcement, time travel ו-upsert (MERGE) על S3',
          'הצפנה',
          'גיבוי אוטומטי',
        ],
        correct: 1,
        explanation: 'S3 לא תומך ב-transactions — קובץ שנכתב בחצי לא ניתן ל-rollback. Delta Lake מוסיף transaction log: ACID, upsert, delete, schema evolution ו-time travel (SELECT AS OF VERSION).',
      },
      {
        id: 'stack-q4',
        text: 'מה ההבדל בין Data Lakehouse ל-Data Warehouse?',
        options: [
          'Lakehouse גדול יותר',
          'Lakehouse = Delta Lake/Iceberg על object storage (זול) + יכולות DWH; DWH = schema קשיח, יקר',
          'Lakehouse לא תומך ב-SQL',
          'DWH תומך ב-ML',
        ],
        correct: 1,
        explanation: 'DWH (Redshift/Snowflake): מהיר, SQL, יקר. Data Lake (S3): זול, גמיש, ללא schema, לא ACID. Lakehouse (Delta Lake/Iceberg/Hudi): זול כמו Lake + ACID + SQL כמו DWH.',
      },
      {
        id: 'stack-q5',
        text: 'מה catchup=False עושה ב-Airflow DAG?',
        options: [
          'מבטל retries',
          'מונע מAirflow לרוץ על תאריכים היסטוריים שהוחמצו — רץ רק מהיום ואילך',
          'מאפשר ריצה מקבילה',
          'מגדיר timeout',
        ],
        correct: 1,
        explanation: 'ללא catchup=False: אם ה-DAG מוגדר מlast week ונוצר היום, Airflow ינסה לרוץ 7 פעמים לתאריכים שהוחמצו. catchup=False = רץ רק מעכשיו. חשוב ל-ETL pipelines.',
      },
    ],
  },

  // ─── שיעור 6 ───────────────────────────────────────────────────────────────
  {
    id: 'dwh-performance',
    title: 'ביצועים ואיכות נתונים ב-DWH',
    summary: 'Partitioning, Columnar Storage, Indexes ב-DWH, Data Quality ו-Great Expectations',
    emoji: '⚡',
    content: [
      { type: 'heading', text: 'Partitioning — חלוקת נתונים לביצועים' },
      {
        type: 'text',
        text: 'Partitioning מחלק טבלה גדולה לחתיכות קטנות לפי עמודה (לרוב תאריך). שאילתה עם WHERE date=2024 קוראת רק Partition של 2024 ולא את כל הטבלה — Partition Pruning.',
      },
      {
        type: 'code',
        lang: 'sql',
        caption: 'Partitioning ב-PostgreSQL ו-BigQuery',
        code: `-- ─── PostgreSQL: Range Partitioning by Year ──────────────
CREATE TABLE fact_sales (
    sale_key        BIGSERIAL,
    order_date      DATE NOT NULL,
    customer_key    INT,
    product_key     INT,
    revenue         DECIMAL(12,2)
) PARTITION BY RANGE (order_date);

-- יצירת Partitions (מחולל אוטומטי בPG 14+)
CREATE TABLE fact_sales_2023
    PARTITION OF fact_sales
    FOR VALUES FROM ('2023-01-01') TO ('2024-01-01');

CREATE TABLE fact_sales_2024
    PARTITION OF fact_sales
    FOR VALUES FROM ('2024-01-01') TO ('2025-01-01');

-- שאילתה: רק Partition 2024 נסרק
EXPLAIN SELECT SUM(revenue) FROM fact_sales
WHERE order_date BETWEEN '2024-01-01' AND '2024-12-31';
-- → Seq Scan on fact_sales_2024 (לא fact_sales_2023!)

-- ─── BigQuery: Partition + Clustering ─────────────────────
CREATE TABLE \`project.dataset.fact_sales\`
PARTITION BY DATE(order_date)
CLUSTER BY customer_key, product_key   -- מיון בתוך partition
AS SELECT * FROM staging_sales;

-- שאילתה יעילה:
SELECT SUM(revenue) FROM \`project.dataset.fact_sales\`
WHERE DATE(order_date) = '2024-06-15'  -- Partition pruning: קורא יום אחד
  AND customer_key = 12345;             -- Clustering: פחות scan בתוך partition`,
      },
      { type: 'heading', text: 'Columnar Storage — למה Parquet ו-ORC מהירים' },
      {
        type: 'text',
        text: 'DWH מודרני שומר נתונים column-by-column (לא row-by-row). שאילתת SUM(revenue) קוראת רק עמודת revenue — לא שאר העמודות. + דחיסה גבוהה יותר כי ערכים דומים נצברים יחד.',
      },
      {
        type: 'table',
        caption: 'Row Store vs Column Store',
        headers: ['מאפיין', 'Row Store (PostgreSQL/MySQL)', 'Column Store (Redshift/BigQuery/Parquet)'],
        rows: [
          ['קריאה', 'כל השורה — גם עמודות לא נדרשות', 'רק העמודות בSELECT'],
          ['דחיסה', 'בינונית', 'גבוהה — ערכים דומים ביחד'],
          ['INSERT', 'מהיר', 'איטי יחסית'],
          ['UPDATE', 'מהיר', 'יקר — column rewrite'],
          ['מתאים ל', 'OLTP — הרבה writes ושאילתות נקודתיות', 'OLAP — aggregations על מיליוני שורות'],
        ],
      },
      {
        type: 'code',
        lang: 'python',
        caption: 'כתיבת Parquet עם Partitioning ל-S3',
        code: `import pandas as pd
import pyarrow as pa
import pyarrow.parquet as pq
from pathlib import Path

def write_partitioned_parquet(df: pd.DataFrame, output_path: str):
    """כתיבת DataFrame ל-S3 עם partition by year/month."""

    # המרה ל-PyArrow Table
    table = pa.Table.from_pandas(df, schema=pa.schema([
        pa.field("sale_id",       pa.int64()),
        pa.field("order_date",    pa.date32()),
        pa.field("customer_key",  pa.int32()),
        pa.field("revenue",       pa.decimal128(12, 2)),
        pa.field("year",          pa.int16()),
        pa.field("month",         pa.int8()),
    ]))

    # כתיבה עם partitioning
    pq.write_to_dataset(
        table,
        root_path=output_path,
        partition_cols=["year", "month"],   # יוצר year=2024/month=06/
        compression="snappy",               # דחיסה מהירה
        use_dictionary=True,                # dictionary encoding לstrings
        row_group_size=100_000,             # 100K שורות ל-row group
    )
    # מבנה: s3://bucket/fact_sales/year=2024/month=06/part-000.parquet

# קריאה יעילה — רק חודשים ספציפיים
dataset = pq.ParquetDataset(
    "s3://bucket/fact_sales",
    filters=[("year", "=", 2024), ("month", "in", [1, 2, 3])],
)
df_q1 = dataset.read().to_pandas()`,
      },
      { type: 'heading', text: 'Data Quality — Great Expectations' },
      {
        type: 'code',
        lang: 'python',
        caption: 'Great Expectations — בדיקות איכות נתונים',
        code: `import great_expectations as ge
from great_expectations.core import ExpectationSuite

def validate_fact_sales(df) -> bool:
    """בדיקות איכות לפני טעינה ל-DWH."""

    gdf = ge.from_pandas(df)

    # ─── Completeness ─────────────────────────────────────
    gdf.expect_column_values_to_not_be_null("sale_id")
    gdf.expect_column_values_to_not_be_null("order_date")
    gdf.expect_column_values_to_not_be_null("customer_key")

    # ─── Uniqueness ───────────────────────────────────────
    gdf.expect_column_values_to_be_unique("sale_id")

    # ─── Value Ranges ─────────────────────────────────────
    gdf.expect_column_values_to_be_between("revenue", 0, 1_000_000)
    gdf.expect_column_values_to_be_between(
        "order_date",
        min_value="2020-01-01",
        max_value="2030-12-31"
    )

    # ─── Referential Integrity ─────────────────────────────
    valid_customer_keys = set(get_dim_customer_keys())
    gdf.expect_column_values_to_be_in_set(
        "customer_key", valid_customer_keys
    )

    # ─── Volume Check ─────────────────────────────────────
    gdf.expect_table_row_count_to_be_between(
        min_value=1000,    # לפחות 1000 מכירות ביום
        max_value=500_000
    )

    # ─── Statistical ──────────────────────────────────────
    gdf.expect_column_mean_to_be_between("revenue", 50, 500)

    results = gdf.validate()

    if not results.success:
        failed = [r for r in results.results if not r.success]
        raise ValueError(f"Data quality failed: {len(failed)} checks")

    return True`,
      },
      {
        type: 'tip',
        text: 'כלל הזהב לביצועי DWH: (1) Partition by date — הפלטר הנפוץ ביותר. (2) Cluster/Sort by dimension keys — לצמצם scan. (3) אל תשתמש ב-SELECT * — בColón store זה קורא הכל. (4) Materialized Views לאגרגציות נפוצות.',
      },
    ],
    questionBank: [
      {
        id: 'perf-q1',
        text: 'מה Partition Pruning?',
        options: [
          'מחיקת partitions ישנים',
          'הquery planner מדלג על partitions שלא מתאימים ל-WHERE clause — קורא פחות נתונים',
          'יצירת partition אוטומטי',
          'דחיסת partitions',
        ],
        correct: 1,
        explanation: 'WHERE order_date BETWEEN "2024-01-01" AND "2024-12-31" → PostgreSQL מזהה שצריך רק fact_sales_2024 ומדלג על כל Partitions אחרים. חיסכון דרמטי בI/O.',
      },
      {
        id: 'perf-q2',
        text: 'למה Columnar Storage מהיר לשאילתות BI?',
        options: [
          'כי הנתונים ממוינים',
          'כי שאילתות BI בוחרות עמודות ספציפיות — Columnar קורא רק אותן, לא שאר העמודות',
          'כי Columnar תומך ב-parallel',
          'כי Columnar מוצפן',
        ],
        correct: 1,
        explanation: 'SELECT SUM(revenue) FROM fact_sales: Row store קורא כל row (גם order_id, customer_key, product_key...). Columnar קורא רק עמודת revenue. 10 עמודות → 10x פחות I/O.',
      },
      {
        id: 'perf-q3',
        text: 'מה Clustering ב-BigQuery מוסיף על Partitioning?',
        options: [
          'Clustering מחלק לקבצים קטנים יותר',
          'Clustering ממיין נתונים בתוך partition — מאפשר skip של row groups לפי עמודות ה-Cluster',
          'Clustering מוסיף index',
          'Clustering מצפין',
        ],
        correct: 1,
        explanation: 'Partition: קפיצה בין תאריכים. Cluster(customer_key): בתוך הpartition, נתוני customer 12345 ביחד. שאילתה עם WHERE customer_key=12345 קוראת רק חלק מה-partition.',
      },
      {
        id: 'perf-q4',
        text: 'מה Great Expectations Volume Check בודק?',
        options: [
          'גודל קבצי Parquet',
          'שמספר השורות בטווח הצפוי — גילוי anomalies כמו "נתונים חסרים" או "העמסה כפולה"',
          'כמות העמודות',
          'מספר Partitions',
        ],
        correct: 1,
        explanation: 'row_count_between(1000, 500000): אם היום הגיעו 50 שורות בלבד — כנראה בעיה ב-Extract. אם הגיעו 1M — כנראה כפילות. Volume anomaly detection מונע טעינת נתונים שגויים.',
      },
      {
        id: 'perf-q5',
        text: 'מה Snappy compression מוסיף ל-Parquet?',
        options: [
          'הצפנה',
          'דחיסת קבצים ללא אובדן — קבצים קטנים יותר לS3, I/O מהיר יותר, קריאה מהירה (דחיסה קלה לפירוק)',
          'encryption at rest',
          'schema validation',
        ],
        correct: 1,
        explanation: 'Snappy: דחיסה מהירה (לא הכי חזקה). Parquet עם Snappy = קובץ ~3x קטן, ו-CPU לפירוק זניח. גם Dictionary Encoding לstrings חוסך משמעותית — "Israel" מאוחסן פעם אחת.',
      },
    ],
  },
]
