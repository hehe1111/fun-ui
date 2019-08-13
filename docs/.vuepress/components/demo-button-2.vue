<template>
  <div class="demo-button-2 extra-margin">
    <f-button disabled>禁用按钮</f-button>

    <code-box>
      <pre>
        <code class="html">{{htmlCode}}</code>
      </pre>
    </code-box>
  </div>
</template>


<script>
import FButton from '../../../src/components/button/FButton.vue';
import removePrefixSpace from '../assets/js/remove-prefix-space.js';

export default {
  name: 'demo-button-2',
  components: { FButton },
  data() {
    return {
      htmlCode: removePrefixSpace(`
        <f-button disabled>禁用按钮</f-button>
      `),
    };
  },
};
</script>

<style lang="scss" scoped>
@import '../assets/style/_var.scss';
</style>
