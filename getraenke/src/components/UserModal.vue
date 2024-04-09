<template>
    <div class="modal fade" id="userModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-scrollable">
            <div class="modal-content">
            <div class="modal-header">
                <h1 class="modal-title fs-5" id="userModalLabel">{{ username }}</h1>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <div id="drink-form">
                    <buy-drink v-for="drink in drinks" :key="drink._id"
                        :name="drink.name" :price="drink.price" :id="drink._id" :amount="amount[drink._id]" :reset="this.CountResetTrigger"/>
                </div>
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
            username: String,
            userid : String,
        },

        data() {
            return {
                drinks: [],
                amount: [],
                CountResetTrigger: false,
            }
        },

        methods: {
            buyDrinks() {
                let form = document.getElementById('drink-form')
                let drinks = form.getElementsByTagName('input')
                let userId = this.userid
                console.log('UserId: ' + userId)
                for(let i=0; i<drinks.length; i++) {
                    let data = {
                        getraenkeId: drinks[i].attributes['id'].value,
                        anzahl: drinks[i].value
                    }

                    fetch(`${process.env.VUE_APP_BASE_URL}/user/${userId}/getraenk`, {
                        method: "POST",
                        headers: {"Content-Type": "application/json"},
                        body: JSON.stringify(data)
                    }).then(res => {
                        console.log(res.status);
                    });
                }
            },

            fetchCurrentDrinks() {
                console.log("fetch drinks");
                fetch(`${process.env.VUE_APP_BASE_URL}/getraenke`)
                    .then((response) => response.json())
                    .then((json) => {
                        this.drinks = json;
                    })
                    .catch((error) => console.error(error));
            },

            fetchBoughtDrinks() {
                console.log("fetch bought drinks");
                this.amount = [];
                fetch(`${process.env.VUE_APP_BASE_URL}/user/${this.userid}/getraenk`)
                    .then((response) => response.json())
                    .then((json) => {
                        console.log(json);
                        this.CountResetTrigger = ! this.CountResetTrigger;
                        let group = Object.groupBy(json, ({ drinkId }) => drinkId);
                        for(const [key, value] of Object.entries(group)) {
                            this.amount[key] = value.reduce((n, {amount}) => n + parseInt(amount), 0);
                        }
                });
            }

        }
    }
  </script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
  <style scoped>
  </style>