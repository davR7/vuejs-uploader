<template>
  <div class="image-upload">
    <h2>Upload de Imagem com VueJS</h2>
    <div class="content">
      <vueDropzone
        ref="imgDropZone"
        id="customdropzone"
        :options="dropzoneOptions"
        @vdropzone-complete="afterComplete"
      ></vueDropzone>
    </div>
  </div>
</template>

<script>
import firebase from "../firebase.js"
import vueDropzone from "vue2-dropzone"
import "vue2-dropzone/dist/vue2Dropzone.min.css"
let uuid = require("uuid");

export default {
  components: { vueDropzone },
  data() {
    return {
      dropzoneOptions: {
        url: "https://httpbin.org/post",
        thumbnailWidth: 60,
        thumbnailHeight: 60,
        addRemoveLinks: false,
        acceptedFiles: ".jpg, .jpeg, .png",
        dictDefaultMessage: `<p class='text-default'>Arraste as imagens ou clique aqui</p>`,
      },
      images: [],
    };
  },
  methods: {
    async afterComplete(upload) {
      var imageName = uuid.v1()
      this.isLoading = true
      try {
        let file = upload;
        var metadata = {
          contentType: "image/png",
        };

        var storageRef = firebase.storage().ref();
        var imageRef = storageRef.child(`images/${imageName}.png`)

        await imageRef.put(file, metadata);
        var downloadURL = await imageRef.getDownloadURL()
        this.images.push({ src: downloadURL })
      } catch (error) {
        console.log(error)
      }

      this.$refs.imgDropZone.removeFile(upload)
    },
  },
  watch: {
    images() {
      localStorage.setItem("images", JSON.stringify(this.images))
    },
  },
  mounted() {
    const local = localStorage.getItem("images")
    if (local) {
      this.images = JSON.parse(local)
    }
  }
};
</script>

<style>
.image-upload {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.image-upload h2 {
  margin-top: 30px;
  color: #fff;
}

.text-default {
  position: relative;
}

.content {
  width: 100%;
  max-width: 400px;
  margin: 30px;
  background-color: #fff;
  border-radius: 4px;
  padding: 20px;
}

.dropzone {
  min-height: 50px;
  border: 2px solid rgba(0, 0, 0, 0.3);
  background: white;
  padding: 5px;
  margin-bottom: 15px;
}

.vue-dropzone {
  border: 2px dashed #e5e5e5;
}

.vue-dropzone:hover {
  border: 2px dashed rgba(65, 184, 131, 0.5);
}

.dropzone .dz-preview {
  margin: 8px;
  min-height: 34px;
}

.vue-dropzone > .dz-preview .dz-details {
  background-color: #41b883;
}

.dropzone .dz-preview .dz-details {
  line-height: 100%;
}

.dropzone .dz-preview .dz-details .dz-size,
.dropzone .dz-preview .dz-details .dz-filename {
  font-size: 0.5rem;
}

.dropzone .dz-preview .dz-progress {
  width: 50px;
  height: 8px;
  top: 33%;
  left: 75%;
  margin-top: -8px;
  margin-left: -40px;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 8px;
}

.dropzone .dz-preview .dz-success-mark,
.dropzone .dz-preview .dz-error-mark {
  position: absolute;
  top: 67%;
  left: 45%;
  margin-left: -27px;
  margin-top: -27px;
}

.dropzone .dz-preview .dz-success-mark svg,
.dropzone .dz-preview .dz-error-mark svg {
  width: 34px;
  height: 34px;
}
</style>