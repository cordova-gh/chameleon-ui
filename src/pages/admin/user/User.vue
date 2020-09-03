<template>
  <div>
    <title-page :titolo="titolo"></title-page>
    <router-link to="new"> New  </router-link>
    <router-view></router-view>
  </div>
</template>
<script>
import UserPagination from './pagination/UserPagination.vue';
import TitlePage from './../../shared/components/TitlePage';

export default {
  name: 'User',
  data() {
    return {
      titolo: 'Utenti ',
    };
  },
  components: {
    'user-pagination': UserPagination,
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
