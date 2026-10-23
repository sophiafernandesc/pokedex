import { createContext, useContext } from 'react'

/**
 * Modo shiny: vale para todos os sprites da aplicação ao mesmo tempo.
 */
export const ShinyContext = createContext(false)

export function useShiny(): boolean {
  return useContext(ShinyContext)
}
