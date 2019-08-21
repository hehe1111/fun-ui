<template>
  <div class="demo-toast-3 extra-margin">
    <f-button @click="showToast">{{n}}s 后关闭</f-button>

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
      n: 10,
      counting: false,

      html: `
        <f-button @click="showToast">{{n}}s 后关闭</f-button>
      `,
      javascript: `
        data() {
          return {
            n: 10,
            counting: false,
          };
        },
        methods: {
          showToast() {
            if (this.counting) return;
            this.$toast('Auto closed after 10s.', { autoCloseDelay: 10 });
            const subtractOne = () => {
              if (this.n > 0) {
                this.timerId = setTimeout(() => {
                  this.n -= 1;
                  subtractOne();
                }, 1000);
              } else {
                this.counting = false;
                clearTimeout(this.timerId);
                this.n = 10;
              }
            };
            this.counting = true;
            subtractOne();
          },
        },
      `,
    };
  },
  methods: {
    showToast() {
      if (this.counting) return;
      this.$toast('Auto closed after 10s.', { autoCloseDelay: 10 });
      const subtractOne = () => {
        if (this.n > 0) {
          this.timerId = setTimeout(() => {
            this.n -= 1;
            subtractOne();
          }, 1000);
        } else {
          this.counting = false;
          clearTimeout(this.timerId);
          this.n = 10;
        }
      };
      this.counting = true;
      subtractOne();
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../assets/style/_var.scss';
</style>
