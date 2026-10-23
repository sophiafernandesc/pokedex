import { createContext, useContext } from 'react'
import type { FavoritesState } from '../hooks/useFavorites'

/**
 * Favoritos disponíveis para a árvore inteira.
 *
 * Mesma razão do contexto de shiny: a estrela aparece no card da lista e na
 * tela de detalhes, e passar o estado por props atravessaria componentes
 * intermediários que não o usam.
 */
const EMPTY: FavoritesState = {
  favorites: new Set(),
  isFavorite: () => false,
  toggleFavorite: () => {},
  isAvailable: false,
  isLoading: false,
  error: null,
}

export const FavoritesContext = createContext<FavoritesState>(EMPTY)

export function useFavoritesContext(): FavoritesState {
  return useContext(FavoritesContext)
}
