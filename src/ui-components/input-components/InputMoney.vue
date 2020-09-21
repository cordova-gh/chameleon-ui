<template>
  <div class="input-box">
    <currency-input v-model="value"
      :id="'f_' + fieldName" currency="EUR"
      locale="de"
    />
  </div>
</template>

<script>
export default {
  props: {
    readonlyAttr: {
      type: Boolean,
      default: false,
    },
    fieldName: {
      type: String,
      default: '',
    },
  },
  data: () => ({
    value: 1000,
  }),
};
</script>
<style scoped></style>
