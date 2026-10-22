/**
 * Contratos de dados da Pokédex.
 * Espelham exatamente a estrutura de `src/data/pokedex-data.json`,
 * que é a fonte de verdade da aplicação.
 */

export type PokemonType = {
  id: number
  name: string
}

export type PokemonStats = {
  hp: number
  attack: number
  defense: number
  specialAttack: number
  specialDefense: number
  speed: number
}

/** Chaves dos seis atributos obrigatórios. */
export type StatKey = keyof PokemonStats

export type Pokemon = {
  id: number
  name: string
  stats: PokemonStats
  /** Pode ser uma lista vazia: no JSON, Mew (151) não possui tipos. */
  types: PokemonType[]
}

export type Trainer = {
  id: number
  name: string
  badges: number
  /** Pode conter IDs repetidos: Koga e Lance têm Pokémon duplicados no JSON. */
  pokemonIds: number[]
}

export type PokedexData = {
  types: PokemonType[]
  pokemon: Pokemon[]
  trainers: Trainer[]
}
