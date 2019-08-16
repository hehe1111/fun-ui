<template>
  <div class="demo-icon-3 extra-margin">
    <f-icon name="setting" color="red" />

    <code-box :htmlCode="htmlCode" />
  </div>
</template>


<script>
import FIcon from '../../../src/components/FIcon.vue';

export default {
  name: 'demo-icon-3',
  components: { FIcon },
  data() {
    return {
      htmlCode: `
        <f-icon name="setting" color="red" />
      `,
    };
  },
};
</script>

<style lang="scss" scoped>
@import '../assets/style/_var.scss';
</style>
