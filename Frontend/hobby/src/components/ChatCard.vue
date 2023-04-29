<template>
  <div class="chat">
    <img id="user-img" :src="`data:image/png;base64,${info.UserImg}`" />
    <p id="name-tag">{{info.Ime}} {{info.Prezime}}</p>
    <p id="text-tag">{{info.Comment}}</p>
    <img
     v-if="store.Id == this.info.PostedBy"
      id="lower-body-btn-delete"
      src="../assets/delete.png"
      @click="deleteChat()"
    />
    <p id="date-tag">{{ timeAgo }}</p>
  </div>
</template>

<script>
import store from "../store"
import "../css/Forum.css";
import moment from 'moment';
import axios from 'axios';
export default {
  props:["info"],
  data() {
    return{
      store
    }
  },
  methods:{
        deleteChat() {
          console.log(this.info._id)
      let data = {
        id: this.info._id,
      };
      axios.post(`http://localhost:9000/deleteChat/`, data).then((res) => {
        console.log("Response : ", res.data);
        if (res.data.status) {
          this.$router.push({ name: "Home" });
        }
      });
    }
  },
    computed: {
    timeAgo() {
      return moment(this.info.Datum).fromNow();
    },
  }
};
</script>

<style lang="scss" scoped>
</style>