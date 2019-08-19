<template>
  <div class="f-upload">
    <div
      class="f-upload-trigger-area"
      @click="onClickToSelectFile"
      ref="triggerAreaRef"
    >
      <slot />
    </div>
    <div>
      <slot name="tips" />
    </div>
    <div v-if="!autoUpload" @click="submit" class="f-upload-submit-area">
      <slot name="submit" />
    </div>
    <input
      type="file"
      :name="name"
      @change="onChange"
      ref="inputRef"
      :accept="accept"
      :multiple="multiple"
    />
    <transition-group name="bounce" tag="ul">
      <li
        class="f-upload-list-li"
        :class="liClasses(file.status)"
        v-for="file in mutableFileList"
        :key="file.alias"
      >
        <f-icon
          name="loading"
          class="f-upload-loading-icon"
          v-if="file.status === 'uploading'"
        />
        <img :src="file.url" />
        <span class="f-upload-file-name">{{ file.name }}</span>
        <f-icon
          class="f-upload-circle-check-icon"
          name="circle-check"
          v-if="file.status === 'succeeded'"
        />
        <f-icon
          class="f-upload-remove-icon"
          :name="listType === 'picture-card' ? 'trash-can' : 'cross'"
          @click="handleRemove(file)"
        />
      </li>
    </transition-group>
  </div>
</template>

<script>
import FIcon from './FIcon.vue';
import { getTypeOf, ajax } from '../assets/utils.js';

