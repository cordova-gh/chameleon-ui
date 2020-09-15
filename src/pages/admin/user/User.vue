<template>
  <div>
    <title-page :titolo="titolo"></title-page>
    <router-link to="new"> New  </router-link>
    <router-view></router-view>
    <button
      type="button"
      class="btn"
      @click="showModal"
    >   Open Modal!
    </button>
    <modal
      v-show="isModalVisible"
      @close="closeModal"
    >
    <template v-slot:body>
        <user-form></user-form>
  </template>
    </modal>
  </div>
</template>
<script>
import UserForm from '@/pages/admin/user/form/UserForm';
import Modal from '@/pages/shared/components/Modal';
import UserPagination from './pagination/UserPagination.vue';
import TitlePage from './../../shared/components/TitlePage';


export default {
  name: 'User',
  data() {
    return {
      titolo: 'Utenti ',
      isModalVisible: false,
    };
  },
  components: {
    'user-pagination': UserPagination,
    'title-page': TitlePage,
    // eslint-disable-next-line quote-props
    'modal': Modal,
    'user-form': UserForm,
  },
  methods: {
    showModal() {
      this.isModalVisible = true;
    },
    closeModal() {
      this.isModalVisible = false;
    },
  },
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1 {
  font-weight: normal,
}
</style>
