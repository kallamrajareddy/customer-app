<template>
  <b-card title="Account Creation or Updation">
    <b-row>
      <b-col>
        <form ref="form" @submit.stop.prevent>
          <b-row class="my-1">
            <b-col sm="2" style="    padding-top: 10px;">
              <label for="accountSearch">
                <strong>Account Search:</strong>
              </label>
            </b-col>
            <b-col sm="10" style="display: flex;padding-left: 0px;">
              <b-form-input
                id="accountSearch"
                style="text-transform: uppercase;margin-right:3px;"
                size="lg"
                v-model="accountSearch"
                placeholder="Acc Code (or) Name (or) Phone No (or) Address"
              ></b-form-input>
              <b-button
                @click="searchAccount"
                variant="primary"
                :disabled="!(accountSearch !== null && accountSearch.length>=3)"
              >
                <b-icon icon="search" aria-hidden="true"></b-icon>
                <span class="sr-only">Search</span>
              </b-button>
            </b-col>
          </b-row>
        </form>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <b-card>
          <b-card-title style="text-align: left;">Existing Accounts ({{items.length}})
               <b-button
               style="float:right;"
                variant="primary"
                :disabled="selected == ''"
              >
                <b-icon icon="pencil" aria-hidden="true"></b-icon>
                <span class="sr-only">pencil</span>Edit Account
              </b-button>
              
          </b-card-title>
          <b-table
            ref="selectableTable"
            id="accountSearchResult"
            selectable
            select-mode="single"
            :items="items"
            :fields="fields"
            @row-selected="onRowSelected"
            sticky-header="true"
            responsive
          >
            <!-- Example scoped slot for select state illustrative purposes -->
            <!-- <template v-slot:cell(selected)="{ rowSelected }">
              <template v-if="rowSelected">
                <span aria-hidden="true">&check;</span>
                <span class="sr-only">Selected</span>
              </template>
              <template v-else>
                <span aria-hidden="true">&nbsp;</span>
                <span class="sr-only">Not selected</span>
              </template>
            </template> -->
            <template v-slot:cell(image)="data">
              <div >
                <b-avatar class="align-baseline" @click="openImage(data.item.brokerNo)" :src="'http://localhost:8182/images/'
              +data.item.brokerNo+'.jpg'"></b-avatar>
              </div>
            </template>
            <template v-slot:cell(isActive)="data">
              <div >
                <span
                v-if="(data.item.bookings.find(booking => booking.closed !== true) != undefined)"
                  class="rounded-circle"
                  style="background-color: #73D500;display: inline-block;height: 20px;width: 20px;"
                ></span>
                <span v-else class="rounded-circle" style="background-color: #EB597B;display: inline-block;height: 20px;width: 20px;"></span>
              </div>
            </template>
          </b-table>
        </b-card>
      </b-col>
    </b-row>
    <b-modal id="modal-image" ref="imageModal" size="sm" hide-header hide-footer>
          <b-row>
              <b-col>
                  <b-img :src="'http://localhost:8182/images/'
              +showImg+'.jpg'"  thumbnail  fluid alt="Fluid image"></b-img>
              </b-col>
          </b-row>
          <b-row style="margin-top:5px">
            <b-col style="text-align: center !important">
              <b-button
                variant="danger text-center"
                @click="$bvModal.hide('modal-image')"
              >close</b-button>
            </b-col>
          </b-row>
    </b-modal>
  </b-card>
</template>

<script>
export default {
  data() {
    return {
      selected: "",
      showImg: "",
      accountSearch: null,
      fields: [
        // { key: "selected", label: "Selected", sortable: false },
        { key: "image", label: "Identity", sortable: false },
        { key: "isActive", label: "Is Active", sortable: false },
        { key: "brokerNo", label: "Acc No", sortable: true },
        { key: "brokerName", label: "Name", sortable: true },
        { key: "mobileNo", label: "Mobile No", sortable: true },
        { key: "addr1", label: "Father/Son", sortable: true },
        { key: "addr2", label: "Door No", sortable: true },
        { key: "addr3", label: "Street", sortable: true },
        { key: "town", label: "Town", sortable: true }
      ],
      items: []
    };
  },
  methods: {
    onRowSelected(item) {
      this.selected = item;
    },
    openImage(accCode){
        console.log(accCode)
        this.showImg = accCode;
        this.$bvModal.show("modal-image");
    },
    searchAccount() {
      this.$http
        .get(
          "/middleware/api/secured/get-broker-Lst/" +
            this.accountSearch.toUpperCase()+'/'+this.$store.state.selectedCompany.value
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
    }
  }
};
</script>

<style scoped>
</style>