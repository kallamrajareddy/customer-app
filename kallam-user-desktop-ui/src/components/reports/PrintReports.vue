<template>
  <b-card>
    <b-row>
      <b-col>
        <span>
          <h4>HARSHA FINANCE({{$store.state.selectedCompany.text}})</h4>
        </span>
        <span>
          <h5>Dno:74-14-28,Yanamalakuduru Road,Ayyappanagar,Vijayawada,Ph:9440324545</h5>
        </span>
        <span v-if="reportType=='yearly'">
          <h4>Year Report-{{moment(reportDate, "DD/MM/YYYY").format("YYYY")}}</h4>
        </span>
        <span v-else-if="reportType=='monthly'">
          <h4>Month Report-{{moment(reportDate, "DD/MM/YYYY").format("MM-YYYY")}}</h4>
        </span>
        <span v-else-if="reportType=='daily'">
          <h4>Day Report-{{moment(reportDate, "DD/MM/YYYY").format("DD-MM-YYYY")}}</h4>
        </span>
        <span v-else>
          <h4>Final Report</h4>
        </span>
      </b-col>
    </b-row>
    <b-row>
      <b-col cols="2" style="float: left">
        <span style="float: left">Date:</span>
      </b-col>
      <b-col cols="2" style="float: left">
        <span style="float: left">{{moment().format('ll')}}</span>
      </b-col>
    </b-row>
    <b-row>
      <b-col cols="2" style="float: left">
        <span style="float: left">Openning Balance:</span>
      </b-col>
      <b-col cols="2" style="float: left">
        <span style="float: left">{{formatter.format(openBal)}}</span>
      </b-col>
    </b-row>
    <b-row>
      <b-col cols="2" style="float: left">
        <span style="float: left">Investment:</span>
      </b-col>
      <b-col cols="2" style="float: left">
        <span style="float: left">{{formatter.format(openInvestment)}}</span>
      </b-col>
    </b-row>
    <b-row>
      <b-col cols="2" style="float: left">
        <span style="float: left">TurnOver:</span>
      </b-col>
      <b-col cols="2" style="float: left">
        <span style="float: left">{{formatter.format(openTurnover)}}</span>
      </b-col>
    </b-row>
    <b-row>
      <b-col v-if="reportType=='yearly'">
        <b-table-simple hover small caption-top responsive>
          <b-thead head-variant="dark">
            <b-tr>
              <b-th colspan="5" style="text-align: center;background-color: #007bff;">Credits</b-th>
              <b-th colspan="5" style="text-align: center;background-color: #dc3545;">Debits</b-th>
              <b-th colspan="2" style="text-align: center;background-color: #6f42c1;">Expences</b-th>
            </b-tr>
            <b-tr>
              <b-th style="text-align: center;background-color: #fff; color:#007bff">SNo</b-th>
              <b-th style="text-align: center;background-color: #fff; color:#007bff">Month</b-th>
              <b-th style="text-align: center;background-color: #fff; color:#007bff">Principle</b-th>
              <b-th style="text-align: center;background-color: #fff; color:#007bff">Intrest</b-th>
              <b-th style="text-align: center;background-color: #fff; color:#007bff">Investment</b-th>
              <b-th style="text-align: center;background-color: #fff; color:#dc3545">RS Lend</b-th>
              <b-th style="text-align: center;background-color: #fff; color:#dc3545">Principle</b-th>
              <b-th style="text-align: center;background-color: #fff; color:#dc3545">Intrest</b-th>
              <b-th style="text-align: center;background-color: #fff; color:#dc3545">Off</b-th>
              <b-th style="text-align: center;background-color: #fff; color:#dc3545">Ress</b-th>
              <b-th style="text-align: center;background-color: #fff; color:#6f42c1">TurnOver</b-th>
              <b-th style="text-align: center;background-color: #fff; color:#6f42c1">BF</b-th>
            </b-tr>
          </b-thead>
          <b-tbody>
            <b-tr v-for="(trans, idx) in creditDebits" :key="idx">
              <b-th>{{idx+1}}</b-th>
              <b-td>{{getMonth(trans.month)}}</b-td>
              <b-td>{{trans.transPrincipe!=undefined?formatter.format(trans.transPrincipe):""}}</b-td>
              <b-td>{{trans.transIntrest!=undefined?formatter.format(trans.transIntrest):""}}</b-td>
              <b-td>{{trans.totalCapitalAmount!=undefined?formatter.format(trans.totalCapitalAmount):""}}</b-td>
              <b-td>{{trans.totalBookingAmount!=undefined?formatter.format(trans.totalBookingAmount):""}}</b-td>
              <b-td>{{trans.investTransPrincipe!=undefined?formatter.format(trans.investTransPrincipe):""}}</b-td>
              <b-td>{{trans.investTransIntrest!=undefined?formatter.format(trans.investTransIntrest):""}}</b-td>
              <b-td>{{trans.totalOffAmount!=undefined?formatter.format(trans.totalOffAmount):""}}</b-td>
              <b-td>{{trans.totalRessAmount!=undefined?formatter.format(trans.totalRessAmount):""}}</b-td>
              <b-td>{{trans.turnOver!=undefined?formatter.format(trans.turnOver):""}}</b-td>
              <b-td>{{trans.bf!=undefined?formatter.format(trans.bf):""}}</b-td>
            </b-tr>
          </b-tbody>
          <b-tfoot>
            <b-tr>
              <b-th variant="secondary">Totals:</b-th>
              <b-th variant="secondary"></b-th>
              <b-th variant="secondary">{{formatter.format(totals.transPrincipe)}}</b-th>
              <b-th variant="secondary">{{formatter.format(totals.transIntrest)}}</b-th>
              <b-th variant="secondary">{{formatter.format(totals.totalCapitalAmount)}}</b-th>
              <b-th variant="secondary">{{formatter.format(totals.totalBookingAmount)}}</b-th>
              <b-th variant="secondary">{{formatter.format(totals.investTransPrincipe)}}</b-th>
              <b-th variant="secondary">{{formatter.format(totals.investTransIntrest)}}</b-th>
              <b-th variant="secondary">{{formatter.format(totals.totalOffAmount)}}</b-th>
              <b-th variant="secondary">{{formatter.format(totals.totalRessAmount)}}</b-th>
              <b-th variant="secondary"></b-th>
              <b-th variant="secondary"></b-th>
            </b-tr>
          </b-tfoot>
        </b-table-simple>
      </b-col>
      <b-col v-else-if="reportType=='monthly'">
        <b-table-simple hover small caption-top responsive>
          <b-thead head-variant="dark">
            <b-tr>
              <b-th colspan="5" style="text-align: center;background-color: #007bff;">Credits</b-th>
              <b-th colspan="5" style="text-align: center;background-color: #dc3545;">Debits</b-th>
              <b-th colspan="2" style="text-align: center;background-color: #6f42c1;">Expences</b-th>
            </b-tr>
            <b-tr>
              <b-th style="text-align: center;background-color: #fff; color:#007bff">SNo</b-th>
              <b-th style="text-align: center;background-color: #fff; color:#007bff">Date</b-th>
              <b-th style="text-align: center;background-color: #fff; color:#007bff">Principle</b-th>
              <b-th style="text-align: center;background-color: #fff; color:#007bff">Intrest</b-th>
              <b-th style="text-align: center;background-color: #fff; color:#007bff">Investment</b-th>
              <b-th style="text-align: center;background-color: #fff; color:#dc3545">RS Lend</b-th>
              <b-th style="text-align: center;background-color: #fff; color:#dc3545">Principle</b-th>
              <b-th style="text-align: center;background-color: #fff; color:#dc3545">Intrest</b-th>
              <b-th style="text-align: center;background-color: #fff; color:#dc3545">Off</b-th>
              <b-th style="text-align: center;background-color: #fff; color:#dc3545">Ress</b-th>
              <b-th style="text-align: center;background-color: #fff; color:#6f42c1">TurnOver</b-th>
              <b-th style="text-align: center;background-color: #fff; color:#6f42c1">BF</b-th>
            </b-tr>
          </b-thead>
          <b-tbody>
            <b-tr v-for="(trans, idx) in creditDebits" :key="idx">
              <b-th>{{idx+1}}</b-th>
              <b-td>{{moment(trans.selDate).format("DD/MM/YYYY")}}</b-td>
              <b-td>{{trans.transPrincipe!=undefined?formatter.format(trans.transPrincipe):""}}</b-td>
              <b-td>{{trans.transIntrest!=undefined?formatter.format(trans.transIntrest):""}}</b-td>
              <b-td>{{trans.totalCapitalAmount!=undefined?formatter.format(trans.totalCapitalAmount):""}}</b-td>
              <b-td>{{trans.totalBookingAmount!=undefined?formatter.format(trans.totalBookingAmount):""}}</b-td>
              <b-td>{{trans.investTransPrincipe!=undefined?formatter.format(trans.investTransPrincipe):""}}</b-td>
              <b-td>{{trans.investTransIntrest!=undefined?formatter.format(trans.investTransIntrest):""}}</b-td>
              <b-td>{{trans.totalOffAmount!=undefined?formatter.format(trans.totalOffAmount):""}}</b-td>
              <b-td>{{trans.totalRessAmount!=undefined?formatter.format(trans.totalRessAmount):""}}</b-td>
              <b-td>{{trans.turnOver!=undefined?formatter.format(trans.turnOver):""}}</b-td>
              <b-td>{{trans.bf!=undefined?formatter.format(trans.bf):""}}</b-td>
            </b-tr>
          </b-tbody>
          <b-tfoot>
            <b-tr>
              <b-th variant="secondary">Totals:</b-th>
              <b-th variant="secondary"></b-th>
              <b-th variant="secondary">{{formatter.format(totals.transPrincipe)}}</b-th>
              <b-th variant="secondary">{{formatter.format(totals.transIntrest)}}</b-th>
              <b-th variant="secondary">{{formatter.format(totals.totalCapitalAmount)}}</b-th>
              <b-th variant="secondary">{{formatter.format(totals.totalBookingAmount)}}</b-th>
              <b-th variant="secondary">{{formatter.format(totals.investTransPrincipe)}}</b-th>
              <b-th variant="secondary">{{formatter.format(totals.investTransIntrest)}}</b-th>
              <b-th variant="secondary">{{formatter.format(totals.totalOffAmount)}}</b-th>
              <b-th variant="secondary">{{formatter.format(totals.totalRessAmount)}}</b-th>
              <b-th variant="secondary"></b-th>
              <b-th variant="secondary"></b-th>
            </b-tr>
          </b-tfoot>
        </b-table-simple>
      </b-col>
      <b-col v-else-if="reportType=='daily'">
        <b-table-simple hover small caption-top responsive>
          <b-thead head-variant="dark">
            <b-tr>
              <b-th colspan="6" style="text-align: center;background-color: #007bff;">Credits</b-th>
              <b-th colspan="5" style="text-align: center;background-color: #dc3545;">Debits</b-th>
              <b-th colspan="2" style="text-align: center;background-color: #6f42c1;">Expences</b-th>
            </b-tr>
            <b-tr>
              <b-th style="text-align: center;background-color: #fff; color:#007bff">SNo</b-th>
              <b-th style="text-align: center;background-color: #fff; color:#007bff">BookingNo</b-th>
              <b-th style="text-align: center;background-color: #fff; color:#007bff">PartyName</b-th>
              <b-th style="text-align: center;background-color: #fff; color:#007bff">Principle</b-th>
              <b-th style="text-align: center;background-color: #fff; color:#007bff">Intrest</b-th>
              <b-th style="text-align: center;background-color: #fff; color:#007bff">Investment</b-th>
              <b-th style="text-align: center;background-color: #fff; color:#dc3545">RS Lend</b-th>
              <b-th style="text-align: center;background-color: #fff; color:#dc3545">Principle</b-th>
              <b-th style="text-align: center;background-color: #fff; color:#dc3545">Intrest</b-th>
              <b-th style="text-align: center;background-color: #fff; color:#dc3545">Off</b-th>
              <b-th style="text-align: center;background-color: #fff; color:#dc3545">Ress</b-th>
              <b-th style="text-align: center;background-color: #fff; color:#6f42c1">TurnOver</b-th>
              <b-th style="text-align: center;background-color: #fff; color:#6f42c1">BF</b-th>
            </b-tr>
          </b-thead>
          <b-tbody>
            <b-tr v-for="(trans, idx) in creditDebits" :key="idx">
              <b-th>{{idx+1}}</b-th>
              <b-td>{{trans.bookingNo}}</b-td>
              <b-td>{{trans.brokerName}}</b-td>
              <b-td>{{trans.transPrincipe!=undefined?formatter.format(trans.transPrincipe):""}}</b-td>
              <b-td>{{trans.transIntrest!=undefined?formatter.format(trans.transIntrest):""}}</b-td>
              <b-td>{{trans.totalCapitalAmount!=undefined?formatter.format(trans.totalCapitalAmount):""}}</b-td>
              <b-td>{{trans.totalBookingAmount!=undefined?formatter.format(trans.totalBookingAmount):""}}</b-td>
              <b-td>{{trans.investTransPrincipe!=undefined?formatter.format(trans.investTransPrincipe):""}}</b-td>
              <b-td>{{trans.investTransIntrest!=undefined?formatter.format(trans.investTransIntrest):""}}</b-td>
              <b-td>{{trans.totalOffAmount!=undefined?formatter.format(trans.totalOffAmount):""}}</b-td>
              <b-td>{{trans.totalRessAmount!=undefined?formatter.format(trans.totalRessAmount):""}}</b-td>
              <b-td>{{trans.turnOver!=undefined?formatter.format(trans.turnOver):""}}</b-td>
              <b-td>{{trans.bf!=undefined?formatter.format(trans.bf):""}}</b-td>
            </b-tr>
          </b-tbody>
          <b-tfoot>
            <b-tr>
              <b-th variant="secondary">Totals:</b-th>
              <b-th variant="secondary"></b-th>
              <b-th variant="secondary"></b-th>
              <b-th variant="secondary">{{formatter.format(totals.transPrincipe)}}</b-th>
              <b-th variant="secondary">{{formatter.format(totals.transIntrest)}}</b-th>
              <b-th variant="secondary">{{formatter.format(totals.totalCapitalAmount)}}</b-th>
              <b-th variant="secondary">{{formatter.format(totals.totalBookingAmount)}}</b-th>
              <b-th variant="secondary">{{formatter.format(totals.investTransPrincipe)}}</b-th>
              <b-th variant="secondary">{{formatter.format(totals.investTransIntrest)}}</b-th>
              <b-th variant="secondary">{{formatter.format(totals.totalOffAmount)}}</b-th>
              <b-th variant="secondary">{{formatter.format(totals.totalRessAmount)}}</b-th>
              <b-th variant="secondary"></b-th>
              <b-th variant="secondary"></b-th>
            </b-tr>
          </b-tfoot>
        </b-table-simple>
      </b-col>
      <b-col v-else>
        <b-table-simple hover small caption-top responsive>
          <b-thead head-variant="dark">
            <b-tr>
              <b-th colspan="5" style="text-align: center;background-color: #007bff;">Credits</b-th>
              <b-th colspan="5" style="text-align: center;background-color: #dc3545;">Debits</b-th>
              <b-th colspan="2" style="text-align: center;background-color: #6f42c1;">Expences</b-th>
            </b-tr>
            <b-tr>
              <b-th style="text-align: center;background-color: #fff; color:#007bff">SNo</b-th>
              <b-th style="text-align: center;background-color: #fff; color:#007bff">Year</b-th>
              <b-th style="text-align: center;background-color: #fff; color:#007bff">Principle</b-th>
              <b-th style="text-align: center;background-color: #fff; color:#007bff">Intrest</b-th>
              <b-th style="text-align: center;background-color: #fff; color:#007bff">Investment</b-th>
              <b-th style="text-align: center;background-color: #fff; color:#dc3545">RS Lend</b-th>
              <b-th style="text-align: center;background-color: #fff; color:#dc3545">Principle</b-th>
              <b-th style="text-align: center;background-color: #fff; color:#dc3545">Intrest</b-th>
              <b-th style="text-align: center;background-color: #fff; color:#dc3545">Off</b-th>
              <b-th style="text-align: center;background-color: #fff; color:#dc3545">Ress</b-th>
              <b-th style="text-align: center;background-color: #fff; color:#6f42c1">TurnOver</b-th>
              <b-th style="text-align: center;background-color: #fff; color:#6f42c1">BF</b-th>
            </b-tr>
          </b-thead>
          <b-tbody>
            <b-tr v-for="(trans, idx) in creditDebits" :key="idx">
              <b-th>{{idx+1}}</b-th>
              <b-td>{{trans.year}}</b-td>
              <b-td>{{trans.transPrincipe!=undefined?formatter.format(trans.transPrincipe):""}}</b-td>
              <b-td>{{trans.transIntrest!=undefined?formatter.format(trans.transIntrest):""}}</b-td>
              <b-td>{{trans.totalCapitalAmount!=undefined?formatter.format(trans.totalCapitalAmount):""}}</b-td>
              <b-td>{{trans.totalBookingAmount!=undefined?formatter.format(trans.totalBookingAmount):""}}</b-td>
              <b-td>{{trans.investTransPrincipe!=undefined?formatter.format(trans.investTransPrincipe):""}}</b-td>
              <b-td>{{trans.investTransIntrest!=undefined?formatter.format(trans.investTransIntrest):""}}</b-td>
              <b-td>{{trans.totalOffAmount!=undefined?formatter.format(trans.totalOffAmount):""}}</b-td>
              <b-td>{{trans.totalRessAmount!=undefined?formatter.format(trans.totalRessAmount):""}}</b-td>
              <b-td>{{trans.turnOver!=undefined?formatter.format(trans.turnOver):""}}</b-td>
              <b-td>{{trans.bf!=undefined?formatter.format(trans.bf):""}}</b-td>
            </b-tr>
          </b-tbody>
          <b-tfoot>
            <b-tr>
              <b-th variant="secondary">Totals:</b-th>
              <b-th variant="secondary"></b-th>
              <b-th variant="secondary">{{formatter.format(totals.transPrincipe)}}</b-th>
              <b-th variant="secondary">{{formatter.format(totals.transIntrest)}}</b-th>
              <b-th variant="secondary">{{formatter.format(totals.totalCapitalAmount)}}</b-th>
              <b-th variant="secondary">{{formatter.format(totals.totalBookingAmount)}}</b-th>
              <b-th variant="secondary">{{formatter.format(totals.investTransPrincipe)}}</b-th>
              <b-th variant="secondary">{{formatter.format(totals.investTransIntrest)}}</b-th>
              <b-th variant="secondary">{{formatter.format(totals.totalOffAmount)}}</b-th>
              <b-th variant="secondary">{{formatter.format(totals.totalRessAmount)}}</b-th>
              <b-th variant="secondary"></b-th>
              <b-th variant="secondary"></b-th>
            </b-tr>
          </b-tfoot>
        </b-table-simple>
      </b-col>
    </b-row>
    <b-row>
      <b-col cols="2" style="float: left">
        <span style="float: left">Total Credits:</span>
      </b-col>
      <b-col cols="2" style="float: left">
        <span style="float: left">{{formatter.format(totals.transPrincipe+totals.transIntrest+totals.totalCapitalAmount)}}</span>
      </b-col>
    </b-row>
    <b-row>
      <b-col cols="2" style="float: left">
        <span style="float: left">Total Debits:</span>
      </b-col>
      <b-col cols="2" style="float: left">
        <span style="float: left">{{formatter.format(totals.totalBookingAmount+totals.investTransPrincipe+totals.investTransIntrest+totals.totalOffAmount+totals.totalRessAmount)}}</span>
      </b-col>
    </b-row>
    <b-row>
      <b-col cols="2" style="float: left">
        <span style="float: left">Closing Balance:</span>
      </b-col>
      <b-col cols="2" style="float: left">
        <span style="float: left">{{formatter.format(closeBal)}}</span>
      </b-col>
    </b-row>
    <b-row>
      <b-col cols="2" style="float: left">
        <span style="float: left">Investment:</span>
      </b-col>
      <b-col cols="2" style="float: left">
        <span style="float: left">{{formatter.format(closeInvestment)}}</span>
      </b-col>
    </b-row>
    <b-row>
      <b-col cols="2" style="float: left">
        <span style="float: left">TurnOver:</span>
      </b-col>
      <b-col cols="2" style="float: left">
        <span style="float: left">{{formatter.format(closeTurnover)}}</span>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <b-button
          variant="primary text-center"
          @click="print"
          value="report"
        >Print Report</b-button>
        <b-button
          variant="secondary text-center"
          @click="$router.push({name: 'Reports', params :{reportType, reportDate}})"
          value="report"
        >Back to Report Search</b-button>
      </b-col>
    </b-row>
  </b-card>
