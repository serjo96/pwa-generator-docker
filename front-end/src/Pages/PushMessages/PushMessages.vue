<template>
    <div class="push-messages">
        <h1 class="push-messages__title display-3  mb-2">Push messages</h1>

		<v-form
				ref="form"
				v-model="valid"
		>
			<div class="push-messages__content">
				<v-card class="py-4">
					<v-container fluid grid-list-md>

						<v-layout>
							<v-flex xs12>
								<div class="push-messages__select-app">
									<v-select
											v-model="selectedApp"
											:items="appList"
											item-text="formData.stageOne.appName"
											:rules="[fieldRules.requireField]"
											hint="Chose app"
											placeholder="Chose app"
											solo
									></v-select>
								</div>
							</v-flex>
						</v-layout>
						<div class="push-message">
							<v-layout>
								<v-flex xs12>
									<div class="push-message__title">
										<v-text-field
												label="Push message title"
												outline
												v-model="pushTitle"
										></v-text-field>
									</div>
								</v-flex>
							</v-layout>

							<v-layout>
								<v-flex xs6>
									<div class="push-message__icon">
										<v-text-field
												label="Push message icon"
												outline
												hint="Add url to your icon"
												:rules="[fieldRules.urlValidate]"
												v-model="pushIcon"
										></v-text-field>
									</div>
								</v-flex>

								<v-flex xs6>
									<v-text-field
											label="Push message action link"
											outline
											v-model="pushAction"
									></v-text-field>
								</v-flex>
							</v-layout>

							<div class="push-message__content">
								<v-textarea
										label="Push text"
										v-model="pushText"
										hint="push text"
										outline
										no-resize
								></v-textarea>
							</div>
						</div>
						<v-btn large
							   color="info"
							   @click="onPush"
						>Push</v-btn>
					</v-container>

				</v-card>
			</div>
		</v-form>
    </div>
</template>

<script lang="ts" src="./PushMessages.ts"></script>
<style scoped></style>
