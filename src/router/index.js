import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/pages/Home';
import User from '@/pages/admin/user/User';
// eslint-disable-next-line no-unused-vars
import UserForm from '@/pages/admin/user/form/UserForm';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Profile from '@/pages/admin/profile/Profile';
import ProfileForm from '@/pages/admin/profile/form/ProfileForm';
import ProfileGridList from '@/pages/admin/profile/grid-list/ProfileGridList';
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
import ProdottoGridList from '@/pages/company/prodotto/grid-list/ProdottoGridList';
import Config from '@/pages/config/Config';
import CategoriaProdotto from '@/pages/company/categoria-prodotto/CategoriaProdotto';
import CategoriaProdottoForm from '@/pages/company/categoria-prodotto/form/CategoriaProdottoForm';
import CategoriaProdottoPagination from '@/pages/company/categoria-prodotto/pagination/CategoriaProdottoPagination';
import Dominio from '@/pages/config/dominio/Dominio';
import DominioForm from '@/pages/config/dominio/form/DominioForm';
import DominioGridList from '@/pages/config/dominio/grid-list/DominioGridList';
import Country from '@/pages/config/country/Country';
import CountryForm from '@/pages/config/country/form/CountryForm';
import CountryGridList from '@/pages/config/country/grid-list/CountryGridList';
import ImportCsvToDocument from '@/pages/config/import-csv-to-document/ImportCsvToDocument';

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
      component: () => import('./../pages/admin/Admin'),
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
              path: 'edit/:id',
              component: UserForm,
            },
            {
              path: 'list',
              component: () => import('./../pages/admin/user/pagination/UserPagination'),
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
              path: 'edit/:id',
              component: ProfileForm,
            },
            {
              path: 'list',
              component: ProfileGridList,
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
              path: 'edit/:id',
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
              path: 'edit/:id',
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
          dynamic: Prodotto,
          children: [
            {
              path: 'new',
              dynamic: ProdottoForm,
            },
            {
              path: 'edit/:id',
              dynamic: ProdottoForm,
            },
            {
              path: 'list',
              dynamic: ProdottoGridList,
            },
          ],
        },
        {
          path: 'categoria-prodotto',
          component: CategoriaProdotto,
          children: [
            {
              path: 'new',
              component: CategoriaProdottoForm,
            },
            {
              path: 'edit/:id',
              component: CategoriaProdottoForm,
            },
            {
              path: 'list',
              component: CategoriaProdottoPagination,
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
          path: 'dominio',
          component: Dominio,
          children: [
            {
              path: 'new',
              component: DominioForm,
            },
            {
              path: 'edit/:id',
              component: DominioForm,
            },
            {
              path: 'list',
              component: DominioGridList,
            },
          ],
        },
        {
          path: 'country',
          component: Country,
          children: [
            {
              path: 'new',
              component: CountryForm,
            },
            {
              path: 'edit/:id',
              component: CountryForm,
            },
            {
              path: 'list',
              component: CountryGridList,
            },
          ],
        },
        {
          path: 'import-csv-to-document',
          component: ImportCsvToDocument,
        },
      ],
    },
  ],
});
