<template>
  <div id="app" style="padding: 10px;">
    <f-date-picker v-model="value" />
  </div>
</template>

<script>
import FDatePicker from './components/FDatePicker.vue';

export default {
  name: 'App',
  data() {
    return {
      value: new Date(),
    };
  },
  components: { FDatePicker },
};
</script>

<style lang="scss">
@import './assets/_var.scss';
</style>
