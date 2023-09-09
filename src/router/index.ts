// Composables
import { useCocktailsStore } from '@/store/cocktails'
import { Cocktail, MetaTitle } from '@/types'
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
        meta: {
            title: 'Welcome to CocktailSearch!',
        },
    },
    {
        name: 'searchResults',
        path: '/results',
        component: () => import('@/views/ItemsList.vue'),
        meta: {
            title: 'Search',
        },
    },
    {
        name: 'cocktail',
        path: '/results/:id',
        component: () => import('@/views/ItemPage.vue'),
        beforeEnter: async (to: RouteLocationNormalized) => {
            const errorTitle = 'Error'

            const cocktailsStore = useCocktailsStore()
            let cocktail: Cocktail | undefined = cocktailsStore.cocktails.find(
                (cocktail: Cocktail) => cocktail.idDrink === to.params.id
            )
            try {
                if (cocktail === undefined) {
                    cocktailsStore.singleCocktail =
                        await cocktailsStore.fetchCocktail(
                            to.params.id as string
                        )
                }
                document.title =
                    cocktail === null ? errorTitle : cocktail.strDrink
            } catch {
                document.title = errorTitle
                cocktailsStore.singleCocktail = null
            } finally {
                // document.title = cocktailsStore.haveSingleCocktail
            }
        },
    },
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
})

router.beforeEach((to) => {
    const title: MetaTitle = to.meta.title as MetaTitle
    if (title) {
        document.title = title
    }
})

export default router
