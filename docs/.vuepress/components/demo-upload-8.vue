<template>
  <div class="demo-upload-8 extra-margin">
    <f-upload
      action="https://upload-file-demo-on-heroku.herokuapp.com/upload/"
      name="myFile"
      :parse-response="parseResponse"
      :max-size="300"
      draggable
      @success="onSuccess"
      @error="onError"
      @remove="onRemove"
    >
      <div class="dump-site">请将文件拖曳到此区域</div>
    </f-upload>

    <code-box :code="{ html, javascript, scss }" />
  </div>
</template>

<script>
import Vue from 'vue';
import FUpload from '../../../src/components/FUpload.vue';
import FButton from '../../../src/components/button/FButton.vue';
import toast from '../../../src/plugins/toast.js';

Vue.use(toast);

export default {
  name: 'demo-upload-8',
  components: { FUpload, FButton },
  data() {
    return {
      html: `
        <f-upload
          action="https://upload-file-demo-on-heroku.herokuapp.com/upload/"
          name="myFile"
          :parse-response="parseResponse"
          :max-size="300"
          draggable
          @success="onSuccess"
          @error="onError"
          @remove="onRemove"
        >
          <div class="dump-site">请将文件拖曳到此区域</div>
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
      scss: `
        .dump-site {
          border: 4px dashed #ddd;
          border-radius: 6px;
          padding: 50px;
          color: #aaa;
        }
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

.demo-upload-8 {
  .dump-site {
    border: 4px dashed #ddd;
    border-radius: 6px;
    padding: 50px;
    color: #aaa;
  }
}
</style>
