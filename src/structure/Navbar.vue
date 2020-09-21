<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-dark" style="background-color: rgb(3 13 130)">
      <img src="../assets/logo-chameleon.png" width="25px" class="pr-2">
      <router-link to="/" class="navbar-brand" >Chameleon</router-link>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNavDropdown"
        aria-controls="navbarNavDropdown"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNavDropdown">
        <ul class="navbar-nav">
          <li class="nav-item active">
            <router-link class="nav-link" to="/"
              >Home <span class="sr-only">(current)</span></router-link
            >
          </li>
          <li class="nav-item dropdown">
            <a
              class="nav-link dropdown-toggle"
              href="#"
              id="navbarDropdownMenuLink"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
             Azienda
            </a>
            <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
              <router-link to="/company/anagrafica-cliente-fornitore/list" class="dropdown-item" >
                Fornitori/Clienti
              </router-link>
              <router-link to="/company/prodotto/list" class="dropdown-item">Prodotto</router-link>
              <router-link to="/company/categoria-prodotto/list" class="dropdown-item" >
              Categorie Prodotti
              </router-link>
              <router-link to="/company/unita-misura/list" class="dropdown-item">
              Unità di Misura
              </router-link>
              <router-link to="/company/marca/list" class="dropdown-item">Marche</router-link>
              <router-link to="/company/inventario" class="dropdown-item">
              Inventario
              </router-link>
            </div>
          </li>

          <li class="nav-item dropdown">
            <a
              class="nav-link dropdown-toggle"
              href="#"
              id="navbarDropdownMenuLink"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
             Configurazione
            </a>
            <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
              <router-link to="/config/dominio/list" class="dropdown-item"> Dominio </router-link>
              <router-link to="/config/country/list" class="dropdown-item">Country</router-link>
              <router-link to="/config/import-csv-to-document" class="dropdown-item">
                Import CSV
              </router-link>
              <router-link to="/config/province/list" class="dropdown-item">Province</router-link>
              <router-link to="/config/comune/list" class="dropdown-item"> Comune </router-link>
            </div>
          </li>

          <li class="nav-item dropdown">
            <a
              class="nav-link dropdown-toggle"
              href="#"
              id="navbarDropdownMenuLink"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
             Amministrazione
            </a>
            <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
              <router-link to="/admin/user/list" class="dropdown-item" >Utenti</router-link>
              <router-link to="/admin/profile/list" class="dropdown-item">Profili</router-link>
              <router-link to="/admin/company/list" class="dropdown-item">Company</router-link>
              <router-link to="/admin/shop/list" class="dropdown-item" >Shop</router-link>
            </div>
          </li>
          <li class="nav-item dropdown">
            <a
              class="nav-link dropdown-toggle"
              href="#"
              id="navbarDropdownMenuLink"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
             Generatore
            </a>
            <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
              <router-link to="/Generator" class="dropdown-item">Generatore</router-link>
            </div>
          </li>


        </ul>
      </div>
    </nav>
  </div>
</template>
<script>
export default {
  name: 'Navbar',
};
</script>
