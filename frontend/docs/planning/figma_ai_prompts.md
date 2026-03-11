# Figma AI Generation Prompts - Educational AI Platform

## How to Use These Prompts

1. Open Figma and create a new design file
2. Use Figma AI (if available) or use these prompts with AI image generation tools
3. Copy the prompts below for each screen/component
4. Refine and iterate based on results
5. Maintain consistency using the design system

---

## 🎨 Master Prompt (Use this as foundation)

```
Design a modern, minimalist educational AI platform UI for students. 
Style: Clean, simple, student-friendly, professional
Color palette: Primary blue (#2563EB), white backgrounds, subtle grays
Typography: Inter font family, clear hierarchy
Layout: Spacious, breathing room, focus on content
Aesthetic: Similar to Notion + Khan Academy + Linear app
Target users: College/university students
Mood: Trustworthy, intelligent, calm, focused
```

---

## 📱 Individual Screen Prompts

### 1. Dashboard / Home Screen

```
Design a modern minimalist dashboard for an educational AI platform targeting students.

LAYOUT:
- Top navigation bar with logo (left), search bar (center), profile icon (right)
- Left sidebar with navigation menu icons and labels
- Main content area with welcome message and Cards grid

CONTENT SECTIONS:
- Welcome header "Welcome back, [Student Name]"
- 4 stat cards showing: Study Streak (7 days), Topics Mastered (12/25), Active Quizzes (3), Watch Time
- "Recent Activity" section with timeline of recent actions
- "Recommended for You" section with 3-4 video cards
- "Continue Learning" section with progress cards

DESIGN STYLE:
- Clean, white background
- Card-based layout with subtle shadows
- Primary blue (#2563EB) accents
- Inter font family
- Rounded corners (12px)
- Ample white space
- Icons: minimalist, line-style (Feather Icons style)

SPECIFIC ELEMENTS:
- Each stat card: icon, number (large), label (small text)
- Video cards: thumbnail (16:9), title, duration badge, progress bar
- Navigation: Dashboard, AI Chat, Code Lab, Videos, Notes, Quiz, Progress icons

Make it feel professional yet friendly, modern and trustworthy.
```

### 2. AI Chatbot Interface

```
Design a modern AI chatbot interface for an educational platform helping students learn technical subjects.

LAYOUT:
- Full screen chat interface
- Left sidebar: Chat history sessions (collapsible)
- Main area: Chat messages centered (max-width 800px)
- Bottom: Input area with text box and send button
- Top: "New Chat" button and settings

CHAT MESSAGES:
- User messages: Blue (#2563EB) bubbles, white text, aligned right, rounded corners (16px 16px 4px 16px)
- AI messages: Light gray background (#F9FAFB), dark text, aligned left, rounded corners (16px 16px 16px 4px)
- AI avatar: Small purple (#8B5CF6) circle with AI icon on left of AI messages
- Include code blocks with syntax highlighting
- Show "Copy" button on code blocks
- Display source citations as small expandable tags

INPUT AREA:
- Multi-line text input with placeholder "Ask anything about your subjects..."
- Send button (paper plane icon) in blue
- Attachment icon button
- Below input: 3-4 suggested prompt chips like "Explain this concept", "Solve this problem"

FEATURES TO SHOW:
- Loading indicator: animated dots when AI is typing
- Timestamp on messages (subtle, small text)
- Thumbs up/down feedback buttons on AI responses
- "Regenerate" button on AI messages

STYLE:
- Minimalist, clean, lots of white space
- Inter font
- Professional but friendly
- Similar to ChatGPT but more student-focused
- Light mode design
```

### 3. Code Development Environment (Code Lab)

