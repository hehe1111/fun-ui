<template>
  <div class="demo-icon-1 extra-margin">
    <ul>
      <li v-for="name in iconNames" class="item">
        <f-icon :name="name" class="icon" />
        <span class="name">{{ name }}</span>
      </li>
    </ul>

    <code-box>
      <pre>
        <code class="html">{{htmlCode}}</code>
      </pre>
    </code-box>
  </div>
</template>


<script>
import FIcon from '../../../src/components/FIcon.vue';
import iconNames from '../assets/js/icon-names.js';
import CodeBox from './code-box.vue';
import removePrefixSpace from '../assets/js/remove-prefix-space.js';

export default {
  name: 'demo-icon-1',
  components: { FIcon },
  data() {
    return {
      iconNames,
      htmlCode: removePrefixSpace(`
        <f-icon :name="name" />
      `),
    };
  },
};
</script>

<style lang="scss" scoped>
@import '../assets/style/_var.scss';

.demo-icon-1 {
  > ul {
    padding: 0;
    margin: 0;
    list-style: none;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
  }

  .item {
    @extend .flex-center;
    flex-direction: column;
    width: 120px;
    height: 100px;
    border: 1px solid $borderColor;
    transition: all $duration ease-in-out;

    &:hover {
      background-color: $blue;
      color: #fff;
    }

    > .icon {
      width: 2em;
      height: 2em;
    }

    > .name {
      margin-top: 0.5em;
    }
  }
}
</style>
