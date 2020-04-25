<template>
  <div>
    <b-card :style="{'background-color': (form.defaulter)?'red':'azure'}">
      <b-row>
        <b-col>
          <span class="my-card-heading">NEW RECIPT</span>
        </b-col>
      </b-row>
      <b-row>
        <b-col md>
          <b-form-group id="bookingNoLbl" label="Booking No" label-for="bookingNo">
            <b-form-input id="bookingNo" disabled v-model="form.bookingNo"></b-form-input>
          </b-form-group>
        </b-col>
        <b-col md class="col-padding-margin-right">
          <b-form-group id="brokerNoLbl" label="A/C Code" label-for="brokerNo">
            <b-form-input id="brokerNo" v-model="form.brokerNo" required disabled></b-form-input>
          </b-form-group>
        </b-col>
        <b-col md class="col-padding-margin-right">
          <b-form-group
            id="brokerNameLbl"
            label="Name"
            invalid-feedback="Name is Required"
            label-for="brokerName"
          >
            <b-form-input id="brokerName" v-model="form.brokerName" required disabled></b-form-input>
          </b-form-group>
        </b-col>
        <b-col md>
          <b-form-group id="mobileNoLbl" label="Mobile No" label-for="mobileNo">
            <b-form-input id="mobileNo" disabled v-model="form.mobileNo"></b-form-input>
          </b-form-group>
        </b-col>
        <b-col md="2">
          <b-form-group id="netWeightLbl" label="Net Weight" label-for="netWeight">
            <b-form-input id="netWeight" disabled v-model="form.netWeight"></b-form-input>
          </b-form-group>
        </b-col>
        <b-col md="1">
          <b-form-group id="purityLbl" label="Purity %" label-for="purity">
            <b-form-input id="purity" disabled v-model="form.purity"></b-form-input>
          </b-form-group>
        </b-col>
      </b-row>
      <b-row>
        <b-col md="2" class="col-padding-margin-right">
          <b-form-group id="reciptDateLbl" label="Recipt Date" label-for="reciptDate">
            <date-picker v-model="reciptDate" :config="options" placeholder="DD/MM/YYYY"></date-picker>
          </b-form-group>
        </b-col>

        <b-col md="2">
          <b-form-group
            id="intrestRateLbl"
            :label="form.intrestType=='RS'?'Intrest Rate RS':'Intrest Rate %'"
            label-for="intrestRate"
          >
            <b-form-input id="intrestRate" disabled v-model="form.intrestRate"></b-form-input>
          </b-form-group>
        </b-col>
        <b-col md="2">
          <b-form-group id="prinipleLbl" label="Priniple" label-for="priniple" style="color:red;">
            <b-form-input id="priniple" v-model="submitForm.priniple" style="color:red;"></b-form-input>
          </b-form-group>
        </b-col>
        <b-col md="2">
          <b-form-group id="intrestLbl" label="Intrest" label-for="intrest" style="color:red;">
            <b-form-input
              id="intrest"
              @blur="givenUpToDate"
              v-model="submitForm.intrest"
              style="color:red;"
            ></b-form-input>
          </b-form-group>
        </b-col>

        <b-col>
          <b-form-group id="descriptionLbl" label="Description" label-for="description">
            <b-form-input id="description" v-model="form.remarks" disabled></b-form-input>
          </b-form-group>
        </b-col>
      </b-row>
    </b-card>
    <b-card style="background-color:azure">
      <b-row>
        <b-col md="8">
          <b-row style="border: 1px solid #dee2e6;">
            <b-table-simple small caption-top responsive title="Due Details">
              <b-tbody>
                <b-tr>
                  <b-th style="border-top:0px">Given Up To</b-th>
                  <b-td style="border-top:0px">
                    <date-picker
                      disabled
                      v-model="dates.givenUpTo"
                      :config="options"
                      placeholder="DD/MM/YYYY"
                    ></date-picker>
                  </b-td>
                  <b-th style="border-top:0px">Issue Date</b-th>
                  <b-td style="border-top:0px">
                    <date-picker
                      v-model="dates.bookingDate"
                      disabled
                      :config="options"
                      placeholder="DD/MM/YYYY"
                    ></date-picker>
                  </b-td>
                  <b-th style="border-top:0px">Due Date</b-th>
                  <b-td style="border-top:0px">
                    <date-picker
                      v-model="dates.dueDate"
                      disabled
                      :config="options"
                      placeholder="DD/MM/YYYY"
                    ></date-picker>
                  </b-td>
                  <b-th style="border-top:0px">Expiry Date</b-th>
                  <b-td style="border-top:0px">
                    <date-picker
                      v-model="dates.valueDate"
                      disabled
                      :config="options"
                      placeholder="DD/MM/YYYY"
                    ></date-picker>
                  </b-td>
                </b-tr>
                <b-tr>
                  <b-th style="border-top:0px">Add Due Months</b-th>
                  <b-td style="border-top:0px">
                    <b-form-input
                      id="description"
                      type="number"
                      @blur="addDMonths"
                      v-model="dates.dueMonths"
                      style="width:80px"
                    ></b-form-input>
                  </b-td>
                  <b-th style="border-top:0px">Add Exp Months</b-th>
                  <b-td style="border-top:0px">
                    <b-form-input
                      id="description"
                      type="number"
                      @blur="addVMonths"
                      v-model="dates.expMonths"
                      style="width:80px"
                    ></b-form-input>
                  </b-td>
                  <b-th style="border-top:0px">Next Due Date</b-th>
                  <b-td style="border-top:0px">
                    <date-picker
                      v-model="dates.nxtDueDate"
                      disabled
                      :config="options"
                      placeholder="DD/MM/YYYY"
                    ></date-picker>
                  </b-td>
                  <b-th style="border-top:0px">Next Exp Date</b-th>
                  <b-td style="border-top:0px">
                    <date-picker
                      v-model="dates.nxtValueDate"
                      :config="options"
                      disabled
                      placeholder="DD/MM/YYYY"
                    ></date-picker>
                  </b-td>
                </b-tr>
              </b-tbody>
            </b-table-simple>
          </b-row>
          <b-row style="border: 1px solid #dee2e6;">
            <b-table-simple small caption-top responsive>
              <b-tbody>
                <b-tr>
                  <b-th style="border-top:0px">Amount</b-th>
                  <b-td style="border-top:0px">
                    <b-form-input id="actualAmount" disabled v-model="amounts.actualAmount"></b-form-input>
                  </b-td>
                  <b-th style="border-top:0px"></b-th>
                  <b-td style="border-top:0px"></b-td>
                  <b-th style="border-top:0px">Principle Bal</b-th>
                  <b-td style="border-top:0px">
                    <b-form-input id="prinipleBalance" disabled v-model="amounts.prinipleBalance"></b-form-input>
                  </b-td>
                </b-tr>
                <b-tr>
                  <b-th style="border-top:0px">Intrest</b-th>
                  <b-td style="border-top:0px">
                    <b-form-input id="intrestTilDate" disabled v-model="amounts.intrestTilDate"></b-form-input>
                  </b-td>
                  <b-th style="border-top:0px">Booking Date</b-th>
                  <b-td style="border-top:0px">
                    <b-form-input id="bookingDate" disabled v-model="dates.bookingDate"></b-form-input>
                  </b-td>
                  <b-th style="border-top:0px">Intrest Bal</b-th>
                  <b-td style="border-top:0px">
                    <b-form-input id="intrestBalance" disabled v-model="amounts.intrestBalance"></b-form-input>
                  </b-td>
                </b-tr>
                <b-tr>
                  <b-th style="border-top:0px">Principle Paid</b-th>
                  <b-td style="border-top:0px">
                    <b-form-input
                      id="priniplePaidTil"
                      type="number"
                      disabled
                      v-model="amounts.priniplePaidTil"
                    ></b-form-input>
                  </b-td>
                  <b-th style="border-top:0px">Days</b-th>
                  <b-td style="border-top:0px">
                    <b-form-input id="days" disabled v-model="dates.daysTilNow"></b-form-input>
                  </b-td>
                  <b-th style="border-top:0px">Total Bal</b-th>
                  <b-td style="border-top:0px">
                    <b-form-input
                      id="totalBalance"
                      disabled
                      v-model="amounts.totalBalance"
                      style="color:red"
                    ></b-form-input>
                  </b-td>
                </b-tr>
                <b-tr>
                  <b-th style="border-top:0px">Intrest Paid</b-th>
                  <b-td style="border-top:0px">
                    <b-form-input
                      id="intrestPaidTil"
                      disabled
                      v-model="amounts.intrestPaidTil"
                      style="color:red"
                    ></b-form-input>
                  </b-td>
                  <b-th style="border-top:0px">Remarks</b-th>
                  <b-td colspan="4" style="border-top:0px">
                    <b-form-input id="intrestPaidTil" v-model="submitForm.remarks"></b-form-input>
                  </b-td>
                </b-tr>
              </b-tbody>
            </b-table-simple>
          </b-row>
        </b-col>
        <b-col md="4">
          <b-row v-if="form.bookingTrans.length>0">
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
                <b-tr variant="secondary" v-for="(trans, idx) in form.bookingTrans" :key="idx">
                  <b-th
                    v-if="idx==0"
                    :rowspan="form.bookingTrans.length"
                    style="vertical-align: middle;"
                  >{{formatter.format(form.amountTaken)}}</b-th>

                  <b-td>{{converteMongoToDate(trans.rcvDate)}}</b-td>
                  <b-td>{{formatter.format(trans.principle)}}</b-td>
                  <b-td>{{formatter.format(trans.intrest)}}</b-td>
                  <b-td
                    :style="{'color': '#fff','background-color' :Math.sign(trans.pending)>=-0?'#28a745':'#DC3547'}"
                  >{{formatter.format(-trans.pending)}}</b-td>
                </b-tr>
              </b-tbody>
              <b-tfoot>
                <b-tr variant="success">
                  <b-th style="color:red;font:bold;">{{formatter.format(form.amountTaken)}}</b-th>
                  <b-td></b-td>
                  <b-th style="color:red;font:bold;">{{formatter.format(paidPrinciple)}}</b-th>
                  <b-th style="color:red;font:bold;">{{formatter.format(paidIntrest)}}</b-th>
                  <b-td></b-td>
                </b-tr>
              </b-tfoot>
            </b-table-simple>
          </b-row>
        </b-col>
      </b-row>

      <b-row bg-variant="light" style="position:sticky;bottom:0;padding-top:10px;">
        <b-col md style="text-align: center !important">
          <!-- <b-button variant="primary text-center" @click="print" value="print">Print</b-button>&nbsp;&nbsp; -->
          <b-button
            variant="primary text-center"
            @click="addRecipt"
            :disabled="addVal"
            value="Create"
          >Add Recipt</b-button>&nbsp;&nbsp;
          <b-button
            variant="secondary text-center"
            @click="$router.push({name: 'Recipts', params :{ search: search}})"
            value="back"
          >Back To Recipts</b-button>
        </b-col>
      </b-row>
    </b-card>
  </div>
