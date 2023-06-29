<template>
  <div class="global-container">
    <div class="flex justify-content-center p-fluid">
      <div v-focustrap class="card">
        <div class="field">
          <pv-input-text id="input" v-model="name" type="text" placeholder="Name" autofocus/>
        </div>
        <div class="field">
          <div class="p-input-icon-right">
            <i class="pi pi-envelope"/>
            <pv-input-text id="email" v-model="email" type="email" placeholder="Email"/>
          </div>
        </div>
        <div class="field">
          <div class="p-float-label">
            <pv-password v-model="password">
              <template #header>
                <h6>Pick a password</h6>
              </template>
              <template #footer>
                <pv-divider/>
                <p class="mt-2">Suggestions</p>
                <ul class="pl-2 ml-2 mt-0" style="line-height: 1.5">
                  <li>At least one lowercase</li>
                  <li>At least one uppercase</li>
                  <li>At least one numeric</li>
                  <li>Minimum 8 characters</li>
                </ul>
              </template>
            </pv-password>
            <label for="password">Password</label>
          </div>
        </div>
        <div class="field-checkbox">
          <pv-checkbox id="accept" v-model="accept" name="accept" value="Accept"/>
          <label for="accept">I agree to the terms and conditions*</label>
        </div>
        <pv-button type="submit" label="Submit" class="mt-2" @click="registerUser"/>
      </div>
    </div>
  </div>
</template>

<script>
import router from "../../router/index.js";
import {RegisterApiService} from "../services/register-api.service.js";

export default {
  name: "register-content",
  data() {
    return {
      usersService: null,
      user: null,

      name: null,
      email: null,
      password: null,
      accept: null
    };
  },
  created() {
    this.usersService = new RegisterApiService();
  },
  methods:{
    evaluateRegister(){
      let countErrors = 0;

      if(this.name === null) {
        countErrors += 1;
      }

      if(this.email === null) {
        countErrors += 1;
      }

      if(this.password === null) {
        countErrors += 1;
      }

      return countErrors !== 0;
    },
    async registerUser(){
      if (this.evaluateRegister()){
        console.log("Verificar que todos los campos estan rellenados");
      }
      else {

        var existingUser = await this.usersService.getByEmail(this.email);

        if (existingUser === undefined){
          this.user = {
            name: this.name,
            email: this.email,
            password: this.password,
          };

          await this.usersService.add(this.user)
              .then(response => {
                console.log("Usuario registrado con exito");
              })
              .catch(error => {
                console.error("Error al registrar el usuario:", error);
              });

          await router.push({name: 'login'})
        }
        else {
          console.log("Ya existe un usuario con este email.");
        }
      }
    }
  }
}
</script>

<style scoped>

</style>