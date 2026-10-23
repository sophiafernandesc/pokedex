import type { Pokemon } from '../types/pokedex'
import { STAT_LABELS, formatPokedexNumber } from '../utils/pokemon'
import FavoriteButton from './FavoriteButton'
import PokemonSprite from './PokemonSprite'
import TypeList from './TypeList'

type PokemonCardProps = {
  pokemon: Pokemon
  isSelected: boolean
  onSelect: (pokemonId: number) => void
}

/**
 * número, nome, tipos e os seis atributos.
 */
export default function PokemonCard({ pokemon, isSelected, onSelect }: PokemonCardProps) {
  return (
    <div className="relative">
      <button
        type="button"
        className="pokedex-row pr-11"
        aria-pressed={isSelected}
        onClick={() => {
          onSelect(pokemon.id)
        }}
      >
        <PokemonSprite decorative pokemonId={pokemon.id} name={pokemon.name} size="small" />

        <span className="min-w-0 flex-1">
          <span className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
            <span className="font-mono text-xs font-bold tabular-nums text-ink-faint">
              {formatPokedexNumber(pokemon.id)}
            </span>
            <span className="text-sm font-bold text-ink">{pokemon.name}</span>
            <span className="flex flex-wrap gap-1">
              <TypeList types={pokemon.types} />
            </span>
          </span>

          <span className="mt-1.5 grid grid-cols-3 gap-x-2 gap-y-0.5 sm:grid-cols-6">
            {STAT_LABELS.map((stat) => (
              <span key={stat.key} className="flex items-baseline justify-between gap-1 sm:block">
                <span className="font-mono text-[0.6rem] uppercase tracking-wide text-ink-faint">
                  {stat.short}
                </span>
                <span className="font-mono text-xs font-bold tabular-nums text-ink-mid sm:ml-1">
                  {pokemon.stats[stat.key]}
                </span>
              </span>
            ))}
          </span>
        </span>
      </button>

      <FavoriteButton
        pokemonId={pokemon.id}
        name={pokemon.name}
        className="absolute right-1.5 top-1/2 -translate-y-1/2"
      />
    </div>
  )
}
