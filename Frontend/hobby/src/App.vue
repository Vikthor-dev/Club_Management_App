<template>
  <div class="app">
    <Sidebar />
    <router-view v-slot="{ Component }">
      <transition name="route" mode="out-in">
        <component :is="Component"></component>
      </transition>
    </router-view>
  </div>
</template>

<script>
import { RouterLink, RouterView } from "vue-router";
import Sidebar from "./components/Sidebar.vue";
export default {
  components: {
    Sidebar,
  },
};
</script>

<style lang="scss" scoped>
.app{
  overflow-x:hidden;
}
.route-enter-from {
  opacity: 0;
  transform: translateX(100px);
}
.route-enter-active {
  transition: all 0.3s ease-out;
}
.route-leave-to {
  opacity: 0;
  transform: translateX(-100px);
}
.route-leave-active {
  transition: all 0.3s ease-in;
}
</style>
