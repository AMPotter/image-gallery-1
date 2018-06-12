<template>
  <div id="app">
    <h1>Image Gallery</h1>
    <nav>
      <router-link to="/">Go home, scrub.</router-link>
      &nbsp;
      <router-link to="/about">Go to the empty about page.</router-link>
      &nbsp;
      <router-link to="/albums">Go to the albums.</router-link>
    </nav>

    <router-view></router-view>
    
  </div>
</template>

<script>

export default {
  components: {

  }
};
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
