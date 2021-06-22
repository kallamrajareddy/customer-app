<template>
<div class="container">

    <b-row class="border-bottom">
        <b-col cols="4" class="padding-left">
        <b-row class="border-bottom border-right padding-left">
            <b-col style="text-align:left">
                <span>Form F (sec.7, Rule 8)</span>
            </b-col>
        </b-row>
        <b-row  class="border-bottom border-right padding-left">
            <b-col style="text-align:left">
                <span>Lic. No. : 239/2008</span>
            </b-col>
        </b-row>

        </b-col>
        <b-col cols="5" style="text-align:center">
        <h2 class="m-10 ft2">SRI HARSHA FINANCE</h2>
                <p class="ft3">AYYAPPANAGAR; VIJAYAWADA - 520 007</p>
                <p class="ft4">PHONE : 9440324545</p>
        </b-col>
        <b-col md class="image-position-print" style="margin-top: 1px; float:right;">
          <div id="preview-print">
            <b-img
              width="100px"
              height="96px"
              v-if="form.brokerNo != null"
              :src="'/images/'
              +form.brokerNo+'.jpg'"
              alt="Fluid image"
            ></b-img>
          </div>
        </b-col>
    </b-row>
    <b-row  class="border-bottom" style="height: 33px;">
        <b-col class="padding-left" style="text-align: left; padding-top: 2px">
            <p style="margin-bottom: 0px;">ACODE : <span>{{form.brokerNo}}</span></p>
        </b-col>
    </b-row>
    <b-row  class="border-bottom" style="height: 33px;">
        <b-col class="padding-left padding-right" style="text-align: left;">
            <p style="margin-bottom: 0px;">Booking No : <span>{{form.bookings.bookingNo}}</span></p>
        </b-col>
        <b-col class="padding-left padding-right" style="text-align: right;">
            <p style="margin-bottom: 0px;">Date : <span>{{form.bookings.bookingDate}}</span></p>
        </b-col>
    </b-row>
    <b-row class="border-bottom" style="height: 33px;">
        <b-col class="padding-left padding-right border-right" cols="1" style="text-align: center;">
            <span>1</span>
        </b-col>
        <b-col class="padding-left padding-right" style="text-align: left;">
            <p style="margin: 2px; color: red;">Borrower Name : <span>{{form.brokerName}}</span></p>
        </b-col>
    </b-row>
    <b-row class="border-bottom" style="height: 33px;">
        <b-col class="padding-left padding-right border-right" cols="1">
        </b-col>
        <b-col class="padding-left padding-right border-right" style="text-align: left;">
            <p style="margin: 2px;"><span>{{form.addr1}}</span></p>
        </b-col>
        <b-col class="padding-left padding-right" style="text-align: left;" cols="4">
            <p style="margin: 2px;">JOB : <span>{{form.occupation}}</span></p>
        </b-col>
    </b-row>
    <b-row class="border-bottom" style="height: 33px;">
        <b-col class="padding-left padding-right border-right" cols="1">
        </b-col>
        <b-col class="padding-left padding-right" style="text-align: left;">
            <p style="margin: 2px;">ADDRESS: </p>
        </b-col>
    </b-row>
    <b-row class="border-bottom" style="height: 33px;">
        <b-col class="padding-left padding-right border-right" cols="1">
        </b-col>
        <b-col class="padding-left padding-right" style="text-align: left;">
            <p style="margin: 2px;"><span>{{form.addr2}}</span></p>
        </b-col>
    </b-row>
    <b-row class="border-bottom" style="height: 33px;">
        <b-col class="padding-left padding-right border-right" cols="1">
        </b-col>
        <b-col class="padding-left padding-right" style="text-align: left;">
            <p style="margin: 2px;"><span>{{form.addr3}}</span></p>
        </b-col>
    </b-row>
    <b-row class="border-bottom" style="height: 33px;">
        <b-col class="padding-left padding-right border-right" cols="1">
        </b-col>
        <b-col class="padding-left padding-right border-right" style="text-align: left;">
            <p style="margin: 2px;"><span>{{form.town}}</span></p>
        </b-col>
        <b-col class="padding-left padding-right" style="text-align: left;" cols="4">
            <p style="margin: 2px;">Phone : <span>{{form.mobileNo}}</span></p>
        </b-col>
    </b-row>
    <b-row class="border-bottom" style="height: 33px;">
    </b-row>
    <b-row class="border-bottom" style="height: 33px;">
        <b-col class="padding-left padding-right border-right" cols="1" style="text-align: center;">
            <span>2</span>
        </b-col>
        <b-col class="padding-left padding-right" style="text-align: left;">
            <p style="margin: 2px; color: red;">Borrowed Amount : <span>Rs {{form.bookings.amountTaken}}/-</span></p>
        </b-col>
    </b-row>
    <b-row class="border-bottom" style="height: 33px;">
        <b-col class="padding-left padding-right border-right" cols="1" style="text-align: center;">
        </b-col>
        <b-col class="padding-left padding-right" style="text-align: left;">
            <p style="margin: 2px;"><span>{{ form.bookings.amountTaken | toWords }} RUPIES ONLY</span></p>
        </b-col>
    </b-row>
    <b-row class="border-bottom" style="height: 33px;">
    </b-row>
    <b-row class="border-bottom" style="height: 33px;">
        <b-col class="padding-left padding-right border-right" cols="1" style="text-align: center;">
            <span>3</span>
        </b-col>
        <b-col class="padding-left padding-right" style="text-align: left;">
            <p style="margin: 2px;"><span>Rate of Interest (Compound) :- </span></p>
        </b-col>
    </b-row>
    <b-row class="border-bottom" style="height: 33px;">
    </b-row>
    <b-row>
        <b-table-simple hover small caption-top responsive>
              <b-thead>
                <b-tr class="border-bottom">
                  <b-th  class="border-bottom border-top border-right border-left" colspan="1" style="background-color:#d6d8db; important!">S.No</b-th>
                  <b-th  class="border-bottom border-top border-right border-left" colspan="4" style="background-color:#d6d8db; important!">Item Particulars</b-th>
                  <b-th  class="border-bottom border-top border-right border-left" colspan="2" style="background-color:#d6d8db; important!">Remarks</b-th>
                  <b-th  class="border-bottom border-top border-right border-left" colspan="1" style="background-color:#d6d8db; important!">No.of Articles</b-th>
                  <b-th  class="border-bottom border-top border-right border-left" colspan="1" style="background-color:#d6d8db; important!">Gross Wt</b-th>
                  <b-th  class="border-bottom border-top border-left border-right" colspan="1" style="background-color:#d6d8db; important!">Net Wt</b-th>
                </b-tr>
              </b-thead>
              <b-tbody>
                <b-tr v-for="(item,idx) in form.bookings.items" :key="idx">
                  <b-td  class="border-bottom border-right border-left" colspan="1">{{idx+1}}</b-td>
                  <b-td  class="border-bottom border-right border-left" colspan="4">
                      {{item.itemCode}}
                  </b-td>
                  <b-td  class="border-bottom border-right border-left" colspan="2">
                      {{item.remarks}}
                  </b-td>
                  <b-td  class="border-bottom border-right border-left" colspan="1">
                      {{item.quantity}}
                  </b-td>
                  <b-td  class="border-bottom border-right border-left" colspan="1">
                      {{item.grossWeight}}
                  </b-td>
                  <b-td  class="border-bottom border-right" colspan="1">
                      {{item.netWeight}}
                  </b-td>
                </b-tr>
                <b-tr v-for="(item) in extraRows" :key="item" style="height: 33px;">
                  <b-td  class="border-bottom border-right border-left" colspan="1"></b-td>
                  <b-td  class="border-bottom border-right border-left" colspan="4"></b-td>
                  <b-td  class="border-bottom border-right border-left" colspan="2"></b-td>
                  <b-td  class="border-bottom border-right border-left" colspan="1"></b-td>
                  <b-td  class="border-bottom border-right border-left" colspan="1"></b-td>
                  <b-td  class="border-bottom border-right" colspan="1"></b-td>
                </b-tr>
              </b-tbody>
              <b-tfoot v-if="form.bookings.items.length>0">
                <b-tr>
                  <b-td colspan="1"   class="border-bottom border-left" style="text-align: left">TOTAL:-</b-td>
                  <b-td colspan="4"  class="border-bottom"></b-td>
                  <b-td colspan="2"  class="border-bottom border-right"></b-td>
                  <b-td colspan="1"  class="border-bottom border-right">{{quantity}}</b-td>
                  <b-td colspan="1"  class="border-bottom border-right">{{form.bookings.grossWeight}}</b-td>
                  <b-td colspan="1"  class="border-bottom border-right">{{form.bookings.netWeight}}</b-td>
                </b-tr>
              </b-tfoot>
              </b-table-simple>
    </b-row>
    <b-row class="border-bottom"  style="height: 1px;">
    </b-row>
    <b-row class="border-bottom" style="height: 33px;">
        <b-col class="padding-left padding-right border-right" cols="1" style="text-align: center;">
            <span>4</span>
        </b-col>
        <b-col class="padding-left padding-right border-right" style="text-align: left;">
            <p style="margin: 2px;"><span>Purity percentage of the articles pledged : {{form.bookings.purity}}%</span></p>
        </b-col>
        <b-col class="padding-left padding-right" style="text-align: left;">
            <p style="margin: 2px;"><span>Total Value of the articles : </span></p>
        </b-col>
    </b-row>
    <b-row class="border-bottom" style="height: 33px;">
        <b-col class="padding-left padding-right border-right" cols="1" style="text-align: center;">
            <span>5</span>
        </b-col>
        <b-col class="padding-left padding-right" style="text-align: left;">
            <p style="margin: 2px;"><span>Repayment Date for the items pledged : </span></p>
        </b-col>
    </b-row>
    <b-row class="border-bottom" style="height: 33px;">
        <b-col class="padding-left padding-right border-right" cols="1" style="text-align: center;">
            <span>6</span>
        </b-col>
        <b-col class="padding-left padding-right" style="text-align: left;">
            <p style="margin: 2px;"><span>i/we certify that the Items pledged with you are my/our own property </span></p>
        </b-col>
    </b-row>
    <b-row class="border-bottom" style="height: 33px;">
        <b-col class="padding-left padding-right border-right" cols="1" style="text-align: center;">
            <span>7</span>
        </b-col>
        <b-col class="padding-left padding-right" style="text-align: left;">
            <p style="margin: 2px;"><span>we accept to pay one month interest if the amount is repaid before one month.</span></p>
        </b-col>
    </b-row>
     <b-row class="border-bottom"  style="height: 14px;">
    </b-row>
    <b-row class="border-bottom"  style="height: 30px;">
        <b-col class="padding-left padding-right" style="text-align: left;">
            <span><b>Rs {{form.bookings.amountTaken}}/-</b></span>
        </b-col>
    </b-row>
    <b-row class="border-bottom"  style="height: 60px;">
        <b-col class="padding-left padding-right" style="text-align: left;  padding-top:36px;">
            <span><b>Signature or thumb impression of the bowwower</b></span>
        </b-col>
        <b-col cols="4" class="padding-left padding-right" style="text-align: right; padding-top:36px;">
            <span><b>Signature of the authorised signatory</b></span>
        </b-col>
    </b-row>
    <b-row class="border-bottom"  style="height: 34px;">
        <b-col class="padding-left padding-right"  style="text-align: left; padding-bottom:50px;">

        <span   style="text-align: left; padding-bottom:50px;">&#9986;---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------&#9986;</span>
        </b-col>
    </b-row>
    <b-row>
        <b-col class="padding-left padding-right">
            <b-row class="border-bottom" style="height: 33px;">
        <b-col class="padding-left padding-right border-right" style="text-align: left;">
            <p style="margin-bottom: 0px; padding-top: 10px;">Dt: {{form.bookings.bookingDate}}</p>
        </b-col>
        <b-col class="padding-left padding-right" style="text-align: left;">
            <p style="margin-bottom: 0px; padding-top: 10px;">Cell: 9440324545</p>
        </b-col>
    </b-row>
    <b-row  class="border-bottom" style="height: 32px;">
        <b-col class="padding-left padding-right" style="text-align: left;">
            <p style="margin-bottom: 0px; padding-top: 10px;">Booking No : <span>{{form.bookings.bookingNo}}</span></p>
        </b-col>
    </b-row>
    <b-row  class="border-bottom" style="height: 33px;">
        <b-col class="padding-left padding-right" style="text-align: left;">
            <p style="margin-bottom: 0px; padding-top: 10px;">Borrowed Amount : <span>Rs {{form.bookings.amountTaken}}/-</span></p>
        </b-col>
    </b-row>
    <b-row class="border-bottom" style="height: 35px;">
        <b-col class="padding-left padding-right" style="text-align: left;">
            <p style="margin: 0px; padding-top: 10px;"><span>{{form.addr1}}</span></p>
        </b-col>
    </b-row>
    <b-row class="border-bottom" style="height: 34px;">
        <b-col class="padding-left padding-right" style="text-align: left;">
            <p style="margin: 0px; padding-top: 10px;"><span>{{form.addr2}}</span></p>
        </b-col>
    </b-row>
    <b-row class="border-bottom" style="height: 33px;">
        <b-col class="padding-left padding-right" style="text-align: left;">
            <p style="margin: 0px; padding-top: 10px;"><span>{{form.addr3}}</span></p>
        </b-col>
    </b-row>
    <b-row class="border-bottom" style="height: 33px;">
        <b-col class="padding-left padding-right" style="text-align: left;">
            <p style="margin: 0px; padding-top: 10px;"><span>{{form.town}}</span></p>
        </b-col>
    </b-row>
    <b-row class="border-bottom" style="height: 32px;">
        <b-col class="padding-left padding-right" style="text-align: left;">
            <p style="margin: 0px; padding-top: 10px;">Note : <span>Please inform in case of any address change</span></p>
        </b-col>
    </b-row>
        </b-col>
        <b-col class="padding-left padding-right  padding-bottom">
        <b-table-simple hover small caption-top responsive>
              <b-thead>
                <b-tr class="border-bottom">
                  <b-th  class="border-bottom border-top border-right border-left" colspan="1" style="background-color:#d6d8db; important!">No.Art</b-th>
                  <b-th  class="border-bottom border-top border-right border-left" colspan="4" style="background-color:#d6d8db; important!">Particulars</b-th>
                  <b-th  class="border-bottom border-top border-right border-left" colspan="2" style="background-color:#d6d8db; important!">Remarks</b-th>
                  <b-th  class="border-bottom border-top border-right border-left" colspan="1" style="background-color:#d6d8db; important!">Weight</b-th>
                </b-tr>
              </b-thead>
              <b-tbody>
                <b-tr v-for="(item,idx) in form.bookings.items" :key="idx">
                  <b-td  class="border-bottom border-right border-left" colspan="1">{{item.quantity}}</b-td>
                  <b-td  class="border-bottom border-right border-left" colspan="4">
                      {{item.itemCode}}
                  </b-td>
                  <b-td  class="border-bottom border-right border-left" colspan="2">
                      {{item.remarks}}
                  </b-td>
                  <b-td  class="border-bottom border-right" colspan="1">
                      {{item.netWeight}}
                  </b-td>
                </b-tr>
                <b-tr v-for="(item) in extraRows" :key="item" style="height: 33px;">
                  <b-td  class="border-bottom border-right border-left" colspan="1"></b-td>
                  <b-td  class="border-bottom border-right border-left" colspan="4">
                  </b-td>
                  <b-td  class="border-bottom border-right border-left" colspan="2">
                  </b-td>
                  <b-td  class="border-bottom border-right" colspan="1">
                  </b-td>
                </b-tr>
              </b-tbody>
              <b-tfoot v-if="form.bookings.items.length>0">
                <b-tr>
                  <b-td colspan="1"   class="border-bottom border-left" style="text-align: left;">TOTAL:-</b-td>
                  <b-td colspan="4"  class="border-bottom" style="text-align: left;"></b-td>
                  <b-td colspan="2"  class="border-bottom border-right"></b-td>
                  <b-td colspan="1"  class="border-bottom border-right">{{form.bookings.netWeight}}</b-td>
                </b-tr>
              </b-tfoot>
              </b-table-simple>
              </b-col>
    </b-row>
    <b-row class="border-bottom" style="height: 33px;">
        <b-col class="padding-left padding-right border-right" style="text-align: left;">
            <p style="margin: 0px; padding-top: 10px;">Note : <span>Articles will not be given if this card is lost</span></p>
        </b-col>
        <b-col class="padding-left padding-right" style="text-align: center;">
            <p style="margin: 0px; padding-top: 10px;">Due Date : <span>{{form.bookings.dueDate}}</span></p>
        </b-col>
    </b-row>
     <!-- <b-row bg-variant="light" style="position:sticky;bottom:0;padding-top:10px;" id="hideButtons">
          <b-col md style="text-align: center !important">
            <b-button
              variant="primary text-center"
              @click="print"
              value="Update"
            >Print</b-button>
          </b-col>
        </b-row> -->
    </div>
