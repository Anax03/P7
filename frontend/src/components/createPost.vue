<template>
  <div class="container d-flex ">
    <div class=" col-md-7">
      <div class=" col-md-offset-2">
        <h2 class="titreH2">Créer une publication</h2>

        <form action="" method="POST">
          <div class="form-group">
            <label class="labelText" for="texte">Que voulez-vous dire? </label>
            <textarea
              rows="5"
              class="form-control"
              name="texte"
              type="text"
              id="textArea"
              v-model="postTexte"
            ></textarea>
          </div>

          <form>
            <div class="form-group">
              <label class="labelText" for="formImage"
                >Télécharger une image</label
              >
              <input
                type="file"
                class="form-control-file"
                id="formImage"
                @change="onFileChange"
                accept="image/*"
              />
            </div>
          </form>

          <div class="form-group">
            <button
              type="submit"
              class="btn btn-primary"
              @click.prevent="createPOST"
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import axios from "axios";

export default {
  name: "createPost",
  data: function addPost() {
    return {
      postTexte: null,
      postImage: null,
      imageData: "",
      errorMessage: ""
    };
  },

  computed: {
    ...mapState(["user"])
  },
  methods: {
    /// Function pour ajouter un poste
    createPOST() {
      /// enregistré input du l'utlisateur  (Image TEXTE)
      const formData = new FormData();
      formData.append("texte", this.postTexte);
      formData.append("image", this.postImage);

      // Si l'utilisateur à rien publier
      if (formData.get("texte") == "null" && formData.get("image") == "null") {
        alert("Entrez une image ou texte");
      } else {
        ///requête axios
        axios
          .post("http://localhost:3000/api/post/createPost", formData, {
            headers: {
              Authorization: "Bearer " + window.localStorage.getItem("token")
            }
          })
          .then(res => {
            // Recharger la page pour voir
            if (res) {
              window.location.reload();
            }
          }) // Si ya err
          .catch(err => {
            alert(err.response.data.error.code);
            console.log(err.response.data.error.code);
          });
      }
    },
    onFileChange(e) {
      this.postImage = e.target.files[0] || e.dataTransfer.files;
      console.log(this.postImage);

      const input = event.target;
      if (input.files && input.files[0]) {
        const reader = new FileReader();
        reader.onload = e => {
          this.postImage = e.target.result;
        };
      }
    }
  }
};
</script>

<style scoped>
.col-md-7 {
  margin: 2rem auto;
  border: 2px solid rgba(164, 151, 151, 0.23);
  border-radius: 11px;
}

.titreH2 {
  margin-top: 1rem;
  font-size: 1.5rem;
  white-space: nowrap;
}

#labelTextarea {
  margin: 1rem 0;
}
#textArea {
  width: 100%;
  max-width: 100%;
}

@media (max-width: 500px) {
  .titreH2 {
    margin-top: 1rem;
    font-size: 1rem;
  }
  .labelText {
    font-size: 0.8rem;
  }
}
</style>
