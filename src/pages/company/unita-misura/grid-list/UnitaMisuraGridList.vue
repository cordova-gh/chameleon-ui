<template>
    <div>
        <ui-grid-list
      :config="configGridList"
      :urlApi="urlApi"
    ></ui-grid-list>
    </div>
</template>

<script>
import { API_UNITA_MISURA } from './../../../../services/constant-services';
import UIGridList from './../../../../ui-components/UIGridList';
import ConfigGridList from './UnitaMisuraGridList.json';

export default {
  name: 'UnitaMisuraGridList',
  data() {
    return {
      urlApi: API_UNITA_MISURA,
      configGridList: ConfigGridList,
    };
  },
  components: {
    'ui-grid-list': UIGridList,
  },
};
</script>
