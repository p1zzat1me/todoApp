# Todo App - Next.js + FastAPI

A modern, full-stack Todo application built with **Next.js 13** (React), **FastAPI**, **PostgreSQL**, and **Tailwind CSS**. Features priority-based task management, filtering, search capabilities, drag-and-drop reordering, and a polished UI powered by Radix UI.

## ✨ Features

### Core Functionality
- ✅ **Create, Read, Update, Delete (CRUD) Tasks** - Add, view, edit, and remove todos
- ✅ **Mark Tasks as Complete** - Toggle task completion status
- ✅ **Search Tasks** - Find todos by title
- ✅ **Filter by Status** - View all, completed, or incomplete tasks
- ✅ **Priority System** - Assign priority levels (1-10) to organize task importance
- ✅ **Sort by Priority** - Sort tasks in ascending or descending order
- ✅ **Due Dates** - Set and track task deadlines
- ✅ **Categories** - Organize tasks by category
- ✅ **Drag-and-Drop Reordering** - Intuitively rearrange tasks with smooth animations
- ✅ **Toast Notifications** - Get instant feedback on actions

### Technical Highlights
- 🗄️ **PostgreSQL Database** - Persistent, reliable data storage
- 🎨 **Radix UI Components** - Accessible, unstyled component library
- 🎯 **TypeScript** - Type-safe frontend code
- 🎨 **Tailwind CSS** - Modern, responsive design
- 📱 **Responsive Design** - Works seamlessly on desktop, tablet, and mobile
- 🚀 **Production Ready** - Optimized for performance and scalability

## 🛠️ Tech Stack

### Frontend
- **Next.js 13.4** - React meta-framework with App Router
- **React 18** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first CSS framework
- **Radix UI** - Headless component library for accessible UI
- **Lucide React** - Beautiful icon library
- **React Hook Form** - Efficient form management
- **Zod** - TypeScript-first schema validation
- **@dnd-kit** - Headless drag-and-drop library
- **React Hot Toast** - Toast notifications
- **Axios** - HTTP client

### Backend
- **FastAPI** - Modern, fast web framework for building APIs with Python
- **SQLModel** - ORM combining SQLAlchemy and Pydantic
- **PostgreSQL** - Relational database
- **Psycopg2** - PostgreSQL adapter for Python

### Development Tools
- **npm/yarn** - Package management
- **Concurrently** - Run multiple processes simultaneously
- **ESLint** - Code linting
- **Next.js** - Built-in optimizations

## 📋 Project Structure

```
nextjs-fastapi-todo-app/
├── app/                    # Next.js app directory
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   ├── globals.css        # Global styles
│   └── new/               # Create new todo page
├── components/            # Reusable React components
│   ├── todo-form.tsx      # Create/edit todo form
│   ├── todos.tsx          # Main todos list
│   ├── todo-item.tsx      # Individual todo item
│   ├── todo-controls.tsx  # Filter and sort controls
│   ├── sortable-todos.tsx # Drag-and-drop todo list
│   └── ui/                # Radix UI component wrappers
├── lib/                   # Utilities and types
│   ├── types.ts          # TypeScript interfaces
│   └── utils.ts          # Helper functions
├── api/                   # FastAPI backend
│   ├── index.py          # FastAPI app and endpoints
│   ├── schema.py         # Pydantic/SQLModel schemas
│   ├── settings.py       # Configuration
│   └── todo/             # Todo-related logic
├── public/               # Static assets
├── tailwind.config.js    # Tailwind configuration
├── next.config.js        # Next.js configuration
├── tsconfig.json         # TypeScript configuration
└── requirements.txt      # Python dependencies
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm/yarn
- Python 3.8+
- PostgreSQL database

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd nextjs-fastapi-todo-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   pip install -r requirements.txt
   ```

3. **Set up environment variables**
   ```bash
   cp env.template .env.local
   ```
   
   Update `.env.local` with your PostgreSQL connection string:
   ```
   DATABASE_URL=postgresql://user:password@localhost:5432/todoapp
   ```

4. **Start PostgreSQL**
   ```bash
   # On Windows with PostgreSQL installed
   psql -U postgres
   # Create database
   CREATE DATABASE todoapp;
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```

   This command runs both:
   - **Frontend**: Next.js dev server on [http://localhost:3000](http://localhost:3000)
   - **Backend**: FastAPI dev server on [http://localhost:8000](http://localhost:8000)

### Development Commands

```bash
# Run both frontend and backend concurrently
npm run dev

# Run only Next.js frontend
npm run next-dev

# Run only FastAPI backend
npm run fastapi-dev

# Build for production
npm run build

# Start production server
npm start

# Run linting
npm run lint
```

## 📡 API Endpoints

The FastAPI backend provides the following endpoints (all under `/api`):

- `GET /todos` - Get all todos (with filters)
- `POST /todos` - Create a new todo
- `GET /todos/{id}` - Get a specific todo
- `PUT /todos/{id}` - Update a todo
- `DELETE /todos/{id}` - Delete a todo
- `GET /search` - Search todos by title

### Query Parameters
- `skip` - Number of items to skip (pagination)
- `limit` - Number of items to return
- `status` - Filter by status ('all', 'completed', 'incomplete')
- `priority` - Filter by priority level
- `q` - Search query string
- `sort_by` - Sort by field ('priority', 'due_date')
- `order` - Sort order ('asc', 'desc')

## 🎨 Design Features

- **Clean UI** - Intuitive, user-friendly interface with a minimal design
- **Responsive Layout** - Adapts to all screen sizes
- **Accessibility** - Built with Radix UI for WCAG compliance
- **Smooth Animations** - Tailwind CSS animations for better UX
- **Dark Mode Ready** - Tailwind CSS dark mode support
- **Toast Notifications** - Real-time feedback for user actions

## 🧪 Features in Detail

### Task Management
- Add new tasks with title, priority (1-10), due date, and category
- Edit existing tasks inline or through a dedicated form
- Delete tasks with confirmation
- Mark tasks as complete/incomplete

### Organization
- **Filter by Status**: View all tasks, only completed, or only pending
- **Search**: Quickly find tasks by title
- **Sort by Priority**: Organize by importance (ascending/descending)
- **Categories**: Group tasks by custom categories
- **Due Dates**: Track task deadlines

### User Experience
- **Drag-and-Drop**: Reorder tasks by dragging (with smooth animations)
- **Instant Feedback**: Toast notifications for all actions
- **Form Validation**: Client-side and server-side validation with error messages
- **Keyboard Navigation**: Full keyboard support for accessibility

## 🌐 Deployment

This application is ready for production deployment on platforms like:
- **Vercel** - Recommended (native Next.js + Python serverless support)
- **Render** - Full-stack hosting
- **Railway** - Modern deployment platform

### Deploying to Vercel

1. Push your repository to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy with one click

The FastAPI backend will be hosted as Python serverless functions automatically.

## 📚 Learning Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [FastAPI Documentation](https://fastapi.tiangolo.com/)
- [SQLModel Documentation](https://sqlmodel.tiangolo.com/)
- [Tailwind CSS Documentation](https://tailwindcss.com/)
- [Radix UI Documentation](https://www.radix-ui.com/)

## 📝 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Contributions are welcome! Feel free to open issues and submit pull requests.

## 📧 Support

For issues or questions, please open an issue on the GitHub repository.
