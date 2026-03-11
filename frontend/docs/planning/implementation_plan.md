# Implementation Plan - Saarthi.ai

## Project Overview

**Platform Name:** Saarthi.ai  
**Project Type:** Proof of Concept (PoC)  
**Objective:** Demonstrate an AI Tutor (Agentic AI-based Teaching Assistant)

Building a comprehensive AI-powered educational platform that helps students master technical subjects through intelligent tutoring, code practice, video learning, and personalized progress tracking.

**Target:** Students (college/university level)  
**Subjects:** Digital Signal Processing, Machine Learning, Algorithms, Data Structures  
**Key Differentiator:** Domain-specific AI tutor trained on HMA lab data with RAG capabilities

---

## User Review Required

> [!IMPORTANT]
> **Tech Stack Decisions**
> - **Frontend:** Next.js 14 with TypeScript and Tailwind CSS
> - **Backend:** Node.js with Express, OR would you prefer Python (FastAPI)?
> - **Primary Database:** PostgreSQL for structured data, MongoDB for flexible content
> - **Vector Database:** Pinecone for RAG (requires API key) - alternatives: Weaviate (self-hosted), ChromaDB
> - **LLM Provider:** Google Gemini (you mentioned API key available) vs OpenAI GPT-4
>
> Please confirm these choices or suggest alternatives.

> [!WARNING]
> **Data Access Requirement**
> The Google Drive link you provided requires manual content download and processing:
> - 10+ datasets from HMA lab
> - 500+ videos from Machine Intelligence YouTube channel
> - Handwritten notes (SS, DSP, PR, MBSA)
> - Solved exercises and computer assignments
>
> **Action needed:** Grant access or download materials to process for RAG system.

> [!IMPORTANT]
> **Scope Clarification**
> This implementation plan covers the full-stack development. Given the complexity, should we:
> 1. **Option A:** Build MVP with core features first (AI Chat + Video Library + Basic Progress)
> 2. **Option B:** Complete all features in phases (Design → Core Features → Advanced Features)
> 3. **Option C:** Focus only on UI/UX design in Figma first, then get approval before coding
>
> Please indicate your preference.

---

## Proposed Changes

### Phase 1: UI/UX Design

#### [NEW] [figma_design_brief.md](file:///C:/Users/kurap/.gemini/antigravity/brain/e92a1e56-3c6a-4df4-905e-834004e072e9/figma_design_brief.md)

Complete design system documentation including:
- Design principles (minimalism, clarity, trust)
- Color palette (light/dark modes)
- Typography system (Inter font)
- Component library specifications
- Page layouts for all screens
- Responsive design guidelines
- Accessibility standards

#### [NEW] [figma_ai_prompts.md](file:///C:/Users/kurap/.gemini/antigravity/brain/e92a1e56-3c6a-4df4-905e-834004e072e9/figma_ai_prompts.md)

Ready-to-use Figma AI prompts for generating:
- Dashboard/Home screen
- AI Chatbot interface
- Code Lab environment
- Video Library
- Quiz interface
- Notes & Resources
- Progress Dashboard
- Mobile responsive views
- Complete component library

**Action:** Use these prompts in Figma AI to generate initial designs, then iterate.

---

### Phase 2: Project Setup & Infrastructure

#### [NEW] Frontend Project Structure

```
c:/Users/kurap/Desktop/code/project/
├── frontend/
│   ├── src/
│   │   ├── app/                 # Next.js 14 app router
│   │   │   ├── (auth)/
│   │   │   │   ├── login/
│   │   │   │   └── signup/
│   │   │   ├── dashboard/
│   │   │   ├── chat/
│   │   │   ├── code-lab/
│   │   │   ├── videos/
│   │   │   ├── notes/
│   │   │   ├── quiz/
│   │   │   └── progress/
│   │   ├── components/          # Reusable components
│   │   │   ├── ui/             # Base UI components
│   │   │   ├── chat/           # Chat-specific
│   │   │   ├── code/           # Code editor
│   │   │   └── layout/         # Layout components
│   │   ├── services/           # API services
│   │   ├── stores/             # Zustand stores
│   │   ├── hooks/              # Custom React hooks
│   │   ├── utils/              # Utilities
│   │   └── types/              # TypeScript types
│   ├── public/                 # Static assets
│   ├── package.json
│   ├── tsconfig.json
│   ├── tailwind.config.ts
│   └── next.config.js
```

