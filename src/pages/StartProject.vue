<template>
    <div>
      <transition name="slide-fade">
        <div v-if="show" class="card timer">
            <h2>{{userProject.time[2].hour}} : {{userProject.time[1].minut}} : {{userProject.time[0].second}}</h2>
            <div>
                <button class="btn m-2" :disabled="!toggle" @click="pause">
                    <i class="ti-control-pause"></i>
                </button>
                <button class="btn m-2" :disabled="toggle" @click="resume">
                    <i class="ti-control-play"></i>
                </button>
            </div>
            <div class="text-center">
              <p-button type="info"
                round
                @click.native.prevent="finishProject"
                >
                Finish Project
              </p-button>
            </div>
        </div>
      </transition>
        <card class="card" title="Start project">
          <div>
            <form @submit.prevent>
              <div class="row">
                <div class="col-md-5">
                  <fg-input type="text"
                      label="Project Name"
                      :disabled="disable"
                      placeholder="Project "
                      v-model="userProject.title">
                  </fg-input>
                </div>
                <div class="col-md-3">
                
                  <fg-input type="text"
                      label="Username"
                      :disabled="disable"
                      placeholder="Username"
                      v-model="userProject.username">
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
              <div class="text-center">
                <p-button type="info"
                      round
                      :disabled="disable"
                      @click.native.prevent="startTimer"
                      >
                      Start Project
                </p-button>
              </div>
              <div class="clearfix"></div>
            </form>
          </div>
        </card>
    </div>
</template>
<script>
export default {
  data() {
    return {
      show: false,
      toggle: true,
      disable: false,
      userProject: {
        title: "",
        username: "@Sarvar",
        time: [
          { second: 0 },
          { minut: 30 },
          { hour: 2 }
        ],
        summa: 0,
        start: null,
        end: false,
        pause: false
      }
    };
  },
  methods: {
    finishProject ( ) {
      // define finished data
      var today = new Date();
      var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
      var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
      var dateTime = date+' '+time;

      this.calculating()
      this.userProject.pause = true
      const data = {
        'projectTitle': this.userProject.title,
        'time': [...this.userProject.time],
        'end': dateTime,
        'summa': this.userProject.summa,
        'start': this.userProject.start
      }
      this.$store.dispatch('createProject', data)
    },
    startTimer ( ) {
      this.show = true
      this.disable = true
      // save started time
      var today = new Date();
      var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
      var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
      var dateTime = date+' '+time;
      this.userProject.start = dateTime
      // 
      this.start = setInterval(() => this.timer(), 1000)
    },
    timer ( ) {
      if (!this.userProject.pause) {
        this.userProject.time[0].second ++
        // Minut
        if (this.userProject.time[0].second == 60) {
          this.userProject.time[1].minut ++
          this.userProject.time[0].second = 0
          // Hour
        }
        if (this.userProject.time[1].minut == 60) {
          this.userProject.time[2].hour ++
          this.userProject.time[1].minut = 0
        }
      }
    },
    pause ( ) {
      this.toggle = false
      this.userProject.pause = true
    },
    resume ( ) {
      this.toggle = true
      this.userProject.pause = false
    },
    calculating ( ) {
      this.userProject.summa = (this.userProject.time[1].minut/60 + this.userProject.time[2].hour) * this.$store.state.admin.perHour
    }
  }
};
</script>
<style>
.timer {
    text-align: center;
}
.slide-fade-enter-active {
  transition: all .3s ease;
}
.slide-fade-leave-active {
  transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}
</style>
