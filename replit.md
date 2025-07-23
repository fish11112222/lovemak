# Thai Chat App - Real-time Chat Application

## Overview

This is a modern Thai chat application built with React (frontend) and serverless API functions (backend). The application features real-time messaging, user authentication, theme customization, and a responsive design optimized for Thai language users. The project is designed to be deployed on Vercel as a full-stack application.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and optimized builds
- **UI Framework**: Tailwind CSS with shadcn/ui components
- **State Management**: TanStack Query (React Query) for server state
- **Routing**: Wouter for lightweight client-side routing
- **Forms**: React Hook Form with Zod validation
- **Font**: Itim (Thai-friendly Google Font)

### Backend Architecture
- **Runtime**: Vercel Edge Functions with Node.js
- **API Pattern**: RESTful API with TypeScript
- **Data Storage**: In-memory storage (demo) with Drizzle ORM schema ready for PostgreSQL
- **Authentication**: Simple credential-based auth
- **Validation**: Zod schemas for request/response validation

### Database Design
- **ORM**: Drizzle ORM with PostgreSQL schema definitions
- **Tables**: Users, Messages, Chat Themes, Chat Settings
- **Features**: User profiles, message history, theme customization, online status tracking

## Key Components

### Authentication System
- Simple sign-up/sign-in flow
- Form validation with Zod schemas
- Local storage for session persistence
- User profile management with avatar support

### Chat System
- Real-time message display with polling
- Message editing and deletion (own messages only)
- Emoji picker with categorized emojis
- GIF integration (Giphy-compatible)
- File upload support for images and documents
- Character limits and validation

### Theme System
- Customizable chat themes with color schemes
- Pre-defined themes (Classic Blue, Sunset Orange, Forest Green, Purple Dreams)
- Real-time theme switching
- CSS custom properties for dynamic theming

### User Management
- User profiles with bio, location, website fields
- Avatar upload and display
- Online status tracking
- User directory with search functionality
- Activity tracking and last seen status

## Data Flow

1. **User Authentication**: Sign-up/sign-in → API validation → Local storage → Chat access
2. **Message Flow**: Input → Validation → API POST → Database → Polling refresh → UI update
3. **Theme Changes**: Theme selector → API update → CSS variables update → Real-time UI change
4. **User Status**: Activity tracking → API updates → Online user list refresh

## External Dependencies

### Frontend Dependencies
- **UI Components**: Radix UI primitives for accessible components
- **Icons**: Lucide React for consistent iconography
- **Date Handling**: date-fns for Thai-friendly date formatting
- **Animations**: Framer Motion for smooth transitions
- **Form Handling**: React Hook Form + Hookform Resolvers

### Backend Dependencies
- **Validation**: Zod for schema validation
- **Database**: Drizzle ORM + Neon/PostgreSQL connector
- **Runtime**: Vercel Node.js runtime

### Development Tools
- **TypeScript**: Full type safety across frontend and backend
- **ESLint + Prettier**: Code formatting and linting
- **Tailwind CSS**: Utility-first CSS framework

## Deployment Strategy

### Vercel Deployment Configuration
- **Build Command**: `cd client && npm run build`
- **Output Directory**: `client/dist`
- **Install Command**: `cd client && npm install`
- **API Functions**: Serverless functions in `/api` directory
- **Rewrites**: SPA routing with API proxy configuration

### Environment Setup
- **Development**: Local development with Vite dev server
- **Production**: Vercel Edge deployment with serverless functions
- **Database**: Ready for Neon PostgreSQL integration (currently using in-memory storage)

### File Structure
```
├── api/                 # Serverless API functions
├── client/             # React frontend application
├── shared/             # Shared TypeScript schemas
├── server/             # Development server (not used in production)
└── vercel.json         # Vercel deployment configuration
```

The application is architected to be easily extensible with real database integration, WebSocket support for true real-time messaging, and additional features like direct messaging, file sharing, and advanced user management.