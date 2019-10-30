<template>
    <v-form
            ref="form"
    >
        <v-container grid-list-md>
            <div v-for="(review, index) in stepData"
                 :key="index"
                 class="review-item">
                <div class="review-item__header">
                    <h2 class="review-item__title font-weight-bold">{{review.name + `${index+1}`}}</h2>
                    <v-btn
                            @click="()=> removeReview(index)"
                            icon>
                        <v-icon>delete</v-icon>
                    </v-btn>
                </div>
                <v-layout wrap>
                    <v-flex xs12>
                        <label :for="`input-${review.id}`">
                            <v-text-field
                                    label="Аватар"
                                    :rules="[fieldRules.requireField]"
                                    prepend-icon='attach_file'
                                    readonly
                                    single-line
                                    v-model="review.avatar.name"
                                    hint="Формат: jpg/jpeg | Размер: 48x48"
                                    persistent-hint
                            >
                            </v-text-field>
                        </label>

                        <input
                                type="file"
                                style="display: none"
                                ref="image"
                                name="iconSmallName"
                                :id="`input-${review.id}`"
                                accept="image/png"
                                @change="(e)=>onFilePicked(e, index, review.id)"
                        >
                    </v-flex>

                    <v-flex
                            xs12
                            sm6
                    >
                        <v-text-field
                                label="Имя"
                                :rules="[fieldRules.requireField]"
                                v-model="review.authorName"
                        >
                        </v-text-field>
                    </v-flex>

                    <v-flex
                            xs12
                            sm6
                    >
                        <v-text-field
                                label="Фамилия"
                                :rules="[fieldRules.requireField]"
                                v-model="review.authorLastName"
                        ></v-text-field>
                    </v-flex>

                    <v-flex
                            xs12
                            sm6
                    >
                        <v-text-field
                                label="Кол-во звезд*"
                                :rules="[fieldRules.requireField]"
                                v-model="review.starCount"
                                type="number"
                                hint="От 1 до 5"
                                persistent-hint
                        ></v-text-field>
                    </v-flex>

                    <v-flex
                            xs12
                            sm6
                    >
                        <v-text-field
                                label="Кол-во лайков*"
                                :rules="[fieldRules.requireField]"
                                v-model="review.likesCount"
                                type="number"
                        ></v-text-field>
                    </v-flex>

                    <v-flex xs12>
                        <v-textarea
                                outlined
                                label="Текст*"
                                :rules="[fieldRules.requireField]"
                                v-model="review.text"
                                requared
                        ></v-textarea>
                    </v-flex>

                </v-layout>
            </div>

            <div class="text-center">
                <v-btn
                        :disabled="disabledButton"
                        icon
                        @click="addReview">
                    <v-icon>add</v-icon>
                </v-btn>
            </div>
        </v-container>

        <v-btn @click="onSubmitForm">Создать PWA</v-btn>
    </v-form>
</template>

<script lang="ts" src="./StageSix.ts"></script>

<style scoped lang="sass" src="./StageSix.sass"></style>
