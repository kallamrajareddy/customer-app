<template>
  <b-card>
       <b-row>
          <b-col>
          <span class="my-card-heading">Account Create/Update</span>
          </b-col>
      </b-row>
    <b-row>
      <b-col md>
        <form ref="form" @submit.stop.prevent>
          <b-row class="my-1">
            <b-col md sm="2" style="    padding-top: 10px;">
              <label for="accountSearch">
                <strong>Account Search:</strong>
              </label>
            </b-col>
            <b-col  sm="10" md="9" style="display: flex;padding-left: 0px;">
              <b-form-input
                id="accountSearch"
                style="text-transform: uppercase;margin-right:3px;"
                size="lg"
                v-model="accountSearch"
              ></b-form-input>
              <b-button
                @click="searchAccount"
                variant="primary"
                :disabled="!(accountSearch !== null && accountSearch.length>=3)"
              >
                <b-icon icon="search" aria-hidden="true"></b-icon>
                <span class="sr-only">Search</span>
              </b-button>
            </b-col>
          </b-row>
        </form>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <b-card>
        <b-row>
            <b-col md="3" style="max-width: 260px;">
             <b-card-title style="text-align: left; width:260px ">Accounts Found ({{totalRows}})</b-card-title>
            </b-col>
            <b-col md="3">
<b-form-input
          size="sm"
          :readonly="totalRows<1"
          v-model="filter"
          placeholder="🔍  Search Pending..."
          style="margin-right:10px;display: inline-flex;"
        ></b-form-input>
            </b-col>
            <b-col md="6" style="padding-right: 0px;">
               
                <b-button
               style="float:right;"
                variant="primary"
                :disabled="selected == ''"
                @click="editAccount"
              >
                <b-icon icon="pencil" aria-hidden="true"></b-icon>
                <span class="sr-only">pencil</span>Edit Account
              </b-button>
              <b-button
               style="float:right; margin-right:4px"
                variant="primary" @click="$router.push('/createAccount')"
              >Create Account
              </b-button>
               <b-button
               style="float:right; margin-right:4px"
               :disabled="selected == ''"
                variant="primary" 
              >GoTo Booking
              </b-button>
            </b-col>
            </b-row>
         
              
              
          <b-table
            ref="selectableTable"
            id="accountSearchResult"
            selectable
            :filter="filter"
            select-mode="single"
            :items="items"
            :fields="fields"
            @row-selected="onRowSelected"
            sticky-header="true"
            responsive
          >
            <!-- Example scoped slot for select state illustrative purposes -->
            <!-- <template v-slot:cell(selected)="{ rowSelected }">
              <template v-if="rowSelected">
                <span aria-hidden="true">&check;</span>
                <span class="sr-only">Selected</span>
              </template>
              <template v-else>
                <span aria-hidden="true">&nbsp;</span>
                <span class="sr-only">Not selected</span>
              </template>
            </template> -->

             <template v-slot:cell(brokerName)="row">
                <div style="text-align: left">{{row.value}}</div>
              </template>
              <template v-slot:cell(brokerNo)="row">
                <div style="text-align: left;width: 100px">{{row.value}}</div>
              </template>
              <template v-slot:cell(mobileNo)="row">
                <div style="text-align: left">{{row.value}}</div>
              </template>
              <template v-slot:cell(addr1)="row">
                <div style="text-align: left">{{row.value}}</div>
              </template>
              <template v-slot:cell(addr2)="row">
                <div style="text-align: left">{{row.value}}</div>
              </template>
              <template v-slot:cell(addr3)="row">
                <div style="text-align: left">{{row.value}}</div>
              </template>
              <template v-slot:cell(town)="row">
                <div style="text-align: left">{{row.value}}</div>
              </template>
            <template v-slot:cell(image)="data">
              <div >
                   
                <b-avatar class="align-baseline" style="backgroundcolor" @click="openImage(data.item.brokerNo)" :src="'http://localhost:8182/images/'
              +data.item.brokerNo+'.jpg'"></b-avatar>
              <span
                v-if="(data.item.bookings.find(booking => booking.closed !== true) != undefined)"
                  class="rounded-circle"
                  style="background-color: #73D500;vertical-align: top;display: inline-block;height: 10px;width: 10px;"
                ></span>
              </div>
            </template>
            <!-- <template v-slot:cell(isActive)="data">
              <div >
                <span
                v-if="(data.item.bookings.find(booking => booking.closed !== true) != undefined)"
                  class="rounded-circle"
                  style="background-color: #73D500;display: inline-block;height: 20px;width: 20px;"
                ></span>
                <span v-else class="rounded-circle" style="background-color: #EB597B;display: inline-block;height: 20px;width: 20px;"></span>
              </div>
            </template> -->
          </b-table>
        </b-card>
      </b-col>
    </b-row>
    <b-modal id="modal-image" ref="imageModal" size="sm" hide-header hide-footer>
          <b-row>
              <b-col>
                  <b-img :src="'http://localhost:8182/images/'
              +showImg+'.jpg'"  thumbnail  fluid alt="Fluid image"></b-img>
              </b-col>
          </b-row>
          <b-row style="margin-top:5px">
            <b-col style="text-align: center !important">
              <b-button
                variant="danger text-center"
                @click="$bvModal.hide('modal-image')"
              >Close</b-button>
            </b-col>
          </b-row>
    </b-modal>
  </b-card>
