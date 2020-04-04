<template>
  <div class="about">
    <h1>This is an about page</h1>
  </div>
</template>

<script>
export default {
mounted(){
  debugger;
  console.log(this.$http.defaults.headers.common);
  this.$http
        .get("/middleware/api/secured/broker-count")
        .then(response => {
          console.log(response.data);
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
</script>

