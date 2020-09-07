<template>
    <div>
        <ui-grid-list
      :config="configGridList"
      :urlApi="urlApi"
    ></ui-grid-list>
    </div>
</template>

<script>
import { API_PROFILE } from './../../../../services/constant-services';
import UIGridList from './../../../../ui-components/UIGridList';
import ConfigGridList from './ProfileGridList.json';

export default {
  name: 'ProfileGridList',
  data() {
    return {
      urlApi: API_PROFILE,
      configGridList: ConfigGridList,
    };
  },
  components: {
    'ui-grid-list': UIGridList,
  },
};
</script>
