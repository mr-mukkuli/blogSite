# Design Guidelines: Blog CMS Platform

## Design Approach
**Reference-Based with System Enhancement**: Drawing primary inspiration from Notis.ai's clean minimalist aesthetic, enhanced with modern blog design patterns from Medium and Ghost. This creates a professional, content-focused experience with excellent readability and intuitive navigation.

## Core Design Principles
1. **Content-First Philosophy**: Typography and whitespace prioritize reading experience
2. **Card-Based Architecture**: Consistent card pattern for articles, categories, and content blocks
3. **Subtle Interactions**: Hover states and transitions that enhance without distracting
4. **Minimal Color Palette**: Let content breathe with generous whitespace

---

## Typography System

**Font Stack**:
- Primary: Inter or Source Sans Pro (clean, modern sans-serif)
- Headings: Same family, bold weights (600-700)
- Code/Monospace: JetBrains Mono or Fira Code

**Hierarchy**:
- H1 (Page Titles): text-4xl to text-5xl, font-bold
- H2 (Section Headers): text-3xl, font-semibold
- H3 (Card Titles): text-xl to text-2xl, font-semibold
- Body Text: text-base, leading-relaxed
- Metadata: text-sm, reduced opacity
- Navigation: text-sm to text-base, medium weight

---

## Layout System

**Spacing Primitives**: Tailwind units of 2, 4, 6, 8, 12, 16, 24
- Component padding: p-6, p-8
- Section margins: my-12, my-16, my-24
- Card gaps: gap-6, gap-8
- Container max-width: max-w-7xl

**Grid Patterns**:
- Article cards: grid-cols-1 md:grid-cols-2 lg:grid-cols-3
- Category cards: grid-cols-1 md:grid-cols-2
- Featured content: Single column with max-w-4xl

---

## Component Library

### Homepage Layout
**Header**:
- Clean navbar: Logo left, navigation center, search/CTA right
- Sticky positioning with subtle shadow on scroll
- Height: h-16 to h-20

**Hero Section** (No Large Image):
- Centered search bar with keyboard shortcut display (⌘K)
- Welcome heading with friendly emoji (e.g., "How can we help? 👋")
- max-w-3xl centered container
- Generous vertical padding: py-16 to py-24

**Category Cards**:
- Large card design (min-h-48)
- Bold title with icon or emoji
- Description text beneath
- Article count badge (subtle, top-right corner)
- Subtle border, rounded corners (rounded-xl)
- Hover: slight elevation, border accent

**Suggested Articles Grid**:
- 3-column grid on desktop, 2 on tablet, 1 on mobile
- Compact cards with title and excerpt
- Read time and date metadata
- Arrow or chevron indicating link

### Article Detail Page
**Layout**:
- Sidebar navigation (sticky, left side, 20% width)
- Main content area (centered, max-w-3xl)
- Table of contents (sticky, right side, hidden on mobile)

**Content Styling**:
- Line height: leading-loose (1.8-2.0)
- Paragraph spacing: mb-6
- Headings with generous top margin
- Code blocks with syntax highlighting
- Blockquotes with left border accent
- Images: Full-width with captions, rounded corners

**Metadata Bar**:
- Author, date, read time, category tags
- Share buttons (subtle, icon-only)
- Positioned below title, above content

### CMS Dashboard
**Navigation**:
- Collapsible sidebar (w-64 expanded, w-20 collapsed)
- Icon + text labels for main actions
- Active state with subtle background

**Content Tables**:
- Clean table design with alternating row backgrounds
- Action buttons (edit/delete) always visible on desktop
- Responsive cards on mobile

**Editor Interface**:
- Full-width toolbar with formatting options
- Split view: Markdown input | Live preview
- Autosave indicator (top-right)
- Publish/Draft toggle (prominent)

### Search Component
**Design**:
- Prominent search bar (w-full md:max-w-2xl)
- Rounded, elevated design (shadow-lg)
- Keyboard shortcut hint (right side)
- Dropdown results with category grouping
- Instant search with debouncing

---

## Interaction Patterns

**Card Hover States**:
- Translate: transform -translate-y-1
- Shadow: from shadow-sm to shadow-lg
- Border: Subtle accent color
- Transition: transition-all duration-200

**Link Treatments**:
- Underline on hover for inline links
- Arrow/chevron animation for card links
- Focus rings for accessibility (ring-2 ring-offset-2)

**Loading States**:
- Skeleton screens for content areas
- Subtle pulse animation
- Spinner for actions (inline, small)

---

## Accessibility

**Focus Management**:
- Visible focus indicators on all interactive elements
- Skip to main content link
- Keyboard navigation for modals and dropdowns

**Content Structure**:
- Semantic HTML throughout
- Proper heading hierarchy
- Alt text for all images
- ARIA labels for icon-only buttons

---

## Images

**Where to Use**:
1. **Article Thumbnails**: 16:9 ratio cards, cover object-fit
2. **Author Avatars**: Small circular images (w-10 h-10)
3. **Category Icons**: Optional illustrative graphics
4. **In-Article Images**: Full-width with captions, responsive

**No Hero Image**: Following Notis.ai's approach, the homepage leads with search and functionality rather than decorative imagery.

**Placeholder Strategy**:
- Use solid colors or gradients for missing thumbnails
- Icons for categories without images
- Default avatars for authors

---

## Unique Differentiators

1. **Command Palette**: Keyboard-first search (⌘K trigger)
2. **Article Count Badges**: Prominent on category cards
3. **Reading Progress Bar**: Thin bar at top of article pages
4. **Quick Actions Menu**: Floating button (bottom-right) for creating content
5. **Tag Cloud**: Visual representation of popular topics
6. **Related Articles Algorithm**: Smart suggestions at article end

---

This design creates a professional, content-focused blog platform that honors Notis.ai's minimalist aesthetic while adding unique touches for enhanced usability and visual interest.