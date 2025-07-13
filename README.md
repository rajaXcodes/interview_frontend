# ⚡️ AlgoMentor

**AlgoMentor** is an AI-powered mock technical interview platform designed for **students, developers, and job-seekers** who want to **practice Data Structures & Algorithms (DSA) interviews** in a realistic environment. It helps you gain confidence, improve problem-solving skills, and get AI-powered feedback — all while being proctored like a real tech interview!

---

## 🚀 Features

✅ **Realistic Mock Interviews**  
Simulate technical coding rounds just like top tech companies.

✅ **Monaco IDE Integration**  
Write, run, and test code inside a powerful in-browser code editor.

✅ **Strict Proctoring**  
- ❌ **No copy, cut, or paste** allowed inside the IDE.
- 🚫 **No tab switching** — get warned if you try.
- ⚠️ **Fullscreen exit warning** — stay focused.
- 📷 **Live video feed** to replicate real interview conditions.

✅ **AI-Powered Feedback**  
After each session, receive smart, actionable feedback from the AI mentor to improve your coding, problem-solving, and communication.

✅ **Speech-to-Text + Text-to-Speech**  
Answer and interact naturally — your voice is converted to text, and the AI responds with realistic TTS using the Puter unofficial HTML kit.

✅ **Secure Authentication**  
JWT-based authentication to keep your sessions secure.

✅ **Modern Tech Stack**  
React + Vite + TypeScript frontend. Node.js + Express backend. CORS handled for safe API calls.

---

## 🛠️ Tech Stack

**Frontend:**
- React
- Vite
- TypeScript
- Tailwind CSS
- Monaco Editor
- JWT (for auth)
- Speech Recognition & TTS integrations

**Backend:**
- Node.js
- Express
- CORS
- JSON Web Tokens (`jsonwebtoken`)
- Body Parser
- Morgan (logging)
- Dotenv for environment variables

---

## 📸 Screenshots

Here are some previews of AlgoMentor in action:

## 📸 Demo Screenshots

![Screenshot 2025-07-13 140414](images/Screenshot202025-07-1320140414.png)
![Screenshot 2025-07-13 142752](images/Screenshot202025-07-1320142752.png)
![Screenshot 2025-07-13 142825](images/Screenshot202025-07-1320142825.png)
![Screenshot 2025-07-13 142854](images/Screenshot202025-07-1320142854.png)
![Screenshot 2025-07-13 142942](images/Screenshot202025-07-1320142942.png)
![Screenshot 2025-07-13 144350](images/Screenshot202025-07-1320144350.png)
![Screenshot 2025-07-13 144645](images/Screenshot202025-07-1320144645.png)
![Screenshot 2025-07-13 144718](images/Screenshot202025-07-1320144718.png)




---

## ⚙️ Setup Instructions

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/your-username/algomentor.git
cd algomentor
````

---

### 2️⃣ Install Dependencies

**Frontend:**

```bash
cd client
npm install
```

**Backend:**

```bash
cd server
npm install
```

---

### 3️⃣ Set up `.env`

Create a `.env` file in `/server` and add:

```env
PORT=4000
JWT_SECRET=your_secret_key
```

---

### 4️⃣ Run the Development Servers

**Frontend:**

```bash
cd client
npm run dev
```

**Backend:**

```bash
cd server
npm run start
```

---

### 5️⃣ Access

Open your browser at [http://localhost:5173](http://localhost:5173) (or your Vite dev port).

---

## ✨ How It Works

1. **Register/Login:** Secure JWT-based authentication.
2. **Start Interview:** Get a random DSA question.
3. **Speak & Code:** Answer via speech, code in Monaco IDE.
4. **Proctoring:** No copy/cut/paste, no tab switching, fullscreen enforced — monitored like a real tech round.
5. **AI Feedback:** Get improvement tips right after submission.
6. **Repeat:** Practice and level up your DSA skills!

---

## 📜 Scripts

**Frontend:**

* `npm run dev` — Start Vite dev server
* `npm run build` — Build for production

**Backend:**

* `npm start` — Start Express server

---

## 📢 Who Should Use This?

**AlgoMentor** is built for:

* 📚 Students preparing for coding rounds.
* 👨‍💻 Developers brushing up on DSA.
* 🎯 Anyone wanting realistic mock interviews with strict proctoring & real-time AI feedback.

---

## ❤️ Credits

Built with:

* [React](https://react.dev/)
* [Vite](https://vitejs.dev/)
* [Node.js](https://nodejs.org/)
* [Express](https://expressjs.com/)
* [Monaco Editor](https://microsoft.github.io/monaco-editor/)
* [Puter TTS](https://puter.com/)
* [react-speech-recognition](https://www.npmjs.com/package/react-speech-recognition)

---

## 📄 License

MIT — feel free to fork & contribute!

---

## 🔗 Connect

**Author:** \[RAJA]
**GitHub:** [your-username](https://github.com/rajaXcodes)

---

**Practice confidently, code smartly — ace your next tech interview with *AlgoMentor*! 🚀**

```
