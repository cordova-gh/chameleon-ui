<template>
  <div>
    <title-page :titolo="titolo"></title-page>
    <router-link to="new"> New  </router-link>
    <router-view></router-view>
  </div>
</template>
<script>
import TitlePage from './../../shared/components/TitlePage';

export default {
  name: 'inventario',
  data() {
    return {
      titolo: 'Inventario ',
    };
  },
  components: {
    'title-page': TitlePage,
  },
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1 {
  font-weight: normal,
}
</style>
