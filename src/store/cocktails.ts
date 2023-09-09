// Utilities
import { defineStore } from 'pinia'
import { Cocktail, CocktailsResponse } from '@/types/index'
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

export const useCocktailsStore = defineStore('cocktails', () => {
    const router = useRouter()
    const searchUrl = ref<string>(
        'https://www.thecocktaildb.com/api/json/v1/1/search.php'
    )
    const lookupUrl = ref<string>(
        'https://www.thecocktaildb.com/api/json/v1/1/lookup.php'
    )

    const cocktails = ref<Cocktail[]>([])
    const hasCocktails = computed<boolean>(() => cocktails.value.length > 0)

    const singleCocktail = ref<Cocktail | null>(null)
    const haveSingleCocktail = computed<boolean>(
        () => singleCocktail.value !== null
    )

    const searchField = ref<string>('')

    async function searchRequest(): Promise<void> {
        try {
            const paramsString: string = new URLSearchParams({
                s: searchField.value,
            }).toString()
            const response: Response = await fetch(
                `${searchUrl.value}?${paramsString}`
            )
            const resultObject: CocktailsResponse = await response.json()
            cocktails.value =
                resultObject.drinks !== null ? resultObject.drinks : []
        } catch {
            cocktails.value = []
        } finally {
            router.push({ name: 'searchResults' })
        }
    }

    async function fetchCocktail(cocktailId: string): Promise<Cocktail | null> {
        try {
            const paramsString: string = new URLSearchParams({
                i: cocktailId,
            }).toString()
            const response: Response = await fetch(
                `${lookupUrl.value}?${paramsString}`
            )
            const resultObject: CocktailsResponse = await response.json()
            return resultObject.drinks !== null ? resultObject.drinks[0] : null
        } catch {
            return null
        }
    }

    return {
        searchUrl,
        lookupUrl,
        cocktails,
        hasCocktails,
        singleCocktail,
        haveSingleCocktail,
        searchField,
        searchRequest,
        fetchCocktail,
    }
})
