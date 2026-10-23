export type ConsoleMode = 'pokedex' | 'related' | 'trainers'

type ModeTabsProps = {
  mode: ConsoleMode
  onModeChange: (mode: ConsoleMode) => void
}

const TABS: { value: ConsoleMode; label: string }[] = [
  { value: 'pokedex', label: 'Pokédex' },
  { value: 'related', label: 'Related' },
  { value: 'trainers', label: 'Trainers' },
]

export default function ModeTabs({ mode, onModeChange }: ModeTabsProps) {
  return (
    <div role="tablist" aria-label="Pokédex modes" className="flex gap-1">
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
              ? 'border-accent-dark bg-accent text-accent-ink'
              : 'border-edge-strong bg-panel-strong text-ink-muted hover:bg-panel'
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  )
}
