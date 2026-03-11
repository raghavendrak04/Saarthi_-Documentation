# Saarthi.ai - The Ultimate High-Fidelity Design Specification & AI Prompt Guide
**Version:** 3.0 (Ultra-Detailed / 4000+ Words Depth)
**Target Output:** Production-Grade UI/UX for an Educational AI Platform.
**Core Philosophy:** "Invisible Tech, Visible Learning."

---

## 🏗️ 1. GLOBAL DESIGN SYSTEM [THE PHYSICS OF SAARTHI]

### 1.1 Master Aesthetic & Vibe
> **Prompt Instruction:** Use this context for EVERY generation to ensure brand consistency.

**Visual Language:**
- **Archetype:** The "Sage of the Future." accessible, infinite knowledge, zero friction.
- **Atmosphere:** Intellectual, Calm, focused, optimistic, precise.
- **Lighting Model:** "Soft Studio Daylight." No harsh shadows. Light source from top-left. Diffused ambient occlusion.
- **Materiality:** "Digital Glass & Paper."
  - **Surface 1 (Base):** Pure White (#FFFFFF). Matte finish.
  - **Surface 2 (Elevated):** Cool Grey (#F8FAFC). Slight grain texture (0.5% opacity).
  - **Surface 3 (Glass):** Frosted blur (Backdrop-filter: blur(12px)). White opacity 80%.
- **Shape Language:** "Humanist Geometry." 
  - Rectangles are softened (Super-ellipse rounding).
  - Intersections are smooth.
  - Icons are stroke-based (1.5px weight) with softened terminals.

**Brand Core Colors [Exact Hex Values]:**
1.  **Primary "Intellect Blue":** 
    - `Primary-500` #2563EB (The main action color).
    - `Primary-600` #1D4ED8 (Hover state).
    - `Primary-100` #DBEAFE (Background tints).
    - *Usage:* Primary buttons, active tabs, links, key brand moments.

2.  **Accent "Magic Purple" (AI Identity):**
    - `Accent-500` #8B5CF6 (The spark of intelligence).
    - `Accent-Gradient`: Linear Gradient(135deg, #2563EB 0%, #8B5CF6 100%).
    - *Usage:* AI avatars, generated content borders, special "magic" actions.

3.  **Semantic Feedback:**
    - `Success-500` #10B981 (Growth, Correct Answer).
    - `Warning-500` #F59E0B (Hint, Paused).
    - `Error-500` #EF4444 (Incorrect, Bug).
    - `Info-500` #0EA5E9 (Context).

4.  **Neutral "Slate" (Readability Focus):**
    - `Slate-900` #0F172A (Headings).
    - `Slate-700` #334155 (Body text).
    - `Slate-400` #94A3B8 (Placeholder/Disabled).
    - `Slate-200` #E2E8F0 (Borders).
    - `Slate-50` #F8FAFC (App Background).

### 1.2 Hierarchy & Typography [The Voice]
**Font Family:** `Inter (Variable)` - Optimized for screen readability.

**Type Scale [Desktop]:**
- **Display XL:** 48px / 1.1 Line Height / -2.5% Letter Spacing / Bold / *Usage:* Landing Page Hero.
- **Heading 1:** 32px / 40px LH / -2% LS / SemiBold / *Usage:* Page Titles.
- **Heading 2:** 24px / 32px LH / -1.5% LS / SemiBold / *Usage:* Section Headers.
- **Heading 3:** 20px / 28px LH / -1% LS / Medium / *Usage:* Card Titles.
- **Body Large:** 16px / 26px LH / 0% LS / Regular / *Usage:* Blog posts, Long-form reading (Lesson content).
- **Body Base:** 14px / 22px LH / 0% LS / Regular / *Usage:* Standard UI elements, chat messages.
- **Caption:** 12px / 16px LH / 1% LS / Medium / *Usage:* Timestamps, Metadata, Labels.
- **Code:** `JetBrains Mono` / 13px / 20px LH / Regular / *Usage:* Code snippets, terminal output.

**Typography Rules:**
- **Paragraph Spacing:** 16px between blocks.
- **Line Length:** Max 75 characters for reading content (approx 600px width).
- **Contrast:** AA Compliant (4.5:1 minimum) for all text.

### 1.3 Depth, Shadow & Layering System
**Elevation 0 (Base):** No shadow. Border 1px `Slate-200`.
**Elevation 1 (Hover/Card):** `0px 1px 3px rgba(0,0,0,0.05), 0px 1px 2px rgba(0,0,0,0.1)`.
**Elevation 2 (Dropdown/Popover):** `0px 4px 6px -1px rgba(0,0,0,0.1), 0px 2px 4px -1px rgba(0,0,0,0.06)`.
**Elevation 3 (Modal/Floating):** `0px 20px 25px -5px rgba(0,0,0,0.1), 0px 10px 10px -5px rgba(0,0,0,0.04)`.
**Glow (AI Focus):** `0px 0px 0px 3px rgba(139, 92, 246, 0.3)`.

---

## 🧩 2. ATOMIC COMPONENT SPECIFICATION [THE LEGO BRICKS]

### 2.1 Buttons [The Interaction Points]
**A. Primary Button (The "Do It" Action)**
- **Dimensions:** Height 40px (Desktop), 44px (Mobile/Touch). Padding: 0px 20px.
- **Shape:** Radius 8px.
- **Fill:** `Primary-500` (#2563EB).
- **Text:** White (#FFFFFF), Inter Medium 14px.
- **Icon (Optional):** 16px, White, Right side (gap 8px).
- **States:**
  - *Hover:* Background `Primary-600`. Lift transition (Y -1px).
  - *Active:* Background `Primary-700`. Scale 0.98.
  - *Focus:* Ring 3px `Primary-100`.
  - *Disabled:* Background `Slate-200`, Text `Slate-400`. No pointer events.

**B. "Magic" AI Button**
- **Fill:** Linear Gradient (135deg, #2563EB 0%, #8B5CF6 100%).
- **Effect:** Subtle "Shimmer" animation loop (diagonal white stripe opacity 20% moving across).
- **Icon:** Sparkles (✨).

**C. Secondary/Outline Button**
- **Border:** 1px Inside `Slate-200`.
- **Fill:** Transparent or White.
- **Text:** `Slate-700`.
- **Hover:** Background `Slate-50`. Border `Slate-300`.

**D. Ghost/Text Button**
- **No Border, No Fill.**
- **Text:** `Primary-600`.
- **Hover:** Background `Primary-50` (rounded rect).

### 2.2 Input Fields [The Data Entry]
**A. Text Field (Default)**
- **Height:** 42px.
- **Border:** 1px Solid `Slate-300`.
- **Radius:** 8px.
- **Placeholder:** `Slate-400` ("Ask a question...").
- **States:**
  - *Hover:* Border `Slate-400`.
  - *Focus:* Border `Primary-500`, Ring 3px `Primary-100`.
  - *Error:* Border `Error-500`, Ring 3px `Error-50`. Text `Error-600`. Warning icon appears on right.
  - *Filled:* Text `Slate-900`.

**B. Smart Search Bar**
- **Shape:** Pill (Radius 100px).
- **Fill:** `Slate-100` (#F1F5F9).
- **Icon:** Search (Magnifying Glass) left, `Slate-500`.
- **Shortcut Badge:** Right side, "CMD + K" styled as small keyboard key.

### 2.3 Cards [The Content Containers]
**A. Standard Content Card**
- **Fill:** White.
- **Border:** 1px `Slate-100`.
- **Radius:** 12px.
- **Shadow:** Elevation 1.
- **Padding:** 24px.

**B. Interactive Course Card**
- **Structure:**
  - *Top:* Aspect Ratio 16:9 Image. Object-fit cover.
  - *Middle:* Progress Bar (2px height). Blue segment 40%, Gray 60%.
  - *Body:* Title H3. Author Avatar (24px) + Name.
  - *Footer:* "Continue" Text Link + Arrow.
  - *Hover:* Image zooms 105% (overflow hidden). Card lifts keyframe.

---

## 🖥️ 3. HIGH-FIDELITY SCREEN-BY-SCREEN PROMPTS

### 3.1 🏠 DASHBOARD: "The Command Center"
**Context:** The student logs in. It's 10:00 AM. They need clarity, motivation, and a clear next step.

> **GENERATE PROMPT:**
> "Design a high-fidelity Student Dashboard for Saarthi.ai.
>
> **Global Layout:**
> - Left Sidebar (Fixed, 260px width, `Slate-50` bg):
>   - Logo: 'Saarthi' (Blue Text) + Logo Mark (Abstract Guide). top-left.
>   - Primary Nav: Home (Active, Blue bg tint), Courses, Chat, Practice, Library. Icons on left 20px.  
>   - Secondary Nav (Bottom): Settings, Dark Mode Toggle, 'Upgrade to Pro'.
> - Top Bar (Sticky, White, border-bottom):
>   - Breadcrumbs: 'Home / Dashboard'.
>   - Global Search: Centered, 400px wide.
>   - Profile: User Avatar (Right), Notification Bell (with red dot).
>
> **Main Content Area (White, Padding 40px):**
> 1.  **Greeting Hero:**
>     - Headline: "Good Morning, Arjun! ☀️"
>     - Subtext: "You're on a 5-day streak. Keep it up!"
>     - **The 'Hero Action':** A large horizontal card spanning full width.
>       - Left: "Continue Learning: Digital Signal Processing".
>       - Right: "Module 3: Fast Fourier Transform".
>       - Progress Bar: 65% filled.
>       - CTA Button: "Resume Lesson" (Primary Blue).
>
> 2.  **Stats Overview (Grid of 4 Small Cards):**
>     - Card 1: "Total Focus" -> "42h 15m" (Clock Icon).
>     - Card 2: "Questions Asked" -> "128" (Chat Icon).
>     - Card 3: "Concepts Mastered" -> "85" (Brain Icon).
>     - Card 4: "Next Deadline" -> "Assignment 2 in 4h" (Calendar Icon, Orange tag).
>
> 3.  **"AI Recommended Path" (Horizontal Scroll Section):**
>     - Section Title: "Suggested for you by Saarthi AI" + Sparkles Icon.
>     - Card 1: "Review: Convolution" (Reason: "You missed this in Quiz 2").
>     - Card 2: "Practice: Python Syntax" (Reason: "Prepare for Lab").
>     - Card 3: "Watch: Neural Networks Intro" (Reason: "Popular today").
>     - Style these with a subtle Purple/Magic glow border to signify AI origin.
>
> 4.  **Recent Activity List:**
>     - Simple table rows. Clean.
>     - Icon | Activity Name | Subject Tag | Timestamp.
>     - Example: [Quiz Icon] | "Unit 4 Assessment" | [DSP tag] | "2 hours ago".
>
> **Aesthetic notes:** Clean whites, soft shadows, very organized, breathing room between sections."

### 3.2 🤖 AI TUTOR: "The Intelligent Companion"
**Context:** The student is stuck on a concept ("Recursion") and is asking for help.

> **GENERATE PROMPT:**
> "Design the AI Tutor Chat Interface for Saarthi.ai.
>
> **Layout:**
> - **Chat Canvas (Center, Max-width 900px):**
>   - Background: White.
>   - Date Divider: "Today, 10:23 AM" (Centered, small gray text).
>
> - **Message 1 (User):**
>   - Position: Right aligned.
>   - Style: Blue Bubble (`Primary-500`), White Text. Radius `16px 16px 4px 16px`.
>   - Content: "Can you explain Recursion in Python with a simple example?"
>
> - **Message 2 (AI - Saarthi):**
>   - Position: Left aligned.
>   - Style: White Bubble (Gray Border), Black Text. Radius `16px 16px 16px 4px`.
>   - **The Avatar:** Small purple circle with a white robot/sparkle icon, placed to the left of the bubble.
>   - **Rich Content Body:**
>     - Paragraph: "Certainly! Recursion is when a function calls itself..."
>     - **Code Block Component:**
>       - Dark Theme Editor embedded in chat.
>       - Header: `recursion_example.py` | 'Copy' button.
>       - Code: `def factorial(n): ...` (Syntax highlighted).
>     - **Visual Analogy:** An embedded diagram (SVG/Image) showing a stack of Russian nesting dolls to explain the concept.
>     - **Citation Footer:** "Source: Python Docs, Computer Science 101".
>
> - **Input Area (Floating Bottom Bar):**
>   - A glassmorphism container floating above the bottom.
>   - Input Field: "Ask a follow-up..."
>   - Left Actions: 'Upload Image' (Paperclip), 'Voice' (Mic).
>   - Right Action: 'Send' (Blue Circle Arrow).
>   - **Suggestion Chips** floating above input: "Show visual diagram", "Give me a quiz", "Explain logic".
>
> **Aesthetic notes:** Ensure the code block looks like a mini-IDE embedded in the chat. The AI response should look structured, not just a wall of text."

### 3.3 💻 CODE LAB: "The Practice Arena"
**Context:** Browser-based IDE. The student is solving a problem.

> **GENERATE PROMPT:**
> "Design the 'Code Lab' IDE Interface for Saarthi.ai.
>
> **Layout:** Dual-Pane split view (60% Left, 40% Right).
>
> **Left Pane (The Code Editor):**
> - **Tab Bar:** `main.py` (Active), `test_cases.py`, `utils.py`.
> - **Toolbar:** Language Selector (Python 3.10), Theme Toggle, 'Format Code'.
> - **Gutter:** Line numbers (grey), Breakpoints (red dots on hover).
> - **Editor Surface:** Dark Mode (`#1E1E1E` background).
>   - Code: `def binary_search(arr, target):` (Keywords Blue, Functions Yellow, Strings Orange).
>   - **AI Integration:** A specific line of code is highlighted in faint yellow. A small floating tooltip says: "AI Suggestion: Optimize loop condition".
>
> **Right Pane (The Output & Console):**
> - **Tabs:** 'Console', 'Test Results', 'Problem Description'.
> - **Content (Test Results View):**
>   - Header: "Execution Results".
>   - Status: "Failed 1/5 Tests" (Red Badge).
>   - **Test Case List:**
>     - Test 1: [Green Check] `Input: [1,2,3], Target: 2` -> `Output: 1`.
>     - Test 2: [Red Cross] `Input: [], Target: 1` -> `Error: IndexError`.
>     - Expander arrows to see details of each test.
>
> **Bottom Action Bar:**
> - Left: "Reset Code", "History".
> - Right: **"Run Code"** (Secondary Button), **"Submit Solution"** (Primary Green Button).
>
> **Aesthetic notes:** Needs to look like a professional tool (VS Code) but simplified for learners. High contrast in the code area."

### 3.4 📚 VIDEO HUB: "Active Watching"
**Context:** Watching a lecture. Not passive; interactive notes are open.

> **GENERATE PROMPT:**
> "Design the Video Learning Interface for Saarthi.ai.
>
> **Layout:** 3-Column Asymmetric Grid.
>
> **Column 1 (Main - 65%): The Player.**
> - Large 16:9 Video Player.
> - Overlay UI: Custom controls (Play, scrub bar, volume).
> - **Key Feature:** The scrub bar has colored dots indicating "Key Concepts". Hovering a dot shows a tooltip "3:45 - Fourier Transform Formula".
> - Below Video: 
>   - Title H1: "Understanding Neural Networks".
>   - Meta: "By Prof. Anish", "12k Views".
>   - Tab Bar: About, Q&A, Resources.
>
> **Column 2 (Sidebar - 35%): AI Notes & Transcript.**
> - **Header:** "Smart Notes".
> - **Mode Toggle:** "Auto-Summary" vs "My Notes".
> - **Content (Auto-Summary Mode):**
>   - A scrolling feed of bullet points that generate in real-time as the video plays.
>   - Timestamp links next to each point (e.g., "[04:20] Activation Functions").
>   - **Interactive:** The user can click a 'Plus' icon next to any AI point to save it to their personal notebook.
> - **Bottom:** "Export to PDF" button.
>
> **Aesthetic notes:** Focus on the 'Active Learning' aspect. The notes sidebar should feel connected to the video timeline."

### 3.5 ❓ QUIZ ENGINE: "The Assessment"
**Context:** Taking a test. Distraction-free mode.

> **GENERATE PROMPT:**
> "Design the Assessment/Quiz UI for Saarthi.ai.
>
> **Mode:** Focused View (No Sidebar, No distractions).
>
> **Top Header:**
> - Left: "Unit 4 Quiz: Data Structures".
> - Center: Progress Map (Circles connected by lines). Circle 5 is active/blue.
> - Right: Timer "14:59" (Countdown). 'Exit Quiz' (X).
>
> **Main Canvas (Centered, Narrow Column):**
> - **Question Card:**
>   - Badge: "Question 5 (Multiple Choice)".
>   - Text: "What is the worst-case time complexity of QuickSort?"
>   - Code Snippet (Optional): A small block showing the pivot logic.
>
> - **Answer Options (Stack of 4):**
>   - Large clickable tiles.
>   - Hover state: Light Blue border.
>   - Selection state: Blue Border, Blue Background tint, Radio filled.
>   - A. O(n)
>   - B. O(n log n)
>   - C. O(n^2) [Selected]
>   - D. O(log n)
>
> - **Footer Controls:**
>   - Left: "Need a Hint?" (Uses 5 coins).
>   - Right: "Submit Answer" (Primary Button).
>
> **Aesthetic notes:** Very clean. Large text. High clickability. Prioritize readability above everything."

---

## 📱 4. MOBILE RESPONSIVENESS [THE POCKET TUTOR]

### 4.1 Mobile Navigation Shell
**Bottom Tab Bar (Fixed height 60px):**
- 5 Icons evenly spaced.
- Active state: Icon turns Blue + small text label appears.
- Inactive state: Gray Icon only.
- **The FAB (Floating Action Button):** The center tab is not a tab, but a 'Floating' button for "Ask AI". It breaks out of the bar slightly. Purple Gradient.

### 4.2 Mobile Chat Adaptation
- **Header:** Simplified to just "AI Tutor" and Back Arrow.
- **Messages:** Bubbles go closer to the edge (16px margin). Font size 16px (reading).
- **Keyboard:** When keyboard is open, the input bar sticks to top of keyboard.
- **Gestures:** Swipe left on a message to see timestamp/metadata.

### 4.3 Mobile Course Card
- Stacked Layout (Vertical).
- Image full width.
- Title and Progress below image.
- "Continue" button full width at bottom of card.

---

## 🎨 5. INTERACTION & ANIMATION SPECS

### 5.1 Micro-Interactions
- **Button Click:** Scale down to 0.95 scale. Duration 100ms. Ease-out.
- **Toggle Switch:** Smooth slide. Background transitions Gray -> Green. Duration 200ms.
- **Input Focus:** Label (if floating) moves up and shrinks (Transform Y -20px, Scale 0.8). Color changes to Blue.
- **Like/Heart:** Burst animation (particles) when clicked.

### 5.2 Transitions
- **Page Load:** Fade in (Opacity 0 -> 1) + Slide Up (Y 20px -> 0). Staggered for children elements.
- **Modal Open:** Backdrop Fade In. Modal Pop (Scale 0.9 -> 1.0, Opacity 0 -> 1).
- **AI Typing:** "Three bouncing dots" animation. Wave pattern. Purple color.

---

## ♿ 6. ACCESSIBILITY STANDARDS (A11Y)
> **Constraint:** All designs must adhere to these rules.

- **Color Contrast:** Minimum 4.5:1 for normal text, 3:1 for large text/UI components.
- **Focus Indicators:** All interactive elements must have a visible focus ring (CSS `outline: 2px solid #2563EB`) for keyboard navigation.
- **Touch Targets:** Minimum 44x44px for all mobile interactions.
- **Error Identification:** Color alone is not enough. Use Icons and Text Labels for error states.
- **Alt Text:** All generated image placeholders should have labels describing their function.

---

## 🛠️ 7. DEV HANDOFF SPECIFICATIONS (CSS/Tailwind)
**Tailwind Config Reference for Generation:**
```js
colors: {
  primary: { 500: '#2563EB', 600: '#1D4ED8' },
  accent: { 500: '#8B5CF6' },
  slate: { 50: '#F8FAFC', 900: '#0F172A' }
},
fontFamily: {
  sans: ['Inter', 'sans-serif'],
  mono: ['JetBrains Mono', 'monospace'],
},
boxShadow: {
  'card': '0 1px 3px rgba(0,0,0,0.05)',
  'glow': '0 0 0 3px rgba(139, 92, 246, 0.3)'
},
borderRadius: {
  'card': '12px',
  'btn': '8px'
}
```

---
**End of Specification.**
