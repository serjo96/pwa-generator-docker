<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <v-form
            ref="form"
    >
        <v-btn
                :disabled="disabledButton"
                icon
               @click="addInputImage">
            <v-icon>add</v-icon>
        </v-btn>
        <v-container grid-list-md>
            <v-layout wrap>
                <v-flex
                        xs12
                        sm6
                        v-for="(input, index) in listOfInputs"
                        :key="index"
                >

                    <v-file-input
                            v-model="input.file"
                            :rules="[fieldRules.requireField]"
                            @change="(file)=> onFilePicked(file, index, input.id)"
                            persistent-hint
                            accept="image/png"
                            :label="`Скриншот ${index+1}*`"
                            hint="Формат: png | Размер: 512х512"
                            prepend-icon='attach_file'
                            append-icon="delete"
                            @click:append="()=> removeInputImage(index)"
                    ></v-file-input>
                </v-flex>
            </v-layout>

            <div class="step-buttons my-5">
                <v-btn class="mr-5" @click="onNextStep">Дальше</v-btn>
                <v-btn @click="onPrevStep">Назад</v-btn>
            </div>
        </v-container>

    </v-form>
</template>

<script lang="ts" src="./StageFive.ts"></script>
<style scoped></style>
