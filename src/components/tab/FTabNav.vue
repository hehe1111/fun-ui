<template>
  <div :class="n2c()">
    <slot />
    <div :class="n2c('slideable-line')" ref="slideableLine"></div>
    <div v-if="actions.length !== 0" :class="n2c('actions-container')">
      <f-button-group>
        <f-button
          v-for="obj in actions"
          :key="obj.text"
          @click="obj.callback"
          :small="obj.small"
        >
          <span>{{ obj.text }}</span>
        </f-button>
      </f-button-group>
    </div>
  </div>
</template>

<script>
import FButtonGroup from '../button/FButtonGroup.vue';
import FButton from '../button/FButton.vue';
import {
  optionsName2ClassPrefix,
  oneOf,
  getTypeOf,
} from '../../assets/utils.js';

const actionValidator = prop => {
  return prop.every(obj => {
    return Object.keys(obj).every(k => {
      if (oneOf(k, ['callback', 'text', 'small'])) {
        if (oneOf(k, ['callback', 'text'])) {
          return (
            getTypeOf(obj.callback) === 'function' &&
            getTypeOf(obj.text) === 'string'
          );
        } else {
          return true;
        }
      } else {
        return false;
      }
    });
  });
};

export default {
  name: 'FunUITabNav',
  components: { FButtonGroup, FButton },
  inject: {
    eventBus: {
      from: 'eventBus',
      default: () => ({}),
    },
  },
  props: {
    actions: {
      type: Array,
      default: () => [],
      validator: actionValidator,
    },
  },
  computed: {
    n2c() {
      return optionsName2ClassPrefix(this.$options.name);
    },
  },
  mounted() {
    this.getSlideableLineStyle();
  },
  methods: {
    getSlideableLineStyle() {
      // emit from FTab or FTabNavItem
      this.eventBus.$on &&
        this.eventBus.$on('update:selected', ({ vm }) => {
          // wait for vm to finish updating
          this.$nextTick(() => {
            const { width, left, height, top } = vm.$el.getBoundingClientRect();
            const {
              left: parentLeft,
              top: parentTop,
            } = this.$el.getBoundingClientRect();
            if (!this.$refs.slideableLine) return;
            const { style } = this.$refs.slideableLine;
            if (this.$el.classList.contains('horizontal')) {
              style.width = `${width}px`;
              style.left = `${left - parentLeft}px`;
            } else {
              style.height = `${height}px`;
              style.top = `${top - parentTop}px`;
            }
          });
        });
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../../assets/_var.scss';
@import './_common.scss';

.f-tab-nav {
  position: relative;
  border-style: solid;
  border-color: $borderColorLight;
  border-width: 0;

  &-slideable-line {
    background-color: $blue;
    border-radius: $slideableLineWidth;
    transition: all $duration;
  }
  &-actions-container {
    flex-shrink: 0;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  // tab horizontal (css class from FTab)
  &.horizontal {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    border-bottom-width: $slideableLineWidth;
    > .f-tab-nav-slideable-line {
      height: $slideableLineWidth;
      position: absolute;
      top: 100%;
    }
    > .f-tab-nav-actions-container {
      margin-left: auto;
    }
  }
  // tab vertical (css class from FTab)
  &.vertical {
    display: block;
    border-right-width: $slideableLineWidth;
    > .f-tab-nav-slideable-line {
      width: $slideableLineWidth;
      position: absolute;
      left: 100%;
    }

    // style for FTabNavItem
    /deep/ .f-tab-nav-item {
      @extend .item-style-winthin-tab-nav;

      &-disabled {
        @extend .none-border;
      }
    }
  }
}
</style>
