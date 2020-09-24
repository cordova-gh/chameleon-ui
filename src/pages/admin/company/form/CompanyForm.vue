<template>
  <div class="container shadow p-2 mb-3 bg-white rounded">
    <form @submit.prevent="saveEntity">
      <div class="card-body">
        <div class="title-form">
          <p>Dati Generali</p>
        </div>
        <div class="row">
          <div class="col-12 col-md-4 form-group"
            v-if="!invisibleFields['codice']">
            <input-text v-model="entity['codice']" label="Codice"
                :readonlyAttr="readonlyFields['codice']"
                fieldName="codice">
            </input-text>
          </div>
        </div>
        <div class="row">
          <div class="col-12 col-md-4 form-group"
            v-if="!invisibleFields['ragioneSociale']">
            <input-text v-model="entity['ragioneSociale']" label="Ragione Sociale"
                :readonlyAttr="readonlyFields['ragioneSociale']"
                fieldName="ragioneSociale">
            </input-text>
          </div>
          <div class="col-12 col-md-4 form-group"
            v-if="!invisibleFields['descrAttivita']">
            <input-text v-model="entity['descrAttivita']" label="Descrizione Attivita"
                :readonlyAttr="readonlyFields['descrAttivita']"
                fieldName="descrAttivita">
            </input-text>
          </div>
        </div>
        <div class="row">
          <div class="col-12 col-md-4 form-group"
            v-if="!invisibleFields['codiceFiscale']">
            <input-text v-model="entity['codiceFiscale']" label="Codice Fiscale"
                :readonlyAttr="readonlyFields['codiceFiscale']"
                fieldName="codiceFiscale">
            </input-text>
          </div>
          <div class="col-12 col-md-4 form-group"
            v-if="!invisibleFields['partitaIva']">
            <input-text v-model="entity['partitaIva']" label="Partita Iva"
                :readonlyAttr="readonlyFields['partitaIva']"
                fieldName="partitaIva">
            </input-text>
          </div>
          <div class="col-12 col-md-4 form-group"
            v-if="!invisibleFields['partitaIvaEstera']">
            <input-text v-model="entity['partitaIvaEstera']" label="Partita Iva Estera"
                :readonlyAttr="readonlyFields['partitaIvaEstera']"
                fieldName="partitaIvaEstera">
            </input-text>
          </div>
        </div>
        <div class="row">
          <div class="col-12 col-md-4 form-group"
            v-if="!invisibleFields['telefono']">
            <input-text v-model="entity['telefono']" label="Telefono"
                :readonlyAttr="readonlyFields['telefono']"
                fieldName="telefono">
            </input-text>
          </div>
          <div class="col-12 col-md-4 form-group"
            v-if="!invisibleFields['cellulare']">
            <input-text v-model="entity['cellulare']" label="Cellulare"
                :readonlyAttr="readonlyFields['cellulare']"
                fieldName="cellulare">
            </input-text>
          </div>
        </div>
        <div class="row">
          <div class="col-12 col-md-4 form-group"
            v-if="!invisibleFields['naturaGiurica']">
            <input-text v-model="entity['naturaGiurica']" label="Natura Giuridica"
                :readonlyAttr="readonlyFields['naturaGiurica']"
                fieldName="naturaGiurica">
            </input-text>
          </div>
        </div>
        <div class="title-form">
          <p>Sede Legale</p>
        </div>
        <div class="row">
          <div class="col-12 col-md-4 form-group"
            v-if="!invisibleFields['statoSedeLegale']">
            <template v-if="loadEntity">
              <input-autocomplete v-model="entity['statoSedeLegale']"
                :config="configTypes['statoSedeLegale']"
                :readonlyAttr="readonlyFields['statoSedeLegale']" label="Stato"
                fieldName="statoSedeLegale">
              </input-autocomplete>
            </template>
          </div>
          <div class="col-12 col-md-4 form-group"
            v-if="!invisibleFields['provinciaSedeLegale']">
            <input-text v-model="entity['provinciaSedeLegale']" label="Provincia"
                :readonlyAttr="readonlyFields['provinciaSedeLegale']"
                fieldName="provinciaSedeLegale">
            </input-text>
          </div>
          <div class="col-12 col-md-4 form-group"
            v-if="!invisibleFields['comuneSedeLegale']">
            <input-text v-model="entity['comuneSedeLegale']" label="Comune"
                :readonlyAttr="readonlyFields['comuneSedeLegale']"
                fieldName="comuneSedeLegale">
            </input-text>
          </div>
        </div>
        <div class="row">
          <div class="col-12 col-md-4 form-group"
            v-if="!invisibleFields['viaSedeLegale']">
            <input-text v-model="entity['viaSedeLegale']" label="Via"
                :readonlyAttr="readonlyFields['viaSedeLegale']"
                fieldName="viaSedeLegale">
            </input-text>
          </div>
          <div class="col-12 col-md-4 form-group"
            v-if="!invisibleFields['numeroSedeLegale']">
            <input-text v-model="entity['numeroSedeLegale']" label="Numero"
                :readonlyAttr="readonlyFields['numeroSedeLegale']"
                fieldName="numeroSedeLegale">
            </input-text>
          </div>
          <div class="col-12 col-md-4 form-group"
            v-if="!invisibleFields['capSedeLegale']">
            <input-text v-model="entity['capSedeLegale']" label="Cap"
                :readonlyAttr="readonlyFields['capSedeLegale']"
                fieldName="capSedeLegale">
            </input-text>
          </div>
        </div>
        <div class="title-form">
          <p>Sede Costituzione</p>
        </div>
        <div class="row">
          <div class="col-12 col-md-4 form-group"
            v-if="!invisibleFields['statoSedeCostituzione']">
            <template v-if="loadEntity">
              <input-autocomplete v-model="entity['statoSedeCostituzione']"
                :config="configTypes['statoSedeCostituzione']"
                :readonlyAttr="readonlyFields['statoSedeCostituzione']" label="Stato"
                fieldName="statoSedeCostituzione">
              </input-autocomplete>
            </template>
          </div>
          <div class="col-12 col-md-4 form-group"
            v-if="!invisibleFields['provinciaSedeCostituzione']">
            <input-text v-model="entity['provinciaSedeCostituzione']" label="Provincia"
                :readonlyAttr="readonlyFields['provinciaSedeCostituzione']"
                fieldName="provinciaSedeCostituzione">
            </input-text>
          </div>
          <div class="col-12 col-md-4 form-group"
            v-if="!invisibleFields['comuneSedeCostituzione']">
            <input-text v-model="entity['comuneSedeCostituzione']" label="Comune"
                :readonlyAttr="readonlyFields['comuneSedeCostituzione']"
                fieldName="comuneSedeCostituzione">
            </input-text>
          </div>
        </div>
        <div class="row">
          <div class="col-12 col-md-4 form-group"
            v-if="!invisibleFields['viaSedeCostituzione']">
            <input-text v-model="entity['viaSedeCostituzione']" label="Via"
                :readonlyAttr="readonlyFields['viaSedeCostituzione']"
                fieldName="viaSedeCostituzione">
            </input-text>
          </div>
          <div class="col-12 col-md-4 form-group"
            v-if="!invisibleFields['numeroSedeCostituzione']">
            <input-text v-model="entity['numeroSedeCostituzione']" label="Numero"
                :readonlyAttr="readonlyFields['numeroSedeCostituzione']"
                fieldName="numeroSedeCostituzione">
            </input-text>
          </div>
          <div class="col-12 col-md-4 form-group"
            v-if="!invisibleFields['capSedeCostituzione']">
            <input-text v-model="entity['capSedeCostituzione']" label="Cap"
                :readonlyAttr="readonlyFields['capSedeCostituzione']"
                fieldName="capSedeCostituzione">
            </input-text>
          </div>
        </div>
        <div class="title-form">
          <p>Altri Dati</p>
        </div>
        <div class="row">
          <div class="col-12 col-md-4 form-group"
            v-if="!invisibleFields['dataCostituzione']">
            <input-date v-model="entity['dataCostituzione']"
                :readonlyAttr="readonlyFields['dataCostituzione']" label="data Costituzione"
                fieldName="dataCostituzione">
              </input-date>          </div>
          <div class="col-12 col-md-4 form-group"
            v-if="!invisibleFields['capitaleSociale']">
            <input-text v-model="entity['capitaleSociale']" label="Capitale Sociale"
                :readonlyAttr="readonlyFields['capitaleSociale']"
                fieldName="capitaleSociale">
            </input-text>
          </div>
        </div>
        <div class="row">
          <div class="col-12 col-md-4 form-group"
            v-if="!invisibleFields['dataIscrCciaa']">
            <input-date v-model="entity['dataIscrCciaa']"
                :readonlyAttr="readonlyFields['dataIscrCciaa']" label="Data Iscr.Cciaa"
                fieldName="dataIscrCciaa">
              </input-date>          </div>
          <div class="col-12 col-md-4 form-group"
            v-if="!invisibleFields['nrIscrCciaa']">
            <input-text v-model="entity['nrIscrCciaa']" label="N° Iscr.Cciaa"
                :readonlyAttr="readonlyFields['nrIscrCciaa']"
                fieldName="nrIscrCciaa">
            </input-text>
          </div>
          <div class="col-12 col-md-4 form-group"
            v-if="!invisibleFields['provIscrCciaa']">
            <input-text v-model="entity['provIscrCciaa']" label="Prov. Iscr.Cciaa"
                :readonlyAttr="readonlyFields['provIscrCciaa']"
                fieldName="provIscrCciaa">
            </input-text>
          </div>
        </div>
        <div class="title-form">
          <p>Contatto Riferimento</p>
        </div>
        <div class="row">
          <div class="col-12 col-md-4 form-group"
            v-if="!invisibleFields['nomeRiferimento']">
            <input-text v-model="entity['nomeRiferimento']" label="Nome"
                :readonlyAttr="readonlyFields['nomeRiferimento']"
                fieldName="nomeRiferimento">
            </input-text>
          </div>
          <div class="col-12 col-md-4 form-group"
            v-if="!invisibleFields['telefonoReferente']">
            <input-text v-model="entity['telefonoReferente']" label="Telefono"
                :readonlyAttr="readonlyFields['telefonoReferente']"
                fieldName="telefonoReferente">
            </input-text>
          </div>
          <div class="col-12 col-md-4 form-group"
            v-if="!invisibleFields['cellulareRiferimento']">
            <input-text v-model="entity['cellulareRiferimento']" label="Cellulare"
                :readonlyAttr="readonlyFields['cellulareRiferimento']"
                fieldName="cellulareRiferimento">
            </input-text>
          </div>
          <div class="col-12 col-md-4 form-group"
            v-if="!invisibleFields['emailReferente']">
            <input-text v-model="entity['emailReferente']" label="Email"
                :readonlyAttr="readonlyFields['emailReferente']"
                fieldName="emailReferente">
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
import InputDateRange from '@/ui-components/input-components/InputDateRange';
import InputMoney from '@/ui-components/input-components/InputMoney';
import InputTextArea from '@/ui-components/input-components/InputTextArea';
import InputCheckbox from '@/ui-components/input-components/InputCheckBox';
import HttpCall from '@/services/HttpCall';
import { Utility } from '@/utilities/utility';
import { API_COMPANY } from '@/services/constant-services';

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
    'input-date-range': InputDateRange,
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
        nomeRiferimento: '',
        telefonoReferente: '',
        cellulareRiferimento: '',
        emailReferente: '',
      },
      propsFields: { codice: {
        bind: 'codice',
        readonlyUpdate: true,
      },
      ragioneSociale: {
        bind: 'anagrafica.entitaGiuridica.ragioneSociale',

      },
      descrAttivita: {
        bind: 'anagrafica.entitaGiuridica.descrAttivita',

      },
      codiceFiscale: {
        bind: 'anagrafica.codiceFiscale',

      },
      partitaIva: {
        bind: 'anagrafica.partitaIva',

      },
      partitaIvaEstera: {
        bind: 'anagrafica.partitaIvaEstera',

      },
      telefono: {
        bind: 'anagrafica.telefono',

      },
      cellulare: {
        bind: 'anagrafica.cellulare',

      },
      naturaGiurica: {
        bind: 'anagrafica.entitaGiuridica.naturaGiur',

      },
      statoSedeLegale: {
        bind: 'anagrafica.entitaGiuridica.indirizzoSedeLegale.stato',

      },
      provinciaSedeLegale: {
        bind: 'anagrafica.entitaGiuridica.indirizzoSedeLegale.provincia',

      },
      comuneSedeLegale: {
        bind: 'anagrafica.entitaGiuridica.indirizzoSedeLegale.comune',

      },
      viaSedeLegale: {
        bind: 'anagrafica.entitaGiuridica.indirizzoSedeLegale.via',

      },
      numeroSedeLegale: {
        bind: 'anagrafica.entitaGiuridica.indirizzoSedeLegale.numero',

      },
      capSedeLegale: {
        bind: 'anagrafica.entitaGiuridica.indirizzoSedeLegale.cap',

      },
      statoSedeCostituzione: {
        bind: 'anagrafica.entitaGiuridica.indirizzoSedeCostituzione.stato',

      },
      provinciaSedeCostituzione: {
        bind: 'anagrafica.entitaGiuridica.indirizzoSedeCostituzione.provincia',

      },
      comuneSedeCostituzione: {
        bind: 'anagrafica.entitaGiuridica.indirizzoSedeCostituzione.comune',

      },
      viaSedeCostituzione: {
        bind: 'anagrafica.entitaGiuridica.indirizzoSedeCostituzione.via',

      },
      numeroSedeCostituzione: {
        bind: 'anagrafica.entitaGiuridica.indirizzoSedeCostituzione.numero',

      },
      capSedeCostituzione: {
        bind: 'anagrafica.entitaGiuridica.indirizzoSedeCostituzione.cap',

      },
      dataCostituzione: {
        bind: 'anagrafica.entitaGiuridica.dataCostituzione',

      },
      capitaleSociale: {
        bind: 'anagrafica.entitaGiuridica.capitaleSociale',

      },
      dataIscrCciaa: {
        bind: 'anagrafica.entitaGiuridica.dataIscrCciaa',

      },
      nrIscrCciaa: {
        bind: 'anagrafica.entitaGiuridica.nrIscrCciaa',

      },
      provIscrCciaa: {
        bind: 'anagrafica.entitaGiuridica.provIscrCciaa',

      },
      nomeRiferimento: {
        bind: 'anagrafica.contattoReferente.nome',

      },
      telefonoReferente: {
        bind: 'anagrafica.contattoReferente.telefono',

      },
      cellulareRiferimento: {
        bind: 'anagrafica.contattoReferente.cellulare',

      },
      emailReferente: {
        bind: 'anagrafica.contattoReferente.email',

      } },
      modePage: '',
      httpCall: new HttpCall(API_COMPANY),
      loadEntity: false,
      configTypes: { statoSedeLegale: { isDominio: false, urlApi: '/api/countries/all', fieldId: '_id', fieldCodice: 'codIsoStato', showDescrizione: true }, statoSedeCostituzione: { isDominio: false, urlApi: '/api/countries/all', fieldId: '_id', fieldCodice: 'codIsoStato', showDescrizione: true } },
      currentId: null,

      invisibleFields: {},
      readonlyFields: {},
    };
  },
  created() {
    this.onCreated();
  },
  methods: {
    onCreated() {
      this.currentId = this.$route.params.id;
      if (this.currentId) {
        this.getEntity(this.currentId);
        this.modePage = 'U';
        this.setModeFields();
      } else {
        if (this.baseObject) {
          this.setEntity(this.baseObject);
        }
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
