<template>
<div class="container-fluid mt--6">
  <div class="card mb-4"><div class="card-header">
            <h3 class="mb-0">Company</h3>
        </div>
    <div class="card-body">
      <form @submit.prevent="saveEntity">
        <div class="card-body"><div class="title-form">
                    <p>Dati Generali</p>
                 </div>
            <div class="row">
              <div class="col-12 col-md-4 form-group">
                <input-text v-model="entity['codice']" label="Codice">
              </input-text>
              </div>
            </div>
            <div class="row">
              <div class="col-12 col-md-4 form-group">
                <input-text v-model="entity['ragioneSociale']" label="Ragione Sociale">
              </input-text>
              </div>
              <div class="col-12 col-md-4 form-group">
                <input-text v-model="entity['descrAttivita']" label="Descrizione Attivita">
              </input-text>
              </div>
            </div>
            <div class="row">
              <div class="col-12 col-md-4 form-group">
                <input-text v-model="entity['codiceFiscale']" label="Codice Fiscale">
              </input-text>
              </div>
              <div class="col-12 col-md-4 form-group">
                <input-text v-model="entity['partitaIva']" label="Partita Iva">
              </input-text>
              </div>
              <div class="col-12 col-md-4 form-group">
                <input-text v-model="entity['partitaIvaEstera']" label="Partita Iva Estera">
              </input-text>
              </div>
            </div>
            <div class="row">
              <div class="col-12 col-md-4 form-group">
                <input-text v-model="entity['telefono']" label="Telefono">
              </input-text>
              </div>
              <div class="col-12 col-md-4 form-group">
                <input-text v-model="entity['cellulare']" label="Cellulare">
              </input-text>
              </div>
            </div>
            <div class="row">
              <div class="col-12 col-md-4 form-group">
                <input-text v-model="entity['naturaGiurica']" label="Natura Giuridica">
              </input-text>
              </div>
            </div>
<div class="title-form">
                    <p>Sede Legale</p>
                 </div>
            <div class="row">
              <div class="col-12 col-md-4 form-group">
                  <template v-if="loadEntity">
                    <input-autocomplete v-model="entity['statoSedeLegale']"
                       :config="configTypes['statoSedeLegale']">
                     </input-autocomplete>
                  </template>
              </div>
              <div class="col-12 col-md-4 form-group">
                <input-text v-model="entity['provinciaSedeLegale']" label="Provincia">
              </input-text>
              </div>
              <div class="col-12 col-md-4 form-group">
                <input-text v-model="entity['comuneSedeLegale']" label="Comune">
              </input-text>
              </div>
            </div>
            <div class="row">
              <div class="col-12 col-md-4 form-group">
                <input-text v-model="entity['viaSedeLegale']" label="Via">
              </input-text>
              </div>
              <div class="col-12 col-md-4 form-group">
                <input-text v-model="entity['numeroSedeLegale']" label="Numero">
              </input-text>
              </div>
              <div class="col-12 col-md-4 form-group">
                <input-text v-model="entity['capSedeLegale']" label="Cap">
              </input-text>
              </div>
            </div>
<div class="title-form">
                    <p>Sede Costituzione</p>
                 </div>
            <div class="row">
              <div class="col-12 col-md-4 form-group">
                  <template v-if="loadEntity">
                    <input-autocomplete v-model="entity['statoSedeCostituzione']"
                       :config="configTypes['statoSedeCostituzione']">
                     </input-autocomplete>
                  </template>
              </div>
              <div class="col-12 col-md-4 form-group">
                <input-text v-model="entity['provinciaSedeCostituzione']" label="Provincia">
              </input-text>
              </div>
              <div class="col-12 col-md-4 form-group">
                <input-text v-model="entity['comuneSedeCostituzione']" label="Comune">
              </input-text>
              </div>
            </div>
            <div class="row">
              <div class="col-12 col-md-4 form-group">
                <input-text v-model="entity['viaSedeCostituzione']" label="Via">
              </input-text>
              </div>
              <div class="col-12 col-md-4 form-group">
                <input-text v-model="entity['numeroSedeCostituzione']" label="Numero">
              </input-text>
              </div>
              <div class="col-12 col-md-4 form-group">
                <input-text v-model="entity['capSedeCostituzione']" label="Cap">
              </input-text>
              </div>
            </div>
<div class="title-form">
                    <p>Altri Dati</p>
                 </div>
            <div class="row">
              <div class="col-12 col-md-4 form-group">
                <input-date v-model="entity['dataCostituzione']"> </input-date>              </div>
              <div class="col-12 col-md-4 form-group">
                <input-text v-model="entity['capitaleSociale']" label="Capitale Sociale">
              </input-text>
              </div>
            </div>
            <div class="row">
              <div class="col-12 col-md-4 form-group">
                <input-date v-model="entity['dataIscrCciaa']"> </input-date>              </div>
              <div class="col-12 col-md-4 form-group">
                <input-text v-model="entity['nrIscrCciaa']" label="N° Iscr.Cciaa">
              </input-text>
              </div>
              <div class="col-12 col-md-4 form-group">
                <input-text v-model="entity['provIscrCciaa']" label="Prov. Iscr.Cciaa">
              </input-text>
              </div>
            </div>
