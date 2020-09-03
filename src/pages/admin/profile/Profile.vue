<template>
    <div>
        <title-page titolo = "Profile"></title-page>
                <router-link to="new">New</router-link>
        <router-view></router-view>
    </div>
</template>

<script>
import TitlePage from './../../shared/components/TitlePage';

export default {
  name: 'profile',
  components: {
    // eslint-disable-next-line no-undef
    'title-page': TitlePage,
  },
};
</script>
