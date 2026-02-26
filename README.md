# Red Crescent Araihazar Unit — Public Site + Admin Dashboard

এই ZIP এর ভিতরে ৩টা ফোল্ডার আছে:

- `public/` → পাবলিক ওয়েবসাইট (Home, কার্যক্রম, সদস্য, নিয়মাবলী, Apply, Contact, Announcements)
- `admin/` → এডমিন সাইট (Login + Dashboard)
- `assets/` → shared CSS/JS

## ✅ Tech
- Firebase Authentication (Email/Password)
- Cloud Firestore (Database)
- Cloudinary (Images) — Unsigned upload preset

## 1) Firebase সেটআপ
1. Firebase Console → Authentication → Sign-in method → **Email/Password ON**
2. Firestore Database enable করুন

### Admin Access (IMPORTANT)
Admin panel ব্যবহার করতে হলে আপনার UID কে `admins` collection এ রাখতে হবে:

Firestore → Data → Start collection → `admins`
- Document ID: আপনার `uid`
- Fields: (optional) `email: "..."`

> UID দেখার উপায়: `admin/login.html` এ Create Account করলে browser console এ UID দেখায়।

## 2) Firestore Rules (Recommended)
Firestore → Rules এ নিচের rules দিন:

```js
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {

    function isAdmin() {
      return request.auth != null &&
        exists(/databases/$(database)/documents/admins/$(request.auth.uid));
    }

    match /site/{doc} { allow read: if true; allow write: if isAdmin(); }
    match /activities/{id} { allow read: if true; allow write: if isAdmin(); }
    match /announcements/{id} { allow read: if true; allow write: if isAdmin(); }
    match /members/{id} { allow read: if true; allow write: if isAdmin(); }

    match /applications/{id} {
      allow create: if true;
      allow read, update, delete: if isAdmin();
    }

    match /admins/{uid} {
      allow read, write: if isAdmin();
    }
  }
}
```

## 3) Cloudinary সেটআপ
- Cloud name: `dqe832ooh`
- Upload preset: `yrxhbi0` (Unsigned)

> API Secret কখনোই front-end এ রাখবেন না।

## 4) Run (Local)
এগুলো static files, তাই simple server চালালেই হবে।

### Option A (VS Code Live Server)
- project folder open → `public/index.html` run

### Option B (Python http server)
Project folder এ terminal:
```bash
python -m http.server 8000
```
Then open:
- Public: http://localhost:8000/public/index.html
- Admin:  http://localhost:8000/admin/login.html

## 5) Content locations
- Home: `site/home`
- Rules: `site/rules`
- Contact: `site/contact`
- Activities: `activities`
- Members: `members`
- Applications: `applications` (Apply form থেকে আসে)
- Announcements: `announcements`

---
Generated: 2026-02-25
