<template>
  <b-card :style="{'background-color': (form.defaulter)?'red':'azure'}">
    <b-row>
      <b-col>
        <span class="my-card-heading">UPDATE ACCOUNT</span>
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
            <date-picker
                v-model="dateDob"
                :config="dobOptions"
                placeholder="DD/MM/YYYY"
              ></date-picker>
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
                <div v-if="!imageData" id="preview">
                  <b-img
                    v-if="!imageData"
                    :src="'http://localhost:8182/images/'
              +form.brokerNo+'.jpg'"
                    thumbnail
                    fluid
                    alt="Fluid image"
                  ></b-img>
                </div>
                <!-- <span v-if="!imageData" class="placeholder">Choose an Image</span> -->
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
          <label for="dow">Data Of Creation</label>
          <b-input-group>
            <b-form-input id="dow" disabled v-model="dow" type="text" placeholder="DD/MM/YYYY"></b-form-input>
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
          <b-form-group id="remarksLbl" label="Remarks" label-for="remarks" style="color: red;">
            <b-form-textarea id="remarks" v-model="form.remarks" rows="3" max-rows="6"></b-form-textarea>
          </b-form-group>
        </b-col>
      </b-row>
      <b-row bg-variant="light" style="position:sticky;bottom:0;padding-top:10px;">
        <b-col md style="text-align: center !important" v-if="!form.defaulter">
          <b-button
            variant="danger text-center"
            value="default"
            v-if="$store.getters.isAdmin"
            @click="makeDefaulter"
          >Make Defaulter</b-button>&nbsp;&nbsp;
          <b-button
            variant="primary text-center"
            @click="updateAccount"
            value="UpdateBooking"
          >Update & GoTo Booking</b-button>&nbsp;&nbsp;
          <b-button
            variant="primary text-center"
            @click="updateAccount"
            value="Update"
          >Update Account</b-button>&nbsp;&nbsp;
          <!-- <b-button
            variant="primary text-center"
            @click="print"
            value="Update"
          >Print</b-button>&nbsp;&nbsp; -->
          <b-button
            variant="secondary text-center"
            @click="$router.push({name: 'Account', params :{search: search}})"
            value="back"
          >Back To Search</b-button>
        </b-col>
        <b-col v-else md style="text-align: center !important">
          <b-button
            variant="success text-center"
            v-if="$store.getters.isAdmin"
            value="activate"
            @click="activateDefaulter"
          >Activate Account</b-button>&nbsp;&nbsp;
          <b-button
            variant="secondary text-center"
            @click="$router.push({name: 'Account', params :{search: search}})"
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
  </b-card>
</template>

