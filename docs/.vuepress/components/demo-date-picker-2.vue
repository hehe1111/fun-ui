<template>
  <div class="demo-date-picker-2 extra-margin">
    <f-date-picker v-model="value" start-week-on="0" />

    <code-box>
      <pre>
        <code class="html">{{htmlCode}}</code>
        <code class="javascript">{{javascriptCode}}</code>
      </pre>
    </code-box>
  </div>
</template>

<script>
import FDatePicker from '../../../src/components/FDatePicker.vue';
import CodeBox from '../components/code-box.vue';
import removePrefixSpace from '../assets/js/remove-prefix-space.js';

export default {
  name: 'demo-date-picker-2',
  data() {
    return {
      value: new Date(),

      htmlCode: removePrefixSpace(`
        <f-date-picker v-model="value" start-week-on="0" />
      `),
      javascriptCode: removePrefixSpace(`
        data() {
          return {
            value: new Date(),
          };
        },
      `),
    };
  },
  components: { FDatePicker },
};
</script>

<style lang="scss" scoped>
@import '../assets/style/_var.scss';
</style>
