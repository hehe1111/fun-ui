<template>
  <div class="demo-scrollable-picker-2">
    <f-scrollable-picker
      :width-and-height="{ width: '14em', height: '2em' }"
      :selected.sync="selected"
      :values="range(1, 20)"
      direction="horizontal"
    />

    <code-box :code="{ html, javascript }" />
  </div>
</template>

<script>
import FScrollablePicker from '../../../src/components/FScrollablePicker.vue';
import { range } from '../../../src/assets/utils.js';

export default {
  name: 'demo-scrollable-picker-2',
  components: { FScrollablePicker },
  data() {
    return {
      selected: 10,
      range,

      html: `
        <f-scrollable-picker
          :width-and-height="{ width: '14em', height: '2em' }"
          :selected.sync="selected"
          :values="range(1, 20)"
          direction="horizontal"
        />
      `,
      javascript: `
        data() {
          return {
            selected: 10,
            range,
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
