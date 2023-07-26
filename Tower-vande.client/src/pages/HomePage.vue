<template>
  <div class="container-fluid">
    <section class="row">
      <div class="col-12 d-flex">
        <img class="img-fluid home-banner-img flex-fill mx-4" src="https://images.unsplash.com/photo-1563215613-bcdbce1c7234?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80" alt="Concert">
      </div>
    </section>

    <section class="row">
      <div class="col-12">
        <p class="text-light">
          Filter Buttons
        </p>
      </div>

      <div class="col-12">
        <p class="text-light">
          Events
        </p>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  setup() {
    return {}
  }
}
</script>

<style scoped lang="scss">

.home-banner-img{
  width: 100vh;
  height: 20vh;
  object-fit: cover;
  object-position: center;
  border: 1px solid #dc5f2c
}
</style>
