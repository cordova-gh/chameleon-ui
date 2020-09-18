<template>
  <div class="form-label-group">
    <input
      type="text"
      :placeholder="label"
      v-model="modelValue"
      :class="classCss"
      :readonly="readonlyAttr"
      :id="'field_'+fieldName"
    />
    <label for="inputEmail">{{label}}</label>
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
<style>

  :root {
  --input-padding-x: 1.5rem;
  --input-padding-y: .75rem;
}
.form-label-group>label {
  position: absolute;
  top: 0;
  left: 0;
  display: block;
  width: 100%;
  margin-bottom: 0;
  /* Override default `<label>` margin */
  line-height: 1.5;
  color: #495057;
  border: 1px solid transparent;
  border-radius: .25rem;
  transition: all .1s ease-in-out;
}

.form-label-group input::-webkit-input-placeholder {
  color: transparent;
}
.form-label-group input:not(:placeholder-shown) {
  padding-top: calc(var(--input-padding-y) + var(--input-padding-y) * (2 / 3));
  padding-bottom: calc(var(--input-padding-y) / 3);
}

.form-label-group input:not(:placeholder-shown)~label {
  padding-top: calc(var(--input-padding-y) / 3);
  padding-bottom: calc(var(--input-padding-y) / 3);
  font-size: 12px;
  color: #777;
}
</style>
