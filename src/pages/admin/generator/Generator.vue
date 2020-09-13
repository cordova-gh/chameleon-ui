<template>
  <div class="container">
    <div class="row">
      <input type="radio" v-model="tipoComponente" name="drone" value="form"/>  Form
      <input type="radio" v-model="tipoComponente" name="drone" value="grid-list"  />  GridList
      <input type="radio" v-model="tipoComponente" name="drone" value="pagination"  />  Pagination
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
import FormGenerator from './FormGenerator';
import GridListGenerator from './GridListGenerator';
import PaginationGenerator from './PaginationGenerator';

export default {
  name: 'button',
  data() {
    return {
      tipoComponente: '',
      config: '',
      codeString: '',
      file: Blob,
    };
  },
  methods: {
    gComponent() {
      this.file = this.$refs.file.files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        this.config = JSON.parse(event.target.result);
        switch (this.tipoComponente) {
          case 'form': {
            const formGenerator = new FormGenerator(this.config);
            this.codeString = formGenerator.generate();
            break;
          }
          case 'pagination': {
            const paginationGenerator = new PaginationGenerator(this.config);
            this.codeString = paginationGenerator.generate();
            break;
          }
          case 'grid-list': {
            const gridListGenerator = new GridListGenerator(this.config);
            this.codeString = gridListGenerator.generate();
            break;
          }
          default: {
            // eslint-disable-next-line no-alert
            alert('selezionare il tipo componente da generare');
          }
        }
      };
      reader.readAsText(this.file);
    },
  },
};
</script>
