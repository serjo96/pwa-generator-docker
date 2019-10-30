<template>
    <header>
        <v-toolbar>
            <v-toolbar-title>
                <router-link to="/">Google ladings</router-link>
            </v-toolbar-title>
            <v-spacer></v-spacer>

<!--            <v-toolbar-items>-->
<!--                <v-btn to="/push-messages">push messaging</v-btn>-->
<!--            </v-toolbar-items>-->
            <v-toolbar-items>
                <v-btn to="/admin/create-template">Create template</v-btn>
            </v-toolbar-items>
            <v-toolbar-items class="hidden-sm-and-down">
                <v-btn @click="logOut">Выйти</v-btn>
            </v-toolbar-items>
        </v-toolbar>
    </header>
</template>

<script lang="ts" src="./Header.ts"></script>

<style scoped>

</style>
