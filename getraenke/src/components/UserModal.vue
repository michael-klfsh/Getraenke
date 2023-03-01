<template>
    <div class="modal fade" id="userModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-scrollable">
            <div class="modal-content">
            <div class="modal-header">
                <h1 class="modal-title fs-5" id="userModalLabel">New message</h1>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <div id="drink-form">
                    <buy-drink name="Spezi" price="0,80" :reset="reset" @resetted="sendResetted"/>
                    <buy-drink name="Bier" price="0,70" :reset="reset" @resetted="sendResetted"/>
                </div>
                <!--<div>
                    <p>Spezi: Anzahl 8 Gesamt: 6,40€</p>
                    <p>Bier: Anzahl 10 Gesamt: 7,00€</p>
                    <p>Insgesamt: 13,40€</p>
                </div>-->
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Abbrechen</button>
                <button type="submit"  class="btn btn-primary" data-bs-dismiss="modal" @click="buyDrinks">Kaufen</button>
            </div>
            </div>
        </div>
    </div>
  </template>
  
  <script>
    import BuyDrink from "./BuyDrink.vue"

    export default {
        name: 'ModalComponent',
        components: {
            BuyDrink
        },
        props: {
            data: String,
            reset: Boolean
        },

        methods: {
            sendResetted() {
                this.$emit("resetted")
            },

            buyDrinks() {
                let form = document.getElementById('drink-form')
                let drinks = form.getElementsByTagName('input')
                for(let i=0; i<drinks.length; i++) {
                    let price = drinks[i].attributes['price'].value
                    let amount = drinks[i].value
                    console.log(amount + ' ' + price)
                }


            }
        }
    }
  </script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
  <style scoped>
  </style>