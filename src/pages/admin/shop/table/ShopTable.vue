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
import { API_SHOP } from './../../../../services/constant-services';
import ConfigTable from './ShopTable.json';

export default {
  name: 'ShopTable',
  data() {
    return {
      urlApi: API_SHOP,
      configTable: ConfigTable,
    };
  },
  components: {
    'ui-table': UITable,
  },
};
</script>
