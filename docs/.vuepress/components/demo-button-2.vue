<template>
  <div class="demo-button-2 extra-margin">
    <f-button disabled>禁用按钮</f-button>

    <code-box :htmlCode="htmlCode" />
  </div>
</template>


<script>
import FButton from '../../../src/components/button/FButton.vue';

export default {
  name: 'demo-button-2',
  components: { FButton },
  data() {
    return {
      htmlCode: `
        <f-button disabled>禁用按钮</f-button>
      `,
    };
  },
};
</script>

<style lang="scss" scoped>
@import '../assets/style/_var.scss';
</style>
