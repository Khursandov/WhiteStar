<template>
    <div>
        <card class="card text-center container my-5 p-5">
          <div class="row justify-content-end">
            <div class="col-md-2">
              <button class="btn btn-primary text-white">
                <router-link class="text-white" to="/signIn"> 
                  Sign In
                </router-link>
              </button>
            </div>
          </div>
          <div>
            <h4>Sign Up</h4>
            <div v-if="message" class="text-center message my-4">
              <p class="m-auto">{{ message }}</p>
            </div>
              <div class="row justify-content-center">
                <div class="col-md-5 pl-2">
                  <fg-input type="text"
                      label="E-mail"
                      placeholder="E-mail "
                      v-model="user.email">
                  </fg-input>
                </div>
                <div class="col-md-5 pl-2">
                
                  <fg-input type="password"
                      label="Password"
                      placeholder="Password"
                      v-model="user.password">
                  </fg-input>
                </div>
              </div>

              <div class="text-center">
                <button class="btn btn-primary" type="info"
                      @click="signIn"
                      >
                      Sign Up
                </button>
              </div>
              <div class="clearfix"></div>
          </div>
        </card>
    </div>
</template>
<script>
import NotificationTemplate from '../Notifications/NotificationTemplate';
export default {
  data() {
    return {
        user: {
          email: '',
          password: '',
          // aboutMe: `We must accept finite disappointment, but hold on to infinite hope.`
        },
        message: ''
    };
  },
  methods: {
      
    checkInput ( ) {
      if (this.user.email.length == 0 && this.user.email.length == 0) {
        this.message = 'Invalid input'
        return false
      }
      return true
      },
    async signIn () {
      let wait = await this.checkInput()
      if (wait) {
        const data = {
          'email': this.user.email,
          'password': this.user.password
        }
        this.$store.dispatch('signUp', data )
      }
    }
  }
};
</script>
<style>
.message {
  margin: auto;
  width: 80%;
  background: rgba(255, 0, 0, 0.4);
  border-radius: 10px;
  padding: 5px;
}
p{
  margin: auto;
  color: #fff;
  font-size: 20px;
}
</style>
