import type { Lesson } from '../../types'

export const devopsLessons: Lesson[] = [
  {
    id: 'linux-intro',
    title: 'מבוא ל-Linux',
    summary: 'מה זה Linux, למה כל שרת בעולם רץ עליו, ואיך מתחילים',
    emoji: '🐧',
    content: [
      { type: 'heading', text: 'מה זה Linux?' },
      {
        type: 'text',
        text: 'Linux הוא מערכת הפעלה קוד פתוח שנוצרה ב-1991 על ידי Linus Torvalds. היא מריצה מעל 90% משרתי האינטרנט, את כל ספקי הענן הגדולים, מכשירי Android, ואפילו חלליות של NASA. אם אתם עובדים בפיתוח תוכנה — תיתקלו ב-Linux.',
      },
      {
        type: 'tip',
        text: 'Linux הוא גרעין (Kernel) — ה"ליבה" של מערכת ההפעלה. מה שאנשים קוראים "Linux" הוא בעצם Distro: Ubuntu, CentOS, Debian, Fedora — כולם מבוססים על אותו Kernel.',
      },
      { type: 'heading', text: 'Distros נפוצים' },
      {
        type: 'table',
        caption: 'הפצות Linux פופולריות',
        headers: ['Distro', 'שימוש עיקרי', 'מנהל חבילות'],
        rows: [
          ['Ubuntu', 'שרתים, Desktop, ענן', 'apt'],
          ['CentOS / RHEL', 'שרתי ארגון', 'yum / dnf'],
          ['Debian', 'שרתים יציבים', 'apt'],
          ['Alpine', 'Docker Containers', 'apk'],
          ['Arch Linux', 'Power users', 'pacman'],
        ],
      },
      { type: 'heading', text: 'מבנה תיקיות ב-Linux' },
      {
        type: 'text',
        text: 'ב-Linux הכל הוא קובץ — גם התקנים וגם תהליכים. מבנה התיקיות סטנדרטי בכל ה-Distros:',
      },
      {
        type: 'table',
        caption: 'תיקיות מרכזיות ב-Linux',
        headers: ['תיקייה', 'תוכן'],
        rows: [
          ['/', 'שורש המערכת (Root)'],
          ['/home', 'תיקיות אישיות למשתמשים'],
          ['/etc', 'קבצי הגדרות המערכת'],
          ['/var/log', 'לוגים של המערכת'],
          ['/usr/bin', 'תוכנות שמותקנות'],
          ['/tmp', 'קבצים זמניים'],
          ['/proc', 'מידע על תהליכים רצים'],
        ],
      },
      { type: 'heading', text: 'פקודות בסיסיות' },
      {
        type: 'code',
        lang: 'bash',
        caption: 'ניווט וניהול קבצים',
        code: `# מיקום נוכחי:
pwd
# /home/yizi

# הצגת תוכן תיקייה:
ls -la
# -l = פירוט, -a = כולל קבצים נסתרים

# מעבר לתיקייה:
cd /var/log

# חזרה לתיקייה הקודמת:
cd -

# יצירת תיקייה:
mkdir -p projects/myapp

# יצירת קובץ:
touch app.log

# מחיקה:
rm -rf old_folder/`,
      },
      {
        type: 'code',
        lang: 'bash',
        caption: 'קריאה וחיפוש בקבצים',
        code: `# הצגת קובץ:
cat /etc/os-release

# 10 שורות אחרונות (שימושי ללוגים):
tail -f /var/log/nginx/access.log

# חיפוש טקסט בקבצים:
grep "ERROR" /var/log/app.log
grep -r "TODO" ./src/

# חיפוש קבצים:
find /etc -name "*.conf"
find . -mtime -1   # שונו ב-24 שעות האחרונות`,
      },
    ],
    questionBank: [
      {
        id: 'linux-intro-q1',
        text: 'מה אחוז שרתי האינטרנט שרצים על Linux?',
        options: ['כ-30%', 'כ-50%', 'כ-70%', 'מעל 90%'],
        correct: 3,
        explanation: 'מעל 90% משרתי האינטרנט רצים על Linux — בשל יציבות, אבטחה ועלות (קוד פתוח).',
      },
      {
        id: 'linux-intro-q2',
        text: 'איפה נמצאים קבצי ההגדרות של המערכת ב-Linux?',
        options: ['/home', '/etc', '/var', '/tmp'],
        correct: 1,
        explanation: '/etc מכיל את קבצי ההגדרות של המערכת והשירותים — nginx.conf, ssh/sshd_config ועוד.',
      },
      {
        id: 'linux-intro-q3',
        text: 'מה הפקודה לצפייה חיה בלוג (שורות חדשות בזמן אמת)?',
        options: ['cat logfile', 'grep logfile', 'tail -f logfile', 'head logfile'],
        correct: 2,
        explanation: 'tail -f (follow) מציג את סוף הקובץ ומתעדכן בזמן אמת כשנכתבות שורות חדשות — מושלם ללוגים.',
      },
      {
        id: 'linux-intro-q4',
        text: 'מה ההבדל בין Linux Kernel ל-Linux Distro?',
        options: [
          'הם אותו הדבר',
          'Kernel הוא ליבת מערכת ההפעלה, Distro הוא חבילה שכוללת Kernel + כלים + מנהל חבילות',
          'Distro הוא גרסה ישנה יותר של Kernel',
          'Kernel הוא GUI, Distro הוא Terminal',
        ],
        correct: 1,
        explanation: 'ה-Kernel הוא ליבת המערכת שמנהלת חומרה ותהליכים. Distro (כמו Ubuntu, CentOS) הוא חבילה מלאה הכוללת Kernel + כלים + מנהל חבילות + ממשק.',
      },
      {
        id: 'linux-intro-q5',
        text: 'איזה מנהל חבילות משתמש Ubuntu?',
        options: ['yum', 'pacman', 'apt', 'apk'],
        correct: 2,
        explanation: 'Ubuntu ו-Debian משתמשות ב-apt (Advanced Package Tool). CentOS/RHEL משתמשות ב-yum/dnf, Arch ב-pacman, Alpine ב-apk.',
      },
      {
        id: 'linux-intro-q6',
        text: 'מה עושה הפקודה ls -la?',
        options: [
          'מוחקת כל הקבצים',
          'מציגה רשימה מפורטת כולל קבצים נסתרים (שמתחילים ב-.)',
          'יוצרת תיקייה חדשה',
          'מציגה רק תיקיות',
        ],
        correct: 1,
        explanation: '-l = פורמט מפורט (הרשאות, גודל, תאריך), -a = all כולל קבצים נסתרים שמתחילים ב-. כמו .bashrc, .gitignore.',
      },
      {
        id: 'linux-intro-q7',
        text: 'מה מכיל /var/log?',
        options: [
          'קבצי הגדרות המערכת',
          'תוכנות מותקנות',
          'לוגים של המערכת והשירותים',
          'קבצים זמניים',
        ],
        correct: 2,
        explanation: '/var/log מכיל לוגים — /var/log/syslog, /var/log/nginx/access.log וכו׳. זה המקום הראשון לבדוק כשיש בעיה.',
      },
      {
        id: 'linux-intro-q8',
        text: 'מה הפקודה לחיפוש קבצים עם סיומת .conf בכל /etc?',
        options: [
          'grep .conf /etc',
          'ls -r /etc .conf',
          'find /etc -name "*.conf"',
          'search /etc *.conf',
        ],
        correct: 2,
        explanation: 'find מחפש קבצים לפי קריטריונים. find /etc -name "*.conf" מחפש בתיקיית /etc כל קובץ שמסתיים ב-.conf.',
      },
      {
        id: 'linux-intro-q9',
        text: 'מה עושה mkdir -p projects/myapp?',
        options: [
          'יוצר רק את תיקיית myapp',
          'יוצר את projects ו-myapp בתוכה בפעולה אחת, גם אם projects לא קיימת',
          'מגביל הרשאות',
          'מחפש תיקיות קיימות',
        ],
        correct: 1,
        explanation: '-p (parents) יוצר את כל שרשרת התיקיות אם לא קיימות, ולא נכשל אם הן כבר קיימות — מאוד שימושי בסקריפטים.',
      },
      {
        id: 'linux-intro-q10',
        text: 'מה תפקיד /proc ב-Linux?',
        options: [
          'תיקיית הפרויקטים של המשתמש',
          'קבצי תוכנות',
          'ממשק וירטואלי לתהליכים רצים ומידע על הגרעין',
          'גיבויים',
        ],
        correct: 2,
        explanation: '/proc הוא filesystem וירטואלי שחושף מידע על תהליכים ומשאבי מערכת בזמן אמת. /proc/1 = מידע על init, /proc/cpuinfo = מידע על CPU.',
      },
      {
        id: 'linux-intro-q11',
        text: 'מה עושה grep -r "ERROR" ./src/?',
        options: [
          'מחפש ERROR רק בקובץ אחד',
          'מחפש את המחרוזת ERROR בכל הקבצים שתחת ./src/ רקורסיבית',
          'מחליף ERROR בכל הקבצים',
          'מונה שורות שמכילות ERROR',
        ],
        correct: 1,
        explanation: 'grep -r (recursive) מחפש את הדפוס בכל הקבצים שתחת הנתיב שצוין. הכרחי לחיפוש ב-codebase שלם.',
      },
    ],
  },

  {
    id: 'linux-permissions',
    title: 'הרשאות ומשתמשים',
    summary: 'chmod, chown, sudo — מי יכול לעשות מה ב-Linux',
    emoji: '🔐',
    content: [
      { type: 'heading', text: 'מודל ההרשאות ב-Linux' },
      {
        type: 'text',
        text: 'כל קובץ ב-Linux שייך למשתמש ולקבוצה, ויש לו שלוש רמות הרשאה: Owner (הבעלים), Group (הקבוצה), Others (כולם אחרים). לכל רמה יש שלושה ביטים: Read (r), Write (w), Execute (x).',
      },
      {
        type: 'code',
        lang: 'bash',
        caption: 'קריאת הרשאות',
        code: `ls -la
# -rw-r--r-- 1 yizi developers 4096 May 18 10:00 app.conf
#  ^^^^^^^^^
#  |└┘└┘└┘
#  | │  │  └─ Others: r-- = קריאה בלבד
#  | │  └──── Group:  r-- = קריאה בלבד
#  | └──────── Owner: rw- = קריאה + כתיבה
#  └────────── סוג: - קובץ, d תיקייה, l קישור`,
      },
      { type: 'heading', text: 'chmod — שינוי הרשאות' },
      {
        type: 'code',
        lang: 'bash',
        caption: 'chmod — שיטה מספרית וסמלית',
        code: `# שיטה מספרית (octal):
# r=4, w=2, x=1
chmod 755 script.sh
# 7 = rwx (owner), 5 = r-x (group), 5 = r-x (others)

chmod 644 config.conf
# 6 = rw- (owner), 4 = r-- (group), 4 = r-- (others)

chmod 600 private.key
# רק הבעלים יכול לקרוא ולכתוב

# שיטה סמלית:
chmod +x script.sh       # הוספת Execute לכולם
chmod u+x,g-w script.sh  # owner מקבל x, group מאבד w
chmod o-rwx secret.txt   # Others — ללא הרשאות`,
      },
      { type: 'heading', text: 'chown — שינוי בעלות' },
      {
        type: 'code',
        lang: 'bash',
        caption: 'chown — שינוי בעלים וקבוצה',
        code: `# שינוי בעלים:
sudo chown yizi file.txt

# שינוי בעלים וקבוצה:
sudo chown yizi:developers file.txt

# רקורסיבי על תיקייה שלמה:
sudo chown -R www-data:www-data /var/www/html`,
      },
      { type: 'heading', text: 'sudo — הרצה כ-Root' },
      {
        type: 'text',
        text: 'sudo (Super User Do) מאפשר למשתמש רגיל להריץ פקודות עם הרשאות Root. הגדרות sudo נמצאות בקובץ /etc/sudoers.',
      },
      {
        type: 'code',
        lang: 'bash',
        caption: 'sudo ועבודה עם משתמשים',
        code: `# הרצה כ-root:
sudo apt update

# מעבר למשתמש root:
sudo su -

# יצירת משתמש חדש:
sudo useradd -m -s /bin/bash newuser
sudo passwd newuser

# הוספה לקבוצת sudo:
sudo usermod -aG sudo newuser

# הצגת קבוצות של משתמש:
groups newuser`,
      },
      {
        type: 'tip',
        text: 'כלל הזהב: אל תריצו הכל כ-root. השתמשו ב-sudo רק כשצריך. קובץ שנוצר כ-root ב-/var/www עלול לשבור אפליקציה שרצה כ-www-data.',
      },
    ],
    questionBank: [
      {
        id: 'linux-perm-q1',
        text: 'מה המשמעות של chmod 755 לקובץ?',
        options: [
          'רק הבעלים יכול לקרוא',
          'בעלים: rwx, קבוצה: r-x, אחרים: r-x',
          'בעלים: rw-, קבוצה: r--, אחרים: r--',
          'גישה מלאה לכולם',
        ],
        correct: 1,
        explanation: '7=rwx (בעלים), 5=r-x (קבוצה), 5=r-x (אחרים). קובץ scripts בדרך כלל מקבל 755.',
      },
      {
        id: 'linux-perm-q2',
        text: 'מה הפקודה לשינוי בעלות קובץ ל-www-data?',
        options: [
          'chmod www-data file.txt',
          'chown www-data file.txt',
          'sudo file.txt www-data',
          'usermod www-data file.txt',
        ],
        correct: 1,
        explanation: 'chown (Change Owner) משנה את בעלות הקובץ. לרוב נדרש sudo: sudo chown www-data file.txt',
      },
      {
        id: 'linux-perm-q3',
        text: 'מה ערך chmod הנכון לקובץ מפתח פרטי (SSH private key)?',
        options: ['777', '755', '644', '600'],
        correct: 3,
        explanation: '600 = rw------- — רק הבעלים יכול לקרוא ולכתוב. SSH מסרב לעבוד אם ה-private key נגיש לאחרים.',
      },
      {
        id: 'linux-perm-q4',
        text: 'מה משמעות הביט x (Execute) על תיקייה?',
        options: [
          'מאפשר להריץ את התיקייה כתוכנית',
          'מאפשר להיכנס לתיקייה עם cd ולגשת לתוכן שלה',
          'מאפשר לקרוא את שמות הקבצים',
          'אין משמעות על תיקיות',
        ],
        correct: 1,
        explanation: 'על תיקיות x = Execute פירושו הרשאת traverse — להיכנס לתיקייה ולגשת לקבצים בתוכה. בלי x אי אפשר לעשות cd לתוכה.',
      },
      {
        id: 'linux-perm-q5',
        text: 'למה chmod 777 נחשב מסוכן?',
        options: [
          'הוא מוחק את הקובץ',
          'הוא נותן גישה מלאה (קריאה, כתיבה, הרצה) לכל משתמש במערכת',
          'הוא עובד רק כ-root',
          'הוא לא מסוכן, זה פורמט לא תקין',
        ],
        correct: 1,
        explanation: '777 = rwxrwxrwx — כל משתמש במערכת יכול לקרוא, לכתוב ולהריץ. בשרת עם משתמשים מרובים זה חשיפת אבטחה חמורה.',
      },
      {
        id: 'linux-perm-q6',
        text: 'מה עושה sudo usermod -aG sudo newuser?',
        options: [
          'מוחק את newuser',
          'מוסיף את newuser לקבוצת sudo כדי שיוכל להשתמש ב-sudo',
          'משנה את הסיסמה של newuser',
          'מנעל את חשבון newuser',
        ],
        correct: 1,
        explanation: 'usermod -aG מוסיף משתמש לקבוצה (-a = append, -G = group). הוספה לקבוצת sudo מעניקה הרשאה להשתמש ב-sudo על Ubuntu.',
      },
      {
        id: 'linux-perm-q7',
        text: 'מה ההבדל בין chmod u+x ל-chmod +x?',
        options: [
          'אין הבדל',
          'u+x מוסיף execute לבעלים בלבד; +x מוסיף execute לכולם (owner, group, others)',
          'chmod +x מוסיף רק לקבוצה',
          'u+x הוא פורמט לא תקין',
        ],
        correct: 1,
        explanation: 'u = user (owner), g = group, o = others, a = all. chmod u+x משנה רק הרשאת הבעלים; chmod +x (ללא prefix) שווה ל-a+x — לכולם.',
      },
      {
        id: 'linux-perm-q8',
        text: 'מה המשמעות של התו d בתחילת שורת ls -l?',
        options: [
          'd = deleted, הקובץ נמחק',
          'd = directory, הרשומה היא תיקייה',
          'd = daemon, תהליך רקע',
          'd = data, קובץ נתונים',
        ],
        correct: 1,
        explanation: 'התו הראשון בפלט ls -l מציין סוג הרשומה: - = קובץ רגיל, d = directory (תיקייה), l = symbolic link, c = character device.',
      },
      {
        id: 'linux-perm-q9',
        text: 'מה עושה sudo chown -R www-data:www-data /var/www/html?',
        options: [
          'משנה הרשאות רקורסיבית',
          'משנה בעלות וקבוצה רקורסיבית לכל הקבצים תחת /var/www/html ל-www-data',
          'מוחק תיקייה',
          'יוצר משתמש www-data',
        ],
        correct: 1,
        explanation: 'chown -R = recursive, user:group = בעלים וקבוצה. www-data הוא המשתמש שתחתו רץ nginx/apache — חיוני שהשרת יוכל לקרוא את הקבצים.',
      },
      {
        id: 'linux-perm-q10',
        text: 'מה תפקיד /etc/sudoers?',
        options: [
          'מכיל את רשימת המשתמשים',
          'מגדיר מי רשאי להשתמש ב-sudo ועם אלו הרשאות',
          'מכיל סיסמאות מוצפנות',
          'מנהל את קבוצות המשתמשים',
        ],
        correct: 1,
        explanation: '/etc/sudoers מגדיר בדיוק מה מותר לכל משתמש/קבוצה להריץ עם sudo. עורכים אותו עם visudo (שמונע שגיאות תחביר).',
      },
      {
        id: 'linux-perm-q11',
        text: 'מה ערך chmod הנכון לקובץ הגדרות שצריך להיות קריא לכולם אך ניתן לשינוי רק לבעלים?',
        options: ['777', '755', '644', '700'],
        correct: 2,
        explanation: '644 = rw-r--r-- — בעלים יכול לקרוא ולכתוב (6), קבוצה ואחרים יכולים רק לקרוא (4). זה הברירת מחדל לקבצי הגדרות.',
      },
    ],
  },

  {
    id: 'linux-processes',
    title: 'תהליכים ושירותים',
    summary: 'ps, top, systemctl — ניהול תהליכים ושירותים שרצים ברקע',
    emoji: '⚙️',
    content: [
      { type: 'heading', text: 'תהליכים ב-Linux' },
      {
        type: 'text',
        text: 'כל תוכנית שרצה ב-Linux היא תהליך (Process) עם PID ייחודי. תהליכים יכולים לרוץ בחזית (Foreground) או ברקע (Background). כל תהליך נוצר על ידי תהליך אב — ה-init (PID 1) הוא אבי כל התהליכים.',
      },
      {
        type: 'code',
        lang: 'bash',
        caption: 'ניטור תהליכים',
        code: `# הצגת כל התהליכים:
ps aux
# USER  PID %CPU %MEM  COMMAND
# root    1  0.0  0.1  /sbin/init

# תהליכים אינטראקטיביים (כמו Task Manager):
top
# או גרסה ידידותית יותר:
htop

# מציאת תהליך לפי שם:
ps aux | grep nginx
pgrep nginx

# כמה זיכרון משתמשים:
free -h
df -h   # שימוש בדיסק`,
      },
      { type: 'heading', text: 'הרגת תהליכים' },
      {
        type: 'code',
        lang: 'bash',
        caption: 'kill — שליחת Signals לתהליכים',
        code: `# עצירה מסודרת (SIGTERM):
kill 1234
kill -15 1234

# עצירה מידית (SIGKILL) — לא ניתן לחסום:
kill -9 1234

# הרגה לפי שם:
pkill nginx
killall nginx

# reload קובץ הגדרות ללא restart:
kill -HUP $(pgrep nginx)`,
      },
      { type: 'heading', text: 'systemctl — ניהול שירותים' },
      {
        type: 'text',
        text: 'systemd הוא מערכת ה-init המודרנית ב-Linux. systemctl הוא הכלי לניהול שירותים (Services) — תהליכים שרצים ברקע ומתחילים עם המערכת.',
      },
      {
        type: 'code',
        lang: 'bash',
        caption: 'systemctl — ניהול שירותים',
        code: `# הפעלה/עצירה/הפעלה מחדש:
sudo systemctl start nginx
sudo systemctl stop nginx
sudo systemctl restart nginx

# Reload הגדרות ללא הפרעה לתעבורה:
sudo systemctl reload nginx

# הפעלה אוטומטית עם האתחול:
sudo systemctl enable nginx
sudo systemctl disable nginx

# סטטוס שירות:
sudo systemctl status nginx

# לוגים של שירות:
journalctl -u nginx -f
journalctl -u nginx --since "1 hour ago"`,
      },
      { type: 'heading', text: 'הרצה ברקע' },
      {
        type: 'code',
        lang: 'bash',
        caption: 'ניהול תהליכים ב-Background',
        code: `# הרצה ברקע:
./long_script.sh &

# הצגת תהליכי רקע:
jobs

# החזרה לחזית:
fg %1

# המשך ריצה גם אחרי סגירת הטרמינל:
nohup ./script.sh &

# כלי screen — סשן שנשאר חי:
screen -S mysession
# ... הרצת קוד ...
# Ctrl+A D  לניתוק מבלי לעצור
screen -r mysession  # חיבור מחדש`,
      },
    ],
    questionBank: [
      {
        id: 'linux-proc-q1',
        text: 'מה ה-PID של תהליך init — אב כל התהליכים?',
        options: ['0', '1', '100', 'תלוי במערכת'],
        correct: 1,
        explanation: 'init (או systemd) תמיד מקבל PID=1. הוא התהליך הראשון שמופעל בעלייה ואב כל שאר התהליכים.',
      },
      {
        id: 'linux-proc-q2',
        text: 'מה ההבדל בין kill -9 ל-kill (ללא דגל)?',
        options: [
          'אין הבדל',
          'kill -9 שולח SIGTERM, kill שולח SIGKILL',
          'kill שולח SIGTERM (ניתן ליירוט), kill -9 שולח SIGKILL (לא ניתן ליירוט)',
          'kill -9 מוחק את הקובץ',
        ],
        correct: 2,
        explanation: 'kill ללא דגל שולח SIGTERM — מאפשר לתהליך לסגור בסדר (לשמור מצב). kill -9 שולח SIGKILL — מסיים מיד, לא ניתן ליירוט.',
      },
      {
        id: 'linux-proc-q3',
        text: 'מה הפקודה לצפייה בלוגים של שירות nginx בזמן אמת?',
        options: [
          'systemctl logs nginx',
          'journalctl -u nginx -f',
          'tail nginx.service',
          'ps aux nginx',
        ],
        correct: 1,
        explanation: 'journalctl -u nginx -f מציג לוגים של שירות nginx ועוקב אחר שורות חדשות (-f = follow).',
      },
      {
        id: 'linux-proc-q4',
        text: 'מה עושה הפקודה ps aux?',
        options: [
          'מציגה רק תהליכים של המשתמש הנוכחי',
          'מציגה את כל התהליכים הרצים במערכת עם מידע על CPU ו-RAM',
          'מסיימת תהליכים',
          'מציגה שימוש בדיסק',
        ],
        correct: 1,
        explanation: 'ps aux: a = כל המשתמשים, u = פורמט עם שם משתמש/CPU/RAM, x = כולל תהליכים ללא terminal. נותן תמונה מלאה של כל מה שרץ.',
      },
      {
        id: 'linux-proc-q5',
        text: 'מה Signal שולח Ctrl+C?',
        options: ['SIGKILL (9)', 'SIGTERM (15)', 'SIGINT (2)', 'SIGHUP (1)'],
        correct: 2,
        explanation: 'Ctrl+C שולח SIGINT (Signal Interrupt, 2) — מבקש מהתהליך להפסיק. ניתן לתפוס אותו בקוד. SIGKILL לא ניתן לתפיסה.',
      },
      {
        id: 'linux-proc-q6',
        text: 'מה עושה nohup ./script.sh &?',
        options: [
          'מריץ סקריפט עם הרשאות root',
          'מריץ סקריפט ברקע שממשיך לרוץ גם לאחר סגירת הטרמינל',
          'מחכה לסיום הסקריפט',
          'מריץ סקריפט כל דקה',
        ],
        correct: 1,
        explanation: 'nohup מתעלם מ-SIGHUP (שנשלח כשהטרמינל נסגר), & מריץ ברקע. ביחד — הסקריפט ממשיך לרוץ גם לאחר logout.',
      },
      {
        id: 'linux-proc-q7',
        text: 'מה עושה systemctl enable nginx?',
        options: [
          'מפעיל את nginx עכשיו',
          'מגדיר ש-nginx יתחיל אוטומטית בכל אתחול המערכת',
          'בודק אם nginx מותקן',
          'מציג לוגים של nginx',
        ],
        correct: 1,
        explanation: 'systemctl enable יוצר symlink ב-systemd שגורם לשירות להתחיל בעלייה. systemctl start מפעיל מיידית. לרוב עושים גם start וגם enable.',
      },
      {
        id: 'linux-proc-q8',
        text: 'מה זה Daemon ב-Linux?',
        options: [
          'תוכנה זדונית',
          'שירות שרץ ברקע, מתחיל עם המערכת, ומספק שירות מתמשך',
          'תהליך ראשי של המשתמש',
          'קובץ מערכת',
        ],
        correct: 1,
        explanation: 'Daemon הוא תהליך שרת שרץ ברקע ללא אינטראקציה עם משתמש — nginx, sshd, postgresql. שמות Daemons נגמרים לרוב ב-d.',
      },
      {
        id: 'linux-proc-q9',
        text: 'מה הפקודה לצפייה בשימוש בדיסק בפורמט קריא?',
        options: ['ps aux', 'top', 'df -h', 'ls -la'],
        correct: 2,
        explanation: 'df (disk free) -h (human-readable) מציג שימוש בכל מחיצות הדיסק. free -h מציג שימוש בRAM.',
      },
      {
        id: 'linux-proc-q10',
        text: 'מה עושה pkill nginx?',
        options: [
          'מציאת התהליך nginx',
          'שולח SIGTERM לכל התהליכים ששמם nginx',
          'מתקין nginx',
          'מאתחל את nginx',
        ],
        correct: 1,
        explanation: 'pkill שולח Signal (SIGTERM כברירת מחדל) לתהליכים לפי שם — שימושי יותר מ-kill שדורש PID. killall עושה אותו הדבר.',
      },
      {
        id: 'linux-proc-q11',
        text: 'מה ההבדל בין systemctl restart ל-systemctl reload?',
        options: [
          'אין הבדל',
          'restart עוצר ומפעיל מחדש את התהליך; reload מטעין מחדש את ההגדרות ללא הפסקה',
          'reload עוצר לחלוטין, restart מחיה מחדש',
          'reload רק ל-nginx, restart לכל שאר השירותים',
        ],
        correct: 1,
        explanation: 'restart = stop + start (ניתוק חיבורים קיימים). reload = SIGHUP — הגדרות נטענות מחדש ללא עצירה. לנginx עם תעבורה פעילה, reload עדיף.',
      },
    ],
  },

  {
    id: 'devops-docker',
    title: 'Docker — קונטיינרים',
    summary: 'בנייה, הרצה וניהול קונטיינרים — הכלי שמפשט deploy',
    emoji: '🐳',
    content: [
      { type: 'heading', text: 'מה זה Docker?' },
      {
        type: 'text',
        text: 'Docker מאפשר לארוז אפליקציה עם כל התלויות שלה ל"קונטיינר" — חבילה שרצה זהה בכל סביבה. "Works on my machine" הפך ל-"Works everywhere". קונטיינרים קלים יותר ומהירים יותר ממכונות וירטואליות.',
      },
      {
        type: 'table',
        caption: 'VM vs Container',
        headers: ['נושא', 'Virtual Machine', 'Container'],
        rows: [
          ['גודל', 'GB', 'MB'],
          ['זמן הפעלה', 'דקות', 'שניות'],
          ['בידוד', 'מלא (Kernel נפרד)', 'חלקי (Kernel משותף)'],
          ['שימוש בזיכרון', 'גבוה', 'נמוך'],
          ['ניידות', 'טובה', 'מעולה'],
        ],
      },
      { type: 'heading', text: 'Dockerfile — מתכון לקונטיינר' },
      {
        type: 'code',
        lang: 'dockerfile',
        caption: 'Dockerfile לאפליקציית Node.js',
        code: `# שכבת בסיס:
FROM node:20-alpine

# תיקיית עבודה בתוך הקונטיינר:
WORKDIR /app

# העתקת קבצי dependencies ראשון (cache optimization):
COPY package*.json ./
RUN npm ci --only=production

# העתקת שאר הקוד:
COPY . .

# פורט שהאפליקציה מאזינה:
EXPOSE 3000

# פקודת הפעלה:
CMD ["node", "server.js"]`,
      },
      { type: 'heading', text: 'פקודות Docker בסיסיות' },
      {
        type: 'code',
        lang: 'bash',
        caption: 'בניה והרצת קונטיינרים',
        code: `# בניית Image:
docker build -t myapp:1.0 .

# הרצת קונטיינר:
docker run -d -p 3000:3000 --name myapp myapp:1.0
# -d = detached (ברקע)
# -p 3000:3000 = host:container port mapping

# הצגת קונטיינרים רצים:
docker ps

# לוגים:
docker logs -f myapp

# כניסה לתוך קונטיינר:
docker exec -it myapp sh

# עצירה ומחיקה:
docker stop myapp
docker rm myapp

# הצגת Images:
docker images
docker rmi myapp:1.0`,
      },
      { type: 'heading', text: 'Docker Compose — ריבוי שירותים' },
      {
        type: 'text',
        text: 'Docker Compose מאפשר להגדיר ולהריץ ריבוי קונטיינרים יחד עם קובץ YAML אחד. מושלם לסביבת פיתוח עם אפליקציה + מסד נתונים + Redis.',
      },
      {
        type: 'code',
        lang: 'yaml',
        caption: 'docker-compose.yml — אפליקציה + PostgreSQL',
        code: `version: '3.8'

services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - DATABASE_URL=postgres://user:pass@db:5432/mydb
    depends_on:
      - db
    volumes:
      - .:/app          # mount קוד לפיתוח
      - /app/node_modules

  db:
    image: postgres:15
    environment:
      POSTGRES_USER: user
      POSTGRES_PASSWORD: pass
      POSTGRES_DB: mydb
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  postgres_data:`,
      },
      {
        type: 'code',
        lang: 'bash',
        caption: 'הרצה עם Docker Compose',
        code: `# הפעלת כל השירותים:
docker compose up -d

# עצירה:
docker compose down

# לוגים:
docker compose logs -f app

# rebuild לאחר שינויי קוד:
docker compose up -d --build`,
      },
    ],
    questionBank: [
      {
        id: 'docker-q1',
        text: 'מה ההבדל העיקרי בין Container ל-Virtual Machine?',
        options: [
          'אין הבדל, זה אותו הדבר',
          'Container משתף את Kernel המערכת המארחת ולכן קל ומהיר יותר',
          'VM קל יותר מ-Container',
          'Container מספק בידוד מלא יותר',
        ],
        correct: 1,
        explanation: 'Container משתף את ה-Kernel עם המערכת המארחת — לכן קל (MB), מהיר (שניות הפעלה). VM כולל OS שלם — כבד (GB) ואיטי יותר.',
      },
      {
        id: 'docker-q2',
        text: 'מה תפקיד Dockerfile?',
        options: [
          'קובץ הגדרות לרשת',
          'מתכון להרכבת Docker Image שלב אחר שלב',
          'קובץ לניהול משתמשים',
          'קובץ לוגים',
        ],
        correct: 1,
        explanation: 'Dockerfile הוא סדרת הוראות לבניית Image — שכבת בסיס, העתקת קוד, התקנת תלויות, ופקודת הפעלה.',
      },
      {
        id: 'docker-q3',
        text: 'מה הפקודה להפעלת כל שירותי docker-compose ברקע?',
        options: [
          'docker compose start',
          'docker compose run -d',
          'docker compose up -d',
          'docker compose launch',
        ],
        correct: 2,
        explanation: 'docker compose up -d מפעיל את כל השירותים המוגדרים ב-docker-compose.yml ב-detached mode (ברקע).',
      },
      {
        id: 'docker-q4',
        text: 'מה ההבדל בין Docker Image ל-Docker Container?',
        options: [
          'אין הבדל, זה אותה המילה',
          'Image הוא תבנית/תמונה לא פעילה; Container הוא מופע רץ של Image',
          'Container הוא image שדחוס',
          'Image רץ, Container מאוחסן',
        ],
        correct: 1,
        explanation: 'Image = blueprint קפוא (כמו class). Container = מופע רץ של Image (כמו instance). אפשר להריץ מספר קונטיינרים מאותו Image.',
      },
      {
        id: 'docker-q5',
        text: 'מה משמעות -p 8080:3000 בפקודת docker run?',
        options: [
          'שני פורטים פנימיים לאפליקציה',
          'מפה פורט 8080 של המכונה המארחת לפורט 3000 בתוך הקונטיינר',
          'פורט 8080 לבדיקות, 3000 לפרודקשן',
          'מגדיר שני שירותים',
        ],
        correct: 1,
        explanation: 'הפורמט הוא host:container — גישה ל-localhost:8080 על המארח מגיעה לפורט 3000 בתוך הקונטיינר. שימושי להריץ כמה שירותים על פורטים שונים.',
      },
      {
        id: 'docker-q6',
        text: 'למה מעתיקים package.json ומריצים npm install לפני COPY . . ב-Dockerfile?',
        options: [
          'זה חובה לפי תקן Docker',
          'כדי לנצל את מטמון שכבות Docker — npm install רץ שוב רק אם package.json השתנה',
          'כדי להתקין node_modules לפני הקוד',
          'אין סיבה מיוחדת, זה סגנון בלבד',
        ],
        correct: 1,
        explanation: 'Docker מטמון כל שכבה. אם נעתיק את כל הקוד ואז npm install — כל שינוי קוד יגרום לרצות npm install מחדש. הפרדה מאפשרת cache ל-dependencies שלא השתנו.',
      },
      {
        id: 'docker-q7',
        text: 'מה עושה docker exec -it myapp sh?',
        options: [
          'מפסיק את הקונטיינר',
          'נכנס לתוך הקונטיינר הרץ ופותח shell אינטראקטיבי',
          'בונה image חדש',
          'מציג לוגים',
        ],
        correct: 1,
        explanation: 'docker exec -it: -i = interactive, -t = pseudo-TTY. מאפשר "להיכנס" לקונטיינר רץ ולהריץ פקודות בתוכו — כמו SSH לקונטיינר.',
      },
      {
        id: 'docker-q8',
        text: 'מה זה Docker Volume?',
        options: [
          'גודל ה-image',
          'אחסון מתמיד שנשאר קיים גם לאחר מחיקת הקונטיינר',
          'רשת בין קונטיינרים',
          'משאבי CPU/RAM',
        ],
        correct: 1,
        explanation: 'Volume הוא directory מחוץ למערכת הקבצים של הקונטיינר. נתוני PostgreSQL ב-Volume נשמרים גם אם הקונטיינר נמחק ומוחלף בגרסה חדשה.',
      },
      {
        id: 'docker-q9',
        text: 'מה תפקיד .dockerignore?',
        options: [
          'מגדיר הרשאות בתוך הקונטיינר',
          'מונע העתקה של קבצים מיותרים ל-Image בעת COPY . .',
          'מגדיר משתני סביבה',
          'מתעד שגיאות build',
        ],
        correct: 1,
        explanation: '.dockerignore (כמו .gitignore) מוציא קבצים מה-build context — node_modules, .git, .env — כדי ש-Image יהיה קטן יותר ובנייה מהירה יותר.',
      },
      {
        id: 'docker-q10',
        text: 'מה זה Docker Hub?',
        options: [
          'ה-CLI של Docker',
          'רישום (Registry) ציבורי לאחסון ושיתוף Docker Images',
          'כלי לניהול Kubernetes',
          'פאנל ניהול גרפי',
        ],
        correct: 1,
        explanation: 'Docker Hub הוא הרישום הציבורי — מקום שממנו מורידים Images כמו node:20, postgres:15, nginx. אפשר גם לדחוף Images משלכם.',
      },
      {
        id: 'docker-q11',
        text: 'מה עושה depends_on ב-docker-compose?',
        options: [
          'קובע את גרסת ה-image',
          'מגדיר שהשירות יתחיל רק אחרי שהשירות שהוא תלוי בו החל לרוץ',
          'מגדיר כמה קופי לשרות',
          'מעביר משתני סביבה בין שירותים',
        ],
        correct: 1,
        explanation: 'depends_on מבטיח סדר הפעלה — האפליקציה לא תתחיל לפני שה-db קם. שימו לב: זה לא מחכה שה-DB יהיה מוכן לחיבורים, רק שהקונטיינר רץ.',
      },
    ],
  },

  {
    id: 'devops-cicd',
    title: 'CI/CD — אוטומציית פריסה',
    summary: 'GitHub Actions, Pipelines — איך קוד עובר מ-commit ל-production',
    emoji: '🚀',
    content: [
      { type: 'heading', text: 'מה זה CI/CD?' },
      {
        type: 'text',
        text: 'CI (Continuous Integration) = אינטגרציה רציפה — כל push מפעיל בדיקות אוטומטיות. CD (Continuous Delivery/Deployment) = פריסה רציפה — קוד עובר אוטומטית לסביבת ייצור לאחר שעבר בדיקות. יחד הם מצמצמים שגיאות ומאיצים delivery.',
      },
      {
        type: 'table',
        caption: 'שלבי Pipeline טיפוסי',
        headers: ['שלב', 'מה קורה', 'כלים'],
        rows: [
          ['Source', 'Push לגיט — מפעיל ה-Pipeline', 'Git, GitHub, GitLab'],
          ['Build', 'קומפילציה, בניית Docker Image', 'npm, Maven, Docker'],
          ['Test', 'Unit tests, Integration tests, Linting', 'Jest, pytest, ESLint'],
          ['Security', 'סריקת חולשות, בדיקת dependencies', 'Snyk, Trivy'],
          ['Deploy Staging', 'פריסה לסביבת בדיקות', 'Kubernetes, Helm'],
          ['Deploy Prod', 'פריסה לייצור', 'Kubernetes, Terraform'],
        ],
      },
      { type: 'heading', text: 'GitHub Actions' },
      {
        type: 'text',
        text: 'GitHub Actions הוא כלי CI/CD מובנה ב-GitHub. מגדירים Workflows בקבצי YAML תחת .github/workflows/. הוא חינמי לריפוזיטוריז ציבוריים.',
      },
      {
        type: 'code',
        lang: 'yaml',
        caption: '.github/workflows/ci.yml — Pipeline בסיסי',
        code: `name: CI Pipeline

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Run linter
        run: npm run lint

      - name: Run tests
        run: npm test

      - name: Build
        run: npm run build`,
      },
      {
        type: 'code',
        lang: 'yaml',
        caption: 'שלב deploy לאחר הצלחת tests',
        code: `  deploy:
    needs: test          # מחכה שה-job test יצליח
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'   # רק מ-main

    steps:
      - uses: actions/checkout@v4

      - name: Build Docker Image
        run: |
          docker build -t myapp:\${{ github.sha }} .
          docker tag myapp:\${{ github.sha }} myapp:latest

      - name: Deploy to server
        env:
          SSH_KEY: \${{ secrets.DEPLOY_SSH_KEY }}
        run: |
          echo "$SSH_KEY" > key.pem
          chmod 600 key.pem
          ssh -i key.pem user@myserver.com "
            docker pull myapp:latest &&
            docker stop app || true &&
            docker run -d --name app -p 80:3000 myapp:latest
          "`,
      },
      { type: 'heading', text: 'סביבות (Environments)' },
      {
        type: 'text',
        text: 'סביבת פיתוח טיפוסית כוללת שלוש שכבות: Development (מחשב המפתח), Staging (מראה של Production לבדיקות), Production (סביבה חיה). קוד עובר בסדר — dev → staging → prod, עם בדיקות בכל שלב.',
      },
      {
        type: 'tip',
        text: 'Secrets כמו API Keys וסיסמאות לעולם לא נכנסים ל-Git. מאחסנים אותם ב-GitHub Secrets / AWS Secrets Manager / Azure Key Vault ומזריקים כ-Environment Variables בזמן ריצה.',
      },
    ],
    questionBank: [
      {
        id: 'cicd-q1',
        text: 'מה ההבדל בין CI ל-CD?',
        options: [
          'CI ו-CD זה אותו הדבר',
          'CI = בדיקות אוטומטיות בכל push, CD = פריסה אוטומטית לאחר הצלחת בדיקות',
          'CI = פריסה, CD = בדיקות',
          'CI מיועד ל-Frontend בלבד',
        ],
        correct: 1,
        explanation: 'CI (Continuous Integration) = אינטגרציה ובדיקות אוטומטיות. CD (Continuous Deployment) = פריסה אוטומטית לאחר הצלחת CI.',
      },
      {
        id: 'cicd-q2',
        text: 'איפה מאחסנים Secrets (API Keys, סיסמאות) ב-GitHub Actions?',
        options: [
          'ישירות בקובץ ה-YAML',
          'בקובץ .env שמועלה ל-Git',
          'ב-GitHub Secrets, ומזריקים דרך ${{ secrets.NAME }}',
          'לא ניתן להשתמש ב-Secrets ב-GitHub Actions',
        ],
        correct: 2,
        explanation: 'GitHub Secrets מאחסן ערכים מוצפנים. גורסים אותם ב-workflow דרך ${{ secrets.MY_SECRET }} — לעולם לא מועלים ל-Git.',
      },
      {
        id: 'cicd-q3',
        text: 'מה המשמעות של needs: test ב-GitHub Actions job?',
        options: [
          'Job זה מריץ tests',
          'Job זה מחכה ש-job בשם test יסתיים בהצלחה לפני שמתחיל',
          'Job זה דורש Node.js',
          'Job זה רץ במקביל ל-test',
        ],
        correct: 1,
        explanation: 'needs מגדיר תלות בין Jobs. Job עם needs: test יתחיל רק לאחר שה-job test הסתיים בהצלחה — מונע deploy כשיש כשל.',
      },
      {
        id: 'cicd-q4',
        text: 'מה ההבדל בין Continuous Delivery ל-Continuous Deployment?',
        options: [
          'הם אותו הדבר',
          'Continuous Delivery דורש אישור ידני לפני פריסה לפרודקשן; Deployment פורס אוטומטית לחלוטין',
          'Delivery מיועד לפרונטאנד, Deployment לבאקאנד',
          'Continuous Deployment איטי יותר',
        ],
        correct: 1,
        explanation: 'Delivery = הקוד מוכן לפריסה בכל רגע, אבל דורש לחיצת כפתור ידנית. Deployment = ברגע שהבדיקות עוברות, הקוד הולך לפרודקשן אוטומטית.',
      },
      {
        id: 'cicd-q5',
        text: 'מה תפקיד סביבת Staging?',
        options: [
          'סביבה לפיתוח מקומי',
          'העתק של Staging לבדיקות לפני פריסה לפרודקשן, עם נתונים אמיתיים',
          'סביבה ישנה שנפסקה',
          'סביבה לקוד open-source',
        ],
        correct: 1,
        explanation: 'Staging = סביבה מראה לפרודקשן. מאפשרת לבדוק שהכל עובד בסביבה אמיתית לפני חשיפה למשתמשים. מונעת "works on my machine".',
      },
      {
        id: 'cicd-q6',
        text: 'מה זה "green build" ב-CI/CD?',
        options: [
          'build שנבנה בצבע ירוק',
          'build שבו כל הבדיקות עברו בהצלחה',
          'build לסביבת production בלבד',
          'build מהיר',
        ],
        correct: 1,
        explanation: 'Green build = כל הבדיקות עברו (הציון הוא ירוק). Red build = בדיקות נכשלו. הצוות צריך לשמור על "green main" — main תמיד ב-build נקי.',
      },
      {
        id: 'cicd-q7',
        text: 'מה זה Artifact ב-CI/CD?',
        options: [
          'שגיאה ב-build',
          'תוצר של שלב build — קובץ binary, Docker image, חבילת npm',
          'משתנה סביבה',
          'לוג של ה-pipeline',
        ],
        correct: 1,
        explanation: 'Artifact הוא הפלט של שלב ה-build שמועבר לשלבים הבאים — compiled binary, Docker image, JAR file. שלב ה-deploy משתמש ב-artifact שנבנה.',
      },
      {
        id: 'cicd-q8',
        text: 'מה ה-trigger שגורם ל-GitHub Actions workflow להתחיל לפי הדוגמה בשיעור?',
        options: [
          'רק push ל-main',
          'push ל-main או develop, או פתיחת PR ל-main',
          'כל commit בכל branch',
          'רק ידנית',
        ],
        correct: 1,
        explanation: 'ה-workflow מוגדר עם on: push לmain/develop ו-pull_request ל-main. כך CI רץ על פיתוח שוטף ועל כל PR לפני מיזוג.',
      },
      {
        id: 'cicd-q9',
        text: 'מה פירוש "fail fast" ב-CI Pipeline?',
        options: [
          'הריצו את ה-build כמה שיותר מהר',
          'ארגנו את הבדיקות כך שבדיקות קצרות ומהירות רצות ראשונות כדי לגלות כשלים מוקדם',
          'כשלו את ה-deploy הראשון',
          'הגדרה לביטול pipeline אחרי 10 שניות',
        ],
        correct: 1,
        explanation: 'Fail fast = הריצו linting ו-unit tests לפני integration tests ו-E2E. כשל מוקדם חוסך זמן — לא כדאי לחכות 20 דקות ל-build כדי לגלות שגיאת syntax.',
      },
      {
        id: 'cicd-q10',
        text: 'מה זה Canary Deployment?',
        options: [
          'פריסה של גרסה ישנה לכל המשתמשים',
          'פריסה הדרגתית — גרסה חדשה מוצגת לאחוז קטן מהמשתמשים תחילה',
          'פריסה רק לסביבת staging',
          'פריסה שנכשלת בכוונה לבדיקה',
        ],
        correct: 1,
        explanation: 'Canary Deployment: שולחים 5% מהתעבורה לגרסה חדשה. אם ה-metrics טובים — מגדילים ל-50% ואז 100%. מקטין סיכון בפריסות.',
      },
      {
        id: 'cicd-q11',
        text: 'מה if: github.ref == \'refs/heads/main\' עושה ב-GitHub Actions?',
        options: [
          'בודק אם השם של ה-branch הוא "main"',
          'מריץ את ה-job רק כשה-push הגיע מ-branch בשם main',
          'בודק אם המשתמש הוא main',
          'בודק גרסת GitHub',
        ],
        correct: 1,
        explanation: 'תנאי זה מגביל את ה-job לרצות רק כשה-workflow מופעל מ-branch main — כך שלב ה-deploy לפרודקשן לא יופעל מ-feature branches.',
      },
    ],
  },

  {
    id: 'devops-monitoring',
    title: 'ניטור ולוגים',
    summary: 'Prometheus, Grafana, ELK — איך יודעים שהאפליקציה בריאה',
    emoji: '📊',
    content: [
      { type: 'heading', text: 'למה ניטור חשוב?' },
      {
        type: 'text',
        text: 'בלי ניטור, אתם עיוורים לגבי מה שקורה בייצור. ניטור מאפשר לדעת: האם האפליקציה פועלת? כמה זמן לוקח כל request? כמה זיכרון/CPU נצרך? מתי ולמה היה downtime?',
      },
      {
        type: 'table',
        caption: 'סוגי ניטור',
        headers: ['סוג', 'מה עוקבים', 'כלים'],
        rows: [
          ['Infrastructure', 'CPU, RAM, Disk, Network', 'Prometheus, CloudWatch'],
          ['Application', 'Latency, Error Rate, Throughput', 'Prometheus, Datadog'],
          ['Logs', 'שגיאות, אירועים, audit', 'ELK Stack, Loki'],
          ['Uptime', 'האם האפליקציה בחיים', 'Pingdom, UptimeRobot'],
          ['APM', 'ביצועי קוד פנימי', 'Datadog, New Relic'],
        ],
      },
      { type: 'heading', text: 'Prometheus + Grafana' },
      {
        type: 'text',
        text: 'Prometheus אוסף מדדים (Metrics) מהשירותים. Grafana מציג אותם כגרפים ודשבורדים. זהו הצמד הנפוץ ביותר בעולם ה-Kubernetes.',
      },
      {
        type: 'code',
        lang: 'yaml',
        caption: 'הגדרת Prometheus לאיסוף מדדים',
        code: `# prometheus.yml
global:
  scrape_interval: 15s

scrape_configs:
  - job_name: 'myapp'
    static_configs:
      - targets: ['myapp:3000']
    metrics_path: '/metrics'

  - job_name: 'node-exporter'
    static_configs:
      - targets: ['node-exporter:9100']`,
      },
      {
        type: 'code',
        lang: 'javascript',
        caption: 'חשיפת Metrics מאפליקציית Node.js',
        code: `const { register, Counter, Histogram } = require('prom-client');
const express = require('express');

const app = express();

// מונה בקשות:
const httpRequests = new Counter({
  name: 'http_requests_total',
  help: 'Total HTTP requests',
  labelNames: ['method', 'route', 'status'],
});

// מדד זמן תגובה:
const httpDuration = new Histogram({
  name: 'http_request_duration_seconds',
  help: 'HTTP request duration',
  buckets: [0.1, 0.5, 1, 2, 5],
});

app.use((req, res, next) => {
  const end = httpDuration.startTimer();
  res.on('finish', () => {
    httpRequests.inc({ method: req.method, route: req.path, status: res.statusCode });
    end({ route: req.path });
  });
  next();
});

// Endpoint שPrometheus מושך ממנו:
app.get('/metrics', async (req, res) => {
  res.set('Content-Type', register.contentType);
  res.end(await register.metrics());
});`,
      },
      { type: 'heading', text: 'Alerts — התראות' },
      {
        type: 'text',
        text: 'ניטור בלי התראות חסר תועלת. Alertmanager של Prometheus שולח התראות ל-Slack, PagerDuty, ו-Email כשמדד חורג מסף.',
      },
      {
        type: 'code',
        lang: 'yaml',
        caption: 'הגדרת Alert ב-Prometheus',
        code: `# alerts.yml
groups:
  - name: app_alerts
    rules:
      - alert: HighErrorRate
        expr: rate(http_requests_total{status=~"5.."}[5m]) > 0.1
        for: 2m
        labels:
          severity: critical
        annotations:
          summary: "שיעור שגיאות גבוה"
          description: "מעל 10% מהבקשות מחזירות 5xx ב-5 דקות האחרונות"

      - alert: HighLatency
        expr: histogram_quantile(0.95, http_request_duration_seconds) > 2
        for: 5m
        labels:
          severity: warning
        annotations:
          summary: "זמן תגובה גבוה"
          description: "P95 latency מעל 2 שניות"`,
      },
      {
        type: 'tip',
        text: 'SLO (Service Level Objective) — הגדירו יעדים: "99.9% מהבקשות יחזרו תוך 500ms". ה-Alerts שלכם צריכים לשקף חריגה מה-SLO, לא מדדים טכניים שרירותיים.',
      },
    ],
    questionBank: [
      {
        id: 'monitoring-q1',
        text: 'מה תפקיד Prometheus בסטאק ניטור?',
        options: [
          'מציג גרפים ודשבורדים',
          'אוסף מדדים (Metrics) מהשירותים בזמנים קבועים',
          'מנהל לוגים',
          'מבצע load balancing',
        ],
        correct: 1,
        explanation: 'Prometheus הוא מסד נתונים לסדרות זמן שאוסף Metrics מהשירותים (Scraping) בזמנים קבועים. Grafana מציג אותם.',
      },
      {
        id: 'monitoring-q2',
        text: 'מה זה P95 Latency?',
        options: [
          'זמן התגובה המקסימלי',
          'זמן התגובה הממוצע',
          'זמן התגובה שמתחתיו נמצאים 95% מהבקשות',
          'אחוז הבקשות שהצליחו',
        ],
        correct: 2,
        explanation: 'P95 (Percentile 95) = 95% מהבקשות הגיעו מתחת לזמן הזה. יותר מייצג מממוצע כי ממוצע מוסתר על ידי outliers.',
      },
      {
        id: 'monitoring-q3',
        text: 'מה זה SLO (Service Level Objective)?',
        options: [
          'חוזה עם הלקוח',
          'יעד מדיד לרמת השירות, למשל: 99.9% uptime',
          'כלי ניטור',
          'שפת שאילתות',
        ],
        correct: 1,
        explanation: 'SLO הוא יעד פנימי לרמת שירות — למשל "99.9% מהבקשות יסתיימו תוך 500ms". SLA הוא החוזה עם הלקוח, SLO הוא היעד הפנימי.',
      },
      {
        id: 'monitoring-q4',
        text: 'מה זה ELK Stack?',
        options: [
          'Elastic Load Balancer Kubernetes',
          'Elasticsearch + Logstash + Kibana — פלטפורמה לאיסוף, חיפוש והצגת לוגים',
          'סוג של database NoSQL',
          'כלי לניהול Docker',
        ],
        correct: 1,
        explanation: 'ELK: Elasticsearch (חיפוש ואחסון), Logstash (איסוף ועיבוד לוגים), Kibana (ממשק גרפי). מאפשר לחפש בלוגים של מאות שרתים במקום אחד.',
      },
      {
        id: 'monitoring-q5',
        text: 'כמה זמן downtime מאפשרות "שלוש תשעות" (99.9% uptime) בשנה?',
        options: ['כ-5 דקות', 'כ-45 דקות', 'כ-8.7 שעות', 'כ-3.6 ימים'],
        correct: 2,
        explanation: '99.9% = 0.1% downtime. בשנה: 365×24×0.001 ≈ 8.76 שעות. 99.99% ("ארבע תשעות") ≈ 52 דקות בשנה.',
      },
      {
        id: 'monitoring-q6',
        text: 'מה ההבדל בין Metrics ל-Logs?',
        options: [
          'אין הבדל',
          'Metrics = מספרים מדודים לאורך זמן (CPU%, Latency); Logs = רשומות טקסטואליות של אירועים',
          'Logs הם מספרים, Metrics הם טקסט',
          'Metrics הם מסד נתונים, Logs הם קבצים',
        ],
        correct: 1,
        explanation: 'Metrics = נתונים מספריים בזמן (כמה בקשות, כמה שגיאות, כמה CPU). Logs = תיעוד נקודתי של מה קרה ("user 123 logged in at 14:30"). כל אחד לשימוש שונה.',
      },
      {
        id: 'monitoring-q7',
        text: 'מה זה health check endpoint?',
        options: [
          'דשבורד של ניטור',
          'endpoint שמחזיר סטטוס 200 כשהשירות תקין, ומשמש ל-load balancer ו-orchestration לדעת אם השירות חי',
          'API לבדיקת סיסמאות',
          'כלי לבדיקת ביצועים',
        ],
        correct: 1,
        explanation: 'Health check (לרוב GET /health) מחזיר 200 OK כשהשירות תקין. Load balancers ו-Kubernetes קוראים לו בתדירות גבוהה — אם נכשל, הם מוציאים את ה-instance מהסבב.',
      },
      {
        id: 'monitoring-q8',
        text: 'מה זה MTTD (Mean Time To Detect)?',
        options: [
          'זמן תגובה ממוצע לבקשה',
          'הזמן הממוצע שעובר עד שהצוות מזהה שיש תקלה',
          'מספר תקלות בשבוע',
          'זמן שחזור ממוצע',
        ],
        correct: 1,
        explanation: 'MTTD = כמה זמן לוקח לגלות שיש בעיה. MTTR = Mean Time To Recover (כמה זמן לתקן). ניטור טוב מקטין MTTD לדקות במקום שעות.',
      },
      {
        id: 'monitoring-q9',
        text: 'מה תפקיד Grafana בסטאק ניטור?',
        options: [
          'אוסף Metrics מהשירותים',
          'מציג Metrics ממקורות נתונים שונים (Prometheus, CloudWatch) כגרפים ודשבורדים',
          'שומר לוגים',
          'שולח התראות',
        ],
        correct: 1,
        explanation: 'Grafana הוא כלי ויזואליזציה — מתחבר לPromtheus, CloudWatch ומקורות נוספים ומציג דשבורדים עשירים. הוא לא אוסף נתונים בעצמו.',
      },
      {
        id: 'monitoring-q10',
        text: 'מה ה-Alert שמוגדר בשיעור עבור HighErrorRate?',
        options: [
          'מעל 1% שגיאות',
          'מעל 10% מהבקשות מחזירות 5xx ב-5 דקות האחרונות, למשך 2 דקות',
          'מעל 50% שגיאות',
          'כל שגיאה בודדת',
        ],
        correct: 1,
        explanation: 'ה-Alert מופעל כשיותר מ-10% מהבקשות מחזירות קוד 5xx ב-5 דקות האחרונות, ותנאי זה נמשך לפחות 2 דקות (for: 2m). זה מונע alert noise על שגיאות חולפות.',
      },
      {
        id: 'monitoring-q11',
        text: 'מה עדיף להשתמש בו כמדד — ממוצע (Average) או Percentile (P95/P99) לזמן תגובה?',
        options: [
          'ממוצע תמיד מדויק יותר',
          'Percentile — כי ממוצע מוסתר על ידי outliers ולא מייצג את חוויית המשתמש הגרועה',
          'שניהם זהים',
          'ממוצע עדיף כי קל יותר לחשב',
        ],
        correct: 1,
        explanation: 'אם 99% מהבקשות מסתיימות ב-100ms ו-1% לוקחות 10 שניות, הממוצע יהיה ~200ms ויסתיר את הבעיה. P99 יראה את ה-10 שניות ויתריע.',
      },
    ],
  },
]
