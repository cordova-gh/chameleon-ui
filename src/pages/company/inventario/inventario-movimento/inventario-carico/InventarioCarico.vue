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
          <template>
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
        <div
          v-for="(inventarioMovimento, index) of inventarioMovimentos"
          :key="index"
        >
          <div class="card">
            <div class="card-header" id="headingTwo">
              <div class="d-flex justify-content-between align-items-center">
                <h2 class="mb-0">
                  <button
                    class="btn btn-link btn-block text-left collapsed"
                    type="button"
                    data-toggle="collapse"
                    :data-target="'#collapse' + index"
                    aria-expanded="false"
                    :aria-controls="'collapse' + index"
                  >
                    {{
                      inventarioMovimento.dataRegistrazione
                        | formatDate("DD/MM/YYYY")
                    }}
                    / {{ inventarioMovimento.note }}
                  </button>
                </h2>
                <span class="badge badge-primary badge-pill">
                  Disponibile {{ quantitas[inventarioMovimento._id].valore }} /
                  {{ inventarioMovimento.quantita }}</span
                >
              </div>
            </div>
            <div
              :id="'collapse' + index"
              class="collapse"
              aria-labelledby="headingTwo"
              data-parent="#accordionExample"
            >
              <div class="card-body">
                <div
                  class="row"
                  v-for="(inventarioShopMovimento,
                  idx) of inventarioMovimento.inventarioShopMovimentos"
                  :key="idx"
                >
                  <div class="col">
                    {{ inventarioShopMovimento.shop.codice }}
                  </div>
                  <div class="col">
                    <input-number
                      label="Quantita"
                      v-model="inventarioShopMovimento.quantita"
                      @blur="
                        calcolaDisponibilita(
                          inventarioMovimento._id,
                          inventarioMovimento
                        )
                      "
                    >
                    </input-number>
                  </div>
                </div>
                <div class="col">
                  <input
                    type="button"
                    value="invia"
                    @click="salvaMovimentiShops(inventarioMovimento)"
                  />
                </div>
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
import {
  API_INVENTARIO_MOVIMENTO,
  API_INVENTARIO_SHOP_MOVIMENTO,
  API_SHOP,
} from '@/services/constant-services';
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
      inventarioMovimentos: [],
      shops: [],
      httpCallInventarioMov: new HttpCall(API_INVENTARIO_MOVIMENTO),
      httpCallShop: new HttpCall(API_SHOP),
      httpCallInventarioShopMov: new HttpCall(API_INVENTARIO_SHOP_MOVIMENTO),
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
      quantitas: [],
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
    calcolaDisponibilita(id, inventarioMovimento) {
      const sum = inventarioMovimento.inventarioShopMovimentos
        .map(corrente => corrente.quantita)
        .reduce((somma, current) => Number(somma) + Number(current), 0);
      this.quantitas[id].valore = inventarioMovimento.quantita - sum;
      this.$forceUpdate();
    },
    loadEntities() {
      let params = '';
      if (this.prodottoId !== '') {
        params += `?articolo.equals=${this.prodottoId}`;
      }
      this.inventarioMovimentos = [];
      this.httpCallInventarioMov.get(params).then((data) => {
        const retInventarioMovimentos = data.entities;
        retInventarioMovimentos.forEach((inventarioMovimento) => {
          const inventarioShopMovimentosToSend = [];
          // eslint-disable-next-line no-underscore-dangle
          const idInventarioMovimento = inventarioMovimento._id;

          this.httpCallInventarioShopMov
            .getCustom(`/inventario-movimento/${idInventarioMovimento}`)
            .then((inventarioShopMovimentos) => {
              this.shops.forEach((shopEntity) => {
                const inventarioShopMovimentoFound = inventarioShopMovimentos.filter(
                  inventarioShopMovimento =>
                    // eslint-disable-next-line no-underscore-dangle
                    inventarioShopMovimento.shop._id === shopEntity._id,
                );
                if (inventarioShopMovimentoFound.length > 0) {
                  inventarioShopMovimentosToSend.push(inventarioShopMovimentoFound[0]);
                } else {
                  const inventioShopMovimentoTemp = { quantita: 0, shop: shopEntity };
                  inventarioShopMovimentosToSend.push(inventioShopMovimentoTemp);
                }
              });
              // eslint-disable-next-line no-param-reassign
              inventarioMovimento.inventarioShopMovimentos = inventarioShopMovimentosToSend;
              this.inventarioMovimentos.push(inventarioMovimento);
              this.quantitas[idInventarioMovimento] = {
                valore: inventarioMovimento.quantita,
              };
              this.calcolaDisponibilita(idInventarioMovimento, inventarioMovimento);
            });
        });
        // this.inventarioMovimentos = retInventarioMovimentos;
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
      this.httpCallInventarioMov
        .create(this.movimentoInventario, '/save-carico')
        .then(() => {
          this.movimentoInventario = this.createEntityForm();
          this.loadEntities();
        });
      // }
    },
    salvaMovimentiShops(inventarioMovimento) {
      const body = {
        // eslint-disable-next-line no-underscore-dangle
        movimentoInventario: inventarioMovimento._id,
        articolo: inventarioMovimento.articolo,
        inventarioShopMovimentos: inventarioMovimento.inventarioShopMovimentos,
      };

      this.httpCallInventarioMov.create(body, '/split-in-shops').then(() => {});
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
