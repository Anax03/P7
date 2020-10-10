<template>
  <div class="container">
    <createPost v-if="token !== null" />
    <Posts
      v-for="post in dataPosts.slice().reverse()"
      v-bind:key="post.id"
      :post="post"
      @infosPost="setInfos"
    />
    <modifyPost :post="post" />
  </div>
</template>

<script>
import Posts from '../components/Posts';
import createPost from '../components/createPost';
import modifyPost from '../components/modifyPost';

import axios from 'axios';

export default {
  name: 'pageWall',
  components: { createPost, Posts, modifyPost },
  data: () => {
    return {
      token: localStorage.getItem('token'),
      post: {
        id: '',
        content: '',
        image: '',
        createdAt: '',
      },
      dataPosts: [],
    };
  },
  methods: {
    setInfos(payload) {
      this.post = payload.post;
    },
  },
  mounted() {
    axios
      .get('http://localhost:3000/api/post', {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      })

      .then((response) => {
      
        this.dataPosts = response.data;
        
      })
      .catch(() => {
       
      }),
      this.$store.dispatch('getUser');
  },
};
</script>

<style scoped></style>
