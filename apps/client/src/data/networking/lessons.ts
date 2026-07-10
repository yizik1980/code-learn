import type { Lesson } from '../../types'

export const networkingLessons: Lesson[] = [
  {
    id: 'net-basics',
    title: 'יסודות רשתות לענן',
    summary: 'OSI, TCP/IP, כתובות IP, CIDR ו-Subnetting — הבסיס לכל עבודה עם רשתות ענן',
    emoji: '🌐',
    content: [
      { type: 'heading', text: 'מודל OSI — 7 שכבות' },
      {
        type: 'table',
        caption: 'מודל OSI',
        headers: ['שכבה', 'שם', 'תפקיד', 'פרוטוקולים נפוצים'],
        rows: [
          ['7', 'Application', 'ממשק למשתמש', 'HTTP, HTTPS, DNS, SMTP'],
          ['6', 'Presentation', 'הצפנה, דחיסה, פורמט', 'TLS/SSL, JPEG'],
          ['5', 'Session', 'ניהול חיבורים', 'NetBIOS, RPC'],
          ['4', 'Transport', 'פיצול נתונים, אמינות', 'TCP, UDP'],
          ['3', 'Network', 'ניתוב בין רשתות', 'IP, ICMP, BGP'],
          ['2', 'Data Link', 'העברה ברשת מקומית', 'Ethernet, MAC'],
          ['1', 'Physical', 'חומרה פיזית', 'כבלים, Wi-Fi, Fiber'],
        ],
      },
      { type: 'heading', text: 'TCP לעומת UDP' },
      {
        type: 'table',
        caption: 'TCP vs UDP',
        headers: ['מאפיין', 'TCP', 'UDP'],
        rows: [
          ['אמינות', 'מבוסס חיבור, ACK', 'ללא אישור מסירה'],
          ['סדר', 'מובטח', 'לא מובטח'],
          ['מהירות', 'איטי יחסית', 'מהיר מאוד'],
          ['שימוש', 'HTTP, SSH, SMTP', 'DNS, VoIP, Streaming'],
        ],
      },
      { type: 'heading', text: 'CIDR — Classless Inter-Domain Routing' },
      {
        type: 'code',
        lang: 'text',
        caption: 'CIDR Notation',
        code: `10.0.0.0/24  →  256 כתובות (10.0.0.0 – 10.0.0.255)
10.0.0.0/16  →  65,536 כתובות
10.0.0.0/8   →  16,777,216 כתובות

חישוב מהיר: מספר כתובות = 2^(32 - prefix)
/24 → 2^8  = 256
/16 → 2^16 = 65,536
/28 → 2^4  = 16  (שימושי ל-Subnet קטן)

טווחי RFC-1918 (Private IP — לא מנותבים באינטרנט):
  10.0.0.0/8        ← Class A
  172.16.0.0/12     ← Class B
  192.168.0.0/16    ← Class C`,
      },
      { type: 'heading', text: 'Ports נפוצים שחייבים לדעת' },
      {
        type: 'table',
        caption: 'Ports נפוצים',
        headers: ['Port', 'פרוטוקול', 'שימוש'],
        rows: [
          ['22', 'TCP', 'SSH — גישה מאובטחת לשרת'],
          ['80', 'TCP', 'HTTP — תעבורת Web לא מוצפנת'],
          ['443', 'TCP', 'HTTPS — תעבורת Web מוצפנת (TLS)'],
          ['3306', 'TCP', 'MySQL / MariaDB'],
          ['5432', 'TCP', 'PostgreSQL'],
          ['6379', 'TCP', 'Redis'],
          ['27017', 'TCP', 'MongoDB'],
          ['53', 'UDP/TCP', 'DNS'],
        ],
      },
      { type: 'tip', text: 'בענן: ה-IP הפרטי של מכונה לא משתנה בין restarts (בד"כ). ה-IP הציבורי *משתנה* אלא אם שומרים Elastic IP (EIP) — כתובת IP ציבורית סטטית בתשלום.' },
    ],
    questionBank: [
      {
        id: 'net-basics-q1',
        text: 'באיזו שכבת OSI פועלת ניתוב IP?',
        options: ['שכבה 2 — Data Link', 'שכבה 3 — Network', 'שכבה 4 — Transport', 'שכבה 7 — Application'],
        correct: 1,
        explanation: 'שכבה 3 (Network) — פרוטוקול IP מנתב חבילות בין רשתות שונות. שכבה 2 מטפלת בהעברה בתוך אותה רשת (MAC). שכבה 4 היא TCP/UDP. שכבה 7 היא HTTP/DNS.',
      },
      {
        id: 'net-basics-q2',
        text: 'כמה כתובות IP כוללת רשת 10.0.0.0/26?',
        options: ['64', '32', '128', '256'],
        correct: 0,
        explanation: '2^(32-26) = 2^6 = 64 כתובות. ב-AWS: 5 כתובות שמורות לכל Subnet → 59 שמישות. /27=32, /25=128, /24=256.',
      },
      {
        id: 'net-basics-q3',
        text: 'מה ההבדל העיקרי בין TCP ל-UDP?',
        options: [
          'TCP מהיר יותר מ-UDP',
          'UDP עובד רק ברשת מקומית',
          'TCP מספק אמינות ואישורי מסירה; UDP מהיר אך ללא הבטחת הגעה',
          'TCP עובד בשכבה 2, UDP בשכבה 4',
        ],
        correct: 2,
        explanation: 'TCP: חיבור מבוסס (3-way handshake), ACK, סדר מובטח — HTTP/S, SSH, DB. UDP: ללא חיבור, מהיר — DNS, VoIP, streaming, gaming. UDP מהיר כי אין overhead של ACK.',
      },
      {
        id: 'net-basics-q4',
        text: 'איזה טווח IP הוא Private (RFC-1918) ולא מנותב באינטרנט?',
        options: ['8.8.8.8/32', '203.0.113.0/24', '172.16.0.0/12', '1.1.1.0/24'],
        correct: 3,
        explanation: 'RFC-1918 Private ranges: 10.0.0.0/8, 172.16.0.0/12, 192.168.0.0/16. 172.16.0.0/12 = 172.16.x.x עד 172.31.x.x. כתובות אחרות בשאלה הן ציבוריות (Google DNS, Cloudflare, Test-Net).',
      },
      {
        id: 'net-basics-q5',
        text: 'מה Elastic IP (EIP) ב-AWS ומדוע הוא נחוץ?',
        options: [
          'IP שמתחלף בכל דקה לאבטחה',
          'IP פרטי סטטי בתוך ה-VPC',
          'מספר Port דינמי לעומסים גבוהים',
          'כתובת IP ציבורית סטטית שנשמרת גם אחרי stop/start של instance',
        ],
        correct: 3,
        explanation: 'ה-IP הציבורי הרגיל של EC2 משתנה בכל הפעלה. Elastic IP נשאר קבוע — נחוץ ל-DNS records שצריכים לפנות לשרת. עלות: חינם כשמחובר ל-instance פעיל, בתשלום כשאינו בשימוש.',
      },
      {
        id: 'net-basics-q6',
        text: 'מה פורט ברירת המחדל של HTTPS?',
        options: ['80', '8080', '443', '8443'],
        correct: 2,
        explanation: 'HTTPS = HTTP over TLS, פורט 443. HTTP = פורט 80. 8080 ו-8443 הם חלופות נפוצות בפיתוח. Load Balancers בענן: מאזינים על 80 ו-443, מפנים לbackend בכל פורט.',
      },
      {
        id: 'net-basics-q7',
        text: 'מה ה-3-Way Handshake של TCP?',
        options: [
          'GET → POST → DELETE',
          'SYN → SYN-ACK → ACK — יצירת חיבור מהימן לפני העברת נתונים',
          'Connect → Auth → Data',
          'OPEN → SEND → CLOSE',
        ],
        correct: 1,
        explanation: 'TCP: Client שולח SYN → Server עונה SYN-ACK → Client שולח ACK. רק אחרי זה מתחילה העברת נתונים. UDP מדלג על זה — לכן מהיר יותר אך פחות אמין.',
      },
      {
        id: 'net-basics-q8',
        text: 'רשת 192.168.1.0/28 — מה הכתובת הראשונה והאחרונה הניתנת לשימוש?',
        options: [
          '192.168.1.0 – 192.168.1.255',
          '192.168.1.1 – 192.168.1.14',
          '192.168.1.0 – 192.168.1.15',
          '192.168.1.1 – 192.168.1.30',
        ],
        correct: 1,
        explanation: '/28 = 16 כתובות (192.168.1.0–15). הראשונה (Network) והאחרונה (Broadcast) שמורות → ניתנות לשימוש: .1 עד .14. ב-AWS: גם .1 (Router), .2 (DNS), .3 (עתידי) שמורות → 11 שמישות.',
      },
      {
        id: 'net-basics-q9',
        text: 'מה ICMP ומה ping?',
        options: [
          'ICMP = פרוטוקול TCP לבדיקת קישוריות',
          'ICMP = Internet Control Message Protocol; ping שולח ICMP Echo Request ומצפה ל-Echo Reply לבדיקת קישוריות',
          'ping = פרוטוקול UDP על פורט 7',
          'ICMP פועל בשכבה 7 בלבד',
        ],
        correct: 1,
        explanation: 'ICMP (שכבה 3) משמש לאבחון רשת. ping שולח Echo Request → מקבל Echo Reply → מחשב RTT. traceroute משתמש גם הוא ב-ICMP. בענן: Security Groups לא חוסמים ICMP כברירת מחדל, אבל ניתן לחסום.',
      },
      {
        id: 'net-basics-q10',
        text: 'מה ההבדל בין IPv4 ל-IPv6?',
        options: [
          'IPv6 מהיר יותר מ-IPv4 בגלל header קטן יותר',
          'IPv4 = 32 ביט (~4.3 מיליארד כתובות); IPv6 = 128 ביט (כמעט אינסוף) — פותר מחסור בכתובות',
          'IPv6 משתמש בנקודות, IPv4 בנקודתיים',
          'הם זהים — IPv6 הוא פשוט שם מסחרי',
        ],
        correct: 1,
        explanation: 'IPv4: 4 אוקטטים, 32 ביט, ~4.3 מיליארד כתובות — כמעט נגמרו. IPv6: 128 ביט, 3.4×10³⁸ כתובות, כתובת: 2001:0db8:85a3::8a2e:0370:7334. AWS תומך ב-Dual-Stack VPC (IPv4+IPv6).',
      },
    ],
  },

  {
    id: 'vpc-basics',
    title: 'VPC — Virtual Private Cloud',
    summary: 'רשת וירטואלית פרטית בענן: Subnets, Route Tables, Internet Gateway ו-NAT Gateway',
    emoji: '🏠',
    content: [
      { type: 'heading', text: 'מה זה VPC?' },
      {
        type: 'text',
        text: 'VPC (Virtual Private Cloud) הוא רשת וירטואלית מבודדת שאתם שולטים בה לחלוטין בתוך הענן. כל VPC מוגדר עם CIDR block פרטי (לדוגמה 10.0.0.0/16), ומחולק ל-Subnets שיכולים להיות ציבוריים (גישה לאינטרנט) או פרטיים.',
      },
      {
        type: 'code',
        lang: 'text',
        caption: 'ארכיטקטורת VPC טיפוסית',
        code: `VPC: 10.0.0.0/16
├── Public Subnet A  (10.0.1.0/24)  ← AZ-a  ← IGW מחובר
├── Public Subnet B  (10.0.2.0/24)  ← AZ-b  ← IGW מחובר
├── Private Subnet A (10.0.10.0/24) ← AZ-a  ← NAT Gateway
└── Private Subnet B (10.0.11.0/24) ← AZ-b  ← NAT Gateway

Internet Gateway (IGW)
  └── מחבר VPC לאינטרנט (דרך Public Subnets)

NAT Gateway (בכל AZ)
  └── מאפשר ל-Private Subnets לצאת לאינטרנט
      אך חוסם כניסה נכנסת מהאינטרנט`,
      },
      { type: 'heading', text: 'Subnets — ציבורי לעומת פרטי' },
      {
        type: 'table',
        caption: 'Public vs Private Subnet',
        headers: ['תכונה', 'Public Subnet', 'Private Subnet'],
        rows: [
          ['Route Table', 'כולל route ל-IGW (0.0.0.0/0 → igw)', 'route ל-NAT (0.0.0.0/0 → nat-gw)'],
          ['IP ציבורי', 'אפשרי — instance מקבל Public IP', 'לא — רק IP פרטי'],
          ['גישה מהאינטרנט', 'כן (דרך SG)', 'לא ישירות'],
          ['מה שם?', 'Load Balancer, Bastion Host, NAT GW', 'Web servers, DBs, Lambda, ECS'],
        ],
      },
      { type: 'heading', text: 'Route Tables' },
      {
        type: 'code',
        lang: 'text',
        caption: 'דוגמת Route Tables',
        code: `Public Route Table:
  Destination       Target
  10.0.0.0/16      local        ← תעבורה פנימית ב-VPC
  0.0.0.0/0        igw-xxxxx    ← כל שאר → Internet Gateway

Private Route Table:
  Destination       Target
  10.0.0.0/16      local
  0.0.0.0/0        nat-xxxxx    ← כל שאר → NAT Gateway`,
      },
      { type: 'heading', text: 'VPC Peering' },
      {
        type: 'text',
        text: 'VPC Peering מאפשר חיבור בין שני VPCs (באותו חשבון או בחשבונות שונים). התנועה עוברת דרך רשת AWS הפנימית — לא דרך האינטרנט. מגבלה: לא transitiv — אם A↔B וB↔C, אז A לא יכול לדבר עם C דרך B.',
      },
      { type: 'tip', text: 'NAT Gateway מחויב: ~$0.045/שעה + $0.045/GB. לצמצום עלויות: NAT Gateway אחד לכל AZ (לזמינות), לא אחד לכל Subnet. למיעוט תנועה — ניתן להשתמש ב-NAT Instance (EC2) בעלות נמוכה יותר.' },
    ],
    questionBank: [
      {
        id: 'vpc-q1',
        text: 'מה ההבדל בין Public Subnet לPrivate Subnet?',
        options: [
          'Public Subnet מוצפן, Private לא',
          'Public Subnet פחות בטוח — לעולם אל תשימו בו שרתים',
          'Public Subnet מחובר ל-Internet Gateway בRoute Table; Private Subnet משתמש ב-NAT Gateway ליציאה ואין לו כניסה מהאינטרנט',
          'ההבדל הוא רק בשם — פונקציונלית זהים',
        ],
        correct: 2,
        explanation: 'Public Subnet: Route Table מכיל 0.0.0.0/0 → IGW = גישה דו-כיוונית לאינטרנט. Private Subnet: 0.0.0.0/0 → NAT Gateway = יוצאים לאינטרנט אך לא נכנסים. Load Balancers ב-Public, Servers ו-DBs ב-Private.',
      },
      {
        id: 'vpc-q2',
        text: 'מה Internet Gateway (IGW) ב-AWS?',
        options: [
          'שרת Proxy שמסנן תעבורה',
          'NAT שמחביא כתובות IP פרטיות',
          'רכיב שמחבר VPC לאינטרנט — horizontally scalable, HA, ללא עלות לפי תנועה',
          'VPN endpoint לחיבור ל-on-premises',
        ],
        correct: 2,
        explanation: 'IGW מבצע NAT בין כתובות IP פרטיות של instances לכתובות ציבוריות. HighlyAvailable, Horizontally Scalable, ניהול AWS. צריך לצרף אותו ל-VPC ולהוסיף Route Table entry (0.0.0.0/0 → igw-xxx).',
      },
      {
        id: 'vpc-q3',
        text: 'מה VPC Peering ומה המגבלה העיקרית שלו?',
        options: [
          'חיבור VPC לאינטרנט; מגבלה: חיבור אחד בלבד',
          'חיבור בין שני VPCs ברשת פנימית; מגבלה: לא transitive — A↔B, B↔C לא אומר A↔C',
          'חיבור VPCs לS3; מגבלה: עלות גבוהה',
          'חיבור בין Regions; מגבלה: רק ב-us-east-1',
        ],
        correct: 1,
        explanation: 'VPC Peering: חיבור ישיר פרטי בין 2 VPCs (חשבונות/Regions שונים אפשרי). לא transitive: אם A-B וB-C, צריך Peering נפרד A-C. ל-Hub-and-Spoke — עדיף Transit Gateway. CIDRs לא יכולים לחפוף.',
      },
      {
        id: 'vpc-q4',
        text: 'מה ה-CIDR המינימלי והמקסימלי שניתן להגדיר ל-VPC ב-AWS?',
        options: [
          '/8 מינימום, /28 מקסימום',
          '/16 בלבד — ערך קבוע',
          '/28 מינימום (16 כתובות), /16 מקסימום (65,536 כתובות)',
          '/24 מינימום, /8 מקסימום',
        ],
        correct: 3,
        explanation: 'AWS VPC CIDR: מינימום /28 (16 כתובות), מקסימום /16 (65,536). ניתן להוסיף Secondary CIDRs מאוחר יותר. ב-Subnets: /28 מינימום. כל Subnet מאבד 5 כתובות (Network, Router, DNS, Future, Broadcast).',
      },
      {
        id: 'vpc-q5',
        text: 'מה NAT Gateway ולמה צריך אותו?',
        options: [
          'מאפשר לשרתים ב-Public Subnet להסתיר כתובות IP',
          'מאפשר לשרתים ב-Private Subnet לגשת לאינטרנט (לdownloads, updates) מבלי לחשוף אותם לחיבורים נכנסים',
          'מנהל DNS לתוך ה-VPC',
          'מאזן עומסים בין Subnets שונים',
        ],
        correct: 1,
        explanation: 'Private Subnet: אין IP ציבורי, אין route לIGW. NAT Gateway ב-Public Subnet מבצע Network Address Translation: IP פרטי → IP ציבורי של NAT GW. כך שרת פרטי יכול לעדכן packages אבל האינטרנט לא יכול ליצור חיבור נכנס אליו.',
      },
      {
        id: 'vpc-q6',
        text: 'למה כדאי לפרוס NAT Gateway בכל AZ בנפרד?',
        options: [
          'לחסוך כסף — NAT אחד ל-AZ אחד',
          'כי AWS מחייב NAT Gateway בכל AZ',
          'לזמינות גבוהה: אם AZ-a נופלת, ה-Private Subnets ב-AZ-b ממשיכים לעבוד דרך NAT Gateway שלהם',
          'לביצועים טובים יותר — NAT אחד לא מספיק',
        ],
        correct: 2,
        explanation: 'NAT Gateway הוא Regional אבל פועל בAZ ספציפי. אם כל Private Subnets משתמשים ב-NAT Gateway ב-AZ-a, ו-AZ-a נופלת — כל ה-Private Subnets מאבדים גישה לאינטרנט. הפתרון: NAT Gateway ב-AZ-a לשרתי AZ-a, וב-AZ-b לשרתי AZ-b.',
      },
      {
        id: 'vpc-q7',
        text: 'מה ה-Default VPC ב-AWS?',
        options: [
          'VPC ריק שנוצר בכל Region — צריך להגדיר הכל מאפס',
          'VPC מוגדר מראש בכל Region עם Public Subnets בכל AZ, IGW מחובר, ו-Route Table מוגדר — מוכן לשימוש מיידי',
          'VPC ליצירת Lambda functions בלבד',
          'VPC שמשתף כל חשבונות AWS באותו Region',
        ],
        correct: 1,
        explanation: 'Default VPC: 172.31.0.0/16, Public Subnet בכל AZ, IGW מחובר, כל instance מקבל IP ציבורי. שימושי לפיתוח/בדיקות. לייצור: צרו VPC מותאם עם Private Subnets לאבטחה. ניתן למחוק Default VPC אך קשה לשחזרו.',
      },
      {
        id: 'vpc-q8',
        text: 'מה "Subnet is public" תלוי בו ב-AWS?',
        options: [
          'השם של ה-Subnet (חייב להכיל "public")',
          'מספר ה-AZ שבה הוא נמצא',
          'ה-Route Table שמצורפת לו — אם יש route 0.0.0.0/0 → IGW',
          'הגדרה ב-Security Group המצורף',
        ],
        correct: 2,
        explanation: '"Public" Subnet = Route Table שלו מכיל 0.0.0.0/0 → Internet Gateway. השם חסר משמעות טכנית. Instance יקבל IP ציבורי רק אם Subnet מוגדר "Auto-assign public IPv4" + Route Table לIGW + ב-Security Group מותרת תעבורה נכנסת.',
      },
      {
        id: 'vpc-q9',
        text: 'כמה VPCs ניתן ליצור ב-Region אחד ב-AWS (ברירת מחדל)?',
        options: ['1 בלבד', '5 (soft limit, ניתן להגדיל)', '100', 'ללא הגבלה'],
        correct: 1,
        explanation: 'ברירת מחדל: 5 VPCs לRegion (ב-AWS). זהו soft limit — ניתן לבקש הגדלה ב-AWS Support. גם: מקסימום 200 Subnets לVPC, 200 Route Tables, 500 Security Groups. תכנן ארכיטקטורה מראש.',
      },
      {
        id: 'vpc-q10',
        text: 'מה VPC Flow Logs ומה ניתן ללמוד מהם?',
        options: [
          'לוגים של שגיאות ביישום הרץ ב-EC2',
          'רישום מטא-דאטה של תעבורת IP הנכנסת והיוצאת מ-Interfaces ב-VPC — כולל src IP, dst IP, port, פרוטוקול, bytes, ACCEPT/REJECT',
          'לוגים של User Activity ב-AWS Console',
          'מדידת latency בין Instances',
        ],
        correct: 1,
        explanation: 'VPC Flow Logs: מאפשרים לראות מי דיבר עם מי, פורטים, נפחים, ו-ACCEPT/REJECT. מגיעים ל-CloudWatch Logs או S3. שימוש: חקירת security incidents, פתרון בעיות רשת, audit compliance. לא כולל payload — רק headers.',
      },
    ],
  },

  {
    id: 'security-groups',
    title: 'Security Groups ו-NACLs',
    summary: 'Stateful לעומת Stateless, חוקי inbound/outbound, הגנת Subnet לעומת Instance',
    emoji: '🛡️',
    content: [
      { type: 'heading', text: 'Security Groups — חומת האש של ה-Instance' },
      {
        type: 'text',
        text: 'Security Group (SG) הוא חומת אש וירטואלית ברמת ה-Instance (ENI). הוא Stateful — תגובה לחיבור יוצא מותרת אוטומטית, ולהיפך. כל חוק הוא ALLOW בלבד — אין חוקי DENY מפורשים. כל תעבורה שלא מותרת — חסומה.',
      },
      {
        type: 'table',
        caption: 'Security Group לעומת NACL',
        headers: ['מאפיין', 'Security Group', 'Network ACL (NACL)'],
        rows: [
          ['רמה', 'Instance (ENI)', 'Subnet'],
          ['Stateful?', 'כן — תגובה מותרת אוטומטית', 'לא — חייב לאפשר inbound וoutbound'],
          ['חוקי DENY', 'לא — רק ALLOW', 'כן — ALLOW ו-DENY'],
          ['סדר חוקים', 'כל החוקים נבדקים', 'לפי מספר סדר (נמוך קודם)'],
          ['שיוך', 'לinstance/ENI', 'לSubnet'],
          ['ברירת מחדל', 'חסום הכל נכנס, מתיר הכל יוצא', 'מתיר הכל (NACL ברירת מחדל)'],
        ],
      },
      { type: 'heading', text: 'Security Group — דוגמת חוקים' },
      {
        type: 'code',
        lang: 'text',
        caption: 'SG לשרת Web',
        code: `Inbound Rules:
  Type       Protocol  Port   Source
  HTTPS      TCP       443    0.0.0.0/0        ← כל האינטרנט
  HTTP       TCP       80     0.0.0.0/0        ← redirect ל-HTTPS
  SSH        TCP       22     10.0.0.0/8       ← רק מה-VPC / Bastion

Outbound Rules:
  Type       Protocol  Port   Destination
  All        All       All    0.0.0.0/0        ← כברירת מחדל — הכל מותר יוצא

Security Group Reference (נפוץ מאוד):
  Source = sg-xxxxxxxx  ← מתיר תעבורה מ-instances
                          שמצורף להם אותו SG
  דוגמה: DB מתיר רק מ-SG של App Server:
  MySQL   TCP  3306  sg-app-server-id`,
      },
      { type: 'heading', text: 'NACL — הגנה ברמת Subnet' },
      {
        type: 'code',
        lang: 'text',
        caption: 'NACL — Stateless, סדר חשוב',
        code: `Inbound Rules:
  Rule#  Protocol  Port       Action
  100    TCP       443        ALLOW
  110    TCP       80         ALLOW
  *      All       All        DENY   ← implicit deny

Outbound Rules (Stateless — חובה להגדיר!):
  Rule#  Protocol  Port Range  Action
  100    TCP       443         ALLOW
  110    TCP       1024-65535  ALLOW  ← Ephemeral ports!
  *      All       All         DENY

⚠️  Ephemeral Ports (32768-60999 ב-Linux):
    Client בוחר port אקראי גבוה לתגובות.
    NACL Stateless = חייבים להתיר range זה ב-outbound!`,
      },
      { type: 'tip', text: 'Best practice: השתמשו ב-Security Group References (sg-id כ-source) במקום CIDR blocks בתוך ה-VPC. כך אם IP משתנה — החוק נשאר תקף. לדוגמה: DB Security Group מתיר MySQL רק מ-SG של App Layer.' },
    ],
    questionBank: [
      {
        id: 'sg-q1',
        text: 'מה "Stateful" אומר בהקשר של Security Group?',
        options: [
          'SG שומר state של connections ומתיר אוטומטית תגובות — אם HTTP request יצא, ה-response יכנס ללא חוק נוסף',
          'SG שמחוייב לשמור לוגים של כל חיבור',
          'SG שמצוין כ-Stateful בהגדרתו',
          'SG ש-state שלו ניתן לשינוי בלבד',
        ],
        correct: 0,
        explanation: 'Stateful = connection tracking. SG עוקב אחרי חיבורים פעילים. תגובה לחיבור מותר נכנסת/יוצאת אוטומטית — גם ללא חוק outbound/inbound מפורש. NACL הפוך — Stateless, חייב חוקים בשני הכיוונים.',
      },
      {
        id: 'sg-q2',
        text: 'מה ברירת המחדל של Security Group חדש שנוצר?',
        options: [
          'מתיר הכל — inbound וoutbound',
          'חוסם הכל — inbound וoutbound',
          'חוסם כל inbound, מתיר כל outbound',
          'מתיר SSH ו-HTTP בלבד',
        ],
        correct: 2,
        explanation: 'SG חדש: Inbound = DENY הכל (אין חוקים). Outbound = ALLOW הכל (0.0.0.0/0). לכן Instance חדש עם SG ברירת מחדל: לא ניגש אליו מהאינטרנט, אבל הוא יכול לצאת לאינטרנט. יש להוסיף Inbound rules ידנית.',
      },
      {
        id: 'sg-q3',
        text: 'מה ההבדל העיקרי בין Security Group ל-NACL?',
        options: [
          'SG חינמי, NACL בתשלום',
          'SG פועל ב-Region, NACL ב-AZ',
          'SG ברמת Instance (Stateful, רק ALLOW); NACL ברמת Subnet (Stateless, ALLOW ו-DENY)',
          'NACL חזק יותר ולכן מחליף SG',
        ],
        correct: 2,
        explanation: 'SG: Instance level, Stateful, כל חוקים נבדקים, רק ALLOW. NACL: Subnet level, Stateless, חוקים לפי סדר מספרי, ALLOW+DENY. Best practice: SG להגנה עיקרית, NACL לחסימות נוספות ברמת Subnet (לדוגמה: חסום IP злוזניים).',
      },
      {
        id: 'sg-q4',
        text: 'מה "Security Group Reference" (כ-Source ב-SG)?',
        options: [
          'הפניה לתיעוד AWS',
          'שימוש ב-ARN של SG אחר',
          'שימוש ב-ID של Security Group כמקור — כל instance שמצורף לאותו SG מותר, ללא קשר לIP',
          'Export של חוקי SG לקובץ JSON',
        ],
        correct: 3,
        explanation: 'SG Reference: Source = sg-xxxxxxxx. כל instance שמחובר ל-SG הזה מותר. יתרון: אם IPs משתנים (Auto Scaling), החוקים נשארים תקפים. דוגמה קלאסית: DB-SG מתיר MySQL (3306) רק מ-AppServer-SG.',
      },
      {
        id: 'sg-q5',
        text: 'מדוע NACL Stateless דורש חוקי Ephemeral Ports ב-Outbound?',
        options: [
          'כי AWS מחייב זאת כברירת מחדל',
          'כי Ephemeral Ports הם פורטים מסוכנים שצריך לחסום',
          'כי Client בוחר port אקראי גבוה (32768-60999) לתגובות TCP, וNACL Stateless לא "זוכר" את החיבור — חייבים להתיר range זה',
          'רק ל-UDP, לא TCP',
        ],
        correct: 2,
        explanation: 'TCP connection: Client → SG port 443 (Inbound), תגובה → Client:random_port (Outbound). NACL Stateless לא יודע שהתגובה קשורה לbות הנכנסת. חייבים Outbound rule: TCP 1024-65535 (או 32768-60999 ל-Linux). SG Stateful פוטר מזה.',
      },
      {
        id: 'sg-q6',
        text: 'NACL בSubnet מסוים מכיל Rule #100 DENY port 80 ו-Rule #200 ALLOW port 80. מה יקרה לתעבורת HTTP?',
        options: [
          'ALLOW תנצח — AWS מעדיף ALLOW',
          'DENY תנצח — AWS מעדיף DENY',
          'Rule #100 (הנמוך) נבדק ראשון ומחיל DENY — תעבורת HTTP תיחסם',
          'שני החוקים יבוטלו — תעבורה תיחסם כברירת מחדל',
        ],
        correct: 2,
        explanation: 'NACL: חוקים נבדקים לפי מספר סדר עולה. הראשון שמתאים — מופעל. Rule #100 (DENY 80) יבוא לפני #200 (ALLOW 80) → תעבורת HTTP נחסמת. לכן: DENY rules צריכים מספר נמוך יותר מה-ALLOW שרוצים לעקוף.',
      },
      {
        id: 'sg-q7',
        text: 'ניתן להוסיף חוק DENY מפורש ל-Security Group?',
        options: [
          'כן — דרך Outbound rules',
          'כן — רק ל-IPv6',
          'לא — Security Groups תומכים ב-ALLOW בלבד; כל תעבורה שלא מותרת חסומה implicitly',
          'כן — עם Priority 0',
        ],
        correct: 2,
        explanation: 'SG: רק ALLOW. ה-implicit deny הוא הברירת מחדל — כל מה שלא מוזכר בחוק ALLOW נחסם. לחסום IP ספציפי מפורשות — השתמשו ב-NACL עם DENY rule. SG אינו מאפשר "חסום את המשתמש הזה בלבד".',
      },
      {
        id: 'sg-q8',
        text: 'Instance מחובר לשני Security Groups. איך AWS מחשב את החוקים?',
        options: [
          'רק SG האחרון שהוצמד תקף',
          'SG עם Priority גבוה יותר מנצח',
          'חוקים מכל SGים מוערכים יחד (UNION) — כל ALLOW מכל SG תקף',
          'SGים חסומים זה לזה',
        ],
        correct: 2,
        explanation: 'Union: אם SG-1 מתיר port 80 ו-SG-2 מתיר port 443, ה-instance מקבל גם 80 וגם 443. אין קונפליקט — SG הוא רק ALLOW. לא ניתן לחסום חוק שSG אחר מתיר (לכך נדרש NACL).',
      },
      {
        id: 'sg-q9',
        text: 'מה Bastion Host (Jump Server)?',
        options: [
          'שרת לbackup אוטומטי של EC2 Instances',
          'EC2 ב-Public Subnet שמשמש כנקודת כניסה יחידה ל-Private Instances דרך SSH — מצמצם את פני ההתקפה',
          'Load Balancer מיוחד לSSH',
          'EC2 שפועל כNAT Gateway גם כן',
        ],
        correct: 1,
        explanation: 'Bastion Host: Instance ב-Public Subnet, SG שמתיר SSH (22) רק מ-IP נבחר. Private Instances: SG מתיר SSH רק מ-SG של Bastion. תהליך: SSH לBastion → SSH מBastion לPrivate. חלופה מודרנית: AWS Session Manager (SSM) — ללא Bastion בכלל.',
      },
      {
        id: 'sg-q10',
        text: 'מה ה-"0.0.0.0/0" כ-Source בחוק Security Group?',
        options: [
          'רק כתובות IPv6',
          'כתובות פרטיות בלבד',
          'הVPC הנוכחי בלבד',
          'כל כתובת IP בעולם — פתיחה לכל האינטרנט; ::/0 הוא המקבילה לIPv6',
        ],
        correct: 3,
        explanation: '0.0.0.0/0 = כל IPv4 בעולם. ::/0 = כל IPv6. שימוש נפוץ: Inbound 443 מ-0.0.0.0/0 לALB (כולל CDN ואינטרנט). לעולם אל תפתחו SSH (22) מ-0.0.0.0/0 בייצור — הגבילו ל-IP ספציפי או VPN range.',
      },
    ],
  },

  {
    id: 'load-balancing',
    title: 'Load Balancers בענן',
    summary: 'ALB, NLB ו-GLB: ניתוב תעבורה, Target Groups, Health Checks ו-Auto Scaling',
    emoji: '⚖️',
    content: [
      { type: 'heading', text: 'למה Load Balancer?' },
      {
        type: 'text',
        text: 'Load Balancer מחלק תעבורה נכנסת על פני מספר Targets (EC2, Containers, Lambda). מאפשר: High Availability, Horizontal Scaling, Health Checks (מסיר instance פגום מהרוטציה), ו-SSL Termination (מפענח TLS ב-LB ולא בשרת).',
      },
      {
        type: 'table',
        caption: 'סוגי Load Balancers ב-AWS',
        headers: ['סוג', 'שכבה OSI', 'פרוטוקולים', 'שימוש'],
        rows: [
          ['ALB', '7 (Application)', 'HTTP, HTTPS, WebSocket', 'Web apps, Microservices, path/header routing'],
          ['NLB', '4 (Transport)', 'TCP, UDP, TLS', 'Gaming, VoIP, Static IP, Ultra-low latency'],
          ['GLB', '3 (Network)', 'GENEVE (IP packets)', 'Firewalls, IDS/IPS — traffic inspection'],
          ['CLB', '4/7 (Legacy)', 'HTTP, HTTPS, TCP', 'ישן — לא לשימוש חדש'],
        ],
      },
      { type: 'heading', text: 'ALB — Application Load Balancer' },
      {
        type: 'code',
        lang: 'text',
        caption: 'ALB Listener Rules — Content-Based Routing',
        code: `Listener: HTTPS :443
Rules (בסדר עדיפות):
  IF path = /api/*       → Target Group: ecs-api-tg
  IF path = /admin/*     → Target Group: admin-tg
  IF header: X-Mobile=1  → Target Group: mobile-tg
  DEFAULT                → Target Group: web-tg

Target Group: ecs-api-tg
  Targets: 3 × EC2 instances
  Health Check: GET /health → 200 OK
  Algorithm: Round Robin (ברירת מחדל)
  Stickiness: כבוי (Stateless API)`,
      },
      { type: 'heading', text: 'Health Checks' },
      {
        type: 'table',
        caption: 'הגדרות Health Check',
        headers: ['פרמטר', 'ברירת מחדל', 'משמעות'],
        rows: [
          ['Protocol', 'HTTP', 'HTTP/HTTPS/TCP'],
          ['Path', '/', 'endpoint לבדיקה'],
          ['Interval', '30s', 'כל כמה בודק'],
          ['Timeout', '5s', 'זמן המתנה לתגובה'],
          ['Healthy threshold', '3', 'בדיקות רצופות ל-Healthy'],
          ['Unhealthy threshold', '3', 'בדיקות רצופות ל-Unhealthy'],
        ],
      },
      { type: 'tip', text: 'NLB מתאים לשימוש עם Static IP (NLB מספק IP קבוע לכל AZ) — נחוץ כשלקוחות חייבים לאפשר whitelist ב-Firewall שלהם. ALB מספק DNS name בלבד, לא IP קבוע. ניתן לשים ALB מאחורי NLB לשילוב יתרונות שניהם.' },
    ],
    questionBank: [
      {
        id: 'lb-q1',
        text: 'איזה Load Balancer מתאים ל-path-based routing (/api/* → שרת API, /* → Web)?',
        options: [
          'NLB — Network Load Balancer',
          'ALB — Application Load Balancer (שכבה 7, מבין HTTP path/headers)',
          'GLB — Gateway Load Balancer',
          'CLB — Classic Load Balancer',
        ],
        correct: 1,
        explanation: 'ALB (Layer 7): מבין content של HTTP — path, headers, query params, host. מאפשר content-based routing למספר Target Groups. NLB (Layer 4): מבין TCP/UDP בלבד — לא יכול לנתב לפי path. GLB לinspection, CLB legacy.',
      },
      {
        id: 'lb-q2',
        text: 'מה SSL/TLS Termination ב-Load Balancer?',
        options: [
          'חסימת HTTPS בLB',
          'ALB מפענח את ה-TLS, ומעביר HTTP לshifts backends — מפשט ניהול certifications ומקל עבודת CPU מהשרתים',
          'שמירת SSL certificates בS3',
          'הצפנת כל התעבורה בין LB לbackends',
        ],
        correct: 1,
        explanation: 'SSL Termination: ALB מקבל HTTPS מהלקוח, מפענח עם certificate, ומעביר HTTP לbackends (בתוך VPC פרטי). יתרונות: certificate management מרכזי (AWS ACM), ביצועים טובים (hardware acceleration ב-LB). אם צריך encryption עד ה-backend: SSL End-to-End (re-encrypt).',
      },
      {
        id: 'lb-q3',
        text: 'מה Target Group ב-AWS Load Balancer?',
        options: [
          'IP של ה-LB עצמו',
          'קבוצת Targets (EC2, ECS tasks, Lambda, IPs) שה-LB שולח אליהם תעבורה, כולל הגדרות Health Check',
          'Security Group של ה-LB',
          'Route Table של ה-LB',
        ],
        correct: 2,
        explanation: 'Target Group: מגדיר מי מקבל תעבורה. Targets: EC2 instances, ECS Tasks (IP mode), Lambda functions, או IP addresses. כולל: Protocol, Port, Health Check path. ALB Listener Rule מפנה ל-Target Group לפי conditions.',
      },
      {
        id: 'lb-q4',
        text: 'מה קורה כש-Instance נכשל ב-Health Check של ALB?',
        options: [
          'ALB ממשיך לשלוח אליו תעבורה',
          'ALB מסיר אותו מהרוטציה אוטומטית ומחלק תעבורה לinstances בריאים בלבד',
          'ALB מאתחל את ה-Instance',
          'ALB מוחק את ה-Instance',
        ],
        correct: 3,
        explanation: 'ALB Health Check: אחרי "Unhealthy threshold" כשלונות רצופים → Instance מסומן Unhealthy → הוצא מרוטציה. תעבורה עוברת לInstances בריאים. ל-Auto Scaling Group: instance Unhealthy יוחלף אוטומטית. Instance חוזר לרוטציה אחרי "Healthy threshold" הצלחות.',
      },
      {
        id: 'lb-q5',
        text: 'מה "Sticky Sessions" (Session Affinity) ב-Load Balancer?',
        options: [
          'הצפנת sessions',
          'מעקב אחרי Sessions פגומות',
          'שמירת ה-LB פעיל — לא מתכבה',
          'ניתוב לקוח ספציפי תמיד לאותו Target, עם Cookie — שימושי לאפליקציות Stateful',
        ],
        correct: 3,
        explanation: 'Sticky Sessions: ALB שולח cookie (AWSALB) ללקוח. בבקשות הבאות, LB מנתב לאותו Instance. שימושי ל-legacy apps שמאחסנות session state מקומית. מודרני: Sessions ב-Redis/ElastiCache — Stateless backends, ללא stickiness.',
      },
      {
        id: 'lb-q6',
        text: 'מתי עדיף NLB על ALB?',
        options: [
          'לכל שימוש — NLB מהיר יותר תמיד',
          'כשצריך Static IP קבוע, latency נמוך מאוד (gaming, trading), UDP support, או חיבורים ל-on-premises שדורשים whitelist IP',
          'כשצריך path-based routing',
          'כשמשתמשים ב-Lambda כbackend',
        ],
        correct: 1,
        explanation: 'NLB (Layer 4): Static IP בכל AZ (לwhitelist), latency <1ms, UDP/TCP/TLS, מיליוני requests/sec. ALB: content-based routing, WebSockets, HTTP/2, gRPC, Lambda. שניהם HA ומנוהלים. עלות NLB נמוכה יותר לdata transfer.',
      },
      {
        id: 'lb-q7',
        text: 'מה Connection Draining (Deregistration Delay)?',
        options: [
          'מחיקת connections ישנות בLB',
          'ניקוי Cache של ה-LB',
          'השהייה (ברירת מחדל 300s) לפני הסרת Instance מ-Target Group — מאפשרת לבקשות פעילות להסתיים בחן',
          'איפוס ה-Health Check counter',
        ],
        correct: 2,
        explanation: 'Deregistration Delay: כש-Instance מוסר (scale-in, deploy), LB מפסיק לשלוח בקשות חדשות אך מחכה לבקשות הפעילות להסתיים. Default: 300s. לשירותים מהירים: הורידו ל-30-60s לdeploy מהיר. לטרנזקציות ארוכות: העלו.',
      },
      {
        id: 'lb-q8',
        text: 'ALB מאזין על HTTPS 443 ורוצים redirect אוטומטי מHTTP 80 → HTTPS. איך מגדירים?',
        options: [
          'מגדירים SG שחוסם פורט 80',
          'Listener על פורט 80 עם Action: Redirect → HTTPS 443 (301 Permanent)',
          'Application חייבת לטפל ב-redirect',
          'ALB עושה redirect אוטומטי ללא הגדרה',
        ],
        correct: 0,
        explanation: 'ALB Listener HTTP:80 → Action: Redirect to HTTPS (Status 301). הלקוח מקבל 301 ועובר אוטומטית ל-HTTPS. ה-Application לא צריכה לדעת. גם Security Group של ALB צריך לאפשר inbound 80 ו-443.',
      },
      {
        id: 'lb-q9',
        text: 'מה "Cross-Zone Load Balancing"?',
        options: [
          'Load Balancing בין Regions שונים',
          'חלוקת תעבורה שווה בין כל ה-Targets בכל ה-AZs, ללא קשר לאיזו AZ שלח ה-LB Node את הבקשה',
          'LB שמחלק תעבורה בין VPCs שונים',
          'Routing בין SGs שונים',
        ],
        correct: 1,
        explanation: 'ללא Cross-Zone: LB Node ב-AZ-a שולח רק ל-Targets ב-AZ-a. עם Cross-Zone: כל LB Node מחלק שווה לכל Targets. ALB: מופעל תמיד. NLB: כבוי ברירת מחדל (חינם אם מופעל). חשוב ל-HA כש-Targets לא מחולקים שווה בין AZs.',
      },
      {
        id: 'lb-q10',
        text: 'מה X-Forwarded-For Header ב-ALB?',
        options: [
          'הצפנת תעבורה בין ALB לbackend',
          'Header שALB מוסיף לבקשה המכיל את ה-IP האמיתי של הלקוח — כי ה-backend רואה IP של ALB, לא של הלקוח',
          'Authentication token שALB מוסיף',
          'Request ID לtracing',
        ],
        correct: 1,
        explanation: 'X-Forwarded-For: "1.2.3.4, 10.0.1.5" — IP מקורי (לקוח), IP של ALB. ה-backend רואה כרגיל רק IP של ALB. לlogging ו-rate limiting לפי IP לקוח: קראו X-Forwarded-For. ALB גם מוסיף X-Forwarded-Proto (http/https) ו-X-Forwarded-Port.',
      },
    ],
  },

  {
    id: 'dns-route53',
    title: 'DNS ו-Route 53',
    summary: 'Record types, Routing Policies, Health Checks ו-Private Hosted Zones',
    emoji: '📡',
    content: [
      { type: 'heading', text: 'DNS — Domain Name System' },
      {
        type: 'text',
        text: 'DNS ממיר שמות דומיין (example.com) לכתובות IP. כאשר המשתמש מקליד כתובת: Resolver שולח שאילתה ל-Root → TLD (.com) → Authoritative NS (Route 53). התהליך ממושמע ב-TTL (Time To Live) — כמה זמן התשובה נשמרת בcache.',
      },
      {
        type: 'table',
        caption: 'DNS Record Types',
        headers: ['Record', 'תפקיד', 'דוגמה'],
        rows: [
          ['A', 'שם → IPv4', 'api.example.com → 1.2.3.4'],
          ['AAAA', 'שם → IPv6', 'api.example.com → 2001:db8::1'],
          ['CNAME', 'שם → שם אחר (alias)', 'www.example.com → example.com'],
          ['MX', 'Mail Exchange — שרת דואר', 'example.com → mail.example.com (priority 10)'],
          ['TXT', 'טקסט חופשי', 'SPF, DKIM, domain verification'],
          ['NS', 'Name Servers של Domain', 'example.com → ns1.awsdns-01.com'],
          ['SOA', 'Start of Authority', 'מידע ב-Zone ראשי'],
          ['ALIAS (AWS)', 'כמו CNAME אבל ל-Apex domain', 'example.com → alb.amazonaws.com (חינם)'],
        ],
      },
      { type: 'heading', text: 'Route 53 Routing Policies' },
      {
        type: 'table',
        caption: 'Routing Policies',
        headers: ['Policy', 'איך עובד', 'שימוש'],
        rows: [
          ['Simple', 'שם → IP/ים (אקראי)', 'שרת יחיד, ללא logic'],
          ['Weighted', 'X% ל-A, Y% ל-B', 'A/B testing, Blue/Green deploy'],
          ['Latency', 'מנתב לRegion עם latency הנמוך ביותר', 'Multi-region HA + ביצועים'],
          ['Failover', 'Primary→Secondary כש-Primary כושל', 'DR, Active-Passive'],
          ['Geolocation', 'לפי מיקום גאוגרפי של לקוח', 'GDPR, מוצר שונה לאזורים'],
          ['Geoproximity', 'לפי קרבה + bias', 'שליטה מדויקת על traffic flow'],
          ['Multi-Value', 'מחזיר עד 8 IPs בריאים', 'Simple LB, Stateless'],
        ],
      },
      {
        type: 'code',
        lang: 'text',
        caption: 'Private Hosted Zone',
        code: `Private Hosted Zone: internal.company.com
  Mapped to VPC: vpc-xxxxxxxx

  Records:
  db.internal.company.com    → 10.0.10.5 (RDS)
  cache.internal.company.com → 10.0.10.6 (ElastiCache)
  api.internal.company.com   → 10.0.1.100 (ECS Service)

רק instances בתוך ה-VPC יכולים לפנות לRecords אלו.
מהאינטרנט: internal.company.com לא נמצא.`,
      },
      { type: 'tip', text: 'ALIAS Record ב-Route 53 הוא AWS-only: יכול לפנות ל-Apex domain (example.com, לא רק www.example.com) ל-AWS resources (ALB, CloudFront, S3 website, API Gateway). CNAME לא יכול. ALIAS חינמי לQuery, CNAME בתשלום.' },
    ],
    questionBank: [
      {
        id: 'dns-q1',
        text: 'מה ההבדל בין CNAME לALIAS Record ב-Route 53?',
        options: [
          'אין הבדל — שניהם מבצעים אותה פונקציה',
          'CNAME לשרתים, ALIAS לדומיינים',
          'ALIAS עובד על Apex domain (example.com) ולAWS resources ללא עלות query; CNAME לא עובד על Apex domain',
          'ALIAS רק לIPv6, CNAME לIPv4',
        ],
        correct: 2,
        explanation: 'Apex domain = root domain (example.com ללא sub). RFC אוסר CNAME על Apex. ALIAS (AWS קיים): example.com → ALB/CloudFront/S3 — עובד, חינמי. Queries. CNAME: www.example.com → example.com — עובד. www.example.com → ALB — עובד. example.com → ALB — CNAME לא עובד, ALIAS כן.',
      },
      {
        id: 'dns-q2',
        text: 'Route 53 Latency-Based Routing מחזיר:',
        options: [
          'את הRecord הראשון שנמצא',
          'ממוצע של כל הIPs',
          'IP מהRegion שמציג את ה-latency הנמוך ביותר ללקוח הספציפי',
          'IP אקראי מכל הRecords',
        ],
        correct: 2,
        explanation: 'Route 53 Latency Routing: AWS מודד latency ממיקום הLookup לכל Region ומחזיר את הRecord מהRegion הקרוב ביצועית. לא מדידה בזמן אמת — מבוסס על latency ההיסטורי. נפוץ ל-Multi-Region HA: EU → eu-west-1, US → us-east-1.',
      },
      {
        id: 'dns-q3',
        text: 'מה TTL בDNS ולמה זה חשוב לפני שינויים?',
        options: [
          'Total Transfer Limit — מגבלת נפח',
          'Time To Live — משך הזמן שה-DNS Response נשמר בcache. לפני שינויים, הורידו TTL מבעוד מועד',
          'Test Timeout Latency — מדידת latency',
          'גיל הRecord בRoute 53',
        ],
        correct: 1,
        explanation: 'TTL: Resolvers ו-Browsers שומרים תשובת DNS עד TTL. Record A: api.com → 1.2.3.4, TTL=3600. לשנות ל-5.6.7.8: ייקח עד שעה. Best practice לפני migration: הורידו TTL ל-60s יומיים מראש, שנו IP, חכו ל-60s propagation, אחר כך החזירו TTL גבוה.',
      },
      {
        id: 'dns-q4',
        text: 'Route 53 Weighted Routing עם שני records: 75% ו-25%. לשם מה?',
        options: [
          'לחלוקת עומסים שווה — 50/50',
          'Blue/Green deployments, A/B testing — לשלוח אחוז קטן לגרסה חדשה לפני rollout מלא',
          'לHighAvailability בין AZs',
          'לGeolocation routing',
        ],
        correct: 3,
        explanation: 'Weighted Routing: Record A עם weight=75 → 75% תעבורה, weight=25 → 25%. שימושים: A/B testing, Canary Deploy (5% לגרסה חדשה), Blue/Green (50/50 ואז 100/0). Weight=0 → ה-Record לא מקבל תעבורה (אפשר לkill בלי למחוק).',
      },
      {
        id: 'dns-q5',
        text: 'מה Private Hosted Zone ב-Route 53?',
        options: [
          'DNS Records נסתרים לPrivacy',
          'DNS Zone שנגיש רק מתוך VPC ספציפי — לresolution פנימי (db.internal, cache.internal)',
          'Zone שדורשת Authentication לquery',
          'Hosted Zone שרק AWS יכולה לשנות',
        ],
        correct: 1,
        explanation: 'Private Hosted Zone: מחוברת ל-VPC. Records גלויים רק לInstances ב-VPC. דוגמה: db.internal.company.com → 10.0.10.5. מהאינטרנט: NXDOMAIN. שימוש: שמות פנימיים לServices, ל-RDS endpoints, ל-ElastiCache. ניתן לחבר לVPCs מרובים.',
      },
      {
        id: 'dns-q6',
        text: 'MX Record — לשם מה הוא משמש?',
        options: [
          'Mobile Experience — routing למובייל',
          'Maximum Connections — מגבלת חיבורים',
          'Mail Exchange — מגדיר אילו שרתים מטפלים בדואר נכנס לדומיין',
          'Metric Export — ייצוא מדדים',
        ],
        correct: 2,
        explanation: 'MX Record: example.com IN MX 10 mail.example.com. Priority (10) — נמוך = עדיפות גבוהה. שרת שולח דואר ל-user@example.com: שאילתת MX → mail.example.com → שולח. כמה MX Records = Redundancy. TXT Record משמש לSPF/DKIM לאימות דואר.',
      },
      {
        id: 'dns-q7',
        text: 'Route 53 Health Checks — מה הם בודקים ומה קורה כשFailing?',
        options: [
          'בודקים CPU של EC2; כשCPU>80% מפנים תעבורה',
          'בודקים endpoint (HTTP/HTTPS/TCP) בתדירות קבועה; כשFailing → Failover Routing Policy מפנה לRecord בריא',
          'בודקים אם Route Table תקין; כשFailing מאתחלים VPC',
          'בודקים את כמות הבקשות; כשגבוה מדי מאיטים',
        ],
        correct: 1,
        explanation: 'Route 53 Health Checks: שולחים HTTP/S/TCP requests לendpoint מ-18 מיקומים בעולם. Failure threshold: 3/18 locations. כש-Unhealthy: DNS מפסיק להחזיר את ה-Record הזה (Failover/Multi-Value). ניתן לשים alarm ב-CloudWatch ולסנן לפי מיקום גאוגרפי.',
      },
      {
        id: 'dns-q8',
        text: 'מה ה-SOA Record בDNS?',
        options: [
          'Start of Authentication — תהליך אימות DNS',
          'Start of Authority — מכיל מידע administrative על ה-Zone: Primary NS, admin email, Serial number, TTLs',
          'Scale on Availability — הגדרות scaling',
          'Subnet Overlap Avoidance — כלי לתכנון VPC',
        ],
        correct: 1,
        explanation: 'SOA Record: כל DNS Zone מכיל SOA אחד. כולל: Primary NS, אימייל admin (נקודה=@), Serial (עולה בכל שינוי), Refresh/Retry/Expire intervals, Minimum TTL. Zone Transfer (AXFR) בין Secondary NS מסתמך על Serial לדעת אם יש עדכונים.',
      },
      {
        id: 'dns-q9',
        text: 'Geolocation Routing ב-Route 53 נותן לגולש מגרמניה:',
        options: [
          'תמיד את השרת הקרוב ביותר גאוגרפית',
          'תמיד את השרת האירופי',
          'את ה-Record שהוגדר לGermany/Europe, עם Fallback ל-Default record — שימושי ל-GDPR, תוכן מקומי, שפה',
          'Record אקראי מהרשימה',
        ],
        correct: 2,
        explanation: 'Geolocation: מנתב לפי מדינה/יבשת של הLookup IP. גרמניה → Record שמוגדר ל-DE. אין match → Europe record. אין Europe → Default record. שימוש: תוכן בשפה מקומית, GDPR (EU data ב-EU servers), שידורי ספורט לפי region, מחירים שונים לאזורים.',
      },
      {
        id: 'dns-q10',
        text: 'מה Failover Routing Policy ב-Route 53?',
        options: [
          'מחלק תעבורה שווה בין שני endpoints',
          'Active-Passive: Primary מקבל תעבורה כשBריא; Secondary מופעל אוטומטית כשPrimary כושל לפי Health Check',
          'מנתב לפי latency בין שני endpoints',
          'Geo-routing בין שני endpoints',
        ],
        correct: 1,
        explanation: 'Failover Routing: Record Primary עם Health Check. כשPrimary Healthy → כל תעבורה לPrimary. כשUnhealthy → Route 53 מחזיר Secondary (DR site, S3 static page, etc.). שימוש: Disaster Recovery, Active-Passive HA. נדרש Health Check על Primary record.',
      },
    ],
  },

  {
    id: 'vpn-directconnect',
    title: 'VPN ו-Direct Connect',
    summary: 'חיבור On-Premises לענן: Site-to-Site VPN, Client VPN, AWS Direct Connect ו-BGP',
    emoji: '🔗',
    content: [
      { type: 'heading', text: 'למה חיבור Hybrid?' },
      {
        type: 'text',
        text: 'ארגונים רבים צריכים לחבר בין הסביבה On-Premises שלהם לענן — לReplikation, ל-Disaster Recovery, להעברת מידע הדרגתית, או לשמירת מידע רגיש on-site. יש שתי אפשרויות עיקריות: VPN (דרך האינטרנט, מוצפן) ו-Direct Connect (קו פרטי ייעודי).',
      },
      {
        type: 'table',
        caption: 'VPN לעומת Direct Connect',
        headers: ['מאפיין', 'Site-to-Site VPN', 'AWS Direct Connect'],
        rows: [
          ['תשתית', 'דרך האינטרנט (מוצפן IPSec)', 'קו פרטי ייעודי ל-AWS'],
          ['הקמה', 'שעות', 'שבועות-חודשים'],
          ['עלות', 'נמוכה (~$0.05/שעה)', 'גבוהה (port + data transfer)'],
          ['Bandwidth', 'עד 1.25Gbps (per tunnel)', '1Gbps, 10Gbps, 100Gbps'],
          ['Latency', 'גבוה ומשתנה', 'נמוך ועקבי'],
          ['SLA', 'תלוי בספק האינטרנט', '99.9% AWS SLA'],
          ['Encryption', 'מובנה (IPSec)', 'לא מוצפן — יש להוסיף VPN'],
        ],
      },
      { type: 'heading', text: 'Site-to-Site VPN' },
      {
        type: 'code',
        lang: 'text',
        caption: 'ארכיטקטורת Site-to-Site VPN',
        code: `On-Premises                          AWS VPC
  ┌─────────────────┐                ┌─────────────────┐
  │  Customer GW    │                │  Virtual Private │
  │  (Router/FW)    │◄──IPSec/IKE───►│  Gateway (VGW)  │
  │  IP: 5.6.7.8   │   (2 tunnels)  │  (Attached VPC) │
  └─────────────────┘                └─────────────────┘
        │                                    │
  10.1.0.0/16                         10.0.0.0/16

Customer Gateway (CGW): ה-Device/IP של הצד On-Premises
Virtual Private Gateway (VGW): ה-Endpoint בצד AWS
2 Tunnels לHA (בשני AZs שונים)
BGP (אופציונלי): Dynamic Routing — מחליף Routes אוטומטית`,
      },
      { type: 'heading', text: 'AWS Client VPN' },
      {
        type: 'text',
        text: 'Client VPN מאפשר לעובדים בודדים להתחבר ל-VPC מכל מקום דרך OpenVPN client. מתאים ל-Remote Work, ל-Developers שצריכים גישה ל-Private Resources. מחויב לפי מספר connections פעילים.',
      },
      { type: 'tip', text: 'Direct Connect + VPN = Direct Connect עם Failover. מקובל: DX לתנועה ביומיום, VPN כגיבוי אוטומטי אם DX נכשל. ניתן להשתמש ב-BGP לrouting אוטומטי בין שניהם.' },
    ],
    questionBank: [
      {
        id: 'vpn-q1',
        text: 'מה ההבדל העיקרי בין Site-to-Site VPN לDirect Connect?',
        options: [
          'VPN לAWS, DX לAzure',
          'VPN חינמי, DX בתשלום',
          'Site-to-Site VPN עובר דרך האינטרנט (מוצפן, מהיר להקמה, latency משתנה); Direct Connect = קו פרטי ייעודי (latency נמוך ועקבי, bandwidth גבוה, עלות גבוהה)',
          'VPN לVM, DX לContainers',
        ],
        correct: 2,
        explanation: 'VPN: Internet + IPSec encryption, הקמה שעות, ~$0.05/שעה, latency משתנה. DX: Dedicated private link לAWS, שבועות הקמה, עלות גבוהה, latency <10ms עקבי. לייצור רציני עם נפח גדול: DX. לDR, startup, bandwidth קטן: VPN.',
      },
      {
        id: 'vpn-q2',
        text: 'מה Customer Gateway ב-AWS VPN?',
        options: [
          'ה-Gateway ב-AWS שמקבל את ה-VPN',
          'ה-Firewall ב-AWS שמגן על החיבור',
          'הייצוג ב-AWS של ה-Device/IP של הלקוח בצד On-Premises (Router, Firewall, VPN appliance)',
          'Load Balancer לתעבורת VPN',
        ],
        correct: 2,
        explanation: 'Customer Gateway (CGW): Resource ב-AWS שמגדיר את הצד On-Premises — כולל IP ציבורי ו-BGP ASN אופציונלי. Virtual Private Gateway (VGW): ה-endpoint ב-AWS VPC. ביניהם: Site-to-Site VPN Connection עם 2 tunnels לHA.',
      },
      {
        id: 'vpn-q3',
        text: 'למה Site-to-Site VPN יוצר 2 tunnels?',
        options: [
          'להצפנה כפולה',
          'כי IPSec דורש 2 tunnels',
          'לredundancy: כל tunnel ב-AZ שונה ב-AWS. אם tunnel אחד נכשל, השני ממשיך — HA מלא',
          'לchannels נפרדים לinbound ו-outbound',
        ],
        correct: 2,
        explanation: 'AWS VPN: תמיד 2 tunnels, כל אחד ב-AZ שונה. AWS ממליצה להגדיר redundancy גם בצד הלקוח (2 Customer Gateways, 4 tunnels סה"כ). BGP: failover אוטומטי. Static routing: מנהל יחליף routes ידנית.',
      },
      {
        id: 'vpn-q4',
        text: 'מה AWS Direct Connect Location?',
        options: [
          'ה-Region שDirect Connect מחובר אליו',
          'AZ ייעודי לDX בלבד',
          'מרכז נתונים של צד שלישי שמחובר פיזית לAWS ואליו הלקוח מביא את הקו הפרטי שלו',
          'Virtual Location שDX מדמה',
        ],
        correct: 3,
        explanation: 'DX Location: colocation facility (Equinix, Interxion, וכד\') עם חיבור פיזי לAWS. הלקוח מחבר Cross-Connect פיזי בין ציוד שלו לציוד AWS ב-Location. בישראל: חיבורים לDX Locations אירופאים (Amsterdam, Frankfurt). גם ניתן דרך Hosted Connection של ספק.',
      },
      {
        id: 'vpn-q5',
        text: 'מה BGP ולמה הוא שימושי ב-VPN/DX?',
        options: [
          'Bandwidth Growth Protocol — לניהול עומסים',
          'Border Gateway Protocol — פרוטוקול Routing דינמי שמחליף Routes אוטומטית בין Networks; מאפשר Failover אוטומטי',
          'Basic Gateway Proxy — שרת proxy לDX',
          'Backup Gateway Provider — ספק גיבוי',
        ],
        correct: 1,
        explanation: 'BGP: פרוטוקול הRouting של האינטרנט. ב-VPN/DX: AWS ו-On-Premises "מכריזים" Routes זה לזה. Failover: אם DX נכשל, BGP מסיר את ה-Routes ומנתב דרך VPN אוטומטית. AS Path, Local Preference, MED — כלים לשליטה בRouting.',
      },
      {
        id: 'vpn-q6',
        text: 'Client VPN ב-AWS מתאים ל:',
        options: [
          'חיבור שתי VPCs',
          'חיבור On-Premises לAWS',
          'גישת עובדים בודדים מהבית/נסיעות ל-Private Resources ב-VPC דרך OpenVPN client',
          'Peering בין Accounts',
        ],
        correct: 2,
        explanation: 'AWS Client VPN: managed OpenVPN service. עובד מתקין OpenVPN client → מתחבר ל-Client VPN Endpoint → מקבל IP ב-VPC → גישה לResources פרטיים. Authentication: Active Directory / Certificate / SAML. תמחור: לפי subnet association + active connections.',
      },
      {
        id: 'vpn-q7',
        text: 'מה Transit VIF (Virtual Interface) ב-Direct Connect?',
        options: [
          'VIF זמני לבדיקות',
          'VIF מהיר במיוחד לbandiwidth גבוה',
          'Virtual Interface שמחובר ל-Transit Gateway ומאפשר DX לגשת למרובה VPCs דרך TGW יחיד',
          'VIF לתעבורת UDP בלבד',
        ],
        correct: 2,
        explanation: 'DX Virtual Interfaces: Private VIF (→ VGW = VPC יחיד), Public VIF (→ AWS public services), Transit VIF (→ Transit Gateway = מרובה VPCs). Transit VIF + TGW = hub-and-spoke: DX אחד לכל ה-VPCs.',
      },
      {
        id: 'vpn-q8',
        text: 'DX לא מצפין תעבורה — מה הפתרון?',
        options: [
          'DX מצפין תמיד — הטענה שגויה',
          'AWS מצפין אוטומטית בLayer 2',
          'מוסיפים IPSec VPN מעל ה-DX (MACsec ל-Layer 2 או VPN Tunnel ל-Layer 3) לhybrid שמשלב bandwidth גבוה ועם encryption',
          'DX לא צריך הצפנה כי הוא פרטי',
        ],
        correct: 2,
        explanation: 'DX פרטי אבל לא מוצפן כברירת מחדל. אפשרויות: MACsec (Layer 2 encryption, ל-DX Dedicated 10G/100G), או IPSec VPN מעל DX (Layer 3). VPN מעל DX: latency נמוך של DX + security של VPN. Compliance-heavy: תדרשו הצפנה.',
      },
      {
        id: 'vpn-q9',
        text: 'מה Hosted Connection ב-Direct Connect?',
        options: [
          'DX שAWS מנהלת ישירות',
          'DX שרץ על EC2',
          'DX bandwidth קטן (50Mbps–10Gbps) שספק (AWS Partner) מוכר — ללא צורך בחיבור פיזי ישיר ל-DX Location',
          'DX לS3 בלבד',
        ],
        correct: 2,
        explanation: 'Hosted DX Connection: ספק (Equinix, Zayo, וכד\') כבר מחובר פיזית לAWS DX. לקוח קונה "slice" של קישוריות. מהיר יותר להקמה מDedicated. Dedicated: 1/10/100Gbps, ישיר ל-AWS. Hosted: מ-50Mbps עד 10Gbps, דרך ספק.',
      },
      {
        id: 'vpn-q10',
        text: 'אורגניזציה רוצה לחבר 50 VPCs ל-On-Premises דרך Direct Connect. מה הארכיטקטורה המומלצת?',
        options: [
          '50 DX Connections — אחד לכל VPC',
          '50 VGWs מחוברים לDX יחיד',
          'DX Connection יחיד → Transit Gateway → Transit VIF → כל 50 ה-VPCs מחוברים ל-TGW',
          'VPC Peering בין כל 50 ה-VPCs ואז DX אחד',
        ],
        correct: 2,
        explanation: 'Transit Gateway Hub-and-Spoke: DX אחד עם Transit VIF → TGW → כל ה-VPCs. בלי TGW: DX Dedicated תומך ב-50 VIFs. עם הרחבה זה מסורבל. TGW פשט: כל VPC attached ל-TGW, DX מדבר רק עם TGW. תמחור: TGW attachment + data processing.',
      },
    ],
  },

  {
    id: 'cdn-cloudfront',
    title: 'CDN ו-CloudFront',
    summary: 'רשת הפצת תוכן: Edge Locations, Origins, Cache Behaviors, Signed URLs ו-OAC',
    emoji: '⚡',
    content: [
      { type: 'heading', text: 'CDN — Content Delivery Network' },
      {
        type: 'text',
        text: 'CDN הוא רשת שרתים גלובלית ("Edge Locations") שמאחסנת עותקים מטמון (Cache) של תוכן קרוב לגולשים. במקום שכל בקשה תעבור לשרת המקורי בVirginia, גולש בישראל מקבל את הקובץ מEdge Location בFrankfurt — latency נמוך בהרבה.',
      },
      {
        type: 'table',
        caption: 'CloudFront — מושגי מפתח',
        headers: ['מושג', 'הגדרה'],
        rows: [
          ['Distribution', 'הגדרת CloudFront — כולל Origins, Behaviors, Cache Settings'],
          ['Edge Location', 'שרתי Cache בעשרות ערים ברחבי העולם (450+)'],
          ['Origin', 'שרת המקורי: S3, ALB, EC2, Custom HTTP, API GW'],
          ['Cache Behavior', 'חוק per path: /images/* → cache 1 day, /api/* → no cache'],
          ['TTL', 'כמה זמן Edge שומר את התוכן (min/default/max)'],
          ['Invalidation', 'מחיקה ידנית של cache לפי path'],
          ['OAC', 'Origin Access Control — S3 גישה רק לCloudFront'],
        ],
      },
      { type: 'heading', text: 'Cache Behaviors' },
      {
        type: 'code',
        lang: 'text',
        caption: 'CloudFront Distribution — Cache Behaviors',
        code: `Distribution: d123.cloudfront.net

Behaviors (לפי עדיפות):
  /api/*           → Origin: ALB            Cache: None (TTL=0)
  /images/*        → Origin: S3 bucket      Cache: 86400s (1 day)
  /static/*        → Origin: S3 bucket      Cache: 31536000s (1 year)
  /* (Default)     → Origin: ALB            Cache: 3600s (1 hour)

Cache Keys:
  Query Strings: whitelist (token=, v=)
  Headers: none (אל תכלולו headers ב-cache key!)
  Cookies: whitelist (session_id)

Compression:
  Gzip/Brotli: מופעל → קבצים קטנים יותר → מהיר יותר`,
      },
      { type: 'heading', text: 'Signed URLs ו-Signed Cookies' },
      {
        type: 'text',
        text: 'Signed URL/Cookie מגבילים גישה לתוכן ב-CloudFront: רק מי שקיבל URL/Cookie חתום יכול לגשת. משמש ל: סרטים בתשלום, קבצים למשתמשים רשומים, הורדות עם תפוגה. Signed URL לקובץ יחיד; Signed Cookie למספר קבצים (כל ה-library של הסרטים).',
      },
      { type: 'tip', text: 'Cache Hit Rate: מטרה לCFr — >80%. כדי לשפר: הוציאו headers, cookies, query params שלא משפיעים על התוכן מה-Cache Key. Vary: * בResponse גורם לCache miss תמיד. Invalidation: עולה כסף ($0.005 לpath הראשון) — עדיף versioning (file.v2.js).' },
    ],
    questionBank: [
      {
        id: 'cdn-q1',
        text: 'מה Edge Location ב-CloudFront?',
        options: [
          'AZ ייעודי לCloudFront',
          'שרת Cache ב-Region',
          'שרת בעיר ספציפית ברחבי העולם שמאחסן עותק Cache ומגיש לגולש הקרוב — מפחית latency',
          'EC2 instance שAWS מנהלת',
        ],
        correct: 2,
        explanation: 'CloudFront: 450+ Edge Locations ו-13+ Regional Edge Caches. גולש → Edge Location הקרוב → Cache hit → תגובה מהירה. Cache miss → Edge → Regional Edge Cache → Origin (ALB/S3). S3/ALB לא מטפלים בבקשה עצמאית — CloudFront עונה לגולש.',
      },
      {
        id: 'cdn-q2',
        text: 'מה OAC (Origin Access Control) ב-CloudFront + S3?',
        options: [
          'Open Access Control — פותח S3 לכולם',
          'מגביל גישה לS3 Bucket כך שרק CloudFront יכול לקרוא — Bucket Policy שמתיר רק CloudFront Service Principal, לא Public',
          'הצפנת קבצים בS3',
          'Cache Policy לS3 Objects',
        ],
        correct: 1,
        explanation: 'OAC (חליפה OAI): S3 Bucket Private (Public Access Blocked). Bucket Policy: Allow "cloudfront.amazonaws.com" עם condition על Distribution ARN. תוצאה: גולשים חייבים לעבור דרך CloudFront, לא יכולים לגשת ישירות לS3 URL. מחייב IAM Role לCloudFront.',
      },
      {
        id: 'cdn-q3',
        text: 'מה Cache Behavior ב-CloudFront?',
        options: [
          'הגדרה כיצד CloudFront אוסף Cache',
          'חוק per-path שמגדיר לאיזה Origin לנתב, כמה זמן לCacheב Cache Policy, אילו Query/Headers/Cookies לכלול ב-Cache Key',
          'הגדרה של cache ב-Browser',
          'אלגוריתם החלפת Cache',
        ],
        correct: 2,
        explanation: 'Cache Behavior: /api/* → no cache, TTL=0; /images/* → 24h cache. כל Behavior מגדיר: Origin, Cache Policy (TTL), Origin Request Policy (מה להעביר ל-Origin), Viewer Protocol Policy, Allowed HTTP Methods. Default Behavior = /* — לוקח כל שאר.',
      },
      {
        id: 'cdn-q4',
        text: 'Signed URL לעומת Signed Cookie — מתי להשתמש בכל אחד?',
        options: [
          'Signed URL לS3, Signed Cookie לALB',
          'Signed URL לHTTPS, Signed Cookie לHTTP',
          'Signed URL לקובץ בודד; Signed Cookie לגישה למספר קבצים (כל Library, כל Course Videos)',
          'אין הבדל — השתמשו באחד מהם',
        ],
        correct: 2,
        explanation: 'Signed URL: מכיל הרשאה לpath ספציפי עם תפוגה. דוגמה: קישור הורדה לקובץ PDF אחד. Signed Cookie: מגדיר הרשאה לpattern (/videos/*) ב-Cookie. נוח כשיש player שטוען הרבה segments (HLS/DASH streaming). CloudFront בודק Signature לפני Cache.',
      },
      {
        id: 'cdn-q5',
        text: 'מה CloudFront Invalidation ומה הבעיה איתו?',
        options: [
          'מחיקת Distribution שלם',
          'מחיקת records מRoute 53',
          'כיבוי Edge Locations',
          'מחיקה ידנית של Cache ב-Edge Locations לפי path — עולה כסף ($0.005 לpath), איטי, ובעת Deploy עדיף File Versioning (bundle.v2.js)',
        ],
        correct: 3,
        explanation: 'Invalidation: שולחים לCloudFront /images/logo.png → כל Edge Locations מוחקים את ה-Cache. עולה: ראשון 1,000 paths/חודש חינמי, אחר כך $0.005/path. לDeploy: עדיף /static/app.abc123.js (hash) → TTL גבוה, ללא invalidation. Invalidation רק לשינויים דחופים.',
      },
      {
        id: 'cdn-q6',
        text: 'CloudFront מאפשר להגיש תוכן מ-Origins שונים לפי path — מה זה מאפשר?',
        options: [
          'Load Balancing בלבד',
          'Failover אוטומטי בלבד',
          'Microservices Architecture: /api/* → ALB, /images/* → S3, /docs/* → ALB אחר — Distribution אחד שמסתיר ריבוי Backends',
          'הצפנה שונה לכל path',
        ],
        correct: 2,
        explanation: 'Multi-Origin Distribution: /static/* → S3 (זול, מהיר), /api/* → ALB/ECS (dynamic, no cache), /auth/* → API Gateway. גולש רואה domain אחד (cdn.company.com), לא יודע על הבחנה. מפחית עלויות data transfer (Static מS3 → CloudFront חינמי).',
      },
      {
        id: 'cdn-q7',
        text: 'מה הכוונה ב-Cache Hit Rate גבוה ב-CloudFront ולמה הוא חשוב?',
        options: [
          'אחוז הזמן שCloudFront פועל',
          'אחוז הבקשות שמקבלות Cache Miss',
          'אחוז הבקשות שCloudFront עונה עליהן מCache (ללא פנייה ל-Origin) — גבוה יותר = פחות עומס על Origin, latency נמוך, עלויות נמוכות',
          'מהירות כתיבה ל-Cache',
        ],
        correct: 2,
        explanation: 'Cache Hit Rate: 95% = רק 5% מהבקשות הגיעו ל-Origin. יתרונות: Origin לא עמוס, latency Edge<Origin, עלות data transfer נמוכה. לשיפור: הוציאו headers/cookies/query params לא רלוונטיים מ-Cache Key, הארכו TTL לStatic content, השתמשו ב-versioned filenames.',
      },
      {
        id: 'cdn-q8',
        text: 'מה Lambda@Edge ו-CloudFront Functions?',
        options: [
          'Lambda שרץ ב-Region רגיל, CloudFront Functions שרץ ב-Edge',
          'שניהם אותו הדבר',
          'קוד שרץ ב-Edge Locations של CloudFront — לA/B testing, authentication, header manipulation, URL rewriting — ללא Round Trip ל-Origin',
          'Caching של Lambda responses',
        ],
        correct: 2,
        explanation: 'CloudFront Functions (JS, <1ms, חינם כמעט): URL rewrites, header manipulation, simple auth. Lambda@Edge (Node/Python, עד 30s, יקר יותר): complex auth (JWT validation), A/B testing לפי cookie, Image Resizing. שניהם רצים ב-Edge — response מהיר ללא round-trip ל-Region.',
      },
      {
        id: 'cdn-q9',
        text: 'CloudFront + HTTPS — כיצד מנהלים SSL Certificate?',
        options: [
          'אי אפשר להשתמש ב-HTTPS עם CloudFront',
          'Certificate חייב להיות ב-ACM (AWS Certificate Manager) ב-us-east-1 בלבד — CloudFront דורש Region ספציפי זה',
          'Certificate ניתן להעלות לכל Region',
          'CloudFront יוצר Certificate אוטומטית',
        ],
        correct: 1,
        explanation: 'ACM + CloudFront: Certificate חייב להיות ב-us-east-1 (N.Virginia) — לא משנה מה ה-Distribution Region. ACM Certificate: חינמי, renewal אוטומטי. שלבים: Request cert בACM us-east-1 → DNS validation → CloudFront Distribution → Custom Domain → Certificate.',
      },
      {
        id: 'cdn-q10',
        text: 'S3 Transfer Acceleration לעומת CloudFront — מה ההבדל?',
        options: [
          'S3 TA לDownload, CloudFront לUpload',
          'S3 TA מאיץ Uploads לS3 דרך Edge Locations; CloudFront מאיץ Downloads/Serving תוכן סטטי ודינמי',
          'שניהם זהים לחלוטין',
          'CloudFront לS3, S3 TA לEC2',
        ],
        correct: 1,
        explanation: 'S3 Transfer Acceleration: Upload → Edge Location הקרוב → AWS Backbone → S3. מאיץ Uploads גדולים ממרחק. CloudFront: Cache + Delivery לEndUsers (Downloads). שניהם משתמשים ב-AWS Global Network. לUpload גדול לS3 מתל אביב ל-us-east-1: S3 TA.',
      },
    ],
  },

  {
    id: 'network-monitoring',
    title: 'Monitoring ופתרון בעיות רשת',
    summary: 'VPC Flow Logs, CloudWatch Network Insights, Reachability Analyzer, Traffic Mirroring',
    emoji: '🔍',
    content: [
      { type: 'heading', text: 'כלי Monitoring לרשת ב-AWS' },
      {
        type: 'table',
        caption: 'כלי Monitoring לרשת',
        headers: ['כלי', 'שכבה', 'שימוש', 'עלות'],
        rows: [
          ['VPC Flow Logs', 'Layer 3/4', 'מי שוחח עם מי, ACCEPT/REJECT, bytes', 'לפי נפח (CloudWatch/S3)'],
          ['VPC Reachability Analyzer', 'Configuration', 'האם path בין A לB אפשרי? לפי SG/RT/NACL', '$0.10 לanalysis'],
          ['Network Access Analyzer', 'Configuration', 'זיהוי גישה לא מכוונת ל-Internet', '$0.20 לanalysis'],
          ['Traffic Mirroring', 'Layer 2-7', 'שכפול תעבורה לIDPS/ניתוח Deep Packet', 'לפי instance'],
          ['CloudWatch Metrics', 'Layer 4+', 'ALB/NLB requests, latency, errors', 'לפי metrics'],
          ['Route Analyzer (TGW)', 'Layer 3', 'ניתוח Route Tables של Transit Gateway', 'חינמי'],
        ],
      },
      { type: 'heading', text: 'VPC Flow Logs — פורמט' },
      {
        type: 'code',
        lang: 'text',
        caption: 'פורמט VPC Flow Log (Default)',
        code: `version account-id interface-id srcaddr dstaddr srcport dstport protocol packets bytes start end action log-status

דוגמה (ACCEPT):
2 123456789 eni-abc123 10.0.1.5 10.0.2.10 54321 3306 6 10 840 1609459200 1609459260 ACCEPT OK

דוגמה (REJECT — SG חסם):
2 123456789 eni-abc123 1.2.3.4 10.0.1.5 12345 22 6 1 40 1609459300 1609459360 REJECT OK

ניתוח:
  REJECT + dstport=22 מIPים זרים → ניסיון SSH לא מורשה
  ACCEPT + dstport=3306 מIPים חיצוניים → DB חשוף לאינטרנט! בעיה!`,
      },
      { type: 'heading', text: 'Reachability Analyzer' },
      {
        type: 'text',
        text: 'Reachability Analyzer בודק האם קיים path תקין בין שני Resources ב-VPC — Instance, IGW, VPN, VPC Peering, TGW — בלי לשלוח תעבורה בפועל. מנתח: Security Groups, Route Tables, NACLs, VPC Peering, TGW. מחזיר: Reachable / Not Reachable + הסבר על חסם.',
      },
      { type: 'tip', text: 'Quick Debug Checklist לבעיית קישוריות ב-AWS: 1) Security Group — האם Port פתוח? 2) NACL — האם כל הכיוונים פתוחים (Stateless)? 3) Route Table — האם יש route לDestination? 4) Internet Gateway — מחובר ל-VPC? 5) NAT Gateway — ב-Public Subnet? 6) Instance — האם Public IP / Elastic IP מוגדר?' },
    ],
    questionBank: [
      {
        id: 'mon-q1',
        text: 'VPC Flow Logs מכילים REJECT לבקשות SSH מה-אינטרנט — מה זה מסמן?',
        options: [
          'בעיה חמורה — SSH חשוף ויש לסגור את ה-Instance',
          'Security Group עובד נכון — חוסם ניסיונות SSH לא מורשים; ה-REJECT הוא תקין ורצוי',
          'SSH מחויב להיות פתוח לאינטרנט',
          'VPC Flow Logs שגויים',
        ],
        correct: 1,
        explanation: 'REJECT ב-Flow Logs = Security Group/NACL חסם בהצלחה. ניסיונות SSH מ-0.0.0.0/0 ב-Port 22 הם נפוצים (Internet Scanners, bots). SG שחוסם אותם = עובד נכון. ACCEPT לSSH מIPים לא מוכרים = בעיה. Monitoring: Alarm ב-CloudWatch Logs על ACCEPT port 22 מ-external IPs.',
      },
      {
        id: 'mon-q2',
        text: 'VPC Reachability Analyzer מחזיר "Not Reachable" בין EC2 א׳ לEC2 ב׳ באותו VPC. איזה בעיה הוא יכול לזהות?',
        options: [
          'בעיה ביישום הרץ ב-EC2',
          'שגיאה בקוד Python',
          'כל בעיה ב-Configuration: SG לא מתיר את הPort, Route Table חסר Route, NACL חוסם, Subnet שגויה',
          'בעיית DNS — שם לא נמצא',
        ],
        correct: 2,
        explanation: 'Reachability Analyzer: בודק configuration בלבד — SG, NACL, Route Tables, VPC Peering, TGW attachments. מציין בדיוק איפה הblock: "Security Group sg-xxx doesn\'t allow TCP:3306 from 10.0.1.0/24". לא בודק: OS firewall, App listening, DNS, TLS errors.',
      },
      {
        id: 'mon-q3',
        text: 'מה Traffic Mirroring ב-AWS?',
        options: [
          'שכפול S3 Objects לBucket אחר',
          'Backup של EC2 לAMI',
          'העתקת תעבורת רשת (Packets) מENI ל-Target (ENI/NLB) לניתוח deep packet inspection, IDS/IPS, forensics',
          'Load Balancing של תעבורת UDP',
        ],
        correct: 2,
        explanation: 'Traffic Mirroring: מנוי ל-ENI → מקבל עותק של כל Packets → שולח ל-Target (ENI של IDS/IPS appliance, NLB). פועל ב-Layer 2-7. שימוש: Suricata/Zeek לIDPS, Forensic Analysis, DLP. פועל על Nitro Instances. לא על t2/t3 ישנים.',
      },
      {
        id: 'mon-q4',
        text: 'מה ניתן לראות ב-VPC Flow Logs אך לא בCloudTrail?',
        options: [
          'AWS API calls של משתמשים',
          'שינויים ב-IAM Policy',
          'יצירת EC2 Instances',
          'תעבורת רשת בפועל: מי שלח packets לאן, כמה bytes, ב-port כמה — Network activity לא API calls',
        ],
        correct: 3,
        explanation: 'CloudTrail: API calls ל-AWS (who created/deleted/modified AWS Resources). Flow Logs: IP traffic metadata (srcIP, dstIP, ports, packets, ACCEPT/REJECT). שניהם נחוצים לsecurity: CloudTrail לControle Plane, Flow Logs לData Plane. Flow Logs לא כוללים Payload — רק Headers.',
      },
      {
        id: 'mon-q5',
        text: 'CloudWatch מראה שאחוז שגיאות 5xx ב-ALB עלה ל-30%. מה הצעדים הראשונים לחקירה?',
        options: [
          'מיידית Replace את כל ה-EC2 Instances',
          'בדקו: ALB Access Logs לשגיאות ספציפיות, Target Group Health (כמה Targets Healthy), EC2 Application Logs, Memory/CPU של Instances',
          'הגדילו TTL של DNS',
          'הפעילו CloudFront Cache',
        ],
        correct: 1,
        explanation: '5xx = שגיאות Server-side. תהליך: 1) ALB Access Logs → איזה paths נכשלים? 2) Target Group → כמה Healthy? 3) EC2 Application Logs → Exception? Out of Memory? 4) CloudWatch Metrics → CPU/Memory high? 5) VPC Flow Logs → connectivity issues?. 502=Bad Gateway (App לא מגיב), 503=Service Unavailable (כל Targets Unhealthy).',
      },
      {
        id: 'mon-q6',
        text: 'מה Network Access Analyzer ב-AWS?',
        options: [
          'מנתח Performance של רשת',
          'כלי לניתוח BGP routes',
          'כלי שמזהה גישה לא מכוונת ל-Internet או בין VPCs — שואל "מי יכול לגשת ל-Resource הזה?" ומוצא הגדרות מסוכנות',
          'Analyzer של VPN tunnels',
        ],
        correct: 2,
        explanation: 'Network Access Analyzer: מבצע Scan של ה-Configuration ומחפש: Internet Gateways שמחוברים לResources פרטיים, Public IPs לא מכוונים, VPC Peering שנותנים גישה רחבה מדי. שונה מReachability Analyzer (A→B ספציפי) — זה יותר audit/compliance.',
      },
      {
        id: 'mon-q7',
        text: 'ALB Access Logs מראים 504 Gateway Timeout — מה זה אומר?',
        options: [
          'DNS לא מצא את השרת',
          'SSL Certificate פג תוקף',
          'ALB פנה ל-Target אך לא קיבל תגובה בזמן (Idle Timeout, ברירת מחדל 60s) — בעיה בApp עצמו, לא ב-ALB',
          'Security Group חסם את הבקשה',
        ],
        correct: 2,
        explanation: '504 Gateway Timeout: ALB שלח בקשה ל-Target אבל Target לא ענה בזמן. גורמים: App תקוע (deadlock, slow query DB), ALB Idle Timeout קצר מדי לעסקות ארוכות, Connection בין ALB לTarget נחסם. פתרון: הגדיל ALB Timeout, debug ה-App, בדוק SG בין ALB ל-Target.',
      },
      {
        id: 'mon-q8',
        text: 'VPC Flow Logs נשלחים ל-CloudWatch Logs — מה ניתן לבנות על זה?',
        options: [
          'אפשר רק לצפות בLogs — אין יכולות נוספות',
          'Metric Filters + CloudWatch Alarms: ספירת Rejects ל-Port ספציפי, התראה על IP חשוד, Dashboard של תעבורה לפי Protocol',
          'Flow Logs מוגבלים ל-S3 בלבד',
          'Flow Logs ב-CloudWatch = יקרים מדי להשתמש',
        ],
        correct: 1,
        explanation: 'CloudWatch Logs Insights: SQL-like queries על Flow Logs. Metric Filters: ספרו REJECT events ל-Port 22 → Alarm אם >100/דקה. Dashboard: Top Talkers, ניתוח לפי Protocol, CIDR. Athena על S3: ניתוח גדול עם SQL, זול יותר לנפחים גדולים.',
      },
      {
        id: 'mon-q9',
        text: 'מה ה-"Idle Timeout" של ALB ומה הגדרה מומלצת לWebSocket?',
        options: [
          'זמן שALB ממתין עד לקריסה של Backend',
          'זמן שALB שומר connection פתוח ללא תעבורה (ברירת מחדל 60s); לWebSocket שצריך connection פתוח זמן רב — הגדילו ל-3600s+',
          'Cache TTL של ALB',
          'Health Check interval',
        ],
        correct: 1,
        explanation: 'Idle Timeout (60s default): אם ALB לא קיבל/שלח data ב-60s → סוגר connection. לAPIs מהירות: מושלם. לWebSockets, SSE, Long Polling: הגדילו ל-3600s. לbatch requests ארוכים: הגדילו בהתאם. Client צריך גם לשמור connection (TCP Keepalive).',
      },
      {
        id: 'mon-q10',
        text: 'Ping לInstance ב-VPC לא עובד. מה הסיבות האפשריות?',
        options: [
          'Ping לא עובד בAWS בכלל',
          'רק ICMP Type 0 (Echo Reply) נחסם, Type 8 (Echo Request) פועל',
          'Security Group לא מתיר ICMP (Type 8, Echo Request), NACL חוסם ICMP, Instance OS חוסם ICMP, או Instance ב-Private Subnet ללא נתיב',
          'Ping דורש license ב-AWS',
        ],
        correct: 2,
        explanation: 'Ping = ICMP Echo Request. בדיקה: 1) SG Inbound: ICMP Type 8 מ-Source מתאים? 2) NACL Inbound+Outbound: ICMP מותר? (Stateless!) 3) Route Table: יש route לSource? 4) OS (iptables/Windows FW): מתיר ping? 5) Instance ב-Private Subnet: יש NAT? Reachability Analyzer יאבחן 1-4 אוטומטית.',
      },
    ],
  },

  {
    id: 'network-security',
    title: 'Network Security — WAF, Shield ו-VPC Endpoints',
    summary: 'הגנת Web Application Firewall, DDoS Protection, PrivateLink ו-VPC Gateway Endpoints',
    emoji: '🔒',
    content: [
      { type: 'heading', text: 'AWS WAF — Web Application Firewall' },
      {
        type: 'text',
        text: 'WAF מגן על Applications ברמת HTTP (Layer 7) מפני: SQL Injection, XSS, Bot attacks, Rate limiting, IP Blocklists. ניתן לצרף לCloudFront, ALB, API Gateway ו-AppSync. פועל על "Web ACLs" המכילים Rules ו-Rule Groups.',
      },
      {
        type: 'table',
        caption: 'WAF Rule Types',
        headers: ['Rule Type', 'מה בודק', 'דוגמה'],
        rows: [
          ['IP Set Match', 'IP source', 'חסום IPs מרשימה שחורה'],
          ['Geo Match', 'מדינת המקור', 'חסום תעבורה מקורות ספציפיים'],
          ['Rate Based', 'קצב בקשות לIP', 'חסום אחרי 1000 req/5min'],
          ['SQL Injection', 'SQL patterns בBody/Query', 'חסום \' OR 1=1 --'],
          ['XSS Match', 'Script patterns', 'חסום <script>alert()</script>'],
          ['Managed Rules', 'AWS/Partner Rule Groups', 'AWSManagedRulesCommonRuleSet'],
        ],
      },
      { type: 'heading', text: 'AWS Shield — DDoS Protection' },
      {
        type: 'table',
        caption: 'Shield Standard לעומת Advanced',
        headers: ['תכונה', 'Shield Standard', 'Shield Advanced'],
        rows: [
          ['עלות', 'חינמי לכולם', '$3,000/חודש + Data transfer'],
          ['הגנה', 'L3/L4 DDoS (SYN Flood, UDP Reflection)', 'L3/L4/L7, כולל HTTP Flood'],
          ['Response Team', 'לא', 'DRT — 24/7 support'],
          ['Cost Protection', 'לא', 'החזר עלויות scaling בזמן Attack'],
          ['WAF Integration', 'לא', 'כן — Auto WAF Rules'],
          ['Resources', 'כל Resources', 'Elastic IPs, ALB, CF, Route 53'],
        ],
      },
      { type: 'heading', text: 'VPC Endpoints — גישה לServices ללא Internet' },
      {
        type: 'code',
        lang: 'text',
        caption: 'Gateway vs Interface Endpoint',
        code: `Gateway Endpoint (חינמי, רק S3 ו-DynamoDB):
  Route Table:
    Destination       Target
    pl-xxxxx (S3)    vpce-gateway-xxx   ← Private path to S3

  Private Subnet → S3 ללא NAT Gateway, ללא Internet

Interface Endpoint (PrivateLink) — לכל שאר:
  יוצר ENI ב-Subnet עם IP פרטי
  DNS: sqs.us-east-1.amazonaws.com → 10.0.1.50 (ENI)
  Private Subnet → SQS/SNS/Secrets Manager/ECR
    ללא Internet, ללא NAT, דרך רשת AWS פנימית

דוגמה: ECR Interface Endpoint
  ECR API: com.amazonaws.us-east-1.ecr.api
  ECR DKR: com.amazonaws.us-east-1.ecr.dkr
  עלות: ~$0.01/שעה + $0.01/GB`,
      },
      { type: 'tip', text: 'PrivateLink vs VPC Peering: VPC Peering = גישה לכל ה-VPC (full access). PrivateLink = גישה לService ספציפי בלבד (רק ה-endpoint). SaaS providers: חשפו Service שלכם ללקוחות דרך PrivateLink — הלקוח לא רואה את ה-VPC שלכם, רק את ה-Service.' },
    ],
    questionBank: [
      {
        id: 'sec-q1',
        text: 'WAF (Web Application Firewall) מגן מפני:',
        options: [
          'DDoS volumetric attacks (SYN Flood)',
          'SQL Injection, XSS, Bot attacks, HTTP Rate Limiting — איומים ברמת Application (Layer 7)',
          'VPN tunnel hijacking',
          'BGP route hijacking',
        ],
        correct: 3,
        explanation: 'WAF = Layer 7. SQL Injection: \' OR 1=1 בQuery String. XSS: <script>בBody. Rate Limit: 1000 req/5min לIP. Geo Block: חסום מדינות. DDoS Layer 3/4 (SYN Flood) = Shield, לא WAF. ניתן לצרף WAF לCloudFront, ALB, API Gateway.',
      },
      {
        id: 'sec-q2',
        text: 'מה VPC Gateway Endpoint ומה ייחודו?',
        options: [
          'ENI ב-Subnet לגישה לAWS Services',
          'Endpoint לחיבור VPCs בין Accounts',
          'Resource ב-Route Table (לא ENI) שמאפשר גישה פרטית לS3 ו-DynamoDB בלבד — ללא עלות, ללא Internet, ללא NAT',
          'Endpoint לConnecting ל-On-Premises',
        ],
        correct: 2,
        explanation: 'Gateway Endpoint: Route Table entry (Destination: S3 prefix list → Target: vpce). לא ENI, לא IP פרטי. חינמי. רק ל-S3 ו-DynamoDB. תנועה נשארת ברשת AWS. Private Subnet → S3 ללא NAT Gateway = חיסכון בעלויות NAT.',
      },
      {
        id: 'sec-q3',
        text: 'מה ההבדל בין Shield Standard לShield Advanced?',
        options: [
          'Standard לHTTP, Advanced לHTTPS',
          'Standard ל-EC2, Advanced לRDS',
          'Standard חינמי ומגן L3/L4 בסיסי; Advanced $3K/חודש ומוסיף L7 DDoS, DRT Support 24/7, Cost Protection',
          'Standard ל-Region, Advanced ל-Global',
        ],
        correct: 2,
        explanation: 'Shield Standard: חינמי לכל AWS Customers. SYN Flood, UDP Reflection, HTTP Floods בסיסיים. Shield Advanced: $3,000/חודש + Data Transfer. DRT (DDoS Response Team), L7 protection, WAF integration, automatic application layer mitigations, cost protection בזמן attacks. לארגונים עם SLA גבוה.',
      },
      {
        id: 'sec-q4',
        text: 'Private Link (Interface VPC Endpoint) שונה מGateway Endpoint ב:',
        options: [
          'PrivateLink תומך בכל Services; Interface Endpoint רק לS3',
          'הם זהים',
          'PrivateLink = Interface Endpoint: יוצר ENI עם IP פרטי ב-Subnet לכל AWS Service וServices של Partners; Gateway Endpoint = Route Table entry לS3/DynamoDB בלבד (חינמי)',
          'Gateway Endpoint מהיר יותר תמיד',
        ],
        correct: 2,
        explanation: 'Gateway Endpoint: Route Table, S3+DynamoDB, חינמי. Interface Endpoint (PrivateLink): ENI ב-Subnet, IP פרטי, DNS resolution לService → IP פרטי, תומך ב-400+ Services (SQS, SNS, EC2 API, Secrets Manager, ECR, KMS, Systems Manager). עלות: ~$0.01/שעה/AZ.',
      },
      {
        id: 'sec-q5',
        text: 'WAF Managed Rule Group — מה זה?',
        options: [
          'Rules שAWS מנהלת אוטומטית ללא עלות',
          'Groups של Rules מוכנות שAWS או Partners כתבו ומעדכנות — לדוגמה AWSManagedRulesCommonRuleSet מגן מSQL Injection, XSS, BadBots',
          'Rules לניהול Security Groups',
          'IP Blocklist שAWS מנהלת',
        ],
        correct: 1,
        explanation: 'Managed Rule Groups: AWS: CommonRuleSet, KnownBadInputs, SQLDatabase, AmazonIpReputationList. Partners: Fortinet, F5, CrowdStrike. מעודכנות אוטומטית לאיומים חדשים. עלות נוספת. ניתן לשלב Custom Rules + Managed Rules ב-Web ACL אחד.',
      },
      {
        id: 'sec-q6',
        text: 'מה ה-"AWS PrivateLink" כשמוכרים Service ל-לקוחות חיצוניים?',
        options: [
          'שיתוף גישה מלאה לVPC עם לקוחות',
          'VPC Peering לכל לקוח',
          'חשיפת Service ספציפי (NLB → Service) ל-VPCs של לקוחות ללא גישה לVPC שלכם — מאובטח, scalable, ב-Marketplace',
          'Gateway Endpoint לS3',
        ],
        correct: 2,
        explanation: 'SaaS via PrivateLink: ה-Provider מגדיר VPC Endpoint Service (מעל NLB). לקוח יוצר Interface Endpoint → מקבל ENI ב-VPC שלו → מדבר עם Service. לקוח לא רואה IP של Provider VPC. Provider לא רואה VPC של לקוח. AWS Marketplace: מאות Services ב-PrivateLink.',
      },
      {
        id: 'sec-q7',
        text: 'WAF Rate-Based Rule — איך עובד?',
        options: [
          'חוסם IP לצמיתות אחרי בקשה אחת',
          'בודק Rate של API Gateway בלבד',
          'סופר בקשות לפי IP ב-5 דקות; אם >threshold → חוסם IP אוטומטית; נפתח אחרי שהRate יורד',
          'מגביל bandwidth לפי IP',
        ],
        correct: 2,
        explanation: 'Rate-Based Rule: threshold (לדוגמה 2,000 req/5min לIP). IP שחורג → BLOCK אוטומטי. Rule evaluation: כל 30 שניות. IP Unblocked: אחרי שRate יורד מתחת ל-threshold. שימוש: Login brute force, scraping, Credential Stuffing. ניתן להוסיף conditions (רק ל-/login path).',
      },
      {
        id: 'sec-q8',
        text: 'EC2 ב-Private Subnet צריכה להוריד Docker Images מECR. מה הפתרון ללא NAT Gateway?',
        options: [
          'אי אפשר ללא NAT',
          'להעביר את ה-EC2 ל-Public Subnet',
          'להשתמש ב-S3 Gateway Endpoint לImages',
          'ליצור Interface Endpoints לECR API וECR DKR וS3 Gateway Endpoint — תעבורה פרטית ללא Internet',
        ],
        correct: 3,
        explanation: 'ECR Pull דורש: 1) ecr.api endpoint — auth token. 2) ecr.dkr endpoint — image layers metadata. 3) S3 Gateway endpoint — image layers עצמם (נשמרים ב-S3). שלושה Endpoints → Pull מלא בלי Internet, בלי NAT. חיסכון: NAT Data Processing (~$0.045/GB) לImages גדולים.',
      },
      {
        id: 'sec-q9',
        text: 'מה GuardDuty ואיך הוא שונה מWAF?',
        options: [
          'GuardDuty = WAF Layer 7, שניהם זהים',
          'GuardDuty מנתח VPC Flow Logs, CloudTrail, DNS Logs עם ML לזיהוי איומים (מי חשוד, Crypto Mining, C2 Communication); WAF חוסם Layer 7 HTTP requests',
          'GuardDuty רק לS3',
          'GuardDuty חינמי, WAF בתשלום',
        ],
        correct: 1,
        explanation: 'GuardDuty: Threat Detection Service. מנתח Flow Logs, CloudTrail, DNS Logs, S3 Logs עם ML. מזהה: Crypto Mining (קריאות ל-mining pools), C2 Communication, Compromised Credentials, Port Scanning. WAF: חוסם HTTP requests ספציפיים בזמן אמת. GuardDuty: מגלה חדירות שכבר קרו.',
      },
      {
        id: 'sec-q10',
        text: 'VPC Endpoint Policy — מה אפשר להגביל בה?',
        options: [
          'רק Port ו-Protocol',
          'רק IAM Users',
          'Actions ב-AWS Service, Resources, ו-Principals — לדוגמה: S3 Endpoint מאפשר GetObject/PutObject רק ל-Bucket ספציפי, לא לכל S3 ב-AWS',
          'Bandwidth בלבד',
        ],
        correct: 2,
        explanation: 'VPC Endpoint Policy: IAM-like policy על ה-Endpoint. דוגמה: {"Effect":"Allow","Principal":"*","Action":["s3:GetObject","s3:PutObject"],"Resource":"arn:aws:s3:::my-bucket/*"}. מגבילה: אילו Actions מותרות, אילו Resources (Buckets), אילו Principals. הגנה: מניעת Exfiltration לS3 Buckets זרים.',
      },
    ],
  },

  {
    id: 'transit-gateway',
    title: 'Transit Gateway ורשתות מורכבות',
    summary: 'Hub-and-Spoke, Multi-VPC, Multi-Account, Multi-Region, Hybrid Architecture',
    emoji: '🕸️',
    content: [
      { type: 'heading', text: 'בעיית Hub-and-Spoke' },
      {
        type: 'text',
        text: 'ארגון עם 10 VPCs שצריכים לתקשר ביניהם: עם VPC Peering צריך 10×9/2 = 45 Peerings + כל Route Table. עם Transit Gateway (TGW): כל VPC מתחבר ל-TGW יחיד (Hub), ו-TGW מנתב ביניהם. פשוט, מדרגי, מנוהל.',
      },
      {
        type: 'code',
        lang: 'text',
        caption: 'Transit Gateway — Hub-and-Spoke',
        code: `         ┌──────────────────────────────────┐
         │        Transit Gateway           │
         │     (Regional Hub Router)        │
         └──┬───────┬──────┬───────┬────────┘
            │       │      │       │
          VPC-A   VPC-B  VPC-C  VPC-D    ← Attachments
          Dev     Prod   Shared  DMZ
          10.1    10.2   10.3    10.4

Plus:
  ├── VPN Attachment    ← On-Premises Office
  ├── DX Attachment     ← Direct Connect
  └── TGW Peering       ← TGW ב-Region אחר

TGW Route Tables:
  Spoke RT (Dev/Prod):
    10.3.0.0/16 → Shared VPC attachment
    0.0.0.0/0   → VPN/DX attachment
  Shared RT: מתיר הכל`,
      },
      { type: 'heading', text: 'AWS Network Manager' },
      {
        type: 'text',
        text: 'Network Manager מספק ממשק גלובלי לניהול ו-Visibility של רשת מורכבת: TGWs, VPNs, Direct Connects, SD-WAN. כולל Topology Map, Route Analyzer, Event Monitoring, CloudWatch Metrics. מאפשר לראות את ה-Network כולו ממקום אחד.',
      },
      {
        type: 'table',
        caption: 'השוואה: VPC Peering vs Transit Gateway',
        headers: ['מאפיין', 'VPC Peering', 'Transit Gateway'],
        rows: [
          ['Transitive', 'לא', 'כן'],
          ['Cross-Region', 'כן', 'כן (TGW Peering)'],
          ['Cross-Account', 'כן', 'כן (RAM Sharing)'],
          ['Complexity (10 VPCs)', '45 Peerings', '10 Attachments'],
          ['Route Management', 'ידני בכל RT', 'מרכזי ב-TGW RT'],
          ['עלות', 'Data transfer בלבד', '$0.05/attachment/שעה + data'],
          ['Bandwidth', 'ללא הגבלה', 'Up to 50Gbps/attachment'],
        ],
      },
      { type: 'tip', text: 'Multi-Account Network Architecture: AWS Organizations + Transit Gateway Resource Sharing (AWS RAM). TGW מרכזי ב-Network Account → כל Spoke Accounts מתחברים דרך RAM Sharing. Shared Services VPC (DNS, AD, Monitoring) מחובר ל-TGW ונגיש מכל Spokes.' },
    ],
    questionBank: [
      {
        id: 'tgw-q1',
        text: 'מה היתרון העיקרי של Transit Gateway על VPC Peering ברשת עם 20 VPCs?',
        options: [
          'Transit Gateway חינמי, VPC Peering יקר',
          'Transit Gateway מהיר יותר מVPC Peering',
          'עם TGW: 20 Attachments. עם Peering: 190 Peerings. TGW הוא Transitive, ניהול מרכזי, פשוט הרבה יותר',
          'TGW עובד בין Regions, Peering לא',
        ],
        correct: 2,
        explanation: 'N VPCs עם Full Mesh Peering: N×(N-1)/2. 20 VPCs = 190 Peerings! כל VPC → Route Table entries לכולם. TGW: 20 Attachments, Route Table מרכזית. Transitive: A↔TGW↔B↔TGW↔C. Peering: לא Transitive. TGW גם תומך ב-VPN, DX, Multi-Region.',
      },
      {
        id: 'tgw-q2',
        text: 'מה AWS Resource Access Manager (RAM) עם Transit Gateway?',
        options: [
          'RAM מגדיל RAM (זיכרון) של TGW',
          'RAM מאפשר שיתוף TGW שנוצר ב-Account מרכזי עם Accounts אחרים ב-Organization — ללא יצירת TGW נפרד לכל Account',
          'RAM מנהל Routing Tables של TGW',
          'RAM = Read Access Mode לTGW',
        ],
        correct: 1,
        explanation: 'AWS RAM: שיתוף AWS Resources בין Accounts. TGW + RAM: Network Account יוצר TGW → משתף עם Organization/OUs דרך RAM → Spoke Accounts יוצרים Attachments → תנועה עוברת דרך TGW מרכזי. ללא RAM: כל Account חייב TGW משלו.',
      },
      {
        id: 'tgw-q3',
        text: 'TGW Route Tables — מה ניתן להגדיר בהן?',
        options: [
          'Route Tables בTGW זהות לRoute Tables ב-VPC',
          'הגדרת מי מדבר עם מי: כל Attachment יכול להיות associated ל-RT ולpropagat ל-RTs אחרות — מאפשר Segmentation (Dev לא מדבר עם Prod)',
          'רק Static Routes',
          'Only BGP Dynamic Routes',
        ],
        correct: 2,
        explanation: 'TGW Route Tables: הגמישות = Segmentation. Spoke RT: Dev ו-Prod associated, Shared propagated. Inspection RT: כל תעבורה → Firewall VPC. Association: ממה RT הAttachment שולח. Propagation: ל-RT זו ה-Attachment "מכריז" Routes. ניתן לשלוח תעבורה דרך Firewall בInspection VPC לפני הגעה ל-Destination.',
      },
      {
        id: 'tgw-q4',
        text: 'Centralized Egress Architecture — מה זה?',
        options: [
          'IGW מרכזי לכל ה-Region',
          'S3 Bucket מרכזי לLogs',
          'Egress VPC אחד עם NAT Gateway + TGW — כל Spoke VPCs מנתבים Internet traffic דרך Egress VPC בלבד — חיסכון בעלויות NAT ופשטות',
          'Centralized DNS Resolver',
        ],
        correct: 3,
        explanation: 'Centralized Egress: במקום NAT Gateway בכל VPC → VPC ייעודי עם NAT GW → TGW. Spoke VPCs: 0.0.0.0/0 → TGW → Egress VPC → NAT → Internet. יתרון: חיסכון (NAT GW ~$0.045/שעה × כל AZ × כל VPC), Fixed Egress IP ל-Whitelist. חיסכון משמעותי ב-10+ VPCs.',
      },
      {
        id: 'tgw-q5',
        text: 'TGW Peering — מה הוא מאפשר?',
        options: [
          'Peering בין TGW לVPC Peering',
          'Peering בין שני TGWs ב-Regions שונים — מאפשר Multi-Region Architecture עם ניתוב ישיר',
          'Peering בין TGW לDirect Connect',
          'TGW Peering אינו קיים',
        ],
        correct: 1,
        explanation: 'TGW Peering: TGW-us-east-1 ↔ TGW-eu-west-1. תנועה בין Regions עוברת דרך AWS Global Network (לא Internet). ניתן לבנות Global Network: כל Region עם TGW, Peering ביניהם. Static Routes בין TGWs (BGP לא נתמך בין TGWs). לHA: Redundant Peerings.',
      },
      {
        id: 'tgw-q6',
        text: 'מה Appliance Mode ב-TGW Attachment?',
        options: [
          'מצב לחיבור Home Appliances ל-AWS',
          'Cache Mode לTGW',
          'מפנה תעבורה לAZ ספציפי של VPC לשמירת Symmetry — נדרש כשFirewall Appliance ב-VPC צריך לראות תעבורה דו-כיוונית באותה instance',
          'Storage Mode לTGW',
        ],
        correct: 2,
        explanation: 'ללא Appliance Mode: TGW מנתב ל-AZ הקרוב ל-Source → Firewall ב-AZ-a לא רואה תגובה שחוזרת דרך AZ-b → Asymmetric routing → Stateful Firewall נכשל. עם Appliance Mode: TGW שולח inbound ו-outbound דרך אותה AZ → Firewall Stateful עובד נכון.',
      },
      {
        id: 'tgw-q7',
        text: 'Centralized Inspection Architecture עם TGW וFirewall VPC:',
        options: [
          'Firewall ב-כל VPC בנפרד',
          'TGW מבצע Firewall בעצמו',
          'כל East-West תעבורה בין VPCs עוברת דרך Inspection VPC עם AWS Network Firewall → בדיקה → TGW → Destination',
          'Firewall רק ל-Ingress מInternet',
        ],
        correct: 2,
        explanation: 'Centralized Inspection: TGW Route Tables: Spoke → Inspection VPC (לא ישיר ל-Destination). Inspection VPC: AWS Network Firewall בודק (IPS, TLS inspection, Domain lists). אחרי approval → TGW → Destination VPC. East-West security = תעבורה בין VPCs מבוקרת. דורש Appliance Mode.',
      },
      {
        id: 'tgw-q8',
        text: 'ארגון עם AWS Organizations ו-15 Accounts רוצה רשת מרכזית. מה הארכיטקטורה המומלצת?',
        options: [
          'VPC Peering בין כל 15 Accounts',
          'Network Account עם TGW → RAM Sharing ל-Organization → Spoke Accounts מתחברים ל-TGW המרכזי',
          'כל Account TGW משלו ללא חיבור',
          'Internet Routing בלבד בין Accounts',
        ],
        correct: 1,
        explanation: 'Landing Zone / AWS Control Tower: Network Account מרכזי. TGW ב-Network Account → AWS RAM → שיתוף עם Organization. כל Spoke Account: TGW Attachment → נגיש לכל ה-Network. Shared Services VPC (DNS/AD) ב-Network Account. Security: Centralized Inspection VPC.',
      },
      {
        id: 'tgw-q9',
        text: 'AWS Network Manager Route Analyzer — מה הוא עושה?',
        options: [
          'מנתח ביצועי רשת (latency/bandwidth)',
          'מנתח Route Tables של TGW לזיהוי path שתעבורה תעבור בין Source לDestination, כולל Route Propagation ו-Blackhole Routes',
          'Packet Capture כלי',
          'DNS Analyzer',
        ],
        correct: 1,
        explanation: 'Route Analyzer: שאל "איך תגיע תעבורה מVPC-A ל-VPC-B?" → ניתוח Route Tables של TGW → הצג path או הסבר למה Blackhole. Blackhole Route: Destination ב-Route Table אך Attachment לא קיים/לא מחובר. כלי debugging ל-TGW complexity.',
      },
      {
        id: 'tgw-q10',
        text: 'SD-WAN Integration עם TGW — מה הוא מאפשר?',
        options: [
          'Software-Defined Wireless (Wi-Fi) לAWS',
          'שילוב SD-WAN Appliances (Cisco, VMware) כTGW Connect Attachments — GRE Tunnels + BGP, bandwidth גבוה יותר מVPN רגיל',
          'Storage Defined Wide Area Network',
          'SD-WAN רק עם Direct Connect',
        ],
        correct: 1,
        explanation: 'TGW Connect: SD-WAN Appliance (ב-VPC) ↔ GRE Tunnel ↔ TGW. BGP Peering מעל GRE. יתרון על VPN: עד 20Gbps (לעומת 1.25Gbps ל-VPN Tunnel), ECMP לHA. תומך ב-Cisco, VMware, Fortinet SD-WAN. Branch Offices עם SD-WAN → TGW Connect → VPCs.',
      },
    ],
  },
]
