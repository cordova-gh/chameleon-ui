<template>
  <div>
    <title-page :titolo="titolo"></title-page>
    <router-view></router-view>
  </div>
</template>

<script>
import TitlePage from './../../shared/components/TitlePage';

export default {
  name: 'inventario',
  data() {
    return {
      titolo: 'inventario',
    };
  },
  components: {
    // eslint-disable-next-line no-undef
    'title-page': TitlePage,
  },
};
</script>
