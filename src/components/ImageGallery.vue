<template>
  <ol class="image-gallery">
    <li v-for="(image, index) in images" :key="image.src">
      <a :href="image.src" target="_blank">
        <div class="image" :style="{'background-image': `url(${image.src})`}"></div>
      </a>
      <p class="closed" @click="deleteImage(image, index)">x</p>
    </li>
  </ol>
</template>

<script>
import firebase from "../firebase.js"

export default {
  props: ["images"],
  methods: {
    async deleteImage(image, index) {
      const { src: url } = image;
      var imageRef = firebase.storage().refFromURL(url);

      try {
        await imageRef.delete();
        this.images.splice(index, 1);
        alert("Imagem Deletada!");
      } catch (error) {
        alert("Ops... Ocorreu um erro!");
        console.log(error);
      }
    }
  }
}
</script>

<style>
.image-gallery {
  display: flex;
  flex-wrap: wrap;
}

.image-gallery li {
  list-style: none;
  position: relative;
}

.image-gallery .closed {
  position: absolute;
  top: 9px;
  right: 8px;
  font-size: 0.7rem;
  padding: 0.1rem 0.35rem;
  border-radius: 50px;
  background-color: #fff;
  color: #000;
}

.closed:hover {
  color: red;
  cursor: pointer;
}

.image-gallery .image {
  width: 60px;
  height: 60px;
  margin: 6px;
  border-radius: 5px;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 50% 50%;
}
</style>