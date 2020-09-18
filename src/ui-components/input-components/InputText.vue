<template>
  <div class="form-label-group">
    <input
    type="input"
    class="form-input"
    :id="'field_'+fieldName"
    :placeholder="label"
      v-model="modelValue"
      :readonly="readonlyAttr"
    />
    <label for="field">{{label}}</label>
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
<style lang="scss">
$primary: #11998e;
$secondary: #38ef7d;

.form-label-group {
  position: relative;
  padding: 15px 0 0;
  margin-top: 15px;
  width: 100%;
}
input {
   font-family: inherit;
  width: 100% !important;
  border: 0;
  border-bottom: 1px solid gray;
  outline:0;
  font-size: 1.3rem;
  color:rgba(20, 19, 19, 0.74);
  padding: 7px 0;
  background: transparent;
  transition: border 0.2s;
}
.form-input::placeholder {
  color: transparent;
}
.form-input:placeholder-shown~label {
  top: 20px;
  cursor: text;
  font-size: 0.9rem;
  color: #777;
}

label {
  position: absolute;
  top: 0;
  display: block;
  transition: 0.2s;
  font-size: 1rem;
  color: gray;
}
.form__field:focus {
  ~ label {
    position: absolute;
    top: 0;
    display: block;
    transition: 0.2s;
    font-size: 1rem;
    color: $primary;
    font-weight:700;
  }
  padding-bottom: 6px;
  font-weight: 700;
  border-width: 3px;
  border-image: linear-gradient(to right, $primary,$secondary);
  border-image-slice: 1;
}
</style>
