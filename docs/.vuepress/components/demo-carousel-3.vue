<template>
  <div>
    <f-carousel class="demo-carousel-3" :enable-arrow="true">
      <f-carousel-item name="x1">
        <div class="image">1</div>
      </f-carousel-item>
      <f-carousel-item name="x2">
        <div class="image">2</div>
      </f-carousel-item>
      <f-carousel-item name="x3">
        <div class="image">3</div>
      </f-carousel-item>
      <f-carousel-item name="x4">
        <div class="image">4</div>
      </f-carousel-item>
    </f-carousel>

    <code-box>
      <pre>
        <code class="html">{{htmlCode}}</code>
      </pre>
    </code-box>
  </div>
</template>

<script>
import FCarousel from "../../../src/components/carousel/FCarousel.vue";
import FCarouselItem from "../../../src/components/carousel/FCarouselItem.vue";
import CodeBox from './code-box.vue';
import removePrefixSpace from '../assets/js/remove-prefix-space.js';

export default {
   name: 'demo-carousel-3',
  data() {
    return {
      htmlCode: removePrefixSpace(`
        <f-carousel :enable-arrow="true">
          <f-carousel-item name="x1">
            <div class="image">1</div>
          </f-carousel-item>
          <f-carousel-item name="x2">
            <div class="image">2</div>
          </f-carousel-item>
          <f-carousel-item name="x3">
            <div class="image">3</div>
          </f-carousel-item>
          <f-carousel-item name="x4">
            <div class="image">4</div>
          </f-carousel-item>
        </f-carousel>
      `),
    };
  },
  components: { FCarousel, FCarouselItem, CodeBox }
};
</script>

<style lang="scss" scoped>
@import '../assets/style/_var.scss';
@import '../assets/style/demo-carousel.scss';

.demo-carousel-3 {
  @extend .extra-margin;
  @extend .demo-carousel;
  @extend .image;
}
</style>
