<template>
  <div class="container shadow p-2 mb-3 bg-white rounded">
    <form @submit.prevent="saveEntity">
      <div class="card-body">
        <div class="title-form">
          <p>Dati Generali</p>
        </div>
        <div class="row">
          <div class="col-12 col-md-4 form-group" v-if="!invisibleFields['codice']">
            <input-text v-model="entity['codice']" label="Codice"
                :readonlyAttr="readonlyFields['codice']">
            </input-text>
          </div>
        </div>
        <div class="row">
          <div class="col-12 col-md-4 form-group" v-if="!invisibleFields['ragioneSociale']">
            <input-text v-model="entity['ragioneSociale']" label="Ragione Sociale"
                :readonlyAttr="readonlyFields['ragioneSociale']">
            </input-text>
          </div>
          <div class="col-12 col-md-4 form-group" v-if="!invisibleFields['descrAttivita']">
            <input-text v-model="entity['descrAttivita']" label="Descrizione Attivita"
                :readonlyAttr="readonlyFields['descrAttivita']">
            </input-text>
          </div>
        </div>
        <div class="row">
          <div class="col-12 col-md-4 form-group" v-if="!invisibleFields['codiceFiscale']">
            <input-text v-model="entity['codiceFiscale']" label="Codice Fiscale"
                :readonlyAttr="readonlyFields['codiceFiscale']">
            </input-text>
          </div>
          <div class="col-12 col-md-4 form-group" v-if="!invisibleFields['partitaIva']">
            <input-text v-model="entity['partitaIva']" label="Partita Iva"
                :readonlyAttr="readonlyFields['partitaIva']">
            </input-text>
          </div>
          <div class="col-12 col-md-4 form-group" v-if="!invisibleFields['partitaIvaEstera']">
            <input-text v-model="entity['partitaIvaEstera']" label="Partita Iva Estera"
                :readonlyAttr="readonlyFields['partitaIvaEstera']">
            </input-text>
          </div>
        </div>
        <div class="row">
          <div class="col-12 col-md-4 form-group" v-if="!invisibleFields['telefono']">
            <input-text v-model="entity['telefono']" label="Telefono"
                :readonlyAttr="readonlyFields['telefono']">
            </input-text>
          </div>
          <div class="col-12 col-md-4 form-group" v-if="!invisibleFields['cellulare']">
            <input-text v-model="entity['cellulare']" label="Cellulare"
                :readonlyAttr="readonlyFields['cellulare']">
            </input-text>
          </div>
        </div>
        <div class="row">
          <div class="col-12 col-md-4 form-group" v-if="!invisibleFields['naturaGiurica']">
            <input-text v-model="entity['naturaGiurica']" label="Natura Giuridica"
                :readonlyAttr="readonlyFields['naturaGiurica']">
            </input-text>
          </div>
          <div class="col-12 col-md-4 form-group" v-if="!invisibleFields['cliente']">
            <input-checkbox v-model="entity['cliente']"
              label="Cliente"
              :readonlyAttr="readonlyFields['cliente']" > </input-checkbox>          </div>
          <div class="col-12 col-md-4 form-group" v-if="!invisibleFields['fornitore']">
            <input-checkbox v-model="entity['fornitore']"
              label="Fornitore"
              :readonlyAttr="readonlyFields['fornitore']" > </input-checkbox>          </div>
        </div>
        <div class="title-form">
          <p>Sede Legale</p>
        </div>
        <div class="row">
          <div class="col-12 col-md-4 form-group" v-if="!invisibleFields['statoSedeLegale']">
            <template v-if="loadEntity">
              <input-autocomplete v-model="entity['statoSedeLegale']"
              :config="configTypes['statoSedeLegale']"
                :readonlyAttr="readonlyFields['statoSedeLegale']"
                label="Stato">
              </input-autocomplete>
            </template>
          </div>
          <div class="col-12 col-md-4 form-group" v-if="!invisibleFields['provinciaSedeLegale']">
            <input-text v-model="entity['provinciaSedeLegale']" label="Provincia"
                :readonlyAttr="readonlyFields['provinciaSedeLegale']">
            </input-text>
          </div>
          <div class="col-12 col-md-4 form-group" v-if="!invisibleFields['comuneSedeLegale']">
            <input-text v-model="entity['comuneSedeLegale']" label="Comune"
                :readonlyAttr="readonlyFields['comuneSedeLegale']">
            </input-text>
          </div>
        </div>
        <div class="row">
          <div class="col-12 col-md-4 form-group" v-if="!invisibleFields['viaSedeLegale']">
            <input-text v-model="entity['viaSedeLegale']" label="Via"
                :readonlyAttr="readonlyFields['viaSedeLegale']">
            </input-text>
          </div>
          <div class="col-12 col-md-4 form-group" v-if="!invisibleFields['numeroSedeLegale']">
            <input-text v-model="entity['numeroSedeLegale']" label="Numero"
                :readonlyAttr="readonlyFields['numeroSedeLegale']">
            </input-text>
          </div>
          <div class="col-12 col-md-4 form-group" v-if="!invisibleFields['capSedeLegale']">
            <input-text v-model="entity['capSedeLegale']" label="Cap"
                :readonlyAttr="readonlyFields['capSedeLegale']">
            </input-text>
          </div>
        </div>
        <div class="title-form">
          <p>Sede Costituzione</p>
        </div>
        <div class="row">
          <div class="col-12 col-md-4 form-group" v-if="!invisibleFields['statoSedeCostituzione']">
            <template v-if="loadEntity">
              <input-autocomplete v-model="entity['statoSedeCostituzione']"
              :config="configTypes['statoSedeCostituzione']"
                :readonlyAttr="readonlyFields['statoSedeCostituzione']"
                label="Stato">
              </input-autocomplete>
            </template>
          </div>
          <div class="col-12 col-md-4 form-group"
          v-if="!invisibleFields['provinciaSedeCostituzione']">
            <input-text v-model="entity['provinciaSedeCostituzione']" label="Provincia"
                :readonlyAttr="readonlyFields['provinciaSedeCostituzione']">
            </input-text>
          </div>
          <div class="col-12 col-md-4 form-group" v-if="!invisibleFields['comuneSedeCostituzione']">
            <input-text v-model="entity['comuneSedeCostituzione']" label="Comune"
                :readonlyAttr="readonlyFields['comuneSedeCostituzione']">
            </input-text>
          </div>
        </div>
        <div class="row">
          <div class="col-12 col-md-4 form-group" v-if="!invisibleFields['viaSedeCostituzione']">
            <input-text v-model="entity['viaSedeCostituzione']" label="Via"
                :readonlyAttr="readonlyFields['viaSedeCostituzione']">
            </input-text>
          </div>
          <div class="col-12 col-md-4 form-group" v-if="!invisibleFields['numeroSedeCostituzione']">
            <input-text v-model="entity['numeroSedeCostituzione']" label="Numero"
                :readonlyAttr="readonlyFields['numeroSedeCostituzione']">
            </input-text>
          </div>
          <div class="col-12 col-md-4 form-group" v-if="!invisibleFields['capSedeCostituzione']">
            <input-text v-model="entity['capSedeCostituzione']" label="Cap"
                :readonlyAttr="readonlyFields['capSedeCostituzione']">
            </input-text>
          </div>
        </div>
        <div class="title-form">
          <p>Altri Dati</p>
        </div>
        <div class="row">
          <div class="col-12 col-md-4 form-group" v-if="!invisibleFields['dataCostituzione']">
            <input-date v-model="entity['dataCostituzione']"
              :readonlyAttr="readonlyFields['dataCostituzione']"
              label="data Costituzione"> </input-date>          </div>
          <div class="col-12 col-md-4 form-group" v-if="!invisibleFields['capitaleSociale']">
            <input-number v-model="entity['capitaleSociale']"
              :readonlyAttr="readonlyFields['capitaleSociale']"
              label="Capitale Sociale"> </input-number>          </div>
        </div>
        <div class="row">
          <div class="col-12 col-md-4 form-group" v-if="!invisibleFields['dataIscrCciaa']">
            <input-date v-model="entity['dataIscrCciaa']"
              :readonlyAttr="readonlyFields['dataIscrCciaa']"
              label="Data Iscr.Cciaa"> </input-date>          </div>
          <div class="col-12 col-md-4 form-group" v-if="!invisibleFields['nrIscrCciaa']">
            <input-text v-model="entity['nrIscrCciaa']" label="N° Iscr.Cciaa"
                :readonlyAttr="readonlyFields['nrIscrCciaa']">
            </input-text>
          </div>
          <div class="col-12 col-md-4 form-group" v-if="!invisibleFields['provIscrCciaa']">
            <input-text v-model="entity['provIscrCciaa']" label="Prov. Iscr.Cciaa"
                :readonlyAttr="readonlyFields['provIscrCciaa']">
            </input-text>
          </div>
        </div>
        <div class="row">
          <div class="col-12 col-md-4 form-group" v-if="!invisibleFields['aziendaleId']">
            <template v-if="loadEntity">
              <input-autocomplete v-model="entity['aziendaleId']"
              :config="configTypes['aziendaleId']"
                :readonlyAttr="readonlyFields['aziendaleId']"
                label="Azienda">
              </input-autocomplete>
            </template>
          </div>
        </div>
        <div class="title-form">
          <p>Contatto Referente</p>
        </div>
        <div class="row">
          <div class="col-12 col-md-4 form-group" v-if="!invisibleFields['nomeReferente']">
            <input-text v-model="entity['nomeReferente']" label="Nome"
                :readonlyAttr="readonlyFields['nomeReferente']">
            </input-text>
          </div>
          <div class="col-12 col-md-4 form-group" v-if="!invisibleFields['telefonoReferente']">
            <input-text v-model="entity['telefonoReferente']" label="Telefono"
                :readonlyAttr="readonlyFields['telefonoReferente']">
            </input-text>
          </div>
          <div class="col-12 col-md-4 form-group" v-if="!invisibleFields['cellulareReferente']">
            <input-text v-model="entity['cellulareReferente']" label="Cellulare"
                :readonlyAttr="readonlyFields['cellulareReferente']">
            </input-text>
          </div>
          <div class="col-12 col-md-4 form-group" v-if="!invisibleFields['emailReferente']">
            <input-text v-model="entity['emailReferente']" label="Email"
                :readonlyAttr="readonlyFields['emailReferente']">
            </input-text>
          </div>
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
import { API_FORNITORE_CLIENTE, API_DOMINIO } from '@/services/constant-services';

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
      entity: { codice: '',
        ragioneSociale: '',
        descrAttivita: '',
        codiceFiscale: '',
        partitaIva: '',
        partitaIvaEstera: '',
        telefono: '',
        cellulare: '',
        naturaGiurica: '',
        cliente: '',
        fornitore: '',
        statoSedeLegale: '',
        provinciaSedeLegale: '',
        comuneSedeLegale: '',
        viaSedeLegale: '',
        numeroSedeLegale: '',
        capSedeLegale: '',
        statoSedeCostituzione: '',
        provinciaSedeCostituzione: '',
        comuneSedeCostituzione: '',
        viaSedeCostituzione: '',
        numeroSedeCostituzione: '',
        capSedeCostituzione: '',
        dataCostituzione: '',
        capitaleSociale: '',
        dataIscrCciaa: '',
        nrIscrCciaa: '',
        provIscrCciaa: '',
        aziendaleId: '',
        nomeReferente: '',
        telefonoReferente: '',
        cellulareReferente: '',
        emailReferente: '',
      },
      propsFields: { codice: {
        bind: 'codice',
        readonlyUpdate: true,
      },
      ragioneSociale: {
        bind: 'entitaGiuridica.ragioneSociale',

      },
      descrAttivita: {
        bind: 'entitaGiuridica.descrAttivita',

      },
      codiceFiscale: {
        bind: 'codiceFiscale',

      },
      partitaIva: {
        bind: 'partitaIva',

      },
      partitaIvaEstera: {
        bind: 'partitaIvaEstera',

      },
      telefono: {
        bind: 'telefono',

      },
      cellulare: {
        bind: 'cellulare',

      },
      naturaGiurica: {
        bind: 'entitaGiuridica.naturaGiur',

      },
      cliente: {
        bind: 'cliente',

      },
      fornitore: {
        bind: 'fornitore',

      },
      statoSedeLegale: {
        bind: 'entitaGiuridica.indirizzoSedeLegale.stato',

      },
      provinciaSedeLegale: {
        bind: 'entitaGiuridica.indirizzoSedeLegale.provincia',

      },
      comuneSedeLegale: {
        bind: 'entitaGiuridica.indirizzoSedeLegale.comune',

      },
      viaSedeLegale: {
        bind: 'entitaGiuridica.indirizzoSedeLegale.via',

      },
      numeroSedeLegale: {
        bind: 'entitaGiuridica.indirizzoSedeLegale.numero',

      },
      capSedeLegale: {
        bind: 'entitaGiuridica.indirizzoSedeLegale.cap',

      },
      statoSedeCostituzione: {
        bind: 'entitaGiuridica.indirizzoSedeCostituzione.stato',

      },
      provinciaSedeCostituzione: {
        bind: 'entitaGiuridica.indirizzoSedeCostituzione.provincia',

      },
      comuneSedeCostituzione: {
        bind: 'entitaGiuridica.indirizzoSedeCostituzione.comune',

      },
      viaSedeCostituzione: {
        bind: 'entitaGiuridica.indirizzoSedeCostituzione.via',

      },
      numeroSedeCostituzione: {
        bind: 'entitaGiuridica.indirizzoSedeCostituzione.numero',

      },
      capSedeCostituzione: {
        bind: 'entitaGiuridica.indirizzoSedeCostituzione.cap',

      },
      dataCostituzione: {
        bind: 'entitaGiuridica.dataCostituzione',

      },
      capitaleSociale: {
        bind: 'entitaGiuridica.capitaleSociale',

      },
      dataIscrCciaa: {
        bind: 'entitaGiuridica.dataIscrCciaa',

      },
      nrIscrCciaa: {
        bind: 'entitaGiuridica.nrIscrCciaa',

      },
      provIscrCciaa: {
        bind: 'entitaGiuridica.provIscrCciaa',

      },
      aziendaleId: {
        bind: 'aziendaleId',

      },
      nomeReferente: {
        bind: 'contattoReferente.nome',

      },
      telefonoReferente: {
        bind: 'contattoReferente.telefono',

      },
      cellulareReferente: {
        bind: 'referente.cellulare',

      },
      emailReferente: {
        bind: 'contattoReferente.email',

      } },
      modePage: '',
      httpCall: new HttpCall(API_FORNITORE_CLIENTE),
      loadEntity: false,
      configTypes:
              { statoSedeLegale: { isDominio: false, urlApi: '/api/countries/all', fieldId: '_id', fieldCodice: 'codIsoStato', showDescrizione: true }, statoSedeCostituzione: { isDominio: false, urlApi: '/api/countries/all', fieldId: '_id', fieldCodice: 'codIsoStato', showDescrizione: true }, aziendaleId: { isDominio: false, urlApi: '/api/companies/all', fieldId: '_id', showCodice: true } },
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
</script>
<style>
  .title-form {
    border-left-width: 10px solid;
    border-left-color: #000;
  }
</style>
