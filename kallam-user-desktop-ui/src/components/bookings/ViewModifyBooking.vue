<template>
  <div>
    <b-card :style="{'background-color': (form.defaulter)?'red':'azure'}">
      <b-row>
        <b-col>
          <span class="my-card-heading">View/Modify BOOKING</span>
        </b-col>
      </b-row>
      <b-row>
        <b-col md="1" class="col-padding-margin-right">
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
        <b-col md="2">
          <b-form-group id="mobileNoLbl" label="Mobile No" label-for="mobileNo">
            <b-form-input id="mobileNo" disabled v-model="form.mobileNo"></b-form-input>
          </b-form-group>
        </b-col>
         <b-col md="1" class="col-padding-margin-right">
          <b-form-group id="ageLbl" label="Age" label-for="age">
            <b-form-input id="age" v-model="form.age" disabled placeholder></b-form-input>
          </b-form-group>
        </b-col>
      </b-row>
      <b-row>
        <b-col md>
          <b-form-group id="contactPerson1Lbl" label="Intro By I" label-for="contactPerson1">
            <b-form-input id="contactPerson1" disabled v-model="form.contactPerson1" placeholder></b-form-input>
          </b-form-group>
        </b-col>
        <b-col md>
          <b-form-group id="contactPerson2Lbl" label="Intro By II" label-for="contactPerson2">
            <b-form-input id="contactPerson2" disabled v-model="form.contactPerson2" placeholder></b-form-input>
          </b-form-group>
        </b-col>
        <b-col md>
          <b-form-group id="addr2Lbl" label="Door No" label-for="addr2">
            <b-form-input id="addr2" disabled v-model="form.addr2"></b-form-input>
          </b-form-group>
        </b-col>
        <b-col md>
          <b-form-group id="addr3Lbl" label="Street" label-for="addr3">
            <b-form-input id="addr3" disabled v-model="form.addr3"></b-form-input>
          </b-form-group>
        </b-col>
        <b-col md>
          <b-form-group id="areaLbl" label="Area" label-for="area">
            <b-form-input id="area" disabled v-model="form.area"></b-form-input>
          </b-form-group>
        </b-col>
        <b-col md>
          <b-form-group id="townLbl" label="Town" label-for="town">
            <b-form-input id="town" disabled v-model="form.town"></b-form-input>
          </b-form-group>
        </b-col>
      </b-row>
    </b-card>
    <b-card style="background-color:azure">
      <b-form ref="form" @submit.stop.prevent>
        <b-row>
          <b-col md="2" class="col-padding-margin-right">
            <b-form-group id="bookingDateLbl" label="Booking Date" label-for="bookingDate">
              <date-picker
                v-model="bookingDate"
                :config="bookingOptions"
                placeholder="DD/MM/YYYY"
                :disabled="displayFlg"
                v-bind:class="{ 'is-invalid': attemptSubmit && bookingDateVal }"
              ></date-picker>
            </b-form-group>
            <!-- <div class="invalid-feedback">This Field Required</div> -->
          </b-col>
          <b-col md="2" class="col-padding-margin-right">
            <b-form-group id="bookingNoLbl" label="Booking No" label-for="bookingNo">
              <b-form-input
                id="bookingNo"
                v-model="form.bookings.bookingNo"
                required
                :disabled="displayFlg"
                v-bind:class="{ 'is-invalid': attemptSubmit && bookingNoVal }"
              ></b-form-input>
            </b-form-group>
            <!-- <b-form-group
              id="bookingNoLbl"
              label="Booking No"
              invalid-feedback="Booking No is Required"
              label-for="bookingNo"
            >
              <b-form-input
                id="bookingNo"
                v-model="form.bookingNo"
                required
                v-bind:class="{ 'is-invalid': attemptSubmit && bookingNoVal }"
              ></b-form-input>
            </b-form-group>-->
            <!-- <div class="invalid-feedback">This Field Required</div> -->
          </b-col>
          <b-col md="2" class="col-padding-margin-right">
            <b-form-group id="tranTypeLbl" label="Tranaction Type" label-for="tranType">
              <b-form-select
                id="tranType"
                v-model="selectedTrans"
                :disabled="displayFlg"
                v-bind:class="{ 'is-invalid': attemptSubmit && tranTypeVal }"
                @change="changeTransType"
              >
                <option
                  v-for="(transType,index) in typeOfLoans"
                  :key="index"
                  :value="index"
                >{{ transType.label }}</option>
              </b-form-select>
              <!-- <div class="invalid-feedback">This Field Required</div> -->
            </b-form-group>
          </b-col>
          <b-col md="2" class="col-padding-margin-right">
            <b-form-group id="loanTypeLbl" label="Loan Type" label-for="loanType">
              <b-form-select
                id="loanType"
                v-model="form.bookings.loanType"
                @change="changeLoanType"
                v-bind:class="{ 'is-invalid': attemptSubmit && loanTypeVal }"
                :disabled="loanOptions.length<=0 || displayFlg"
              >
                <option v-for="(option,idx) in loanOptions" :key="idx" :value="option">{{ option }}</option>
              </b-form-select>
            </b-form-group>
            <div class="invalid-feedback">This Field Required</div>
          </b-col>
          <b-col md="4" class="col-padding-margin-right">
            <b-form-group style="color:red;" id="remarksLbl" label="Remarks" label-for="remarks">
              <b-form-input id="remarks" :disabled="displayFlg" v-model="form.bookings.remarks"></b-form-input>
            </b-form-group>
          </b-col>
        </b-row>
        <b-row
          v-if="((form.bookings.tranType != null && form.bookings.tranType=='Issue') && (form.bookings.loanType !=null && form.bookings.loanType != 'DOCUMENT' && form.bookings.loanType !='INSECURE'))"
        >
          <b-col md="3">
            <b-form-group id="multiLbl" label="Add/Delete Items" label-for="multi">
              <multiselect
                v-model="multiItems"
                :options="typeOfItems"
                :multiple="true"
                :disabled="displayFlg"
                :taggable="true"
                @select="selectedItem"
                @remove="removedItem"
              >
                <!-- <template slot="option" slot-scope="props">
      <div class="option__desc"><span class="option__title">{{ props.option.name }}</span></div>
                </template>-->
              </multiselect>
            </b-form-group>
          </b-col>
          <b-col md="9">
            <b-table-simple hover small caption-top responsive>
              <b-thead head-variant="secondary">
                <b-tr>
                  <b-th colspan="1" style="background-color:#d6d8db; important!">SNo</b-th>
                  <b-th colspan="4" style="background-color:#d6d8db; important!">Item</b-th>
                  <b-th colspan="1" style="background-color:#d6d8db; important!">Quantity</b-th>
                  <b-th colspan="1" style="background-color:#d6d8db; important!">Gross Weight</b-th>
                  <b-th colspan="1" style="background-color:#d6d8db; important!">Net Weight</b-th>
                  <b-th colspan="2" style="background-color:#d6d8db; important!">UMO</b-th>
                  <b-th colspan="2" style="background-color:#d6d8db; important!">Remarks</b-th>
                </b-tr>
              </b-thead>
              <b-tbody>
                <b-tr v-for="(item,idx) in form.bookings.items" :key="idx">
                  <b-td colspan="1">{{idx+1}}</b-td>
                  <b-td colspan="4">
                    <b-form-input v-model="item.itemCode" required disabled></b-form-input>
                  </b-td>
                  <b-td colspan="1">
                    <b-form-input
                      v-model="item.quantity"
                      @blur="addTotal"
                      type="number"
                      :disabled="displayFlg"
                      required
                      v-bind:class="{ 'is-invalid': attemptSubmit && validateEmpty(item.quantity) }"
                    ></b-form-input>
                    <!-- <div class="invalid-feedback">This field is required.</div> -->
                  </b-td>
                  <b-td colspan="1">
                    <b-form-input
                      v-model="item.grossWeight"
                      @blur="addTotal"
                      type="number"
                      :disabled="displayFlg"
                      required
                      v-bind:class="{ 'is-invalid': attemptSubmit && validateEmpty(item.grossWeight) }"
                    ></b-form-input>
                    <!-- <div class="invalid-feedback">This field is required.</div> -->
                  </b-td>
                  <b-td colspan="1">
                    <b-form-input
                      v-model="item.netWeight"
                      @blur="addTotal"
                      :disabled="displayFlg"
                      type="number"
                      required
                      v-bind:class="{ 'is-invalid': attemptSubmit && validateEmpty(item.netWeight) }"
                    ></b-form-input>
                    <!-- <div class="invalid-feedback">This field is required.</div> -->
                  </b-td>
                  <b-td colspan="2">
                    <b-form-select :disabled="displayFlg" v-model="item.uom" :options="umoOptions"></b-form-select>
                    <!-- <div class="invalid-feedback">This field is required.</div> -->
                  </b-td>
                  <b-td colspan="2">
                    <b-form-input  :disabled="displayFlg" v-model="item.remarks"></b-form-input>
                  </b-td>
                </b-tr>
              </b-tbody>
              <b-tfoot v-if="form.bookings.items.length>0">
                <b-tr variant="secondary" class="text-center">
                  <b-td colspan="1">
                    Total:-
                    <!-- Total:- <b>{{form.items.length}}</b> -->
                  </b-td>
                  <b-td colspan="4"></b-td>
                  <b-td colspan="1" class="text-left">{{quantity}}</b-td>
                  <b-td colspan="1" class="text-left">{{form.bookings.grossWeight}}</b-td>
                  <b-td colspan="1" class="text-left">{{form.bookings.netWeight}}</b-td>
                  <b-td colspan="2"></b-td>
                  <b-td colspan="2"></b-td>
                </b-tr>
              </b-tfoot>
            </b-table-simple>
          </b-col>
        </b-row>
        <b-row>
          <b-col md="2">
            <b-form-group
              id="amountTakenLbl"
              label="Issue Amount"
              label-for="amountTaken"
              style="color:red;"
            >
              <b-form-input
                style="color:red;"
                id="amountTaken"
                type="number"
                :disabled="displayFlg"
                v-bind:class="{ 'is-invalid': attemptSubmit && amountTakenVal }"
                v-model="form.bookings.amountTaken"
                placeholder
              ></b-form-input>
            </b-form-group>
          </b-col>
          <b-col md="1">
            <b-form-group label="Intrest Type">
              <b-form-radio-group
                id="radio-group-1"
                v-model="form.bookings.intrestType"
                :disabled="displayFlg"
                :options="typeOfIntrest"
              ></b-form-radio-group>
            </b-form-group>
          </b-col>
          <b-col md="1" v-if="form.bookings.intrestType =='RS'">
            <b-form-group id="intrestRateLbl" label="Intrest: ₹" label-for="intrestRate">
              <b-form-input
                id="intrestRate"
                type="number"
                :disabled="displayFlg"
                v-model="form.bookings.intrestRate"
                placeholder
              ></b-form-input>
            </b-form-group>
          </b-col>
          <b-col md="1" v-else>
            <b-form-group id="intrestRateLbl" label="Intrest: %" label-for="intrestRate">
              <b-form-input
                id="intrestRate"
                type="number"
                :disabled="displayFlg"
                v-model="form.bookings.intrestRate"
                placeholder
              ></b-form-input>
            </b-form-group>
          </b-col>
          <b-col md="1">
            <b-form-group id="purityLbl" label="Purity %" label-for="purity">
              <b-form-input id="purity" :disabled="displayFlg" type="number" v-model="form.bookings.purity"></b-form-input>
            </b-form-group>
          </b-col>
          <b-col md="1" v-if="displayFlg">
            <b-form-group label="Auctioned"  label-for="auctioned">
              <b-form-checkbox
                id="auctioned"
                v-model="form.bookings.auctioned"
                :disabled="displayFlg"
              ></b-form-checkbox>
            </b-form-group>
          </b-col>
          <b-col md="1"  v-if="displayFlg">
            <b-form-group label="Closed"  label-for="closed">
              <b-form-checkbox
                id="closed"
                v-model="form.bookings.closed"
                :disabled="displayFlg"
              ></b-form-checkbox>
            </b-form-group>
          </b-col>
          <b-col md="2" class="col-padding-margin-right">
            <label for="dob">Due Date</label>
            <b-input-group>
              <date-picker :disabled="form.bookings.closed || form.bookings.auctioned" v-model="dueDate" :config="options" placeholder="DD/MM/YYYY"></date-picker>
            </b-input-group>
          </b-col>
          <b-col md="2" class="col-padding-margin-right">
            <label for="dob">Expiery Date</label>
            <b-input-group>
              <date-picker :disabled="form.bookings.closed || form.bookings.auctioned"  v-model="valueDate" :config="options" placeholder="DD/MM/YYYY"></date-picker>
            </b-input-group>
          </b-col>
        </b-row>
        <b-row>
          <b-col md>
            <span style="float:left;">
              Amount In Words:
              <span
                style="color:red; font:bold;"
                v-if="form.bookings.amountTaken >0"
              >{{ form.bookings.amountTaken | toWords }} RUPIES ONLY</span>
            </span>
          </b-col>
        </b-row>
        <!-- <b-row v-if="form.bookings.bookingTrans.length>0">
            <b-table-simple hover small caption-top responsive>
    
    <b-thead head-variant="dark">
      
      <b-tr>
        <b-th>Principle Amount</b-th>
        <b-th>Transaction Date</b-th>
        <b-th>Paid Principle</b-th>
        <b-th>Paid Interest</b-th>
        <b-th>Pending Interest</b-th>
      </b-tr>
    </b-thead>
    <b-tbody>
      <b-tr variant="secondary" v-for="(trans, idx) in form.bookings.bookingTrans" :key="idx">
        <b-th v-if="idx==0" :rowspan="form.bookings.bookingTrans.length"></b-th>

        <b-td >{{converteMongoToDate(trans.rcvDate)}}</b-td>
        <b-td>{{formatter.format(trans.principle)}}</b-td>
        <b-td>{{formatter.format(trans.intrest)}}</b-td>
        <b-td  :style="{'color': '#fff','background-color' :Math.sign(trans.pending)>=-0?'#28a745':'#DC3547'}">{{formatter.format(trans.pending)}}</b-td>
       
      </b-tr>
    </b-tbody>
    <b-tfoot>
      <b-tr  variant="success">
        <b-td style="color:red;font:bold;">
          {{formatter.format(form.bookings.amountTaken)}}
        </b-td>
        <b-td ></b-td>
        <b-td  style="color:red;font:bold;">{{formatter.format(paidPrinciple)}}</b-td>
        <b-td  style="color:red;font:bold;">{{formatter.format(paidIntrest)}}</b-td>
        <b-td ></b-td>
      </b-tr>
    </b-tfoot>
  </b-table-simple>
        </b-row> -->
        <b-row bg-variant="light" style="position:sticky;bottom:0;padding-top:10px;">
          <b-col md style="text-align: center !important">
            <b-button
              variant="primary text-center"
              @click="updateBooking"
               v-if="!form.bookings.closed && form.bookings.bookingTrans.length<1"
              value="Update"
            >Update Booking</b-button>&nbsp;&nbsp;
            <b-button
              variant="primary text-center"
              @click="createRecipt"
              value="newRecipt"
              v-if="!form.bookings.closed"
            >New Recipt</b-button>&nbsp;&nbsp;
            <b-button
              variant="secondary text-center"
               @click="$router.push({name: 'BookingsView', params :{brokerNo: form.brokerNo, search: form.brokerNo}})"
              value="back"
            >Back To Booking</b-button>
          </b-col>
        </b-row>
      </b-form>
    </b-card>
  </div>
