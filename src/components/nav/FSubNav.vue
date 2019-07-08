<template>
  <div class="f-sub-nav-container" @click="toggle">
    <f-nav-item :name="name">
      <slot name="title" />
    </f-nav-item>
    <!-- 用 v-show 以便从一开始就能获取到所有后代子组件 -->
    <div class="f-sub-nav" v-show="isSubNavVisible">
      <slot />
    </div>
  </div>
</template>

<script>
import FNavItem from './FNavItem.vue';

export default {
  name: 'FunUISubNav',
  props: {
    name: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      selected: null,
      isSubNavVisible: false,
    };
  },
  methods: {
    toggle() {
      this.isSubNavVisible = !this.isSubNavVisible;
    },
  },
  components: { FNavItem },
};
</script>

<style lang="scss" scoped>
@import '../../assets/_var.scss';

.f-sub-nav-container {
  position: relative;

  > .f-sub-nav {
    position: absolute;
    top: 100%;
    left: 0;
    margin-top: 4px;
    box-shadow: 0 0 3px 0 $boxShadowColor;
    background-clip: content-box;
  }
}
</style>
