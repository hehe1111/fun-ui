<template>
  <div class="f-uploader">
    <div @click="onClick">
      <slot></slot>
    </div>
    <slot name="tips"></slot>
    <input
      type="file"
      ref="inputRef"
      @change="onChange"
      formenctype="multipart/form-data"
      :name="name"
    />
    <p class="progress-bar"></p>
  </div>
</template>

<script>
export default {
  name: 'FunUIUploader',
  props: {
    accept: {
      type: String,
    },
    method: {
      type: String,
      default: 'POST',
    },
    action: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
  },
  methods: {
    onClick() {
      this.$refs.inputRef.click();
    },
    onChange() {
      const formData = new FormData();
      formData.append(this.name, this.$refs.inputRef.files[0]);
      this.upload(formData);
    },
    upload(formData) {
      const xhr = new XMLHttpRequest();
      const progressBar = document.querySelector('.progress-bar');
      xhr.upload.onload = () => {
        progressBar.innerText = `Upload successed. ${xhr.response}`;
      };
      xhr.upload.onprogress = event => {
        if (event.total / 1024 > 300) {
          xhr.abort();
          return (progressBar.innerText = `File too large. Please compress it before uploading.`);
        }
        // https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/Using_XMLHttpRequest#Monitoring_progress
        // https://developer.mozilla.org/en-US/docs/Web/API/ProgressEvent
        if (event.lengthComputable) {
          progressBar.innerText =
            'Uploading: ' + (event.loaded / event.total).toFixed(3) * 100 + '%';
        }
      };
      xhr.upload.onloadend = event => {
        progressBar.innerText = 'Upload ended. 100%';
      };
      xhr.upload.onabort = () => {
        progressBar.innerText = 'Upload cancelled!';
      };
      xhr.upload.onerror = () => {
        progressBar.innerText = 'Upload failed.';
      };
      xhr.open(this.method.toUpperCase(), this.action);
      xhr.send(formData);
    },
  },
};
</script>

<style lang="scss" scoped>
.f-uploader {
  input {
    display: none;
  }
}
</style>
