import { useEffect, useState } from 'react'
import { fetchPokemonDescription } from '../services/pokeapi'

type DescriptionState = {
  description: string | null
  status: 'idle' | 'loading' | 'success' | 'error'
}

type LoadedDescription = {
  pokemonId: number
  description: string | null
  failed: boolean
}

/**
 * Carrega a descrição do Pokémon selecionado na PokéAPI.
 */
export function usePokemonDescription(pokemonId: number | null): DescriptionState {
  const [loaded, setLoaded] = useState<LoadedDescription | null>(null)

  useEffect(() => {
    if (pokemonId === null) {
      return
    }

    const controller = new AbortController()

    fetchPokemonDescription(pokemonId, controller.signal)
      .then((description) => {
        setLoaded({ pokemonId, description, failed: false })
      })
      .catch((error: unknown) => {
        if (controller.signal.aborted) {
          return
        }
        console.warn('Não foi possível carregar a descrição na PokéAPI:', error)
        setLoaded({ pokemonId, description: null, failed: true })
      })

    return () => {
      controller.abort()
    }
  }, [pokemonId])

  if (pokemonId === null) {
    return { description: null, status: 'idle' }
  }

  if (loaded?.pokemonId !== pokemonId) {
    return { description: null, status: 'loading' }
  }

  return {
    description: loaded.description,
    status: loaded.failed ? 'error' : 'success',
  }
}
