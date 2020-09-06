<template>
  <div>
    <ui-pagination
      :config="configPagination"
      :urlApi="urlApi"
    ></ui-pagination>
  </div>
</template>
<script>
import { API_COUNTRY } from './../../../../services/constant-services';
import UIPagination from './../../../../ui-components/UIPagination';
import ConfigPagination from './CountryPagination.json';

export default {
  name: 'UserPagination',
  data() {
    return {
      urlApi: API_COUNTRY,
      configPagination: ConfigPagination,
    };
  },
  components: {
    'ui-pagination': UIPagination,
  },
};
</script>
