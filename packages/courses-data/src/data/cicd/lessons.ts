import type { Lesson } from '../../types'

export const cicdLessons: Lesson[] = [
  {
    id: 'cicd-intro',
    title: 'מבוא ל-CI/CD',
    summary: 'Continuous Integration ו-Continuous Deployment — מה זה, למה זה חשוב, ומה נראה pipeline אמיתי',
    emoji: '🚀',
    content: [
      { type: 'heading', text: 'מה זה CI/CD?' },
      {
        type: 'text',
        text: 'CI/CD הוא שם כולל לשתי פרקטיקות שמאפשרות לצוותים לשחרר קוד באופן תכוף, אמין ואוטומטי. CI = Continuous Integration: כל developer דוחף קוד לענף משותף לפחות פעם ביום, ובכל push — build אוטומטי ו-tests רצים מיד. CD = Continuous Delivery/Deployment: קוד שעבר CI מגיע לסביבת production בצורה אוטומטית (Deployment) או מוכן לשחרור בלחיצת כפתור (Delivery).',
      },
      {
        type: 'table',
        caption: 'CI vs CD Delivery vs CD Deployment',
        headers: ['שלב', 'מה קורה', 'אוטומטי לחלוטין?'],
        rows: [
          ['CI', 'Build + Tests + Lint על כל push', '✅ תמיד'],
          ['CD Delivery', 'artifact מוכן לפרסום, deploy ידני', '⚠️ deploy ידני'],
          ['CD Deployment', 'deploy אוטומטי ל-production בהצלחת CI', '✅ תמיד'],
        ],
      },
      { type: 'heading', text: 'Pipeline — מה קורה בכל push' },
      {
        type: 'text',
        text: 'Pipeline הוא שרשרת שלבים אוטומטיים שכל commit עובר. כל שלב מוגדר כ-job שיכול לרוץ במקביל לאחרים או לחכות לתלויות. Pipeline טיפוסי: Trigger (push/PR) → Build (קמפול, bundling) → Test (unit, integration, e2e) → Quality (lint, type-check, coverage) → Artifact (Docker image / build folder) → Deploy (staging → production).',
      },
      {
        type: 'code',
        lang: 'yaml',
        caption: 'Pipeline בסיסי — GitHub Actions',
        code: `# .github/workflows/ci.yml
name: CI Pipeline

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  build-and-test:
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

      - name: Type check
        run: npm run type-check

      - name: Lint
        run: npm run lint

      - name: Run tests
        run: npm test -- --coverage

      - name: Build
        run: npm run build`,
      },
      {
        type: 'tip',
        text: 'אם ה-deploy מפחיד אתכם — זה סימן שצריך לעשות אותו יותר פעמים. CI/CD הופך deploy ממאורע מפחיד לפעולה יומיומית משעממת — ובדיוק לכך הוא מכוון.',
      },
    ],
    questionBank: [
      {
        id: 'cicd-intro-q1',
        text: 'מה הפירוש של CI ב-CI/CD?',
        options: [
          'Container Integration',
          'Continuous Integration — שילוב קוד תכוף לענף משותף עם build ו-tests אוטומטיים בכל push',
          'Cloud Infrastructure',
          'Code Inspection',
        ],
        correct: 1,
        explanation: 'CI = Continuous Integration. כל developer מוזג קוד לפחות פעם ביום, ובכל merge — pipeline אוטומטי רץ ומאמת שהקוד עובד. מונע "integration hell" שנגרם מעבודה על ענפים ארוכים בנפרד.',
      },
      {
        id: 'cicd-intro-q2',
        text: 'מה ההבדל בין CD Delivery ל-CD Deployment?',
        options: [
          'אין הבדל — שניהם זהים',
          'Delivery = artifact מוכן לפרסום אבל deploy ידני; Deployment = deploy אוטומטי לחלוטין לאחר CI ירוק',
          'Delivery מהיר יותר מ-Deployment',
          'Deployment מיועד לענן בלבד',
        ],
        correct: 1,
        explanation: 'CD Delivery: הקוד עובר כל שלבי האוטומציה ומוכן ל-deploy — אבל בן אדם לוחץ כפתור. CD Deployment: אחרי CI ירוק הקוד עולה לproduction אוטומטית. הבחירה תלויה ברמת הביטחון ב-tests ובדרישות הארגון.',
      },
      {
        id: 'cicd-intro-q3',
        text: 'מה הסדר הנכון של שלבי pipeline טיפוסי?',
        options: [
          'Deploy → Test → Build → Trigger',
          'Trigger → Build → Test → Quality → Artifact → Deploy',
          'Test → Build → Deploy → Trigger',
          'Build → Deploy → Test → Monitor',
        ],
        correct: 1,
        explanation: 'הסדר חשוב: Trigger (push) → Build (קמפול) → Test (בדיקות) → Quality (lint, coverage) → Artifact (image/bundle) → Deploy. מה שנכשל מוקדם חוסך זמן — עיקרון ה-"fail fast".',
      },
      {
        id: 'cicd-intro-q4',
        text: 'מה npm ci עושה שונה מ-npm install?',
        options: [
          'מריץ בדיקות אוטומטית',
          'מתקין dependencies בדיוק לפי package-lock.json ללא שינוי — reproducible ומתאים ל-CI',
          'בונה את הפרויקט',
          'מוחק node_modules לפני התקנה',
        ],
        correct: 1,
        explanation: 'npm ci (clean install) מתקין בדיוק את הגרסאות שב-package-lock.json ונכשל אם lock file לא מסונכרן. npm install עשוי לעדכן גרסאות. ב-CI תמיד npm ci — כך build ב-CI זהה ל-local.',
      },
      {
        id: 'cicd-intro-q5',
        text: 'למה CI/CD מקטין סיכון ב-deploy?',
        options: [
          'כי הוא בודק רק קוד חדש',
          'כי deploys תכופים וקטנים — כל שינוי קטן, קל לזהות מה שבר, קל ומהיר לrollback',
          'כי הוא מריץ tests בענן',
          'כי הוא מחליף צורך ב-QA',
        ],
        correct: 1,
        explanation: '"Big Bang" deploy פעם בחודש = שינויים של אלפי שורות, קשה לזהות מה שבר. CI/CD: deploy יומי של עשרות שורות = בעיה מידית וברורה. MTTR (Mean Time to Recovery) נמוך בהרבה.',
      },
    ],
  },

  {
    id: 'github-actions',
    title: 'GitHub Actions',
    summary: 'Workflows, triggers, jobs, steps, matrix strategy ו-caching — כל מה שצריך לבנות CI/CD ב-GitHub',
    emoji: '⚙️',
    content: [
      { type: 'heading', text: 'מה זה GitHub Actions?' },
      {
        type: 'text',
        text: 'GitHub Actions הוא מנוע CI/CD מובנה ב-GitHub. כותבים YAML files תחת .github/workflows/ — ו-GitHub מריץ אותם על runners (מכונות וירטואליות) בכל פעם שמוגדר trigger. חינמי לריפו ציבוריים ועד 2,000 דקות לחודש לריפו פרטיים.',
      },
      {
        type: 'table',
        caption: 'מרכיבי Workflow',
        headers: ['מרכיב', 'תיאור', 'דוגמה'],
        rows: [
          ['Workflow', 'קובץ ה-YAML כולו', '.github/workflows/ci.yml'],
          ['Trigger (on)', 'מתי ה-workflow רץ', 'push, pull_request, schedule'],
          ['Job', 'קבוצת steps שרצה על runner אחד', 'build, test, deploy'],
          ['Step', 'פעולה אחת בתוך job', 'run: npm test'],
          ['Action', 'step מוכן לשימוש חוזר', 'actions/checkout@v4'],
          ['Runner', 'המכונה שמריצה את ה-job', 'ubuntu-latest, windows-latest'],
          ['Artifact', 'קובץ שעובר בין jobs', 'build folder, test results'],
        ],
      },
      { type: 'heading', text: 'Triggers — מתי ה-Workflow רץ' },
      {
        type: 'code',
        lang: 'yaml',
        caption: 'Triggers נפוצים ב-GitHub Actions',
        code: `on:
  # כל push לענפים אלו
  push:
    branches: [main, develop]
    paths-ignore: ['**.md', 'docs/**']  # מתעלם משינויים ב-docs

  # כל PR ל-main
  pull_request:
    branches: [main]
    types: [opened, synchronize, reopened]

  # הרצה קבועה — כל יום ב-02:00 UTC
  schedule:
    - cron: '0 2 * * *'

  # הפעלה ידנית מ-GitHub UI
  workflow_dispatch:
    inputs:
      environment:
        description: 'Deploy to which env?'
        required: true
        default: 'staging'
        type: choice
        options: [staging, production]

  # workflow אחר יכול להפעיל זה
  workflow_call:
    inputs:
      version:
        required: true
        type: string`,
      },
      { type: 'heading', text: 'Jobs, Dependencies ו-Artifacts' },
      {
        type: 'code',
        lang: 'yaml',
        caption: 'Jobs מקביליים, תלויים ו-artifacts ביניהם',
        code: `jobs:
  # Job 1 — רץ ראשון
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: '20', cache: 'npm' }
      - run: npm ci
      - run: npm test

  # Job 2 — רץ במקביל ל-test
  lint:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: '20', cache: 'npm' }
      - run: npm ci
      - run: npm run lint

  # Job 3 — ממתין לשני הקודמים
  build:
    runs-on: ubuntu-latest
    needs: [test, lint]   # ← תלות: לא מתחיל עד שניהם ירוקים
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: '20', cache: 'npm' }
      - run: npm ci && npm run build

      # שמור build output כ-artifact
      - uses: actions/upload-artifact@v4
        with:
          name: build-output
          path: dist/
          retention-days: 7

  # Job 4 — deploy אחרי build מוצלח
  deploy:
    runs-on: ubuntu-latest
    needs: [build]
    steps:
      # הורד artifact מ-build job
      - uses: actions/download-artifact@v4
        with: { name: build-output, path: dist/ }
      - run: ./scripts/deploy.sh`,
      },
      { type: 'heading', text: 'Matrix Strategy — בדיקה על כמה גרסאות' },
      {
        type: 'code',
        lang: 'yaml',
        caption: 'Matrix Build — Node 18/20/22 על Ubuntu ו-Windows',
        code: `jobs:
  test:
    runs-on: \${{ matrix.os }}
    strategy:
      fail-fast: false   # המשך גם אם שילוב אחד נכשל
      matrix:
        node-version: ['18', '20', '22']
        os: [ubuntu-latest, windows-latest]
        exclude:
          # אל תבדוק Node 18 על Windows
          - os: windows-latest
            node-version: '18'
    # → 5 jobs מקביליים (3*2 - 1 excluded)

    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: \${{ matrix.node-version }}
          cache: 'npm'
      - run: npm ci
      - run: npm test`,
      },
      {
        type: 'tip',
        text: 'Caching חוסך דקות יקרות: actions/setup-node עם cache: "npm" שומר node_modules אוטומטית בין runs. על ריפו גדול זה חוסך 2-3 דקות בכל run — 60+ דקות לחודש על pipeline שרץ 30 פעם ביום.',
      },
    ],
    questionBank: [
      {
        id: 'github-actions-q1',
        text: 'איפה שומרים GitHub Actions workflow files?',
        options: [
          'בתיקיית src/workflows/',
          'ב-.github/workflows/ בתיקיית השורש של ה-repository',
          'בקובץ github-actions.yml בשורש',
          'בכל מיקום — GitHub סורק את כל ה-repo',
        ],
        correct: 1,
        explanation: '.github/workflows/ — GitHub סורק תיקייה זו אוטומטית. כל קובץ YAML שם הוא workflow נפרד. הקבצים חלק מה-repo ועוברים ב-version control — אפשר לראות את כל שינויי ה-CI בgit history.',
      },
      {
        id: 'github-actions-q2',
        text: 'מה needs: [test, lint] עושה בהגדרת job?',
        options: [
          'מתקין את חבילות test ו-lint',
          'מגדיר ש-job זה יתחיל רק לאחר ש-test וגם lint הסתיימו בהצלחה',
          'מריץ test ו-lint לפני כל step בתוך ה-job',
          'מגדיר dependencies ב-package.json',
        ],
        correct: 1,
        explanation: 'needs מגדיר תלות בין jobs. Job עם needs: [test, lint] מתחיל רק כש-test וגם lint סיימו בהצלחה. ללא needs — jobs רצים במקביל. אם אחד מה-needs נכשל — ה-job התלוי מדולג (skipped).',
      },
      {
        id: 'github-actions-q3',
        text: 'מה Matrix Strategy מאפשר?',
        options: [
          'הרצת אותו step על כמה runners במקביל',
          'הרצת אותו job על שילובים שונים (גרסאות Node, OS) במקביל — לבדיקת תאימות',
          'הגדרת משתנים דינמיים בין steps',
          'שיתוף קבצים בין jobs',
        ],
        correct: 1,
        explanation: 'Matrix: node-version: ["18","20","22"] + os: [ubuntu, windows] = עד 6 jobs מקביליים. מאפשר לגלות שה-app עובד ב-Node 20 אבל נשבר ב-18, או עובד על Linux אבל נשבר על Windows — לפני שמגיע ל-production.',
      },
      {
        id: 'github-actions-q4',
        text: 'מה upload-artifact ו-download-artifact עושים?',
        options: [
          'מעלים חבילות ל-npm registry',
          'מאפשרים לשמור קבצים מ-job אחד ולהוריד אותם ב-job אחר — העברת build output בין jobs',
          'שומרים logs של ה-workflow',
          'מגבים את ה-repository ל-S3',
        ],
        correct: 1,
        explanation: 'כל job רץ על runner נקי — לא חולק filesystem עם jobs אחרים. upload-artifact שומר קבצים ב-GitHub Storage, download-artifact מוריד אותם ב-job אחר. כך dist/ מ-build job מגיע ל-deploy job.',
      },
      {
        id: 'github-actions-q5',
        text: 'מה workflow_dispatch מאפשר?',
        options: [
          'הפעלה אוטומטית בכל push לכל branch',
          'הפעלה ידנית של ה-workflow מ-GitHub UI עם פרמטרים שה-user מזין (כמו environment, version)',
          'הפעלה מתוזמנת לפי cron',
          'הפעלת workflow כש-PR נפתח',
        ],
        correct: 1,
        explanation: 'workflow_dispatch מוסיף כפתור "Run workflow" ב-Actions tab. ניתן להגדיר inputs כמו environment, version — שה-user בוחר לפני ה-run. שימושי ל-deploy ידני מבוקר, hotfix, או הרצת maintenance jobs.',
      },
    ],
  },

  {
    id: 'docker-in-ci',
    title: 'Docker ב-CI/CD',
    summary: 'Multi-stage builds, דחיפה ל-registry, tagging strategy ו-layer caching לזירוז pipeline',
    emoji: '🐳',
    content: [
      { type: 'heading', text: 'למה Docker ב-CI?' },
      {
        type: 'text',
        text: 'Docker מבטיח שמה שרץ ב-CI זהה למה שרץ ב-production. בלי Docker: "works on my machine" הוא בעיה אמיתית — גרסאות שונות של Node, Python, ספריות מערכת. עם Docker: same image, same behavior בכל מקום. ב-CI בונים Docker image, מריצים עליו בדיקות, ודוחפים ל-registry שממנו ה-production שולף.',
      },
      { type: 'heading', text: 'Multi-Stage Build — image קטן ובטוח' },
      {
        type: 'text',
        text: 'Multi-Stage Build מאפשר לבנות את ה-app בסביבה מלאה (עם dev tools, compiler, source code) ואז להעתיק רק את ה-artifacts ל-image נקי וקטן. התוצאה: image production ללא קוד מקור, devDependencies, או כלי build — רק מה שצריך להריץ.',
      },
      {
        type: 'code',
        lang: 'dockerfile',
        caption: 'Dockerfile — Multi-Stage Build ל-Node.js',
        code: `# Stage 1: Builder — סביבת build מלאה
FROM node:20-alpine AS builder

WORKDIR /app

# משכפל package files קודם — layer caching: npm install רץ רק אם package.json השתנה
COPY package*.json ./
RUN npm ci --include=dev

COPY . .
RUN npm run build   # מייצר dist/

# ────────────────────────────────────────────────
# Stage 2: Production — רק מה שצריך לריצה
FROM node:20-alpine AS production

WORKDIR /app

# production dependencies בלבד
COPY package*.json ./
RUN npm ci --omit=dev && npm cache clean --force

# מעתיק רק build output מ-stage הקודם — לא קוד מקור!
COPY --from=builder /app/dist ./dist

# משתמש לא-root לאבטחה — מגביל נזק אם יש RCE
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
USER appuser

EXPOSE 3000

# health check — load balancer ישתמש בזה
HEALTHCHECK --interval=30s --timeout=3s \\
  CMD wget -qO- http://localhost:3000/health || exit 1

CMD ["node", "dist/server.js"]`,
      },
      { type: 'heading', text: 'Build ו-Push ב-GitHub Actions' },
      {
        type: 'code',
        lang: 'yaml',
        caption: 'Workflow — Build Docker Image ו-Push ל-GHCR',
        code: `name: Build & Push Docker Image

on:
  push:
    branches: [main]

env:
  REGISTRY: ghcr.io
  IMAGE_NAME: \${{ github.repository }}   # owner/repo-name

jobs:
  build-push:
    runs-on: ubuntu-latest
    permissions:
      contents: read
      packages: write   # נדרש לדחיפה ל-GHCR

    steps:
      - uses: actions/checkout@v4

      # לוגין ל-GitHub Container Registry
      - name: Login to GHCR
        uses: docker/login-action@v3
        with:
          registry: \${{ env.REGISTRY }}
          username: \${{ github.actor }}
          password: \${{ secrets.GITHUB_TOKEN }}   # אוטומטי, לא צריך להגדיר

      # חילוץ metadata — tags ו-labels
      - name: Extract metadata
        id: meta
        uses: docker/metadata-action@v5
        with:
          images: \${{ env.REGISTRY }}/\${{ env.IMAGE_NAME }}
          tags: |
            type=sha,prefix=sha-                                            # sha-abc1234
            type=ref,event=branch                                           # main
            type=semver,pattern={{version}}                                 # v1.2.3 מ-git tag
            type=raw,value=latest,enable=\${{ github.ref == 'refs/heads/main' }}

      # Buildx מאפשר layer caching עם GitHub Actions Cache
      - name: Set up Docker Buildx
        uses: docker/setup-buildx-action@v3

      # Build ו-Push עם caching
      - name: Build and push
        uses: docker/build-push-action@v5
        with:
          context: .
          push: true
          tags: \${{ steps.meta.outputs.tags }}
          labels: \${{ steps.meta.outputs.labels }}
          cache-from: type=gha          # שלוף cache מ-GitHub Actions
          cache-to: type=gha,mode=max   # שמור cache ל-run הבא`,
      },
      { type: 'heading', text: 'Tagging Strategy' },
      {
        type: 'table',
        caption: 'אסטרטגיות תיוג Docker Image',
        headers: ['Tag', 'מתי', 'מאפיין', 'שימוש'],
        rows: [
          ['sha-abc1234', 'כל build', 'Immutable', 'deploy ל-production — מזהה מדויק של commit'],
          ['main', 'push ל-main', 'Mutable', 'latest build מ-main, שימוש ב-staging'],
          ['latest', 'push ל-main', 'Mutable', 'הגרסה האחרונה — זהיר: משתנה'],
          ['v1.2.3', 'git tag', 'Immutable', 'semantic version לrelease רשמי'],
          ['staging', 'deploy ל-staging', 'Mutable', 'מה שרץ כרגע ב-staging environment'],
        ],
      },
      {
        type: 'tip',
        text: 'אל תסתמכו על latest ב-production — זה mutable ומשתנה בכל build. השתמשו ב-sha-abc1234 ל-deploy ל-production: immutable, reproducible, תמיד יודעים בדיוק מה רץ. ב-Kubernetes: imagePullPolicy: IfNotPresent עם sha tag = לא מוריד image מחדש אם כבר קיים.',
      },
    ],
    questionBank: [
      {
        id: 'docker-ci-q1',
        text: 'מה יתרון Multi-Stage Build ב-Docker?',
        options: [
          'build מהיר יותר תמיד',
          'image production קטן וללא dev tools — מעתיקים רק artifacts מ-stage הbuilder, לא קוד מקור',
          'אפשר להשתמש בכמה Linux distros',
          'חוסך disk space ב-CI runner',
        ],
        correct: 1,
        explanation: 'Stage builder מכיל: TypeScript compiler, devDependencies, קוד מקור — ~800MB. Stage production מכיל: node_modules (prod only) + dist/ — ~150MB. גם מאובטח יותר: אין קוד מקור ב-image, אין dev tools שתוקף יכול לנצל.',
      },
      {
        id: 'docker-ci-q2',
        text: 'מה GHCR ואיך מתחברים אליו?',
        options: [
          'GitHub Code Review — מערכת code review',
          'GitHub Container Registry (ghcr.io) — registry ל-Docker images, מתחברים עם GITHUB_TOKEN האוטומטי',
          'Google Cloud Run — פלטפורמת serverless',
          'GitHub CI Runner — מכונת ריצה של Actions',
        ],
        correct: 1,
        explanation: 'GHCR = ghcr.io — registry ל-Docker images מובנה ב-GitHub. Login עם GITHUB_TOKEN שנוצר אוטומטית לכל workflow run. images מקושרים לrepository, permissions מנוהלים דרך GitHub. חינמי לריפו ציבוריים.',
      },
      {
        id: 'docker-ci-q3',
        text: 'למה מעדיפים sha-abc1234 על latest ל-deploy ב-production?',
        options: [
          'כי latest לא עובד ב-Kubernetes',
          'כי sha-abc1234 הוא immutable — תמיד מצביע על אותו image. latest משתנה עם כל build',
          'כי sha קצר יותר לכתוב',
          'כי latest לא תקין כ-Docker tag',
        ],
        correct: 1,
        explanation: 'latest הוא mutable: אחרי build חדש הוא מצביע על image אחר לגמרי. בrollback אי אפשר לסמוך עליו — "latest" אתמול ≠ "latest" היום. sha-abc1234 מצביע לנצח על אותו commit. זהות מדויקת: production תמיד תדע מה בדיוק רץ.',
      },
      {
        id: 'docker-ci-q4',
        text: 'מה Docker layer caching חוסך ב-CI?',
        options: [
          'זמן ריצת tests',
          'זמן build — שכבות שלא השתנו (כמו npm install) לא נבנות מחדש אלא נלקחות מcache',
          'network bandwidth בדחיפה ל-registry',
          'storage ב-Docker registry',
        ],
        correct: 1,
        explanation: 'COPY package*.json + RUN npm ci = שכבה נפרדת. אם package.json לא השתנה — שכבה זו נלקחת מcache, npm install לא ירוץ שוב. שינוי בקוד מקור לא פוגע בcache של npm install. חיסכון טיפוסי: 2-5 דקות לrun.',
      },
      {
        id: 'docker-ci-q5',
        text: 'למה להגדיר USER appuser ב-Dockerfile?',
        options: [
          'שיפור ביצועים — user לא-root מהיר יותר',
          'אבטחה — ריצה כ-root ב-container מסוכנת. אם תוקף מצא RCE, הוא root. user לא-root מגביל נזק',
          'Kubernetes דורש user לא-root בהגדרה',
          'Docker דורש שינוי user לפני EXPOSE',
        ],
        correct: 1,
        explanation: 'Container שרץ כ-root: RCE = root access לcontainer, וב-misconfiguration יכול לגלוש למערכת המארחת. User לא-root: גם אם תוקף פרץ, הוא מוגבל. Docker security best practice: צור user ייעודי, החלף אליו לפני CMD.',
      },
    ],
  },

  {
    id: 'secrets-and-environments',
    title: 'Secrets ו-Environments',
    summary: 'ניהול מפתחות סודיים, הגדרת סביבות staging/production, protection rules ו-OIDC ללא static credentials',
    emoji: '🔐',
    content: [
      { type: 'heading', text: 'למה ניהול Secrets נכון?' },
      {
        type: 'text',
        text: 'Secret שמוטמע בקוד = קטסטרופה. ב-2023 נגרמו נזקים של מיליארדי דולרים מחשיפת credentials ב-git repositories. GitHub Actions מספק מנגנון מאובטח: secrets מוצפנים, לא מוצגים ב-logs, ולא נגישים ל-PRs מ-forks. הכלל האחד: אף סוד לא עובר ב-YAML ישירות — רק הפניה לשמו.',
      },
      { type: 'heading', text: 'Secrets ב-GitHub Actions' },
      {
        type: 'code',
        lang: 'yaml',
        caption: 'הגדרה ושימוש ב-Secrets',
        code: `# הגדרה: Settings → Secrets and variables → Actions → New repository secret
# שמות לדוגמה: DATABASE_URL, API_KEY, DEPLOY_TOKEN

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      # ✓ גישה ל-secrets דרך context — ערכם מוסתר ב-logs
      - name: Deploy to server
        env:
          DATABASE_URL: \${{ secrets.DATABASE_URL }}
          API_KEY: \${{ secrets.API_KEY }}
        run: ./deploy.sh

      # ✓ Secret ישירות ב-with לaction
      - name: Push to registry
        uses: docker/login-action@v3
        with:
          username: \${{ secrets.DOCKER_USERNAME }}
          password: \${{ secrets.DOCKER_PASSWORD }}

      # ✗ אסור לחלוטין:
      # run: echo "DB=postgresql://user:mypassword@host/db"   # מוצג ב-logs!
      # env:
      #   PASSWORD: hardcoded-password  # נשמר ב-git לנצח!`,
      },
      { type: 'heading', text: 'Environments — staging ו-production נפרדים' },
      {
        type: 'text',
        text: 'GitHub Environments מאפשרים: secrets שונים לכל סביבה, protection rules (אישור ידני לפני deploy ל-production), ו-wait timers. כל deploy ל-production יכול לדרוש approval מ-reviewer — עוצר ה-pipeline אוטומטית ומחכה לאישור אנושי.',
      },
      {
        type: 'code',
        lang: 'yaml',
        caption: 'Pipeline עם staging → approval → production',
        code: `jobs:
  deploy-staging:
    runs-on: ubuntu-latest
    environment: staging    # ← environment מוגדר ב-GitHub Settings → Environments
    steps:
      - uses: actions/checkout@v4
      - name: Deploy to staging
        env:
          # secrets.DATABASE_URL מה-staging environment — שונה מproduction!
          DATABASE_URL: \${{ secrets.DATABASE_URL }}
        run: |
          kubectl set image deployment/app \\
            app=ghcr.io/org/app:sha-\${{ github.sha }} \\
            --namespace=staging
          kubectl rollout status deployment/app --namespace=staging

  smoke-test-staging:
    runs-on: ubuntu-latest
    needs: [deploy-staging]
    steps:
      - name: Smoke tests on staging
        run: |
          curl -f https://staging.example.com/health
          curl -f https://staging.example.com/api/v1/status

  deploy-production:
    runs-on: ubuntu-latest
    needs: [smoke-test-staging]
    environment: production   # ← GitHub יעצור ויחכה ל-Approval מ-reviewer מוגדר!
    steps:
      - name: Deploy to production
        env:
          DATABASE_URL: \${{ secrets.DATABASE_URL }}   # production secret
        run: |
          kubectl set image deployment/app \\
            app=ghcr.io/org/app:sha-\${{ github.sha }} \\
            --namespace=production
          kubectl rollout status deployment/app --namespace=production`,
      },
      { type: 'heading', text: 'OIDC — אין יותר static credentials' },
      {
        type: 'text',
        text: 'OIDC (OpenID Connect) מאפשר ל-GitHub Actions לקבל temporary credentials מהענן (AWS, GCP, Azure) ללא שמירת long-lived keys ב-secrets. GitHub מבקש token זמני מהענן לפני כל run — token פג תוקף אחרי שעה. אם credentials נחשפו ב-logs — הם כבר לא שימושיים.',
      },
      {
        type: 'code',
        lang: 'yaml',
        caption: 'OIDC עם AWS — ללא AWS_ACCESS_KEY / AWS_SECRET_ACCESS_KEY',
        code: `jobs:
  deploy:
    runs-on: ubuntu-latest
    permissions:
      id-token: write   # ← נדרש ל-OIDC
      contents: read

    steps:
      - uses: actions/checkout@v4

      # קבל credentials זמניים מ-AWS — ללא secrets!
      - name: Configure AWS credentials via OIDC
        uses: aws-actions/configure-aws-credentials@v4
        with:
          role-to-assume: arn:aws:iam::123456789012:role/github-actions-deploy
          aws-region: us-east-1
          # GitHub שולח JWT ל-AWS OIDC Provider
          # AWS מאמת ומחזיר temporary STS credentials (פגות תוקף תוך שעה)
          # אין secrets לנהל, לרוטיט, או לחשוש שיחשפו

      - name: Deploy to ECS
        run: |
          aws ecs update-service \\
            --cluster production \\
            --service myapp \\
            --force-new-deployment`,
      },
      {
        type: 'tip',
        text: 'סדר עדיפות secrets ב-GitHub Actions: Environment secrets > Repository secrets > Organization secrets. Secrets ברמת Organization יורשים לכל ה-repos — מתאים ל-shared credentials כמו Docker Hub login. Environment secrets גוברים על repository secrets כשרצים ב-environment ספציפי.',
      },
    ],
    questionBank: [
      {
        id: 'secrets-q1',
        text: 'איפה מגדירים GitHub Actions Secrets?',
        options: [
          'בקובץ .env ב-root של ה-repository',
          'ב-Settings → Secrets and variables → Actions של ה-repository (או Organization)',
          'בקובץ secrets.yml תחת .github/',
          'ב-GitHub Profile Settings',
        ],
        correct: 1,
        explanation: 'Settings → Secrets and variables → Actions. שם מגדירים שמות וערכים (DATABASE_URL, API_KEY). ה-YAML מפנה ל-${{ secrets.NAME }}. הערך לא מופיע ב-logs ולא נגיש ל-PRs מ-forks — אבטחה מובנית.',
      },
      {
        id: 'secrets-q2',
        text: 'מה GitHub Environments מאפשרים שרגיל secrets לא?',
        options: [
          'encryption חזק יותר לsecrets',
          'secrets שונים לכל סביבה + protection rules כמו required reviewers לפני deploy ל-production',
          'שיתוף secrets עם repositories אחרים',
          'אורך password ארוך יותר מ-64 תווים',
        ],
        correct: 1,
        explanation: 'Environments: staging environment מכיל DATABASE_URL לDB של staging, production environment לDB production. Protection rules: deploy ל-production מחכה לאישור ידני מreviewer. Wait timer: חכה 10 דקות אחרי smoke tests לפני production.',
      },
      {
        id: 'secrets-q3',
        text: 'מה OIDC פותר בהשוואה ל-static credentials?',
        options: [
          'OIDC מהיר יותר לאימות',
          'ללא long-lived secrets ב-GitHub — OIDC מקבל temporary credentials שפגות תוקף. גם אם נחשפו ב-logs — חסרי תוקף',
          'OIDC עובד עם כל cloud providers',
          'OIDC חינמי בעוד secrets עולים כסף',
        ],
        correct: 1,
        explanation: 'AWS_SECRET_ACCESS_KEY שמור ב-secrets: לא פג תוקף לעולם, אם נחשף — נזק מלא ומתמשך. OIDC: GitHub מקבל JWT, AWS מאמת ומחזיר credentials לשעה. אם נחשפו ב-logs — פגו תוקף תוך שעה. גם אין rotation ידני לנהל.',
      },
      {
        id: 'secrets-q4',
        text: 'מה ${{ secrets.GITHUB_TOKEN }} ומי מגדיר אותו?',
        options: [
          'token שה-admin חייב ליצור ידנית ב-Settings',
          'token אוטומטי שGitHub יוצר לכל workflow run — permissions מוגבלות לrepo הנוכחי, פג תוקף בסוף ה-run',
          'token לגישה כללית ל-GitHub API מכל workflow',
          'token ל-npm publish של packages',
        ],
        correct: 1,
        explanation: 'GITHUB_TOKEN נוצר אוטומטית לכל workflow run — לא צריך להגדיר כלום. מאפשר: push לrepo, open PR, write packages ל-GHCR. Permissions מוגדרות ב-permissions block. פג תוקף בסוף ה-run — אי אפשר לשמור ולהשתמש לאחר מכן.',
      },
      {
        id: 'secrets-q5',
        text: 'מה יקרה אם תכניסו secret לפקודת echo ב-run?',
        options: [
          'GitHub ייכשל את ה-workflow מיד',
          'GitHub מסנן ערכי secrets מוידועים ומחליפם ב-*** ב-logs — אבל base64 encoding יכול לעקוף את הסינון',
          'ה-secret יוצג בטקסט רגיל — אין הגנה ב-logs',
          'ה-step ידלג אוטומטית',
        ],
        correct: 1,
        explanation: 'GitHub מסנן ערכי secrets ידועים מ-logs ומציג ***. אבל: echo $(echo $SECRET | base64) לא יסונן — ערך מקודד שונה מהסוד המקורי. לכן: לעולם אל תעשו echo של secret, ואל תכניסו אותו לפקודה שמדפיסה output.',
      },
    ],
  },

  {
    id: 'quality-gates',
    title: 'Quality Gates ו-Testing ב-CI',
    summary: 'הרצת tests, coverage thresholds, linting, type-checking, parallel jobs ו-branch protection לאכיפת איכות קוד',
    emoji: '🧪',
    content: [
      { type: 'heading', text: 'Quality Gate — שומר הסף האוטומטי' },
      {
        type: 'text',
        text: 'Quality Gate הוא תנאי שה-pipeline חייב לעמוד בו כדי לעבור. דוגמאות: coverage < 80% = pipeline נכשל, lint error = נכשל, type error = נכשל, security vulnerability = נכשל. PR לא יכול להתמזג עד ש-pipeline ירוק — כך standards הופכים לאכיפה אוטומטית ולא להמלצה שאפשר להתעלם ממנה.',
      },
      {
        type: 'code',
        lang: 'yaml',
        caption: 'Pipeline מלא עם Quality Gates מקביליים',
        code: `name: Quality Pipeline

on: [push, pull_request]

jobs:
  # שלושת ה-jobs רצים במקביל — חוסך זמן
  type-check:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: '20', cache: 'npm' }
      - run: npm ci
      - run: npx tsc --noEmit   # נכשל אם יש type errors

  lint:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: '20', cache: 'npm' }
      - run: npm ci
      - run: npx eslint . --ext .ts,.tsx --max-warnings 0   # 0 warnings מותר

  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: '20', cache: 'npm' }
      - run: npm ci
      - name: Run tests with coverage
        run: npx vitest run --coverage   # נכשל אם coverage מתחת ל-threshold

      - uses: actions/upload-artifact@v4
        if: always()   # שמור גם אם tests נכשלו
        with:
          name: coverage-report
          path: coverage/

      # מוסיף coverage comment ל-PR
      - uses: davelosert/vitest-coverage-report-action@v2
        if: always()

  # Build רץ רק אם כל quality gates עברו
  build:
    runs-on: ubuntu-latest
    needs: [type-check, lint, test]
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: '20', cache: 'npm' }
      - run: npm ci && npm run build`,
      },
      { type: 'heading', text: 'Coverage Threshold — סף כיסוי מינימלי' },
      {
        type: 'code',
        lang: 'typescript',
        caption: 'vitest.config.ts — הגדרת Coverage Thresholds',
        code: `import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html', 'lcov'],
      reportsDirectory: './coverage',

      // ← Quality Gate: test run נכשל אם coverage מתחת לסף
      thresholds: {
        lines: 80,
        functions: 80,
        branches: 75,
        statements: 80,

        // threshold ספציפי לקבצים קריטיים
        'src/services/payment.ts': {
          lines: 95,
          functions: 100,   // כל פונקציה חייבת להיות מכוסה
        },
      },

      exclude: [
        'src/types/**',
        'src/**/*.d.ts',
        'src/main.ts',
        '**/*.config.ts',
        '**/mocks/**',
      ],
    },
  },
})`,
      },
      { type: 'heading', text: 'Branch Protection Rules — quality gates אמיתיים' },
      {
        type: 'text',
        text: 'Branch Protection Rules ב-GitHub חוסמות merge ל-main עד שה-pipeline ירוק. מוגדר ב-Settings → Branches → Add branch protection rule. בחרו "Require status checks to pass before merging" ובחרו את ה-jobs החיוניים — אז quality gates הופכים למחסום אמיתי שאי אפשר לעקוף.',
      },
      {
        type: 'table',
        caption: 'Branch Protection Rules שכדאי להפעיל',
        headers: ['Rule', 'מה מגן', 'מומלץ?'],
        rows: [
          ['Require status checks to pass', 'חוסם merge אם CI נכשל', '✅ חובה'],
          ['Require pull request reviews', 'מחייב לפחות review אחד לפני merge', '✅ מומלץ'],
          ['Require branches to be up to date', 'חוסם merge אם branch מיושן מ-main', '⚠️ אופציונלי'],
          ['Restrict who can push to main', 'רק ל-PRs — אין direct push ל-main', '✅ מומלץ'],
          ['Require linear history', 'מחייב rebase — לא merge commits', '⚠️ תלוי בצוות'],
        ],
      },
      {
        type: 'tip',
        text: 'Fail Fast: כשtype-check נכשל — אין טעם לחכות ש-tests יסתיימו. הגדירו continue-on-error: false (ברירת מחדל) כדי שkiller jobs יפסיקו את ה-pipeline מיד. בdevelopment מקומי — הריצו git hooks עם Husky לאותם בדיקות לפני כל commit.',
      },
    ],
    questionBank: [
      {
        id: 'quality-q1',
        text: 'מה Quality Gate ב-CI/CD?',
        options: [
          'שם לתיקייה שמכילה tests ב-repository',
          'תנאי שה-pipeline חייב לעמוד בו — coverage מינימלי, אפס lint errors. כישלון = merge חסום',
          'כלי אוטומטי ל-code review',
          'סביבת בדיקות נפרדת מ-staging',
        ],
        correct: 1,
        explanation: 'Quality Gate: coverage < 80% → pipeline נכשל. lint error → נכשל. type error → נכשל. בשילוב עם Branch Protection: PR לא יכול להתמזג עד שהpipeline ירוק. זו אכיפה אוטומטית, לא המלצה.',
      },
      {
        id: 'quality-q2',
        text: 'למה להריץ type-check, lint ו-tests כ-jobs מקביליים?',
        options: [
          'כי הם חייבים לרוץ על runners שונים',
          'חיסכון בזמן — 3 jobs מקביליים = זמן ה-job הארוך ביניהם, לא סכום הזמנים',
          'כי GitHub מחייב הפרדה ל-jobs שונים',
          'כי אחרת הם משפיעים אחד על השני',
        ],
        correct: 1,
        explanation: 'סדרתי: lint (2 דקות) + type-check (1 דקה) + test (5 דקות) = 8 דקות. מקבילי: max(2, 1, 5) = 5 דקות. 37% חיסכון בזמן. ב-PRs — developer מקבל feedback מהיר יותר. Runner minutes מתחלקות — לא מצטברות.',
      },
      {
        id: 'quality-q3',
        text: 'מה coverage threshold עושה ב-vitest/jest config?',
        options: [
          'מחשב coverage ומדפיס דוח',
          'מגדיר אחוז כיסוי מינימלי — אם coverage יורד מתחת לסף, test run נכשל עם exit code 1',
          'מסנן קבצים שלא נכללים ב-coverage',
          'מגביל מספר ה-tests שרצים',
        ],
        correct: 1,
        explanation: 'lines: 80 ב-vitest.config.ts = test run יוצא עם exit code 1 אם פחות מ-80% שורות מכוסות. CI קורא את exit code — job נכשל → pipeline נכשל → Branch Protection חוסמת merge.',
      },
      {
        id: 'quality-q4',
        text: 'מה Branch Protection Rules "Require status checks" מגנות?',
        options: [
          'מגנות על ה-repository מפני מחיקה',
          'חוסמות merge ל-main עד שpipeline ירוק — אי אפשר לעקוף quality gates גם בלחץ',
          'מגנות על secrets מחשיפה',
          'מונעות force push ל-main',
        ],
        correct: 1,
        explanation: '"Require status checks" = אי אפשר למזג PR עד שכל ה-required jobs ירוקים. גם אם מנהל רוצה לעקוף — GitHub חוסם. Quality gates הופכים מ-"אנחנו מנסים לעמוד בהם" ל-"פיזית בלתי אפשרי לא לעמוד בהם".',
      },
      {
        id: 'quality-q5',
        text: 'מה --max-warnings 0 ב-eslint עושה?',
        options: [
          'מגביל ל-0 את מספר ה-files שנבדקים',
          'גורם ל-eslint לצאת עם error code אם יש אפילו warning אחד — warnings הופכים ל-blockers ב-CI',
          'מדכא הצגת כל warnings בoutput',
          'מריץ eslint מהיר יותר ב-0 threads',
        ],
        correct: 1,
        explanation: 'ב-local: eslint מציג warnings אבל exit code 0 — ה-pipeline עובר. עם --max-warnings 0: אפילו warning אחד = exit code 1 = CI נכשל. מונע דריפט הדרגתי שבו warnings מצטברים מאות לאורך חודשים ואף אחד לא מתקן.',
      },
    ],
  },

  {
    id: 'deployment-strategies',
    title: 'אסטרטגיות Deployment',
    summary: 'Blue/Green, Rolling, Canary ו-Recreate — מתי להשתמש בכל אסטרטגיה, יתרונות וחסרונות',
    emoji: '🎯',
    content: [
      { type: 'heading', text: 'למה אסטרטגיית Deployment חשובה?' },
      {
        type: 'text',
        text: 'איך מחליפים גרסה חיה ב-production קובע: כמה downtime יש, כמה מהר אפשר לrollback, וכמה traffic מושפע מבאג בגרסה חדשה. בחירת אסטרטגיה שגויה = downtime של דקות עד שעות. בחירה נכונה = zero-downtime deploy עם rollback תוך שניות.',
      },
      {
        type: 'table',
        caption: 'השוואת אסטרטגיות Deployment',
        headers: ['אסטרטגיה', 'Downtime', 'Rollback', 'עלות תשתית', 'מתאים ל'],
        rows: [
          ['Recreate', 'יש downtime', 'deploy מחדש (~דקות)', 'נמוכה', 'dev/staging בלבד'],
          ['Rolling', 'אפס', 'איטי (~דקות)', 'כמו קיים', 'stateless apps'],
          ['Blue/Green', 'אפס', 'מיידי (~שניות)', 'כפולה', 'production קריטי'],
          ['Canary', 'אפס', 'מיידי (הסרת canary)', 'מעט נוסף', 'features חדשים בסיכון'],
        ],
      },
      { type: 'heading', text: 'Blue/Green Deployment' },
      {
        type: 'text',
        text: 'Blue/Green: שתי סביבות זהות — Blue (production נוכחי) ו-Green (גרסה חדשה). Deploy ל-Green, מריצים smoke tests, מחליפים את ה-load balancer להצביע ל-Green. Rollback = החזרת ה-load balancer ל-Blue תוך שניות. שתי הסביבות רצות עד שGreen יציב — אז מכבים Blue.',
      },
      {
        type: 'code',
        lang: 'yaml',
        caption: 'Blue/Green Deployment עם health check ו-rollback אוטומטי',
        code: `jobs:
  blue-green-deploy:
    runs-on: ubuntu-latest
    environment: production
    steps:
      - uses: actions/checkout@v4
      - uses: aws-actions/configure-aws-credentials@v4
        with:
          role-to-assume: \${{ secrets.AWS_ROLE_ARN }}
          aws-region: us-east-1

      # שלב 1: שמור את הגרסה הנוכחית (Blue) לrollback
      - name: Record current version
        id: current
        run: |
          BLUE_IMAGE=$(aws ecs describe-task-definition \\
            --task-definition myapp \\
            --query 'taskDefinition.containerDefinitions[0].image' \\
            --output text)
          echo "image=$BLUE_IMAGE" >> $GITHUB_OUTPUT

      # שלב 2: Deploy ל-Green
      - name: Deploy Green
        run: |
          aws ecs update-service \\
            --cluster production \\
            --service myapp-green \\
            --task-definition myapp-v2 \\
            --force-new-deployment
          aws ecs wait services-stable --cluster production --services myapp-green

      # שלב 3: Smoke test ל-Green לפני החלפת traffic
      - name: Smoke test Green
        run: |
          GREEN_URL="https://green-internal.example.com"
          curl -f $GREEN_URL/health || \\
            (echo "Green unhealthy — aborting" && exit 1)

      # שלב 4: החלף traffic ל-Green
      - name: Switch traffic to Green
        run: |
          aws elbv2 modify-listener \\
            --listener-arn \${{ secrets.PROD_LISTENER_ARN }} \\
            --default-actions Type=forward,TargetGroupArn=\${{ secrets.GREEN_TG_ARN }}

      # שלב 5: בדוק production health ו-rollback אוטומטי אם נכשל
      - name: Verify production
        run: |
          sleep 30
          curl -f https://api.example.com/health || (
            echo "Production unhealthy — rolling back to Blue"
            aws elbv2 modify-listener \\
              --listener-arn \${{ secrets.PROD_LISTENER_ARN }} \\
              --default-actions Type=forward,TargetGroupArn=\${{ secrets.BLUE_TG_ARN }}
            exit 1
          )`,
      },
      { type: 'heading', text: 'Canary Deployment — שחרור הדרגתי' },
      {
        type: 'text',
        text: 'Canary: הגרסה החדשה מקבלת אחוז קטן מה-traffic תחילה (5-10%). מנטרים metrics — error rate, latency. אם הכל תקין — מגדילים ל-25%, 50%, 100%. אם יש בעיה — מסירים את ה-canary. רק האחוז הקטן של ה-users נפגע מהבאג, לא כולם.',
      },
      {
        type: 'code',
        lang: 'yaml',
        caption: 'Canary Deployment עם Kubernetes ו-monitoring אוטומטי',
        code: `jobs:
  canary-deploy:
    runs-on: ubuntu-latest
    environment: production
    steps:
      - uses: actions/checkout@v4

      # שלב 1: Deploy canary pod — 1 מתוך 10 pods = ~10% traffic
      - name: Deploy canary (10% traffic)
        run: |
          kubectl apply -f - <<EOF
          apiVersion: apps/v1
          kind: Deployment
          metadata:
            name: myapp-canary
            namespace: production
          spec:
            replicas: 1
            selector:
              matchLabels: { app: myapp, track: canary }
            template:
              metadata:
                labels: { app: myapp, track: canary }
              spec:
                containers:
                - name: app
                  image: ghcr.io/org/app:sha-\${{ github.sha }}
          EOF

      # שלב 2: מנטר error rate ל-5 דקות
      - name: Monitor canary metrics
        run: |
          sleep 300
          ERROR_RATE=$(curl -s "https://prometheus/api/v1/query?query=\\
            rate(http_errors_total{track='canary'}[5m])" \\
            | jq -r '.data.result[0].value[1] // "0"')

          echo "Canary error rate: $ERROR_RATE"

          # Rollback אוטומטי אם error rate מעל 1%
          if awk "BEGIN {exit !($ERROR_RATE > 0.01)}"; then
            kubectl delete deployment myapp-canary --namespace=production
            echo "Canary failed — rolled back"
            exit 1
          fi

      # שלב 3: Promote — עדכן את כל ה-pods לגרסה החדשה
      - name: Promote canary to production
        run: |
          kubectl set image deployment/myapp app=ghcr.io/org/app:sha-\${{ github.sha }} \\
            --namespace=production
          kubectl rollout status deployment/myapp --namespace=production
          kubectl delete deployment myapp-canary --namespace=production`,
      },
      {
        type: 'tip',
        text: 'Feature Flags הם Canary ברמת קוד — מפעילים feature לאחוז ספציפי מה-users, לbeta testers, לmatchים גיאוגרפיים, בלי deploy נפרד. כלים: LaunchDarkly, Flagsmith, OpenFeature. שילוב Canary deploy + Feature Flags = שליטה מקסימלית על שחרורים עם סיכון מינימלי.',
      },
    ],
    questionBank: [
      {
        id: 'deploy-q1',
        text: 'מה היתרון העיקרי של Blue/Green Deployment?',
        options: [
          'עלות תשתית נמוכה — לא צריך משאבים נוספים',
          'Rollback מיידי — מחזירים load balancer ל-Blue תוך שניות, ללא deploy מחדש',
          'מתאים לapps עם state (DB sessions, cache)',
          'לא דורש smoke tests לאחר deploy',
        ],
        correct: 1,
        explanation: 'Blue/Green: שתי סביבות תמיד מוכנות. Rollback = שינוי target ב-load balancer → שניות. Rolling rollback = deploy גרסה ישנה מחדש → דקות. Canary rollback = מחק canary pods → שניות. ב-production קריטי כל שנייה עולה כסף.',
      },
      {
        id: 'deploy-q2',
        text: 'מה Canary Deployment מגן עליו?',
        options: [
          'מגן על DB מפני שינויי schema בסיכון',
          'חושף bug לאחוז קטן מה-users (5-10%) לפני rollout מלא — נזק מוגבל אם יש בעיה',
          'מגן על ה-main branch מפני push ישיר',
          'מונע deploy ללא approval ידני',
        ],
        correct: 1,
        explanation: 'Canary = "canary in a coal mine". אם 5% traffic ל-canary מראה error rate גבוה — מסירים canary, 95% מהusers לא הושפעו כלל. ללא Canary: bug ב-100% traffic עד גילוי וrollback — נזק מלא לכל ה-users.',
      },
      {
        id: 'deploy-q3',
        text: 'מתי Recreate deployment מקובל?',
        options: [
          'תמיד — הוא הכי פשוט לתפעול',
          'בסביבות dev/staging בלבד — downtime מקובל ואין SLA. ב-production עם users: אסור',
          'כשיש DB migration שדורש downtime',
          'כשיש תקציב מוגבל לתשתית',
        ],
        correct: 1,
        explanation: 'Recreate: הורד גרסה ישנה → downtime → העלה חדשה. פשוט וזול. ב-production עם users אמיתיים — downtime = revenue loss + user frustration + SLA violations. ב-dev/staging: "nobody cares" — מהיר ופשוט.',
      },
      {
        id: 'deploy-q4',
        text: 'מה Rolling Deployment עושה?',
        options: [
          'מחליף את כל ה-instances בבת אחת — uptime מובטח',
          'מחליף instances אחד אחד — תמיד חלק בגרסה ישנה וחלק בחדשה עד שכולם עודכנו',
          'מעלה גרסה חדשה לצד הישנה ואז מחליף traffic בבת אחת',
          'משתמש בשני load balancers נפרדים',
        ],
        correct: 1,
        explanation: 'Rolling: 10 pods, מחליף 2 בכל פעם. בזמן deploy: 8 pods גרסה ישנה + 2 חדשה → 6+4 → ... → 0+10. Zero downtime, אבל: שתי גרסאות רצות בו-זמנית! ה-API חייב להיות backwards compatible בין גרסאות.',
      },
      {
        id: 'deploy-q5',
        text: 'מה Feature Flags מוסיפים על Canary Deployment?',
        options: [
          'Feature Flags מחליפים Canary לחלוטין — אחד מיותר',
          'שליטה ברמת קוד — הפעלת feature ל-segments ספציפיים (beta users, ארץ) בלי deploy נפרד',
          'Feature Flags מהירים יותר מ-Canary ב-rollout',
          'Feature Flags עובדים רק ב-frontend, לא ב-backend',
        ],
        correct: 1,
        explanation: 'Canary: 10% מה-traffic בגרסה חדשה — בלי בחירה מי מקבל. Feature Flags: feature מופעל ל-beta users בלבד, ל-ישראל בלבד, ל-5% אקראי. הפעלה/כיבוי ב-runtime ללא deploy. שילוב: Canary לinfra rollout, Flags לfeature rollout.',
      },
    ],
  },

  {
    id: 'monitoring-and-rollback',
    title: 'Monitoring ו-Rollback',
    summary: 'Health checks, smoke tests, observability, automated rollback ו-MTTR — לסגור את מעגל ה-CD',
    emoji: '📊',
    content: [
      { type: 'heading', text: 'Deploy לא מסתיים ב-push' },
      {
        type: 'text',
        text: 'Deploy הצליח לעלות ל-production — זה לא אומר שהכל בסדר. קוד יכול לעלות, לעבור health check, ואז לשבור feature ספציפי תחת load. Pipeline מקצועי מכיל: health check מיד אחרי deploy, smoke tests על ה-critical path, monitoring של minutes לאחר deploy, ו-automated rollback כש-metrics יורדים.',
      },
      { type: 'heading', text: 'Health Check ו-Smoke Tests ב-Pipeline' },
      {
        type: 'code',
        lang: 'yaml',
        caption: 'Post-Deploy Verification — Health Check ו-Smoke Tests',
        code: `jobs:
  deploy:
    runs-on: ubuntu-latest
    environment: production
    outputs:
      base-url: \${{ steps.deploy.outputs.url }}
    steps:
      - name: Deploy
        id: deploy
        run: |
          kubectl set image deployment/myapp app=ghcr.io/org/app:sha-\${{ github.sha }}
          kubectl rollout status deployment/myapp --timeout=5m
          echo "url=https://api.example.com" >> \$GITHUB_OUTPUT

  verify:
    runs-on: ubuntu-latest
    needs: [deploy]
    steps:
      - uses: actions/checkout@v4

      # ממתין עד ש-service מוכן — retry loop
      - name: Wait for service health
        run: |
          BASE_URL="\${{ needs.deploy.outputs.base-url }}"
          for i in $(seq 1 24); do
            STATUS=$(curl -s -o /dev/null -w "%{http_code}" $BASE_URL/health)
            if [ "$STATUS" = "200" ]; then
              echo "✅ Healthy after $((i * 5)) seconds"
              exit 0
            fi
            echo "Attempt $i/24: HTTP $STATUS — retrying in 5s..."
            sleep 5
          done
          echo "❌ Not healthy after 2 minutes"
          exit 1

      # Smoke tests — critical paths
      - name: Smoke tests
        run: |
          BASE_URL="\${{ needs.deploy.outputs.base-url }}"

          # בדיקת endpoints קריטיים
          curl -f $BASE_URL/health
          curl -f $BASE_URL/api/v1/status

          # בדיקת auth flow מלא
          TOKEN=$(curl -sf -X POST $BASE_URL/api/auth/login \\
            -H "Content-Type: application/json" \\
            -d '{"email":"\${{ secrets.SMOKE_USER }}","password":"\${{ secrets.SMOKE_PASS }}"}' \\
            | jq -r '.token')

          [ -n "$TOKEN" ] || (echo "❌ Auth failed" && exit 1)
          curl -f -H "Authorization: Bearer $TOKEN" $BASE_URL/api/v1/users/me
          echo "✅ All smoke tests passed"`,
      },
      { type: 'heading', text: 'Automated Rollback' },
      {
        type: 'code',
        lang: 'yaml',
        caption: 'Rollback אוטומטי — שמירת גרסה קודמת וחזרה אליה',
        code: `jobs:
  deploy-with-rollback:
    runs-on: ubuntu-latest
    environment: production
    steps:
      - uses: actions/checkout@v4

      # שמור את ה-image הנוכחי לrollback
      - name: Save current version
        id: prev
        run: |
          PREV=$(kubectl get deployment myapp \\
            -o jsonpath='{.spec.template.spec.containers[0].image}')
          echo "image=$PREV" >> \$GITHUB_OUTPUT
          echo "Previous: $PREV"

      # Deploy
      - name: Deploy
        run: |
          kubectl set image deployment/myapp \\
            app=ghcr.io/org/app:sha-\${{ github.sha }}
          kubectl rollout status deployment/myapp --timeout=3m

      # Smoke tests — rollback אוטומטי אם נכשלים
      - name: Smoke test with auto-rollback
        run: |
          if ! ./scripts/smoke-tests.sh https://api.example.com; then
            echo "🚨 Smoke tests failed — rolling back"
            kubectl set image deployment/myapp \\
              app=\${{ steps.prev.outputs.image }}
            kubectl rollout status deployment/myapp --timeout=3m
            echo "✅ Rolled back to \${{ steps.prev.outputs.image }}"
            exit 1
          fi
          echo "✅ Deploy successful"

      # הודעה ל-Slack בכישלון
      - name: Notify on failure
        if: failure()
        uses: slackapi/slack-github-action@v1
        with:
          payload: |
            {
              "text": "🚨 Production deploy FAILED + auto-rollback!\\nCommit: \${{ github.sha }}\\nBy: \${{ github.actor }}"
            }
        env:
          SLACK_WEBHOOK_URL: \${{ secrets.SLACK_WEBHOOK_URL }}`,
      },
      { type: 'heading', text: 'Observability — Metrics, Logs ו-Traces' },
      {
        type: 'table',
        caption: 'שלושת עמודות ה-Observability',
        headers: ['עמודה', 'מה זה', 'כלים נפוצים', 'שאלות שפותר'],
        rows: [
          ['Metrics', 'נתונים כמותיים על זמן', 'Prometheus, Datadog, CloudWatch', 'כמה requests לשנייה? כמה errors? latency p99?'],
          ['Logs', 'רשומות אירועים', 'Loki, ELK Stack, CloudWatch Logs', 'מה קרה ב-deploy? מה ה-stack trace המלא?'],
          ['Traces', 'מעקב request מקצה לקצה', 'Jaeger, Zipkin, Datadog APM', 'איפה ה-bottleneck? איזה service איטי?'],
        ],
      },
      {
        type: 'code',
        lang: 'typescript',
        caption: '/health endpoint — תשובה מפורטת ל-monitoring',
        code: `// GET /health — endpoint שה-CI, ה-load balancer וה-monitoring קוראים
interface HealthStatus {
  status: 'healthy' | 'degraded' | 'unhealthy'
  version: string
  uptime: number
  checks: Record<string, { status: 'ok' | 'error'; latencyMs?: number }>
}

export async function healthHandler(req: Request, res: Response) {
  const checks: HealthStatus['checks'] = {}

  // בדוק DB
  const dbStart = Date.now()
  try {
    await db.raw('SELECT 1')
    checks.database = { status: 'ok', latencyMs: Date.now() - dbStart }
  } catch {
    checks.database = { status: 'error' }
  }

  // בדוק Redis
  const cacheStart = Date.now()
  try {
    await redis.ping()
    checks.cache = { status: 'ok', latencyMs: Date.now() - cacheStart }
  } catch {
    checks.cache = { status: 'error' }
  }

  const allOk = Object.values(checks).every(c => c.status === 'ok')

  const body: HealthStatus = {
    status: allOk ? 'healthy' : 'unhealthy',
    version: process.env.APP_VERSION ?? 'unknown',  // sha-abc1234
    uptime: process.uptime(),
    checks,
  }

  // HTTP 200 = healthy → load balancer שולח traffic
  // HTTP 503 = unhealthy → load balancer מסיר מ-rotation
  res.status(allOk ? 200 : 503).json(body)
}`,
      },
      {
        type: 'tip',
        text: 'MTTR (Mean Time to Recovery) הוא ה-metric החשוב ביותר ב-CD — לא MTBF (Mean Time Between Failures). אל תנסו להגיע לאפס failures — אל תצליחו. נסו לקצר את הזמן מגילוי בעיה לחזרה לnormal. CI/CD + auto-rollback + alerting = MTTR של דקות במקום שעות.',
      },
    ],
    questionBank: [
      {
        id: 'monitoring-q1',
        text: 'מה Smoke Test ב-context של CI/CD?',
        options: [
          'test שבודק performance תחת load',
          'בדיקה מינימלית של critical path מיד אחרי deploy — מאמת שה-app בסיסי עובד לפני הכרזת הצלחה',
          'בדיקה שה-smoke detectors עובדים בdata center',
          'load test שמדמה traffic אמיתי',
        ],
        correct: 1,
        explanation: 'Smoke test = "האם האפליקציה בכלל עובדת?" — health check, login, core API. לא comprehensive testing. מריצים מיד אחרי deploy תוך שניות. fail → rollback אוטומטי. השם מגיע מ"הפעל מכשיר — אם עשן יוצא, כבה מיד".',
      },
      {
        id: 'monitoring-q2',
        text: 'מה יתרון Auto-Rollback על Rollback ידני?',
        options: [
          'Auto-Rollback מדויק יותר — יודע בדיוק מה השתנה',
          'MTTR נמוך בהרבה — ה-pipeline מזהה כישלון ומחזיר אחורה תוך שניות, ללא on-call שמתעורר',
          'Auto-Rollback זול יותר בעלויות infrastructure',
          'Auto-Rollback לא צריך monitoring כלל',
        ],
        correct: 1,
        explanation: 'Rollback ידני: deploy ב-02:00 → alert ב-02:05 → on-call מתעורר ב-02:15 → rollback ב-02:25 = 25 דקות downtime. Auto-Rollback: deploy → smoke test fail תוך 2 דקות → rollback → 3 דקות total. MTTR הוא הכל.',
      },
      {
        id: 'monitoring-q3',
        text: 'מה שלושת עמודות ה-Observability?',
        options: [
          'Logs, Tests, Deployments',
          'Metrics (נתונים כמותיים), Logs (אירועים), Traces (מעקב request end-to-end)',
          'CPU, Memory, Network bandwidth',
          'Frontend errors, Backend errors, DB errors',
        ],
        correct: 1,
        explanation: 'Metrics: "error rate עלה ל-5%". Logs: "NullPointerException ב-UserService.getById() line 42". Traces: "request לקח 3 שניות — 2.5 שניות היו ב-DB query של getUserOrders". שלושתם יחד נותנים תמונה מלאה לdiagnosis.',
      },
      {
        id: 'monitoring-q4',
        text: 'מה HTTP 503 מ-/health endpoint עושה ל-load balancer?',
        options: [
          'שולח alert ל-on-call',
          'load balancer מסיר את ה-instance מה-rotation — לא שולח אליו traffic עד שיחזור ל-200',
          'מפסיק את ה-instance אוטומטית',
          'מפעיל rollback אוטומטי',
        ],
        correct: 1,
        explanation: 'Load balancer קורא /health כל 30 שניות. 200 = instance בריא → מקבל traffic. 503 = instance לא בריא → מוצא מrotation, traffic לא נשלח. כך instance שDB שלו נפל לא מקבל requests. Rolling deploy: חכה ל-200 לפני שהinstance נחשב "ready".',
      },
      {
        id: 'monitoring-q5',
        text: 'מה MTTR ולמה הוא חשוב יותר מ-MTBF ב-context של CI/CD?',
        options: [
          'MTBF תמיד חשוב יותר — אפס failures זה המטרה',
          'MTTR = Mean Time to Recovery — כמה מהר מתאוששים. חשוב יותר כי כישלונות יקרו תמיד, השאלה היא מהירות ההתאוששות',
          'MTTR ו-MTBF חשובים שווה',
          'MTTR רלוונטי רק ל-hardware failures',
        ],
        correct: 1,
        explanation: 'MTBF = זמן בין כישלונות — אפשר לשפר אבל לא לאפס. MTTR = זמן עד החלמה. CI/CD + auto-rollback + monitoring = MTTR של דקות במקום שעות. "Design for failure, optimize for recovery" — Google SRE philosophy.',
      },
    ],
  },
]