</template>

<script>
export default {
  data() {
    return {
      selected: "",
      showImg: "",
       filter: null,
      totalRows: 0,
      accountSearch: null,
      fields: [
        // { key: "selected", label: "Selected", sortable: false },
        { key: "image", label: "Identity", sortable: false },
        { key: "brokerName", label: "Name", sortable: true },
        // { key: "isActive", label: "Is Active", sortable: false },
        { key: "brokerNo", label: "Acc No", sortable: true },
        { key: "mobileNo", label: "Mobile No", sortable: true },
        { key: "addr1", label: "Relation", sortable: true },
        { key: "addr2", label: "Door No", sortable: true },
        { key: "addr3", label: "Street", sortable: true },
        { key: "town", label: "Town", sortable: true }
      ],
      items: []
    };
  },
  methods: {
      editAccount(){
          let brokerNo = this.selected[0].brokerNo;
          this.$router.push({name: "UpdateAccount", params :{brokerNo: brokerNo, search: this.accountSearch}})
      },
    onRowSelected(item) {
      this.selected = item;
    },
    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length;
    },
    openImage(accCode){
        console.log(accCode)
        this.showImg = accCode;
        this.$bvModal.show("modal-image");
    },
    searchAccount() {
        let loader = this.$loading.show({
        loader: "dots",
        color: "green"
      });
      this.$http
        .get(
          "/middleware/api/secured/get-broker-Lst/" +
            this.accountSearch.toUpperCase()+'/'+this.$store.state.selectedCompany.value
        )
        .then(response => {
             /*response.data.forEach(function(account){ 
                 account.bookings.forEach((booking) =>{
                     if(booking.closed){
                         account._rowVariant = 'danger'
                     }
                 })
              });
              response.data.forEach(function(account){ 
                 account.bookings.forEach((booking) =>{
                     if(!booking.closed){
                         account._rowVariant = 'info'
                     }
                 })
              });*/
               response.data.forEach(function(account){ 
                 if(account.defaulter){
                     account._rowVariant = 'danger'
                 }
              });
          this.items = response.data;
          this.totalRows = this.items.length;
          loader.hide();
        })
        .catch(function(error) {
          // handle error
          alert(error);
        })
        .finally(function() {
          // always executed
        });
    }
  },
  mounted(){
      if(this.accountSearch != undefined && this.accountSearch != '' ){
          this.searchAccount();
      }
  },
  created() {
      if(this.$route.params.search)this.accountSearch = this.$route.params.search;
  }
};
</script>

<style scoped>
</style>