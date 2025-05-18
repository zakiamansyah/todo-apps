# React Todo App

A modern Todo application built with React, TypeScript, Vite, and Tailwind CSS.

## Features

- User authentication (login/logout)
- Add, edit, delete, and filter todos
- Mark todos as completed/incomplete
- Responsive UI with light/dark mode
- Toast notifications for actions

## Project Structure

- `src/components/` – UI components (Todo list, Todo item, Buttons, etc.)
- `src/hooks/` – Custom React hooks (e.g., `useTodos` for todo logic)
- `src/pages/` – Page components (Login, Todos, NotFound)
- `src/services/` – API service logic
- `src/types/` – TypeScript type definitions
- `src/contexts/` – Context providers (auth, theme)
- `src/routes/` – Routing setup

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18+ recommended)
- [npm](https://www.npmjs.com/)

### Installation

1. **Clone the repository:**
   ```sh
   git clone git@github.com:zakiamansyah/react-todo-app.git
   cd react-todo-app
   ```

2. **Install dependencies:**
   ```sh
   npm install
   ```

### Running the App

Start the development server:

```sh
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Building for Production

```sh
npm run build
```

Preview the production build:

```sh
npm run preview
```

### Linting

```sh
npm run lint
```

## Customization

- Tailwind CSS config: `tailwind.config.js`
- Theme and authentication logic: `src/contexts/`
- Todo logic: `src/hooks/useTodos.ts`

---