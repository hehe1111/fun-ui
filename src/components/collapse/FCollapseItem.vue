<template>
  <div :class="n2c()" :data-name="name">
    <header :class="headerClasses" @click="toggleContent">
      <div :class="titleClasses">{{ title }}</div>
      <f-icon name="up" :class="n2c('icon')" />
    </header>
    <f-transition :duration="200">
      <div :class="n2c('content')" v-if="isOpened">
        <slot />
      </div>
    </f-transition>
  </div>
</template>

<script>
import FIcon from '../FIcon.vue';
import FTransition from '../FTransition.vue';
import { optionsName2ClassPrefix } from '../../assets/utils.js';

export default {
  name: 'FunUICollapseItem',
  components: { FIcon, FTransition },
  props: {
    title: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
  },
  inject: {
    eventBus: {
      from: 'eventBus',
      default: () => ({}),
    },
  },
  data() {
    return {
      isOpened: false,
    };
  },
  computed: {
    n2c() {
      return optionsName2ClassPrefix(this.$options.name);
    },
    headerClasses() {
      return [
        this.n2c('title-container'),
        { 'zero-border-bottom-radius': this.isOpened },
      ];
    },
    titleClasses() {
      return [this.n2c('title'), { [`${this.n2c('open')}`]: this.isOpened }];
    },
  },
  mounted() {
    this.eventBus.$on &&
      this.eventBus.$on('update:opened', items => {
        this.isOpened = items.indexOf(this.name) >= 0;
      });
  },
  methods: {
    toggleContent() {
      if (!this.eventBus.$emit) return;
      this.isOpened
        ? this.eventBus.$emit('removeOpenedItem', this.name)
        : this.eventBus.$emit('addOpenedItem', this.name);
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../../assets/_var.scss';

.f-collapse-item {
  &-title-container,
  &-content {
    padding: 0.5em;
  }

  &-title-container {
    border: 1px solid $borderColorLight;
    margin: -1px;
    display: flex;
    align-items: center;
    background-color: $lightGrey;
    &:hover {
      background-color: $hoverGrey;
    }
  }

  &-title {
    margin-right: 0.5em;
  }

  &-icon {
    margin-left: auto;
    flex-shrink: 0;
    transition: transform $duration linear;
  }

  &-open + &-icon {
    transform: rotate(180deg);
  }

  &:first-child {
    > .f-collapse-item-title-container {
      border-top-left-radius: $borderRadius;
      border-top-right-radius: $borderRadius;
    }
  }

  &:last-child {
    > .f-collapse-item-title-container {
      border-bottom-left-radius: $borderRadius;
      border-bottom-right-radius: $borderRadius;
    }
    > .f-collapse-item-title-container.zero-border-bottom-radius {
      border-bottom-left-radius: 0;
      border-bottom-right-radius: 0;
    }
  }
}
</style>
