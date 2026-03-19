# DevConnect AI

DevConnect AI is a full-stack web application that allows developers to analyze GitHub repositories and interact with them using AI-powered chat.
 
It supports multiple LLM providers (like Gemini and OpenAI) and enables users to securely store their API keys and have contextual conversations about their code.

## ✨ Features

🔐 JWT Authentication (Register/Login)

🔑 Secure API key storage (encrypted)

🤖 Multi-LLM support (Gemini, OpenAI)

📊 AI-powered repository analysis

💬 Context-aware chat with memory

🧠 Persistent chat sessions (stored in DB)

🎨 Modern UI with React + TypeScript

📝 Markdown rendering + code highlighting

## 🏗 Tech Stack
### Backend ->
 ```
Django

Django REST Framework

JWT (SimpleJWT)

SQLite (default, can upgrade)
```
### Frontend
```
React (TypeScript)

Tailwind CSS

Axios
```
AI
```
Google Gemini API

OpenAI API (optional)
```
## ⚙️ Setup Instructions
### 1️⃣ Clone the Repository
```
git clone https://github.com/your-username/devconnect-ai.git
cd devconnect-ai
```
### 2️⃣ Backend Setup
```
cd backend

#Create virtual environment#
python -m venv .venv
.venv\Scripts\activate  # Windows
```
#### Install dependencies
```
pip install -r requirements.txt
```
#### run migrations
```
python manage.py migrate
```
#### Start server
```
python manage.py runserver
```
### 3️⃣ Frontend Setup
```
cd frontend

npm install
npm run dev
```
#### Frontend runs on:

http://localhost:5173

#### Backend runs on:

http://127.0.0.1:8000

___

### 🔑 Environment Variables

Create a .env file in backend:
~~~
SECRET_KEY=your_django_secret_key
ENCRYPTION_KEY=your_encryption_key
~~~
---
### 🧠 How It Works
---
```
User logs in and saves their LLM API key

User submits a GitHub repository URL

Backend analyzes the repo using selected LLM

A chat session is created with initial analysis

User continues conversation with AI about the repo
```
### 📡 API Endpoints (Basic)
```
POST   /api/token/           → Login
POST   /api/register/        → Register
POST   /api/save-keys/       → Save API keys
POST   /api/ai/analyze/      → Analyze repo
POST   /api/ai/chat/         → Send chat message
GET    /api/ai/chat/<id>/    → Get chat history
```

### 🚀 Future Improvements

Streaming AI responses

GitHub repo deep parsing (files, README, structure)

Chat history sidebar

Deployment (Render/Vercel)

Team collaboration features

### 📌 Notes

API keys are encrypted before storage

Supports multiple LLM providers via abstraction layer

Designed with scalability and clean architecture in mind
