<template>
  <div>
    <ui-table
      :config="configTable"
      :urlApi="urlApi"
    ></ui-table>
  </div>
</template>
<script>
import UITable from '@/ui-components/UITable';
import { API_USER } from './../../../../services/constant-services';
import ConfigTable from './UserTable.json';


export default {
  name: 'UserTable',
  data() {
    return {
      urlApi: API_USER,
      configTable: ConfigTable,
    };
  },
  components: {
    'ui-table': UITable,
  },
};
</script>
