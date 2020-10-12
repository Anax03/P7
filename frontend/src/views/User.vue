<template>
  <div class="container" v-if="token !== null">
    <h1 class="h1-responsive">Paramètres du compte :</h1>

    <div class="row">
      <div class="col-sm-4">
        <!-- Email -->
        <label for="emailUtilisateur">Email</label>
        <div class="form-group">
          <input
            readonly
            type="email"
            class="form-control"
            id="emailUtilisateur"
            :placeholder="user.email"
          />
        </div>
        <!-- Username -->
        <label for="username">Nom utilisateur</label>
        <div class="form-group">
          <input
            readonly
            type="text"
            class="form-control"
            id="username"
            :placeholder="user.username"
          />
        </div>
        <!-- Password -->
        <div class="changement" >
          <label>Nouveau mot de passe</label>
          <div class="form-group">
            <input
              id="nouveauPassword"
              type="password"
              class="form-control"
              placeholder="Nouveau mot de passe"
              v-model="newPassword"
            />
          </div>
          <label>Confirme nouveau mot de passe</label>
          <div class="form-group ">
            <input
              id="confirmationPASSWORD"
              type="password"
              class="form-control"
              placeholder="Confirmation mot de passe"
              v-model="confirmationPassword"
            />
            <button
              v-b-modal.modal-1
              type="button"
              class="btn btn-secondary"
              @click.prevent="changePassword"
            >
              Sauvergarder les modifications
            </button>
          </div>
        </div>
      </div>
    </div>
    <p id="results" class="text-left text-danger ">{{ results }}</p>
    <!-- Button Supprimer -->
    <button
      v-b-modal.modal-2
      type="button"
      class="btn btn-dark white d-block mx-auto mt-5 mb-2"
      @click.prevent="removeAccount"
    >
      Supprimer mon compte
    </button>
  </div>
</template>

<script>
import axios from 'axios';
import { mapState } from 'vuex';

export default {
  name: 'User',

  data: function nvPassword() {
    return {
      newPassword: null,
      confirmationPassword: null,
      email: 'email',
      username: 'username',
      token: localStorage.getItem('token'),
      results: '',
    };
  },
  computed: {
    ...mapState(['user']),
  },
  methods: {
    ///Style Profile

    style() {
      axios
        .get('http://localhost:3000/api/user/myprofile', {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token'),
          },
        })
        .then((res) => {
          this.email = res.body.email;
          this.username = res.body.username;
        })
        
    },

    ///changer Mot de passe
    changePassword() {
      /* Password : should contain at least one digit
      should contain at least one lower case
      should contain at least one upper case
      should contain at least 8 from the mentioned characters
       */
      const regexPassword = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/;
      if (
        regexPassword.test(this.newPassword) &&
        regexPassword.test(this.confirmationPassword) &&
        this.newPassword === this.confirmationPassword
      ) {
        axios
          .put(
            'http://localhost:3000/api/user/update',
            {
              newPassword: this.newPassword,
            },
            {
              headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token'),
              },
            }
          )
          .then((response) => {
           

            this.results = response.data.message;
            setTimeout(() => {
              this.results = '';

              this.newPassword = '';
              this.confirmationPassword = '';
            }, 2000);
          })
          .catch((err) => {
            this.results = 'Une erreur est survenue' + err;
          });
      } else {
        this.modalShow = false;
        alert(
          'Valid Password : ' +
            '8 characters avec minumum 1 numéro,1 lettre majuscule 1 lettre minuscule' +
            '\nLes mots de passe saisis doivent etre identiques'
        );
      }
    },

    ///Suprimmer compte
    removeAccount() {
      const result = confirm('Want to delete?');
      if (result) {
        axios
          .delete('http://localhost:3000/api/user/delete', {
            headers: {
              Authorization: 'Bearer ' + localStorage.getItem('token'),
            },
          })
          .then(() => {
            localStorage.clear();
            this.user.token = null;
            this.$router.push({ path: '/' });
          })
          .catch((error) => alert(error));
      }
    },
  }, // modifications aprés la requête
  mounted() {
    this.$store.dispatch('getUser');
  },
};
</script>

<style scoped>
.h1-responsive {
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
}
.container {
  border: 2px groove #1c6ea4;
  margin: 3rem auto;
  padding: 1rem;
}

.btn-secondary {
  margin-top: 1rem;
  white-space: nowrap;
}
</style>
