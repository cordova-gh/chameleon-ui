<template>
    <div>
        <ui-pagination
      :config="profilePagination"
      :urlApi="urlApi"
    ></ui-pagination>
    </div>
</template>

<script>
import { API_PROFILE } from './../../../../services/constant-services';
import UIPagination from './../../../../ui-components/UIPagination';
import ConfigPagination from './ProfilePagination.json';

export default {
  name: 'ProfilePagination',
  data() {
    return {
      urlApi: API_PROFILE,
      profilePagination: ConfigPagination,
    };
  },
  components: {
    'ui-pagination': UIPagination,
  },
};
</script>
