import Vue from 'vue'
import Vuex from 'vuex'
import router from '../router'
import * as firebase from "firebase";
import db from '../settings'
Vue.use(Vuex)


export default new Vuex.Store({
  state: {
    isLoading: false,
    user: {
      id: null,
      loggidIn: false,
      name: null,
      email: null
    },
    userProjects: [],
    admin: null,
    message: {
      title: 'errororor',
      body:  null
    },
    time: [
      { second: 0 },
      { minut: 0 },
      { hour: 0 }
    ],
    time2: [
      { second: 0 },
      { minut: 0 },
      { hour: 0 }
    ],
    time3: [
      { second: 0 },
      { minut: 0 },
      { hour: 0 }
    ],
    time4: [
      { second: 0 },
      { minut: 0 },
      { hour: 0 }
    ],
    isAdmin: false
  },
  mutations: {
    setUser (state, payload) {
      this.state.user.id = payload.uid
      this.state.user.loggidIn = payload.status
      this.state.user.email = payload.email
    },
    setMessage (state, payload) {
      this.state.message.body = payload
    },
    setAdmin (state,payload) {
      this.state.admin = payload
    },
    setProjects (state, payload) {
      this.state.userProjects.push(payload)
    },
    setTime (state) {
      if (localStorage.getItem('project1') == 1) {
        if(localStorage.getItem('project1_pause') !== '1') {
          this.state.time[0].second ++
          if (this.state.time[0].second == 60) {
            this.state.time[1].minut ++
            this.state.time[0].second = 0
            // Hour
          }
          if (this.state.time[1].minut == 60) {
            this.state.time[2].hour ++
            this.state.time[1].minut = 0
          }
        }
    } else {
      state.time[0].second = 0
      state.time[1].minut = 0
      state.time[2].hour = 0
    }
    },
    setTime2 (state) {
      if (localStorage.getItem('project2') == 1) {
        if(localStorage.getItem('project2_pause') !== '1') {
          this.state.time2[0].second ++
          if (this.state.time2[0].second == 60) {
            this.state.time2[1].minut ++
            this.state.time2[0].second = 0
            // Hour
          }
          if (this.state.time2[1].minut == 60) {
            this.state.time2[2].hour ++
            this.state.time2[1].minut = 0
          }
        }
    } else {
      state.time2[0].second = 0
      state.time2[1].minut = 0
      state.time2[2].hour = 0
    }
    },
    setTime3 (state) {
      if (localStorage.getItem('project3') == 1) {
        if(localStorage.getItem('project3_pause') !== '1') {
          this.state.time3[0].second ++
          if (this.state.time3[0].second == 60) {
            this.state.time3[1].minut ++
            this.state.time3[0].second = 0
            // Hour
          }
          if (this.state.time3[1].minut == 60) {
            this.state.time3[2].hour ++
            this.state.time3[1].minut = 0
          }
        }
    } else {
      state.time3[0].second = 0
      state.time3[1].minut = 0
      state.time3[2].hour = 0
    }
    },
    setTime4 (state) {
      if (localStorage.getItem('project4') == 1) {
        if(localStorage.getItem('project4_pause') !== '1') {
          this.state.time4[0].second ++
          if (this.state.time4[0].second == 60) {
            this.state.time4[1].minut ++
            this.state.time4[0].second = 0
            // Hour
          }
          if (this.state.time4[1].minut == 60) {
            this.state.time4[2].hour ++
            this.state.time4[1].minut = 0
          }
        }
    } else {
      state.time4[0].second = 0
      state.time4[1].minut = 0
      state.time4[2].hour = 0
    }
    },
    
    isAdmin (state, payload) {
      this.state.isAdmin = payload
    },
    setLoading (state, payload) {
      this.state.isLoading = payload
    }
  },
  actions: {
    signUp ({state, commit}, payload ) {
      firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
      .then ( data => {
        router.push('/')
      }).catch(err => {
        commit('setMessage',err.message)
        console.log(err)
      })
    },
    signIn ({commit, dispatch}, payload) {
      firebase.auth().signInWithEmailAndPassword(payload.email, payload.password).then(data => {
        router.push('/')
      }).catch(err => {
        console.log('SignIn', err.message)
        commit('setMessage',err.message)
      })
    },
    aa () {
      db.collection('admin').get().then(querySnapshot => {
        console.log('0000000')
        querySnapshot.forEach(doc => {
          const data = {
            'email': doc.data().email,
            'perHour': doc.data().perHour
          }
          this.commit('setAdmin', data)
          this.dispatch('checkUser')
          console.log(data)
        })
      }).catch(err => {
        console.log('checkUser', err)
      })
    },

    checkUser ({commit, dispatch, state}) {
      // const aa = await db.collection('admin').get().then(querySnapshot => {
      //   querySnapshot.forEach(doc => {
      //     const data = {
      //       'email': doc.data().email,
      //       'perHour': doc.data().perHour
      //     }
      //     commit('setAdmin', data)
      //     console.log(data)
      //   })
      // }).catch(err => {
      //   console.log('checkUser', err)
      // })
      firebase.auth().onAuthStateChanged(function (user) {
        console.log('111111')
        if (user) {
          commit('setUser', user);
          if (state.admin.email === user.email) {
            if (router.currentRoute.path !== '/adminTable') {
              router.push('/adminTable')
            }
            commit('isAdmin', true)
          }
          user.status = true;
          state.userProjects = [];
          // dispatch('getCurrentDayProjects')
        }
        else {
          if (router.currentRoute.path !== '/signIn') {
            if (router.currentRoute.path !== '/signUp') {
              router.push({ path: 'signIn' });
            }
          }
          // No user is signed in.
        }
      });
    },
    checkAdmin ({state, commit}, payload) {
      commit('setLoading', true)
      db.collection('admin').get().then( querySnapshot => { 
        querySnapshot.forEach(doc => {
          if (doc.data().email === payload) {
            if (router.currentRoute.path !== '/adminTable') {
              router.push('/adminTable')
            }
            commit('isAdmin', true)
            commit('setLoading', false)
          }
        })
      }).catch(err => {
        console.log('Checkadmin', err.message)
      })
    },
    createProject ({commit, state}, payload) {
      console.log(payload)
      payload.id = this.state.user.id
      db.collection('users').add(payload).then(res => {
      }).catch(err => {
        console.log(err)
      })
    },
    logOut ({commit}) {
      firebase.auth().signOut().then(() => {
        router.push('/signIn')
      })
    },
    getCurrentDayProjects ({commit, state}) {
      this.state.userProjects = []
      db.collection('users').where('id', '==', this.state.user.id).get().then(querySnapshot => {
        querySnapshot.forEach(doc => {
          console.log(doc.data())
          const data = {
            'project': doc.data().projectTitle,
            // 'duration': [...doc.data().time],
            'start': doc.data().start,
            'end': doc.data().end,
            'salary': doc.data().summa,
            'id': doc.data().id
          }
          commit('setProjects', data)
        })
      }).catch( err => {
        console.log(err)
      })
    },
    getAllProjects ({commit}) {
      db.collection('users').get().then(querySnapshot => {
        querySnapshot.forEach(doc => {
          const data = {
            'project': doc.data().projectTitle,
            'start': doc.data().start,
            'end': doc.data().end,
            'salary': doc.data().summa,
            'id': doc.data().id
          }
          commit('setProjects', data)
        })
      }).catch(err => {
        console.log(err)
      })
    }
  },
  modules: {
  }
})
