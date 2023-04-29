<template>
  <div class="newpost">
    <div class="row">
      <div class="col"></div>
      <div id="main-col" class="col">
        <h3>Dodaj Sliku</h3>
        <form>
          <input
              type="file"
            ref="fileInput"
            @change="(event) => this.getImage(event)"
            accept="image/*"
            class="form-control"
            id="img-input"
          />
          <h3>Naziv opreme</h3>
          <input v-model="title" class="form-control" id="img-input" />
          <h3>Cijena</h3>
          <input v-model="price" class="form-control" id="img-input" />
          <button @click="newMarket()" type="button" class="btn btn-light">Upload</button>
          <p v-if="this.error_check" style="color:red">{{this.error}}</p>
        </form>
      </div>
      <div class="col"></div>
    </div>
  </div>
</template>

<script>
import store from "../store";
import axios from "axios";
import "../css/NewMarketPost.css";
export default {
  data() {
    return {
      store,
      title: '',
      price:'',
      base64data:'',
      error:'',
      error_check:false

    };
  },
  methods: {
    newMarket() {
      let post = {
        UserImg: store.Base64,
        Ime: store.Ime,
        Prezime: store.Prezime,
        Title: this.title,
        Datum: new Date(),
        PostedBy: store.Id,
        EmailPostedBy: store.Email,
        Price:this.price,
        Image:this.base64data
      };
      axios.post("http://localhost:9000/newMarket", post).then((res) => {
        console.log("Response: ", res.data);
        if (res.data.status) {
          this.$router.push({ name: "Market" });
        } else {
          console.log("Error: ",res.data.error);
          this.error_check=true;
          this.error=res.data.error
        }
      });
    },
        async getImage(event) {
      this.file = event.target.files[0];
      this.imageUrl = URL.createObjectURL(this.file);

      const reader = new FileReader();
      reader.onload = () => {
        const base64Image = reader.result.split(",")[1];
        this.base64data = base64Image;
        console.log("Base64 data: ", base64Image);
      };
      reader.readAsDataURL(this.file);
    }
  },
};
</script>