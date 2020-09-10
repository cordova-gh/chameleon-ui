<template>
    <div class="container">
        <ui-pagination
        :config="configPagination"
        :urlApi="urlApi"
        ></ui-pagination>
    </div>
</template>
<script>
import { API_PRODOTTO } from '../../../../services/constant-services';
import UIPagination from '../../../../ui-components/UIPagination';
import ConfigPagination from './ProdottoPagination.json';

export default {
  name: 'ProdottoPagination',
  data() {
    return {
      urlApi: API_PRODOTTO,
      configPagination: ConfigPagination,
    };
  },
  components: {
    'ui-pagination': UIPagination,
  },
};
</script>
