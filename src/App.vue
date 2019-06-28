<template>
  <div id="app">
    <div>App.vue test</div>
    <f-button>按钮</f-button>
    <f-button> <f-icon name="loading" />按钮 </f-button>
    <f-button>
      <f-icon name="left" />按钮
      <f-icon name="right" />
    </f-button>
    <br />
    <f-input value="这里是 value" />
    <f-input value="只读" readonly />
    <f-input value="禁止" disabled />
    <f-input value="禁止" clearable @click="value = ''" />
    <f-input value="禁止" error="这是错误信息" />
    <f-collapse :opened.sync="openedCollapseItems">
      <f-collapse-item name="xxx" title="标题1">内容1</f-collapse-item>
      <f-collapse-item name="yyy" title="标题2">内容2</f-collapse-item>
      <f-collapse-item name="ccc" title="标题3">内容3</f-collapse-item>
    </f-collapse>
    {{ openedCollapseItems }}
    <f-button @click="showPopover">点我 toast</f-button>
    <f-popover>
      <template slot="content"
        >悬浮气泡</template
      >
      <f-button>点我 popover</f-button>
    </f-popover>
  </div>
</template>

<script>
import Vue from 'vue';
import FButton from './components/FButton';
import FCollapse from './components/FCollapse';
import FCollapseItem from './components/FCollapseItem';
import FIcon from './components/FIcon';
import FInput from './components/FInput';
import FPopover from './components/FPopover';
import Plugin from './components/plugin';

Vue.use(Plugin);

export default {
  name: 'app',
  components: {
    FButton,
    FCollapse,
    FCollapseItem,
    FIcon,
    FInput,
    FPopover,
  },
  data() {
    return {
      openedCollapseItems: ['xxx', 'yyy'],
    };
  },
  methods: {
    showPopover() {
      this.$toast('<p id="testHTML" style="color: red">哈哈哈</p>', {
        autoCloseDelay: 300,
      });
    },
  },
};
</script>

<style lang="scss"></style>