**Dependencies:**
- `next` - Framework
- `react`, `react-dom` - UI library
- `typescript` - Type safety
- `tailwindcss` - Styling
- `zustand` - State management
- `@tanstack/react-query` - Server state
- `axios` - HTTP client
- `socket.io-client` - WebSocket
- `monaco-editor` - Code editor
- `react-player` - Video player
- `recharts` - Charts
- `react-markdown` - Markdown rendering
- `katex` - Math rendering
- `prismjs` - Syntax highlighting

#### [NEW] Backend Project Structure

```
c:/Users/kurap/Desktop/code/project/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   ├── database.ts
│   │   │   ├── redis.ts
│   │   │   └── env.ts
│   │   ├── middleware/
│   │   │   ├── auth.ts
│   │   │   ├── validation.ts
│   │   │   └── errorHandler.ts
│   │   ├── routes/
│   │   │   ├── auth.routes.ts
│   │   │   ├── user.routes.ts
│   │   │   ├── content.routes.ts
│   │   │   ├── chat.routes.ts
│   │   │   ├── code.routes.ts
│   │   │   ├── quiz.routes.ts
│   │   │   └── progress.routes.ts
│   │   ├── controllers/
│   │   ├── services/
│   │   │   ├── ai.service.ts
│   │   │   ├── rag.service.ts
│   │   │   └── code.service.ts
│   │   ├── models/
│   │   ├── utils/
│   │   └── app.ts
│   ├── tests/
│   ├── package.json
│   └── tsconfig.json
```

**Dependencies:**
- `express` or `fastify` - Server framework
- `typescript` - Type safety
- `prisma` - PostgreSQL ORM
- `mongoose` - MongoDB ODM
- `ioredis` - Redis client
- `jsonwebtoken` - JWT auth
- `bcryptjs` - Password hashing
- `zod` - Validation
- `langchain` - AI orchestration
- `@pinecone-database/pinecone` - Vector DB
- `openai` or `@google-ai/generativelanguage` - LLM
- `socket.io` - WebSocket
- `bull` - Job queue
- `multer` - File uploads
- `aws-sdk` - S3 integration

---

### Phase 3: Frontend Development

#### Component Development Order

1. **Design System Components**
   - Button, Input, Card, Modal, Dropdown
   - Navigation (Topbar, Sidebar)
   - Loading states, Empty states, Error states

2. **Authentication Pages**
   - Login, Signup, Password Reset
   - Protected route wrapper

3. **Dashboard**
   - Stat cards (study streak, mastery, quizzes)
   - Recent activity timeline
   - Recommended content carousel

4. **AI Chatbot**
   - Chat message components
   - Chat input with suggestions
   - Streaming response handler
   - Source citations display
   - Code block rendering with copy
   - Math equation rendering

5. **Code Lab**
   - Monaco Editor integration
   - Language selector
   - Run button + execution status
   - Output/Console display
   - Test cases panel

6. **Video Library**
   - Video grid with filters
   - Video player with custom controls
   - Progress tracking
   - Annotations/questions overlay
   - Note-taking panel

7. **Notes & Resources**
   - Document grid/list view
   - Search and filters
   - Document viewer (PDF.js)
   - Bookmark functionality
   - Download manager

8. **Quiz Interface**
   - Question display
   - Answer options (MCQ, code, short answer)
   - Timer component
   - Progress indicator
   - Results screen with analytics
   - Review mode