```
Design a modern code editor interface for students to practice programming.

LAYOUT:
- Top toolbar with: Language selector dropdown (Python, Java, C++, JavaScript), Theme toggle, Font size controls, prominent "Run" button (green)
- Main area split 50/50: Code editor (left) | Output/Console (right)
- Bottom status bar showing: Language, line:column, encoding

CODE EDITOR PANEL:
- Line numbers on left
- Syntax highlighting (VS Code style)
- Dark background option (#1F2937) with light text
- Light background option (white) with dark text
- Monospace font: JetBrains Mono
- Auto-complete dropdown suggestion (shown as floating box)

OUTPUT PANEL:
- Tabs at top: "Output" | "Console" | "Test Cases"
- White/light background
- Console output in monospace font
- Error messages in red
- Success messages in green
- Clear button (top right)

TOOLBAR BUTTONS:
- Language: Dropdown with icon
- Run: Large, green (#10B981), prominent
- Save: Icon button
- Share: Icon button
- Settings: Icon button

STYLE:
- Professional developer tool aesthetic
- Clean, minimal chrome
- Focus on code area
- Similar to LeetCode or CodePen
- Subtle borders (1px, #E5E7EB)
- Rounded corners minimal (8px)

Show the interface with some sample Python code visible.
```

### 4. Video Library / Learning Hub

```
Design a modern video library interface for educational content.

LAYOUT:
- Top: Search bar (center-prominent) with filter chips below
- Filter chips: "All Subjects", "Signal Processing", "Machine Learning", "Digital Systems", "Recently Watched"
- Grid layout: 3 columns on desktop
- Right sidebar: "Continue Watching" playlist

VIDEO CARDS (design 6 cards):
- Each card shows:
  - Thumbnail image (16:9 aspect ratio) with play icon overlay
  - Duration badge (bottom right of thumbnail): "12:45"
  - Progress bar below thumbnail (if in progress) in blue
  - Title (2 lines max): "Introduction to Fourier Transform"
  - Metadata line: Views • Date • Subject tag
  - Creator/professor name with small avatar
  - Bookmark icon (top right, non-intrusive)

CARD STATES:
- Default: Subtle shadow
- Hover: Lift effect (increased shadow), play button appears
- In Progress: Blue progress bar at bottom
- Completed: Green checkmark badge

SIDEBAR "CONTINUE WATCHING":
- Smaller horizontal cards
- Thumbnail (left), info (right)
- Progress percentage shown

STYLE:
- Clean, white background
- Cards with soft shadows (0px 2px 8px rgba(0,0,0,0.08))
- Blue accents (#2563EB)
- Inter font
- Spacious grid (gaps: 24px)
- Professional, academic feel
- Similar to YouTube + Coursera aesthetic

Include subject category icons: DSP, ML, Algorithms, Data Structures.
```

### 5. Quiz Interface

```
Design a modern quiz/test interface for students.

LAYOUT - QUIZ TAKING VIEW:
- Top: Progress bar showing "Question 5 of 20" in blue (#2563EB)
- Header: Quiz title "Digital Signal Processing - Chapter 3"
- Timer (top right): "15:30 remaining" with clock icon
- Main card (centered, max-width 700px): 
  - Question number badge: "Question 5"
  - Question text (large, readable): "What is the Nyquist sampling theorem?"
  - 4 answer options as large, clickable cards with radio buttons
  - Optional "Hint" button (bottom left, subtle)
- Bottom navigation: "Previous" and "Next" buttons

ANSWER OPTION CARDS:
- Each option in rounded rectangle box
- Radio button (left)
- Answer text (centered)
- Hover state: Blue border
- Selected state: Blue background, white text
- Adequate padding, easy to click

QUIZ RESULTS SCREEN:
- Large score circle in center: "85%" with "Great Job!" message
- Score color: Green (#10B981) if >70%, Amber if 50-70%, Red if <50%
- Below score: 3 stat cards:
  - Correct: 17/20 (green icon)
  - Incorrect: 3/20 (red icon)  
  - Time: 12:30 (clock icon)
- Performance chart: Bar chart showing performance by topic
- Action buttons: "Review Answers" (primary), "Retake Quiz" (secondary), "Back to Dashboard"
- "Recommended Topics" section with suggested study materials

STYLE:
- Clean, focused, distraction-free
- White background
- Blue primary color
- Clear visual hierarchy
- Inter font
- Confidence-inspiring design
- Similar to Brilliant.org or Khan Academy quizzes

Make it feel encouraging and supportive, not stressful.
```

