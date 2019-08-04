<template>
  <div id="app" style="padding: 10px;">
    <f-date-picker :value="value" @input="getNewestDate" />
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
  methods: {
    getNewestDate($event) {
      this.value = $event;
    },
  },
  components: { FDatePicker },
};
</script>

<style lang="scss">
@import './assets/_var.scss';
</style>
