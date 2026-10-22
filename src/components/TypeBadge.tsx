import type { PokemonType } from '../types/pokedex'

type TypeBadgeProps = {
  type: PokemonType
}

export default function TypeBadge({ type }: TypeBadgeProps) {
  return <span className={`type-badge type-${type.name.toLowerCase()}`}>{type.name}</span>
}
