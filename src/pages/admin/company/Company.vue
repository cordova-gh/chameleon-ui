<template>
  <div>
    <title-page titolo= "Company"></title-page>
    <router-view></router-view>
  </div>
</template>

<script>
import TitlePage from './../../shared/components/TitlePage';

export default {
  name: 'Company',
  components: {
    'title-page': TitlePage,
  },
};
</script>
