<template>
  <div class="container">
    <div class="row">
      Form
      <input type="radio" id="huey" name="drone" value="form"  /> Grid
      List<input
        type="radio"
        id="huey"
        name="drone"
        value="grid-list"
        checked
      />
      Pagination
      <input type="radio" id="huey" name="drone" value="pagination"  />
    </div>
    <div class="row">
      <input
        type="file"
          lang="en"
            accept=".json"
           ref="file"
        @change="gComponent"
      />
    </div>

    <div class="row">
      <textarea
        id="w3review"
        name="w3review"
        rows="30"
        cols="100"
        v-model="codeString"
      ></textarea>
    </div>
  </div>
</template>
<script>
export default {
  name: 'button',
  data() {
    return {
      titolo: '',
      codeString: '',
      templateWord: 'template',
      scriptWord: 'script',
      styleWord: 'style',
      braceWord: '${',
      backTickWord: '`',
      config: '',
      file: Blob,
    };
  },
  methods: {
    gComponent() {
      // eslint-disable-next-line no-console
      console.log('sonoosnsos qui');
      this.file = this.$refs.file.files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        this.config = JSON.parse(event.target.result);
        // eslint-disable-next-line no-console
        console.log('configurazione', this.config);
        this.codeString = this.templateForm() + this.scriptForm() + this.styleForm();
      };
      reader.readAsText(this.file);
      // eslint-disable-next-line quotes
      /*  */
    },
    templateForm() {
      // eslint-disable-next-line no-unused-expressions
      const titleIf = this.config.title
        ? `<div class="card-header">
              <h3 class="mb-0">${this.config.title}</h3>
          </div> `
        : '';

      const isFormIf = this.config.isForm
        ? `<div>
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
                </div>`
        : '';
      const isFilterIf = this.config.isFilter
        ? `<div>
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
            </div>`
        : '';
      // eslint-disable-next-line quotes
      const spazio = `            `;
      // eslint-disable-next-line quotes
      let inputs = `<div class="card-body">`;
      this.config.sections.forEach((section) => {
        // eslint-disable-next-line no-const-assign
        inputs += `<div class="title-form">
                      <p>${section.title}</p>
                   </div>\n`;
        section.rows.forEach((rows) => {
          inputs += `${spazio}<div class="row">\n`;
          rows.forEach((row) => {
            const numCols = this.getNumColsForm(row.numCols, section.numCols);
            inputs += `${spazio}  <div class="col-${numCols} form-group">\n`;
            switch (row.type) {
              case 'autocomplete': {
                inputs += `${spazio}      <template v-if="loadEntity">
                      <input-autocomplete v-model="entity[colElement.field]"
                        :config="colElement.configType">
                       </input-autocomplete>
                    </template>\n`;
                break;
              }
              case 'password': {
                // eslint-disable-next-line quotes
                inputs += `${spazio}    <input-password v-model="entity[colElement.field]" :label="colElement.label">
                </input-password>`;
                break;
              }
              case 'select': {
                // eslint-disable-next-line quotes
                inputs += `${spazio}    <input-select v-model="entity[colElement.field]"
                                  :config="colElement.configType">
                  </input-select>`;
                break;
              }
              case 'date': {
                // eslint-disable-next-line quotes
                inputs += `${spazio}    <input-date v-model="entity[colElement.field]"> </input-date>`;
                break;
              }
              case 'money': {
                // eslint-disable-next-line quotes
                inputs += `${spazio}    <input-money v-model="entity[colElement.field]"> </input-money>`;
                break;
              }
              case 'number': {
                // eslint-disable-next-line quotes
                inputs += `${spazio}    <input-number v-model="entity[colElement.field]"> </input-number>`;
                break;
              }
              default: {
                // eslint-disable-next-line quotes
                inputs += `${spazio}    <input-text v-model="entity[colElement.field]" :label="colElement.label">
                </input-text>\n`;
              }
            }
            // eslint-disable-next-line quotes
            inputs += `${spazio}  </div>\n`;
          });
          // eslint-disable-next-line quotes
          inputs += `${spazio}</div>\n`;
        });
      });
      // eslint-disable-next-line quotes
      inputs += `           </div>`;
      return `<${this.templateWord}>
  <div class="container-fluid mt--6">
    <div class="card mb-4">${titleIf}
      <div class="card-body">
        <form @submit.prevent="saveEntity">
          ${inputs}${isFormIf}${isFilterIf}
        </form>
      </div>
    </div>
  </div>
</${this.templateWord}>\n`;
    },
    scriptForm() {
      // eslint-disable-next-line no-unused-expressions
      return `<${this.scriptWord}>
            import Vue from 'vue';
            import InputAutocomplete from '@/ui-components/input-components/InputAutocomplete';
            import InputSelect from '@/ui-components/input-components/InputSelect';
            import InputText from '@/ui-components/input-components/InputText';
            import InputPassword from '@/ui-components/input-components/InputAutocomplete';
            import InputNumber from '@/ui-components/input-components/InputNumber';
            import InputDate from '@/ui-components/input-components/InputDate';
            import InputMoney from '@/ui-components/input-components/InputMoney';
            import HttpCall from '@/services/HttpCall';
            import { Utility } from '@/utilities/utility';

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
            </${this.scriptWord}>`;
    },
    getNumColsForm(numColsRow, numColsSection) {
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
    styleForm() {
      return `<${this.styleWord}>
            .title-form {
            border-left-width: 10px solid;
            border-left-color: #000;
            }
            </${this.styleWord}>`;
    },
    gPagination() {
      // eslint-disable-next-line max-len
      this.codeString =
        this.templatePagination() +
        this.scriptPagination() +
        this.stylePagination();
    },
    templatePagination() {
      // eslint-disable-next-line quotes
      return `
        <${this.templateWord}>
        <div>
            <div
            v-if="
                configGridListFilter &&
                configGridListFilter.length > 0 &&
                configFormFilter
            "
            >

            <ui-form
                :urlApi="urlApi"
                :config="configFormFilter"
                :currentId="currentId"
                v-bind:isForm="false"
                v-bind:isFilter="true"
                @filter="filter"
            >
            </ui-form>
            </div>
            <div class="container">
            <div class="table table-hover">
                <table class="table align-items-center">
                <thead class="thead-light">
                    <th style="width: 5%"></th>
                    <th v-for="(column, index) in config" :key="index" class="sort">
                    {{ column.label }}
                    </th>
                    <th style="width: 5%"></th>
                </thead>
                <tbody>
                    <tr v-for="entity of entities" :key="entity.id">
                    <td>
                        <i
                        @click="deleteEntity(entity._id)"
                        class="fa fa-minus-circle"
                        ></i>
                    </td>
                    <td v-for="(column, indexColumn) in config" :key="indexColumn">
                        <template v-if="column.type === 'checkbox'">
                        <input-checkbox
                            v-model="entity[column.field]"
                            v-bind:isReadonly="true"
                        >
                        </input-checkbox>
                        </template>
                        <template v-else>
                        {{ entity[column.field] }}
                        </template>
                    </td>
                    <td>
                        <router-link :to="'edit/' + entity._id"
                        ><i class="fas fa-edit"></i
                        ></router-link>
                    </td>
                    </tr>
                </tbody>
                </table>
                <nav aria-label="Page navigation example">
                <ul class="pagination justify-content-end">
                    <div v-for="(page, idxPage) of pages" :key="idxPage">
                    <template v-if="currentPage === page">
                        <li class="page-item active">
                        <a class="page-link">{{ page }}</a>
                        </li>
                    </template>
                    <template v-else>
                        <li class="page-item">
                        <a class="page-link" @click="getEntities(page)">{{ page }}</a>
                        </li>
                    </template>
                    </div>
                </ul>
                </nav>
            </div>
            </div>
        </div>
        </${this.templateWord}>`;
    },
    scriptPagination() {
      // eslint-disable-next-line quotes
      return `
        <${this.scriptWord}>
        import HttpCall from '../services/HttpCall';
import { Utility } from '../utilities/utility';
import InputCheckBox from './input-components/InputCheckBox';
import UIForm from './UIForm';

export default {
  props: {
    urlApi: {
      type: String,
    },
    title: {
      type: String,
      value: '',
    },
    config: {
      type: Array,
    },
    reload: {
      type: Boolean,
      default: false,
    },
    showButtonPlus: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      entities: [],
      modePage: 'LIST',
      pages: 0,
      currentPage: 1,
      httpCall: new HttpCall(this.urlApi),
      configGridListFilter: [],
      configFormFilter: null,
    };
  },
  components: {
    'input-checkbox': InputCheckBox,
    'ui-form': UIForm,
  },
  created() {
    this.getEntities(1);
    this.configGridListFilter = this.config.filter(config => config.isFilter);
    if (this.configGridListFilter.length > 0) {
      const sectionFilter = {};
      sectionFilter.label = 'Filtri Ricerca';
      const filterRows = [];
      this.configGridListFilter.forEach((config) => {
        filterRows.push({ field: config.field,
          type: config.type,
          bindField: config.field,
          label: config.label });
      });
      sectionFilter.rows = [];
      sectionFilter.rows[0] = filterRows;
      this.configFormFilter = {};
      this.configFormFilter.numCols = '2';
      this.configFormFilter.sections = [];
      this.configFormFilter.sections[0] = sectionFilter;
    }
  },
  methods: {
    getEntities(page) {
      this.currentPage = page;
      const params = ${this.backTickWord}?page=${this.braceWord}this.currentPage}${this.backTickWord};
      this.httpCall.get(params).then((data) => {
        this.entities = Utility.createArrayByConfig(data.entities, this.config);
        this.pages = data.pages;
      });
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
    filter(filterObj) {
      const filterArray = Object.keys(filterObj)
        .filter(keyFilter => filterObj[keyFilter])
        .map(keyFilter => ${this.backTickWord}${this.braceWord}keyFilter}=${this.braceWord}filterObj[keyFilter]}${this.backTickWord});
      const params = filterArray.join('&');
      this.getEntities(1, params);
    },
  },
  watch: {
    reload: {
      immediate: true,
      deep: true,
      handler() {
        this.getEntities(1);
        this.$emit('endLoadPagination');
      },
    },
  },
};
        </${this.scriptWord}>   `;
    },
  },
};
</script>
