import UIFormGenerator from './UIFormGenerator';

export default class UITableGenerator {
  templateWord = 'template';
  scriptWord = 'script';
  styleWord = 'style';
  braceWord = '${';
  backTickWord = '`';
  configFilterForm = null;
  importFilter='';
  fromFilterGenerator = null;
  constructor(config) {
    this.config = config;
    this.configFilterForm = this.setConfigFilterForm();
    if (this.configFilterForm) {
      this.fromFilterGenerator = new UIFormGenerator(this.configFilterForm);
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
  <div class="container box-container my-2 py-5">
    <div class="container">
      <div class="table-responsive table-hover">
        <table class="table align-items-center">
          <thead class="thead-light">
            <th style="width: 5%"></th>
              ${this.getTestata()}
            <th style="width: 5%"></th>
          </thead>
          <tbody>
            <tr v-for="entity of entities" :key="entity.id">
              <td>
                <i @click="deleteEntity(entity._id)" class="fa fa-minus-circle"
                ></i>
              </td>
              <td v-for="(keyColumn, indexColumn) in Object.keys(propsColumns)" :key="indexColumn">
                <template v-if="propsColumns[keyColumn].type === 'checkbox'">
                  <input-checkbox v-model="entity[keyColumn]" v-bind:isReadonly="true">
                  </input-checkbox>
                </template>
                <template v-else>
                  {{ entity[keyColumn] }}
                </template>
              </td>
              <td>
                <router-link :to="'edit/' + entity._id">
                  <i class="fas fa-edit">
                  </i>
                </router-link>
              </td>
            </tr>
          </tbody>
        </table>
        <ui-pagination :pages="pages" v-bind:maxPages="5" @clickPage="clickPagePagination">
        </ui-pagination>
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
import {${this.config.urlApi}}from '@/services/constant-services';
import HttpCall from '@/services/HttpCall';
import { Utility } from '@/utilities/utility';
import InputCheckBox from '@/ui-components/input-components/InputCheckBox';
${this.getImportFilterForm()}

export default {
data() {
  return {
    entities: [],
    pages: 0,
    httpCall: new HttpCall(${this.config.urlApi}),
    propsColumns: ${this.propsColumns()},
    ${this.getPropsFilter()}
  };
},
components: {
  'input-checkbox': InputCheckBox,
  'ui-pagination': UIPagination,
  ${this.getComponentFilterForm()}
},
created() {
  this.getEntities(1);
},
methods: {
  clickPagePagination(page) {
    this.getEntities(page);
  },
  getEntities(page) {
    let filterString = '';
    if (this.entity) {
      let filterArray = [];
      filterArray = Object.keys(this.entity)
        .filter(keyFilter => this.entity[keyFilter])
        .map(keyFilter => ${this.backTickWord}${this.braceWord}keyFilter}.${this.braceWord}this.propsFilterEntity[keyFilter].type}=${this.braceWord}this.entity[keyFilter]}${this.backTickWord});
      filterString = filterArray.length > 0 ? ${this.backTickWord}&${this.braceWord}filterArray.join('&')}${this.backTickWord} : '';
    }
    const params = ${this.backTickWord}?page=${this.braceWord}page}${this.braceWord}filterString}${this.backTickWord};
    this.httpCall.get(params).then((data) => {
      this.entities = Utility.createArrayByConfigV2(data.entities, this.propsColumns);
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
  ${this.getMethodFilter()}
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
          label: config.label });
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
    return this.fromFilterGenerator ? this.fromFilterGenerator.templateForm() : '';
  }
  getImportFilterForm() {
    return this.fromFilterGenerator ? `import InputAutocomplete from '@/ui-components/input-components/InputAutocomplete';
    import InputSelect from '@/ui-components/input-components/InputSelect';
    import InputText from '@/ui-components/input-components/InputText';
    import InputPassword from '@/ui-components/input-components/InputPassword';
    import InputNumber from '@/ui-components/input-components/InputNumber';
    import InputDate from '@/ui-components/input-components/InputDate';
    import InputMoney from '@/ui-components/input-components/InputMoney';
    import InputTextArea from '@/ui-components/input-components/InputTextArea';` : '';
  }
  getComponentFilterForm() {
    return this.fromFilterGenerator ? `          'input-autocomplete': InputAutocomplete,
    'input-select': InputSelect,
    'input-text': InputText,
    'input-password': InputPassword,
    'input-number': InputNumber,
    'input-date': InputDate,
    'input-money': InputMoney,
    'input-textarea': InputTextArea,` : '';
  }
  getPropsFilter() {
    let entityFilter = '';
    if (this.fromFilterGenerator) {
      entityFilter += `invisibleFields: {},
        readonlyFields: {}
        , disableBtnResetFilters: true
        , entity: ${this.fromFilterGenerator.getEntity()}`;
      const propsFilterEntity = JSON.parse(this.fromFilterGenerator.getPropsFields(true));
      this.config.cols
        .filter(col => col.filter)
        .forEach((col) => {
          propsFilterEntity[col.field].type = col.filter.type;
        });

      entityFilter += `, propsFilterEntity: ${JSON.stringify(propsFilterEntity)
        .replaceAll('":', ':')
        .replaceAll('{"', '{')
        .replaceAll(',"', ',')
        .replaceAll('"', '\'')}`;
    }
    return entityFilter;
  }
  getMethodFilter() {
    return this.fromFilterGenerator ? `onFind() {
      this.disableBtnResetFilters = false;
      this.getEntities(1);
    },
    onReset() {
      Object.keys(this.entity).forEach(
        (key) => { this.entity[key] = ''; },
      );
      this.onFind();
      this.disableBtnResetFilters = true;
    },` : '';
  }
}

