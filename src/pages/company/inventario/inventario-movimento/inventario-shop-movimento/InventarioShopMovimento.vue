<template>
  <div>
    <div class="container shadow p-2 mb-3 bg-white rounded">
      <form @submit.prevent="saveEntity">
        <div class="card-body">
          <div class="title-form">
            <p>Filtri Ricerca</p>
          </div>
          <div class="row">
            <div
              class="col-12 col-md-6 form-group"
              v-if="!invisibleFields['shop']"
            >
              <template>
                <input-autocomplete
                  v-model="entity['shop']"
                  :config="configTypes['shop']"
                  :readonlyAttr="readonlyFields['shop']"
                  label="Shop"
                  fieldName="shop"
                >
                </input-autocomplete>
              </template>
            </div>
            <div
              class="col-12 col-md-6 form-group"
              v-if="!invisibleFields['dataRegistrazione']"
            >
              <input-date-range
                v-model="entity['dataRegistrazione']"
                :readonlyAttr="readonlyFields['dataRegistrazione']"
                label="Data Registrazione"
                fieldName="dataRegistrazione"
              >
              </input-date-range>
            </div>
            <div
              class="col-12 col-md-6 form-group"
              v-if="!invisibleFields['segno']"
            >
              <input-select
                v-model="entity['segno']"
                :items="this.domini['SEGNO_MOVIMENTO_INVENTARIO']"
                :readonlyAttr="readonlyFields['segno']"
                label="Segno"
                fieldName="segno"
              >
              </input-select>
            </div>
            <div
              class="col-12 col-md-6 form-group"
              v-if="!invisibleFields['causale']"
            >
              <input-select
                v-model="entity['causale']"
                :items="this.domini['CAUSALE_MOVIMENTO_INVENTARIO']"
                :readonlyAttr="readonlyFields['causale']"
                label="Causale"
                fieldName="causale"
              >
              </input-select>
            </div>
          </div>
        </div>
        <div>
          <div class="row justify-content-end">
            <div class="col-6 col-md-3">
              <input
                type="button"
                class="btn btn-secondary btn-block"
                value="Pulisci"
                @click="onReset"
                :disabled="disableBtnResetFilters"
              />
            </div>
            <div class="col-6 col-md-3">
              <input
                type="button"
                class="btn btn-primary btn-block"
                value="Cerca"
                @click="onFind"
              />
            </div>
          </div>
        </div>
      </form>
    </div>

    <div class="container shadow p-2 mb-3 bg-white rounded">
      <div class="container">
        <div class="table-responsive table-hover">
          <table class="table align-items-center">
            <thead class="thead-light">
              <th style="width: 5%"></th>
              <th class="sort">
                Shop
              </th>
              <th class="sort">
                Data Registrazione
              </th>
              <th class="sort">
                Movimento Inventario
              </th>
              <th class="sort">
                Quantita
              </th>
              <th class="sort">
                Segno
              </th>
              <th class="sort">
                Causale
              </th>
              <th style="width: 5%"></th>
            </thead>
            <tbody>
              <tr v-for="objectEntity of entities" :key="objectEntity.id">
                <td>
                  <i
                    @click="deleteEntity(objectEntity._id)"
                    class="fa fa-minus-circle"
                  ></i>
                </td>
                <td
                  v-for="(keyColumn, indexColumn) in Object.keys(propsColumns)"
                  :key="indexColumn"
                >
                  <template v-if="propsColumns[keyColumn].type === 'checkbox'">
                    <input-checkbox
                      v-model="objectEntity[keyColumn]"
                      v-bind:isReadonly="true"
                    >
                    </input-checkbox>
                  </template>
                  <template
                    v-if="propsColumns[keyColumn].type.includes('date')"
                  >
                    {{ objectEntity[keyColumn] | formatDate("DD/MM/YYYY") }}
                  </template>
                  <template v-else>
                    {{ objectEntity[keyColumn] }}
                  </template>
                </td>
                <td>
                  <router-link :to="'edit/' + objectEntity._id">
                    <i class="fas fa-edit"> </i>
                  </router-link>
                </td>
              </tr>
            </tbody>
          </table>
          <ui-pagination
            :pages="pages"
            v-bind:maxPages="5"
            :numOfResults="numOfResults"
            @clickPage="clickPagePagination"
          >
          </ui-pagination>
          <modal v-show="isModalVisible" @close="closeModal">
            <template v-slot:body> </template>
          </modal>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import UIPagination from '@/ui-components/shared/UIPagination';
import {
  API_INVENTARIO_SHOP_MOVIMENTO,
  API_DOMINIO,
} from '@/services/constant-services';
import HttpCall from '@/services/HttpCall';
import { Utility } from '@/utilities/utility';
import InputCheckBox from '@/ui-components/input-components/InputCheckBox';
import InputAutocomplete from '@/ui-components/input-components/InputAutocomplete';
import InputSelect from '@/ui-components/input-components/InputSelect';
import InputText from '@/ui-components/input-components/InputText';
import InputPassword from '@/ui-components/input-components/InputPassword';
import InputNumber from '@/ui-components/input-components/InputNumber';
import InputDate from '@/ui-components/input-components/InputDate';
import InputDateRange from '@/ui-components/input-components/InputDateRange';
import InputMoney from '@/ui-components/input-components/InputMoney';
import InputTextArea from '@/ui-components/input-components/InputTextArea';
import Modal from '@/pages/shared/components/Modal';

