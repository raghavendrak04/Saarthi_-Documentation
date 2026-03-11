# Saarthi.ai Dashboard - Documentation & Frontend App

🚀 **Live Deployment Demo**: [https://raghavendrak04.github.io/Saarthi_-Documentation/](https://raghavendrak04.github.io/Saarthi_-Documentation/)

Saarthi.ai is an Agentic AI-based Teaching Assistant designed to revolutionize technical education in domains such as Machine Intelligence, Signal Processing, and Computer Science. Unlike generic AI assistants, Saarthi.ai is purpose-built with domain-specific knowledge to provide superior learning experiences.

## Planning Reports (Version 0)

You can find the deep-analyzed documentation and architecture design components inside the `planning version 0` folder in this repository:
1. `STAGE1_PLANNING_AND_REQUIREMENTS.md` - Overall goals, resources, timelines, and quantitative metrics of the project.
2. `STAGE2_REQUIREMENTS_SPECIFICATION.md` - Complete and deep detailed functional and technical requirements specifications. 
3. `STAGE3A_HIGH_LEVEL_DESIGN.md` - Monolithic Express architecture mapping and REST/WebSocket API patterns.
4. `STAGE3B_LOW_LEVEL_DESIGN.md` - Database document schema design, specific component patterns, and frontend/backend integration specs.

## Frontend Demo & App (Version 1)

This repository also contains the complete source code for our **Saarthi frontend demo**. It is built with:
- React 18 & Vite
- TypeScript
- Vanilla CSS + Custom Design System
- Zustand (Global State Management)
- React Router DOM v7
- Lucide React (Icons)

### Key Features Implemented:
- Modern glassmorphic user interface
- End-to-end Dashboard featuring Course Catalogs, Statistics, and "Up Next" modules.
- Course Details page with dynamic Student/Instructor filtering (Classwork, Stream, and hidden People tabs).
- Full Light / Dark / Auto system theme integration powered by local storage and custom CSS variables.
- AI Chatbot pop-up capable of persistent UI presence across the entire site.

### To Run Locally:
```bash
# Clone the repo
git clone https://github.com/raghavendrak04/Saarthi_-Documentation.git
cd Saarthi_-Documentation

# Install dependencies
npm install

# Start development server
npm run dev
```
