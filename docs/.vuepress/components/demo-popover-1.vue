<template>
  <div class="demo-popover-1">
    <f-popover>
      <template slot="content">弹出内容</template>
      <f-button>点我弹出</f-button>
    </f-popover>

    <f-popover>
      <template slot="content">最大宽度 20em最大宽度 20em最大宽度 20em最大宽度 20em最大宽度 20em</template>
      <f-button>多行文本</f-button>
    </f-popover>

    <code-box>
      <pre>
        <code class="html">{{htmlCode}}</code>
      </pre>
    </code-box>
  </div>
</template>

<script>
import FPopover from '../../../src/components/FPopover.vue';
import FButton from '../../../src/components/button/FButton.vue';
import CodeBox from './code-box.vue';
import removePrefixSpace from '../assets/js/remove-prefix-space.js';

export default {
  name: 'demo-popover-1',
  components: { FPopover, FButton, CodeBox },
  data() {
    return {
      htmlCode: removePrefixSpace(`
        <f-popover>
          <template slot="content">弹出内容</template>
          <f-button>点我弹出</f-button>
        </f-popover>

        <f-popover>
          <template slot="content">
            最大宽度 20em最大宽度 20em最大宽度 20em最大宽度 20em最大宽度 20em
          </template>
          <f-button>多行文本</f-button>
        </f-popover>
      `),
    };
  },
};
</script>

<style lang="scss" scoped>
@import '../assets/style/_var.scss';
</style>
