import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/pages/Home';
import User from '@/pages/admin/user/User';
// eslint-disable-next-line no-unused-vars
import UserForm from '@/pages/admin/user/form/UserForm';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Company from '@/pages/admin/company/Company';
import AnagraficaClienteFornitore from '@/pages/company/anagrafica-cliente-fornitore/AnagraficaClienteFornitore';
import Prodotto from '@/pages/company/prodotto/Prodotto';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
    },
    {
      path: '/user',
      name: 'User',
      component: User,
    },
    {
      path: '/company',
      name: 'Company',
      component: Company,
    },
    {
      path: '/anagrafica-cliente-fornitore',
      name: 'Anagrafica Cliente Fornitore',
      component: AnagraficaClienteFornitore,
    },
    {
      path: '/prodotto',
      name: 'Prodotto',
      component: Prodotto,
    },
  ],
});
