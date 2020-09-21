<template>
  <div class="container shadow p-2 mb-3 bg-white rounded">
    entità{{this.entity}}
    <form @submit.prevent="saveEntity">
      <div class="card-body">
        <div class="title-form">
          <p>Prodotto</p>
        </div>
        <div class="row">
          <div class="col-12 col-md-6 form-group" v-if="!invisibleFields['articolo']">
            <template v-if="loadEntity">
              <input-autocomplete v-model="entity['articolo']"
              :config="configTypes['articolo']"
                :readonlyAttr="readonlyFields['articolo']" label="Prodotto">
              </input-autocomplete>
            </template>
          </div>
        </div>
        <div class="row">
          <div class="col-12 col-md-6 form-group" v-if="!invisibleFields['dataRegistrazione']">
            <input-date v-model="entity['dataRegistrazione']"
              :readonlyAttr="readonlyFields['dataRegistrazione']"
              label="Data Registrazione"> </input-date>          </div>
          <div class="col-12 col-md-6 form-group" v-if="!invisibleFields['fornitore']">
            <template v-if="loadEntity">
              <input-autocomplete v-model="entity['fornitore']" :config="configTypes['fornitore']"
                :readonlyAttr="readonlyFields['fornitore']" label="Fornitore ">
              </input-autocomplete>
            </template>
          </div>
        </div>
        <div class="row">
          <div class="col-12 col-md-6 form-group" v-if="!invisibleFields['segno']">
            <input-select v-model="entity['segno']"
            :items="this.domini['SEGNO_MOVIMENTO_INVENTARIO']"
                :readonlyAttr="readonlyFields['segno']" label="Segno ">
            </input-select>
          </div>
          <div class="col-12 col-md-6 form-group" v-if="!invisibleFields['causale']">
            <input-text v-model="entity['causale']" label="Causale"
                :readonlyAttr="readonlyFields['causale']">
            </input-text>
          </div>
        </div>
        <div class="row">
          <div class="col-12 col-md-6 form-group" v-if="!invisibleFields['quantita']">
            <input-number v-model="entity['quantita']"
              :readonlyAttr="readonlyFields['quantita']" label="Quantita"> </input-number>
              </div>
          <div class="col-12 col-md-6 form-group" v-if="!invisibleFields['dataScadenza']">
            <input-date v-model="entity['dataScadenza']"
              :readonlyAttr="readonlyFields['dataScadenza']"
              label="Data scadenza"> </input-date>
              </div>
        </div>
        <div class="row">
          <div class="col-12 col-md-6 form-group" v-if="!invisibleFields['note']">
            <input-textarea v-model="entity['note']"
              :readonlyAttr="readonlyFields['note']" label="Note"> </input-textarea>          </div>
        </div>
      </div>
       <div>
        <div class="row justify-content-end">
          <template v-if="modePage === 'I'">
            <div class="col-6 col-md-3 ">
              <button class="btn btn-primary btn-block">Salva</button>
            </div>
          </template>
          <template v-else>
            <div class="col-6 col-md-3">
              <button class="btn btn-primary btn-block">Modifica</button>
            </div>
          </template>
        </div>
      </div>
    </form>
  </div>
</template>
<script>
import Vue from 'vue';
import InputAutocomplete from '@/ui-components/input-components/InputAutocomplete';
import InputSelect from '@/ui-components/input-components/InputSelect';
import InputText from '@/ui-components/input-components/InputText';
import InputPassword from '@/ui-components/input-components/InputPassword';
import InputNumber from '@/ui-components/input-components/InputNumber';
import InputDate from '@/ui-components/input-components/InputDate';
import InputMoney from '@/ui-components/input-components/InputMoney';
import InputTextArea from '@/ui-components/input-components/InputTextArea';
import InputCheckbox from '@/ui-components/input-components/InputCheckBox';
import HttpCall from '@/services/HttpCall';
import { Utility } from '@/utilities/utility';
import { API_INVENTARIO_MOVIMENTO, API_DOMINIO } from '@/services/constant-services';

