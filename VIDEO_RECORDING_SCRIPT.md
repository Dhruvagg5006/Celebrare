# 5-Minute Screen Recording Script & Walkthrough

Use this script during your video recording (record via Windows `Win + G`, OBS Studio, or QuickTime). Keep your recording under 5 minutes and cover these exact 5 points in order.

---

### **Section 1: Show the App Working (approx. 1:00)**
> **What to show on screen:** Open `http://localhost:5173/` in your browser.

- **Spoken Walkthrough:**
  > "Hello! Today I'm demonstrating my Photo Gallery web application built with React, Vite, and Tailwind CSS for the Celebrare frontend internship assignment.
  >
  > As we refresh the page, you can see the animated loading spinner while 30 photos are fetched from the Picsum Photos API.
  >
  > The photos are laid out in a responsive grid: 4 columns on desktop, 2 columns on tablet, and 1 column on mobile.
  >
  > Next, I'll test the search bar at the top. When I type 'Alejandro', the gallery filters in real-time without reloading the page or making any network requests. Clearing the search immediately restores all 30 photos.
  >
  > Finally, clicking the heart icon on any card toggles it as a favourite, turning the heart red and updating our favorited count in the header. If I refresh the page now, notice that card #0 and #1 remain favorited. This proves that our favourites list persists across page reloads via localStorage."

---

### **Section 2: Open `useFetchPhotos` Hook (approx. 0:50)**
> **What to show on screen:** Open `src/hooks/useFetchPhotos.js` in VS Code.

- **Spoken Walkthrough:**
  > "Now let's look at `useFetchPhotos.js`.
  >
  > **What does it return?** It returns an object containing `{ photos, loading, error, refetch }`.
  > - `photos`: Array holding the 30 photo objects fetched from Picsum.
  > - `loading`: A boolean flag initialized to `true` that turns `false` once the request completes or fails.
  > - `error`: Stores any error message if the network request fails, or `null` on success.
  >
  > **What happens if the API fails?**
  > If the response is not OK (e.g., HTTP 404 or 500) or if a network failure occurs, the `try/catch` block catches the error, sets the `error` state with the failure message, and sets `loading` to `false`. In `Gallery.jsx`, this conditionally displays our `<ErrorMessage />` component with a retry button instead of crashing."

---

### **Section 3: Open `useReducer` Code (approx. 1:00)**
> **What to show on screen:** Open `src/reducers/favoritesReducer.js` and show the `useReducer` line in `src/components/Gallery.jsx`.

- **Spoken Walkthrough:**
  > "Here is our favorites reducer in `favoritesReducer.js`.
  >
  > **What actions does it handle?**
  > - `TOGGLE_FAVORITE`: Checks if a photo ID is already in the array. If present, it filters it out; if absent, it appends it.
  > - `ADD_FAVORITE`: Adds an ID if not already present.
  > - `REMOVE_FAVORITE`: Removes a specific ID.
  > - `CLEAR_ALL`: Resets the state back to an empty array.
  >
  > **Why did I choose `useReducer` instead of `useState`?**
  > While `useState` is fine for simple primitives, `useReducer` provides predictable, centralized state transitions. It decouples the state update logic from UI components, ensures our reducer remains a pure function, and scales cleanly when handling complex actions or batch updates without scattering setState calls throughout multiple components."

---

### **Section 4: `useCallback` & `useMemo` in `Gallery.jsx` (approx. 1:10)**
> **What to show on screen:** Open `src/components/Gallery.jsx` and highlight `handleSearchChange` and `filteredPhotos`.

- **Spoken Walkthrough:**
  > "In `Gallery.jsx`, I used both `useCallback` and `useMemo`.
  >
  > **What problem does each solve?**
  > 1. **`useCallback`** is used on `handleSearchChange`. It memoizes the event handler function reference so that React doesn't recreate a new function instance on every single render. Because `<SearchBar>` is wrapped in `React.memo`, passing a stable callback reference prevents the search bar from unnecessarily re-rendering whenever other state (like favourites) changes.
  > 2. **`useMemo`** is used to compute `filteredPhotos`. Filtering 30 photo items involves string manipulation and array filtering. With `useMemo`, this calculation is cached and only recomputes when `photos` or `searchTerm` changes.
  >
  > **What would break if removed?**
  > If we removed `useMemo`, clicking a heart icon to favorite a photo would force the entire array filter operation to re-run on every click, even though the search query didn't change. If we removed `useCallback`, child components would receive fresh function references every render, breaking memoization optimizations."

---

### **Section 5: One Thing That Was Difficult & Solution (approx. 1:00)**
> **What to show on screen:** Show `initFavorites` in `favoritesReducer.js` and the `useEffect` sync in `Gallery.jsx`.

- **Spoken Walkthrough:**
  > "One challenge I encountered was handling `localStorage` persistence cleanly alongside `useReducer`.
  >
  > Initially, it can be tempting to put `localStorage.setItem` directly inside the reducer function. However, React requires reducers to be pure functions with zero side effects. In React 19's StrictMode, reducers run twice in development, which would cause duplicate side effects and desync.
  >
  > To solve this properly:
  > 1. I used React's third argument for lazy initialization: `useReducer(favoritesReducer, [], initFavorites)`. This reads from `localStorage` once during mount without blocking initial render.
  > 2. I used a dedicated `useEffect` that listens to `[favorites]` to cleanly write the updated array back to `localStorage`.
  >
  > This keeps the reducer 100% pure, satisfies React best practices, and ensures robust persistence across page refreshes."

---

### **Submission Checklist**
1. **Push code to public GitHub:**
   ```bash
   git add .
   git commit -m "feat: complete photo gallery assignment with useReducer, custom hook, and memoization"
   git push origin <your-branch>
   ```
2. **Record your video:** 3 to 5 minutes, covering the 5 points above.
3. **Upload video:** Upload to Google Drive or YouTube (set to **Unlisted**).
4. **Submit Google Form:**
   - GitHub link
   - Video link
   - Hardest part: *"Architecting clean localStorage synchronization with a pure useReducer and lazy initializer in React 19 StrictMode."*
