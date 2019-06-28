<template>
  <div class="collapse-item" :data-name="name">
    <header class="title" :class="classes" @click="toggleContent">
      {{ title }}
    </header>
    <div class="content" v-if="isOpened">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: 'FunUICollapseItem',
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
      default: () => {},
    },
  },
  data() {
    return {
      isOpened: false,
    };
  },
  computed: {
    classes() {
      return {
        'zero-border-bottom-radius': this.isOpened,
      };
    },
  },
  mounted() {
    this.eventBus.$on('update:opened', items => {
      this.isOpened = items.indexOf(this.name) >= 0;
    });
  },
  methods: {
    toggleContent() {
      this.isOpened
        ? this.eventBus.$emit('removeOpenedItem', this.name)
        : this.eventBus.$emit('addOpenedItem', this.name);
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../assets/_var.scss';

.collapse-item {
  > .title,
  > .content {
    padding: 0.5em;
  }
  > .title:hover {
    background-color: $greyHover;
  }
  > .title {
    border: 1px solid $borderColorLight;
    margin: -1px;
    display: flex;
    align-items: center;
    background-color: $grey;
  }
  &:first-child {
    > .title {
      border-top-left-radius: $borderRadius;
      border-top-right-radius: $borderRadius;
    }
  }
  &:last-child {
    > .title {
      border-bottom-left-radius: $borderRadius;
      border-bottom-right-radius: $borderRadius;
    }
    > .title.zero-border-bottom-radius {
      border-bottom-left-radius: 0;
      border-bottom-right-radius: 0;
    }
  }
}
</style>
