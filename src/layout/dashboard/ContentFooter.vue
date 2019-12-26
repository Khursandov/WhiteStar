<template>
  <footer class="footer">
    <div class="container-fluid d-flex flex-wrap justify-content-between">
      <nav>
        <ul>
          <li>
            <router-link :to="{path:'/admin'}">White Star</router-link>
          </li>
        </ul>
      </nav>
      <div class="copyright d-flex flex-wrap">
        &copy; Coded with
        <i class="fa fa-heart heart"></i> by
        <a href="https://inha.uz" target="_blank"> &nbsp; IUT</a>&nbsp;
        Designed by <a href="/" target="_blank">&nbsp; Umar</a>
      </div>
    </div>
  </footer>
</template>
<script>
export default {};
</script>
<style>
</style>
