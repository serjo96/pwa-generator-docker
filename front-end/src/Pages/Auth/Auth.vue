<template>
    <div class="auth">
        <div class="auth__form">
            <div class="login">
                <div class="login__title">Login</div>
                <v-form
                        ref="form"
                        v-model="valid"
                        @keyup.native.enter="login"
                >
                    <div class="login__inputs">
                        <div class="login__input">
                            <v-text-field
                                    v-model="email"
                                    :rules="[rules.emailRequired, rules.validEmailRequired]"
                                    label="E-mail"
                                    type="email"
                                    required
                                    color="light-blue darken-1"
                                    prepend-inner-icon="email"
                                    solo
                                    dark
                            ></v-text-field>
                        </div>
                        <div class="login__input">
                            <v-text-field
                                    @click:append="showPassword = !showPassword"
                                    @input="clearErrorData"
                                    :error-messages="AuthError.message"
                                    :type="showPassword ? 'text' : 'password'"
                                    :rules="[rules.required]"
                                    v-model="password"
                                    name="password"
                                    label="Password"
                                    color="light-blue darken-1"
                                    solo
                                    dark
                                    prepend-inner-icon="lock"
                                    :append-icon="showPassword ? 'visibility' : 'visibility_off'"
                            ></v-text-field>
                        </div>
                    </div>

                    <v-btn
                            @click="login"
                            color="light-blue darken-1"
                            class="login__button"
                            block
                    >
                        Login
                    </v-btn>


                </v-form>
            </div>
        </div>
    </div>

</template>

<script src="./Auth.ts" lang="ts"></script>

<style src="./auth.sass" lang="sass" scoped></style>
