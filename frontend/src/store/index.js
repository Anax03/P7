import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
  ///Model User
  state: {
    user: {
      username: 'Nc',
      userId: 'Nc',
      email: 'Nc',
      token: localStorage.getItem('token'),
      isAdmin: false,
    },
    editOption: '',
  },
  mutations: {
    saveUser(state, [username, userId, email, isAdmin]) {
      (state.user.username = username),
        (state.user.userId = userId),
        (state.user.email = email),
        (state.user.token = localStorage.getItem('token')),
        (state.user.isAdmin = isAdmin);
    },

    editStyle(state, value) {
      state.editOption = value;
    },
  },
  getters: {},
  actions: {
    getUser(context) {
      axios
        .get('http://localhost:3000/api/user/myprofile', {
          // Vérifier si token valide
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token'),
          },
        })
        .then((response) => {
          //... Si token valide
          context.commit('saveUser', [
            response.data.username,
            response.data.id,
            response.data.email,
            response.data.isAdmin,
          ]);
        })
        .catch((error) => {
          console.log('Error', error);
        });
    },

    changeEditStyle(context, value) {
      context.commit('editStyle', value);
    },
  },
  modules: {},
});
