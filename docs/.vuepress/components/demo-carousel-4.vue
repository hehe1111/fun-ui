<template>
  <div>
    <div class="demo-carousel-4">
      <div class="demo-button-group-and-carousel">
        <f-button-group class="demo-button-group">
          <f-button
            v-for="p in ['left', 'right']"
            :key="p"
            :type="dotPosition1 === p ? 'primary' : 'default'"
            @click="onClickToChangeDotPosition1(p)"
          >{{ p }}</f-button>
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
          <f-button
            v-for="p in ['top', 'bottom']"
            :key="p"
            :type="dotPosition2 === p ? 'primary' : 'default'"
            @click="onClickToChangeDotPosition2(p)"
          >{{ p }}</f-button>
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

    <code-box :code="{ html, javascript }" />
  </div>
</template>

<script>
import FButton from '../../../src/components/button/FButton.vue';
import FButtonGroup from '../../../src/components/button/FButtonGroup.vue';
import FCarousel from '../../../src/components/carousel/FCarousel.vue';
import FCarouselItem from '../../../src/components/carousel/FCarouselItem.vue';

export default {
  name: 'demo-carousel-4',
  components: { FButton, FButtonGroup, FCarousel, FCarouselItem },
  data() {
    return {
      dotPosition1: 'left',
      dotPosition2: 'top',

      html: `
        <f-button-group class="demo-button-group">
          <f-button
            v-for="p in ['left', 'right']"
            :key="p"
            :type="dotPosition1 === p ? 'primary' : 'default'"
            @click="onClickToChangeDotPosition1(p)"
          >{{ p }}</f-button>
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

        <f-button-group class="demo-button-group">
          <f-button
            v-for="p in ['top', 'bottom']"
            :key="p"
            :type="dotPosition2 === p ? 'primary' : 'default'"
            @click="onClickToChangeDotPosition2(p)"
          >{{ p }}</f-button>
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
      `,
      javascript: `
        data() {
          return {
            dotPosition1: "left",
            dotPosition2: 'top',
          }
        },
        methods: {
          onClickToChangeDotPosition1(position) {
            this.dotPosition1 = position;
          },
          onClickToChangeDotPosition2(position) {
            this.dotPosition2 = position;
          },
        },
      `,
    };
  },
  methods: {
    onClickToChangeDotPosition1(position) {
      this.dotPosition1 = position;
    },
    onClickToChangeDotPosition2(position) {
      this.dotPosition2 = position;
    },
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
