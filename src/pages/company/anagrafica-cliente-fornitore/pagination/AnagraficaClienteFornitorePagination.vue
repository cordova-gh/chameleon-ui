<template>
    <div class="container">
        <ui-pagination
        :config="configPagination"
        :urlApi="urlApi"></ui-pagination>
    </div>
</template>
<script>
import { API_FORNITORE_CLIENTE } from '../../../../services/constant-services';
import UIPagination from '../../../../ui-components/UIPagination';
import ConfigPagination from './AnagraficaClienteFornitorePagination.json';

export default {
  name: 'UserPagination',
  data() {
    return {
      urlApi: API_FORNITORE_CLIENTE,
      configPagination: ConfigPagination,
    };
  },
  components: {
    'ui-pagination': UIPagination,
  },
};
</script>
