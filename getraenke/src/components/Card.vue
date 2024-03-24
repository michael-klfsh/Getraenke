<template>
    <div class="card">
      <div class="profile-img-container">
        <div class="profile-img">
          {{ initials }}
        </div>
      </div>
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
      id: String,
    },

    computed: {
      name() {
        return this.vorname + ' ' + this.nachname
      },
      initials() {
        return this.vorname.charAt(0) + "" + this.nachname.charAt(0); 
      }
    },
  }
  </script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
  <style scoped>
    .card {
      width: 33%;
    }

    .card-body {
      display: flex;
      justify-content: center;
    }

    .profile-img-container {
      align-self: center;
      width: 75px;
      height: 75px;
      border-radius: 75px;
      background: #333;
    }
    .profile-img {
      width: 100%;
      text-align: center;
      color: white;
      font-size: 25px;
      line-height: 75px;
    }
  </style>
  