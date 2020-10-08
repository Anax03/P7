<template>
  <div class="pageAccueil">
    <!-- Main navigation -->
    <header>
      <div
        class="view"
        style="background-image: url('https://mdbootstrap.com/img/Photos/Others/architecture.jpg'); background-repeat: no-repeat; background-size: cover; background-position: center center;"
      >
        <!-- Mask & flexbox options-->
        <div class="mask align-items-center ">
          <!-- Content -->
          <div class="container">
            <!--Grid row-->
            <div class="row">
              <!--Grid column-->
              <div
                class="col-md-6  text-center text-md-left mt-xl-5 mb-5 wow fadeInLeft"
                data-wow-delay="0.3s"
              >
                <h1 class="h1-responsive font-weight-bold mt-sm-5">
                  Partagez vos idées
                </h1>
                <hr class="hr-light" />
                <h6 class="mb-4">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rem
                  repellendus quasi fuga nesciunt dolorum nulla magnam veniam
                  sapiente, fugiat! Commodi sequi non animi ea dolor molestiae
                  iste.
                </h6>
                <router-link to="/login">
                  <a class="btn btn-primary ">Login</a>
                </router-link>
                <router-link to="/signup">
                  <a class="btn  btn-secondary">Créer un compte</a></router-link
                >
              </div>
              <!--Grid column-->
              <!--Grid column-->
              <div
                class="col-md-6 col-xl-5 mt-xl-5 wow fadeInRight"
                data-wow-delay="0.3s"
              >
                <img
                  src="../assets/icon-left-font-monochrome-black.png"
                  alt=""
                  class="img-fluid"
                />
              </div>
              <!--Grid column-->
            </div>
            <!--Grid row-->
          </div>
          <!-- Content -->
        </div>
        <!-- Mask & flexbox options-->
      </div>
      <!-- Full Page Intro -->
    </header>
    <!-- Main navigation -->
    <!--Main Layout-->
  </div>
</template>

<script>
export default {
  name: "Accueil"
};
</script>

<style scoped>
@media only screen and (min-width: 768px) {
  .view {
    height: 90vh;
  }
}

@media only screen and (max-width: 768px) {
  .h1-responsive {
    margin-top: 1rem;
    font-size: 2rem;
  }
}

@media only screen and (max-width: 300px) {
  .h1-responsive {
    font-size: 1.5rem;
  }
}

.btn .fa {
  margin-left: 3px;
}

.top-nav-collapse {
  background-color: #424f95 !important;
}

.navbar:not(.top-nav-collapse) {
  background: transparent !important;
}

@media (max-width: 991px) {
  .navbar:not(.top-nav-collapse) {
    background: #424f95 !important;
  }
  .img-fluid {
    width: 95%;
  }
}

.btn-primary {
  margin-right: 1rem;
}

h6 {
  line-height: 1.7;
}
</style>