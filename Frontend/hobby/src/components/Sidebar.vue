<template>
      <aside>
      <router-link v-if="$route.path !== '/login'"  id="router-link" to="/">
        <h6>Home</h6>
      </router-link>
      <router-link v-if="$route.path !== '/login'"  id="router-link" to="/posts">
        <h6>Images</h6>
      </router-link>
      <router-link v-if="$route.path !== '/login'"  id="router-link" to="/market">
        <h6>Market</h6>
      </router-link>
      <router-link v-if="$route.path !== '/login'"  id="router-link" to="/forum">
        <h6>Forum</h6>
      </router-link>
      <router-link v-if="$route.path !== '/login'"  id="router-link" to="/news">
        <h6>News</h6>
      </router-link>
      <router-link v-if="$route.path !== '/login'"  id="router-link" to="/settings">
        <h6>Settings</h6>
      </router-link>
      <router-link v-if="$route.path !== '/login'" @click="logout()" id="router-link-logout" to="/login">
        <h6>Logout</h6>
      </router-link>
    </aside>
</template>

<script>
import '../css/Sidebar.css'
export default{
  data(){
  },
  methods:{
      logout(){
      console.log("User logged out!")
      localStorage.clear();
      this.$router.push({name:'Login'})
    }
  }
}
</script>

<style lang="scss" scoped>
</style>