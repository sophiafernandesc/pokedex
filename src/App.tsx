import { useMemo, useState } from 'react'
import ModeTabs, { type ConsoleMode } from './components/ModeTabs'
import PokemonDetails from './components/PokemonDetails'
import PokemonList from './components/PokemonList'
import RelatedPanel from './components/RelatedPanel'
import SearchBar from './components/SearchBar'
import ShinyToggle from './components/ShinyToggle'
import SortControls from './components/SortControls'
import ThemeToggle from './components/ThemeToggle'
import TrainerPanel from './components/TrainerPanel'
import TypeFilter from './components/TypeFilter'
import FavoritesFilter from './components/FavoritesFilter'
import ConsoleLayout from './components/console/ConsoleLayout'
import { FavoritesContext } from './context/favorites'
import { ShinyContext } from './context/shiny'
import { useFavorites } from './hooks/useFavorites'
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
  const [isShiny, setIsShiny] = useState(false)
  const [showOnlyFavorites, setShowOnlyFavorites] = useState(false)

  const favoritesState = useFavorites()

  // Lista derivada: pesquisa + filtro de tipo + ordenação sobre o JSON.
  const { favorites } = favoritesState
  const visiblePokemon = useMemo(() => {
    const selected = selectPokemon(allPokemon, { query, typeId: selectedTypeId, sortBy })
    return showOnlyFavorites ? selected.filter((pokemon) => favorites.has(pokemon.id)) : selected
  }, [query, selectedTypeId, sortBy, showOnlyFavorites, favorites])

  const selectedPokemon = selectedPokemonId === null ? null : getPokemonById(selectedPokemonId) ?? null

  function handleClearFilters() {
    setQuery('')
    setSelectedTypeId(null)
    setShowOnlyFavorites(false)
  }

  function handleRandomPick() {
    if (visiblePokemon.length === 0) {
      return
    }
    const randomIndex = Math.floor(Math.random() * visiblePokemon.length)
    setSelectedPokemonId(visiblePokemon[randomIndex].id)
  }

  return (
    <FavoritesContext.Provider value={favoritesState}>
      <ShinyContext.Provider value={isShiny}>
        <main className="min-h-svh px-3 py-5 sm:px-6 sm:py-6">
          <header className="mx-auto mb-4 max-w-2xl lg:max-w-3xl">
            <div className="mb-2 flex justify-end">
              <ThemeToggle />
            </div>
            <div className="text-center">
              <p className="mb-2 font-mono text-xs tracking-[0.25em] text-accent-text">KANTO</p>
              <p className="font-serif text-2xl font-bold italic tracking-tight sm:text-4xl">
                Gotta catch 'em all!
              </p>
            </div>
          </header>

          <ConsoleLayout
            upperScreen={
              <div className="flex h-full min-h-0 flex-col">
                <div className="screen-title flex items-center gap-2">
                  <span aria-hidden="true" className="pokeball-emblem pokeball-emblem--small" />
                  Pokémon information
                </div>
                <PokemonDetails pokemon={selectedPokemon} />
              </div>
            }
            lowerScreen={
              <div className="flex h-full min-h-0 flex-col">
                <div className="flex items-end gap-2 bg-accent-dark px-2 pt-2">
                  <ModeTabs mode={mode} onModeChange={setMode} />
                </div>

                {mode === 'pokedex' && (
                  <div
                    role="tabpanel"
                    id="panel-pokedex"
                    aria-labelledby="tab-pokedex"
                    className="flex min-h-0 flex-1 flex-col"
                  >
                    <div className="space-y-2 border-b border-edge bg-panel/80 p-3">
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
                      <div className="flex flex-wrap items-end gap-2">
                        <SortControls
                          sortBy={sortBy}
                          onSortChange={setSortBy}
                          onRandomPick={handleRandomPick}
                        />
                        <ShinyToggle
                          isShiny={isShiny}
                          onToggle={() => {
                            setIsShiny((current) => !current)
                          }}
                        />
                        <FavoritesFilter
                          showOnlyFavorites={showOnlyFavorites}
                          onToggle={() => {
                            setShowOnlyFavorites((current) => !current)
                          }}
                        />
                      </div>
                    </div>

                    <PokemonList
                      pokemonList={visiblePokemon}
                      selectedId={selectedPokemonId}
                      onSelect={setSelectedPokemonId}
                      onClearFilters={handleClearFilters}
                    />
                  </div>
                )}

                {mode === 'related' && (
                  <div
                    role="tabpanel"
                    id="panel-related"
                    aria-labelledby="tab-related"
                    className="flex min-h-0 flex-1 flex-col"
                  >
                    <RelatedPanel
                      pokemon={selectedPokemon}
                      pokemonList={allPokemon}
                      trainers={allTrainers}
                      onSelect={setSelectedPokemonId}
                    />
                  </div>
                )}

                {mode === 'trainers' && (
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
        </main>
      </ShinyContext.Provider>
    </FavoritesContext.Provider>
  )
}

export default App
