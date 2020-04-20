<template>
  <div>
    <b-card :style="{'background-color': (form.defaulter)?'red':'azure'}">
      <b-row>
        <b-col>
          <span class="my-card-heading">CREATE BOOKING</span>
        </b-col>
      </b-row>
      <b-row>
        <b-col md="1" class="col-padding-margin-right">
          <b-form-group id="brokerNoLbl" label="A/C Code" label-for="brokerNo">
            <b-form-input id="brokerNo" v-model="header.brokerNo" required disabled></b-form-input>
          </b-form-group>
        </b-col>
        <b-col md="3" class="col-padding-margin-right">
          <b-form-group
            id="brokerNameLbl"
            label="Name"
            invalid-feedback="Name is Required"
            label-for="brokerName"
          >
            <b-form-input id="brokerName" v-model="header.brokerName" required disabled></b-form-input>
          </b-form-group>
        </b-col>
        <b-col md="1" class="col-padding-margin-right">
          <b-form-group id="ageLbl" label="Age" label-for="age">
            <b-form-input id="age" v-model="header.age" disabled placeholder></b-form-input>
          </b-form-group>
        </b-col>
        <b-col md class="col-padding-margin-right">
          <b-form-group id="addr1Lbl" label="Mother/Father" label-for="addr1">
            <b-form-input id="addr1" disabled v-model="header.addr1"></b-form-input>
          </b-form-group>
        </b-col>
        <b-col md class="col-padding-margin-right">
          <b-form-group id="occupationLbl" label="Occupation" label-for="occupation">
            <b-form-input id="occupation" v-model="header.occupation" disabled placeholder></b-form-input>
          </b-form-group>
        </b-col>
        <b-col md="2">
          <b-form-group id="mobileNoLbl" label="Mobile No" label-for="mobileNo">
            <b-form-input id="mobileNo" disabled v-model="header.mobileNo"></b-form-input>
          </b-form-group>
        </b-col>
      </b-row>
      <b-row>
        <b-col md>
          <b-form-group id="contactPerson1Lbl" label="Intro By I" label-for="contactPerson1">
            <b-form-input id="contactPerson1" disabled v-model="header.contactPerson1" placeholder></b-form-input>
          </b-form-group>
        </b-col>
        <b-col md>
          <b-form-group id="contactPerson2Lbl" label="Intro By II" label-for="contactPerson2">
            <b-form-input id="contactPerson2" disabled v-model="header.contactPerson2" placeholder></b-form-input>
          </b-form-group>
        </b-col>
        <b-col md>
          <b-form-group id="addr2Lbl" label="Door No" label-for="addr2">
            <b-form-input id="addr2" disabled v-model="header.addr2"></b-form-input>
          </b-form-group>
        </b-col>
        <b-col md>
          <b-form-group id="addr3Lbl" label="Street" label-for="addr3">
            <b-form-input id="addr3" disabled v-model="header.addr3"></b-form-input>
          </b-form-group>
        </b-col>
        <b-col md>
          <b-form-group id="areaLbl" label="Area" label-for="area">
            <b-form-input id="area" disabled v-model="header.area"></b-form-input>
          </b-form-group>
        </b-col>
        <b-col md>
          <b-form-group id="townLbl" label="Town" label-for="town">
            <b-form-input id="town" disabled v-model="header.town"></b-form-input>
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
                v-bind:class="{ 'is-invalid': attemptSubmit && bookingDateVal }"
              ></date-picker>
            </b-form-group>
            <!-- <div class="invalid-feedback">This Field Required</div> -->
          </b-col>
          <b-col md="2" class="col-padding-margin-right">
             <b-form-group
              id="bookingNoLbl"
              label="Booking No"
              label-for="bookingNo"
            >
              <b-form-input
                id="bookingNo"
                v-model="form.bookingNo"
                required
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
            </b-form-group> -->
            <!-- <div class="invalid-feedback">This Field Required</div> -->
          </b-col>
          <b-col md="2" class="col-padding-margin-right">
            <b-form-group id="tranTypeLbl" label="Tranaction Type" label-for="tranType">
              <b-form-select
                id="tranType"
                v-model="selectedTrans"
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
                v-model="form.loanType"
                @change="changeLoanType"
                v-bind:class="{ 'is-invalid': attemptSubmit && loanTypeVal }"
                :disabled="loanOptions.length<=0"
              >
                <option v-for="(option,idx) in loanOptions" :key="idx" :value="option">{{ option }}</option>
              </b-form-select>
            </b-form-group>
            <div class="invalid-feedback">This Field Required</div>
          </b-col>
          <b-col md="4" class="col-padding-margin-right">
            <b-form-group style="color:red;" id="remarksLbl" label="Remarks" label-for="remarks">
              <b-form-input id="remarks" v-model="form.remarks"></b-form-input>
            </b-form-group>
          </b-col>
        </b-row>
        <b-row
          v-if="((form.tranType != null && form.tranType=='Issue') && (form.loanType !=null && form.loanType != 'DOCUMENT' && form.loanType !='INSECURE'))"
        >
          <b-col md="3">
            <b-form-group id="multiLbl" label="Add/Delete Items" label-for="multi">
              <multiselect
                v-model="multiItems"
                :options="typeOfItems"
                :multiple="true"
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
              <b-thead head-variant="primary">
                <b-tr>
                  <b-th colspan="1" style="background-color:#ffc107; important!">SNo</b-th>
                  <b-th colspan="4" style="background-color:#ffc107; important!">Item</b-th>
                  <b-th colspan="1" style="background-color:#ffc107; important!">Quantity</b-th>
                  <b-th colspan="1" style="background-color:#ffc107; important!">Gross Weight</b-th>
                  <b-th colspan="1" style="background-color:#ffc107; important!">Net Weight</b-th>
                  <b-th colspan="2" style="background-color:#ffc107; important!">UMO</b-th>
                  <b-th colspan="2" style="background-color:#ffc107; important!">Remarks</b-th>
                </b-tr>
              </b-thead>
              <b-tbody>
                <b-tr v-for="(item,idx) in form.items" :key="idx">
                  <b-td colspan="1">{{idx+1}}</b-td>
                  <b-td colspan="4">
                    <b-form-input v-model="item.itemCode" required disabled></b-form-input>
                  </b-td>
                  <b-td colspan="1">
                    <b-form-input
                      v-model="item.quantity"
                      @blur="addTotal"
                      type="number"
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
                      required
                      v-bind:class="{ 'is-invalid': attemptSubmit && validateEmpty(item.grossWeight) }"
                    ></b-form-input>
                    <!-- <div class="invalid-feedback">This field is required.</div> -->
                  </b-td>
                  <b-td colspan="1">
                    <b-form-input
                      v-model="item.netWeight"
                      @blur="addTotal"
                      type="number"
                      required
                      v-bind:class="{ 'is-invalid': attemptSubmit && validateEmpty(item.netWeight) }"
                    ></b-form-input>
                    <!-- <div class="invalid-feedback">This field is required.</div> -->
                  </b-td>
                  <b-td colspan="2">
                    <b-form-select
                      v-model="item.uom"
                      :options="umoOptions"
                    ></b-form-select>
                    <!-- <div class="invalid-feedback">This field is required.</div> -->
                  </b-td>
                  <b-td colspan="2">
                    <b-form-input v-model="item.remarks"></b-form-input>
                  </b-td>
                </b-tr>
              </b-tbody>
              <b-tfoot v-if="form.items.length>0">
                <b-tr variant="secondary" class="text-center">
                  <b-td colspan="1">
                    Total:-
                    <!-- Total:- <b>{{form.items.length}}</b> -->
                  </b-td>
                  <b-td colspan="4"></b-td>
                  <b-td colspan="1" class="text-left">{{quantity}}</b-td>
                  <b-td colspan="1" class="text-left">{{form.grossWeight}}</b-td>
                  <b-td colspan="1" class="text-left">{{form.netWeight}}</b-td>
                  <b-td colspan="2"></b-td>
                  <b-td colspan="2"></b-td>
                </b-tr>
              </b-tfoot>
            </b-table-simple>
          </b-col>
        </b-row>
        <b-row>
          <b-col md>
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
                v-bind:class="{ 'is-invalid': attemptSubmit && amountTakenVal }"
                v-model="form.amountTaken"
                placeholder
              ></b-form-input>
            </b-form-group>
          </b-col>
          <b-col md>
            <b-form-group label="Intrest Type">
              <b-form-radio-group
                id="radio-group-1"
                v-model="form.intrestType"
                :options="typeOfIntrest"
              ></b-form-radio-group>
            </b-form-group>
          </b-col>
          <b-col md="1" v-if="form.intrestType =='RS'">
            <b-form-group id="intrestRateLbl" label="Intrest: ₹" label-for="intrestRate">
              <b-form-input  id="intrestRate" type="number" v-model="form.intrestRate" placeholder></b-form-input>
            </b-form-group>
          </b-col>
          <b-col md="1" v-else>
            <b-form-group id="intrestRateLbl" label="Intrest: %" label-for="intrestRate">
              <b-form-input id="intrestRate" type="number"   v-model="form.intrestRate" placeholder></b-form-input>
            </b-form-group>
          </b-col>
          <b-col md="1">
            <b-form-group id="purityLbl" label="Purity %" label-for="purity">
              <b-form-input id="purity"   type="number" v-model="form.purity"></b-form-input>
            </b-form-group>
          </b-col>
          <b-col md class="col-padding-margin-right">
            <label for="dob">Due Date</label>
            <b-input-group>
              <date-picker v-model="dueDate"  :config="options" placeholder="DD/MM/YYYY"></date-picker>
            </b-input-group>
          </b-col>
          <b-col md class="col-padding-margin-right">
            <label for="dob">Expiery Date</label>
            <b-input-group>
              <date-picker v-model="valueDate"  :config="options" placeholder="DD/MM/YYYY"></date-picker>
            </b-input-group>
          </b-col>
        </b-row>
        <b-row>
          <b-col md>
            <span style="float:left;">
              Amount In Words:
              <span style="color:red; font:bold;" v-if="form.amountTaken >0">{{ form.amountTaken | toWords }} RUPIES ONLY</span>
            </span>
          </b-col>
        </b-row>
        <b-row bg-variant="light" style="position:sticky;bottom:0;padding-top:10px;">
          <b-col md style="text-align: center !important">
            <b-button
              variant="primary text-center"
              @click="createBooking"
              value="Create"
            >Create Booking</b-button>&nbsp;&nbsp;
            <b-button variant="danger text-center" @click="reload" value="Reset">Reset</b-button>&nbsp;&nbsp;
            <b-button
              variant="secondary text-center"
              @click="$router.go(-1)"
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
import converter from "number-to-words";
import moment from "moment";
export default {
  components: { Multiselect },
  data() {
    return {
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
        useCurrent: true,
        minDate: new Date()
      },
      typeOfLoans: [
        { label: "Issue", options: ["GOLD", "SILVER", "INSECURE", "DOCUMENT"] },
        { label: "Capital", options: ["BANK", "DEPOSIT", "OWN"] },
        { label: "Off Exp", options: [] },
        { label: "Res-Exp", options: [] }
      ],
      loanOptions: ["GOLD", "SILVER", "INSECURE", "DOCUMENT"],
      typeOfItems: [],
      amountWords: "",
      header: {
        brokerNo: null,
        companyCode: null,
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
        town: null
      },
      bookingDate: new Date(),
      dueDate: new Date(),
      valueDate: new Date(),
      quantity: 0.0,
      form: {
        brokerNo: null,
        companyCode: null,
        bookingDate: new Date(),
        bookingNo: null,
        tranType: "Issue",
        grossWeight: 0.0,
        netWeight: 0.0,        
        purity: null,
        intrestRate: null,
        dueDate: null,
        valueDate: null,
        loanType: "GOLD",
        remarks: null,
        amountTaken: null,
        intrestType: "RS",
        items: [],
        createdBy: null,
        updatedBy: null,
        bookingTrans: [],
      },
      multiItems: [],
      search: "",
      attemptSubmit: false
    };
  },
  filters: {
    toWords: function(value) {
      if (!value) return "";
      return converter.toWords(value).toUpperCase();
    }
  },
  created() {
    this.header.brokerNo = this.$route.params.brokerNo;
    this.search = this.$route.params.search;
  },
  mounted() {
    this.typeOfItems = this.$store.state.master.typeOfItems;
    this.getsSelectedAccount();
  },
  methods: {
    createBooking() {
      this.attemptSubmit=true;
      //console.log(this.form)
      
      // if (!this.checkFormValidity()) {
      //   return;
      // }
      let formData = new FormData();
      this.form.createdBy = this.$store.state.user.username;
      this.form.updatedBy = this.$store.state.user.username;
      formData.append("form", JSON.stringify(this.form));
      this.$bvModal
        .msgBoxConfirm("Please confirm that you want to Create New Booking.", {
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
              .post("/middleware/api/secured/create-booking", formData)
              .then(() => {
                loader.hide();
                this.$bvModal
                  .msgBoxOk("Booking Account", {
                    title: "Confirmation",
                    size: "sm",
                    buttonSize: "sm",
                    okVariant: "info",
                    headerClass: "p-2 border-bottom-0",
                    footerClass: "p-2 border-top-0",
                    centered: true
                  })
                  .then(value => {
                    if (value) this.$router.push({name: "BookingsView", params :{brokerNo: this.form.brokerNo, search: this.search}})
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
      if (val === "" || val <=0) return true;
      else return false;
    },
    getsSelectedAccount() {
      let loader = this.$loading.show({
        loader: "bars",
        color: "green"
      });
      this.$http
        .get(
          "/middleware/api/secured/get-broker/" +
            this.header.brokerNo +
            "/" +
            this.$store.state.selectedCompany.value
        )
        .then(response => {
          loader.hide();
          if (response.data != null && response.data != "") {
            this.header = response.data;
            this.form.companyCode = this.header.companyCode;
            this.form.brokerNo = this.header.brokerNo;
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
    changeTransType() {
      this.form.loanType = "";
      this.loanOptions = this.typeOfLoans[this.selectedTrans].options;
      this.form.tranType = this.typeOfLoans[this.selectedTrans].label;
      if(this.form.tranType == "Issue"){
        this.form.loanType = "GOLD";
      }
      this.form.items = [];
      this.multiItems = [];
    },
    changeLoanType() {
      this.form.items = [];
      this.multiItems = [];
    },
    selectedItem(itemCode) {
      this.form.items.push({
        itemNo: this.form.items.length + 1,
        itemCode: itemCode,
        grossWeight: parseFloat(0),
        netWeight: parseFloat(0),
        uom: "Grams",
        quantity: parseInt(0),
        remarks: null
      });
    },
    removedItem(itemCode) {
      this.form.items = this.form.items.filter(
        item => item.itemCode !== itemCode
      );
    },
    addTotal() {
      (this.form.grossWeight = parseFloat(0)),
        (this.form.netWeight = parseFloat(0)),
        (this.quantity = parseInt(0)),
        this.form.items.forEach(item => {
          this.form.grossWeight += parseFloat(item.grossWeight);
          this.form.netWeight += parseFloat(item.netWeight);
          this.quantity += parseInt(item.quantity);
        });
    }
  },
  computed: {
    bookingDateVal: function() {
      if(this.form.bookingDate !== null && this.form.bookingDate !== '' /*&& typeof this.form.bookingDate == moment*/){
        return false;
      }
      return true;
    },
    tranTypeVal: function(){
    if(this.form.tranType !== null && this.form.tranType !== '' && this.form.tranType.length >= 1){
        return false;
      }
      return true;
    },
    loanTypeVal: function(){
    if(this.form.tranType !== null &&  this.form.tranType !== '' && 
    (this.form.tranType !== 'Off Exp' && this.form.tranType !== 'Res-Exp')){
       if(this.form.loanType !== null && this.form.loanType !== undefined && this.form.loanType !== '' && this.form.loanType.length >= 1){
          return false;
       }
        return true;
      }
      return false;
    },
    amountTakenVal: function() {
      if(this.form.amountTaken !== null && this.form.amountTaken !== '' && this.form.amountTaken >= 1){
        return false;
      }
      return true;
    },
    intrestRateVal: function() {
      if(this.form.intrestRate !== null && this.form.intrestRate !== '' && this.form.intrestRate > 0){
        return false;
      }
      return true;
    },
    bookingNoVal: function() {
       if(this.form.bookingNo !== null && this.form.bookingNo !== '' && this.form.bookingNo.length >= 5){
        return false;
      }
      return true;
    },
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
  watch:{
    bookingDate(){
      this.form.bookingDate = moment(this.bookingDate, 'DD/MM/YYYY');
    },
    dueDate(){
      this.form.dueDate = moment(this.dueDate, 'DD/MM/YYYY');
    },
    valueDate(){
      this.form.valueDate = moment(this.valueDate, 'DD/MM/YYYY');
    }
  }
};
</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style>
</style>