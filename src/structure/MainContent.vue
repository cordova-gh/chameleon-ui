<template>
  <div>
    <router-view />
    <spinner></spinner>
  </div>
</template>
<script>
import Spinner from './../pages/shared/Spinner';

export default {
  name: 'MainContent',
  components: {
    // eslint-disable-next-line quote-props
    'spinner': Spinner,
  },
};
</script>
