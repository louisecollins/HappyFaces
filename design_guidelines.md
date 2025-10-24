# Face Painting Business Website - Design Guidelines

## Design Approach: Reference-Based (Creative Portfolio + Service Business)
Drawing inspiration from creative portfolio sites (Behance, Dribbble) combined with service booking platforms (Care.com, GigSalad). This hybrid approach emphasizes visual storytelling while maintaining booking functionality.

**Core Principles**: Playful professionalism, visual-first storytelling, trust-building through imagery, effortless booking experience.

---

## Color Palette

**Primary Colors (Light Mode)**:
- Brand Purple: 280 70% 60% (playful, creative, memorable)
- Warm Pink: 330 80% 65% (friendly, inviting)
- Sky Blue: 200 75% 55% (trustworthy, calming)

**Primary Colors (Dark Mode)**:
- Deep Purple: 280 50% 25%
- Muted Pink: 330 40% 35%
- Navy Blue: 200 45% 30%

**Neutral Foundation**:
- Light mode background: 0 0% 98%
- Dark mode background: 220 15% 10%
- Text: Standard contrast ratios

**Accent Usage**: Use vibrant primary colors in hero CTA buttons, section headers, and gallery hover states. Background sections alternate between white and subtle purple/pink tints (280 60% 97%).

---

## Typography

**Font Families** (Google Fonts):
- Headings: 'Fredoka' (rounded, playful, family-friendly) - weights 500, 600, 700
- Body: 'Inter' (clean, professional, readable) - weights 400, 500, 600

**Scale**:
- Hero headline: text-5xl md:text-6xl lg:text-7xl (bold, welcoming)
- Section headers: text-3xl md:text-4xl
- Card titles: text-xl md:text-2xl
- Body text: text-base md:text-lg
- Small print: text-sm

---

## Layout System

**Spacing Primitives**: Consistently use Tailwind units: 2, 4, 6, 8, 12, 16, 20, 24, 32
- Component padding: p-6 md:p-8
- Section spacing: py-16 md:py-24 lg:py-32
- Card gaps: gap-6 md:gap-8
- Grid gaps: gap-4 md:gap-6

**Container Strategy**:
- Full-width sections with inner max-w-7xl mx-auto px-4
- Content-heavy sections: max-w-6xl
- Form containers: max-w-2xl

---

## Component Library

### Navigation
Sticky header with logo (paint palette icon + "FacePainter NI"), transparent-to-solid on scroll, mobile hamburger menu. Links: Home, Gallery, Services, Events, Contact, Book Now (CTA button).

### Hero Section
Full-width hero (min-h-[85vh]) with professional face painting action shot background (artist painting child's face at event). Overlay gradient (purple-to-pink, 40% opacity). Center-aligned headline "Bringing Smiles to West Belfast" + subheadline + dual CTAs ("View Gallery" outline + "Book Your Event" solid). Trust indicator below: "100+ Events • 5-Star Rated • Fully Insured".

### Gallery Section
Masonry grid layout (2 cols mobile, 3 cols tablet, 4 cols desktop) with diverse face painting photos: animals, superheroes, butterflies, rainbows. Lightbox functionality on click. Category filters above grid (All, Animals, Fantasy, Superheroes, Special Effects). Rounded corners (rounded-xl), subtle hover lift (hover:scale-105), shadow on hover.

### Services Cards
3-column grid showcasing: Birthday Parties, Community Events, Corporate Functions. Each card: icon, title, description, pricing starting point, "Learn More" link. Use soft background colors (alternating purple/pink/blue tints).

### Events Calendar
Card-based timeline showing upcoming public appearances. Each event card: date badge (left), venue name, location, time, "I'll Be There" label. Alternate layout between left/right alignment for visual interest.

### Booking Form
Two-step form: Step 1 (Event Details): Date picker, event type dropdown, number of children, duration. Step 2 (Contact): Name, email, phone, special requests textarea. Progress indicator, large "Request Booking" button. Reassurance text: "We'll respond within 24 hours".

### Contact Section
Two-column layout: Left (contact form), Right (business info card with location map placeholder, phone, email, social links, business hours). Include WhatsApp quick-contact button.

### Footer
Three columns: About (short bio), Quick Links (sitemap), Connect (social icons, newsletter signup). Trust badges: Insured, Verified, Member of Face Painting Association. Copyright and West Belfast, Northern Ireland location.

---

## Images Strategy

**Hero Image**: Professional action shot of artist painting child's face at outdoor event (joyful expressions, colorful paints visible). Full-width background with gradient overlay.

**Gallery**: 12-16 high-quality photos showcasing variety of face painting designs, diverse ages, different event settings. Mix of close-up face shots and full event atmosphere photos.

**Services Section**: 3 complementary images showing different event types (birthday party, festival booth, corporate event).

**About/Bio Section**: Professional headshot of artist with paint supplies, warm and approachable.

---

## Interactions & Animations
Minimal and purposeful:
- Smooth scroll to sections
- Gallery image hover: subtle scale + shadow
- Button hover: slight brightness increase
- Form field focus: purple border glow
- Sticky nav: background fade-in on scroll

---

## Mobile Considerations
Stack all multi-column layouts to single column. Hero text remains centered, slightly smaller. Gallery becomes 2-column grid. Touch-friendly buttons (min 44px height). Simplified navigation with clear hierarchy.

**Critical**: This is a marketing site - parents browsing on phones need instant trust signals, easy gallery access, and frictionless booking. Prioritize visual impact and conversion optimization.