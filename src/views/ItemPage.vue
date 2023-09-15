<template>
    <v-container>
        <div
            v-if="cocktailsStore.singleCocktail !== null"
            class="cocktail-wrapper"
        >
            <div class="img-wrapper">
                <v-img :src="cocktailsStore.singleCocktail.strDrinkThumb" />
            </div>
            <div>
                <div class="cocktail-name">
                    {{ cocktailsStore.singleCocktail.strDrink }}
                </div>
                <div class="instructions-line">Instructions:</div>
                <p>
                    {{ cocktailsStore.singleCocktail.strInstructions }}
                </p>
            </div>
        </div>
        <div v-else class="error-wrapper">
            <p class="error-text">
                Unfortunately, we cannot find this cocktail :(
            </p>
            <v-img
                src="/public/sad-face.png"
                max-width="175"
                class="error-img mt-4"
            />
        </div>
    </v-container>
</template>

<script setup lang="ts">
import { useCocktailsStore } from '@/store/cocktails'

const cocktailsStore = useCocktailsStore()
</script>

<style lang="scss" scoped>
@import '@/scss/variables.scss';
.cocktail-wrapper {
    display: flex;
    justify-content: center;
    .img-wrapper {
        width: 40%;
        margin-right: 45px;
        border-radius: $default-border-radius;
        overflow: hidden;
    }
    .cocktail-name {
        font-size: 30px;
        font-weight: 700;
    }
    .instructions-line {
        font-size: 20px;
        font-style: italic;
    }
}
.error-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    .error-text {
        @extend %info-text;
        font-size: 24px;
    }
    .error-img {
        width: 25%;
    }
}
</style>
