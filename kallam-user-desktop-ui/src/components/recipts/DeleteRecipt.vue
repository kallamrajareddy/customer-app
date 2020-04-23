<template>
  <div>
    <b-card :style="{'background-color': (form.defaulter)?'red':'azure'}">
      <b-row>
        <b-col>
          <span class="my-card-heading" style="color:red;">DELETE RECIPT</span>
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
      </b-row>
      <b-row>
        <b-col md>
          <b-form-group id="mobileNoLbl" label="Mobile No" label-for="mobileNo">
            <b-form-input id="mobileNo" disabled v-model="form.mobileNo"></b-form-input>
          </b-form-group>
        </b-col>
        <b-col md>
          <b-form-group id="netWeightLbl" label="Net Weight" label-for="netWeight">
            <b-form-input id="netWeight" disabled v-model="form.netWeight"></b-form-input>
          </b-form-group>
        </b-col>
        <b-col md>
          <b-form-group id="purityLbl" label="Purity %" label-for="purity">
            <b-form-input id="purity" disabled v-model="form.purity"></b-form-input>
          </b-form-group>
        </b-col>
        <b-col md>
          <b-form-group
            id="intrestRateLbl"
            :label="form.intrestType=='RS'?'Intrest Rate RS':'Intrest Rate %'"
            label-for="intrestRate"
          >
            <b-form-input id="intrestRate" disabled v-model="form.intrestRate"></b-form-input>
          </b-form-group>
        </b-col>
      </b-row>
    </b-card>
    <b-card style="background-color:azure">
      <b-row>
        <b-col md>
          <b-row v-if="form.bookingTrans.length>0">
            <b-table-simple hover small caption-top responsive>
              <b-thead head-variant="dark">
                <b-tr>
                  <!-- <b-th>Principle Amount</b-th> -->
                  <b-th>Transaction Date</b-th>
                  <b-th>Paid Principle</b-th>
                  <b-th>Paid Interest</b-th>
                  <b-th>Pending Interest</b-th>
                </b-tr>
              </b-thead>
              <b-tbody>
                <b-tr variant="secondary" v-for="(trans, idx) in form.bookingTrans" :key="idx">
                  <b-td :style="{'color' :idx==(form.bookingTrans.length-1)?'#fff':'#495057','background-color' :idx==(form.bookingTrans.length-1)?'#DC3547':'#e9ecef'}">{{converteMongoToDate(trans.rcvDate)}}</b-td>
                  <b-td :style="{'color' :idx==(form.bookingTrans.length-1)?'#fff':'#495057','background-color' :idx==(form.bookingTrans.length-1)?'#DC3547':'#e9ecef'}">{{formatter.format(trans.principle)}}</b-td>
                  <b-td :style="{'color' :idx==(form.bookingTrans.length-1)?'#fff':'#495057','background-color' :idx==(form.bookingTrans.length-1)?'#DC3547':'#e9ecef'}">{{formatter.format(trans.intrest)}}</b-td>
                  <b-td :style="{'color' :idx==(form.bookingTrans.length-1)?'#fff':'#495057','background-color' :idx==(form.bookingTrans.length-1)?'#DC3547':'#e9ecef'}">{{formatter.format(-trans.pending)}}</b-td>
                </b-tr>
              </b-tbody>
            </b-table-simple>
          </b-row>
        </b-col>
      </b-row>

      <b-row bg-variant="light" style="position:sticky;bottom:0;padding-top:10px;">
        <b-col md style="text-align: center !important">
          <b-button variant="primary text-center" @click="print" value="print">Print</b-button>&nbsp;&nbsp;
          <b-button
            variant="danger text-center"
            @click="deleteRecipt"
             :disabled="form.bookingTrans.length<1"
            value="Create"
          >Delete Recipt</b-button>&nbsp;&nbsp;
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
import converter from "number-to-words";
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
        createdBy: null
      },
      lastTrans: null,
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
    this.formatter = new Intl.NumberFormat("en-IN");
    this.req = this.$route.params.req;
    this.search = this.$route.params.search;
  },
  mounted() {
    this.getsSelectedAccount();
  },
  methods: {
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
    deleteRecipt() {
      this.attemptSubmit = true;
      let formData = new FormData();
      this.submitForm.brokerNo = this.form.brokerNo;
      this.submitForm.bookingNo = this.form.bookingNo;
      this.submitForm.transId = this.form.bookingTrans[this.form.bookingTrans.length-1].transId;
      this.submitForm.companyCode = this.$store.state.selectedCompany.value;
      this.submitForm.createdBy = this.$store.state.user.username;
      console.log(this.submitForm);
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
              .post("/middleware/api/secured/delete-recipt", formData)
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
    getsSelectedAccount() {
      let formData = new FormData();

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
  computed: {}
};
</script>
<style>
</style>