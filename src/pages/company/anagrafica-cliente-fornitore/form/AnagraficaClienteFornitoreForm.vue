<template>
  <div>
    <title-page :titolo="titolopagina"></title-page>
    <ui-form
    title="Dati Generali"
    :config="configForm"
    :urlApi="urlApi"
    :currentId="correntId"></ui-form>
  </div>
</template>
<script>
import { API_ANAGRAFICA } from '../../../../services/constant-services';
import UIForm from '../../../../ui-components/UIForm';
import TitlePage from '../../../shared/components/TitlePage';
import ConfigForm from './AnagraficaClienteFornitoreForm.json';

export default {
  name: 'UserForm',
  data() {
    return {
      urlApi: API_ANAGRAFICA,
      currentId: '',
      configForm: ConfigForm,
      titolopagina: 'Compilation',
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
