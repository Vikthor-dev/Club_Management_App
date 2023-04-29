<template>
  <div class="news">
    <div class="row">
      <div class="col"></div>
      <div class="col">
        <img
          v-if="store.Admin==true"
          id="new-news"
          src="../assets/gallery.png"
          @click="push_new_news()"
        />
      </div>
    </div>

    <div class="container">
      <NewsCard :key="ncard.id" v-bind:info="ncard" v-for="ncard in store.news" />
    </div>

  </div>
</template>

<script>
import store from "../store"
import NewsCard from "../components/NewsCard.vue";
import axios from 'axios';
export default {
  components: {
    NewsCard,
  },
  data() {
    return{
      store,
    }
  },
  mounted(){
    this.fetchNews()
    console.log("Store news: ",store.news)
  },
  methods: {
    push_new_news() {
      this.$router.push("/newnews");
    },
    fetchNews(){
        axios.get("http://localhost:9000/getNews").then((res) => {
        console.log("Response News: ", res.data);
        let data = res.data
        store.news = data
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
#new-news {
  width: 30px;
  height: 30px;
  transform: translateY(15px);
  margin-bottom: 10px;
}
#new-news:hover {
  cursor: pointer;
}
</style>