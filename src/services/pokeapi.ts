/**
 *(https://pokeapi.co/docs/v2).
 */

const SPRITE_BASE = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon'
const API_BASE = 'https://pokeapi.co/api/v2'

/** Sprite de HeartGold/SoulSilver: a referência visual do projeto. */
export function spriteUrl(pokemonId: number): string {
  return `${SPRITE_BASE}/versions/generation-iv/heartgold-soulsilver/${pokemonId}.png`
}

export function fallbackSpriteUrl(pokemonId: number): string {
  return `${SPRITE_BASE}/${pokemonId}.png`
}

type SpeciesResponse = {
  flavor_text_entries: {
    flavor_text: string
    language: { name: string }
    version: { name: string }
  }[]
}

const PREFERRED_VERSIONS = ['heartgold', 'soulsilver', 'platinum', 'firered', 'red']

const descriptionCache = new Map<number, string>()

export async function fetchPokemonDescription(
  pokemonId: number,
  signal?: AbortSignal,
): Promise<string | null> {
  const cached = descriptionCache.get(pokemonId)
  if (cached !== undefined) {
    return cached
  }

  const response = await fetch(`${API_BASE}/pokemon-species/${pokemonId}`, { signal })
  if (!response.ok) {
    throw new Error(`PokéAPI respondeu ${response.status}`)
  }

  const species = (await response.json()) as SpeciesResponse
  const englishEntries = species.flavor_text_entries.filter((entry) => entry.language.name === 'en')

  const entry =
    PREFERRED_VERSIONS.map((version) =>
      englishEntries.find((candidate) => candidate.version.name === version),
    ).find(Boolean) ?? englishEntries[0]

  if (!entry) {
    return null
  }

  // A API devolve o texto com quebras de linha e caracteres de controle do jogo.
  const description = entry.flavor_text.replace(/[\n\f\r]+/g, ' ').replace(/\s+/g, ' ').trim()
  descriptionCache.set(pokemonId, description)
  return description
}
