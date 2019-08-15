<template>
  <div :class="n2c('container')">
    <transition name="sidebar-slide">
      <div v-if="isSwitchOn">
        <slot />
      </div>
    </transition>
    <div :class="n2c('switch')" @click="toggleSwitch">
      <f-icon
        name="right"
        :class="n2c('switch-icon', isSwitchOn ? 'switch-icon-left' : '')"
      />
    </div>
  </div>
</template>

<script>
import FIcon from '../FIcon.vue';
import { optionsName2ClassPrefix } from '../../assets/utils.js';

export default {
  name: 'FunUISidebar',
  components: { FIcon },
  data() {
    return {
      isSwitchOn: true,
    };
  },
  computed: {
    n2c() {
      return optionsName2ClassPrefix(this.$options.name);
    },
  },
  methods: {
    toggleSwitch() {
      this.isSwitchOn = !this.isSwitchOn;
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../../assets/_var.scss';

.sidebar-slide-enter-active {
  /* 0 到 100% */
  animation: sidebar-slide $duration;
}
.sidebar-slide-leave-active {
  /* 100% 到 0 */
  animation: sidebar-slide $duration reverse;
}
@keyframes sidebar-slide {
  0% {
    margin-left: -100%;
  }
  100% {
    margin-left: 0;
  }
}

.f-sidebar {
  &-container {
    min-width: 2em;
    display: flex;
    position: relative;
  }

  &-switch {
    @extend.flex-center;
    flex-shrink: 1;
    height: 100%;
    background-color: rgba(255, 255, 255, 0.1);
    word-break: keep-all;
    position: absolute;
    top: 0;
    right: 0;

    &-icon {
      margin: 0 0.5em;
      white-space: nowrap;
      transition: transform $duration linear;

      &-left {
        transform: rotate(180deg);
      }
    }
  }
}
</style>
