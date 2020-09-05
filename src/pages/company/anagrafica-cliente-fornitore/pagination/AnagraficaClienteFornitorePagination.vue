<template>
    <div>
        <ui-pagination
        :config="configPagination"
        :urlApi="urlApi"></ui-pagination>
    </div>
</template>
<script>
import { API_ANAGRAFICA } from '../../../../services/constant-services';
import UIPagination from '../../../../ui-components/UIPagination';
import ConfigPagination from './AnagraficaClienteFornitorePagination.json';

export default {
  name: 'UserPagination',
  data() {
    return {
      urlAPi: API_ANAGRAFICA,
      configPagination: ConfigPagination,
    };
  },
  components: {
    'ui-pagination': UIPagination,
  },
};
</script>
