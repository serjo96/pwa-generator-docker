<template>
    <div>
        <h1 class="my-2">Creating template</h1>

        <v-stepper v-model="step">
                <v-stepper-header>
                    <v-stepper-step
                            editable
                            :complete="step > 1"
                            step="1"
                    >General</v-stepper-step>

                    <v-divider></v-divider>

                    <v-stepper-step
                            editable
                            :complete="step > 2"
                            step="2"
                    >Raring</v-stepper-step>

                    <v-divider></v-divider>

                    <v-stepper-step
                            editable
                            :complete="step > 3"
                            step="3"
                    >Description</v-stepper-step>

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
                    >Screenshots</v-stepper-step>

                    <v-divider></v-divider>

                    <v-stepper-step
                            editable
                            :complete="step > 6"
                            step="6"
                    >Reviews</v-stepper-step>


                </v-stepper-header>

                <v-stepper-items>
                    <v-stepper-content step="1">
                        <StageOne
                                :onUploadFiles="uploadFiles"
                                :fileResponse="fileResponse"
                                :stepData="formData.stageOne"
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
            </v-stepper>
        <Preloader v-if="!isLoading"></Preloader>
    </div>

</template>

<script lang="ts" src="./CreateTemplate.ts"></script>
<style scoped></style>
