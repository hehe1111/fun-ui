<template>
  <div class="demo-button-group extra-margin">
    <f-button-group>
      <f-button>按钮 1</f-button>
      <f-button>按钮 2</f-button>
      <f-button>按钮 3</f-button>
    </f-button-group>

    <code-box>
      <pre>
        <code class="html">{{htmlCode}}</code>
      </pre>
    </code-box>
  </div>
</template>


<script>
import FButton from '../../../src/components/button/FButton.vue';
import FButtonGroup from '../../../src/components/button/FButtonGroup.vue';
import CodeBox from '../components/code-box.vue';
import removePrefixSpace from '../assets/js/remove-prefix-space.js';

export default {
  name: 'demo-button-group',
  components: { FButton, FButtonGroup, CodeBox },
  data() {
    return {
      htmlCode: removePrefixSpace(`
        <f-button-group>
          <f-button>按钮 1</f-button>
          <f-button>按钮 2</f-button>
          <f-button>按钮 3</f-button>
        </f-button-group>
      `),
    };
  },
};
</script>

<style lang="scss" scoped>
@import '../assets/style/_var.scss';
</style>
