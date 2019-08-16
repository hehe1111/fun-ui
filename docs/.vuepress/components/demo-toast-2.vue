<template>
  <div class="demo-toast-2 extra-margin">
    <f-button @click="showToast">可手动关闭</f-button>

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
        <f-button @click="showToast">可手动关闭</f-button>
      `),
      javascriptCode: removePrefixSpace(`
        methods: {
          showToast() {
            this.$toast('Need to be closed manually.', {
              closeIcon: true,
            });
          },
        },
      `),
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
