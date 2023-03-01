<template>
    <h2>
      Getränkekühlschrank
    </h2>
    <div class="card-collection">
      <card-component 
      v-for="user in users" :vorname="user.vorname" :nachname="user.nachname" :id="user.id" :key="user.id" 
      v-bind:card-id="user.id" data-bs-toggle="modal" data-bs-target="#userModal"
      @click="reset"
    />
    </div>
    <user-modal :reset="resetData" @resetted="resetted"/>
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
      users: [
        {id: 1, vorname: "Michael", nachname: "Kleefisch"},
        {id: 2, vorname: "Tim", nachname: "Kleefisch"},
        {id: 3, vorname: "Stefan", nachname: "Kleefisch"},
        {id: 4, vorname: "Sophie", nachname: "Kasper"},
      ],
      resetData: false
    }
  },

  mounted() {
    const exampleModal = document.getElementById('userModal')
    exampleModal.addEventListener('show.bs.modal', event => {
      // Button that triggered the modal
      const button = event.relatedTarget
      // Extract info from data-bs-* attributes
      const recipient = button.getAttribute('card-id')
      // If necessary, you could initiate an AJAX request here
      // and then do the updating in a callback.
      //
      // Update the modal's content.
      const modalTitle = exampleModal.querySelector('.modal-title')
      const modalBodyInput = exampleModal.querySelector('.modal-body input')

      modalTitle.textContent = `New message to ${recipient}`
      modalBodyInput.value = recipient
    })
  },

  methods: {
    reset() {
      this.resetData = true
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
  }

  .card-collection {
    display: flex;
    justify-content: center;
    flex-direction: row;
    flex-wrap: wrap;
  }
</style>
