<template>
  <div class="container">
    <ui-form
    title="Dati Generali"
    :config="configForm"
    :urlApi="urlApi"
    :currentId="currentId"></ui-form>
  </div>
</template>
<script>
import { API_FORNITORE_CLIENTE } from '../../../../services/constant-services';
import UIForm from '../../../../ui-components/UIForm';
import TitlePage from '../../../shared/components/TitlePage';
import ConfigForm from './AnagraficaClienteFornitoreForm.json';

export default {
  name: 'UserForm',
  data() {
    return {
      urlApi: API_FORNITORE_CLIENTE,
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
