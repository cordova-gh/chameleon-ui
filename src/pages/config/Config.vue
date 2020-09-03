<template>
  <div>
    <router-view></router-view>
  </div>
</template>
<script>

export default {
  name: 'Config',
  data() {
    return {
      msg: 'Welcome in Users ',
    };
  },
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1 {
  font-weight: normal,
}
</style>
