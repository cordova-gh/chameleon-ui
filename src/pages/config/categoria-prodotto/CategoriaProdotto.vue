<template>
    <div>
       <title-page titolo="Categoria Prodotti"></title-page>
       <router-view></router-view>
    </div>
</template>

<script>
import TitlePage from './../../shared/components/TitlePage';

export default {
  name: 'categoria-prodotto',
  components: {
    // eslint-disable-next-line no-undef
    'title-page': TitlePage,
  },
};
</script>
