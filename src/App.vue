<template>
  <div id="app">
    {{ selected }}
    <!-- TODO: 如何协调动画持续时间 duration 和自动播放时的切换时间 autoPlay -->
    <f-carousel :selected.sync="selected">
      <f-carousel-item name="x1">
        <div class="image">1</div>
      </f-carousel-item>
      <f-carousel-item name="x2">
        <div class="image">2</div>
      </f-carousel-item>
      <f-carousel-item name="x3">
        <div class="image">3</div>
      </f-carousel-item>
    </f-carousel>
  </div>
</template>

<script>
import FCarousel from './components/FCarousel.vue';
import FCarouselItem from './components/FCarouselItem.vue';

export default {
  name: 'app',
  components: {
    FCarousel,
    FCarouselItem,
  },
  data() {
    return {
      selected: 'x1',
    };
  },
};
</script>

<style lang="scss">
.image {
  width: 100px;
  height: 100px;
  background-color: #ddd;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
