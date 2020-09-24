<template>
  <div>
      <div class="container shadow p-2 mb-3 bg-white rounded">
      <div class="row">
        <div class="col">
            <input-number
              v-model="movimentoInventario['quantita']"
              label="Quantita"
            >
            </input-number>
        </div>
        <div class="col">
           <input-date
              v-model="movimentoInventario['dataScadenza']"
              label="Data scadenza"
            >
            </input-date>
        </div>
        <div class="col">
          <template >
              <input-autocomplete
                v-model="movimentoInventario['fornitore']"
                :config="configTypes['fornitore']"
                label="Fornitore "
              >
              </input-autocomplete>
            </template>
        </div>
        <div class="col">
           <input-text
              v-model="movimentoInventario['note']"
              label="Note"
              fieldName="note"
            >
            </input-text>
        </div>
        <div class="col-1">
          <i @click="saveEntity(indexEntity)" class="fa fa-check-circle"></i>
        </div>
      </div>
      </div>
    <div class="container">
      <div class="accordion" id="accordionExample">
        <div v-for="(entity, index) of entities" :key="index">
        <div class="card">
          <div class="card-header" id="headingTwo">
            <div class="d-flex justify-content-between align-items-center">
              <h2 class="mb-0">
                <button
                  class="btn btn-link btn-block text-left collapsed"
                  type="button"
                  data-toggle="collapse"
                  :data-target="'#collapse'+index"
                  aria-expanded="false"
                  :aria-controls="'collapse'+index"
                >
                 {{entity.dataRegistrazione | formatDate('DD/MM/YYYY')}} / {{entity.note}}
                </button>
              </h2>
              <span class="badge badge-primary badge-pill">{{entity.quantita}}</span>
            </div>
          </div>
          <div :id="'collapse'+index" class="collapse" aria-labelledby="headingTwo"
          data-parent="#accordionExample">
            <div class="card-body">
              <ul>
                <li v-for="(shop, indexShop) of shops" :key="indexShop">
                  {{shop.codice}}
                </li>
              </ul>
            </div>
          </div>
        </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import TitlePage from '@/pages/shared/components/TitlePage';
import HttpCall from '@/services/HttpCall';
import { API_INVENTARIO_MOVIMENTO, API_SHOP } from '@/services/constant-services';
import InputAutocomplete from '@/ui-components/input-components/InputAutocomplete';
import InputText from '@/ui-components/input-components/InputText';
import InputNumber from '@/ui-components/input-components/InputNumber';
import InputTextArea from '@/ui-components/input-components/InputTextArea';
import InputDate from '@/ui-components/input-components/InputDate';

export default {
  name: 'inventario',
  props: {
    params: {
      type: Object,
    },
    prodottoId: {
      type: String,
    },
  },
  data() {
    return {
      titolo: 'Inventario ',
      showForm: false,
      entities: [],
      shops: [],
      httpCallInventarioMov: new HttpCall(API_INVENTARIO_MOVIMENTO),
      httpCallShop: new HttpCall(API_SHOP),
      baseObjectInventarioMov: {},
      movimentoInventario: {
        quantita: '',
        dataScadenza: '',
        Fornitore: '',
        note: '',
      },
      configTypes: {
        articolo: {
          isDominio: false,
          urlApi: '/api/prodottos/all',
          fieldId: '_id',
          showCodice: true,
        },
        fornitore: {
          isDominio: false,
          urlApi: '/api/anagrafica-fornitore-clientes',
          fieldId: '_id',
          showCodice: true,
        },
      },
    };
  },
  created() {
    this.loadShops();
  },
  components: {
    'title-page': TitlePage,
    'input-autocomplete': InputAutocomplete,
    'input-text': InputText,
    'input-number': InputNumber,
    'input-date': InputDate,
    'input-textarea': InputTextArea,
  },
  methods: {
    onNew() {
      this.movimentoInventario.articolo = this.prodottoId;
      this.showForm = true;
    },
    loadEntities() {
      let params = '';
      if (this.prodottoId !== '') params += `?articolo.equals=${this.prodottoId}`;
      this.httpCallInventarioMov.get(params).then((data) => {
        this.entities = data.entities;
        this.pages = data.pages;
        this.numOfResults = data.numOfResults;
      });
    },
    loadShops() {
      this.httpCallShop.get().then((data) => {
        this.shops = data.entities;
      });
    },
    saveEntity() {
      // if (this.modePage === 'U') {
      //   this.httpCallInventarioMov.update(this.currentId, this.movimentoInventario).then(() => {
      //     this.$emit('onSaveEntity');
      //   });
      // } else {
      this.movimentoInventario.articolo = this.prodottoId;
      this.httpCallInventarioMov.create(this.movimentoInventario, '/save-carico').then(() => {
        this.movimentoInventario = this.createEntityForm();
        this.loadEntities();
      });
      // }
    },
    createEntityForm() {
      const obj = {};
      Object.keys(obj).forEach((key) => {
        obj[key] = '';
      });
      return obj;
    },
  },
  watch: {
    prodottoId() {
      this.showForm = false;
      if (this.prodottoId !== '') {
        this.loadEntities();
      }
    },
  },
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1 {
  font-weight: normal;
}
</style>
