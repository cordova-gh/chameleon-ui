<template>
  <div class="container">
    <div class="row pt-5">
      <div class="col-md-12">
        <ui-grid-list
          :config="configGridList"
          :urlApi="urlApi"
        ></ui-grid-list>
      </div>
    </div>
  </div>
</template>
<script>
import UIGridList from './../../../../ui-components/UIGridList';
import ConfigGridList from './DominioGridList.json';
import { API_DOMINIO } from '../../../../services/constant-services';

export default {
  data() {
    return {
      urlApi: API_DOMINIO,
      configGridList: ConfigGridList,
    };
  },
  components: {
    'ui-grid-list': UIGridList,
  },
};
</script>
