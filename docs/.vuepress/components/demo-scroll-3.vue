<template>
  <div class="demo-scroll-3 extra-margin">
    <f-scroll-vertical class="scroll" :load-data="loadData" :load-data-immediately="true">
      <div class="item" v-for="div in divs" :key="div">{{ div }}</div>
    </f-scroll-vertical>

    <code-box :code="{ html, javascript, scss }" />
  </div>
</template>

<script>
import FScrollVertical from '../../../src/components/scroll/FScrollVertical.vue';
import { range } from '../../../src/assets/utils.js';

export default {
  name: 'demo-scroll-3',
  components: { FScrollVertical },
  data() {
    return {
      divs: [],

      html: `
        <f-scroll-vertical
          class="scroll"
          :load-data="loadData"
          :load-data-immediately="true"
        >
          <div class="item" v-for="div in divs" :key="div">{{ div }}</div>
        </f-scroll-vertical>
      `,
      javascript: `
        data() {
          return {
            divs: [],
          }
        },
        methods: {
          loadData() {
            if (this.divs.length === 0) {
              return (this.divs = range(1, 20));
            }
            this.divs.push(this.divs.length + 1);
          },
        }
      `,
      scss: `
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
  methods: {
    loadData() {
      if (this.divs.length === 0) {
        return (this.divs = range(1, 20));
      }
      this.divs.push(this.divs.length + 1);
    },
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
