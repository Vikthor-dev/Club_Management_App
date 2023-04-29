<template>
  <div class="forum">
    <div class="row">
      <div class="col"></div>
      <div class="col col-md-8">
        <div class="chat-div">
          <ChatCard :key="ccard.id" v-bind:info="ccard" v-for="ccard in store.chats" /> 
        </div>
      </div>
      <div class="col"></div>
    </div>

    <div id="input-row" class="row">
      <div class="col"></div>
      <div class="col col-md-5">
        <input
        v-model="comment"
          id="input-comment"
          type="text"
          class="form-control"
          placeholder="Comment here"
        />
      </div>
      <div class="col">
        <button id="comment-btn" type="button" @click="addComment()" class="btn btn-primary">Comment</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import ChatCard from "../components/ChatCard.vue";
import store from "../store"
export default {
  components: {
    ChatCard,
  },
  data() {
    return{
      store,
      comment:''
    }
  },
  mounted(){
    this.fetchChats()
    console.log("Chats:",store.chats)
  },
  created() {
    if (localStorage.getItem("token") == null) {
      this.$router.push({ name: "Login" });
    }
  },
  methods:{
    addComment(){
      let cdata = {
        Comment:this.comment,
        UserImg: store.Base64,
        Ime: store.Ime,
        Prezime: store.Prezime,
        Datum: new Date(),
        PostedBy: store.Id,
        EmailPostedBy: store.Email,
      }
      axios.post("http://localhost:9000/addComment", cdata).then((res) => {
        console.log("Response: ",res.data)
        if(res.data.status){
          this.$router.push({name:'Forum'})
        }
      })
      this.comment=''
    },
     fetchChats(){
        axios.get("http://localhost:9000/getChat").then((res) => {
        console.log("Response News: ", res.data);
        let data = res.data
        store.chats = data
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.chat-div {
  height: 500px;
  overflow-y: auto;
  margin-top: 20px;
  padding: 10px;
}
#input-row {
  margin-top: 40px;
}
#input-comment {
  border-style: solid;
  border-color: black;
  border-width: 1px;
  margin-bottom: 20px;
  transform: translateX(-155px);
}
#comment-btn {
  transform: translateX(-150px);
}
</style>