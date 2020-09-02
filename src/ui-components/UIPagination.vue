<template>
  <div class="card">
    <div v-if="title!==''" class="card-header border-0">
      <div class="row">
        <div class="col-sm">
          <h3 class="text-uppercase ls-1 text-primary py-3 mb-0">{{title}}</h3>
        </div>
      </div>
    </div>
    <div class="card-body">
      <div v-if="showButtonPlus" class="pr-4 pb-1 row justify-content-end">
        <i class="fas fa-plus-circle" @click="newEntity()"></i>
      </div>
      <div class="table-responsive">
        <table class="table align-items-center">
          <thead class="thead-light">
            <th style="width: 5%"></th>
            <th v-for="(column, index) in config" :key="index" class="sort">{{column.label}}</th>
            <th style="width: 5%"></th>
          </thead>
          <tbody>
            <tr v-for="entity of entities"  :key="entity.id">
              <td>
                <i @click="deleteEntity(entity._id)" class="fa fa-minus-circle"></i>
              </td>
              <td
                v-for="(column, indexColumn) in config"
                :key="indexColumn"
              >{{entity[column.field]}}</td>
              <td>
                <i class="fas fa-edit" @click="modifyEntity(entity._id)"></i>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <nav aria-label="Page navigation example">
      <ul class="pagination justify-content-end">
        <div v-for="page of pages" :key="page.id">
          <template v-if="currentPage === page">
            <li class="page-item active">
              <a class="page-link">{{page}}</a>
            </li>
          </template>
          <template v-else>
            <li class="page-item">
              <a class="page-link" @click="getEntities(page)">{{page}}</a>
            </li>
          </template>
        </div>
      </ul>
    </nav>
    <div
      class="modal fade"
      id="exampleModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">...</div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary">Save changes</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import HttpCall from '../services/HttpCall';
import { Utility } from '../utilities/utility';

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
    };
  },
  created() {
    this.getEntities(1);
  },
  methods: {
    getEntities(page) {
      this.currentPage = page;
      const params = `?page=${this.currentPage}`;
      this.httpCall.get(params)
        .then((data) => {
          // eslint-disable-next-line no-console
          console.log(data);
          this.entities = Utility.createArrayByConfig(
            data.entities,
            this.config,
          );
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
