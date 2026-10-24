# Monotune

A modern web-based music player built with React, featuring music discovery, genre browsing, search, queue management, and a seamless music playback experience powered by the Jamendo API.

## 🌐 Live Demo

Try Monotune here: https://monotune.pages.dev/

Explore the application directly in your browser without installing anything.

## ✨ Features

* 🎵 Music discovery and browsing
* 🔍 Search for music and tracks
* 🎧 Music playback with player controls
* 📚 Music browsing by genre and curated sections
* 📋 Queue management with support for up to 10 tracks
* 🖥️ Fullscreen music player
* 💾 Persistent application state for a smoother listening experience
* 🎨 Clean and responsive user interface
* 🔔 Toast notifications for user feedback
* ☁️ Jamendo API integration for music discovery and track data

## 📸 Screenshots

### Home & Music Discovery

![Home & Music Discovery](/docs/screenshots/home-page.jpg)

### Music Bottom Player

![Music Bottom Palyer](/docs/screenshots/audio-bottom-player.jpg)

### Music Fullscreen Player

![Music Fullscreen Player](/docs/screenshots/audio-full-screen-player.jpg)

### Music Search Results

![Music Search Results](/docs/screenshots/audio-search-results.jpg)

## 🛠️ Tech Stack

### Frontend

* React
* Vite
* JavaScript
* Tailwind CSS
* Lucide React

### State Management & Data Fetching

* Zustand
* TanStack Query

### API & Services

* Jamendo API
* React Toastify

## 📁 Project Structure

```text
monotune/
├── docs/
│   └── screenshots/          # Application screenshots for documentation
├── public/                   # Static assets
├── src/
│   ├── components/           # Reusable UI components
│   ├── errors/               # Error handling and error-related modules
│   ├── services/             # API integration and external services
│   ├── stores/               # Application state management
│   ├── styles/               # Application styling
│   ├── utilities/            # Shared utility functions
│   ├── App.jsx               # Main application component
│   ├── index.css             # Global styles
│   └── main.jsx              # Application entry point
├── .env.example              # Environment variable template
├── .gitignore                # Git ignore rules
├── eslint.config.js           # ESLint configuration
├── index.html                # HTML entry point
├── package.json              # Dependencies and npm scripts
├── package-lock.json         # Dependency lockfile
├── README.md                 # Project documentation
└── vite.config.js             # Vite configuration
```

## 🚀 Getting Started

### Requirements

* Node.js
* npm
* A Jamendo API client ID

### Installation

Clone the repository:

```bash
git clone https://github.com/devanas2906/monotune.git
cd monotune
```

Install dependencies:

```bash
npm install
```

### Environment Variables

Create a `.env` file in the project root based on `.env.example`:

```bash
cp .env.example .env
```

Configure the required environment variables:

```env
VITE_JAMENDO_CLIENT_ID=your_jamendo_client_id
VITE_APPLICATION_NAME=your_application_name
```

Replace `your_jamendo_client_id` with your Jamendo API client ID.

**Note:** Variables prefixed with `VITE_` are exposed to client-side code. Do not store private credentials or server-side secrets in these variables.

### Development

Start the development server:

```bash
npm run dev
```

Vite will provide a local URL in the terminal where you can access the application.

### Production

Build the application:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

### Linting

Run ESLint to check the code:

```bash
npm run lint
```

## 🔄 Main Workflow

```text
Open Monotune
      ↓
Browse Music Sections
      ↓
Explore Genres or Search Tracks
      ↓
Select a Track
      ↓
Start Music Playback
      ↓
Manage Playback and Queue
      ↓
Continue Discovering Music
```

## 🎯 Purpose

Monotune is a personal portfolio project built to explore modern frontend development, component-based architecture, API integration, state management, asynchronous data fetching, and interactive media player experiences.

The project demonstrates the implementation of a music discovery interface with playback controls, queue management, and a responsive user experience.

## 👤 Author

**Devanas**

GitHub: [@devanas2906](https://github.com/devanas2906)