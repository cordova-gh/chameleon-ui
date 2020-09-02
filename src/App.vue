<template>
  <div id="app">
    <main-container></main-container>
  </div>
</template>

<script>
import MainContainer from './structure/MainContainer';

export default {
  name: 'App',
  components: {
    // eslint-disable-next-line quote-props
    'main-container': MainContainer,
  },
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
