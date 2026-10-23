import { useCallback, useEffect, useState } from 'react'
import { FAVORITES_TABLE, supabase, type FavoriteRow } from '../services/supabase'

export type FavoritesState = {
  /** IDs marcados como favoritos. */
  favorites: Set<number>
  isFavorite: (pokemonId: number) => boolean
  toggleFavorite: (pokemonId: number) => void
  /** false quando não há Supabase configurado ou a conexão falhou. */
  isAvailable: boolean
  isLoading: boolean
  error: string | null
}

export function useFavorites(): FavoritesState {
  const [favorites, setFavorites] = useState<Set<number>>(new Set())
  const [isLoading, setIsLoading] = useState(supabase !== null)
  const [error, setError] = useState<string | null>(null)
  const [isAvailable, setIsAvailable] = useState(supabase !== null)

  useEffect(() => {
    if (!supabase) {
      return
    }

    let cancelled = false

    supabase
      .from(FAVORITES_TABLE)
      .select('pokemon_id')
      .then(({ data, error: queryError }) => {
        if (cancelled) {
          return
        }
        if (queryError) {
          console.warn('Não foi possível carregar os favoritos:', queryError.message)
          setError('Favoritos indisponíveis no momento.')
          setIsAvailable(false)
        } else {
          setFavorites(new Set((data as Pick<FavoriteRow, 'pokemon_id'>[]).map((row) => row.pokemon_id)))
        }
        setIsLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [])

  const toggleFavorite = useCallback(
    (pokemonId: number) => {
      if (!supabase) {
        return
      }

      const client = supabase
      let wasFavorite = false

      // Atualização otimista: o estado anterior é capturado para o desfazer.
      setFavorites((current) => {
        wasFavorite = current.has(pokemonId)
        const next = new Set(current)
        if (wasFavorite) {
          next.delete(pokemonId)
        } else {
          next.add(pokemonId)
        }
        return next
      })

      const request = wasFavorite
        ? client.from(FAVORITES_TABLE).delete().eq('pokemon_id', pokemonId)
        : client
            .from(FAVORITES_TABLE)
            .upsert({ pokemon_id: pokemonId }, { onConflict: 'pokemon_id', ignoreDuplicates: true })

      request.then(({ error: writeError }) => {
        if (!writeError) {
          setError(null)
          return
        }

        console.warn('Não foi possível salvar o favorito:', writeError.message)
        setError('Não foi possível salvar. Tente de novo.')

        setFavorites((current) => {
          const next = new Set(current)
          if (wasFavorite) {
            next.add(pokemonId)
          } else {
            next.delete(pokemonId)
          }
          return next
        })
      })
    },
    [],
  )

  const isFavorite = useCallback((pokemonId: number) => favorites.has(pokemonId), [favorites])

  return { favorites, isFavorite, toggleFavorite, isAvailable, isLoading, error }
}
