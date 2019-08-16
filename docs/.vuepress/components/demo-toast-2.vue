<template>
  <div class="demo-toast-2 extra-margin">
    <f-button @click="showToast">可手动关闭</f-button>

    <code-box :htmlCode="htmlCode" :javascriptCode="javascriptCode" />
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
      htmlCode: `
        <f-button @click="showToast">可手动关闭</f-button>
      `,
      javascriptCode: `
        methods: {
          showToast() {
            this.$toast('Need to be closed manually.', {
              closeIcon: true,
            });
          },
        },
      `,
    };
  },
  methods: {
    showToast() {
      this.$toast('Need to be closed manually.', {
        closeIcon: true,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../assets/style/_var.scss';
</style>
