<template>
  <div class="f-nav-item" :class="classes" @click="onClick">
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
    this.root.getNavItems &&
      typeof this.root.getNavItems === 'function' &&
      this.root.getNavItems(this);
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
    onClick() {
      // this.$emit('update:selected', this.name) 等同于 this.root.mutableSelected = this.name
      this.$emit('update:selected', this.name);
      this.updateRootNamePath();
    },
    updateRootNamePath() {
      this.root.namePath = [];
      const fn = this.$parent.updateRootNamePath;
      fn && typeof fn === 'function' && fn();
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

  &.active {
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