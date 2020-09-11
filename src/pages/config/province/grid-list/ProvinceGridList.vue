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
import ConfigGridList from './ProvinceGridList.json';
import { API_PROVINCE } from '../../../../services/constant-services';

export default {
  data() {
    return {
      urlApi: API_PROVINCE,
      configGridList: ConfigGridList,
      configGridListFilter: [],
      configFormFilter: null,
      currentId: null,
    };
  },
  components: {
    'ui-grid-list': UIGridList,
  },
};
</script>
