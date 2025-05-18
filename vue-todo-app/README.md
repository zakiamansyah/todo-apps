# Vue Todo App

A beautiful Todo application built with **Vue 3**, **TypeScript**, **Pinia**, **Vue Router**, **Tailwind CSS**, and **Vite**.

## Features

- User authentication (login)
- Create, read, update, and delete todos
- Mark todos as complete/incomplete
- Filter todos by status (all, completed, incomplete)
- Responsive and modern UI with Tailwind CSS
- Light/Dark theme switcher
- Toast notifications for feedback

## Project Structure

```
├── public/                # Static assets
├── src/
│   ├── assets/            # Images and icons
│   ├── components/        # Reusable Vue components
│   ├── layouts/           # Layout components
│   ├── pages/             # Route-based pages
│   ├── router/            # Vue Router setup
│   ├── services/          # API service modules
│   ├── stores/            # Pinia stores (state management)
│   ├── types/             # TypeScript type definitions
│   ├── App.vue            # Main app component
│   ├── main.ts            # App entry point
│   └── style.css          # Tailwind and global styles
├── index.html             # App HTML entry
├── package.json           # Project metadata and scripts
├── tailwind.config.js     # Tailwind CSS config
├── tsconfig*.json         # TypeScript configs
└── vite.config.ts         # Vite config
```

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v16+ recommended)
- [npm](https://www.npmjs.com/) (comes with Node.js)

## Installation

1. **Clone the repository:**

   ```sh
   git clone https://github.com/zakiamansyah/vue-todo-app.git
   cd vue-todo-app
   ```

2. **Install dependencies:**

   ```sh
   npm install
   ```

3. **Run the development server:**

   ```sh
   npm run dev
   ```

   The app will be available at [http://localhost:5173](http://localhost:5173).

4. **Build for production:**

   ```sh
   npm run build
   ```

5. **Preview the production build:**

   ```sh
   npm run preview
   ```

## Environment

- The app uses a remote API endpoint (see [`src/services/api.ts`](src/services/api.ts)).
- No additional environment variables are required for local development.

## Customization

- **Theme**: Use the theme switcher in the header to toggle light/dark mode.
- **API**: To change the API base URL, edit the `baseURL` in [`src/services/api.ts`](src/services/api.ts).
