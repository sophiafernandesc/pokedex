import type { PokedexData, Pokemon, PokemonType, Trainer } from '../types/pokedex'
import rawData from './pokedex-data.json'

/**
 * Acesso tipado ao JSON fornecido na atividade.
 * O arquivo é importado em tempo de build, então a Pokédex funciona offline.
 */
const data = rawData as PokedexData

export const allPokemon: Pokemon[] = data.pokemon

export const allTrainers: Trainer[] = data.trainers

/** Índice por ID para resolver os `pokemonIds` dos treinadores em O(1). */
const pokemonById = new Map<number, Pokemon>(allPokemon.map((pokemon) => [pokemon.id, pokemon]))

export function getPokemonById(id: number): Pokemon | undefined {
  return pokemonById.get(id)
}

/**
 * Tipos oferecidos no filtro: a ordem vem do JSON, mas mantemos apenas os
 * tipos que algum Pokémon realmente possui (o arquivo também lista
 * "Typeless" e "Dark", que nenhum Pokémon de Kanto usa).
 */
export const filterableTypes: PokemonType[] = (() => {
  const usedTypeIds = new Set(allPokemon.flatMap((pokemon) => pokemon.types.map((type) => type.id)))
  return data.types.filter((type) => usedTypeIds.has(type.id))
})()
