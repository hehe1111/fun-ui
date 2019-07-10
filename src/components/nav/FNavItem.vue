<template>
  <div class="f-nav-item" :class="classes" @click="onClick" ref="navItemRef">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'FunUINavItem',
  props: {
    name: {
      type: String,
      required: true,
    },
  },
  inject: {
    root: {
      from: 'root',
      default: () => ({}),
    },
    vertical: {
      from: 'vertical',
      default: false,
    },
  },
  data() {
    return {
      selected: null,
    };
  },
  mounted() {
    this.updateRootNavItems();
  },
  watch: {
    selected(newValue, oldValue) {
      // 只在第一次更新后执行一次
      !oldValue && newValue === this.name && this.updateRootNamePath();
    },
  },
  computed: {
    classes() {
      const { namePath } = this.root;
      return {
        vertical: this.vertical,
        active:
          this.name === this.selected ||
          (namePath && namePath.indexOf(this.name) >= 0),
      };
    },
  },
  methods: {
    updateRootNavItems() {
      const { getNavItems } = this.root;
      getNavItems && typeof getNavItems === 'function' && getNavItems(this);
    },
    onClick($event) {
      // this.$emit('update:selected', this.name) 等同于 this.root.mutableSelected = this.name
      this.$emit('update:selected', this.name);
      this.updateIfNotTitleAndNotInNamePath();
      this.hijackClickEvent($event);
    },
    updateIfNotTitleAndNotInNamePath() {
      this.root.titleNavItems.map(vm => vm.name).indexOf(this.name) === -1 &&
        this.root.namePath.indexOf(this.name) === -1 &&
        this.updateRootNamePath();
    },
    updateRootNamePath() {
      this.root.namePath = [];
      const fn = this.$parent.updateRootNamePath;
      fn && typeof fn === 'function' && fn();
    },
    hijackClickEvent($event) {
      $event.target.contains(this.$refs.navItemRef) &&
        this.$slots.default.length === 1 &&
        this.$slots.default[0].elm.nodeType === Node.ELEMENT_NODE &&
        this.$slots.default[0].elm.click();
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../../assets/_var.scss';

.f-nav-item {
  white-space: nowrap;
  padding: 0.5em 1em;
  user-select: none;
  cursor: pointer;
  position: relative;
  transition: all $duration;
  min-width: 6em;
  display: flex;
  // justify-content: center;
  align-items: center;

  &.active,
  &:hover {
    color: $blue;
  }

  &:hover {
    background-color: $grey;
  }

  // 纵向时，选中项「不加」高亮下划线
  &.vertical {
    &.active::after {
      display: none;
    }
  }
}
</style>
