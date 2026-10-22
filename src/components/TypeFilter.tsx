import type { PokemonType } from '../types/pokedex'

type TypeFilterProps = {
  types: PokemonType[]
  selectedTypeId: number | null
  onSelectType: (typeId: number | null) => void
}

export default function TypeFilter({ types, selectedTypeId, onSelectType }: TypeFilterProps) {
  return (
    <div className="flex flex-col gap-1">
      <p id="type-filter-label" className="font-mono text-[0.65rem] font-bold uppercase tracking-wider text-slate-600">
        Filtrar por tipo
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
              ? 'border-slate-700 bg-slate-700 text-white'
              : 'border-slate-400 bg-white text-slate-700 hover:bg-slate-100'
          }`}
        >
          Todos
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
                  ? 'ring-2 ring-slate-800 ring-offset-1'
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
