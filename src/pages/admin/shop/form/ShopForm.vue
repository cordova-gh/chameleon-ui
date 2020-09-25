<template>
  <div class="container box-container my-2 py-3">
    <form @submit.prevent="saveEntity">
      <div class="card-body">
        <div class="title-form">
          <p>Dati Personali</p>
        </div>
        <div class="row">
          <div class="col-12 col-md-4 form-group" v-if="!invisibleFields['codice']">
            <input-text
              v-model="entity['codice']"
              label="Codice"
              :readonlyAttr="readonlyFields['codice']"
            ></input-text>
          </div>
        </div>
        <div class="row">
          <div class="col-12 col-md-4 form-group" v-if="!invisibleFields['descrizione']">
            <input-text
              v-model="entity['descrizione']"
              label="Descrizione"
              :readonlyAttr="readonlyFields['descrizione']"
            ></input-text>
          </div>
        </div>
        <div class="title-form">
          <p>Indirizzo</p>
        </div>
        <div class="row">
          <div class="col-12 col-md-4 form-group" v-if="!invisibleFields['stato']">
            <input-text
              v-model="entity['stato']"
              label="Stato"
              :readonlyAttr="readonlyFields['stato']"
            ></input-text>
          </div>
          <div class="col-12 col-md-4 form-group" v-if="!invisibleFields['provincia']">
            <input-text
              v-model="entity['provincia']"
              label="Provincia"
              :readonlyAttr="readonlyFields['provincia']"
            ></input-text>
          </div>
          <div class="col-12 col-md-4 form-group" v-if="!invisibleFields['comune']">
            <input-text
              v-model="entity['comune']"
              label="Comune"
              :readonlyAttr="readonlyFields['comune']"
            ></input-text>
          </div>
        </div>
        <div class="row">
          <div class="col-12 col-md-4 form-group" v-if="!invisibleFields['via']">
            <input-text v-model="entity['via']" label="Via"
            :readonlyAttr="readonlyFields['via']"></input-text>
          </div>
          <div class="col-12 col-md-4 form-group" v-if="!invisibleFields['numero']">
            <input-text
              v-model="entity['numero']"
              label="Numero"
              :readonlyAttr="readonlyFields['numero']"
            ></input-text>
          </div>
          <div class="col-12 col-md-4 form-group" v-if="!invisibleFields['cap']">
            <input-text v-model="entity['cap']" label="Cap"
            :readonlyAttr="readonlyFields['cap']"></input-text>
          </div>
        </div>
        <div class="title-form">
          <p>Recapiti</p>
        </div>
        <div class="row">
          <div class="col-12 col-md-4 form-group" v-if="!invisibleFields['telefono']">
            <input-text
              v-model="entity['telefono']"
              label="Telefono"
              :readonlyAttr="readonlyFields['telefono']"
            ></input-text>
          </div>
        </div>
        <div class="row">
          <div class="col-12 col-md-4 form-group" v-if="!invisibleFields['cellulare']">
            <input-text
              v-model="entity['cellulare']"
              label="Cellulare"
              :readonlyAttr="readonlyFields['cellulare']"
            ></input-text>
          </div>
          <div class="col-12 col-md-4 form-group" v-if="!invisibleFields['cellulare']">
            <input-text
              v-model="entity['cellulare']"
              label="Cellulare 2"
              :readonlyAttr="readonlyFields['cellulare']"
            ></input-text>
          </div>
        </div>
        <div class="row">
          <div class="col-12 col-md-4 form-group" v-if="!invisibleFields['email']">
            <input-text
              v-model="entity['email']"
              label="Email"
              :readonlyAttr="readonlyFields['email']"
            ></input-text>
          </div>
        </div>
        <div class="title-form">
          <p>Altro</p>
        </div>
        <div class="row">
          <div class="col-12 col-md-4 form-group" v-if="!invisibleFields['orario']">
            <input-text
              v-model="entity['orario']"
              label="Orario"
              :readonlyAttr="readonlyFields['orario']"
            ></input-text>
          </div>
          <div class="col-12 col-md-4 form-group" v-if="!invisibleFields['azienda']">
            <template v-if="loadEntity">
              <input-autocomplete
                v-model="entity['azienda']"
                :config="configTypes['azienda']"
                :readonlyAttr="readonlyFields['azienda']"
              ></input-autocomplete>
            </template>
          </div>
        </div>
        <div class="row">
          <div class="col-12 col-md-4 form-group" v-if="!invisibleFields['note']">
            <input-textarea v-model="entity['note']"
            label="Note"
            :readonlyAttr="readonlyFields['note']"></input-textarea>
          </div>
        </div>
      </div>
      <div>
        <div class="row justify-content-end">
          <template v-if="modePage === 'I'">
            <div class="col-6 col-md-3">
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
import { API_SHOP, API_DOMINIO } from '@/services/constant-services';

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
    'input-checkbox': InputCheckbox,
  },
  data() {
    return {
      entity: {
        codice: '',
        descrizione: '',
        stato: '',
        provincia: '',
        comune: '',
        via: '',
        numero: '',
        cap: '',
        telefono: '',
        cellulare: '',
        cellulare2: '',
        email: '',
        orario: '',
        azienda: '',
        note: '',
      },
      propsFields: {
        codice: { bind: 'codice', readonlyUpdate: true },
        descrizione: { bind: 'descrizione' },
        stato: { bind: 'indirizzo.stato' },
        provincia: { bind: 'indirizzo.provincia' },
        comune: { bind: 'indirizzo.comune' },
        via: { bind: 'indirizzo.via' },
        numero: { bind: 'indirizzo.numero' },
        cap: { bind: 'indirizzo.cap' },
        telefono: { bind: 'telefono' },
        cellulare: { bind: 'cellulare' },
        cellulare2: { bind: 'cellulare2' },
        email: { bind: 'email' },
        orario: { bind: 'orario' },
        azienda: { bind: 'azienda' },
        note: { bind: 'note' },
      },
      modePage: '',
      httpCall: new HttpCall(API_SHOP),
      loadEntity: false,
      configTypes: {
        azienda: {
          isDominio: false,
          urlApi: '/api/companies/all',
          fieldId: '_id',
          showCodice: true,
        },
      },
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
              Vue.set(objTemp, annidateField, this.entity[key]);
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
    setModeFields() {
      const keysPropsFields = Object.keys(this.propsFields);
      const fieldsInvisible = keysPropsFields.filter(
        key => this.propsFields[key].invisibleUpdate,
      );
      fieldsInvisible.forEach((fieldInvisible) => {
        this.invisibleFields[fieldInvisible] = true;
      });
      const fieldsReadOnly = keysPropsFields.filter(
        key => this.propsFields[key].readonlyUpdate,
      );
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
