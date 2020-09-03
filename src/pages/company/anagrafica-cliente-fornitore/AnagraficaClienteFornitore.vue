<template>
  <div>
    <title-page titolo="Cliente fornitore/clienti"></title-page>
    <router-view></router-view>
  </div>
</template>
<script>
import TitlePage from './../../shared/components/TitlePage';

export default {
  name: 'Anagrafica',
  components: {
    // eslint-disable-next-line no-undef
    'title-page': TitlePage,
  },
};
</script>
