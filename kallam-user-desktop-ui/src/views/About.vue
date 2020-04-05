<template>
<b-card>
  <div class="about">
    <multiselect v-model="value" :options="options"  :multiple="true" :taggable="true">
      <!-- <template slot="option" slot-scope="props">
      <div class="option__desc"><span class="option__title">{{ props.option.name }}</span></div>
    </template> -->
    </multiselect>
    <span>{{value}}</span>
  </div>
  </b-card>
  
</template>

<script>
import Multiselect from 'vue-multiselect'

  // register globally
  //Vue.component('multiselect', Multiselect)

export default {
  components: { Multiselect },
    data () {
      return {
        value: ['of'],
        options: ['list', 'of', 'options']
      }
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
        
}
}
</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>

