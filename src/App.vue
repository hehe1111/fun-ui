<template>
  <div id="app" style="padding: 10px;">
    <f-scroll-horizontal
      style="border: 10px solid green; height: 200px; padding: 10px;"
    >
      <p>
        loremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremlorem
      </p>
    </f-scroll-horizontal>
    {{ divs }}
  </div>
</template>

<script>
import FScrollHorizontal from './components/scroll/FScrollHorizontal.vue';
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
  components: { FScrollVertical, FScrollHorizontal },
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
