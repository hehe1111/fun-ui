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
  computed: {
    classes() {
      const { namePath } = this.root;
      return {
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
  justify-content: center;
  align-items: center;

  &.active {
    color: $blue;

    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      border-bottom: 2px solid $blue;
    }
  }

  &:hover {
    background-color: $grey;
  }
}
</style>
