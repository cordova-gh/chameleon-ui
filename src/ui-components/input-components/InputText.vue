<template>
  <div class="formBody">
    <input
      type="input"
      class="form-input"
      :id="fieldName !== '' ? 'field_' + fieldName: ''"
      :placeholder="label"
      v-model="modelValue"
      :readonly="readonlyAttr"
    />
    <label :for= "'label_' + fieldName"> {{ label}} </label>
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
$primary: #2c3e50;
$secondary:#007bff8a;

.formBody {
  position: relative;
  padding: 15px 0 0;

  width: 100%;
}
input {
  background: transparent;
  border: 0;
  border-bottom: 1px solid #ced4da;
  color:#495057;
  font-size: 1rem;
  font-family: Arial, Helvetica, sans-serif;
  font-weight: lighter;
  outline: 0;
  padding: 7px 0;
  transition: border-color 0.2s;
  text-transform: capitalize;
  width: 100% !important;

  &::placeholder {
    color: transparent;
  }
  &:placeholder-shown ~ label {
    top: 20px;
    cursor: text;
    font-size: 1rem;
    color: $primary;
  }
}

label {
  position: absolute;
  top: 0;
  display: block;
  transition: 0.2s;
  font-size: 1.2rem;
  color: gray;
  opacity: 0.9;
}
input:focus {
  ~ label {
    position: absolute;
    top: 0;
    display: block;
    transition: 0.2s;
    color: $secondary;
    font-weight: normal;
  }
  font-size: inherit;
  font-family: Helvetica, Arial, sans-serif;
  font-weight: 200;
  padding-bottom: 6px;
  font-weight: lighter;
  border-width: 1px;
  border-image: linear-gradient(to right, rgba(0,123,255,.25),rgba(0, 174, 255, 0.514));
  border-image-slice: 1;
  color: $primary;
}
</style>
