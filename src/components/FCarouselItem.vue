<template>
  <transition name="slide">
    <div v-if="visible" class="f-carousel-item">
      <slot />
    </div>
  </transition>
</template>

<script>
export default {
  name: 'FunUICarouselItem',
  props: {
    name: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      selected: '',
    };
  },
  computed: {
    visible() {
      return this.selected === this.name;
    },
  },
};
</script>

<style lang="scss" scoped>
.slide-enter-active,
.slide-leave-active {
  transition: all 0.4s;
}
.slide-leave-active {
  position: absolute;
  // top left 必须写，否则从最后一张再到第一张的行为会出错
  top: 0;
  left: 0;
}
.slide-enter {
  transform: translateX(100%);
}
.slide-leave-to {
  transform: translateX(-100%);
}
</style>
