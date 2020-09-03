<template>
    <div>
        <title-page :titolo="titolopagina"></title-page>
        <ui-form
        title="Dati Personali"
        :config="configForm"
        :urlApi="urlApi"
        :currentID="currentId"
        ></ui-form>
    </div>
</template>
<script>
import { API_PROFILI } from '../../../../services/constant-services';
import UIForm from './../../../../ui-components/UIForm';
import TitlePage from './../../../shared/components/TitlePage';
import ConfigForm from './ProfileForm.json';

export default {
  name: 'ProfileForm',
  data() {
    return {
      urlApi: API_PROFILI,
      currentId: '',
      configForm: ConfigForm,
      titoloPagina: 'Users',
    };
  },
  components: {
    'ui-form': UIForm,
    'title-page': TitlePage,
  },
};
</script>