### 6. Notes & Resources Library

```
Design a modern notes and resources library interface for students.

LAYOUT:
- Top toolbar:
  - Search bar (prominent)
  - Filter dropdown: "Subject" (DSP, ML, Algorithms, etc.)
  - Sort dropdown: "Recent", "A-Z", "Popular"
  - View toggle: Grid/List icons
- Left sidebar:
  - Categories tree: Subjects → Topics → Subtopics
  - Each category with folder icon and count
- Main area: Grid of note cards (3 columns)

NOTE CARDS (show 6-9 cards):
Each card displays:
- Document preview/thumbnail at top (simulated page preview)
- Type badge: "Handwritten" | "PDF" | "Typed" with colored tag
- Title: "Fourier Series - Lecture Notes"
- Subject tag: Small pill-shaped tag "DSP"
- Metadata: Pages (12 pages), Date (Jan 15, 2026), Size (2.4 MB)
- Source indicator: "Prof. Anish Kumar" with verified badge
- Action buttons row:
  - Download icon
  - Bookmark icon
  - Share icon
- "Last viewed: 2 days ago" timestamp

CARD VARIATIONS:
- Handwritten notes: Paper texture background, handwriting font preview
- PDF documents: Document icon, professional look
- Typed notes: Clean text preview
- Solved exercises: Checkmark badge, green accent
- Computer assignments: Code icon, blue accent

SIDEBAR CATEGORIES EXAMPLE:
📁 Signal Processing
  📄 Fourier Transform (12)
  📄 Z-Transform (8)
  📄 Filters (15)
📁 Machine Learning
  📄 Neural Networks (20)
  📄 Deep Learning (18)

STYLE:
- Clean, organized, library-like
- White background
- Subtle gray borders
- Color-coded badges for different content types
- Inter font
- Professional academic aesthetic
- Similar to Google Drive + Notion combined

Include a "Featured" section at top with 2-3 premium note sets.
```

### 7. Progress Tracking Dashboard

```
Design a comprehensive student progress tracking dashboard.

LAYOUT (top to bottom):
- Header: "Your Learning Progress" with date range selector (This Week, This Month, All Time)
- 4 Key Metric Cards (row 1):
  - Study Streak: Calendar heatmap (7 days) like GitHub contributions
  - Total Study Time: "42 hours" with bar chart
  - Topics Mastered: Circular progress "12/25" with 48%
  - Quiz Average: "85%" with trend arrow up
  
- "Performance by Subject" section:
  - Horizontal bar chart showing:
    - Digital Signal Processing: 85%
    - Machine Learning: 72%
    - Algorithms: 90%
    - Data Structures: 68%
  - Color-coded bars (green for high, amber for medium, red for needs work)

- "Recent Activity Timeline" (left 60%):
  - Vertical timeline with icons
  - Entries like:
    - "Completed quiz: Fourier Transform - 90%" (green check)
    - "Watched video: Neural Networks Intro" (play icon)
    - "Practiced code: Binary Search" (code icon)
  - Each with timestamp "2 hours ago"

- "Weak Areas & Recommendations" (right 40%):
  - Card listing topics needing attention
  - Each topic with:
    - Subject name
    - Current score/status
    - Recommended action (Watch video, Practice quiz)
    - Action button

- "Study Goals" section:
  - Weekly goal progress bar: "4/5 days studied"
  - Monthly quiz target: "8/10 completed"
  - Learning path progress: Step indicator 1→2→3→4→5

CHARTS & VISUALIZATIONS:
- Use clean, modern chart designs
- Blue color scheme (#2563EB)
- Subtle gridlines
- Clear labels
- Interactive feeling (hover states)

STYLE:
- Data-rich but not overwhelming
- Clean white background
- Card-based sections with shadows
- Inter font
- Professional analytics aesthetic
- Similar to Duolingo progress + Google Analytics simplicity
- Encouraging and motivating tone
- Use icons liberally for visual scanning

Make it feel rewarding and motivating, celebrating progress.
```