</template>

<script>

  // register globally
  //Vue.component('multiselect', Multiselect)
//import moment from "moment";
import converter from 'number-into-words';
export default {
    data () {
      return {
        quantity: 0,
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
        search: "",
        extraRows: [],
      }
    },
    filters: {
    toWords: function(value) {
      if (!value) return "";
      let finalVal = converter.indianConversion(value, {characterCase: 'UPPERCASE'}); 
      return finalVal.split(".")[0];
    }
  },
    created() {
    this.form = this.$route.params.req.form;
    this.search = this.$route.params.search;
    this.form.bookings.items.forEach(item => {
        this.quantity += item.quantity;
    })
    let rem = 6 - this.form.bookings.items.length;
    for(let i=0; i<rem;i++){
        this.extraRows.push("data"+i);
    }
    this.form.bookings.bookingDate =  this.form.bookings.bookingDate.format("DD-MMM-YYYY");
    this.form.bookings.dueDate =  this.form.bookings.dueDate.format("DD-MMM-YYYY");
    console.log(this.form);
  },
mounted(){
  // this.$http
  //       .get("/middleware/api/secured/broker-count")
  //       .then(response => {
  //         console.log(response.data);
  //       })
  //       .catch(function(error) {
  //         // handle error
  //         alert(error);
  //       })
  //       .finally(function() {
  //         // always executed
  //       });
        
},
methods: {
    print() {
        document.getElementById("hideButtons").style.display='none';
      window.print();
    },
    converter(){
      return converter;
    }
}
}
</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style scoped>
@media print {
    body{
        width: 21cm;
        height: 29.7cm;
        margin: 5mm 5mm 5mm 5mm; 
        /* change the margins as you want them to be. */
   } 
}
        body {
            color: #000;
        }

        .container {
            position: relative;
            overflow: hidden;
            margin: 30px;
            padding: 0px;
            border: solid 1px #000;
            width: 982px;
            height: auto;
        }

        .row {
            margin: 0px;
        }

        h1 {
            color: #000;
            text-align: center;
        }

        p {

            /*  font-size: 20px; */
            font: bold 14px 'Arial';
            line-height: 16px;
        }

        .m-0 {
            margin-left: 0;
            margin-top: 0;
            margin-bottom: 0;
            margin-right: 0;
        }

        .pad-0 {
            padding-left: 0;
            padding-top: 0;
            padding-right: 0;
            padding-bottom: 0;
        }

        .m-10 {
            margin-top: 10px;
        }

        .m-20 {
            margin-top: 20px !important;
        }

        .over {
            overflow: auto;
        }

        .right-div {
            float: left;
            text-align: center;
            padding-left: 40px;
        }

        .br-top {
            border-top: solid 1px #000;
        }

        .br-bottom {
            border-bottom: solid 1px #000;
        }

        .br-p {
            border-right: solid 1px #000;
        }

        .pad-20 {
            padding-top: 20px;
        }

        .part-1 {
            padding: 10px;
            border-bottom: solid 1px #000;
            border-right: solid 1px #000;
            font: bold 16px 'Arial';
            line-height: 19px;
            margin: 0;
        }

        .ft2 {
            font: bold 21px 'Arial';
            line-height: 22px;
        }

        .ft3 {
            font: bold 12px 'Arial';
            line-height: 15px;
        }

        .ft4 {
            font: bold 14px 'Arial';
            line-height: 12px;
        }

        .acode {
            padding-left: 10px;
            border-bottom: solid 1px #000;
        }

        .txt-right {
            text-align: right;
        }

        .table-bordered {
            border: 1px solid #000;

        }

        .table-bordered>tbody>tr>td,
        .table-bordered>tbody>tr>th,
        .table-bordered>tfoot>tr>td,
        .table-bordered>tfoot>tr>th,
        .table-bordered>thead>tr>td,
        .table-bordered>thead>tr>th {
            border: 1px solid #000;
        }

        .ft7 {
            font: bold 14px 'Arial';
            color: #ff0000;
            line-height: 16px;
        }

        .pad-t-b {
            padding-top: 10px;
            padding-bottom: 10px;
            ;
        }

        .p-t-b-20 {
            padding-top: 20px;
            padding-bottom: 20px;
            ;
        }
        .border-left{
            border-left: solid 1px #000 !important;
        }
        .border-right{
            border-right: solid 1px #000 !important;
        }
        .border-bottom{
            border-bottom: solid 1px #000 !important;
        }
        .border-top{
            border-top: solid 1px #000 !important;
        }
        .padding-left{
            padding-left: 0px !important;
        }
        .padding-right{
            padding-right: 0px !important;
        }
        .table-responsive{
            margin-bottom: 0px !important;
        }
        .image-position-print {
  max-height: 96px;
  padding: 0px;
  width: 100px;
  margin-right: 5px;
  margin-top: 6px;
}
#preview-print img {
  width: 100px;
  height: 96px;
  float: right;
}
</style>

