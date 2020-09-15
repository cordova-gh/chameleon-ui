<template>
<textarea
      :placeholder="label"
      v-model="modelValue"
      :class="classCss"
      cols="5"
      rows="5"
      :readonly="readonlyAttr"
    ></textarea>
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
