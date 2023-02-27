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
      name: String
    }
  }
  </script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
  <style scoped>
  </style>
  