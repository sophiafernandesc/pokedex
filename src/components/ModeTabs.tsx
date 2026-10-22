export type ConsoleMode = 'pokedex' | 'trainers'

type ModeTabsProps = {
  mode: ConsoleMode
  onModeChange: (mode: ConsoleMode) => void
}

const TABS: { value: ConsoleMode; label: string }[] = [
  { value: 'pokedex', label: 'Pokédex' },
  { value: 'trainers', label: 'Treinadores' },
]

/** Navegação entre os dois modos da tela inferior. */
export default function ModeTabs({ mode, onModeChange }: ModeTabsProps) {
  return (
    <div role="tablist" aria-label="Modos da Pokédex" className="flex gap-1">
      {TABS.map((tab) => (
        <button
          key={tab.value}
          type="button"
          role="tab"
          id={`tab-${tab.value}`}
          aria-selected={mode === tab.value}
          aria-controls={`panel-${tab.value}`}
          onClick={() => {
            onModeChange(tab.value)
          }}
          className={`rounded-t border border-b-0 px-3 py-1.5 text-xs font-bold transition ${
            mode === tab.value
              ? 'border-[#8e272b] bg-[#b6393e] text-white'
              : 'border-slate-400 bg-slate-200 text-slate-600 hover:bg-slate-100'
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  )
}
