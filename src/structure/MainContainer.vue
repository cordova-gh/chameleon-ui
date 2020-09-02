<template>
  <div class="hello">
    <navbar></navbar>
    <main-content></main-content>
  </div>
</template>

<script>
import Navbar from './Navbar';
import MainContent from './MainContent';

export default {
  name: 'Main',
  components: {
    // eslint-disable-next-line quote-props
    'navbar': Navbar,
    // eslint-disable-next-line quote-props
    'main-content': MainContent,
  },
};
</script>

