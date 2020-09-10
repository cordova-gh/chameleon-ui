<template>
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
</template>
<script>
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
      const params = `?page=${this.currentPage}`;
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
        .map(keyFilter => `${keyFilter}=${filterObj[keyFilter]}`);
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
</script>
<style lang="css">
.fa {
  cursor: pointer;
}
.fas {
  cursor: pointer;
}
</style>
