<template>
  <div>
    <title-page :titolo="titolopagina"></title-page>
    <ui-form
    title="Dati Personali"
    :config="configForm"
    :urlApi="urlApi"
    :currentId="correntId"></ui-form>
  </div>
</template>
<script>
import { API_COMPANY } from '../../../../services/constant-services';
import UIForm from '../../../../ui-components/UIForm';
import TitlePage from '../../../shared/components/TitlePage';
import ConfigForm from './CompanyForm.json';

export default {
  name: 'UserForm',
  data() {
    return {
      urlApi: API_COMPANY,
      currentId: '',
      configForm: ConfigForm,
      titolopagina: 'Users',
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
