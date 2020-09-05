<template>
  <div>
    <title-page :titolo= "titolo"></title-page>
    <router-link to="new">New</router-link>
    <router-view></router-view>
  </div>
</template>
<script>
import TitlePage from './../../shared/components/TitlePage';

export default {
  name: 'Anagrafica',
  data() {
    return {
      titolo: 'Anagrafica fornitore/cliente',
    };
  },
  components: {
    // eslint-disable-next-line no-undef
    'title-page': TitlePage,
  },
};
</script>
