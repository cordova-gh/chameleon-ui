<template>
  <div class="card">
    <div class="card-header border-0">
      <h3 class="text-uppercase ls-1 text-primary py-3 mb-0">{{title}}</h3>
    </div>
    <div class="card-body">
      <div id="left">
        <div class="table-responsive">
          <table class="table align-items-center">
            <thead class="thead-light">
              <th style="width: 5%"></th>
              <th v-for="(column, index) in config" :key="index">{{column.label}}</th>
              <th style="width: 5%"></th>
            </thead>
            <tbody>
              <tr v-for="(entity, indexEntity) of entities" :key="indexEntity">
                <template v-if="entity._id!==undefined">
                  <input type="hidden" id="id" :value="entity._id" />
                  <td>
                    <i @click="deleteEntity(entity._id)" class="fa fa-minus-circle"></i>
                  </td>
                  <td v-for="(column, indexColumn) in config" :key="indexColumn">
                    <input
                      type="text"
                      v-model="entity[column.field]"
                      readonly="true"
                      class="disableInput"
                      @dblclick="editableCell($event, 1, indexEntity)"
                      @focusout="editableCell($event, 0, indexEntity)"
                    />
                  </td>
                  <td>
                    <i v-if="manageDetails" @click="showDetails(entity._id)"
                    class="fa fa-list-ul"></i>
                  </td>
                </template>
                <template v-else>
                  <td></td>
                  <td v-for="(column, indexColumn) in config" :key="indexColumn">
                    <input type="text" v-model="entity[column.field]" />
                  </td>
                  <td>
                    <i @click="saveEntity(indexEntity)" class="fa fa-check-circle"></i>
                  </td>
                </template>
              </tr>
            </tbody>
          </table>
          <nav aria-label="Page navigation example">
            <ul class="pagination justify-content-end">
              <div v-for="(page, idxPage) of pages" :key="idxPage">
                <template v-if="currentPage === page" >
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
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import HttpCall from '../services/HttpCall';

export default {
  props: {
    urlApi: {
      type: String,
    },
    title: {
      type: String,
    },
    config: {
      type: Array,
    },
    manageDetails: {
      type: Boolean,
      default: false,
    },
    configDetails: {
      type: Object,
    },
  },
  data() {
    return {
      entities: [],
      modePage: 'LIST',
      pages: 0,
      currentPage: 1,
      httpCall: new HttpCall(this.urlApi),
      flagShowDetails: false,
      reloadFormPaginationComponent: false,
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
        // eslint-disable-next-line no-console
        console.log(data, this.config);
        this.entities = data.entities;
        this.entities.push(this.createEntity());
        this.pages = data.pages;
      });
    },
    createEntity() {
      const obj = {};
      this.config.forEach((config) => {
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

      this.configDetails.urlApiWithId =
        `${this.configDetails.urlApi}/${entityIndex}`;
    },
    onFinishReloadFormPagination() {
      this.reloadFormPaginationComponent = false;
    },
  },
};
</script>
<style>
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


</style>
