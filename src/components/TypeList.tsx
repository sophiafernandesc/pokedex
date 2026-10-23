import type { PokemonType } from '../types/pokedex'
import TypeBadge from './TypeBadge'

type TypeListProps = {
  types: PokemonType[]
}

export default function TypeList({ types }: TypeListProps) {
  if (types.length === 0) {
    return <span className="type-badge type-typeless">No type</span>
  }

  return (
    <>
      {types.map((type) => (
        <TypeBadge key={type.id} type={type} />
      ))}
    </>
  )
}
