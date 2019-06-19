<template>
  <div class="popver" @click="togglePopover" ref="popover">
    <div class="content-container" v-if="visiable" ref="contentContainer">
      <slot name="content"></slot>
    </div>
    <div class="button-container" ref="buttonContainer">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FunUIPopover',
  data() {
    return {
      visiable: false,
    };
  },
  methods: {
    relocatePopoverContent() {
      document.body.appendChild(this.$refs.contentContainer);
      const { top, left } = this.$refs.buttonContainer.getBoundingClientRect();
      this.$refs.contentContainer.style.top = `${window.scrollY + top}px`;
      this.$refs.contentContainer.style.left = `${window.scrollX + left}px`;
    },
    open() {
      this.visiable = true;
      this.$nextTick(() => {
        this.relocatePopoverContent();
        document.addEventListener('click', this.onClickDocument);
      });
    },
    close() {
      this.visiable = false;
      document.removeEventListener('click', this.onClickDocument);
    },
    onClickDocument(event) {
      // 点击 popover 的内容部分时，内容部分不消失
      if (this.visiable && this.$refs.contentContainer.contains(event.target)) {
        return;
      }
      this.close();
    },
    togglePopover(event) {
      this.visiable ? this.close() : this.open();
    },
  },
};
</script>

<style lang="scss" scoped>
body {
  position: relative;
}
.popver {
  display: inline-block;
}
.content-container {
  position: absolute;
  border: 1px solid red;
  transform: translateY(-100%);
}
</style>
