<template>
  <b-card>
       <b-row>
          <b-col>
          <span class="my-card-heading">RECIPTS SEARCH</span>
          </b-col>
      </b-row>
    <b-row>
      <b-col md>
        <form ref="form" @submit.stop.prevent>
          <b-row class="my-1">
            <b-col md sm="2" style="    padding-top: 10px;">
              <label for="accountSearch">
                <strong>Recipts Search:</strong>
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
                @click="searchBooking"
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
             <b-card-title style="text-align: left; width:260px ">Recipts Found ({{totalRows}})</b-card-title>
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
                @click="createRecipt"
              >
                <b-icon icon="pencil" aria-hidden="true"></b-icon>
                <span class="sr-only">pencil</span>New Recipt
              </b-button>
              <b-button
              :disabled="selected == ''"
               style="float:right; margin-right:4px"
                variant="danger" @click="deleteRecipt"
              >Delete Recipt
              </b-button>
              <!-- <b-button
               style="float:right; margin-right:4px"
                variant="primary" @click="$router.push({name: 'CreateBooking', params :{brokerNo: selected[0].brokerNo, search: accountSearch}})"
              >Create Booking
              </b-button>
               <b-button
               style="float:right; margin-right:4px"
               :disabled="selected == ''"
                variant="primary" 
              >GoTo Account
              </b-button> -->
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
           
             <template v-slot:cell(brokerName)="row">
                <div style="text-align: left">{{row.value}}</div>
              </template>
              <template v-slot:cell(amountTaken)="row">
                <div style="text-align: center">{{formatter.format(row.value)}}</div>
              </template>
              
              <template v-slot:cell(bookingDate)="row">
                <div style="text-align: center">{{converteMongoToDate(row.value)}}</div>
              </template>
             <template v-slot:cell(image)="data">
              <div >
                   
                <b-avatar class="align-baseline"  @click="openImage(data.item.brokerNo)" :src="'http://localhost:8182/images/'
              +data.item.brokerNo+'.jpg'"></b-avatar>
              <span
                v-if="(data.item.activeCount > 0)"
                  class="rounded-circle"
                  style="background-color: #73D500;vertical-align: top;display: inline-block;height: 10px;width: 10px;"
                ></span>
              </div>
            </template>
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
import moment from "moment";
export default {
  data() {
    return {
     req: {
        brokerNo: null,
        companyCode: null,
        bookingNo: null
      },
      formatter: "",
      selected: "",
      showImg: "",
       filter: null,
      totalRows: 0,
      accountSearch: null,
      fields: [
        // { key: "selected", label: "Selected", sortable: false },
        { key: "image", label: "Identity", sortable: false },
        { key: "bookingNo", label: "Booking No", sortable: true },
        { key: "brokerName", label: "Name", sortable: true },
        // { key: "isActive", label: "Is Active", sortable: false },
        { key: "bookingDate", label: "Booking Date", sortable: true },
        { key: "amountTaken", label: "Booking Amount", sortable: true },
        // { key: "auctioned", label: "Auctioned Bookings", sortable: true },
        // { key: "closed", label: "Closed Bookings", sortable: true },
      ],
      items: []
    };
  },
  methods: {
       converteMongoToDate(dateObject) {
      //{  "month": "AUGUST",  "year": 1960,  "dayOfMonth": 5,  "hour": 5,  "minute": 30,  "second": 0}
      if (dateObject != null && dateObject && dateObject != "") {
        var newDate = moment(dateObject);
        // newDate.set("year", dateObject.year);
        // newDate.set("month", dateObject.month);
        // newDate.set("date", dateObject.dayOfMonth);
        // newDate.startOf("day");
        return newDate.format("DD/MM/YYYY");
      }
      return null;
    },
      createRecipt(){
          let brokerNo = this.selected[0].brokerNo;
          let bookingNo = this.selected[0].bookingNo;
          let companyCode =  this.$store.state.selectedCompany.value;
          //console.log(brokerNo,bookingNo,companyCode)
          this.$router.push({name: "NewRecipt", params :{req:{brokerNo, bookingNo,companyCode}, search: this.accountSearch}})
      },
      deleteRecipt(){
          let brokerNo = this.selected[0].brokerNo;
          let bookingNo = this.selected[0].bookingNo;
          let companyCode =  this.$store.state.selectedCompany.value;
          //console.log(brokerNo,bookingNo,companyCode)
          this.$router.push({name: "DeleteRecipt", params :{req:{brokerNo, bookingNo,companyCode}, search: this.accountSearch}})
      },
    onRowSelected(item) {
      this.selected = item;
    },
    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length;
    },
    openImage(accCode){
        //console.log(accCode)
        this.showImg = accCode;
        this.$bvModal.show("modal-image");
    },
    searchBooking() {
        let formData = new FormData();
        this.req.brokerNo = this.accountSearch.toUpperCase();
        this.req.companyCode = this.$store.state.selectedCompany.value;

      formData.append("form", JSON.stringify(this.req));
      let loader = this.$loading.show({
        loader: "bars",
        color: "green"
      });
      this.$http
        .post("/middleware/api/secured/get-broker-bookings-details", formData)
        .then(response => {
              let actualResults = response.data;
               actualResults.forEach(function(account){ 
                 if(account.defaulter || account.closed || account.auctioned){
                     account._rowVariant = 'danger'
                 }
              });
          this.items = actualResults;
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
     this.formatter = new Intl.NumberFormat('en-IN');
      if(this.accountSearch != undefined && this.accountSearch != '' ){
          this.searchBooking();
      }
  },
  created() {
      if(this.$route.params.search)this.accountSearch = this.$route.params.search;
  }
};
</script>

<style scoped>
.count-color{
    background-color: #73D500;color:#fff;border-radius: 4px;
}
</style>