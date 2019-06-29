<template>
  <div class="cascader">
    <div class="trigger" @click="isPopoverVisiable = !isPopoverVisiable"></div>
    <div class="popover" v-if="isPopoverVisiable">
      <!-- TODO: height 需要重新实现！考虑是否需要层层传递 -->
      <f-cascader-items
        :items="source"
        :selected-result="selectedResult"
        :height="popoverHeight"
      />
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import FCascaderItems from './FCascaderItems';

export default {
  name: 'FunUIFCascader',
  props: {
    source: {
      type: Array,
    },
    popoverHeight: {
      type: String,
      default: '14em',
    },
  },
  data() {
    return {
      isPopoverVisiable: false,
      eventBus: new Vue(),
      selectedResult: [],
    };
  },
  provide() {
    return {
      eventBus: this.eventBus,
    };
  },
  mounted() {
    this.eventBus.$on('left-selected', $event => {
      const key = Object.keys($event)[0];
      this.$set(this.selectedResult, key, $event[key]);
      this.selectedResult.splice(parseInt(key) + 1);
    });
  },
  components: { FCascaderItems },
};
</script>

<style lang="scss" scoped>
@import '../assets/_var.scss';

.cascader {
  position: relative;
  .trigger {
    width: 20em;
    height: 2em;
    border: 1px solid grey;
  }
  .popover {
    overflow: auto;
    margin-top: 0.2em;
    display: flex;
    position: absolute;
    top: 100%;
    background-color: #fff;
    box-shadow: 0 0 5px 0 lighten($boxShadowColor, 34%);
    border-radius: $borderRadius;
  }
}
</style>
