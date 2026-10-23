import type {Pokemon, Trainer} from '../types/pokedex'


export type RelatedGroup = {
    key: string
    title: string
    hint: string
    pokemon: Pokemon[]
    total: number
}

const MAX_PER_GROUP = 12

const NEIGHBOR_REACH = 2

function typeNames(pokemon: Pokemon): Set<string> {
    return new Set(pokemon.types.map((type) => type.name))
}

function sharedTypeCount(a: Set<string>, b: Pokemon): number {
    let shared = 0
    for (const type of b.types) {
        if (a.has(type.name)) {
            shared += 1
        }
    }
    return shared
}

function sameTypesGroup(target: Pokemon, pokemonList: Pokemon[]): RelatedGroup | null {
    const targetTypes = typeNames(target)
    if (targetTypes.size === 0) {
        return null
    }

    const matches = pokemonList
        .filter((pokemon) => pokemon.id !== target.id && sharedTypeCount(targetTypes, pokemon) > 0)
        .sort(
            (a, b) =>
                sharedTypeCount(targetTypes, b) - sharedTypeCount(targetTypes, a) ||
                Math.abs(a.id - target.id) - Math.abs(b.id - target.id) ||
                a.id - b.id,
        )

    if (matches.length === 0) {
        return null
    }

    const label = [...targetTypes].join(' and ')
    return {
        key: 'types',
        title: `Also ${label} type`,
        hint: 'Most shared types first, then the closest by number.',
        pokemon: matches.slice(0, MAX_PER_GROUP),
        total: matches.length,
    }
}

function trainerGroups(
    target: Pokemon,
    trainers: Trainer[],
    byId: Map<number, Pokemon>,
): RelatedGroup[] {
    return trainers
        .filter((trainer) => trainer.pokemonIds.includes(target.id))
        .map((trainer) => {
            const team = [...new Set(trainer.pokemonIds)]
                .filter((id) => id !== target.id)
                .map((id) => byId.get(id))
                .filter((pokemon): pokemon is Pokemon => pokemon !== undefined)

            return {
                key: `trainer-${trainer.id}`,
                title: `On ${trainer.name}'s team`,
                hint:
                    team.length === 0
                        ? `${target.name} is ${trainer.name}'s only Pokémon in the file.`
                        : `Alongside ${target.name} on the team.`,
                pokemon: team,
                total: team.length,
            }
        })
}

function neighborsGroup(target: Pokemon, pokemonList: Pokemon[]): RelatedGroup | null {
    const ordered = [...pokemonList].sort((a, b) => a.id - b.id)
    const index = ordered.findIndex((pokemon) => pokemon.id === target.id)
    if (index === -1) {
        return null
    }

    const neighbors = [
        ...ordered.slice(Math.max(0, index - NEIGHBOR_REACH), index),
        ...ordered.slice(index + 1, index + 1 + NEIGHBOR_REACH),
    ]

    if (neighbors.length === 0) {
        return null
    }

    return {
        key: 'neighbors',
        title: 'Pokédex neighbors',
        hint: 'The entries right before and after.',
        pokemon: neighbors,
        total: neighbors.length,
    }
}

export function relatedGroups(
    target: Pokemon,
    {pokemonList, trainers}: { pokemonList: Pokemon[]; trainers: Trainer[] },
): RelatedGroup[] {
    const byId = new Map(pokemonList.map((pokemon) => [pokemon.id, pokemon]))

    return [
        ...trainerGroups(target, trainers, byId),
        sameTypesGroup(target, pokemonList),
        neighborsGroup(target, pokemonList),
    ].filter((group): group is RelatedGroup => group !== null && group.pokemon.length > 0)
}
