<template>
  <button class="f-button">
    <svg class="icon" :class="{[`icon-${iconPosition}`]: true}" aria-hidden="true" v-if="icon">
      <use :xlink:href="`#icon-${icon}`"></use>
    </svg>
    <slot></slot>
  </button>
</template>

<script>
  export default {
    props: {
      icon: {
        type: String,
      },
      'iconPosition': {
        type: String,
        default: 'left',
        validator (value) { return value === 'left' || value === 'right' },
      },
    }
  }
</script>

<style lang="scss">
.f-button {
  height: var(--button-height);
  font-size: var(--font-size);
  padding: 0 1em;
  border-radius: var(--border-radius);
  border: 1px solid var(--border-color);
  background-color: var(--button-bg-color);
  display: inline-flex;
  justify-content: center;
  align-items: center;
  // top/middle/bottom/text-top/text-bottom/-webkit-baseline-middle 都可以解决 inline 对不齐的 bug
  vertical-align: middle;

  &:hover { border-color: var(--border-hover-color); }
  &:active { background-color: var(--button-active-bg-color); }
  &:focus { outline: none; }
  &>.icon { margin-right: 6px;  }
  // order 默认为 0
  &>.icon-right { margin-left: 6px; margin-right: 0; order: 1; }
}
</style>
