<template>
  <div>
    <title-page :titolo= "titolo"></title-page>
    <router-link to="new" >New</router-link>
    <router-view></router-view>
  </div>
</template>

<script>
import TitlePage from './../../shared/components/TitlePage';

export default {
  name: 'Company',
  data() {
    return {
      titolo: 'Company',
    };
  },
  components: {
    'title-page': TitlePage,
  },
};
</script>
