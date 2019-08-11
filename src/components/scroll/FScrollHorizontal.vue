<template>
  <div>
    <f-scroll direction="x" v-bind="$attrs">
      <slot />
    </f-scroll>
  </div>
</template>

<script>
import FScroll from './FScroll.vue';

export default {
  name: 'FunUIScrollHorizontal',
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
    width: 100%;
    height: 10px;
    bottom: 0;
    left: 0;
  }

  &-scrollbar {
    height: 100%;
  }
}
</style>
