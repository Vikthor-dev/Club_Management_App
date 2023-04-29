<template>
  <div class="edit-news">
    <div class="row">
      <div id="main-col" class="col">
        <form>
          <h3>Uredi Obavijest</h3>
          <input
            required
            id="title-input"
            type="text"
            class="form-control"
            placeholder="Naslov"
            v-model="news.Title"
            spellcheck="false"
          />
          <div class="form-floating">
            <textarea
              id="txtarea"
              v-model="news.Text"
              class="form-control"
              style="height: 200px"
              spellcheck="false"
            ></textarea>
          </div>
          <div id="mfooter">
            <button @click="saveNews()" type="button" class="btn btn-dark">
              Save Edit
            </button>
            <button
              style="margin-left: 20px"
              data-bs-toggle="modal"
              data-bs-target="#dsmodal"
              type="button"
              class="btn btn-danger"
            >
              Delete
            </button>
          </div>
        </form>
      </div>
      <div class="col"></div>
    </div>

    <div
      class="modal fade"
      id="dsmodal"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabindex="-1"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Potvrdi brisanje obavijesti</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-dark" data-bs-dismiss="modal">
              Close
            </button>
            <button
              @click="deleteNews()"
              type="button"
              data-bs-dismiss="modal"
              class="btn btn-danger"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import store from "../store";
export default {
  props: ["id"],
  data() {
    return {
      store,
      news: "",
    };
  },
  mounted() {
    console.log(this.id);
    this.getNews();
  },
  methods: {
    getNews() {
      axios.get(`http://localhost:9000/getNews/${this.id}`).then((res) => {
        console.log("Response : ", res.data);
        this.news = res.data;
      });
    },
    saveNews() {
      let data = {
        title: this.news.Title,
        text: this.news.Text,
        newsId: this.id,
      };
      axios.post(`http://localhost:9000/updateNews/`, data).then((res) => {
        console.log("Response : ", res.data);
        if (res.data.status) {
          this.$router.push({ name: "News" });
        }
      });
    },
    deleteNews() {
      let data = {
        id: this.id,
      };
      axios.post(`http://localhost:9000/deleteNews/`, data).then((res) => {
        console.log("Response : ", res.data);
        if (res.data.status) {
          this.$router.push({ name: "News" });
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
h3 {
  color: rgb(0, 0, 0);
  margin-top: 20px;
}
button {
  margin-top: 20px;
  margin-bottom: 20px;
}
#main-col {
  margin-left: 150px;
  margin-top: 30px;
  height: 550px;
}
#txtarea {
  margin-top: 20px;
  margin-bottom: 10px;
  border-color: rgb(171, 202, 248);
  width: 420px;
}
#title-input {
  margin-top: 20px;
  border-color: rgb(171, 202, 248);
  width: 420px;
}
</style>