<template>
    <div>
        <Header></Header>
        <div class="layout">
            <v-content>
                <transition name="fade" mode="out-in">
                    <v-container>
                        <router-view></router-view>
                    </v-container>
                </transition>
            </v-content>

            <SnackBar></SnackBar>
        </div>
    </div>
</template>

<script src="./MainPage.ts" lang="ts"></script>

<style lang="sass" scoped>
    .fade-enter-active, .fade-leave-active
        transition: opacity .5s

    .fade-enter, .fade-leave-to
        opacity: 0
</style>
