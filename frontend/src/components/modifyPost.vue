<template>
  <div
    v-if="editOption == 'modify'"
    id="modalEditPost"
    class="modal fade modalModify"
    tabindex="-1"
    role="dialog"
    aria-labelledby="modalModifyLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="modalModifyLabel">Modifier post</h5>
          <button
            type="button"
            class="close"
            data-dismiss="modal"
            aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div
          class="modal-body"
          enctype="multipart/form-data"
          action="/update"
          method="put"
        >
          <form id="formModal">
            <!-- Texte -->
            <div class="form-group">
              <label for="NewText" class="col-form-label"
                >Que voulez-vous dire? :</label
              >
              <textarea
                class="form-control"
                id="NewText"
                :value="post.content == 'null' ? '' : post.content"
              ></textarea>
            </div>
            <!-- Remove Image? -->
            <div class="form-group imagePost">
              <div class="input-group mb-3" v-if="post.attachement">
                <br />

                <img
                  class="img-thumbnail"
                  :src="post.attachement"
                  id="ImagemodalPost"
                />
                <button
                  type="button"
                  class="btn btn-danger"
                  id="btnRemoveImage"
                  @click="deleteImage"
                >
                  Supprimer l'image ?
                </button>
              </div>
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">
            Close
          </button>
          <button
            type="button"
            class="btn btn-primary"
            id="confirmeChangement"
            data-dismiss="modal"
            @click="updatePostUser"
          >
            Modify post
          </button>
        </div>
      </div>
    </div>
  </div>
  <!-- End Modal -->
</template>

<script>
import axios from 'axios';
import { mapState } from 'vuex';
//import axios from 'axios';
export default {
  name: 'modifyPost',
  data() {
    return {
      deleteImg: false,
    };
  },
  computed: {
    ...mapState(['user', 'editOption']),
  },
  props: {
    post: {
      type: Object,
      default() {},
    },
  },
  methods: {
    updatePostUser() {
      let newContent = false;
      const newTexte = document.getElementById('NewText').value;
      if (newTexte != this.post.content || this.deleteImg !== false) {
        newContent = true;
      }
      if (newContent && this.deleteImg) {
        axios
          .put(
            'http://localhost:3000/api/post/updatePost',
            {
              idPost: this.post.id,
              postUserId: this.user.userId,
              texte: newTexte,
              imageUrl: null,
              deleteImage: true,
            },
            {
              headers: {
                authorization: 'Bearer ' + localStorage.getItem('token'),
              },
            }
          ) // Si requête marche bien
          .then((response) => {
            console.log(response);
            window.location.reload();
          }) // Si ya une erreur
          .catch((err) => {
            console.log('error 1' + err);
          });
      } else if (newContent) {
        // Requête avec juste modification du texte
        axios
          .put(
            'http://localhost:3000/api/post/updatePost',
            {
              idPost: this.post.id,
              postUserId: this.user.userId,
              texte: newTexte,
              imageUrl: this.post.attachement,
              deleteImage: false,
            },
            {
              headers: {
                authorization: 'Bearer ' + localStorage.getItem('token'),
              },
            }
          )
          // response GOOD
          .then((response) => {
            console.log(response);

            window.location.reload();
          })
          //une erreur
          .catch((err) => {
            console.log('error 2' + err);
          });
      } else {
        alert('Aucun changement');
        console.log('aucun changement');
      }
    },

    deleteImage() {
      const result = confirm('Delete image?');
      if (result) {
        document.querySelector('#ImagemodalPost').src = '#';
        document.querySelector('#btnRemoveImage').style.display = 'none';
        document.querySelector('.imagePost').style.display = 'none';
        console.log(document.querySelector('#ImagemodalPost').src);
        this.deleteImg = true;
        console.log(this.deleteImg);
      }
    },
  },
};
</script>

<style scoped>
.id {
  color: white;
}
</style>
