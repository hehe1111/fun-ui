<template>
  <div class="demo-input-1 extra-margin">
    <f-input class="input" v-model="value1" placeholder="请在此输入" />
    <div style="margin-bottom: 6px;">当前输入框内的内容：{{ value1 }}</div>
    <f-input class="input" placeholder="自动聚焦" auto-focus />
    <f-input class="input" value="只读" readonly />
    <f-input class="input" value="禁用" disabled />
    <f-input class="input" placeholder="可清除" clearable />
    <f-input class="input" value="成功" :hint="{type: 'success', message: '成功'}" />
    <f-input class="input" value="失败" :hint="{type: 'error', message: '失败'}" />
    <f-input class="input" value="警告" :hint="{type: 'warning', message: '警告'}" />
    <f-input class="input" value="消息" :hint="{type: 'info', message: '消息'}" />

    <code-box :htmlCode="htmlCode" :javascriptCode="javascriptCode" />
  </div>
</template>

<script>
import FInput from '../../../src/components/FInput.vue';

export default {
  name: 'demo-input-1',
  components: { FInput },
  data() {
    return {
      value1: '',

      htmlCode: `
        <f-input class="input" v-model="value1" placeholder="请在此输入" />
        <div style="margin-bottom: 6px;">当前输入框内的内容：{{ value }}</div>
        <f-input class="input" placeholder="自动聚焦" auto-focus />
        <f-input class="input" value="只读" readonly />
        <f-input class="input" value="禁用" disabled />
        <f-input class="input" placeholder="可清除" clearable />
        <f-input class="input" value="成功" :hint="{type: 'success', message: '成功'}" />
        <f-input class="input" value="失败" :hint="{type: 'error', message: '失败'}" />
        <f-input class="input" value="警告" :hint="{type: 'warning', message: '警告'}" />
        <f-input class="input" value="消息" :hint="{type: 'info', message: '消息'}" />
      `,
      javascriptCode: `
        data() {
          return {
            value1: '',
          };
        },
      `,
    };
  },
};
</script>

<style lang="scss" scoped>
@import '../assets/style/_var.scss';

.input {
  margin: 0.5em 0;
}
</style>
