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
    <p class="progress-bar" :class="barStatus">{{ barText }}</p>
    <ul>
      <li
        class="url-of-uploaded-file"
        :class="liClasses"
        v-for="file in mutableFileList"
        :key="file.url"
      >
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
      this.updateProgressBar();
      const formData = new FormData();
      const fileToUpload = this.$refs.inputRef.files[0];
      this.mutableFileList.push({ name: fileToUpload.name });
      formData.append(this.name, fileToUpload);
      this.handleUpload(formData, fileToUpload);
    },
    handleUpload(formData) {
      const xhr = new XMLHttpRequest();
      xhr.onload = event => this.handleLoad(xhr, event);
      xhr.upload.onprogress = event => this.handleUploadProgress(xhr, event);
      xhr.onerror = event => this.handleError(xhr, event);
      xhr.open(this.method.toUpperCase(), this.action);
      xhr.send(formData);
    },
    updateProgressBar({ barText = '', barStatus = '' } = {}) {
      this.barText = barText;
      this.barStatus = barStatus;
    },
    handleOnRemove(file) {
      const index = this.mutableFileList.map(f => f.url).indexOf(file.url);
      if (index >= 0) {
        this.mutableFileList.splice(index, 1);
        this.$emit('update:file-list', this.mutableFileList);
        this.onRemove && this.onRemove();
      }
    },
    handleLoad(xhr, event) {
      // receive response. A type of download
      this.updateProgressBar({
        barText: 'Upload successed.',
        barStatus: 'successed',
      });

      const fileInfo = this.parseResponse(xhr.response);
      const list = this.mutableFileList;
      list[list.length - 1].url = fileInfo.url;
      this.$emit('update:file-list', [...list]);
    },
    handleUploadProgress(xhr, event) {
      // https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/Using_XMLHttpRequest#Monitoring_progress
      // https://developer.mozilla.org/en-US/docs/Web/API/ProgressEvent
      if (!event.lengthComputable) return;
      if (event.total / 1024 > 300) {
        xhr.abort();
        return this.updateProgressBar({
          barText: 'File too large. Please compress it before uploading.',
          barStatus: 'warning',
        });
      }
      this.updateProgressBar({
        barText:
          'Uploading: ' + (event.loaded / event.total).toFixed(3) * 100 + '%',
      });
    },
    handleError(xhr, event) {
      this.updateProgressBar({
        barText: 'Upload failed.',
        barStatus: 'failed',
      });
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
