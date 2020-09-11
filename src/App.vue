<template>
  <div id="app">
    <ImageUpload />
  </div>
</template>

<script>
import ImageUpload from './components/ImageUpload.vue'

export default {
  components: { ImageUpload }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  outline: 0;
  box-sizing: border-box;
}

body {
  background: #41b883;
}

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 14px;
}

html, body, #app {
  height: 100%;
}
</style>
