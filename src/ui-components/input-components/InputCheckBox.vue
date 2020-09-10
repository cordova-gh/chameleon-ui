<template>
  <div>
    <template v-if="isReadonly">
      <input type="checkbox" v-model="modelValue" onclick="return false;" />
    </template>
    <template v-else>
      <input type="checkbox" v-model="modelValue" />
    </template>
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
    isReadonly: {
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
<style>
.mx-input {
  height: 100% !important;
  border: 1px solid #fff;
  padding: 0px;
  font-size: inherit;
  -webkit-box-shadow: inset 0 0px 0px rgba(0, 0, 0, 0.075);
  box-shadow: inset 0 0px 0px rgba(0, 0, 0, 0.075);
}

.mx-input:hover,
.mx-input:focus {
  border-color: #ffffff;
}
</style>
