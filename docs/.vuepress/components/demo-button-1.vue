<template>
  <div class="demo-button-1 extra-margin">
    <f-button>default</f-button>

    <f-button type="primary">primary</f-button>
    <f-button type="info">info</f-button>
    <f-button type="success">success</f-button>
    <f-button type="warning">warning</f-button>
    <f-button type="danger">danger</f-button>

    <f-button round>round</f-button>

    <f-button small>small</f-button>

    <code-box>
      <pre>
        <code class="html">{{htmlCode}}</code>
      </pre>
    </code-box>
  </div>
</template>


<script>
import FButton from '../../../src/components/button/FButton.vue';
import CodeBox from './code-box.vue';
import removePrefixSpace from '../assets/js/remove-prefix-space.js';

export default {
  name: 'demo-button-1',
  components: { FButton, CodeBox },
  data() {
    return {
      htmlCode: removePrefixSpace(`
        <f-button>default</f-button>

        <f-button type="primary">primary</f-button>
        <f-button type="info">info</f-button>
        <f-button type="success">success</f-button>
        <f-button type="warning">warning</f-button>
        <f-button type="danger">danger</f-button>

        <f-button round>round</f-button>

        <f-button small>small</f-button>
      `),
    };
  },
};
</script>

<style lang="scss" scoped>
@import '../assets/style/_var.scss';
</style>
