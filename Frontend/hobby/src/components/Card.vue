<template>
  <div class="card">
    <div class="card-header">
      <img id="user-img" src="../assets/user.jpg" />
      <p id="header-text">Viktor Medakov</p>
    </div>
    <div class="card-body">
      <div class="images" v-viewer>
        <img id="viewer-img" v-for="src in images" :key="src" :src="src" />
      </div>
    </div>
    <div class="card-lower-body">
      <button id="show-btn" @click="show()" type="button" class="btn btn-dark">
        Slike
      </button>
      <img
        id="lower-body-btn-edit"
        data-bs-toggle="modal"
        data-bs-target="#smodal"
        src="../assets/edit.png"
      />
    </div>
    <div class="card-footer">
      <p id="footer-text">25.03.2023. Stažno Galebove</p>
    </div>
  </div>
</template>

<script>
import "../css/Card.css";
import img from "../assets/1.jpg";
import img2 from "../assets/2.jpg";
import img3 from "../assets/3.jpg";
export default {
  data() {
    return {
      images: [img, img2, img3],
    };
  },
  methods: {
    show() {
      this.$viewerApi({
        images: this.images,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
</style>