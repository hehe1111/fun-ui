<template>
  <div class="demo-toast-2 extra-margin">
    <f-button @click="showToastDefault">Default</f-button>
    <f-button @click="showToastSuccess">Success</f-button>
    <f-button @click="showToastWarning">Warning</f-button>
    <f-button @click="showToastError">Error</f-button>
    <f-button @click="showToastPrimary">Primary</f-button>

    <code-box :code="{ html, javascript }" />
  </div>
</template>

<script>
import Vue from 'vue';
import FButton from '../../../src/components/button/FButton.vue';
import toast from '../../../src/plugins/toast.js';

Vue.use(toast);

export default {
  name: 'demo-toast-2',
  components: { FButton },
  data() {
    return {
      html: `
        <f-button @click="showToastDefault">Default</f-button>
        <f-button @click="showToastSuccess">Success</f-button>
        <f-button @click="showToastWarning">Warning</f-button>
        <f-button @click="showToastError">Error</f-button>
        <f-button @click="showToastPrimary">Primary</f-button>
      `,
      javascript: `
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
      `,
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
