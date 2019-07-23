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
        <img
          :src="file.url"
          alt="preview uploaded image"
          v-if="listType !== 'text'"
        />
        <span v-if="listType !== 'picture-card'">{{ file.name }}</span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'FunUIUploader',
  data() {
    return {
      previewUrl: '',
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
  },
  computed: {
    liClasses() {
      return {
        'picture-card': this.listType === 'picture-card',
      };
    },
  },
  created() {
    this.mutableFileList = this.fileList;
  },
  methods: {
    onClickToSelectFile() {
      this.$refs.inputRef.click();
    },
    onChange() {
      this.barStatus = '';
      const formData = new FormData();
      formData.append(this.name, this.$refs.inputRef.files[0]);
      this.upload(formData);
    },
    upload(formData) {
      const xhr = new XMLHttpRequest();
      xhr.onload = event => this.handleLoad(xhr, event);
      xhr.upload.onprogress = event => this.handleUploadProgress(xhr, event);
      xhr.onerror = event => this.handleError(xhr, event);
      xhr.open(this.method.toUpperCase(), this.action);
      xhr.send(formData);
    },
    handleLoad(xhr, event) {
      // receive response. A type of download
      this.barText = 'Upload successed.';
      this.barStatus = 'successed';

      const fileInfo = this.parseResponse(xhr.response);
      this.previewUrl = fileInfo.url;
      this.mutableFileList.push(fileInfo);
      this.$emit('update:file-list', [...this.mutableFileList]);
    },
    handleUploadProgress(xhr, event) {
      // https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/Using_XMLHttpRequest#Monitoring_progress
      // https://developer.mozilla.org/en-US/docs/Web/API/ProgressEvent
      if (!event.lengthComputable) return;
      if (event.total / 1024 > 300) {
        xhr.abort();
        this.barText = 'File too large. Please compress it before uploading.';
        return (this.barStatus = 'warning');
      }
      this.barText =
        'Uploading: ' + (event.loaded / event.total).toFixed(3) * 100 + '%';
    },
    handleError(xhr, event) {
      this.barText = 'Upload failed.';
      this.barStatus = 'failed';
    },
  },
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

    &:hover {
      color: $blue;
      border-color: $blue;
    }

    &.picture-card {
      display: inline-flex;

      > img {
        height: 200px;
        margin-right: 0;
      }
    }

    > img {
      height: 50px;
      margin-right: 0.5em;
    }
  }
}
</style>