### 8. Mobile View - AI Chat (Responsive)

```
Design mobile-responsive AI chatbot interface (375px width - iPhone size).

LAYOUT:
- Top bar (fixed):
  - Back arrow (left)
  - "AI Assistant" title (center)
  - Menu dots (right)
  - Height: 56px, white background, subtle shadow

- Chat area (scrollable):
  - Messages take 85% width maximum
  - User messages: Blue, right-aligned
  - AI messages: Gray, left-aligned
  - Small AI avatar (24px) next to AI messages
  - Timestamp centered between message groups

- Input area (fixed bottom):
  - Text input field with rounded corners
  - Send button (icon only) inside input (right side)
  - Input expands as user types (max 4 lines)
  - Above input: Quick action chips (horizontal scroll):
    - "Explain this"
    - "Solve problem"
    - "Quiz me"
  - Safe area padding for mobile notches

MOBILE-SPECIFIC FEATURES:
- Larger tap targets (min 44px)
- Swipe to delete message history
- Pull-to-refresh at top
- "Scroll to bottom" FAB appears when scrolled up
- Voice input button option
- Haptic feedback indicators

MESSAGE FEATURES:
- Long-press message for options (Copy, Share, Delete)
- Code blocks: Horizontal scroll with copy button
- Math equations: Rendered properly, zoomable
- Images/diagrams: Tappable to fullscreen

STYLE:
- Thumb-friendly design
- Clear visual hierarchy
- Blue accent color (#2563EB)
- Inter font (slightly larger for mobile readability)
- Generous padding and spacing
- Similar to WhatsApp + ChatGPT mobile
- Bottom navigation optional: Chat, Code, Videos, Profile

Show with 3-4 example messages in the conversation.
```

---

## 🎯 Component-Specific Prompts

### Button Component Set

```
Design a comprehensive button component system for an educational platform.

Create 6 button variations:

1. PRIMARY BUTTON:
   - Background: Blue (#2563EB)
   - Text: White, Inter font, 14px, Medium weight
   - Height: 40px
   - Padding: 12px 24px
   - Border radius: 8px
   - Hover state: Darker blue (#1E40AF)
   - Active state: Even darker
   - Include icon variant (icon + text)

2. SECONDARY BUTTON:
   - Border: 2px solid blue (#2563EB)
   - Text: Blue (#2563EB)
   - Background: Transparent
   - Same dimensions as primary
   - Hover: Light blue background (#DBEAFE)

3. GHOST BUTTON:
   - No border, no background
   - Text: Primary dark (#1F2937)
   - Hover: Light gray background

4. ICON BUTTON:
   - Circular: 40px diameter
   - Icon only (Feather Icons style)
   - Background: Transparent or light gray
   - Hover: Darker background

5. DISABLED STATE:
   - Gray background (#E5E7EB)
   - Gray text (#9CA3AF)
   - Cursor: not-allowed
   - Reduced opacity: 0.5

6. LOADING STATE:
   - Same as primary but with spinner animation
   - Text: "Loading..." or spinner only

Show all states for each button type in a clean grid layout.
Style: Modern, minimalist, accessible (WCAG AA compliant contrast).
```

### Input Field Components

