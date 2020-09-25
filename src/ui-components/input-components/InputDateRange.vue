<template>
  <div class="input-box-date">
    <date-picker
      v-model="modelValue"
      :placeholder="label"
      :id="'f_' + fieldName"
      valueType="YYYY-MM-DD"
      format="DD/MM/YYYY"
      range
    >
    </date-picker>
    <label :for="'f_' + fieldName"> {{ label }} </label>
  </div>
</template>
<script>
import DatePicker from 'vue2-datepicker';
import 'vue2-datepicker/index.css';

export default {
  components: { DatePicker },
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
  data() {
    return {
      time1: null,
      time2: null,
      time3: null,
    };
  },
};
</script>

