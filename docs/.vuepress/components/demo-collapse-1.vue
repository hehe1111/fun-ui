<template>
  <div class="demo-collapse-1 extra-margin">
    <f-collapse>
      <f-collapse-item title="标题1" name="c1">内容1</f-collapse-item>
      <f-collapse-item title="标题2" name="c2">内容2</f-collapse-item>
      <f-collapse-item title="标题3" name="c3">内容3</f-collapse-item>
    </f-collapse>

    <code-box :htmlCode="htmlCode" />
  </div>
</template>


<script>
import FCollapse from '../../../src/components/collapse/FCollapse.vue';
import FCollapseItem from '../../../src/components/collapse/FCollapseItem.vue';

export default {
  name: 'demo-collapse-1',
  components: { FCollapse, FCollapseItem },
  data() {
    return {
      htmlCode: `
        <f-collapse>
          <f-collapse-item title="标题1" name="c1">内容1</f-collapse-item>
          <f-collapse-item title="标题2" name="c2">内容2</f-collapse-item>
          <f-collapse-item title="标题3" name="c3">内容3</f-collapse-item>
        </f-collapse>
      `,
    };
  },
};
</script>

<style lang="scss" scoped>
@import '../assets/style/_var.scss';
</style>
