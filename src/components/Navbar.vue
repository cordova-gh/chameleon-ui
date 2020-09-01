<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
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
            <a class="nav-link" href="#"
              >Home <span class="sr-only">(current)</span></a
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
              <a class="dropdown-item" href="#">Anagrafica fornitori/clienti</a>
              <a class="dropdown-item" href="#">Prodotti</a>
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
              <a class="dropdown-item" href="#">Domini</a>
              <a class="dropdown-item" href="#">Categorie Prodotti</a>
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
              <router-link to="/user" class="dropdown-item" >Utenti</router-link>
              <a class="dropdown-item" href="#">Profili</a>
              <a class="dropdown-item" href="#">Aziende</a>
              <a class="dropdown-item" href="#">Shop</a>
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
