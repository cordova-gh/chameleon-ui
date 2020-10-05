<template>
  <div class="input-box-money">
    <currency-input v-model="modelValue"
      :id="'f_' + fieldName" currency="EUR"
      locale="de"
    />
    <label :for="'f_' + fieldName">{{ label }}</label>

  </div>
</template>

<script>
export default {
  props: {
    readonlyAttr: {
      type: Boolean,
      default: false,
    },
    label: {
      type: String,
    },
    value: {
      type: String,
    },
    fieldName: {
      type: String,
      default: '',
    },
  },
  computed: {
    modelValue: {
      get() {
        return this.value === '' ? 0 : this.value;
      },
      set(val) {
        this.$emit('input', val);
      },
    },
  },
};
</script>
<style lang="scss">
$primary: #2c3e50;
$secondary: #007bff8a;
</style>
