<template>
    <div>
        <ui-grid-list
      :config="configGridList"
      :urlApi="urlApi"
    ></ui-grid-list>
    </div>
</template>

<script>
import { API_MARCA } from './../../../../services/constant-services';
import UIGridList from './../../../../ui-components/UIGridList';
import ConfigGridList from './MarcaGridList.json';

export default {
  name: 'MarcaGridList',
  data() {
    return {
      urlApi: API_MARCA,
      configGridList: ConfigGridList,
    };
  },
  components: {
    'ui-grid-list': UIGridList,
  },
};
</script>
