<template>
  <nav class="navbar navbar-expand-lg py-0 navbar-dark bg-dark shadow-sm">
    <a class="navbar-brand">
      <!-- Logo Image -->
      <img
        src="../assets/icon-left-font-monochrome-white.png"
        alt="Logo"
        class="d-inline-block align-middle mr-5"
      />
    </a>

    <button
      type="button"
      data-toggle="collapse"
      data-target="#navbarSupportedContent"
      aria-controls="navbarSupportedContent"
      aria-expanded="false"
      aria-label="Toggle navigation"
      class="navbar-toggler"
    >
      <span class="navbar-toggler-icon"></span>
    </button>

    <div id="navbarSupportedContent" class="collapse navbar-collapse">
      <ul class="navbar-nav ml-auto">
        <li class="nav-item active" v-if="user.token === null">
          <router-link to="/">
            <a class="nav-link"
              >Accueil <span class="sr-only">(current)</span></a
            >
          </router-link>
        </li>
        <li class="nav-item active" v-if="user.token !== null">
          <router-link to="/wall">
            <a class="nav-link">Mur <span class="sr-only">(current)</span></a>
          </router-link>
        </li>

        <li class="nav-item" v-if="user.token === null">
          <router-link to="/signup">
            <a class="nav-link">Inscription </a></router-link
          >
        </li>
        <li class="nav-item" v-if="user.token == null">
          <router-link to="/login"><a class="nav-link">Login</a></router-link>
        </li>
        <li class="nav-item" v-if="user.token !== null">
          <router-link to="/profile"
            ><a class="nav-link">Profile</a></router-link
          >
        </li>
        <li class="nav-item" v-if="user.token !== null">
          <router-link to="/"
            ><a class="nav-link" id="Logoutbtn" @click.prevent="logout"
              >Déconnexion</a
            ></router-link
          >
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
import { mapState } from 'vuex';
export default {
  name: 'Head',
  data: () => {
    return {};
  },
  computed: {
    ...mapState(['user']),
  },
  methods: {
    logout() {
      // Logout
      localStorage.clear();
      this.$router.push({ path: '/' });
      this.user.token = null;
    },
  },
};
</script>

<style scoped>
li {
  color: white;
}

.navbar-brand {
  box-sizing: border-box;
}
.navbar-brand img {
  width: 120px;
}
</style>
