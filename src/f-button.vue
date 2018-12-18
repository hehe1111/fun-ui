<template>
  <button class="f-button">按钮</button>
</template>

<script>
  export default {}
</script>

<style lang="scss">
.f-button {
  height: var(--button-height);
  font-size: var(--font-size);
  padding:0 1em;
  border-radius: var(--border-radius);
  border: 1px solid var(--border-color);
  background-color: var(--button-bg-color);

  &:hover {
    border-color: var(--border-hover-color);
  }
  &:active {
    background-color: var(--button-active-bg-color);
  }
  &:focus {
    outline: none;
  }
}
</style>
