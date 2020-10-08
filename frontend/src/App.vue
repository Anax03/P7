<template>
  <div id="app">
    <Head />

    <!-- <Accueil /> -->
    <router-view />
  </div>
</template>

<script>
import Head from "./components/Head";

export default {
  name: "App",
  components: { Head },
  data: () => {
    return {
      token: localStorage.getItem("token")
    };
  },
  watch: {
    $route: {
      handler: (to, from) => {
        console.log(from);
        document.title = to.meta.title;
      },
      immediate: true
    }
  }
};
</script>
<style>
</style>
