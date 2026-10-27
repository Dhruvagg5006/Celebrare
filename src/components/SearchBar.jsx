import React from 'react';

/**
 * SearchBar component for filtering photos in real time.
 * Wrapped in React.memo so it only re-renders when value or onChange changes.
 */
export function SearchBar({ value, onChange, onClear }) {
  return (
    <div className="relative w-full max-w-xl mx-auto">
      <div className="relative flex items-center">
        {/* Search Icon */}
        <div className="absolute left-4 pointer-events-none text-slate-400">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>

        {/* Search Input */}
        <input
          id="author-search-input"
          type="text"
          value={value}
          onChange={onChange}
          placeholder="Filter photos by author name..."
          className="w-full pl-11 pr-11 py-3 bg-slate-800/80 hover:bg-slate-800 focus:bg-slate-800 text-slate-100 placeholder-slate-400 rounded-2xl border border-slate-700 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/20 outline-none transition-all duration-200 text-base shadow-lg shadow-black/20"
          autoComplete="off"
        />

        {/* Clear Button */}
        {value && (
          <button
            type="button"
            onClick={onClear}
            className="absolute right-3.5 p-1 rounded-lg text-slate-400 hover:text-slate-100 hover:bg-slate-700/60 transition-colors cursor-pointer"
            aria-label="Clear search input"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}

export default React.memo(SearchBar);
