<template>
  <f-scroll direction="y" v-bind="$attrs">
    <slot />
  </f-scroll>
</template>

<script>
import FScroll from './FScroll.vue';

export default {
  name: 'FunUIScrollVertical',
  inheritAttrs: false,
  components: { FScroll },
};
</script>

<style lang="scss" scoped>
@import '../../assets/_var.scss';

/deep/ .f-scroll {
  width: 100%;
  height: 100%;
  &-scrollbar-container {
    width: 10px;
    height: 100%;
    top: 0;
    right: 0;
  }

  &-scrollbar {
    width: 100%;
  }
}
</style>
