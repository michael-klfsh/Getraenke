<template>
    <h2>
      Getränkekühlschrank
    </h2>
    <card-component 
      v-for="user in users" :vorname="user.vorname" :nachname="user.nachname" :id="user.id" :key="user.id" 
      v-bind:card-id="user.id" data-bs-toggle="modal" data-bs-target="#userModal"
    />
    <user-modal />
    <button type="button" class="btn btn-primary">+</button>
</template>

<script>
import CardComponent from './components/Card.vue'
import UserModal from './components/UserModal.vue'

export default {
  name: 'App',
  components: {
    CardComponent,
    UserModal
  },

  data() {
    return {
      users: [
        {id: 1, vorname: "Michael", nachname: "Kleefisch"},
        {id: 2, vorname: "Tim", nachname: "Kleefisch"},
        {id: 3, vorname: "Stefan", nachname: "Kleefisch"},
      ]
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
}
</script>

<style>
</style>
