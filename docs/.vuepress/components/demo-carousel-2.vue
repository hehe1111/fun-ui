<template>
  <div>
    <f-carousel class="demo-carousel-2" :auto-play="false">
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

    <code-box :code="{ html }" />
  </div>
</template>

<script>
import FCarousel from '../../../src/components/carousel/FCarousel.vue';
import FCarouselItem from '../../../src/components/carousel/FCarouselItem.vue';

export default {
  name: 'demo-carousel-2',
  components: { FCarousel, FCarouselItem },
  data() {
    return {
      html: `
        <f-carousel :auto-play="false">
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
      `,
    };
  },
};
</script>

<style lang="scss" scoped>
@import '../assets/style/_var.scss';
@import '../assets/style/demo-carousel.scss';

.demo-carousel-2 {
  @extend .extra-margin;
  @extend .demo-carousel;
  @extend .image;
}
</style>
