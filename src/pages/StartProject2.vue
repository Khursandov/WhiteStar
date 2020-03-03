<template>
    <div>
      <transition name="slide-fade">
        <div v-if="show" class="card timer">
            <h2>{{this.$store.state.time2[2].hour}} : {{this.$store.state.time2[1].minut}} : {{this.$store.state.time2[0].second}}</h2>
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
        title: "" || localStorage.getItem('project2_title'),
        username: '' || localStorage.getItem('project2_username'),
        summa: 0,
        end: false,
        pause: 0 || localStorage.getItem('project2_pause')
      }
    };
  },
  created () {
    if (localStorage.getItem('project2') == 1) {
      console.log(this.userProject)
      this.show = true
      this.disable = true
      if (localStorage.getItem('project2_pause') !== '1') {
        this.toggle = true
      }
    }
  },
  methods: {
    finishProject ( ) {
      // define finished data
      var today = new Date();
      var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
      var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
      var dateTime = date+' '+time;

      this.calculating()
      const data = {
        'projectTitle': this.userProject.title,
        'end': dateTime,
        'duration': this.$store.state.time[1].minut + ':' + this.$store.state.time[2].hour,
        'summa': this.userProject.summa,
        'start': localStorage.getItem('project2_startTime')
      }
      this.show = false
      this.disable = false
      alert(this.userProject.summa + 'sum')
      this.$store.dispatch('createProject', data)
      localStorage.removeItem('project1')
      localStorage.removeItem('project1_title')
      localStorage.removeItem('project1_username')
      localStorage.removeItem('project1_startTime')
      localStorage.removeItem('project1_pause')
      this.userProject.time = ''
      this.userProject.title = ''
      this.userProject.username = ''
    },
    startTimer ( ) {
      localStorage.setItem('project2', 1)
      localStorage.setItem('project2_title', this.userProject.title)
      localStorage.setItem('project2_username', this.userProject.username)
      this.show = true
      this.disable = true
      // save started time
      var today = new Date();
      var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
      var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
      var dateTime = date+' '+time;
      localStorage.setItem('project2_startTime', dateTime)
      // 
      this.start = setInterval(() => {
        this.timer()
      }, 1000)
    },
    timer ( ) {
      this.$store.commit('setTime2')
    },
    pause ( ) {
      this.toggle = false
      localStorage.setItem('project2_pause', 1)
      this.userProject.pause = '1'
    },
    resume ( ) {
      this.toggle = true
      localStorage.setItem('project2_pause', 0)
      this.userProject.pause = '0'
    },
    calculating ( ) {
      this.userProject.summa = (this.$store.state.time2[1].minut/60 + this.$store.state.time2[2].hour) * this.$store.state.admin.perHour
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
