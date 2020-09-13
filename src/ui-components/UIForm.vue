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
            <div class="title-form">
              <p>{{ sectionElement.label }}</p>
            </div>
            <div
              v-for="(rowElement, indexRow) in sectionElement.rows"
              :key="indexRow"
              class="row"
            >
              <div
                v-for="(colElement, indexCol) in rowElement"
                :key="indexCol"
                :class="
                  'col-' +
                    getNumCols(rowElement.numCols, sectionElement.numCols) +
                    ' form-group'
                "
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
                <template v-else-if="colElement.type === 'autocomplete' && loadEntity">
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
                <template v-else-if="colElement.type === 'date' ">
                  <input-date v-model="entity[colElement.field]"> </input-date>
                </template>
                <template v-else-if="colElement.type === 'money'">
                  <input-money v-model="entity[colElement.field]"> </input-money>
                </template>
                <template v-else-if="colElement.type === 'number'">
                  <input-number v-model="entity[colElement.field]"> </input-number>
                </template>
                <template v-else-if="colElement.type === 'textarea'">
                  <input-textarea v-model="entity[colElement.field]"> </input-textarea>
                </template>
              </div>
            </div>
          </div>
          <div v-if="isForm">
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
          <div v-else-if="isFilter">
            <div class="row justify-content-end">
              <div class="col-2">
                <button class="btn btn-secondary btn-block" @click="onReset">
                  Pulisci
                </button>
              </div>
              <div class="col-2">
                <button class="btn btn-primary btn-block" @click="onFind">
                  Cerca
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
import Vue from 'vue';
import InputText from '@/ui-components/input-components/InputText';
import InputTextArea from '@/ui-components/input-components/InputTextArea';
import InputAutocomplete from '@/ui-components/input-components/InputAutocomplete';
import InputSelect from '@/ui-components/input-components/InputSelect';
import InputPassword from '@/ui-components/input-components/InputPassword';
import InputNumber from '@/ui-components/input-components/InputNumber';
import InputDate from '@/ui-components/input-components/InputDate';
import InputMoney from '@/ui-components/input-components/InputMoney';
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
      entity: this.createEntityForm(),
      modePage: '',
      httpCall: new HttpCall(this.urlApi),
      loadEntity: false,
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
      for (let j = 0; j < this.config.sections.length; j += 1) {
        const sectionElement = this.config.sections[j];
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
    getNumCols(numColsRow, numColsSection) {
      let numCols = 3;
      if (this.config.numCols) {
        numCols = this.config.numCols;
      }
      if (numColsSection) {
        numCols = numColsSection;
      }
      if (numColsRow) {
        numCols = numColsRow;
      }
      return 12 / numCols;
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
<style>
.title-form {
  border-left-width: 10px solid;
  border-left-color: #000;
}
</style>
