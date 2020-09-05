<template>
     <div class="container">
        <ui-form
        title="Dati Personali"
        :config="configForm"
        :urlApi="urlApi"
        :currentId="currentId"
        ></ui-form>
    </div>
</template>
<script>
import { API_PROFILE } from '../../../../services/constant-services';
import UIForm from './../../../../ui-components/UIForm';
import TitlePage from './../../../shared/components/TitlePage';
import ConfigForm from './ProfileForm.json';

export default {
  name: 'ProfileForm',
  data() {
    return {
      urlApi: API_PROFILE,
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
