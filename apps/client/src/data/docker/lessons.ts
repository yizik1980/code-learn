import type { Lesson } from '../../types'

export const dockerLessons: Lesson[] = [
  {
    id: 'containers-intro',
    title: 'מבוא ל-Containers ו-Docker',
    summary: 'מה זה Container, ההבדל מ-VM, ארכיטקטורת Docker ומינוח בסיסי',
    emoji: '🐳',
    content: [
      { type: 'heading', text: 'למה Containers?' },
      {
        type: 'text',
        text: 'Container הוא יחידת הרצה קלה ומבודדת שמארזת קוד + runtime + dependencies יחד. "Works on my machine" הפך ל-"Works everywhere" — כי ה-Container נושא את כל מה שהוא צריך.',
      },
      {
        type: 'table',
        caption: 'Container לעומת Virtual Machine',
        headers: ['מאפיין', 'Container', 'Virtual Machine'],
        rows: [
          ['גודל', 'MB בודדים', 'GB רבים'],
          ['זמן הפעלה', 'מילישניות', 'דקות'],
          ['בידוד', 'Process-level', 'OS-level (Hypervisor)'],
          ['Kernel', 'משותף עם Host', 'Kernel משלו'],
          ['Overhead', 'מינימלי', 'גבוה'],
          ['Portability', 'מלאה', 'חלקית'],
        ],
      },
      { type: 'heading', text: 'ארכיטקטורת Docker' },
      {
        type: 'code',
        lang: 'text',
        caption: 'רכיבי Docker',
        code: `Docker CLI  →  Docker Daemon (dockerd)  →  containerd  →  runc
    ↑                    ↑
  פקודות            REST API

רכיבים עיקריים:
  Docker Engine   — ה-Runtime שמריץ Containers
  Docker Image    — תבנית Read-Only לContainer (layers)
  Docker Container— Instance פעיל של Image
  Docker Registry — מאגר Images (Docker Hub, ECR, GCR)
  Dockerfile      — קובץ הוראות לבניית Image

מינוח:
  Image  = "מתכון"    Container = "מנה שבושלה"
  Registry = "ספרייה" Layer = "שכבת שינויים"`,
      },
      {
        type: 'table',
        caption: 'מינוח מרכזי',
        headers: ['מונח', 'הגדרה'],
        rows: [
          ['Image', 'תבנית Read-Only — שכבות (layers) של filesystem'],
          ['Container', 'Instance פועל של Image — תוסיף Writable Layer'],
          ['Dockerfile', 'קובץ הוראות לבניית Image'],
          ['Registry', 'שרת לאחסון ושיתוף Images (Docker Hub, ECR)'],
          ['Tag', 'גרסה של Image: nginx:1.25, python:3.12-slim'],
          ['Layer', 'כל פקודה ב-Dockerfile יוצרת Layer נפרד'],
        ],
      },
      { type: 'tip', text: 'Container ≠ VM: Container משתף את ה-Kernel של ה-Host OS. זה מה שהופך אותו לקל ומהיר. Linux Containers על Windows/Mac: Docker Desktop מריץ Linux VM קטנה ובתוכה Containers. לכן: Containers הם תמיד Linux (אלא אם Windows Containers ספציפית).' },
    ],
    questionBank: [
      {
        id: 'ci-q1',
        text: 'מה ההבדל העיקרי בין Container ל-Virtual Machine?',
        options: [
          'Container גדול יותר מVM',
          'Container משתף את ה-Kernel של ה-Host — קל ומהיר. VM מריץ OS שלם עם Kernel משלו דרך Hypervisor',
          'VM מהיר יותר מContainer',
          'Container לא יכול לרוץ ב-Cloud',
        ],
        correct: 1,
        explanation: 'Container: shared kernel, process isolation. VM: full OS, hardware emulation. תוצאה: Container =  MB, מילישניות. VM = GB, דקות. Containers: אידיאל ל-Microservices, CI/CD. VMs: אידיאל ל-Full isolation, Windows-on-Linux.',
      },
      {
        id: 'ci-q2',
        text: 'מה Docker Image?',
        options: [
          'Container פועל בשם אחר',
          'תבנית Read-Only שמורכבת משכבות (layers) ומכילה קוד, runtime, ו-dependencies — Container הוא Instance פועל של Image',
          'קובץ הגדרות ל-Docker',
          'גיבוי של Container',
        ],
        correct: 1,
        explanation: 'Image = Read-Only template. Container = Image + Writable Layer. Image layers: ממוזגות ב-Union Filesystem. שינויים ב-Container נשמרים ב-layer העליון בלבד. הפעלת 10 Containers מאותה Image: 10 Writable Layers, Layer אחד משותף.',
      },
      {
        id: 'ci-q3',
        text: 'מה Docker Registry?',
        options: [
          'Registry של Windows',
          'מאגר לאחסון ושיתוף Images: Docker Hub (public), ECR (AWS), GCR (Google), ACR (Azure), Harbor (self-hosted)',
          'קובץ Log של Docker',
          'CLI של Docker',
        ],
        correct: 1,
        explanation: 'Registry: שרת HTTP שמאחסן Images. Docker Hub: ברירת מחדל, public. pull image → הורד מRegistry. push image → העלה לRegistry. Private Registry: ל-Images פרטיים. ECR, GCR, ACR: Managed Registries של Cloud providers.',
      },
      {
        id: 'ci-q4',
        text: 'מה Layer ב-Docker Image ולמה זה חשוב?',
        options: [
          'שכבת רשת של Docker',
          'כל פקודה ב-Dockerfile יוצרת Layer — שכבת filesystem. Layers נשמרות Cache ומשותפות בין Images, חוסך דיסק ומזרז build',
          'Layer = Container בשם אחר',
          'שכבת הצפנה של Image',
        ],
        correct: 1,
        explanation: 'Image Layers: FROM ubuntu = base layer. RUN apt-get = layer. COPY app = layer. כל layer = diff מה-layer הקודם. Build Cache: אם layer לא שינה → משתמש ב-cache. Pull: רק Layers שחסרות מ-local. משמעות: אם 10 Images משתמשות ב-ubuntu:22.04 → שכבת הbase נשמרת פעם אחת.',
      },
      {
        id: 'ci-q5',
        text: 'מה Docker Daemon (dockerd)?',
        options: [
          'ה-CLI של Docker',
          'תהליך Background שרץ על ה-Host ומנהל Containers, Images, Networks ו-Volumes. Docker CLI מדבר עמו דרך REST API',
          'Container מיוחד של Docker',
          'Registry מקומי',
        ],
        correct: 1,
        explanation: 'dockerd: תהליך שרץ ב-background. CLI (`docker run`) שולח REST API request לDaemon → Daemon מבצע. containerd: lower-level runtime. runc: מריץ בפועל את ה-Container לפי OCI spec. Docker Desktop: מריץ את Daemon ב-VM קטנה על Mac/Windows.',
      },
      {
        id: 'ci-q6',
        text: 'מה OCI (Open Container Initiative)?',
        options: [
          'חברה שמתחרה ב-Docker',
          'סטנדרט פתוח לContainer format ו-Runtime — מבטיח שImages שנבנו עם Docker רצות גם ב-Podman, containerd, ו-Kubernetes',
          'רישיון של Docker',
          'כלי ניטור Containers',
        ],
        correct: 1,
        explanation: 'OCI: Linux Foundation. Image Spec: פורמט Image. Runtime Spec: כיצד להריץ Container. Distribution Spec: Protocol לRegistry. תוצאה: Docker Image = Podman Image = K8s Image. Vendor-neutral. Podman: OCI-compatible, daemonless, rootless.',
      },
      {
        id: 'ci-q7',
        text: 'מה ההבדל בין `docker run` ל-`docker start`?',
        options: [
          'אין הבדל',
          '`docker run` יוצר Container חדש מImage ומריץ אותו. `docker start` מפעיל מחדש Container שכבר קיים (נעצר)',
          '`docker start` מהיר יותר',
          '`docker run` לDev, `docker start` לProd',
        ],
        correct: 1,
        explanation: '`docker run` = create + start. יוצר Container חדש מה-Image. `docker start <container_id>` = מפעיל Container שהיה ב-state Stopped. כל `docker run` יוצר Container חדש עם ID חדש. לראות stopped containers: `docker ps -a`.',
      },
      {
        id: 'ci-q8',
        text: 'מה Dockerfile?',
        options: [
          'קובץ Log של Docker',
          'קובץ טקסט עם הוראות לבניית Image: FROM (base), RUN (commands), COPY (files), CMD (default command)',
          'קובץ הגדרות Docker Daemon',
          'קובץ תצורה לDocker Registry',
        ],
        correct: 1,
        explanation: 'Dockerfile: text file שמגדיר כיצד לבנות Image. `docker build -t myapp:1.0 .` קורא Dockerfile מה-directory הנוכחי. כל instruction = layer. Best practice: סדר instructions מ-"משתנה לעתים רחוקות" ל-"משתנה לעתים קרובות" לניצול cache מקסימלי.',
      },
      {
        id: 'ci-q9',
        text: 'Containers הם Ephemeral — מה זה אומר?',
        options: [
          'Containers חיים לנצח',
          'Containers זמניים — כשנמחקים, כל הנתונים שנכתבו בתוכם אובדים. לנתונים קבועים: חייבים Volumes',
          'Containers לא יכולים לשמור קבצים',
          'Containers מתאפסים בכל יום',
        ],
        correct: 1,
        explanation: 'Ephemeral = זמני, חד-פעמי. Stateless containers: האפליקציה עצמה ב-Image, נתונים ב-Volume. `docker rm container` = מוחק Writable Layer. Image נשאר. Immutable Infrastructure: לא מעדכנים Container — בונים Image חדש ומריצים Container חדש.',
      },
      {
        id: 'ci-q10',
        text: 'מה Podman ואיך הוא שונה מDocker?',
        options: [
          'Podman = Docker בשם אחר',
          'Podman: OCI-compatible, daemonless (לא צריך Daemon ב-Background), rootless (ניתן לרוץ ללא root). Drop-in replacement לרוב פקודות Docker',
          'Podman רק לKubernetes',
          'Podman תומך רק ב-Red Hat',
        ],
        correct: 1,
        explanation: 'Podman vs Docker: Docker: Daemon-based (dockerd רץ ב-background כ-root). Podman: Daemonless, Rootless — כל Container הוא process ישיר. Rootless: אבטחה טובה יותר. `alias docker=podman` עובד לרוב הפקודות. RHEL/Fedora: Podman כ-default. `podman-compose`: תחליף לdocker-compose.',
      },
    ],
  },

  {
    id: 'docker-cli',
    title: 'Docker CLI — פקודות יסוד',
    summary: 'run, pull, ps, stop, rm, exec, logs, inspect — הפקודות שמשתמשים בהן כל יום',
    emoji: '⌨️',
    content: [
      { type: 'heading', text: 'פקודות Docker יומיומיות' },
      {
        type: 'table',
        caption: 'פקודות Docker עיקריות',
        headers: ['פקודה', 'מה עושה', 'דוגמה'],
        rows: [
          ['docker pull', 'הורדת Image מRegistry', 'docker pull nginx:1.25'],
          ['docker run', 'הרצת Container חדש', 'docker run -d -p 80:80 nginx'],
          ['docker ps', 'רשימת Containers פועלים', 'docker ps -a (כולל stopped)'],
          ['docker stop', 'עצירת Container (SIGTERM)', 'docker stop my-container'],
          ['docker rm', 'מחיקת Container', 'docker rm my-container'],
          ['docker rmi', 'מחיקת Image', 'docker rmi nginx:1.25'],
          ['docker exec', 'הרצת פקודה בContainer פועל', 'docker exec -it myapp bash'],
          ['docker logs', 'הצגת Logs של Container', 'docker logs -f my-container'],
          ['docker inspect', 'פרטים מלאים על Object', 'docker inspect my-container'],
          ['docker build', 'בניית Image מDockerfile', 'docker build -t myapp:1.0 .'],
        ],
      },
      { type: 'heading', text: 'docker run — Flags חשובים' },
      {
        type: 'code',
        lang: 'bash',
        caption: 'docker run flags נפוצים',
        code: `docker run [flags] IMAGE [COMMAND]

  -d, --detach        רץ ב-background (daemon mode)
  -p, --publish       Port mapping: HOST:CONTAINER
  -e, --env           משתנה סביבה: -e DB_HOST=localhost
  -v, --volume        Mount volume: /host/path:/container/path
  --name              שם Container: --name web-server
  -it                 Interactive terminal (i=stdin, t=tty)
  --rm                מחיקה אוטומטית כשנעצר
  --network           רשת: --network my-net
  --restart           מדיניות restart: always, unless-stopped
  -m, --memory        הגבלת זיכרון: -m 512m
  --cpus              הגבלת CPU: --cpus="1.5"

דוגמאות:
  docker run -d --name db -e POSTGRES_PASSWORD=pass postgres:15
  docker run -it --rm ubuntu:22.04 bash
  docker run -d -p 3000:3000 --restart=unless-stopped myapp:1.0`,
      },
      { type: 'heading', text: 'ניהול Containers — Lifecycle' },
      {
        type: 'code',
        lang: 'bash',
        caption: 'Container Lifecycle',
        code: `# יצירה והרצה
docker run -d --name web nginx

# עצירה
docker stop web       # SIGTERM → SIGKILL אחרי 10s
docker kill web       # SIGKILL מיידי

# הפעלה מחדש
docker start web
docker restart web

# מחיקה
docker rm web         # חייב להיות stopped
docker rm -f web      # Force (גם אם פועל)

# Cleanup
docker container prune          # מוחק כל stopped containers
docker system prune -a          # מוחק הכל (images, containers, networks)
docker system prune -a --volumes # גם volumes`,
      },
      { type: 'tip', text: 'Shell בContainer פועל: `docker exec -it <name> bash` (או sh לImages קטנות כמו Alpine). ה-`-it` = interactive terminal. אם אין bash: `docker exec -it <name> /bin/sh`. לקרוא קובץ: `docker exec myapp cat /etc/nginx/nginx.conf`. לDebug: `docker exec -it myapp env` — מציג משתני סביבה.' },
    ],
    questionBank: [
      {
        id: 'cli-q1',
        text: 'מה עושה `docker run -d -p 8080:80 nginx`?',
        options: [
          'מוריד nginx ומריץ בפורט 80 בלבד',
          'מריץ nginx ב-background (-d), ממפה פורט 8080 של ה-Host לפורט 80 בContainer — גישה דרך localhost:8080',
          'מריץ 8080 Containers של nginx',
          'בונה Image של nginx',
        ],
        correct: 1,
        explanation: '-d: detached (background). -p HOST:CONTAINER: Port mapping. Browser → localhost:8080 → Docker → Container:80 → nginx. בלי -p: nginx רץ אבל לא נגיש מבחוץ. -p 0.0.0.0:8080:80: מאזין על כל interfaces. -p 127.0.0.1:8080:80: רק localhost.',
      },
      {
        id: 'cli-q2',
        text: 'מה ההבדל בין `docker stop` ל-`docker kill`?',
        options: [
          'אין הבדל — שניהם עושים אותו הדבר',
          '`docker stop` שולח SIGTERM (graceful shutdown, 10s לסיים), אחר כך SIGKILL. `docker kill` שולח SIGKILL מיידי ללא grace period',
          '`docker kill` עדיף תמיד',
          '`docker stop` מוחק את ה-Container, `docker kill` רק עוצר',
        ],
        correct: 1,
        explanation: 'Graceful shutdown: SIGTERM → Application מקבל signal → מסיים בקשות פתוחות, שומר state, מנקה. SIGKILL: ה-OS הורג מיידית. `docker stop --time=30 web`: מאריך grace period ל-30s. Production: תמיד `stop` כדי לאפשר לApp לסיים בקשות.',
      },
      {
        id: 'cli-q3',
        text: 'מה `docker exec -it myapp bash` עושה?',
        options: [
          'מפעיל Container חדש בשם myapp',
          'פותח Shell אינטראקטיבי בתוך Container פועל בשם myapp — כדי לדבג, לבדוק קבצים, להריץ פקודות',
          'מריץ bash script בContainer',
          'מחבר Terminal חדש לContainer',
        ],
        correct: 1,
        explanation: 'exec: מריץ process בContainer קיים. -i: stdin פתוח (interactive). -t: מקצה pseudo-TTY. bash: הפקודה להריץ. אם אין bash (Alpine): `/bin/sh`. שימושים: debug, בדיקת config, ניהול DB. לקבל IP: `docker exec myapp hostname -i`.',
      },
      {
        id: 'cli-q4',
        text: '`docker ps -a` לעומת `docker ps` — מה ההבדל?',
        options: [
          'אין הבדל',
          '`docker ps`: רק Containers פועלים (Running). `docker ps -a`: כל Containers כולל Stopped, Exited, Created',
          '`docker ps -a`: מסודר לפי אלפבית',
          '`docker ps -a`: מציג גם Images',
        ],
        correct: 1,
        explanation: 'Container states: Created, Running, Paused, Stopped/Exited, Dead. `docker ps`: רק Running. `-a` / `--all`: הכל. שימושי: ל-Debug Container שקרס — `docker ps -a` מציג אותו, אחר כך `docker logs <id>` רואים למה. `docker ps -q`: רק IDs (שימושי ב-scripts).',
      },
      {
        id: 'cli-q5',
        text: 'מה `docker logs -f myapp` עושה?',
        options: [
          'מוחק את ה-Logs של myapp',
          'מציג Logs של Container וממשיך להציג Logs חדשים ב-Real Time (כמו `tail -f`)',
          'שומר Logs לקובץ',
          'מציג רק שגיאות ב-Logs',
        ],
        correct: 1,
        explanation: '`docker logs`: מציג stdout/stderr של Container. `-f` / `--follow`: Real-time streaming. `--tail 100`: 100 שורות אחרונות. `--since 1h`: מהשעה האחרונה. `--timestamps`: הוסף timestamps. Container שנכשל: `docker logs <id>` לראות מה קרה לפני הקריסה.',
      },
      {
        id: 'cli-q6',
        text: 'מה `--restart=always` ב-`docker run`?',
        options: [
          'Container מתאפס כל שעה',
          'Docker מפעיל מחדש את ה-Container אוטומטית אם קרס, גם אחרי reboot של ה-Host',
          'Container מתפעל מחדש כל דקה',
          'רק למקרה של שגיאה — לא בכל הפעלה מחדש',
        ],
        correct: 1,
        explanation: 'Restart policies: `no` (ברירת מחדל), `always` (תמיד — גם אחרי reboot), `unless-stopped` (תמיד, אלא אם הפסקת ידנית), `on-failure` (רק כשקורס עם exit code != 0). Production: `unless-stopped` מומלץ. `on-failure:5`: רק 5 נסיונות.',
      },
      {
        id: 'cli-q7',
        text: '`docker system prune -a` — מה יימחק?',
        options: [
          'רק Containers מופסקים',
          'כל Containers מופסקים, כל Images שאין Container שמשתמש בהם, Networks לא משומשים, ו-Build Cache',
          'רק Images לא משומשים',
          'כל Volumes של Docker',
        ],
        correct: 1,
        explanation: 'system prune: ניקוי מקיף. `-a`: גם Images שלא ב-use (לא רק dangling). `--volumes`: גם Volumes. מתריע לפני! שימוש: לפנות דיסק ב-CI/CD agents, Dev machines. לא ימחק: Volumes ב-use, Images ב-use, Running Containers.',
      },
      {
        id: 'cli-q8',
        text: 'מה `docker inspect myapp` מחזיר?',
        options: [
          'רק גודל ה-Image',
          'JSON מפורט עם כל מידע על Object: IP, Mounts, Env vars, Network settings, Restart count, Exit code — שימושי ל-Debug',
          'Logs של Container',
          'Resource usage (CPU/Memory)',
        ],
        correct: 1,
        explanation: 'docker inspect: JSON output מלא. שימושים: `docker inspect --format "{{.NetworkSettings.IPAddress}}" myapp` לIP. `docker inspect --format "{{.State.ExitCode}}" myapp` לExit code. Works on: Containers, Images, Networks, Volumes.',
      },
      {
        id: 'cli-q9',
        text: 'מה `docker run --rm -it ubuntu:22.04 bash` עושה?',
        options: [
          'מוחק את Image ubuntu:22.04',
          'מריץ Container אינטראקטיבי של ubuntu. `--rm`: Container נמחק אוטומטית כשיוצאים. שימושי לhב-One-off commands ו-Debug',
          'מריץ Container ב-background',
          'מקים Shell קבוע ב-Ubuntu',
        ],
        correct: 1,
        explanation: '--rm: אחרי `exit` → Container נמחק אוטומטית. שימושי ל: בדיקת commands חד-פעמיים, ToolBox, Testing. דוגמה: `docker run --rm python:3.12 python -c "print(2+2)"`. בלי --rm: Container נשאר Stopped — `docker ps -a` מציג אותו.',
      },
      {
        id: 'cli-q10',
        text: 'כיצד מעבירים משתני סביבה לContainer?',
        options: [
          'רק דרך Dockerfile',
          '`-e VAR=value` ב-docker run, `--env-file .env` לקובץ, או ב-docker-compose: `environment:` / `env_file:`',
          'רק דרך Volume עם קובץ .env',
          'אי אפשר להעביר משתני סביבה לContainer',
        ],
        correct: 1,
        explanation: 'Env vars: `-e DB_HOST=localhost -e DB_PORT=5432`. `--env-file .env`: קורא קובץ. בContainer: `$DB_HOST`. docker-compose: `environment: - DB_HOST=localhost` או `env_file: - .env`. לא שמים secrets ב-Image ישירות — משתמשים בenv vars ב-runtime.',
      },
    ],
  },

  {
    id: 'dockerfile',
    title: 'כתיבת Dockerfile',
    summary: 'FROM, RUN, COPY, ADD, CMD, ENTRYPOINT, ENV, ARG, EXPOSE — הנחיות ו-Best Practices',
    emoji: '📄',
    content: [
      { type: 'heading', text: 'Dockerfile — הוראות בסיסיות' },
      {
        type: 'table',
        caption: 'הנחיות Dockerfile',
        headers: ['הנחיה', 'שימוש', 'דוגמה'],
        rows: [
          ['FROM', 'Base Image (חובה — ראשונה)', 'FROM node:20-alpine'],
          ['RUN', 'הרצת פקודה בזמן Build', 'RUN apt-get install -y curl'],
          ['COPY', 'העתקת קבצים מHost לImage', 'COPY package.json .'],
          ['ADD', 'כמו COPY + URL + untar', 'ADD app.tar.gz /app (כדאי להימנע)'],
          ['CMD', 'פקודת ברירת מחדל (ניתן להחליף)', 'CMD ["node", "server.js"]'],
          ['ENTRYPOINT', 'פקודה קבועה (קשה להחליף)', 'ENTRYPOINT ["nginx", "-g", "daemon off;"]'],
          ['ENV', 'משתנה סביבה ב-Image', 'ENV NODE_ENV=production'],
          ['ARG', 'משתנה Build-time (לא נשמר)', 'ARG VERSION=1.0'],
          ['EXPOSE', 'תיעוד Port (לא פותח בפועל)', 'EXPOSE 3000'],
          ['WORKDIR', 'תיקיית עבודה', 'WORKDIR /app'],
          ['USER', 'משתמש להרצה', 'USER node'],
          ['VOLUME', 'הגדרת Mount Point', 'VOLUME ["/data"]'],
        ],
      },
      { type: 'heading', text: 'Dockerfile לאפליקציית Node.js' },
      {
        type: 'code',
        lang: 'dockerfile',
        caption: 'Dockerfile מלא — Node.js Best Practices',
        code: `FROM node:20-alpine

# WORKDIR יוצר ומגדיר כתיקיית עבודה
WORKDIR /app

# מעתיקים package.json לפני שאר הקוד
# כך ש-npm install לא ירוץ מחדש אם רק הקוד השתנה
COPY package*.json ./
RUN npm ci --only=production

# מעתיקים שאר הקוד
COPY . .

# משתמש לא-root לאבטחה
USER node

EXPOSE 3000

# JSON format עדיף על shell form (מקבל signals כמו SIGTERM)
CMD ["node", "server.js"]`,
      },
      { type: 'heading', text: 'CMD לעומת ENTRYPOINT' },
      {
        type: 'code',
        lang: 'text',
        caption: 'ההבדל בין CMD ל-ENTRYPOINT',
        code: `CMD: ניתן להחליף ב-docker run
  Dockerfile: CMD ["npm", "start"]
  docker run myapp npm test   ← מחליף CMD לגמרי

ENTRYPOINT: קבוע — הפקודה שתמיד תרוץ
  Dockerfile: ENTRYPOINT ["node"]
  CMD: ["server.js"]           ← arguments ברירת מחדל
  docker run myapp other.js   ← מריץ: node other.js

שילוב מומלץ:
  ENTRYPOINT ["docker-entrypoint.sh"]  ← script קבוע
  CMD ["postgres"]                      ← ניתן לשינוי

Shell form לעומת Exec form:
  Shell: CMD npm start          ← /bin/sh -c "npm start"
  Exec:  CMD ["npm", "start"]  ← ישיר, מקבל signals`,
      },
      { type: 'tip', text: 'Layer Order חשוב לCache: שמו dependencies (package.json, requirements.txt) לפני COPY . — כי npm install/pip install לוקחים זמן. אם רק שיניתם קובץ .js — הLayer של npm install ישתמש ב-Cache. אם שיניתם package.json — ה-Cache יבוטל ותתקין מחדש.' },
    ],
    questionBank: [
      {
        id: 'df-q1',
        text: 'מה ההבדל בין COPY ל-ADD ב-Dockerfile?',
        options: [
          'אין הבדל — שניהם זהים',
          'COPY: מעתיק קבצים בלבד. ADD: גם מוריד מURL וגם מחלץ tar archives אוטומטית — אך מומלץ להשתמש ב-COPY כמעט תמיד לשקיפות',
          'ADD מהיר יותר מCOPY',
          'COPY לקבצים בינאריים, ADD לטקסט',
        ],
        correct: 1,
        explanation: 'COPY: פשוט ומפורש — מעתיק קבצים מ-Build Context. ADD: Super-powered COPY — גם URL (docker pull במהות), גם untar אוטומטי. Best Practice: השתמשו ב-COPY. ADD רק כשצריך untar ספציפית. שקיפות: מי שקורא Dockerfile יידע בדיוק מה קורה.',
      },
      {
        id: 'df-q2',
        text: 'מה ההבדל בין ENV ל-ARG?',
        options: [
          'ENV לProduction, ARG לDev',
          'ENV: משתנה סביבה שנשמר ב-Image ונגיש ב-Runtime. ARG: משתנה Build-time בלבד — לא נשמר ב-Image הסופי',
          'ARG ניתן לשינוי, ENV קבוע',
          'שניהם זהים — שם שונה',
        ],
        correct: 1,
        explanation: 'ARG: `docker build --build-arg VERSION=2.0 .` → מחלחל לBuild. לא נשמר ב-Image! ENV: נשמר ב-Image ונגיש ב-Runtime ולכל Container. Secrets: אל תשתמשו ב-ENV לsecrets — נשמרים ב-Image history. `docker history image` מציג ENV values.',
      },
      {
        id: 'df-q3',
        text: 'למה מעתיקים package.json לפני COPY . בNode.js Dockerfile?',
        options: [
          'Docker דורש זאת',
          'ניצול Build Cache: אם package.json לא שינה → Layer של npm install נשמר ב-Cache. שינוי קוד JS בלבד → npm install לא ירוץ מחדש',
          'package.json חייב להיות ראשון',
          'COPY . לא מעתיק package.json',
        ],
        correct: 1,
        explanation: 'Layer Cache: כל Layer מחושב. אם Input Layer לא שינה → Cache hit. COPY package.json → Layer A. RUN npm install → Layer B (cached כל עוד Layer A זהה). COPY . → Layer C. שינוי בapp.js: רק Layer C משתנה. שינוי בpackage.json: Layers B+C מחושבים מחדש.',
      },
      {
        id: 'df-q4',
        text: 'מה Exec form לעומת Shell form ב-CMD?',
        options: [
          'Exec form מהיר יותר',
          'Shell form: `CMD npm start` → רץ דרך /bin/sh לא מקבל SIGTERM ישיר. Exec form: `CMD ["npm", "start"]` → Process קיבל SIGTERM ישיר — Graceful shutdown',
          'Shell form לLinux, Exec form לWindows',
          'אין הבדל ב-behavior',
        ],
        correct: 1,
        explanation: 'Shell form: `/bin/sh -c "npm start"` → PID 1 = sh, npm = child. SIGTERM → sh מקבל, לא תמיד מעביר ל-npm. Exec form: `["npm", "start"]` → PID 1 = npm process עצמו → מקבל SIGTERM ישיר → Graceful shutdown. לProduction: תמיד Exec form.',
      },
      {
        id: 'df-q5',
        text: 'מה WORKDIR עושה ב-Dockerfile?',
        options: [
          'מוחק את תיקיית העבודה',
          'מגדיר ויוצר תיקיית עבודה לכל הפקודות שאחריו (RUN, COPY, CMD, ENTRYPOINT). עדיף על `cd` ב-RUN',
          'הופך תיקייה לVolume',
          'מגדיר permissions לתיקייה',
        ],
        correct: 1,
        explanation: 'WORKDIR /app: יוצר /app אם לא קיים + מגדיר כ-CWD לשאר ה-Dockerfile ולContainer. `RUN cd /app && npm install` = בעייתי (כל RUN Layer מתחיל בroot). WORKDIR /app + `RUN npm install` = נכון. גם ב-docker exec: תיקיית ברירת מחדל = WORKDIR.',
      },
      {
        id: 'df-q6',
        text: 'מה .dockerignore ולמה חשוב?',
        options: [
          'קובץ שמסתיר Docker מה-OS',
          'כמו .gitignore לDocker — מונע העתקת קבצים מיותרים ל-Build Context: node_modules, .git, .env, logs — מקטין Image ומאיץ Build',
          'הגדרות אבטחה לDockerfile',
          'רשימת Images לא מורשים',
        ],
        correct: 1,
        explanation: '.dockerignore: שורות כמו `.git`, `node_modules`, `*.log`. Build Context: כל הקבצים שנשלחים ל-Docker Daemon לפני Build. בלי .dockerignore: node_modules (עשרות MB) נשלחים לDaemon גם אם COPY . לא מעתיק אותם. תמיד הוסיפו .dockerignore לפרויקט.',
      },
      {
        id: 'df-q7',
        text: 'USER ב-Dockerfile — למה חשוב?',
        options: [
          'מגדיר מי יכול להריץ docker build',
          'מריץ Container כמשתמש לא-root — אבטחה: אם Application נפרץ, התוקף לא יקבל root על ה-Host',
          'מגביל מי יכול ל-docker exec',
          'מגדיר owner של Volume',
        ],
        correct: 1,
        explanation: 'Default: Container רץ כroot. בעיה: root ב-Container = פוטנציאלית root על Host (Container escape). Solution: `USER node` (ב-Node Images) / `RUN useradd -r appuser && USER appuser`. כלל: אל תריצו Applications כroot ב-Container.',
      },
      {
        id: 'df-q8',
        text: 'EXPOSE ב-Dockerfile — מה הוא עושה בפועל?',
        options: [
          'פותח פורט על ה-Host',
          'תיעוד בלבד — מציין לאיזה פורט ה-Application מאזין. לא פותח כלום. כדי לגשת צריך -p בdocker run',
          'הגדרת Firewall rule',
          'פותח פורט רק בין Containers',
        ],
        correct: 1,
        explanation: 'EXPOSE: Documentation. לפתיחת פורט: `docker run -p 8080:3000`. `docker run -P` (גדול): ממפה אוטומטית כל EXPOSE לפורט אקראי ב-Host. ב-Docker Compose: ה-services מתקשרים ביניהם ישירות לפי שם Service + Port ללא EXPOSE.',
      },
      {
        id: 'df-q9',
        text: 'איזה FROM Image מומלץ לProduction?',
        options: [
          'ubuntu:latest תמיד',
          'Alpine-based (`node:20-alpine`, `python:3.12-slim`) — Image קטן (MB בודדים), attack surface קטן, פחות vulnerabilities',
          'מחלקים תמיד מ-scratch',
          'ה-Tag latest של כל Image',
        ],
        correct: 1,
        explanation: 'Image sizes: node:20 = ~1GB. node:20-slim = ~250MB. node:20-alpine = ~130MB. Alpine = musl libc + BusyBox = ~5MB base. Tradeoff: Alpine מבוסס musl (לא glibc) — Native modules בNode.js עשויים לדרוש שינויים. slim = Debian stripped. scratch = ריק לחלוטין (לGo binaries).',
      },
      {
        id: 'df-q10',
        text: 'מה RUN npm ci לעומת RUN npm install?',
        options: [
          'npm ci מהיר יותר בלבד',
          'npm ci: מתקין מpackage-lock.json בדיוק (deterministic), מוחק node_modules קיים, מהיר ב-CI/CD, נכשל אם lock file לא מסונכרן — עדיף ב-Docker',
          'npm install יותר אמין',
          'npm ci רק לCI סביבות',
        ],
        correct: 1,
        explanation: 'npm ci (clean install): קורא package-lock.json → מתקין בדיוק את הגרסאות. לא משנה lock file. Faster (לא מחשב dependencies). Deterministic: אותו build בכל מכונה. npm install: יכול לשדרג גרסאות minor, משנה lock file. ב-Docker: תמיד npm ci לReproducible builds.',
      },
    ],
  },

  {
    id: 'docker-networking',
    title: 'Docker Networking',
    summary: 'Bridge, Host, None, Port Mapping, DNS בין Containers ו-Custom Networks',
    emoji: '🌐',
    content: [
      { type: 'heading', text: 'Docker Network Drivers' },
      {
        type: 'table',
        caption: 'סוגי Docker Networks',
        headers: ['Driver', 'מתי משתמשים', 'מאפיינים'],
        rows: [
          ['bridge', 'ברירת מחדל לContainers יחידים', 'רשת פרטית, NAT לHost, DNS בין Containers בNetwork משותף'],
          ['host', 'Performance גבוה, בלי isolation', 'Container משתמש ב-Network Stack של Host ישירות'],
          ['none', 'Container ללא רשת', 'Loopback בלבד — מבודד לחלוטין'],
          ['overlay', 'Docker Swarm / Multi-Host', 'חיבור Containers על Hosts שונים'],
          ['macvlan', 'MAC address ייחודי לContainer', 'Container נראה כ-Physical device ברשת'],
        ],
      },
      { type: 'heading', text: 'DNS בין Containers' },
      {
        type: 'code',
        lang: 'bash',
        caption: 'Custom Network — DNS אוטומטי',
        code: `# יצירת Network
docker network create my-app-net

# הרצת Containers באותה Network
docker run -d --name db     --network my-app-net postgres:15
docker run -d --name web    --network my-app-net -p 80:3000 myapp

# Web יכול להתחבר ל-DB לפי שם!
# DB_HOST=db  ← שם Container = DNS name

# בContainer web:
# psql -h db -U postgres  ← עובד!
# ping db                 ← עובד!

# ברשת ברירת מחדל (bridge0): DNS לא עובד בין Containers
# Custom network: DNS אוטומטי לפי שם Container`,
      },
      { type: 'heading', text: 'Port Mapping' },
      {
        type: 'code',
        lang: 'bash',
        caption: 'Port Mapping — אפשרויות',
        code: `-p 8080:80           # Host:Container — TCP
-p 8080:80/udp       # UDP
-p 127.0.0.1:80:80   # רק localhost (לא חשוף לרשת חיצונית)
-p 0.0.0.0:80:80     # כל interfaces (ברירת מחדל)
-P                   # מיפוי אוטומטי לפורטים אקראיים

# לבדוק מיפויים:
docker port my-container
# output:
# 80/tcp -> 0.0.0.0:8080

# Network Inspection:
docker network inspect my-app-net`,
      },
      { type: 'tip', text: 'לא לבלבל: Containers באותה Custom Network מתקשרים ישירות לפי שם ופורט פנימי — ללא צורך ב-Port Mapping! Port Mapping הוא רק לגישה מ-Host. דוגמה: web מתחבר ל-db:5432 ישיר. המשתמש מחוץ לDocker מתחבר ל-localhost:8080 → web:3000.' },
    ],
    questionBank: [
      {
        id: 'net-q1',
        text: 'שני Containers ב-Custom Network — כיצד הם מתקשרים?',
        options: [
          'דרך Port Mapping בלבד',
          'DNS אוטומטי לפי שם Container: Container בשם "db" נגיש ב-`db:5432` מכל Container באותה Network',
          'דרך IP ישיר בלבד',
          'Containers לא יכולים לתקשר ביניהם',
        ],
        correct: 1,
        explanation: 'Custom Network DNS: Docker מריץ DNS Server פנימי. כל Container מקבל DNS entry לפי שמו. `--name db` → נגיש ב-`db`, `db.my-network`. Default bridge: אין DNS — חייבים `--link` (deprecated) או IPs. Custom network: הדרך הנכונה.',
      },
      {
        id: 'net-q2',
        text: 'מה ההבדל בין bridge ל-host network?',
        options: [
          'bridge לHTTP, host לHTTPS',
          'bridge: Network פרטי, NAT, בידוד מ-Host. host: Container משתמש ב-Network Stack של Host ישירות — ביצועים גבוהים, אין port mapping, אין בידוד',
          'host מאובטח יותר',
          'bridge לProduction, host לDev',
        ],
        correct: 1,
        explanation: 'host network: Container רץ כאילו process רגיל על Host. Port 80 ב-Container = Port 80 של Host ישירות. יתרון: ביצועים (אין NAT). חיסרון: אין Port Mapping, אין Network Isolation. Linux only (Docker Desktop: לא נתמך). שימוש: Network-intensive apps, monitoring agents.',
      },
      {
        id: 'net-q3',
        text: 'Container צריך גישה לDB ב-Container אחר. מה הגישה הנכונה?',
        options: [
          'לחשוף את ה-DB ב-Port ציבורי ולהתחבר ל-localhost',
          'ליצור Custom Network, להריץ שניהם עליה — App מתחבר ל-db:5432 (שם Container + פורט פנימי), ללא חשיפה חיצונית',
          'להשתמש ב---link (deprecated)',
          'להריץ שניהם ב-host network',
        ],
        correct: 1,
        explanation: 'Best Practice: Custom Network + DNS. DB: לא מחובר לפורט Host (לא -p 5432:5432). App: מתחבר ל-db:5432 פנימי. DB לא חשוף לאינטרנט — אבטחה! Docker Compose: יוצר Custom Network אוטומטית לכל services.',
      },
      {
        id: 'net-q4',
        text: 'מה `-p 127.0.0.1:8080:80`?',
        options: [
          'מאזין על כל Network Interfaces',
          'Port Mapping שמאזין רק על localhost — הפורט לא נגיש מ-IPs חיצוניים, רק מה-Machine עצמה',
          'מחבר לContainer בIP 127.0.0.1',
          'Port Mapping לDocker Network הפנימי',
        ],
        correct: 1,
        explanation: '0.0.0.0:8080:80 (ברירת מחדל): נגיש מכל interface — כולל מהרשת. 127.0.0.1:8080:80: רק localhost. שימוש: בDev, לא לחשוף Services לרשת. לבדיקה: `curl localhost:8080` עובד. גישה מ-IP אחר: blocked. `docker port container`: מציג את ה-binding הפעיל.',
      },
      {
        id: 'net-q5',
        text: 'מה `docker network ls` מציג?',
        options: [
          'רשימת Containers המחוברים לרשת',
          'כל ה-Docker Networks: bridge (ברירת מחדל), host, none, ו-Networks שיצרתם — עם ID, שם ו-Driver',
          'טבלת Routing של Docker',
          'DNS entries של Docker',
        ],
        correct: 1,
        explanation: '`docker network ls`: Networks קיימים. `docker network inspect bridge`: כל Containers ב-bridge + subnets + IPs. `docker network create my-net`: יוצר. `docker network connect my-net container`: מחבר Container קיים לNetwork. Container יכול להיות ב-מספר Networks בו זמנית.',
      },
      {
        id: 'net-q6',
        text: 'Container ב-none network — מה הוא יכול לעשות?',
        options: [
          'גישה לHost Network בלבד',
          'Loopback (127.0.0.1) בלבד — לא יכול לתקשר עם Containers אחרים, לא עם Host, לא עם Internet. מבודד לחלוטין',
          'גישה ל-Docker Network הפנימי',
          'גישה לNetwork אחת בלבד',
        ],
        correct: 1,
        explanation: 'none: מבודד לחלוטין. Interface בContainer: רק lo (loopback). שימוש: Security-sensitive workloads שלא צריכים רשת, Batch processing של נתונים מ-Volume, Testing בבידוד. `docker run --network=none myapp` = הריצה ללא כל גישת רשת.',
      },
      {
        id: 'net-q7',
        text: 'מה Overlay network ב-Docker?',
        options: [
          'Network עם Performance גבוה',
          'Network שמאפשר תקשורת בין Containers על Hosts פיזיים שונים — נדרש לDocker Swarm, בונה Tunnel מוצפן בין Hosts',
          'Network עם Encryption',
          'Network לDocker Desktop בלבד',
        ],
        correct: 1,
        explanation: 'Overlay: Multi-host networking. Docker Swarm: Containers על Node A ו-Node B → מתקשרים כאילו באותה LAN. VXLAN tunneling מתחת. Kubernetes: CNI plugins (Flannel, Calico, Cilium) מספקים דומה. לא רלוונטי לContainer בודד על Host בודד.',
      },
      {
        id: 'net-q8',
        text: 'Container מקבל IP — מי מקצה אותו?',
        options: [
          'ה-Host DHCP server',
          'Docker IPAM (IP Address Management) — מקצה IP מSubnet של ה-Network. ברירת מחדל: 172.17.0.0/16 לbridge',
          'ה-OS של ה-Container',
          'המשתמש מגדיר תמיד',
        ],
        correct: 1,
        explanation: 'Docker IPAM: מנהל IP allocation לכל Network. bridge: 172.17.0.0/16. Custom network: `docker network create --subnet 10.0.1.0/24 my-net`. Container יקבל IP מה-range. Static IP: `docker run --network my-net --ip 10.0.1.5 myapp`. IP משתנה בין הפעלות — לכן DNS עדיף על IPs.',
      },
      {
        id: 'net-q9',
        text: 'מה הסיכון בחשיפת DB Container לפורט חיצוני (5432:5432)?',
        options: [
          'אין סיכון — DB מוגן עם סיסמה',
          'DB חשוף לAינטרנט: ניסיונות brute force, CVEs ב-DB versions, גישה לא מורשית. פתרון: DB ללא Port Mapping, App מתחבר דרך Docker Network פנימי',
          'ביצועים גרועים יותר',
          'Docker לא מאפשר לחשוף פורט 5432',
        ],
        correct: 1,
        explanation: 'Attack Surface: כל מי שמגיע לIP של ה-Host יכול לנסות להתחבר לDB. Best Practice: DB ב-Private Network, אין -p לDB. App ← (Custom Network) → DB. גישת DBA: VPN/Bastion → docker exec -it db psql. לא דרך Port חיצוני.',
      },
      {
        id: 'net-q10',
        text: 'Container מנסה להתחבר ל-API ב-Host Machine (localhost) — מה הכתובת?',
        options: [
          'localhost — כמו מחוץ לDocker',
          'host.docker.internal (Mac/Windows) או ה-Gateway IP (Linux: 172.17.0.1) — localhost ב-Container = Container עצמו, לא ה-Host',
          '127.0.0.1 תמיד',
          'ה-Host IP הציבורי',
        ],
        correct: 1,
        explanation: 'Container Network Namespace: localhost = Container עצמו. לגשת ל-Host: Docker Desktop: `host.docker.internal`. Linux: Gateway IP (בדרך כלל 172.17.0.1). `docker run --add-host host.docker.internal:host-gateway`: מוסיף ב-Linux. או: `--network host` (Container ו-Host = אותה Stack).',
      },
    ],
  },

  {
    id: 'docker-volumes',
    title: 'Docker Volumes ו-Storage',
    summary: 'Named Volumes, Bind Mounts, tmpfs, Data Persistence ו-Backup',
    emoji: '💾',
    content: [
      { type: 'heading', text: 'למה צריך Volumes?' },
      {
        type: 'text',
        text: 'Container הוא Ephemeral — כשנמחק, כל הנתונים שנכתבו בתוכו אובדים. Volumes מאפשרים שמירת נתונים מחוץ ל-Container Lifecycle: DB files, uploads, logs, config.',
      },
      {
        type: 'table',
        caption: 'סוגי Storage ב-Docker',
        headers: ['סוג', 'מיקום', 'ניהול', 'שימוש'],
        rows: [
          ['Named Volume', 'Docker manages (/var/lib/docker/volumes/)', 'Docker', 'DB, persistent data'],
          ['Bind Mount', 'נתיב ספציפי ב-Host', 'User', 'Dev: hot reload, config files'],
          ['tmpfs Mount', 'זיכרון RAM בלבד', 'Kernel', 'Secrets, temp data — לא נשמר'],
          ['Anonymous Volume', 'Docker manages, בלי שם', 'Docker', 'לא מומלץ'],
        ],
      },
      { type: 'heading', text: 'Named Volumes vs Bind Mounts' },
      {
        type: 'code',
        lang: 'bash',
        caption: 'Volume Types — דוגמאות',
        code: `# Named Volume — Docker מנהל
docker volume create my-db-data
docker run -d -v my-db-data:/var/lib/postgresql/data postgres:15

# Bind Mount — נתיב ספציפי ב-Host
docker run -d -v /home/user/app:/app myapp    # אבסולוטי
docker run -d -v $(pwd)/app:/app myapp        # נוכחי
docker run -d -v ./app:/app myapp             # Compose style

# Read-Only Mount
docker run -d -v ./config.yml:/app/config.yml:ro myapp

# tmpfs — RAM בלבד
docker run --tmpfs /tmp:size=100m myapp

# Volume Inspection
docker volume ls
docker volume inspect my-db-data
# מציג: Mountpoint = /var/lib/docker/volumes/my-db-data/_data`,
      },
      { type: 'heading', text: 'Backup ו-Restore Volume' },
      {
        type: 'code',
        lang: 'bash',
        caption: 'Backup Volume',
        code: `# Backup — tar volume לקובץ
docker run --rm \\
  -v my-db-data:/data \\
  -v $(pwd):/backup \\
  alpine tar czf /backup/db-backup.tar.gz /data

# Restore
docker run --rm \\
  -v my-db-data:/data \\
  -v $(pwd):/backup \\
  alpine tar xzf /backup/db-backup.tar.gz -C /`,
      },
      { type: 'tip', text: 'Named Volumes > Bind Mounts ב-Production: Named Volume ניהול ע"י Docker, portable, עובד על כל OS. Bind Mount: תלוי בנתיב ב-Host — /home/user/data לא קיים ב-Server. בDev: Bind Mount מעולה ל-Hot Reload. בProd: Named Volume לDB data.' },
    ],
    questionBank: [
      {
        id: 'vol-q1',
        text: 'מה קורה לנתונים ב-Container כשמוחקים אותו (docker rm)?',
        options: [
          'הנתונים נשמרים ב-Image',
          'הנתונים אובדים לחלוטין — Container Writable Layer נמחק. רק נתונים ב-Volume נשמרים',
          'הנתונים עוברים לContainer אחר',
          'הנתונים נשמרים אוטומטית ב-Host',
        ],
        correct: 1,
        explanation: 'Container = Image Layers (RO) + Writable Layer. docker rm: מוחק את ה-Writable Layer. Image נשאר. Volume: מחוץ ל-Container Lifecycle — docker rm לא מוחק Volumes (אלא עם -v). לכן: DB data, uploads, logs — חייבים ב-Volume.',
      },
      {
        id: 'vol-q2',
        text: 'מה ההבדל בין Named Volume ל-Bind Mount?',
        options: [
          'Named Volume לReadOnly, Bind Mount לReadWrite',
          'Named Volume: Docker מנהל מיקום (/var/lib/docker/volumes/) — portable, מנוהל. Bind Mount: נתיב ספציפי ב-Host — גמיש בDev, פחות portable',
          'Bind Mount מהיר יותר',
          'Named Volume לLinux, Bind Mount לWindows',
        ],
        correct: 1,
        explanation: 'Named Volume: `docker volume create`, Docker יודע איפה. `docker volume ls/inspect`. Portable בין Containers. Backup אחיד. Bind Mount: `/home/user/data:/app/data` — הנתיב חייב להיות קיים ב-Host. Dev: Bind Mount לSource Code (Hot Reload). Prod: Named Volume לData.',
      },
      {
        id: 'vol-q3',
        text: 'מתי כדאי להשתמש ב-tmpfs mount?',
        options: [
          'לDB data',
          'לנתונים רגישים (secrets, tokens) שלא צריכים להישמר על דיסק, ולקבצי temp עם ביצועים גבוהים — נמחרים מ-RAM, נמחקים כשContainer נעצר',
          'לSource Code בDev',
          'לCache קבוע',
        ],
        correct: 1,
        explanation: 'tmpfs: RAM-backed filesystem. יתרונות: מהיר מאוד, לא נכתב לדיסק (secrets לא יישארו). חסרונות: אובד כשContainer נעצר, מוגבל בגודל (RAM). שימוש: /tmp עם sensitive temp files, session tokens, scratch space לprocessing. `--tmpfs /tmp:size=100m,mode=1777`.',
      },
      {
        id: 'vol-q4',
        text: 'מה `docker volume prune` עושה?',
        options: [
          'מוחק כל ה-Volumes',
          'מוחק רק Volumes שאין Container שמשתמש בהם (anonymous ו-named לא משומשים) — לניקוי דיסק',
          'מוחק Named Volumes בלבד',
          'Compress Volumes לחיסכון מקום',
        ],
        correct: 1,
        explanation: 'volume prune: מוחק "dangling volumes" — Volumes ללא Container. Named Volume בשימוש: לא יימחק. Anonymous Volume (docker run -v /data): יימחק אם Container נמחק. `docker volume rm my-volume`: מחיקה ספציפית. `docker system prune --volumes`: הכל.',
      },
      {
        id: 'vol-q5',
        text: 'Bind Mount בDev — מה יתרונו על COPY בDockerfile?',
        options: [
          'Bind Mount מהיר יותר מCOPY',
          'שינוי קובץ ב-Host מיד משתקף ב-Container — Hot Reload ללא צורך ב-docker build מחדש. לDev בלבד: ב-Prod משתמשים ב-COPY לImage',
          'Bind Mount חסכוני בזיכרון',
          'COPY לא עובד עם Node.js',
        ],
        correct: 1,
        explanation: 'Dev Workflow עם Bind Mount: `docker run -v $(pwd)/src:/app/src myapp-dev`. שינוי קובץ JS ב-IDE → מיד ב-Container → nodemon/webpack מזהה ו-reload. ללא Bind Mount: כל שינוי = `docker build` + `docker run`. Prod: COPY בDockerfile — Image כולל את כל הקוד.',
      },
      {
        id: 'vol-q6',
        text: 'כיצד Containers מרובים יכולים לשתף Volume?',
        options: [
          'אי אפשר לשתף Volume',
          'מחברים אותו Named Volume לכל Container: `docker run -v shared-data:/data container1` + `docker run -v shared-data:/data container2` — שניהם קוראים וכותבים לאותם נתונים',
          'רק Container אחד יכול לMount Volume בו-זמנית',
          'שיתוף Volumes דורש Overlay Network',
        ],
        correct: 1,
        explanation: 'Shared Volume: מספר Containers → אותו Volume. שימוש: Log aggregator קורא Logs שApp כותב. Sidecar patterns. אזהרה: Race Conditions! אם שניהם כותבים לאותו קובץ ← corruption. DB: רק Container אחד בכתיבה בו-זמנית. Volume Plugins (NFS, GlusterFS): לShare בין Hosts.',
      },
      {
        id: 'vol-q7',
        text: '`docker run -v ./data:/var/lib/postgresql/data postgres` — מה קורה אם ./data ריקה?',
        options: [
          'postgres נכשל כי הספרייה ריקה',
          'postgres מאתחל DB חדש ב-./data ב-Host. ב-Named Volume: Docker מאתחל Volume ומעתיק תוכן מImage אם ריק. ב-Bind Mount: לא מעתיק',
          'Docker מוחק את ./data',
          'postgres לא רץ עם Bind Mount',
        ],
        correct: 1,
        explanation: 'Named Volume ריק: Docker מעתיק את התוכן מה-Image לVolume בהפעלה ראשונה (initialization). Bind Mount ריק: לא מעתיק — Container רואה ריק. postgres: אם /var/lib/postgresql/data ריק → מאתחל DB cluster חדש. אם לא ריק אבל לא DB → שגיאה.',
      },
      {
        id: 'vol-q8',
        text: 'מה Volume Driver ב-Docker?',
        options: [
          'Driver לביצועי I/O',
          'Plugin שמאפשר Volume ב-Storage חיצוני: AWS EFS, NFS, Azure Blob, Ceph — Container יכול לגשת לStorage מחוץ ל-Host',
          'Scheduler לVolumes',
          'Security layer לVolumes',
        ],
        correct: 1,
        explanation: 'Volume Plugins: local (ברירת מחדל), NFS, AWS EFS (docker-volume-efs), Azure File Storage, Ceph RBD, vSphere. שימוש: Container ב-Host A → Volume על NFS server → Container ב-Host B יכול לMount אותו Volume. Kubernetes: StorageClass + PersistentVolume = דומה.',
      },
      {
        id: 'vol-q9',
        text: 'מה `:ro` ב-Volume Mount?',
        options: [
          'Read Only — Container יכול לקרוא מה-Volume אך לא לכתוב. שימושי לConfig files, Secrets שלא אמורים להשתנות ב-Runtime',
          'Restart On failure',
          'Remote Only',
          'Read & Override',
        ],
        correct: 0,
        explanation: ':ro = Read-Only. `docker run -v ./config.yml:/app/config.yml:ro`. Container לא יכול לכתוב לקובץ — Protected. שימוש: SSL certificates, Config files, Code ב-Prod (לא אמורים להשתנות). Error בניסיון כתיבה: "Read-only file system".',
      },
      {
        id: 'vol-q10',
        text: 'DB Container קרס ואבד. הנתונים אבדו?',
        options: [
          'כן — תמיד כשContainer נמחק הנתונים אובדים',
          'לא, אם השתמשנו ב-Named Volume — Volume נשמר גם אחרי docker rm. Container חדש מה-DB Image + אותו Volume = נתונים שלמים',
          'הנתונים נשמרים ב-Image אוטומטית',
          'תלוי ב-DB type',
        ],
        correct: 1,
        explanation: 'Volume Lifecycle: עצמאי מContainer. `docker rm db-container` לא מוחק Volume. `docker run -v postgres-data:/var/lib/postgresql/data postgres:15` שוב → אותם נתונים! למחוק גם Volume: `docker rm -v container`. Named Volume: הדרך הנכונה ל-DB ב-Docker.',
      },
    ],
  },

  {
    id: 'docker-compose',
    title: 'Docker Compose',
    summary: 'הגדרת Multi-Container Apps — services, networks, volumes, depends_on ו-healthcheck',
    emoji: '🎼',
    content: [
      { type: 'heading', text: 'מה Docker Compose?' },
      {
        type: 'text',
        text: 'Docker Compose מאפשר להגדיר ולהריץ אפליקציות Multi-Container בקובץ YAML אחד. במקום docker run ארוך עם דגלים — קובץ מוקרא, ניתן לVersion Control, וניתן לשיתוף.',
      },
      {
        type: 'code',
        lang: 'yaml',
        caption: 'docker-compose.yml — Full Stack App',
        code: `version: '3.9'

services:
  # PostgreSQL Database
  db:
    image: postgres:15-alpine
    environment:
      POSTGRES_DB: myapp
      POSTGRES_USER: admin
      POSTGRES_PASSWORD: \${DB_PASSWORD}   # מtenv file
    volumes:
      - postgres-data:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U admin -d myapp"]
      interval: 10s
      timeout: 5s
      retries: 5

  # Backend API
  api:
    build:
      context: ./api
      dockerfile: Dockerfile
    ports:
      - "3000:3000"
    environment:
      DB_HOST: db
      DB_PORT: 5432
    depends_on:
      db:
        condition: service_healthy    # ממתין עד שDB בריא
    restart: unless-stopped

  # Frontend (Nginx)
  web:
    build: ./frontend
    ports:
      - "80:80"
    depends_on:
      - api

volumes:
  postgres-data:    # Named volume

networks:
  default:
    name: myapp-net`,
      },
      { type: 'heading', text: 'פקודות Docker Compose' },
      {
        type: 'table',
        caption: 'פקודות Compose עיקריות',
        headers: ['פקודה', 'מה עושה'],
        rows: [
          ['docker compose up -d', 'מריץ כל services ב-background'],
          ['docker compose down', 'עוצר ומוחק Containers ו-Networks'],
          ['docker compose down -v', 'גם מוחק Volumes'],
          ['docker compose logs -f api', 'Logs ב-Real-time של service'],
          ['docker compose ps', 'מצב כל services'],
          ['docker compose exec api bash', 'Shell ב-service'],
          ['docker compose build', 'בונה Images'],
          ['docker compose pull', 'מוריד Images עדכניות'],
          ['docker compose restart api', 'Restart service אחד'],
        ],
      },
      { type: 'tip', text: 'depends_on לבד לא מספיק! depends_on: service_started בלבד — Container פועל אבל DB לא מוכן. פתרון: `depends_on: db: condition: service_healthy` + `healthcheck` על DB. רק ככה API לא יקרוס כי DB עדיין מאתחל.' },
    ],
    questionBank: [
      {
        id: 'dc-q1',
        text: 'מה יתרון docker-compose.yml על הרצת docker run ידנית?',
        options: [
          'docker-compose מהיר יותר מdocker run',
          'קובץ YAML אחד שמגדיר כל ה-Stack: Declarative, ניתן לVersion Control, ניתן לשיתוף, `docker compose up` מריץ הכל בפקודה אחת',
          'docker-compose לProd בלבד',
          'docker-compose לא תומך ב-Volumes',
        ],
        correct: 1,
        explanation: 'docker run: ציווי (Imperative). docker-compose: הצהרתי (Declarative). יתרונות: קובץ מתועד, חלק מ-Git repo, ניתן לשחזר בדיוק. `docker compose up` בSingle command = כל Services + Networks + Volumes. הגדרת ENV Files: `.env` באותה תיקייה ← מוזרק אוטומטית.',
      },
      {
        id: 'dc-q2',
        text: 'מה `depends_on` ב-docker-compose?',
        options: [
          'מגדיר port dependencies',
          'מגדיר סדר הפעלה: service יחכה שהservices ב-depends_on יתחילו. עם condition: service_healthy — ממתין עד לHealthcheck תקין',
          'מורש רק ל-v3 Compose',
          'depends_on = Network dependency',
        ],
        correct: 1,
        explanation: 'depends_on: מגדיר שservice מתחיל רק אחרי אחרים. ברירת מחדל: service_started (Container רץ, לא בהכרח מוכן). service_healthy: ממתין לHealthcheck. service_completed_successfully: לב-init containers. בלי depends_on: כל services מתחילים במקביל.',
      },
      {
        id: 'dc-q3',
        text: 'מה עושה `docker compose down -v`?',
        options: [
          'מוחק Images',
          'עוצר ומוחק Containers ו-Networks שנוצרו על ידי Compose, וגם מוחק Named Volumes המוגדרים בקובץ — מסיר הכל',
          'מוחק רק Volumes אנונימיים',
          'שקול ל-docker compose stop',
        ],
        correct: 1,
        explanation: 'down: מוחק Containers + Networks. -v: גם Named Volumes. שימוש: Reset מלא של סביבה (Dev). אזהרה: DB data נמחק! ב-Prod: אל תריצו down -v בטעות. down בלי -v: Volumes נשמרים — ניתן docker compose up שוב עם אותם נתונים.',
      },
      {
        id: 'dc-q4',
        text: 'איך services ב-Compose מתקשרים ביניהם?',
        options: [
          'דרך Port Mapping לHost ובחזרה',
          'DNS אוטומטי לפי שם ה-Service: service בשם "db" נגיש ב-`db:5432` מכל Service אחר. Compose יוצר Custom Network אוטומטית',
          'חייבים לציין Network ידנית',
          'דרך IP ספציפי שמוגדר ב-Compose',
        ],
        correct: 1,
        explanation: 'Compose: יוצר Default Network אוטומטי בשם `<project>_default`. כל services ב-Network הזה. DNS: שם Service = DNS name. `api` מתחבר ל-`db:5432`. Port Mapping (-p): רק לגישה מ-Host. Compose network isolation: שתי Stack נפרדות לא מדברות ביניהן.',
      },
      {
        id: 'dc-q5',
        text: 'מה healthcheck בdocker-compose?',
        options: [
          'בדיקת גרסת Docker',
          'פקודה שDocker מריץ תקופתית לבדוק שה-Container פועל כהלכה: healthy/unhealthy/starting. מאפשר depends_on: condition: service_healthy',
          'ניטור CPU וזיכרון',
          'בדיקת Connection לRegistry',
        ],
        correct: 1,
        explanation: 'healthcheck: test: פקודה לבדיקה (exit 0 = healthy). interval: כל כמה. timeout: כמה לחכות לתשובה. retries: כמה נסיונות לפני unhealthy. start_period: grace period בהתחלה. `pg_isready`: PostgreSQL health check. `curl -f http://localhost/health`: HTTP health check.',
      },
      {
        id: 'dc-q6',
        text: 'מה `docker compose exec api bash` עושה?',
        options: [
          'מריץ Container חדש של api',
          'פותח Shell ב-Container הפועל של service בשם api — שקול ל-docker exec -it <container> bash, אבל לפי שם Service',
          'מריץ bash script על כל Services',
          'מחבר Terminal ל-Docker Daemon',
        ],
        correct: 1,
        explanation: 'compose exec: פועל על running service. אינו מצריך Container ID — Service name מספיק. שימוש: `docker compose exec db psql -U admin myapp` לגישה לDB. `docker compose exec api env` לראות env vars. שקול ל-docker exec -it.',
      },
      {
        id: 'dc-q7',
        text: 'מה env_file ב-docker-compose?',
        options: [
          'יוצר קובץ env בContainer',
          'טוען משתני סביבה מקובץ חיצוני (.env): מונע hardcoding של passwords ב-YAML, מאפשר גרסאות שונות לDev/Prod',
          'מגדיר Environment Variables ל-Build',
          'מצפין משתני סביבה',
        ],
        correct: 1,
        explanation: 'env_file: `env_file: - .env` → טוען כל VAR=VALUE מהקובץ. `.env` ב-Compose root: מוזרק אוטומטית ל-${VAR} ב-YAML. אל תוסיפו .env ל-Git (.gitignore)! .env.example: כן ל-Git, ל-Documentation. Compose: `docker compose --env-file prod.env up`.',
      },
      {
        id: 'dc-q8',
        text: 'מה scale ב-docker compose?',
        options: [
          'docker compose scale מגדיל CPU',
          '`docker compose up --scale api=3` מריץ 3 instances של service api — בלי Load Balancer, Port Conflict אם מוגדר -p',
          'Scale מאזן עומסים אוטומטית',
          'Scale רק ב-Docker Swarm',
        ],
        correct: 1,
        explanation: 'scale: `--scale service=N` → N Containers לService. בעיה: אם Service מגדיר `ports: - "3000:3000"` → Port conflict ב-3 instances. פתרון: אל תגדירו fixed host port כשscaling. Load Balancer: Nginx/Traefik לפני instances. K8s: ReplicaSet = scale managed properly.',
      },
      {
        id: 'dc-q9',
        text: 'מה `build:` לעומת `image:` ב-Service?',
        options: [
          'build: לProd, image: לDev',
          'image: שולף Image מRegistry. build: בונה Image מDockerfile מקומי. שניהם יכולים להיות ב-Production — image לStateless services, build לCode שלך',
          'image: מהיר יותר',
          'build: לא ניתן ב-Compose',
        ],
        correct: 1,
        explanation: '`image: nginx:1.25`: שולף מRegistry. `build: ./api`: מריץ docker build ב-./api. `build: context: . dockerfile: Dockerfile.prod`: גמיש יותר. `docker compose build`: בונה כל services עם build. `docker compose pull`: מוריד כל images. CI/CD: build → push לRegistry → deploy עם image:.',
      },
      {
        id: 'dc-q10',
        text: 'איך ניתן לעצור service ספציפי ב-Compose מבלי לעצור את שאר ה-Stack?',
        options: [
          'אי אפשר — Compose הוא הכל-או-כלום',
          '`docker compose stop api` עוצר את service api בלבד. `docker compose start api` מפעיל שוב. `docker compose restart api` מפעיל מחדש',
          'חייבים docker stop <container-id>',
          '`docker compose pause api` עוצר ב-Freeze',
        ],
        correct: 1,
        explanation: 'compose stop/start/restart: עובד על Services בודדים. stop: SIGTERM → SIGKILL. pause: Freeze (SIGSTOP) — Container לא מגיב אבל State נשמר. unpause: ממשיך. שימוש: הפעלה מחדש של API אחרי שינוי Config, מבלי להפיל DB.',
      },
    ],
  },

  {
    id: 'docker-images',
    title: 'Image Management ו-Multi-Stage Builds',
    summary: 'Build Cache, Multi-Stage Builds, .dockerignore, Image Layers ו-Optimization',
    emoji: '🏗️',
    content: [
      { type: 'heading', text: 'Multi-Stage Builds' },
      {
        type: 'text',
        text: 'Multi-Stage Build מאפשר לבנות Image בשלבים: Stage 1 — Build (compiler, dev dependencies). Stage 2 — Production (Runtime בלבד, ללא tools). התוצאה: Image קטן ומאובטח.',
      },
      {
        type: 'code',
        lang: 'dockerfile',
        caption: 'Multi-Stage Build — Node.js',
        code: `# Stage 1: Build
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build     # TypeScript → JavaScript

# Stage 2: Production
FROM node:20-alpine AS production
WORKDIR /app

# מעתיקים רק מה-Stage הקודם
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package*.json ./
RUN npm ci --only=production     # בלי devDependencies

USER node
EXPOSE 3000
CMD ["node", "dist/server.js"]

# ---
# Build:    docker build -t myapp:1.0 .
# Target:   docker build --target builder -t myapp-dev .`,
      },
      { type: 'heading', text: 'Image Layer Optimization' },
      {
        type: 'code',
        lang: 'dockerfile',
        caption: 'Layer Optimization — Best Practices',
        code: `# ❌ גרוע — כל package = Layer נפרד, ומוחק ב-Layer אחר
RUN apt-get update
RUN apt-get install -y curl
RUN apt-get install -y git
RUN rm -rf /var/lib/apt/lists/*

# ✅ טוב — Layer אחד, cleanup באותה פקודה
RUN apt-get update && apt-get install -y \\
    curl \\
    git \\
  && rm -rf /var/lib/apt/lists/*

# Layer sizes:
# כל RUN יוצר Layer. אם הוספת קובץ ב-RUN אחד ומחקת ב-RUN אחר
# ← Layer הראשון עדיין מכיל את הקובץ! Image לא קטן.
# פתרון: מחיקה באותה פקודה RUN`,
      },
      {
        type: 'table',
        caption: 'כלים לניהול Images',
        headers: ['פקודה', 'שימוש'],
        rows: [
          ['docker image ls', 'רשימת Images מקומיות'],
          ['docker image history myapp', 'Layers + גדלים'],
          ['docker image inspect myapp', 'JSON מלא על Image'],
          ['docker image prune', 'מוחק Dangling Images (none:none)'],
          ['docker image prune -a', 'מוחק כל Images לא בשימוש'],
          ['docker scout cves myapp', 'סריקת CVEs ב-Image'],
          ['dive myapp', 'כלי Third-Party לניתוח Layers'],
        ],
      },
      { type: 'tip', text: 'Dangling Images: `<none>:<none>` — Images שנבנו ישנות שיש להן גרסה חדשה. לנקות: `docker image prune`. לבדוק גודל Layers: `docker image history myapp:1.0 --no-trunc`. Layer שגדול = מקום לאופטימיזציה.' },
    ],
    questionBank: [
      {
        id: 'img-q1',
        text: 'מה Multi-Stage Build ולמה משתמשים בו?',
        options: [
          'בניית Image ממספר Registries',
          'Dockerfile עם מספר FROM — Stage Build כולל Compiler/Dev Tools, Stage Production מעתיק רק את התוצר. Image קטן ב-Production ללא כלי פיתוח',
          'בניית Image ב-Cloud',
          'Build מקביל של Images',
        ],
        correct: 1,
        explanation: 'Multi-Stage: פותר "Fat Image". Stage builder: node:20 עם devDependencies + TypeScript compiler. Stage production: node:20-alpine + dist/ + production deps בלבד. תוצאה: Image שלא כולל TypeScript compiler, jest, webpack. דוגמה: Go binary — compiler 500MB, binary 10MB → Image 10MB.',
      },
      {
        id: 'img-q2',
        text: 'מה `COPY --from=builder` עושה?',
        options: [
          'מעתיק מ-Registry בשם builder',
          'מעתיק קבצים מ-Stage קודם בשם builder לStage הנוכחי — הדרך להעביר output בין Stages ב-Multi-Stage Build',
          'מעתיק מContainer פועל',
          'מעתיק בין Layers',
        ],
        correct: 1,
        explanation: 'COPY --from=<stage>: מעתיק מStage קודם. `--from=builder /app/dist ./dist`: רק תיקיית dist מה-Build stage. `--from=0`: מספור במקום שם. External copy: `COPY --from=nginx:1.25 /etc/nginx/nginx.conf /etc/nginx/`. כל מה שלא עבר COPY --from לא קיים ב-Image הסופי.',
      },
      {
        id: 'img-q3',
        text: 'למה חשוב לנקות apt cache ב-אותה פקודה RUN?',
        options: [
          'כדי לחסוך RAM',
          'כל RUN = Layer. מחיקה ב-RUN אחר לא מקטינה Image — ה-Layer הקודם עדיין מכיל את הקבצים. מחיקה באותה RUN = Layer אחד קטן',
          'apt cache מעצים builds',
          'Docker דורש זאת',
        ],
        correct: 1,
        explanation: 'Union Filesystem: Layers נצברים. Layer N מוסיף קבצים. Layer N+1 מוחק — אבל Layer N עדיין ב-Image (רק "מוסתר"). Image size = סכום כל Layers. תיקון: `RUN apt-get update && apt-get install -y pkg && rm -rf /var/lib/apt/lists/*` — הכל ב-Layer אחד.',
      },
      {
        id: 'img-q4',
        text: 'מה Dangling Image?',
        options: [
          'Image לא מאומת',
          'Image ללא Tag (`<none>:<none>`) — נוצר כשבונים Image חדש עם אותו Tag. הישן מאבד Tag ונהיה Dangling. `docker image prune` מוחק אותם',
          'Image לא ניתן לmount',
          'Image גדול מדי',
        ],
        correct: 1,
        explanation: 'Scenario: docker build -t myapp:latest . (Image A). שינוי קוד → docker build -t myapp:latest . (Image B). Image A → <none>:<none> (dangling). `docker image prune`: מוחק dangling. `-a`: מוחק גם Images שאין Container שמשתמש בהם. CI/CD: docker image prune אחרי builds לחיסכון דיסק.',
      },
      {
        id: 'img-q5',
        text: 'מה `docker image history myapp` מציג?',
        options: [
          'היסטוריית Pulls של Image',
          'כל Layers של Image: הפקודה שיצרה כל Layer, גודלו ו-Created time — עוזר לזהות Layers גדולים לאופטימיזציה',
          'רשימת Tags ישנות',
          'Changelog של Image',
        ],
        correct: 1,
        explanation: 'docker image history: כל layer + Size. Layer גדול = מקום לאופטימיזציה. COPY . = כל Source code (אמור להיות קטן). RUN npm install = node_modules (עשרות MB — נורמלי). `dive` (third-party tool): UI מפורט יותר לLayer analysis.',
      },
      {
        id: 'img-q6',
        text: 'מה BuildKit ב-Docker?',
        options: [
          'כלי GUI לבניית Images',
          'Build Engine מתקדם: Parallel builds, Better caching, Secret handling, Reduced Image size, Faster. מופעל עם `DOCKER_BUILDKIT=1` או בברירת מחדל ב-Docker 23+',
          'Kubernetes Build Plugin',
          'Registry לImages ב-Build time',
        ],
        correct: 1,
        explanation: 'BuildKit: `DOCKER_BUILDKIT=1 docker build`. יתרונות: Parallel stage builds. Better layer caching. `RUN --mount=type=cache`: Cache מועבר בין builds. `RUN --mount=type=secret`: secrets ב-Build שלא נשמרים ב-Image. Docker 23+: BuildKit default. `docker buildx`: Multi-platform builds (AMD64+ARM64).',
      },
      {
        id: 'img-q7',
        text: 'מה `docker buildx build --platform linux/amd64,linux/arm64`?',
        options: [
          'בניית Image עבור 2 Containers',
          'Multi-Platform Build: Image אחד שרץ על AMD64 (x86 servers) וגם ARM64 (M1/M2 Mac, AWS Graviton, Raspberry Pi) — Docker Hub מחלק לפי Platform אוטומטית',
          'Build ב-2 שרתים במקביל',
          'Build עם 2 Dockerfiles',
        ],
        correct: 1,
        explanation: 'Multi-Platform: Image Manifest → מצביע לImage הנכון לפי CPU Architecture. `docker pull nginx`: על M1 Mac → ARM64. על Intel Server → AMD64. `docker buildx create --use`: יוצר Builder instance. `--push`: דוחף לRegistry עם Manifest. מבטיח שImage רץ בכל Architecture.',
      },
      {
        id: 'img-q8',
        text: 'מה Image Digest לעומת Tag?',
        options: [
          'Digest = Tag מסוג אחר',
          'Tag: שם סמנטי שיכול להשתנות (`latest` מצביע על גרסאות שונות). Digest: SHA256 של Image Content — בלתי ניתן לשינוי, מזהה תוכן ספציפי לחלוטין',
          'Digest: Hash של Tag בלבד',
          'Digest = Image ID',
        ],
        correct: 1,
        explanation: '`nginx:latest` Tag: יכול לשנות → nginx:1.24 היום, nginx:1.25 מחר. Immutable reference: `nginx@sha256:abc123...` — תמיד אותו Image. Production pinning: `FROM nginx:1.25.3@sha256:...` מבטיח אותו Image בכל build. `docker pull nginx:latest`: מוריד Image הנוכחי שTag מצביע עליו.',
      },
      {
        id: 'img-q9',
        text: 'מה `docker scout cves myapp:1.0` עושה?',
        options: [
          'בודק גרסת Docker',
          'סורק Image לאיתור CVEs (Common Vulnerabilities and Exposures) — vulnerabilities ידועות בPackages של Image. חלק מDocker Scout (service בתשלום/חינמי)',
          'מעדכן Image אוטומטית',
          'בונה Image מחדש',
        ],
        correct: 1,
        explanation: 'Docker Scout: Image vulnerability scanning. CVEs: פגיעויות ידועות ב-OS packages, dependencies. גם: Trivy, Snyk, Grype — alternative scanners. CI/CD Integration: סריקה לפני Push. Policy: חסום Images עם Critical CVEs. Base Image update: הדרך הנכונה לתיקון CVEs ב-Base Layer.',
      },
      {
        id: 'img-q10',
        text: 'Image בגודל 2GB — איך להקטין?',
        options: [
          'לכווץ Image עם gzip',
          'Multi-Stage Build (רק Runtime), Alpine Base Image, מחיקת Cache ב-אותה RUN, .dockerignore לא לכלול node_modules/build artifacts, devDependencies בStage Build בלבד',
          'לשנות ל-Windows Containers',
          'Image לא ניתן להקטנה',
        ],
        correct: 1,
        explanation: 'אסטרטגיות הקטנת Image: 1) Alpine/slim base (ubuntu:22.04=77MB, alpine=5MB). 2) Multi-Stage (compiler לא בImage הסופי). 3) npm ci --only=production (לא devDeps). 4) apt cleanup באותה RUN. 5) .dockerignore (לא node_modules, .git). 6) COPY מינימלי (רק מה שצריך). תוצאה: מGb ל-100-200MB.',
      },
    ],
  },

  {
    id: 'docker-registry',
    title: 'Docker Registry ו-Image Management',
    summary: 'Docker Hub, ECR, Tagging, Push/Pull, Private Registry ו-Credentials',
    emoji: '📦',
    content: [
      { type: 'heading', text: 'Docker Registry — מאגר Images' },
      {
        type: 'table',
        caption: 'Registry אפשרויות',
        headers: ['Registry', 'ספק', 'מאפיינים'],
        rows: [
          ['Docker Hub', 'Docker Inc.', 'Public/Private, ברירת מחדל, Rate limits לAnonymous'],
          ['ECR (Elastic Container Registry)', 'AWS', 'Managed, IAM auth, Lifecycle policies'],
          ['GCR / Artifact Registry', 'Google Cloud', 'Managed, Vulnerability scanning'],
          ['ACR (Azure Container Registry)', 'Microsoft Azure', 'Managed, RBAC, Geo-replication'],
          ['Harbor', 'CNCF', 'Self-hosted, Open Source, Scanning, Replication'],
          ['GitHub Container Registry (GHCR)', 'GitHub', 'Integrated עם GitHub Actions, Free'],
        ],
      },
      { type: 'heading', text: 'Push ו-Pull מRegistry' },
      {
        type: 'code',
        lang: 'bash',
        caption: 'Tag ו-Push לDockerHub ו-ECR',
        code: `# Docker Hub
docker login
docker tag myapp:1.0 myusername/myapp:1.0
docker tag myapp:1.0 myusername/myapp:latest
docker push myusername/myapp:1.0
docker push myusername/myapp:latest

# Pull
docker pull myusername/myapp:1.0

# AWS ECR
aws ecr get-login-password --region us-east-1 \\
  | docker login --username AWS \\
    --password-stdin 123456789.dkr.ecr.us-east-1.amazonaws.com

# Tag לECR
docker tag myapp:1.0 \\
  123456789.dkr.ecr.us-east-1.amazonaws.com/myapp:1.0
docker push \\
  123456789.dkr.ecr.us-east-1.amazonaws.com/myapp:1.0

# Image Naming:
# <registry>/<namespace>/<name>:<tag>
# docker.io/library/nginx:1.25   ← Docker Hub Official
# docker.io/myuser/myapp:1.0     ← Docker Hub Personal`,
      },
      { type: 'tip', text: 'Tagging strategy: השתמשו ב-Semantic Versioning: `myapp:1.2.3`, `myapp:1.2`, `myapp:1`, `myapp:latest`. ב-CI/CD: tag עם Git SHA לtraceability: `myapp:abc1234`. אל תסתמכו על latest בProduction — תמיד גרסה ספציפית.' },
    ],
    questionBank: [
      {
        id: 'reg-q1',
        text: 'מה פורמט שם Image מלא ב-Docker?',
        options: [
          'שם Image בלבד',
          '<registry>/<namespace>/<name>:<tag> — דוגמה: 123456.dkr.ecr.amazonaws.com/myapp:1.0. ללא Registry: ברירת מחדל docker.io',
          '<name>:<version> בלבד',
          'URL מלאה עם https://',
        ],
        correct: 1,
        explanation: 'Image reference: [registry/][namespace/]name[:tag|@digest]. docker.io/library/nginx:1.25 = nginx:1.25 (default). myuser/app:2.0 = docker.io/myuser/app:2.0. ECR: 123456.dkr.ecr.us-east-1.amazonaws.com/myapp:sha-abc123. GHCR: ghcr.io/user/repo:main.',
      },
      {
        id: 'reg-q2',
        text: 'למה ECR עדיף על Docker Hub ב-AWS Production?',
        options: [
          'ECR מהיר יותר',
          'IAM Authentication (לא credentials ב-CI/CD), ממוקם ב-AWS Region לlatency נמוכה, Integration עם ECS/EKS, Lifecycle policies לניקוי Images ישנות, Vulnerability scanning',
          'ECR חינמי תמיד',
          'Docker Hub לא תומך ב-AWS',
        ],
        correct: 1,
        explanation: 'ECR יתרונות: IAM roles ל-Authentication (לא username/password). Private by default. Same-region: No data transfer cost ב-Pull לECS/EKS. Lifecycle policies: מוחק Images ישנות אוטומטית. ECR Public Gallery: גרסה פרטית ל-Docker Hub Public. Immutable tags: מונע overwrite.',
      },
      {
        id: 'reg-q3',
        text: 'מה `docker tag myapp:1.0 myuser/myapp:latest` עושה?',
        options: [
          'מעתיק Image',
          'מוסיף Tag נוסף לאותו Image Layer — לא מעתיק. עכשיו לImage יש שני names: myapp:1.0 וmyuser/myapp:latest, אבל Image ID זהה',
          'משנה שם Image',
          'יוצר Image חדש',
        ],
        correct: 1,
        explanation: 'docker tag: Pointer בלבד. Image ID זהה. שימוש: לPush לRegistry צריך שם עם registry prefix. `docker tag local-name:v1 registry.io/repo/name:v1`. Multiple tags: `myapp:latest` + `myapp:1.5.2` + `myapp:1.5` → כולם אותו Image. נוח לRollback: `docker tag myapp:1.4.9 myapp:stable`.',
      },
      {
        id: 'reg-q4',
        text: 'Rate Limit ב-Docker Hub — מה הבעיה ובפתרון?',
        options: [
          'אין Rate Limit ב-Docker Hub',
          'Anonymous pulls: 100/6h לIP. Authenticated: 200/6h. CI/CD: עלול לקרוס. פתרון: Docker Hub Pro, Mirror Registry, Pull-through cache (ECR/Harbor), או שמירת Images ב-Private Registry',
          'Rate Limit רק לImages פרטיים',
          'Rate Limit: 10 pulls ביום',
        ],
        correct: 1,
        explanation: 'Docker Hub Rate Limits (2024): Unauthenticated: 100 pulls/6h לIP. Free Auth: 200 pulls/6h. Pro: Unlimited. CI/CD: אם 10 jobs רצים במקביל → 100 pulls/6h נגמרים מהר. פתרון: Mirror/Cache ב-ECR (pull-through cache) → pull פעם אחת, כל instance משתמש ב-Cache. Kubernetes: imagePullSecret.',
      },
      {
        id: 'reg-q5',
        text: 'מה Lifecycle Policy ב-ECR?',
        options: [
          'מדיניות גיבוי Images',
          'כלל שמוחק Images ישנות אוטומטית: "שמור רק 10 Images האחרונות", "מחק Images ישנות מ-30 יום" — חוסך עלויות Storage',
          'Policy לAuthentication',
          'כלל להפעלת Images',
        ],
        correct: 1,
        explanation: 'Lifecycle Policy: JSON rules. דוגמה: `{"rules": [{"rulePriority": 1, "description": "Keep last 10", "selection": {"tagStatus": "any", "countType": "imageCountMoreThan", "countNumber": 10}, "action": {"type": "expire"}}]}`. תוצאה: ECR שומר רק 10 Images אחרונות. חיסכון: Images = $0.10/GB/month. 100 Images × 1GB = $10/month חיסכון.',
      },
      {
        id: 'reg-q6',
        text: 'מה GHCR (GitHub Container Registry) ויתרונו?',
        options: [
          'Registry של GitHub Enterprise בלבד',
          'Container Registry של GitHub — חינמי לOpen Source, מחובר ל-GitHub Actions ישיר (GITHUB_TOKEN), Images ניתן לקשר ל-Repository ו-Packages',
          'GHCR = Docker Hub בשם אחר',
          'GHCR רק ל-Public Images',
        ],
        correct: 1,
        explanation: 'GHCR: ghcr.io. יתרון: `GITHUB_TOKEN` ל-Auth ב-Actions (לא Secret נפרד). Images קשורים ל-Repository ← visibility מ-Repository. Free לPublic repos. Push ב-Action: `docker push ghcr.io/${{ github.repository }}:latest`. Packages tab ב-GitHub מציג Images.',
      },
      {
        id: 'reg-q7',
        text: 'מה Immutable Tags ב-ECR?',
        options: [
          'Tags לא ניתן לשינוי ב-Client',
          'ECR Feature שמונע Overwrite של Tag קיים — `myapp:1.2.3` לא ניתן לדחוף שוב עם תוכן אחר. מבטיח שVersioned Tags הם תמיד אותו Image',
          'Tags שנמחקים אוטומטית',
          'Immutable = Tags פרטיים',
        ],
        correct: 1,
        explanation: 'Immutable Tags: Enabled ב-ECR Repository settings. שגיאה אם מנסים לדחוף Tag קיים: `ImageTagAlreadyExistsException`. חשוב לProduction: `myapp:1.0.5` = תמיד אותו Image. `latest` Tag: בדרך כלל לא Immutable (עדכון מותר). CI/CD: `git tag v1.0.5` → Build → Push `myapp:1.0.5` → Immutable.',
      },
      {
        id: 'reg-q8',
        text: 'Harbor — מתי עדיף על Cloud Registry?',
        options: [
          'תמיד עדיף על Cloud',
          'Self-hosted Open Source Registry: עבור Air-gapped environments (ללא Internet), Compliance שדורש On-Premise, Geo-replication בין מספר Sites, Cost optimization בScale גדול',
          'Harbor רק ל-Kubernetes',
          'Harbor לא תומך ב-Docker Images',
        ],
        correct: 1,
        explanation: 'Harbor: CNCF Graduated project. Features: OCI Compliant, Vulnerability scanning (Trivy), Image replication, RBAC, Helm Charts registry. Air-gapped: בLab/Military/Banking שאין Internet → Registry מקומי. Cost: אחרי נפח מסוים, Self-hosted יותר זול מCloud Managed. Complexity: Maintenance overhead.',
      },
      {
        id: 'reg-q9',
        text: 'מה `docker login` שומר ב-Machine?',
        options: [
          'שומר ב-Environment Variable',
          'Credentials (token/password) ב-~/.docker/config.json — בצורת Base64. לProduction/CI: להשתמש ב-Credential Helpers (AWS ECR helper, Google credential helper) שמחזירים Token זמני',
          'שומר ב-Keychain של OS בלבד',
          'לא שומר — מבקש בכל פעם',
        ],
        correct: 1,
        explanation: 'docker login: שומר credentials ב-~/.docker/config.json. Base64 ≠ Encryption! `cat ~/.docker/config.json` מציג credentials. Credential Store: Docker Desktop משתמש ב-OS Keychain (macOS Keychain, Windows Credential Manager) — בטוח יותר. CI/CD: משתמשים ב-Secrets/IAM roles — לא `docker login` עם passwords ב-plaintext.',
      },
      {
        id: 'reg-q10',
        text: 'אסטרטגיית Tagging מומלצת ב-CI/CD?',
        options: [
          'תמיד latest בלבד',
          'Git SHA לTracking (`myapp:abc1234`), Semantic Version לRelease (`myapp:1.2.3`), Branch name לDev (`myapp:main`), latest לMost-recent. לעולם לא latest בלבד ב-Production',
          'timestamp בלבד',
          'Build number בלבד',
        ],
        correct: 1,
        explanation: 'Tagging Strategy: Git SHA: `myapp:$(git rev-parse --short HEAD)` ← Traceable, Unique. SemVer: `myapp:1.2.3` לRelease. latest: מצביע על Last Release. Feature branch: `myapp:feature-login`. Production Deployment: תמיד Tag ספציפי, לא latest → deterministic deployments → rollback פשוט.',
      },
    ],
  },

  {
    id: 'docker-security',
    title: 'Docker Security',
    summary: 'Non-root User, Secrets, Image Scanning, Read-Only Filesystem, Capabilities ו-Best Practices',
    emoji: '🔒',
    content: [
      { type: 'heading', text: 'עקרונות אבטחת Docker' },
      {
        type: 'table',
        caption: 'Docker Security Best Practices',
        headers: ['עקרון', 'יישום', 'סיכון אם מתעלמים'],
        rows: [
          ['Non-root User', 'USER appuser בDockerfile', 'Root ב-Container → פוטנציאלית Root ב-Host'],
          ['Minimal Base Image', 'Alpine/distroless', 'יותר Packages = יותר CVEs'],
          ['No Secrets in Image', 'Env vars ב-Runtime, Secrets Manager', 'docker history → credentials גלויים'],
          ['Read-Only Filesystem', '--read-only', 'Malware לא יוכל לכתוב קבצים'],
          ['Limit Capabilities', '--cap-drop ALL', 'הרשאות מיותרות = Attack Surface'],
          ['Image Scanning', 'Trivy, Snyk, Docker Scout', 'CVEs ידועות לא מתוקנות'],
          ['Resource Limits', '--memory --cpus', 'Container יכול לאכול כל משאבי Host'],
        ],
      },
      { type: 'heading', text: 'Secrets בDocker — הדרך הנכונה' },
      {
        type: 'code',
        lang: 'bash',
        caption: 'Docker Secrets — DO and DONT',
        code: `# ❌ אל תעשו — Secret ב-Image History!
FROM python:3.12
ENV DB_PASSWORD=mysecret123    # נשמר ב-Image!

# ❌ אל תעשו — Secret בARG (ב-History!)
ARG API_KEY
RUN curl -H "Authorization: $API_KEY" ...

# ✅ עשו — Runtime Secret דרך env var
docker run -e DB_PASSWORD=$DB_PASSWORD myapp

# ✅ BuildKit Secret — לא נשמר ב-Image
# Dockerfile:
RUN --mount=type=secret,id=api_key \\
    curl -H "Authorization: $(cat /run/secrets/api_key)" ...
# Build:
docker build --secret id=api_key,src=./secret.txt .

# ✅ Docker Compose Secrets
secrets:
  db_password:
    file: ./secrets/db_password.txt
services:
  api:
    secrets:
      - db_password   # ← /run/secrets/db_password ב-Container`,
      },
      {
        type: 'code',
        lang: 'bash',
        caption: 'אבטחת Runtime',
        code: `# Read-Only Filesystem
docker run --read-only myapp
# אם צריך כתיבה ספציפית:
docker run --read-only --tmpfs /tmp myapp

# הגבלת Capabilities
docker run --cap-drop ALL --cap-add NET_BIND_SERVICE nginx

# Seccomp Profile
docker run --security-opt seccomp=my-profile.json myapp

# No new privileges
docker run --security-opt no-new-privileges myapp

# Resource Limits
docker run -m 512m --cpus="0.5" myapp`,
      },
      { type: 'tip', text: 'docker history: `docker history myapp --no-trunc` מציג כל פקודה + ENV. אם ARG/ENV כוללים secrets — גלויים! Secrets Manager: AWS Secrets Manager, HashiCorp Vault, Azure Key Vault — inject לRuntime, לא ל-Image.' },
    ],
    questionBank: [
      {
        id: 'sec-q1',
        text: 'למה לא להריץ Container כRoot?',
        options: [
          'Root Container פחות מהיר',
          'Container Escape: אם תוקף מנצל vulnerability ב-App ומקבל Shell ב-Container כ-Root — בתרחישי Escape מסוימים יקבל Root על ה-Host. Non-root User = Principle of Least Privilege',
          'Docker לא תומך ב-Root Containers',
          'Root Containers לא יכולים לקרוא Files',
        ],
        correct: 1,
        explanation: 'Container Security: Root ב-Container לא = Root ב-Host אוטומטית. אבל: User Namespace ב-Docker: ה-Root ב-Container ממופה ל-User לא-privileged ב-Host. אם User Namespaces לא מוגדרים: Root ב-Container = UID 0 ב-Host. Best Practice: USER node/appuser ב-Dockerfile.',
      },
      {
        id: 'sec-q2',
        text: 'מה הסכנה ב-`ENV DB_PASSWORD=secret` ב-Dockerfile?',
        options: [
          'לא נגיש ב-Runtime',
          '`docker history image --no-trunc` מציג כל ENV commands ← Password גלוי לכל מי שיש לו גישה ל-Image. Image ב-Registry = credentials ב-Clear Text',
          'ENV vars לא עובדים ב-Docker',
          'אין סכנה — ENV מוצפן',
        ],
        correct: 1,
        explanation: 'Image History Leak: כל RUN, ENV, ARG נשמר ב-Layer Metadata. `docker history --no-trunc`: מציג הכל. ב-Docker Hub Public Image: כולם רואים. פתרון: secrets ב-Runtime (docker run -e), או BuildKit Secrets (`--mount=type=secret`) שלא נשמרים ב-History, או Secrets Manager.',
      },
      {
        id: 'sec-q3',
        text: 'מה `--read-only` ב-`docker run`?',
        options: [
          'Container יכול לקרוא בלבד מ-Host',
          'Container Filesystem ב-Read-Only: Container לא יכול לכתוב לשום קובץ. Malware שחדר לא יכול לכתוב scripts/backdoors. תהליכים לגיטימיים: `--tmpfs /tmp` לכתיבה זמנית',
          'Image Read-Only',
          'Volume Read-Only',
        ],
        correct: 1,
        explanation: '--read-only: Writable Layer הופך ל-RO. `echo test > /app/file` → "Read-only file system" error. שימוש: `docker run --read-only --tmpfs /tmp:size=50m app`. הגנה: Fileless malware לא יכול לכתוב payloads. Config שצריכה כתיבה: tmpfs מוגבל. Stateless apps: פשוט ל-apply.',
      },
      {
        id: 'sec-q4',
        text: 'מה Linux Capabilities וMה `--cap-drop ALL`?',
        options: [
          'CPU capabilities של Container',
          'Linux Capabilities: חלוקת הרשאות Root ל-Units קטנות (NET_BIND_SERVICE, SYS_ADMIN, etc). `--cap-drop ALL`: מסיר כל Capabilities. `--cap-add NET_BIND_SERVICE`: מחזיר רק מה שנחוץ',
          'Docker network capabilities',
          'Memory capabilities',
        ],
        correct: 1,
        explanation: 'Capabilities: Root = כל Capabilities. NET_BIND_SERVICE: bind לPorts < 1024. SYS_PTRACE: debug processes. CHOWN: שינוי File ownership. Docker default: subset של Capabilities. `--cap-drop ALL --cap-add NET_BIND_SERVICE`: nginx שיכול לbind port 80 אבל לא יותר. Kubernetes: securityContext.capabilities.',
      },
      {
        id: 'sec-q5',
        text: 'מה Trivy ו-כיצד משתמשים בו?',
        options: [
          'Trivy = Docker CLI alias',
          'Open Source Image Scanner (Aqua Security): סורק Image לCVEs ב-OS packages, Language packages (npm, pip), Misconfigurations. `trivy image myapp:1.0` — ב-CI/CD לחסום Deployments עם Critical CVEs',
          'Trivy = Image Registry',
          'Trivy = Log analyzer',
        ],
        correct: 1,
        explanation: 'Trivy: `trivy image nginx:1.25`. Output: CVE-2023-XXXX, Severity: CRITICAL/HIGH/MEDIUM. CI/CD Integration: `trivy image --exit-code 1 --severity CRITICAL myapp` → fails pipeline אם יש CRITICAL. Also scans: Dockerfile misconfigs, Terraform, Kubernetes manifests. Docker Scout: similar, built-in Docker.',
      },
      {
        id: 'sec-q6',
        text: 'מה Distroless Images?',
        options: [
          'Images ללא Docker',
          'Images של Google ללא Package Manager, Shell, וכלי OS רבים — רק Application ו-Runtime. Attack Surface מינימלי כי אין bash, apt, curl לתוקף להשתמש בהם',
          'Images ללא OS',
          'Images ללא Architecture ספציפית',
        ],
        correct: 1,
        explanation: 'gcr.io/distroless/java, /python3, /nodejs. בלי: bash, sh, apt, curl, wget, find. עם: app runtime בלבד. Advantage: CVE count נמוך מאוד. Debug: `docker run --entrypoint sh` לא עובד! שימוש ב-Debug variant: `gcr.io/distroless/java:debug`. Multi-stage: builder = full image, final = distroless.',
      },
      {
        id: 'sec-q7',
        text: 'מה Seccomp Profile ב-Docker?',
        options: [
          'SSL Certificate לContainer',
          'Seccomp (Secure Computing): מסנן System Calls שContainer יכול לקרוא. Docker Default Profile חוסם ~44 syscalls מסוכנים. Custom Profile: הגבלה עוד יותר קפדנית',
          'Network Security Policy',
          'CPU Security Feature',
        ],
        correct: 1,
        explanation: 'Seccomp: Linux kernel feature. System Call filtering. Docker default seccomp profile: מאפשר ~300 syscalls, חוסם syscalls מסוכנים כמו reboot, mount, kexec_load. `--security-opt seccomp=unconfined`: ללא הגנה (לDebug). Custom: `--security-opt seccomp=profile.json` לQualify בדיוק מה מותר.',
      },
      {
        id: 'sec-q8',
        text: 'BuildKit Secret Mount — מה היתרון?',
        options: [
          'מהיר יותר מARG',
          'Secret זמין ב-RUN command אבל לא נשמר ב-Image Layer ולא ב-History — `docker history` לא יציג אותו. מאפשר להשתמש ב-Private npm registry, Git credentials בBuild בלי לחשוף אותם',
          'Secret מוצפן ב-Image',
          'BuildKit Secret = Docker Secret',
        ],
        correct: 1,
        explanation: 'BuildKit Secret: `RUN --mount=type=secret,id=npmrc cat /run/secrets/npmrc`. Build: `docker build --secret id=npmrc,src=$HOME/.npmrc .`. Secret נגיש בBuild, לא נשמר ב-Image. `docker history myapp`: לא מציג secret. Use case: Private npm, pip, gem registries. SSH: `--mount=type=ssh` לGit SSH keys.',
      },
      {
        id: 'sec-q9',
        text: 'מה `--security-opt no-new-privileges`?',
        options: [
          'מונע יצירת Users חדשים',
          'מונע מ-Process ב-Container להשיג הרשאות גבוהות יותר (SUID/SGID binaries). אם process מריץ binary שמוגדר SUID Root — הוא לא ישיג הרשאות Root',
          'מגביל מספר Processes',
          'מנע Dynamic Library Loading',
        ],
        correct: 1,
        explanation: 'no-new-privileges: setuid/setgid restricted. SUID bit: binary שיכול לרוץ בהרשאות Owner (Root). דוגמה: sudo, ping — SUID binaries. ב-Container: אם Container user = non-root ו-no-new-privileges, SUID binary לא ישיג root. Kubernetes: securityContext.allowPrivilegeEscalation: false.',
      },
      {
        id: 'sec-q10',
        text: 'מה CIS Docker Benchmark?',
        options: [
          'Docker Performance Benchmark',
          'Center for Internet Security: מסמך Best Practices לאבטחת Docker — Daemon configuration, Container runtime, Image, Networking. כלי `docker-bench-security` סורק ומדרג',
          'Docker Version Comparison',
          'CI/CD Docker standard',
        ],
        correct: 1,
        explanation: 'CIS Benchmark: Industry standard security checks. Categories: Host, Docker Daemon, Container Images, Container Runtime, Docker Security Operations. docker-bench-security (GitHub): סורק Host ל-CIS compliance. Output: PASS/WARN/INFO. אינטגרציה ב-Compliance: SOC2, ISO27001 דורשים CIS hardening.',
      },
    ],
  },

  {
    id: 'docker-production',
    title: 'Docker ב-Production',
    summary: 'Health Checks, Resource Limits, Logging, Monitoring, Restart Policies ו-Production Checklist',
    emoji: '🚀',
    content: [
      { type: 'heading', text: 'Production Docker — Checklist' },
      {
        type: 'table',
        caption: 'Production Readiness Checklist',
        headers: ['קטגוריה', 'פריט', 'מדוע חשוב'],
        rows: [
          ['Image', 'Multi-Stage Build', 'Image קטן, ללא dev tools'],
          ['Image', 'Alpine/Distroless Base', 'CVEs מינימלי'],
          ['Image', 'Pinned Versions', 'Reproducible Builds'],
          ['Security', 'Non-Root USER', 'Principle of Least Privilege'],
          ['Security', 'Read-Only Filesystem', 'Malware Protection'],
          ['Runtime', 'Health Check', 'Orchestrator יודע מצב Container'],
          ['Runtime', 'Resource Limits', 'מניעת Resource Starvation'],
          ['Runtime', 'Restart Policy', 'HA בלי intervention ידני'],
          ['Logging', 'stdout/stderr', 'Log aggregation'],
          ['Config', 'Env Vars / Secrets Manager', 'לא hardcode ב-Image'],
        ],
      },
      { type: 'heading', text: 'Logging ב-Docker' },
      {
        type: 'code',
        lang: 'bash',
        caption: 'Docker Logging — Drivers',
        code: `# Log Drivers
docker run --log-driver=json-file \\     # ברירת מחדל — קובץ JSON
           --log-opt max-size=10m \\     # גודל מקסימלי לקובץ
           --log-opt max-file=3 \\       # מספר קבצים לrotation
           myapp

# שליחה לCentral Logging
docker run --log-driver=awslogs \\
           --log-opt awslogs-group=/myapp \\
           --log-opt awslogs-region=us-east-1 \\
           myapp

# Fluentd
docker run --log-driver=fluentd \\
           --log-opt fluentd-address=localhost:24224 \\
           myapp

# Best Practice לApplication:
# כתבו ל-stdout/stderr — Docker מנהל את הLogs
# אל תכתבו ל-File בתוך Container (Ephemeral!)`,
      },
      { type: 'heading', text: 'Resource Limits ו-Health Checks' },
      {
        type: 'code',
        lang: 'yaml',
        caption: 'Production docker-compose.yml',
        code: `services:
  api:
    image: myapp:1.2.3
    restart: unless-stopped
    deploy:
      resources:
        limits:
          cpus: '0.5'
          memory: 512M
        reservations:
          memory: 256M
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:3000/health"]
      interval: 30s
      timeout: 10s
      retries: 3
      start_period: 40s
    logging:
      driver: "json-file"
      options:
        max-size: "10m"
        max-file: "3"
    environment:
      NODE_ENV: production
    read_only: true
    tmpfs:
      - /tmp`,
      },
      { type: 'tip', text: 'Graceful Shutdown: Application חייב להאזין ל-SIGTERM ולסיים בקשות לפני יציאה. Node.js: `process.on("SIGTERM", () => server.close())`. timeout: Docker מחכה 10 שניות (ניתן לשנות) ואז שולח SIGKILL. K8s: terminationGracePeriodSeconds.' },
    ],
    questionBank: [
      {
        id: 'prod-q1',
        text: 'מה Health Check ב-Docker ולמה חשוב ב-Production?',
        options: [
          'בדיקת גרסת Docker',
          'פקודה שDocker מריץ תקופתית — יוצר status: healthy/unhealthy. Orchestrators (K8s, Swarm) משתמשים בHealth Check: Container Unhealthy → מפסיקים לשלוח Requests ומחליפים',
          'ניטור CPU וRam',
          'בדיקת Network Connectivity',
        ],
        correct: 1,
        explanation: 'Health Check: test command exits 0 = healthy, != 0 = unhealthy. K8s Probes: livenessProbe (להרוג ולהפעיל מחדש), readinessProbe (מתי לשלוח Traffic). Docker: HEALTHCHECK CMD curl -f http://localhost/health. start_period: grace period לStartup. Unhealthy → depends_on: service_healthy יעצור.',
      },
      {
        id: 'prod-q2',
        text: 'מה קורה אם Container ללא Resource Limits מנצל יותר מדי RAM?',
        options: [
          'Docker עוצר אוטומטית',
          'Container יכול לנצל כל ה-RAM של ה-Host → OOM Killer של OS הורג processes אחרים — כולל processes חשובים. Resource Limits: `--memory 512m` מגביל את Container',
          'Container מואט אוטומטית',
          'Container מועבר ל-Host אחר',
        ],
        correct: 1,
        explanation: 'ללא Limits: Container = process רגיל — OS לא מגביל. Memory Leak / runaway process → Host OOM. OOM Killer בוחר process להרוג (לא בהכרח הContainer שגרם). `--memory 512m`: Container מוגבל ל-512MB. `--memory-swap`: Swap. K8s: requests (guaranteed) + limits (max). OOMKilled: Status שContainer קיבל.',
      },
      {
        id: 'prod-q3',
        text: 'Application ב-Container צריך לכתוב Logs לאן?',
        options: [
          'לקובץ /var/log/app.log בContainer',
          'stdout ו-stderr בלבד — Docker מנהל Log Drivers, ניתן לשלוח לCloudWatch/Elasticsearch. קבצי Log בContainer: Ephemeral (אובדים), לא ניתן לצבור, מנפחים Container',
          'לVolume ייעודי ל-Logs',
          'לDatabase',
        ],
        correct: 1,
        explanation: '12-Factor App: Logs as Streams. stdout/stderr: Docker מצבר דרך Log Driver. json-file (ברירת מחדל), awslogs, fluentd, splunk, gelf. `docker logs container`: עובד רק עם stdout/stderr. Log Rotation: `--log-opt max-size=10m`. ELK/Loki: קולטים stdout → Search וAnalysis.',
      },
      {
        id: 'prod-q4',
        text: 'מה Graceful Shutdown וכיצד מיישמים ב-Node.js?',
        options: [
          'כיבוי מהיר של Container',
          'האפליקציה מאזינה ל-SIGTERM → עוצרת קבלת בקשות חדשות → ממתינה לסיום בקשות פתוחות → יוצאת. מונע 503 למשתמשים בזמן Deploy',
          'Container מתאפס כל לילה',
          'Auto-save של State בSIGTERM',
        ],
        correct: 1,
        explanation: 'Graceful Shutdown: `process.on("SIGTERM", () => { server.close(() => { db.disconnect(); process.exit(0); }); });`. Docker stop: SIGTERM → 10s → SIGKILL. K8s: terminationGracePeriodSeconds: 30 ← 30s לסיום. בלי Graceful Shutdown: בקשות שנחתכו ב-Deploy → errors למשתמשים.',
      },
      {
        id: 'prod-q5',
        text: 'מה restart: unless-stopped לעומת restart: always?',
        options: [
          'אין הבדל',
          'always: מפעיל תמיד — גם אם עצרתם ידנית (docker stop). unless-stopped: מפעיל אחרי crash/reboot, לא אחרי docker stop ידני — מאפשר maintenance בלי Auto-restart',
          'unless-stopped מהיר יותר',
          'always רק לDB, unless-stopped לApp',
        ],
        correct: 1,
        explanation: 'Restart Policies: no (ברירת מחדל), always (תמיד, גם אחרי reboot), unless-stopped (תמיד חוץ מ-manual stop), on-failure (רק ב-exit code != 0). Production: unless-stopped — Container מתאושש מcrash/reboot, ניתן לעצור לMaintenance. `on-failure:5`: מגביל ל-5 נסיונות.',
      },
      {
        id: 'prod-q6',
        text: 'מה /health endpoint ולמה מוסיפים ל-API?',
        options: [
          'Endpoint למידע גרסה',
          'HTTP endpoint שמחזיר 200 אם Service בריא, 503 אם לא. Load Balancers ו-Orchestrators poll אותו: Container Unhealthy → מוצא מ-Rotation, החלפה אוטומטית',
          'Endpoint לניהול Password',
          'Metrics endpoint',
        ],
        correct: 1,
        explanation: '/health (Liveness): האם Process חי. /ready (Readiness): האם מוכן לקבל Traffic (DB connected, cache warm). Docker healthcheck: `curl -f http://localhost:3000/health`. K8s: livenessProbe + readinessProbe. Response: `{"status": "healthy", "db": "connected", "version": "1.2.3"}`. Shallow health check: process alive. Deep: dependencies OK.',
      },
      {
        id: 'prod-q7',
        text: 'מה Docker Swarm ולמה מרבים לבחור Kubernetes?',
        options: [
          'Docker Swarm = Kubernetes',
          'Docker Swarm: Container Orchestration מובנה ב-Docker — פשוט, Docker Compose compatible. Kubernetes: Ecosystem עשיר, Auto-scaling, RBAC, Helm, Community גדול — Standard ב-Enterprise ו-Cloud',
          'Swarm לDev, K8s לProd',
          'K8s = Swarm בשם אחר',
        ],
        correct: 1,
        explanation: 'Swarm: `docker swarm init`, `docker stack deploy`. יתרונות: פשוט, Docker native. חסרונות: Ecosystem קטן, Helm אין, הרחבה מוגבלת. K8s: `kubectl`, Helm, Operators, Service Mesh (Istio). K8s: De-facto standard. Swarm: עדיין valid לSetups פשוטים. למד K8s לCloud/Enterprise.',
      },
      {
        id: 'prod-q8',
        text: 'מה 12-Factor App ו-Docker?',
        options: [
          '12 Dockerfiles לApp',
          'Methodology לSaaS Apps: Config ב-Env Vars, Logs כ-Streams, Stateless processes, Port Binding — Docker מיישם רבים מהעקרונות באופן טבעי',
          '12 Docker Commands',
          'Docker ל-12 Services',
        ],
        correct: 1,
        explanation: '12-Factor + Docker: III. Config: env vars (docker run -e). XI. Logs: stdout. VI. Processes: Stateless containers. VII. Port Binding: -p. VIII. Concurrency: Scale Containers. IX. Disposability: Container ephemeral, graceful shutdown. X. Dev/Prod Parity: Docker = Same environment. https://12factor.net.',
      },
      {
        id: 'prod-q9',
        text: 'Container קורס כל 5 דקות. איך לדבג?',
        options: [
          'לבנות Image מחדש',
          '`docker ps -a` לראות Container (Exited), `docker logs <id>` לראות output לפני קריסה, `docker inspect <id>` לExit code, `docker run --rm -it myapp bash` לדבג אינטראקטיבי',
          'למחוק ולהריץ מחדש',
          'לבדוק Network',
        ],
        correct: 1,
        explanation: 'Debug Workflow: 1. `docker ps -a` → Container עם Status Exited(1). 2. `docker logs <container_id>` → Last output לפני קריסה. 3. `docker inspect <id>` → ExitCode, OOMKilled, Error. 4. OOMKilled=true → הגדל Memory Limit. 5. Exit code 1 → App error (logs). `docker run --rm -it myapp bash` → ידנית.',
      },
      {
        id: 'prod-q10',
        text: 'מה Zero-Downtime Deployment עם Docker?',
        options: [
          'מחיקה והפעלה מחדש מהירה',
          'הפעלת Container החדש לפני עצירת הישן: Blue-Green (שתי Environments) או Rolling Update (Container אחד בכל פעם). Load Balancer מנתב ל-Healthy Containers בלבד',
          'Docker Checkpoint',
          'Pause Container הישן',
        ],
        correct: 1,
        explanation: 'Zero-Downtime: Blue-Green: Env A (v1) + Env B (v2) → Switch LB → Remove A. Rolling: Container v2 UP → Healthy → Remove v1. Health Check: LB שולח Traffic לNew Container רק כש-healthy. Docker Compose: Rolling deploy עם `--no-deps`. Kubernetes: RollingUpdate Strategy עם maxUnavailable/maxSurge.',
      },
    ],
  },
]

