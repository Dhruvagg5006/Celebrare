export const FAVORITES_STORAGE_KEY = 'celebrare_favorite_photos';

/**
 * Initializer function for useReducer.
 * Safely retrieves stored favorites from localStorage on initial render.
 *
 * @param {Array<string>} defaultVal
 * @returns {Array<string>} List of favorited photo IDs
 */
export function initFavorites(defaultVal = []) {
  try {
    const stored = localStorage.getItem(FAVORITES_STORAGE_KEY);
    if (!stored) return defaultVal;
    const parsed = JSON.parse(stored);
    return Array.isArray(parsed) ? parsed : defaultVal;
  } catch (error) {
    console.error('Failed to parse favorites from localStorage:', error);
    return defaultVal;
  }
}

/**
 * Pure reducer function managing the favorites list.
 *
 * Actions supported:
 * - TOGGLE_FAVORITE: Adds the photo ID if not present, or removes it if present.
 * - ADD_FAVORITE: Adds a photo ID to the favorites list.
 * - REMOVE_FAVORITE: Removes a photo ID from the favorites list.
 * - CLEAR_ALL: Resets favorites to empty array.
 *
 * @param {Array<string>} state - Current array of favorited photo IDs
 * @param {{ type: string, payload?: any }} action
 * @returns {Array<string>} Next state
 */
export function favoritesReducer(state, action) {
  switch (action.type) {
    case 'TOGGLE_FAVORITE': {
      const photoId = action.payload;
      const exists = state.includes(photoId);
      return exists
        ? state.filter((id) => id !== photoId)
        : [...state, photoId];
    }

    case 'ADD_FAVORITE': {
      const photoId = action.payload;
      if (state.includes(photoId)) return state;
      return [...state, photoId];
    }

    case 'REMOVE_FAVORITE': {
      const photoId = action.payload;
      return state.filter((id) => id !== photoId);
    }

    case 'CLEAR_ALL': {
      return [];
    }

    default:
      return state;
  }
}
