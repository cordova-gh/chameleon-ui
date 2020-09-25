<template>
  <div class="input-box">
    <input
      type="text"
      v-model="modelValue"
      :id="'f_' + fieldName"
      :placeholder="label"
      :readonly="readonlyAttr"
      class="form-input"
    />
    <label :for="'f_' + fieldName">{{ label}}</label>
  </div>
</template>
<script>
export default {
  props: {
    value: {
      type: String,
    },
    label: {
      type: String,
    },
    readonlyAttr: {
      type: Boolean,
      default: false,
    },
    fieldName: {
      type: String,
      default: '',
    },
  },
  computed: {
    modelValue: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit('input', val);
      },
    },
  },
};
</script>
