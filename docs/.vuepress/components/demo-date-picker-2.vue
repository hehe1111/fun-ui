<template>
  <div class="demo-date-picker-2 extra-margin">
    <f-date-picker v-model="value" start-week-on="0" />

    <code-box :code="{ html, javascript }" />
  </div>
</template>

<script>
import FDatePicker from '../../../src/components/FDatePicker.vue';

export default {
  name: 'demo-date-picker-2',
  components: { FDatePicker },
  data() {
    return {
      value: new Date(),

      html: `
        <f-date-picker v-model="value" start-week-on="0" />
      `,
      javascript: `
        data() {
          return {
            value: new Date(),
          };
        },
      `,
    };
  },
};
</script>

<style lang="scss" scoped>
@import '../assets/style/_var.scss';
</style>
