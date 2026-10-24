# Monotune

Monotune is a web-based music discovery and listening experience built with React. Explore music by popularity, release date, listening trends, and genre; search for tracks and artists; and listen through a persistent audio player with queue management and playback controls.

## Features

- **Discover music** through curated sections for weekly popularity, recent releases, and weekly listens.
- **Explore genres** including Pop, Rock, Jazz, Electronic, Ambient, and Lo-fi.
- **Search tracks and artists** with debounced search and dedicated loading, empty, and error states.
- **Listen with playback controls** for play/pause, seeking, volume, mute, previous/next track, shuffle, and repeat modes.
- **Manage the listening queue** by adding tracks, removing individual tracks, clearing the queue, and shuffling playback order. The queue supports up to 10 tracks.
- **Use the compact or fullscreen player** and open the queue panel while browsing.
- **Download tracks when permitted** by the music provider.
- **Persist player preferences and queue state** in browser storage using Zustand persist middleware.
- **Responsive dark interface** with loading skeletons and toast notifications.

Music catalog and track metadata are provided by the [Jamendo API](https://developer.jamendo.com/v3.0).

## Tech stack

- [React 19](https://react.dev/) — UI
- [Vite](https://vite.dev/) — development server and build tooling
- [Tailwind CSS 4](https://tailwindcss.com/) — styling
- [TanStack Query](https://tanstack.com/query/latest) — asynchronous music data fetching and caching
- [Zustand](https://zustand.docs.pmnd.rs/) — player, queue, and persisted state
- [Lucide React](https://lucide.dev/) — icons
- [React Toastify](https://fkhadra.github.io/react-toastify/) — notifications
- [Jamendo API](https://developer.jamendo.com/v3.0) — music catalog and streaming metadata

## Getting started

### Prerequisites

- [Node.js](https://nodejs.org/) with npm
- A Jamendo API client ID

### 1. Clone the repository

```bash
git clone https://github.com/devanas2906/audio-music-project.git
cd audio-music-project
```

> If you rename the GitHub repository to `Monotune`, use the updated repository URL and folder name here.

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a local `.env` file from the example:

**macOS / Linux**
```bash
cp .env.example .env
```

**Windows PowerShell**
```powershell
Copy-Item .env.example .env
```

Set the values in `.env`:

```dotenv
VITE_JAMENDO_CLIENT_ID=your_jamendo_client_id
VITE_APPLICATION_NAME=Monotune
```

Get a client ID from the [Jamendo Developer Portal](https://developer.jamendo.com/). These variables are exposed to the browser by Vite, so do not put private server-side secrets in `VITE_*` variables.

### 4. Start the development server

```bash
npm run dev
```

Open the local URL printed by Vite in your terminal.

## Available scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the local development server |
| `npm run build` | Create a production build |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint |

## Project structure

```text
src/
├── components/
│   └── home/                 # Home page, music cards, search, queue, and players
│       └── skeletons/        # Loading placeholders
├── errors/                   # Music-related error types
├── services/
│   └── jamendo.js            # Jamendo API requests
├── stores/
│   ├── usePlayerStore.js     # Playback state and controls
│   ├── usePlayerUIStore.js   # Fullscreen and queue-panel UI state
│   └── useQueueStore.js      # Queue, shuffle, and track navigation
├── styles/                   # Audio slider styling
└── utilities/
    ├── constant/             # Genres, sections, and result limits
    ├── formats/               # API data and duration formatting
    └── ...                    # Search debounce, notifications, shuffle, helpers
public/
└── favicon/                  # App icons and web manifest
```

## How it works

1. Monotune requests track data from Jamendo for the discovery sections or search query.
2. TanStack Query handles request caching, loading states, and retries.
3. Track metadata is normalized before it is displayed in music cards and search results.
4. Zustand stores coordinate the audio element, playback controls, queue navigation, shuffle, and repeat behavior.
5. The player and queue are persisted locally in the browser; no Monotune account is required by the current implementation.

## Notes

- Search starts when the input contains at least three characters, with a short debounce to avoid sending a request for every keystroke.
- Track downloads are only shown as available when the API marks them as permitted.
- Music availability, streaming URLs, metadata, and download permissions depend on Jamendo and may vary by track.
- The app requires an internet connection to retrieve catalog data and stream music.

## License

No license file is currently included in this repository. Add a `LICENSE` file if you intend to distribute the project under a specific open-source license.
