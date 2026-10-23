import { useState } from 'react'
import { useShiny } from '../context/shiny'
import { fallbackSpriteUrl, spriteUrl } from '../services/pokeapi'

type PokemonSpriteProps = {
  pokemonId: number
  name: string
  size: 'small' | 'large'
  decorative?: boolean
}

/**
 * Sprite vindo da PokéAPI, com degradação em três etapas:
 * arte de HeartGold/SoulSilver -> sprite padrão -> emblema de Pokébola.
 */
export default function PokemonSprite({ pokemonId, name, size, decorative }: PokemonSpriteProps) {
  const shiny = useShiny()
  const [failure, setFailure] = useState<{ pokemonId: number; stage: number } | null>(null)
  const stage = failure?.pokemonId === pokemonId ? failure.stage : 0

  const dimension = size === 'large' ? 'h-28 w-28 sm:h-32 sm:w-32' : 'h-11 w-11'

  if (stage >= 2) {
    return (
      <span
        aria-hidden="true"
        className={`sprite-placeholder ${dimension} shrink-0`}
        title={`${name} sprite unavailable`}
      />
    )
  }

  return (
    <img
      src={stage === 0 ? spriteUrl(pokemonId, { shiny }) : fallbackSpriteUrl(pokemonId, { shiny })}
      alt={decorative ? '' : `${shiny ? 'Shiny ' : ''}${name} sprite`}
      aria-hidden={decorative ? 'true' : undefined}
      width={size === 'large' ? 128 : 44}
      height={size === 'large' ? 128 : 44}
      loading="lazy"
      decoding="async"
      className={`pixel-sprite shrink-0 object-contain ${dimension}`}
      onError={() => {
        setFailure({ pokemonId, stage: stage + 1 })
      }}
    />
  )
}
