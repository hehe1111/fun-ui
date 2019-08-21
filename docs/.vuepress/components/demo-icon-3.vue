<template>
  <div class="demo-icon-3 extra-margin">
    <f-icon name="setting" color="red" />

    <code-box :code="{ html }" />
  </div>
</template>

<script>
import FIcon from '../../../src/components/FIcon.vue';

export default {
  name: 'demo-icon-3',
  components: { FIcon },
  data() {
    return {
      html: `
        <f-icon name="setting" color="red" />
      `,
    };
  },
};
</script>

<style lang="scss" scoped>
@import '../assets/style/_var.scss';
</style>
