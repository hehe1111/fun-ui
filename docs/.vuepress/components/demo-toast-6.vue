<template>
  <div class="demo-toast-2 extra-margin">
    <f-button @click="showToastDefault">Default</f-button>
    <f-button @click="showToastSuccess">Success</f-button>
    <f-button @click="showToastWarning">Warning</f-button>
    <f-button @click="showToastError">Error</f-button>
    <f-button @click="showToastPrimary">Primary</f-button>

    <code-box>
      <pre>
        <code class="html">{{htmlCode}}</code>
        <code class="javascript">{{javascriptCode}}</code>
      </pre>
    </code-box>
  </div>
</template>


<script>
import Vue from 'vue';
import FButton from '../../../src/components/button/FButton.vue';
import toast from '../../../src/plugins/toast.js';
import removePrefixSpace from '../assets/js/remove-prefix-space.js';
Vue.use(toast);

export default {
  name: 'demo-toast-2',
  components: { FButton },
  data() {
    return {
      htmlCode: removePrefixSpace(`
        <f-button @click="showToastDefault">Default</f-button>
        <f-button @click="showToastSuccess">Success</f-button>
        <f-button @click="showToastWarning">Warning</f-button>
        <f-button @click="showToastError">Error</f-button>
        <f-button @click="showToastPrimary">Primary</f-button>
      `),
      javascriptCode: removePrefixSpace(`
        methods: {
          showToastDefault() {
            this.$toast('I am Default.');
          },
          showToastSuccess() {
            this.$toast('I am Success.', { state: 'success' });
          },
          showToastWarning() {
            this.$toast('I am Warning.', { state: 'warning' });
          },
          showToastError() {
            this.$toast('I am Error.', { state: 'error' });
          },
          showToastPrimary() {
            this.$toast('I am Primary.', { state: 'primary' });
          },
        },
      `),
    };
  },
  methods: {
    showToastDefault() {
      this.$toast('I am Default.');
    },
    showToastSuccess() {
      this.$toast('I am Success.', { state: 'success' });
    },
    showToastWarning() {
      this.$toast('I am Warning.', { state: 'warning' });
    },
    showToastError() {
      this.$toast('I am Error.', { state: 'error' });
    },
    showToastPrimary() {
      this.$toast('I am Primary.', { state: 'primary' });
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../assets/style/_var.scss';
</style>
