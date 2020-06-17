<template>
  <b-card>
    <b-row>
      <b-col cols="2" md>
        <b-form-group label="Select Report Date">
          <date-picker
            size="md"
            v-model="reportDate"
            :config="dateOptions"
            placeholder="DD/MM/YYYY"
          ></date-picker>
        </b-form-group>
      </b-col>
      <b-col cols="3" align-left md>
        <b-form-group label="Select Report Type">
          <b-form-radio-group
            id="btn-radios-2"
            v-model="selected"
            :options="options"
            buttons
            button-variant="outline-info"
            size="md"
            name="radio-btn-outline"
          ></b-form-radio-group>
        </b-form-group>
      </b-col>
      <b-col md style="text-align: left;">
        <b-button
          variant="primary text-center"
          style="margin-top:28px"
          @click="generateReport"
          value="report"
        >Generate Report</b-button>
      </b-col>
    </b-row>
  </b-card>
</template>

<script>
import moment from "moment";
export default {
  data() {
    return {
      dateOptions: {
        format: "DD/MM/YYYY",
        useCurrent: true
      },
      reportDate: new Date(),
      selected: "daily",
      options: [
        { text: "Daily", value: "daily" },
        { text: "Monthly", value: "monthly" },
        { text: "Yearly", value: "yearly" },
        { text: "Final Report", value: "fully" }
      ]
    };
  },
  created() {
    this.selected = this.$route.params.reportType;
    this.reportDate = this.$route.params.reportDate;
  },
  methods: {
    generateReport() {
      let url = "/middleware/api/secured/get-daily-report/";
      if (this.selected == "monthly") {
        url = "/middleware/api/secured/get-month-report/";
      }
      if (this.selected == "yearly") {
        url = "/middleware/api/secured/get-year-report/";
      }
      if (this.selected == "fully") {
        url = "/middleware/api/secured/get-full-report/";
      }
      this.$http
        .get(
          url +
            moment(this.reportDate, "DD/MM/YYYY").format("YYYY-MM-DD") +
            "/" +
            this.$store.state.selectedCompany.value
        )
        .then(response => {
          let issue, capital, office, ress;
          let closeIssue, closeCapital, closeOffice, closeRess;
          if (this.selected == "fully") {
            response.data[0].openningBalance = [
              {
                totalPrinciple: 0,
                totalIntrest: 0,
                totalAmount: 0,
                tranType: "Res-Exp"
              },
              {
                totalPrinciple: 0,
                totalIntrest: 0,
                totalAmount: 0,
                tranType: "Issue"
              },
              {
                totalPrinciple: 0,
                totalIntrest: 0,
                totalAmount: 0,
                tranType: "Off Exp"
              },
              {
                totalPrinciple: 0,
                totalIntrest: 0,
                totalAmount: 0,
                tranType: "Capital"
              }
            ];
          }
          response.data[0].openningBalance.forEach(type => {
            if (type.tranType == "Res-Exp") {
              ress = type;
            }
            if (type.tranType == "Issue") {
              issue = type;
            }
            if (type.tranType == "Capital") {
              capital = type;
            }
            if (type.tranType == "Off Exp") {
              office = type;
            }
          });
          response.data[0].closingBalance.forEach(type => {
            if (type.tranType == "Res-Exp") {
              closeRess = type;
            }
            if (type.tranType == "Issue") {
              closeIssue = type;
            }
            if (type.tranType == "Capital") {
              closeCapital = type;
            }
            if (type.tranType == "Off Exp") {
              closeOffice = type;
            }
          });
          let openningBal = { issue, capital, office, ress };
          let closingBal = {
            issue: closeIssue,
            capital: closeCapital,
            office: closeOffice,
            ress: closeRess
          };
          //openBal.investment = response.data[0]
          let mer = this.combineAll(
            this.selected,
            response.data[0].totalGivenAmount,
            response.data[0].totalInvestmentAmount
          );
          let merRet = this.combineAll(
            this.selected,
            response.data[0].totalReturnInvestmentAmount,
            response.data[0].totalReturnsAmount
          );
          let off = this.combineAll(
            this.selected,
            mer,
            response.data[0].totalOffAmount
          );
          let res = this.combineAll(
            this.selected,
            mer,
            response.data[0].totalRessAmount
          );
          let expen = this.combineAll(this.selected, merRet, off);
          let final = this.combineAll(this.selected, expen, res);
          this.$router.push({
            name: "PrintReports",
            params: {
              closingBal,
              creditDebits: final,
              res: response.data[0],
              openningBal,
              reportDate: this.reportDate,
              reportType: this.selected
            }
          });
        })
        .catch(function(error) {
          // handle error
          alert(error);
        })
        .finally(function() {
          // always executed
        });
    },
    getSortOrder(prop) {
      return function(a, b) {
        if (a[prop] > b[prop]) {
          return 1;
        } else if (a[prop] < b[prop]) {
          return -1;
        }
        return 0;
      };
    },
    combineAll(type, ar1, ar2) {
      let map = new Map();
      let prop = "";
      if (type == "daily") {
        ar1.forEach(item => map.set(item.bookingNo, item));
        ar2.forEach(item =>
          map.set(item.bookingNo, { ...map.get(item.bookingNo), ...item })
        );
        prop= "bookingNo";
      }
      if (type == "monthly") {
        ar1.forEach(item => map.set(item.selDate, item));
        ar2.forEach(item =>
          map.set(item.selDate, { ...map.get(item.selDate), ...item })
        );
        prop= "selDate";
      }
      if (type == "yearly") {
        ar1.forEach(item => map.set(item.month, item));
        ar2.forEach(item =>
          map.set(item.month, { ...map.get(item.month), ...item })
        );
        prop= "month";
      }
      if (type == "fully") {
        ar1.forEach(item => map.set(item.year, item));
        ar2.forEach(item =>
          map.set(item.year, { ...map.get(item.year), ...item })
        );
        prop= "year";
      }
      let mergedArr = Array.from(map.values());
      mergedArr.sort(this.getSortOrder(prop));
      return mergedArr;
    }
  }

  /* let ar1 = [
  { id: "abdc4051", date: "2017-01-24" }, 
  { id: "abdc4052", date: "2017-01-22" },
  { id: "abdc4053", date: "2017-01-22" }
];
let ar2 = [
  { nameId: "abdc4051", name: "ab" },
  { nameId: "abdc4052", name: "abc" },
{ nameId: "raj", name: "abc" }
];
let map = new Map();
ar1.forEach(item => map.set(item.id, item));
ar2.forEach(item => map.set(item.nameId, {...map.get(item.nameId), ...item}));
let mergedArr = Array.from(map.values()); */
};
</script>

<style>
</style>