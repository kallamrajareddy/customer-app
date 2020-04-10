<template>
  <div>
    <b-card :style="{'background-color': (form.defaulter)?'red':'azure'}">
      <b-row>
        <b-col>
          <span class="my-card-heading">BOOKINGS VIEW</span>
        </b-col>
      </b-row>
      <b-row>
        <b-col md="10">
          <b-row>
            <b-col md="2" class="col-padding-margin-right">
              <b-form-group id="brokerNoLbl" label="A/C Code" label-for="brokerNo">
                <b-form-input id="brokerNo" v-model="form.brokerNo" required disabled></b-form-input>
              </b-form-group>
            </b-col>
            <b-col md="3" class="col-padding-margin-right">
              <b-form-group
                id="brokerNameLbl"
                label="Name"
                invalid-feedback="Name is Required"
                label-for="brokerName"
              >
                <b-form-input id="brokerName" v-model="form.brokerName" required disabled></b-form-input>
              </b-form-group>
            </b-col>
            <b-col md="1" class="col-padding-margin-right">
              <b-form-group id="ageLbl" label="Age" label-for="age">
                <b-form-input id="age" v-model="form.age" disabled placeholder></b-form-input>
              </b-form-group>
            </b-col>
            <b-col md class="col-padding-margin-right">
              <b-form-group id="addr1Lbl" label="Mother/Father" label-for="addr1">
                <b-form-input id="addr1" disabled v-model="form.addr1"></b-form-input>
              </b-form-group>
            </b-col>
            <b-col md class="col-padding-margin-right">
              <b-form-group id="occupationLbl" label="Occupation" label-for="occupation">
                <b-form-input id="occupation" v-model="form.occupation" disabled placeholder></b-form-input>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col md>
              <b-form-group id="mobileNoLbl" label="Mobile No" label-for="mobileNo">
                <b-form-input id="mobileNo" disabled v-model="form.mobileNo"></b-form-input>
              </b-form-group>
            </b-col>
            <b-col md>
              <b-form-group id="contactPerson1Lbl" label="Intro By I" label-for="contactPerson1">
                <b-form-input
                  id="contactPerson1"
                  disabled
                  v-model="form.contactPerson1"
                  placeholder
                ></b-form-input>
              </b-form-group>
            </b-col>
            <b-col md>
              <b-form-group id="contactPerson2Lbl" label="Intro By II" label-for="contactPerson2">
                <b-form-input
                  id="contactPerson2"
                  disabled
                  v-model="form.contactPerson2"
                  placeholder
                ></b-form-input>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col md>
              <b-button
                variant="secondary text-center"
                style="float:right; margin-right:4px"
                @click="$router.push({name: 'Account', params :{search: search}})"
                value="back"
              >Back To Account Search</b-button>
              <b-button
                variant="secondary text-center"
                style="float:right; margin-right:4px"
                @click="$router.push({name: 'Bookings', params :{search: search}})"
                value="back"
              >Back To Booking Search</b-button>
              <b-button
                style="float:right; margin-right:4px"
                variant="primary"
                @click="editAccount"
              >Modify Account Info</b-button>
              <b-button
                style="float:right; margin-right:4px"
                variant="primary"
                @click="$router.push('/createBooking')"
              >Create Booking</b-button>
            </b-col>
          </b-row>
        </b-col>
        <b-col md class="image-position" style="margin-top: 0px">
          <div id="preview">
            <b-img
              width="150px"
              height="150px"
              v-if="form.brokerNo != null"
              :src="'http://localhost:8182/images/'
              +form.brokerNo+'.jpg'"
              alt="Fluid image"
            ></b-img>
          </div>
        </b-col>
      </b-row>
    </b-card>
    <!-- Tabs with card integration -->
    <b-card no-body>
      <b-tabs v-model="tabIndex" card>
        <b-tab id="active">
          <template v-slot:title>
            <!-- <b-spinner type="grow" small></b-spinner>I'm
            <i>custom</i>-->
            <span style="color: #28a745;">
              ACTIVE
              (<strong style="color:#007bff">{{form.activeBookings.length}}</strong>)
            </span>
          </template>
          <b-table
            sticky-header="true"
            responsive
            selectable
            :fields="fields"
            :items="form.activeBookings"
          >
          <template v-slot:cell(bookingDate)="row">
                <div>{{converteMongoToDate(row.value)}}</div>
              </template>
          <template v-slot:cell(closedDate)="row">
                <div>{{converteMongoToDate(row.value)}}</div>
              </template>
              <template v-slot:cell(dueDate)="row">
                <div>{{converteMongoToDate(row.value)}}</div>
              </template>
               <template v-slot:cell(actualAmount)="row">
                <div>{{row.value}}/-</div>
              </template>
              <template v-slot:cell(totalPrinciplePaid)="row">
                <div>{{row.value}}/-</div>
              </template>
              <template v-slot:cell(totalIntrestPaid)="row">
                <div>{{row.value}}/-</div>
              </template>
          </b-table>
        </b-tab>
        <b-tab id="pending">
          <template v-slot:title>
            <span style="color: orange;">
              PENDING
              (<strong style="color:#007bff">{{form.pendingBookings.length}}</strong>)
            </span>
          </template>
          <b-table
            sticky-header="true"
            responsive
            selectable
            :fields="fields"
            :items="form.pendingBookings"
          >
          <template v-slot:cell(bookingDate)="row">
                <div>{{converteMongoToDate(row.value)}}</div>
              </template>
          <template v-slot:cell(closedDate)="row">
                <div>{{converteMongoToDate(row.value)}}</div>
              </template>
              <template v-slot:cell(dueDate)="row">
                <div>{{converteMongoToDate(row.value)}}</div>
              </template>
               <template v-slot:cell(actualAmount)="row">
                <div>{{row.value}}/-</div>
              </template>
              <template v-slot:cell(totalPrinciplePaid)="row">
                <div>{{row.value}}/-</div>
              </template>
              <template v-slot:cell(totalIntrestPaid)="row">
                <div>{{row.value}}/-</div>
              </template>
          </b-table>
        </b-tab>
        <b-tab id="auctioned">
          <template v-slot:title>
            <span style="color: red;">
              AUCTIONED
              (<strong style="color:#007bff">{{form.auctionedBookings.length}}</strong>)
            </span>
          </template>
          <b-table
            sticky-header="true"
            responsive
            selectable
            :fields="fields"
            :items="form.auctionedBookings"
          >
          <template v-slot:cell(bookingDate)="row">
                <div>{{converteMongoToDate(row.value)}}</div>
              </template>
          <template v-slot:cell(closedDate)="row">
                <div>{{converteMongoToDate(row.value)}}</div>
              </template>
              <template v-slot:cell(dueDate)="row">
                <div>{{converteMongoToDate(row.value)}}</div>
              </template>
               <template v-slot:cell(actualAmount)="row">
                <div>{{row.value}}/-</div>
              </template>
              <template v-slot:cell(totalPrinciplePaid)="row">
                <div>{{row.value}}/-</div>
              </template>
              <template v-slot:cell(totalIntrestPaid)="row">
                <div>{{row.value}}/-</div>
              </template>
          </b-table>
        </b-tab>
        <b-tab id="closed">
          <template v-slot:title>
            <span style="color: black;">
              CLOSED
              (<strong>{{form.closedBookings.length}}</strong>)
            </span>
          </template>
          <b-table
            sticky-header="true"
            responsive
            selectable
            :fields="fields"
            :items="form.closedBookings"
          >
           <template v-slot:cell(bookingDate)="row">
                <div>{{converteMongoToDate(row.value)}}</div>
              </template>
           <template v-slot:cell(closedDate)="row">
                <div>{{converteMongoToDate(row.value)}}</div>
              </template>
              <template v-slot:cell(dueDate)="row">
                <div>{{converteMongoToDate(row.value)}}</div>
              </template>
              <template v-slot:cell(actualAmount)="row">
                <div>{{row.value}}/-</div>
              </template>
              <template v-slot:cell(totalPrinciplePaid)="row">
                <div>{{row.value}}/-</div>
              </template>
              <template v-slot:cell(totalIntrestPaid)="row">
                <div>{{row.value}}/-</div>
              </template>
          </b-table>
        </b-tab>
      </b-tabs>
    </b-card>

    <!-- Control buttons-->
    <!-- <div class="text-center">
      <b-button-group class="mt-2">
        <b-button @click="tabIndex--">Previous</b-button>
        <b-button @click="tabIndex++">Next</b-button>
      </b-button-group>

      <div class="text-muted">Current Tab: {{ tabIndex }}</div>
    </div>-->
  </div>
