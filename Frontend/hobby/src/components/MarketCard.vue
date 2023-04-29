<template>
  <div class="card" style="width: 18rem">
    <div class="card-header">
      <img id="user-img" :src="`data:image/png;base64,${minfo.UserImg}`" />
      <p id="header-text">{{ minfo.Ime }} {{ minfo.Prezime }}</p>
    </div>
    <img
      style="height: 300px"
      :src="`data:image/png;base64,${minfo.Image}`"
      class="card-img-top"
    />
    <div class="card-body">
      <h6 class="card-title">{{ minfo.Title }}</h6>
      <button id="price-btn" class="btn btn-primary">{{minfo.Price}}€</button>
      <img
       v-if="store.Id == this.minfo.PostedBy"
        id="lower-body-btn-edit"
        src="../assets/edit.png"
        @click="goDetails()"
      />
    </div>
  </div>
</template>

<script>
import moment from "moment";
import store from "../store";
import axios from "axios";
import "../css/MarketCard.css";
export default {
  props:["minfo"],
  data() {
    return{
      store
    }
  },
  methods:{
    goDetails(){
      this.$router.push({path: `market-edit/${this.minfo._id}`})
    }
  }
};
</script>

<style lang="sss" scoped>
</style>