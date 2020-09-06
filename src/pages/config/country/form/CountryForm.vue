<template>
   <div class="container">
    <ui-form
      title="Inserimento"
      :config="configForm"
      :urlApi="urlApi"
      :currentId="currentId"
    ></ui-form>
  </div>
</template>
<script>
import { API_COUNTRY } from './../../../../services/constant-services';
import UIForm from './../../../../ui-components/UIForm';
import TitlePage from './../../../shared/components/TitlePage';
import ConfigForm from './CountryForm.json';

export default {
  name: 'UserForm',
  data() {
    return {
      urlApi: API_COUNTRY,
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