9. **Progress Dashboard**
   - Study streak heatmap
   - Subject performance charts
   - Activity timeline
   - Weak areas recommendations
   - Goals tracker

---

### Phase 4: Backend Development

#### Database Schema Implementation

**PostgreSQL Tables:**
- `users` - User accounts and profiles
- `user_progress` - Learning analytics
- `quiz_attempts` - Quiz submission history
- `study_sessions` - Time tracking
- `bookmarks` - Saved content

**MongoDB Collections:**
- `content` - Notes, videos, assignments
- `quizzes` - Quiz definitions and questions
- `chat_history` - AI conversation logs

**Vector Database:**
- Embeddings of all educational content
- Metadata for filtering (subject, topic, difficulty)

#### API Endpoints Implementation

Implement 30+ endpoints as detailed in [technical_architecture.md](file:///C:/Users/kurap/.gemini/antigravity/brain/e92a1e56-3c6a-4df4-905e-834004e072e9/technical_architecture.md):

- Authentication (7 endpoints)
- User management (6 endpoints)
- Content (7 endpoints)
- AI Chat (6 endpoints)
- Code execution (4 endpoints)
- Quizzes (6 endpoints)
- Videos (4 endpoints)
- Progress/Analytics (7 endpoints)

#### AI/RAG System Implementation

1. **Content Ingestion Pipeline**
   - Extract text from PDFs, videos (transcripts), handwritten notes (OCR)
   - Chunk content into semantic segments
   - Generate embeddings using OpenAI/Google API
   - Store in Pinecone with metadata

2. **RAG Query Pipeline**
   - Convert user question to embedding
   - Similarity search in vector DB
   - Retrieve top-k relevant documents
   - Build context-enriched prompt
   - Generate response with LLM
   - Add source citations

3. **Code Execution Service**
   - Docker-based sandboxed environment
   - Support for Python, Java, C++, JavaScript
   - Resource limits (CPU: 1 core, Memory: 512MB, Time: 10s)
   - Input/output handling
   - Error capture and formatting

---

### Phase 5: Integration & Features

#### Real-time Features
- WebSocket connection for chat streaming
- Live code collaboration (optional)
- Real-time progress updates
- Notifications

#### File Management
- Upload handwritten notes/assignments
- Store in S3/GCS
- Generate presigned URLs for secure access
- Thumbnail generation for previews

#### Progress Tracking
- Track video watch time (auto-save every 30s)
- Calculate mastery levels based on quiz performance
- Study streak calculation
- Weak area detection algorithm

#### Search & Recommendations
- Full-text search across content
- Semantic search using vector similarity
- Personalized recommendations based on:
  - Current studying topics
  - Quiz performance
  - Viewing history
  - Similar user behaviors

---

## Verification Plan

### Automated Tests

#### Frontend Tests
```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Run unit tests (React Testing Library + Jest)
npm run test

# Run E2E tests (Playwright)
npm run test:e2e

# Test coverage
npm run test:coverage
```

**Test Coverage:**
- Component rendering tests
- User interaction tests (clicks, form submissions)
- API integration tests (mocked)
- State management tests

#### Backend Tests
```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Run unit tests
npm run test

# Run integration tests (with test database)
npm run test:integration

# API endpoint tests
npm run test:api
```

**Test Coverage:**
- Authentication flow tests
- API endpoint tests (all routes)
- Database operation tests
- Service layer unit tests
- Middleware tests

#### AI/RAG Tests
```bash
# Test RAG retrieval accuracy
npm run test:rag

# Test LLM response quality
npm run test:ai
```

### Manual Verification

#### 1. Design Verification
- [ ] Open Figma designs generated from AI prompts
- [ ] Verify color palette matches specification
- [ ] Check typography hierarchy is consistent
- [ ] Validate responsive layouts for mobile/tablet/desktop
- [ ] Ensure accessibility (contrast ratios, focus states)

#### 2. Authentication Flow
1. Go to `http://localhost:3000/signup`
2. Create new account with valid email
3. Verify email validation works
4. Sign up successfully
5. Logout
6. Login with created credentials
7. Verify JWT token is stored
8. Test protected route access
9. Test password reset flow

#### 3. AI Chat Functionality
1. Navigate to `/chat`
2. Type question: "Explain Fourier Transform"
3. Verify AI response appears with streaming effect
4. Check source citations are displayed
5. Click on a source to view original content
6. Test code block rendering (ask: "Write a Python binary search")
7. Test copy button on code blocks
8. Submit feedback (thumbs up/down)
9. Create new chat session
10. Verify chat history is saved

#### 4. Code Lab Testing
1. Navigate to `/code-lab`
2. Select language: Python
3. Write sample code:
   ```python
   def hello():
       print("Hello, World!")
   hello()
   ```
4. Click "Run" button
5. Verify output appears: "Hello, World!"
6. Test with syntax error and verify error display
7. Test timeout (infinite loop)
8. Save code snippet and verify it's saved

#### 5. Video Learning
1. Navigate to `/videos`
2. Browse video library
3. Click on a video to play
4. Verify progress bar updates
5. Test speed controls (0.5x, 1x, 1.5x, 2x)
6. Bookmark a video
7. Check video appears in "Continue Watching"
8. Watch to 95% completion
9. Verify it's marked as completed

#### 6. Quiz System
1. Navigate to `/quiz`
2. Select a quiz (e.g., "DSP Chapter 1")
3. Start quiz
4. Answer questions
5. Verify timer counts down
6. Submit quiz
7. View results screen
8. Check score calculation is correct
9. Review incorrect answers
10. Verify recommendations are relevant

#### 7. Progress Dashboard
1. Navigate to `/progress`
2. Verify study streak displays correctly
3. Check subject performance charts
4. View recent activity timeline
5. Check weak areas recommendations
6. Set a learning goal
7. Verify goal progress updates

### Performance Testing

```bash
# Frontend build size check
cd frontend
npm run build
npm run analyze  # Check bundle size

# Backend load testing (Apache Bench)
ab -n 1000 -c 10 http://localhost:8000/api/content

# Lighthouse performance audit
npm run lighthouse
```

**Performance Targets:**
- First Contentful Paint: < 1.5s
- Largest Contentful Paint: < 2.5s
- Time to Interactive: < 3.5s
- API response time: < 200ms (p95)
- AI response time: < 5s
- Code execution: < 10s

### Browser Compatibility

Test on:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile Safari (iOS)
- Chrome Mobile (Android)

### Accessibility Testing

```bash
# Run axe accessibility tests
npm run test:a11y

# Manual keyboard navigation testing
# (Tab through entire interface)
```

---

## Next Steps

1. **Get User Approval** on:
   - Tech stack choices
   - Scope (MVP vs Full Feature Set)
   - Data access for RAG system
   - Figma design direction

2. **Priority Order:**
   - If **Option C selected:** Focus on Figma designs first
   - If **Option A/B selected:** Set up project structure and begin development

3. **Access Requirements:**
   - Google Drive access for content
   - API keys (Gemini/OpenAI, Pinecone)
   - Database credentials (will set up)
   - S3/GCS bucket (will create)

---

## Estimated Timeline

### Design Phase (Option C)
- Week 1-2: Complete Figma designs
- Review and iterate based on feedback

### MVP Development (Option A)
- Week 1: Project setup + Authentication
- Week 2-3: AI Chat + RAG integration
- Week 4: Video Library
- Week 5: Basic Progress Dashboard
- Week 6: Testing + Deployment

### Full Development (Option B)
- Month 1: Design + Core Features
- Month 2: Advanced Features
- Month 3: Testing + Polish + Deployment

---

> **Ready to proceed?** Please review this plan and provide feedback on the key decisions outlined above.
