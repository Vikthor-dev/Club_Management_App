<template>
  <div class="card" style="width: 27rem">
    <div class="card-header">
      <img id="user-img" :src="`data:image/png;base64,${info.UserImg}`" />
      <p id="header-text">{{ info.Ime }} {{ info.Prezime }}</p>
    </div>
    <div class="card-body">
      <h5 class="card-title">{{ info.Title }}</h5>
      <p class="card-text">
        {{ info.Text }}
      </p>
      <p id="date-tag">{{ timeAgo }}</p>
      <img
        v-if="store.Id == this.info.PostedBy"
        id="lower-body-btn-edit"
        src="../assets/edit.png"
        @click="goNewsDetails()"
      />
    </div>
  </div>
</template>

<script>
import moment from "moment";
import store from "../store";
import "../css/NewsCard.css";
import axios from "axios";
export default {
  props: ["info"],
  data() {
    return {
      store,
    };
  },
  methods:{
    goNewsDetails(){
      this.$router.push({path: `news-edit/${this.info._id}`})
    }
  },
  computed: {
    timeAgo() {
      return moment(this.info.Datum).fromNow();
    },
  },
};
</script>

<style lang="scss" scoped>
</style>