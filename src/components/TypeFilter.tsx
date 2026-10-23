import type { PokemonType } from '../types/pokedex'

type TypeFilterProps = {
  types: PokemonType[]
  selectedTypeId: number | null
  onSelectType: (typeId: number | null) => void
}

export default function TypeFilter({ types, selectedTypeId, onSelectType }: TypeFilterProps) {
  return (
    <div className="flex flex-col gap-1">
      <p id="type-filter-label" className="font-mono text-[0.65rem] font-bold uppercase tracking-wider text-ink-muted">
        Filter by type
      </p>

      <div aria-labelledby="type-filter-label" role="group" className="flex gap-1 overflow-x-auto pb-1.5 sm:flex-wrap sm:overflow-x-visible sm:pb-0">
        <button
          type="button"
          aria-pressed={selectedTypeId === null}
          onClick={() => {
            onSelectType(null)
          }}
          className={`rounded border px-2 py-1 text-[0.65rem] font-bold uppercase tracking-wide transition ${
            selectedTypeId === null
              ? 'border-pill bg-pill text-pill-ink'
              : 'border-edge-strong bg-surface text-ink-soft hover:bg-panel'
          }`}
        >
          All
        </button>

        {types.map((type) => {
          const isSelected = type.id === selectedTypeId
          return (
            <button
              key={type.id}
              type="button"
              aria-pressed={isSelected}
              onClick={() => {
                onSelectType(isSelected ? null : type.id)
              }}
              className={`type-badge type-${type.name.toLowerCase()} transition ${
                isSelected
                  ? 'ring-2 ring-ink-mid ring-offset-1 ring-offset-ring-gap'
                  : 'opacity-70 hover:opacity-100'
              }`}
            >
              {type.name}
            </button>
          )
        })}
      </div>
    </div>
  )
}
