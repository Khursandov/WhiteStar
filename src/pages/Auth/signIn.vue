<template>
    <div>
        <card class="card container my-5 p-5">
          <div class="row justify-content-end">
            <div class="col-md-2">
              <button class="btn btn-dark white-text">
                <router-link to="/signUp"> 
                  Sign Up
                </router-link>
              </button>
            </div>
          </div>
          <div>
            <h4>Sign In</h4>
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
                
                  <fg-input type="text"
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
                      Sign In
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
        // message: ''
    };
  },
  computed: {
    message( payload ) {
      if (payload.length) {}
      if (this.$store.state.message.body !== null) {
        console.log('222', this.$store.state.message.body.length)
        return this.$store.state.message.body
      }
      return 0
    }
  },
  methods: {
      
    checkInput ( ) {
      console.log('check input')
      // if (this.user.email.length == 0 && this.user.email.length == 0) {
      //   this.message = 'Invalid input'
      //   return false
      // }
      return true
      },
    async signIn () {
        console.log('111111111111')
      let wait = await this.checkInput()
      if (wait) {
        const data = {
          'email': this.user.email,
          'password': this.user.password
        }
        this.$store.dispatch('signIn', data )
      }
    }
    
  }
};
</script>
<style>
a {
  text-decoration: none;
  color: white;
}
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
