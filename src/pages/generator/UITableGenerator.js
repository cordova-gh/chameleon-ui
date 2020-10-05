import UIFormGenerator from './UIFormGenerator';

export default class UITableGenerator {
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
    return this.templateTable() + this.scriptTable() + this.styleTable();
  }
  templateTable() {
    // eslint-disable-next-line quotes
    return `
<${this.templateWord}>
  <div>
  ${this.getHtmlFilterForm()}
  <div class="container shadow p-2 mb-3 bg-white rounded">
    <div class="container">
      <div class="table-responsive table-hover">
        <table class="table align-items-center">
          <thead class="thead-light">
            <th style="width: 5%"></th>
              ${this.getTestata()}
            <th style="width: 5%"></th>
          </thead>
          <tbody>
            <tr v-for="objectEntity of entities" :key="objectEntity.id">
              <td>
                <i @click="deleteEntity(objectEntity._id)" class="fa fa-minus-circle"
                ></i>
              </td>
              <td v-for="(keyColumn, indexColumn) in Object.keys(propsColumns)" :key="indexColumn">
                <template v-if="propsColumns[keyColumn].type === 'checkbox'">
                  <input-checkbox v-model="objectEntity[keyColumn]" v-bind:isReadonly="true">
                  </input-checkbox>
                </template>
                <template v-if="propsColumns[keyColumn].type.includes('date')">
                  {{ objectEntity[keyColumn] | formatDate('DD/MM/YYYY') }}
                </template>
                <template v-else>
                  {{ objectEntity[keyColumn] }}
                </template>
              </td>
              <td>
                <router-link :to="'edit/' + objectEntity._id">
                  <i class="fas fa-edit">
                  </i>
                </router-link>
              </td>
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
</div>
</${this.templateWord}>`;
  }
  scriptTable() {
    // eslint-disable-next-line quotes
    return `
      <${this.scriptWord}>
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
  'input-checkbox': InputCheckBox,
  'ui-pagination': UIPagination,
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
    let params = ${this.backTickWord}?page=${this.braceWord}page}${this.braceWord}filterString}${this.backTickWord};
    if (rowsPerPage) params += ${this.backTickWord}&rowsPerPage=${this.braceWord}rowsPerPage}${this.backTickWord};
    this.httpCall.get(params).then((data) => {
      this.entities = Utility.createArrayByConfigV2(data.entities, this.propsColumns);
      this.pages = data.pages;
      this.numOfResults = data.numOfResults;
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
  ${this.getMethodsFilter()}
  ${this.getMethodsModal()}
},
};
      </${this.scriptWord}>   `;
  }
  // eslint-disable-next-line class-methods-use-this
  styleTable() {
    return `<${this.styleWord}>
    .fa {
      cursor: pointer;
    }
    .fas {
      cursor: pointer;
    } </${this.styleWord}>`;
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
  propsColumns() {
    let objString = '{';
    this.config.cols.forEach((col) => {
      objString += `${col.field}: { bind:'${col.bindField ? col.bindField : col.field}', type: '${col.type}'},\n`;
    });
    // eslint-disable-next-line prefer-template
    return objString + '}';
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
  getComponentFilterForm() {
    return this.formFilterGenerator ? `          'input-autocomplete': InputAutocomplete,
    'input-select': InputSelect,
    'input-text': InputText,
    'input-password': InputPassword,
    'input-number': InputNumber,
    'input-date': InputDate,
    'input-date-range': InputDateRange,
    'input-money': InputMoney,
    'input-textarea': InputTextArea,` : '';
  }
  dataForFiltersForm() {
    let entityFilter = '';
    if (this.formFilterGenerator) {
      entityFilter += `invisibleFields: {},
        readonlyFields: {},
        disableBtnResetFilters: true,
        entity: ${this.formFilterGenerator.getEntity()},
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

