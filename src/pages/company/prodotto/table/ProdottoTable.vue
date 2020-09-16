<template>
    <div class="container">
        <ui-table
        :config="configTable"
        :urlApi="urlApi"
        ></ui-table>
    </div>
</template>
<script>
import UITable from '@/ui-components/UITable';
import { API_PRODOTTO } from '../../../../services/constant-services';
import ConfigTable from './ProdottoTable.json';

export default {
  name: 'ProdottoTable',
  data() {
    return {
      urlApi: API_PRODOTTO,
      configTable: ConfigTable,
    };
  },
  components: {
    'ui-table': UITable,
  },
};
</script>
