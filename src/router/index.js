import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/pages/Home';
import User from '@/pages/admin/user/User';
// eslint-disable-next-line no-unused-vars
import UserForm from '@/pages/admin/user/form/UserForm';
import UserPagination from '@/pages/admin/user/pagination/UserPagination';
import Admin from '@/pages/admin/Admin';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Company from '@/pages/admin/company/Company';
import AnagraficaClienteFornitore from '@/pages/company/anagrafica-cliente-fornitore/AnagraficaClienteFornitore';
import Prodotto from '@/pages/company/prodotto/Prodotto';
import CategoriaProdotto from '@/pages/config/categoria-prodotto/CategoriaProdotto';
import Dominio from '@/pages/config/dominio/Dominio';
import Profile from '@/pages/admin/profile/Profile';
import ProfileForm from '@/pages/admin/profile/form/ProfileForm';
import ProfilePagination from '@/pages/admin/profile/pagination/ProfilePagination';
import Shop from '@/pages/admin/shop/Shop';
import ShopForm from '@/pages/admin/shop/form/ShopForm';
import ShopPagination from '@/pages/admin/shop/pagination/ShopPagination';


Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
    },
    {
      path: '/admin',
      name: 'admin',
      component: Admin,
      children: [
        {
          path: 'user',
          component: User,
          children: [
            {
              path: 'new',
              component: UserForm,
            },
            {
              path: 'list',
              component: UserPagination,
            },
          ],
        },
        {
          path: 'profile',
          component: Profile,
          children: [
            {
              path: 'new',
              component: ProfileForm,
            },
            {
              path: 'list',
              component: ProfilePagination,
            },
          ],
        },
        {
          path: 'shop',
          component: Shop,
          children: [
            {
              path: 'new',
              component: ShopForm,
            },
            {
              path: 'list',
              component: ShopPagination,
            },
          ],
        },
      ],
    },
    {
      path: '/user/new',
      name: 'User',
      component: UserForm,
    },
    {
      path: '/company',
      name: 'Company',
      component: Company,
    },
    {
      path: '/profile',
      name: 'Profile',
      component: Profile,
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
    {
      path: '/categoria-prodotto',
      name: 'Categoria Prodotto',
      component: CategoriaProdotto,
    },
    {
      path: '/dominio',
      name: 'Dominio',
      component: Dominio,
    },
  ],
});
