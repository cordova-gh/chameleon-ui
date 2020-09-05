<template>
    <div>
        <ui-pagination
        :config="configPagination"
        :urlApi="urlApi"></ui-pagination>
    </div>
</template>
<script>
import { API_COMPANY } from '../../../../services/constant-services';
import UIPagination from '../../../../ui-components/UIPagination';
import ConfigPagination from './CompanyPagination.json';

export default {
  name: 'UserPagination',
  data() {
    return {
      urlAPi: API_COMPANY,
      configPagination: ConfigPagination,
    };
  },
  components: {
    'ui-pagination': UIPagination,
  },
};
</script>
