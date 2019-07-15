<template>
  <div class="demo-button-2">
    <f-button>按钮 1</f-button>
    <f-button disabled>禁止按钮 2</f-button>
    <f-button>
      <f-icon name="loading" />按钮 3
    </f-button>
    <f-button>
      <f-icon name="left" />按钮 4
      <f-icon name="right" />
    </f-button>
    <f-button icon="setting">按钮 5</f-button>
    <f-button icon="setting" icon-position="right">按钮 6</f-button>

    <code-box>
      <pre>
        <code class="html">{{htmlCode}}</code>
      </pre>
    </code-box>
  </div>
</template>


<script>
import FIcon from '../../../src/components/FIcon.vue';
import FButton from '../../../src/components/button/FButton.vue';
import CodeBox from './code-box.vue';
import removePrefixSpace from '../assets/js/remove-prefix-space.js';

export default {
  name: 'demo-button-1',
  data() {
    return {
      htmlCode: removePrefixSpace(`
        <f-button>按钮 1</f-button>
        <f-button disabled>禁止按钮 2</f-button>
        <f-button>
          <f-icon name="loading" />按钮 3
        </f-button>
        <f-button>
          <f-icon name="left" />按钮 4
          <f-icon name="right" />
        </f-button>
        <f-button icon="setting">按钮 5</f-button>
        <f-button icon="setting" icon-position="right">按钮 6</f-button>
      `),
    };
  },
  components: { FIcon, FButton, CodeBox },
};
</script>

<style lang="scss" scoped>
@import '../assets/style/_var.scss';

.demo-button-2 {
  @extend .extra-margin;
}
</style>
