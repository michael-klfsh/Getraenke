<template>
    <div class="card" style="width: 18rem;">
      <img src="../assets/logo.png" class="card-img-top">
      <div class="card-body">
        <p class="card-text">{{name}}</p>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'CardComponent',
    props: {
      vorname: String,
      nachname: String,
      id: Number,
    },

    computed: {
      name() {
        return this.vorname + ' ' + this.nachname
      }
    },
  }
  </script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
  <style scoped>
  </style>
  