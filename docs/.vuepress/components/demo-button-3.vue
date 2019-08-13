<template>
  <div class="demo-button-3 extra-margin">
    <f-button icon="setting" />
    <f-button icon="setting">默认图标位于左边</f-button>
    <f-button icon="setting" icon-position="right">图标可以位于右边</f-button>

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
  name: 'demo-button-3',
  components: { FButton },
  data() {
    return {
      htmlCode: removePrefixSpace(`
        <f-button icon="setting" />
        <f-button icon="setting">默认图标位于左边</f-button>
        <f-button icon="setting" icon-position="right">图标可以位于右边</f-button>
      `),
    };
  },
};
</script>

<style lang="scss" scoped>
@import '../assets/style/_var.scss';
</style>