export default {
  data() {
    return {
      entities: [],
      pages: 0,
      numOfResults: 0,
      httpCall: new HttpCall(API_INVENTARIO_SHOP_MOVIMENTO),
      propsColumns: {
        shop: { bind: 'shop.codice', type: 'autocomplete' },
        dataRegistrazione: { bind: 'dataRegistrazione', type: 'date-range' },
        movimentoInventario: {
          bind: 'inventarioMovimentoOrig.articolo.codice',
          type: 'text',
        },
        quantita: { bind: 'quantita', type: 'number' },
        segno: { bind: 'segno.descrizione', type: 'select' },
        causale: { bind: 'causale.descrizione', type: 'select' },
      },
      invisibleFields: {},
      readonlyFields: {},
      disableBtnResetFilters: true,
      entity: { shop: '', dataRegistrazione: '', segno: '', causale: '' },
      configTypes: {
        shop: {
          isDominio: false,
          urlApi: '/api/shops/all',
          fieldId: '_id',
          showCodice: true,
        },
      },
      dominiToLoad: {
        segno: 'SEGNO_MOVIMENTO_INVENTARIO',
        causale: 'CAUSALE_MOVIMENTO_INVENTARIO',
      },
      domini: [],
      propsFilterEntity: {
        shop: { bind: 'shop', type: 'equals' },
        dataRegistrazione: { bind: 'dataRegistrazione', type: 'range' },
        segno: { bind: 'segno', type: 'equals' },
        causale: { bind: 'causale', type: 'equals' },
      },
      isModalVisible: false,
    };
  },
  components: {
    'input-checkbox': InputCheckBox,
    'ui-pagination': UIPagination,
    'input-autocomplete': InputAutocomplete,
    'input-select': InputSelect,
    'input-text': InputText,
    'input-password': InputPassword,
    'input-number': InputNumber,
    'input-date': InputDate,
    'input-date-range': InputDateRange,
    'input-money': InputMoney,
    'input-textarea': InputTextArea,
    modal: Modal,
  },
  created() {
    this.getEntities(1);
    this.getDominios();
  },
  methods: {
    clickPagePagination(page, rowsPerPage) {
      this.getEntities(page, rowsPerPage);
    },
    getEntities(page, rowsPerPage) {
      let filterString = '';
      if (this.entity) {
        let filterArray = Object.keys(this.entity)
          .filter(
            keyFilter =>
              this.entity[keyFilter] &&
              this.propsFilterEntity[keyFilter].type !== 'range',
          )
          .map(
            keyFilter =>
              `${keyFilter}.${this.propsFilterEntity[keyFilter].type}=${this.entity[keyFilter]}`,
          );

        const filterDateArray = Object.keys(this.entity)
          .filter(
            keyFilter =>
              this.entity[keyFilter] &&
              this.propsFilterEntity[keyFilter].type === 'range',
          )
          .map(
            keyFilter =>
              `${keyFilter}.greaterThanEqual=${this.entity[keyFilter][0]}&${keyFilter}.lessThanEqual=${this.entity[keyFilter][1]}`,
          );

        filterArray = filterArray.concat(filterDateArray);
        filterString +=
          filterArray.length > 0 ? `&${filterArray.join('&')}` : '';
      }
      let params = `?page=${page}${filterString}`;
      if (rowsPerPage) params += `&rowsPerPage=${rowsPerPage}`;
      this.httpCall.get(params).then((data) => {
        this.entities = Utility.createArrayByConfigV2(
          data.entities,
          this.propsColumns,
        );
        this.pages = data.pages;
        this.numOfResults = data.numOfResults;
      });
    },
    deleteEntity(id) {
      this.httpCall.delete(id).then(() => {
        this.getEntities();
        this.$emit('onDelete', 'Sto cancellando');
      });
    },
    modifyEntity(id) {
      this.$emit('onModify', id);
    },
    newEntity() {
      this.$emit('onCreate');
    },
    onFind() {
      this.disableBtnResetFilters = false;
      this.getEntities(1);
    },
    onReset() {
      Object.keys(this.entity).forEach((key) => {
        this.entity[key] = '';
      });
      this.onFind();
      this.disableBtnResetFilters = true;
    },
    getDominios() {
      const keysObjectDominiToLoad = Object.keys(this.dominiToLoad);
      if (keysObjectDominiToLoad.length > 0) {
        const dominiIncludes = Object.keys(this.dominiToLoad).map(
          key => this.dominiToLoad[key],
        );
        const httpCallDomini = new HttpCall(API_DOMINIO);
        httpCallDomini
          .getCustom('/includes', `?domini=${dominiIncludes.join(',')}`)
          .then((res) => {
            this.domini = res;
          });
      }
    },
    showModal() {
      this.isModalVisible = true;
    },
    closeModal() {
      this.currentProdottoId = '';
      this.isModalVisible = false;
    },
  },
  watch: {
    reload: {
      immediate: true,
      deep: true,
      handler() {
        this.getEntities(1);
        this.$emit('endLoadPagination');
      },
    },
  },
};
</script>
<style>
.fa {
  cursor: pointer;
}
.fas {
  cursor: pointer;
}
</style>
