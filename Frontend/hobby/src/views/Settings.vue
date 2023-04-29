<template>
  <div class="settings">
    <div class="row">
      <div class="col"></div>
      <div class="col">
        <img v-if="store.Base64==''" src="../assets/user.jpg">
        <img v-if="store.Base64!=''" id="profile-img" :src="this.userImage64data" />
        <input
          id="info"
          type="text"
          class="form-control"
          disabled
          :value="store.Ime"
        />
        <input
          id="info"
          type="text"
          class="form-control"
          disabled
          :value="store.Prezime"
        />
        <input
          id="info"
          type="text"
          class="form-control"
          disabled
          :value="store.Dob"
        />
        <input
          id="info"
          type="text"
          class="form-control"
          disabled
          :value="store.Email"
        />
      </div>
      <div class="col">
        <button
          id="cimg"
          @click="changeImage()"
          type="button"
          class="btn btn-dark"
        >
          Change Image
        </button>
        <div id="change-img">
          <input
            id="img_input"
            type="file"
            ref="fileInput"
            @change="(event) => this.getImage(event)"
            accept="image/*"
            class="form-control"
          />
          <p v-if="error_img" id="error-img" style="color: red">
            Select image!
          </p>
        </div>
        <button id="cpass" class="btn btn-dark">Change password</button>
        <div id="password-reset">
          <input
            id="pass"
            type="password"
            class="form-control"
            placeholder="Password"
            v-model="password"
          />
          <input
            id="pass_input"
            type="password"
            class="form-control"
            placeholder="New Password"
            v-model="new_pass"
          />
          <input
            id="info"
            type="password"
            class="form-control"
            placeholder="Confirm New Password"
            v-model="conf_new_pass"
          />
          <button
            id="confirm"
            @click="changePassword()"
            type="button"
            class="btn btn-danger"
          >
            Confirm password reset
          </button>
          <p id="error-pass" v-if="error_pass" style="color: red">
            {{ error }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import store from "../store";
export default {
  data() {
    return {
      store,
      imageUrl: "",
      base64data: "",
      file: null,
      userImage64data: `data:image/png;base64,${store.Base64}`,
      password: "",
      new_pass: "",
      conf_new_pass: "",
      error_img: false,
      error_pass: false,
      error: "",
    };
  },
  mounted() {
  },
  methods: {
    async getImage(event) {
      this.file = event.target.files[0];
      this.imageUrl = URL.createObjectURL(this.file);

      const reader = new FileReader();
      reader.onload = () => {
        const base64Image = reader.result.split(",")[1];
        this.base64data = base64Image;
        console.log("Base64 data: ", base64Image);
      };
      reader.readAsDataURL(this.file);
    },
    changeImage() {
      let ImageData = {
        base64: this.base64data,
        userId: store.Id,
      };
      axios.post("http://localhost:9000/userImage", ImageData).then((res) => {
        console.log("Response Image: ", res.data);
        if (res.data.status) {
          this.logout();
        } else {
          this.error_img = true;
        }
      });
    },
    logout() {
      console.log("User logged out!");
      localStorage.clear();
      this.$router.push({ name: "Login" });
    },
    changePassword() {
      let data = {
        userId: store.Id,
        pass: this.password,
        npass: this.new_pass,
        cnpas: this.conf_new_pass,
      };
      if (this.new_pass == this.conf_new_pass) {
        axios.post("http://localhost:9000/userPassword", data).then((res) => {
          console.log("Response password: ", res.data);
          if (res.data.status) {
            this.logout();
          } else {
            this.error = res.data.error;
            this.error_pass = true;
          }
        });
      } else {
        console.log("New Password Check Failed!");
        this.error = "Password Mismatch";
        this.error_pass = true;
      }
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
img {
  width: 150px;
  height: 150px;
  border-radius: 50%;
}
.row {
  margin-top: 50px;
}
#info {
  width: 250px;
  margin-top: 20px;
}
#password-reset {
  margin-bottom: 20px;
}
#confirm {
  margin-top: 20px;
  margin-bottom: 20px;
}
#cpass {
  margin-bottom: 20px;
}
#cimg {
  margin-bottom: 20px;
  margin-right: 20px;
}
#pass_input {
  width: 250px;
}
#img_input {
  width: 250px;
  margin-bottom: 20px;
}
#pass {
  width: 250px;
  margin-bottom: 20px;
}
</style>