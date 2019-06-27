<template>
  <div class="tab">
    <slot />
  </div>
</template>

<script>
import Vue from 'vue';

export default {
  name: 'FunUITab',
  props: {
    selected: {
      type: [String, Number],
      required: true,
    },
    direction: {
      type: String,
      default: 'horizontal',
      validator(value) {
        return ['horizontal', 'vertical'].indexOf(value) >= 0;
      },
    },
  },
  data() {
    return {
      eventBus: new Vue(),
    };
  },
  provide() {
    return {
      eventBus: this.eventBus,
    };
  },
  mounted() {
    this.checkChild();
    this.findSelectedNavItem();
    this.addClassToChildComponent();
    this.updateStyle();
  },
  methods: {
    checkChild() {
      if (this.$children.length === 0) {
        console &&
          console.warn &&
          console.warn('f-tab 的子组件应该是 f-tab-nav 和 f-tab-body');
      }
    },
    findSelectedNavItem() {
      this.$children.forEach(vm => {
        if (vm.$options.name === 'FunUITabNav') {
          vm.$children.forEach(navItem => {
            if (
              navItem.$options.name === 'FunUITabNavItem' &&
              navItem.name === this.selected
            ) {
              this.eventBus.$emit('update:selected', this.selected, navItem);
            }
          });
        }
      });
    },
    addClassToChildComponent() {
      this.$children.forEach(vm => {
        vm.$el.classList.add(this.direction);
      });
    },
    updateStyle() {
      if (this.direction === 'vertical') {
        this.$el.style.display = 'flex';
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
