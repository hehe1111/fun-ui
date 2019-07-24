<template>
  <div class="f-uploader">
    <div @click="onClickToSelectFile">
      <slot />
    </div>
    <div v-if="$slots.tips">
      <slot name="tips" />
      <span class="f-uploader-exceed-max-size-alert" v-if="isExceeded">{{
        exceedMaxSizeAlert
      }}</span>
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
        class="f-uploader-list-li"
        :class="liClasses"
        v-for="file in mutableFileList"
        :key="file.alias"
      >
        <f-icon name="loading" v-if="file.status === 'uploading'" />
        <img :src="file.url" />
        <span class="f-uploader-file-name">{{ file.name }}</span>
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
import { getTypeOf } from '../assets/utils.js';

export default {
  name: 'FunUIUploader',
  data() {
    return {
      mutableFileList: [],
      exceedMaxSizeAlert: 'File too large.',
      isExceeded: false,
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
      this.isExceeded = false;
      this.$refs.inputRef.click();
    },
    onChange() {
      const formData = new FormData();
      const fileReal = this.$refs.inputRef.files[0];
      formData.append(this.name, fileReal);
      const alias = this.handleBeforeUpload(fileReal);
      alias && this.handleUpload(formData, alias);
    },
    handleBeforeUpload(fileReal) {
      if (this.checkFileSize(fileReal.size)) return;
      const alias = `${parseInt(Math.random() * Math.pow(10, 8))}`;
      this.mutableFileList.push({
        name: fileReal.name,
        status: 'uploading',
        alias,
      });
      this.$emit('update:file-list', [...this.mutableFileList]);
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
      xhr.open(this.method.toUpperCase(), this.action);
      xhr.send(formData);
    },
    handleLoad(xhr, event) {
      const fileInfo = this.parseResponse(xhr.response);
      const { object } = this.findObjectInArray(
        xhr.alias,
        'alias',
        this.mutableFileList
      );
      if (object) {
        object.url = fileInfo.url;
        object.status = 'done';
        this.$emit('update:file-list', [...this.mutableFileList]);
      }
    },
    handleUploadProgress(xhr, event) {
      this.$on('abortUpload', abortAlias => {
        return xhr.alias === abortAlias && xhr.abort();
      });

      // https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/Using_XMLHttpRequest#Monitoring_progress
      // https://developer.mozilla.org/en-US/docs/Web/API/ProgressEvent
      if (!event.lengthComputable) return;
    },
    handleAbort(xhr, event) {
      this.popOutFailedObject(xhr);
    },
    handleError(xhr, event) {
      this.popOutFailedObject(xhr);
    },
    handleOnRemove(fileFake) {
      const { alias: abortAlias } = fileFake;
      if (!fileFake.url) {
        return this.$emit('abortUpload', abortAlias);
      }

      this.removeItemFromMutableFileList(abortAlias);
      this.onRemove && this.onRemove();
    },
    checkFileSize(fileSize) {
      this.isExceeded = this.maxSize && fileSize / 1024 > this.maxSize;
      setTimeout(() => (this.isExceeded = false), 3000);
      return this.isExceeded;
    },
    popOutFailedObject(xhr) {
      this.removeItemFromMutableFileList(xhr.alias);
    },
    removeItemFromMutableFileList(targetValue) {
      const { index } = this.findObjectInArray(
        targetValue,
        'alias',
        this.mutableFileList
      );
      if (index < 0) return;
      this.mutableFileList.splice(index, 1);
      this.$emit('update:file-list', [...this.mutableFileList]);
    },
    findObjectInArray(targetValue, property, array) {
      if (typeof property !== 'string') {
        throw new Error('Given property should be a string');
      }
      if (!array.every(n => getTypeOf(n) === 'object')) {
        throw new Error('Given array contains non-object element.');
      }
      const index = array.map(n => n[property]).indexOf(targetValue);
      return {
        index,
        object: array[index],
      };
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

  &-exceed-max-size-alert {
    margin-left: 1em;
    color: $red;
  }

  &-list-li {
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

      > .f-uploader-file-name {
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
