<template>
  <div>
    <ui-form
      title="Dati Personali"
      :config="configForm"
      :urlApi="urlApi"
      :currentId="currentId"
    ></ui-form>
  </div>
</template>
<script>
import { API_USERS } from './../../../../services/constant-services';
import UIForm from './../../../../ui-components/UIForm';
import TitlePage from './../../../shared/components/TitlePage';
import ConfigForm from './UserForm.json';

export default {
  name: 'UserForm',
  data() {
    return {
      modePage: 'L',
      urlApi: API_USERS,
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
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1 {
  font-weight: normal;
}
</style>
