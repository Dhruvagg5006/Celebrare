import React from 'react';

export function LoadingSpinner({ message = 'Loading gallery photos...' }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
      <div className="relative w-16 h-16 mb-4">
        <div className="absolute inset-0 rounded-full border-4 border-slate-700"></div>
        <div className="absolute inset-0 rounded-full border-4 border-indigo-500 border-t-transparent animate-spin"></div>
      </div>
      <p className="text-slate-300 font-medium tracking-wide text-lg animate-pulse">
        {message}
      </p>
      <span className="text-slate-500 text-sm mt-1">
        Fetching 30 curated photos from Picsum API
      </span>
    </div>
  );
}

export default React.memo(LoadingSpinner);
