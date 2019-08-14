<template>
  <div class="demo-layout-1 extra-margin">
    <h2>布局</h2>
    <h3>上中下</h3>
    <f-layout>
      <f-header class="demo header">header</f-header>
        <f-content class="demo content">content</f-content>
        <f-footer class="demo footer">footer</f-footer>
    </f-layout>
    <h3>左右（上中下）</h3>
    <f-layout>
      <f-sidebar class="demo">sidebarsidebar</f-sidebar>
      <f-layout>
        <f-header class="demo header">header</f-header>
        <f-content class="demo content">content</f-content>
        <f-footer class="demo footer">footer</f-footer>
      </f-layout>
    </f-layout>
    <h3>上中（左右）下</h3>
    <!-- <f-layout>
      <f-header class="demo header">header</f-header>
      <f-layout>
        <f-sidebar class="demo x-sidebar">sidebarsidebar</f-sidebar>
        <f-content class="demo content">content</f-content>
        <f-sidebar class="demo x-sidebar">sidebarsidebar</f-sidebar>
      </f-layout>
      <f-footer class="demo footer">footer</f-footer>
    </f-layout> -->
    <h3>上下（左右（上下））</h3>
    <!-- <f-layout>
      <f-header class="demo header">header</f-header>
      <f-layout>
        <f-sidebar class="demo x-sidebar">sidebarsidebar</f-sidebar>
        <f-layout>
          <f-content class="demo content">content</f-content>
          <f-footer class="demo footer">footer</f-footer>
        </f-layout>
      </f-layout>
    </f-layout> -->

    <code-box>
      <pre>
        <code class="html">{{htmlCode}}</code>
        <!-- <code class="javascript">{{javascriptCode}}</code> -->
      </pre>
    </code-box>
  </div>
</template>

<script>
import FLayout from '../../../src/components/layout/FLayout.vue';
import FHeader from '../../../src/components/layout/FHeader.vue';
import FSidebar from '../../../src/components/layout/FSidebar.vue';
import FContent from '../../../src/components/layout/FContent.vue';
import FFooter from '../../../src/components/layout/FFooter.vue';
import removePrefixSpace from '../assets/js/remove-prefix-space.js';

export default {
  name: 'demo-grid-1',
  components: { FLayout, FHeader, FSidebar, FContent, FFooter },
  data() {
    return {
      value1: '',

      htmlCode: removePrefixSpace(`
      `),
      javascriptCode: removePrefixSpace(`
        data() {
          return {
          };
        },
      `),
    };
  },
};
</script>

<style lang="scss" scoped>
@import '../assets/style/_var.scss';

.layout {
  border: 2px solid red;
}
.demo {
  padding: 20px;
  word-break: break-all;
}

.header, .footer {
  background-color: lighten($blue, 30%);
}

.content {
  background-color: lighten($blue, 40%);
}
</style>
