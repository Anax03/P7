<template  >
  <div class="container" v-if="token !== null">
    <pageWall />
  </div>
</template>

<script>
import pageWall from "../components/pageWall";
export default {
  name: "Wall",
  components: { pageWall },
  data: () => {
    return {
      token: localStorage.getItem("token")
    };
  }
};
</script>

<style  scoped>
</style>