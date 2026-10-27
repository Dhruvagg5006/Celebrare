import React, { useState } from 'react';

/**
 * PhotoCard component rendering a single photo card.
 * Includes: Photo, Author Name, and Heart Icon Button.
 * Wrapped in React.memo to prevent re-renders when other cards update.
 */
export function PhotoCard({ photo, isFavorite, onToggleFavorite }) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const imageUrl = `https://picsum.photos/id/${photo.id}/600/400`;

  return (
    <article className="group flex flex-col bg-slate-800/90 rounded-2xl overflow-hidden border border-slate-700/70 hover:border-indigo-500/50 shadow-md hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-300 transform hover:-translate-y-1">
      {/* Image Container */}
      <div className="relative aspect-[4/3] w-full bg-slate-900/80 overflow-hidden">
        {/* Shimmer / Skeleton Placeholder */}
        {!imageLoaded && !imageError && (
          <div className="absolute inset-0 bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800 animate-pulse" />
        )}

        {/* Photo */}
        <img
          src={imageError ? photo.download_url : imageUrl}
          alt={`Taken by ${photo.author}`}
          loading="lazy"
          onLoad={() => setImageLoaded(true)}
          onError={() => {
            if (!imageError) {
              setImageError(true);
            }
          }}
          className={`w-full h-full object-cover transition-all duration-500 ${
            imageLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          } group-hover:scale-105`}
        />

        {/* Favorite Heart Badge Overlay */}
        <div className="absolute top-3 right-3">
          <button
            type="button"
            onClick={() => onToggleFavorite(photo.id)}
            aria-label={isFavorite ? `Remove photo by ${photo.author} from favorites` : `Add photo by ${photo.author} to favorites`}
            aria-pressed={isFavorite}
            className={`p-2.5 rounded-full backdrop-blur-md transition-all duration-200 cursor-pointer shadow-lg active:scale-90 ${
              isFavorite
                ? 'bg-rose-500/25 text-rose-500 border border-rose-500/40 hover:bg-rose-500/35'
                : 'bg-black/40 text-slate-300 border border-white/10 hover:text-rose-400 hover:bg-black/60'
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill={isFavorite ? 'currentColor' : 'none'}
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={`w-5 h-5 transition-transform duration-200 ${
                isFavorite ? 'scale-110 fill-rose-500 text-rose-500' : 'group-hover:scale-110'
              }`}
            >
              <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
            </svg>
          </button>
        </div>
      </div>

      {/* Card Info */}
      <div className="p-4 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-8 h-8 rounded-full bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 flex items-center justify-center font-bold text-xs shrink-0 uppercase">
            {photo.author ? photo.author.charAt(0) : 'P'}
          </div>
          <div className="min-w-0">
            <p className="text-xs text-slate-400 font-medium uppercase tracking-wider">
              Author
            </p>
            <h3
              className="text-sm font-semibold text-slate-100 truncate group-hover:text-indigo-300 transition-colors"
              title={photo.author}
            >
              {photo.author}
            </h3>
          </div>
        </div>

        {/* Subtle ID indicator */}
        <span className="text-[11px] font-mono text-slate-400 bg-slate-900/60 px-2 py-0.5 rounded border border-slate-700/60 shrink-0">
          #{photo.id}
        </span>
      </div>
    </article>
  );
}

export default React.memo(PhotoCard);
