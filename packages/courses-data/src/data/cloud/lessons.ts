import type { Lesson } from '../../types'

export const cloudLessons: Lesson[] = [
  {
    id: 'cloud-intro',
    title: 'מבוא לענן',
    summary: 'מה זה ענן, למה כולם עוברים אליו, ואיך זה עובד',
    emoji: '☁️',
    content: [
      { type: 'heading', text: 'מה זה Cloud Computing?' },
      {
        type: 'text',
        text: 'ענן (Cloud) הוא שרתים, אחסון, מסדי נתונים, רשתות ותוכנות שרצים במרכזי נתונים ברחבי העולם — ואתם ניגשים אליהם דרך האינטרנט. במקום לקנות שרת פיזי ולהציב אותו אצלכם, אתם "שוכרים" משאבים לפי צורך.',
      },
      {
        type: 'tip',
        text: 'הענן לא אומר שאין שרתים — הוא אומר שהשרתים של מישהו אחר, ואתם משלמים רק על מה שאתם משתמשים.',
      },
      { type: 'heading', text: 'למה ענן?' },
      {
        type: 'text',
        text: 'לפני הענן, חברה שרצתה להפעיל אפליקציה הייתה צריכה לקנות שרתים, להתקין תוכנה, להחזיק IT, ולשלם גם כשאין שימוש. הענן שינה הכל: מרכישה חד-פעמית לתשלום לפי שימוש, ממשאב קבוע למשאב גמיש.',
      },
      {
        type: 'table',
        caption: 'מסורתי vs ענן',
        headers: ['נושא', 'מסורתי (On-Premise)', 'ענן (Cloud)'],
        rows: [
          ['עלות התחלתית', 'גבוהה מאוד', 'כמעט אפס'],
          ['גמישות', 'קשיחה', 'גמישה לחלוטין'],
          ['תחזוקה', 'צוות IT פנימי', 'ספק הענן'],
          ['אמינות', 'תלוי בתשתית עצמית', 'SLA גבוה (99.9%+)'],
          ['אבטחה', 'אחריות מלאה עלינו', 'אחריות משותפת'],
        ],
      },
      { type: 'heading', text: 'מודלי שירות' },
      {
        type: 'text',
        text: 'יש שלושה מודלים עיקריים בענן: IaaS — תשתית כשירות (שרתים וירטואליים, רשת, אחסון). PaaS — פלטפורמה כשירות (סביבת ריצה, מסד נתונים מנוהל). SaaS — תוכנה כשירות (Gmail, Office 365). ככל שעולים, ספק הענן מנהל יותר ואתם מנהלים פחות.',
      },
      {
        type: 'table',
        caption: 'מה אתם מנהלים בכל מודל',
        headers: ['שכבה', 'On-Premise', 'IaaS', 'PaaS', 'SaaS'],
        rows: [
          ['אפליקציה', 'אנחנו', 'אנחנו', 'אנחנו', 'ספק'],
          ['Runtime', 'אנחנו', 'אנחנו', 'ספק', 'ספק'],
          ['מערכת הפעלה', 'אנחנו', 'אנחנו', 'ספק', 'ספק'],
          ['חומרה', 'אנחנו', 'ספק', 'ספק', 'ספק'],
        ],
      },
      { type: 'heading', text: 'שלושת הספקים הגדולים' },
      {
        type: 'text',
        text: 'שוק הענן נשלט על ידי שלושה ענקים: AWS של אמזון (כ-33% נתח שוק), Azure של מיקרוסופט (כ-23%), ו-GCP של גוגל (כ-11%). יחד הם מהווים יותר מ-65% משוק הענן העולמי.',
      },
    ],
    questionBank: [
      {
        id: 'cloud-intro-q1',
        text: 'מה ההגדרה הנכונה ביותר לענן (Cloud Computing)?',
        options: [
          'שרת פיזי שנמצא בחברה',
          'גישה למשאבי מחשוב דרך האינטרנט לפי צורך',
          'תוכנה שרצה מקומית על המחשב',
          'רשת פנימית של חברה',
        ],
        correct: 1,
        explanation: 'ענן הוא גישה למשאבי מחשוב (שרתים, אחסון, רשת) דרך האינטרנט, עם תשלום לפי שימוש.',
      },
      {
        id: 'cloud-intro-q2',
        text: 'מה ההבדל בין IaaS ל-PaaS?',
        options: [
          'אין הבדל, שניהם אותו הדבר',
          'ב-IaaS ספק הענן מנהל הכל, ב-PaaS לא',
          'ב-IaaS אנחנו מנהלים את מערכת ההפעלה, ב-PaaS הספק מנהל אותה',
          'PaaS זול יותר תמיד',
        ],
        correct: 2,
        explanation: 'ב-IaaS אתם מקבלים תשתית (VM) וצריכים לנהל OS ומעלה. ב-PaaS הספק מנהל את ה-OS וה-Runtime, ואתם רק מפרסמים קוד.',
      },
      {
        id: 'cloud-intro-q3',
        text: 'מי ספק הענן הגדול בעולם לפי נתח שוק?',
        options: ['Azure (מיקרוסופט)', 'GCP (גוגל)', 'AWS (אמזון)', 'IBM Cloud'],
        correct: 2,
        explanation: 'AWS של אמזון היא ספקית הענן הגדולה בעולם עם כ-33% נתח שוק.',
      },
      {
        id: 'cloud-intro-q4',
        text: 'מה SaaS?',
        options: [
          'תוכנה שמותקנת מקומית',
          'תוכנה כשירות — מגישים דרך הדפדפן בלי התקנה (Gmail, Salesforce)',
          'שרת שמנוהל על ידי חברה',
          'מכונה וירטואלית',
        ],
        correct: 1,
        explanation: 'SaaS = Software as a Service. תוכנה שרצה לחלוטין אצל הספק — אתם רק גולשים לאתר. דוגמאות: Gmail, Office 365, Salesforce, Zoom.',
      },
      {
        id: 'cloud-intro-q5',
        text: 'מה Region ב-ענן?',
        options: [
          'מחלקה בחברה',
          'אזור גיאוגרפי עם מרכזי נתונים — בוחרים לפי קרבה למשתמשים ורגולציה',
          'סוג של שרת',
          'רמת אבטחה',
        ],
        correct: 1,
        explanation: 'Region = אזור גיאוגרפי (ישראל-ת"א, אירופה-פרנקפורט). בוחרים Region קרוב למשתמשים לzהפחתת latency ולעמידה ברגולציה (GDPR).',
      },
      {
        id: 'cloud-intro-q6',
        text: 'מה Availability Zone (AZ)?',
        options: [
          'Region שלם',
          'מרכז נתונים בודד או קבוצה בתוך Region — בידוד מכשלות',
          'Zone לזמינות גבוהה בלבד',
          'שם שרת',
        ],
        correct: 1,
        explanation: 'AZ = מרכז נתונים אחד או יותר באותו Region. פרישה לכמה AZs מבטיחה שאם AZ אחד נכשל, האפליקציה ממשיכה לעבוד.',
      },
      {
        id: 'cloud-intro-q7',
        text: 'מה Shared Responsibility Model?',
        options: [
          'ספק הענן אחראי לכל',
          'אחריות מחולקת: ספק אחראי לתשתית; לקוח אחראי לנתונים, אפליקציה, הגדרות',
          'הלקוח אחראי לכל',
          'הממשלה אחראית',
        ],
        correct: 1,
        explanation: 'Shared Responsibility: AWS/Azure/GCP אחראים ל"security OF the cloud" (חומרה, רשת). אתם אחראים ל-"security IN the cloud" (הנתונים, הגדרות, IAM).',
      },
      {
        id: 'cloud-intro-q8',
        text: 'מה CapEx לעומת OpEx בהקשר ענן?',
        options: [
          'שתי שיטות קוד',
          'CapEx = הוצאה הונית חד-פעמית (קניית שרתים); OpEx = הוצאה תפעולית שוטפת (ענן)',
          'OpEx = הוצאה הונית; CapEx = שוטפת',
          'אין הבדל',
        ],
        correct: 1,
        explanation: 'ענן הופך IT מ-CapEx (קניית שרת = השקעה גדולה מראש) ל-OpEx (תשלום חודשי = הוצאה תפעולית). גמיש יותר לתזרים מזומנים.',
      },
      {
        id: 'cloud-intro-q9',
        text: 'מה Elasticity בענן?',
        options: [
          'גמישות פיזית של שרתים',
          'יכולת להגדיל/להקטין משאבים אוטומטית לפי ביקוש',
          'תשלום לפי שימוש',
          'גיבוי אוטומטי',
        ],
        correct: 1,
        explanation: 'Elasticity: Black Friday = עלייה אוטומטית בשרתים. אחרי Black Friday = ירידה. משלמים רק על מה שאתם משתמשים בו ברגע נתון.',
      },
      {
        id: 'cloud-intro-q10',
        text: 'מה CDN (Content Delivery Network)?',
        options: [
          'סוג של מסד נתונים',
          'רשת שרתים גלובלית שמגישה תוכן מהנקודה הקרובה ביותר למשתמש',
          'שירות DNS',
          'ספקית ענן',
        ],
        correct: 1,
        explanation: 'CDN: CloudFront (AWS), Azure CDN, Cloudflare. מאחסנים cache של קבצים סטטיים ב-edge servers ברחבי העולם — תמונות, JS, CSS מגיעים מהר יותר.',
      },
      {
        id: 'cloud-intro-q11',
        text: 'מה High Availability?',
        options: [
          'שרת מהיר',
          'עיצוב המערכת כך שתמשיך לפעול גם כשחלקים נכשלים — SLA 99.9%+',
          'גיבוי נתונים',
          'Load Balancing בלבד',
        ],
        correct: 1,
        explanation: 'HA: פריסה לכמה AZ, Load Balancer, Auto Scaling. SLA של 99.9% = לא יותר מ-8.7 שעות downtime בשנה. 99.99% = פחות מ-53 דקות.',
      },
    ],
  },

  {
    id: 'cloud-aws',
    title: 'AWS — אמזון ווב סרביסס',
    summary: 'הספקית הגדולה בעולם — שירותים מרכזיים ואיך להתחיל',
    emoji: '🟠',
    content: [
      { type: 'heading', text: 'מה זה AWS?' },
      {
        type: 'text',
        text: 'Amazon Web Services (AWS) הושקה ב-2006 ושינתה את עולם הענן לנצח. היא מציעה מעל 200 שירותים — מ-VM פשוט ועד AI מתקדם. אם תצטרכו ללמוד ענן אחד, AWS תמיד תיתן לכם את הבסיס הכי רחב.',
      },
      {
        type: 'tip',
        text: 'AWS מציעה Free Tier — שכבת שימוש חינמית לשנה הראשונה עבור עשרות שירותים. מושלם לתרגול.',
      },
      { type: 'heading', text: 'שירותים מרכזיים ב-AWS' },
      {
        type: 'table',
        caption: 'שירותי AWS העיקריים',
        headers: ['קטגוריה', 'שירות', 'תיאור'],
        rows: [
          ['מחשוב', 'EC2', 'מכונות וירטואליות (Virtual Machines)'],
          ['מחשוב', 'Lambda', 'פונקציות Serverless — קוד ללא שרת'],
          ['אחסון', 'S3', 'אחסון קבצים — מהיר, זול, אמין'],
          ['מסד נתונים', 'RDS', 'מסד נתונים מנוהל (MySQL, PostgreSQL...)'],
          ['מסד נתונים', 'DynamoDB', 'מסד נתונים NoSQL מנוהל'],
          ['רשת', 'VPC', 'רשת פרטית וירטואלית'],
          ['CDN', 'CloudFront', 'הגשת תוכן מהירה ברחבי העולם'],
          ['אבטחה', 'IAM', 'ניהול הרשאות ומשתמשים'],
        ],
      },
      { type: 'heading', text: 'EC2 — מכונות וירטואליות' },
      {
        type: 'text',
        text: 'EC2 (Elastic Compute Cloud) הוא הבסיס של AWS. הוא מאפשר להריץ שרתים וירטואליים (Instances) בענן. בוחרים גודל (t3.micro, m5.large...), מערכת הפעלה (Linux, Windows), ומפעילים.',
      },
      {
        type: 'code',
        lang: 'bash',
        caption: 'התחברות ל-EC2 Instance דרך SSH',
        code: `# התחברות ל-EC2 Instance לינוקס:
ssh -i "my-key.pem" ec2-user@ec2-12-34-56-78.compute-1.amazonaws.com

# עדכון חבילות:
sudo yum update -y

# התקנת nginx:
sudo yum install -y nginx
sudo systemctl start nginx`,
      },
      { type: 'heading', text: 'S3 — אחסון קבצים' },
      {
        type: 'text',
        text: 'S3 (Simple Storage Service) הוא אחסון עצום, זול ואמין. מאחסנים בו קבצים בתוך "דליים" (Buckets). משמש לגיבויים, סטטיק אתרים, תמונות, לוגים — כמעט כל דבר. עלות: כ-0.023$ לגיגה-בייט לחודש.',
      },
      {
        type: 'code',
        lang: 'bash',
        caption: 'עבודה עם S3 דרך AWS CLI',
        code: `# יצירת bucket:
aws s3 mb s3://my-unique-bucket-name

# העלאת קובץ:
aws s3 cp myfile.txt s3://my-unique-bucket-name/

# הורדת קובץ:
aws s3 cp s3://my-unique-bucket-name/myfile.txt ./

# הצגת תוכן bucket:
aws s3 ls s3://my-unique-bucket-name/

# מחיקת קובץ:
aws s3 rm s3://my-unique-bucket-name/myfile.txt`,
      },
      { type: 'heading', text: 'Lambda — Serverless' },
      {
        type: 'text',
        text: 'Lambda מאפשר להריץ קוד ללא ניהול שרתים. כותבים פונקציה, מגדירים מה מפעיל אותה (HTTP Request, שינוי ב-S3, טיימר...), ו-AWS מריץ אותה אוטומטית. משלמים רק על זמן הריצה בפועל.',
      },
      {
        type: 'code',
        lang: 'javascript',
        caption: 'פונקציית Lambda בסיסית (Node.js)',
        code: `exports.handler = async (event) => {
  console.log('Event:', JSON.stringify(event));

  const name = event.queryStringParameters?.name || 'עולם';

  return {
    statusCode: 200,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message: \`שלום, \${name}!\` }),
  };
};`,
      },
      { type: 'heading', text: 'IAM — ניהול הרשאות' },
      {
        type: 'text',
        text: 'IAM (Identity and Access Management) הוא מערכת ההרשאות של AWS. כל גישה לכל שירות עוברת דרך IAM. כלל הזהב: Least Privilege — תנו רק את ההרשאות שצריך, לא יותר.',
      },
      {
        type: 'tip',
        text: 'לעולם אל תשתמשו ב-Root Account לעבודה יומיומית! צרו IAM User עם ההרשאות הדרושות בלבד.',
      },
    ],
    questionBank: [
      {
        id: 'aws-q1',
        text: 'מה השירות ב-AWS המתאים לאחסון קבצים בקנה מידה גדול?',
        options: ['EC2', 'S3', 'RDS', 'Lambda'],
        correct: 1,
        explanation: 'S3 (Simple Storage Service) הוא שירות אחסון הקבצים של AWS — מהיר, זול ואמין לכל סוג קובץ.',
      },
      {
        id: 'aws-q2',
        text: 'מה זה Serverless (Lambda)?',
        options: [
          'שרת שלא קיים כלל',
          'שרת שאינו מחובר לרשת',
          'הרצת קוד ללא ניהול שרתים — האחריות על התשתית אצל AWS',
          'שרת שעובד 24/7 ללא הפסקה',
        ],
        correct: 2,
        explanation: 'Serverless לא אומר שאין שרתים — אומר שאתם לא מנהלים אותם. AWS מריץ את הקוד שלכם ואתם משלמים רק על זמן הריצה.',
      },
      {
        id: 'aws-q3',
        text: 'מה עיקרון "Least Privilege" ב-IAM?',
        options: [
          'לתת לכל משתמש הרשאות מנהל',
          'לתת רק את ההרשאות הנדרשות בפועל, לא יותר',
          'לא לתת הרשאות לאף אחד',
          'להשתמש תמיד ב-Root Account',
        ],
        correct: 1,
        explanation: 'Least Privilege = הרשאות מינימליות הנדרשות לביצוע המשימה. זה מצמצם את הנזק הפוטנציאלי אם חשבון נפרץ.',
      },
      {
        id: 'aws-q4',
        text: 'מה הם AWS Regions?',
        options: [
          'תוכניות AWS',
          'אזורים גיאוגרפיים נפרדים עם מרכזי נתונים — us-east-1, eu-west-1, il-central-1',
          'סוגי שירותי AWS',
          'רמות חיוב',
        ],
        correct: 1,
        explanation: 'AWS מחולקת ל-Regions (כ-30+). ישראל: il-central-1. כל Region עצמאי. בוחרים לפי latency, רגולציה ועלות.',
      },
      {
        id: 'aws-q5',
        text: 'מה RDS?',
        options: [
          'שירות DNS',
          'שירות מסדי נתונים מנוהל — MySQL, PostgreSQL, Oracle ועוד ללא ניהול תשתית',
          'שירות Redis',
          'שירות ניטור',
        ],
        correct: 1,
        explanation: 'RDS = Relational Database Service. AWS מנהל patches, backups, failover. אתם רק מגדירים את הDB ומשתמשים.',
      },
      {
        id: 'aws-q6',
        text: 'מה CloudFormation?',
        options: [
          'שירות הגנה מפני ענן',
          'Infrastructure as Code ל-AWS — מגדירים תשתית ב-YAML/JSON',
          'שירות CDN',
          'שירות ML',
        ],
        correct: 1,
        explanation: 'CloudFormation: template YAML/JSON שמגדיר EC2, RDS, S3, VPC — AWS יוצר הכל אוטומטית. תשתית כקוד.',
      },
      {
        id: 'aws-q7',
        text: 'מה VPC?',
        options: [
          'Virtual Private Cloud — רשת מבודדת לוגית ב-AWS',
          'Very Private Computer',
          'שם שירות EC2',
          'שם לאבטחה',
        ],
        correct: 0,
        explanation: 'VPC = Virtual Private Cloud: רשת פרטית וירטואלית ב-AWS. מגדירים subnets, routing, security groups, internet gateway.',
      },
      {
        id: 'aws-q8',
        text: 'מה Auto Scaling?',
        options: [
          'הגדלת DB אוטומטית',
          'הוספה/הסרה אוטומטית של EC2 instances לפי עומס',
          'שדרוג EC2 אוטומטי',
          'שדרוג version',
        ],
        correct: 1,
        explanation: 'Auto Scaling: כשהCPU עולה מעל 70% — מוסיפים instances. כשיורד מ-30% — מסירים. שמירה על ביצועים + חיסכון בעלויות.',
      },
    ],
  },

  {
    id: 'cloud-azure',
    title: 'Azure — מיקרוסופט ענן',
    summary: 'ענן מיקרוסופט — שירותים, אינטגרציה עם Windows ו-Active Directory',
    emoji: '🔵',
    content: [
      { type: 'heading', text: 'מה זה Microsoft Azure?' },
      {
        type: 'text',
        text: 'Azure הושק ב-2010 והוא ענן מיקרוסופט. הוא ספקית הענן השנייה בגודלה ונחשב לחזקה במיוחד בסביבות ארגוניות שכבר משתמשות ב-Windows, Active Directory ו-Microsoft 365. אם הארגון שלכם "מיקרוסופטי" — Azure הוא בדרך כלל הבחירה הטבעית.',
      },
      { type: 'heading', text: 'שירותים מרכזיים ב-Azure' },
      {
        type: 'table',
        caption: 'שירותי Azure מרכזיים ומקבילם ב-AWS',
        headers: ['קטגוריה', 'שירות Azure', 'מקביל ב-AWS'],
        rows: [
          ['מחשוב', 'Azure Virtual Machines', 'EC2'],
          ['Serverless', 'Azure Functions', 'Lambda'],
          ['אחסון', 'Azure Blob Storage', 'S3'],
          ['מסד נתונים', 'Azure SQL Database', 'RDS'],
          ['מסד נתונים NoSQL', 'Cosmos DB', 'DynamoDB'],
          ['CDN', 'Azure CDN', 'CloudFront'],
          ['אבטחה/זהויות', 'Azure Active Directory', 'IAM + Cognito'],
          ['Kubernetes', 'AKS', 'EKS'],
        ],
      },
      { type: 'heading', text: 'Azure Active Directory (Azure AD / Entra ID)' },
      {
        type: 'text',
        text: 'Azure AD (כיום Microsoft Entra ID) הוא הכלי לניהול זהויות והרשאות. הוא משתלב ישירות עם Office 365, Teams, ושאר מוצרי מיקרוסופט. בארגונים רבים הוא כבר קיים — ולכן Azure נהיה בחירה טבעית.',
      },
      {
        type: 'tip',
        text: 'Single Sign-On (SSO) עם Azure AD — משתמשים נכנסים פעם אחת ומקבלים גישה לכל האפליקציות. חוסך זמן ומגביר אבטחה.',
      },
      { type: 'heading', text: 'Azure Resource Manager (ARM)' },
      {
        type: 'text',
        text: 'ב-Azure כל המשאבים מנוהלים דרך ARM — Resource Groups. כל משאב (VM, מסד נתונים, רשת) שייך ל-Resource Group. זה מקל על ניהול, חיוב, ומחיקה של פרויקטים שלמים.',
      },
      {
        type: 'code',
        lang: 'bash',
        caption: 'יצירת משאבים ב-Azure CLI',
        code: `# כניסה ל-Azure:
az login

# יצירת Resource Group:
az group create --name MyResourceGroup --location eastus

# יצירת VM לינוקס:
az vm create \\
  --resource-group MyResourceGroup \\
  --name MyVM \\
  --image Ubuntu2204 \\
  --admin-username azureuser \\
  --generate-ssh-keys

# הצגת כל המשאבים בקבוצה:
az resource list --resource-group MyResourceGroup -o table`,
      },
      { type: 'heading', text: 'Azure Functions — Serverless' },
      {
        type: 'text',
        text: 'Azure Functions הוא שירות Serverless של Azure שמאפשר להריץ קוד בתגובה לאירועים כגון בקשות HTTP, הודעות בתור, או טיימרים. הדוגמה הבאה מראה פונקציה שמגיבה לבקשת GET/POST ומחזירה JSON — שימו לב לאופן ההגדרה החדש עם app.http() שהוצג ב-v4 של ה-SDK.',
      },
      {
        type: 'code',
        lang: 'javascript',
        caption: 'Azure Function בסיסית (HTTP Trigger)',
        code: `const { app } = require('@azure/functions');

app.http('HelloWorld', {
  methods: ['GET', 'POST'],
  authLevel: 'anonymous',
  handler: async (request, context) => {
    const name = request.query.get('name') || 'עולם';

    return {
      status: 200,
      body: JSON.stringify({ message: \`שלום, \${name}!\` }),
    };
  },
});`,
      },
      { type: 'heading', text: 'Azure DevOps — CI/CD' },
      {
        type: 'text',
        text: 'Azure DevOps מציע כלי פיתוח מלאים: Repos (Git), Pipelines (CI/CD), Boards (ניהול משימות), Artifacts (ניהול חבילות). הוא מתחרה ישיר ב-GitHub Actions ו-GitLab CI.',
      },
    ],
    questionBank: [
      {
        id: 'azure-q1',
        text: 'מה המקביל של AWS S3 ב-Azure?',
        options: ['Azure SQL Database', 'Azure Functions', 'Azure Blob Storage', 'Azure AD'],
        correct: 2,
        explanation: 'Azure Blob Storage הוא שירות אחסון הקבצים של Azure, המקביל ל-S3 של AWS.',
      },
      {
        id: 'azure-q2',
        text: 'מה זה Azure Active Directory?',
        options: [
          'מסד נתונים של Azure',
          'שירות ניהול זהויות והרשאות של מיקרוסופט',
          'CDN של Azure',
          'שירות גיבוי אוטומטי',
        ],
        correct: 1,
        explanation: 'Azure AD (Microsoft Entra ID) הוא שירות ניהול זהויות — מאמת משתמשים ומנהל הרשאות לאפליקציות.',
      },
      {
        id: 'azure-q3',
        text: 'מהו Resource Group ב-Azure?',
        options: [
          'קבוצת משתמשים עם אותן הרשאות',
          'תוכנית תמחור',
          'מיכל לוגי שמקבץ משאבי Azure קשורים',
          'רשת פרטית וירטואלית',
        ],
        correct: 2,
        explanation: 'Resource Group הוא מיכל לוגי ב-Azure שמקבץ משאבים קשורים (VM, DB, רשת) לפרויקט אחד — מקל על ניהול וחיוב.',
      },
      {
        id: 'azure-q4',
        text: 'מה Azure DevOps?',
        options: [
          'מערכת הפעלה',
          'פלטפורמת CI/CD ושיתוף פעולה של מיקרוסופט — pipelines, repos, boards',
          'שירות VM',
          'Azure Functions',
        ],
        correct: 1,
        explanation: 'Azure DevOps: Repos (git), Pipelines (CI/CD), Boards (Agile), Artifacts (packages). פלטפורמה מלאה לפיתוח תוכנה.',
      },
      {
        id: 'azure-q5',
        text: 'מה Azure Kubernetes Service (AKS)?',
        options: [
          'שירות VM מנוהל',
          'Kubernetes מנוהל ב-Azure — מריצים containers ב-cluster מנוהל',
          'שירות serverless',
          'שירות DB',
        ],
        correct: 1,
        explanation: 'AKS: Azure מנהל את ה-control plane של Kubernetes. אתם מנהלים רק את ה-worker nodes והאפליקציות.',
      },
      {
        id: 'azure-q6',
        text: 'מה Azure Cosmos DB?',
        options: [
          'SQL Database',
          'מסד נתונים NoSQL מנוהל גלובלי עם חביון נמוך',
          'מסד נתונים ב-local',
          'Graph Database בלבד',
        ],
        correct: 1,
        explanation: 'Cosmos DB: מסד נתונים NoSQL מנוהל שתומך במודלים שונים (document, graph, key-value). מפוזר גלובלית עם SLA של 99.999%.',
      },
      {
        id: 'azure-q7',
        text: 'מה ARM Template?',
        options: [
          'מעבד ARM',
          'Azure Resource Manager Template — Infrastructure as Code ל-Azure ב-JSON',
          'שם לVM',
          'ARM CPU Template',
        ],
        correct: 1,
        explanation: 'ARM Template (ועכשיו Bicep) הוא Infrastructure as Code של Azure. מגדירים משאבים ב-JSON/Bicep ו-Azure יוצר הכל.',
      },
      {
        id: 'azure-q8',
        text: 'מה Azure Monitor?',
        options: [
          'מסך Azure',
          'שירות ניטור מלא — logs, metrics, alerts, Application Insights',
          'שירות backup',
          'שירות security',
        ],
        correct: 1,
        explanation: 'Azure Monitor: Log Analytics (שאילתות KQL), Application Insights (APM), Metrics (גרפים), Alerts (התראות אוטומטיות).',
      },
    ],
  },

  {
    id: 'cloud-gcp',
    title: 'GCP — גוגל קלאוד',
    summary: 'ענן גוגל — AI, Big Data ותשתית אינטרנט מהירה',
    emoji: '🟡',
    content: [
      { type: 'heading', text: 'מה זה Google Cloud Platform?' },
      {
        type: 'text',
        text: 'GCP הוא ענן גוגל, שהושק ב-2008. הוא רץ על אותה תשתית שמפעילה את גוגל סרץ׳, יוטיוב וג׳ימייל. GCP נחשב לחזק במיוחד ב-Machine Learning, Big Data, ותשתית רשת מהירה. Kubernetes עצמו נוצר ב-Google.',
      },
      {
        type: 'tip',
        text: 'GCP מציע $300 קרדיט חינם לשנה הראשונה — יותר מ-AWS ו-Azure. מושלם לניסיון.',
      },
      { type: 'heading', text: 'שירותים מרכזיים ב-GCP' },
      {
        type: 'table',
        caption: 'שירותי GCP עיקריים ומקביליהם',
        headers: ['קטגוריה', 'שירות GCP', 'מקביל ב-AWS'],
        rows: [
          ['מחשוב', 'Compute Engine', 'EC2'],
          ['Serverless', 'Cloud Functions', 'Lambda'],
          ['קונטיינרים', 'Google Kubernetes Engine (GKE)', 'EKS'],
          ['אחסון', 'Cloud Storage', 'S3'],
          ['מסד נתונים SQL', 'Cloud SQL', 'RDS'],
          ['מסד נתונים NoSQL', 'Firestore / Bigtable', 'DynamoDB'],
          ['Big Data', 'BigQuery', 'Redshift'],
          ['AI/ML', 'Vertex AI', 'SageMaker'],
        ],
      },
      { type: 'heading', text: 'BigQuery — ניתוח נתונים בענן' },
      {
        type: 'text',
        text: 'BigQuery הוא הכלי הכי ייחודי ב-GCP. הוא Data Warehouse מנוהל שמאפשר להריץ שאילתות SQL על פטבייטים של נתונים תוך שניות — ובלי לנהל שרתים. חברות כמו Spotify, Twitter וFitbit משתמשות בו לניתוח לוגים ומדדים.',
      },
      {
        type: 'code',
        lang: 'sql',
        caption: 'שאילתת BigQuery — ניתוח נתונים ציבוריים',
        code: `-- ניתוח של מיליוני שורות תוך שניות:
SELECT
  country,
  COUNT(*) AS total_orders,
  SUM(amount) AS total_revenue,
  AVG(amount) AS avg_order
FROM \`my-project.sales.orders\`
WHERE DATE(created_at) >= DATE_SUB(CURRENT_DATE(), INTERVAL 30 DAY)
GROUP BY country
ORDER BY total_revenue DESC
LIMIT 10;`,
      },
      { type: 'heading', text: 'Cloud Functions — Serverless' },
      {
        type: 'text',
        text: 'Google Cloud Functions היא מקבילת GCP ל-Lambda ו-Azure Functions. הדוגמה מראה את הסינטקס הפשוט של Node.js עם functions-framework — מגדירים handler לבקשת HTTP ו-GCP מטפל בכל השאר. שימו לב שאין צורך לנהל שרת או פורט.',
      },
      {
        type: 'code',
        lang: 'javascript',
        caption: 'Google Cloud Function בסיסית (Node.js)',
        code: `const functions = require('@google-cloud/functions-framework');

functions.http('helloWorld', (req, res) => {
  const name = req.query.name || 'עולם';
  res.json({ message: \`שלום, \${name}!\` });
});`,
      },
      { type: 'heading', text: 'GKE — Kubernetes מנוהל' },
      {
        type: 'text',
        text: 'Google Kubernetes Engine הוא הסביבה הכי בשלה להרצת Kubernetes — לא מפתיע, כי גוגל יצרו את Kubernetes. GKE מנהל עדכונים, scaling, ו-load balancing אוטומטית.',
      },
      {
        type: 'code',
        lang: 'bash',
        caption: 'עבודה עם GKE דרך gcloud CLI',
        code: `# כניסה ל-GCP:
gcloud auth login

# יצירת GKE Cluster:
gcloud container clusters create my-cluster \\
  --zone us-central1-a \\
  --num-nodes 3

# קבלת credentials לkubectl:
gcloud container clusters get-credentials my-cluster \\
  --zone us-central1-a

# הצגת Nodes:
kubectl get nodes

# Deploy אפליקציה:
kubectl apply -f deployment.yaml`,
      },
      { type: 'heading', text: 'Vertex AI — בינה מלאכותית' },
      {
        type: 'text',
        text: 'Vertex AI הוא פלטפורמת ה-ML של GCP. מכיל כלים לאימון מודלים, הגשתם כ-API, ופיפליינים אוטומטיים. כולל גישה למודלי Gemini של גוגל. נחשב לאחד הכלים החזקים ביותר לבניית פתרונות AI בסקייל.',
      },
    ],
    questionBank: [
      {
        id: 'gcp-q1',
        text: 'מה הכלי הייחודי ב-GCP לניתוח נתונים גדולים (Big Data)?',
        options: ['Cloud SQL', 'Firestore', 'BigQuery', 'Compute Engine'],
        correct: 2,
        explanation: 'BigQuery הוא Data Warehouse מנוהל של GCP שמאפשר שאילתות SQL על פטבייטים של נתונים תוך שניות.',
      },
      {
        id: 'gcp-q2',
        text: 'איזה טכנולוגיה פופולרית נוצרה ב-Google ונמצאת ב-GKE?',
        options: ['Docker', 'Terraform', 'Kubernetes', 'Ansible'],
        correct: 2,
        explanation: 'Kubernetes נוצר ב-Google ומנוהל כיום על ידי CNCF. GKE היא הסביבה המנוהלת של גוגל לריצת Kubernetes.',
      },
      {
        id: 'gcp-q3',
        text: 'מה היתרון העיקרי של GCP על פני AWS ו-Azure בתחום ה-AI?',
        options: [
          'GCP ללא AI בכלל',
          'גישה למודלי Gemini ו-Vertex AI על תשתית גוגל עצמה',
          'GCP זול יותר',
          'GCP יש יותר Regions',
        ],
        correct: 1,
        explanation: 'GCP מציע גישה למודלי Gemini של גוגל ו-Vertex AI על אותה תשתית שמפעילה את מוצרי ה-AI של גוגל.',
      },
      {
        id: 'gcp-q4',
        text: 'מה Cloud Run ב-GCP?',
        options: [
          'שירות VM',
          'שירות serverless מנוהל להרצת containers ללא ניהול תשתית',
          'Kubernetes מנוהל',
          'שירות CI/CD',
        ],
        correct: 1,
        explanation: 'Cloud Run: מריצים container image ו-GCP מטפל בscaling (כולל scale to zero). מושלם לAPI ו-microservices.',
      },
      {
        id: 'gcp-q5',
        text: 'מה Firebase?',
        options: [
          'שם שרת',
          'פלטפורמת Google לאפליקציות mobile/web — DB, Auth, Hosting, Functions',
          'שירות containers',
          'שרת Linux',
        ],
        correct: 1,
        explanation: 'Firebase: Realtime Database, Firestore, Authentication, Hosting, Cloud Functions. מושלם לprojecting מהירים ואפליקציות mobile.',
      },
      {
        id: 'gcp-q6',
        text: 'מה Cloud Spanner?',
        options: [
          'שם כלי',
          'מסד נתונים SQL מנוהל גלובלי עם consistency חזקה ו-99.999% SLA',
          'NoSQL database',
          'שירות cache',
        ],
        correct: 1,
        explanation: 'Cloud Spanner: פריצת דרך ב-DB. SQL globally distributed עם strong consistency. מפעיל Google Pay, YouTube ועוד.',
      },
      {
        id: 'gcp-q7',
        text: 'מה Cloud Pub/Sub?',
        options: [
          'שירות hosting',
          'שירות messaging קנה-מידה גבוה — publish/subscribe לעיבוד events',
          'שירות DNS',
          'שירות logging',
        ],
        correct: 1,
        explanation: 'Cloud Pub/Sub: Kafka-like messaging service. Publishers שולחים messages לtopics. Subscribers מקבלים ומעבדים. מאפשר microservices decoupling.',
      },
      {
        id: 'gcp-q8',
        text: 'מה Cloud Storage לעומת S3?',
        options: [
          'Cloud Storage פחות בטוח',
          'שניהם שירותי object storage דומים — Cloud Storage הוא המקביל ל-S3 ב-GCP',
          'S3 גלובלי, Cloud Storage אזורי',
          'Cloud Storage ל-DB בלבד',
        ],
        correct: 1,
        explanation: 'Cloud Storage (GCS) ו-S3 הם שירותי object storage מקבילים. GCS פשוט יותר (bucket תמיד גלובלי), S3 מורכב יותר עם policies.',
      },
    ],
  },

  {
    id: 'cloud-comparison',
    title: 'השוואה ובחירת ספק',
    summary: 'AWS vs Azure vs GCP — איך בוחרים נכון לפי הצורך',
    emoji: '⚖️',
    content: [
      { type: 'heading', text: 'אין תשובה אחת נכונה' },
      {
        type: 'text',
        text: 'שלושת הספקים הגדולים מציעים שירותים דומים ברמה גבוהה מאוד. הבחירה תלויה בצרכים הספציפיים של הארגון: מה כבר קיים, מה הצוות מכיר, ומה הפרויקט דורש.',
      },
      { type: 'heading', text: 'השוואה ישירה' },
      {
        type: 'table',
        caption: 'AWS vs Azure vs GCP',
        headers: ['קריטריון', 'AWS', 'Azure', 'GCP'],
        rows: [
          ['נתח שוק', '~33%', '~23%', '~11%'],
          ['שנת הקמה', '2006', '2010', '2008'],
          ['חוזק עיקרי', 'מגוון שירותים, בשלות', 'אינטגרציה Microsoft', 'AI/ML, Big Data'],
          ['קהל יעד', 'כולם', 'ארגונים עם Microsoft', 'Data/AI, Startups'],
          ['תמחור', 'מורכב', 'מורכב', 'שקוף יחסית'],
          ['תיעוד', 'עצום, מורכב', 'טוב, מוכוון MS', 'נקי, מובנה היטב'],
          ['Free Tier', 'שנה ראשונה', 'שנה ראשונה', '$300 קרדיט'],
          ['Kubernetes', 'EKS', 'AKS', 'GKE (הטוב ביותר)'],
        ],
      },
      { type: 'heading', text: 'מתי לבחור AWS?' },
      {
        type: 'text',
        text: 'AWS היא הבחירה הבטוחה ביותר: הכי הרבה שירותים, הכי הרבה תיעוד, הכי הרבה קהילה. אם אתם מתחילים ואין לכם סיבה חזקה לבחור אחרת — AWS הוא הרירית. מתאים לכל גודל חברה.',
      },
      { type: 'heading', text: 'מתי לבחור Azure?' },
      {
        type: 'text',
        text: 'Azure היא הבחירה הטבעית אם הארגון כבר משתמש ב-Microsoft 365, Active Directory, או Visual Studio. האינטגרציה חלקה מאוד. גם חזקה מאוד ב-enterprise compliance ו-hybrid cloud (ענן + on-premise יחד).',
      },
      { type: 'heading', text: 'מתי לבחור GCP?' },
      {
        type: 'text',
        text: 'GCP מתבלטת כשנדרשת עבודה עם כמויות נתונים גדולות (BigQuery), Machine Learning (Vertex AI), או קונטיינרים (GKE). גם פופולרית בקרב Startups שמשתמשים במוצרי גוגל (Firebase, Google Maps API).',
      },
      { type: 'heading', text: 'Multi-Cloud — הפתרון של רבים' },
      {
        type: 'text',
        text: 'ארגונים גדולים רבים משתמשים ביותר מענן אחד — Multi-Cloud. לדוגמה: אחסון נתונים ב-AWS, ניתוח נתונים ב-GCP, וניהול זהויות דרך Azure AD. זה מגדיל גמישות אך מורכבות הניהול עולה.',
      },
      {
        type: 'tip',
        text: 'Terraform מאפשר לנהל תשתית ב-AWS, Azure ו-GCP עם קוד אחיד (Infrastructure as Code). כך Multi-Cloud הופך לניהיל הרבה יותר.',
      },
      {
        type: 'text',
        text: 'Terraform משתמש בשפת HCL (HashiCorp Configuration Language) להגדרת משאבי ענן. הדוגמה הבאה מראה כיצד מגדירים שלושה משאבים בשלושה ספקים שונים — S3 ב-AWS, Resource Group ב-Azure, ו-Cloud Storage ב-GCP — כולם בקובץ אחד. שימו לב שהסינטקס דומה אך שמות המשאבים (resource type) שונים לכל ספק.',
      },
      {
        type: 'code',
        lang: 'hcl',
        caption: 'Terraform — ניהול תשתית מרובת ספקים',
        code: `# משאב AWS:
resource "aws_s3_bucket" "data" {
  bucket = "my-data-bucket"
}

# משאב Azure:
resource "azurerm_resource_group" "main" {
  name     = "my-rg"
  location = "East US"
}

# משאב GCP:
resource "google_storage_bucket" "backup" {
  name     = "my-backup-bucket"
  location = "US"
}`,
      },
    ],
    questionBank: [
      {
        id: 'comparison-q1',
        text: 'לארגון שכבר משתמש ב-Microsoft 365 ו-Active Directory, איזה ענן מתאים ביותר?',
        options: ['AWS', 'Azure', 'GCP', 'כולם שווים'],
        correct: 1,
        explanation: 'Azure משתלב טבעית עם כל מוצרי מיקרוסופט. Azure AD עובד ישירות עם Office 365, Teams ו-Active Directory.',
      },
      {
        id: 'comparison-q2',
        text: 'מה זה Multi-Cloud?',
        options: [
          'ענן שיש לו מספר Regions',
          'שימוש בשני ספקי ענן או יותר במקביל',
          'ענן שיש בו שירותים רבים',
          'ענן שמיועד לחברות גדולות בלבד',
        ],
        correct: 1,
        explanation: 'Multi-Cloud = שימוש בשירותים ממספר ספקי ענן שונים. מגביר גמישות ומפחית תלות בספק יחיד (Vendor Lock-in).',
      },
      {
        id: 'comparison-q3',
        text: 'מה הכלי שמאפשר לנהל תשתית ב-AWS, Azure ו-GCP בקוד אחיד?',
        options: ['Docker', 'Kubernetes', 'Terraform', 'Ansible'],
        correct: 2,
        explanation: 'Terraform הוא כלי Infrastructure as Code שתומך בכל ספקי הענן הגדולים. כותבים קוד HCL אחד ומפרסים לכל ענן.',
      },
      {
        id: 'comparison-q4',
        text: 'מה Vendor Lock-in?',
        options: [
          'מנעול פיזי על שרת',
          'תלות עמוקה בספק ענן אחד שמקשה על מעבר',
          'חוזה עם ספק',
          'נעילת account',
        ],
        correct: 1,
        explanation: 'Vendor Lock-in: שימוש בשירותים ייחודיים לספק (DynamoDB, Azure Service Bus) מקשה על מעבר. Multi-cloud ו-open standards מפחיתים תלות.',
      },
      {
        id: 'comparison-q5',
        text: 'מה הגישה הנכונה לסיסמאות ב-cloud?',
        options: [
          'לשמור ב-code',
          'Secrets Manager / Key Vault — שירות מאובטח לניהול סיסמאות ו-API keys',
          'ב-.env file ב-server',
          'Base64 encoding',
        ],
        correct: 1,
        explanation: 'AWS Secrets Manager, Azure Key Vault, GCP Secret Manager: מאחסנים סיסמאות מוצפנות, מאפשרים rotation אוטומטי ואינטגרציה עם IAM.',
      },
      {
        id: 'comparison-q6',
        text: 'מה FinOps?',
        options: [
          'שירות פיננסי של ענן',
          'תחום שמשלב finance ו-DevOps לניהול עלויות ענן',
          'מחשבון ענן',
          'חיוב שנתי',
        ],
        correct: 1,
        explanation: 'FinOps: גישה להבנה ואופטימיזציה של עלויות ענן. Reserved Instances, Spot Instances, rightsizing, tagging — כדי לשלם פחות בלי לפגוע בביצועים.',
      },
      {
        id: 'comparison-q7',
        text: 'מה Serverless לעומת Containers?',
        options: [
          'אין הבדל',
          'Serverless: קוד, scale-to-zero, אין ניהול; Containers: יותר שליטה, portable',
          'Containers תמיד זולים יותר',
          'Serverless לDB בלבד',
        ],
        correct: 1,
        explanation: 'Serverless (Lambda/Functions): פשוט, scale-to-zero, מתאים ל-event-driven. Containers (ECS/AKS): יותר שליטה, runtime ארוך, ניידות.',
      },
      {
        id: 'comparison-q8',
        text: 'מה Object Storage לעומת Block Storage?',
        options: [
          'אין הבדל',
          'Object: קבצים עם metadata (S3/GCS); Block: דיסק וירטואלי לVM (EBS)',
          'Block לעובים, Object לקטנים',
          'Object Storage בלבד לDB',
        ],
        correct: 1,
        explanation: 'Object Storage (S3/GCS): קבצים, images, logs — גישה דרך HTTP API. Block Storage (EBS/Azure Disk): נראה כמו דיסק קשיח לVM.',
      },
    ],
  },
]
