<template>
  <div :class="classes">
    <div :class="[n2c(), state]">
      <div :class="n2c('message-container')" ref="messageContainer">
        <div v-if="!enableHTML">{{ message }}</div>
        <div v-else v-html="message"></div>
      </div>
      <div
        v-if="closeIcon"
        :class="n2c('close-icon-container')"
        @click="onClickCloseIcon"
      >
        <f-icon name="cross" :class="n2c('close-icon')" />
      </div>
    </div>
  </div>
</template>

<script>
import FIcon from './FIcon.vue';
import { optionsName2ClassPrefix, oneOf } from '../assets/utils.js';

export default {
  name: 'FunUIToast',
  components: { FIcon },
  props: {
    message: {
      type: String,
    },
    autoCloseDelay: {
      type: Number,
      default: 3,
    },
    closeIcon: {
      type: Boolean,
      default: false,
    },
    onClose: {
      type: Function,
      default: () => () => {},
    },
    enableHTML: {
      type: Boolean,
      default: false,
    },
    position: {
      type: String,
      default: 'top',
      validator(value) {
        return ['top', 'middle', 'bottom'].indexOf(value) >= 0;
      },
    },
    state: {
      type: String,
      default: 'default',
      validator(prop) {
        return oneOf(prop, [
          'default',
          'success',
          'error',
          'warning',
          'primary',
        ]);
      },
    },
  },
  computed: {
    n2c() {
      return optionsName2ClassPrefix(this.$options.name);
    },
    classes() {
      return [this.n2c('container'), { [`position-${this.position}`]: true }];
    },
  },
  mounted() {
    this.handleAutoClose();
  },
  methods: {
    handleAutoClose() {
      setTimeout(() => this.close(), this.autoCloseDelay * 1000);
    },
    close() {
      this.$el.remove();
      this.$emit('close'); // for toast.js
      this.onClose && this.onClose();
      this.$destroy();
    },
    onClickCloseIcon() {
      this.close();
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../assets/_var.scss';

@keyframes slide-down {
  // 必须写百分号
  0% {
    transform: translateY(-100%);
  }
  100% {
    transform: translateY(0);
  }
}
@keyframes fade-in {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
@keyframes slide-up {
  0% {
    transform: translateY(100%);
  }
  100% {
    transform: translateY(0);
  }
}

.f-toast {
  &-container {
    // 外层做定位居中
    position: fixed;
    left: 50%;
    transform: translateX(-50%);
    z-index: 100;
    &.position-top {
      top: 0;
      & > .f-toast {
        // 内层做动画
        margin-top: 1em;
        animation: slide-down $duration;
      }
    }
    &.position-middle {
      top: 50%;
      transform: translate(-50%, -50%);
      > .f-toast {
        animation: fade-in $duration;
      }
    }
    &.position-bottom {
      bottom: 0;
      > .f-toast {
        margin-bottom: 1em;
        animation: slide-up $duration;
      }
    }
  }

  & {
    width: 300px;
    font-size: $fontSize;
    line-height: 1.6;
    border-radius: 6px;
    box-shadow: 0 0 5px 0 $boxShadowColor;
    color: #fff;
    display: flex;
    align-items: center;

    &.default {
      background-color: $toastBg;
    }
    &.success {
      background-color: $green;
    }
    &.error {
      background-color: $red;
    }
    &.warning {
      background-color: $yellow;
    }
    &.primary {
      background-color: $blue;
    }
  }

  &-message-container {
    padding: 1em;
    > div {
      word-break: break-all;
    }
  }

  &-close-icon-container {
    @extend .flex-center;
    padding-right: 1em;
    margin-left: auto;
    align-self: stretch;
  }

  &-close-icon {
    fill: #fff;
    flex-shrink: 0;
  }
}
</style>
