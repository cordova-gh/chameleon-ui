<template>
  <div class="input-box">
    <textarea
      v-model="modelValue"
      :placeholder="label"
      :class="classCss"
      :readonly="readonlyAttr"
      cols="5"
      rows="5"
    ></textarea>
  </div>
</template>
<script>
export default {
  data() {
    return {
      codeString: '',
    };
  },
  props: {
    value: {
      type: String,
    },
    label: {
      type: String,
    },
    classCss: {
      type: String,
      default: 'form-control form-control form-control-alternative',
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
