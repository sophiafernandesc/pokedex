import { useFavoritesContext } from '../context/favorites'

type FavoriteButtonProps = {
  pokemonId: number
  name: string
  className?: string
}

export default function FavoriteButton({ pokemonId, name, className = '' }: FavoriteButtonProps) {
  const { isFavorite, toggleFavorite, isAvailable } = useFavoritesContext()
  const active = isFavorite(pokemonId)

  return (
    <button
      type="button"
      disabled={!isAvailable}
      aria-pressed={active}
      aria-label={active ? `Remove ${name} from favorites` : `Add ${name} to favorites`}
      title={isAvailable ? undefined : 'Favorites unavailable'}
      onClick={(event) => {
        event.stopPropagation()
        toggleFavorite(pokemonId)
      }}
      className={`favorite-star ${active ? 'is-active' : ''} ${className}`}
    >
      <span aria-hidden="true">{active ? '★' : '☆'}</span>
    </button>
  )
}
