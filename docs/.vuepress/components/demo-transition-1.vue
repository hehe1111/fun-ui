<template>
  <div class="demo-transition-1 extra-margin">
    <div>
      <f-button @click="x = !x">Vertical {{ x ? 'Show' : 'Hide' }}</f-button>
      <f-transition>
        <div v-if="x">
          <div class="demo-transition-1-block"></div>
        </div>
      </f-transition>
    </div>

    <div>
      <f-button @click="y = !y">Horizontal {{ y ? 'Show' : 'Hide' }}</f-button>
      <f-transition direction="horizontal">
        <div v-if="y">
          <div class="demo-transition-1-block"></div>
        </div>
      </f-transition>
    </div>

    <div>
      <f-button @click="z = !z">Duration: 1000ms {{ z ? 'Show' : 'Hide' }}</f-button>
      <f-transition duration="1000">
        <div v-if="z">
          <div class="demo-transition-1-block"></div>
        </div>
      </f-transition>
    </div>

    <code-box :code="{ html, scss }" />
  </div>
</template>

<script>
import FTransition from '../../../src/components/FTransition.vue';
import FButton from '../../../src/components/button/FButton.vue';

export default {
  name: 'demo-transition-1',
  components: { FTransition, FButton },
  data() {
    return {
      x: true,
      y: true,
      z: true,

      html: `
        <div>
          <f-button @click="x = !x">Vertical {{ x ? 'Show' : 'Hide' }}</f-button>
          <f-transition>
            <div v-if="x">
              <div class="demo-transition-1-block"></div>
            </div>
          </f-transition>
        </div>

        <div>
          <f-button @click="y = !y">Horizontal {{ y ? 'Show' : 'Hide' }}</f-button>
          <f-transition direction="horizontal">
            <div v-if="y">
              <div class="demo-transition-1-block"></div>
            </div>
          </f-transition>
        </div>

        <div>
          <f-button @click="z = !z">Duration: 1000ms {{ z ? 'Show' : 'Hide' }}</f-button>
          <f-transition duration="1000">
            <div v-if="z">
              <div class="demo-transition-1-block"></div>
            </div>
          </f-transition>
        </div>
      `,
      scss: `
        .demo-transition-1 {
          &-block {
            width: 200px;
            height: 200px;
            background-color: skyblue;
          }
        }
      `,
    };
  },
};
</script>

<style lang="scss" scoped>
@import '../assets/style/_var.scss';

.demo-transition-1 {
  &-block {
    width: 200px;
    height: 200px;
    background-color: skyblue;
  }
}
</style>
