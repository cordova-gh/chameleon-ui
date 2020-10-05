<template>
  <div>
    <div class="container shadow p-2 mb-3  mt-3 bg-white rounded">
      <form @submit.prevent="saveEntity">
        <div class="card-body">
          <div class="title-form">
            <p>Filtri Ricerca</p>
          </div>
          <div class="row">
            <div
              class="col-12 col-md-6 form-group"
              v-if="!invisibleFields['codice']"
            >
              <input-text
                v-model="entity['codice']"
                label="Codice"
                :readonlyAttr="readonlyFields['codice']"
                fieldName="codice"
              ></input-text>
            </div>
            <div
              class="col-12 col-md-6 form-group"
              v-if="!invisibleFields['descrizione']"
            >
              <input-text
                v-model="entity['descrizione']"
                label="Descrizione"
                :readonlyAttr="readonlyFields['descrizione']"
                fieldName="descrizione"
              ></input-text>
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
              <th class="sort">Codice</th>
              <th class="sort">Descrizione</th>
              <th class="sort">Categoria</th>
              <th class="sort">Provenienza</th>
              <th class="sort">Quantità</th>
              <th class="sort">Unità di misura</th>
              <th style="width: 5%"></th>
            </thead>
            <tbody>
              <tr v-for="entity of entities" :key="entity.id">
                <td>
                  <i
                    @click="deleteEntity(entity._id)"
                    class="fa fa-minus-circle"
                  ></i>
                </td>
                <td
                  v-for="(keyColumn, indexColumn) in Object.keys(propsColumns)"
                  :key="indexColumn"
                >
                  <template v-if="propsColumns[keyColumn].type === 'checkbox'">
                    <input-checkbox
                      v-model="entity[keyColumn]"
                      v-bind:isReadonly="true"
                    ></input-checkbox>
                  </template>
                  <template v-else>{{ entity[keyColumn] }}</template>
                </td>
                <td>
                  <router-link :to="'edit/' + entity._id">
                    <i class="fas fa-edit"></i>
                  </router-link>
                  <!-- CUSTOM -->
                  <a @click="clickInventario(entity._id)">
                    <i class="fas fa-pallet"></i>
                  </a>
                  <!-- CUSTOM -->
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
            <template v-slot:body>
              <!-- CUSTOM -->
              <inventario-carico
                :params="paramsInventario"
                :prodottoId="currentProdottoId"

              >
              </inventario-carico>
              <!-- CUSTOM -->
            </template>
          </modal>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import UIPagination from '@/ui-components/shared/UIPagination';
import { API_PRODOTTO } from '@/services/constant-services';
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
/* CUSTOM */
import InventarioCarico from '@/pages/company/inventario/inventario-movimento/inventario-carico/InventarioCarico';
/* CUSTOM */

export default {
  data() {
    return {
      entities: [],
      pages: 0,
      numOfResults: 0,
      httpCall: new HttpCall(API_PRODOTTO),
      propsColumns: {
        codice: { bind: 'codice', type: 'text' },
        descrizione: { bind: 'descrizione', type: 'text' },
        categoriaProdotto: { bind: 'Prodotto.categoria', type: 'text' },
        provenienzaProdotto: {
          bind: 'prodotto.provenienza.codice',
          type: 'text',
        },
        quantita: { bind: 'prodotto.quantita', type: 'text' },
        unitaMisura: { bind: 'prodotto.unitaMisura.codice', type: 'text' },
      },
      invisibleFields: {},
      readonlyFields: {},
      disableBtnResetFilters: true,
      entity: { codice: '', descrizione: '' },
      propsFilterEntity: {
        codice: { bind: 'codice', type: 'contains' },
        descrizione: { bind: 'descrizione', type: 'contains' },
      },
      isModalVisible: false,
      /* CUSTOM */
      paramsInventario: {},
      currentProdottoId: '',
      /* CUSTOM */
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
    /* CUSTOM */
    'inventario-carico': InventarioCarico,
    /* CUSTOM */
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
    showModal() {
      this.isModalVisible = true;
    },
    closeModal() {
      this.currentProdottoId = '';
      this.isModalVisible = false;
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
    /* CUSTOM */
    clickInventario(prodottoId) {
      this.currentProdottoId = prodottoId;
      this.showModal();
    },
    /* CUSTOM */
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
