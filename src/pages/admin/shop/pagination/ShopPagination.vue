<template>
  <div>
    <ui-pagination
      :config="configPagination"
      :urlApi="urlApi"
    ></ui-pagination>
  </div>
</template>
<script>
import { API_USERS } from './../../../../services/constant-services';
import UIPagination from './../../../../ui-components/UIPagination';
import ConfigPagination from './ShopPagination.json';

export default {
  name: 'UserPagination',
  data() {
    return {
      urlApi: API_USERS,
      configPagination: ConfigPagination,
    };
  },
  components: {
    'ui-pagination': UIPagination,
  },
};
</script>
