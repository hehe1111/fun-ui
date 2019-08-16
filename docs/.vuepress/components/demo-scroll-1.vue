<template>
  <div class="demo-scroll-1 extra-margin">
    <f-scroll-vertical class="scroll">
      <div class="item" v-for="div in 20" :key="div">{{ div }}</div>
    </f-scroll-vertical>

    <code-box :htmlCode="htmlCode" :scssCode="scssCode" />
  </div>
</template>

<script>
import FScrollVertical from '../../../src/components/scroll/FScrollVertical.vue';

export default {
  name: 'demo-scroll-1',
  components: { FScrollVertical },
  data() {
    return {
      htmlCode: `
        <f-scroll-vertical class="scroll">
          <div class="item" v-for="div in 20" :key="div">{{ div }}</div>
        </f-scroll-vertical>
      `,
      scssCode: `
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
      `,
    };
  },
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
