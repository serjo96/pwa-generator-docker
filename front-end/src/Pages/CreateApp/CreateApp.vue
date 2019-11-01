<template>
<!--    <WrapperPreloader-->
<!--            :status="isLoading"-->
<!--    >-->
        <v-stepper v-model="step">
            <v-stepper-header>
                <v-stepper-step
                        editable
                        :complete="step > 1"
                        step="1"
                >Общее</v-stepper-step>

                <v-divider></v-divider>

                <v-stepper-step
                        editable
                        :complete="step > 2"
                        step="2"
                >Оценки</v-stepper-step>

                <v-divider></v-divider>

                <v-stepper-step
                        editable
                        :complete="step > 3"
                        step="3"
                >Описание</v-stepper-step>

                <v-divider></v-divider>

                <v-stepper-step
                        editable
                        :complete="step > 4"
                        step="4"
                >PWA</v-stepper-step>

                <v-divider></v-divider>

                <v-stepper-step
                        editable
                        :complete="step > 5"
                        step="5"
                >Скриншоты</v-stepper-step>

                <v-divider></v-divider>

                <v-stepper-step
                        editable
                        :complete="step > 6"
                        step="6"
                >Отзывы</v-stepper-step>


            </v-stepper-header>

            <v-stepper-items>
                <v-stepper-content step="1">
                    <StageOne
                            createApp
                            :onUploadFiles="uploadFiles"
                            :fileResponse="fileResponse"
							:stepData="formData.stageOne"
                            :onSelectTemplate="onSelectTemplate"
                            :templatesList="templatesList"
                            :nextStep="onNextStep"
                            :submitStepData="takeDataFromStep"
                    ></StageOne>
                </v-stepper-content>

                <v-stepper-content step="2">
                    <StageTwo
                            :stepData="formData.stageTwo"
                            :nextStep="onNextStep"
                            :prevStep="onBuckStep"
                            :submitStepData="takeDataFromStep"
                    ></StageTwo>
                </v-stepper-content>

                <v-stepper-content step="3">
                    <StageThree
                            :stepData="formData.stageThree"
                            :nextStep="onNextStep"
                            :prevStep="onBuckStep"
                            :submitStepData="takeDataFromStep"
                    ></StageThree>
                </v-stepper-content>
                <v-stepper-content step="4">
                    <StageFour
                            :onUploadFiles="uploadFiles"
                            :fileResponse="fileResponse"
                            :stepData="formData.stageFour"
                            :nextStep="onNextStep"
                            :prevStep="onBuckStep"
                            :submitStepData="takeDataFromStep"
                    ></StageFour>
                </v-stepper-content>

                <v-stepper-content step="5">
                    <StageFive
                            :addSnackBarMessage="addSnackBarMessage"
                            :onUploadFiles="uploadFiles"
                            :fileResponse="fileResponse"
                            :stepData="formData.stageFive"
                            :nextStep="onNextStep"
                            :prevStep="onBuckStep"
                            :submitStepData="takeDataFromStep"
                    ></StageFive>
                </v-stepper-content>
                <v-stepper-content step="6">
                    <StageSix
                            :onUploadFiles="uploadFiles"
                            :fileResponse="fileResponse"
                            :stepData="formData.stageSix"
                            :nextStep="onNextStep"
                            :prevStep="onBuckStep"
                            :submitStepData="takeDataFromStep"
                            :submitForm="onSubmitForm"
                    ></StageSix>
                </v-stepper-content>
            </v-stepper-items>
		<Preloader v-if="!isLoading"></Preloader>
        </v-stepper>

<!--    </WrapperPreloader>-->
</template>

<script lang="ts" src="./CreateApp.ts"></script>
<style scoped></style>
