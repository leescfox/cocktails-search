<template>
    <v-container>
        <ul v-if="cocktailsStore.areCocktails" class="items-wrapper">
            <li
                v-for="cocktail in cocktailsStore.cocktails"
                :key="cocktail.idDrink"
            >
                <figure class="item ma-2">
                    <v-img :src="cocktail.strDrinkThumb" cover />
                    <figcaption class="text-center py-2">
                        <router-link
                            :to="{
                                name: 'cocktail',
                                params: {
                                    id: cocktail.idDrink,
                                },
                            }"
                            >{{ cocktail.strDrink }}</router-link
                        >
                    </figcaption>
                </figure>
            </li>
        </ul>
        <p v-else class="empty">
            Unfortunately, nothing was found. Try to look for another cocktail!
        </p>
    </v-container>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useCocktailsStore } from '@/store/cocktails'

export default defineComponent({
    setup() {
        const cocktailsStore = useCocktailsStore()
        return { cocktailsStore }
    },
})
</script>

<style lang="scss" scoped>
@import '@/scss/variables.scss';
.items-wrapper {
    list-style-type: none;
    .item {
        border: 1px solid rgb(0, 0, 0);
        border-radius: $default-border-radius;
        overflow: hidden;
    }
}
.empty {
    @extend %info-text;
    font-size: 20px;
}
</style>
