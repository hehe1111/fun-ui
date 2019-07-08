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
      return {
        active: this.name === this.selected,
      };
    },
  },
  methods: {
    onClick() {
      // this.$emit('update:selected', this.name) 等同于 this.root.mutableSelected = this.name
      this.$emit('update:selected', this.name);
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

  &.active {
    background-color: $grey;
  }

  &:hover {
    background-color: $greyHover;
  }
}
</style>
