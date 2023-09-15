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
            const errorTitle: string = 'Error'
            const cocktailsStore = useCocktailsStore()
            if (
                cocktailsStore.singleCocktail === null ||
                cocktailsStore.singleCocktail.idDrink !== to.params.id
            ) {
                try {
                    cocktailsStore.singleCocktail =
                        await cocktailsStore.fetchCocktail(
                            to.params.id as string
                        )
                } catch {
                    cocktailsStore.singleCocktail = null
                }
            }
            document.title =
                cocktailsStore.singleCocktail !== null
                    ? cocktailsStore.singleCocktail.strDrink
                    : errorTitle
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
