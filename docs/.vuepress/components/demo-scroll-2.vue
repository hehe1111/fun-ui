<template>
  <div class="demo-scroll-2 extra-margin">
    <f-scroll-horizontal class="scroll">
      <p>LoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLore ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque, magnam, illo saepe recusandae asperiores commodi deserunt accusantium ducimus aperiam sint odio iste quo in possimus nisi cum? Aliquid, ipsum veritatis.</p>
    </f-scroll-horizontal>

    <code-box>
      <pre>
        <code class="html">{{htmlCode}}</code>
        <code class="scss">{{scssCode}}</code>
      </pre>
    </code-box>
  </div>
</template>

<script>
import FScrollHorizontal from '../../../src/components/scroll/FScrollHorizontal.vue';
import CodeBox from './code-box.vue';
import removePrefixSpace from '../assets/js/remove-prefix-space.js';

export default {
  name: 'demo-scroll-2',
  components: { FScrollHorizontal },
  data() {
    return {
      htmlCode: removePrefixSpace(`
        <f-scroll-horizontal class="scroll">
          <p>LoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLore ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque, magnam, illo saepe recusandae asperiores commodi deserunt accusantium ducimus aperiam sint odio iste quo in possimus nisi cum? Aliquid, ipsum veritatis.</p>
        </f-scroll-horizontal>
      `),
      scssCode: removePrefixSpace(`
        .scroll {
          width: 500px;
          border: 1px solid $blue;
          border-radius: $borderRadius;
        }
      `),
    };
  },
  components: { FScrollHorizontal, CodeBox },
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
