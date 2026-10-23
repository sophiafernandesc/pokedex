type ShinyToggleProps = {
  isShiny: boolean
  onToggle: () => void
}

/** Alterna entre os sprites normais e os shiny da PokéAPI. */
export default function ShinyToggle({ isShiny, onToggle }: ShinyToggleProps) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-pressed={isShiny}
      title={isShiny ? 'Showing shiny sprites' : 'Showing regular sprites'}
      className={`flex items-center gap-1 rounded border px-3 py-1.5 text-xs font-bold transition ${
        isShiny
          ? 'border-select-edge bg-select text-ink'
          : 'border-edge-strong bg-surface text-ink-soft hover:bg-panel'
      }`}
    >
      <span aria-hidden="true">✦</span>
      Shiny
    </button>
  )
}
