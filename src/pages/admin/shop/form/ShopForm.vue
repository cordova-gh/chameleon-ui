<template>
  <div>
    <title-page :titolo="titoloPagina"></title-page>
    <ui-form
      title="Dati Personali"
      :config="configForm"
      :urlApi="urlApi"
      :currentId="currentId"
    ></ui-form>
  </div>
</template>
<script>
import { API_SHOP } from './../../../../services/constant-services';
import UIForm from './../../../../ui-components/UIForm';
import TitlePage from './../../../shared/components/TitlePage';
import ConfigForm from './ShopForm.json';

export default {
  name: 'UserForm',
  data() {
    return {
      urlApi: API_SHOP,
      currentId: '',
      configForm: ConfigForm,
      titoloPagina: 'Users',
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

