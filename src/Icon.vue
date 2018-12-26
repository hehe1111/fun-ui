<template>
  <svg class="icon" :class="name === 'loading' ? 'loading' : ''" aria-hidden="true">
    <use :xlink:href="`#icon-${name}`"></use>
  </svg>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      validator (value) {
        return (value ? true : false)
      },
    },
  }
}
</script>

<style lang="scss" scoped>
  .icon {
    width: 1em; height: 1em;
    vertical-align: -0.15em;
    fill: currentColor;
    overflow: hidden;
  }
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  .loading {
    animation: spin 1s infinite linear;
  }
</style>
