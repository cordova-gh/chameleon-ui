<template>
  <div>
    <ui-pagination
      :config="configPagination"
      :urlApi="urlApi"
    ></ui-pagination>
  </div>
</template>
<script>
import { API_USER } from './../../../../services/constant-services';
import UIPagination from './../../../../ui-components/UIPagination';
import ConfigPagination from './UserPagination.json';

export default {
  name: 'UserPagination',
  data() {
    return {
      urlApi: API_USER,
      configPagination: ConfigPagination,
    };
  },
  components: {
    'ui-pagination': UIPagination,
  },
};
</script>
