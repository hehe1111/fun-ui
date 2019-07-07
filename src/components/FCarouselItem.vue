<template>
  <transition :name="animationName">
    <div v-if="visible" class="f-carousel-item" :class="classes">
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
      reversed: false,
      animationName: 'slide',
    };
  },
  computed: {
    visible() {
      return this.selected === this.name;
    },
    classes() {
      return {
        reversed: this.reversed,
      };
    },
  },
};
</script>

<style lang="scss" scoped>
.slide-enter-active,
.slide-leave-active,
.slide-vertical-enter-active,
.slide-vertical-leave-active {
  transition: all 0.4s;
}
.slide-leave-active,
.slide-vertical-leave-active {
  position: absolute;
  // top left 必须写，否则从最后一张再到第一张的行为会出错
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
.slide-enter {
  transform: translateX(100%);
}
.slide-leave-to {
  transform: translateX(-100%);
}
.slide-enter.reversed {
  transform: translateX(-100%);
}
.slide-leave-to.reversed {
  transform: translateX(100%);
}

.slide-vertical-enter {
  transform: translateY(100%);
}
.slide-vertical-leave-to {
  transform: translateY(-100%);
}
.slide-vertical-enter.reversed {
  transform: translateY(-100%);
}
.slide-vertical-leave-to.reversed {
  transform: translateY(100%);
}
</style>