<div class="title-form">
                    <p>Contatto Riferimento</p>
                 </div>
            <div class="row">
              <div class="col-12 col-md-4 form-group">
                <input-text v-model="entity['nomeRiferimento']" label="Nome">
              </input-text>
              </div>
              <div class="col-12 col-md-4 form-group">
                <input-text v-model="entity['telefonoReferente']" label="Telefono">
              </input-text>
              </div>
              <div class="col-12 col-md-4 form-group">
                <input-text v-model="entity['cellulareRiferimento']" label="Cellulare">
              </input-text>
              </div>
              <div class="col-12 col-md-4 form-group">
                <input-text v-model="entity['emailReferente']" label="Email">
              </input-text>
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
  </div>
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
import { API_COMPANY, API_DOMINIO } from '@/services/constant-services';

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
      propsFields: { codice: { bind: 'codice' },
        ragioneSociale: { bind: 'anagrafica.entitaGiuridica.ragioneSociale' },
        descrAttivita: { bind: 'anagrafica.entitaGiuridica.descrAttivita' },
        codiceFiscale: { bind: 'anagrafica.codiceFiscale' },
        partitaIva: { bind: 'anagrafica.partitaIva' },
        partitaIvaEstera: { bind: 'anagrafica.partitaIvaEstera' },
        telefono: { bind: 'anagrafica.telefono' },
        cellulare: { bind: 'anagrafica.cellulare' },
        naturaGiurica: { bind: 'anagrafica.entitaGiuridica.naturaGiur' },
        statoSedeLegale: { bind: 'anagrafica.entitaGiuridica.indirizzoSedeLegale.stato' },
        provinciaSedeLegale: { bind: 'anagrafica.entitaGiuridica.indirizzoSedeLegale.provincia' },
        comuneSedeLegale: { bind: 'anagrafica.entitaGiuridica.indirizzoSedeLegale.comune' },
        viaSedeLegale: { bind: 'anagrafica.entitaGiuridica.indirizzoSedeLegale.via' },
        numeroSedeLegale: { bind: 'anagrafica.entitaGiuridica.indirizzoSedeLegale.numero' },
        capSedeLegale: { bind: 'anagrafica.entitaGiuridica.indirizzoSedeLegale.cap' },
        statoSedeCostituzione: { bind: 'anagrafica.entitaGiuridica.indirizzoSedeCostituzione.stato' },
        provinciaSedeCostituzione: { bind: 'anagrafica.entitaGiuridica.indirizzoSedeCostituzione.provincia' },
        comuneSedeCostituzione: { bind: 'anagrafica.entitaGiuridica.indirizzoSedeCostituzione.comune' },
        viaSedeCostituzione: { bind: 'anagrafica.entitaGiuridica.indirizzoSedeCostituzione.via' },
        numeroSedeCostituzione: { bind: 'anagrafica.entitaGiuridica.indirizzoSedeCostituzione.numero' },
        capSedeCostituzione: { bind: 'anagrafica.entitaGiuridica.indirizzoSedeCostituzione.cap' },
        dataCostituzione: { bind: 'anagrafica.entitaGiuridica.dataCostituzione' },
        capitaleSociale: { bind: 'anagrafica.entitaGiuridica.capitaleSociale' },
        dataIscrCciaa: { bind: 'anagrafica.entitaGiuridica.dataIscrCciaa' },
        nrIscrCciaa: { bind: 'anagrafica.entitaGiuridica.nrIscrCciaa' },
        provIscrCciaa: { bind: 'anagrafica.entitaGiuridica.provIscrCciaa' },
        nomeRiferimento: { bind: 'anagrafica.contattoReferente.nome' },
        telefonoReferente: { bind: 'anagrafica.contattoReferente.telefono' },
        cellulareRiferimento: { bind: 'anagrafica.contattoReferente.cellulare' },
        emailReferente: { bind: 'anagrafica.contattoReferente.email' },
      },
      modePage: '',
      httpCall: new HttpCall(API_COMPANY),
      loadEntity: false,
      configTypes:
              { statoSedeLegale: { isDominio: false, urlApi: '/api/countries/all', fieldId: '_id', fieldCodice: 'codIsoStato', showDescrizione: true }, statoSedeCostituzione: { isDominio: false, urlApi: '/api/countries/all', fieldId: '_id', fieldCodice: 'codIsoStato', showDescrizione: true } },
      currentId: null,
      dominiToLoad: {},
      domini: [],
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
  },
};
</script><style>
          .title-form {
          border-left-width: 10px solid;
          border-left-color: #000;
          }
          </style>
