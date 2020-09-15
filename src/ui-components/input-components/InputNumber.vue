<template >
  <div>
    <input
      type="text"
      v-model="modelValue"
      :placeholder="label"
      :class="classCss"
      @keypress="onlyNumber"
      :readonly="readonlyAttr"
    />
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
  methods: {
    onlyNumber($event) {
      const keyCode = $event.keyCode ? $event.keyCode : $event.which;
      // only allow number
      if (keyCode < 48 || keyCode > 57) {
        $event.preventDefault();
      }
    },
  },
};
</script>
