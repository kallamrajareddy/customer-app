<template>
  <b-card>
    <b-row>
      <b-col>
        <form ref="form" @submit.stop.prevent>
          <b-row>
            <b-col></b-col>
            <b-col>
              <b-form-group label="Select the Master Type to Modify" label-for="master">
                <b-form-select
                  required
                  id="master"
                  v-model="selectedMaster"
                  :options="masterOptions"
                  class="mb-3"
                  @change="makeEmpty"
                >
                  <!-- This slot appears above the options from 'options' prop -->
                  <template v-slot:first>
                    <b-form-select-option
                      :value="null"
                      selected="selected"
                      disabled
                    >-- Please select a Master Type --</b-form-select-option>
                  </template>
                </b-form-select>
              </b-form-group>
            </b-col>
            <b-col></b-col>
          </b-row>
          <b-row>
            <b-col v-if="selectedMaster === 'typeOfItems'">
              <b-card title="Create or Update Items">
                <b-row style="margin-bottom:5px;">
                  <b-col>
                    <b-form-input
                      style="text-transform: uppercase;"
                      id="items"
                      v-model="item"
                      required
                      placeholder="Enter Item"
                      inline
                    ></b-form-input>
                  </b-col>
                  <b-col style="text-align: start;">
                    <b-button
                      variant="primary text-center"
                      @click="addNewItems"
                      :disabled="valExisItems"
                    >Add Item</b-button>
                    <b-button
                      variant="danger text-center"
                      style="margin-left:3px;"
                      @click="deleteItems"
                      :disabled="!valExisItems || this.item==''"
                    >Delete Item</b-button>
                  </b-col>
                </b-row>
                <b-row>
                  <b-col v-for="(item,idx) in masterData.typeOfItems" :key="item">
                    <b-card
                      :id="idx"
                      @click="clickDeleteItems(item, idx)"
                      style="cursor: pointer; background-color: azure; width:200px;text-align:left"
                    >
                      <span style="white-space: nowrap; text-align:left">
                        <strong>{{item}}</strong>
                      </span>
                    </b-card>
                  </b-col>
                </b-row>
              </b-card>
            </b-col>
            <b-col v-else-if="selectedMaster === 'typeOfRelation'">
              <b-card title="Create or Update Relations">
                <b-row style="margin-bottom:5px;">
                  <b-col>
                    <b-form-input
                      style="text-transform: uppercase;"
                      id="relation"
                      v-model="relation"
                      required
                      placeholder="Enter Relation"
                      inline
                    ></b-form-input>
                  </b-col>
                  <b-col style="text-align: start;">
                    <b-button
                      variant="primary text-center"
                      @click="addNewRelation"
                      :disabled="valExisRelation"
                    >Add Relation</b-button>
                    <b-button
                      variant="danger text-center"
                      style="margin-left:3px;"
                      @click="deleteRelation"
                      :disabled="!valExisRelation || relation==''"
                    >Delete Relation</b-button>
                  </b-col>
                </b-row>
                <b-row>
                  <b-col v-for="(item,idx) in masterData.typeOfRelation" :key="item">
                    <b-card
                      :id="idx"
                      @click="clickDeleteRelation(item, idx)"
                     style="cursor: pointer; background-color: azure; width:200px;text-align:left"
                    >
                      <span style="white-space: nowrap; text-align:left">
                        <strong>{{item}}</strong>
                      </span>
                    </b-card>
                  </b-col>
                </b-row>
              </b-card>
            </b-col>
            <b-col v-else-if="selectedMaster === 'typeOfMeasurment'">
              <b-card title="Create or Update Measurment Type">
                <b-row style="margin-bottom:5px;">
                  <b-col>
                    <b-form-input
                      style="text-transform: uppercase;"
                      id="measurment"
                      v-model="measurment"
                      required
                      placeholder="Enter Measurment Type"
                      inline
                    ></b-form-input>
                  </b-col>
                  <b-col style="text-align: start;">
                    <b-button
                      variant="primary text-center"
                      @click="addNewMeasurment"
                      :disabled="valExisMeasurment"
                    >Add Measurment</b-button>
                    <b-button
                      variant="danger text-center"
                      style="margin-left:3px;"
                      @click="deleteMeasurment"
                      :disabled="!valExisMeasurment || measurment==''"
                    >Delete Measurment</b-button>
                  </b-col>
                </b-row>
                <b-row>
                  <b-col v-for="(item,idx) in masterData.typeOfMeasurment" :key="item">
                    <b-card
                      :id="idx"
                      @click="clickDeleteMeasurment(item, idx)"
                      style="cursor: pointer; background-color: azure; width:200px;text-align:left"
                    >
                      <span style="white-space: nowrap; text-align:left">
                        <strong>{{item}}</strong>
                      </span>
                    </b-card>
                  </b-col>
                </b-row>
              </b-card>
            </b-col>
            <b-col v-else-if="selectedMaster === 'typeOfIntrest'">
              <b-card title="Create or Update Intrest Type">
                <b-row style="margin-bottom:5px;">
                  <b-col>
                    <b-form-input
                      style="text-transform: uppercase;"
                      id="intrest"
                      v-model="intrest"
                      required
                      placeholder="Enter Intrest Type"
                      inline
                    ></b-form-input>
                  </b-col>
                  <b-col style="text-align: start;">
                    <b-button
                      variant="primary text-center"
                      @click="addNewIntrest"
                      :disabled="valExisIntrest"
                    >Add Intrest</b-button>
                    <b-button
                      variant="danger text-center"
                      style="margin-left:3px;"
                      @click="deleteIntrest"
                      :disabled="!valExisIntrest || intrest==''"
                    >Delete Intrest</b-button>
                  </b-col>
                </b-row>
                <b-row>
                  <b-col v-for="(item,idx) in masterData.typeOfIntrest" :key="item">
                    <b-card
                      :id="idx"
                      @click="clickDeleteIntrest(item, idx)"
                      style="cursor: pointer; background-color: azure; width:200px;text-align:left"
                    >
                      <span style="white-space: nowrap; text-align:left">
                        <strong>{{item}}</strong>
                      </span>
                    </b-card>
                  </b-col>
                </b-row>
              </b-card>
            </b-col>
            <b-col v-else>
              <span style="color:red;">
                <strong>--Select a Master to Modify--</strong>
              </span>
            </b-col>
          </b-row>
          <b-row
            bg-variant="light"
            style="background-color: white;position:sticky;bottom:0;padding-top:10px;"
          >
            <b-col style="text-align: center !important">
              <b-button
                variant="primary text-center"
                @click="updateMaster"
                v-if="selectedMaster !== null"
                value="update"
              >Update Master</b-button>&nbsp;&nbsp;
              <b-button
                variant="danger text-center"
                @click="$router.push('/')"
                value="Cancel"
              >Cancel</b-button>
            </b-col>
          </b-row>
        </form>
      </b-col>
    </b-row>
  </b-card>
