<template>
  <main class="form-signin w-50 text-center">
    <form @submit="submitHandler">
      <img class="mb-4" :src="logo" alt="" width="w-25" />
      <h1 class="h3 mb-3 fw-normal">Login</h1>
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
        <span class="d-inline-block ms-1">Log in</span>
      </Button>

      <ValidationError
        v-if="ValidationError"
        :ValidationError="ValidationError"
      />
    </form>
  </main>
</template>

<script>
import { mapState } from "vuex";
import { logo } from "../constants";
import ValidationError from "./ValidationError.vue";
export default {
  components: {
    ValidationError,
  },
  data() {
    return {
      logo,
      email: "",
      password: "",
    };
  },
  computed: {
    ...mapState({
      isLoading: (state) => state.auth.isLoading,
      ValidationError: (state) => state.auth.errors,
    }),
  },
  methods: {
    submitHandler(e) {
      e.preventDefault();
      const data = {
        email: this.email,
        password: this.password,
      };
      this.$store
        .dispatch("login", data)
        .then((res) => {
          console.log("RES-LOGIN", res);
          this.$router.push({ name: "home" });
        })
        .catch((err) => {
          console.log("ERR-LOGIN", err);
        });
      console.log(data);
    },
  },
};
</script>

<style>
</style>