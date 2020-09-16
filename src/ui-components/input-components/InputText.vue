<template>
  <div class="form-label-group">
    <input
      type="text"
      :placeholder="label"
      v-model="modelValue"
      :class="classCss"
      :readonly="readonlyAttr"
    />
    <label for="inputEmail">Email address</label>
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
};
</script>
<style>
  :root {
  --input-padding-x: 1.5rem;
  --input-padding-y: .75rem;
}
input::-webkit-input-placeholder {
  color: transparent;
}

input:-ms-input-placeholder {
  color: transparent;
}
input::-ms-input-placeholder {
  color: transparent;
}

input::-moz-placeholder {
  color: transparent;
}

input::placeholder {
  color: transparent;
}
input:not(:placeholder-shown) {
  padding-top: calc(var(--input-padding-y) + var(--input-padding-y) * (2 / 3));
  padding-bottom: calc(var(--input-padding-y) / 3);
}

input:not(:placeholder-shown)~label {
  padding-top: calc(var(--input-padding-y) / 10);
  padding-bottom: calc(var(--input-padding-y) / 3);
  font-size: 12px;
  color: #777;
}
</style>
