<template>
  <div>
    <div class="extra-margin">
      <f-button-group>
        <f-button>按钮 1</f-button>
        <f-button>按钮 2</f-button>
        <f-button>按钮 3</f-button>
        <f-button>按钮 4</f-button>
        <f-button>按钮 5</f-button>
      </f-button-group>
    </div>

    <div class="extra-margin">
      <f-button-group>
        <f-button disabled>按钮 1</f-button>
        <f-button>按钮 2</f-button>
        <f-button disabled>按钮 3</f-button>
        <f-button>按钮 4</f-button>
        <f-button disabled>按钮 5</f-button>
      </f-button-group>
    </div>
  </div>
</template>


<script>
import FIcon from '../../../src/components/FIcon.vue';
import FButton from '../../../src/components/button/FButton.vue';
import FButtonGroup from '../../../src/components/button/FButtonGroup.vue';

export default {
  components: { FIcon, FButton, FButtonGroup },
};
</script>

<style lang="scss" scoped>
.extra-margin {
  margin: 1em 0;
}
</style>
