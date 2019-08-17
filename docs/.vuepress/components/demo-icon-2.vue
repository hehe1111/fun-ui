<template>
  <div class="demo-icon-2 extra-margin">
    <f-icon name="setting" size="2em" />

    <code-box :htmlCode="htmlCode" />
  </div>
</template>

<script>
import FIcon from '../../../src/components/FIcon.vue';

export default {
  name: 'demo-icon-2',
  components: { FIcon },
  data() {
    return {
      htmlCode: `
        <f-icon name="setting" size="2em" />
      `,
    };
  },
};
</script>

<style lang="scss" scoped>
@import '../assets/style/_var.scss';
</style>
