// Utilities
import { defineStore } from 'pinia'
import { Cocktail, CocktailsResponse } from '@/types/index'

export const useCocktailsStore = defineStore('cocktails', {
    state: () => ({
        searchUrl:
            'https://www.thecocktaildb.com/api/json/v1/1/search.php' as string,
        lookupUrl:
            'https://www.thecocktaildb.com/api/json/v1/1/lookup.php' as string,
        cocktails: [] as Cocktail[],
        singleCocktail: null as Cocktail | null,
    }),
    getters: {
        areCocktails: (state): boolean => state.cocktails.length > 0,
        isSingleCocktail: (state): boolean => state.singleCocktail !== null,
    },
    actions: {
        async fetchCocktail(cocktailId: string): Promise<Cocktail | null> {
            try {
                const paramsString: string = new URLSearchParams({
                    i: cocktailId,
                }).toString()
                const response: Response = await fetch(
                    `${this.lookupUrl}?${paramsString}`
                )
                const resultObject: CocktailsResponse = await response.json()
                return resultObject.drinks !== null
                    ? resultObject.drinks[0]
                    : null
            } catch {
                return null
            }
        },
    },
})