```
Design a complete form input component set for an educational platform.

Create these input variations:

1. TEXT INPUT (default state):
   - Height: 44px
   - Border: 1px solid #E5E7EB
   - Border radius: 8px
   - Padding: 12px 16px
   - Font: Inter, 14px
   - Placeholder: light gray (#9CA3AF)
   - Label above: "Email Address" (12px, medium)

2. FOCUSED STATE:
   - Border: 2px solid blue (#2563EB)
   - Shadow: 0 0 0 3px rgba(37, 99, 235, 0.1)
   - Placeholder disappears or moves

3. ERROR STATE:
   - Border: 2px solid red (#EF4444)
   - Error message below: red text, 12px
   - Error icon inside input (right)
   - Example: "Please enter a valid email"

4. SUCCESS STATE:
   - Border: 2px solid green (#10B981)
   - Checkmark icon (right side)
   - Optional success message below

5. DISABLED STATE:
   - Background: light gray (#F3F4F6)
   - Border: light gray (#E5E7EB)
   - Text: gray (#9CA3AF)
   - Cursor: not-allowed

6. WITH ICON:
   - Icon on left side (search icon, email icon, etc.)
   - Extra left padding for icon space

7. TEXTAREA:
   - Multi-line version
   - Min height: 100px
   - Resize handle (bottom right)
   - Character counter optional: "250/500"

8. SELECT DROPDOWN:
   - Same styling as text input
   - Chevron icon (right)
   - Dropdown menu on click (show expanded state)

Show all variations in a vertical stack with labels and proper spacing.
Style: Clean, modern, accessible, student-friendly.
```

### Card Component Library

```
Design a modular card component library for an educational platform.

Create 8 card types:

1. BASIC CARD:
   - White background
   - Border radius: 12px
   - Shadow: 0px 2px 8px rgba(0,0,0,0.08)
   - Padding: 24px
   - Hover: Shadow increases, subtle lift

2. STAT CARD:
   - Icon (top left, blue circle background)
   - Large number: "247" (32px, bold)
   - Label below: "Study Hours" (14px, gray)
   - Compact size: 200px × 120px

3. VIDEO CARD:
   - Thumbnail image (16:9 ratio)
   - Play button overlay (center, appears on hover)
   - Duration badge: "12:45" (bottom right of thumbnail)
   - Progress bar below thumbnail (blue)
   - Title: 2 lines max, truncate with ...
   - Metadata: Professor name, views, date
   - Bookmark icon (top right)

4. NOTE/DOCUMENT CARD:
   - Document preview thumbnail
   - Type badge: "PDF" or "Handwritten"
   - Title and subject tag
   - Download, bookmark, share buttons
   - Metadata: pages, size, date

5. QUIZ CARD:
   - Quiz title
   - "Start Quiz" button
   - Info row: Questions count, time limit, difficulty
   - Progress if in-progress: "3/20 completed"
   - Best score badge if completed

6. ACTIVITY CARD (Timeline):
   - Icon (left, in colored circle)
   - Action description
   - Timestamp
   - Optional: Small thumbnail or preview

7. RECOMMENDATION CARD:
   - "Recommended for you" badge
   - Content preview
   - Reason: "Based on your DSP progress"
   - Action button

8. PROFILE CARD:
   - User avatar (large, top center)
   - Name and role
   - Stats row: Courses, Streak, Level
   - "Edit Profile" button

Arrange in a clean grid showing all card types.
Style: Consistent shadows, rounded corners, blue accents, Inter font.
Similar to Notion + Airbnb card aesthetics.
```

---

## 🎨 Complete App Prompt (Figma AI Full Generation)

