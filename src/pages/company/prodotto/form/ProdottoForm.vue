<template>
<div class="container box-container my-2 py-3">
      <form @submit.prevent="saveEntity">
        <div class="card-body"><div class="title-form">
                    <p>Caratteristiche</p>
                 </div>
            <div class="row">
              <div class="col-12 col-md-6 form-group"
          v-if="!invisibleFields['codice']">
                <input-text v-model="entity['codice']"
              label="Codice"
              :readonlyAttr="readonlyFields['codice']">
              </input-text>
              </div>
            </div>
            <div class="row">
              <div class="col-12 col-md-6 form-group"
          v-if="!invisibleFields['descrizione']">
                <input-text v-model="entity['descrizione']"
              label="Descrizione"
              :readonlyAttr="readonlyFields['descrizione']">
              </input-text>
              </div>
              <div class="col-12 col-md-6 form-group"
          v-if="!invisibleFields['descrizioneBrev']">
                <input-text v-model="entity['descrizioneBrev']"
              label="Descrizione Breve"
              :readonlyAttr="readonlyFields['descrizioneBrev']">
              </input-text>
              </div>
            </div>
            <div class="row">
              <div class="col-12 col-md-6 form-group"
          v-if="!invisibleFields['imgProdotto']">
                <input-text v-model="entity['imgProdotto']"
              label="Immagine"
              :readonlyAttr="readonlyFields['imgProdotto']">
              </input-text>
              </div>
              <div class="col-12 col-md-6 form-group"
          v-if="!invisibleFields['codiceBarre']">
                <input-text v-model="entity['codiceBarre']"
              label="Codice a barre"
              :readonlyAttr="readonlyFields['codiceBarre']">
              </input-text>
              </div>
            </div>
<div class="title-form">
                    <p>Caratteristiche Prodotto</p>
                 </div>
            <div class="row">
              <div class="col-12 col-md-6 form-group"
          v-if="!invisibleFields['tipologiaProdotto']">
                <input-text v-model="entity['tipologiaProdotto']"
              label="Tipologia Prodotto"
              :readonlyAttr="readonlyFields['tipologiaProdotto']">
              </input-text>
              </div>
            </div>
            <div class="row">
              <div class="col-12 col-md-6 form-group"
          v-if="!invisibleFields['categoriaProdotto']">
                <input-text v-model="entity['categoriaProdotto']"
              label="Categoria"
              :readonlyAttr="readonlyFields['categoriaProdotto']">
              </input-text>
              </div>
              <div class="col-12 col-md-6 form-group"
          v-if="!invisibleFields['sottoCategoriaProdotto']">
                <input-text v-model="entity['sottoCategoriaProdotto']"
              label="Sotto Categoria Prodotto"
              :readonlyAttr="readonlyFields['sottoCategoriaProdotto']">
              </input-text>
              </div>
            </div>
            <div class="row">
              <div class="col-12 col-md-6 form-group"
          v-if="!invisibleFields['provenienzaProdotto']">
                  <template v-if="loadEntity">
                    <input-autocomplete v-model="entity['provenienzaProdotto']"
                       :config="configTypes['provenienzaProdotto']"
                       :readonlyAttr="readonlyFields['provenienzaProdotto']">
                     </input-autocomplete>
                  </template>
              </div>
              <div class="col-12 col-md-6 form-group"
          v-if="!invisibleFields['marcaProdotto']">
                  <template v-if="loadEntity">
                    <input-autocomplete v-model="entity['marcaProdotto']"
                       :config="configTypes['marcaProdotto']"
                       :readonlyAttr="readonlyFields['marcaProdotto']">
                     </input-autocomplete>
                  </template>
              </div>
            </div>
            <div class="row">
              <div class="col-12 col-md-6 form-group"
          v-if="!invisibleFields['unitaMisura']">
                  <template v-if="loadEntity">
                    <input-autocomplete v-model="entity['unitaMisura']"
                       :config="configTypes['unitaMisura']"
                       :readonlyAttr="readonlyFields['unitaMisura']">
                     </input-autocomplete>
                  </template>
              </div>
            </div>
           </div><div>
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
import HttpCall from '@/services/HttpCall';
import { Utility } from '@/utilities/utility';
import { API_PRODOTTO, API_DOMINIO } from '@/services/constant-services';

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
  },
  data() {
    return {
      entity: { codice: '',
        descrizione: '',
        descrizioneBrev: '',
        imgProdotto: '',
        codiceBarre: '',
        tipologiaProdotto: '',
        categoriaProdotto: '',
        sottoCategoriaProdotto: '',
        provenienzaProdotto: '',
        marcaProdotto: '',
        unitaMisura: '',
      },
      propsFields: { codice: { bind: 'codice', readonlyUpdate: true },
        descrizione: { bind: 'descrizione' },
        descrizioneBrev: { bind: 'descrizioneBrev' },
        imgProdotto: { bind: 'prodotto.img' },
        codiceBarre: { bind: 'prodotto.codiceBarre' },
        tipologiaProdotto: { bind: 'prodotto.tipologia' },
        categoriaProdotto: { bind: 'prodotto.categoria' },
        sottoCategoriaProdotto: { bind: 'prodotto.sottoCategoria' },
        provenienzaProdotto: { bind: 'prodotto.provenienza' },
        marcaProdotto: { bind: 'prodotto.marca' },
        unitaMisura: { bind: 'prodotto.unitaMisura' },
      },
      modePage: '',
      httpCall: new HttpCall(API_PRODOTTO),
      loadEntity: false,
      configTypes:
              { provenienzaProdotto: { isDominio: false, urlApi: '/api/countries/all', fieldId: '_id', fieldCodice: 'codIsoStato', showDescrizione: true }, marcaProdotto: { isDominio: false, urlApi: '/api/marcas/all', fieldId: '_id', showCodice: true }, unitaMisura: { isDominio: false, urlApi: '/api/unita-misuras/all', fieldId: '_id', showCodice: true } },
      currentId: null,
      dominiToLoad: {},
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
        this.loadEntity = true;
        this.modePage = 'I';
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
</script><style>
          .title-form {
          border-left-width: 10px solid;
          border-left-color: #000;
          }
          </style>
