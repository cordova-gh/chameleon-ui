<template>
  <div>
    <title-page :titolo="msg"></title-page>
    <router-link to="new"> New  </router-link>
    <router-view></router-view>
  </div>
</template>
<script>
import TitlePage from './../../shared/components/TitlePage';

export default {
  name: 'UserForm',
  data() {
    return {
      msg: 'Country',
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