export default {
  name: 'FunUIUpload',
  components: { FIcon },
  data() {
    return {
      mutableFileList: [],
      waitingForSubmit: {},
    };
  },
  props: {
    accept: String,
    method: { type: String, default: 'post' },
    action: { type: String, required: true },
    name: { type: String, required: true },
    parseResponse: { type: Function, required: true },
    fileList: { type: Array, default: () => [] },
    listType: {
      type: String,
      default: 'text',
      validator: value => {
        return ['text', 'picture', 'picture-card'].indexOf(value) >= 0;
      },
    },
    maxSize: Number,
    multiple: { type: Boolean, default: false },
    draggable: { type: Boolean, default: false },
    autoUpload: { type: Boolean, default: true },
  },
  created() {
    this.mutableFileList = this.fileList;
    this.mutableAutoUpload = this.autoUpload;
  },
  mounted() {
    this.draggable && this._handleDragAndDropListener('addEventListener');

    this.$once('hook:beforeDestroy', () => {
      this._handleDragAndDropListener('removeEventListener');
    });
  },
  methods: {
    liClasses(status) {
      return {
        [`${this.listType}`]: this.listType,
        [`${status}`]: status,
      };
    },
    onClickToSelectFile() {
      // Reset FileList object to enable upload the same file multiple times
      this.$refs.inputRef.value = null;
      this.$refs.inputRef.click();
    },
    _handleDragAndDropListener(method) {
      // https://developer.mozilla.org/en-US/docs/Web/API/File/Using_files_from_web_applications#Selecting_files_using_drag_and_drop
      const { triggerAreaRef } = this.$refs;
      triggerAreaRef[method]('dragenter', this.onDragEnter);
      triggerAreaRef[method]('dragover', this.onDragOver);
      triggerAreaRef[method]('drop', this.onDrop);
    },
    onDragEnter(event) {
      event.stopPropagation();
      event.preventDefault();
    },
    onDragOver(event) {
      event.stopPropagation();
      event.preventDefault();
    },
    onDrop(event) {
      event.stopPropagation();
      event.preventDefault();
      this.createFormDataAndUpload(event.dataTransfer.files);
    },
    onChange() {
      this.createFormDataAndUpload(this.$refs.inputRef.files);
    },
    createFormDataAndUpload(files) {
      for (let i = 0; i < files.length; i++) {
        const formData = new FormData();
        formData.append(this.name, files[i]);
        const alias = this.handleBeforeUpload(files[i]);
        if (alias && !this.mutableAutoUpload) {
          this.waitingForSubmit[alias] = formData;
          continue;
        }
        alias && this.handleUpload(formData, alias);
      }
    },
    handleBeforeUpload(fileReal) {
      const { name, size, type } = fileReal;
      if (this.checkFileSize(fileReal)) return;
      const alias = `${parseInt(Math.random() * Math.pow(10, 8))}`;
      this.mutableFileList.push({
        name,
        size,
        type,
        alias,
        status: this.mutableAutoUpload ? 'uploading' : 'waiting',
      });
      this.$emit('update:file-list', [...this.mutableFileList]);
      return alias;
    },
    requiredParam() {
      throw new Error('alias is required');
    },
    handleUpload(formData, alias = this.requiredParam()) {
      if (!this.mutableAutoUpload) return;
      ajax[this.method.toLowerCase()](this.action, {
        formData,
        alias,
        handleLoad: this.handleLoad,
        handleUploadProgress: this.handleUploadProgress,
        handleAbort: this.handleAbort,
        handleError: this.handleError,
      });
    },
    submit() {
      if (JSON.stringify(this.waitingForSubmit) === '{}') return;
      this.mutableAutoUpload = true;
      this.mutableFileList
        .filter(f => f.status === 'waiting')
        .map(f => (f.status = 'uploading'));
      Object.keys(this.waitingForSubmit).map(k =>
        this.handleUpload(this.waitingForSubmit[k], k)
      );
      this.mutableAutoUpload = false;
      this.waitingForSubmit = {};
    },
    handleLoad(xhr) {
      const fileInfoFromResponse = this.parseResponse(xhr.response);
      const { object } = this.findObjectInArray(
        { alias: xhr.alias },
        this.mutableFileList
      );
      if (object) {
        object.url = fileInfoFromResponse.url;
        object.status = 'succeeded';
        this.$emit('success', { fileInfo: object });
        this.$emit('update:file-list', [...this.mutableFileList]);
      }
    },
    handleUploadProgress(xhr) {
      this.$on('abortUpload', abortAlias => {
        return xhr.alias === abortAlias && xhr.abort();
      });
    },
    handleAbort(xhr) {
      this.removeItemFromMutableFileList(xhr.alias);
    },
    handleError(xhr) {
      const { object } = this.findObjectInArray(
        { alias: xhr.alias },
        this.mutableFileList
      );
      if (object) {
        object.status = 'failed';
        this.$emit('error', { fileInfo: object, xhr });
        this.$emit('update:file-list', [...this.mutableFileList]);
      }
    },
    handleRemove(fileFake) {
      const { alias: abortAlias, url, status } = fileFake;
      if (!url && status === 'uploading') {
        return this.$emit('abortUpload', abortAlias);
      }
      status === 'waiting' && delete this.waitingForSubmit[abortAlias];
      status === 'succeeded' && this.$emit('remove', { fileInfo: fileFake });
      this.removeItemFromMutableFileList(abortAlias);
    },
    checkFileSize({ name, size, type }) {
      const isExceeded = this.maxSize && size / 1024 > this.maxSize;
      isExceeded &&
        this.$emit('error', {
          fileInfo: { name, size, type },
          isExceeded: true,
        });
      return isExceeded;
    },
    removeItemFromMutableFileList(targetValue) {
      const { index } = this.findObjectInArray(
        { alias: targetValue },
        this.mutableFileList
      );
      if (index < 0) return;
      this.mutableFileList.splice(index, 1);
      this.$emit('update:file-list', [...this.mutableFileList]);
    },
    findObjectInArray(targetObject, array) {
      const property = Object.keys(targetObject)[0];
      if (typeof property !== 'string') {
        throw new Error('Key of param 1 should be a string');
      }
      if (!array.every(n => getTypeOf(n) === 'object')) {
        throw new Error('Param 2 contains non-object element.');
      }
      const index = array.map(n => n[property]).indexOf(targetObject[property]);
      return {
        index,
        object: array[index],
      };
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../assets/_var.scss';

.bounce-enter-active {
  animation: bounce-in $duration;
}
.bounce-leave-active {
  animation: bounce-in $duration reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
  }
}

.f-upload {
  input {
    display: none;
  }

  &-trigger-area,
  &-submit-area {
    display: inline-flex;
  }

  &-list-li {
    @extend .flex-center;
    justify-content: flex-start;
    background-color: #fff;
    border-radius: $borderRadius;
    border: 1px solid $borderColor;
    padding: 0.5em;
    margin: 0.3em;
    margin-left: 0;
    cursor: pointer;
    word-break: break-all;
    position: relative;

    &:hover {
      color: $blue;
      border-color: $blue;

      > .f-upload-circle-check-icon {
        display: none;
      }

      > .f-upload-remove-icon {
        display: block;
      }
    }

    &.text {
      > img {
        display: none;
      }

      > .f-upload-circle-check-icon,
      > .f-upload-remove-icon {
        top: 50%;
        // transform: translateY(-50%); not work on SVG element
        margin-top: -0.5em;
        margin-right: 0.5em;
      }
    }

    &.picture-card {
      display: inline-flex;
      position: relative;

      &:hover {
        border-color: $borderColorHover;
        &::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: calc(100% + 2px);
          height: calc(100% + 2px);
          margin-left: -1px;
          margin-top: -1px;
          background-color: $maskColor;
          border-radius: $borderRadius;
        }

        > .f-upload-loading-icon {
          display: none;
        }
      }

      > .f-upload-file-name {
        display: none;
      }

      > img {
        width: 100px;
        height: 100px;
        margin-right: 0;
      }

      > .f-upload-loading-icon,
      > .f-upload-remove-icon {
        position: absolute;
        top: 50%;
        left: 50%;
        margin-top: -0.5em;
        margin-left: -0.5em;
      }

      > .f-upload-remove-icon {
        z-index: 1;
        transform: scale(1.2);
        fill: #fff;
      }
    }

    &.failed,
    &.failed:hover {
      color: $red;
      border-color: $red;
    }

    > img {
      height: 50px;
      margin-right: 0.5em;
    }

    > .f-upload-loading-icon {
      margin-right: 0.5em;
    }

    > .f-upload-circle-check-icon,
    > .f-upload-remove-icon {
      position: absolute;
      top: 0;
      right: 0;
      margin-top: 0.2em;
      margin-right: 0.2em;
    }

    > .f-upload-circle-check-icon {
      fill: $blue;
    }

    > .f-upload-remove-icon {
      display: none;
    }
  }
}
</style>
