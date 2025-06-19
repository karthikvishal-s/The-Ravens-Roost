<h1 align="center">🌐 LG Connect – Intelligent Communication, Reinvented</h1>

<p align="center">
  <i>A real-time AI-integrated chat platform built during my summer internship at LG.</i><br><br>
  <strong>Next-generation communication</strong> powered by <code>React</code>, <code>Node.js</code>, <code>Socket.IO</code> & <code>OpenAI</code>
</p>

---

## 📸 Screenshots

| Welcome Page | Sign In / Sign Up | AI Assistant |
|--------------|-------------------|--------------|
| ![Welcome](docs/screenshots/welcome.png) | ![Auth](docs/screenshots/auth.png) | ![AI Assistant](docs/screenshots/ai.png) |

---

## ✨ Features

- 💬 Real-time messaging using **Socket.IO**
- 🤖 AI-powered assistant responses via **OpenAI GPT**
- 🔐 Secure **JWT-based** authentication
- 📱 Mobile-first **responsive design**
- 🎨 Clean and elegant UI with **Tailwind CSS**
- 🔄 Live typing indicators and message sync
- 🖼️ Profile picture upload support
- 🌍 Works across platforms and devices

---

## 🛠️ Tech Stack

### 🔹 Frontend
- **React.js** – UI library
- **Tailwind CSS** – Utility-first styling
- **Zustand** – Lightweight state management
- **Axios** – HTTP requests
- **Socket.IO Client** – Real-time communication

### 🔹 Backend
- **Node.js & Express.js** – RESTful API server
- **Socket.IO** – Real-time backend support
- **MongoDB** – NoSQL database
- **JWT** – Authentication strategy
- **OpenAI API** – AI Assistant integration

---

## 🚀 Local Development Setup

### 🔧 Prerequisites

Make sure you have the following installed:
- [Node.js](https://nodejs.org/) (v18 or above)
- [MongoDB](https://www.mongodb.com/) (local or Atlas)
- [OpenAI API key](https://platform.openai.com/)
- Git

### ⚙️ Quick Start

```bash
# 1. Clone the repository
git clone https://github.com/yourusername/lg-connect.git
cd lg-connect

# 2. Install dependencies
cd backend && npm install
cd ../frontend && npm install

# 3. Set up environment variables
# Create .env files in both frontend and backend directories

# 4. Run backend server
cd backend
npm start

# 5. Run frontend app
cd ../frontend
npm run dev
