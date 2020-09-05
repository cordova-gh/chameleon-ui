<template>
  <div>
    <select v-model="modelValue" :class="classCss">
      <option v-for="item in items" :key="item.id">
        {{ item.showText }}
      </option>
    </select>
  </div>
</template>
<script>
import { API_DOMINIO } from '../../services/constant-services';

export default {
  props: {
    config: {
      type: Object,
      default: () => ({}),
    },
    value: {
      type: String,
    },
    classCss: {
      type: String,
      default: 'form-control form-control form-control-alternative',
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
      items: [],
      fieldId: 'codice',
      fieldCodice: 'codice',
      fieldDescrizione: 'descrizione',
      showCodice: false,
      showDescrizione: false,
    };
  },
  created() {
    if (this.config.fieldId) this.fieldId = this.config.fieldId;
    if (this.config.fieldCodice) { this.fieldCodice = this.config.fieldCodice; }
    if (this.config.fieldDescrizione) { this.fieldCodice = this.config.fieldDescrizione; }
    if (this.config.showCodice) this.showCodice = this.config.showCodice;
    if (this.config.showDescrizione) { this.showDescrizione = this.config.showDescrizione; }
    this.find();
  },
  methods: {
    find() {
      let api = this.config.urlApi;
      if (this.config.isDominio) {
        api = `${API_DOMINIO}/${this.config.dominio}`;
      }
      fetch(api, {})
        .then(res => res.json())
        .then((data) => {
          let arrayRet = [];
          if (this.config.isDominio) arrayRet = data;
          else arrayRet = data.entities;
          arrayRet.forEach((element) => {
            const object = {};
            object.id = element[this.fieldId];
            object.codice = element[this.fieldCodice];
            object.descrizione = element[this.fieldDescrizione];
            if (this.showCodice && this.showDescrizione) {
              object.showText =
                `${element[this.fieldCodice]
                } = ${
                  element[this.fieldDescrizione]}`;
            } else if (this.showCodice) {
              object.showText = element[this.fieldCodice];
            } else if (this.showDescrizione) {
              object.showText = element[this.fieldDescrizione];
            }
            this.items.push(object);
          });
        });
    },
    enter() {
      this.textSearchTemp = this.textSearch;
      this.textSearch = '';
      this.textSelected = '';
      this.find();
    },
  },
};
</script>
