<template>
  <div>
    <div class="login-form">
      <form @submit.prevent="doLogin">
        <h2 class="text-center">MWD</h2>
        <div class="form-group">
          <div class="input-group">
            <span class="input-group-addon">
              <i class="fa fa-user"></i>
            </span>
            <input
              type="text"
              class="form-control"
              name="login"
              placeholder="usuário"
              v-model="form.login"
            >
          </div>
        </div>
        <div class="form-group">
          <div class="input-group">
            <span class="input-group-addon">
              <i class="fa fa-lock"></i>
            </span>
            <input
              type="password"
              class="form-control"
              placeholder="Password"
              v-model="form.password"
            >
          </div>
        </div>
        <div class="form-group">
          <!-- loader -->
          <div class="loader" v-if="loading"></div>
          <!-- / loader -->
          <button
            type="submit"
            class="btn btn-primary login-btn btn-block"
            :disabled="!form.login || !form.password"
            v-if="!loading"
          >Sign in</button>
        </div>
        <div class="clearfix">
          <a href="#" class="pull-right" @click.prevent>Esqueceu a senha?</a>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "FormLogin",
  data() {
    return {
      loading: false,
      show_error_login: false,
      form: {
        login: "",
        password: ""
      }
    };
  },
  methods: {
    doLogin() {
      this.loading = true;

      http
        .post("login/authenticate", this.form)
        .then(result => {
          const dataUserToken = {
            token: result.data.token,
            type_token: result.data.type
          };

          localStorage.setItem("dataLogin", JSON.stringify(dataUserToken));

          this.getDataUserLogged();
        })
        .catch(err => {
          this.loading = false;
          if (err.response.status === 401) {
            this.show_error_login = true;
          }
        });
    },
    getDataUserLogged() {
      http
        .get("login/get-data-user")
        .then(result => {
          const dataLocalStorage = JSON.parse(
            localStorage.getItem("dataLogin")
          );

          dataLocalStorage.name = result.data.name;
          dataLocalStorage.last_name = result.data.last_name;
          dataLocalStorage.admin = result.data.admin;
          dataLocalStorage.login = result.data.login;
          dataLocalStorage.region_id = result.data.region_id;

          localStorage.setItem("dataLogin", JSON.stringify(dataLocalStorage));

          setTimeout(() => {
            this.$router.push({ name: "dashboard" });
          }, 1500);
        })
        .catch(() => {
          this.show_error_login = true;
          this.loading = false;
        });
    }
  }
};
</script>

<style scoped>
.login-form {
  width: 385px;
  margin: 200px auto;
}
.login-form form {
  margin-bottom: 15px;
  background: #f7f7f7;
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
  padding: 30px;
}
.login-form h2 {
  margin: 0 0 15px;
}
.form-control,
.login-btn {
  min-height: 38px;
  border-radius: 2px;
}
.input-group-addon .fa {
  font-size: 18px;
}
.login-btn {
  font-size: 15px;
  font-weight: bold;
}
.social-btn .btn {
  border: none;
  margin: 10px 3px 0;
  opacity: 1;
}
.social-btn .btn:hover {
  opacity: 0.9;
}
.social-btn .btn-primary {
  background: #507cc0;
}
.social-btn .btn-info {
  background: #64ccf1;
}
.social-btn .btn-danger {
  background: #df4930;
}
.or-seperator {
  margin-top: 20px;
  text-align: center;
  border-top: 1px solid #ccc;
}
.or-seperator i {
  padding: 0 10px;
  background: #f7f7f7;
  position: relative;
  top: -11px;
  z-index: 1;
}
</style>