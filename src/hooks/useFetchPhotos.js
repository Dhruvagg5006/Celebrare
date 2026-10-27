import { useState, useEffect, useCallback } from 'react';

const PICSUM_API_URL = 'https://picsum.photos/v2/list?limit=30';

/**
 * Custom hook to fetch 30 photos from Picsum API
 * Separates data fetching logic from UI components (Requirement 6).
 *
 * @returns {{ photos: Array, loading: boolean, error: string|null, refetch: Function }}
 */
export function useFetchPhotos() {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    const controller = new AbortController();

    async function fetchPhotos() {
      try {
        const response = await fetch(PICSUM_API_URL, { signal: controller.signal });

        if (!response.ok) {
          throw new Error(`Failed to load photos (HTTP ${response.status}: ${response.statusText})`);
        }

        const data = await response.json();
        setPhotos(data);
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError(err.message || 'An unexpected error occurred while fetching photos.');
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    fetchPhotos();

    return () => {
      controller.abort();
    };
  }, [retryCount]);

  const refetch = useCallback(() => {
    setLoading(true);
    setError(null);
    setRetryCount((count) => count + 1);
  }, []);

  return { photos, loading, error, refetch };
}

export default useFetchPhotos;
