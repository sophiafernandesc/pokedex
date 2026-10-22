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
      <label htmlFor="pokemon-search" className="font-mono text-[0.65rem] font-bold uppercase tracking-wider text-slate-600">
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
            placeholder="Nome ou número... ex.: Bulba, 25"
            autoComplete="off"
            className="w-full rounded border border-slate-400 bg-white py-1.5 pl-2.5 pr-8 text-sm text-slate-900 shadow-inner placeholder:text-slate-400"
          />
          {query !== '' && (
            <button
              type="button"
              onClick={() => {
                onQueryChange('')
              }}
              aria-label="Limpar pesquisa"
              className="absolute right-1 top-1/2 flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded text-slate-500 transition hover:bg-slate-200 hover:text-slate-800"
            >
              ×
            </button>
          )}
        </div>

        <p aria-live="polite" className="shrink-0 font-mono text-[0.65rem] font-bold tabular-nums text-slate-600">
          {resultCount === 1 ? '1 Pokémon' : `${resultCount} Pokémon`}
        </p>
      </div>
    </div>
  )
}
