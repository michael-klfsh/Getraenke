<template>
    <div class="modal fade" id="addUserModal" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog modal-dialog-scrollable">
            <div class="modal-content">
            <div class="modal-header">
                <h1 class="modal-title fs-5" id="addUserModalLabel">Neuer Nutzer</h1>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <div id="register-form">
                    <div class="form-group">
                        <label for="firstName">Vorname</label>
                        <input type="text" class="form-control" id="firstName" placeholder="Vorname">
                    </div>
                    <div class="form-group">
                        <label for="lastName">Nachname</label>
                        <input type="text" class="form-control" id="lastName" placeholder="Nachname">
                    </div>
                    <div class="form-group">
                        <label for="email">Email Adresse</label>
                        <input type="email" class="form-control" id="email" placeholder="E-Mail">
                    </div>
                    <div class="form-check">
                        <input class="form-check-input" type="checkbox" id="isFaho" @click="checkboxClick">
                        <label class="form-check-label" for="isFaho">
                            Ich wohne im FAHO
                        </label>
                        <input type="number" class="form-control" id="roomNo" placeholder="Zimmer-Nr" disabled>
                    </div>
                    <div class="form-check">
                        <input class="form-check-input" type="checkbox" id="hasSplitwise">
                        <label class="form-check-label" for="hasSplitwise">
                            Ich bin in der Splitwise Gruppe
                        </label>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Abbrechen</button>
                <button type="submit"  class="btn btn-primary" data-bs-dismiss="modal" @click="register">Registrieren</button>
            </div>
            </div>
        </div>
    </div>
  </template>
  
  <script>
    export default {
        name: 'ModalComponent',
        methods: {
            checkboxClick() {
                let checkbox = document.getElementById('isFaho')
                if(checkbox.checked) {
                    document.getElementById('roomNo').disabled = false
                }
                else {
                    document.getElementById('roomNo').disabled = true
                    document.getElementById('roomNo').value = ''
                }
            },

            register() {
                let data = {
                vorname: document.getElementById('firstName').value,
                nachname: document.getElementById('lastName').value,
                email: document.getElementById('email').value,
                isFAHO: document.getElementById('isFaho').checked,
                zimmerNr: document.getElementById('roomNo').value,
                splitwise: document.getElementById('hasSplitwise').checked,
                }
                console.log(data);

                fetch("http://localhost:8080/api/user", {
                    method: "POST",
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify(data)
                }).then(res => {
                    console.log(res.status);
                });
            }
        }
    }
  </script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
  <style scoped>
  </style>