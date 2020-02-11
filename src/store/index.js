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
    admin: [],
    message: {
      title: 'errororor',
      body:  null
    },
    time: [
      { second: 0 },
      { minut: 30 },
      { hour: 2 }
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
      console.log(payload)
      firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
      .then ( data => {
        console.log(data)
        router.push('/')
      }).catch(err => {
        commit('setMessage',err.message)
        console.log(err)
      })
    },
    signIn ({commit, dispatch}, payload) {
      console.log(payload)
      firebase.auth().signInWithEmailAndPassword(payload.email, payload.password).then(data => {
        router.push('/')
      }).catch(err => {
        console.log('SignIn', err.message)
        commit('setMessage',err.message)
      })
    },
    async checkUser ({commit, dispatch, state}) {
      console.log('true')
      commit('setLoading', true)
      db.collection('admin').get().then(querySnapshot => {
        querySnapshot.forEach(doc => {
          const data = {
            'email': doc.data().email,
            'perHour': doc.data().perHour
          }
          commit('setAdmin', data)
        })
      }).catch(err => {
        console.log('checkUser', err)
      })
      await firebase.auth().onAuthStateChanged(function (user) {
        console.log('qqqqqqqqqqqqq')
        if (user) {
          dispatch('checkAdmin', user.email);
          user.status = true;
          commit('setUser', user);
          state.userProjects = [];
          console.log('false')
          commit('setLoading', false)
          // dispatch('getCurrentDayProjects')
        }
        else {
          console.log('false')
          commit('setLoading', false)
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
      console.log('true')
      commit('setLoading', true)
      db.collection('admin').get().then( querySnapshot => { 
        querySnapshot.forEach(doc => {
          if (doc.data().email === payload) {
            if (router.currentRoute.path !== '/adminTable') {
              router.push('/adminTable')
            }
            commit('isAdmin', true)
            console.log('false')
            commit('setLoading', false)
          }
        })
      }).catch(err => {
        console.log('Checkadmin', err.message)
      })
    },
    createProject ({commit, state}, payload) {

      payload.id = this.state.user.id
      console.log('ppaaayload',payload)
      db.collection('users').add(payload).then(res => {
        console.log(res)
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
      // console.log('-1-1-1-1-1', this.state.userProjects)
      db.collection('users').where('id', '==', this.state.user.id).get().then(querySnapshot => {
        querySnapshot.forEach(doc => {
          const data = {
            'project': doc.data().projectTitle,
            'duration': [...doc.data().time],
            'start': doc.data().start,
            'end': doc.data().end,
            'salary': doc.data().summa,
            'id': doc.data().id
          }
          // console.log('0000',data)
          commit('setProjects', data)
          // console.log('--0-0-0-0', this.state.userProjects)
        })
      }).catch( err => {
        console.log(err)
      })
    },
    getAllProjects ({commit}, payload) {
      db.collection('users').get().then(querySnapshot => {
        querySnapshot.forEach(doc => {
          const data = {
            'project': doc.data().projectTitle,
            'duration': [...doc.data().time],
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
