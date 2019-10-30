<template>
    <div class="apps">
        <div class="apps__header text-xs-center">
            <v-btn to="/create-app" color="blue" icon><v-icon class="">add</v-icon></v-btn>
        </div>
        <div class="apps__content">
            <AppsListContent
                    :loadingStatus="isLoading"
                    :appsList="apps"
                    :removeApp="removeApp"
            ></AppsListContent>
        </div>
    </div>
</template>

<script lang="ts" src="./Apps.ts"></script>

<style lang="sass" src="./Apps.sass" scoped></style>
