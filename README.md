# ⚡️ AlgoMentor

**AlgoMentor** is an AI-powered mock technical interview platform designed for **students, developers, and job-seekers** who want to **practice Data Structures & Algorithms (DSA) interviews** in a realistic environment. Gain confidence, improve problem-solving skills, and get AI-powered feedback — all while being proctored like a real tech interview!

---

## 📑 Table of Contents

* [🚀 Features](#-features)
* [🛠️ Tech Stack](#️-tech-stack)
* [📸 Demo Screenshots](#-demo-screenshots)
* [⚙️ Setup Instructions](#️-setup-instructions)

  * [1️⃣ Clone the Repository](#1️⃣-clone-the-repository)
  * [2️⃣ Install Dependencies](#2️⃣-install-dependencies)
  * [3️⃣ Set up .env](#3️⃣-set-up-env)
  * [4️⃣ Run the Development Servers](#4️⃣-run-the-development-servers)
  * [5️⃣ Access](#5️⃣-access)
* [✨ How It Works](#-how-it-works)
* [📜 Scripts](#-scripts)
* [📢 Who Should Use This?](#-who-should-use-this)
* [❤️ Credits](#️-credits)
* [📄 License](#-license)
* [🔗 Connect](#-connect)

---

## 🚀 Features

✅ **Realistic Mock Interviews**
Simulate technical coding rounds like top tech companies.

✅ **Monaco IDE Integration**
Write, run, and test code in a powerful in-browser code editor.

✅ **Strict Proctoring**

* ❌ No copy, cut, or paste.
* 🚫 No tab switching — instant warnings.
* ⚠️ Fullscreen exit warning.
* 📷 Live video feed for realistic conditions.

✅ **AI-Powered Feedback**
Smart, actionable feedback on your coding, problem-solving, and communication.

✅ **Speech-to-Text + Text-to-Speech**
Speak naturally — your voice converts to text and the AI mentor responds with realistic TTS.

✅ **Secure Authentication**
JWT-based login for secure sessions.

✅ **Modern Tech Stack**
React + Vite + TypeScript frontend. Node.js + Express backend. CORS handled for safe API calls.

---

## 🛠️ Tech Stack

**Frontend:**

* React
* Vite
* TypeScript
* Tailwind CSS
* Monaco Editor
* JWT (auth)
* Speech Recognition & TTS integrations

**Backend:**

* Node.js
* Express
* CORS
* JSON Web Tokens (`jsonwebtoken`)
* Body Parser
* Morgan (logging)
* Dotenv

---

## 📸 Demo Screenshots

Here’s AlgoMentor in action:

<div align="center">
  <img width="1913" height="965" alt="Hero Page" src="https://github.com/user-attachments/assets/3d62f533-1bd8-421c-a195-925e0ce0deaa" />
  <p><em>Hero Page</em></p>

  <img src="src/images/Screenshot 2025-07-13 140414.png" width="1913" height="965" />
  <p><em>Main interview interface with chat, video, and code editor</em></p>
</div>

<div align="center">
  <img src="src/images/Screenshot 2025-07-13 142752.png" width="500" />
  <p><em>Login Page</em></p>

  <img src="src/images/Screenshot 2025-07-13 142825.png" width="500" />
  <img src="src/images/Screenshot 2025-07-13 142854.png" width="500" />
  <p><em>Pre-Interview Instruction Page</em></p>

  <img src="src/images/Screenshot 2025-07-13 142942.png" width="500" />
  <img src="src/images/Screenshot 2025-07-13 144350.png" width="500" />
  <p><em>Interview Page</em></p>


  <img src="src/images/Screenshot 2025-07-13 144645.png" width="500" />
  <img src="src/images/Screenshot 2025-07-13 144718.png" width="500" />
  <p><em>Feedback Page</em></p>
</div>


---

## ⚙️ Setup Instructions

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/rajaXcodes/algomentor.git
cd algomentor
```

---

### 2️⃣ Install Dependencies

**Frontend:**

```bash
npm install
```

**Backend:**

```bash
npm install
```

---

### 3️⃣ Set up `.env`

FOR BACKEND

```env

```
OPENROUTERAPI = 
SECRETKEY = 
PORT = 
FRONTEND_URL = 
---

### 4️⃣ Run the Development Servers

**Frontend:**

```bash
npm run dev
```

**Backend:**

```bash
npm start
```

---

### 5️⃣ Access

Visit [http://localhost:5173](http://localhost:5173)

---

## ✨ How It Works

1. **Register/Login:** Secure JWT auth.
2. **Start Interview:** Get random DSA questions.
3. **Speak & Code:** Answer by voice, code in Monaco.
4. **Proctoring:** Strict controls — no copy/cut/paste, no tab switch.
5. **AI Feedback:** Instant smart tips.
6. **Repeat:** Practice & level up.

---

## 📜 Scripts

**Frontend:**

* `npm run dev` — Vite dev server
* `npm run build` — Build for production

**Backend:**

* `npm start` — Start Express server
* Backend Github link - (https://github.com/rajaXcodes/backed)

---

## 📢 Who Should Use This?

* 📚 Students prepping for coding rounds.
* 👨‍💻 Developers brushing up DSA.
* 🎯 Anyone wanting realistic mocks with strict proctoring & AI feedback.

---

## ❤️ Credits

Built with:

* [React](https://react.dev/)
* [Vite](https://vitejs.dev/)
* [Node.js](https://nodejs.org/)
* [Express](https://expressjs.com/)
* [Monaco Editor](https://microsoft.github.io/monaco-editor/)
* [Puter TTS](https://puter.com/) Special thanks !!
* [react-speech-recognition](https://www.npmjs.com/package/react-speech-recognition)

---

## 📄 License

MIT — Fork, modify, contribute!

---

## 🔗 Connect

**Author:** \[RAJA]
**GitHub:** [rajaXcodes](https://github.com/rajaXcodes)

---

**Practice confidently, code smartly — ace your next tech interview with *AlgoMentor*! 🚀**
