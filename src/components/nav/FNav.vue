<template>
  <div class="f-nav" :class="{ vertical }">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'FunUINav',
  props: {
    selected: String,
    vertical: {
      type: Boolean,
      default: false,
    },
    trigger: {
      type: String,
      default: 'hover',
    },
  },
  data() {
    return {
      mutableSelected: '',
      navItems: [], // 所有后代 item
      titleNavItems: [], // 仅限子菜单的 title item
      namePath: [], // 记录通往「被选中项」的上层路径
    };
  },
  provide() {
    return {
      // 法一：用 new Vue() 做 eventBus
      // 法二：直接将当前组件实例 this 提供给其后代组件（如下）
      root: this,
      vertical: this.vertical,
      trigger: this.trigger,
    };
  },
  created() {
    this.mutableSelected = this.selected;
  },
  mounted() {
    this.checkChildren();
    this.updateChildren();
    this.listenToChildren();
  },
  methods: {
    getNavItems(vm) {
      this.navItems.push(vm);
    },
    getTitleNavItems(vm) {
      this.titleNavItems.push(vm);
    },
    checkChildren() {
      this.$children.forEach(vm => {
        if (['FunUINavItem', 'FunUISubNav'].indexOf(vm.$options.name) === -1) {
          throw new Error('FNav 组件的子组件只能是 FNavItem 或 FSubNav 组件');
        }
      });
    },
    listenToChildren() {
      this.navItems.map(vm => {
        // vm 监听 vm 自身触发的事件
        vm.$on('update:selected', $event => {
          if (this.titleNavItems.map(vm => vm.name).indexOf($event) === -1) {
            this.mutableSelected = $event;
          }
        });
      });
    },
    updateChildren() {
      this.navItems.forEach(vm => (vm.selected = this.mutableSelected));
    },
  },
  watch: {
    mutableSelected(newValue, oldValue) {
      this.$emit('update:selected', newValue);
      this.updateChildren();
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../../assets/_var.scss';

.f-nav {
  display: flex;
  border-bottom: 1px solid $borderColorLight;

  // 纵向样式
  &.vertical {
    display: inline-flex;
    flex-direction: column;
    border: 1px solid $borderColorLight;
  }
}

/* 选中项高亮下划线样式 */
// 横向时，顶层栏选中项「加」高亮下划线
.f-nav > .f-nav-item.active::after {
  content: '';
  @extend .selectedItemBlueBorderBottom;
}
</style>
