<template>
  <div id="app" style="padding: 10px;">
    <f-uploader
      accept="image/*"
      method="post"
      :action="`${baseUrl}upload/`"
      name="myFile"
      :parse-response="parseResponse"
      :file-list.sync="fileList"
      list-type="picture"
      :on-remove="onRemove"
      :max-size="300"
      @error="onError"
    >
      <f-button icon="upload">上传</f-button>
      <!-- eslint-disable-next-line prettier/prettier -->
      <template slot="tips">Maximum image size: 300 kb.</template>
    </f-uploader>
  </div>
</template>

<script>
import FUploader from './components/FUploader.vue';
import FButton from './components/button/FButton.vue';

export default {
  name: 'App',
  data() {
    return {
      baseUrl: 'http://127.1.1.0:3000/',
      fileList: [],
    };
  },
  components: { FUploader, FButton },
  methods: {
    parseResponse(response) {
      const fileInfo = JSON.parse(response);
      return {
        name: fileInfo.originalname,
        url: `${this.baseUrl}preview/${fileInfo.filename}`,
      };
    },
    onRemove() {
      console.log('send onRemove request');
    },
    onError(x) {
      console.log('error message: ', x);
    },
  },
};
</script>

<style lang="scss">
@import './assets/_var.scss';
</style>
