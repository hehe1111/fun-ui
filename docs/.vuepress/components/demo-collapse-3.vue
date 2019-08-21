<template>
  <div class="demo-collapse-3 extra-margin">
    <div style="margin-bottom: 1em;">当前被打开的 item：{{ opened }}</div>
    <f-collapse :opened.sync="opened">
      <f-collapse-item title="标题1" name="c1">内容1</f-collapse-item>
      <f-collapse-item title="标题2" name="c2">内容2</f-collapse-item>
      <f-collapse-item title="标题3" name="c3">内容3</f-collapse-item>
    </f-collapse>

    <code-box :code="{ html, javascript }" />
  </div>
</template>

<script>
import FCollapse from '../../../src/components/collapse/FCollapse.vue';
import FCollapseItem from '../../../src/components/collapse/FCollapseItem.vue';

export default {
  name: 'demo-collapse-3',
  components: { FCollapse, FCollapseItem },
  data() {
    return {
      opened: ['c2'],

      html: `
        <div style="margin-bottom: 1em;">当前被打开的 item：{{ opened }}</div>
        <f-collapse :opened.sync="opened">
          <f-collapse-item title="标题1" name="c1">内容1</f-collapse-item>
          <f-collapse-item title="标题2" name="c2">内容2</f-collapse-item>
          <f-collapse-item title="标题3" name="c3">内容3</f-collapse-item>
        </f-collapse>
      `,
      javascript: `
        data() {
          return {
            opened: ['c2'],
          };
        },
      `,
    };
  },
};
</script>

<style lang="scss" scoped>
@import '../assets/style/_var.scss';
</style>
