<template>
  <span><b>{{ message.title }}</b> <br>{{ message.body }}</span>
</template>

<script>
  export default {
    name: 'notification-template',
    data ( ) {
      return {
        message: null
      }
    },
    created ( ) {
      this.message = this.$store.state.message
    }
  }
</script>
