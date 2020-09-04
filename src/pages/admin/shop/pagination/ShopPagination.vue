<template>
  <div>
    <ui-pagination
      :config="configPagination"
      :urlApi="urlApi"
    ></ui-pagination>
  </div>
</template>
<script>
import { API_SHOP } from './../../../../services/constant-services';
import UIPagination from './../../../../ui-components/UIPagination';
import ConfigPagination from './ShopPagination.json';

export default {
  name: 'UserPagination',
  data() {
    return {
      urlApi: API_SHOP,
      configPagination: ConfigPagination,
    };
  },
  components: {
    'ui-pagination': UIPagination,
  },
};
</script>
