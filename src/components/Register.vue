<template>
  <main class="form-signin w-50 text-center">
    <form class="m-auto" @submit="registerHandler">
      <img class="mb-4" :src="logo" alt="" width="w-25" />
      <h1 class="h3 mb-3 fw-normal">Register</h1>
      <Input
        v-model="username"
        type="text"
        label="Your name"
        id="floatingName"
      />
      <Input
        v-model="email"
        type="email"
        label="Email address"
        id="floatingInput"
      />
      <Input
        v-model="password"
        type="password"
        label="Password"
        id="floatingPassword"
      />
      <Button type="submit" :disabled="isLoading">
        <span
          v-if="isLoading"
          class="spinner-grow spinner-grow-sm"
          role="status"
          aria-hidden="true"
        >
        </span>
        <span class="d-inline-block ms-1">Register</span>
      </Button>

      <ValidationError
        v-if="ValidationError"
        :ValidationError="ValidationError"
      />
    </form>
  </main>
</template>

<script>
import { logo } from "../constants";
import ValidationError from "./ValidationError.vue";
import { mapState } from "vuex";
export default {
  data() {
    return {
      logo,
      username: "",
      email: "",
      password: "",
    };
  },

  components: {
    ValidationError,
  },

  computed: {
    ...mapState({
      isLoading: (state) => state.auth.isLoading,
      ValidationError: (state) => state.auth.errors,
    }),
  },

  methods: {
    registerHandler(e) {
      e.preventDefault();
      const data = {
        username: this.username,
        email: this.email,
        password: this.password,
      };
      this.$store
        .dispatch("register", data)
        .then((res) => {
          console.log("RES-REGISTER", res);
          this.$router.push({ name: "login" });
        })
        .catch((err) => {
          console.log("ERR-REGISTER", err);
        });
    },
  },
};
</script>

<style>
</style>