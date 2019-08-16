<template>
  <div class="demo-scrollable-picker-1 extra-margin">
    <f-scrollable-picker
      :width-and-height="{ width: '4em', height: '14em' }"
      :selected.sync="selected"
      :values="range(1, 20)"
    />

    <code-box :htmlCode="htmlCode" :javascriptCode="javascriptCode" />
  </div>
</template>

<script>
import FScrollablePicker from '../../../src/components/FScrollablePicker.vue';
import { range } from '../../../src/assets/utils.js';

export default {
  name: 'demo-scrollable-picker-1',
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
