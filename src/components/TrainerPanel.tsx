import type { Trainer } from '../types/pokedex'
import TrainerCard from './TrainerCard'

type TrainerPanelProps = {
  trainers: Trainer[]
  selectedPokemonId: number | null
  onSelectPokemon: (pokemonId: number) => void
}

export default function TrainerPanel({
  trainers,
  selectedPokemonId,
  onSelectPokemon,
}: TrainerPanelProps) {
  return (
    <div className="console-scroll min-h-0 flex-1 space-y-2 p-3">
      <p className="text-xs leading-relaxed text-slate-600">
        {trainers.length} treinadores do arquivo. Toque em um Pokémon do time para ver os atributos
        na tela de cima.
      </p>

      {trainers.map((trainer) => (
        <TrainerCard
          key={trainer.id}
          trainer={trainer}
          selectedPokemonId={selectedPokemonId}
          onSelectPokemon={onSelectPokemon}
        />
      ))}
    </div>
  )
}
