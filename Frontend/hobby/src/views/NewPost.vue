<template>
  <div class="newpost">
    <div class="row">
      <div class="col"></div>
      <div id="main-col" class="col">
        <h3>Dodaj Slike</h3>
        <form>
          <input
            type="file"
            ref="fileInput"
            multiple
            @change="(event) => this.handleFileUpload(event)"
            class="form-control"
            id="img-input"
          />
          <h3>Ime Galerije</h3>
          <input v-model="title" class="form-control" id="img-input" />
          <button @click="newGallery()" type="button" class="btn btn-light">Upload</button>
        </form>
      </div>
      <div class="col"></div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
</style>

<script>
import store from "../store";
import "../css/NewPost.css";
import axios from "axios";
export default {
  data() {
    return {
      store,
      imagesData: [],
      title: "",
    };
  },
  methods: {
    handleFileUpload(event) {
      const files = event.target.files;
      const base64DataArray = [];

      for (let i = 0; i < files.length; i++) {
        const reader = new FileReader();

        reader.onload = () => {
          const base64Data = reader.result;
          base64DataArray.push(base64Data);
        };

        reader.readAsDataURL(files[i]);
      }

      console.log(base64DataArray);
      this.imagesData = base64DataArray;
      console.log(this.imagesData);
    },
    newGallery() {
      let post = {
        Images: this.imagesData,
        Title: this.title,
        PostedBy: store.Id,
        EmailPostedBy: store.Email,
        Datum: new Date(),
        Ime: store.Ime,
        Prezime: store.Prezime,
        UserImg: store.Base64,
      };
      axios.post("http://localhost:9000/newGallery", post).then((res) => {
        console.log("Response Gallery: ", res.data);
        if (res.data.status) {
          this.$router.push({ name: "Posts" });
        } else {
          console.log("Error posting news data!");
        }
      });
    },
  },
};
</script>