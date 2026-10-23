import { SORT_OPTIONS, type SortValue } from '../utils/pokemon'

type SortControlsProps = {
  sortBy: SortValue
  onSortChange: (sortBy: SortValue) => void
  onRandomPick: () => void
}

/** Ordenação e sorteio */
export default function SortControls({ sortBy, onSortChange, onRandomPick }: SortControlsProps) {
  return (
    <div className="flex min-w-0 flex-1 flex-wrap items-end gap-2">
      <div className="flex min-w-0 flex-1 flex-col gap-1">
        <label htmlFor="sort-by" className="font-mono text-[0.65rem] font-bold uppercase tracking-wider text-ink-muted">
          Sort by
        </label>
        <select
          id="sort-by"
          value={sortBy}
          onChange={(event) => {
            onSortChange(event.target.value as SortValue)
          }}
          className="w-full rounded border border-edge-strong bg-surface px-2 py-1.5 text-sm text-ink"
        >
          {SORT_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <button
        type="button"
        onClick={onRandomPick}
        className="rounded border border-edge-strong bg-surface px-3 py-1.5 text-xs font-bold text-ink-soft transition hover:bg-panel"
      >
        Random
      </button>
    </div>
  )
}
