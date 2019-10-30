<template>
    <v-form>
        <v-container grid-list-md>
            <v-layout>
                <v-flex
                        xs12
                >
                    <v-text-field
                            v-model="stepData.oneStar"
                            label="1★"
                            type="number"
                    ></v-text-field>
                    <v-text-field
                            v-model="stepData.twoStar"
                            label="2★"
                            type="number"
                    ></v-text-field>

                    <v-text-field
                            v-model="stepData.threeStar"
                            label="3★"
                            type="number"
                    ></v-text-field>
                </v-flex>

                <v-flex
                        xs12
                >
                    <v-text-field
                            v-model="stepData.fourStar"
                            label="4★"
                            type="number"
                    ></v-text-field>
                    <v-text-field
                            v-model="stepData.fiveStar"
                            label="5★"
                            type="number"
                    ></v-text-field>
                </v-flex>
            </v-layout>


            <div class="chart">
                <div class="chart__item">
                    <span class="chart__item-count">5</span>
                    <v-progress-linear
                            color="green"
                            height="19"
                            background-opacity="0"
                            :value="getFive || 0"
                            class="my-1"
                    ></v-progress-linear>
                </div>

                <div class="chart__item">
                    <span class="chart__item-count">4</span>
                    <v-progress-linear
                            color="green"
                            height="19"
                            background-opacity="0"
                            class="my-1"
                            :value="getFour || 0"
                    ></v-progress-linear>
                </div>

                <div class="chart__item">
                    <span class="chart__item-count">3</span>
                    <v-progress-linear
                            color="yellow"
                            height="19"
                            background-opacity="0"
                            class="my-1"
                            :value="getThree || 0"
                    ></v-progress-linear>
                </div>

                <div class="chart__item">
                    <span class="chart__item-count">2</span>
                    <v-progress-linear
                            color="orange"
                            height="19"
                            background-opacity="0"
                            class="my-1"
                            :value="getTwo || 0"
                    ></v-progress-linear>
                </div>

                <div class="chart__item">
                    <span class="chart__item-count">1</span>
                    <v-progress-linear
                            color="deep-orange"
                            height="19"
                            background-opacity="0"
                            class="my-1"
                            :value="getOne || 0"
                    ></v-progress-linear>
                </div>


            </div>

            <div class="step-buttons my-5">
                <v-btn class="mr-4" @click="onNextStep">Дальше</v-btn>
                <v-btn @click="onPrevStep">Назад</v-btn>
            </div>
        </v-container>
    </v-form>
</template>

<script lang="ts" src="./StageTwo.ts"></script>
<style lang="sass" src="./StageTwo.sass" scoped></style>
