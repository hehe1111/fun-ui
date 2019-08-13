<template>
  <div class="demo-popover-1">
    <f-popover>
      <template slot="content">弹出内容</template>
      <f-button>默认向上弹出</f-button>
    </f-popover>
    <f-popover position="bottom">
      <template slot="content">弹出内容</template>
      <f-button>向下弹出</f-button>
    </f-popover>
    <f-popover position="left">
      <template slot="content">弹出内容</template>
      <f-button>向左弹出</f-button>
    </f-popover>
    <f-popover position="right">
      <template slot="content">弹出内容</template>
      <f-button>向右弹出</f-button>
    </f-popover>

    <f-popover position="right">
      <template slot="content">弹出内容弹出内容弹出内容弹出内容弹出内容弹出内容弹出内容弹出内容弹出内容弹出内容弹出内容</template>
      <f-button>向右弹出多行文本</f-button>
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
import removePrefixSpace from '../assets/js/remove-prefix-space.js';

export default {
  name: 'demo-popover-2',
  components: { FPopover, FButton },
  data() {
    return {
      htmlCode: removePrefixSpace(`
        <f-popover>
          <template slot="content">弹出内容</template>
          <f-button>默认向上弹出</f-button>
        </f-popover>
        <f-popover position="bottom">
          <template slot="content">弹出内容</template>
          <f-button>向下弹出</f-button>
        </f-popover>
        <f-popover position="left">
          <template slot="content">弹出内容</template>
          <f-button>向左弹出</f-button>
        </f-popover>
        <f-popover position="right">
          <template slot="content">弹出内容</template>
          <f-button>向右弹出</f-button>
        </f-popover>

        <f-popover position="right">
          <template slot="content">
            弹出内容弹出内容弹出内容弹出内容弹出内容弹出内容弹出内容弹出内容弹出内容弹出内容弹出内容
          </template>
          <f-button>向右弹出多行文本</f-button>
        </f-popover>
      `),
    };
  },
};
</script>

<style lang="scss" scoped>
@import '../assets/style/_var.scss';
</style>
