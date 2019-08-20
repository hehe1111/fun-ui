<template>
  <div class="f-dropdown">
    <f-popover
      position="bottom"
      :content-container-style="{ padding: '4px 0' }"
      :content-style="{ padding: 0 }"
      ref="drownDownPopoverRef"
      :trigger="trigger"
    >
      <template slot="content">
        <slot name="dropdown" />
      </template>
      <template>
        <slot />
      </template>
    </f-popover>
  </div>
</template>

<script>
import Vue from 'vue';
import FPopover from '../FPopover.vue';
import { oneOf } from '../../assets/utils.js';

export default {
  name: 'FunUIDropdown',
  components: { FPopover },
  props: {
    hideOnClick: {
      type: Boolean,
      default: true,
    },
    trigger: {
      type: String,
      default: 'hover',
      validator(prop) {
        return oneOf(prop, ['click', 'hover']);
      },
    },
  },
  data() {
    return { eventBus: new Vue() };
  },
  provide() {
    return { eventBus: this.eventBus };
  },
  mounted() {
    this.checkDropdownSlots();
    this.listenToItems();
  },
  methods: {
    checkDropdownSlots() {
      const validity = this.$slots.dropdown.every(vnode => {
        return vnode.componentOptions.tag === 'f-dropdown-item';
      });
      if (!validity) {
        throw new Error(
          'Invalid slot. Slot content should be wrapped up by FDropdownItem component.'
        );
      }
    },
    listenToItems() {
      this.eventBus.$on('selected', () => {
        this.hideOnClick && this.$refs.drownDownPopoverRef.close();
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../../assets/_var.scss';
</style>
