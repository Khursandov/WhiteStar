<template>
  <div class="wrapper">
      {{this.$store.state.isAdmin}}
    <side-bar>  
      <template slot="links">
        <sidebar-link v-if="!this.$store.state.isLoading" to="/table-list" name="Table List" icon="ti-view-list-alt"/>
        <sidebar-link v-if="!this.$store.state.isLoading" to="/stats" name="User Profile" icon="ti-user"/>
        <!-- <sidebar-link to="/table-list" name="Table List" icon="ti-view-list-alt"/> -->
        <!-- <sidebar-link to="/typography" name="Typography" icon="ti-text"/> -->
        <!-- <sidebar-link to="/icons" name="Icons" icon="ti-pencil-alt2"/> -->
        <sidebar-link v-if="!this.$store.state.isLoading" to="/start-project" name="Start Project" icon="ti-plus"/>
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
    console.log('123123123',this.$store.state.isAdmin)
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
