<template>
  <div>
    <div class="demo-carousel-4">
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

    <code-box>
      <pre>
        <code class="html">{{htmlCode}}</code>
        <code class="javascript">{{javascriptCode}}</code>
      </pre>
    </code-box>
  </div>
</template>

<script>
import FButton from '../../../src/components/button/FButton.vue';
import FButtonGroup from '../../../src/components/button/FButtonGroup.vue';
import FCarousel from '../../../src/components/carousel/FCarousel.vue';
import FCarouselItem from '../../../src/components/carousel/FCarouselItem.vue';
import removePrefixSpace from '../assets/js/remove-prefix-space.js';

export default {
  name: 'demo-carousel-4',
  components: { FButton, FButtonGroup, FCarousel, FCarouselItem },
  data() {
    return {
      dotPosition1: 'left',
      dotPosition2: 'top',

      htmlCode: removePrefixSpace(`
        <f-carousel :dot-position="dotPosition" :enable-arrow="true">
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
      `),
      javascriptCode: removePrefixSpace(`
        data() {
          return {
            dotPosition: "left",
            dotPosition2: 'top',
          }
        }
      `),
    };
  },
};
</script>

<style lang="scss" scoped>
@import '../assets/style/_var.scss';
@import '../assets/style/demo-carousel.scss';

.demo-carousel-4 {
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
