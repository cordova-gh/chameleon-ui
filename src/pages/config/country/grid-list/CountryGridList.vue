<template>
  <div>
    <div class="container box-container my-2 py-3">
      <form @submit.prevent="saveEntity">
        <div class="card-body">
          <div class="title-form">
            <p>Filtri Ricerca</p>
          </div>
          <div class="row">
            <div
              class="col-12 col-md-6 form-group"
              v-if="!invisibleFields['codIsoStato']"
            >
              <input-text
                v-model="entity['codIsoStato']"
                label="Codice"
                :readonlyAttr="readonlyFields['codIsoStato']"
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
                @click="onReset"
                value="Pulisci"
                :disabled="disableBtnResetFilters"
              />
            </div>
            <div class="col-6 col-md-3">
              <input
                type="button"
                class="btn btn-primary btn-block"
                @click="onFind"
                value="Cerca"
              />
            </div>
          </div>
        </div>
      </form>
    </div>

    <div class="container box-container my-2 py-5">
      <div class="table-responsive table-hover">
        <table class="table align-items-center">
          <thead class="thead-light">
            <th style="width: 5%"></th>
            <th class="sort">Codice</th>
            <th class="sort">Descrizione</th>
            <th class="sort">Cittadinanza</th>
            <th class="sort">Inizio Validità</th>
            <th class="sort">Fine Validità</th>
            <th style="width: 5%"></th>
          </thead>
          <tbody>
            <tr v-for="(entity, indexEntity) of entities" :key="indexEntity">
              <template v-if="entity._id !== undefined">
                <input type="hidden" id="id" :value="entity._id" />
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
                  <input
                    type="text"
                    v-model="entity[keyColumn]"
                    readonly="true"
                    class="disableInput"
                    @dblclick="editableCell($event, 1, indexEntity)"
                    @focusout="editableCell($event, 0, indexEntity)"
                  />
                </td>
              </template>
              <template v-else>
                <td></td>
                <td
                  v-for="(keyColumn, indexColumn) in Object.keys(propsColumns)"
                  :key="indexColumn"
                >
                  <input type="text" v-model="entity[keyColumn]" />
                </td>
                <td>
                  <i
                    @click="saveEntity(indexEntity)"
                    class="fa fa-check-circle"
                  ></i>
                </td>
              </template>
            </tr>
          </tbody>
        </table>
        <ui-pagination
          :pages="pages"
          v-bind:maxPages="5"
          @clickPage="clickPagePagination"
        ></ui-pagination>
      </div>
    </div>
  </div>
</template>
<script>
import UIPagination from '@/ui-components/shared/UIPagination';
import { API_COUNTRY } from '@/services/constant-services';
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

export default {
  data() {
    return {
      entities: [],
      pages: 0,
      httpCall: new HttpCall(API_COUNTRY),
      propsColumns: {
        codIsoStato: { bind: 'codIsoStato', type: 'text' },
        descrizione: { bind: 'descrizione', type: 'text' },
        cittadinanza: { bind: 'cittadinanza', type: 'text' },
        dtaInizioValidita: { bind: 'dtaInizioValidita', type: 'text' },
        dtaFineValidita: { bind: 'dtaFineValidita', type: 'text' },
      },
      invisibleFields: {},
      readonlyFields: {},
      disableBtnResetFilters: true,
      entity: { codIsoStato: '', descrizione: '' },
      propsFilterEntity: {
        codIsoStato: { bind: 'codIsoStato', type: 'contains' },
        descrizione: { bind: 'descrizione', type: 'contains' },
      },
    };
  },
  components: {
    'ui-pagination': UIPagination,
    'input-checkbox': InputCheckBox,
    'input-autocomplete': InputAutocomplete,
    'input-select': InputSelect,
    'input-text': InputText,
    'input-password': InputPassword,
    'input-number': InputNumber,
    'input-date': InputDate,
    'input-money': InputMoney,
    'input-textarea': InputTextArea,
  },
  created() {
    this.getEntities(1);
  },
  methods: {
    clickPagePagination(page) {
      this.getEntities(page);
    },
    getEntities(page) {
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
      const params = `?page=${page}${filterString}`;
      this.httpCall.get(params).then((data) => {
        this.entities = Utility.createArrayByConfigV2(
          data.entities,
          this.propsColumns,
        );
        this.pages = data.pages;
      });
    },
    filter(filterObj) {
      const filterArray = Object.keys(filterObj)
        .filter(keyFilter => filterObj[keyFilter])
        .map(keyFilter => `${keyFilter}.contains=${filterObj[keyFilter]}`);
      const params = filterArray.join('&');
      this.getEntities(1, params);
    },
    createEntity() {
      const obj = {};
      this.config.cols.forEach((config) => {
        obj[config.field] = '';
      });
      return obj;
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
    editableCell(event, edit, entityIndex) {
      if (edit) {
        event.target.removeAttribute('readonly');
        event.target.removeAttribute('class');
      } else if (event.target.getAttribute('readonly') !== 'readonly') {
        event.target.setAttribute('readonly', 'readonly');
        event.target.setAttribute('class', 'disableInput');
        this.saveEntity(entityIndex);
      }
    },
    saveEntity(entityIndex) {
      const entity = this.entities[entityIndex];
      // eslint-disable-next-line no-underscore-dangle
      const id = entity._id;
      if (id !== undefined) {
        this.httpCall
          .update(id, entity)
          .then(() => this.getEntities(this.currentPage));
      } else {
        this.httpCall
          .create(entity)
          .then(() => this.getEntities(this.currentPage));
      }
    },
    showDetails(entityIndex) {
      if (this.flagShowDetails) this.reloadFormPaginationComponent = true;
      else this.flagShowDetails = true;

      this.configDetails.urlApiWithId = `${this.configDetails.urlApi}/${entityIndex}`;
    },
    onFinishReloadFormPagination() {
      this.reloadFormPaginationComponent = false;
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
  },
};
</script>
<style>
.disableInput {
  border: none;
  outline: none;
  background: transparent;
  border: 0px;
}
.fa {
  cursor: pointer;
}
.fa-check-circle:hover {
  color: green;
}

.fa-minus-circle:hover {
  color: red;
}
.fa-list-ul:hover {
  color: blue;
}

tr:hover {
  background: #f6f9fc;
}
</style>
