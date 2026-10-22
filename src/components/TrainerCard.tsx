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
    <article className="rounded border border-slate-300 bg-white/70 p-3">
      <header className="flex flex-wrap items-center justify-between gap-2">
        <h3 className="text-sm font-bold text-slate-900">{trainer.name}</h3>

        <p className="flex items-center gap-1.5">
          <span aria-hidden="true" className="flex gap-0.5">
            {Array.from({ length: Math.min(trainer.badges, BADGE_SLOTS) }, (_, index) => (
              <span key={index} className="badge-pip" />
            ))}
            {trainer.badges === 0 && <span className="badge-pip badge-pip--empty" />}
          </span>
          <span className="font-mono text-[0.65rem] font-bold tabular-nums text-slate-600">
            {trainer.badges === 1 ? '1 insígnia' : `${trainer.badges} insígnias`}
          </span>
        </p>
      </header>

      <ul className="mt-2 flex flex-wrap gap-1.5">
        {team.map(({ id, count }) => {
          const pokemon = getPokemonById(id)

          if (!pokemon) {
            return (
              <li key={id} className="rounded border border-dashed border-slate-300 px-2 py-1 text-xs text-slate-500">
                {formatPokedexNumber(id)} fora do arquivo
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
                    ? 'border-sky-600 bg-sky-100 text-slate-900'
                    : 'border-slate-300 bg-white text-slate-700 hover:border-slate-500 hover:bg-slate-50'
                }`}
              >
                <PokemonSprite decorative pokemonId={id} name={pokemon.name} size="small" />
                <span>{pokemon.name}</span>
                {count > 1 && (
                  <span className="font-mono text-[0.65rem] font-bold text-slate-500">×{count}</span>
                )}
              </button>
            </li>
          )
        })}
      </ul>
    </article>
  )
}
