// Composables
import { useCocktailsStore } from '@/store/cocktails'
import { Cocktail } from '@/types'
import {
    RouteLocationNormalized,
    createRouter,
    createWebHistory,
} from 'vue-router'

const routes = [
    {
        name: 'home',
        path: '/',
        component: () => import('@/views/WelcomePage.vue'),
    },
    {
        name: 'searchResults',
        path: '/results',
        component: () => import('@/views/ItemsList.vue'),
    },
    {
        name: 'cocktail',
        path: '/results/:id',
        component: () => import('@/views/ItemPage.vue'),
        beforeEnter: (to: RouteLocationNormalized) => {
            const cocktailsStore = useCocktailsStore()
            let cocktail: Cocktail | undefined = cocktailsStore.cocktails.find(
                (elem: Cocktail) => elem.idDrink === to.params.id
            )
            if (cocktail !== undefined) {
                cocktailsStore.singleCocktail = cocktail
            } else {
                cocktailsStore.fetchCocktail(to.params.id as string)
            }
        },
    },
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
})

export default router
