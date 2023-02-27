<template>
    <button 
    class="btn btn-primary" 
    data-bs-target="#collapseTarget" 
    data-bs-toggle="collapse">
      Bootstrap collapse
    </button>

    <div class="row">
      <div class="col-md-4">
        <card-component name="Michael Kleefisch"/>
      </div>
      <div class="col-md-4">
        <card-component name="Tim Kleefisch"/>
      </div>
      <div class="col-md-4">
        <card-component name="Stefan Kleefisch"/>
      </div>
    </div>
</template>

<script>
import CardComponent from './components/Card.vue'

export default {
  name: 'App',
  components: {
    CardComponent
  }
}
</script>

<style>
</style>
