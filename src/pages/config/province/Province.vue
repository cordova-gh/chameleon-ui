<template>
    <div>
       <title-page :titolo= "titolo"></title-page>
       <router-view></router-view>
    </div>
</template>

<script>
import TitlePage from './../../shared/components/TitlePage';

export default {
  name: 'provincia',
  data() {
    return {
      titolo: 'Province',
    };
  },
  components: {
    // eslint-disable-next-line no-undef
    'title-page': TitlePage,
  },
};
</script>
