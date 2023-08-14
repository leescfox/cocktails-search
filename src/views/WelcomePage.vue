<template>
    <v-container>
        <p class="welcome-text">
            Welcome! Here you can find lots of different cocktails!
        </p>
    </v-container>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({})
</script>

<style lang="scss" scoped>
@import '@/scss/variables.scss';
.welcome-text {
    @extend %info-text;
    font-size: 24px;
}
</style>
