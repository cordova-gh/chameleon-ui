<template >
  <div class="input-box">
    <input type="text" v-model="modelValue"
      :placeholder="label"
      :class="classCss"
      :readonly="readonlyAttr"
      @keypress="onlyNumber"
      @blur="blurField"
    />
     <label :for="'f_' + fieldName">{{ label}}</label>
  </div>
</template>
<script>
export default {
  props: {
    value: {
      type: [String, Number],
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
  methods: {
    onlyNumber($event) {
      const keyCode = $event.keyCode ? $event.keyCode : $event.which;
      // only allow number
      if (keyCode < 48 || keyCode > 57) {
        $event.preventDefault();
      }
    },
    blurField() {
      this.$emit('blur');
    },
  },
};
</script>
