<template>
  <div class="text-left">
    <template v-if="readonlyAttr">
      <input type="checkbox" v-model="modelValue" onclick="return false;" />
    </template>
    <template v-else>
      <input type="checkbox" v-model="modelValue" />
    </template>
    {{label}}
  </div>
</template>

<script>
export default {
  props: {
    classCss: {
      type: String,
      default: 'form-control form-control form-control-alternative',
    },
    value: {
      type: Boolean,
    },
    readonlyAttr: {
      type: Boolean,
      default: false,
    },
    label: {
      type: String,
      default: '',
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