</template>

<script>
import moment from "moment";
export default {
  data() {
    return {
      tabIndex: 1,
      brokerNo: null,
      search: "",
      form: {
        brokerNo: null,
        brokerName: null,
        otherPhones1: null,
        otherPhones2: null,
        mobileNo: null,
        occupation: null,
        age: 55,
        auctionedBookings: [],
        closedBookings: [],
        activeBookings: [],
        pendingBookings: []
      },
      fields: [
        // { key: "selected", label: "Selected", sortable: false },
        { key: "bookingDate", label: "Booking Date", sortable: true },
        { key: "closedDate", label: "Closed Date", sortable: true },
        { key: "dueDate", label: "Due Date", sortable: true },
        { key: "bookingNo", label: "Booking No", sortable: true },
        // { key: "isActive", label: "Is Active", sortable: false },
        { key: "actualAmount", label: "Issue Amount", sortable: true },
        { key: "totalPrinciplePaid", label: "Principle Paid", sortable: true },
        { key: "totalIntrestPaid", label: "Intrest Paid", sortable: true },
        { key: "totalTrans", label: "Total Transactions", sortable: true }
      ]
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
        return newDate.format("DD-MM-YYYY");
      }
      return null;
    },
    getsSelectedBroker() {
      let loader = this.$loading.show({
        loader: "bars",
        color: "green"
      });
      if (this.brokerNo != null && this.brokerNo !== "") {
        this.$http
          .get(
            "/middleware/api/secured/get-broker-booking-Lst/" +
              this.brokerNo +
              "/" +
              this.$store.state.selectedCompany.value
          )
          .then(response => {
            loader.hide();
            if (response.data != null && response.data != "") {
              this.form = response.data.actualResults[0];
            }
          })
          .catch(function(error) {
            // handle error
            alert(error);
          })
          .finally(function() {
            // always executed
          });
      } else {
        loader.hide();
        this.$bvModal
          .msgBoxOk("Please select proper user", {
            title: "Wrong Information Provided",
            size: "sm",
            buttonSize: "sm",
            okVariant: "danger",
            headerClass: "p-2 border-bottom-0",
            footerClass: "p-2 border-top-0",
            centered: true
          })
          .then(value => {
            if (value) this.$router.push("/bookings");
          })
          .catch(err => {
            alert(err);
          });
      }
    },
    editAccount() {
      let brokerNo = this.brokerNo;
      this.$router.push({
        name: "UpdateAccount",
        params: { brokerNo: brokerNo, search: this.search }
      });
    }
  },
  mounted() {
    this.getsSelectedBroker();
  },
  created() {
    this.brokerNo = this.$route.params.brokerNo;
    this.search = this.$route.params.search;
  }
};
</script>

<style>
</style>