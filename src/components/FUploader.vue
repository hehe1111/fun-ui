<template>
  <div class="f-uploader">
    <div @click="onClick">
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
  </div>
</template>

<script>
export default {
  name: 'FunUIUploader',
  data() {
    return {
      barText: '',
      barStatus: '',
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
  },
  methods: {
    onClick() {
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
      xhr.onload = () => {
        // receive response. A type of download
        this.barText = 'Upload successed.';
        this.barStatus = 'successed';
      };
      xhr.upload.onprogress = event => {
        // https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/Using_XMLHttpRequest#Monitoring_progress
        // https://developer.mozilla.org/en-US/docs/Web/API/ProgressEvent
        if (event.lengthComputable) {
          if (event.total / 1024 > 300) {
            xhr.abort();
            this.barText =
              'File too large. Please compress it before uploading.';
            return (this.barStatus = 'warning');
          }
          this.barText =
            'Uploading: ' + (event.loaded / event.total).toFixed(3) * 100 + '%';
        }
      };
      xhr.onerror = () => {
        this.barText = 'Upload failed.';
        this.barStatus = 'failed';
      };
      xhr.open(this.method.toUpperCase(), this.action);
      xhr.send(formData);
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
}
</style>
