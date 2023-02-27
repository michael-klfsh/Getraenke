<template>
    <h2>
      Getränkekühlschrank
    </h2>

    <div class="row">
      <div class="col-md-4">
        <card-component name="Michael Kleefisch" data-bs-toggle="modal" data-bs-target="#userModal" data-bs-userId="1"/>
      </div>
      <div class="col-md-4">
        <card-component name="Tim Kleefisch" data-bs-toggle="modal" data-bs-target="#userModal" data-bs-userId="2"/>
      </div>
      <div class="col-md-4">
        <card-component name="Stefan Kleefisch" data-bs-toggle="modal" data-bs-target="#userModal" data-bs-userId="3"/>
      </div>
    </div>
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

  mounted() {
    const exampleModal = document.getElementById('userModal')
    exampleModal.addEventListener('show.bs.modal', event => {
      // Button that triggered the modal
      const button = event.relatedTarget
      // Extract info from data-bs-* attributes
      const recipient = button.getAttribute('data-bs-userId')
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