</template>

<script>
export default {
  data() {
    return {
      masterData: null,
      selectedMaster: null,
      relation: "",
      measurment: "",
      intrest: "",
      item: "",
      disabledFlg: true,
      masterOptions: [
        { value: "typeOfItems", text: "Item Master" },
        { value: "typeOfRelation", text: "Relation Master" },
        { value: "typeOfMeasurment", text: "Measurments Master" },
        { value: "typeOfIntrest", text: "Intrest Type Master" }
      ]
    };
  },
  mounted() {
    this.masterData = this.$store.state.master;
  },
  methods: {
    makeEmpty() {
      this.relation = "";
      this.measurment = "";
      this.intrest = "";
      this.item = "";
    },
    updateMaster() {
      this.$bvModal
        .msgBoxConfirm("Please confirm that you want to Update Master Data.", {
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
            this.masterData.typeOfItems.sort();
            this.masterData.typeOfIntrest.sort();
            this.masterData.typeOfMeasurment.sort();
            this.masterData.typeOfRelation.sort();
            this.$store
              .dispatch("updateMaster", this.masterData)
              .then(() => {
                this.$bvModal
                  .msgBoxOk("Updated Master Data", {
                    title: "Confirmation",
                    size: "sm",
                    buttonSize: "sm",
                    okVariant: "info",
                    headerClass: "p-2 border-bottom-0",
                    footerClass: "p-2 border-top-0",
                    centered: true
                  })
                  .then(value => {
                    if(value)this.$router.push("/options");
                  })
                  .catch(err => {
                    alert(err);
                  });
              })
              .catch(err => alert(err));
          }
        })
        .catch(err => {
          alert(err);
        });
    },
    addNewItems() {
      this.masterData.typeOfItems.unshift(this.item.trim().toUpperCase());
      this.item = "";
    },
    deleteItems() {
      this.masterData.typeOfItems = this.masterData.typeOfItems.filter(
        item => item !== this.item.trim().toUpperCase()
      );
      this.item = "";
    },
    clickDeleteItems(val, idx) {
      document.getElementById(idx).style.backgroundColor = "#dc3545";
      document.getElementById(idx).style.color = "#fff";
      for (let i = 0; i < this.masterData.typeOfItems.length; i++) {
        if (i != idx) {
          document.getElementById(i).style.backgroundColor = "azure";
          document.getElementById(i).style.color = "black";
        }
      }
      this.item = val.toLowerCase();
    },
    addNewIntrest() {
      this.masterData.typeOfIntrest.unshift(this.intrest.trim().toUpperCase());
      this.intrest = "";
    },
    deleteIntrest() {
      this.masterData.typeOfIntrest = this.masterData.typeOfIntrest.filter(
        item => item !== this.intrest.trim().toUpperCase()
      );
      this.intrest = "";
    },
    clickDeleteIntrest(val, idx) {
      document.getElementById(idx).style.backgroundColor = "#dc3545";
      document.getElementById(idx).style.color = "#fff";
      for (let i = 0; i < this.masterData.typeOfIntrest.length; i++) {
        if (i != idx) {
          document.getElementById(i).style.backgroundColor = "azure";
          document.getElementById(i).style.color = "black";
        }
      }
      this.intrest = val.toLowerCase();
    },
    addNewMeasurment() {
      this.masterData.typeOfMeasurment.unshift(
        this.measurment.trim().toUpperCase()
      );
      this.measurment = "";
    },
    deleteMeasurment() {
      this.masterData.typeOfMeasurment = this.masterData.typeOfMeasurment.filter(
        item => item !== this.measurment.trim().toUpperCase()
      );
      this.measurment = "";
    },
    clickDeleteMeasurment(val, idx) {
      document.getElementById(idx).style.backgroundColor = "#dc3545";
      document.getElementById(idx).style.color = "#fff";
      for (let i = 0; i < this.masterData.typeOfMeasurment.length; i++) {
        if (i != idx) {
          document.getElementById(i).style.backgroundColor = "azure";
          document.getElementById(i).style.color = "black";
        }
      }
      this.measurment = val.toLowerCase();
    },
    addNewRelation() {
      this.masterData.typeOfRelation.unshift(
        this.relation.trim().toUpperCase()
      );
      this.relation = "";
    },
    deleteRelation() {
      this.masterData.typeOfRelation = this.masterData.typeOfRelation.filter(
        item => item !== this.relation.trim().toUpperCase()
      );
      this.relation = "";
    },
    clickDeleteRelation(val, idx) {
      document.getElementById(idx).style.backgroundColor = "#dc3545";
      document.getElementById(idx).style.color = "#fff";
      for (let i = 0; i < this.masterData.typeOfRelation.length; i++) {
        if (i != idx) {
          document.getElementById(i).style.backgroundColor = "azure";
          document.getElementById(i).style.color = "black";
        }
      }
      this.relation = val.toLowerCase();
    }
  },
  computed: {
    valExisItems() {
      if (this.item !== "") {
        if (
          this.masterData.typeOfItems.find(
            val => val.toLowerCase() === this.item.trim()
          ) !== undefined
        ) {
          return true;
        }
        return false;
      }
      return true;
    },
    valExisIntrest() {
      if (this.intrest !== "") {
        if (
          this.masterData.typeOfIntrest.find(
            val => val.toLowerCase() === this.intrest.trim()
          ) !== undefined
        ) {
          return true;
        }
        return false;
      }
      return true;
    },
    valExisMeasurment() {
      if (this.measurment !== "") {
        if (
          this.masterData.typeOfMeasurment.find(
            val => val.toLowerCase() === this.measurment.trim()
          ) !== undefined
        ) {
          return true;
        }
        return false;
      }
      return true;
    },
    valExisRelation() {
      if (this.relation !== "") {
        if (
          this.masterData.typeOfRelation.find(
            val => val.toLowerCase() === this.relation.trim()
          ) !== undefined
        ) {
          return true;
        }
        return false;
      }
      return true;
    }
  }
};
</script>

<style>
</style>