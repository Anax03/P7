<template>
  <div class="container d-flex justify-content-center">
    <div class="col-md-7">
      <!-- Dropdown modify Or remove post -->
      <div
        id="divDropdown"
        v-if="user.isAdmin === 1 || user.username === post.username"
      >
        <b-dropdown id="dropDown" right variant="primary">
          <b-dropdown-item
            data-toggle="modal"
            data-target="#modalEditPost"
            class="dropDownModify"
            @click="
              emitInfoPost();
              changeEditStyle('modify');
            "
            >Modifier Post</b-dropdown-item
          >
          <b-dropdown-item @click.prevent="removePost"
            >Supprimer Post</b-dropdown-item
          >
        </b-dropdown>
      </div>
      <!-- End dropDown -->
      <!-- User Post -->
      <div class="panel panel-default">
        <div class="panel-body">
          <section class="post-heading">
            <div class="row">
              <div class="col-md-11">
                <div class="media">
                  <div class="media-body">
                    <a href="#" class="anchor-username"
                      ><h4 class="media-heading">
                        {{ post.username }}
                      </h4></a
                    >
                    <a href="#" class="anchor-time">{{
                      post.createdAt.replace(/[T,Z]/g, " ").replace(".000", "")
                    }}</a>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section class="post-body" v-if="post.content !== 'null'">
            <p>
              {{ post.content }}
            </p>
          </section>
          <figure class="figure  text-center " v-if="post.attachement">
            <img :src="`${URLbackend}:${portBackend}`.concat(post.attachement)" alt="Post Image" class="img-fluid" />
          </figure>
        </div>
      </div>
    </div>
    <!-- End User Post -->
  </div>
</template>

<script>
import { mapState } from "vuex";
import axios from "axios";

export default {
  name: "Posts",
  data() {
    return {
      deleteImg: false,
      URLbackend:process.env.VUE_APP_URLBACKEND,
      portBackend:process.env.VUE_APP_portBackend
    };
  },
  props: {
    post: {
      type: Object,
      required: true
    }
  },
  computed: {
    ...mapState(["user", "edit"])
  },

  methods: {
    removePost() {
     
    
      const postId = this.post.id.toString();
      const postUserId = this.user.userId.toString();
      const parameter = postId.concat(":", postUserId);
     
      

      const result = confirm("Want to delete?");
      if (result) {
        axios
          .delete("http://localhost:3000/api/post/deletePost/" + parameter, {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token")
            }
          })
          .then(() => {
            window.location.reload();
          })
        
      }
    },
    emitInfoPost() {
      this.$emit("infosPost", { post: this.post });
    },
    changeEditStyle(value) {
      this.$store.dispatch("changeEditStyle", value);
    }
  },
  mounted: function() {}
};
</script>

<style scoped>
/* Dropdown */

#divDropdown {
  display: flex;

  justify-content: flex-end;
}
#dropDown {
  margin-top: 0.5rem;
}
/* Image post */
.img-fluid {
  border-radius: 5px;
}
/* Border post */
.col-md-7 {
  margin: 1rem auto;
  border: 2px solid rgba(164, 151, 151, 0.23);
  border-radius: 11px;
}
a {
  color: #47649f;
}

body {
  font-family: "helvetica";
}

/*-- Bootstrap Override Style --*/

/*-- Content Style --*/

.photo-profile {
  border: 1px solid #ddd;
}

.anchor-username h4 {
  font-weight: bold;
}

.anchor-time {
  color: #adb2bb;
  font-size: 1.2rem;
}

.post-footer-comment-wrapper {
  background-color: #f6f7f8;
}

figure {
  display: flex;
  justify-content: center;
  width: 100%;
}
.post-body {
  margin-top: 0.5rem;
}

@media (max-width: 300px) {
  .anchor-time {
    font-size: 1rem;
  }
}
</style>
