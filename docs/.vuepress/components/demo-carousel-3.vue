<template>
  <div>
    <f-carousel class="demo-carousel" :enable-arrow="true">
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
  </div>
</template>

<script>
import FCarousel from "../../../src/components/carousel/FCarousel.vue";
import FCarouselItem from "../../../src/components/carousel/FCarouselItem.vue";

export default {
  components: { FCarousel, FCarouselItem },
};
</script>

<style lang="scss" scoped>
@import '../assets/style/demo-carousel.scss';
</style>
