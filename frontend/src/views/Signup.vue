<template>
  <div class="container">
    <form>
      <label>
        <p class="label-txt">Email</p>
        <input type="email" class="input" v-model="email" maxlength="28" />
        <div class="line-box">
          <div class="line"></div>
        </div>
      </label>
      <label>
        <p class="label-txt">Username</p>
        <input type="text" class="input" v-model="username" maxlength="28" />
        <div class="line-box">
          <div class="line"></div>
        </div>
      </label>
      <label>
        <p class="label-txt">Mot de passe</p>
        <input
          type="password"
          class="input"
          v-model="password"
          maxlength="100"
        />
        <div class="line-box">
          <div class="line"></div>
        </div>
      </label>
      <button type="submit" @click.prevent="signUpUser">Inscription</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';
import { mapState } from 'vuex';

export default {
  name: 'Signup',
  data: function Registration() {
    return {
      email: null,
      username: null,
      password: null,
    };
  },

  computed: {
    ...mapState(['user']),
  },
  methods: {
    ////Signup
    signUpUser() {
      console.log(this.email);
      console.log(this.username);
      console.log(this.password);
      // Input validation
      ///Valid email
      const regexEmail = /^[a-z0-9._-]+@[a-z0-9.-]{2,}[.][a-z]{2,3}$/;
      const EmailInscription = this.email.toLowerCase();
      console.log(typeof EmailInscription);

      /// second const regexEmail = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
      /*Valid username :(Total +5 characters ) The first character of the 
      username must be an alphabetic character */
      const regexusername = /^[a-zA-Z][a-zA-Z0-9_]{4,29}$/;
      /* Password : should contain at least one digit 
      should contain at least one lower case 
      should contain at least one upper case 
      should contain at least 8 from the mentioned characters
       */
      const regexPassword = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/;

      console.log(regexEmail.test(this.email));
      console.log(regexusername.test(this.username));
      console.log(regexPassword.test(this.password));

      if (
        (this.email !== null ||
          this.username !== null ||
          this.password !== null) &&
        regexEmail.test(EmailInscription) &&
        regexusername.test(this.username) &&
        regexPassword.test(this.password)
      ) {
        axios
          .post('http://localhost:3000/api/user/signup', {
            email: this.email,
            username: this.username,
            password: this.password,
          })

          .then((response) => {
            console.log(response);
            this.$router.push({ path: '/login' });
            //Réinitialisation
            this.email = null;
            this.username = null;
            this.password = null;
          })
          .catch((error) => {
            alert(error.response.data.error);
            console.log('ERROR : ' + error.response.data.error);
          });
      } else {
        alert(
          'Error vous devez remplir les champs correctement : \n' +
            'Valid email: Valid adresse email\n' +
            'Valid username : +5 characters (1ére char alphabetic :) avec minumum 1 numéro\n' +
            'Valid Password : +8 characters avec minumum 1 numéro,1 lettre majuscule 1 lettre minuscule'
        );
      }
    },
  },
};
</script>

<style scoped>
orm {
  width: 60%;
  margin: 60px auto;
  background: #efefef;
  padding: 60px 120px 80px 120px;
  text-align: center;
  -webkit-box-shadow: 2px 2px 3px rgba(0, 0, 0, 0.1);
  box-shadow: 2px 2px 3px rgba(0, 0, 0, 0.1);
}
label {
  display: block;
  position: relative;
  margin: 40px 0px;
}
.label-txt {
  position: absolute;
  top: -1.6em;
  padding: 10px;
  font-family: sans-serif;
  font-size: 0.8em;
  letter-spacing: 1px;
  color: rgb(120, 120, 120);
  transition: ease 0.3s;
}
.input {
  width: 100%;
  padding: 10px;
  background: transparent;
  border: none;
  outline: none;
}

.line-box {
  position: relative;
  width: 100%;
  height: 2px;
  background: #bcbcbc;
}

.line {
  position: absolute;
  width: 0%;
  height: 2px;
  top: 0px;
  left: 50%;
  transform: translateX(-50%);
  background: #2e76cf;
  transition: ease 0.6s;
}

.input:focus + .line-box .line {
  width: 100%;
}

.label-active {
  top: -3em;
}

button {
  display: inline-block;
  padding: 12px 24px;
  background: rgb(220, 220, 220);
  font-weight: bold;
  color: rgb(120, 120, 120);
  border: none;
  outline: none;
  border-radius: 3px;
  cursor: pointer;
  transition: ease 0.3s;
}

button:hover {
  background: #2e76cf;
  color: #ffffff;
}
</style>
