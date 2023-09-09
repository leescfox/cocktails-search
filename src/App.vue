<template>
    <v-app class="h-screen">
        <v-app-bar height="60" class="px-2">
            <v-form
                @submit.prevent="cocktailsStore.searchRequest"
                class="search-form"
            >
                <v-text-field
                    v-model="cocktailsStore.searchField"
                    @click:append-inner="cocktailsStore.searchRequest"
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

<script setup lang="ts">
import { useCocktailsStore } from './store/cocktails'

const cocktailsStore = useCocktailsStore()
</script>

<style lang="scss" scoped>
.search-form {
    width: 100%;
}
</style>
