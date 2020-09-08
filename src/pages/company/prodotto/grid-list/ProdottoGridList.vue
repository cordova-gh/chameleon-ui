<template>
    <div>
        <ui-grid-list
        :config="configGridList"
        :urlApi="urlApi"
        ></ui-grid-list>
    </div>
</template>
<script>
import { API_PRODOTTO } from '../../../../services/constant-services';
import UIGridList from '../../../../ui-components/UIGridList';
import ConfigGridList from './ProdottoGridList.json';

export default {
  name: 'ProdottoGridList',
  data() {
    return {
      urlApi: API_PRODOTTO,
      configGridList: ConfigGridList,
    };
  },
  components: {
    'ui-grid-list': UIGridList,
  },
};
</script>
