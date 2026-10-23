import type { Pokemon, Trainer } from '../types/pokedex'
import { formatPokedexNumber } from '../utils/pokemon'
import { relatedGroups } from '../utils/relations'
import PokemonCard from './PokemonCard'
import PokemonSprite from './PokemonSprite'

type RelatedPanelProps = {
  pokemon: Pokemon | null
  pokemonList: Pokemon[]
  trainers: Trainer[]
  onSelect: (pokemonId: number) => void
}
export default function RelatedPanel({
  pokemon,
  pokemonList,
  trainers,
  onSelect,
}: RelatedPanelProps) {
  if (!pokemon) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center gap-3 p-6 text-center">
        <span aria-hidden="true" className="sprite-placeholder h-16 w-16 opacity-70" />
        <p className="text-sm font-bold text-ink-mid">No Pokémon selected.</p>
        <p className="max-w-xs text-xs leading-relaxed text-ink-muted">
          Pick a Pokémon on the Pokédex tab to see what relates to it.
        </p>
      </div>
    )
  }

  const groups = relatedGroups(pokemon, { pokemonList, trainers })

  return (
    <div className="console-scroll min-h-0 flex-1">
      <div className="flex items-center gap-2 border-b border-edge bg-panel/80 px-3 py-2">
        <PokemonSprite decorative pokemonId={pokemon.id} name={pokemon.name} size="small" />
        <p className="text-xs text-ink-muted">
          Related to{' '}
          <strong className="font-bold text-ink">{pokemon.name}</strong>{' '}
          <span className="font-mono tabular-nums">{formatPokedexNumber(pokemon.id)}</span>
        </p>
      </div>

      {groups.length === 0 ? (
        <p className="p-6 text-center text-xs leading-relaxed text-ink-muted">
          The file records no relations for {pokemon.name}.
        </p>
      ) : (
        <div className="space-y-3 p-3">
          {groups.map((group) => (
            <section key={group.key}>
              <h3 className="font-mono text-[0.65rem] font-bold uppercase tracking-wider text-ink-muted">
                {group.title}
              </h3>
              <p className="mb-1 text-[0.7rem] leading-snug text-ink-faint">
                {group.hint}
                {group.pokemon.length < group.total &&
                  ` Showing ${group.pokemon.length} of ${group.total}.`}
              </p>

              <ul className="space-y-0.5">
                {group.pokemon.map((related) => (
                  <li key={related.id}>
                    <PokemonCard pokemon={related} isSelected={false} onSelect={onSelect} />
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      )}
    </div>
  )
}
