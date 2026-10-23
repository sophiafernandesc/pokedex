type SearchBarProps = {
  query: string
  onQueryChange: (query: string) => void
  resultCount: number
}

/**
 * Pesquisa por nome ou número
 */
export default function SearchBar({ query, onQueryChange, resultCount }: SearchBarProps) {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor="pokemon-search" className="font-mono text-[0.65rem] font-bold uppercase tracking-wider text-ink-muted">
        Pesquisar
      </label>

      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <input
            id="pokemon-search"
            type="search"
            value={query}
            onChange={(event) => {
              onQueryChange(event.target.value)
            }}
            autoComplete="off"
            className="w-full rounded border border-edge-strong bg-surface py-1.5 pl-2.5 pr-8 text-sm text-ink shadow-inner placeholder:text-ink-dim"
          />
          {query !== '' && (
            <button
              type="button"
              onClick={() => {
                onQueryChange('')
              }}
              aria-label="Limpar pesquisa"
              className="absolute right-1 top-1/2 flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded text-ink-faint transition hover:bg-panel-strong hover:text-ink-mid"
            >
              ×
            </button>
          )}
        </div>

        <p aria-live="polite" className="shrink-0 font-mono text-[0.65rem] font-bold tabular-nums text-ink-muted">
          {resultCount === 1 ? '1 Pokémon' : `${resultCount} Pokémon`}
        </p>
      </div>
    </div>
  )
}
