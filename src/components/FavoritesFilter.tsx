import { useFavoritesContext } from '../context/favorites'

type FavoritesFilterProps = {
  showOnlyFavorites: boolean
  onToggle: () => void
}

export default function FavoritesFilter({ showOnlyFavorites, onToggle }: FavoritesFilterProps) {
  const { favorites, isAvailable, isLoading } = useFavoritesContext()

  return (
    <button
      type="button"
      onClick={onToggle}
      disabled={!isAvailable || isLoading}
      aria-pressed={showOnlyFavorites}
      className={`flex items-center gap-1 rounded border px-3 py-1.5 text-xs font-bold transition disabled:opacity-40 ${
        showOnlyFavorites
          ? 'border-select-edge bg-select text-ink'
          : 'border-edge-strong bg-surface text-ink-soft hover:bg-panel'
      }`}
    >
      <span aria-hidden="true">★</span>
      Favorites
      {isAvailable && !isLoading && (
        <span className="font-mono tabular-nums text-ink-faint">{favorites.size}</span>
      )}
    </button>
  )
}
