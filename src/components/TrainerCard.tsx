import { getPokemonById } from '../data/pokedex'
import type { Trainer } from '../types/pokedex'
import { formatPokedexNumber, groupPokemonIds } from '../utils/pokemon'
import PokemonSprite from './PokemonSprite'

type TrainerCardProps = {
  trainer: Trainer
  selectedPokemonId: number | null
  onSelectPokemon: (pokemonId: number) => void
}

const BADGE_SLOTS = 8

export default function TrainerCard({
  trainer,
  selectedPokemonId,
  onSelectPokemon,
}: TrainerCardProps) {
  const team = groupPokemonIds(trainer.pokemonIds)

  return (
    <article className="rounded border border-edge bg-surface/70 p-3">
      <header className="flex flex-wrap items-center justify-between gap-2">
        <h3 className="text-sm font-bold text-ink">{trainer.name}</h3>

        <p className="flex items-center gap-1.5">
          <span aria-hidden="true" className="flex gap-0.5">
            {Array.from({ length: Math.min(trainer.badges, BADGE_SLOTS) }, (_, index) => (
              <span key={index} className="badge-pip" />
            ))}
            {trainer.badges === 0 && <span className="badge-pip badge-pip--empty" />}
          </span>
          <span className="font-mono text-[0.65rem] font-bold tabular-nums text-ink-muted">
            {trainer.badges === 1 ? '1 badge' : `${trainer.badges} badges`}
          </span>
        </p>
      </header>

      <ul className="mt-2 flex flex-wrap gap-1.5">
        {team.map(({ id, count }) => {
          const pokemon = getPokemonById(id)

          if (!pokemon) {
            return (
              <li key={id} className="rounded border border-dashed border-edge px-2 py-1 text-xs text-ink-faint">
                {formatPokedexNumber(id)} not in the file
              </li>
            )
          }

          return (
            <li key={id}>
              <button
                type="button"
                aria-pressed={id === selectedPokemonId}
                onClick={() => {
                  onSelectPokemon(id)
                }}
                className={`flex items-center gap-1 rounded border px-1.5 py-1 text-xs font-semibold transition ${
                  id === selectedPokemonId
                    ? 'border-select-edge bg-select text-ink'
                    : 'border-edge bg-surface text-ink-soft hover:border-edge-bold hover:bg-panel-soft'
                }`}
              >
                <PokemonSprite decorative pokemonId={id} name={pokemon.name} size="small" />
                <span>{pokemon.name}</span>
                {count > 1 && (
                  <span className="font-mono text-[0.65rem] font-bold text-ink-faint">×{count}</span>
                )}
              </button>
            </li>
          )
        })}
      </ul>
    </article>
  )
}
