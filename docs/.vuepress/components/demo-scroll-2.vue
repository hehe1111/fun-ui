<template>
  <div class="demo-scroll-2 extra-margin">
    <f-scroll-horizontal class="scroll">
      <p>LoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLore ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque, magnam, illo saepe recusandae asperiores commodi deserunt accusantium ducimus aperiam sint odio iste quo in possimus nisi cum? Aliquid, ipsum veritatis.</p>
    </f-scroll-horizontal>

    <code-box :code="{ html, scss }" />
  </div>
</template>

<script>
import FScrollHorizontal from '../../../src/components/scroll/FScrollHorizontal.vue';

export default {
  name: 'demo-scroll-2',
  components: { FScrollHorizontal },
  data() {
    return {
      html: `
        <f-scroll-horizontal class="scroll">
          <p>LoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLore ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque, magnam, illo saepe recusandae asperiores commodi deserunt accusantium ducimus aperiam sint odio iste quo in possimus nisi cum? Aliquid, ipsum veritatis.</p>
        </f-scroll-horizontal>
      `,
      scss: `
        .scroll {
          width: 500px;
          border: 1px solid $blue;
          border-radius: $borderRadius;
        }
      `,
    };
  },
};
</script>

<style lang="scss" scoped>
@import '../assets/style/_var.scss';

.scroll {
  width: 500px;
  border: 1px solid $blue;
  border-radius: $borderRadius;
}
</style>
