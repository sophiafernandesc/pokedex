import { useMemo, useState } from 'react'
import ModeTabs, { type ConsoleMode } from './components/ModeTabs'
import PokemonDetails from './components/PokemonDetails'
import PokemonList from './components/PokemonList'
import SearchBar from './components/SearchBar'
import SortControls from './components/SortControls'
import TrainerPanel from './components/TrainerPanel'
import TypeFilter from './components/TypeFilter'
import ConsoleLayout from './components/console/ConsoleLayout'
import './css/App.css'
import './css/pokemon.css'
import { allPokemon, allTrainers, filterableTypes, getPokemonById } from './data/pokedex'
import { selectPokemon, type SortValue } from './utils/pokemon'

function App() {
  const [query, setQuery] = useState('')
  const [selectedTypeId, setSelectedTypeId] = useState<number | null>(null)
  const [sortBy, setSortBy] = useState<SortValue>('id')
  const [selectedPokemonId, setSelectedPokemonId] = useState<number | null>(null)
  const [mode, setMode] = useState<ConsoleMode>('pokedex')

  // Lista derivada: pesquisa + filtro de tipo + ordenação sobre o JSON.
  const visiblePokemon = useMemo(
    () => selectPokemon(allPokemon, { query, typeId: selectedTypeId, sortBy }),
    [query, selectedTypeId, sortBy],
  )

  const selectedPokemon = selectedPokemonId === null ? null : getPokemonById(selectedPokemonId) ?? null

  function handleClearFilters() {
    setQuery('')
    setSelectedTypeId(null)
  }

  function handleRandomPick() {
    if (visiblePokemon.length === 0) {
      return
    }
    const randomIndex = Math.floor(Math.random() * visiblePokemon.length)
    setSelectedPokemonId(visiblePokemon[randomIndex].id)
  }

  return (
    <main className="min-h-svh px-3 py-5 sm:px-6 sm:py-6">
      <header className="mx-auto mb-4 max-w-2xl text-center">
        <p className="mb-2 font-mono text-xs tracking-[0.25em] text-red-800">POKÉDEX DS</p>
        <p className="font-serif text-2xl font-bold italic tracking-tight sm:text-4xl">
          Eu escolho você!
        </p>
      </header>

      <ConsoleLayout
        upperScreen={
          <div className="flex h-full min-h-0 flex-col">
            <div className="screen-title flex items-center gap-2">
              <span aria-hidden="true" className="pokeball-emblem pokeball-emblem--small" />
              Informações do Pokémon
            </div>
            <PokemonDetails pokemon={selectedPokemon} />
          </div>
        }
        lowerScreen={
          <div className="flex h-full min-h-0 flex-col">
            <div className="flex items-end gap-2 bg-[#8e272b] px-2 pt-2">
              <ModeTabs mode={mode} onModeChange={setMode} />
            </div>

            {mode === 'pokedex' ? (
              <div
                role="tabpanel"
                id="panel-pokedex"
                aria-labelledby="tab-pokedex"
                className="flex min-h-0 flex-1 flex-col"
              >
                <div className="space-y-2 border-b border-slate-300 bg-slate-100/80 p-3">
                  <SearchBar
                    query={query}
                    onQueryChange={setQuery}
                    resultCount={visiblePokemon.length}
                  />
                  <TypeFilter
                    types={filterableTypes}
                    selectedTypeId={selectedTypeId}
                    onSelectType={setSelectedTypeId}
                  />
                  <SortControls
                    sortBy={sortBy}
                    onSortChange={setSortBy}
                    onRandomPick={handleRandomPick}
                  />
                </div>

                <PokemonList
                  pokemonList={visiblePokemon}
                  selectedId={selectedPokemonId}
                  onSelect={setSelectedPokemonId}
                  onClearFilters={handleClearFilters}
                />
              </div>
            ) : (
              <div
                role="tabpanel"
                id="panel-trainers"
                aria-labelledby="tab-trainers"
                className="flex min-h-0 flex-1 flex-col"
              >
                <TrainerPanel
                  trainers={allTrainers}
                  selectedPokemonId={selectedPokemonId}
                  onSelectPokemon={setSelectedPokemonId}
                />
              </div>
            )}
          </div>
        }
      />

      <footer className="mx-auto mt-4 max-w-2xl text-center text-xs text-slate-500">
        Dados de <code>pokedex-data.json</code> · sprites e descrições da{' '}
        <a href="https://pokeapi.co" className="underline" rel="noreferrer" target="_blank">
          PokéAPI
        </a>
      </footer>
    </main>
  )
}

export default App
