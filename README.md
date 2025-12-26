

<h1 align="center">🌿 MiniTree</h1>

<p align="center">
  <strong>The minimalist way to share your digital world.</strong>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React">
  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript">
  <img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite">
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind">
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="Node.js">
</p>

---

### ✨ Overview

MiniTree is a sleek, modern, and lightweight Linktree alternative designed for users who value simplicity and aesthetics. Consolidate your social media links, portfolios, and projects into a single, beautiful landing page.

### 🚀 Key Features

- 🔐 **Secure Auth**: Robust signup and login system using BCrypt hashing.
- 🔗 **Link Management**: Easily **add**, **update**, and **delete** links from your dashboard.
- � **Link Deactivation**: Temporarily hide links from your profile without deleting them using the **toggle** feature.
- 🛠️ **Lightweight Backend**: Efficient Node/Express server with Lowdb for a serverless-ready feel.

---
Demo
<img width="1357" height="537" alt="Screenshot from 2025-12-26 20-13-21" src="https://github.com/user-attachments/assets/e0e91ad3-a10e-4a17-a297-5a2c504bc938" />
---

### 🛠️ Tech Stack

| Frontend | Backend |
| :--- | :--- |
| **React 19** (Concurrent Mode) | **Node.js** & **Express 5** |
| **TypeScript** (Strict Mode) | **Lowdb** (JSON-driven DB) |
| **Tailwind CSS v4** | **BCrypt** (Security) |
| **Framer Motion** (Coming Soon) | **UUID** (ID Generation) |

---

### 🏃 Quick Start

Get your own MiniTree up and running in minutes.

#### 1. Clone & Enter
```bash
git clone <repository-url>
cd MiniTree
```

#### 2. Fire up the Core (Backend)
```bash
cd server
pnpm install
pnpm run dev
```
> 🌐 Server: `http://localhost:8080`

#### 3. Launch the Interface (Frontend)
```bash
cd client
pnpm install
pnpm run dev
```
> 🚀 Client: `http://localhost:5173`

---

### 📂 Architecture

```bash
MiniTree/
├── 📱 client/         # React + Vite Frontend
│   └── src/           # Component-based logic
├── ⚙️ server/         # Express Backend
│   └── src/           # API & Database handlers
└── 📄 docs/           # Project Assets
```

---

<p align="center">
  Made with ❤️ by Zoro
</p>
