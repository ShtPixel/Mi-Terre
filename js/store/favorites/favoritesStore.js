const FAVORITES_KEY = 'app_favorites_ids';

// Obtener la lista de IDs guardados
export function getFavorites() {
  const stored = localStorage.getItem(FAVORITES_KEY);
  return stored ? JSON.parse(stored) : [];
}

// Verificar si un ID ya es favorito
export function isFavorite(id) {
  const favorites = getFavorites();
  return favorites.includes(id);
}

// Alternar (Agregar / Eliminar) un favorito
export function toggleFavorite(id) {
  let favorites = getFavorites();
  
  if (favorites.includes(id)) {
    favorites = favorites.filter(favId => favId !== id);
  } else {
    favorites.push(id);
  }

  localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
  return favorites.includes(id); // Retorna true si quedó guardado, false si se quitó
}