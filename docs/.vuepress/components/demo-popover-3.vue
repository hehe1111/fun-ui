<template>
  <div class="demo-popover-3 extra-margin">
    <f-popover>
      <template slot="content" slot-scope="{ close }">
        弹出内容
        <f-button @click="close">关闭</f-button>
      </template>
      <f-button>点我弹出</f-button>
    </f-popover>

    <f-popover>
      <template slot="content" slot-scope="{ close }">
        弹出内容弹出内容弹出内容弹出内容弹出内容弹出内容弹出内容弹出内容
        <f-button @click="close">关闭</f-button>
      </template>
      <f-button>多行文本</f-button>
    </f-popover>

    <code-box :code="{ html }" />
  </div>
</template>

<script>
import FPopover from '../../../src/components/FPopover.vue';
import FButton from '../../../src/components/button/FButton.vue';

export default {
  name: 'demo-popover-3',
  components: { FPopover, FButton },
  data() {
    return {
      html: `
        <f-popover>
          <template slot="content" slot-scope="{ close }">
            弹出内容
            <f-button @click="close">关闭</f-button>
          </template>
          <f-button>点我弹出</f-button>
        </f-popover>

        <f-popover>
          <template slot="content" slot-scope="{ close }">
            弹出内容弹出内容弹出内容弹出内容弹出内容弹出内容弹出内容弹出内容
            <f-button @click="close">关闭</f-button>
          </template>
          <f-button>多行文本</f-button>
        </f-popover>
      `,
    };
  },
};
</script>

<style lang="scss" scoped>
@import '../assets/style/_var.scss';
</style>
