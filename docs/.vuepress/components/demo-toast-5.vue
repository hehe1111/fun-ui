<template>
  <div class="demo-toast-2 extra-margin">
    <f-button @click="showToast">允许传入 HTML</f-button>

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
        <f-button @click="showToast">允许传入 HTML</f-button>
      `,
      javascript: `
        methods: {
          showToast() {
            const colorfulMessage = '<p style="background: linear-gradient(to right, red, orange, yellow, green, blue, indigo, violet);">I am Colorful.</p>';
            this.$toast(colorfulMessage, { enableHTML: true });
          },
        },
      `,
    };
  },
  methods: {
    showToast() {
      const colorfulMessage =
        '<p style="background: linear-gradient(to right, red, orange, yellow, green, blue, indigo, violet);">I am Colorful.</p>';
      this.$toast(colorfulMessage, { enableHTML: true });
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../assets/style/_var.scss';
</style>