</template>

<script>
//import converter from "number-to-words";
import converter from 'number-into-words';
import moment from "moment";
export default {
  data() {
    return {
      formatter: {},
      displayFlg: false,
      req: {
        brokerNo: null,
        companyCode: null,
        bookingNo: null
      },
      selectedTrans: 0,
      options: {
        format: "DD/MM/YYYY",
        useCurrent: true
      },
      amountWords: "",
      bookingDate: new Date(),
      reciptDate: new Date(),
      priniple: 0.0,
      intrest: 0.0,
      description: "",
      dueDate: new Date(),
      valueDate: new Date(),
      quantity: 0.0,
      paidPrinciple: 0,
      paidIntrest: 0,
      dates: {
        dueDate: null,
        valueDate: null,
        nxtDueDate: null,
        nxtValueDate: null,
        givenUpTo: null,
        bookingDate: null,
        daysTilNow: null,
        expMonths: null,
        dueMonths: null
      },
      amounts: {
        actualAmount: 0.0,
        intrestTilDate: 0.0,
        priniplePaidTil: 0.0,
        intrestPaidTil: 0.0,
        prinipleBalance: 0.0,
        intrestBalance: 0.0,
        totalBalance: 0.0
      },
      form: {
        brokerNo: null,
        brokerName: null,
        defaulter: null,
        closed: null,
        auctioned: null,
        mobileNo: null,
        bookingDate: "",
        remarks: null,
        netWeight: 0.0,
        bookingNo: null,
        purity: null,
        intrestRate: null,
        bookingTrans: [],
        dueDate: null,
        valueDate: null,
        amountTaken: null,
        intrestType: null
      },
      submitForm: {
        brokerNo: null,
        bookingNo: null,
        companyCode: null,
        transId:null,
        rcvDate: null,
        principle: null,
        intrest: null,
        remarks: "",
        dueDate: null,
        valueDate: null,
        createdBy:null
      },
      lastTrans: null,
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
    this.formatter = new Intl.NumberFormat("en-IN");
    this.req = this.$route.params.req;
    this.search = this.$route.params.search;
  },
  mounted() {
    this.getsSelectedAccount();
  },
  methods: {
    addDMonths() {
      if (this.dates.dueMonths < 1) return false;
      this.dates.nxtDueDate = moment(this.dates.nxtDueDate, "DD/MM/YYYY")
        .add(this.dates.dueMonths, "months")
        .format("DD/MM/YYYY");
    },
    addVMonths() {
      if (this.dates.expMonths < 1) return false;
      this.dates.nxtValueDate = moment(this.dates.nxtValueDate, "DD/MM/YYYY")
        .add(this.dates.expMonths, "months")
        .format("DD/MM/YYYY");
    },
    givenUpToDate() {
      if (
        this.submitForm.intrest == null ||
        parseInt(this.submitForm.intrest) < 1
      ) {
        return false;
      }
      let daysDiff;
      let prin = parseFloat(
        this.amounts.prinipleBalance.replace(/[, ]+/g, "").trim()
      );
      let rate = parseFloat(this.form.intrestRate);
      let intPerYear = 0.0;
      if (this.form.intrestType == "RS") {
        intPerYear = parseFloat(prin * ((rate * 12) / 100));
      } else {
        intPerYear = parseFloat(prin * (rate / 100));
      }
      let perDay = parseFloat(intPerYear / 360);
      if (this.lastTrans != null) {
        daysDiff =
          (parseFloat(this.submitForm.intrest) +
            parseFloat(this.lastTrans.pending)) /
          perDay;
        this.dates.givenUpTo = moment(this.lastTrans.rcvDate)
          .add(daysDiff, "days")
          .format("DD/MM/YYYY");
      } else {
        daysDiff = parseFloat(this.submitForm.intrest) / perDay;
        this.dates.givenUpTo = moment(this.form.bookingDate)
          .add(daysDiff, "days")
          .format("DD/MM/YYYY");
      }
    },
    print() {
      window.print();
    },
    converteMongoToDate(dateObject) {
      if (dateObject != null && dateObject && dateObject != "") {
        var newDate = moment(dateObject);
        return newDate.format("DD/MM/YYYY");
      }
      return null;
    },
    addRecipt() {
      this.attemptSubmit = true;
      let formData = new FormData();
      this.submitForm.brokerNo = this.form.brokerNo;
      this.submitForm.bookingNo = this.form.bookingNo;
      this.submitForm.companyCode = this.$store.state.selectedCompany.value;
      this.submitForm.createdBy = this.$store.state.user.username;
      this.submitForm.rcvDate = moment(this.reciptDate, "DD/MM/YYYY");
      this.submitForm.dueDate = moment(this.dates.nxtDueDate, "DD/MM/YYYY");
      this.submitForm.valueDate = moment(this.dates.nxtValueDate, "DD/MM/YYYY");
      //console.log(this.submitForm);
      formData.append("form", JSON.stringify(this.submitForm));
      this.$bvModal
        .msgBoxConfirm("Please confirm that you want New Recipt.", {
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
              .post("/middleware/api/secured/add-recipt", formData)
              .then(() => {
                loader.hide();
                this.$bvModal
                  .msgBoxOk("New Recipt Added", {
                    title: "Confirmation",
                    size: "sm",
                    buttonSize: "sm",
                    okVariant: "info",
                    headerClass: "p-2 border-bottom-0",
                    footerClass: "p-2 border-top-0",
                    centered: true
                  })
                  .then(value => {
                    if (value)
                      this.$router.push({
                        name: "Recipts",
                        params: {
                          search: this.search
                        }
                      });
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
if(this.req.brokerNo == null || this.req.bookingNo == null)this.$router.push("/recipts");
      formData.append("form", JSON.stringify(this.req));
      let loader = this.$loading.show({
        loader: "bars",
        color: "green"
      });
      this.$http
        .post("/middleware/api/secured/get-booking-recipts", formData)
        .then(response => {
          loader.hide();
          if (response.data != null && response.data != "") {
            if (response.data.bookingTrans.length > 0) {
              this.displayFlg = true;
              response.data.bookingTrans.sort(
                (a, b) => moment(a.rcvDate) - moment(b.rcvDate)
              );
              response.data.bookingTrans.forEach((trans, idx) => {
                this.paidPrinciple += parseFloat(trans.principle);
                this.paidIntrest += parseFloat(trans.intrest);
                let daysDiff;
                let prin = parseFloat(response.data.amountTaken);
                let rate = parseFloat(response.data.intrestRate);
                let intPerYear = 0.0;
                if (response.data.intrestType == "RS") {
                  intPerYear = parseFloat(prin * ((rate * 12) / 100));
                } else {
                  intPerYear = parseFloat(prin * (rate / 100));
                }
                let perDay = parseFloat(intPerYear / 360);
                let actualIntrest;
                if (idx == 0) {
                  daysDiff = moment(trans.rcvDate).diff(
                    moment(response.data.bookingDate),
                    "days"
                  );
                  actualIntrest = parseFloat(daysDiff * perDay);
                  trans.pending = parseFloat(
                    parseFloat(trans.intrest) - actualIntrest
                  );
                } else {
                  let paidTotal = parseFloat(0.0);
                  for (let i = idx - 1; i >= 0; i--) {
                    paidTotal += parseFloat(
                      response.data.bookingTrans[i].principle
                    );
                  }
                  prin =
                    parseFloat(response.data.amountTaken) -
                    parseFloat(paidTotal);
                  daysDiff = moment(trans.rcvDate).diff(
                    moment(response.data.bookingTrans[idx - 1].rcvDate),
                    "days"
                  );
                  if (response.data.intrestType == "RS") {
                    intPerYear = parseFloat(prin * ((rate * 12) / 100));
                  } else {
                    intPerYear = parseFloat(prin * (rate / 100));
                  }
                  perDay = parseFloat(intPerYear / 360);
                  actualIntrest =
                    parseFloat(daysDiff * perDay) -
                    parseFloat(response.data.bookingTrans[idx - 1].pending);
                  trans.pending = parseFloat(
                    parseFloat(trans.intrest) - actualIntrest
                  );
                }
              });
              this.lastTrans =
                response.data.bookingTrans[
                  response.data.bookingTrans.length - 1
                ];
            }
            this.dates.bookingDate = moment(response.data.bookingDate).format(
              "DD/MM/YYYY"
            );
            this.dates.dueDate = moment(response.data.dueDate).format(
              "DD/MM/YYYY"
            );
            this.dates.valueDate = moment(response.data.valueDate).format(
              "DD/MM/YYYY"
            );
            this.dates.nxtDueDate = this.dates.dueDate;
            this.dates.nxtValueDate = this.dates.valueDate;
            this.dates.daysTilNow = moment().diff(
              moment(response.data.bookingDate),
              "days"
            );
            this.amounts.actualAmount = parseFloat(response.data.amountTaken);
            this.amounts.priniplePaidTil = parseFloat(this.paidPrinciple);
            this.amounts.intrestPaidTil = parseFloat(this.paidIntrest);
            this.amounts.prinipleBalance =
              parseFloat(response.data.amountTaken) -
              parseFloat(this.paidPrinciple);
            let intPerYear = 0.0;
            let rate = parseFloat(response.data.intrestRate);
            let daysDiff = 0;
            let pendingBal = parseFloat(0.0);
            if (response.data.intrestType == "RS") {
              intPerYear = parseFloat(
                (parseFloat(response.data.amountTaken) -
                  parseFloat(this.paidPrinciple)) *
                  ((rate * 12) / 100)
              );
            } else {
              intPerYear = parseFloat(
                (parseFloat(response.data.amountTaken) -
                  parseFloat(this.paidPrinciple)) *
                  (rate / 100)
              );
            }

            let perDay = parseFloat(intPerYear / 360);
            if (this.lastTrans != null) {
              daysDiff = moment().diff(moment(this.lastTrans.rcvDate), "days");
              pendingBal = parseFloat(this.lastTrans.pending);
            } else {
              daysDiff = moment().diff(
                moment(response.data.bookingDate),
                "days"
              );
            }
            this.amounts.intrestTilDate =
              parseFloat(this.paidIntrest) +
              parseFloat(daysDiff * perDay) -
              pendingBal;
            this.amounts.intrestBalance =
              parseFloat(this.amounts.intrestTilDate) -
              parseFloat(this.paidIntrest);
            this.amounts.totalBalance =
              parseFloat(this.amounts.intrestBalance) +
              parseFloat(this.amounts.prinipleBalance);

            this.amounts.intrestBalance = this.formatter.format(
              this.amounts.intrestBalance
            );
            this.amounts.totalBalance = this.formatter.format(
              this.amounts.totalBalance
            );
            this.amounts.intrestTilDate = this.formatter.format(
              this.amounts.intrestTilDate
            );
            this.amounts.actualAmount = this.formatter.format(
              this.amounts.actualAmount
            );
            this.amounts.priniplePaidTil = this.formatter.format(
              this.amounts.priniplePaidTil
            );
            this.amounts.intrestPaidTil = this.formatter.format(
              this.amounts.intrestPaidTil
            );
            this.amounts.prinipleBalance = this.formatter.format(
              this.amounts.prinipleBalance
            );
            this.form = response.data;
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
                if (value) this.$router.push("/recipts");
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
    }
  },
  computed: {
    addVal() {
      if (
        (this.submitForm.priniple != null && this.submitForm.priniple > 0) ||
        (this.submitForm.intrest != null && this.submitForm.intrest > 0)
      ){
        return false;
      }
      return true;
    },
  }
};
</script>
<style>
</style>