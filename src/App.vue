<template>
    <v-app class="h-screen">
        <v-app-bar height="60" class="px-2">
            <v-form @submit.prevent="searchRequest" class="search-form">
                <v-text-field
                    v-model="searchField"
                    @click:append-inner="searchRequest"
                    append-inner-icon="mdi-magnify"
                    hide-details
                    variant="solo"
                    density="compact"
                    placeholder="Search for the cocktails..."
                />
            </v-form>
        </v-app-bar>
        <v-main>
            <router-view />
        </v-main>
    </v-app>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useCocktailsStore } from './store/cocktails'
import { CocktailsResponse } from '@/types/index'

export default defineComponent({
    setup() {
        const cocktailsStore = useCocktailsStore()
        return { cocktailsStore }
    },
    data() {
        return {
            searchField: '' as string,
            errorModal: false as boolean,
        }
    },
    methods: {
        async searchRequest() {
            try {
                const paramsString: string = new URLSearchParams({
                    s: this.searchField,
                }).toString()
                const response: Response = await fetch(
                    `${this.cocktailsStore.searchUrl}?${paramsString}`
                )
                const resultObject: CocktailsResponse = await response.json()
                this.cocktailsStore.cocktails =
                    resultObject.drinks !== null ? resultObject.drinks : []
            } catch {
                this.cocktailsStore.cocktails = []
                this.errorModal = true
            } finally {
                this.$router.push({ name: 'searchResults' })
            }
        },
    },
})
</script>
<style lang="scss" scoped>
.search-form {
    width: 100%;
}
</style>
