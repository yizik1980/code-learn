import type { Lesson } from '../../types'

export const angularLessons: Lesson[] = [
  {
    id: 'angular-intro',
    title: 'מבוא ל-Angular',
    summary: 'ארכיטקטורת Angular, CLI, NgModules לעומת Standalone, ומבנה פרויקט',
    emoji: '🅰️',
    content: [
      { type: 'heading', text: 'מה זה Angular?' },
      {
        type: 'text',
        text: 'Angular הוא framework מלא לבניית web applications — פיתח ותחזק על ידי Google. בניגוד ל-React (ספרייה) ו-Vue, Angular כולל הכל מהקופסה: routing, forms, HTTP client, DI container, i18n ועוד. מתאים לאפליקציות enterprise גדולות עם צוותים מרובים.',
      },
      {
        type: 'table',
        caption: 'Angular לעומת React',
        headers: ['נושא', 'Angular', 'React'],
        rows: [
          ['סוג', 'Framework מלא', 'UI Library'],
          ['שפה', 'TypeScript (חובה)', 'JS/TS'],
          ['State', 'Services + Signals', 'useState / Redux / Zustand'],
          ['Forms', 'מובנה', 'react-hook-form / Formik'],
          ['HTTP', 'HttpClient מובנה', 'fetch / axios'],
          ['Routing', 'Angular Router מובנה', 'React Router (חיצוני)'],
          ['DI', 'מובנה עמוק', 'Context / ספריות'],
          ['Learning curve', 'תלול יותר', 'מתון'],
        ],
      },
      { type: 'heading', text: 'Angular CLI' },
      {
        type: 'code',
        lang: 'bash',
        caption: 'יצירת פרויקט והפקודות הנפוצות',
        code: `# התקנה גלובלית
npm install -g @angular/cli

# יצירת פרויקט חדש
ng new my-app --standalone --routing --style=scss
cd my-app

# הרצה עם hot-reload
ng serve

# יצירת רכיבים
ng generate component pages/home         # ng g c
ng generate service services/user        # ng g s
ng generate guard guards/auth            # ng g guard

# build לייצור
ng build --configuration=production`,
      },
      { type: 'heading', text: 'Standalone Components (Angular 17+)' },
      {
        type: 'text',
        text: 'עד Angular 14, כל component היה חייב להיות חלק מ-NgModule. Angular 16-17 הביאו Standalone components — component עצמאי שמייבא ישירות את מה שצריך, ללא NgModule. זה הדפוס המומלץ כיום.',
      },
      {
        type: 'code',
        lang: 'typescript',
        caption: 'main.ts — bootstrap עם Standalone',
        code: `import { bootstrapApplication } from '@angular/platform-browser'
import { provideRouter } from '@angular/router'
import { provideHttpClient } from '@angular/common/http'
import { AppComponent } from './app/app.component'
import { routes } from './app/app.routes'

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
  ],
})`,
      },
      {
        type: 'table',
        caption: 'קבצים עיקריים בפרויקט Angular',
        headers: ['קובץ', 'תפקיד'],
        rows: [
          ['main.ts', 'נקודת כניסה — bootstrap האפליקציה'],
          ['app.component.ts', 'Root component'],
          ['app.routes.ts', 'הגדרת routes'],
          ['angular.json', 'הגדרות build, styles, assets'],
          ['tsconfig.json', 'הגדרות TypeScript'],
          ['environment.ts', 'משתני סביבה (dev/prod)'],
        ],
      },
    ],
    questionBank: [
      {
        id: 'angular-intro-q1',
        text: 'מה ההבדל העיקרי בין Angular ל-React?',
        options: [
          'Angular כתוב ב-Python',
          'Angular הוא framework מלא עם routing/forms/HTTP מובנה; React היא ספריית UI בלבד',
          'React תומך ב-TypeScript, Angular לא',
          'Angular עובד רק ב-mobile',
        ],
        correct: 1,
        explanation: 'Angular "batteries included" — routing, forms, HTTP, DI, i18n מובנים. React היא ספרייה ל-UI בלבד ואת השאר בוחרים בנפרד.',
      },
      {
        id: 'angular-intro-q2',
        text: 'מה ng generate component עושה?',
        options: [
          'מריץ את האפליקציה',
          'יוצר קבצי component (ts, html, scss, spec) ומעדכן את ה-module/route אוטומטית',
          'מוחק component',
          'בונה לייצור',
        ],
        correct: 1,
        explanation: 'ng g c יוצר 4 קבצים (.ts, .html, .scss, .spec.ts) ומרשם את ה-component במקום הנכון. חוסך boilerplate ידני.',
      },
      {
        id: 'angular-intro-q3',
        text: 'מה Standalone component (Angular 17) משפר על NgModule?',
        options: [
          'מהיר יותר בזמן ריצה',
          'מבטל את הצורך ב-NgModule — component מייבא ישירות את dependencies שלו, פחות boilerplate',
          'תומך ב-SSR',
          'עובד ללא TypeScript',
        ],
        correct: 1,
        explanation: 'NgModule דרש להרשים component ב-declarations[], imports[] ו-exports[]. Standalone = component עצמאי עם imports[] ישיר. הרבה פחות קוד.',
      },
      {
        id: 'angular-intro-q4',
        text: 'מה תפקיד הקובץ angular.json?',
        options: [
          'הגדרת routes',
          'הגדרות build — styles, scripts, assets, environments, output path',
          'הגדרת TypeScript',
          'הגדרת DI providers',
        ],
        correct: 1,
        explanation: 'angular.json הוא קובץ הגדרות ה-CLI — איפה ה-source files, אילו styles לכלול, assets, configurations לסביבות שונות.',
      },
      {
        id: 'angular-intro-q5',
        text: 'מה provideHttpClient() עושה ב-bootstrapApplication?',
        options: [
          'פותח חיבור ל-DB',
          'רושם את HttpClient service ב-DI container כך שאפשר לעשות inject לו בכל ה-app',
          'מגדיר CORS',
          'מאמת JWT tokens',
        ],
        correct: 1,
        explanation: 'provideHttpClient() = Angular 15+ API שמחליפה את HttpClientModule. רושמת את HttpClient ב-root injector — זמינה לכל השירותים.',
      },
    ],
  },

  {
    id: 'angular-components',
    title: 'Components ו-Templates',
    summary: '@Component, data binding, lifecycle hooks, @Input/@Output, content projection',
    emoji: '🧩',
    content: [
      { type: 'heading', text: '@Component — מבנה בסיסי' },
      {
        type: 'code',
        lang: 'typescript',
        caption: 'קומפוננטה Standalone מלאה',
        code: `import { Component, Input, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterLink } from '@angular/router'

@Component({
  selector: 'app-course-card',       // תג HTML: <app-course-card>
  standalone: true,
  imports: [CommonModule, RouterLink],  // מה ה-template צריך
  template: \`
    <div class="card" [class.highlighted]="isHighlighted">
      <h2>{{ title }}</h2>
      <p>{{ description }}</p>
      <a [routerLink]="['/courses', courseId]">פתח קורס</a>
      <button (click)="onEnroll()">הרשמה</button>
    </div>
  \`,
  styles: [\`
    .card { border: 1px solid #ccc; padding: 1rem; }
    .highlighted { border-color: #6366f1; }
  \`],
})
export class CourseCardComponent implements OnInit, OnDestroy {
  @Input({ required: true }) title!: string
  @Input() description = ''
  @Input() courseId = ''
  @Input() isHighlighted = false

  @Output() enrolled = new EventEmitter<string>()

  ngOnInit() {
    console.log('component נוצר')
  }

  ngOnDestroy() {
    console.log('component הוסר מה-DOM')
  }

  onEnroll() {
    this.enrolled.emit(this.courseId)
  }
}`,
      },
      { type: 'heading', text: 'Data Binding — 4 סוגים' },
      {
        type: 'table',
        caption: 'סוגי data binding ב-Angular',
        headers: ['סוג', 'תחביר', 'כיוון', 'דוגמה'],
        rows: [
          ['Interpolation', '{{ expr }}', 'Component → DOM', '{{ user.name }}'],
          ['Property binding', '[prop]="expr"', 'Component → DOM', '[disabled]="isLoading"'],
          ['Event binding', '(event)="handler()"', 'DOM → Component', '(click)="save()"'],
          ['Two-way binding', '[(ngModel)]="prop"', 'דו-כיווני', '[(ngModel)]="email"'],
        ],
      },
      {
        type: 'code',
        lang: 'html',
        caption: 'Template — דוגמאות binding',
        code: `<!-- Interpolation -->
<h1>שלום {{ user.name }}</h1>
<p>{{ price | currency:'ILS' }}</p>

<!-- Property binding -->
<img [src]="user.avatarUrl" [alt]="user.name">
<button [disabled]="isSubmitting">שמור</button>
<div [class.active]="isActive" [style.color]="textColor">...</div>

<!-- Event binding -->
<button (click)="handleClick($event)">לחץ</button>
<input (keyup.enter)="search()" (blur)="validate()">
<form (ngSubmit)="onSubmit()">

<!-- Two-way — דורש FormsModule -->
<input [(ngModel)]="searchQuery" placeholder="חפש...">`,
      },
      { type: 'heading', text: 'Lifecycle Hooks' },
      {
        type: 'table',
        caption: 'Lifecycle hooks — סדר קריאה',
        headers: ['Hook', 'מתי נקרא', 'שימוש נפוץ'],
        rows: [
          ['ngOnChanges', 'כשמשתנה @Input', 'תגובה לשינוי props'],
          ['ngOnInit', 'פעם אחת אחרי יצירה', 'fetch נתונים, אתחול'],
          ['ngDoCheck', 'כל change detection', 'נדיר — ביצועים'],
          ['ngAfterViewInit', 'אחרי render ה-template', 'גישה ל-DOM, @ViewChild'],
          ['ngOnDestroy', 'לפני הסרה מ-DOM', 'unsubscribe, cleanup'],
        ],
      },
      {
        type: 'code',
        lang: 'typescript',
        caption: '@Input, @Output ו-@ViewChild',
        code: `import { Component, Input, Output, EventEmitter, ViewChild, ElementRef, AfterViewInit } from '@angular/core'

@Component({
  selector: 'app-search',
  standalone: true,
  template: \`
    <input #searchInput type="text" (input)="onInput($event)">
    <button (click)="clear()">נקה</button>
  \`,
})
export class SearchComponent implements AfterViewInit {
  // @Input עם transform — Angular 16+
  @Input({ transform: (v: string) => v.trim() }) placeholder = ''

  @Output() searched = new EventEmitter<string>()

  // גישה לאלמנט DOM ישיר
  @ViewChild('searchInput') inputRef!: ElementRef<HTMLInputElement>

  ngAfterViewInit() {
    // DOM זמין רק כאן
    this.inputRef.nativeElement.focus()
  }

  onInput(event: Event) {
    const value = (event.target as HTMLInputElement).value
    this.searched.emit(value)
  }

  clear() {
    this.inputRef.nativeElement.value = ''
    this.searched.emit('')
  }
}`,
      },
      { type: 'heading', text: 'Control Flow החדש (Angular 17)' },
      {
        type: 'code',
        lang: 'html',
        caption: '@if, @for, @switch — תחביר חדש במקום *ngIf/*ngFor',
        code: `<!-- @if — במקום *ngIf -->
@if (user) {
  <p>שלום, {{ user.name }}</p>
} @else if (isLoading) {
  <app-spinner />
} @else {
  <p>לא מחוברים</p>
}

<!-- @for — במקום *ngFor, חייב track -->
@for (course of courses; track course.id) {
  <app-course-card [title]="course.title" />
} @empty {
  <p>אין קורסים</p>
}

<!-- @switch -->
@switch (userRole) {
  @case ('admin') { <app-admin-panel /> }
  @case ('teacher') { <app-teacher-view /> }
  @default { <app-student-view /> }
}`,
      },
    ],
    questionBank: [
      {
        id: 'angular-components-q1',
        text: 'מה ההבדל בין [prop] ל-{{ expr }} ב-Angular?',
        options: [
          'אין הבדל',
          '[prop] מגדיר property של DOM element; {{ }} מציג טקסט בתוך HTML',
          '{{ }} עובד רק עם מספרים',
          '[prop] עובד רק עם כפתורים',
        ],
        correct: 1,
        explanation: '[src]="url" → img.src = url (property). {{ url }} → כותב את ה-string בתוך ה-HTML. Property binding מתאים לכל attribute של DOM element.',
      },
      {
        id: 'angular-components-q2',
        text: 'מתי נשתמש ב-ngOnInit ולא ב-constructor?',
        options: [
          'אין הבדל — אפשר בשניהם',
          'constructor לאתחול DI בלבד; ngOnInit כשצריך @Input values — שם הם כבר זמינים',
          'constructor מהיר יותר',
          'ngOnInit עובד רק עם Signals',
        ],
        correct: 1,
        explanation: 'ב-constructor ה-@Input values עוד לא הוגדרו. ngOnInit נקרא אחרי Angular מגדיר את כל ה-inputs — המקום הנכון ל-fetch נתונים.',
      },
      {
        id: 'angular-components-q3',
        text: 'מה @Output() ו-EventEmitter מאפשרים?',
        options: [
          'שמירת נתונים ב-localStorage',
          'שידור event מ-child component ל-parent — תקשורת מלמטה למעלה',
          'שינוי routes',
          'קריאה ל-HTTP',
        ],
        correct: 1,
        explanation: '@Output() enrolled = new EventEmitter<string>() + this.enrolled.emit(id) → ב-parent: <app-card (enrolled)="handle($event)">. אירוע עולה מ-child ל-parent.',
      },
      {
        id: 'angular-components-q4',
        text: 'מה @ViewChild עושה?',
        options: [
          'מגדיר child component',
          'נותן גישה לאלמנט DOM או child component ישירות מקוד ה-TypeScript',
          'מגדיר routing לילד',
          'יוצר component חדש דינמית',
        ],
        correct: 1,
        explanation: '@ViewChild("ref") el!: ElementRef גורם ל-Angular להזריק reference לאלמנט שסומן ב-#ref בtemplate. זמין רק מ-ngAfterViewInit.',
      },
      {
        id: 'angular-components-q5',
        text: 'מה היתרון של @for עם track לעומת *ngFor ישן?',
        options: [
          'תחביר קצר יותר בלבד',
          'track חובה — Angular מזהה אלמנטים לפי מפתח ייחודי, מונע re-render מיותר',
          'עובד ללא CommonModule',
          'תומך ב-async',
        ],
        correct: 1,
        explanation: 'ב-*ngFor היה אפשר לשכוח trackBy. ב-@for חדש track הוא חובה — Angular תמיד יודע מה השתנה ברשימה ומעדכן רק את ה-DOM הרלוונטי.',
      },
    ],
  },

  {
    id: 'angular-services-di',
    title: 'Services ו-Dependency Injection',
    summary: '@Injectable, providedIn, HttpClient, interceptors ו-DI hierarchy ב-Angular',
    emoji: '⚙️',
    content: [
      { type: 'heading', text: 'Services — לוגיקה משותפת' },
      {
        type: 'text',
        text: 'Service ב-Angular הוא class עם @Injectable שמכיל לוגיקה עסקית, קריאות HTTP, ו-state משותף. Angular מנהל instance אחד (Singleton) שמוזרק לכל component שצריך אותו — זה ה-DI Container.',
      },
      {
        type: 'code',
        lang: 'typescript',
        caption: 'service בסיסי עם HttpClient',
        code: `import { Injectable, inject } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { map, catchError } from 'rxjs/operators'

export interface Note {
  id: number
  content: string
  courseId: string
  lessonId: string
}

@Injectable({ providedIn: 'root' })  // Singleton — instance אחד לכל האפליקציה
export class NotesService {
  private http = inject(HttpClient)                    // inject() במקום constructor
  private apiUrl = 'https://api.codelearn.com/api'

  getNotes(courseId: string, lessonId: string): Observable<Note[]> {
    return this.http
      .get<Note[]>(\`\${this.apiUrl}/notes\`, {
        params: { courseId, lessonId },
      })
      .pipe(
        map((notes) => notes.sort((a, b) => b.id - a.id)),
        catchError((err) => {
          console.error('Failed to fetch notes', err)
          throw err
        }),
      )
  }

  createNote(note: Omit<Note, 'id'>): Observable<Note> {
    return this.http.post<Note>(\`\${this.apiUrl}/notes\`, note)
  }

  deleteNote(id: number): Observable<void> {
    return this.http.delete<void>(\`\${this.apiUrl}/notes/\${id}\`)
  }
}`,
      },
      {
        type: 'code',
        lang: 'typescript',
        caption: 'שימוש בservice ב-component',
        code: `import { Component, inject, OnInit } from '@angular/core'
import { AsyncPipe } from '@angular/common'
import { NotesService, Note } from '../services/notes.service'
import { Observable } from 'rxjs'

@Component({
  selector: 'app-notes-list',
  standalone: true,
  imports: [AsyncPipe],
  template: \`
    @if (notes$ | async; as notes) {
      @for (note of notes; track note.id) {
        <p>{{ note.content }}</p>
      }
    }
  \`,
})
export class NotesListComponent implements OnInit {
  private notesService = inject(NotesService)
  notes$!: Observable<Note[]>

  ngOnInit() {
    this.notes$ = this.notesService.getNotes('sql', 'sql-join')
  }
}`,
      },
      { type: 'heading', text: 'DI Hierarchy — providedIn' },
      {
        type: 'table',
        caption: 'רמות DI ב-Angular',
        headers: ['providedIn', 'scope', 'מתי'],
        rows: [
          ['root', 'Singleton לכל האפליקציה', 'ברירת מחדל — רוב ה-services'],
          ['platform', 'Singleton בין applications', 'micro-frontends נדיר'],
          ['any', 'instance נפרד לכל lazy module', 'state מבודד לפי feature'],
          ['component', 'instance חדש לכל component', 'services עם state מקומי'],
        ],
      },
      { type: 'heading', text: 'HTTP Interceptors' },
      {
        type: 'code',
        lang: 'typescript',
        caption: 'Functional Interceptor (Angular 15+) — הוספת Auth header',
        code: `import { HttpInterceptorFn, HttpRequest, HttpHandlerFn } from '@angular/common/http'
import { inject } from '@angular/core'
import { AuthService } from './auth.service'

// Interceptor פונקציונלי — Angular 15+
export const authInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn,
) => {
  const auth = inject(AuthService)
  const token = auth.getToken()

  if (!token) return next(req)

  // HttpRequest הוא immutable — clone עם שינוי
  const authReq = req.clone({
    headers: req.headers.set('Authorization', \`Bearer \${token}\`),
  })

  return next(authReq)
}

// רישום ב-main.ts:
// provideHttpClient(withInterceptors([authInterceptor]))`,
      },
      {
        type: 'code',
        lang: 'typescript',
        caption: 'Interceptor לטיפול בשגיאות גלובלי',
        code: `import { HttpInterceptorFn } from '@angular/common/http'
import { inject } from '@angular/core'
import { Router } from '@angular/router'
import { catchError, throwError } from 'rxjs'

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router)

  return next(req).pipe(
    catchError((err) => {
      if (err.status === 401) {
        router.navigate(['/login'])
      }
      if (err.status === 403) {
        router.navigate(['/forbidden'])
      }
      return throwError(() => err)
    }),
  )
}`,
      },
      {
        type: 'tip',
        text: 'השתמש ב-inject() במקום constructor injection — קריא יותר, עובד בכל context (לא רק constructor), ומאפשר להגדיר inject מחוץ ל-class.',
      },
    ],
    questionBank: [
      {
        id: 'angular-services-di-q1',
        text: 'מה providedIn: "root" עושה ב-@Injectable?',
        options: [
          'מגביל את ה-service לroot component בלבד',
          'יוצר Singleton — instance אחד לכל חיי האפליקציה, זמין לכל component',
          'דורש הרשמה ידנית ב-NgModule',
          'מאפשר מספר instances',
        ],
        correct: 1,
        explanation: 'providedIn: "root" = tree-shakable Singleton. Angular יוצר instance אחד בlazy ורק אם ה-service בשימוש. אין צורך לרשום ב-providers[].',
      },
      {
        id: 'angular-services-di-q2',
        text: 'מה inject() עושה ב-Angular 14+?',
        options: [
          'מוחק dependency',
          'מזריק dependency מה-DI container בלי constructor — עובד בכל injection context',
          'יוצר service חדש',
          'בודק אם service קיים',
        ],
        correct: 1,
        explanation: 'inject(NotesService) = שווה ערך לconstructor(private notes: NotesService). עובד בclass fields, factory functions, guards ו-interceptors.',
      },
      {
        id: 'angular-services-di-q3',
        text: 'למה HttpRequest הוא immutable ב-Interceptor?',
        options: [
          'מסיבות ביצועים',
          'Angular מונע שינוי request לאחר שנשלח — חייבים req.clone() לשינוי headers/body',
          'TypeScript מחייב זאת',
          'HTTP/2 דורש זאת',
        ],
        correct: 1,
        explanation: 'Immutability מונעת side effects. req.clone({ headers: ... }) מחזיר request חדש עם השינוי. הoriginal נשאר שלם לאפשר retry, logging וcaching.',
      },
      {
        id: 'angular-services-di-q4',
        text: 'מה async pipe (| async) עושה ב-template?',
        options: [
          'הופך פונקציה לasync',
          'מנוי ל-Observable/Promise ומציג ערך, ועושה unsubscribe אוטומטי כשהcomponent נהרס',
          'מתרגם טקסט',
          'מסנן מערך',
        ],
        correct: 1,
        explanation: 'notes$ | async = Angular subscribes, מציג את הערך, ועושה unsubscribe ב-ngOnDestroy. מונע memory leaks ומבטל צורך ב-manual subscribe.',
      },
      {
        id: 'angular-services-di-q5',
        text: 'מה Functional Interceptor (Angular 15+) משפר על Class interceptor?',
        options: [
          'מהיר יותר בזמן ריצה',
          'פשוט יותר — function במקום class + implements HttpInterceptor, עובד עם inject()',
          'תומך ב-GraphQL',
          'עובד ללא HttpClient',
        ],
        correct: 1,
        explanation: 'Functional interceptor = פונקציה פשוטה. אין צורך ב-class, implements, ו-intercept method. inject() עובד ישירות בתוך הפונקציה.',
      },
    ],
  },

  {
    id: 'angular-routing',
    title: 'Routing ו-Navigation',
    summary: 'Angular Router — routes, lazy loading, guards, resolvers ו-Router Signals',
    emoji: '🗺️',
    content: [
      { type: 'heading', text: 'הגדרת Routes' },
      {
        type: 'code',
        lang: 'typescript',
        caption: 'app.routes.ts — הגדרת navigation',
        code: `import { Routes } from '@angular/router'
import { authGuard } from './guards/auth.guard'

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent),
  },
  {
    path: 'courses',
    loadChildren: () => import('./pages/courses/courses.routes').then(m => m.coursesRoutes),
  },
  {
    path: 'learn/:courseId/:lessonId',
    loadComponent: () => import('./pages/lesson/lesson.component').then(m => m.LessonComponent),
    canActivate: [authGuard],        // guard — בודק הרשאות לפני navigation
  },
  {
    path: '**',                     // wildcard — כל route לא מוכר
    loadComponent: () => import('./pages/not-found/not-found.component').then(m => m.NotFoundComponent),
  },
]`,
      },
      { type: 'heading', text: 'RouterLink ו-Navigation' },
      {
        type: 'code',
        lang: 'html',
        caption: 'navigation ב-template ובקוד',
        code: `<!-- RouterLink בtemplate -->
<a routerLink="/home">בית</a>
<a [routerLink]="['/learn', courseId, lessonId]">פתח שיעור</a>
<a routerLink="/courses" [queryParams]="{ filter: 'sql' }">קורסי SQL</a>

<!-- RouterLinkActive — CSS class כשה-route פעיל -->
<nav>
  <a routerLink="/home" routerLinkActive="active">בית</a>
  <a routerLink="/courses" routerLinkActive="active" [routerLinkActiveOptions]="{ exact: true }">קורסים</a>
</nav>

<!-- Router outlet — כאן מוצגים ה-components -->
<router-outlet />`,
      },
      {
        type: 'code',
        lang: 'typescript',
        caption: 'navigation מ-TypeScript + קריאת params',
        code: `import { Component, inject } from '@angular/core'
import { Router, ActivatedRoute } from '@angular/router'
import { toSignal } from '@angular/core/rxjs-interop'

@Component({ standalone: true, template: '' })
export class LessonComponent {
  private router = inject(Router)
  private route = inject(ActivatedRoute)

  // קריאת route params
  courseId = this.route.snapshot.params['courseId']
  lessonId = this.route.snapshot.params['lessonId']

  // קריאת query params — reactive
  filter = toSignal(this.route.queryParamMap.pipe(
    map(params => params.get('filter') ?? '')
  ))

  // navigation פרוגרמטי
  goToCourse(id: string) {
    this.router.navigate(['/courses', id])
  }

  goBack() {
    this.router.navigate(['..'], { relativeTo: this.route })
  }

  goWithQuery() {
    this.router.navigate(['/courses'], {
      queryParams: { page: 2, sort: 'date' },
      queryParamsHandling: 'merge',  // שמר params קיימים
    })
  }
}`,
      },
      { type: 'heading', text: 'Guards — הגנה על Routes' },
      {
        type: 'code',
        lang: 'typescript',
        caption: 'authGuard — Functional Guard',
        code: `import { inject } from '@angular/core'
import { CanActivateFn, Router } from '@angular/router'
import { AuthService } from '../services/auth.service'

// Functional Guard — Angular 15+
export const authGuard: CanActivateFn = (route, state) => {
  const auth = inject(AuthService)
  const router = inject(Router)

  if (auth.isLoggedIn()) return true

  // redirect לlogin עם returnUrl
  return router.createUrlTree(['/login'], {
    queryParams: { returnUrl: state.url },
  })
}

// שימוש ב-routes:
// { path: 'dashboard', canActivate: [authGuard], ... }`,
      },
      { type: 'heading', text: 'Lazy Loading — טעינה עצלה' },
      {
        type: 'code',
        lang: 'typescript',
        caption: 'courses.routes.ts — feature routes עם lazy loading',
        code: `import { Routes } from '@angular/router'

// קובץ routes לפיצ'ר — נטען רק כשמגיעים ל-/courses
export const coursesRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./courses-list.component').then(m => m.CoursesListComponent),
  },
  {
    path: ':id',
    loadComponent: () => import('./course-detail.component').then(m => m.CourseDetailComponent),
  },
]

// ב-app.routes.ts:
// { path: 'courses', loadChildren: () => import('./courses.routes').then(m => m.coursesRoutes) }
// → bundle נפרד שנטען רק כשצריך`,
      },
      {
        type: 'tip',
        text: 'Lazy loading = bundle splitting. Angular יוצר chunk נפרד לכל loadComponent/loadChildren. טעינת הדף הראשונה מהירה יותר כי לא כל הקוד נטען מראש.',
      },
    ],
    questionBank: [
      {
        id: 'angular-routing-q1',
        text: 'מה loadComponent עושה ב-route definition?',
        options: [
          'טוען component מ-CDN',
          'Lazy loading — יוצר bundle נפרד שנטען רק כשמגיעים ל-route, משפר ביצועי טעינה ראשונה',
          'טוען component מ-cache',
          'טוען template בלבד ללא TypeScript',
        ],
        correct: 1,
        explanation: 'loadComponent(() => import("./page.component")) = code splitting. Webpack/Vite יוצרים chunk נפרד. הדף הראשי קטן יותר, שאר ה-chunks נטענים לפי דרישה.',
      },
      {
        id: 'angular-routing-q2',
        text: 'מה routerLinkActive עושה?',
        options: [
          'מפעיל animation',
          'מוסיף CSS class לקישור כשה-route שלו פעיל — שימושי לסימון navigation item',
          'מבטל navigation',
          'מוסיף query params',
        ],
        correct: 1,
        explanation: 'routerLinkActive="active" → Angular מוסיף class="active" לאלמנט כשה-URL תואם לrouterLink שלו. מתאים לסימון tab/menu item פעיל.',
      },
      {
        id: 'angular-routing-q3',
        text: 'מה CanActivate guard מאפשר?',
        options: [
          'שינוי ה-URL',
          'בדיקה לפני כניסה ל-route — אם מחזיר false/UrlTree, Angular מבטל navigation ואפשר להפנות אחרת',
          'טעינת נתונים לפני הrender',
          'שמירת state ב-URL',
        ],
        correct: 1,
        explanation: 'Guard מחזיר true (אפשר), false (מנוע), או UrlTree (redirect). שימושי לבדיקת authentication, הרשאות, ו-feature flags.',
      },
      {
        id: 'angular-routing-q4',
        text: 'מה ההבדל בין route.snapshot.params לroute.paramMap?',
        options: [
          'אין הבדל',
          'snapshot = ערך ב-נקודת זמן; paramMap = Observable שמתעדכן כשה-params משתנים תוך כדי',
          'paramMap עובד רק עם query params',
          'snapshot עובד רק עם lazy routes',
        ],
        correct: 1,
        explanation: 'אם המשתמש ניווט מ-/learn/sql/join ל-/learn/react/hooks ואותו component — snapshot לא יתעדכן. paramMap כ-Observable יתעדכן עם ה-params החדשים.',
      },
      {
        id: 'angular-routing-q5',
        text: 'מה ** (wildcard route) עושה?',
        options: [
          'מתאים לכל route — חייב להיות ראשון',
          'מתאים לכל route שלא הותאם קודם — חייב להיות אחרון, משמש לדף 404',
          'מגדיר base route',
          'מפעיל lazy loading לכל ה-routes',
        ],
        correct: 1,
        explanation: 'Angular בודק routes לפי סדר. ** מתאים לכל URL — חייב להיות אחרון, אחרת יתפוס את כל ה-routes. משמש לדף 404 / not found.',
      },
    ],
  },

  {
    id: 'angular-forms',
    title: 'Forms — Template-driven ו-Reactive',
    summary: 'Reactive Forms עם FormBuilder ו-validators, Template-driven Forms, ו-typed forms (Angular 14+)',
    emoji: '📝',
    content: [
      { type: 'heading', text: 'שני סוגי Forms ב-Angular' },
      {
        type: 'table',
        caption: 'Template-driven לעומת Reactive Forms',
        headers: ['נושא', 'Template-driven', 'Reactive Forms'],
        rows: [
          ['הגדרה', 'ב-HTML עם ngModel', 'ב-TypeScript עם FormGroup'],
          ['טסטים', 'קשה — צריך DOM', 'קל — pure TypeScript'],
          ['לוגיקה מורכבת', 'מסורבל', 'מתאים מאוד'],
          ['Dynamic fields', 'מסובך', 'FormArray — פשוט'],
          ['מתי', 'form פשוט', 'form מורכב / enterprise'],
        ],
      },
      { type: 'heading', text: 'Reactive Forms — FormBuilder' },
      {
        type: 'code',
        lang: 'typescript',
        caption: 'Reactive Form מלא עם validators',
        code: `import { Component, inject } from '@angular/core'
import { FormBuilder, ReactiveFormsModule, Validators, AbstractControl } from '@angular/forms'
import { CommonModule } from '@angular/common'

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  template: \`
    <form [formGroup]="form" (ngSubmit)="onSubmit()">
      <div>
        <label>אימייל</label>
        <input formControlName="email" type="email">
        @if (email.invalid && email.touched) {
          @if (email.errors?.['required']) { <span>שדה חובה</span> }
          @if (email.errors?.['email']) { <span>אימייל לא תקין</span> }
        }
      </div>

      <div>
        <label>סיסמה</label>
        <input formControlName="password" type="password">
        @if (password.invalid && password.touched) {
          <span>סיסמה חייבת להכיל לפחות 8 תווים</span>
        }
      </div>

      <button type="submit" [disabled]="form.invalid || isSubmitting">הרשמה</button>
    </form>
  \`,
})
export class RegisterComponent {
  private fb = inject(FormBuilder)

  isSubmitting = false

  // Typed FormGroup — Angular 14+
  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
    confirmPassword: ['', Validators.required],
  }, { validators: this.passwordsMatch })

  // getters נוחים לגישה ב-template
  get email() { return this.form.controls.email }
  get password() { return this.form.controls.password }

  // Custom cross-field validator
  passwordsMatch(group: AbstractControl) {
    const pw = group.get('password')?.value
    const confirm = group.get('confirmPassword')?.value
    return pw === confirm ? null : { passwordMismatch: true }
  }

  onSubmit() {
    if (this.form.invalid) return
    this.isSubmitting = true
    const { email, password } = this.form.getRawValue()
    // ... call service
  }
}`,
      },
      { type: 'heading', text: 'Custom Validators' },
      {
        type: 'code',
        lang: 'typescript',
        caption: 'Validator פונקציה ו-Async Validator',
        code: `import { AbstractControl, ValidationErrors, AsyncValidatorFn } from '@angular/forms'
import { inject } from '@angular/core'
import { UserService } from './user.service'
import { map, catchError, of, debounceTime, switchMap } from 'rxjs'

// Synchronous validator
export function israelPhoneValidator(control: AbstractControl): ValidationErrors | null {
  const value = control.value as string
  if (!value) return null  // required יטפל בריק
  const isValid = /^05\d{8}$/.test(value)
  return isValid ? null : { israelPhone: true }
}

// Async validator — בדיקת ייחודיות אימייל בשרת
export function emailExistsValidator(): AsyncValidatorFn {
  const userService = inject(UserService)

  return (control: AbstractControl) =>
    control.valueChanges.pipe(
      debounceTime(400),        // המתן 400ms לאחר הקלדה
      switchMap((email) => userService.checkEmailExists(email)),
      map((exists) => (exists ? { emailTaken: true } : null)),
      catchError(() => of(null)),
    )
}

// שימוש:
// email: ['', [Validators.required], [emailExistsValidator()]]`,
      },
      { type: 'heading', text: 'FormArray — שדות דינמיים' },
      {
        type: 'code',
        lang: 'typescript',
        caption: 'FormArray — רשימת שדות שגדלה דינמית',
        code: `import { Component, inject } from '@angular/core'
import { FormBuilder, FormArray, ReactiveFormsModule, Validators } from '@angular/forms'

@Component({
  standalone: true,
  imports: [ReactiveFormsModule],
  template: \`
    <form [formGroup]="form">
      <div formArrayName="tags">
        @for (tag of tags.controls; track $index; let i = $index) {
          <div>
            <input [formControlName]="i" placeholder="תג">
            <button type="button" (click)="removeTag(i)">הסר</button>
          </div>
        }
      </div>
      <button type="button" (click)="addTag()">+ הוסף תג</button>
    </form>
  \`,
})
export class TagsFormComponent {
  private fb = inject(FormBuilder)

  form = this.fb.group({
    tags: this.fb.array([
      this.fb.control('', Validators.required),  // שדה התחלתי אחד
    ]),
  })

  get tags() { return this.form.get('tags') as FormArray }

  addTag() {
    this.tags.push(this.fb.control('', Validators.required))
  }

  removeTag(index: number) {
    this.tags.removeAt(index)
  }
}`,
      },
      {
        type: 'tip',
        text: 'השתמש ב-form.getRawValue() במקום form.value — מחזיר גם שדות disabled. form.value מדלג על שדות disabled ויכול לגרום לbug עדין.',
      },
    ],
    questionBank: [
      {
        id: 'angular-forms-q1',
        text: 'מה היתרון הגדול של Reactive Forms על Template-driven?',
        options: [
          'Reactive יותר מהיר',
          'הלוגיקה ב-TypeScript — ניתן לכתוב unit tests ללא DOM, קל לנהל validation מורכב',
          'Reactive תומך ב-[(ngModel)]',
          'Template-driven לא עובד עם Angular 17',
        ],
        correct: 1,
        explanation: 'Reactive Form = TypeScript objects. ניתן לבדוק, לעשות reset, לעדכן דינמית ולעקוב עם valueChanges — הכל בלי DOM. Template-driven קשה לטסט.',
      },
      {
        id: 'angular-forms-q2',
        text: 'מה Validator מחזיר כשהvalue תקין?',
        options: [
          'true',
          'null — בהיעדר שגיאה מחזירים null',
          '{ valid: true }',
          'undefined',
        ],
        correct: 1,
        explanation: 'Convention: null = תקין. { errorName: true/data } = לא תקין. Angular אוסף את כל השגיאות ל-control.errors object.',
      },
      {
        id: 'angular-forms-q3',
        text: 'מה FormArray מאפשר?',
        options: [
          'מערך של forms',
          'רשימה דינמית של FormControls — push, removeAt, שימושי לתגים, כתובות, שדות חוזרים',
          'validation של מערכים',
          'שמירה של form ב-localStorage',
        ],
        correct: 1,
        explanation: 'FormArray = FormGroup שמכיל מערך. ניתן להוסיף/להסיר controls בזמן ריצה. כל שינוי מתעדכן ב-valueChanges ו-form.value.',
      },
      {
        id: 'angular-forms-q4',
        text: 'מתי מופעל Async Validator?',
        options: [
          'לפני Sync Validators',
          'אחרי שכל Sync Validators עברו בהצלחה — חוסך קריאות API כשה-value לא תקין סינכרוני',
          'בכל שינוי ערך',
          'רק ב-ngOnSubmit',
        ],
        correct: 1,
        explanation: 'Angular מריץ async validators רק אחרי שכל sync validators עברו. אם email שדה ריק — לא נשלח קריאה לשרת. טוב לביצועים.',
      },
      {
        id: 'angular-forms-q5',
        text: 'מה control.touched אומר?',
        options: [
          'המשתמש שינה את הvalue',
          'המשתמש מיקד ואז יצא מהשדה (blur) — משמש להצגת שגיאות רק אחרי שהמשתמש ניסה',
          'הform נשלח',
          'ה-validator רץ',
        ],
        correct: 1,
        explanation: 'touched = המשתמש focus+blur על השדה. dirty = המשתמש שינה ערך. רק מציגים שגיאות כש-touched כדי לא להפחיד בשגיאות לפני שהמשתמש הספיק לכתוב.',
      },
    ],
  },

  {
    id: 'angular-signals',
    title: 'Angular Signals',
    summary: 'signal(), computed(), effect(), toSignal/toObservable ו-RxJS interop — reactivity מודרני ב-Angular 17+',
    emoji: '📡',
    content: [
      { type: 'heading', text: 'מה זה Signals?' },
      {
        type: 'text',
        text: 'Signals הם מנגנון reactivity חדש ב-Angular 16+ שמחליף את Zone.js לצורך change detection. Signal הוא container לערך שמודיע לכל צרכן (computed/effect) כשהוא משתנה — בדיוק כמו React useState אבל ב-framework.',
      },
      {
        type: 'table',
        caption: 'signal לעומת Zone.js (ישן)',
        headers: ['נושא', 'Zone.js (ישן)', 'Signals (חדש)'],
        rows: [
          ['Change detection', 'בודק הכל אחרי כל async event', 'רק components שהSignal שלהם השתנה'],
          ['ביצועים', 'O(tree) — כל ה-component tree', 'O(1) — ממוקד'],
          ['Debugging', 'קשה לדעת מה גרם לrender', 'ברור — Signal X השתנה'],
          ['SSR', 'בעייתי עם Zone.js', 'עובד טוב עם zoneless'],
          ['אינטגרציה', '-', 'toSignal/toObservable עם RxJS'],
        ],
      },
      { type: 'heading', text: 'signal(), computed(), effect()' },
      {
        type: 'code',
        lang: 'typescript',
        caption: 'API בסיסי — signal, computed, effect',
        code: `import { Component, signal, computed, effect } from '@angular/core'

@Component({
  selector: 'app-counter',
  standalone: true,
  template: \`
    <p>ספירה: {{ count() }}</p>
    <p>כפול: {{ doubled() }}</p>
    <button (click)="increment()">+1</button>
    <button (click)="reset()">אפס</button>
  \`,
})
export class CounterComponent {
  // signal — ערך reactive
  count = signal(0)

  // computed — נגזר מ-signal, מחושב מחדש רק כשהתלות משתנה
  doubled = computed(() => this.count() * 2)

  // effect — side effect שרץ כשהתלות משתנה
  private logger = effect(() => {
    console.log(\`count changed to: \${this.count()}\`)
    // Angular עוקב אוטומטית אחרי כל signal שנקרא בתוך effect
  })

  increment() {
    // עדכון — לא this.count = 1 !
    this.count.update(c => c + 1)
    // או: this.count.set(5) — ערך ישיר
  }

  reset() {
    this.count.set(0)
  }
}`,
      },
      { type: 'heading', text: 'Signals עם Objects ו-Arrays' },
      {
        type: 'code',
        lang: 'typescript',
        caption: 'ניהול state מורכב עם Signals',
        code: `import { Component, signal, computed } from '@angular/core'

interface Note { id: number; content: string; done: boolean }

@Component({
  standalone: true,
  template: \`
    <p>הערות: {{ notes().length }} | פעילות: {{ activeCount() }}</p>
    @for (note of notes(); track note.id) {
      <div>
        <span [class.done]="note.done">{{ note.content }}</span>
        <button (click)="toggle(note.id)">✓</button>
      </div>
    }
  \`,
})
export class NotesComponent {
  notes = signal<Note[]>([])
  activeCount = computed(() => this.notes().filter(n => !n.done).length)

  addNote(content: string) {
    this.notes.update(notes => [
      ...notes,
      { id: Date.now(), content, done: false },
    ])
  }

  toggle(id: number) {
    this.notes.update(notes =>
      notes.map(n => n.id === id ? { ...n, done: !n.done } : n)
    )
  }
}`,
      },
      { type: 'heading', text: 'toSignal — RxJS ↔ Signals' },
      {
        type: 'code',
        lang: 'typescript',
        caption: 'toSignal ו-toObservable — גשר בין עולמות',
        code: `import { Component, inject, signal, computed } from '@angular/core'
import { toSignal, toObservable } from '@angular/core/rxjs-interop'
import { HttpClient } from '@angular/common/http'
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs'
import { NotesService } from './notes.service'

@Component({
  standalone: true,
  template: \`
    <input [value]="query()" (input)="query.set($any($event.target).value)">
    @if (results.isLoading()) { <p>טוען...</p> }
    @for (item of results.value() ?? []; track item.id) {
      <p>{{ item.name }}</p>
    }
  \`,
})
export class SearchComponent {
  private http = inject(HttpClient)

  query = signal('')

  // Signal → Observable → חזרה ל-Signal: search pipe
  results = toSignal(
    toObservable(this.query).pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(q => this.http.get<any[]>(\`/api/search?q=\${q}\`)),
    ),
    { initialValue: [] },
  )
}`,
      },
      {
        type: 'code',
        lang: 'typescript',
        caption: 'input() ו-output() — Signal-based component API (Angular 17.1+)',
        code: `import { Component, input, output, computed } from '@angular/core'

@Component({
  selector: 'app-note-card',
  standalone: true,
  template: \`
    <div [class.premium]="isPremium()">
      <p>{{ note().content }}</p>
      <button (click)="deleted.emit(note().id)">מחק</button>
    </div>
  \`,
})
export class NoteCardComponent {
  // Signal-based inputs — Angular 17.1
  note = input.required<{ id: number; content: string }>()
  userType = input<'regular' | 'premium'>('regular')

  // computed מ-input
  isPremium = computed(() => this.userType() === 'premium')

  // Signal-based output
  deleted = output<number>()
}`,
      },
      {
        type: 'tip',
        text: 'Signals לא מחליפים RxJS לכל דבר. RxJS מצוין לזרמי events מורכבים (debounce, retry, zip). Signals מצוין לstate management. toSignal/toObservable מחבר בין שניהם.',
      },
    ],
    questionBank: [
      {
        id: 'angular-signals-q1',
        text: 'איך קוראים לערך של signal?',
        options: [
          'signal.value',
          'signal() — קריאה כפונקציה',
          'signal.get()',
          'await signal',
        ],
        correct: 1,
        explanation: 'signal הוא getter function — count() מחזיר את הערך הנוכחי וגם רושם תלות ב-computed/effect שרץ. זה מה שמאפשר ל-Angular לעקוב אחרי שינויים.',
      },
      {
        id: 'angular-signals-q2',
        text: 'מה ההבדל בין signal.set() ל-signal.update()?',
        options: [
          'אין הבדל',
          'set() מקבל ערך חדש ישיר; update() מקבל פונקציה (prev => next) — שימושי כשהערך החדש תלוי בישן',
          'update() מהיר יותר',
          'set() עובד רק עם primitives',
        ],
        correct: 1,
        explanation: 'count.set(5) — ערך קבוע. count.update(c => c + 1) — מחשב מהערך הקיים. update מבטיח שתמיד עובדים עם הערך העדכני ביותר.',
      },
      {
        id: 'angular-signals-q3',
        text: 'מה computed() עושה?',
        options: [
          'מחשב ערך פעם אחת בלבד',
          'יוצר signal שנגזר מ-signals אחרים — מחושב מחדש רק כש-dependency השתנה, עם caching',
          'מריץ side effects',
          'עוטף Observable כ-signal',
        ],
        correct: 1,
        explanation: 'computed = memo שמוכר dependencies אוטומטית. doubled = computed(() => count() * 2) — ירוץ מחדש רק כש-count משתנה, לא בכל render.',
      },
      {
        id: 'angular-signals-q4',
        text: 'מה toSignal עושה?',
        options: [
          'הופך signal ל-Observable',
          'עוטף Observable ו-Promise כ-signal — Angular subscribes ועושה unsubscribe אוטומטי',
          'יוצר two-way binding',
          'ממיר BehaviorSubject ל-computed',
        ],
        correct: 1,
        explanation: 'toSignal(observable$) = Angular subscribes ל-Observable, מעדכן signal בכל value, ועושה unsubscribe כשה-component נהרס. לא צריך async pipe.',
      },
      {
        id: 'angular-signals-q5',
        text: 'מה היתרון הביצועי של Signals על Zone.js?',
        options: [
          'Signals מהיר יותר כי כתוב ב-Rust',
          'Zone.js בודק כל ה-component tree אחרי async event; Signals מעדכן רק components שה-signal שלהם השתנה',
          'Signals לא עושה re-render',
          'Zone.js לא עובד ב-SSR',
        ],
        correct: 1,
        explanation: 'Zone.js = dirty checking על כל העץ. Signals = push-based, רק צרכנים ישירים מקבלים הודעה. באפליקציה גדולה ההבדל משמעותי — פחות re-renders מיותרים.',
      },
    ],
  },
]
