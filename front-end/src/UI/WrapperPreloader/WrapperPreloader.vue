<template>
    <transition-group name="fade">
        <Preloader key="preloader" v-if="!status"></Preloader>
        <v-container fluid key="component">
            <slot v-if="status"></slot>
        </v-container>
    </transition-group>
</template>

<script lang="ts" src="./WrapperPreloader.ts"></script>

<style scoped></style>
