# ChronicleInk FullStack News Platform

A modern, full-featured news platform built with React, Vite, Firebase, and Node.js. ChronicleInk offers premium content, subscription management, article publishing, and a robust admin dashboard.

## Live Demo

- **Client:** [https://chronicle-ink-full-stack-news-platf.vercel.app/](https://chronicle-ink-full-stack-news-platf.vercel.app/)
- **Repository:** [MRaysa/ChronicleInk-FullStack-News-Platform](https://github.com/MRaysa/ChronicleInk-FullStack-News-Platform)

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
  - [Running Locally](#running-locally)
- [Deployment](#deployment)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)

---

## Features

- 🔒 Authentication (Firebase)
- 📰 Article publishing, editing, and management
- 💎 Premium subscription plans
- 👨‍💼 Admin dashboard (manage users, articles, publishers)
- 🎨 Responsive UI with Tailwind CSS & Flowbite React
- 📊 Data visualization (Google Charts)
- 🌗 Light/Dark theme support
- ⚡ Fast performance with Vite

---

## Tech Stack

**Frontend:**

- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Flowbite React](https://flowbite-react.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [React Query](https://tanstack.com/query/latest)
- [React Router](https://reactrouter.com/)
- [React Icons](https://react-icons.github.io/react-icons/)
- [Google Charts](https://react-google-charts.com/)

**Backend:**

- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [Firebase Authentication](https://firebase.google.com/docs/auth)

**Deployment:**

- [Vercel](https://vercel.com/) (Client & Server)

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v16+ recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [Git](https://git-scm.com/)

### Installation

1. **Clone the repository:**

   ```sh
   git clone https://github.com/MRaysa/ChronicleInk-FullStack-News-Platform.git
   cd ChronicleInk-FullStack-News-Platform
   ```

2. **Install dependencies:**

   ```sh
   npm install
   # or
   yarn install
   ```

### Environment Variables

Create a `.env` file in the root directory and add your configuration:

```env
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
VITE_FIREBASE_PROJECT_ID=your_firebase_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
VITE_FIREBASE_APP_ID=your_firebase_app_id
VITE_IMGB_API_KEY=your_imgbb_api_key
```

> **Note:** You can get Firebase config from your [Firebase Console](https://console.firebase.google.com/).

### Running Locally

Start the development server:

```sh
npm run dev
# or
yarn dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## Deployment

The project is deployed on [Vercel](https://vercel.com/):

- **Client:** [https://chronicle-ink-full-stack-news-platf.vercel.app/](https://chronicle-ink-full-stack-news-platf.vercel.app/)
- **Server:** See your backend repo and Vercel dashboard for details.

To deploy your own version:

1. Push your code to GitHub.
2. Import the repo in [Vercel](https://vercel.com/import).
3. Set environment variables in Vercel dashboard.
4. Deploy!

---

## Project Structure

```
├── src/
│   ├── components/         # Reusable UI components
│   ├── context/            # React context providers (Auth, Theme)
│   ├── hook/               # Custom hooks
│   ├── layouts/            # Layout components (Admin, Main)
│   ├── pages/              # Route pages (Home, Articles, Profile, etc.)
│   ├── Routes/             # App routing
│   ├── utils/              # Utility functions
│   ├── index.css           # Global styles
│   └── main.jsx            # App entry point
├── public/                 # Static assets
├── .env                    # Environment variables
├── package.json            # Project metadata & scripts
├── tailwind.config.js      # Tailwind CSS config
├── vite.config.js          # Vite config
└── README.md               # Project documentation
```

---

## Contributing

Contributions are welcome! Please open issues or submit pull requests for improvements and bug fixes.

---

---

**Made with ❤️ by [MRaysa](https://github.com/MRaysa)**
