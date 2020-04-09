<template>
  <b-card>
    <b-row>
      <b-col>
        <span class="my-card-heading">Create Account</span>
      </b-col>
    </b-row>
    <b-form ref="form" @submit.stop.prevent>
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
            :state="nameState"
            invalid-feedback="Name is Required"
            label-for="brokerName"
          >
            <b-form-input
              id="brokerName"
              @keypress="checkFormValidity"
              :state="nameState"
              v-model="form.brokerName"
              required
            ></b-form-input>
          </b-form-group>
        </b-col>
        <b-col class="col-padding-margin-right">
          <b-form-group id="addr1Lbl" label="Mother/Father" label-for="addr1">
            <b-form-input id="addr1" v-model="form.addr1"></b-form-input>
          </b-form-group>
        </b-col>
        <b-col md="1" class="col-padding-margin-right">
          <b-form-group id="gender" label="Gender" label-for="gender">
            <b-form-select id="gender" v-model="form.gender" :options="genderOptions"></b-form-select>
          </b-form-group>
        </b-col>
        <b-col md="2" class="col-padding-margin-right">
          <label for="dob">Data Of Birth</label>
          <b-input-group>
            <b-form-input id="dob" v-model="form.dob" type="text" placeholder="YYYY-MM-DD"></b-form-input>
            <b-input-group-append>
              <b-form-datepicker
                v-model="form.dob"
                button-only
                :date-format-options="{ day: 'numeric', month: 'numeric',year: 'numeric'  }"
                right
                locale="en-US"
                aria-controls="dob"
              ></b-form-datepicker>
            </b-input-group-append>
          </b-input-group>
        </b-col>
        <b-col md="1" class="col-padding-margin-right">
          <b-form-group id="ageLbl" label="Age" label-for="age">
            <b-form-input id="age" v-model="form.age" disabled placeholder></b-form-input>
          </b-form-group>
        </b-col>
        <b-col md="2" class="col-padding-margin-right">
          <b-form-group id="aadharNoLbl" label="Aadhar Number" label-for="aadharNo">
            <b-form-input id="aadharNo" v-model="form.aadharNo"></b-form-input>
          </b-form-group>
        </b-col>
      </b-row>
      <b-row>
        <b-col md="7">
          <b-row>
            <b-col md>
              <b-form-group id="occupationLbl" label="Occupation" label-for="occupation">
                <b-form-select
                  id="occupation"
                  v-model="form.occupation"
                  :options="occupationOptions"
                ></b-form-select>
              </b-form-group>
            </b-col>
            <b-col md>
              <b-form-group id="mobileNoLbl" label="Mobile No" label-for="mobileNo">
                <b-form-input id="mobileNo" v-model="form.mobileNo"></b-form-input>
              </b-form-group>
            </b-col>
            <b-col md>
              <b-form-group id="otherPhones1Lbl" label="Other Mobile I" label-for="otherPhones1">
                <b-form-input id="otherPhones1" v-model="form.otherPhones1"></b-form-input>
              </b-form-group>
            </b-col>
            <b-col md>
              <b-form-group id="otherPhones2Lbl" label="Other Mobile II" label-for="otherPhones2">
                <b-form-input id="otherPhones2" v-model="form.otherPhones2"></b-form-input>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col md>
              <b-form-group
                id="contact1MobileLbl"
                label="Intro I Mobile"
                label-for="relationPhones"
              >
                <b-form-input id="contact1Mobile" disabled v-model="form.contact1Mobile"></b-form-input>
              </b-form-group>
            </b-col>
            <b-col md>
              <b-form-group
                id="contact1RelationLbl"
                label=" Intro I Relation Type"
                label-for="contact1Relation"
              >
                <b-form-select
                  id="contact1Relation"
                  v-model="form.contact1Relation"
                  :options="contactRelationOptions"
                ></b-form-select>
              </b-form-group>
            </b-col>
            <b-col md>
              <b-form-group id="contactPerson1Lbl" label="Intro By I" label-for="contactPerson1">
                <div style="display: flex;">
                  <b-form-input id="contactPerson1" v-model="form.contactPerson1" placeholder></b-form-input>
                  <b-button
                    variant="primary"
                    @click="searchContact1Person"
                    :disabled="(form.contactPerson1 == null || form.contactPerson1.length<3)"
                  >
                    <b-icon icon="search" aria-hidden="true"></b-icon>
                    <span class="sr-only">Search</span>
                  </b-button>
                </div>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col md>
              <b-form-group
                id="contact2MobileLbl"
                label="Intro II Mobile"
                label-for="contact2Mobile"
              >
                <b-form-input id="contact2Mobile" disabled v-model="form.contact2Mobile"></b-form-input>
              </b-form-group>
            </b-col>
            <b-col md>
              <b-form-group
                id="contact2RelationLbl"
                label=" Intro II Relation Type"
                label-for="contact2Relation"
              >
                <b-form-select
                  id="contact2Relation"
                  v-model="form.contact2Relation"
                  :options="contactRelationOptions"
                ></b-form-select>
              </b-form-group>
            </b-col>
            <b-col md>
              <b-form-group id="contactPerson2Lbl" label="Intro By II" label-for="contactPerson2">
                <div style="display: flex;">
                  <b-form-input id="contactPerson2" v-model="form.contactPerson2" placeholder></b-form-input>
                  <b-button
                    variant="primary"
                    @click="searchContact2Person"
                    :disabled="(form.contactPerson2 == null || form.contactPerson2.length<3)"
                  >
                    <b-icon icon="search" aria-hidden="true"></b-icon>
                    <span class="sr-only">Search</span>
                  </b-button>
                </div>
              </b-form-group>
            </b-col>
          </b-row>
        </b-col>
        <b-col md>
          <b-row>
            <b-col md class="image-position">
              <span style="text-align:center;">Account Holder</span>

              <div
                class="image-input"
                :style="{ 'background-image': `url(${imageData})` }"
                @click="chooseImage"
              >
                <span v-if="!imageData" class="placeholder">Choose an Image</span>
                <input class="file-input" ref="fileInput" type="file" @input="onSelectFile" />
              </div>
            </b-col>
            <b-col md class="image-position">
              <span style="text-align:center;">Intro I</span>
              <div id="preview">
                <b-img
                  v-if="form.contact1PersonId == '' || form.contact1PersonId == null"
                  v-bind="mainProps"
                  rounded="top"
                  alt="Top-rounded image"
                ></b-img>
                <b-img
                  v-else
                  :src="'http://localhost:8182/images/'
              +form.contact1PersonId+'.jpg'"
                  thumbnail
                  fluid
                  alt="Fluid image"
                ></b-img>
              </div>
            </b-col>
            <b-col md class="image-position">
              <span style="text-align:center;">Intro II</span>
              <div id="preview">
                <b-img
                  v-if="form.contact2PersonId == '' || form.contact2PersonId == null"
                  v-bind="mainProps"
                  rounded="top"
                  alt="Top-rounded image"
                ></b-img>
                <b-img
                  v-else
                  :src="'http://localhost:8182/images/'
              +form.contact2PersonId+'.jpg'"
                  thumbnail
                  fluid
                  alt="Fluid image"
                ></b-img>
              </div>
            </b-col>
          </b-row>
        </b-col>
      </b-row>
      <b-row>
        <b-col md="2" class="col-padding-margin-right">
          <label for="dow">Date Of Creation</label>
          <b-input-group>
            <b-form-input id="dow" disabled v-model="form.dow" type="text" placeholder="YYYY-MM-DD"></b-form-input>
            <!-- <b-input-group-append>
              <b-form-datepicker
                v-model="form.dow"
                button-only
                right
                locale="en-US"
                aria-controls="dob"
              ></b-form-datepicker>
            </b-input-group-append>-->
          </b-input-group>
        </b-col>
        <b-col md>
          <b-form-group id="emailLbl" label="Email" label-for="email">
            <b-form-input id="email" v-model="form.email"></b-form-input>
          </b-form-group>
        </b-col>
        <b-col md="1">
          <b-form-group id="ownrentLbl" label="Own or Rent" label-for="ownrent">
            <b-form-checkbox id="ownrent" v-model="form.ownrent"></b-form-checkbox>
          </b-form-group>
        </b-col>
        <b-col md>
          <b-form-group id="addr2Lbl" label="Door No" label-for="addr2">
            <b-form-input id="addr2" v-model="form.addr2"></b-form-input>
          </b-form-group>
        </b-col>
        <b-col md>
          <b-form-group id="addr3Lbl" label="Street" label-for="addr3">
            <b-form-input id="addr3" v-model="form.addr3"></b-form-input>
          </b-form-group>
        </b-col>
      </b-row>
      <b-row>
        <!-- <b-col md="2">
          <b-form-group id="defaulterLbl" label="Defaulter" label-for="defaulter">
            <b-form-checkbox id="defaulter" v-model="form.defaulter" switch variant="danger"></b-form-checkbox>
          </b-form-group>
        </b-col>-->
        <b-col md>
          <b-form-group id="areaLbl" label="Area" label-for="area">
            <b-form-input id="area" v-model="form.area"></b-form-input>
          </b-form-group>
        </b-col>
        <b-col md>
          <b-form-group id="townLbl" label="Town" label-for="town">
            <b-form-input id="town" v-model="form.town"></b-form-input>
          </b-form-group>
        </b-col>
        <b-col md>
          <b-form-group id="districtLbl" label="District" label-for="district">
            <b-form-input id="district" v-model="form.district"></b-form-input>
          </b-form-group>
        </b-col>
        <b-col md="1">
          <b-form-group id="zipCodeLbl" label="ZipCode" label-for="zipCode">
            <b-form-input id="zipCode" v-model="form.zipCode" maxlength="6"></b-form-input>
          </b-form-group>
        </b-col>
        <b-col md>
          <b-form-group id="remarksLbl" label="Remarks" label-for="remarks" style="color:red;">
            <b-form-input id="remarks" v-model="form.remarks" rows="3" max-rows="6"></b-form-input>
          </b-form-group>
        </b-col>
      </b-row>
      <b-row bg-variant="light" style="position:sticky;bottom:0;padding-top:10px;">
        <b-col md style="text-align: center !important">
          <b-button
            variant="primary text-center"
            @click="createAccount"
            value="Create"
          >Create Account</b-button>&nbsp;&nbsp;
          <b-button variant="danger text-center" @click="reload" value="Reset">Reset</b-button>&nbsp;&nbsp;
          <b-button
            variant="secondary text-center"
            @click="$router.go(-1)"
            value="back"
          >Back To Search</b-button>
        </b-col>
      </b-row>
    </b-form>
    <b-modal
      size="xl"
      centered
      id="modal-contactPerson"
      ref="contactPersonModal"
      hide-header
      hide-footer
    >
      <b-card title="Contact Person Search">
        <b-row>
          <b-col>
            <b-form-group id="contactPersonLbl" label="Intro By" label-for="contactPerson">
              <div style="display: flex;">
                <b-form-input id="contactPerson" v-model="contactPerson" placeholder></b-form-input>
                <b-button
                  variant="primary"
                  @click="searchContactPerson"
                  :disabled="(contactPerson == null || contactPerson.length<3)"
                >
                  <b-icon icon="search" aria-hidden="true"></b-icon>
                  <span class="sr-only">Search</span>
                </b-button>
              </div>
            </b-form-group>
          </b-col>
        </b-row>
        <b-row>
          <b-col>
            <b-table
              ref="selectableTable"
              id="accountSearchResult"
              selectable
              select-mode="single"
              :items="items"
              :fields="fields"
              @row-dblclicked="onRowSelected"
              sticky-header="true"
              responsive
            >
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
                <div>
                  <b-avatar
                    class="align-baseline"
                    style="backgroundcolor"
                    :src="'http://localhost:8182/images/'
              +data.item.brokerNo+'.jpg'"
                  ></b-avatar>
                  <span
                    v-if="(data.item.bookings.find(booking => booking.closed !== true) != undefined)"
                    class="rounded-circle"
                    style="background-color: #73D500;vertical-align: top;display: inline-block;height: 10px;width: 10px;"
                  ></span>
                </div>
              </template>
            </b-table>
          </b-col>
        </b-row>
      </b-card>
    </b-modal>
    <!-- <b-modal size="xl" centered id="modal-postal" ref="postalModal" hide-header hide-footer>
      <b-card title="Postal Details">
        <b-row>
          <b-col>
            <b-table
              ref="selectablePostalTable"
              id="PostalSearchResult"
              selectable
              select-mode="single"
              :items="postalItems"
              :fields="postalFields"
              @row-dblclicked="onPostalRowSelected"
              sticky-header="true"
              responsive
            ></b-table>
          </b-col>
        </b-row>
      </b-card>
    </b-modal>-->
  </b-card>
