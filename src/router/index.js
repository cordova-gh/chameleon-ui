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
import Profile from '@/pages/admin/profile/Profile';
import ProfileForm from '@/pages/admin/profile/form/ProfileForm';
import ProfilePagination from '@/pages/admin/profile/pagination/ProfilePagination';
import Shop from '@/pages/admin/shop/Shop';
import ShopForm from '@/pages/admin/shop/form/ShopForm';
import ShopPagination from '@/pages/admin/shop/pagination/ShopPagination';
import AnagraficaClienteFornitore from '@/pages/company/anagrafica-cliente-fornitore/AnagraficaClienteFornitore';
import AnagraficaClienteFornitoreForm from '@/pages/company/anagrafica-cliente-fornitore/form/AnagraficaClienteFornitoreForm';
import AnagraficaClienteFornitorePagination from '@/pages/company/anagrafica-cliente-fornitore/pagination/AnagraficaClienteFornitorePagination';
import Company from '@/pages/admin/company/Company';
import CompanyMenu from '@/pages/company/Company';
import CompanyForm from '@/pages/admin/company/form/CompanyForm';
import CompanyPagination from '@/pages/admin/company/pagination/CompanyPagination';
import Prodotto from '@/pages/company/prodotto/Prodotto';
import ProdottoForm from '@/pages/company/prodotto/form/ProdottoForm';
import ProdottoPagination from '@/pages/company/prodotto/pagination/ProdottoPagination';
import Config from '@/pages/config/Config';
import CategoriaProdotto from '@/pages/config/categoria-prodotto/CategoriaProdotto';
import CategoriaProdottoForm from '@/pages/config/categoria-prodotto/form/CategoriaProdottoForm';
import CategoriaProdottoPagination from '@/pages/config/categoria-prodotto/pagination/CategoriaProdottoPagination';
import Dominio from '@/pages/config/dominio/Dominio';
import DominioForm from '@/pages/config/dominio/form/DominioForm';
import DominioPagination from '@/pages/config/dominio/pagination/DominioPagination';


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
              path: 'edit/:id',
              component: ShopForm,
            },
            {
              path: 'list',
              component: ShopPagination,
            },
          ],
        },
        {
          path: 'company',
          component: Company,
          children: [
            {
              path: 'new',
              component: CompanyForm,
            },
            {
              path: 'list',
              component: CompanyPagination,
            },
          ],
        },
      ],
    },
    {
      path: '/company',
      name: 'company',
      component: CompanyMenu,
      children: [
        {
          path: 'anagrafica-cliente-fornitore',
          component: AnagraficaClienteFornitore,
          children: [
            {
              path: 'new',
              component: AnagraficaClienteFornitoreForm,
            },
            {
              path: 'list',
              component: AnagraficaClienteFornitorePagination,
            },
          ],
        },
        {
          path: 'prodotto',
          component: Prodotto,
          children: [
            {
              path: 'new',
              component: ProdottoForm,
            },
            {
              path: 'list',
              component: ProdottoPagination,
            },
          ],
        },

      ],
    },
    {
      path: '/config',
      name: 'config',
      component: Config,
      children: [
        {
          path: 'categoria-prodotto',
          component: CategoriaProdotto,
          children: [
            {
              path: 'new',
              component: CategoriaProdottoForm,
            },
            {
              path: 'list',
              component: CategoriaProdottoPagination,
            },
          ],
        },
        {
          path: 'dominio',
          component: Dominio,
          children: [
            {
              path: 'new',
              component: DominioForm,
            },
            {
              path: 'list',
              component: DominioPagination,
            },
          ],
        },
      ],
    },
  ],
});
