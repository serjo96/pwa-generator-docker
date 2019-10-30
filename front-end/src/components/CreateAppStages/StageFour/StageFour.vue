<template>
    <v-form
            ref="form"
            v-model="valid"
    >
        <v-container grid-list-md>
            <v-layout>
                <v-flex
                        xs6
                >
                    <v-text-field
                            v-model="stepData.linkToPWA"
                            label="Ссылка в PWA*"
                            :rules="[fieldRules.requireField, fieldRules.urlValidate]"
                            hint="Офферная ссылка"
                            persistent-hint
                    ></v-text-field>
                </v-flex>

                <v-flex
                        xs6
                >
                    <v-select
                            v-model="stepData.languagePWA"
                            :items="languages"
                            label="Язык pwa*"
                            :rules="[fieldRules.requireField]"
                            hint="Язык лединга"
                            persistent-hint
                    ></v-select>
                </v-flex>
            </v-layout>

            <v-layout>
                <v-flex
                        xs12
                        sm4
                >
                    <v-file-input
                            v-model='stepData.iconSmallPWA'
                            :rules="[fieldRules.requireField]"
                            @change="(file)=> onFilePicked(file, 'iconSmallName', [192, 192])"
                            accept="image/png"
                            label="Иконка PWA 192x192*"
                            hint="Формат: png | Размер: 192х192"
                            persistent-hint
                            prepend-icon='attach_file'
                            :error="Boolean(fileResponse)"
                            :error-messages="fileResponse"
                    ></v-file-input>

                </v-flex>

                <v-flex
                        xs12
                        sm4
                >
                    <v-file-input
                            v-model='stepData.iconMiddlePWA'
                            :rules="[fieldRules.requireField]"
                            @change="(file)=> onFilePicked(file, 'iconMiddleName', [512, 512])"
                            accept="image/png"
                            label="Иконка PWA 512x512*"
                            hint="Формат: png | Размер: 512х512"
                            persistent-hint
                            prepend-icon='attach_file'
                            :error="Boolean(fileResponse)"
                            :error-messages="fileResponse"
                    ></v-file-input>

                </v-flex>

                <v-flex
                        xs12
                        sm4
                >
                    <v-text-field
                            v-model="stepData.backgroundPWA"
                            label="Цвет фона PWA*"
                            :rules="[fieldRules.requireField, fieldRules.hexColor]"
                            persistent-hint
                            hint="CSS формат: #000"
                    ></v-text-field>
                </v-flex>

            </v-layout>


            <div class="step-buttons my-5">
                <v-btn class="mr-4" @click="onNextStep">Дальше</v-btn>
                <v-btn @click="onPrevStep">Назад</v-btn>
            </div>
        </v-container>
    </v-form>
</template>

<script lang="ts" src="./StageFour.ts"></script>
<style scoped></style>
