<template>
  <b-card style="margin: 0 auto;  padding-top:25px; float none;margin-top:25px">
    <div>
      <div class="col wrapper-box">
        <!-- <img class="mx-auto d-block" src="../assets/logo-new-color-site.png" alt="Compacto Records" title="Compacto Records"> -->
        <p class="wrapper-box__title text-center">Sign in</p>
        <div>
          <form class="form form-newaccount" id="loginForm" @submit.prevent="login">
            <div class="form-group">
              <label for="inputUser">E-mail</label>
              <input v-model="email" type="text" class="form-control" placeholder="Username" />
            </div>
            <div class="form-group">
              <label for="inputPassword">Password</label>
              <input
                v-model="password"
                id="inputPassword"
                type="password"
                class="form-control"
                placeholder="Password"
              />
            </div>
            <div class="custom-control custom-checkbox pull-right">
              <input type="checkbox" class="custom-control-input" id="customCheck1" />
              <label class="custom-control-label" for="customCheck1">Remember password</label>
            </div>
            <button type="submit" class="btn btn-default">Login</button>
            <!-- <input type="button" v-on:click="login()" class="btn btn-default" id="submitLogin" value="Entrar">
            <transition name="fade">
              <span class="error-block error-message" v-show="error != null">{{ error }}</span>
            </transition>-->
            <hr />
            <router-link to="/register" class="text-link d-block text-right">No account yet?</router-link>
          </form>
        </div>
      </div>
    </div>
    <b-modal id="modal-company" ref="companyModal" size="lg" hide-header hide-footer>
      <b-card title="Company Selection">
        <form ref="form" @submit.stop.prevent="handleSubmit">
          <b-row>
            <b-col>
              <b-form-group
                label="Company"
                label-for="company"
                :state="companyState"
                invalid-feedback="Company is Required"
              >
                <b-form-select
                  required
                  :state="companyState"
                  id="company"
                  v-model="selectedComp"
                  :options="company"
                  class="mb-3"
                  @change="checkFormValidity"
                >
                  <!-- This slot appears above the options from 'options' prop -->
                  <template v-slot:first>
                    <b-form-select-option :value="null" disabled>-- Please select a Company --</b-form-select-option>
                  </template>
                </b-form-select>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col style="text-align: center !important">
              <b-button
                variant="primary text-center"
                @click="selectCompany"
                :disabled="selectCompany==null"
              >Select</b-button>
            </b-col>
          </b-row>
        </form>
      </b-card>
    </b-modal>
  </b-card>
</template>


<script>
export default {
  data() {
    return {
      email: "",
      password: "",
      company: [],
      selectedComp: null,
      companyState: null
    };
  },

  methods: {
    checkFormValidity() {
      const valid = this.$refs.form.checkValidity();
      this.companyState = valid;
      return valid;
    },
    selectCompany() {
      if (!this.checkFormValidity()) {
        return;
      }
      if (this.selectedComp !== null) {
        let select = this.company.find(
          comp => comp.value === this.selectedComp
        );
        this.$store.dispatch("userComp", select);
      } else {
        this.$router.push("/logout");
      }
      this.$bvModal.hide("modal-company");
      this.$router.push("/about");
    },
    login: function() {
      let username = this.email;
      let password = this.password;
      let loader = this.$loading.show({
        loader: "bars",
        color: "green"
      });
      this.$store
        .dispatch("login", { username, password })
        .then(() => {
          this.$store
            .dispatch("master")
            .then(res => {
              this.company = res;
              this.$store
                .dispatch("userData")
                .then(() => {
                  loader.hide();
                  if (this.$store.getters.isAdmin) {
                    this.$bvModal.show("modal-company");
                  } else {
                    let select = this.company.find(
                      comp => comp.value === this.$store.state.user.assComp
                    );
                    this.$store.dispatch("userComp", select);
                    this.$router.push("/");
                  }
                })
                .catch(err => alert(err));
            })
            .catch(err => alert(err));
        })
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
