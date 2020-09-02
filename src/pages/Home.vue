<template>
  <div>
    <title-page :titolo = "msg"></title-page>
    <!-- <h1>{{ msg }}</h1> -->
  </div>
</template>
<script>
import TitlePage from './shared/TitlePage';

export default {
  name: 'Home',
  components: {
    // eslint-disable-next-line no-undef
    'title-page': TitlePage,
  },
  data() {
    return {
      msg: 'Welcome in Chameleon ',
    };
  },
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1 {
  font-weight: normal;
}

</style>
