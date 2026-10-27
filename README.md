# Photo Gallery — Celebrare Frontend Internship Assignment

A responsive Photo Gallery web application built with **React**, **Vite**, and **Tailwind CSS**. Fetches 30 photos from the Picsum Photos API, displays them in a responsive multi-column grid, provides real-time author filtering, and persists favorited photos across refreshes using `useReducer` and `localStorage`.

---

## 🚀 Live Demo & Preview
- **Development Server:** `http://localhost:5173/`
- **Tech Stack:** React 19, Vite 8, Tailwind CSS v4

---

## 📋 Requirements & Implementation Checklist

| # | Requirement | Implementation Details | Status |
|---|---|---|---|
| **1** | **Project Setup** | Built with React + Vite + Tailwind CSS. Strictly no external UI component libraries (no MUI, no Ant Design, no Bootstrap). | ✅ Complete |
| **2** | **Fetch Photos from API** | Fetches 30 photos from `https://picsum.photos/v2/list?limit=30` on mount. Includes animated loading spinner and error handling with retry. | ✅ Complete |
| **3** | **Responsive Grid** | Responsive Tailwind CSS grid: **4 columns on desktop**, **2 columns on tablet**, **1 column on mobile**. Each card shows photo, author name, and heart icon button. | ✅ Complete |
| **4** | **Search Filter** | Top search input filters displayed photos by author name in real time without page reload or additional API requests. | ✅ Complete |
| **5** | **Favourites with useReducer** | Heart icon toggles favorites. Managed with `useReducer` (not `useState`). Persisted across page refreshes via `localStorage`. | ✅ Complete |
| **6** | **Custom Hook** | Fetch logic extracted into `useFetchPhotos` returning `{ photos, loading, error, refetch }`. `Gallery` component uses this hook. | ✅ Complete |
| **7** | **useCallback + useMemo** | `useCallback` memoizes search and favorite handlers; `useMemo` computes the filtered photos list. | ✅ Complete |

---

## 📁 Project Architecture

```
celebrare-intern/
├── src/
│   ├── components/
│   │   ├── Gallery.jsx          # Main gallery component coordinating hooks, search, grid
│   │   ├── PhotoCard.jsx        # Individual photo card (photo, author, heart button)
│   │   ├── SearchBar.jsx        # Search input with real-time filter & clear trigger
│   │   ├── LoadingSpinner.jsx   # Animated loading spinner
│   │   └── ErrorMessage.jsx     # Error state presentation with retry action
│   ├── hooks/
│   │   └── useFetchPhotos.js    # Custom hook fetching 30 photos with loading & error states
│   ├── reducers/
│   │   └── favoritesReducer.js  # Pure reducer for favorites state & localStorage init
│   ├── App.jsx                  # Main application shell with header, container & footer
│   ├── index.css                # Tailwind CSS imports and base typography
│   └── main.jsx                 # React root rendering with StrictMode
├── VIDEO_RECORDING_SCRIPT.md    # 5-minute video recording script & walkthrough
├── package.json
└── vite.config.js
```

---

## 🛠️ Setup & Running Locally

1. **Clone the repository:**
   ```bash
   git clone <your-repo-url>
   cd celebrare-intern
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:5173/](http://localhost:5173/) in your browser.

4. **Run linter:**
   ```bash
   npm run lint
   ```

5. **Build for production:**
   ```bash
   npm run build
   ```

---

## 📹 5-Minute Video Recording Guide

See [VIDEO_RECORDING_SCRIPT.md](./VIDEO_RECORDING_SCRIPT.md) for a complete spoken script covering all 5 mandatory rubric questions:
1. App demonstration (loading, searching, toggling, persisting).
2. `useFetchPhotos` hook walkthrough.
3. `useReducer` rationale and action dispatching.
4. `useCallback` & `useMemo` explanation.
5. Key technical challenge and solution.
