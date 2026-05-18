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
    ],
  },
]
