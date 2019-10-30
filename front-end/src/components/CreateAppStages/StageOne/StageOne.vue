<template>
    <v-form
            ref="form"
            v-model="valid"
    >
        <v-container grid-list-md>
            <v-layout v-if="createApp">
                <v-flex xs12>
                    <v-combobox
                            solo
                            item-text="name"
                            item-value="id"
                            @change="selectTemplate"
                            :items="templatesList"
                            label="Похожие приложения"
                    ></v-combobox>
                </v-flex>
            </v-layout>

            <v-layout>
                <v-flex
                        xs12
                        md4
                >
                    <v-text-field
                            v-model="stepData.appName"
                            :rules="[fieldRules.requireField]"
                            label="Название приложения*"
                            required
                    ></v-text-field>
                </v-flex>

                <v-flex
                        xs12
                        md4
                >
                    <v-text-field
                            v-model="stepData.shortAppName"
                            :rules="[fieldRules.shortLength, fieldRules.requireField]"
                            :counter="12"
                            label="Короткое название приложения"
                            required
                            hint="Не более 12 символов"
                            persistent-hint
                    ></v-text-field>
                </v-flex>

                <v-flex
                        xs12
                        md4
                >
                    <v-file-input
                        v-model="stepData.appLogo"
                        @change="onFilePicked"
                        accept="image/*"
                        hint="Формат: png | Размер: 180x180"
                        persistent-hint
                        prepend-icon='attach_file'
                        :error="Boolean(fileResponse)"
                        :error-messages="fileResponse"
                        :rules="[fieldRules.requireField]"
                    ></v-file-input>


                </v-flex>
            </v-layout>

            <v-layout>
                <v-flex xs12>
                    <v-combobox
                            v-model="stepData.categorySelect"
                            :items="category"
                            label="Категория"
                            :rules="[fieldRules.requireField]"
                    ></v-combobox>
                </v-flex>
            </v-layout>

            <v-layout>
                <v-flex xs6>
                    <v-text-field
                            label="Человек оценили"
                            v-model='stepData.ratingNumbers'
                            :rules="[fieldRules.requireField]"
                            type="number"
                    ></v-text-field>
                </v-flex>
                <v-flex xs6>
                    <v-text-field
                            label="Количество звезд"
                            v-model='stepData.starsCount'
                            :rules="[fieldRules.requireField]"
                            type="number"
                            max="5"
                            hint="От 1 до 5"
                            persistent-hint
                    ></v-text-field>
                </v-flex>
            </v-layout>

            <v-layout>
                <v-flex>
                    <v-text-field
                            label="Имя разработчика*"
                            v-model='stepData.developerName'
                            :rules="[fieldRules.requireField]"
                    ></v-text-field>
                </v-flex>
                <v-flex>
                    <v-text-field
                            label="E-mail разработчика*"
                            v-model='stepData.developerEmail'
                            :rules="[fieldRules.requireField]"
                    ></v-text-field>
                </v-flex>
                <v-flex>
                    <v-text-field
                            label="Сайт разработчика*"
                            v-model='stepData.developerSite'
                            :rules="[fieldRules.requireField]"
                    ></v-text-field>
                </v-flex>
            </v-layout>

            <v-layout>
                <v-flex>
                    <v-text-field
                            label="Размер приложения*"
                            type="number"
                            v-model='stepData.appSize'
                            :rules="[fieldRules.requireField]"
                    ></v-text-field>
                </v-flex>
                <v-flex>
                    <v-text-field
                            label="Текущая версия*"
                            v-model='stepData.appVersion'
                            :rules="[fieldRules.requireField]"
                    ></v-text-field>
                </v-flex>
                <v-flex>
                    <v-text-field
                            label="Возрастные ограничения*"
                            v-model='stepData.ageRestrictions'
                            :rules="[fieldRules.requireField]"
                            type="number"
                            hint="от 0 до 21"
                            persistent-hint
                    ></v-text-field>
                </v-flex>
                <v-flex>
                    <v-text-field
                            label="Количество установок*"
                            v-model='stepData.appInstallCount'
                            :rules="[fieldRules.requireField]"
                            hint="Число кратное тысячи"
                            persistent-hint
                    ></v-text-field>
                </v-flex>
            </v-layout>

            <div class="step-buttons my-5">
                <v-btn
                        color="primary"
                        @click="onNextStep"
                >
                    Дальше
                </v-btn>

                <v-btn to="/" text>Отменить</v-btn>
            </div>
        </v-container>
    </v-form>
</template>

<script lang="ts" src="./StageOne.ts"></script>
<style scoped></style>
