<template>
  <div class="form-floating mt-3">
    <input
      :type="type"
      class="form-control"
      :id="id"
      :placeholder="label"
      @input="updateInput"
      :value="modelValue"
    />
    <label for="floatingPassword">{{ label }}</label>
  </div>
</template>
<script>
export default {
    name: "Input",
    props: {
        type: String,
        label: String,
        id: String,
        modelValue: [String, Number],
    },
    methods: {
      updateInput(e) {
        this.$emit("update:modelValue", e.target.value)
      }
    }
};
</script>
<style>
</style>