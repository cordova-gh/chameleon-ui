<template>
  <div>
    <title-page :titolo="msg"></title-page>
    <user-pagination></user-pagination>
  </div>
</template>
<script>
import UserPagination from './pagination/UserPagination.vue';
import TitlePage from './../../shared/TitlePage';

export default {
  name: 'UserForm',
  data() {
    return {
      msg: 'Welcome in Users ',
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
