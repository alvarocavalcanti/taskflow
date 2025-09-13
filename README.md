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

### Backend

- **Runtime**: Node.js with Express.js
- **Database**: Browser local storage
- **Authentication**: No need to authenticate
- **API**: RESTful API with input validation

### Development & Deployment

- **Package Manager**: npm
- **Testing**: Vitest + React Testing Library
- **Linting**: ESLint + Prettier
- **Type Checking**: TypeScript strict mode
- **Deployment**: Docker containerization

## Prerequisites

- Node.js 18+ and npm
- Docker (optional, for containerized deployment)

## Installation

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/taskflow.git
cd taskflow
```

### 2. Install dependencies

```bash
# Install frontend dependencies
cd frontend
npm install

# Install backend dependencies
cd ../backend
npm install
```

### 3. Environment Setup

```bash
# Copy environment files
cp .env.example .env

# No environment configuration needed for local storage app
```

## Development

### Start the development server

```bash
# Terminal 1: Start backend server
cd backend
npm run dev

# Terminal 2: Start frontend development server
cd frontend
npm run dev
```

### Available Scripts

#### Frontend (`/frontend`)

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run test         # Run tests
npm run test:watch   # Run tests in watch mode
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript compiler check
```

#### Backend (`/backend`)

```bash
npm run dev          # Start development server with hot reload
npm run build        # Compile TypeScript to JavaScript
npm run start        # Start production server
npm run test         # Run tests
```

## Project Structure

```bash
taskflow/
├── frontend/                 # React frontend application
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── pages/          # Page components
│   │   ├── hooks/          # Custom React hooks
│   │   ├── stores/         # Zustand stores
│   │   ├── utils/          # Utility functions
│   │   ├── types/          # TypeScript type definitions
│   │   └── api/            # API client functions
│   ├── public/             # Static assets
│   └── package.json
├── backend/                 # Express.js backend API
│   ├── src/
│   │   ├── routes/         # API route handlers
│   │   ├── middleware/     # Express middleware
│   │   ├── models/         # Database models
│   │   ├── services/       # Business logic
│   │   ├── utils/          # Utility functions
│   │   └── types/          # TypeScript type definitions
│   ├── prisma/             # Database schema and migrations
│   └── package.json
├── docs/                   # Project documentation
└── docker-compose.yml     # Docker configuration
```

## API Documentation

### Authentication Endpoints

- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/refresh` - Refresh access token
- `POST /api/auth/logout` - User logout

### Board Endpoints

- `GET /api/boards` - Get user's boards
- `POST /api/boards` - Create new board
- `GET /api/boards/:id` - Get board by ID
- `PUT /api/boards/:id` - Update board
- `DELETE /api/boards/:id` - Delete board

### Task Endpoints

- `GET /api/boards/:boardId/tasks` - Get tasks for board
- `POST /api/boards/:boardId/tasks` - Create new task
- `PUT /api/tasks/:id` - Update task
- `DELETE /api/tasks/:id` - Delete task
- `PUT /api/tasks/:id/move` - Move task between columns

## Database Schema

### Core Entities

- **Users**: Authentication and user profiles
- **Boards**: Project/workflow containers
- **Columns**: Kanban board columns (To Do, In Progress, Done, etc.)
- **Tasks**: Individual work items with metadata
- **BoardMembers**: User access control for boards

## Testing

### Running Tests

```bash
# Frontend tests
cd frontend && npm test

# Backend tests
cd backend && npm test

# Run all tests
npm run test:all
```

### Test Coverage

- Unit tests for components and utilities
- Integration tests for API endpoints
- E2E tests for critical user flows

## Deployment

### Using Docker

```bash
# Build and start all services
docker-compose up --build

# Production deployment
docker-compose -f docker-compose.prod.yml up -d
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
