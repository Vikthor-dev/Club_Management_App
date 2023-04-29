<template>
  <div class="posts">
    <div class="row">
      <div class="col"></div>
      <div class="col">
        <img
          @click="push_newpost()"
          id="new-gallery"
          src="../assets/gallery.png"
        />
      </div>
    </div>

    <div class="container">
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />

      <div
        class="modal fade"
        id="smodal"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabindex="-1"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Uredi galeriju</h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <input
                style="margin-bottom: 20px"
                type="text"
                class="form-control"
                value="Stažno Galebove"
              />
              <input
                type="file"
                ref="fileInput"
                multiple
                class="form-control"
              />
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-dark"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button type="button" class="btn btn-danger">Save</button>
            </div>
          </div>
        </div>
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
              <h5 class="modal-title">Potvrdi brisanje galerije</h5>
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
import Card from "../components/Card.vue";
export default {
  components: {
    Card,
  },
  data() {},
  methods: {
    push_newpost() {
      this.$router.push("/newpost");
    },
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
#new-gallery {
  width: 30px;
  height: 30px;
  transform: translateY(15px);
  margin-bottom: 10px;
}
#new-gallery:hover {
  cursor: pointer;
}
</style>