<template>
  <div class="demo-scrollable-picker-3">
    <f-scrollable-picker
      :width-and-height="{ width: '4em', height: '14em' }"
      :selected.sync="selected"
      :values="range(1, 20)"
      loop
    />

    <code-box :htmlCode="htmlCode" :javascriptCode="javascriptCode" />
  </div>
</template>

<script>
import FScrollablePicker from '../../../src/components/FScrollablePicker.vue';
import { range } from '../../../src/assets/utils.js';

export default {
  name: 'demo-scrollable-picker-3',
  components: { FScrollablePicker },
  data() {
    return {
      selected: 10,
      range,

      htmlCode: `
        <f-scrollable-picker
          :width-and-height="{ width: '4em', height: '14em' }"
          :selected.sync="selected"
          :values="range(1, 20)"
          loop
        />
      `,
      javascriptCode: `
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
