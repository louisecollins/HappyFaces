# Happy Faces Belfast - Professional Face Painting Website

## Overview
A professional, mobile-responsive website for Happy Faces Belfast, a face painting business based in West Belfast, Northern Ireland. The site showcases creative work, displays 5-star Google reviews, enables customer bookings, displays upcoming events, and provides easy contact options including WhatsApp.

## Purpose
Help customers find the face painter on the web, view the gallery of work, check upcoming public events, and request bookings or send inquiries.

## Current State
Full-stack application with beautiful UI, functional contact and booking forms, gallery showcase, and events calendar. All MVP features implemented and ready for use.

## Tech Stack
- **Frontend**: React, TypeScript, Tailwind CSS, shadcn/ui, Wouter (routing)
- **Backend**: Express.js, Node.js
- **Email**: Resend (for contact form and booking request notifications)
- **Database**: PostgreSQL (for events and gallery items only)
- **Forms**: React Hook Form with Zod validation
- **Data Fetching**: TanStack Query (React Query v5)
- **Fonts**: Fredoka (display/headings), Inter (body text)

## Project Architecture

### Frontend Structure
- **Pages**: Single-page layout with smooth scrolling sections (Home)
- **Components**:
  - `Navigation`: Sticky header with mobile menu, smooth scroll navigation
  - `Hero`: Full-width hero with background image, CTAs, trust indicators
  - `Services`: 3-card grid showcasing Birthday Parties, Community Events, Corporate Functions
  - `Gallery`: Native CSS horizontal scroll carousel with auto-scroll (3.5s intervals, pauses on hover), category filtering, manual scrolling, and lightbox with prev/next navigation
  - `Reviews`: Google Reviews showcase section with 5-star rating display and link to full Google reviews
  - `Events`: Timeline of upcoming public events with date badges
  - `BookingForm`: 2-step form (Event Details → Contact Info) with validation
  - `Contact`: Contact form with business info cards
  - `Footer`: Quick links, social media, trust badges

### Backend Structure
- **API Routes** (`server/routes.ts`):
  - `POST /api/contact` - Send contact message via email (no database storage)
  - `POST /api/bookings` - Send booking request via email (no database storage)
  - `GET /api/events` - Get all events
  - `POST /api/events` - Create new event
  - `GET /api/gallery` - Get gallery items
  - `POST /api/gallery` - Add gallery item

- **Email Service** (`server/email.ts`):
  - Uses Resend API to send transactional emails
  - Booking requests emailed to happy_faces@hotmail.co.uk with all event details
  - Contact messages emailed to happy_faces@hotmail.co.uk with customer inquiry
  - Reply-to set to customer's email for easy responses
  
- **Storage** (`server/storage.ts`):
  - PostgreSQL database for events and gallery items
  - Contact messages and booking requests NOT stored (sent directly via email)

### Data Models (`shared/schema.ts`)
- **ContactMessage**: name, email, phone, message (validation only - not stored in database)
- **BookingRequest**: name, email, phone, eventDate, startTime, location, eventType, numberOfChildren, duration, specialRequests (validation only - not stored in database)
- **Event**: title, venue, location, date, time, description (stored in database)
- **GalleryItem**: imageUrl, title, category, description (stored in database)

## Design System

### Colors
- **Primary**: Purple (280 70% 60%) - playful, creative, memorable
- **Accent**: Pink (330 80% 65%) - friendly, inviting
- **Chart-3**: Sky Blue (200 75% 55%) - trustworthy, calming
- **Background**: Off-white (0 0% 98%) in light mode, dark navy (220 15% 10%) in dark mode

### Typography
- **Headings**: Fredoka (rounded, playful, family-friendly) - weights 500, 600, 700
- **Body**: Inter (clean, professional) - weights 400, 500, 600
- **Scale**: Responsive text sizes from text-sm to text-7xl

### Spacing
- Consistent use of Tailwind spacing units: 2, 4, 6, 8, 12, 16, 20, 24, 32
- Section spacing: py-16 md:py-24 lg:py-32
- Component padding: p-6 md:p-8

## Features Implemented

