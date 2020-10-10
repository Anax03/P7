<!-- views/NotFound.vue -->

<template>
  <div class="NotFound">
   
   <div class="display-4 mt-5 text-center">Oops!</div>
            <div class="display-4 mt-5 text-center texto">Page not found.</div>
          
           
         
  </div>
</template>
<script>
export default {
    name:'notfound'
}
</script>

<style>
  .texto {
    font-size: 4rem;
  }
  @media (max-width: 450px){
.texto {
    font-size: 2rem;
  }
  }
</style>