<template>
  <div class="input-box-select">
    <select v-model="modelValue" :readonly="readonlyAttr">
      <!-- <option value="" disabled selected hidden>{{label}}</option> -->
      <option v-for="item in items" :key="item.id" :value="item._id">
        <template v-if="showCodice">
          {{ item.codice }}
        </template>
        <template v-else-if="showDescrizione">
          {{ item.descrizione }}
        </template>
      </option>
    </select>
    <label :for="'f_' + fieldName"> {{ label }} </label>
  </div>
</template>
<script>
export default {
  props: {
    config: {
      type: Object,
      default: () => ({}),
    },
    value: {
      type: String,
    },
    label: {
      type: String,
    },
    showCodice: {
      type: Boolean,
      default: false,
    },
    showDescrizione: {
      type: Boolean,
      default: true,
    },
    items: {
      type: Array,
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
    return {};
  },
  created() {
    if (this.config.fieldId) this.fieldId = this.config.fieldId;
    if (this.config.fieldCodice) {
      this.fieldCodice = this.config.fieldCodice;
    }
    if (this.config.fieldDescrizione) {
      this.fieldCodice = this.config.fieldDescrizione;
    }
    if (this.config.showCodice) this.showCodice = this.config.showCodice;
    if (this.config.showDescrizione) {
      this.showDescrizione = this.config.showDescrizione;
    }
  },
  methods: {
    enter() {
      this.textSearchTemp = this.textSearch;
      this.textSearch = '';
      this.textSelected = '';
      this.find();
    },
  },
};
</script>
