<template>
  <v-app>
    <v-main>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center" dense>
          <v-col cols="12" sm="8" md="4" lg="4">
            <v-card elevation="0">
              <a
                href="/"
                name="Fedorae Education"
                title="Fedorae Education"
                target="_blank"
              >
                <v-img
                  src="@/assets/login.png"
                  alt="login"
                  contain
                  height="200"
                ></v-img>
              </a>
              <v-card-text>
                <v-form>
                  <v-text-field
                    label="Email"
                    type="email"
                    outlined
                    prepend-inner-icon="mdi-email"
                  />
                  <v-text-field
                    label="Password"
                    type="password"
                    outlined
                    suffix="| Forgot?"
                    prepend-inner-icon="mdi-lock"
                  />

                  <v-btn class="rounded-0" color="primary" x-large block dark
                    >Login</v-btn
                  >
                  <v-card-actions class="text--secondary">
                    <v-checkbox
                      color="#000000"
                      label="Remember me"
                    ></v-checkbox>
                    <v-spacer></v-spacer>
                    No account?
                    <router-link to="/signup" class="pl-2 font-weight-black">
                      Sign Up
                    </router-link>
                  </v-card-actions>
                </v-form>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'Login',
}
</script>
