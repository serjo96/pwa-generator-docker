<template>
    <v-snackbar
            v-model="show"
            :color="snackBar.color"
            :timeout="timeout"
    >
        {{ snackBar.message }}
        <v-btn
                dark
                text
                @click="show = false"
        >
            Close
        </v-btn>
    </v-snackbar>
</template>

<script src="./SnackBar.ts" lang="ts"></script>

<style lang="sass" scoped></style>
