<template>
  <div>
    <f-carousel class="demo-carousel-1">
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

    <code-box :code="{ html, scss }" />
  </div>
</template>

<script>
import FCarousel from '../../../src/components/carousel/FCarousel.vue';
import FCarouselItem from '../../../src/components/carousel/FCarouselItem.vue';

export default {
  name: 'demo-carousel-1',
  components: { FCarousel, FCarouselItem },
  data() {
    return {
      html: `
        <f-carousel>
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
      scss: `
        .image {
          @extend .flex-center;
          width: 300px;
          height: 150px;
          background-color: #1890ff;
          color: #fff;
        }
      `,
    };
  },
};
</script>

<style lang="scss" scoped>
@import '../assets/style/_var.scss';
@import '../assets/style/demo-carousel.scss';

.demo-carousel-1 {
  @extend .extra-margin;
  @extend .demo-carousel;
  @extend .image;
}
</style>
