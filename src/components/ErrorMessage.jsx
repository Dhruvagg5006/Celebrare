import React from 'react';

export function ErrorMessage({ error, onRetry }) {
  return (
    <div className="max-w-md mx-auto my-12 p-6 rounded-2xl bg-rose-950/40 border border-rose-800/60 shadow-xl text-center">
      <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-rose-900/60 flex items-center justify-center text-rose-400">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-7 h-7"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
          />
        </svg>
      </div>

      <h3 className="text-xl font-bold text-white mb-2">
        Failed to Load Photos
      </h3>

      <p className="text-rose-200/80 text-sm mb-6 leading-relaxed">
        {error || 'An unexpected error occurred while fetching photos from the server.'}
      </p>

      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-medium text-sm transition-colors shadow-lg shadow-rose-900/30 cursor-pointer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
            />
          </svg>
          Try Again
        </button>
      )}
    </div>
  );
}

export default React.memo(ErrorMessage);
