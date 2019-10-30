<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
        <WrapperPreloader
                :status="loadingStatus"
        >
            <div class="apps-list">
                <v-container grid-list-md text-xs-center>
                    <v-layout row wrap>
                        <v-layout row wrap>
                            <v-flex
                                    v-for="app in appsList"
                                    :key='app.formData.stageOne.appName'
                                    xs3
                                    px-2
                            >
                                <div class="app">
                                    <v-card>
                                        <v-btn icon
                                               class="app__remove-btn"
                                               color="red"
                                               @click="()=> removeApp(app.formData.stageOne.appName)"
                                        >
                                            <v-icon>delete</v-icon>
                                        </v-btn>
                                            <v-img
                                                    :src="`${url}/${app.userName}/${app.formData.stageOne.appName}/images/appLogo.png`"
                                                    aspect-ratio="2.75"
                                            ></v-img>
                                            <v-card-title primary-title>{{app.formData.stageOne.appName}}</v-card-title>
											<span class="py-2 pa-2">
												<v-text-field
														:value="`${url}/${app.userName}/${app.formData.stageOne.appName}`"
														readonly
														hide-details
														class="pa-2 py-2"
												></v-text-field>
<!--												<v-text-field-->
<!--													:value="app.links.subDomain"-->
<!--													readonly-->
<!--													hide-details-->
<!--													class="pa-2 py-2"-->
<!--												></v-text-field>-->
											</span>
                                    </v-card>
                                </div>
                            </v-flex>
                        </v-layout>
                    </v-layout>
                </v-container>
            </div>
        </WrapperPreloader>
</template>

<script lang="ts" src="./AppsListContent.ts"></script>
<style lang="sass" src="./AppListContent.sass" scoped></style>
