<template>
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
              {{ entity[column.field] }}
            </td>
            <td>
              <router-link :to="'edit/'+entity._id"><i class="fas fa-edit"></i></router-link>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
import HttpCall from '../../../../services/HttpCall';
import { Utility } from '../../../../utilities/utility';
import ConfigPagination from './InventarioPagination.json';
import { API_INVENTARIO } from './../../../../services/constant-services';

export default {
  props: {
    title: {
      type: String,
      value: '',
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
      httpCall: new HttpCall(API_INVENTARIO),
      configPagination: ConfigPagination,
    };
  },
  created() {
    this.getEntities(1);
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
