import React, { useState, useReducer, useEffect, useCallback, useMemo } from 'react';
import useFetchPhotos from '../hooks/useFetchPhotos';
import {
  favoritesReducer,
  initFavorites,
  FAVORITES_STORAGE_KEY,
} from '../reducers/favoritesReducer';
import PhotoCard from './PhotoCard';
import SearchBar from './SearchBar';
import LoadingSpinner from './LoadingSpinner';
import ErrorMessage from './ErrorMessage';

/**
 * Gallery component implementing:
 * - useFetchPhotos custom hook (Requirement 2 & 6)
 * - Responsive grid: 4 cols desktop, 2 cols tablet, 1 col mobile (Requirement 3)
 * - Real-time search filter by author (Requirement 4)
 * - Favourites managed via useReducer + localStorage persistence (Requirement 5)
 * - useCallback on search filter handler & useMemo on filtered photo list (Requirement 7)
 */
export function Gallery() {
  // 1. Fetch photos data using custom hook (Requirement 6)
  const { photos, loading, error, refetch } = useFetchPhotos();

  // 2. Favourites state managed via useReducer (Requirement 5)
  // Lazy initialization reads from localStorage on initial render
  const [favorites, dispatch] = useReducer(favoritesReducer, [], initFavorites);

  // 3. Search query state
  const [searchTerm, setSearchTerm] = useState('');

  // 4. Persist favourites state to localStorage whenever it changes (Requirement 5)
  useEffect(() => {
    try {
      localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favorites));
    } catch (err) {
      console.error('Failed to sync favorites to localStorage:', err);
    }
  }, [favorites]);

  // 5. useCallback on search filter handler (Requirement 7)
  // Maintains stable function reference to avoid re-rendering SearchBar
  const handleSearchChange = useCallback((e) => {
    setSearchTerm(e.target.value);
  }, []);

  const handleClearSearch = useCallback(() => {
    setSearchTerm('');
  }, []);

  // 6. useCallback for toggling favorites to pass stable callback to memoized PhotoCards
  const handleToggleFavorite = useCallback((photoId) => {
    dispatch({ type: 'TOGGLE_FAVORITE', payload: photoId });
  }, []);

  // 7. useMemo to compute filtered photos list (Requirement 7)
  // Only recomputes when photos array or searchTerm changes, skipping recomputation on favorite toggles
  const filteredPhotos = useMemo(() => {
    const trimmed = searchTerm.trim().toLowerCase();
    if (!trimmed) {
      return photos;
    }
    return photos.filter((photo) =>
      photo.author.toLowerCase().includes(trimmed)
    );
  }, [photos, searchTerm]);

  return (
    <section className="w-full">
      {/* Top Search & Controls Section (Requirement 4) */}
      <div className="mb-10 flex flex-col items-center gap-4">
        <SearchBar
          value={searchTerm}
          onChange={handleSearchChange}
          onClear={handleClearSearch}
        />

        {/* Live Filter & Favorites Summary Indicator */}
        {!loading && !error && (
          <div className="flex flex-wrap items-center justify-center gap-3 text-sm text-slate-400">
            <span>
              Showing{' '}
              <strong className="text-slate-200">{filteredPhotos.length}</strong>{' '}
              of <strong className="text-slate-200">{photos.length}</strong> photos
            </span>
            <span className="text-slate-600">•</span>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-slate-800 border border-slate-700/80 text-rose-300">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-3.5 h-3.5 fill-rose-500 text-rose-500"
                viewBox="0 0 24 24"
              >
                <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
              </svg>
              <span>{favorites.length} favorited</span>
            </span>
          </div>
        )}
      </div>

      {/* Conditional Rendering: Loading State (Requirement 2) */}
      {loading && <LoadingSpinner />}

      {/* Conditional Rendering: Error State (Requirement 2) */}
      {!loading && error && <ErrorMessage error={error} onRetry={refetch} />}

      {/* Conditional Rendering: Empty Search Results */}
      {!loading && !error && filteredPhotos.length === 0 && (
        <div className="max-w-md mx-auto my-16 p-8 text-center rounded-2xl bg-slate-800/50 border border-slate-700/70">
          <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-slate-700/50 flex items-center justify-center text-slate-400">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          <h4 className="text-lg font-semibold text-slate-200 mb-1">
            No matching photos found
          </h4>
          <p className="text-slate-400 text-sm mb-4">
            No authors match &ldquo;{searchTerm}&rdquo;. Try another search term.
          </p>
          <button
            type="button"
            onClick={handleClearSearch}
            className="px-4 py-2 rounded-xl bg-slate-700 hover:bg-slate-600 text-white text-sm font-medium transition-colors cursor-pointer"
          >
            Clear Search
          </button>
        </div>
      )}

      {/* Responsive Grid: 4 cols desktop, 2 cols tablet, 1 col mobile (Requirement 3) */}
      {!loading && !error && filteredPhotos.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredPhotos.map((photo) => (
            <PhotoCard
              key={photo.id}
              photo={photo}
              isFavorite={favorites.includes(photo.id)}
              onToggleFavorite={handleToggleFavorite}
            />
          ))}
        </div>
      )}
    </section>
  );
}

export default Gallery;
