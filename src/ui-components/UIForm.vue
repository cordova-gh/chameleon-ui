<template>
  <div class="container-fluid mt--6">
    <div class="card mb-4">
      <div v-if="title !== ''" class="card-header">
        <h3 class="mb-0">{{ title }}</h3>
      </div>
      <div class="card-body">
        <form @submit.prevent="saveEntity">
          <div
            v-for="(sectionElement, indexSection) in config.sections"
            :key="indexSection"
            class=""
          >
            <p> {{sectionElement.label}}</p>
            <div
              v-for="(rowElement, indexRow) in sectionElement.rows"
              :key="indexRow"
              class="row"
            >
              <div
                v-for="(colElement, indexCol) in rowElement"
                :key="indexCol"
                class="col form-group"
              >
                <template v-if="colElement.type === 'text'">
                  <input-text
                    v-model="entity[colElement.field]"
                    :label="colElement.label"
                  ></input-text>
                </template>
                <template v-else-if="colElement.type === 'password'">
                  <input-password
                    v-model="entity[colElement.field]"
                    :label="colElement.label"
                  >
                  </input-password>
                </template>
                <template v-else-if="colElement.type === 'autocomplete'">
                  <input-autocomplete
                    v-model="entity[colElement.field]"
                    :config="colElement.configType"
                  ></input-autocomplete>
                </template>
                <template v-else-if="colElement.type === 'select'">
                  <input-select
                    v-model="entity[colElement.field]"
                    :config="colElement.configType"
                  >
                  </input-select>
                </template>
              </div>
            </div>
          </div>
          <template v-if="modePage === 'I'">
            <button class="btn btn-primary btn-block">Salva</button>
          </template>
          <template v-else>
            <button class="btn btn-primary btn-block">Modifica</button>
          </template>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
import Vue from 'vue';
import InputAutocomplete from './input-components/InputAutocomplete';
import InputSelect from './input-components/InputSelect';
import InputText from './input-components/InputText';
import InputPassword from './input-components/InputPassword';
import InputNumber from './input-components/InputNumber';
import HttpCall from '../services/HttpCall';
import { Utility } from '../utilities/utility';

export default {
  props: {
    urlApi: {
      type: String,
      required: true,
    },
    currentId: {
      type: String,
      default: '',
    },
    title: {
      type: String,
      default: '',
    },
    config: {
      type: Object,
      required: true,
    },
    reload: {
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
  },
  data() {
    return {
      entity: this.createEntityForm(),
      modePage: '',
      httpCall: new HttpCall(this.urlApi),
    };
  },
  created() {
    this.onCreated();
  },
  methods: {
    onCreated() {
      if (this.currentId !== '') {
        this.getEntity(this.currentId);
        this.modePage = 'U';
      } else {
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
      this.httpCall.getById(id).then(data => this.setEntity(data));
    },
    createEntityForm() {
      const obj = {};
      for (let j = 0; j < this.config.sections.length; j += 1) {
        const sectionElement = this.config.sections[j];
        // eslint-disable-next-line no-console
        console.log('sectionElementcreateentityform', sectionElement);
        for (let index = 0; index < sectionElement.rows.length; index += 1) {
          const rowElement = sectionElement.rows[index];
          for (let colIndex = 0; colIndex < rowElement.length; colIndex += 1) {
            const configElement = rowElement[colIndex];
            obj[configElement.field] = '';
          }
        }
      }
      return obj;
    },
    createEntity() {
      const obj = {};
      for (let j = 0; j < this.config.sections.length; j += 1) {
        const sectionElement = this.config.sections[j];
        // eslint-disable-next-line no-console
        console.log('sectionElementcreate', sectionElement);
        for (let index = 0; index < sectionElement.rows.length; index += 1) {
          const rowElement = sectionElement.rows[index];
          for (let colIndex = 0; colIndex < rowElement.length; colIndex += 1) {
            const configElement = rowElement[colIndex];
            if (configElement.bindField.indexOf('.') > 0) {
              const annidateFields = configElement.bindField.split('.');
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
                    this.entity[configElement.field],
                  );
                }
              }
            } else {
              obj[configElement.bindField] = this.entity[configElement.field];
            }
          }
        }
      }
      return obj;
    },
    setEntity(data) {
      for (let j = 0; j < this.config.sections.length; j += 1) {
        const sectionElement = this.config.sections[j];
        // eslint-disable-next-line no-console
        console.log('sectionElement', sectionElement);
        for (let index = 0; index < sectionElement.rows.length; index += 1) {
          const rowElement = sectionElement.rows[index];
          for (let colIndex = 0; colIndex < rowElement.length; colIndex += 1) {
            const configElement = rowElement[colIndex];
            if (configElement.bindField.indexOf('.') > 0) {
              const annidateValue = Utility.getAnnidateValue(
                configElement.bindField.split('.'),
                data,
              );
              if (annidateValue !== null) {
                this.entity[configElement.field] = annidateValue;
              }
            } else {
              this.entity[configElement.field] = data[configElement.bindField];
            }
          }
        }
      }
    },
    // watch: {
    //   reload: {
    //     immediate: true,
    //     deep: true,
    //     handler() {
    //       this.onCreated();
    //       this.$emit('endLoadForm');
    //     },
    //   },
    // },
  },
};
</script>
