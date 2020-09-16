<template>
    <div class="container">
        <ui-table
        :config="configTable"
        :urlApi="urlApi"></ui-table>
    </div>
</template>
<script>
import UITable from '@/ui-components/UITable';
import { API_FORNITORE_CLIENTE } from '../../../../services/constant-services';
import ConfigTable from './AnagraficaClienteFornitoreTable.json';

export default {
  name: 'UserTable',
  data() {
    return {
      urlApi: API_FORNITORE_CLIENTE,
      configTable: ConfigTable,
    };
  },
  components: {
    'ui-table': UITable,
  },
};
</script>
