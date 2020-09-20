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
    <label :for= "'label_' + fieldName"> {{ label }} </label>
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
$primary: #383ab3;
$secondary: #37d6c9;

.formBody {
  position: relative;
  padding: 15px 0 0;

  width: 100%;
}
input {
  background: transparent;
  border: 0;
  border-bottom: 1px solid gray;
  color: rgba(20, 19, 19, 0.74);
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
    font-size: 0.9rem;
    color: #777;
  }
}

label {
  position: absolute;
  top: 0;
  display: block;
  transition: 0.2s;
  font-size: 1rem;
  color: gray;
}
input:focus {
  ~ label {
    position: absolute;
    top: 0;
    display: block;
    transition: 0.2s;
    font-size: 1rem;
    color: $primary;
    font-weight: 700;
  }
  padding-bottom: 6px;
  font-weight: 700;
  border-width: 3px;
  border-image: linear-gradient(to right, $primary, $secondary);
  border-image-slice: 1;
}
</style>
