<template>
  <div class="global-container">
    <div class="flex justify-content-center p-fluid">
      <div v-focustrap class="card">
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
        <pv-button type="submit" label="Submit" class="mt-2" @click="loginUser"/>
        <router-link to="/register">Sign up</router-link>
      </div>
    </div>
  </div>
</template>
<script>
import {LoginApiService} from "../services/login-api.service.js";
import router from "../../router/index.js";

export default {
  name: "login-content",
  data() {
    return {
      email: null,
      password: null,
      accept: null
    };
  },
  created() {
    this.usersService = new LoginApiService();
  },
  methods:{
    evaluateLogin(){
      let countErrors = 0;

      if(this.email === null) {
        countErrors += 1;
      }

      if(this.password === null) {
        countErrors += 1;
      }

      return countErrors !== 0;
    },
    async loginUser(){
      if (this.evaluateLogin()){
        console.log("Verificar que todos los campos estan rellenados");
      }
      else {

        var existingUser = await this.usersService.getByEmail(this.email);

        if (existingUser === undefined){
          console.log("No está registrado este usuario.");
        }
        else {
          if (existingUser.password === this.password){
            var userIdGotten = existingUser.id;
            await router.push({name: 'loan', params: {userId: userIdGotten}});
          }
          else {
            console.log("La contraseña es incorrecta.");
          }
        }
      }
    }
  }
}
</script>
<style scoped>

</style>