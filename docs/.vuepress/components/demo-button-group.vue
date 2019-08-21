<template>
  <div class="demo-button-group extra-margin">
    <f-button-group>
      <f-button>按钮 1</f-button>
      <f-button>按钮 2</f-button>
      <f-button>按钮 3</f-button>
    </f-button-group>

    <code-box :code="{ html }" />
  </div>
</template>

<script>
import FButton from '../../../src/components/button/FButton.vue';
import FButtonGroup from '../../../src/components/button/FButtonGroup.vue';

export default {
  name: 'demo-button-group',
  components: { FButton, FButtonGroup },
  data() {
    return {
      html: `
        <f-button-group>
          <f-button>按钮 1</f-button>
          <f-button>按钮 2</f-button>
          <f-button>按钮 3</f-button>
        </f-button-group>
      `,
    };
  },
};
</script>

<style lang="scss" scoped>
@import '../assets/style/_var.scss';
</style>
