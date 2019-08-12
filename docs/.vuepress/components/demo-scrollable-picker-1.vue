<template>
  <div class="demo-scrollable-picker-1 extra-margin">
    <f-scrollable-picker
      :width-and-height="{ width: '4em', height: '14em' }"
      :selected.sync="selected"
      :values="range(1, 20)"
    />

    <code-box>
      <pre>
        <code class="html">{{htmlCode}}</code>
        <code class="javascript">{{javascriptCode}}</code>
      </pre>
    </code-box>
  </div>
</template>

<script>
import FScrollablePicker from '../../../src/components/FScrollablePicker.vue';
import { range } from '../../../src/assets/utils.js';
import CodeBox from '../components/code-box.vue';
import removePrefixSpace from '../assets/js/remove-prefix-space.js';

export default {
  name: 'demo-scrollable-picker-1',
  components: { FScrollablePicker },
  data() {
    return {
      selected: 10,
      range,

      htmlCode: removePrefixSpace(`
        <f-scrollable-picker
          :width-and-height="{ width: '4em', height: '14em' }"
          :selected.sync="selected"
          :values="range(1, 20)"
        />
      `),
      javascriptCode: removePrefixSpace(`
        data() {
          return {
            selected: 10,
            range,
          };
        },
      `),
    };
  },
};
</script>

<style lang="scss" scoped>
@import '../assets/style/_var.scss';
</style>