export default {
  props: {
    title: {
      type: String,
      default: '',
    },
    reload: {
      type: Boolean,
      default: false,
    },
    isForm: {
      type: Boolean,
      default: true,
    },
    isFilter: {
      type: Boolean,
      default: false,
    },
    baseObject: {
      type: Object,
    },
  },
  components: {
    'input-autocomplete': InputAutocomplete,
    'input-select': InputSelect,
    'input-text': InputText,
    'input-password': InputPassword,
    'input-number': InputNumber,
    'input-date': InputDate,
    'input-money': InputMoney,
    'input-textarea': InputTextArea,
    'input-checkbox': InputCheckbox,
  },
  data() {
    return {
      entity: { articolo: '',
        dataRegistrazione: '',
        fornitore: '',
        segno: '',
        causale: '',
        quantita: '',
        dataScadenza: '',
        note: '',
      },
      propsFields: { articolo: {
        bind: 'articolo',

      },
      dataRegistrazione: {
        bind: 'dataRegistrazione',

      },
      fornitore: {
        bind: 'fornitore',

      },
      segno: {
        bind: 'segno',

      },
      causale: {
        bind: 'causale',

      },
      quantita: {
        bind: 'quantita',

      },
      dataScadenza: {
        bind: 'dataScadenza',

      },
      note: {
        bind: 'note',

      } },
      modePage: '',
      httpCall: new HttpCall(API_INVENTARIO_MOVIMENTO),
      loadEntity: false,
      configTypes:
              { articolo: { isDominio: false, urlApi: '/api/prodottos/all', fieldId: '_id', showCodice: true }, fornitore: { isDominio: false, urlApi: '/api/anagrafica-fornitore-clientes', fieldId: '_id', showCodice: true } },
      currentId: null,
      dominiToLoad: { segno: 'SEGNO_MOVIMENTO_INVENTARIO' },
      domini: [],
      invisibleFields: {},
      readonlyFields: {},
    };
  },
  created() {
    this.onCreated();
  },
  methods: {
    onCreated() {
      this.getDominios();
      this.currentId = this.$route.params.id;
      if (this.currentId) {
        this.getEntity(this.currentId);
        this.modePage = 'U';
        this.setModeFields();
      } else {
        this.modePage = 'I';
        if (this.baseObject) {
          this.setEntity(this.baseObject);
        }
        this.loadEntity = true;
      }
    },
    saveEntity() {
      const entityToSend = this.createEntity();
      if (this.modePage === 'U') {
        this.httpCall.update(this.currentId, entityToSend).then(() => {
          this.$emit('onSaveEntity');
        });
      } else {
        this.httpCall.create(entityToSend).then(() => {
          this.entity = this.createEntityForm();
          this.$emit('onSaveEntity');
        });
      }
    },
    getEntity(id) {
      this.httpCall.getById(id).then((data) => {
        this.setEntity(data);
        this.loadEntity = true;
      });
    },
    onFind() {
      this.$emit('filter', this.entity);
    },
    onReset() {
      this.entity = this.createEntityForm();
      this.onFind();
    },
    createEntityForm() {
      const obj = {};
      Object.keys(obj).forEach((key) => {
        obj[key] = '';
      });
      return obj;
    },
    createEntity() {
      const obj = {};
      Object.keys(this.propsFields).forEach((key) => {
        const bindField = this.propsFields[key].bind;
        if (bindField.indexOf('.') > 0) {
          const annidateFields = bindField.split('.');
          let objTemp = obj;
          for (let k = 0; k < annidateFields.length; k += 1) {
            const annidateField = annidateFields[k];
            if (k + 1 < annidateFields.length) {
              if (!objTemp[annidateField]) {
                Vue.set(objTemp, annidateField, {});
              }
              objTemp = objTemp[annidateField];
            } else {
              Vue.set(
                objTemp,
                annidateField,
                this.entity[key],
              );
            }
          }
        } else {
          obj[bindField] = this.entity[key];
        }
      });
      return obj;
    },
    setEntity(data) {
      Object.keys(this.propsFields).forEach((key) => {
        const annidateField = this.propsFields[key].bind;
        if (annidateField.indexOf('.') > 0) {
          const annidateValue = Utility.getAnnidateValue(
            annidateField.split('.'),
            data,
          );
          if (annidateValue !== null) {
            this.entity[key] = annidateValue;
          }
        } else {
          this.entity[key] = data[annidateField];
        }
      });
    },
    getDominios() {
      const keysObjectDominiToLoad = Object.keys(this.dominiToLoad);
      if (keysObjectDominiToLoad.length > 0) {
        const dominiIncludes = Object.keys(this.dominiToLoad).map(key => this.dominiToLoad[key]);
        const httpCallDomini = new HttpCall(API_DOMINIO);
        httpCallDomini.getCustom('/includes', `?domini=${dominiIncludes.join(',')}`).then((res) => {
          this.domini = res;
        });
      }
    },
    setModeFields() {
      const keysPropsFields = Object.keys(this.propsFields);
      const fieldsInvisible = keysPropsFields
        .filter(key => this.propsFields[key].invisibleUpdate);
      fieldsInvisible.forEach((fieldInvisible) => {
        this.invisibleFields[fieldInvisible] = true;
      });
      const fieldsReadOnly = keysPropsFields
        .filter(key => this.propsFields[key].readonlyUpdate);
      fieldsReadOnly.forEach((fieldReadOnly) => {
        this.readonlyFields[fieldReadOnly] = true;
      });
    },
  },
};
</script>
<style>
  .title-form {
    border-left-width: 10px solid;
    border-left-color: #000;
  }
</style>
