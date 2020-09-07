<template>
  <div>
    <ui-grid-list
      :config="configGridList"
      :urlApi="urlApi"
    ></ui-grid-list>
  </div>
</template>
<script>
import { API_COUNTRY } from './../../../../services/constant-services';
import UIGridList from './../../../../ui-components/UIGridList';
import ConfigGridList from './CountryGridList.json';

export default {
  name: 'CountryGridList',
  data() {
    return {
      urlApi: API_COUNTRY,
      configGridList: ConfigGridList,
    };
  },
  components: {
    'ui-grid-list': UIGridList,
  },
};
</script>
