<template>
    <v-form
            ref="form"
            v-model="valid"
    >
        <v-textarea
                class="mt-1"
                outlined
                name="input-7-4"
                label="Последние изменения HTML"
                v-model="stepData.lastAppChanges"
                no-resize
        ></v-textarea>

        <v-textarea
                class="mt-1"
                outlined
                name="input-7-4"
                label="Полное описание HTML*"
                :rules="[fieldRules.required]"
                v-model="stepData.fullAppDescription"
                no-resize
                requared
        ></v-textarea>

        <v-textarea
                class="mt-1"
                outlined
                name="input-7-4"
                label="Короткое описание*"
                :rules="[fieldRules.required]"
                v-model="stepData.shortDescription"
                no-resize
                requared
        ></v-textarea>


        <div class="step-buttons my-5">
            <v-btn class="mr-4" @click="onNextStep">Дальше</v-btn>
            <v-btn @click="onPrevStep">Назад</v-btn>
        </div>
    </v-form>
</template>

<script lang="ts" src="./StageThree.ts"></script>
<style scoped></style>
