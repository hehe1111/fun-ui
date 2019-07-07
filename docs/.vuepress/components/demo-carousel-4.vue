<template>
  <div class="demo-container">
    <div class="demo-button-group-and-carousel">
      <f-button-group class="demo-button-group">
        <f-button @click="dotPosition1 = 'left'">left</f-button>
        <f-button @click="dotPosition1 = 'right'">right</f-button>
      </f-button-group>
      <f-carousel class="demo-carousel" :dot-position="dotPosition1" :enable-arrow="true">
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

    <div class="demo-button-group-and-carousel">
      <f-button-group class="demo-button-group">
        <f-button @click="dotPosition2 = 'top'">top</f-button>
        <f-button @click="dotPosition2 = 'bottom'">bottom（默认值）</f-button>
      </f-button-group>
      <f-carousel class="demo-carousel" :dot-position="dotPosition2" :enable-arrow="true">
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
  </div>
</template>

<script>
import FButton from "../../../src/components/button/FButton.vue";
import FButtonGroup from "../../../src/components/button/FButtonGroup.vue";
import FCarousel from "../../../src/components/carousel/FCarousel.vue";
import FCarouselItem from "../../../src/components/carousel/FCarouselItem.vue";

export default {
  data() {
    return {
      dotPosition1: "left",
      dotPosition2: "top",
    };
  },
  components: { FButton, FButtonGroup, FCarousel, FCarouselItem },
};
</script>

<style lang="scss" scoped>
@import "../assets/style/demo-carousel.scss";

.demo-container {
  display: flex;

  > .demo-button-group-and-carousel {
    display: flex;
    flex-direction: column;
    &:first-child {
      margin-right: 2em;
    }

    > .demo-button-group {
      margin: 1em 0;
    }
  }
}
</style>
