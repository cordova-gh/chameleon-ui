<template>
  <div class="input-box">
    <date-picker
      v-model="modelValue"
      :placeholder="label"
      :id="'f_' + fieldName"
      valueType="date"
      format="DD/MM/YYYY"
    >
    </date-picker>
    <label :for= "'f_' + fieldName"> {{ label}} </label>
  </div>
</template>
<script>
import DatePicker from 'vue2-datepicker';
import 'vue2-datepicker/index.css';

export default {
  components: { DatePicker },
  props: {
    classCss: {
      type: String,
      default: 'form-control form-control form-control-alternative',
    },
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
  data() {
    return {
      time1: null,
      time2: null,
      time3: null,
    };
  },
};
</script>
<style lang="scss">
$primary: #2c3e50;
$secondary:#007bff8a;
date-picker {
  border-width: 0;
}
.form-control {
  height: inherit !important;
  border: inherit !important;
  border-bottom: 1px solid #ced4da !important;
}
.form-control:focus {
    color: #495057;
    background-color: #fff;
    border-color:#80bdff;
    outline: 0;
    -webkit-box-shadow: 0 0 0 0.2rem rgba(0,123,255,.25);
    box-shadow: 0 0 0 0.2rem rgba(0,123,255,.25);
}
.mx-input {
  height: 100% !important;
  border: 1px solid #fff;
 // border-width: 0 !important;
  padding: 0px;
  font-size: inherit;
  -webkit-box-shadow: inset 0 0px 0px rgba(0, 0, 0, 0.075);
  box-shadow: inset 0 0px 0px rgba(0, 0, 0, 0.075);
  // to be review
  &::placeholder {
    color: gray;
    opacity: 1;
  }
}
.mx-input:focus {
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
.mx-datepicker {
  width: 100%;
}
</style>
