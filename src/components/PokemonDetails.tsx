import { usePokemonDescription } from '../hooks/usePokemonDescription'
import type { Pokemon } from '../types/pokedex'
import { STAT_LABELS, formatPokedexNumber, statTotal } from '../utils/pokemon'
import PokemonSprite from './PokemonSprite'
import StatBar from './StatBar'
import TypeList from './TypeList'

type PokemonDetailsProps = {
  pokemon: Pokemon | null
}

/**
 * Tela superior do console: detalhes do Pokémon selecionado.
 *
 * Número, nome, tipos e os seis atributos vêm do JSON .
 * A descrição é um complemento da PokéAPI
 */
export default function PokemonDetails({ pokemon }: PokemonDetailsProps) {
  const { description, status } = usePokemonDescription(pokemon?.id ?? null)

  if (!pokemon) {
    return (
      <div className="screen-grid flex flex-1 flex-col items-center justify-center gap-4 px-5 py-8 text-center">
        <span aria-hidden="true" className="pokeball-emblem" />
        <div>
          <h2 className="text-lg font-semibold">Your next encounter</h2>
          <p className="mt-2 max-w-xs text-sm leading-relaxed text-ink-muted">
            Pick a Pokémon on the bottom screen to see its stats here.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="console-scroll min-h-0 flex-1 px-4 py-4 sm:px-5">
      <div className="flex items-start gap-4">
        <PokemonSprite pokemonId={pokemon.id} name={pokemon.name} size="large" />

        <div className="min-w-0 flex-1">
          <p className="font-mono text-xs font-bold tabular-nums text-ink-faint">
            {formatPokedexNumber(pokemon.id)}
          </p>
          <h2 className="text-2xl font-bold leading-tight text-ink">{pokemon.name}</h2>

          <div className="mt-2 flex flex-wrap gap-1">
            <TypeList types={pokemon.types} />
          </div>

          <p className="mt-3 min-h-[2.5rem] text-xs leading-relaxed text-ink-muted">
            {status === 'loading' && <span className="italic text-ink-dim">Asking the PokéAPI…</span>}
            {status === 'success' && description !== null && description}
            {status === 'success' && description === null && (
              <span className="italic text-ink-dim">The PokéAPI has no description for this Pokémon.</span>
            )}
            {status === 'error' && (
              <span className="italic text-ink-dim">
                Description unavailable — no connection to the PokéAPI. The stats below come from the local file.
              </span>
            )}
          </p>
        </div>
      </div>

      <div className="mt-4 border-t border-edge pt-3">
        <div className="mb-2 flex items-baseline justify-between">
          <h3 className="font-mono text-[0.65rem] font-bold uppercase tracking-wider text-ink-muted">
            Stats
          </h3>
          <p className="font-mono text-[0.65rem] font-bold tabular-nums text-ink-muted">
            Total {statTotal(pokemon)}
          </p>
        </div>

        <div className="space-y-1.5">
          {STAT_LABELS.map((stat) => (
            <StatBar key={stat.key} label={stat.label} value={pokemon.stats[stat.key]} />
          ))}
        </div>
      </div>
    </div>
  )
}
