<template>
  <div class="market">
    <div class="row">
      <div class="col"></div>
      <div class="col">
        <img
          id="new-market"
          src="../assets/gallery.png"
          @click="push_NewMarketPost()"
        />
      </div>
    </div>

    <div class="container">
      <MarketCard :key="mcard.id" v-bind:minfo="mcard" v-for="mcard in store.markets" />

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
              <h5 class="modal-title">Potvrdi brisanje objave</h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-dark"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button type="button" class="btn btn-danger">Delete</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import store from "../store"
import MarketCard from "../components/MarketCard.vue";
import axios from 'axios';
export default {
  components: {
    MarketCard,
  },
  data() {
    return{
      store
    }
  },
  mounted() {
    this.fetchMarket()
  },
  methods: {
    push_NewMarketPost() {
      this.$router.push("/newmarket");
    },
      fetchMarket(){
        axios.get("http://localhost:9000/getMarket").then((res) => {
        console.log("Response Market: ", res.data);
        let data = res.data
        store.markets = data
      });
    }
  },
  created() {
    if (localStorage.getItem("token") == null) {
      this.$router.push({ name: "Login" });
    }
  },
};
</script>

<style lang="scss" scoped>
.container {
  margin-left: 150px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}
.col {
  display: flex;
  flex-flow: row;
}
#new-market {
  width: 30px;
  height: 30px;
  transform: translateY(15px);
  margin-bottom: 10px;
}
#new-market:hover {
  cursor: pointer;
}
</style>