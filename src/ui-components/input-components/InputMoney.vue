<template>
  <div>
    <currency-input v-model="value" currency="EUR" locale="de" />
  </div>
</template>

<script>
export default {
  data: () => ({
    value: 1000,
  }),
};
</script>
<style scoped></style>