</template>

<script>
import moment from "moment";
export default {
  data() {
    return {
      url: "",
      imageData: null,
      custImage: null,
      mainProps: {
        blank: true,
        blankColor: "#e0e0e0;",
        width: 250,
        height: 250,
        class: "m1"
      },
      genderOptions: ["MALE", "FEMALE"],
      occupationOptions: [],
      contactRelationOptions: [],
      nameState: null,
      form: {
        companyCode: null,
        brokerNo: null,
        brokerName: null,
        aadharNo: null,
        addr1: null,
        addr2: null,
        addr3: null,
        town: null,
        district: "KRISHNA",
        area: null,
        zipCode: null,
        otherPhones1: null,
        otherPhones2: null,
        mobileNo: null,
        email: null,
        dob: null,
        dow: null,
        occupation: null,
        age: 55,
        gender: "MALE",
        remarks: null,
        ownrent: false,
        defaulter: false,
        contactPerson1: null,
        contact1Mobile: null,
        contact1PersonId: null,
        contact1Relation: null,
        contactPerson2: null,
        contact2Mobile: null,
        contact2PersonId: null,
        contact2Relation: null,
        createdBy: null,
        updatedBy: null
      },
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
      items: [],
      contactPerson: null,
      contact1Person: false,
      contact2Person: false
      //   postalFields: [
      //     // { key: "selected", label: "Selected", sortable: false },
      //     { key: "pincode", label: "Pin Code", sortable: false },
      //     { key: "officeName", label: "Area", sortable: true },
      //     { key: "taluk", label: "Town", sortable: true },
      //     { key: "districtName", label: "District", sortable: false },
      //     { key: "stateName", label: "State", sortable: false }
      //   ],
      //   postalItems: []
    };
  },
  methods: {
    chooseImage() {
      this.$refs.fileInput.click();
    },
    onSelectFile() {
      const input = this.$refs.fileInput;
      const files = input.files;
      this.custImage = files;
      if (files && files[0]) {
        const reader = new FileReader();
        reader.onload = e => {
          this.imageData = e.target.result;
        };
        reader.readAsDataURL(files[0]);
        this.$emit("input", files[0]);
      }
    },
    reload() {
      window.location.reload(true);
    },
    nameCheck() {
      let loader = this.$loading.show({
        loader: "bars",
        color: "green"
      });
      this.$http
        .get(
          "/middleware/api/secured/existing-broker-check/" +
            this.form.brokerName.toUpperCase() +
            "/" +
            this.$store.state.selectedCompany.value
        )
        .then(response => {
          loader.hide();
          if (response.data) {
            this.$bvModal
              .msgBoxOk("Account Name Already Exists", {
                title: "Name Validation",
                size: "sm",
                buttonSize: "sm",
                okVariant: "danger",
                headerClass: "p-2 border-bottom-0",
                footerClass: "p-2 border-top-0",
                centered: true
              })
              .then(value => {
                if (value) {
                  document.getElementById("brokerName").focus();
                }
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
    // getPostal() {
    //   let loader = this.$loading.show({
    //     loader: "bars",
    //     color: "green"
    //   });
    //   if (this.form.zipCode.length == 6 && !isNaN(this.form.zipCode)) {
    //     this.$http
    //       .get("/middleware/api/secured/get-postal/" + this.form.zipCode)
    //       .then(response => {
    //         this.postalItems = response.data;
    //         loader.hide();
    //         if (this.postalItems.length > 0) {
    //           this.$bvModal.show("modal-postal");
    //         }
    //       })
    //       .catch(function(error) {
    //         // handle error
    //         alert(error);
    //       })
    //       .finally(function() {
    //         // always executed
    //       });
    //   } else {
    //     loader.hide();
    //     this.$bvModal
    //       .msgBoxOk("Wrong Pin Code Entered", {
    //         title: "Pin Code Validation",
    //         size: "sm",
    //         buttonSize: "sm",
    //         okVariant: "danger",
    //         headerClass: "p-2 border-bottom-0",
    //         footerClass: "p-2 border-top-0",
    //         centered: true
    //       })
    //       .then(value => {
    //         if (value) {
    //           document.getElementById("zipCode").focus();
    //         }
    //       })
    //       .catch(err => {
    //         alert(err);
    //       });
    //   }
    // },
    // onPostalRowSelected(item) {
    //   this.$bvModal.hide("modal-postal");
    //   this.form.town = item.taluk;
    //   this.form.district = item.districtName;
    //   this.form.area = item.officeName;
    // },
    searchContact1Person() {
      this.contact1Person = true;
      this.contactPerson = this.form.contactPerson1;
      this.contact2Person = false;
      this.showContactModal();
    },
    searchContact2Person() {
      this.contact1Person = false;
      this.contactPerson = this.form.contactPerson2;
      this.contact2Person = true;
      this.showContactModal();
    },
    searchContactPerson() {
      let contactName = this.contactPerson.toUpperCase();
       contactName = contactName.replace(/\//g, '+');
      this.$http
        .get(
          "/middleware/api/secured/get-broker-Lst/" +
            encodeURIComponent(contactName.toUpperCase())+
            "/" +
            this.$store.state.selectedCompany.value
        )
        .then(response => {
          this.items = response.data;
        })
        .catch(function(error) {
          // handle error
          alert(error);
        })
        .finally(function() {
          // always executed
        });
    },
    showContactModal() {
      let loader = this.$loading.show({
        loader: "bars",
        color: "green"
      });
      let contactName = this.contactPerson.toUpperCase();
       contactName = contactName.replace(/\//g, '+');
      this.$http
        .get(
          "/middleware/api/secured/get-broker-Lst/" +
            encodeURIComponent(contactName.toUpperCase()) +
            "/" +
            this.$store.state.selectedCompany.value
        )
        .then(response => {
          this.items = response.data;
          loader.hide();
          this.$bvModal.show("modal-contactPerson");
        })
        .catch(function(error) {
          // handle error
          alert(error);
        })
        .finally(function() {
          // always executed
        });
    },
    onRowSelected(item) {
      this.$bvModal.hide("modal-contactPerson");

      if (this.contact1Person) {
        this.form.contactPerson1 = item.brokerName;
        if(this.form.contact1PersonId !== item.brokerNo){
            this.form.contact1Relation = null;
        }
        this.form.contact1PersonId = item.brokerNo;
        this.form.contact1Mobile = item.mobileNo;
      }
      if (this.contact2Person) {
        this.form.contactPerson2 = item.brokerName;
        if(this.form.contact2PersonId !== item.brokerNo){
            this.form.contact2PersonId = null;
        }
        this.form.contact2PersonId = item.brokerNo;
        this.form.contact2Mobile = item.mobileNo;
      }
    },
    getAccountCode() {
      this.$http
        .get(
          "/middleware/api/secured/broker-account-code" +
            "/" +
            this.$store.state.selectedCompany.value
        )
        .then(response => {
          this.form.brokerNo = response.data;
        })
        .catch(function(error) {
          // handle error
          alert(error);
        })
        .finally(function() {
          // always executed
        });
    },
    existingName() {
      this.$http
        .get(
          "/middleware/api/secured/existing-broker-check" +
            "/" +
            this.$store.state.selectedCompany.value
        )
        .then(response => {
          alert(response.data);
        })
        .catch(function(error) {
          // handle error
          alert(error);
        })
        .finally(function() {
          // always executed
        });
    },
    checkFormValidity() {
      const valid = this.$refs.form.checkValidity();
      this.nameState = valid;
      return valid;
    },
    createAccount() {
      if (!this.checkFormValidity()) {
        return;
      }
      let formData = new FormData();
      this.form.createdBy = this.$store.state.user.username;
      this.form.updatedBy = this.$store.state.user.username;
      console.log(JSON.stringify(this.form));
      formData.append("form", JSON.stringify(this.form));
      formData.append("file", this.custImage[0]);
      this.$bvModal
        .msgBoxConfirm("Please confirm that you want to Create New Account.", {
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
              .post("/middleware/api/secured/save-broker", formData)
              .then(() => {
                loader.hide();
                this.$bvModal
                  .msgBoxOk("Created Account", {
                    title: "Confirmation",
                    size: "sm",
                    buttonSize: "sm",
                    okVariant: "info",
                    headerClass: "p-2 border-bottom-0",
                    footerClass: "p-2 border-top-0",
                    centered: true
                  })
                  .then(value => {
                    if (value) this.$router.push("/account");
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
    }
  },
  mounted() {
    this.occupationOptions = this.$store.state.master.typeOfOccupation;
    this.contactRelationOptions = this.$store.state.master.typeOfRelation;
    this.form.companyCode = this.$store.state.selectedCompany.value;
    this.form.dow = moment().format("YYYY-MM-DD");
    this.getAccountCode();
  },
  computed: {
    dob() {
      return this.form.dob;
    }
  },
  watch: {
    dob() {
      var today = moment();
      var dob = moment(this.form.dob);
      var diff = today.diff(dob, "years");
      this.form.age = diff;
    }
  }
};
</script>

<style scoped>
.image-input {
  display: block;
  width: 200px;
  height: 200px;
  cursor: pointer;
  background-size: cover;
  background-position: center center;
}

.placeholder {
  background: #e0e0e0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #333;
  font-size: 18px;
  font-family: Helvetica;
}

.placeholder:hover {
  background: #e0e0e0;
  color: #333;
}
.image-position {
  max-height: 200px;
  padding: 0px;
  max-width: 200px;
  margin-right: 5px;
  margin-top: 6px;
}

.file-input {
  display: none;
}
.col-padding-margin-right {
  padding: 0px;
  margin-right: 6px;
  margin-top: 6px;
}
.card {
  background-color: azure;
}
</style>