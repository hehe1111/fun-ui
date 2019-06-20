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
$borderColor: #333;
$borderRadius: 4px;

body {
  position: relative;
}
.popver {
  display: inline-block;
  vertical-align: top;
}
.content-container {
  max-width: 20em;
  margin-top: -10px;
  border: 1px solid $borderColor;
  border-radius: $borderRadius;
  padding: 0.5em 1em;
  position: absolute;
  transform: translateY(-100%);
  word-break: break-all;
  // box-shadow: 0 0 3px rgba(0, 0, 0, 0.5);
  filter: drop-shadow(0 0 3px rgba(0, 0, 0, 0.5));
  background-color: #fff;
  &::before,
  &::after {
    content: '';
    border: 10px solid transparent;
    border-top-color: $borderColor;
    position: absolute;
    top: 100%;
    left: 10px;
  }
  &::after {
    margin-top: -1px;
    border-top-color: #fff;
  }
}
</style>