### Core User Journeys
1. **View Gallery**: Browse face painting designs, filter by category, view in lightbox
2. **Request Booking**: 2-step form to request event booking with validation
3. **Send Contact Message**: Quick contact form for general inquiries
4. **Check Events**: View upcoming public events where face painter will be present
5. **Learn About Services**: See pricing and descriptions for different event types

### Technical Features
- Smooth scrolling navigation between sections
- Mobile-responsive design with hamburger menu
- Form validation using Zod schemas
- Image lightbox with prev/next navigation
- Category filtering in gallery
- Loading and success states for form submissions
- Professional imagery generated for hero and gallery

## Assets
All images located in `attached_assets/generated_images/`:
- Hero: Professional face painting action shot
- Gallery: 9 face painting designs (butterfly, tiger, Spider-Man, unicorn, lion, dragon, fairy, puppy, rainbow)
- Services: Birthday party and festival scenes

## Running the Project
- **Command**: `npm run dev`
- **Port**: Application runs on port 5000
- **Auto-restart**: Workflow automatically restarts after code changes

## Business Information
- **Business Name**: Happy Faces Belfast
- **Email**: happy_faces@hotmail.co.uk
- **WhatsApp**: +44 7356 088614
- **Location**: Belfast, Northern Ireland (Serving all of Belfast)
- **Google Reviews**: 5-star rated (integrated on website with link to leave reviews)

## SEO Keywords
- Face Painter Belfast
- Face Painting Belfast
- Party Entertainer Belfast
- Birthday Party Face Painting
- Children's Party Entertainer
- Happy Faces Belfast

## User Preferences
- Colorful, family-friendly design aesthetic
- Professional but approachable branding
- Easy-to-use contact and booking systems with WhatsApp integration
- Visual showcase of creative work
- Google reviews prominently displayed with link for customers to leave reviews
- Belfast, Northern Ireland - serving all of Belfast
- Strong SEO for Google search visibility
- Always ask before building new functionality
- **Email-only approach**: Contact messages and booking requests sent directly via email (not stored in database)
- **No admin dashboard**: All customer inquiries handled via email notifications

## Recent Changes (October 24, 2025)
- **Gallery Carousel**: Converted gallery from static grid to native CSS horizontal scroll carousel with auto-scroll
  - Uses browser-native horizontal scrolling with CSS `scroll-snap` (no external library)
  - Auto-scroll functionality: advances every 3.5 seconds, pauses on hover, loops continuously
  - Manual scroll/swipe supported for user control
  - Responsive: 85vw (mobile), 50% (tablet), 33% (desktop) slide widths
  - Category filtering automatically resets scroll position
  - Lightbox with prev/next navigation buttons preserved and working
  - Simplified implementation - carousel navigation buttons removed, lightbox navigation retained

## Previous Changes (October 23, 2025)
- **Email Integration**: Implemented Resend email service for contact forms and booking requests
  - Contact messages and booking requests now sent directly to happy_faces@hotmail.co.uk
  - No database storage for customer inquiries (email-only approach per user preference)
  - Reply-to functionality enables easy customer responses
  - Removed GET endpoints for bookings and contact messages (no longer needed)

## Previous Changes (October 22, 2025)
- Initial implementation of complete face painting business website
- All data models, API endpoints, and storage interfaces created
- Full frontend with 9 major components built (including Reviews section)
- 12 professional images generated for hero and gallery
- Design tokens configured (Fredoka font, purple/pink/blue color scheme)
- Forms integrated with React Query mutations
- Mobile-responsive layouts throughout
- SEO meta tags added to index.html with targeted keywords
- **Rebranded to Happy Faces Belfast** with actual business information
- **WhatsApp integration** added for instant contact
- **Google Reviews section** with link for customers to leave reviews on Google
- Contact email updated to happy_faces@hotmail.co.uk
- Phone number updated to +44 7356 088614
- Enhanced SEO with keywords: face painter belfast, party entertainer belfast, birthday party face painting
- **Database Migration**: Migrated from in-memory to PostgreSQL for persistent data storage
- **Booking Form Enhanced**: Added start time, event location/venue fields; added Communion Party and Christening Party event types; implemented smart duration recommendations based on number of children
- **Location Updated**: Changed from "West Belfast" to "Belfast" - now serving all of Belfast
- **Special Requests**: Made optional in booking form
