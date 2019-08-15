<template>
  <div :class="n2c('container')">
    <transition :name="`sidebar-${position}-slide`">
      <div :class="n2c('sidebar')" v-if="isSwitchOn">
        <slot />
      </div>
    </transition>
    <div
      v-if="switchable"
      :class="n2c('switch', `switch-${position}`)"
      @click="toggleSwitch"
    >
      <f-icon :name="iconName" :class="iconClasses" />
    </div>
  </div>
</template>

<script>
import FIcon from '../FIcon.vue';
import { optionsName2ClassPrefix, oneOf } from '../../assets/utils.js';

export default {
  name: 'FunUISidebar',
  components: { FIcon },
  data() {
    return {
      isSwitchOn: true,
    };
  },
  props: {
    switchable: {
      type: Boolean,
      default: false,
    },
    position: {
      type: String,
      default: 'left',
      validator(prop) {
        return oneOf(prop, ['left', 'right']);
      },
    },
  },
  computed: {
    n2c() {
      return optionsName2ClassPrefix(this.$options.name);
    },
    iconName() {
      return this.position === 'left' ? 'right' : 'left';
    },
    iconClasses() {
      return [
        this.n2c('switch-icon', this.isSwitchOn ? 'switch-icon-reversed' : ''),
      ];
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

.sidebar-left-slide-enter-active {
  /* 0 to 100% */
  animation: sidebar-left-slide $duration;
}
.sidebar-left-slide-leave-active {
  /* 100% to 0 */
  animation: sidebar-left-slide $duration reverse;
}
@keyframes sidebar-left-slide {
  0% {
    margin-left: -100%;
  }
  100% {
    margin-left: 0;
  }
}

.sidebar-right-slide-enter-active {
  /* 0 to 100% */
  animation: sidebar-right-slide $duration;
}
.sidebar-right-slide-leave-active {
  /* 100% to 0 */
  animation: sidebar-right-slide $duration reverse;
}
@keyframes sidebar-right-slide {
  0% {
    margin-left: 100%;
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

    &-left {
      right: 0;
    }

    &-right {
      left: 0;
    }

    &-icon {
      margin: 0 0.5em;
      white-space: nowrap;
      transition: transform $duration linear;

      &-reversed {
        transform: rotate(180deg);
      }
    }
  }
}
</style>
