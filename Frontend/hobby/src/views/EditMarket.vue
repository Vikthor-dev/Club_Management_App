<template>
  <div class="row">
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
        <input v-model="markets.Title" class="form-control" id="img-input" />
        <h3>Cijena</h3>
        <input v-model="markets.Price" class="form-control" id="img-input" />
        <button @click="saveMarkets()" type="button" class="btn btn-dark">
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
        <p v-if="this.error_check" style="color: red">{{ this.error }}</p>
      </form>
    </div>
    <div class="col"></div>

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
            <h5 class="modal-title">Potvrdi brisanje objave.</h5>
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
              @click="deleteMarket()"
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
      markets: "",
      imageUr: "",
      base64data: "",
    };
  },
  mounted() {
    this.getMarkets();
    console.log(this.id);
    console.log(this.base64data);
  },
  methods: {
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
    },
    getMarkets() {
      axios.get(`http://localhost:9000/getMarkets/${this.id}`).then((res) => {
        console.log("Response : ", res.data);
        this.markets = res.data;
        this.base64data = res.data.Image;
      });
    },
    saveMarkets() {
      let data = {
        title: this.markets.Title,
        price: this.markets.Price,
        marketId: this.id,
        image: this.base64data,
      };
      axios.post(`http://localhost:9000/updateMarket/`, data).then((res) => {
        console.log("Response : ", res.data);
        if (res.data.status) {
          this.$router.push({ name: "Market" });
        }
      });
    },
    deleteMarket() {
      let data = {
        id: this.id,
      };
      axios.post(`http://localhost:9000/deleteMarket/`, data).then((res) => {
        console.log("Response : ", res.data);
        if (res.data.status) {
          this.$router.push({ name: "Market" });
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
#main-col {
  margin-left: 150px;
  margin-top: 50px;
}
input {
  width: 400px;
  margin-bottom: 20px;
}
</style>