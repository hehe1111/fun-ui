<template>
  <div class="popver">
    <div class="content-container" v-if="visiable">
      <slot name="content"></slot>
    </div>
    <div class="button-container" @click="togglePopover">
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
    togglePopover() {
      this.visiable = !this.visiable;
    },
  },
};
</script>

<style lang="scss" scoped>
.popver {
  display: inline-block;
  position: relative;
  > .content-container {
    position: absolute;
    bottom: 100%;
    border: 1px solid red;
  }
}
</style>
