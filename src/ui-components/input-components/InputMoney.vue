<template>
  <div class="input-box-money">
    <currency-input v-model="value"
      :id="'f_' + fieldName" currency="EUR"
      locale="de"
      class="form-input"
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
    fieldName: {
      type: String,
      default: '',
    },
  },
};
</script>
<style lang="scss">
$primary: #2c3e50;
$secondary: #007bff8a;
</style>
