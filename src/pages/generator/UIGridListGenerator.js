import UIFormGenerator from './UIFormGenerator';

export default class UIGridListGenerator {
  templateWord = 'template';
  scriptWord = 'script';
  styleWord = 'style';
  braceWord = '${';
  backTickWord = '`';
  configFilterForm = null;
  importFilter='';
  formFilterGenerator = null;

  constructor(config) {
    this.config = config;
    this.configFilterForm = this.setConfigFilterForm();
    if (this.configFilterForm) {
      this.formFilterGenerator = new UIFormGenerator(this.configFilterForm);
    }
  }
  generate() {
    return this.templateGridList() + this.scriptGridList() + this.styleGridList();
  }
  // eslint-disable-next-line class-methods-use-this
  templateGridList() {
    return `<${this.templateWord}>
  <div>
  ${this.getHtmlFilterForm()}
    <div class="container shadow p-2 mb-3 bg-white rounded">
      <div class="table-responsive table-hover">
        <table class="table align-items-center">
          <thead class="thead-light">
            <th style="width: 5%"></th>
            ${this.getTestata()}
            <th style="width: 5%"></th>
          </thead>
          <tbody>
            <tr v-for="(objectEntity, indexEntity) of entities" :key="indexEntity">
              <${this.templateWord} v-if="objectEntity._id !== undefined">
                <input type="hidden" id="id" :value="objectEntity._id" />
                <td>
                  <i @click="deleteEntity(objectEntity._id)" class="fa fa-minus-circle"></i>
                </td>
                <td v-for="(keyColumn, indexColumn) in Object.keys(propsColumns)"
                  :key="indexColumn">
                  <input type="text" v-model="objectEntity[keyColumn]" readonly="true"
                    class="disableInput"
                    @dblclick="editableCell($event, 1, indexEntity)"
                    @focusout="editableCell($event, 0, indexEntity)"
                    />
                </td>
              </${this.templateWord}>
              <${this.templateWord} v-else>
                <td></td>
                <td v-for="(keyColumn, indexColumn) in Object.keys(propsColumns)"
                  :key="indexColumn">
                  <input type="text" v-model="objectEntity[keyColumn]" />
                </td>
                <td>
                  <i @click="saveEntity(indexEntity)" class="fa fa-check-circle"></i>
                </td>
              </${this.templateWord}>
            </tr>
          </tbody>
        </table>
        <ui-pagination :pages="pages" v-bind:maxPages="5" :numOfResults="numOfResults"
          @clickPage="clickPagePagination">
        </ui-pagination>
        ${this.modalHtml()}
      </div>
    </div>
  </div>
</${this.templateWord}>\n`;
  }
  // eslint-disable-next-line class-methods-use-this
  scriptGridList() {
    return `<${this.scriptWord}>
    import UIPagination from '@/ui-components/shared/UIPagination';
    import {${this.config.urlApi + (this.formFilterGenerator.getColsSelect().length > 0 ? ', API_DOMINIO' : '')}}from '@/services/constant-services';
    import HttpCall from '@/services/HttpCall';
    import { Utility } from '@/utilities/utility';
    import InputCheckBox from '@/ui-components/input-components/InputCheckBox';
    ${this.getImportFilterForm()}
    ${this.importModal()}

    export default {
      data() {
        return {
          entities: [],
          pages: 0,
          numOfResults: 0,
          httpCall: new HttpCall(${this.config.urlApi}),
          propsColumns: ${this.propsColumns()},
          ${this.dataForFiltersForm()}
          ${this.attributesModal()}
        };
      },
      components: {
        'ui-pagination': UIPagination,
        'input-checkbox': InputCheckBox,
        ${this.getComponentFilterForm()}
        ${this.getComponentModal()}
      },
      created() {
        this.getEntities(1);
        ${this.formFilterGenerator.getColsSelect().length > 0 ? 'this.getDominios();' : ''}
      },
      methods: {
        clickPagePagination(page, rowsPerPage) {
          this.getEntities(page, rowsPerPage);
        },
        getEntities(page, rowsPerPage) {
          let filterString = '';
          if (this.entity) {
            let filterArray = Object.keys(this.entity)
              .filter(keyFilter => this.entity[keyFilter] && this.propsFilterEntity[keyFilter].type !== 'range')
              .map(keyFilter => ${this.backTickWord}${this.braceWord}keyFilter}.${this.braceWord}this.propsFilterEntity[keyFilter].type}=${this.braceWord}this.entity[keyFilter]}${this.backTickWord});

            const filterDateArray = Object.keys(this.entity)
              .filter(keyFilter => this.entity[keyFilter] && this.propsFilterEntity[keyFilter].type === 'range')
              .map(keyFilter => ${this.backTickWord}${this.braceWord}keyFilter}.greaterThanEqual=${this.braceWord}this.entity[keyFilter][0]}&${this.braceWord}keyFilter}.lessThanEqual=${this.braceWord}this.entity[keyFilter][1]}${this.backTickWord});

            filterArray = filterArray.concat(filterDateArray);
            filterString += filterArray.length > 0 ? ${this.backTickWord}&${this.braceWord}filterArray.join('&')}${this.backTickWord} : '';
          }
          const params = ${this.backTickWord}?page=${this.braceWord}page}${this.braceWord}filterString}${this.backTickWord};
          if (rowsPerPage) params += ${this.backTickWord}&rowsPerPage=${this.braceWord}rowsPerPage}${this.backTickWord};
          this.httpCall.get(params).then((data) => {
            this.entities = Utility.createArrayByConfigV2(data.entities, this.propsColumns);
            this.pages = data.pages;
            this.numOfResults = data.numOfResults;
          });
        },
        filter(filterObj) {
          const filterArray = Object.keys(filterObj)
            .filter(keyFilter => filterObj[keyFilter])
            .map(keyFilter => ${this.backTickWord}${this.braceWord}keyFilter}.contains=${this.braceWord}filterObj[keyFilter]}${this.backTickWord});
          const params = filterArray.join('&');
          this.getEntities(1, params);
        },
        createEntity() {
          const obj = {};
          this.config.cols.forEach((config) => {
            obj[config.field] = '';
          });
          return obj;
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
        editableCell(event, edit, entityIndex) {
          if (edit) {
            event.target.removeAttribute('readonly');
            event.target.removeAttribute('class');
          } else if (event.target.getAttribute('readonly') !== 'readonly') {
            event.target.setAttribute('readonly', 'readonly');
            event.target.setAttribute('class', 'disableInput');
            this.saveEntity(entityIndex);
          }
        },
        saveEntity(entityIndex) {
          const entity = this.entities[entityIndex];
          // eslint-disable-next-line no-underscore-dangle
          const id = entity._id;
          if (id !== undefined) {
            this.httpCall
              .update(id, entity)
              .then(() => this.getEntities(this.currentPage));
          } else {
            this.httpCall
              .create(entity)
              .then(() => this.getEntities(this.currentPage));
          }
        },
        showDetails(entityIndex) {
          if (this.flagShowDetails) this.reloadFormPaginationComponent = true;
          else this.flagShowDetails = true;

          this.configDetails.urlApiWithId = ${this.backTickWord}${this.braceWord}this.configDetails.urlApi}/${this.braceWord}entityIndex}${this.backTickWord};
        },
        onFinishReloadFormPagination() {
          this.reloadFormPaginationComponent = false;
        },
        ${this.getMethodsFilter()}
        ${this.getMethodsModal()}
      },
    };
    </${this.scriptWord}>`;
  }
  // eslint-disable-next-line class-methods-use-this
  styleGridList() {
    return `<${this.styleWord}>
    .disableInput {
      border: none;
      outline: none;
      background: transparent;
      border: 0px;
    }
    .fa {
      cursor: pointer;
    }
    .fa-check-circle:hover {
      color: green;
    }

    .fa-minus-circle:hover {
      color: red;
    }
    .fa-list-ul:hover {
      color: blue;
    }

    tr:hover {
      background: #f6f9fc;
    }
    </${this.styleWord}>`;
  }
  setConfigFilterForm() {
    this.configFilterList = this.config.cols.filter(config => config.filter);
    if (this.configFilterList.length > 0) {
      const sectionFilter = {};
      sectionFilter.label = 'Filtri Ricerca';
      const filterRows = [];
      this.configFilterList.forEach((config) => {
        filterRows.push({ field: config.field,
          type: config.type,
          bindField: config.field,
          label: config.label,
          configType: config.configType });
      });
      sectionFilter.rows = [];
      sectionFilter.rows[0] = filterRows;
      const configFormFilter = {};
      configFormFilter.isFilter = true;
      configFormFilter.numCols = '2';
      configFormFilter.sections = [];
      configFormFilter.sections[0] = sectionFilter;
      return configFormFilter;
    }
    return [];
  }
  getHtmlFilterForm() {
    return this.formFilterGenerator ? this.formFilterGenerator.templateForm() : '';
  }
  getTestata() {
    let testata = '';
    this.config.cols.forEach((config) => {
      if (testata !== '') {
        testata += `
            `;
      }
      testata += `<th class="sort">
              ${config.label}
            </th>`;
    });
    return testata;
  }
  getImportFilterForm() {
    return this.formFilterGenerator ? `import InputAutocomplete from '@/ui-components/input-components/InputAutocomplete';
    import InputSelect from '@/ui-components/input-components/InputSelect';
    import InputText from '@/ui-components/input-components/InputText';
    import InputPassword from '@/ui-components/input-components/InputPassword';
    import InputNumber from '@/ui-components/input-components/InputNumber';
    import InputDate from '@/ui-components/input-components/InputDate';
    import InputDateRange from '@/ui-components/input-components/InputDateRange';
    import InputMoney from '@/ui-components/input-components/InputMoney';
    import InputTextArea from '@/ui-components/input-components/InputTextArea';` : '';
  }
  propsColumns() {
    let objString = '{';
    this.config.cols.forEach((col) => {
      objString += `${col.field}: { bind:'${col.bindField ? col.bindField : col.field}', type: '${col.type}'},\n`;
    });
    // eslint-disable-next-line prefer-template
    return objString + '}';
  }
  dataForFiltersForm() {
    let entityFilter = '';
    if (this.formFilterGenerator) {
      entityFilter += `invisibleFields: {},
        readonlyFields: {}
        , disableBtnResetFilters: true
        , entity: ${this.formFilterGenerator.getEntity()},
        ${this.formFilterGenerator.dataConfigTypesForAutocomplete()}
        ${this.formFilterGenerator.dataDominiForSelect()}`;
      const propsFilterEntity = JSON.parse(this.formFilterGenerator.getPropsFields(true));
      this.config.cols
        .filter(col => col.filter)
        .forEach((col) => {
          propsFilterEntity[col.field].type = col.filter.type;
        });

      entityFilter += `propsFilterEntity: ${JSON.stringify(propsFilterEntity)
        .replaceAll('":', ':')
        .replaceAll('{"', '{')
        .replaceAll(',"', ',')
        .replaceAll('"', '\'')}`;
    }
    return entityFilter;
  }
  getMethodsFilter() {
    return this.formFilterGenerator ? `onFind() {
      this.disableBtnResetFilters = false;
      this.getEntities(1);
    },
    onReset() {
      Object.keys(this.entity).forEach(
        (key) => { this.entity[key] = ''; },
      );
      this.onFind();
      this.disableBtnResetFilters = true;
    },
    ${this.formFilterGenerator.methodDominiForSelect()}` : '';
  }
  getComponentFilterForm() {
    return this.formFilterGenerator ? `          'input-autocomplete': InputAutocomplete,
    'input-select': InputSelect,
    'input-text': InputText,
    'input-password': InputPassword,
    'input-number': InputNumber,
    'input-date': InputDate,
    'input-money': InputMoney,
    'input-textarea': InputTextArea,` : '';
  }
  modalHtml() {
    return this.config.hasModal ? `<modal v-show="isModalVisible" @close="closeModal">
    <template v-slot:body>
    </template>
  </modal>` : '';
  }
  getMethodsModal() {
    return this.config.hasModal ? `showModal() {
      this.isModalVisible = true;
    },
    closeModal() {
      this.currentProdottoId = '';
      this.isModalVisible = false;
    },` : '';
  }
  getComponentModal() {
    return this.config.hasModal ? 'modal: Modal,' : '';
  }
  importModal() {
    return this.config.hasModal ? 'import Modal from \'@/pages/shared/components/Modal\'' : '';
  }
  attributesModal() {
    return this.config.hasModal ? ', isModalVisible: false,' : '';
  }
}
