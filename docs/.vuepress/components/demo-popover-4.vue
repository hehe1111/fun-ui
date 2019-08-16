<template>
  <div class="demo-popover-4 extra-margin">
    <f-popover trigger="hover">
      <template slot="content">弹出内容</template>
      <f-button>鼠标悬浮弹出</f-button>
    </f-popover>

    <f-popover trigger="hover">
      <template slot="content">弹出内容弹出内容弹出内容弹出内容弹出内容弹出内容弹出内容弹出内容</template>
      <f-button>多行文本</f-button>
    </f-popover>

    <f-popover trigger="hover">
      <template slot="content" slot-scope="{ close }">
        弹出内容
        <f-button @click="close">关闭</f-button>
      </template>
      <f-button>气泡内含有关闭按钮</f-button>
    </f-popover>

    <code-box :htmlCode="htmlCode" />
  </div>
</template>

<script>
import FPopover from '../../../src/components/FPopover.vue';
import FButton from '../../../src/components/button/FButton.vue';

export default {
  name: 'demo-popover-4',
  components: { FPopover, FButton },
  data() {
    return {
      htmlCode: `
        <f-popover trigger="hover">
          <template slot="content">弹出内容</template>
          <f-button>鼠标悬浮弹出</f-button>
        </f-popover>

        <f-popover trigger="hover">
          <template slot="content">
            弹出内容弹出内容弹出内容弹出内容弹出内容弹出内容弹出内容弹出内容
          </template>
          <f-button>多行文本</f-button>
        </f-popover>

        <f-popover trigger="hover">
          <template slot="content" slot-scope="{ close }">
            弹出内容
            <f-button @click="close">关闭</f-button>
          </template>
          <f-button>气泡内含有关闭按钮</f-button>
        </f-popover>
      `,
    };
  },
};
</script>

<style lang="scss" scoped>
@import '../assets/style/_var.scss';
</style>
