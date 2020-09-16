<template>
    <div>
        <ui-table
        :config="configTable"
        :urlApi="urlApi"></ui-table>
    </div>
</template>
<script>
import UITable from '@/ui-components/UITable';
import { API_COMPANY } from '../../../../services/constant-services';
import ConfigTable from './CompanyTable.json';

export default {
  name: 'UserTable',
  data() {
    return {
      urlApi: API_COMPANY,
      configTable: ConfigTable,
    };
  },
  components: {
    'ui-table': UITable,
  },
};
</script>
