<template>
  <div class="demo-upload-1 extra-margin">
    <code-box :htmlCode="htmlCode" :javascriptCode="javascriptCode" show-code />
  </div>
</template>

<script>
import Vue from 'vue';
import FUpload from '../../../src/components/FUpload.vue';
import FButton from '../../../src/components/button/FButton.vue';
import toast from '../../../src/plugins/toast.js';

Vue.use(toast);

export default {
  name: 'demo-upload-1',
  components: { FUpload, FButton },
  data() {
    return {
      htmlCode: `
        <f-upload
          action="https://upload-file-demo-on-heroku.herokuapp.com/upload/"
          name="myFile"
          :parse-response="parseResponse"
          @success="onSuccess"
          @error="onError"
          @remove="onRemove"
        >
          <f-button icon="upload">上传</f-button>
        </f-upload>
      `,
      javascriptCode: `
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
