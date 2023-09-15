<template>
    <v-container>
        <ul v-if="cocktailsStore.hasCocktails" class="items-wrapper">
            <li
                v-for="cocktail in cocktailsStore.cocktails"
                :key="cocktail.idDrink"
                class="item"
            >
                <figure class="cocktail-figure ma-2">
                    <div class="img-wrapper">
                        <v-img :src="cocktail.strDrinkThumb" cover />
                    </div>
                    <figcaption class="text-center py-2">
                        <router-link
                            :to="{
                                name: 'cocktail',
                                params: {
                                    id: cocktail.idDrink,
                                },
                            }"
                            @click="
                                cocktailsStore.setSingleCocktail(
                                    cocktail.idDrink
                                )
                            "
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

<script setup lang="ts">
import { useCocktailsStore } from '@/store/cocktails'

const cocktailsStore = useCocktailsStore()
</script>

<style lang="scss" scoped>
@import '@/scss/variables.scss';
.items-wrapper {
    list-style-type: none;
    display: flex;
    flex-wrap: wrap;
    .item {
        flex-basis: 33.33%;
        .cocktail-figure {
            border: 1px solid rgb(0, 0, 0);
            border-radius: $default-border-radius;
            overflow: hidden;
            .img-wrapper {
                aspect-ratio: 1/1;
            }
        }
    }
}
.empty {
    @extend %info-text;
    font-size: 20px;
}
</style>