</template>

<script>
import Multiselect from "vue-multiselect";
//import converter from "number-to-words";
import converter from 'number-into-words';
import moment from "moment";
export default {
  components: { Multiselect },
  data() {
    return {
      actualBookingNo: null,
        formatter:{},
        displayFlg: false,
      req: {
        brokerNo: null,
        companyCode: null,
        bookingNo: null
      },
      umoOptions: ["Grams", "Kgs"],
      selectedTrans: 0,
      typeOfIntrest: [
        { text: "Rs", value: "RS" },
        { text: "%", value: "Percent" }
      ],
      bookingOptions: {
        format: "DD/MM/YYYY",
        useCurrent: true
      },
      options: {
        format: "DD/MM/YYYY",
        useCurrent: false,
      },
      typeOfLoans: [
        { label: "Issue", options: ["DOCUMENT", "GOLD", "INSECURE", "SILVER"] },
        { label: "Capital", options: ["BANK", "DEPOSIT", "OWN"] },
        { label: "Off Exp", options: [] },
        { label: "Res-Exp", options: [] }
      ],
      loanOptions: ["GOLD", "SILVER", "INSECURE", "DOCUMENT"],
      typeOfItems: [],
      amountWords: "",
      bookingDate: new Date(),
      dueDate: new Date(),
      valueDate: new Date(),
      quantity: 0.0,
      paidPrinciple:0,
      paidIntrest:0,
      form: {
        brokerNo: null,
        brokerName: null,
        otherPhones1: null,
        otherPhones2: null,
        mobileNo: null,
        occupation: null,
        age: null,
        addr1: null,
        addr2: null,
        addr3: null,
        area: null,
        town: null,
        bookings: {
          bookingDate: new Date(),
          bookingNo: null,
          tranType: "Issue",
          grossWeight: 0.0,
          netWeight: 0.0,
          purity: null,
          closed:false,
          auctioned: false,
          intrestRate: null,
          dueDate: null,
          valueDate: null,
          loanType: null,
          remarks: null,
          amountTaken: null,
          intrestType: "RS",
          items: [],
          createdBy: null,
          updatedBy: null,
          bookingTrans: []
        }
      },
      multiItems: [],
      search: "",
      attemptSubmit: false
    };
  },
  filters: {
    toWords: function(value) {
      if (!value) return "";
      return converter.indianConversion(value, {characterCase: 'UPPERCASE'});
    }
  },
  created() {
    this.req = this.$route.params.req;
    this.search = this.$route.params.search;
  },
  mounted() {
       this.formatter = new Intl.NumberFormat('en-IN');
    this.typeOfItems = this.$store.state.master.typeOfItems;
    this.getsSelectedAccount();
  },
  methods: {
    createRecipt(){
          let brokerNo = this.form.brokerNo;
          let bookingNo = this.form.bookings.bookingNo;
          let companyCode =  this.$store.state.selectedCompany.value;
         // console.log(brokerNo,bookingNo,companyCode)
          this.$router.push({name: "NewRecipt", params :{req:{brokerNo, bookingNo,companyCode}, search: this.search }})
      },
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
    updateBooking(event) {
      let val  = event.target.value;
      this.attemptSubmit = true;
     const updateBooking =  {
        brokerNo: this.form.brokerNo,
        companyCode: this.$store.state.selectedCompany.value,
        bookingDate: this.form.bookings.bookingDate,
        bookingNo: this.form.bookings.bookingNo,
        bookingCode: this.actualBookingNo,
        tranType: this.form.bookings.tranType,
        grossWeight: this.form.bookings.grossWeight,
        netWeight:this.form.bookings.netWeight,        
        purity: this.form.bookings.purity,
        intrestRate: this.form.bookings.intrestRate,
        dueDate: this.form.bookings.dueDate,
        valueDate: this.form.bookings.valueDate,
        loanType: this.form.bookings.loanType,
        remarks: this.form.bookings.remarks,
        amountTaken: this.form.bookings.amountTaken,
        intrestType: this.form.bookings.intrestType,
        items: this.form.bookings.items,
        createdBy: null,
        updatedBy: this.$store.state.user.username,
        bookingTrans: [],
      }
      let formData = new FormData();
      formData.append("form", JSON.stringify(updateBooking));
     // console.log(updateBooking);
      this.$bvModal
        .msgBoxConfirm("Please confirm that you want to Update Booking.", {
          title: "Confirmation",
          size: "sm",
          buttonSize: "sm",
          okVariant: "primary",
          cancelVariant: "danger",
          okTitle: "Proceed...",
          cancelTitle: "Cancel",
          footerClass: "p-2",
          hideHeaderClose: false,
          centered: true
        })
        .then(value => {
          if (value) {
            let loader = this.$loading.show({
              loader: "dots",
              color: "green"
            });
            this.$http
              .post("/middleware/api/secured/update-booking", formData)
              .then(() => {
                loader.hide();
                this.$bvModal
                  .msgBoxOk("Booking Booking Updated", {
                    title: "Confirmation",
                    size: "sm",
                    buttonSize: "sm",
                    okVariant: "info",
                    headerClass: "p-2 border-bottom-0",
                    footerClass: "p-2 border-top-0",
                    centered: true
                  })
                  .then(value => {
                    if (value){
                      if(val == "Update"){
                        this.$router.push({name: "BookingsView", params :{brokerNo: this.form.brokerNo, search: this.search}});
                  
                          }
                          // else if(val == "newRecipt"){
                          //     let brokerNo = updateBooking.brokerNo;
                          //     let bookingNo = updateBooking.bookingNo;
                          //     let companyCode =  updateBooking.companyCode;
                          //     this.$router.push({name: "NewRecipt", params :{req:{brokerNo, bookingNo,companyCode}, search: this.accountSearch}})
                          // }
                       }
                  })
                  .catch(err => {
                    alert(err);
                  });
              })
              .catch(function(error) {
                // handle error
                alert(error);
              })
              .finally(function() {
                // always executed
              });
          }
        })
        .catch(err => {
          alert(err);
        });
    },
    validateEmpty(val) {
      if (val === "" || val <= 0) return true;
      else return false;
    },
    getsSelectedAccount() {
      let formData = new FormData();
      if(this.req.brokerNo == null || this.req.bookingNo == null)this.$router.push("/bookings");
      formData.append("form", JSON.stringify(this.req));
      let loader = this.$loading.show({
        loader: "bars",
        color: "green"
      });
      this.$http
        .post("/middleware/api/secured/get-broker-booking-details", formData)
        .then(response => {
          loader.hide();
          if (response.data != null && response.data != "") {
            this.bookingDate = moment(response.data.bookings.bookingDate).format("DD/MM/YYYY");
            this.dueDate = moment(response.data.bookings.dueDate).format("DD/MM/YYYY");
            this.valueDate = moment(response.data.bookings.valueDate).format("DD/MM/YYYY");
            if(response.data.bookings.items.length>0){
                response.data.bookings.items.forEach(item => {
                    this.multiItems.push(item.itemCode);
                    this.quantity += item.quantity;
                    });
            }
            if(response.data.bookings.bookingTrans.length>0){
                this.displayFlg = true;
                 response.data.bookings.bookingTrans.sort((a,b)=> moment(a.rcvDate)-moment(b.rcvDate))
                //  response.data.bookings.bookingTrans.forEach((trans, idx)=>{
                // this.paidPrinciple +=parseFloat(trans.principle);
                //  this.paidIntrest +=parseFloat(trans.intrest);
                //  let  daysDiff;
                //  let prin = parseFloat(response.data.bookings.amountTaken);
                //  let rate = parseFloat(response.data.bookings.intrestRate);
                // let intPerYear = parseFloat(prin*((rate*12)/100));
                // let perDay =  parseFloat(intPerYear/360);
                // let actualIntrest;
                //  if(idx == 0){
                //    daysDiff = moment(trans.rcvDate).diff(moment(response.data.bookings.bookingDate), "days");
                //     actualIntrest = parseFloat(daysDiff*perDay);
                //    trans.pending =  parseFloat(parseFloat(trans.intrest)-actualIntrest);
                //  }else{
                //    let paidTotal = parseFloat(0.00);
                //    for(let i = (idx-1); i>=0; i--){
                //      paidTotal += parseFloat( response.data.bookings.bookingTrans[i].principle);
                //    }
                //      prin = parseFloat(response.data.bookings.amountTaken) - parseFloat(paidTotal);
                //      daysDiff = moment(trans.rcvDate).diff(moment(response.data.bookings.bookingTrans[idx-1].rcvDate), "days");
                //      intPerYear = parseFloat(prin*((rate*12)/100));
                //      perDay =  parseFloat(intPerYear/360);
                //      actualIntrest = parseFloat(daysDiff*perDay) - parseFloat(response.data.bookings.bookingTrans[idx-1].pending);
                //      trans.pending =  parseFloat(parseFloat(trans.intrest)-actualIntrest);
                //  }
                // })
                
            }
            this.onloadTransType(response.data.bookings.tranType);
            this.form = response.data;
            this.actualBookingNo = this.form.bookings.bookingNo;
            this.form.bookings.bookingDate = moment(this.bookingDate,"DD/MM/YYYY");
            this.form.bookings.dueDate = moment(this.dueDate, "DD/MM/YYYY");
            this.form.bookings.valueDate = moment(this.valueDate, "DD/MM/YYYY");
          } else {
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
        })
        .catch(function(error) {
          // handle error
          alert(error);
        })
        .finally(function() {
          // always executed
        });
    },
    reload() {
      window.location.reload(true);
    },
    converter() {
      return converter;
    },
    onloadTransType(label){
      this.typeOfLoans.forEach((loanType, idx) => {
        if(label == loanType.label ){
          this.selectedTrans = idx;
        }
      })
      this.loanOptions = this.typeOfLoans[this.selectedTrans].options;
      this.form.bookings.tranType = this.typeOfLoans[this.selectedTrans].label;
    },
    changeTransType() {
      this.form.bookings.loanType = "";
      this.loanOptions = this.typeOfLoans[this.selectedTrans].options;
      this.form.bookings.tranType = this.typeOfLoans[this.selectedTrans].label;
      this.form.bookings.items = [];
      this.multiItems = [];
    },
    changeLoanType() {
      this.form.bookings.items = [];
      this.multiItems = [];
    },
    selectedItem(itemCode) {
      this.form.bookings.items.push({
        itemNo: this.form.bookings.items.length + 1,
        itemCode: itemCode,
        grossWeight: parseFloat(0),
        netWeight: parseFloat(0),
        uom: "Grams",
        quantity: parseInt(0),
        remarks: null
      });
    },
    removedItem(itemCode) {
      this.form.bookings.items = this.form.bookings.items.filter(
        item => item.itemCode !== itemCode
      );
    },
    addTotal() {
      (this.form.bookings.grossWeight = parseFloat(0)),
        (this.form.bookings.netWeight = parseFloat(0)),
        (this.quantity = parseInt(0)),
        this.form.bookings.items.forEach(item => {
          this.form.bookings.grossWeight += parseFloat(item.grossWeight);
          this.form.bookings.netWeight += parseFloat(item.netWeight);
          this.quantity += parseInt(item.quantity);
        });
    }
  },
  computed: {
    bookingDateVal: function() {
      if (
        this.form.bookings.bookingDate !== null &&
        this.form.bookings.bookingDate !==
          "" /*&& typeof this.form.bookingDate == moment*/
      ) {
        return false;
      }
      return true;
    },
    tranTypeVal: function() {
      if (
        this.form.bookings.tranType !== null &&
        this.form.bookings.tranType !== "" &&
        this.form.bookings.tranType.length >= 1
      ) {
        return false;
      }
      return true;
    },
    loanTypeVal: function() {
      if (
        this.form.bookings.tranType !== null &&
        this.form.bookings.tranType !== "" &&
        this.form.bookings.tranType !== "Off Exp" &&
        this.form.bookings.tranType !== "Res-Exp"
      ) {
        if (
          this.form.bookings.loanType !== null &&
          this.form.bookings.loanType !== undefined &&
          this.form.bookings.loanType !== "" &&
          this.form.bookings.loanType.length >= 1
        ) {
          return false;
        }
        return true;
      }
      return false;
    },
    amountTakenVal: function() {
      if (
        this.form.bookings.amountTaken !== null &&
        this.form.bookings.amountTaken !== "" &&
        this.form.bookings.amountTaken >= 1
      ) {
        return false;
      }
      return true;
    },
    intrestRateVal: function() {
      if (
        this.form.bookings.intrestRate !== null &&
        this.form.bookings.intrestRate !== "" &&
        this.form.bookings.intrestRate > 0
      ) {
        return false;
      }
      return true;
    },
    bookingNoVal: function() {
      if (
        this.form.bookings.bookingNo !== null &&
        this.form.bookings.bookingNo !== "" &&
        this.form.bookings.bookingNo.length >= 5
      ) {
        return false;
      }
      return true;
    }
    // dueDateVal: function() {
    //    if(this.form.dueDate !== null && this.form.dueDate !== ''){
    //     return false;
    //   }
    //   return true;
    // },
    // valueDateVal: function() {
    //   if(this.form.valueDate !== null && this.form.valueDate !== ''){
    //     return false;
    //   }
    //   return true;
    // },
    // purityVal: function() {
    //   if(this.form.purity !== null && this.form.purity !== '' && this.form.purity >= 1){
    //     return false;
    //   }
    //   return true;
    // }
  },
  watch: {
    bookingDate() {
      this.form.bookings.bookingDate = moment(this.bookingDate, "DD/MM/YYYY");
    },
    dueDate() {
      this.form.bookings.dueDate = moment(this.dueDate, "DD/MM/YYYY");
    },
    valueDate() {
      this.form.bookings.valueDate = moment(this.valueDate, "DD/MM/YYYY");
    }
  }
};
</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style>
</style>