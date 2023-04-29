<template>
  <div class="login">
    <div class="row">
      <div class="col"></div>
      <div id="main-col" class="col">
        <h3>Email</h3>
        <form>
          <input
            class="form-control"
            id="email-input"
            type="email"
            placeholder="exampleemail@gmail.com"
            v-model="email"
          />
          <h3>Lozinka</h3>
          <input
            class="form-control"
            placeholder="********"
            type="password"
            id="email-input"
            v-model="password"
          />
          <button @click="login()" type="button" class="btn btn-light">
            Login
          </button>
           <h6 v-if="error_check" id="error">{{error}}</h6>
        </form>
      </div>
      <div class="col"></div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      email: "",
      password: "",
      error_check: false,
      error: " ",
    };
  },
  methods: {
    login() {
      let user = {
        Email: this.email,
        Password: this.password,
      };
      axios.post("http://localhost:9000/login", user).then((res) => {
        console.log("Response", res);
        if (res.data.error) {
          this.error_check = true;
          this.error = res.data.error;
        }
        if (res.data.token) {
          localStorage.setItem("token", res.data.token);
          this.$router.push({ name: "Home" });
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
h3 {
  color: whitesmoke;
  margin-top: 20px;
}
#email-input {
  border-style: solid;
  border-color: black;
  width: 300px;
}
button {
  margin-top: 20px;
  margin-bottom: 20px;
}
#main-col {
  padding: 120px;
  margin-top: 30px;
  background-color: rgb(23, 23, 23);
  border-radius: 20%;
  height: 550px;
}
#error{
  color: red;
}
</style>