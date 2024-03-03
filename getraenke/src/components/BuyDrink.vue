<template>
    <div class="mb-3 input-group">
        <label v-bind:for="id">{{ name }} (Preis: {{ price }}):<br>
            <div class="sub-title">gekauft: {{ amount }}</div>
        </label>
        <button id="down" class="btn btn-outline-secondary left" type="button" @click="decrement">-</button>
        <input type="number" :id="id" class="form-control" v-model="this.count" v-bind:price="price" readonly>
        <button id="up" class="btn btn-outline-secondary" type="button" @click="increment">+</button>
    </div>
  </template>
  
  <script>
  export default {
    name: 'BuyDrink',
    props: {
      name: String,
      price: Number,
      id: String,
      amount: Number,
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

    .sub-title {
        font-size: 10px;
        padding-left: 5px;
    }
  </style>