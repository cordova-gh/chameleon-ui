<template>
  <div>
    <input type="hidden" v-model="modelValue" />
    <input
      type="text"
      @input="findDebounce"
      v-model="valueShown"
      :class="classCss"
      @focus="enter"
      :readonly="readonlyAttr"
    />
    <ul id="autocomplete-results" v-show="isOpen" class="autocomplete-results">
      <li class="loading" v-if="isLoading">Loading results...</li>
      <li
        v-else
        v-for="(item, i) in items"
        :key="i"
        @click="setResult(item.id, item.showText)"
        class="autocomplete-result"
      >
        {{ item.showText }}
      </li>
    </ul>
  </div>
</template>
<script>
import { API_DOMINIO } from '../../services/constant-services';
import HttpCall from '../../services/HttpCall';

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
    readonlyAttr: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      textSearch: '',
      items: [],
      isLoading: false,
      isOpen: false,
      valueShownBack: '',
      functionTimeout: null,
      fieldId: 'codice',
      fieldCodice: 'codice',
      fieldDescrizione: 'descrizione',
      showCodice: false,
      showDescrizione: false,
      valueShown: '',
      preValues: {},
    };
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
  created() {
    if (this.config.fieldId) this.fieldId = this.config.fieldId;
    if (this.config.fieldCodice) { this.fieldCodice = this.config.fieldCodice; }
    if (this.config.fieldDescrizione) { this.fieldCodice = this.config.fieldDescrizione; }
    if (this.config.showCodice) this.showCodice = this.config.showCodice;
    if (this.config.showDescrizione) { this.showDescrizione = this.config.showDescrizione; }
    if (this.modelValue && this.modelValue !== '') this.findById();
  },
  methods: {
    findDebounce() {
      clearTimeout(this.functionTimeout);
      this.functionTimeout = setTimeout(this.find, 350);
    },
    find() {
      let api = this.config.urlApi;
      if (this.config.isDominio) {
        api = `${API_DOMINIO}/${this.config.dominio}`;
      }
      let params = '';
      if (this.valueShown !== '') {
        if (this.showCodice) {
          params += `?codice.contains=${this.valueShown}`;
        } else if (this.showDescrizione) {
          params += `?descrizione.contains=${this.valueShown}`;
        }
      }

      this.isLoading = true;
      // eslint-disable-next-line no-console
      const httpCall = new HttpCall(api);
      httpCall.get(params)
        .then((data) => {
          this.isLoading = false;
          this.isOpen = true;
          let arrayRet = [];
          this.items = [];
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
    findById() {
      // eslint-disable-next-line no-console
      console.log('ajahjdhsdj');
      let api = this.config.urlApi.replace('/all', '');
      if (this.config.isDominio) {
        api = `${API_DOMINIO}/${this.config.dominio}`;
      }

      const httpCall = new HttpCall(api);
      httpCall
        .get(`/${this.modelValue}`)
        .then((res) => { this.valueShown = res[this.fieldCodice]; });
    },
    enter() {
      this.preValues.valueShown = this.valueShown;
      this.preValues.modelValue = this.modelValue;
      this.valueShown = '';
      this.modelValue = '';
      this.find();
    },
    setResult(id, descrizione) {
      this.modelValue = id;
      this.valueShown = descrizione;
      this.isOpen = false;
      this.textSelected = descrizione;
    },
    handleClickOutside(evt) {
      if (!this.$el.contains(evt.target)) {
        if (this.modelValue === '') {
          this.modelValue = this.preValues.modelValue;
          this.valueShown = this.preValues.valueShown;
        }
        this.isOpen = false;
        this.arrowCounter = -1;
      }
    },
  },
  mounted() {
    document.addEventListener('click', this.handleClickOutside);
  },
  destroyed() {
    document.removeEventListener('click', this.handleClickOutside);
  },
};
</script>
<style>
.autocomplete {
  position: relative;
}

.autocomplete-results {
  padding: 0;
  margin: 0;
  border: 1px solid #eeeeee;
  height: 120px;
  overflow: auto;
  width: 100%;
}

.autocomplete-result {
  list-style: none;
  text-align: left;
  padding: 4px 2px;
  cursor: pointer;
}

.autocomplete-result.is-active,
.autocomplete-result:hover {
  background-color: #4aae9b;
  color: white;
}
</style>
