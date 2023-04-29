<template>
  <div id="map"></div>
</template>


<script>
import axios from "axios";
import store from "../store.js";
export default {
  data() {
    return {
      store,
    };
  },
  mounted() {
    this.getMap();
  },
  created() {
    if (localStorage.getItem("token") == null) {
      this.$router.push({ name: "Login" });
    }
    this.getData();
  },
  methods: {
    getMap() {
      var map = L.map("map").setView([44.8509741, 13.8355748], 16);
      L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
        attribution:
          '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }).addTo(map);
      var marker = L.marker([44.850898247727265, 13.834218890696876]).addTo(
        map
      );
    },
    getData() {
      if(localStorage.getItem("token")==null){
        console.log("Unauthorized!")
      }else{
             axios
        .get("http://localhost:9000/user", {
          headers: { token: localStorage.getItem("token") },
        })
        .then((res) => {
          console.log("Response:", res);
          store.Ime = res.data.user.Ime;
          store.Prezime = res.data.user.Prezime;
          store.Email = res.data.user.Email;
          store.Dob = res.data.user.Dob;
          store.Id = res.data.user.Id,
          store.Base64 = res.data.user.Base64
          store.Admin = res.data.user.Admin
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
#map {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-45%, -50%);
  height: 600px;
  width: 1100px;
}
</style>