<template>
  <div id="app">
    <b-navbar toggleable="lg" type="dark" variant="primary" v-if="isLoggedIn && compStatus" style="margin-bottom:5px">
      <b-navbar-brand href="/login" v-if="!isLoggedIn  && compStatus">Login</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-dropdown variant="primary">
            <template v-slot:button-content>
              <b-icon icon="pencil-square"></b-icon>Masters
            </template>
            <b-dropdown-item-button @click="$router.push('/options')" v-if="$store.getters.isAdmin">
              <b-icon icon="card-checklist" aria-hidden="true"></b-icon>Options Master
              <span class="sr-only">(Click to unlock)</span>
            </b-dropdown-item-button>
            <b-dropdown-divider v-if="$store.getters.isAdmin"></b-dropdown-divider>
            <b-dropdown-item-button  @click="$router.push('/account')">
              <b-icon icon="person-check" aria-hidden="true"></b-icon>Acount Master
              <span class="sr-only">(Click to unlock)</span>
            </b-dropdown-item-button>
          </b-dropdown>
          <b-dropdown variant="primary">
            <template v-slot:button-content>
              <b-icon icon="briefcase"></b-icon>Transactions
            </template>
            <b-dropdown-item-button @click="$router.push('/bookings')">Bookings</b-dropdown-item-button>
            <b-dropdown-divider></b-dropdown-divider>
            <b-dropdown-item-button @click="$router.push('/recipts')">Recipts</b-dropdown-item-button>
          </b-dropdown>
          <b-dropdown variant="primary">
            <template v-slot:button-content>
              <b-icon icon="file-earmark-text"></b-icon>Reports
            </template>
            <b-dropdown-item-button @click="$router.push('/reports')">Financial Reports</b-dropdown-item-button>
            <b-dropdown-divider></b-dropdown-divider>
            <!-- <b-dropdown-item-button @click="$router.push('/recipts')">Recipts</b-dropdown-item-button> -->
          </b-dropdown>

          <!-- <b-nav-form>
            <b-form-input size="sm" class="mr-sm-2" placeholder="Account Search"></b-form-input>
            <b-button
              size="lg"
              variant="link"
              style="color:#fff; padding: 0px; padding-right: 4px;margin-top: 4px;"
            >
              <b-icon icon="search" aria-hidden="true"></b-icon>
              <span class="sr-only">Search</span>
            </b-button>
          </b-nav-form>
          <b-nav-form>
            <b-form-input size="sm" class="mr-sm-2" placeholder="Booking Search"></b-form-input>
            <b-button
              size="lg"
              variant="link"
              class="mb-2"
              style="color:#fff; padding: 0px;margin-top: 14px;
"
            >
              <b-icon icon="search" aria-hidden="true"></b-icon>
              <span class="sr-only">Search</span>
            </b-button>
          </b-nav-form> -->

          <!--  -->
        </b-navbar-nav>
        <b-navbar-nav>
          <b-button variant="danger text-center" @click="changeCompany">Change Company</b-button>
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav  class="ml-auto">
         <span style="color: white"> {{this.$store.state.selectedCompany.text}} </span>
        </b-navbar-nav>
        <b-navbar-nav class="ml-auto" v-if="isLoggedIn">
          <b-dropdown variant="primary">
            <template v-slot:button-content>
              <b-avatar :src="'/images/'
              +username+'.jpg'"></b-avatar>
              {{username}}
            </template>
            <b-dropdown-item-button @click="logout">
              <b-icon icon="power" aria-hidden="true"></b-icon>Logout
              <span class="sr-only">(Click to unlock)</span>
            </b-dropdown-item-button>
          </b-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
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
          <!-- <b-row>
            <b-col style="text-align: center !important">
              <b-button
                variant="primary text-center"
                @click="selectCompany"
                :disabled="selectCompany==null"
              >Select</b-button>
            </b-col>
          </b-row> -->
        </form>
      </b-card>
    </b-modal>
    <router-view />
  </div>
</template>
<script>
export default {
  
  data() {
    return {
      company: [],
      selectedComp: null,
      companyState: null
      // username: ""
    };
  },
  methods: {
    forword() {
      this.$router.push("/");
    },
    changeCompany(){
      this.$bvModal.show("modal-company");
    },
    logout() {
      this.$store.dispatch("logout").then(() => {
        this.$router.push("/login");
      });
    },
    checkFormValidity(){
      if (this.selectedComp !== null) {
        let select = this.company.find(
          comp => comp.value === this.selectedComp
        );
        this.$store.dispatch("userComp", select);
        this.$bvModal.hide("modal-company");
      this.$router.push("/bookings");
      }
    }
  },
  mounted() {
    this.company = this.$store.state.master.company;
    this.selectedComp = this.$store.state.selectedCompany.value;
  },
  computed: {
    isLoggedIn() {
      return this.$store.getters.isLoggedIn;
    },
    compStatus() {
      return this.$store.getters.compStatus;
    },
    username() {
      return this.$store.state.user.name;
    }
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* background-color: #fff; */
  background-color: #d6d8db;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
.card{
  background-color: #fff;
   margin:3px
}

.table thead tr th{
  background-color: azure;
}

.table.b-table > tbody > .table-active, .table.b-table > tbody > .table-active > th, .table.b-table > tbody > .table-active > td {
    background-color: lavender !important;
    color: green;
}
.b-table-sticky-header {
    overflow-y: auto;
    max-height: 400px !important;
}
.image-position {
  max-height: 200px;
  padding: 0px;
  max-width: 200px;
  margin-right: 5px;
  margin-top: 6px;
}
/* #preview {
  display: flex;
  justify-content: center;
  align-items: center;
  vertical-align: middle;
  margin-top: 20px;
} */

#preview img {
  width: 200px;
  height: 200px;
}
label {
    display: inline-block;
    margin-bottom: 0.5rem;
    font-weight: bold;
}
.my-card-heading{
  text-align:center;font-weight: bold;margin-bottom: 0.5rem; font-size: 1.3rem;color: blue;
}

</style>
