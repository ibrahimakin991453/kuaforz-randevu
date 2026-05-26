# Kuaför Randevu Sistemi — İş Planı

## TL;DR

> **Quick Summary**: Node.js + Express + Firebase Firestore backend ve React (Vite) + Tailwind dark UI frontend ile modern kuaför randevu sistemi. Ziyaretçiler isim+telefon ile randevu alır, admin şifre ile giriş yaparak randevuları/s Cone/personeli yönetir.
> 
> **Deliverables**:
> - Express REST API (Firebase Admin SDK ile Firestore işlemleri)
> - React SPA (Vite + Tailwind dark theme)
> - Admin paneli (/admin rotası, şifre ile giriş)
> - Randevu booking flow (hizmet → personel → tarih → saat → form)
> - 30 dakikalık sabit slot sistemi
> - Firebase proje kurulumu + Firestore indexes + security rules
> 
> **Estimated Effort**: Medium
> **Parallel Execution**: YES - 4 waves
> **Critical Path**: Task 1 → Task 5 → Task 11 → Task 15 → Task 21 → Task 23

---

## Context

### Original Request
Kuaför randevu sistemi projesi: Node.js, Express, Firebase (Auth & Firestore) teknolojileri ile modern, minimalist, koyu temalı bir uygulama. Kullanıcılar randevu talep eder ve durumunu takip eder. Admin şifre (1234) ile giriş yapar, randevuları onaylar/iptal eder, personel ve hizmet bilgilerini düzenler.

### Interview Summary
**Key Discussions**:
- Frontend: React (Vite) — tek app, /admin rotası ile admin paneli
- Proje kapsamı: Prototip/MVP (production gereksinimleri yok)
- Kullanıcı auth: Ziyaretçi (giriş yok, isim + telefon)
- Admin auth: Basit şifre (1234), Firebase Auth değil
- Randevu slotları: Sabit 30 dk, personel müsaitliğine göre
- Firebase: Sıfırdan başlangıç
- Test: Sadece QA senaryoları, unit test yok

**Research Findings**:
- Express layered architecture: routes → controllers → services → repositories
- Firestore transaction pattern with slot locking for concurrent booking prevention
- Singleton Firebase Admin SDK init with `admin.apps.length` check
- Tailwind CSS `darkMode: 'class'` for manual dark theme toggle
- React Router v6 ProtectedRoute component for /admin
- react-hook-form + Zod for booking form validation
- Denormalized appointment docs (staffName, serviceName, servicePrice in appointments)
- Composite indexes needed for date+staff, status+date, customerPhone+createdAt queries

### Metis Review
Skipped per user request — manual review preferred.

---

## Work Objectives

### Core Objective
Modern, minimalist, dark-themed kuaför randevu sistemi. Ziyaretçiler isim+telefon ile 30 dk slotlarda randevu alır; admin şifre ile girip randevuları/s Cone/personeli yönetir.

### Concrete Deliverables
- `server.js` / `src/` — Express REST API
- `client/` — React (Vite) SPA
- Firebase Firestore collection structure + indexes + security rules
- Admin login page + dashboard
- Booking flow (hizmet → personel → tarih → saat → form → onay)
- Appointment tracking page (telefon numarası ile sorgulama)

### Definition of Done
- [ ] `npm run dev` hem backend hem frontend başlatır (concurrently)
- [ ] Ziyaretçi sıfırdan randevu oluşturabilir
- [ ] Admin şifre ile giriş yapıp randevuları onaylayabilir/iptal edebilir
- [ ] Admin personel ve hizmet ekleyip düzenleyebilir
- [ ] Dark theme tüm sayfalarda tutarlı çalışır
- [ ] Mobil responsive

### Must Have
- Express REST API with Firebase Admin SDK
- React Vite SPA with Tailwind dark theme
- Admin password login (not Firebase Auth)
- Visitor booking without authentication (name + phone)
- 30-minute fixed slot system
- Firestore transactions for slot booking concurrency
- Admin CRUD for staff, services, appointments
- Appointment status flow: pending → confirmed → completed/cancelled
- Mobile responsive design

### Must NOT Have (Guardrails)
- NO Firebase Authentication for visitors
- NO payment/billing system
- NO SMS notification
- NO multi-branch support
- NO production deployment configuration
- NO unit tests (QA scenarios only)
- NO excessive comments or over-abstraction
- NO generic variable names (data, result, item, temp)
- NO commented-out code in deliverables

---

## Verification Strategy (MANDATORY)

### Test Decision
- **Infrastructure exists**: NO (sıfırdan proje)
- **Automated tests**: None (user preference)
- **Framework**: N/A
- **QA Policy**: Agent-executed QA scenarios only

### QA Policy
Every task MUST include agent-executed QA scenarios.
Evidence saved to `.omo/evidence/task-{N}-{scenario-slug}.{ext}`.

- **Frontend/UI**: Use Playwright — Navigate, interact, assert DOM, screenshot
- **API/Backend**: Use Bash (curl) — Send requests, assert status + response fields
- **Full Integration**: Use Playwright — End-to-end booking flow, admin operations

---

## Execution Strategy

### Parallel Execution Waves

```
Wave 1 (Start Immediately — foundation + scaffolding):
├── 1. Project scaffolding + monorepo setup [quick]
├── 2. Firebase project config + Firestore indexes + security rules [quick]
├── 3. Express server core (server.ts, app.ts, middleware, error handler) [quick]
├── 4. React Vite scaffolding (Tailwind, Router, folder structure) [quick]
├── 5. Firebase SDK setup (Admin + Client configs) [quick]
├── 6. Shared type definitions + Zod schemas [quick]
└── 7. Dark theme tokens + base layout + navigation [visual-engineering]

Wave 2 (After Wave 1 — core backend + core frontend):
├── 8. Admin auth middleware + login endpoint [quick]
├── 9. Staff CRUD API (routes, controller, service) [quick]
├── 10. Services CRUD API (routes, controller, service) [quick]
├── 11. Availability + slot generation service [deep]
├── 12. Admin login page (React) [quick]
├── 13. Admin dashboard layout + appointment list [visual-engineering]
└── 14. Booking page — service + staff selection steps [visual-engineering]

Wave 3 (After Wave 2 — integration + features):
├── 15. Appointment creation API (Firestore transaction) [deep]
├── 16. Appointment status management API (confirm/cancel/complete) [quick]
├── 17. Staff management page (React admin) [unspecified-high]
├── 18. Services management page (React admin) [unspecified-high]
├── 19. Slot picker + date selection (React booking) [visual-engineering]
└── 20. Booking form + validation (React) [unspecified-high]

Wave 4 (After Wave 3 — polish + real-time + docs):
├── 21. Real-time appointment updates (onSnapshot admin dashboard) [unspecified-high]
├── 22. Appointment tracking page (visitor lookup by phone) [unspecified-high]
├── 23. Responsive design polish + final dark UI treatment [visual-engineering]
└── 24. README.md + .env.example + project documentation [writing]

Wave FINAL (After ALL tasks — 4 parallel reviews):
├── F1. Plan compliance audit (oracle)
├── F2. Code quality review (unspecified-high)
├── F3. Real manual QA (unspecified-high)
└── F4. Scope fidelity check (deep)
→ Present results → Get explicit user okay

Critical Path: Task 1 → Task 5 → Task 11 → Task 15 → Task 21 → Task 23
Parallel Speedup: ~60% faster than sequential
Max Concurrent: 7 (Wave 1)
```

### Dependency Matrix

| Task | Depends On | Blocks |
|------|-----------|--------|
| 1 | — | 2, 3, 4, 5, 6, 7 |
| 2 | 1 | 9, 10, 11, 15, 16 |
| 3 | 1 | 8, 9, 10, 15, 16 |
| 4 | 1 | 12, 13, 14, 17, 18, 19, 20 |
| 5 | 1 | 11, 15, 21 |
| 6 | 1 | 9, 10, 15, 20 |
| 7 | 4 | 12, 13, 14 |
| 8 | 3, 5 | 12 |
| 9 | 2, 3, 6 | 17 |
| 10 | 2, 3, 6 | 18 |
| 11 | 2, 5, 6 | 15, 19 |
| 12 | 4, 7, 8 | 13 |
| 13 | 12 | 21 |
| 14 | 4, 7 | 19 |
| 15 | 3, 5, 6, 11 | 20, 21 |
| 16 | 3, 6 | 21 |
| 17 | 9, 13 | — |
| 18 | 10, 13 | — |
| 19 | 11, 14 | 20 |
| 20 | 6, 15, 19 | — |
| 21 | 13, 15, 16 | 22 |
| 22 | 15, 21 | — |
| 23 | 21 | — |
| 24 | All | — |

### Agent Dispatch Summary

- **Wave 1**: 7 tasks — T1→`quick`, T2→`quick`, T3→`quick`, T4→`quick`, T5→`quick`, T6→`quick`, T7→`visual-engineering`
- **Wave 2**: 7 tasks — T8→`quick`, T9→`quick`, T10→`quick`, T11→`deep`, T12→`quick`, T13→`visual-engineering`, T14→`visual-engineering`
- **Wave 3**: 6 tasks — T15→`deep`, T16→`quick`, T17→`unspecified-high`, T18→`unspecified-high`, T19→`visual-engineering`, T20→`unspecified-high`
- **Wave 4**: 4 tasks — T21→`unspecified-high`, T22→`unspecified-high`, T23→`visual-engineering`, T24→`writing`
- **FINAL**: 4 tasks — F1→`oracle`, F2→`unspecified-high`, F3→`unspecified-high`, F4→`deep`

---

## TODOs

- [ ] 1. Project scaffolding + monorepo setup

  **What to do**:
  - Create project root `kuaforz-randevu/` with `package.json` (Node.js, scripts: `dev`, `dev:server`, `dev:client`, `build`)
  - Install backend dependencies: `express`, `firebase-admin`, `dotenv`, `cors`, `helmet`, `zod`, `concurrently`
  - Install dev dependencies: `typescript`, `ts-node`, `nodemon`, `@types/express`, `@types/cors`
  - Create `tsconfig.json` for backend (target ES2022, module NodeNext, outDir `dist/`)
  - Create `.env.example` with: `PORT=5000`, `FIREBASE_PROJECT_ID=`, `FIREBASE_CLIENT_EMAIL=`, `FIREBASE_PRIVATE_KEY=`, `ADMIN_PASSWORD_HASH=`
  - Create `.gitignore` (node_modules, dist, .env, serviceAccountKey.json)
  - Create `client/` subfolder placeholder (React Vite will be initialized in Task 4)
  - Configure `concurrently` in root `package.json` to run `dev:server` and `dev:client` together

  **Must NOT do**:
  - NO production deployment configs (Docker, CI/CD)
  - NO ESLint config yet (separate task if needed)
  - NO `serviceAccountKey.json` committed to git

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: Standard project scaffolding, well-defined structure
  - **Skills**: []
  - **Skills Evaluated but Omitted**:
    - `git-master`: Not needed, no git operations in this task

  **Parallelization**:
  - **Can Run In Parallel**: NO (blocks almost everything in Wave 2)
  - **Parallel Group**: Wave 1 (first task, no dependencies)
  - **Blocks**: 2, 3, 4, 5, 6, 7
  - **Blocked By**: None

  **References**:
  **Pattern References**:
  - Research findings: Express layered architecture pattern (routes → controllers → services → repositories)
  **External References**:
  - Firebase Admin SDK setup: `https://firebase.google.com/docs/admin/setup`
  **WHY Each Reference Matters**:
  - Layered architecture ensures clean separation of concerns from day one

  **Acceptance Criteria**:

  **QA Scenarios (MANDATORY)**:
  ```
  Scenario: Project structure validates
    Tool: Bash
    Steps:
      1. cd kuaforz-randevu && ls -la
      2. Verify package.json exists with "dev", "dev:server", "dev:client" scripts
      3. Verify .env.example exists with PORT, FIREBASE_PROJECT_ID, ADMIN_PASSWORD_HASH
      4. Verify .gitignore contains node_modules, dist, .env, serviceAccountKey.json
      5. npm install succeeds without errors
    Expected Result: All files exist, npm install exits 0
    Failure Indicators: Missing files, npm install errors
    Evidence: .omo/evidence/task-1-project-structure.txt

  Scenario: TypeScript config is valid
    Tool: Bash
    Steps:
      1. cd kuaforz-randevu && npx tsc --noEmit
      2. Verify no compilation errors (even with empty source)
    Expected Result: tsc exits 0 or with only "no files" warning
    Failure Indicators: Config syntax errors
    Evidence: .omo/evidence/task-1-tsconfig.txt
  ```

  **Commit**: YES (groups with Wave 1)
  - Message: `feat(setup): project scaffolding and configuration`
  - Files: `package.json`, `tsconfig.json`, `.env.example`, `.gitignore`

