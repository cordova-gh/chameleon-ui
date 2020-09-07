<template>
  <div>
    <div class="p-4 bg-secondary">
      <input type="text" placeholder="Collection" v-model="collectionName" class="form-control" />
      <div class="custom-file">
        <input
          type="file"
          class="custom-file-input"
          id="customFileLang"
          lang="en"
          @change="onFileChange"
          ref="file"
          accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet
          , application/vnd.ms-excel"
        />
        <label class="custom-file-label" for="customFileLang">Select file</label>
      </div>
    </div>
    <div class="table-responsive">
      <div v-if="showTable" class="table">
        <table class="table align-items-center">
          <thead class="thead-light">
            <th v-for="(item, idx) of header" :key="idx">{{item}}</th>
          </thead>
          <tbody class="list">
            <tr v-for="(dataRow, idxRow) of rows" :key="idxRow">
              <td v-for="(column, idxCol) of dataRow" :key="idxCol">{{column}}</td>
            </tr>
          </tbody>
        </table>
        <input type="button" value="Salva" class="btn btn-primary" @click="salvaFile" />
      </div>
    </div>
  </div>
</template>
<script>
import { API_FILE } from './../../../services/constant-services';
import HttpCall from './../../../services/HttpCall';

export default {
  data() {
    return {
      header: [],
      rows: [],
      showTable: false,
      file: Blob,
      collectionName: '',
      httpCall: new HttpCall(API_FILE),
    };
  },
  methods: {
    onFileChange() {
      // this.file = e.target.files[0];
      this.file = this.$refs.file.files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        const rowsFile = event.target.result.split(/\r?\n/);
        // testata e una riga
        if (rowsFile.length > 1) {
          this.header = rowsFile[0].split(';');
          for (let index = 1; index < rowsFile.length; index = +1) {
            this.rows[index - 1] = rowsFile[index].split(';');
          }
          this.showTable = true;
          // eslint-disable-next-line no-console
          console.log('rows', this.rows);
        }
      };
      reader.readAsText(this.file);
    },
    salvaFile() {
      const formData = new FormData();
      formData.append('file', this.file);
      formData.append('collectionName', this.collectionName);
      this.httpCall.sendFile('/upload', formData).then(() => {
        // eslint-disable-next-line no-console
        console.log('SUCCESS!!');
      })
        .catch(() => {
          // eslint-disable-next-line no-console
          console.log('FAILURE!!');
        });
    },
  },
};
</script>
