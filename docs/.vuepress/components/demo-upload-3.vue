<template>
  <div class="demo-upload-3 extra-margin">
    <f-upload
      action="https://upload-file-demo-on-heroku.herokuapp.com/upload/"
      name="myFile"
      :parse-response="parseResponse"
      :max-size="300"
      accept="image/png"
      @success="onSuccess"
      @error="onError"
      @remove="onRemove"
    >
      <f-button icon="upload">上传</f-button>
      <template slot="tips">只能上传大小不超过 300 kb 的 *.png 文件.</template>
    </f-upload>

    <code-box :code="{ html, javascript }" />
  </div>
</template>

<script>
import Vue from 'vue';
import FUpload from '../../../src/components/FUpload.vue';
import FButton from '../../../src/components/button/FButton.vue';
import toast from '../../../src/plugins/toast.js';

Vue.use(toast);

export default {
  name: 'demo-upload-3',
  components: { FUpload, FButton },
  data() {
    return {
      html: `
        <f-upload
          action="https://upload-file-demo-on-heroku.herokuapp.com/upload/"
          name="myFile"
          :parse-response="parseResponse"
          :max-size="300"
          accept="image/png"
          @success="onSuccess"
          @error="onError"
          @remove="onRemove"
        >
          <f-button icon="upload">上传</f-button>
          <template slot="tips">只能上传大小不超过 300 kb 的 *.png 文件.</template>
        </f-upload>
      `,
      javascript: `
        methods: {
          parseResponse(response) {
            const fileInfo = JSON.parse(response);
            return {
              name: fileInfo.originalname,
              url: 'https://upload-file-demo-on-heroku.herokuapp.com/preview/' + fileInfo.filename,
            };
          },
          onSuccess($event) {
            this.$toast('上传成功', { state: 'success' });
          },
          onRemove($event) {
            this.$toast('删除成功', { state: 'success' });
          },
          onError($event) {
            $event.isExceeded && this.$toast('文件太大', { state: 'error' });
          },
        },
      `,
    };
  },
  methods: {
    parseResponse(response) {
      const fileInfo = JSON.parse(response);
      return {
        name: fileInfo.originalname,
        url:
          'https://upload-file-demo-on-heroku.herokuapp.com/preview/' +
          fileInfo.filename,
      };
    },
    onSuccess($event) {
      this.$toast('上传成功', { state: 'success' });
    },
    onRemove($event) {
      this.$toast('删除成功', { state: 'success' });
    },
    onError($event) {
      $event.isExceeded && this.$toast('文件太大', { state: 'error' });
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../assets/style/_var.scss';
</style>
