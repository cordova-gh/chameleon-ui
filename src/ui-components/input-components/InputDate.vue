<template>
  <div>
    <date-picker
      :class="classCss"
      v-model="modelValue"
      :placeholder="label"
      valueType="date"
      format="DD/MM/YYYY"
    >
    </date-picker>
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
.mx-input {
  height: 100% !important;
  border: 1px solid #fff;
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

.mx-input:hover,
.mx-input:focus {
  border-color: #ffffff;
}
.mx-datepicker {
  width: 100%;
}
</style>
