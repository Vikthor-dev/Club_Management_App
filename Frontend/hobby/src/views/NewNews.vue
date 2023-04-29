<template>
  <div class="new_news">
    <div class="row">
      <div class="col"></div>
      <div id="main-col" class="col">
        <form>
          <h3>Dodaj Obavijest</h3>
          <input
            required
            v-model="title"
            id="title-input"
            type="text"
            class="form-control"
            placeholder="Naslov"
          />
          <div class="form-floating">
            <textarea
              required
              v-model="text"
              class="form-control"
              style="height: 150px"
            ></textarea>
          </div>
          <button @click="NewsPost()" type="button" class="btn btn-light">
            Upload
          </button>
        </form>
      </div>
      <div class="col"></div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import store from "../store";
export default {
  data() {
    return {
      store,
      title: "",
      text: "",
    };
  },
  mounted() {},
  methods: {
    NewsPost() {
      let post = {
        UserImg: store.Base64,
        Ime: store.Ime,
        Prezime: store.Prezime,
        Title: this.title,
        Text: this.text,
        Datum: new Date(),
        PostedBy: store.Id,
        EmailPostedBy: store.Email,
      };
      axios.post("http://localhost:9000/newNews", post).then((res) => {
        console.log("Response Image: ", res.data);
        if (res.data.status) {
          this.$router.push({ name: "News" });
        } else {
          console.log("Error posting news data!");
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
h3 {
  color: whitesmoke;
  margin-top: 20px;
}
button {
  margin-top: 20px;
  margin-bottom: 20px;
}
#main-col {
  padding: 120px;
  margin-top: 30px;
  background-color: rgb(23, 23, 23);
  border-radius: 20%;
}
textarea {
  margin-top: 20px;
  margin-bottom: 10px;
}
#title-input {
  margin-top: 20px;
}
</style>