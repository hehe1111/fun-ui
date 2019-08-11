<template>
  <div id="app" style="padding: 10px;">
    <f-scroll-vertical
      style="border: 10px solid green; height: 200px;"
      :load-data="loadData"
      :load-data-immediately="true"
    >
      <div class="item" v-for="div in divs" :key="div">{{ div }}</div>
    </f-scroll-vertical>
    {{ divs }}
  </div>
</template>

<script>
import FScrollVertical from './components/scroll/FScrollVertical.vue';
import { range } from './assets/utils.js';

export default {
  name: 'App',
  data() {
    return {
      divs: [],
    };
  },
  methods: {
    loadData() {
      if (this.divs.length === 0) {
        return (this.divs = range(1, 10));
      }
      this.divs.push(this.divs.length + 1);
    },
  },
  components: { FScrollVertical },
};
</script>

<style lang="scss" scoped>
@import './assets/_var.scss';

.item {
  @extend .flex-center;
  height: 40px;
  margin: 10px;
  background-color: lighten($blue, 30%);
  color: #fff;
  font-size: 20px;
}
</style>
