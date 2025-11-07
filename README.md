# 🪩 EventHub App

**EventHub** is a full-stack event management platform built with **React**, **Firebase**, and **Tailwind CSS**.  
It lets users create, browse, and manage community events with secure authentication and real-time Firestore data.

---

## 🚀 Features

- 🔐 **Firebase Authentication** — Login & Signup with secure Firebase Auth  
- 🏠 **Dashboard & Home Page** — User-friendly interface with Tailwind styling  
- 📅 **All Events Page** — Search, filter, and view all public or private events  
- ✏️ **Create / Edit / Delete Events** — Logged-in users can manage their own events  
- 🖼️ **Event Details Page** — Displays full event info with owner-only controls  
- 📱 **Responsive Design** — Optimized for mobile and desktop using Tailwind CSS  
- 🧭 **Clean Navigation** — Gradient NavBar, animated buttons, and sticky header  
- ⚡ **Real-time Firestore Integration** — Data instantly reflects updates  
- 🧾 **Toast Notifications** — React-Toastify feedback for actions  

---

## 🧰 Tech Stack

| Layer | Technology |
|-------|-------------|
| Frontend | React (Vite), React Router, Tailwind CSS |
| Backend | Firebase Firestore, Firebase Authentication |
| Notifications | React Toastify |
| Deployment | GitHub + (Optional: Vercel / Firebase Hosting) |

---

## 🛠️ Installation

### Clone the repository

git clone https://github.com/Pmaan01/EventHubApp.git
cd EventHubApp
npm install
npm run dev
The app will be available at:  
👉 [http://localhost:5173](http://localhost:5173)

---

## 🔧 Firebase Setup

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project called **EventHub**
3. Enable **Authentication → Email/Password**
4. Enable **Firestore Database**
5. Copy your Firebase configuration and update your `firebase.js` file:

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

## 📸 Screenshots
<img width="1887" height="1000" alt="Landing" src="https://github.com/user-attachments/assets/7c41f201-2462-420e-9387-ff0c1470c777" />
<img width="1881" height="952" alt="login" src="https://github.com/user-attachments/assets/b4f16c20-8629-4c94-8462-3862de9b6003" />
<img width="1871" height="982" alt="SignUp" src="https://github.com/user-attachments/assets/540f2512-2310-4877-9b2e-077ea47cc952" />
<img width="1767" height="927" alt="Home" src="https://github.com/user-attachments/assets/f3d8dc8f-2da7-41db-bbcb-1adcc67bff4a" />
<img width="1916" height="988" alt="AllEvents" src="https://github.com/user-attachments/assets/f7b7465a-4a4f-460d-add9-1f1e8557a9ae"/>
<img width="1707" height="1021" alt="CreateEvents" src="https://github.com/user-attachments/assets/69e5d9ea-6eb1-4c3b-a218-dc26b9b698a0" />


---

## 🧑‍💻 Branches Overview

| Branch | Purpose |
|--------|----------|
| `main` | Stable, production-ready build |
| `feature/auth-pages` | Login/Signup UI with Firebase |
| `feature/create-event` | Event creation, details, and CRUD |
| `feature/dashboard-and-delete` | Dashboard, All Events, Delete feature |

## 🌟 Author
Parveen Kaur Maan
📍 Canada
🔗 LinkedIn
