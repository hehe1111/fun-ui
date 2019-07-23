<template>
  <div class="f-uploader">
    <div @click="onClickToSelectFile">
      <slot></slot>
    </div>
    <div>
      <slot name="tips"></slot>
    </div>
    <input
      type="file"
      :name="name"
      @change="onChange"
      ref="inputRef"
      :accept="accept"
    />
    <ul>
      <li
        class="url-of-uploaded-file"
        :class="liClasses"
        v-for="file in mutableFileList"
        :key="file.url"
      >
        <f-icon name="loading" v-if="file.status === 'uploading'" />
        <img :src="file.url" />
        <span class="file-name">{{ file.name }}</span>
        <f-icon
          class="f-uploader-remove-icon"
          name="error"
          @click="handleOnRemove(file)"
        />
      </li>
    </ul>
  </div>
</template>

<script>
import FIcon from './FIcon.vue';

export default {
  name: 'FunUIUploader',
  data() {
    return {
      barText: '',
      barStatus: '',
      mutableFileList: [],
    };
  },
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
    parseResponse: {
      type: Function,
      required: true,
    },
    fileList: {
      type: Array,
      default: () => [],
    },
    listType: {
      type: String,
      default: 'text',
      validator: value => {
        return ['text', 'picture', 'picture-card'].indexOf(value) >= 0;
      },
    },
    onRemove: Function,
    maxSize: Number,
  },
  computed: {
    liClasses() {
      return {
        [`${this.listType}`]: this.listType,
      };
    },
  },
  created() {
    this.mutableFileList = this.fileList;
  },
  methods: {
    onClickToSelectFile() {
      // Reset FileList object to enable upload the same file multiple times
      this.$refs.inputRef.value = null;
      this.$refs.inputRef.click();
    },
    onChange() {
      const formData = new FormData();
      const fileReal = this.$refs.inputRef.files[0];
      formData.append(this.name, fileReal);
      this.handleUpload(formData, this.handleBeforeUpload(fileReal));
    },
    handleBeforeUpload(fileReal) {
      if (!this.checkFileSize(fileReal.size)) return;
      const alias = `${parseInt(Math.random() * 100000000)}`;
      this.mutableFileList.push({
        name: fileReal.name,
        status: 'uploading',
        alias,
      });
      return alias;
    },
    requiredParam() {
      throw new Error('alias is required');
    },
    handleUpload(formData, alias = this.requiredParam()) {
      const xhr = new XMLHttpRequest();
      xhr.alias = alias;
      xhr.onload = event => this.handleLoad(xhr, event);
      xhr.upload.onprogress = event => this.handleUploadProgress(xhr, event);
      xhr.onabort = event => this.handleAbort(xhr, event);
      xhr.onerror = event => this.handleError(xhr, event);
      xhr.onloadend = event => this.handleLoadEnd(xhr, event);
      xhr.open(this.method.toUpperCase(), this.action);
      xhr.send(formData);
    },
    handleOnRemove(file) {
      const { alias: abortAlias } = file;
      this.$emit('abortUpload', abortAlias);
      const index = this.mutableFileList.map(f => f.alias).indexOf(abortAlias);
      if (index < 0) return;
      this.mutableFileList.splice(index, 1);
      this.$emit('update:file-list', this.mutableFileList);
      this.onRemove && this.onRemove();
    },
    handleLoad(xhr, event) {
      const fileInfo = this.parseResponse(xhr.response);
      const list = this.mutableFileList;
      list.filter(f => f.alias === xhr.alias)[0].url = fileInfo.url;
      this.$emit('update:file-list', [...list]);
    },
    handleUploadProgress(xhr, event) {
      // https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/Using_XMLHttpRequest#Monitoring_progress
      // https://developer.mozilla.org/en-US/docs/Web/API/ProgressEvent
      if (!event.lengthComputable) return;
      this.$on('abortUpload', abortAlias => {
        xhr.alias === abortAlias && xhr.abort();
      });
    },
    handleAbort(xhr, event) {
      this.popOutFailedObject(xhr);
    },
    handleError(xhr, event) {
      this.popOutFailedObject(xhr);
    },
    handleLoadEnd(xhr, event) {
      const target = this.mutableFileList.filter(f => f.alias === xhr.alias)[0];
      target && (target.status = 'done');
    },
    checkFileSize(fileSize) {
      if (this.maxSize && fileSize / 1024 > this.maxSize) {
        return false;
      }
      return true;
    },
    popOutFailedObject(xhr) {
      const index = this.mutableFileList.map(f => f.alias).indexOf(xhr.alias);
      index >= 0 && this.mutableFileList.splice(index, 1);
    },
  },
  components: { FIcon },
};
</script>

<style lang="scss" scoped>
@import '../assets/_var.scss';

.f-uploader {
  input {
    display: none;
  }

  > .progress-bar {
    height: 3em;

    &.successed {
      color: $green;
    }
    &.warning {
      color: $orange;
    }
    &.failed {
      color: $red;
    }
  }

  > ul > .url-of-uploaded-file {
    @extend .flex-center;
    justify-content: flex-start;
    background-color: #fff;
    border-radius: $borderRadius;
    border: 1px solid $borderColor;
    padding: 0.5em;
    margin: 0.3em;
    cursor: pointer;
    word-break: break-all;
    position: relative;

    &:hover {
      color: $blue;
      border-color: $blue;

      > .f-uploader-remove-icon {
        display: block;
      }
    }

    &.text {
      > img {
        display: none;
      }

      > .f-uploader-remove-icon {
        top: 50%;
        // transform: translateY(-50%); 对 SVG 无效
        margin-top: -0.5em;
      }
    }

    &.picture-card {
      display: inline-flex;

      > .file-name {
        display: none;
      }

      > img {
        height: 200px;
        margin-right: 0;
      }
    }

    > img {
      height: 50px;
      margin-right: 0.5em;
    }

    > .f-uploader-remove-icon {
      display: none;
      position: absolute;
      top: 0;
      right: 0;
      margin-top: 0.2em;
      margin-right: 0.2em;
    }
  }
}
</style>
