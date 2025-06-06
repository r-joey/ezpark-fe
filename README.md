# EzPark - Parking Reservation App (Frontend)

This project is the frontend for the EzPark parking reservation application, built with React and Vite.

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (which includes npm)

## Getting Started

Follow these steps to get your development environment running:

1.  **Clone the repository (if you haven't already):**
    ```bash
    git clone https://github.com/r-joey/ezpark-fe.git
    cd ezpark-fe
    ```

2.  **Install dependencies:**
    Open your terminal in the project root directory (`frontend/ezpark`) and run:
    ```bash
    npm install
    ```

## Available Scripts

In the project directory, you can run the following commands:

### `npm run dev`

Runs the app in development mode.
Open [http://localhost:5173](http://localhost:5173) (or the port shown in your terminal) to view it in your browser.
The page will reload when you make changes.

### `npm run build`

Builds the app for production to the `dist` folder.
It correctly bundles React in production mode and optimizes the build for the best performance.

### `npm run lint`

Lints the project files using ESLint to check for code quality and potential errors.

### `npm run preview`

Serves the production build locally. This is useful for checking if the build was successful before deploying.

## Project Structure

-   `public/`: Contains static assets that are copied directly to the build output.
-   `src/`: Contains the main application source code.
    -   `assets/`: Images and other static assets imported by components.
    -   `components/`: Reusable UI components.
    -   `pages/`: Top-level page components, often corresponding to routes.
    -   `stores/`: State management stores (e.g., Zustand).
    -   `utils/`: Utility functions and helpers.
    -   `App.jsx`: The root React component.
    -   `main.jsx`: The entry point of the application.
-   `vite.config.js`: Vite configuration file.
-   `package.json`: Lists project dependencies and scripts.
