<template>
  <ul class="list-group mt-3">
    <li
      v-for="item in errorList"
      :key="item"
      class="list-group-item list-group-item-danger mt-1"
    >
      {{ item }}
    </li>
  </ul>
</template>
<script>
export default {
  props: {
    ValidationError: {
      type: Object,
      required: true,
    },
  },
  computed: {
    errorList() {
      return Object.keys(this.ValidationError).map((name) => {
        const msg = this.ValidationError[name].join(",");
        return `${name} ${msg}`;
      });
    },

  },
};
</script>
<style>
</style>