# Saarthi.ai - Next Generation AI Learning Assistant

🚀 **Live Deployment Demo**: [https://raghavendrak04.github.io/Saarthi_-Documentation/](https://raghavendrak04.github.io/Saarthi_-Documentation/)

Welcome to the Saarthi.ai project repository! This repository contains the finalized production frontend codebase for the project.

As requested to prepare for the subsequent active backend collaboration, all frontend source codes, configurations, and static assets have been safely modularized into the `frontend/` directory to maintain a clean project root. Also, all deep planning reports are available in the `planning version 0/` directory.

---

## 🎯 Project Summary

**Saarthi.ai** is an intelligent, AI-centric educational platform structured somewhat similar to Google Classroom but deeply integrated with **RAG LLMs** and **Microservices**. The main features include a contextual chat tutor, digitized video lectures with annotations, embedded coding laboratories, and a course management dashboard with student-teacher communication streams.

This system is purpose-built to help students learn complex technical concepts faster and effectively prepare for exams, tests, and interviews through specialized multi-modal tools.

---

## 📦 Project Versions Explained

This repository currently contains the two fundamental stages of our project implementation:

### Version 0: Deep Planning & Architecture
Located in the `planning version 0/` directory, this version represents our comprehensive foundational blueprint. It contains four highly-detailed analysis reports that break down functional requirements, technical specifications, database schemas, and microservice/monolithic architectural design patterns into deep detail. It serves as the master guide for development operations.

### Version 1: Production Frontend & Demo
Located in the `frontend/` directory, this version is the live, functioning application interface that was built exactly according to the Version 0 plans. It is built using React.js and Vite and contains all fully designed UI pages, state management, routing, and glassmorphic styling conventions. It acts as our fully interactive, user-facing proof-of-concept ready for backend integration!

---

## 📁 Repository Structure

```
├── planning version 0/   # ⬅️ All 4 major deep analysis planning and architecture design docs!
├── frontend/             # ⬅️ All React.js frontend source code lives here!
│   ├── src/
│   │   ├── components/   # Application-wide reusable UI components (Logo, Chatbot)
│   │   ├── pages/        # Fully designed page views (Dashboard, Login, Landing, CourseDetail)
│   │   ├── stores/       # Zustand state management handling user and application states
│   │   ├── App.tsx       # Main router and layout hierarchy
│   │   └── index.css     # Global styles and CSS variable themes
│   ├── public/           # Static icons/assets
│   ├── package.json      # Frontend dependencies
│   └── vite.config.ts    # Bundler and deployment configurations
└── README.md             # This project and backend-integration guide
```

---

## 🛠️ Backend Contributor Guide

If you are a backend engineer taking over for data and microservices integration, here is everything you need to know about the current state of the frontend and where you need to plug in.

### 1. State Management (Auth)
The application currently uses mocked data and state stored locally via **Zustand** (located in `frontend/src/stores/auth.store.ts`). 
* **Your Task**: Implement a JWT-based authentication microservice. You'll need to update the `auth.store.ts` file to execute standard POST requests to your `/login` and `/signup` endpoints, and securely save the JWT in Axios headers.

### 2. Frontend-Backend Communication Patterns
The frontend design anticipates a microservice backend utilizing three predominant communication protocols:
- **REST APIs (Primary):** Fetching and updating Course Details, Stream Announcements, Student Quizzes, Profile data, and Assignments. 
- **WebSockets (Real-time AI Chat):** The persistent floating AI Chatbot component (`frontend/src/components/AIChatbot.tsx`) expects to connect to a streaming Python/FastAPI backend endpoint to type out streaming responses derived from the custom course RAG vectors.
- **Server-Sent Events (SSE):** The Code Editor laboratory is mapped out to stream execution inputs/outputs live from an isolated container execution microservice using SSE.

### 3. Key Database Entities Expected
To populate the UI dynamically, your database schema (e.g., MongoDB) should map standard JSON endpoints for the following:
- **Users**: Roles for `admin` (Teacher) vs `student`.
- **Courses**: Contains topics, students enrolled, and a customized course color/icon.
- **Stream/Classwork Items**: Assignments, Materials, Videos, and general announcements tightly associated with a Course ID.

---

## 🚀 Running the Frontend Locally

To run the React application to verify your backend changes locally:

```bash
# 1. Navigate into the frontend directory
cd frontend

# 2. Install dependencies
npm install

# 3. Start the Vite development server
npm run dev
```

The app will typically run at `http://localhost:5173`.

---

## 🌐 Deployment Note

The frontend contains an automatic build script mapped to the `package.json`. It is currently configured to deploy properly via GitHub Pages.

**Good luck with the backend integration! 🚀**
