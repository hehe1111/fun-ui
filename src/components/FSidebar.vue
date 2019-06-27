<template>
  <div class="sidebar-container">
    <transition name="sidebar-slide">
      <div class="sidebar" v-if="isSwitchOn">
        <slot />
      </div>
    </transition>
    <button class="sidebar-switch" @click="toggleSwitch">
      {{ switchText }}
    </button>
  </div>
</template>

<script>
export default {
  name: 'FunUISidebar',
  data() {
    return {
      isSwitchOn: true,
      switchText: '<<',
    };
  },
  methods: {
    toggleSwitch() {
      this.isSwitchOn = !this.isSwitchOn;
      this.switchText = this.isSwitchOn ? '<<' : '>>';
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../assets/_var.scss';

.sidebar-container {
  display: flex;
}
.sidebar-switch {
  word-break: keep-all;
  flex-shrink: 1;
  height: 100%;
  padding: 0 2px;
  border: none;
  border-left: 1px solid #ccc;
  background-color: #fff;
}
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
</style>
