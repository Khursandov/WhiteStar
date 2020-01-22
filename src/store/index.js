import Vue from 'vue'
import Vuex from 'vuex'
import router from '../router'
import * as firebase from "firebase";
import db from '../settings'
Vue.use(Vuex)


export default new Vuex.Store({
  state: {
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
      body:  'null'
    }
  },
  mutations: {
    setUser (state, payload) {
      this.state.user.id = payload.uid
      this.state.user.loggidIn = payload.status
      this.state.user.email = payload.email
    },
    setMessage (state, payload) {
      this.state.message.title = payload.title
      this.state.message.body = payload.body
    },
    setAdmin (state,payload) {
      this.state.admin = payload
    },
    setProjects (state, payload) {
      this.state.userProjects.push(payload)
    }
  },
  actions: {
    SignUp ( ) {
      firebase.auth().createUserWithEmailAndPassword('admin@admin.ru', 'password')
      .then ( data => {

        data.user.updateProfile({
          displayName: "admin@admin.ru"
        }).then (()=> {})

      }).catch(err => {
        console.log(err)
      })
    },
    signIn ({commit}, payload) {
      console.log(payload)
      firebase.auth().signInWithEmailAndPassword(payload.email, payload.password).then(data => {
        router.push('/')
      }).catch(err => {
        console.log(err)
      })
    },
    checkUser ({commit, dispatch, state}) {
      // db.collection('users').add(datas).then(res => {
      //   console.log(res)
      // })
      
      db.collection('admin').get().then(querySnapshot => {
        querySnapshot.forEach(doc => {
          const data = {
            'email': doc.data().email,
            'perHour': doc.data().perHour
          }
          commit('setAdmin', data)
        })
      })
      firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          // console.log(user.email)
          user.status = true;
          commit('setUser', user)
          state.userProjects = []
          // dispatch('getCurrentDayProjects')
        } else {
          if (router.currentRoute.path !== '/signIn') {
            router.push({path: 'signIn'});
          }
          // No user is signed in.
        }
      });
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
      console.log('-1-1-1-1-1', this.state.userProjects)
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
          console.log('0000',data)
          commit('setProjects', data)
          console.log('--0-0-0-0', this.state.userProjects)
        })
      }).catch( err => {
        console.log(err)
      })
    }
  },
  modules: {
  }
})
