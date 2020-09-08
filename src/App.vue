<template>
  <div id="app">
    <VueDropzoneX />
  </div>
</template>

<script>
import VueDropzoneX from './components/VueDropzoneX.vue'

export default {
  name: 'App',
  components: { VueDropzoneX }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
