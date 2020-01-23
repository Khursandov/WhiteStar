<template>
  <span><b>{{ message.title }}</b> <br>{{ message.body }}</span>
</template>

<script>
import NotificationTemplate from '../Notifications/NotificationTemplate';
  export default {
    name: 'notification-template',
    data ( ) {
      return {
        message: null
      }
    },
    created ( ) {
      const color = Math.floor(Math.random() * 4 + 1);
        this.$notify({
        component: NotificationTemplate,
        icon: "ti-help-alt",
        type: 'warning'
      });
      this.message = this.$store.state.message
    }
  }
</script>
