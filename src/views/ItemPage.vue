<template>
    <v-container>
        <div v-if="cocktailsStore.isSingleCocktail" class="content-wrapper">
            <img
                :src="cocktailsStore.singleCocktail?.strDrinkThumb"
                class="cocktail-img"
            />

            <div>
                <div class="cocktail-name">
                    {{ cocktailsStore.singleCocktail?.strDrink }}
                </div>
                <div class="instructions-line">Instructions:</div>
                <p>
                    {{ cocktailsStore.singleCocktail?.strInstructions }}
                </p>
            </div>
        </div>
        <p v-else>Something went wrong!</p>
    </v-container>
</template>

<script setup lang="ts">
import { useCocktailsStore } from '@/store/cocktails'

const cocktailsStore = useCocktailsStore()
</script>

<style lang="scss" scoped>
@import '@/scss/variables.scss';
.content-wrapper {
    display: flex;
    justify-content: center;
}

.cocktail-img {
    width: 40%;
    margin-right: 25px;
    border-radius: $default-border-radius;
}
.cocktail-name {
    font-size: 20px;
    font-weight: 700;
}
.instructions-line {
    font-size: 18px;
    font-style: italic;
}
</style>