```
Design a complete modern educational AI platform UI/UX for students. Create multiple screens showing the full user journey.

PROJECT OVERVIEW:
An intelligent learning platform that helps students master technical subjects (DSP, Machine Learning, Algorithms). Features include AI chatbot tutor, code practice environment, video library, digital notes, quizzes, and progress tracking.

REQUIRED SCREENS (create all):
1. Dashboard/Home
2. AI Chatbot Interface  
3. Code Development Environment
4. Video Library
5. Notes & Resources
6. Quiz Interface
7. Progress/Analytics Dashboard
8. User Profile/Settings

DESIGN SYSTEM:
Colors:
- Primary: #2563EB (blue - trust, learning)
- Success: #10B981 (green)
- Warning: #F59E0B (amber)
- Error: #EF4444 (red)
- Accent: #8B5CF6 (purple - AI features)
- Background: #FFFFFF
- Surface: #F9FAFB
- Text: #1F2937
- Borders: #E5E7EB

Typography:
- Font: Inter (all weights)
- H1: 32px Bold
- H2: 24px Semibold
- H3: 20px Semibold
- Body: 14px Regular
- Small: 12px Regular

Components:
- Buttons: 8px border radius, 40px height
- Cards: 12px border radius, subtle shadows
- Inputs: 8px border radius, 44px height
- Icons: Feather Icons or Heroicons style

Layout:
- Top navigation: 64px height
- Sidebar: 280px width (expandable/collapsible)
- Content: Max-width 1200px, centered
- Grid: 24px gaps
- Responsive breakpoints: Mobile (<640px), Tablet (640-1024px), Desktop (>1024px)

STYLE INSPIRATION:
- Notion (clean, organized)
- Linear (modern, minimal)
- Khan Academy (educational, friendly)
- ChatGPT (conversational AI)
- VS Code (developer tools)

USER EXPERIENCE PRINCIPLES:
- Minimalist and clean
- Student-friendly, not intimidating
- Clear information hierarchy
- Trustworthy and professional
- Encouraging and supportive tone
- Fast, efficient workflows
- Mobile-responsive

KEY FEATURES TO SHOW:
- AI chatbot with conversation history
- Code editor with syntax highlighting
- Video player with progress tracking
- Note organization with tags and search
- Interactive quizzes with instant feedback
- Progress tracking with charts and streak
- Source citations for AI responses
- Bookmark and save functionality

SPECIFIC REQUIREMENTS:
- Show both light mode (primary) designs
- Include empty states with friendly messages
- Show loading states and micro-interactions
- Include error states with helpful messages
- Demonstrate responsive mobile views for key screens
- Show user avatars and personalization
- Include search functionality
- Display notifications and alerts

TECHNICAL CONTENT TO INCLUDE:
- Sample subjects: Digital Signal Processing, Machine Learning, Algorithms, Data Structures
- Sample video titles and professor names
- Sample quiz questions
- Sample code snippets (Python, Java)
- Sample progress data and analytics
- Realistic timestamps and metadata

Create a comprehensive, professional, production-ready design that a development team could immediately implement. Make it visually stunning yet simple, modern yet timeless, professional yet friendly. This should wow stakeholders and users alike while being highly functional and user-centric.

Prioritize clarity, usability, and aesthetic beauty in equal measure.
```

---

## 📋 Prompt Usage Tips

1. **Start with Design System**: Create colors, typography, and basic components first
2. **Use Master Prompt as Base**: Always include the master prompt context
3. **Iterate Screen by Screen**: Don't try to generate everything at once
4. **Refine with Specifics**: Add more details if AI output isn't matching vision
5. **Maintain Consistency**: Reference previous designs when creating new screens
6. **Test Responsive**: Create mobile versions of critical screens
7. **Document Decisions**: Keep notes on why certain design choices were made

---

## 🔄 Iteration Prompts

### If output is too complex:
```
Simplify this design. Remove decorative elements. Focus on essential functionality. 
Use more white space. Make it minimalist like Apple or Linear app.
```

### If output is too simple:
```
Add more depth and polish. Include micro-interactions, hover states, shadows.
Make it feel premium and modern while staying clean.
```

### For dark mode:
```
Create a dark mode version of this design.
Background: #111827
Surface: #1F2937  
Text: #F9FAFB
Keep the same component structure but optimized for dark UI.
```

### For mobile responsive:
```
Adapt this design for mobile (375px width).
Stack elements vertically, increase tap targets to minimum 44px,
use bottom navigation, make text slightly larger for readability.
```

---

These prompts should give you everything you need to generate comprehensive UX designs for your educational AI platform using Figma AI or other AI design tools! 🚀
