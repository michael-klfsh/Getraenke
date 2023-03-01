<template>
    <div class="mb-3 input-group">
        <label for="1">{{ name }} (Preis: {{ price }}): </label>
        <button id="down" class="btn btn-outline-secondary left" type="button" @click="decrement">-</button>
        <input type="number" id="1" class="form-control" v-model="this.count" v-bind:price="price" readonly>
        <button id="up" class="btn btn-outline-secondary" type="button" @click="increment">+</button>
    </div>
  </template>
  
  <script>
  export default {
    name: 'BuyDrink',
    props: {
      name: String,
      price: Number,
      reset: Boolean
    },

    data() {
        return {
            count: 0
        }
    },

    methods: {
        increment() {
            if(this.count < 10) {
                this.count++
            }
            else {
                this.count = 10
            }
        },
        decrement() {
            if(this.count > 0) {
                this.count--
            }
            else {
                this.count = 0
            }
        }
    },

    watch: {
        reset: function() {
            if(this.reset)
            {
                this.count = 0
                this.$emit("resetted")
            }
        }
    }
  }

  </script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
  <style scoped>
    label {
        width: 70%;
    }
    .left {
        border-top-left-radius: 6px !important;
        border-bottom-left-radius: 6px !important;
    }
  </style>