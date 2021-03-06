export default class UIFormGenerator {
  templateWord = 'template';
  scriptWord = 'script';
  styleWord = 'style';
  braceWord = '${';
  backTickWord = '`';

  constructor(config) {
    this.config = config;
  }
  generate() {
    // eslint-disable-next-line prefer-template
    return `<${this.templateWord}>
  `
          + this.templateForm()
          + `</${this.templateWord}>`
          + `
<${this.scriptWord}>`
          + this.scriptForm()
          + `</${this.scriptWord}>`
          + this.styleForm();
  }

  templateForm() {
    // eslint-disable-next-line no-unused-vars
    const titleIf = this.config.title
      ? `<div class="card-header">
            <h3 class="mb-0">${this.config.title}</h3>
        </div> `
      : '';

    const isFormIf = this.config.isForm
      ? `       <div>
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
      </div>`
      : '';
    const isFilterIf = this.config.isFilter
      ? `       <div>
        <div class="row justify-content-end">
          <div class="col-6 col-md-3">
            <input type="button" class="btn btn-secondary btn-block" value="Pulisci"
              @click="onReset" :disabled="disableBtnResetFilters">
          </div>
          <div class="col-6 col-md-3">
            <input type="button" class="btn btn-primary btn-block" value="Cerca"
              @click="onFind">
          </div>
        </div>
      </div>`
      : '';
    // eslint-disable-next-line quotes
    const spazio = `        `;
    // eslint-disable-next-line quotes
    let inputs = `<div class="card-body">\n`;
    this.config.sections.forEach((section) => {
      // eslint-disable-next-line no-const-assign
      inputs += `        <div class="title-form">
          <p>${section.label}</p>
        </div>\n`;
      section.rows.forEach((cols) => {
        inputs += `${spazio}<div class="row">\n`;
        cols.forEach((col) => {
          const numCols = this.getNumColsForm(col.numCols, section.numCols);
          inputs += `${spazio}  <div class="col-12 col-md-${numCols} form-group"
            v-if="!invisibleFields['${col.field}']">\n`;
          switch (col.type) {
            case 'autocomplete': {
              inputs += `${spazio}    <template ${this.config.isFilter ? '' : 'v-if="loadEntity"'}>
              <input-autocomplete v-model="entity['${col.field}']"
                :config="configTypes['${col.field}']"
                :readonlyAttr="readonlyFields['${col.field}']" label="${col.label}"
                fieldName="${col.field}">
              </input-autocomplete>
            </template>\n`;
              break;
            }
            case 'password': {
              // eslint-disable-next-line quotes
              inputs += `${spazio}    <input-password v-model="entity['${col.field}']"
                :readonlyAttr="readonlyFields['${col.field}']" label="${col.label}"
                fieldName="${col.field}">
            </input-password>\n`;
              break;
            }
            case 'select': {
              // eslint-disable-next-line quotes
              inputs += `${spazio}    <input-select v-model="entity['${col.field}']"
                :items="this.domini['${col.configType.dominio}']"
                :readonlyAttr="readonlyFields['${col.field}']" label="${col.label}"
                fieldName="${col.field}">
            </input-select>\n`;
              break;
            }
            case 'date': {
              // eslint-disable-next-line quotes
              inputs += `${spazio}    <input-date v-model="entity['${col.field}']"
                :readonlyAttr="readonlyFields['${col.field}']" label="${col.label}"
                fieldName="${col.field}">
              </input-date>`;
              break;
            }
            case 'date-range': {
              // eslint-disable-next-line quotes
              inputs += `${spazio}    <input-date-range v-model="entity['${col.field}']"
                :readonlyAttr="readonlyFields['${col.field}']" label="${col.label}"
                fieldName="${col.field}">
              </input-date-range>`;
              break;
            }
            case 'money': {
              // eslint-disable-next-line quotes
              inputs += `${spazio}    <input-money v-model="entity['${col.field}']"
                :readonlyAttr="readonlyFields['${col.field}']" label="${col.label}"
                fieldName="${col.field}">
              </input-money>`;
              break;
            }
            case 'number': {
              // eslint-disable-next-line quotes
              inputs += `${spazio}    <input-number v-model="entity['${col.field}']"
                :readonlyAttr="readonlyFields['${col.field}']" label="${col.label}"
                fieldName="${col.field}">
              </input-number>`;
              break;
            }
            case 'textarea': {
              // eslint-disable-next-line quotes
              inputs += `${spazio}    <input-textarea v-model="entity['${col.field}']"
                :readonlyAttr="readonlyFields['${col.field}']" label="${col.label}"
                fieldName="${col.field}">
              </input-textarea>`;
              break;
            }
            case 'checkbox': {
              // eslint-disable-next-line quotes
              inputs += `${spazio}    <input-checkbox v-model="entity['${col.field}']"
                label="${col.label}"
                :readonlyAttr="readonlyFields['${col.field}']"
                fieldName="${col.field}">
              </input-checkbox>`;
              break;
            }
            default: {
              // eslint-disable-next-line quotes
              inputs += `${spazio}    <input-text v-model="entity['${col.field}']" label="${col.label}"
                :readonlyAttr="readonlyFields['${col.field}']"
                fieldName="${col.field}">
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
    inputs += `      </div>\n`;
    return `<div class="container shadow p-2 mb-3 mt-3 bg-white rounded">
    <form @submit.prevent="saveEntity">
      ${inputs}${isFormIf}${isFilterIf}
    </form>
  </div>
`;
  }
  scriptForm() {
    return `
          ${this.getScriptFormImport()}

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
          entity: ${this.getEntity()},
          propsFields: ${this.getPropsFields()},
          modePage: '',
          httpCall: new HttpCall(${this.config.urlApi}),
          loadEntity: false,
          ${this.dataConfigTypesForAutocomplete()}
          currentId: null,
          ${this.dataDominiForSelect()}
          invisibleFields: {},
          readonlyFields: {},
          };
          },
          created() {
          this.onCreated();
          },
          methods: {
          onCreated() {
          ${this.getColsSelect().length > 0 ? 'this.getDominios();' : ''}
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
          Object.keys(obj).forEach((key) =>{
            obj[key] = '';
          })
          return obj;
          },
          createEntity() {
          const obj = {};
            Object.keys(this.propsFields).forEach((key) => {
              const bindField = this.propsFields[key]['bind'];
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
                const annidateField = this.propsFields[key]['bind'];
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
          ${this.methodDominiForSelect()}
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
          `;
  }
  getScriptFormImport() {
    return `import Vue from 'vue';
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
    import { ${this.config.urlApi + (this.getColsSelect().length > 0 ? ', API_DOMINIO' : '')} } from '@/services/constant-services';`;
  }
  styleForm() {
    return `
<${this.styleWord}>
  .title-form {
    border-left-width: 10px solid;
    border-left-color: #000;
  }
</${this.styleWord}>`;
  }
  getEntity() {
    let objString = '{';
    this.config.sections.forEach((section) => {
      section.rows.forEach((cols) => {
        cols.forEach((col) => {
          objString += `${col.field}: '',\n`;
        });
      });
    });
    // eslint-disable-next-line prefer-template
    return objString + '}';
  }
  getPropsFields(jsonValue = false) {
    const doubleQuote = jsonValue ? '"' : '';
    const singleQuote = jsonValue ? '"' : '\'';
    let objString = '';
    this.config.sections.forEach((section) => {
      section.rows.forEach((cols) => {
        cols.forEach((col) => {
          let otherAttributes = '';
          if (col.invisibleUpdate) {
            otherAttributes += `,${doubleQuote}invisibleUpdate${doubleQuote}: true`;
          }
          if (col.readonlyUpdate) {
            otherAttributes += `,${doubleQuote}readonlyUpdate${doubleQuote}: true`;
          }
          objString += `${objString !== '' ? ',' : ''} ${doubleQuote + col.field + doubleQuote}: {
                          ${doubleQuote}bind${doubleQuote}:${singleQuote + col.bindField + singleQuote}
                          ${otherAttributes}
                        }`;
        });
      });
    });
    // eslint-disable-next-line prefer-template
    return '{' + objString + '}';
  }
  dataConfigTypesForAutocomplete() {
    const objString = {};
    this.config.sections.forEach((section) => {
      section.rows.forEach((cols) => {
        cols.forEach((col) => {
          if (col.configType && col.type === 'autocomplete') {
            objString[col.field] = col.configType;
          }
        });
      });
    });
    return `configTypes:${JSON.stringify(objString).replaceAll('\'', '').replaceAll('""', '\'')},`;
  }
  dataDominiForSelect() {
    const objString = {};
    const manageSelect = (this.getColsSelect()).length > 0;
    if (manageSelect) {
      this.config.sections.forEach((section) => {
        section.rows.forEach((cols) => {
          cols.forEach((col) => {
            if (col.configType && col.type === 'select') {
              objString[col.field] = col.configType.dominio;
            }
          });
        });
      });
    }
    return manageSelect ? `dominiToLoad:${JSON.stringify(objString).replaceAll('\'', '').replaceAll('""', '\'')},
    domini: [],` : '';
  }
  methodDominiForSelect() {
    return (this.getColsSelect()).length > 0 ? `getDominios() {
      const keysObjectDominiToLoad = Object.keys(this.dominiToLoad);
      if (keysObjectDominiToLoad.length > 0) {
        const dominiIncludes = Object.keys(this.dominiToLoad).map(key => this.dominiToLoad[key]);
        const httpCallDomini = new HttpCall(API_DOMINIO);
          httpCallDomini.getCustom('/includes', ${this.backTickWord}?domini=${this.braceWord}dominiIncludes.join(',')}${this.backTickWord}).then((res) => {
          this.domini = res;
        });
      }
    },` : '';
  }

  getColsSelect() {
    let arraySelectCols = [];
    this.config.sections.forEach((section) => {
      section.rows.forEach((cols) => {
        arraySelectCols = cols.filter(col => col.configType && col.type === 'select');
      });
    });
    return arraySelectCols;
  }
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
  }
}
