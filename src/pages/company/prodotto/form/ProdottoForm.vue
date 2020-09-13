<template>
  <div class="container">
    <ui-form
    title="Prodotto"
    :config="configForm"
    :urlApi="urlApi"
    :currentId="currentId"></ui-form>
  </div>
</template>
<script>
import { API_PRODOTTO } from '../../../../services/constant-services';
import UIForm from '../../../../ui-components/UIForm';
import TitlePage from '../../../shared/components/TitlePage';
import ConfigForm from './ProdottoForm.json';

export default {
  name: 'UserForm',
  data() {
    return {
      urlApi: API_PRODOTTO,
      currentId: '',
      configForm: ConfigForm,
    };
  },
  created() {
    this.currentId = this.$route.params.id;
  },
  components: {
    'ui-form': UIForm,
    'title-page': TitlePage,
  },
};
</script>
