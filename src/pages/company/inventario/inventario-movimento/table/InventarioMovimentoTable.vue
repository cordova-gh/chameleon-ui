
<template>
  <div>
    <div class="container shadow p-2 mb-3 bg-white rounded">
      <form @submit.prevent="saveEntity">
        <div class="card-body">
          <div class="title-form">
            <p>Filtri Ricerca</p>
          </div>
          <div class="row">
            <div class="col-12 col-md-6 form-group" v-if="!invisibleFields['articolo']">
              <template>
                <input-autocomplete
                  v-model="entity['articolo']"
                  :config="configTypes['articolo']"
                  :readonlyAttr="readonlyFields['articolo']"
                  label="Articolo"
                  :fieldName="articolo"
                ></input-autocomplete>
              </template>
            </div>
            <div class="col-12 col-md-6 form-group" v-if="!invisibleFields['dataRegistrazione']">
              <input-date
                v-model="entity['dataRegistrazione']"
                :readonlyAttr="readonlyFields['dataRegistrazione']"
                label="Data registrazione"
                :fieldName="dataRegistrazione"
              ></input-date>
            </div>
            <div class="col-12 col-md-6 form-group" v-if="!invisibleFields['segno']">
              <input-select
                v-model="entity['segno']"
                :items="this.domini['SEGNO_MOVIMENTO_INVENTARIO']"
                :readonlyAttr="readonlyFields['segno']"
                label="Segno"
                :fieldName="segno"
              ></input-select>
            </div>
            <div class="col-12 col-md-6 form-group" v-if="!invisibleFields['causale']">
              <input-select
                v-model="entity['causale']"
                :items="this.domini['CAUSALE_MOVIMENTO_INVENTARIO']"
                :readonlyAttr="readonlyFields['causale']"
                label="Causale"
                :fieldName="causale"
              ></input-select>
            </div>
            <div class="col-12 col-md-6 form-group" v-if="!invisibleFields['dataScadenza']">
              <input-date
                v-model="entity['dataScadenza']"
                :readonlyAttr="readonlyFields['dataScadenza']"
                label="Data scadenza"
                :fieldName="dataScadenza"
              ></input-date>
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
              <input type="button" class="btn btn-primary btn-block"
              value="Cerca" @click="onFind" />
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
              <th class="sort">Articolo</th>
              <th class="sort">Data registrazione</th>
              <th class="sort">Segno</th>
              <th class="sort">Causale</th>
              <th class="sort">Quantità</th>
              <th class="sort">Data scadenza</th>
              <th style="width: 5%"></th>
            </thead>
            <tbody>
              <tr v-for="entity of entities" :key="entity.id">
                <td>
                  <i @click="deleteEntity(entity._id)" class="fa fa-minus-circle"></i>
                </td>
                <td
                  v-for="(keyColumn, indexColumn) in Object.keys(propsColumns)"
                  :key="indexColumn"
                >
                  <template v-if="propsColumns[keyColumn].type === 'checkbox'">
                    <input-checkbox v-model="entity[keyColumn]"
                    v-bind:isReadonly="true"></input-checkbox>
                  </template>
                  <template
                    v-if="propsColumns[keyColumn].type.includes('date')"
                  >{{ entity[keyColumn] | formatDate('DD/MM/YYYY') }}</template>
                  <template v-else>{{ entity[keyColumn] }}</template>
                </td>
                <td>
                  <router-link :to="'edit/' + entity._id">
                    <i class="fas fa-edit"></i>
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
          ></ui-pagination>
          <modal v-show="isModalVisible" @close="closeModal">
            <template v-slot:body></template>
          </modal>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import UIPagination from '@/ui-components/shared/UIPagination';
import { API_INVENTARIO_MOVIMENTO } from '@/services/constant-services';
import HttpCall from '@/services/HttpCall';
import { Utility } from '@/utilities/utility';
import InputCheckBox from '@/ui-components/input-components/InputCheckBox';
import InputAutocomplete from '@/ui-components/input-components/InputAutocomplete';
import InputSelect from '@/ui-components/input-components/InputSelect';
import InputText from '@/ui-components/input-components/InputText';
import InputPassword from '@/ui-components/input-components/InputPassword';
import InputNumber from '@/ui-components/input-components/InputNumber';
import InputDate from '@/ui-components/input-components/InputDate';
import InputMoney from '@/ui-components/input-components/InputMoney';
import InputTextArea from '@/ui-components/input-components/InputTextArea';
import Modal from '@/pages/shared/components/Modal';

export default {
  data() {
    return {
      entities: [],
      pages: 0,
      numOfResults: 0,
      httpCall: new HttpCall(API_INVENTARIO_MOVIMENTO),
      propsColumns: {
        articolo: { bind: 'articolo.codice', type: 'autocomplete' },
        dataRegistrazione: { bind: 'dataRegistrazione', type: 'date-range' },
        segno: { bind: 'segno.descrizione', type: 'select' },
        causale: { bind: 'causale.descrizione', type: 'select' },
        quantita: { bind: 'quantita', type: 'text' },
        dataScadenza: { bind: 'dataScadenza', type: 'date-range' },
      },
      invisibleFields: {},
      readonlyFields: {},
      disableBtnResetFilters: true,
      entity: {
        articolo: '',
        dataRegistrazione: '',
        segno: '',
        causale: '',
        dataScadenza: '',
      },
      propsFilterEntity: {
        articolo: { bind: 'articolo', type: 'equals' },
        dataRegistrazione: { bind: 'dataRegistrazione', type: 'range' },
        segno: { bind: 'segno', type: 'equals' },
        causale: { bind: 'causale', type: 'equals' },
        dataScadenza: { bind: 'dataScadenza', type: 'range' },
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
    'input-money': InputMoney,
    'input-textarea': InputTextArea,
    modal: Modal,
  },
  created() {
    this.getEntities(1);
  },
  methods: {
    clickPagePagination(page, rowsPerPage) {
      this.getEntities(page, rowsPerPage);
    },
    getEntities(page, rowsPerPage) {
      let filterString = '';
      if (this.entity) {
        let filterArray = [];
        filterArray = Object.keys(this.entity)
          .filter(keyFilter => this.entity[keyFilter])
          .map(
            keyFilter =>
              `${keyFilter}.${this.propsFilterEntity[keyFilter].type}=${this.entity[keyFilter]}`,
          );
        filterString =
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
</script>   <style>
.fa {
  cursor: pointer;
}
.fas {
  cursor: pointer;
}
</style>
