<template>
    <div>
        <card class="card container my-5 p-5" title="Sign In">
          <div>
            <form @submit.prevent = "signIn">
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
                <!-- <div class="col-md-4">
                  <fg-input type="email"
                            label="Username"
                            placeholder="Email"
                            v-model="user.email">
                  </fg-input>
                </div> -->
              </div>

              <!-- <div class="row">
                <div class="col-md-6">
                  <fg-input type="text"
                      label="First Name"
                      :disabled="disable"
                      placeholder="First Name"
                      v-model="user.firstName">
                  </fg-input>
                </div>
                <div class="col-md-6">
                  <fg-input type="text"
                      label="Last Name"
                      :disabled="disable"
                      placeholder="Last Name"
                      v-model="user.lastName">
                  </fg-input>
                </div>
              </div> -->

              <!-- <div class="row">
                <div class="col-md-12">
                  <fg-input type="text"
                      label="Address"
                      :disabled="disable"
                      placeholder="Home Address"
                      v-model="user.address">
                  </fg-input>
                </div>
              </div> -->

              <!-- <div class="row">
                <div class="col-md-4">
                  <fg-input type="text"
                      label="City"
                      placeholder="City"
                      :disabled="disable"
                      v-model="user.city">
                  </fg-input>
                </div>
                <div class="col-md-4">
                  <fg-input type="text"
                      label="Country"
                      :disabled="disable"
                      placeholder="Country"
                      v-model="user.country">
                  </fg-input>
                </div>
                <div class="col-md-4">
                  <fg-input type="number"
                      :disabled="disable"
                      label="Postal Code"
                      placeholder="ZIP Code"
                      v-model="user.postalCode">
                  </fg-input>
                </div>
              </div> -->

              <!-- <div class="row">
                <div class="col-md-12">
                  <div class="form-group">
                    <label>About Me</label>
                    <textarea rows="5" class="form-control border-input"
                              placeholder="Here can be your description"
                              v-model="user.aboutMe">

                    </textarea>
                  </div>
                </div>
              </div> -->
              <div class="text-center">
                <p-button type="info"
                      round
                      @click.native.prevent="signIn"
                      >
                      Sign In
                </p-button>
              </div>
              <div class="clearfix"></div>
            </form>
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
          password: ''
          // aboutMe: `We must accept finite disappointment, but hold on to infinite hope.`
        }
    };
  },
  methods: {
      
    checkInput ( ) {
        if (this.user.email.length == 0 && this.user.email.length == 0) {
            this.$store.commit('setMessage', { title: 'Error', body: 'Invalid Input'})
        }
      },
    signIn() {
        const color = Math.floor(Math.random() * 4 + 1);
        this.$notify({
        component: NotificationTemplate,
        icon: "ti-help-alt",
        type: 'warning'
      });
        this.checkInput()
        const data = {
          'email': this.user.email,
          'password': this.user.password
        }
        this.$store.dispatch('signIn', data )
    }
  }
};
</script>
<style>
</style>
