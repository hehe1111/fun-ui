<template>
  <div id="app" style="padding: 10px;">
    <f-uploader
      accept="image/*"
      method="post"
      :action="`${baseUrl}upload/`"
      name="myFile"
      :parse-response="parseResponse"
    >
      <f-button>上传</f-button>
      <!-- eslint-disable-next-line prettier/prettier -->
      <template slot="tips">Maximum image size: 300 kb</template>
    </f-uploader>
    <f-button>保存</f-button>
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
    };
  },
  components: { FUploader, FButton },
  methods: {
    parseResponse(response) {
      return `${this.baseUrl}preview/${response}`;
    },
  },
};
</script>

<style lang="scss">
@import './assets/_var.scss';
</style>
