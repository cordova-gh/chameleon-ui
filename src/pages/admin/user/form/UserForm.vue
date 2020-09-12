<template>
  <div class="container-fluid mt--6">
    <div class="card mb-4"><div class="card-header">
              <h3 class="mb-0">UTENTI</h3>
          </div>
      <div class="card-body">
        <form @submit.prevent="saveEntity">
          <div class="card-body"><div class="title-form">
                      <p>Dati utente</p>
                   </div>
            <div class="row">
              <div class="col-6 form-group">
                <input-text v-model="entity['email']" label="Email">
                </input-text>
              </div>
            </div>
            <div class="row">
              <div class="col-6 form-group">
                <input-password v-model="entity['password']" label="Password">
                </input-password>              </div>
            </div>
            <div class="row">
              <div class="col-6 form-group">
                <input-text v-model="entity['nome']" label="Nome">
                </input-text>
              </div>
              <div class="col-6 form-group">
                <input-text v-model="entity['cognome']" label="Cognome">
                </input-text>
              </div>
            </div>
            <div class="row">
              <div class="col-6 form-group">
                  <template v-if="loadEntity">
                      <input-autocomplete v-model="entity['profile']"
                         :config="configTypes['profile']">
                       </input-autocomplete>
                    </template>
              </div>
              <div class="col-6 form-group">
                <input-select v-model="entity['stUtenza']"
                                  :items="this.domini['ST_UTENZA']">
                  </input-select>              </div>
            </div>
            <div class="row">
              <div class="col-6 form-group">
                  <template v-if="loadEntity">
                      <input-autocomplete v-model="entity['azienda']"
                         :config="configTypes['azienda']">
                       </input-autocomplete>
                    </template>
              </div>
            </div>
           </div><div>
                    <div class="row justify-content-end">
                    <template v-if="modePage === 'I'">
                        <div class="col-3 ">
                        <button class="btn btn-primary btn-block">Salva</button>
                        </div>
                    </template>
                    <template v-else>
                        <div class="col-3">
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
import HttpCall from '@/services/HttpCall';
import { Utility } from '@/utilities/utility';
import { API_USER, API_DOMINIO } from '@/services/constant-services';

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
  },
  data() {
    return {
      entity: { email: '',
        password: '',
        nome: '',
        cognome: '',
        profile: '',
        stUtenza: '',
        azienda: '',
      },
      annidateFields: { email: 'email',
        password: 'password',
        nome: 'anagrafica.personaFisica.nome',
        cognome: 'anagrafica.personaFisica.cognome',
        profile: 'profile',
        stUtenza: 'stUtenza',
        azienda: 'azienda',
      },
      modePage: '',
      httpCall: new HttpCall(API_USER),
      loadEntity: false,
      configTypes:
                { profile: { isDominio: false, urlApi: '/api/profiles', fieldId: '_id', showCodice: true }, azienda: { isDominio: false, urlApi: '/api/companies', fieldId: '_id', showCodice: true } },
      currentId: null,
      dominiToLoad: { stUtenza: 'ST_UTENZA' },
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
      Object.keys(this.annidateFields).forEach((key) => {
        const bindField = this.annidateFields[key];
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
      Object.keys(this.annidateFields).forEach((key) => {
        const annidateField = this.annidateFields[key];
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
      // eslint-disable-next-line no-console
      const keysObjectDominiToLoad = Object.keys(this.dominiToLoad);
      if (keysObjectDominiToLoad.length > 0) {
        const dominiIncludes = Object.keys(this.dominiToLoad).map(key => this.dominiToLoad[key]);
        const httpCallDomini = new HttpCall(API_DOMINIO);
        // eslint-disable-next-line no-console
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