- [ ] 2. Firebase project config + Firestore indexes + security rules

  **What to do**:
  - Create `src/config/firebase.ts` — Firebase Admin SDK initialization with singleton pattern (`admin.apps.length` check)
  - Create `firestore.indexes.json` with composite indexes: appointments (date+staffId+startTime, staffId+date+startTime, status+date+createdAt, customerPhone+createdAt), staff (active+name), services (active+category+price)
  - Create `firestore.rules` with security rules: public read for staff/services, authenticated admin write, visitors can create appointments, timeSlotLocks internal only
  - Create `src/config/env.ts` — Environment variable validation using Zod schema (PORT, FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, FIREBASE_PRIVATE_KEY, ADMIN_PASSWORD_HASH)
  - Add `.env` template with placeholder values and comments

  **Must NOT do**:
  - NO actual Firebase project creation (user will do manually in Firebase Console)
  - NO `serviceAccountKey.json` file (use env vars)
  - NO Firebase Auth for visitors — only simple password for admin

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: Configuration files, well-defined schemas from research
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES (with Task 3, 4 after Task 1)
  - **Parallel Group**: Wave 1
  - **Blocks**: 9, 10, 11, 15, 16
  - **Blocked By**: 1

  **References**:
  **Pattern References**:
  - Research: Singleton Firebase Admin SDK init with `admin.apps.length` check
  - Research: Firestore composite indexes for appointment queries
  **External References**:
  - Firestore indexes: `https://firebase.google.com/docs/firestore/query-data/index-overview`
  **WHY Each Reference Matters**:
  - Singleton pattern prevents "default app already exists" error
  - Composite indexes required for multi-field queries to work without errors

  **Acceptance Criteria**:

  **QA Scenarios (MANDATORY)**:
  ```
  Scenario: Firebase config compiles
    Tool: Bash
    Steps:
      1. cd kuaforz-randevu && npx tsc --noEmit
      2. Verify src/config/firebase.ts and src/config/env.ts compile without errors
    Expected Result: TypeScript compilation succeeds
    Failure Indicators: Type errors in config files
    Evidence: .omo/evidence/task-2-firebase-config.txt

  Scenario: Firestore indexes JSON is valid
    Tool: Bash
    Steps:
      1. cd kuaforz-randevu && node -e "JSON.parse(require('fs').readFileSync('firestore.indexes.json','utf8')); console.log('valid')"
      2. Verify output contains "valid"
    Expected Result: "valid" printed to stdout
    Failure Indicators: JSON parse error
    Evidence: .omo/evidence/task-2-firestore-indexes.txt

  Scenario: Security rules syntax is valid
    Tool: Bash
    Steps:
      1. Verify firestore.rules exists and contains match blocks for staff, services, appointments, timeSlotLocks
      2. Verify visitors can create appointments (allow create: if true for appointments collection)
      3. Verify admin-only write rules exist for staff and services
    Expected Result: Rules file has all required collections with appropriate permissions
    Failure Indicators: Missing collections or wrong permission structure
    Evidence: .omo/evidence/task-2-security-rules.txt
  ```

  **Commit**: YES (groups with Wave 1)
  - Message: `feat(setup): project scaffolding and configuration`
  - Files: `src/config/firebase.ts`, `src/config/env.ts`, `firestore.indexes.json`, `firestore.rules`

- [ ] 3. Express server core (server.ts, app.ts, middleware, error handler)

  **What to do**:
  - Create `src/app.ts` — Express app setup (helmet, cors, compression, morgan, express.json, rate limiter)
  - Create `src/server.ts` — Entry point with `app.listen()` and graceful shutdown
  - Create `src/middleware/errorHandler.ts` — Global error handler with custom AppError, NotFoundError classes
  - Create `src/middleware/rateLimiter.ts` — Basic rate limiting (100 req/15min)
  - Create `src/utils/errors.ts` — Custom error classes (AppError extends Error, NotFoundError, ForbiddenError, UnauthorizedError)
  - Create `src/utils/logger.ts` — Simple console logger (no Winston for MVP)
  - Create `src/routes/index.ts` — Route aggregator placeholder (import routes from v1/)
  - Create `src/routes/v1/` — Empty directory with placeholder for appointments, services, staff, availability, admin routes
  - Add health check endpoint: `GET /api/v1/health` returns `{ status: "ok", timestamp }`

  **Must NOT do**:
  - NO Winston or external logger (console.log wrapper is enough for MVP)
  - NO authentication middleware yet (Task 8)
  - NO route handlers yet (just route structure)

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: Standard Express boilerplate from research
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES (with Task 2, 4, 5, 6 after Task 1)
  - **Parallel Group**: Wave 1
  - **Blocks**: 8, 9, 10, 15, 16
  - **Blocked By**: 1

  **References**:
  **Pattern References**:
  - Research: Express layered architecture (routes → controllers → services → repositories)
  - Research: Centralized error handler middleware with custom error classes
  **WHY Each Reference Matters**:
  - Layered architecture ensures clean separation; error handler pattern prevents unhandled rejections

  **Acceptance Criteria**:

  **QA Scenarios (MANDATORY)**:
  ```
  Scenario: Express server starts and responds to health check
    Tool: Bash (curl)
    Steps:
      1. cd kuaforz-randevu && npm run dev:server
      2. Wait for "Server running on port 5000"
      3. curl http://localhost:5000/api/v1/health
    Expected Result: JSON response {"status":"ok","timestamp":"..."}
    Failure Indicators: Server fails to start, 404, or non-JSON response
    Evidence: .omo/evidence/task-3-health-check.txt

  Scenario: Error handler works for unknown routes
    Tool: Bash (curl)
    Steps:
      1. With server running from previous scenario
      2. curl http://localhost:5000/api/v1/nonexistent
    Expected Result: JSON response {"error":{"message":"Not found"}} with status 404
    Failure Indicators: HTML error page, stack trace in response, or 500 error
    Evidence: .omo/evidence/task-3-error-handler.txt
  ```

  **Commit**: YES (groups with Wave 1)
  - Message: `feat(setup): project scaffolding and configuration`
  - Files: `src/app.ts`, `src/server.ts`, `src/middleware/*.ts`, `src/utils/*.ts`, `src/routes/index.ts`

- [ ] 4. React Vite scaffolding (Tailwind, Router, folder structure)

  **What to do**:
  - Initialize Vite + React + TypeScript in `client/` subfolder (`npm create vite@latest client -- --template react-ts`)
  - Install: `tailwindcss`, `@tailwindcss/vite`, `react-router-dom`, `zod`, `react-hook-form`, `@hookform/resolvers`, `date-fns`, `firebase` (client SDK)
  - Configure Tailwind with `darkMode: 'class'` in `tailwind.config.ts` with custom dark palette (dark-900/800/700)
  - Create `client/src/lib/firebase.ts` — Firebase client SDK config (placeholder with env vars)
  - Create folder structure: `client/src/pages/` (Home, Booking, AppointmentTracker, admin/Dashboard, admin/Login, admin/Staff, admin/Services), `client/src/components/` (ui/, booking/, admin/), `client/src/hooks/`, `client/src/schemas/`, `client/src/types/`, `client/src/styles/`
  - Create `client/src/App.tsx` with React Router setup: public routes (`/`, `/booking`, `/track`) and protected `/admin/*` routes
  - Create placeholder components for each route (just return div with page name)

  **Must NOT do**:
  - NO actual Firebase project connection (placeholder config only)
  - NO UI components yet (just folder structure + routing)
  - NO admin auth check yet (Task 8, 12)

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: Standard Vite + React scaffolding
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES (with Task 2, 3, 5, 6 after Task 1)
  - **Parallel Group**: Wave 1
  - **Blocks**: 7, 12, 13, 14, 17, 18, 19, 20
  - **Blocked By**: 1

  **References**:
  **Pattern References**:
  - Research: React Router v6 ProtectedRoute component pattern
  - Research: Tailwind dark mode config with class toggle
  **External References**:
  - Vite setup: `https://vitejs.dev/guide/`
  **WHY Each Reference Matters**:
  - ProtectedRoute pattern is core to admin auth; dark theme is a must-have requirement

  **Acceptance Criteria**:

  **QA Scenarios (MANDATORY)**:
  ```
  Scenario: React app compiles and renders
    Tool: Bash
    Steps:
      1. cd kuaforz-randevu/client && npm run dev
      2. Wait for Vite dev server to start
      3. curl http://localhost:5173 | grep "root"
    Expected Result: HTML response with root div, Vite dev server running
    Failure Indicators: Compilation errors, missing dependencies
    Evidence: .omo/evidence/task-4-vite-startup.txt

  Scenario: Routing works for all defined routes
    Tool: Playwright
    Steps:
      1. Navigate to http://localhost:5173/
      2. Verify home page placeholder renders
      3. Navigate to http://localhost:5173/booking
      4. Verify booking page placeholder renders
      5. Navigate to http://localhost:5173/admin
      6. Verify redirect to login or admin placeholder renders
    Expected Result: Each route renders its placeholder component
    Failure Indicators: 404, blank page, or routing errors
    Evidence: .omo/evidence/task-4-routing.png
  ```

  **Commit**: YES (groups with Wave 1)
  - Message: `feat(setup): project scaffolding and configuration`
  - Files: `client/` (entire Vite scaffold)

- [ ] 5. Firebase SDK setup (Admin + Client configs)

  **What to do**:
  - Create `src/config/firebase.ts` — Firebase Admin SDK initialization with singleton pattern
    - Use `admin.apps.length` check before `initializeApp()`
    - Support both service account key (dev) and application default credentials (prod)
    - Export `db` (Firestore), `admin` instances
  - Create `client/src/lib/firebase.ts` — Firebase Client SDK initialization
    - Initialize with config from environment variables (VITE_FIREBASE_*)
    - Export `db` (Firestore client instance)
  - Create `src/services/firebase.service.ts` — Base Firestore utility functions (getCollection, getDocument, addDocument, updateDocument, deleteDocument)
  - Add `.env.example` entries for Firebase client config (VITE_FIREBASE_API_KEY, VITE_FIREBASE_AUTH_DOMAIN, VITE_FIREBASE_PROJECT_ID, VITE_FIREBASE_STORAGE_BUCKET, VITE_FIREBASE_MESSAGING_SENDER_ID, VITE_FIREBASE_APP_ID)

  **Must NOT do**:
  - NO actual Firebase credentials in code (env vars only)
  - NO service account key file committed
  - NO Firebase Auth setup (admin auth is simple password)

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: Standard Firebase SDK setup from research
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES (with Task 2, 3, 4 after Task 1)
  - **Parallel Group**: Wave 1
  - **Blocks**: 11, 15, 21
  - **Blocked By**: 1

  **References**:
  **Pattern References**:
  - Research: Singleton Firebase Admin SDK init with `admin.apps.length` check
  - Research: Environment-based config: ADC in production, service account in dev
  **External References**:
  - Firebase Admin SDK setup: `https://firebase.google.com/docs/admin/setup`
  **WHY Each Reference Matters**:
  - Singleton pattern prevents "default app already exists" error on hot reload

  **Acceptance Criteria**:

  **QA Scenarios (MANDATORY)**:
  ```
  Scenario: Firebase Admin SDK config compiles
    Tool: Bash
    Steps:
      1. cd kuaforz-randevu && npx tsc --noEmit
      2. Verify src/config/firebase.ts compiles without errors
    Expected Result: TypeScript compilation succeeds
    Failure Indicators: Type errors, missing imports
    Evidence: .omo/evidence/task-5-admin-sdk.txt

  Scenario: Firebase Client SDK config compiles
    Tool: Bash
    Steps:
      1. cd kuaforz-randevu/client && npx tsc --noEmit
      2. Verify src/lib/firebase.ts compiles without errors
    Expected Result: TypeScript compilation succeeds
    Failure Indicators: Type errors, missing firebase imports
    Evidence: .omo/evidence/task-5-client-sdk.txt

  Scenario: .env.example contains all required Firebase vars
    Tool: Bash
    Steps:
      1. Check root .env.example contains: FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, FIREBASE_PRIVATE_KEY, ADMIN_PASSWORD_HASH
      2. Check client/.env.example contains: VITE_FIREBASE_API_KEY, VITE_FIREBASE_PROJECT_ID, VITE_FIREBASE_APP_ID
    Expected Result: All required env vars listed in both .env.example files
    Failure Indicators: Missing env vars
    Evidence: .omo/evidence/task-5-env-vars.txt
  ```

  **Commit**: YES (groups with Wave 1)
  - Message: `feat(setup): project scaffolding and configuration`
  - Files: `src/config/firebase.ts`, `client/src/lib/firebase.ts`, `src/services/firebase.service.ts`, `.env.example`

