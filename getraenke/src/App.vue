<template>
    <h2>
      Getränkekühlschrank
    </h2>
    <div class="card-collection">
      <card-component 
      v-for="user in users" :vorname="user.name" :nachname="user.lastname" :id="user._id" :key="user._id" 
      v-bind:card-id="user._id" v-bind:user-name="user.name" data-bs-toggle="modal" data-bs-target="#userModal"
      class="user-card"
      @click="reset"
    />
    </div>
    <user-modal :data="userinfos" :reset="resetData" @resetted="resetted" ref="userModal"/>
    <add-user-modal/>
    <button type="button" id="add-user" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addUserModal">+</button>
</template>

<script>
import CardComponent from './components/Card.vue'
import UserModal from './components/UserModal.vue'
import AddUserModal from './components/AddUserModal.vue'

export default {
  name: 'App',
  components: {
    CardComponent,
    UserModal,
    AddUserModal
  },

  data() {
    return {
      users: [],
      resetData: false,
      userinfos: {id: "", name: ""}
    }
  },

  created() {
    fetch(`${process.env.VUE_APP_BASE_URL}/user`)
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        this.users = json;
      })
      .catch((error) => console.error(error));
  },

  methods: {
    reset(event) {
      this.resetData = true
      let parent = event.target.parentElement

      this.userinfos.id = parent.getAttribute('card-id');
      this.userinfos.name = parent.getAttribute('user-name');

      this.$refs["userModal"].fetchCurrentDrinks();
      this.$refs["userModal"].fetchBoughtDrinks();
    },
    resetted() {
      this.resetData = false
    }
  }
}
</script>

<style>
  #add-user {
    width: 50px;
    height: 50px;
    float: right;
    border-radius: 25px;
    font-weight: bold;
    font-size: 30px;
    line-height: 100%;
    position: absolute;
    bottom: 10px;
    right: 20px;
    padding-top: 0px;
  }

  .card-collection {
    display: flex;
    justify-content: center;
    flex-direction: row;
    flex-wrap: wrap;
  }

  .user-card {
    max-width: 260px;
  }

  .user-card:not(:last-child) {
    margin-right: 2px;
  }

  .user-card .card-text {
    text-align: center;
  }
</style>
