<template>
<b-card style="margin: 0 auto;  padding-top:25px; float none;margin-top:25px">
    <div >
      <div class="col wrapper-box">
        <!-- <img class="mx-auto d-block" src="../assets/logo-new-color-site.png" alt="Compacto Records" title="Compacto Records"> -->
        <p class="wrapper-box__title text-center">Sign in</p>
        <div>
          <form class="form form-newaccount" id="loginForm"  @submit.prevent="login">
            <div class="form-group">
              <label for="inputUser">E-mail</label>
              <input v-model="email" type="text" class="form-control" placeholder="Username">
            </div>
            <div class="form-group">
              <label for="inputPassword">Password</label>
              <input v-model="password" id="inputPassword" type="password" class="form-control" placeholder="Password">
            </div>
            <div class="custom-control custom-checkbox pull-right">
              <input type="checkbox" class="custom-control-input" id="customCheck1">
              <label class="custom-control-label" for="customCheck1">Remember password</label>
            </div>
            <button type="submit" class="btn btn-default">Login</button>
            <!-- <input type="button" v-on:click="login()" class="btn btn-default" id="submitLogin" value="Entrar">
            <transition name="fade">
              <span class="error-block error-message" v-show="error != null">{{ error }}</span>
             </transition> -->
             <hr>
             <router-link to="/register" class="text-link d-block text-right">No account yet?</router-link>
          </form>
        </div>
      </div>
    </div>
  </b-card>
</template>


<script>
export default {
  data() {
    return {
      email: "",
      password: ""
    };
  },

  methods: {
    login: function() {
      let username = this.email;
      let password = this.password;
      this.$store
        .dispatch("login", { username, password })
        .then(() => this.$router.push("/"))
        .catch(err => alert(err));
    }
  }
};
</script>
<style scoped>
.fade-enter,
.fade-leave-active {
  opacity: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 300ms;
}
</style>
