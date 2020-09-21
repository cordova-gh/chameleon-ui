import Vue from 'vue';
import Router from 'vue-router';
import MainContainer from '@/structure/MainContainer';
// eslint-disable-next-line no-unused-vars
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from '@/pages/auth/login/Login';
import UIGenerator from '@/pages/generator/UIGenerator';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Main',
      component: MainContainer,
      children: [
        {
          path: '/',
          name: 'home',
          component: () => import('@/pages/Home'),
        },
        {
          path: '/admin',
          name: 'admin',
          component: () => import('@/pages/admin/Admin'),
          children: [
            {
              path: 'user',
              component: () => import('@/pages/admin/user/User'),
              children: [
                {
                  path: 'new',
                  component: () => import('@/pages/admin/user/form/UserForm'),
                },
                {
                  path: 'edit/:id',
                  component: () => import('@/pages/admin/user/form/UserForm'),
                },
                {
                  path: 'list',
                  component: () => import('@/pages/admin/user/table/UserTable'),
                },
              ],
            },
            {
              path: 'profile',
              component: () => import('@/pages/admin/profile/Profile'),
              children: [
                {
                  path: 'new',
                  component: () => import('@/pages/admin/profile/form/ProfileForm'),
                },
                {
                  path: 'edit/:id',
                  component: () => import('@/pages/admin/profile/form/ProfileForm'),
                },
                {
                  path: 'list',
                  component: () => import('@/pages/admin/profile/grid-list/ProfileGridList'),
                },
              ],
            },
            {
              path: 'shop',
              component: () => import('@/pages/admin/shop/Shop'),
              children: [
                {
                  path: 'new',
                  component: () => import('@/pages/admin/shop/form/ShopForm'),
                },
                {
                  path: 'edit/:id',
                  component: () => import('@/pages/admin/shop/form/ShopForm'),
                },
                {
                  path: 'list',
                  component: () => import('@/pages/admin/shop/table/ShopTable'),
                },
              ],
            },
            {
              path: 'company',
              component: () => import('@/pages/admin/company/Company'),
              children: [
                {
                  path: 'new',
                  component: () => import('@/pages/admin/company/form/CompanyForm'),
                },
                {
                  path: 'edit/:id',
                  component: () => import('@/pages/admin/company/form/CompanyForm'),
                },
                {
                  path: 'list',
                  component: () => import('@/pages/admin/company/table/CompanyTable'),
                },
              ],
            },
          ],
        },
        {
          path: '/company',
          name: 'company',
          component: () => import('@/pages/company/Company'),
          children: [
            {
              path: 'anagrafica-cliente-fornitore',
              component: () => import('@/pages/company/anagrafica-cliente-fornitore/AnagraficaClienteFornitore'),
              children: [
                {
                  path: 'new',
                  component: () => import('@/pages/company/anagrafica-cliente-fornitore/form/AnagraficaClienteFornitoreForm'),
                },
                {
                  path: 'edit/:id',
                  component: () => import('@/pages/company/anagrafica-cliente-fornitore/form/AnagraficaClienteFornitoreForm'),
                },
                {
                  path: 'list',
                  component: () => import('@/pages/company/anagrafica-cliente-fornitore/table/AnagraficaClienteFornitoreTable'),
                },
              ],
            },
            {
              path: 'prodotto',
              component: () => import('@/pages/company/prodotto/Prodotto'),
              children: [
                {
                  path: 'new',
                  component: () => import('@/pages/company/prodotto/form/ProdottoForm'),
                },
                {
                  path: 'edit/:id',
                  component: () => import('@/pages/company/prodotto/form/ProdottoForm'),
                },
                {
                  path: 'list',
                  component: () => import('@/pages/company/prodotto/table/ProdottoTable'),
                },
              ],
            },
            {
              path: 'categoria-prodotto',
              component: () => import('@/pages/company/categoria-prodotto/CategoriaProdotto'),
              children: [
                {
                  path: 'new',
                  component: () => import('@/pages/company/categoria-prodotto/form/CategoriaProdottoForm'),
                },
                {
                  path: 'edit/:id',
                  component: () => import('@/pages/company/categoria-prodotto/form/CategoriaProdottoForm'),
                },
                {
                  path: 'list',
                  component: () => import('@/pages/company/categoria-prodotto/table/CategoriaProdottoTable'),
                },
              ],
            },
            {
              path: 'unita-misura',
              component: () => import('@/pages/company/unita-misura/UnitaMisura'),
              children: [
                {
                  path: 'new',
                  component: () => import('@/pages/company/unita-misura/form/UnitaMisuraForm'),
                },
                {
                  path: 'edit/:id',
                  component: () => import('@/pages/company/unita-misura/form/UnitaMisuraForm'),
                },
                {
                  path: 'list',
                  component: () => import('@/pages/company/unita-misura/grid-list/UnitaMisuraGridList'),
                },
              ],
            },
            {
              path: 'marca',
              component: () => import('@/pages/company/marca/Marca'),
              children: [
                {
                  path: 'new',
                  component: () => import('@/pages/company/marca/form/MarcaForm'),
                },
                {
                  path: 'edit/:id',
                  component: () => import('@/pages/company/marca/form/MarcaForm'),
                },
                {
                  path: 'list',
                  component: () => import('@/pages/company/marca/grid-list/MarcaGridList'),
                },
              ],
            },
            {
              path: 'inventario',
              component: () => import('@/pages/company/inventario/Inventario'),
            },
          ],
        },
        {
          path: '/config',
          name: 'config',
          component: () => import('@/pages/config/Config'),
          children: [
            {
              path: 'dominio',
              component: () => import('@/pages/config/dominio/Dominio'),
              children: [
                {
                  path: 'new',
                  component: () => import('@/pages/config/dominio/form/DominioForm'),
                },
                {
                  path: 'edit/:id',
                  component: () => import('@/pages/config/dominio/form/DominioForm'),
                },
                {
                  path: 'list',
                  component: () => import('@/pages/config/dominio/grid-list/DominioGridList'),
                },
              ],
            },
            {
              path: 'country',
              component: () => import('@/pages/config/country/Country'),
              children: [
                {
                  path: 'new',
                  component: () => import('@/pages/config/country/form/CountryForm'),
                },
                {
                  path: 'edit/:id',
                  component: () => import('@/pages/config/country/form/CountryForm'),
                },
                {
                  path: 'list',
                  component: () => import('@/pages/config/country/grid-list/CountryGridList'),
                },
              ],
            },
            {
              path: 'import-csv-to-document',
              component: () => import('@/pages/config/import-csv-to-document/ImportCsvToDocument'),
            },
            {
              path: 'province',
              component: () => import('@/pages/config/province/Province'),
              children: [
                {
                  path: 'list',
                  component: () => import('@/pages/config/province/grid-list/ProvinceGridList'),
                },
              ],
            },
            {
              path: 'comune',
              component: () => import('@/pages/config/comune/Comune'),
              children: [
                {
                  path: 'list',
                  component: () => import('@/pages/config/comune/grid-list/ComuneGridList'),
                },
              ],
            },
          ],
        },
        {
          path: '/Generator',
          name: 'Generator',
          component: UIGenerator,
        },
      ],
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
    },
  ],
});
