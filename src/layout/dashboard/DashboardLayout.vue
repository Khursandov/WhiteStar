<template>
  <div class="wrapper">
    <side-bar>  
      <template slot="links">
        <sidebar-link v-if="!this.$store.state.isLoading" v-show="!this.$store.state.isAdmin" to="/table-list" name="Table List" icon="ti-view-list-alt"/>
        <sidebar-link v-if="!this.$store.state.isLoading" v-show="!this.$store.state.isAdmin" to="/start-project" name="Start Project 1" icon="ti-plus"/>
        <sidebar-link v-if="!this.$store.state.isLoading" v-show="!this.$store.state.isAdmin" to="/start-project/two" name="Start Project 2" icon="ti-plus"/>
        <sidebar-link v-if="!this.$store.state.isLoading" v-show="!this.$store.state.isAdmin" to="/start-project/three" name="Start Project 3" icon="ti-plus"/>
        <sidebar-link v-if="!this.$store.state.isLoading" v-show="!this.$store.state.isAdmin" to="/start-project/four" name="Start Project 4" icon="ti-plus"/>
        <sidebar-link v-if="this.$store.state.isAdmin && !this.$store.state.isLoading" to="/adminTable" name="Admin Table" icon="ti-bell"/>
      </template>
      <mobile-menu>
        <li class="divider"></li>
      </mobile-menu>
    </side-bar>
    <div class="main-panel">
      <top-navbar></top-navbar>

      <dashboard-content @click.native="toggleSidebar">

      </dashboard-content>

      <content-footer></content-footer>
    </div>
  </div>
</template>
<style lang="scss">
</style>
<script>
import TopNavbar from "./TopNavbar.vue";
import ContentFooter from "./ContentFooter.vue";
import DashboardContent from "./Content.vue";
import MobileMenu from "./MobileMenu";
export default {
  components: {
    TopNavbar,
    ContentFooter,
    DashboardContent,
    MobileMenu
  },
  data() {
    return {
      isAdmin: null
    }
  },
  beforeCreate () {
    // console.log('123123123',this.$store.state.isAdmin)
    this.isAdmin = this.$store.state.isAdmin
  },
  created () {
    this.isAdmin = this.$store.state.isAdmin
  },
  methods: {
    toggleSidebar() {
      if (this.$sidebar.showSidebar) {
        this.$sidebar.displaySidebar(false);
      }
    }
  }
};
</script>
