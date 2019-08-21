<template>
  <div class="demo-toast-3 extra-margin">
    <f-button @click="showToast">关闭后调用回调</f-button>

    <code-box :code="{ html, javascript }" />
  </div>
</template>

<script>
import Vue from 'vue';
import FButton from '../../../src/components/button/FButton.vue';
import toast from '../../../src/plugins/toast.js';

Vue.use(toast);

export default {
  name: 'demo-toast-3',
  components: { FButton },
  data() {
    return {
      html: `
          <f-button @click="showToast">关闭后调用回调</f-button>
      `,
      javascript: `
        methods: {
          showToast() {
            this.$toast('Alert when closed.', {
              onClose: () => alert('Closed.'),
            });
          },
        },
      `,
    };
  },
  methods: {
    showToast() {
      this.$toast('Alert when closed.', {
        onClose: () => alert('Closed.'),
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../assets/style/_var.scss';
</style>
