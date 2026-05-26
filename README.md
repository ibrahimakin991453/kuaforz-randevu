# Kuaför Randevu Sistemi

Modern, minimalist, koyu temalı kuaför randevu yönetim sistemi. Ziyaretçiler isim ve telefon ile randevu alır, admin şifre ile giriş yaparak randevuları, personeli ve hizmetleri yönetir.

## Teknoloji

- **Backend**: Node.js + Express + TypeScript
- **Database**: Firebase Firestore
- **Frontend**: React (Vite) + Tailwind CSS
- **Auth**: Admin: SHA-256 şifre hash + JWT / Ziyaretçi: isim + telefon (auth yok)

## Ön Koşullar

- Node.js 18+
- Firebase projesi (Firestore etkin)
- Firebase Admin SDK service account key

## Kurulum

### 1. Depoyu klonlayın ve bağımlılıkları yükleyin

```bash
cd kuaforz-randevu
npm install
cd client
npm install
cd ..
```

### 2. Firebase projesi oluşturun

1. [Firebase Console](https://console.firebase.google.com)'da yeni bir proje oluşturun
2. **Firestore Database**'i etkinleştirin (production modu)
3. **Project Settings > Service Accounts** sayfasından yeni bir private key oluşturun
4. İndirilen JSON dosyasındaki `project_id`, `client_email`, `private_key` değerlerini not edin

### 3. `.env` dosyasını oluşturun

```bash
cp .env.example .env
```

`.env` dosyasını aşağıdaki gibi doldurun:

```env
PORT=5000
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-xxxxx@your-project-id.iam.gserviceaccount.com
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYOUR_KEY\n-----END PRIVATE KEY-----"
ADMIN_PASSWORD_HASH=03ac674216f3e15c761ee1a5e255f067953623c8b388b4459e13f978d7c846f4
JWT_SECRET=rastgele-bir-gizli-anahtar
```

> `ADMIN_PASSWORD_HASH` varsayılan şifre `1234`'ün SHA-256 hash'idir. Farklı bir şifre için:
> ```bash
> node -e "console.log(require('crypto').createHash('sha256').update('YENI_SIFRE').digest('hex'))"
> ```

### 4. Firestore Indexes ve Rules yükleyin

Firebase Console'da **Firestore > Indexes** sayfasından `firestore.indexes.json` dosyasındaki composite index'leri oluşturun.

**Firestore > Rules** sayfasına `firestore.rules` içeriğini yapıştırın.

### 5. Çalıştırın

```bash
npm run dev
```

Bu komut hem backend (port 5000) hem frontend (port 5173) sunucularını başlatır.

- **Uygulama**: http://localhost:5173
- **API**: http://localhost:5000/api/v1

## API Endpoints

### Admin

| Method | Endpoint | Auth | Açıklama |
|--------|----------|------|----------|
| POST | `/api/v1/admin/login` | - | Admin girişi, JWT token döner |
| GET | `/api/v1/admin/verify` | Admin | Token doğrulama |

### Personel

| Method | Endpoint | Auth | Açıklama |
|--------|----------|------|----------|
| GET | `/api/v1/staff` | - | Aktif personel listesi |
| GET | `/api/v1/staff?all=true` | - | Tüm personel (pasif dahil) |
| GET | `/api/v1/staff/:id` | - | Personel detay |
| POST | `/api/v1/staff` | Admin | Personel ekle |
| PUT | `/api/v1/staff/:id` | Admin | Personel güncelle |
| DELETE | `/api/v1/staff/:id` | Admin | Personel pasifleştir (soft delete) |

### Hizmetler

| Method | Endpoint | Auth | Açıklama |
|--------|----------|------|----------|
| GET | `/api/v1/services` | - | Aktif hizmet listesi |
| GET | `/api/v1/services?all=true` | - | Tüm hizmetler |
| GET | `/api/v1/services/:id` | - | Hizmet detay |
| POST | `/api/v1/services` | Admin | Hizmet ekle |
| PUT | `/api/v1/services/:id` | Admin | Hizmet güncelle |
| DELETE | `/api/v1/services/:id` | Admin | Hizmet pasifleştir |

### Müsaitlik

| Method | Endpoint | Auth | Açıklama |
|--------|----------|------|----------|
| GET | `/api/v1/availability/:staffId?date=YYYY-MM-DD` | - | Günlük müsait slotlar |
| GET | `/api/v1/availability/:staffId/week?startDate=YYYY-MM-DD` | - | Haftalık müsait slotlar |

### Randevular

| Method | Endpoint | Auth | Açıklama |
|--------|----------|------|----------|
| POST | `/api/v1/appointments` | - | Randevu oluştur |
| GET | `/api/v1/appointments` | - | Randevu listesi (filtre: status, date, staffId) |
| GET | `/api/v1/appointments/by-phone?phone=XXX` | - | Telefonla randevu sorgula |
| GET | `/api/v1/appointments/:id` | - | Randevu detay |
| PATCH | `/api/v1/appointments/:id/confirm` | Admin | Randevu onayla |
| PATCH | `/api/v1/appointments/:id/cancel` | Admin | Randevu iptal et |
| PATCH | `/api/v1/appointments/:id/complete` | Admin | Randevu tamamlandı |

## Klasör Yapısı

```
kuaforz-randevu/
├── src/                        # Backend
│   ├── config/                 # Firebase + env config
│   ├── controllers/            # HTTP handlers
│   ├── middleware/              # Auth, error handler, rate limiter
│   ├── repositories/           # Firestore data access
│   ├── routes/
│   │   └── v1/                 # API v1 route'ları
│   ├── schemas/                # Zod validation
│   ├── services/               # Business logic
│   ├── types/                  # TypeScript types
│   ├── utils/                  # Logger, errors, asyncHandler
│   ├── app.ts                  # Express app
│   └── server.ts               # Entry point
├── client/                     # Frontend
│   └── src/
│       ├── components/
│       │   ├── admin/          # StaffForm, ServiceForm
│       │   ├── booking/        # ServiceSelect, StaffSelect, DatePicker, SlotPicker, ...
│       │   └── ui/             # Layout, Toast
│       ├── hooks/              # useApi, useAuth, useRealtimePolling, ...
│       ├── pages/
│       │   └── admin/          # Dashboard, Appointments, Staff, Services, Login
│       ├── schemas/            # Client-side validation
│       ├── styles/             # globals.css
│       └── types/              # Client types
├── firestore.indexes.json      # Composite indexes
├── firestore.rules             # Security rules
├── .env.example                # Environment template
└── package.json
```

## Özellikler

- 🌙 **Dark theme**: Tüm sayfalarda tutarlı koyu tema
- 📱 **Responsive**: Mobil, tablet ve masaüstü uyumlu
- 🔒 **Concurrent booking**: Firestore transaction ile çift rezervasyon engelleme
- ⚡ **Real-time**: Admin dashboard canlı güncelleme (polling)
- 🔑 **Soft delete**: Personel ve hizmetler için silme yerine pasifleştirme
- 📋 **Multi-step booking**: 5 adımlı randevu alma akışı

## Admin Girişi

- Varsayılan şifre: `1234`
- URL: http://localhost:5173/admin/login
- Değiştirmek için: `.env` dosyasında `ADMIN_PASSWORD_HASH` değerini yeni şifrenin SHA-256 hash'i ile güncelleyin
