import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AppShell from './components/layout/AppShell';
import AIChatbot from './components/AIChatbot';
import LandingPage from './pages/Landing';
import LoginPage from './pages/auth/Login';
import SignupPage from './pages/auth/Signup';
import DashboardPage from './pages/Dashboard';
import CoursesPage from './pages/Courses';
import CourseDetailPage from './pages/CourseDetail';
import ChatPage from './pages/Chat';
import QuizPage from './pages/Quiz';
import CodeLabPage from './pages/CodeLab';
import VideosPage from './pages/Videos';
import VideoPlayerPage from './pages/VideoPlayer';
import ProgressPage from './pages/Progress';
import NotesPage from './pages/Notes';
import SettingsPage from './pages/settings/Settings';
import './stores/settings.store'; // Initialize settings (theme/font) on load

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />

        {/* App Routes (with Sidebar + Topbar layout) */}
        <Route element={<AppShell />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/courses" element={<CoursesPage />} />
          <Route path="/courses/:id" element={<CourseDetailPage />} />
          <Route path="/chat" element={<ChatPage />} />
          <Route path="/quiz" element={<QuizPage />} />
          <Route path="/code-lab" element={<CodeLabPage />} />
          <Route path="/videos" element={<VideosPage />} />
          <Route path="/videos/:id" element={<VideoPlayerPage />} />
          <Route path="/progress" element={<ProgressPage />} />
          <Route path="/notes" element={<NotesPage />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      {/* Global Floating AI Chatbot - visible on all pages */}
      <AIChatbot />
    </BrowserRouter>
  );
}

export default App;
