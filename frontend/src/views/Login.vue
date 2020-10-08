<template>
  <div class="container">
    <div class="main">
      <div class="col-md-6 col-sm-12">
        <div class="login-form">
          <form>
            <div class="form-group">
              <label>Email</label>
              <input
                type="email"
                class="form-control"
                placeholder="Email"
                v-model="email"
              />
            </div>
            <div class="form-group">
              <label>Mot de passe</label>
              <input
                type="password"
                class="form-control"
                placeholder="Mot de passe"
                v-model="password"
              />
            </div>
            <button
              type="submit"
              class="btn btn-black"
              @click.prevent="submitLogin"
            >
              Login
            </button>

            <router-link to="/signup">
              <button type="submit" class="btn btn-secondary">
                Inscription
              </button>
            </router-link>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
//JS
import { mapState } from 'vuex';
import axios from 'axios';

export default {
  name: 'Login',

  data: function login() {
    return {
      email: null,
      password: null,
    };
  },
  computed: {
    ...mapState(['user']),
  },
  methods: {
    /// Requete login
    submitLogin() {
      if (this.email !== null || this.password !== null) {
        axios
          .post('http://localhost:3000/api/user/login', {
            email: this.email,
            password: this.password,
          })
          .then((res) => {
            localStorage.setItem('token', res.data.token);

            console.log(localStorage.getItem('token'));
            this.user.token = res.data.token;

            this.$router.push({ path: '/wall' });
          })
          .catch((err) => {
            alert(err.response.data.error);
          });
      } else {
        alert('Vous devez remplir les champs');
      }
    },
  },
};
</script>

<style scoped>
.main-head {
  height: 150px;
  background: #fff;
}

.main {
  padding: 0px 10px;
}

@media screen and (max-height: 450px) {
  .sidenav {
    padding-top: 15px;
  }
}

@media screen and (max-width: 450px) {
  .login-form {
    margin-top: 10%;
  }

  .register-form {
    margin-top: 10%;
  }
}

@media screen and (min-width: 768px) {
  .main {
    margin-left: 30%;
  }

  .login-form {
    margin-top: 20%;
  }

  .register-form {
    margin-top: 20%;
  }
}

.login-main-text {
  margin-top: 20%;
  padding: 60px;
  color: #fff;
}

.login-main-text h2 {
  font-weight: 300;
}

.btn-black {
  background-color: #000 !important;
  color: #fff;
}

.btn-secondary {
  margin-left: 1rem;
}
</style>
