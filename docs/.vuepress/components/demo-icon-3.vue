<template>
  <div class="demo-icon-3 extra-margin">
    <f-icon name="setting" color="red" />

    <code-box>
      <pre>
        <code class="html">{{htmlCode}}</code>
      </pre>
    </code-box>
  </div>
</template>


<script>
import FIcon from '../../../src/components/FIcon.vue';
import CodeBox from './code-box.vue';
import removePrefixSpace from '../assets/js/remove-prefix-space.js';

export default {
  name: 'demo-icon-3',
  components: { FIcon },
  data() {
    return {
      htmlCode: removePrefixSpace(`
        <f-icon name="setting" color="red" />
      `),
    };
  },
};
</script>

<style lang="scss" scoped>
@import '../assets/style/_var.scss';
</style>
