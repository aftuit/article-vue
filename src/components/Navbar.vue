<template>
  <div
    class="d-flex flex-column flex-md-row align-items-center py-3 mb-4 border-bottom"
  >
    <RouterLink
      :to="{ name: 'home' }"
      class="d-flex align-items-center text-dark text-decoration-none"
    >
      <img :src="logo" alt=""  height="50" />
    </RouterLink>

    <nav class="d-inline-flex mt-2 mt-md-0 ms-md-auto">
      <template v-if="isLoggedIn">
        <RouterLink
          class="me-3 py-2 text-dark text-decoration-none"
          :to="{ name: 'home' }"
        >
          {{
            currentUser.username[0].toUpperCase() +
            currentUser.username.slice(1)
          }}
        </RouterLink>

        <RouterLink
          class="me-3 text-decoration-none py-2 text-dark"
          :to="{ name: 'create-article' }"
          title="Create article"
        >
          Create article
        </RouterLink>

        <a
          href="#"
          class="me-3 py-2 text-dark text-decoration-none list-group-item list-group-item-danger rounded"
          @click="logout"
          title="Log out"
          >Log out</a
        >
      </template>

      <template v-if="isAnonymous">
        <RouterLink
          class="me-3 py-2 text-dark text-decoration-none"
          :to="{ name: 'login' }"
        >
          Login
        </RouterLink>
        <RouterLink
          class="py-2 text-dark text-decoration-none"
          :to="{ name: 'register' }"
        >
          Register
        </RouterLink>
      </template>
    </nav>
  </div>
</template>
<script>
import { logo } from "../constants";
import { mapGetters } from "vuex";
import { gettersTypes } from "@/modules/types";
export default {
  data() {
    return {
      logo,
    };
  },
  computed: {
    ...mapGetters({
      currentUser: gettersTypes.currentUser,
      isLoggedIn: gettersTypes.isLoggedIn,
      isAnonymous: gettersTypes.isAnonymous,
    }),
  },
  methods: {
    logout() {
      this.$store.dispatch("logout");
    },
  },
};
</script>
<style>
</style>