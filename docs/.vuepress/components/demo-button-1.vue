<template>
  <div class="extra-margin">
    <f-button>按钮</f-button>
    <f-button disabled>禁止按钮</f-button>
    <f-button>
      <f-icon name="loading" />按钮
    </f-button>
    <f-button>
      <f-icon name="left" />按钮
      <f-icon name="right" />
    </f-button>
    <f-button icon="setting">按钮</f-button>
    <f-button icon="setting" icon-position="right">按钮</f-button>
  </div>
</template>


<script>
import FIcon from '../../../src/components/FIcon.vue';
import FButton from '../../../src/components/button/FButton.vue';

export default {
  components: { FIcon, FButton },
};
</script>

<style lang="scss" scoped>
.extra-margin {
  margin: 1em 0;
}
</style>
