# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

TaskFlow is a single-user kanban board application built with React and TypeScript. It stores data locally using browser localStorage and provides a complete task management system with tags, priorities, due dates, and drag-and-drop functionality.

## Technology Stack

### Frontend
- **React 18+** with TypeScript for the UI
- **Vite** for fast development and building
- **Tailwind CSS** for responsive styling
- **Zustand** for lightweight state management
- **@dnd-kit** for accessible drag-and-drop (planned)

### Development Tools
- **ESLint** and **Prettier** for code quality
- **Vitest** and **React Testing Library** for testing
- **TypeScript** in strict mode

## Development Commands

```bash
npm run dev          # Start development server (http://localhost:5173)
npm run build        # Build for production
npm run preview      # Preview production build
npm run test         # Run tests
npm run test:watch   # Run tests in watch mode
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript compiler check
```

## Project Structure

```
src/
├── components/          # React components
│   ├── Board/          # Kanban board components
│   ├── Task/           # Task-related components
│   └── UI/             # Generic UI components
├── hooks/              # Custom React hooks
├── stores/             # Zustand stores for state management
├── utils/              # Utility functions and localStorage helpers
├── types/              # TypeScript type definitions
└── App.tsx             # Main application component
```

## Key Features Implemented

- ✅ Kanban board with multiple columns
- ✅ Task CRUD operations (create, read, update, delete)
- ✅ Task properties: title, description, priority, due date, blocked status
- ✅ Up to 5 colored tags per task
- ✅ Task completion toggle
- ✅ localStorage persistence with auto-save
- ✅ Data export/import via JSON files
- ✅ Responsive design with Tailwind CSS
- ⏳ Drag-and-drop functionality (infrastructure ready, @dnd-kit to be integrated)

## Architecture Notes

### State Management
- Uses Zustand for state management with three main stores:
  - `useTaskStore` - Task CRUD operations
  - `useBoardStore` - Board and column management
  - `useSettingsStore` - App settings and preferences

### Data Persistence
- All data is stored in browser localStorage
- Auto-save functionality saves changes immediately
- Export/import allows data backup and migration
- Sample data is loaded on first visit

### Component Structure
- Reusable UI components in `components/UI/`
- Task-specific components in `components/Task/`
- Board-specific components in `components/Board/`
- Header component for global actions

## Development Guidelines

- Follow TypeScript strict mode
- Use Tailwind CSS classes for styling
- Components should be functional with hooks
- Maintain the existing file structure
- Add tests for new utilities and components
- Use the existing color palette and design system

## Common Tasks

### Adding a new task property:
1. Update the `Task` interface in `src/types/index.ts`
2. Update the `TaskFormData` interface
3. Modify the `TaskForm` component
4. Update the `TaskCard` component to display the new property
5. Update localStorage utilities if needed

### Adding a new UI component:
1. Create the component in `src/components/UI/`
2. Export it from `src/components/UI/index.ts`
3. Follow the existing patterns for props and styling

### Modifying data structure:
1. Update types in `src/types/index.ts`
2. Update localStorage utilities in `src/utils/localStorage.ts`
3. Update relevant Zustand stores
4. Test data migration

## Current Status

The application is fully functional with a working kanban board, task management, and data persistence. The development server runs at http://localhost:5173 and the project builds without TypeScript errors.