<script>
import moment from "moment";
export default {
  data() {
    return {
      search: "",
      url: "",
      dateDob: null,
      dow: null,
      dobOptions: {
        format: "DD/MM/YYYY",
        useCurrent: false
      },
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
        district: null,
        area: null,
        zipCode: null,
        otherPhones1: null,
        otherPhones2: null,
        mobileNo: null,
        email: null,
        dob: null,
        dow: null,
        occupation: null,
        age: null,
        gender: null,
        remarks: null,
        ownrent: true,
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
    };
  },
  methods: {
      print(){
          window.print();
      },
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
    makeDefaulter() {
      let formData = new FormData();
      formData.append("brokerNo", this.form.brokerNo);
      formData.append("compCode", this.form.companyCode);
      formData.append("updatedBy", this.$store.state.user.username);
      formData.append("status", true);
      this.$bvModal
        .msgBoxConfirm(
          "Please confirm that you want to Make Defaulter Account.",
          {
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
          }
        )
        .then(value => {
          if (value) {
            let loader = this.$loading.show({
              loader: "dots",
              color: "red"
            });
            this.$http
              .post("/middleware/api/secured/update-broker-status", formData)
              .then(() => {
                loader.hide();
                this.$bvModal
                  .msgBoxOk("Defaulted Successfully", {
                    title: "Confirmation",
                    size: "sm",
                    buttonSize: "sm",
                    okVariant: "info",
                    headerClass: "p-2 border-bottom-0",
                    footerClass: "p-2 border-top-0",
                    centered: true
                  })
                  .then(value => {
                    if (value) {
                      this.getsSelectedAccount();
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
    activateDefaulter() {
      let formData = new FormData();
      formData.append("brokerNo", this.form.brokerNo);
      formData.append("compCode", this.form.companyCode);
      formData.append("updatedBy", this.$store.state.user.username);
      formData.append("status", false);
      this.$bvModal
        .msgBoxConfirm("Please confirm that you want to Activate Account.", {
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
              .post("/middleware/api/secured/update-broker-status", formData)
              .then(() => {
                loader.hide();
                this.$bvModal
                  .msgBoxOk("Activated Successfully", {
                    title: "Confirmation",
                    size: "sm",
                    buttonSize: "sm",
                    okVariant: "info",
                    headerClass: "p-2 border-bottom-0",
                    footerClass: "p-2 border-top-0",
                    centered: true
                  })
                  .then(value => {
                    if (value) {
                      this.getsSelectedAccount();
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
            encodeURIComponent(contactName.toUpperCase()) +
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
    checkFormValidity() {
      const valid = this.$refs.form.checkValidity();
      this.nameState = valid;
      return valid;
    },
    updateAccount() {
       let val  = event.srcElement.value;
      if (!this.checkFormValidity()) {
        return;
      }
      let formData = new FormData();
      this.form.updatedBy = this.$store.state.user.username;
     // console.log(JSON.stringify(this.form));
      formData.append("form", JSON.stringify(this.form));
      if(this.custImage !=null && this.custImage.length>0){
          formData.append("file", this.custImage[0]);
      }else{
          formData.append("file", null);
      }
      this.$bvModal
        .msgBoxConfirm("Please confirm that you want to Update Account.", {
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
              .post("/middleware/api/secured/update-broker", formData)
              .then(() => {
                loader.hide();
                this.$bvModal
                  .msgBoxOk("Updated Account", {
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
                        this.getsSelectedAccount();
                       }else if(val == "UpdateBooking"){
                         let brokerNo = this.form.brokerNo;
                          this.$router.push({name: "BookingsView", params :{brokerNo: brokerNo, search: this.accountSearch}})
                       }
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
    getsSelectedAccount() {
      let loader = this.$loading.show({
        loader: "bars",
        color: "green"
      });
      this.$http
        .get(
          "/middleware/api/secured/get-broker/" +
            this.form.brokerNo +
            "/" +
            this.$store.state.selectedCompany.value
        )
        .then(response => {
          loader.hide();
          if (response.data != null && response.data != "") {
            this.dateDob = this.converteMongoToDate(response.data.dob);
            this.dow = this.converteMongoToDate(response.data.dow);
            response.data.dow = moment(this.dow, "YYYY-MM-DD")
            response.data.createdDt = null;
            response.data.updatedDt = null;
            response.data.bookings = null;
            //             if(response.data.dob != null && response.data.dob !== "")response.data.dob = moment(response.data.dob).format("YYYY-MM-DD");
            // if(response.data.dow != null && response.data.dow !== "")response.data.dow = moment(response.data.dow).format("YYYY-MM-DD");
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
                if (value) this.$router.push("/account");
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
    converteMongoToDate(dateObject) {
      if (dateObject != null) {
        var newDate = moment.utc();
        newDate.set("year", dateObject.year);
        newDate.set("month", dateObject.month);
        newDate.set("date", dateObject.dayOfMonth);
        newDate.startOf("day");
        return newDate.format("DD/MM/YYYY");
      }
      return null;
    }
  },
  mounted() {
    this.occupationOptions = this.$store.state.master.typeOfOccupation;
    this.contactRelationOptions = this.$store.state.master.typeOfRelation;
    this.form.companyCode = this.$store.state.selectedCompany.value;
    this.getsSelectedAccount();
  },
  computed: {
    dob() {
      return this.form.dob;
    }
  },
  watch: {
    dateDob() {
      var today = moment();
      this.form.dob = moment(this.dateDob, 'DD/MM/YYYY');
      var diff = today.diff(this.form.dob, "years");
      this.form.age = diff;
    }
  },
  created() {
    this.form.brokerNo = this.$route.params.brokerNo;
    this.search = this.$route.params.search;
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