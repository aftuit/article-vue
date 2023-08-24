<template>
  <div class="form-floating mt-3">
    <textarea
      :type="type"
      class="form-control"
      :id="id"
      :placeholder="label"
      @input="updateInput"
      :value="modelValue"
    ></textarea>
    <label for="floatingPassword">{{ label }}</label>
  </div>
</template>
  <script>
export default {
  name: "TextArea",
  props: {
    type: String,
    label: String,
    id: String,
    modelValue: [String, Number],
  },
  methods: {
    updateInput(e) {
      this.$emit("update:modelValue", e.target.value);
    },
  },
};
</script>
  <style>
</style>