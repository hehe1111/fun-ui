<template>
  <div class="demo-scroll-1 extra-margin">
    <f-scroll-vertical class="scroll">
      <div class="item" v-for="div in 20" :key="div">{{ div }}</div>
    </f-scroll-vertical>

    <code-box>
      <pre>
        <code class="html">{{htmlCode}}</code>
        <code class="scss">{{scssCode}}</code>
      </pre>
    </code-box>
  </div>
</template>

<script>
import FScrollVertical from '../../../src/components/scroll/FScrollVertical.vue';
import CodeBox from './code-box.vue';
import removePrefixSpace from '../assets/js/remove-prefix-space.js';

export default {
  name: 'demo-scroll-1',
  components: { FScrollVertical },
  data() {
    return {
      htmlCode: removePrefixSpace(`
        <f-scroll-vertical class="scroll">
          <div class="item" v-for="div in 20" :key="div">{{ div }}</div>
        </f-scroll-vertical>
      `),
      scssCode: removePrefixSpace(`
        .scroll {
          height: 400px;
          border: 1px solid $blue;
          border-radius: $borderRadius;
        }

        .item {
          @extend .flex-center;
          height: 40px;
          margin: 10px;
          background-color: lighten($blue, 30%);
          color: #fff;
          font-size: 20px;
        }
      `)
    };
  },
  components: { FScrollVertical, CodeBox },
};
</script>

<style lang="scss" scoped>
@import '../assets/style/_var.scss';

.scroll {
  height: 400px;
  border: 1px solid $blue;
  border-radius: $borderRadius;
}

.item {
  @extend .flex-center;
  height: 40px;
  margin: 10px;
  background-color: lighten($blue, 30%);
  color: #fff;
  font-size: 20px;
}
</style>
