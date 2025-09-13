# TaskFlow

## App Description

TaskFlow offers a to-do list feature set in a flow board interface, providing an intuitive kanban-style workflow for task management.

## Features

- **Kanban Board Interface**: Drag-and-drop task management across customizable columns
- **Task Management**: Create, edit, delete, and organize tasks with priorities and due dates
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Single User, Single Board**: TaskFlow is designed to be a standalone web app, to either run locally or to be deployed online, but used by a single user
- **Local Data**: The application data is stored locally, using the browser's local storage, the data can be exported and imported as a JSON file

### Task Management Features

- Title (required), description, and due date
- User can add a flag to a task to indicate it's blocked
- Up to five tags can be added to a task, each tag can have a different colour
- Tasks can be marked complete
- Board can toggle visibility of completed tasks

## Technology Stack

### Frontend

- **Framework**: React 18+ with TypeScript
- **Styling**: Tailwind CSS for responsive design
- **State Management**: Zustand for client-side state
- **Drag & Drop**: @dnd-kit for kanban functionality
- **Build Tool**: Vite for fast development and building

### Data Storage

- **Storage**: Browser localStorage for persistence
- **Data Export/Import**: JSON file format
- **No Backend Required**: Pure frontend application

### Development & Deployment

- **Package Manager**: npm
- **Testing**: Vitest + React Testing Library
- **Linting**: ESLint + Prettier
- **Type Checking**: TypeScript strict mode
- **Deployment**: Static hosting (Netlify, Vercel, GitHub Pages)

## Prerequisites

- Node.js 18+ and npm
- Modern web browser with localStorage support

## Installation

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/taskflow.git
cd taskflow
```

### 2. Install dependencies

```bash
# Install dependencies
npm install
```

### 3. Start development

```bash
# Start the development server
npm run dev
```

## Development

### Start the development server

```bash
# Start the application
npm run dev
```

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run test         # Run tests
npm run test:watch   # Run tests in watch mode
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript compiler check
```

## Project Structure

```bash
taskflow/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── Board/          # Kanban board components
│   │   ├── Task/           # Task-related components
│   │   └── UI/             # Generic UI components
│   ├── hooks/              # Custom React hooks
│   ├── stores/             # Zustand stores for state management
│   ├── utils/              # Utility functions
│   │   ├── localStorage.ts # Local storage helpers
│   │   └── export.ts       # Data export/import functions
│   ├── types/              # TypeScript type definitions
│   └── App.tsx             # Main application component
├── public/                 # Static assets
├── docs/                   # Project documentation
└── package.json            # Project configuration
```

## Data Management

### Local Storage Structure

```typescript
interface AppData {
  board: {
    id: string;
    title: string;
    columns: Column[];
  };
  tasks: Task[];
  settings: {
    theme: 'light' | 'dark';
    autoSave: boolean;
  };
}
```

### Data Export/Import

- **Export**: Download current board and tasks as JSON file
- **Import**: Upload JSON file to restore board state
- **Auto-save**: Automatically saves changes to localStorage
- **Data persistence**: All data persists between browser sessions

## Data Types

### Core Entities

```typescript
interface Column {
  id: string;
  title: string;
  position: number;
}

interface Task {
  id: string;
  title: string;
  description?: string;
  columnId: string;
  position: number;
  priority: 'low' | 'medium' | 'high';
  dueDate?: string;
  blocked: boolean;
  completed: boolean;
  tags: Tag[];
  createdAt: string;
  updatedAt: string;
}

interface Tag {
  id: string;
  name: string;
  color: string;
}
```

## Testing

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch
```

### Test Coverage

- Unit tests for components and utilities
- Integration tests for user workflows
- E2E tests for critical features

## Deployment

### Static Hosting

```bash
# Build for production
npm run build

# The dist/ folder contains the built application
# Deploy to any static hosting service:
# - Netlify
# - Vercel
# - GitHub Pages
# - AWS S3
```

### Local Production Build

```bash
# Build and preview locally
npm run build
npm run preview
```

## Troubleshooting

### Common Issues

#### Data not persisting

- Check if localStorage is enabled in your browser
- Verify you're not in private/incognito mode
- Clear browser cache and reload if data seems corrupted

#### Port conflicts

- Default development server: <http://localhost:5173>
- Change port with `npm run dev -- --port 3000`

#### Build failures

- Clear node_modules and reinstall dependencies
- Check Node.js version compatibility
- Ensure all dependencies are compatible

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Follow TypeScript strict mode
- Write tests for new features
- Use conventional commit messages
- Ensure all linting checks pass

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Roadmap

- [ ] PWA (Progressive Web App) support for offline usage
- [ ] Advanced task filtering and search
- [ ] Multiple board templates
- [ ] Time tracking for tasks
- [ ] Keyboard shortcuts
- [ ] Data backup to cloud storage (Google Drive, Dropbox)
- [ ] Print/PDF export functionality
