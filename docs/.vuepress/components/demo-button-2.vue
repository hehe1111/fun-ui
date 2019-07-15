<template>
  <div class="demo-button-1">
    <div class="demo-button-1-1">
      <f-button-group>
        <f-button>按钮 1</f-button>
        <f-button>按钮 2</f-button>
        <f-button>按钮 3</f-button>
        <f-button>按钮 4</f-button>
        <f-button>按钮 5</f-button>
      </f-button-group>
    </div>

    <div class="demo-button-1-2">
      <f-button-group>
        <f-button disabled>按钮 1</f-button>
        <f-button>按钮 2</f-button>
        <f-button disabled>按钮 3</f-button>
        <f-button>按钮 4</f-button>
        <f-button disabled>按钮 5</f-button>
      </f-button-group>
    </div>

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
import FButtonGroup from '../../../src/components/button/FButtonGroup.vue';
import CodeBox from '../components/code-box.vue';
import removePrefixSpace from '../assets/js/remove-prefix-space.js';

export default {
  name: 'demo-button-2',
  data() {
    return {
      htmlCode: removePrefixSpace(`
        <f-button-group>
          <f-button>按钮 1</f-button>
          <f-button>按钮 2</f-button>
          <f-button>按钮 3</f-button>
          <f-button>按钮 4</f-button>
          <f-button>按钮 5</f-button>
        </f-button-group>

        <f-button-group>
          <f-button disabled>按钮 1</f-button>
          <f-button>按钮 2</f-button>
          <f-button disabled>按钮 3</f-button>
          <f-button>按钮 4</f-button>
          <f-button disabled>按钮 5</f-button>
        </f-button-group>
      `),
    };
  },
  components: { FIcon, FButton, FButtonGroup, CodeBox },
};
</script>

<style lang="scss" scoped>
@import '../assets/style/_var.scss';

.demo-button-1,
.demo-button-1-1,
.demo-button-1-2 {
  @extend .extra-margin;
}
</style>
