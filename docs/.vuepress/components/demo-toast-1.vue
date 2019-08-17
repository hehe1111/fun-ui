<template>
  <div class="demo-toast-1 extra-margin">
    <f-button @click="showToastTop">Top(default)</f-button>
    <f-button @click="showToastMiddle">Middle</f-button>
    <f-button @click="showToastBottom">Bottom</f-button>

    <code-box :htmlCode="htmlCode" :javascriptCode="javascriptCode" />
  </div>
</template>

<script>
import Vue from 'vue';
import FButton from '../../../src/components/button/FButton.vue';
import toast from '../../../src/plugins/toast.js';

Vue.use(toast);

export default {
  name: 'demo-toast-1',
  components: { FButton },
  data() {
    return {
      htmlCode: `
        <f-button @click="showToastTop">Top(default)</f-button>
        <f-button @click="showToastMiddle">Middle</f-button>
        <f-button @click="showToastBottom">Bottom</f-button>
      `,
      javascriptCode: `
        methods: {
          showToastTop() {
            this.$toast('I am Top.');
          },
          showToastMiddle() {
            this.$toast('I am Middle.', { position: 'middle' });
          },
          showToastBottom() {
            this.$toast('I am Bottom.', { position: 'bottom' });
          },
        },
      `,
    };
  },
  methods: {
    showToastTop() {
      this.$toast('I am Top.');
    },
    showToastMiddle() {
      this.$toast('I am Middle.', { position: 'middle' });
    },
    showToastBottom() {
      this.$toast('I am Bottom.', { position: 'bottom' });
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../assets/style/_var.scss';
</style>
