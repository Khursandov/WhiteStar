<template>
  <div>

    <!--Stats cards-->

    <!--Charts-->


  </div>
</template>
<script>
import { StatsCard, ChartCard } from "@/components/index";
import Chartist from 'chartist';
import { METHODS } from 'http';
export default {
  components: {
    StatsCard,
    ChartCard
  },
  /**
   * Chart data used to render stats, charts. Should be replaced with server data
   */
  data() {
    return {
    }
  },
  beforeCreate() {
    if (!this.$store.state.isAdmin) {
      this.$router.push('/table-list')
    }
  }
};
</script>
<style>
</style>
