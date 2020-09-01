<template>
  <div>
    <h1>{{ msg }}</h1>
  </div>
</template>
<script>
export default {
  name: 'Home',
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
