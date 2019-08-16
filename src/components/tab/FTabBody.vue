<template>
  <div class="f-tab-body">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'FunUITabBody',
};
</script>

<style lang="scss" scoped>
@import '../../assets/_var.scss';

.f-tab-body {
  flex: 1;
}
</style>