</template>

<script>
// import moment from "moment";
export default {
  data() {
    return {
      totals: {
        transPrincipe: 0,
        transIntrest: 0,
        totalCapitalAmount: 0,
        totalBookingAmount: 0,
        investTransPrincipe: 0,
        investTransIntrest: 0,
        totalOffAmount: 0,
        totalRessAmount: 0
      },
      openBal: 0,
      openInvestment: 0,
      openTurnover: 0,
      closeBal: 0,
      closeInvestment: 0,
      closeTurnover: 0,
      formatter: {},
      creditDebits: {},
      res: {},
      reportType: null,
      reportDate: null,
      openningBal: {}
    };
  },
  methods: {
    // moment() {
    //   return moment();
    // },
    print() {
      window.print();
    },
    getMonth(val) {
      let reVal = "";
      if (val == 1) {
        reVal = "JAN";
      } else if (val == 2) {
        reVal = "FEB";
      } else if (val == 3) {
        reVal = "MAR";
      } else if (val == 4) {
        reVal = "APR";
      } else if (val == 5) {
        reVal = "MAY";
      } else if (val == 6) {
        reVal = "JUN";
      } else if (val == 7) {
        reVal = "JUL";
      } else if (val == 8) {
        reVal = "AUG";
      } else if (val == 9) {
        reVal = "SEP";
      } else if (val == 10) {
        reVal = "OCT";
      } else if (val == 11) {
        reVal = "NOV";
      } else {
        reVal = "DEC";
      }
      return reVal;
    }
  },
  created() {
    this.formatter = new Intl.NumberFormat("en-IN");
    this.openningBal = this.$route.params.openningBal;
    this.closingBal = this.$route.params.closingBal;
    this.reportType = this.$route.params.reportType;
    let issue = this.openningBal.issue;
    let capital = this.openningBal.capital;
    let office = this.openningBal.office;
    let ress = this.openningBal.ress;
    let closeIssue = this.closingBal.issue;
    let closeCapital = this.closingBal.capital;
    let closeOffice = this.closingBal.office;
    let closeRess = this.closingBal.ress;
    if (!closeIssue) {
      closeIssue = {
        totalPrinciple: 0,
        totalIntrest: 0,
        totalAmount: 0,
        tranType: "Issue"
      };
    }
    if (!closeCapital) {
      closeCapital = {
        totalPrinciple: 0,
        totalIntrest: 0,
        totalAmount: 0,
        tranType: "Capital"
      };
    }
    if (!closeOffice) {
      closeOffice = {
        totalPrinciple: 0,
        totalIntrest: 0,
        totalAmount: 0,
        tranType: "Off Exp"
      };
    }
    if (!closeRess) {
      closeRess = {
        totalPrinciple: 0,
        totalIntrest: 0,
        totalAmount: 0,
        tranType: "Res-Exp"
      };
    }
    if (!issue) {
      issue = {
        totalPrinciple: 0,
        totalIntrest: 0,
        totalAmount: 0,
        tranType: "Issue"
      };
    }
    if (!capital) {
      capital = {
        totalPrinciple: 0,
        totalIntrest: 0,
        totalAmount: 0,
        tranType: "Capital"
      };
    }
    if (!office) {
      office = {
        totalPrinciple: 0,
        totalIntrest: 0,
        totalAmount: 0,
        tranType: "Off Exp"
      };
    }
    if (!ress) {
      ress = {
        totalPrinciple: 0,
        totalIntrest: 0,
        totalAmount: 0,
        tranType: "Res-Exp"
      };
    }
    this.openBal =
      capital.totalAmount +
      issue.totalPrinciple +
      issue.totalIntrest -
      capital.totalPrinciple -
      issue.totalAmount -
      capital.totalIntrest -
      ress.totalAmount -
      office.totalAmount;
    this.openInvestment = capital.totalAmount - capital.totalPrinciple;
    this.openTurnover = issue.totalAmount - issue.totalPrinciple;

    this.closeBal =
      closeCapital.totalAmount +
      closeIssue.totalPrinciple +
      closeIssue.totalIntrest -
      closeCapital.totalPrinciple -
      closeIssue.totalAmount -
      closeCapital.totalIntrest -
      closeRess.totalAmount -
      closeOffice.totalAmount;
    this.closeInvestment = closeCapital.totalAmount - closeCapital.totalPrinciple;
    this.closeTurnover = closeIssue.totalAmount - closeIssue.totalPrinciple;
    this.res = this.$route.params.res;
    this.$route.params.creditDebits.forEach((rec, idx) => {
      if (rec.transPrincipe) {
        this.totals.transPrincipe += rec.transPrincipe;
      }
      if (rec.transIntrest) {
        this.totals.transIntrest += rec.transIntrest;
      }
      if (rec.totalCapitalAmount) {
        this.totals.totalCapitalAmount += rec.totalCapitalAmount;
      }
      if (rec.totalBookingAmount) {
        this.totals.totalBookingAmount += rec.totalBookingAmount;
      }
      if (rec.investTransPrincipe) {
        this.totals.investTransPrincipe += rec.investTransPrincipe;
      }
      if (rec.investTransIntrest) {
        this.totals.investTransIntrest += rec.investTransIntrest;
      }
      if (rec.totalOffAmount) {
        this.totals.totalOffAmount += rec.totalOffAmount;
      }
      if (rec.totalRessAmount) {
        this.totals.totalRessAmount += rec.totalRessAmount;
      }

      if (idx == 0) {
        rec.turnOver =
          issue.totalAmount +
          (rec.totalBookingAmount !== undefined ? rec.totalBookingAmount : 0) -
          issue.totalPrinciple -
          (rec.transPrincipe !== undefined ? rec.transPrincipe : 0);
        rec.bf =
          capital.totalAmount +
          issue.totalPrinciple +
          issue.totalIntrest +
          (rec.transPrincipe !== undefined ? rec.transPrincipe : 0) +
          (rec.totalCapitalAmount !== undefined ? rec.totalCapitalAmount : 0) +
          (rec.transIntrest !== undefined ? rec.transIntrest : 0) -
          capital.totalPrinciple -
          capital.totalIntrest -
          ress.totalAmount -
          issue.totalAmount -
          office.totalAmount -
          (rec.investTransPrincipe !== undefined
            ? rec.investTransPrincipe
            : 0) -
          (rec.totalBookingAmount !== undefined ? rec.totalBookingAmount : 0) -
          (rec.totalOffAmount !== undefined ? rec.totalOffAmount : 0) -
          (rec.totalRessAmount !== undefined ? rec.totalRessAmount : 0) -
          (rec.investTransIntrest !== undefined ? rec.investTransIntrest : 0);
      } else {
        rec.turnOver =
          this.$route.params.creditDebits[idx - 1].turnOver +
          (rec.totalBookingAmount !== undefined ? rec.totalBookingAmount : 0) -
          (rec.transPrincipe !== undefined ? rec.transPrincipe : 0);
        rec.bf =
          this.$route.params.creditDebits[idx - 1].bf +
          (rec.transPrincipe !== undefined ? rec.transPrincipe : 0) +
          (rec.totalCapitalAmount !== undefined ? rec.totalCapitalAmount : 0) +
          (rec.transIntrest !== undefined ? rec.transIntrest : 0) -
          (rec.investTransPrincipe !== undefined
            ? rec.investTransPrincipe
            : 0) -
          (rec.totalBookingAmount !== undefined ? rec.totalBookingAmount : 0) -
          (rec.totalOffAmount !== undefined ? rec.totalOffAmount : 0) -
          (rec.totalRessAmount !== undefined ? rec.totalRessAmount : 0) -
          (rec.investTransIntrest !== undefined ? rec.investTransIntrest : 0);
      }
    });
    this.creditDebits = this.$route.params.creditDebits;
    this.reportDate = this.$route.params.reportDate;
    // console.log(this.res)
    // console.log(this.openningBal)
  }
};
</script>

<style>
</style>