- [ ] 6. Shared type definitions + Zod schemas

  **What to do**:
  - Create `src/types/index.ts` — Shared TypeScript types:
    - `Staff`: id, name, specialties (string[]), workingHours (DailyHours map), active (boolean), createdAt
    - `Service`: id, name, duration (number, minutes), price (number), category (string), active (boolean)
    - `Appointment`: id, staffId, staffName, serviceId, serviceName, customerName, customerPhone, date (string YYYY-MM-DD), startTime (string HH:mm), endTime (string HH:mm), status ('pending'|'confirmed'|'cancelled'|'completed'), notes (optional), createdAt, updatedAt
    - `TimeSlot`: startTime, endTime, isAvailable
    - `DailyHours`: open (string), close (string), isWorkingDay (boolean)
    - `AdminSettings`: adminPasswordHash
  - Create `src/schemas/appointment.schema.ts` — Zod validation schemas:
    - `createAppointmentSchema`: customerName (min 2), customerPhone (regex for phone), serviceId, staffId, date, startTime
    - `updateAppointmentStatusSchema`: status (enum), optional reason
  - Create `src/schemas/staff.schema.ts` — Zod schemas for CRUD: createStaffSchema, updateStaffSchema
  - Create `src/schemas/service.schema.ts` — Zod schemas for CRUD: createServiceSchema, updateServiceSchema
  - Create `client/src/schemas/booking.schema.ts` — React-side booking form validation (same fields as createAppointmentSchema but for form)
  - Create `src/types/api.ts` — API response types: `ApiResponse<T>`, `PaginatedResponse<T>`, `ErrorResponse`

  **Must NOT do**:
  - NO business logic in schemas (validation only)
  - NO Firebase-specific types in shared types (keep framework-agnostic)
  - NO excessive validation (keep MVP-friendly — e.g., phone regex should accept Turkish format)

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: Type definitions are well-defined from research, mechanical work
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES (with Task 2, 3, 4, 5 after Task 1)
  - **Parallel Group**: Wave 1
  - **Blocks**: 9, 10, 15, 20
  - **Blocked By**: 1

  **References**:
  **Pattern References**:
  - Research: Denormalized appointment doc (staffName, serviceName, servicePrice in appointments)
  - Research: Appointment status flow: pending → confirmed → completed/cancelled
  **WHY Each Reference Matters**:
  - Denormalization decision affects type definitions — staffName etc. must be in Appointment type

  **Acceptance Criteria**:

  **QA Scenarios (MANDATORY)**:
  ```
  Scenario: Types compile without errors
    Tool: Bash
    Steps:
      1. cd kuaforz-randevu && npx tsc --noEmit
      2. cd kuaforz-randevu/client && npx tsc --noEmit
    Expected Result: Both compilations succeed without type errors
    Failure Indicators: Missing imports, type conflicts
    Evidence: .omo/evidence/task-6-types-compile.txt

  Scenario: Zod schemas validate correctly
    Tool: Bash
    Steps:
      1. Create a temp test script that imports schemas and tests:
         - createAppointmentSchema.parse({customerName:"Ahmet",customerPhone:"+905551234567",serviceId:"s1",staffId:"st1",date:"2026-06-01",startTime:"10:00"}) → pass
         - createAppointmentSchema.parse({customerName:"",customerPhone:"abc"}) → fail
      2. Run the script and verify pass/fail results
    Expected Result: Valid data passes, invalid data fails with clear error messages
    Failure Indicators: Schema accepts invalid data or rejects valid data
    Evidence: .omo/evidence/task-6-zod-validation.txt
  ```

  **Commit**: YES (groups with Wave 1)
  - Message: `feat(setup): project scaffolding and configuration`
  - Files: `src/types/index.ts`, `src/types/api.ts`, `src/schemas/*.ts`, `client/src/schemas/booking.schema.ts`

