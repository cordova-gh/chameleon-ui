<template>
  <div id="app">
    <router-view></router-view>
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

html {
  font-family: "Sailec-Regular", system-ui, -apple-system, BlinkMacSystemFont
  , Segoe UI, Roboto, Helvetica Neue, Helvetica, Arial, sans-serif;
  font-size: 0.85rem;
  line-height: 1;
  color: #0d2d6b !important;
  -webkit-text-size-adjust: 100%;
  -webkit-tap-highlight-color: rgba(235, 204, 204, 0);
}


@include media-breakpoint-up(sm) {
    html {
        font-size: 1rem;
    }
}

@include media-breakpoint-up(md) {
    html {
        font-size: 1.2rem;
    }
}

@include media-breakpoint-up(lg) {
    html {
        font-size: 1.4rem;
    }
}
</style>
