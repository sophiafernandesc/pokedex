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
        <p className="text-sm font-bold text-slate-800">Nenhum Pokémon encontrado.</p>
        <p className="max-w-xs text-xs leading-relaxed text-slate-600">
          Tente outro nome, outro número ou remova o filtro de tipo.
        </p>
        <button
          type="button"
          onClick={onClearFilters}
          className="rounded border border-slate-400 bg-white px-3 py-1.5 text-xs font-bold text-slate-700 transition hover:bg-slate-100"
        >
          Limpar pesquisa e filtros
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