- [ ] 7. Dark theme tokens + base layout + navigation

  **What to do**:
  - Configure Tailwind dark theme in `client/tailwind.config.ts`:
    - `darkMode: 'class'` for manual toggle
    - Custom color palette: dark-900 (#0a0a0a), dark-800 (#171717), dark-700 (#262626), accent/brand colors for CTAs
    - Custom fonts if needed (Inter or system fonts)
  - Create `client/src/styles/globals.css` — Tailwind imports + dark theme base styles
  - Create `client/src/components/ui/Layout.tsx` — Main layout component with:
    - Dark background (dark-900), light text
    - Responsive header with navigation links (Randevu Al, Randevu Takip, Admin Giriş)
    - Footer placeholder
  - Create `client/src/components/ui/ThemeProvider.tsx` — Dark mode toggle (default: dark, persists in localStorage)
  - Create `client/src/hooks/useDarkMode.ts` — Custom hook for dark mode state management
  - Apply Layout to all routes in `client/src/App.tsx`

  **Must NOT do**:
  - NO light theme implementation (MVP is dark-only, toggle is bonus)
  - NO complex animations or transitions (keep minimal for MVP)
  - NO external UI library yet (shadcn/ui will be added per-component if needed)

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
    - Reason: UI/ux styling and layout design, visual presentation focused
  - **Skills**: [`/frontend-ui-ux`]
    - `/frontend-ui-ux`: Dark theme design, layout composition, responsive breakpoints

  **Parallelization**:
  - **Can Run In Parallel**: YES (with Task 2, 3, 5, 6 after Task 1, depends on Task 4 for React scaffold)
  - **Parallel Group**: Wave 1
  - **Blocks**: 12, 13, 14
  - **Blocked By**: 4

  **References**:
  **Pattern References**:
  - Research: Tailwind `darkMode: 'class'` with manual toggle
  - Research: Dark form input patterns with `dark:` variants
  **WHY Each Reference Matters**:
  - The class-based toggle is critical for MVP since dark is the primary theme

  **Acceptance Criteria**:

  **QA Scenarios (MANDATORY)**:
  ```
  Scenario: Dark theme renders correctly
    Tool: Playwright
    Steps:
      1. Navigate to http://localhost:5173/
      2. Verify body background is dark (#0a0a0a or near-black)
      3. Verify text color is light (white or near-white)
      4. Take screenshot
    Expected Result: Dark background, light text, modern minimalist feel
    Failure Indicators: White background, hard-to-read text, broken layout
    Evidence: .omo/evidence/task-7-dark-theme.png

  Scenario: Navigation links work
    Tool: Playwright
    Steps:
      1. Navigate to http://localhost:5173/
      2. Click "Randevu Al" link → verify URL changes to /booking
      3. Click "Randevu Takip" link → verify URL changes to /track
      4. Click "Admin Giriş" link → verify URL changes to /admin/login
      5. Verify all pages have dark theme
    Expected Result: Navigation works, dark theme consistent
    Failure Indicators: 404 errors, white flash on navigation
    Evidence: .omo/evidence/task-7-navigation.png

  Scenario: Mobile responsive layout
    Tool: Playwright
    Steps:
      1. Set viewport to 375x667 (iPhone)
      2. Navigate to http://localhost:5173/
      3. Verify navigation becomes hamburger menu or stacked
      4. Verify content is readable without horizontal scroll
    Expected Result: Layout adapts to mobile, no horizontal scroll
    Failure Indicators: Broken layout, tiny text, overflow
    Evidence: .omo/evidence/task-7-mobile-responsive.png
  ```

  **Commit**: YES (groups with Wave 1)
  - Message: `feat(setup): project scaffolding and configuration`
  - Files: `client/tailwind.config.ts`, `client/src/styles/globals.css`, `client/src/components/ui/Layout.tsx`, `client/src/components/ui/ThemeProvider.tsx`, `client/src/hooks/useDarkMode.ts`

- [ ] 8. Admin auth middleware + login endpoint

  **What to do**:
  - Create `src/middleware/adminAuth.ts` — Admin authentication middleware:
    - Password verification using SHA-256 hash comparison against ADMIN_PASSWORD_HASH env var
    - JWT token generation on successful login (using jsonwebtoken or simple signed token)
    - Token verification middleware for protected routes
    - Helper `hashPassword()` function for initial setup
  - Create `src/routes/v1/admin.ts` — Admin routes:
    - `POST /api/v1/admin/login` — Accepts `{ password }`, returns `{ success, token }` or 401
    - `GET /api/v1/admin/verify` — Verifies token, returns `{ valid: true }` or 401
  - Create `src/controllers/admin.controller.ts` — Login and verify handlers
  - Create `src/services/admin.service.ts` — Password comparison logic
  - Add `jsonwebtoken` dependency to package.json
  - Add `JWT_SECRET` to `.env.example`

  **Must NOT do**:
  - NO Firebase Auth for admin (simple password + JWT only)
  - NO rate limiting on login yet (can add if needed later)
  - NO password reset flow (MVP)

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: Standard auth middleware pattern, well-defined
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES (with Task 9, 10, 11 after their dependencies)
  - **Parallel Group**: Wave 2
  - **Blocks**: 12
  - **Blocked By**: 3, 5

  **References**:
  **Pattern References**:
  - Research: Simple password auth for admin (SHA-256 hash)
  **WHY Each Reference Matters**:
  - Password auth is explicitly chosen over Firebase Auth for admin — implementation must match

  **Acceptance Criteria**:

  **QA Scenarios (MANDATORY)**:
  ```
  Scenario: Admin login with correct password
    Tool: Bash (curl)
    Steps:
      1. Generate hash for "1234": node -e "console.log(require('crypto').createHash('sha256').update('1234').digest('hex'))"
      2. Set ADMIN_PASSWORD_HASH and JWT_SECRET in .env
      3. Start server: npm run dev:server
      4. curl -X POST http://localhost:5000/api/v1/admin/login -H "Content-Type: application/json" -d '{"password":"1234"}'
    Expected Result: JSON response {"success":true,"token":"..."} with status 200
    Failure Indicators: 401, 500, or missing token
    Evidence: .omo/evidence/task-8-login-success.txt

  Scenario: Admin login with wrong password
    Tool: Bash (curl)
    Steps:
      1. With server running from previous scenario
      2. curl -X POST http://localhost:5000/api/v1/admin/login -H "Content-Type: application/json" -d '{"password":"wrong"}'
    Expected Result: JSON response {"success":false,"message":"Invalid password"} with status 401
    Failure Indicators: 200 response, or server error
    Evidence: .omo/evidence/task-8-login-fail.txt

  Scenario: Protected endpoint rejects missing token
    Tool: Bash (curl)
    Steps:
      1. With server running
      2. curl http://localhost:5000/api/v1/admin/verify
    Expected Result: 401 Unauthorized response
    Failure Indicators: 200 response or 500 error
    Evidence: .omo/evidence/task-8-protected-reject.txt
  ```

  **Commit**: YES (groups with Wave 2)
  - Message: `feat(api): admin auth, staff/services CRUD, slot generation`
  - Files: `src/middleware/adminAuth.ts`, `src/routes/v1/admin.ts`, `src/controllers/admin.controller.ts`, `src/services/admin.service.ts`

- [ ] 9. Staff CRUD API (routes, controller, service)

  **What to do**:
  - Create `src/routes/v1/staff.ts` — Staff routes (all protected by adminAuth):
    - `GET /api/v1/staff` — List all active staff (public, no auth)
    - `GET /api/v1/staff/:id` — Get single staff (public)
    - `POST /api/v1/staff` — Create staff (admin only)
    - `PUT /api/v1/staff/:id` — Update staff (admin only)
    - `DELETE /api/v1/staff/:id` — Soft-delete staff (admin only, sets active=false)
  - Create `src/controllers/staff.controller.ts` — HTTP handlers with Zod validation
  - Create `src/services/staff.service.ts` — Business logic:
    - `getAllStaff()` — Returns active staff
    - `getStaffById(id)` — Returns single staff
    - `createStaff(data)` — Validates with Zod, adds to Firestore
    - `updateStaff(id, data)` — Partial updates with Zod validation
    - `deactivateStaff(id)` — Sets active=false (soft delete)
  - Create `src/repositories/staff.repository.ts` — Firestore operations for staff collection

  **Must NOT do**:
  - NO hard delete (use soft delete with active flag)
  - NO staff avatar/upload (MVP)
  - NO password or Firebase Auth for staff (admin manages externally)

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: Standard CRUD, well-defined patterns
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES (with Task 10, 11, 12, 13, 14)
  - **Parallel Group**: Wave 2
  - **Blocks**: 17
  - **Blocked By**: 2, 3, 6

  **References**:
  **Pattern References**:
  - Research: Root collections for staff with workingHours subpattern
  - Research: Controller pattern — HTTP concerns (req/res parsing, status codes)
  **WHY Each Reference Matters**:
  - Soft delete pattern prevents data loss; controller separation keeps HTTP out of business logic

  **Acceptance Criteria**:

  **QA Scenarios (MANDATORY)**:
  ```
  Scenario: Create and list staff
    Tool: Bash (curl)
    Steps:
      1. Login as admin to get token: curl -X POST http://localhost:5000/api/v1/admin/login -d '{"password":"1234"}'
      2. Create staff: curl -X POST http://localhost:5000/api/v1/staff -H "Authorization: Bearer TOKEN" -H "Content-Type: application/json" -d '{"name":"Ahmet","specialties":["Saç Kesimi","Sakal"],"workingHours":{"mon":{"open":"09:00","close":"18:00","isWorkingDay":true}},"active":true}'
      3. List staff: curl http://localhost:5000/api/v1/staff
    Expected Result: Staff created with 201, list shows created staff with id
    Failure Indicators: 401, 500, or missing fields
    Evidence: .omo/evidence/task-9-staff-crud.txt

  Scenario: Unauthenticated staff creation rejected
    Tool: Bash (curl)
    Steps:
      1. curl -X POST http://localhost:5000/api/v1/staff -H "Content-Type: application/json" -d '{"name":"Test"}'
    Expected Result: 401 Unauthorized
    Failure Indicators: Staff created without auth, 500 error
    Evidence: .omo/evidence/task-9-staff-auth.txt

  Scenario: Soft delete staff
    Tool: Bash (curl)
    Steps:
      1. Delete staff: curl -X DELETE http://localhost:5000/api/v1/staff/{id} -H "Authorization: Bearer TOKEN"
      2. List staff: curl http://localhost:5000/api/v1/staff
    Expected Result: Deleted staff not in active list, GET by id returns active=false
    Failure Indicators: Staff permanently removed or still in active list
    Evidence: .omo/evidence/task-9-staff-soft-delete.txt
  ```

  **Commit**: YES (groups with Wave 2)
  - Message: `feat(api): admin auth, staff/services CRUD, slot generation`
  - Files: `src/routes/v1/staff.ts`, `src/controllers/staff.controller.ts`, `src/services/staff.service.ts`, `src/repositories/staff.repository.ts`

- [ ] 10. Services CRUD API (routes, controller, service)

  **What to do**:
  - Create `src/routes/v1/services.ts` — Service routes:
    - `GET /api/v1/services` — List all active services (public)
    - `GET /api/v1/services/:id` — Get single service (public)
    - `POST /api/v1/services` — Create service (admin only)
    - `PUT /api/v1/services/:id` — Update service (admin only)
    - `DELETE /api/v1/services/:id` — Soft-delete service (admin only, sets active=false)
  - Create `src/controllers/services.controller.ts` — HTTP handlers with Zod validation
  - Create `src/services/services.service.ts` — Business logic:
    - `getAllServices()` — Returns active services
    - `getServiceById(id)` — Returns single service
    - `createService(data)` — Validates with createServiceSchema, adds to Firestore
    - `updateService(id, data)` — Partial updates with updateServiceSchema
    - `deactivateService(id)` — Sets active=false
  - Create `src/repositories/services.repository.ts` — Firestore operations for services collection

  **Must NOT do**:
  - NO hard delete (use soft delete)
  - NO service image/upload (MVP)
  - NO service duration validation against business hours (keep simple)

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: Standard CRUD, mirrors Staff pattern
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES (with Task 9, 11, 12, 13, 14)
  - **Parallel Group**: Wave 2
  - **Blocks**: 18
  - **Blocked By**: 2, 3, 6

  **References**:
  **Pattern References**:
  - Same layered pattern as Task 9 (routes → controller → service → repository)
  **WHY Each Reference Matters**:
  - Consistency with staff CRUD — same pattern, different collection

  **Acceptance Criteria**:

  **QA Scenarios (MANDATORY)**:
  ```
  Scenario: Create and list services
    Tool: Bash (curl)
    Steps:
      1. Login as admin to get token
      2. Create service: curl -X POST http://localhost:5000/api/v1/services -H "Authorization: Bearer TOKEN" -H "Content-Type: application/json" -d '{"name":"Saç Kesimi","durationMinutes":30,"price":150,"category":"Kesim","active":true}'
      3. List services: curl http://localhost:5000/api/v1/services
    Expected Result: Service created with 201, list shows created service with id
    Failure Indicators: 401, 500, or missing fields
    Evidence: .omo/evidence/task-10-services-crud.txt

  Scenario: Unauthenticated service creation rejected
    Tool: Bash (curl)
    Steps:
      1. curl -X POST http://localhost:5000/api/v1/services -H "Content-Type: application/json" -d '{"name":"Test"}'
    Expected Result: 401 Unauthorized
    Failure Indicators: Service created without auth
    Evidence: .omo/evidence/task-10-services-auth.txt

  Scenario: Soft delete service
    Tool: Bash (curl)
    Steps:
      1. Delete service: curl -X DELETE http://localhost:5000/api/v1/services/{id} -H "Authorization: Bearer TOKEN"
      2. List services: curl http://localhost:5000/api/v1/services
    Expected Result: Deleted service not in active list
    Failure Indicators: Service permanently removed or still in active list
    Evidence: .omo/evidence/task-10-service-soft-delete.txt
  ```

  **Commit**: YES (groups with Wave 2)
  - Message: `feat(api): admin auth, staff/services CRUD, slot generation`
  - Files: `src/routes/v1/services.ts`, `src/controllers/services.controller.ts`, `src/services/services.service.ts`, `src/repositories/services.repository.ts`

- [ ] 11. Availability + slot generation service

  **What to do**:
  - Create `src/services/availability.service.ts` — Core slot generation logic:
    - `generateDaySlots(staffId, date)` — Generate 30-min slots based on staff workingHours
    - `getAvailableSlots(staffId, date)` — Returns available slots after subtracting booked appointments
    - `calculateEndTime(startTime, durationMinutes)` — Helper to compute slot end time
    - `isSlotWithinWorkingHours(startTime, endTime, workingHours)` — Validate slot against staff schedule
  - Create `src/routes/v1/availability.ts` — Availability routes (public):
    - `GET /api/v1/availability/:staffId?date=YYYY-MM-DD` — Returns available slots for staff on given date
    - `GET /api/v1/availability/:staffId/week?startDate=YYYY-MM-DD` — Returns slots for 7 days
  - Create `src/controllers/availability.controller.ts` — HTTP handlers
  - Create `src/repositories/appointments.repository.ts` — Query appointments by staffId+date range

  **Must NOT do**:
  - NO Firestore transactions yet (Task 15)
  - NO slot locking (no reservation system — just availability checking)
  - NO recurring schedule management (MVP: manual weekly hours per staff)

  **Recommended Agent Profile**:
  - **Category**: `deep`
    - Reason: Complex time-slot generation logic with working hours calculation, edge cases (past slots, breaks, overlap detection)
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES (with Task 8, 9, 10, 12, 13, 14)
  - **Parallel Group**: Wave 2
  - **Blocks**: 15, 19
  - **Blocked By**: 2, 5, 6

  **References**:
  **Pattern References**:
  - Research: Time slot calculation — generate from business hours, subtract booked appointments
  - Research: 30-minute fixed slot intervals, filtering past slots
  **WHY Each Reference Matters**:
  - Slot generation is the core algorithm — must handle edge cases like past time filtering and working hour boundaries

  **Acceptance Criteria**:

  **QA Scenarios (MANDATORY)**:
  ```
  Scenario: Get available slots for staff on a date
    Tool: Bash (curl)
    Steps:
      1. Create a staff member with working hours 09:00-18:00
      2. curl "http://localhost:5000/api/v1/availability/{staffId}?date=2099-12-25"
    Expected Result: JSON array of 30-min slots from 09:00 to 17:30, all isAvailable=true
    Failure Indicators: Empty array, wrong slot count, overlapping slots
    Evidence: .omo/evidence/task-11-slots-available.txt

  Scenario: Slots reflect booked appointments
    Tool: Bash (curl)
    Steps:
      1. Create staff with working hours
      2. Book an appointment at 10:00-10:30 (use direct Firestore insert or appointment creation if available)
      3. curl "http://localhost:5000/api/v1/availability/{staffId}?date=2099-12-25"
    Expected Result: 10:00 slot shows isAvailable=false, all others still available
    Failure Indicators: All slots available including 10:00, or wrong slots marked unavailable
    Evidence: .omo/evidence/task-11-slots-booked.txt

  Scenario: Past time slots are not available
    Tool: Bash (curl)
    Steps:
      1. Get availability for today's date
      2. Verify slots before current time show isAvailable=false
    Expected Result: Past slots marked as unavailable, future slots available
    Failure Indicators: Past slots shown as available
    Evidence: .omo/evidence/task-11-past-slots.txt
  ```

  **Commit**: YES (groups with Wave 2)
  - Message: `feat(api): admin auth, staff/services CRUD, slot generation`
  - Files: `src/services/availability.service.ts`, `src/routes/v1/availability.ts`, `src/controllers/availability.controller.ts`, `src/repositories/appointments.repository.ts`

- [ ] 12. Admin login page (React)

  **What to do**:
  - Create `client/src/pages/admin/LoginPage.tsx` — Admin login page:
    - Dark themed card centered on screen
    - Password input field with show/hide toggle
    - "Giriş Yap" (Login) button with loading state
    - Error message display for wrong password
    - Redirect to /admin/dashboard on success
    - Store JWT token in localStorage
  - Create `client/src/hooks/useAuth.ts` — Auth hook:
    - `login(password)` — Calls POST /api/v1/admin/login, stores token
    - `logout()` — Removes token, redirects to /admin/login
    - `isAuthenticated` — Boolean derived from token existence and validity
    - `getToken()` — Returns stored JWT token
  - Update `client/src/App.tsx` — Add ProtectedRoute component that checks isAuth, redirects to /admin/login if not authenticated

  **Must NOT do**:
  - NO "register" or "sign up" link (admin is pre-configured)
  - NO "forgot password" flow (MVP)
  - NO remember-me checkbox (keep simple)

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: Simple login form, well-defined auth flow
  - **Skills**: [`/frontend-ui-ux`]
    - `/frontend-ui-ux`: Dark themed form design, form state management

  **Parallelization**:
  - **Can Run In Parallel**: YES (with Task 13, 14)
  - **Parallel Group**: Wave 2
  - **Blocks**: 13
  - **Blocked By**: 4, 7, 8

  **References**:
  **Pattern References**:
  - Research: React Router v6 ProtectedRoute component pattern
  - Research: Login form with redirect-back pattern
  **WHY Each Reference Matters**:
  - ProtectedRoute is the gate for all admin routes; must be implemented correctly

  **Acceptance Criteria**:

  **QA Scenarios (MANDATORY)**:
  ```
  Scenario: Admin login page renders with dark theme
    Tool: Playwright
    Steps:
      1. Navigate to http://localhost:5173/admin/login
      2. Verify dark background (#0a0a0a or near-black)
      3. Verify password input is visible with placeholder "Şifre"
      4. Verify "Giriş Yap" button is visible
      5. Take screenshot
    Expected Result: Dark themed login page with password input and button
    Failure Indicators: Light theme, broken layout, missing elements
    Evidence: .omo/evidence/task-12-login-page.png

  Scenario: Admin login with correct password
    Tool: Playwright
    Steps:
      1. Navigate to http://localhost:5173/admin/login
      2. Type "1234" in password field
      3. Click "Giriş Yap" button
      4. Wait for redirect
      5. Verify URL changed to /admin (dashboard)
    Expected Result: Redirected to admin dashboard
    Failure Indicators: Stays on login page, error message, network error
    Evidence: .omo/evidence/task-12-login-success.png

  Scenario: Admin login with wrong password
    Tool: Playwright
    Steps:
      1. Navigate to http://localhost:5173/admin/login
      2. Type "wrongpass" in password field
      3. Click "Giriş Yap" button
      4. Verify error message appears saying password is incorrect
    Expected Result: Error message displayed, stays on login page
    Failure Indicators: Redirects despite wrong password, no error shown
    Evidence: .omo/evidence/task-12-login-error.png

  Scenario: Protected admin route redirects to login
    Tool: Playwright
    Steps:
      1. Clear localStorage (ensure no token)
      2. Navigate to http://localhost:5173/admin
      3. Verify redirect to /admin/login
    Expected Result: Redirected to login page
    Failure Indicators: Admin page renders without auth, blank page
    Evidence: .omo/evidence/task-12-protected-redirect.png
  ```

  **Commit**: YES (groups with Wave 2)
  - Message: `feat(api): admin auth, staff/services CRUD, slot generation`
  - Files: `client/src/pages/admin/LoginPage.tsx`, `client/src/hooks/useAuth.ts`, `client/src/App.tsx`

- [ ] 13. Admin dashboard layout + appointment list

  **What to do**:
  - Create `client/src/pages/admin/DashboardPage.tsx` — Admin dashboard:
    - Sidebar navigation (Randevular, Personel, Hizmetler, Çıkış)
    - Stats cards: total appointments today, pending count, confirmed count
    - Main content area defaults to appointment list
  - Create `client/src/pages/admin/AppointmentsPage.tsx` — Appointment management:
    - Tab filters: Tümü, Bekleyen, Onaylanan, İptal, Tamamlanan
    - Table/card list of appointments with: customerName, customerPhone, serviceName, staffName, date, time, status badge
    - Action buttons: Onayla (confirm), İptal Et (cancel), Tamamlandı (complete)
    - Status badges with color coding (pending=yellow, confirmed=green, cancelled=red, completed=blue)
  - Create `client/src/hooks/useFirestoreCollection.ts` — Real-time Firestore listener hook (onSnapshot pattern)
  - Wire up dashboard layout in React Router as parent route for /admin/*

  **Must NOT do**:
  - NO pagination yet (MVP: load all appointments)
  - NO appointment detail modal (inline actions only)
  - NO date range filter (MVP: filter by status tabs only)

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
    - Reason: Dashboard UI with sidebar, cards, tables — visual design heavy
  - **Skills**: [`/frontend-ui-ux`]
    - `/frontend-ui-ux`: Dashboard layout design, status badge styling, dark theme cards

  **Parallelization**:
  - **Can Run In Parallel**: YES (with Task 14)
  - **Parallel Group**: Wave 2
  - **Blocks**: 17, 18, 21
  - **Blocked By**: 12

  **References**:
  **Pattern References**:
  - Research: Firen't onSnapshot hook pattern for real-time data
  - Research: Dark UI table/card patterns from TailAdmin
  **WHY Each Reference Matters**:
  - Real-time updates are core requirement; dark dashboard styling must be consistent

  **Acceptance Criteria**:

  **QA Scenarios (MANDATORY)**:
  ```
  Scenario: Admin dashboard renders with sidebar and stats
    Tool: Playwright
    Steps:
      1. Login as admin (use valid credentials)
      2. Navigate to /admin
      3. Verify sidebar with navigation links: Randevular, Personel, Hizmetler, Çıkış
      4. Verify stats cards are visible (even with 0 values)
      5. Take screenshot
    Expected Result: Dark themed dashboard with sidebar and stats cards
    Failure Indicators: Missing sidebar, broken layout, light theme
    Evidence: .omo/evidence/task-13-dashboard.png

  Scenario: Appointment list with status filters
    Tool: Playwright
    Steps:
      1. On admin dashboard, navigate to Randevular
      2. Verify tab filters visible: Tümü, Bekleyen, Onaylanan, İptal, Tamamlanan
      3. Create a test appointment via API
      4. Click "Bekleyen" tab
      5. Verify appointment appears with status badge (yellow)
    Expected Result: Appointment visible in pending tab with correct status badge
    Failure Indicators: Empty list, wrong status, missing filters
    Evidence: .omo/evidence/task-13-appointment-list.png

  Scenario: Appointment status change (confirm)
    Tool: Playwright
    Steps:
      1. On admin dashboard, find a pending appointment
      2. Click "Onayla" (confirm) button
      3. Verify status badge changes to green (Onaylanan)
      4. Verify appointment moves from "Bekleyen" to "Onaylanan" tab
    Expected Result: Status updated and reflected in UI without page refresh
    Failure Indicators: Status doesn't change, page refresh needed, error
    Evidence: .omo/evidence/task-13-status-confirm.png
  ```

  **Commit**: YES (groups with Wave 2)
  - Message: `feat(api): admin auth, staff/services CRUD, slot generation`
  - Files: `client/src/pages/admin/DashboardPage.tsx`, `client/src/pages/admin/AppointmentsPage.tsx`, `client/src/hooks/useFirestoreCollection.ts`

- [ ] 14. Booking page — service + staff selection steps

  **What to do**:
  - Create `client/src/pages/BookingPage.tsx` — Multi-step booking flow container:
    - Step indicator showing progress (1. Hizmet → 2. Personel → 3. Tarih/Saat → 4. Bilgiler → 5. Onay)
    - State management for selected service, staff, date, time, customer info
  - Create `client/src/components/booking/ServiceSelect.tsx` — Service selection:
    - Grid of service cards showing: name, duration, price
    - Click to select, highlighted border on selected card
    - Fetch services from GET /api/v1/services
  - Create `client/src/components/booking/StaffSelect.tsx` — Staff selection:
    - Grid of staff cards showing: name, specialties
    - Only show staff that can perform the selected service
    - Fetch staff from GET /api/v1/staff
  - Create `client/src/hooks/useApi.ts` — API request hook (fetch wrapper with error handling)
  - Dark theme styling throughout: card backgrounds (dark-800), borders (dark-700), accent CTA button

  **Must NOT do**:
  - NO date/time selection yet (Task 19)
  - NO customer form yet (Task 20)
  - NO booking submission yet (Task 15)
  - NO real-time availability check in staff selection yet (just list active staff)

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
    - Reason: Multi-step UI with card grids, animations, dark theme styling
  - **Skills**: [`/frontend-ui-ux`]
    - `/frontend-ui-ux`: Multi-step wizard flow, card grid layout, dark theme cards

  **Parallelization**:
  - **Can Run In Parallel**: YES (with Task 12, 13)
  - **Parallel Group**: Wave 2
  - **Blocks**: 19
  - **Blocked By**: 4, 7

  **References**:
  **Pattern References**:
  - Research: Booking form card selection pattern with react-hook-form
  - Research: Dark form input styling with `dark:` variants
  **WHY Each Reference Matters**:
  - Multi-step flow must feel intuitive; dark card styling must be consistent with Task 7 tokens

  **Acceptance Criteria**:

  **QA Scenarios (MANDATORY)**:
  ```
  Scenario: Booking page shows service selection step
    Tool: Playwright
    Steps:
      1. Navigate to http://localhost:5173/booking
      2. Verify step indicator shows "1. Hizmet" as active
      3. Verify service cards are displayed (or "Henüz hizmet eklenmedi" message)
      4. If services exist, click one
      5. Verify selected card has highlight border
    Expected Result: Service cards rendered with dark theme, selectable
    Failure Indicators: Empty page, light theme, cards not clickable
    Evidence: .omo/evidence/task-14-service-select.png

  Scenario: Staff selection shows after service selection
    Tool: Playwright
    Steps:
      1. On booking page, select a service
      2. Verify step indicator moves to "2. Personel"
      3. Verify staff cards displayed showing name and specialties
      4. Click a staff member
      5. Verify selected staff has highlight border
    Expected Result: Staff cards appear after service selection, selectable
    Failure Indicators: No staff shown, staff not filtered by service, no visual feedback
    Evidence: .omo/evidence/task-14-staff-select.png

  Scenario: Step navigation works correctly
    Tool: Playwright
    Steps:
      1. Navigate to /booking
      2. Select a service
      3. Click "Geri" (Back) button
      4. Verify service selection step is shown again
      5. Verify previously selected service is still highlighted
    Expected Result: Back navigation preserves selection state
    Failure Indicators: State lost, wrong step shown
    Evidence: .omo/evidence/task-14-step-navigation.png
  ```

  **Commit**: YES (groups with Wave 2)
  - Message: `feat(api): admin auth, staff/services CRUD, slot generation`
  - Files: `client/src/pages/BookingPage.tsx`, `client/src/components/booking/ServiceSelect.tsx`, `client/src/components/booking/StaffSelect.tsx`, `client/src/hooks/useApi.ts`

- [ ] 15. Appointment creation API (Firestore transaction)

  **What to do**:
  - Create `src/services/appointment.service.ts` — Core booking logic:
    - `createAppointment(data)` — Firestore transaction that:
      1. Reads staff_availability for the date
      2. Checks if requested slot is available and not locked
      3. Verifies staff is active
      4. Verifies service exists
      5. Locks slot (sets locked=true)
      6. Creates appointment document with denormalized data (staffName, serviceName, duration)
      7. Marks slot as unavailable (available=false, locked=false)
      8. Returns created appointment
    - `getAppointmentsByDate(date)` — Get all appointments for a date
    - `getAppointmentsByPhone(phone)` — Lookup appointments by phone number
  - Create `src/routes/v1/appointments.ts` — Appointment routes (public):
    - `POST /api/v1/appointments` — Create appointment (visitor, no auth)
    - `GET /api/v1/appointments?phone=XXX` — Lookup by phone (visitor, no auth)
    - `GET /api/v1/appointments/:id` — Get appointment by ID
  - Create `src/controllers/appointment.controller.ts` — HTTP handlers with Zod validation
  - Create `src/repositories/appointments.repository.ts` — Firestore operations for appointments collection

  **Must NOT do**:
  - NO payment processing
  - NO SMS/email notification on booking
  - NO booking confirmation email
  - NO max bookings per phone limit (MVP)

  **Recommended Agent Profile**:
  - **Category**: `deep`
    - Reason: Firestore transaction with slot locking is complex, race condition handling is critical
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES (with Task 16, 17, 18 after their dependencies)
  - **Parallel Group**: Wave 3
  - **Blocks**: 20, 21
  - **Blocked By**: 3, 5, 6, 11

  **References**:
  **Pattern References**:
  - Research: Firestore transaction pattern for concurrent slot booking — lock slot → verify → confirm → mark unavailable
  - Research: Denormalized appointment doc (staffName, serviceName, servicePrice)
  - Research: Appointment status flow: pending → confirmed → completed/cancelled
  **WHY Each Reference Matters**:
  - Transaction pattern prevents double-booking; denormalization reduces read operations; status flow drives admin actions

  **Acceptance Criteria**:

  **QA Scenarios (MANDATORY)**:
  ```
  Scenario: Create appointment successfully
    Tool: Bash (curl)
    Steps:
      1. Create a staff member and service via API (or seed)
      2. curl -X POST http://localhost:5000/api/v1/appointments -H "Content-Type: application/json" -d '{"staffId":"staff1","serviceId":"svc1","customerName":"Ahmet Yılmaz","customerPhone":"+905551234567","date":"2099-12-25","startTime":"10:00"}'
      3. Verify response has id, staffName (denormalized), serviceName (denormalized), status="pending"
    Expected Result: 201 Created with full appointment object including denormalized fields
    Failure Indicators: 500 error, missing denormalized fields, status not "pending"
    Evidence: .omo/evidence/task-15-create-appointment.txt

  Scenario: Concurrent booking for same slot fails
    Tool: Bash (curl)
    Steps:
      1. Create staff and service
      2. Send two simultaneous booking requests for the same slot:
         curl -X POST http://localhost:5000/api/v1/appointments ... -d '{"staffId":"staff1","serviceId":"svc1","customerName":"Ali","customerPhone":"+905551111111","date":"2099-12-25","startTime":"10:00"}' &
         curl -X POST http://localhost:5000/api/v1/appointments ... -d '{"staffId":"staff1","serviceId":"svc1","customerName":"Veli","customerPhone":"+905552222222","date":"2099-12-25","startTime":"10:00"}' &
      3. Wait for both to complete
      4. Verify one succeeds (201) and one fails (409 or error)
    Expected Result: Exactly one appointment created, the other gets a "slot not available" error
    Failure Indicators: Both succeed (double-booking), or both fail
    Evidence: .omo/evidence/task-15-concurrent-booking.txt

  Scenario: Lookup appointments by phone
    Tool: Bash (curl)
    Steps:
      1. Create appointment with phone "+905551234567"
      2. curl "http://localhost:5000/api/v1/appointments?phone=%2B905551234567"
      3. Verify response contains the appointment
    Expected Result: Array with matching appointment(s)
    Failure Indicators: Empty array or 500 error
    Evidence: .omo/evidence/task-15-phone-lookup.txt

  Scenario: Booking past time slot fails
    Tool: Bash (curl)
    Steps:
      1. Attempt to book a slot in the past (yesterday's date)
      2. Verify 400 error with clear message
    Expected Result: 400 Bad Request with "past time slot" message
    Failure Indicators: Booking succeeds for past date
    Evidence: .omo/evidence/task-15-past-slot.txt
  ```

  **Commit**: YES (groups with Wave 3)
  - Message: `feat(app): appointment booking and management`
  - Files: `src/services/appointment.service.ts`, `src/routes/v1/appointments.ts`, `src/controllers/appointment.controller.ts`, `src/repositories/appointments.repository.ts`

- [ ] 16. Appointment status management API (confirm/cancel/complete)

  **What to do**:
  - Add to `src/services/appointment.service.ts`:
    - `confirmAppointment(id)` — Sets status to "confirmed" (admin only)
    - `cancelAppointment(id, reason?)` — Sets status to "cancelled", frees the slot in staff_availability (Firestore transaction)
    - `completeAppointment(id)` — Sets status to "completed" (admin only)
    - `getAppointments(filters)` — Get appointments with filters (status, date, staffId)
  - Add to `src/routes/v1/appointments.ts` — Admin routes:
    - `PATCH /api/v1/appointments/:id/confirm` — Confirm appointment (admin)
    - `PATCH /api/v1/appointments/:id/cancel` — Cancel appointment (admin)
    - `PATCH /api/v1/appointments/:id/complete` — Mark as completed (admin)
    - `GET /api/v1/appointments` — List with filters (status, date, staffId) (admin)
  - Add adminAuth middleware to all admin appointment routes
  - Create status transition validation: pending → confirmed/cancelled, confirmed → completed/cancelled (cannot go back)

  **Must NOT do**:
  - NO visitor-initiated cancellation (MVP: admin only)
  - NO notification on status change (no SMS/email)
  - NO automatic completion (admin marks manually)

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: Status updates are straightforward PATCH operations
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES (with Task 15, 17, 18 after their dependencies)
  - **Parallel Group**: Wave 3
  - **Blocks**: 21
  - **Blocked By**: 3, 6

  **References**:
  **Pattern References**:
  - Research: Firestore transaction for cancelling (frees slot in staff_availability)
  - Research: Status flow: pending → confirmed → completed/cancelled
  **WHY Each Reference Matters**:
  - Cancellation must free the slot atomically to allow re-booking

  **Acceptance Criteria**:

  **QA Scenarios (MANDATORY)**:
  ```
  Scenario: Confirm a pending appointment
    Tool: Bash (curl)
    Steps:
      1. Create a pending appointment
      2. PATCH /api/v1/appointments/{id}/confirm with admin token
      3. Verify status changed to "confirmed"
    Expected Result: 200 OK with status="confirmed"
    Failure Indicators: Status remains "pending", or 500 error
    Evidence: .omo/evidence/task-16-confirm.txt

  Scenario: Cancel appointment frees the slot
    Tool: Bash (curl)
    Steps:
      1. Create appointment for staff1 on 2099-12-25 at 10:00
      2. PATCH /api/v1/appointments/{id}/cancel with admin token
      3. Verify status="cancelled"
      4. GET /api/v1/availability/staff1?date=2099-12-25
      5. Verify 10:00 slot now shows isAvailable=true
    Expected Result: Appointment cancelled, slot available again
    Failure Indicators: Slot still shows unavailable after cancellation
    Evidence: .omo/evidence/task-16-cancel-frees-slot.txt

  Scenario: Complete a confirmed appointment
    Tool: Bash (curl)
    Steps:
      1. Confirm a pending appointment
      2. PATCH /api/v1/appointments/{id}/complete with admin token
      3. Verify status changed to "completed"
    Expected Result: 200 OK with status="completed"
    Failure Indicators: Status doesn't change, or error
    Evidence: .omo/evidence/task-16-complete.txt

  Scenario: Invalid status transition rejected
    Tool: Bash (curl)
    Steps:
      1. Create a completed appointment (create → confirm → complete)
      2. Attempt to PATCH /api/v1/appointments/{id}/confirm
      3. Verify 400 error with "invalid transition" message
    Expected Result: 400 Bad Request with transition error
    Failure Indicators: Status changed to "confirmed" from "completed"
    Evidence: .omo/evidence/task-16-invalid-transition.txt

  Scenario: Unauthenticated status change rejected
    Tool: Bash (curl)
    Steps:
      1. Create a pending appointment (public)
      2. PATCH /api/v1/appointments/{id}/confirm without admin token
      3. Verify 401 Unauthorized
    Expected Result: 401 response, status unchanged
    Failure Indicators: Status changed without auth
    Evidence: .omo/evidence/task-16-auth-check.txt
  ```

  **Commit**: YES (groups with Wave 3)
  - Message: `feat(app): appointment booking and management`
  - Files: `src/services/appointment.service.ts`, `src/routes/v1/appointments.ts`, `src/controllers/appointment.controller.ts`

- [ ] 17. Staff management page (React admin)

  **What to do**:
  - Create `client/src/pages/admin/StaffPage.tsx` — Staff management:
    - Staff list with cards: name, specialties badges, active status, working hours summary
    - "Personel Ekle" (Add Staff) button opens modal/form
    - Inline edit for staff details
    - Soft delete toggle (deactivate instead of delete)
    - Working hours editor for each day (open/close time, isWorkingDay toggle)
  - Create `client/src/components/admin/StaffForm.tsx` — Staff creation/edit form:
    - Fields: name, specialties (multi-select or comma-separated), working hours per day
    - Zod validation (min 2 chars name, at least one specialty)
    - Dark themed form inputs
  - Create `client/src/components/admin/WorkingHoursEditor.tsx` — Weekly schedule editor:
    - 7 rows (Mon-Sun), each with: isWorkingDay toggle, open time, close time
    - Default: Mon-Sat 09:00-18:00, Sunday closed
  - Use `useFirestoreCollection` hook for real-time staff list
  - Use `useApi` hook for CRUD operations (POST, PUT, DELETE)

  **Must NOT do**:
  - NO staff avatar upload (MVP)
  - NO staff scheduling beyond basic weekly hours (no exceptions, holidays)
  - NO drag-and-drop scheduling UI (simple form only)

  **Recommended Agent Profile**:
  - **Category**: `unspecified-high`
    - Reason: CRUD management page with forms, modals, real-time updates — significant UI work
  - **Skills**: [`/frontend-ui-ux`]
    - `/frontend-ui-ux`: Dark themed CRUD forms, modal design, working hours editor

  **Parallelization**:
  - **Can Run In Parallel**: YES (with Task 15, 16, 18, 19, 20)
  - **Parallel Group**: Wave 3
  - **Blocks**: None
  - **Blocked By**: 9, 13

  **References**:
  **Pattern References**:
  - Research: Dark UI form input patterns with `dark:` variants
  - Research: react-hook-form + Zod for form validation
  **WHY Each Reference Matters**:
  - Consistent dark theme styling; form validation must match backend Zod schemas

  **Acceptance Criteria**:

  **QA Scenarios (MANDATORY)**:
  ```
  Scenario: Staff list displays with real-time updates
    Tool: Playwright
    Steps:
      1. Login as admin, navigate to /admin/staff
      2. Verify staff cards are displayed (or empty state message)
      3. Add a new staff member via API
      4. Verify new staff appears in the list without page refresh
    Expected Result: Staff list updates in real-time
    Failure Indicators: List doesn't update, needs manual refresh
    Evidence: .omo/evidence/task-17-staff-list.png

  Scenario: Add new staff member via form
    Tool: Playwright
    Steps:
      1. On staff page, click "Personel Ekle"
      2. Fill in: name "Ayşe", specialties "Saç Kesimi, Boyama"
      3. Set working hours for Monday: 09:00-17:00, Saturday: 09:00-14:00
      4. Click "Kaydet" (Save)
      5. Verify new staff appears in list with correct details
    Expected Result: Staff created and visible in list
    Failure Indicators: Form errors, staff not appearing, API error
    Evidence: .omo/evidence/task-17-add-staff.png

  Scenario: Deactivate staff member
    Tool: Playwright
    Steps:
      1. On staff page, find active staff member
      2. Click deactivate toggle/button
      3. Verify staff shows as "Pasif" (inactive) in list
      4. Verify staff no longer appears in booking page staff selection
    Expected Result: Staff deactivated, removed from booking options
    Failure Indicators: Staff still active, or still shown in booking
    Evidence: .omo/evidence/task-17-deactivate-staff.png

  Scenario: Working hours validation
    Tool: Playwright
    Steps:
      1. Open staff form
      2. Set close time before open time (e.g., 18:00-09:00)
      3. Attempt to save
      4. Verify validation error shown
    Expected Result: Form rejects invalid working hours
    Failure Indicators: Invalid hours saved without error
    Evidence: .omo/evidence/task-17-hours-validation.png
  ```

  **Commit**: YES (groups with Wave 3)
  - Message: `feat(app): appointment booking and management`
  - Files: `client/src/pages/admin/StaffPage.tsx`, `client/src/components/admin/StaffForm.tsx`, `client/src/components/admin/WorkingHoursEditor.tsx`

- [ ] 18. Services management page (React admin)

  **What to do**:
  - Create `client/src/pages/admin/ServicesPage.tsx` — Service management:
    - Service list with cards: name, duration, price, category badge, active status
    - "Hizmet Ekle" (Add Service) button opens form
    - Inline edit for service details
    - Soft delete toggle
  - Create `client/src/components/admin/ServiceForm.tsx` — Service creation/edit form:
    - Fields: name, durationMinutes (number), price (number), category (select: Kesim, Boyama, Bakım, Diğer), active (toggle)
    - Zod validation (name min 2, price > 0, duration 15-180)
    - Dark themed form inputs matching staff form style

  **Must NOT do**:
  - NO service image upload (MVP)
  - NO service description rich text (plain text only, optional)
  - NO service ordering/sorting (alphabetical default)

  **Recommended Agent Profile**:
  - **Category**: `unspecified-high`
    - Reason: CRUD form page similar to Staff but with different fields
  - **Skills**: [`/frontend-ui-ux`]
    - `/frontend-ui-ux`: Consistent dark CRUD form design

  **Parallelization**:
  - **Can Run In Parallel**: YES (with Task 15, 16, 17, 19, 20)
  - **Parallel Group**: Wave 3
  - **Blocks**: None
  - **Blocked By**: 10, 13

  **References**:
  **Pattern References**:
  - Same pattern as Task 17 (Staff management) for consistency
  **WHY Each Reference Matters**:
  - Consistency with staff management page — same style, same form patterns

  **Acceptance Criteria**:

  **QA Scenarios (MANDATORY)**:
  ```
  Scenario: Services list displays with categories
    Tool: Playwright
    Steps:
      1. Login as admin, navigate to /admin/services
      2. Verify service cards show name, duration, price, category badge
      3. Add a service via API: "Saç Kesimi", 30dk, 150TL, "Kesim"
      4. Verify service appears with correct category badge
    Expected Result: Service cards with dark theme, category badges color-coded
    Failure Indicators: Empty list, broken layout, missing categories
    Evidence: .omo/evidence/task-18-services-list.png

  Scenario: Add new service via form
    Tool: Playwright
    Steps:
      1. On services page, click "Hizmet Ekle"
      2. Fill: name "Saç Boyama", duration 90, price 350, category "Boyama"
      3. Click "Kaydet"
      4. Verify service appears in list
    Expected Result: Service created with correct details
    Failure Indicators: Form validation errors, API error
    Evidence: .omo/evidence/task-18-add-service.png

  Scenario: Service form validation
    Tool: Playwright
    Steps:
      1. Open service form
      2. Leave name empty, set price to -5, set duration to 500
      3. Click "Kaydet"
      4. Verify validation errors for each field
    Expected Result: Form shows errors for invalid inputs
    Failure Indicators: Form submits with invalid data
    Evidence: .omo/evidence/task-18-validation.png
  ```

  **Commit**: YES (groups with Wave 3)
  - Message: `feat(app): appointment booking and management`
  - Files: `client/src/pages/admin/ServicesPage.tsx`, `client/src/components/admin/ServiceForm.tsx`

- [ ] 19. Slot picker + date selection (React booking)

  **What to do**:
  - Create `client/src/components/booking/DatePicker.tsx` — Date selection component:
    - Calendar view showing next 30 days
    - Past dates and unavailable days grayed out
    - Selected date highlighted with accent color
    - Dark themed calendar matching overall design
  - Create `client/src/components/booking/SlotPicker.tsx` — Time slot selection:
    - Grid of 30-minute time slots (e.g., 09:00, 09:30, 10:00, ...)
    - Available slots: accent colored, clickable
    - Unavailable slots: grayed out, disabled
    - Selected slot: highlighted border/fill
    - Fetch available slots from GET /api/v1/availability/:staffId?date=YYYY-MM-DD
    - Show loading state while fetching slots
  - Create `client/src/components/booking/BookingStepper.tsx` — Step progress component:
    - Visual indicator: 1. Hizmet → 2. Personel → 3. Tarih/Saat → 4. Bilgiler → 5. Onay
    - Current step highlighted, completed steps with checkmark
    - Clickable completed steps for navigation back
  - Wire up in BookingPage: when staff+service selected, show DatePicker; when date selected, show SlotPicker

  **Must NOT do**:
  - NO external calendar library with heavy dependencies (use simple custom or date-fns based)
  - NO drag-to-select time ranges (single slot selection only)
  - NO recurring booking or multi-date selection

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
    - Reason: Calendar UI, slot grid, step indicator — visual/heavy UI work
  - **Skills**: [`/frontend-ui-ux`]
    - `/frontend-ui-ux`: Calendar design, slot grid layout, date-fns integration

  **Parallelization**:
  - **Can Run In Parallel**: NO (depends on Task 11 slot generation and Task 14 booking page)
  - **Parallel Group**: Wave 3
  - **Blocks**: 20
  - **Blocked By**: 11, 14

  **References**:
  **Pattern References**:
  - Research: Slot picker with 30-min grid pattern
  - Research: Calendar component with date-fns for date utilities
  **WHY Each Reference Matters**:
  - Slot picker must match backend slot generation exactly; date-fns handles date calculations

  **Acceptance Criteria**:

  **QA Scenarios (MANDATORY)**:
  ```
  Scenario: Date picker shows available dates
    Tool: Playwright
    Steps:
      1. Navigate to /booking, select a service and staff
      2. Verify date picker renders with calendar view
      3. Verify past dates are grayed out/disabled
      4. Verify next 30 days are selectable
      5. Click on a future date
      6. Verify date is highlighted/selected
    Expected Result: Calendar with selectable future dates, past dates disabled
    Failure Indicators: All dates enabled, no calendar render, past dates clickable
    Evidence: .omo/evidence/task-19-date-picker.png

  Scenario: Slot picker shows available times for selected date
    Tool: Playwright
    Steps:
      1. After selecting a date, verify time slots appear
      2. Verify slots are in 30-minute intervals
      3. Verify available slots are accent colored and clickable
      4. Click on an available slot
      5. Verify slot is highlighted as selected
    Expected Result: Time slots displayed, available ones selectable
    Failure Indicators: No slots shown, all slots disabled, clicking doesn't select
    Evidence: .omo/evidence/task-19-slot-picker.png

  Scenario: Unavailable slots shown as disabled
    Tool: Playwright
    Steps:
      1. Create a booking for staff at 10:00 via API
      2. In booking page, select same staff and date
      3. Verify 10:00 slot is disabled/grayed out
      4. Verify other slots remain available
    Expected Result: Already-booked slot shown as unavailable
    Failure Indicators: All slots available, or wrong slot disabled
    Evidence: .omo/evidence/task-19-unavailable-slot.png

  Scenario: Step indicator reflects progress
    Tool: Playwright
    Steps:
      1. Navigate to /booking
      2. Verify step 1 "Hizmet" is active
      3. Select service → verify step 2 active
      4. Select staff → verify step 3 active
      5. Select date → verify date picker shown
      6. Click back on step 1 → verify service selection shown
    Expected Result: Step indicator correctly tracks progress
    Failure Indicators: Wrong step highlighted, navigation broken
    Evidence: .omo/evidence/task-19-step-indicator.png
  ```

  **Commit**: YES (groups with Wave 3)
  - Message: `feat(app): appointment booking and management`
  - Files: `client/src/components/booking/DatePicker.tsx`, `client/src/components/booking/SlotPicker.tsx`, `client/src/components/booking/BookingStepper.tsx`

- [ ] 20. Booking form + validation (React)

  **What to do**:
  - Create `client/src/components/booking/CustomerForm.tsx` — Customer info form:
    - Fields: customerName (text, min 2 chars), customerPhone (text, Turkish phone format)
    - Optional: notes (textarea, max 500 chars)
    - Zod validation using bookingSchema from Task 6
    - Dark themed inputs matching overall design
    - Error messages in Turkish
  - Create `client/src/components/booking/BookingSummary.tsx` — Booking summary review:
    - Shows: selected service, staff, date, time, customer name, phone
    - "Onayla" (Confirm) button to submit
    - "Düzenle" (Edit) links next to each section to go back to that step
  - Create `client/src/components/booking/BookingSuccess.tsx` — Success confirmation page:
    - Shows: appointment details, status (pending), reference info
    - "Randevu Takip Et" (Track Appointment) link
    - "Yeni Randevu" (New Appointment) link
  - Wire up full booking flow in BookingPage: step 4 = CustomerForm, step 5 = BookingSummary + submit
  - Connect form submission to POST /api/v1/appointments
  - Handle loading state, error state, and success state

  **Must NOT do**:
  - NO email field (MVP: name + phone only)
  - NO payment or deposit request
  - NO booking confirmation email/SMS
  - NO "add to calendar" feature (MVP)

  **Recommended Agent Profile**:
  - **Category**: `unspecified-high`
    - Reason: Multi-step form with validation, API integration, state management
  - **Skills**: [`/frontend-ui-ux`]
    - `/frontend-ui-ux`: Form validation UX, success state design

  **Parallelization**:
  - **Can Run In Parallel**: YES (with Task 17, 18)
  - **Parallel Group**: Wave 3
  - **Blocks**: None
  - **Blocked By**: 6, 15, 19

  **References**:
  **Pattern References**:
  - Research: react-hook-form + Zod pattern for booking form validation
  - Research: Booking flow submission pattern
  **WHY Each Reference Matters**:
  - Form validation must match backend Zod schemas; booking submission must handle transaction errors

  **Acceptance Criteria**:

  **QA Scenarios (MANDATORY)**:
  ```
  Scenario: Complete booking flow end-to-end
    Tool: Playwright
    Steps:
      1. Navigate to /booking
      2. Select a service (e.g., "Saç Kesimi")
      3. Select a staff member
      4. Select a date and time slot
      5. Fill in customer name "Ahmet Yılmaz" and phone "+905551234567"
      6. Review summary and click "Onayla"
      7. Verify success page shows with appointment details
    Expected Result: Booking completed, success page shown with reference
    Failure Indicators: Form validation error, API error, no success page
    Evidence: .omo/evidence/task-20-e2e-booking.png

  Scenario: Form validation prevents invalid submission
    Tool: Playwright
    Steps:
      1. Navigate to /booking, fill steps 1-3 (service, staff, date, time)
      2. In customer form: leave name empty, enter invalid phone "abc"
      3. Click submit
      4. Verify error messages appear for name and phone fields
    Expected Result: Form shows validation errors, does not submit
    Failure Indicators: Form submits with invalid data
    Evidence: .omo/evidence/task-20-form-validation.png

  Scenario: Booking slot already taken error
    Tool: Playwright
    Steps:
      1. Book a slot via API for the same staff/date/time
      2. In booking UI, attempt to book the same slot
      3. Verify error message "Bu saat dilimi artık müsait değil" or similar
    Expected Result: Clear error message, option to select different time
    Failure Indicators: Error 500, unclear error message, or double booking
    Evidence: .omo/evidence/task-20-slot-taken.png

  Scenario: Booking success page links work
    Tool: Playwright
    Steps:
      1. Complete a booking
      2. On success page, click "Randevu Takip Et"
      3. Verify navigation to tracking page
      4. Go back, click "Yeni Randevu"
      5. Verify navigation to /booking
    Expected Result: Both links navigate correctly
    Failure Indicators: 404, wrong page, or broken links
    Evidence: .omo/evidence/task-20-success-links.png
  ```

  **Commit**: YES (groups with Wave 3)
  - Message: `feat(app): appointment booking and management`
  - Files: `client/src/components/booking/CustomerForm.tsx`, `client/src/components/booking/BookingSummary.tsx`, `client/src/components/booking/BookingSuccess.tsx`

- [ ] 21. Real-time appointment updates (onSnapshot admin dashboard)

  **What to do**:
  - Update `client/src/pages/admin/AppointmentsPage.tsx` — Add real-time updates:
    - Use `useFirestoreCollection` hook from Task 13 to listen to appointments collection
    - When new appointment appears, show visual notification (toast or highlight)
    - Status changes reflect immediately without page refresh
    - Show "live" indicator badge when real-time connection is active
    - Handle connection errors gracefully (show "offline" indicator, fall back to polling)
  - Update `client/src/hooks/useFirestoreCollection.ts` — Add error handling:
    - Handle Firestore offline/online state changes
    - Auto-reconnect on connection loss
    - Loading state management
  - Add toast/notification system for new appointments:
    - Simple toast component at bottom-right
    - Auto-dismiss after 5 seconds
    - Show customer name and service for new appointments

  **Must NOT do**:
  - NO push notifications (browser or mobile)
  - NO sound alerts for new appointments
  - NO email/SMS notifications

  **Recommended Agent Profile**:
  - **Category**: `unspecified-high`
    - Reason: Real-time data binding, error handling, toast animations
  - **Skills**: [`/frontend-ui-ux`]
    - `/frontend-ui-ux`: Toast notification design, live indicator animation

  **Parallelization**:
  - **Can Run In Parallel**: NO (depends on dashboard and appointment API)
  - **Parallel Group**: Wave 4
  - **Blocks**: 22
  - **Blocked By**: 13, 15, 16

  **References**:
  **Pattern References**:
  - Research: onSnapshot hook pattern for real-time Firestore data
  - Research: Connection state management with Firestore onSnapshot
  **WHY Each Reference Matters**:
  - Real-time updates are a differentiator; must handle offline gracefully

  **Acceptance Criteria**:

  **QA Scenarios (MANDATORY)**:
  ```
  Scenario: New appointment appears in real-time
    Tool: Playwright
    Steps:
      1. Open admin dashboard, navigate to appointments page
      2. In another browser/API, create a new appointment
      3. Verify new appointment appears in dashboard without page refresh
      4. Verify toast notification shows with customer name
    Expected Result: Appointment appears instantly, toast shows notification
    Failure Indicators: Page refresh needed, no toast, or delay > 5 seconds
    Evidence: .omo/evidence/task-21-realtime-new.png

  Scenario: Status change reflects immediately
    Tool: Playwright
    Steps:
      1. Open admin dashboard with a pending appointment visible
      2. Via API, confirm the appointment (PATCH /appointments/:id/confirm)
      3. Verify status badge changes from yellow to green without refresh
    Expected Result: Status updates in real-time
    Failure Indicators: Page refresh needed for status change
    Evidence: .omo/evidence/task-21-realtime-status.png

  Scenario: Offline indicator shows and recovers
    Tool: Playwright
    Steps:
      1. Open admin dashboard
      2. Simulate offline (disconnect network or stop backend)
      3. Verify "offline" or "bağlantı kesildi" indicator appears
      4. Restore connection
      5. Verify "live" indicator returns and data refreshes
    Expected Result: Offline indicator shown, auto-recovery when connection restored
    Failure Indicators: No offline indicator, or page crashes on disconnect
    Evidence: .omo/evidence/task-21-offline-recovery.png
  ```

  **Commit**: YES (groups with Wave 4)
  - Message: `feat(polish): real-time updates, tracking, responsive design`
  - Files: `client/src/pages/admin/AppointmentsPage.tsx`, `client/src/hooks/useFirestoreCollection.ts`, `client/src/components/ui/Toast.tsx`

- [ ] 22. Appointment tracking page (visitor lookup by phone)

  **What to do**:
  - Create `client/src/pages/TrackPage.tsx` — Appointment tracking page:
    - Phone number input field (Turkish format: +90 5XX XXX XX XX)
    - "Randevularımı Gör" (View My Appointments) button
    - Results list: appointment cards showing date, time, service, staff, status badge
    - Status badges: pending (yellow/beklemede), confirmed (green/onaylandı), cancelled (red/iptal), completed (blue/tamamlandı)
    - Empty state message if no appointments found
  - Create `client/src/hooks/useTrackAppointments.ts` — Hook for phone-based appointment lookup:
    - `trackByPhone(phone)` — Calls GET /api/v1/appointments?phone=XXX
    - Returns appointments sorted by date (nearest first)
    - Loading and error states
  - Add "Randevu Takip" link in main navigation (from Task 7 Layout)

  **Must NOT do**:
  - NO authentication required for tracking (anyone with phone number can look up)
  - NO appointment cancellation from tracking page (admin only)
  - NO pagination (show all appointments on one page)
  - NO real-time updates on tracking page (manual refresh only)

  **Recommended Agent Profile**:
  - **Category**: `unspecified-high`
    - Reason: Search/lookup page with form, results display, status badges
  - **Skills**: [`/frontend-ui-ux`]
    - `/frontend-ui-ux`: Dark themed results cards, phone input formatting

  **Parallelization**:
  - **Can Run In Parallel**: YES (with Task 23)
  - **Parallel Group**: Wave 4
  - **Blocks**: None
  - **Blocked By**: 15, 21

  **References**:
  **Pattern References**:
  - Research: Dark form input patterns with `dark:` variants
  - Research: Status badge color coding (pending=yellow, confirmed=green, cancelled=red, completed=blue)
  **WHY Each Reference Matters**:
  - Consistent styling with booking page; status badges must match admin dashboard

  **Acceptance Criteria**:

  **QA Scenarios (MANDATORY)**:
  ```
  Scenario: Track appointments by phone number
    Tool: Playwright
    Steps:
      1. Create 2 appointments via API with phone "+905551234567"
      2. Navigate to /track
      3. Enter "+905551234567" in phone field
      4. Click "Randevularımı Gör"
      5. Verify 2 appointment cards appear with status badges
    Expected Result: Both appointments listed with correct details and status badges
    Failure Indicators: Empty results, wrong phone format error, missing badges
    Evidence: .omo/evidence/task-22-track-appointments.png

  Scenario: Tracking page shows empty state
    Tool: Playwright
    Steps:
      1. Navigate to /track
      2. Enter a phone number with no appointments: "+905559999999"
      3. Click "Randevularımı Gör"
      4. Verify "Henüz randevunuz bulunmamaktadır" or similar empty message
    Expected Result: Friendly empty state message
    Failure Indicators: Blank page, error, or generic error message
    Evidence: .omo/evidence/task-22-track-empty.png

  Scenario: Invalid phone format error
    Tool: Playwright
    Steps:
      1. Navigate to /track
      2. Enter "abc" in phone field
      3. Click "Randevularımı Gör"
      4. Verify validation error message appears
    Expected Result: Phone validation error in Turkish
    Failure Indicators: Search executes with invalid phone
    Evidence: .omo/evidence/task-22-phone-validation.png
  ```

  **Commit**: YES (groups with Wave 4)
  - Message: `feat(polish): real-time updates, tracking, responsive design`
  - Files: `client/src/pages/TrackPage.tsx`, `client/src/hooks/useTrackAppointments.ts`

- [ ] 23. Responsive design polish + final dark UI treatment

  **What to do**:
  - Audit and fix responsive breakpoints across all pages:
    - Mobile (320px-480px): Single column, stacked cards, full-width inputs
    - Tablet (481px-768px): Two-column where appropriate
    - Desktop (769px+): Full layout with sidebar
  - Fix mobile-specific issues:
    - Admin sidebar becomes hamburger menu on mobile
    - Booking steps become vertical on small screens
    - Service/staff cards stack in single column
    - Time slot grid adjusts columns (3 on mobile, 6 on desktop)
  - Polish dark theme consistency:
    - Verify all backgrounds use dark-900/800/700 palette consistently
    - Verify all text uses white/white/90 for readability
    - Verify all accent colors (buttons, links, active states) are consistent
    - Verify hover/focus states on all interactive elements
    - Verify form input styling (border colors, focus rings, error states) in dark mode
  - Add loading skeletons for async content (appointments list, staff cards)
  - Fix any z-index issues (modals above sidebar, etc.)
  - Test all pages on 3 viewport sizes: 375px (mobile), 768px (tablet), 1280px (desktop)

  **Must NOT do**:
  - NO light theme implementation (dark only for MVP)
  - NO complex animations or page transitions
  - NO PWA or offline support
  - NO accessibility audit beyond basic keyboard navigation

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
    - Reason: Pure UI/UX polish, responsive design, visual refinements
  - **Skills**: [`/frontend-ui-ux`]
    - `/frontend-ui-ux`: Responsive breakpoints, dark theme refinement, loading states

  **Parallelization**:
  - **Can Run In Parallel**: YES (with Task 22, 24)
  - **Parallel Group**: Wave 4
  - **Blocks**: None
  - **Blocked By**: 21

  **References**:
  **Pattern References**:
  - Research: Tailwind responsive breakpoints (sm:, md:, lg:)
  - Research: Dark theme consistency patterns (background hierarchy, text contrast)
  **WHY Each Reference Matters**:
  - Mobile responsive is a Must Have; dark theme consistency is the design requirement

  **Acceptance Criteria**:

  **QA Scenarios (MANDATORY)**:
  ```
  Scenario: Mobile layout works correctly
    Tool: Playwright
    Steps:
      1. Set viewport to 375x667 (iPhone)
      2. Navigate to /booking
      3. Verify single-column layout, no horizontal scroll
      4. Verify form inputs are full-width
      5. Verify time slot grid shows 3 columns
      6. Take screenshot
    Expected Result: Clean mobile layout, no overflow, usable touch targets
    Failure Indicators: Horizontal scroll, tiny text, overlapping elements
    Evidence: .omo/evidence/task-23-mobile-booking.png

  Scenario: Tablet layout adapts correctly
    Tool: Playwright
    Steps:
      1. Set viewport to 768x1024 (iPad)
      2. Navigate to /admin
      3. Verify sidebar is visible or hamburger menu
      4. Navigate to /booking
      5. Verify two-column layout where appropriate
    Expected Result: Adapted layout for tablet, all content readable
    Failure Indicators: Elements too wide or too narrow, sidebar broken
    Evidence: .omo/evidence/task-23-tablet-admin.png

  Scenario: Desktop layout with full sidebar
    Tool: Playwright
    Steps:
      1. Set viewport to 1280x800 (desktop)
      2. Navigate to /admin
      3. Verify sidebar visible with navigation items
      4. Verify content area has comfortable spacing
      5. Take screenshot
    Expected Result: Full desktop layout with sidebar, clean spacing
    Failure Indicators: Cramped content, sidebar collapsed unexpectedly
    Evidence: .omo/evidence/task-23-desktop.png

  Scenario: Dark theme consistency across all pages
    Tool: Playwright
    Steps:
      1. Navigate to each page: /, /booking, /track, /admin/login, /admin, /admin/staff, /admin/services
      2. On each page, verify background is dark (#0a0a0a or near-black)
      3. Verify text is light (white or near-white)
      4. Verify buttons have consistent accent color
      5. Verify form inputs have consistent dark styling
    Expected Result: Consistent dark theme on every page
    Failure Indicators: White patches, inconsistent colors, hard-to-read text
    Evidence: .omo/evidence/task-23-dark-consistency.png
  ```

  **Commit**: YES (groups with Wave 4)
  - Message: `feat(polish): real-time updates, tracking, responsive design`
  - Files: All modified page components

- [ ] 24. README.md + .env.example + project documentation

  **What to do**:
  - Create `README.md` with:
    - Project overview (Turkish: Kuaför Randevu Sistemi)
    - Tech stack: Node.js, Express, Firebase, React (Vite), Tailwind CSS
    - Prerequisites: Node.js 18+, Firebase project, npm/pnpm
    - Setup instructions:
      1. Clone repo
      2. Create `.env` from `.env.example`
      3. Set up Firebase project (Firestore, get service account key)
      4. Generate ADMIN_PASSWORD_HASH: `node -e "console.log(require('crypto').createHash('sha256').update('1234').digest('hex'))"`
      5. `npm install` (root + client)
      6. `npm run dev` starts both backend and frontend
    - API endpoints table (all routes with method, path, auth, description)
    - Folder structure diagram
    - Firebase setup steps (create project, enable Firestore, create indexes, deploy rules)
    - Admin password setup
  - Update `.env.example` with all required env vars and comments
  - Create `client/.env.example` with Firebase client config vars

  **Must NOT do**:
  - NO deployment guide (MVP, no production)
  - NO API documentation with Swagger/OpenAPI (keep simple)
  - NO contribution guide
  - NO changelog

  **Recommended Agent Profile**:
  - **Category**: `writing`
    - Reason: Documentation-focused task
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES (with Task 22, 23)
  - **Parallel Group**: Wave 4
  - **Blocks**: None
  - **Blocked By**: All previous tasks (needs complete understanding)

  **References**:
  **Pattern References**:
  - All previous task implementations for accuracy
  **WHY Each Reference Matters**:
  - README must reflect actual project structure, env vars, and setup steps

  **Acceptance Criteria**:

  **QA Scenarios (MANDATORY)**:
  ```
  Scenario: README contains complete setup instructions
    Tool: Bash
    Steps:
      1. Read README.md
      2. Verify it contains: project overview, tech stack, prerequisites, setup steps
      3. Verify all API endpoints are documented
      4. Verify Firebase setup steps are included
      5. Verify admin password hash generation command is included
    Expected Result: Complete, accurate README documentation
    Failure Indicators: Missing sections, incorrect commands, outdated endpoints
    Evidence: .omo/evidence/task-24-readme.txt

  Scenario: .env.example files have all required vars
    Tool: Bash
    Steps:
      1. Read root .env.example
      2. Verify contains: PORT, FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, FIREBASE_PRIVATE_KEY, ADMIN_PASSWORD_HASH, JWT_SECRET
      3. Read client/.env.example
      4. Verify contains: VITE_FIREBASE_API_KEY, VITE_FIREBASE_AUTH_DOMAIN, VITE_FIREBASE_PROJECT_ID, VITE_FIREBASE_STORAGE_BUCKET, VITE_FIREBASE_MESSAGING_SENDER_ID, VITE_FIREBASE_APP_ID
    Expected Result: All environment variables documented with example values
    Failure Indicators: Missing variables, no example values
    Evidence: .omo/evidence/task-24-env-files.txt

  Scenario: Setup instructions actually work
    Tool: Bash
    Steps:
      1. Follow README setup instructions from scratch
      2. Copy .env.example to .env
      3. Run npm install (root and client)
      4. Run npm run dev
      5. Verify both server and frontend start without errors
    Expected Result: Application starts successfully following README instructions
    Failure Indicators: Missing npm packages, env errors, start errors
    Evidence: .omo/evidence/task-24-setup-works.txt
  ```

  **Commit**: YES (groups with Wave 4)
  - Message: `feat(polish): real-time updates, tracking, responsive design`
  - Files: `README.md`, `.env.example`, `client/.env.example`

---

## Final Verification Wave (MANDATORY — after ALL implementation tasks)

- [ ] F1. **Plan Compliance Audit** — `oracle`
  Read the plan end-to-end. For each "Must Have": verify implementation exists. For each "Must NOT Have": search codebase for forbidden patterns. Check evidence files. Compare deliverables against plan.
  Output: `Must Have [N/N] | Must NOT Have [N/N] | Tasks [N/N] | VERDICT: APPROVE/REJECT`

- [ ] F2. **Code Quality Review** — `unspecified-high`
  Run lint + type check. Review all changed files for: `as any`, empty catches, console.log in prod, commented-out code, unused imports. Check AI slop: excessive comments, over-abstraction, generic names.
  Output: `Lint [PASS/FAIL] | Type Check [PASS/FAIL] | Files [N clean/N issues] | VERDICT`

- [ ] F3. **Real Manual QA** — `unspecified-high` (+ `playwright` skill)
  Start from clean state. Execute EVERY QA scenario from EVERY task. Test cross-task integration. Test edge cases: empty state, invalid input, simultaneous booking. Save to `.omo/evidence/final-qa/`.
  Output: `Scenarios [N/N pass] | Integration [N/N] | Edge Cases [N tested] | VERDICT`

- [ ] F4. **Scope Fidelity Check** — `deep`
  For each task: read "What to do", read actual diff. Verify 1:1 — everything in spec built, nothing beyond spec. Check "Must NOT do" compliance. Flag unaccounted changes.
  Output: `Tasks [N/N compliant] | Contamination [CLEAN/N issues] | Unaccounted [CLEAN/N files] | VERDICT`

---

## Commit Strategy

- **Wave 1**: `feat(setup): project scaffolding and configuration` — package.json, tsconfig, .env, Firebase config, Express core, React core, types, theme
- **Wave 2**: `feat(api): admin auth, staff/services CRUD, slot generation` — backend API endpoints + admin login
- **Wave 3**: `feat(app): appointment booking and management` — booking flow, admin management pages
- **Wave 4**: `feat(polish): real-time updates, tracking, responsive design` — final features + docs

---

## Success Criteria

### Verification Commands
```bash
# Backend starts successfully
cd kuaforz-randevu && npm run dev
# Expected: Server running on port 5000

# Frontend compiles successfully  
cd kuaforz-randevu/client && npm run dev
# Expected: Vite dev server running on port 5173

# Firebase connection works
curl http://localhost:5000/api/v1/health
# Expected: {"status":"ok","firebase":"connected"}

# Admin login works
curl -X POST http://localhost:5000/api/v1/admin/login -H "Content-Type: application/json" -d '{"password":"1234"}'
# Expected: {"success":true,"token":"..."}

# Booking API responds
curl http://localhost:5000/api/v1/services
# Expected: [] (empty array, no services yet)
```

### Final Checklist
- [ ] All "Must Have" present
- [ ] All "Must NOT Have" absent
- [ ] All QA scenarios pass
- [ ] Dark theme consistent across all pages
- [ ] Mobile responsive
- [ ] Admin can CRUD staff, services, appointments
- [ ] Visitor can book without authentication
- [ ] Concurrent booking handled by Firestore transaction