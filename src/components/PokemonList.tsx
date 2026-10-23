import type { Pokemon } from '../types/pokedex'
import PokemonCard from './PokemonCard'

type PokemonListProps = {
  pokemonList: Pokemon[]
  selectedId: number | null
  onSelect: (pokemonId: number) => void
  onClearFilters: () => void
}

/**
 * Renderiza a lista filtrada com `map()` e chaves estáveis (o ID do JSON).
 */
export default function PokemonList({
  pokemonList,
  selectedId,
  onSelect,
  onClearFilters,
}: PokemonListProps) {
  if (pokemonList.length === 0) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center gap-3 p-6 text-center">
        <span aria-hidden="true" className="sprite-placeholder h-16 w-16 opacity-70" />
        <p className="text-sm font-bold text-ink-mid">No Pokémon found.</p>
        <p className="max-w-xs text-xs leading-relaxed text-ink-muted">
          Try another name, another number, or clear the type filter.
        </p>
        <button
          type="button"
          onClick={onClearFilters}
          className="rounded border border-edge-strong bg-surface px-3 py-1.5 text-xs font-bold text-ink-soft transition hover:bg-panel"
        >
          Clear search and filters
        </button>
      </div>
    )
  }

  return (
    <ul className="console-scroll min-h-0 flex-1 space-y-0.5 p-1.5">
      {pokemonList.map((pokemon) => (
        <li key={pokemon.id}>
          <PokemonCard
            pokemon={pokemon}
            isSelected={pokemon.id === selectedId}
            onSelect={onSelect}
          />
        </li>
      ))}
    </ul>
  )
}
