import type { Pokemon, StatKey } from '../types/pokedex'

/** Maior valor de atributo da primeira geração (HP 250 de Chansey), com folga. */
export const MAX_STAT = 255

/** Ordem e rótulos dos seis atributos obrigatórios. */
export const STAT_LABELS: { key: StatKey; label: string; short: string }[] = [
  { key: 'hp', label: 'HP', short: 'HP' },
  { key: 'attack', label: 'Ataque', short: 'ATK' },
  { key: 'defense', label: 'Defesa', short: 'DEF' },
  { key: 'specialAttack', label: 'Ataque Especial', short: 'SP.ATK' },
  { key: 'specialDefense', label: 'Defesa Especial', short: 'SP.DEF' },
  { key: 'speed', label: 'Velocidade', short: 'VEL' },
]

export const SORT_OPTIONS = [
  { value: 'id', label: 'Número' },
  { value: 'name', label: 'Nome' },
  { value: 'hp', label: 'HP' },
  { value: 'attack', label: 'Ataque' },
  { value: 'defense', label: 'Defesa' },
  { value: 'specialAttack', label: 'Ataque Especial' },
  { value: 'specialDefense', label: 'Defesa Especial' },
  { value: 'speed', label: 'Velocidade' },
  { value: 'total', label: 'Total de atributos' },
] as const

export type SortValue = (typeof SORT_OPTIONS)[number]['value']

/** Formata o número da Pokédex como no jogo: 1 -> "#001". */
export function formatPokedexNumber(id: number): string {
  return `#${String(id).padStart(3, '0')}`
}

export function statTotal(pokemon: Pokemon): number {
  return Object.values(pokemon.stats).reduce((total, value) => total + value, 0)
}

function normalize(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
}

/**
 * Pesquisa por nome ou por número.
 * - Texto: trecho do nome, sem diferenciar maiúsculas nem acentos.
 * - Número: o ID exato, então "25", "#25" e "#025" encontram Pikachu.
 */
function matchesQuery(pokemon: Pokemon, query: string): boolean {
  if (!query.trim()) {
    return true
  }

  if (normalize(pokemon.name).includes(normalize(query))) {
    return true
  }

  // Número exato, aceitando "25", "#25" e "#025".
  const digits = query.trim().replace(/^#/, '')
  return /^\d+$/.test(digits) && Number(digits) === pokemon.id
}

function matchesType(pokemon: Pokemon, typeId: number | null): boolean {
  return typeId === null || pokemon.types.some((type) => type.id === typeId)
}

function compare(a: Pokemon, b: Pokemon, sortBy: SortValue): number {
  switch (sortBy) {
    case 'id':
      return a.id - b.id
    case 'name':
      return a.name.localeCompare(b.name, 'pt-BR')
    case 'total':
      return statTotal(b) - statTotal(a) || a.id - b.id
    default:
      // Atributos numéricos: do maior para o menor, com o ID como desempate.
      return b.stats[sortBy] - a.stats[sortBy] || a.id - b.id
  }
}

/**
 * Aplica pesquisa, filtro de tipo e ordenação em uma única passagem.
 * Estado derivado: nada aqui é guardado em `useState`.
 */
export function selectPokemon(
  pokemonList: Pokemon[],
  { query, typeId, sortBy }: { query: string; typeId: number | null; sortBy: SortValue },
): Pokemon[] {
  return pokemonList
    .filter((pokemon) => matchesQuery(pokemon, query) && matchesType(pokemon, typeId))
    .sort((a, b) => compare(a, b, sortBy))
}

/**
 * Agrupa IDs repetidos preservando a informação do JSON:
 * os três Koffing de Koga viram uma entrada com `count: 3`.
 */
export function groupPokemonIds(pokemonIds: number[]): { id: number; count: number }[] {
  const counts = new Map<number, number>()
  for (const id of pokemonIds) {
    counts.set(id, (counts.get(id) ?? 0) + 1)
  }
  return [...counts].map(([id, count]) => ({ id, count }))
}
