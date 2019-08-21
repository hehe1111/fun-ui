<template>
  <div class="demo-layout-1 extra-margin">
    <h3>上中下</h3>
    <f-layout class="layout">
      <f-header class="demo header">header</f-header>
      <f-content class="demo content">content</f-content>
      <f-footer class="demo footer">footer</f-footer>
    </f-layout>

    <h3>左右（上中下）</h3>
    <f-layout class="layout">
      <f-sidebar class="demo demo-layout-1-sidebar">sidebar</f-sidebar>
      <f-layout>
        <f-header class="demo header">header</f-header>
        <f-content class="demo content">content</f-content>
        <f-footer class="demo footer">footer</f-footer>
      </f-layout>
    </f-layout>
    <f-layout class="layout">
      <f-layout>
        <f-header class="demo header">header</f-header>
        <f-content class="demo content">content</f-content>
        <f-footer class="demo footer">footer</f-footer>
      </f-layout>
      <f-sidebar class="demo demo-layout-1-sidebar">sidebar</f-sidebar>
    </f-layout>

    <h3>上中（左右）下</h3>
    <f-layout class="layout">
      <f-header class="demo header">header</f-header>
      <f-layout>
        <f-sidebar class="demo demo-layout-1-sidebar">sidebar</f-sidebar>
        <f-content class="demo content">content</f-content>
        <f-sidebar class="demo demo-layout-1-sidebar">sidebar</f-sidebar>
      </f-layout>
      <f-footer class="demo footer">footer</f-footer>
    </f-layout>

    <h3>上下（左右（上下））</h3>
    <f-layout class="layout">
      <f-header class="demo header">header</f-header>
      <f-layout>
        <f-sidebar class="demo demo-layout-1-sidebar">sidebar</f-sidebar>
        <f-layout>
          <f-content class="demo content">content</f-content>
          <f-footer class="demo footer">footer</f-footer>
        </f-layout>
      </f-layout>
    </f-layout>

    <f-layout class="layout">
      <f-header class="demo header">header</f-header>
      <f-layout>
        <f-layout>
          <f-content class="demo content">content</f-content>
          <f-footer class="demo footer">footer</f-footer>
        </f-layout>
        <f-sidebar class="demo demo-layout-1-sidebar">sidebar</f-sidebar>
      </f-layout>
    </f-layout>

    <!-- <h3>边栏可切换</h3>
    <f-layout class="layout">
      <f-header class="demo header">header</f-header>
      <f-layout>
        <f-sidebar switchable class="demo demo-layout-1-sidebar" style="overflow: auto; width: 100px; height: 100px;">sidebar Lorem ipsum dolor sit amet consectetur adipisicing elit. Est voluptatem rerum numquam. Perspiciatis atque, ad, illo alias voluptatum hic vel ex dolorum mollitia fuga porro est a laborum minus sint!</f-sidebar>
        <f-content class="demo content">content</f-content>
        <f-sidebar
          switchable
          position="right"
          class="demo demo-layout-1-sidebar"
          style="height: 100px;"
        >sidebar</f-sidebar>
      </f-layout>
      <f-footer class="demo footer">footer</f-footer>
    </f-layout>-->

    <code-box :code="{ html, scss }" />
  </div>
</template>

<script>
import FLayout from '../../../src/components/layout/FLayout.vue';
import FHeader from '../../../src/components/layout/FHeader.vue';
import FSidebar from '../../../src/components/layout/FSidebar.vue';
import FContent from '../../../src/components/layout/FContent.vue';
import FFooter from '../../../src/components/layout/FFooter.vue';

export default {
  name: 'demo-grid-1',
  components: { FLayout, FHeader, FSidebar, FContent, FFooter },
  data() {
    return {
      html: `
        <h3>上中下</h3>
        <f-layout class="layout">
          <f-header class="demo header">header</f-header>
          <f-content class="demo content">content</f-content>
          <f-footer class="demo footer">footer</f-footer>
        </f-layout>

        <h3>左右（上中下）</h3>
        <f-layout class="layout">
          <f-sidebar class="demo demo-layout-1-sidebar">sidebar</f-sidebar>
          <f-layout>
            <f-header class="demo header">header</f-header>
            <f-content class="demo content">content</f-content>
            <f-footer class="demo footer">footer</f-footer>
          </f-layout>
        </f-layout>
        <f-layout class="layout">
          <f-layout>
            <f-header class="demo header">header</f-header>
            <f-content class="demo content">content</f-content>
            <f-footer class="demo footer">footer</f-footer>
          </f-layout>
          <f-sidebar class="demo demo-layout-1-sidebar">sidebar</f-sidebar>
        </f-layout>

        <h3>上中（左右）下</h3>
        <f-layout class="layout">
          <f-header class="demo header">header</f-header>
          <f-layout>
            <f-sidebar class="demo demo-layout-1-sidebar">sidebar</f-sidebar>
            <f-content class="demo content">content</f-content>
            <f-sidebar class="demo demo-layout-1-sidebar">sidebar</f-sidebar>
          </f-layout>
          <f-footer class="demo footer">footer</f-footer>
        </f-layout>

        <h3>上下（左右（上下））</h3>
        <f-layout class="layout">
          <f-header class="demo header">header</f-header>
          <f-layout>
            <f-sidebar class="demo demo-layout-1-sidebar">sidebar</f-sidebar>
            <f-layout>
              <f-content class="demo content">content</f-content>
              <f-footer class="demo footer">footer</f-footer>
            </f-layout>
          </f-layout>
        </f-layout>

        <f-layout class="layout">
          <f-header class="demo header">header</f-header>
          <f-layout>
            <f-layout>
              <f-content class="demo content">content</f-content>
              <f-footer class="demo footer">footer</f-footer>
            </f-layout>
            <f-sidebar class="demo demo-layout-1-sidebar">sidebar</f-sidebar>
          </f-layout>
        </f-layout>
      `,
      scss: `
        .demo-layout-1 {
          .layout {
            margin: 1em 0;
          }
          .demo {
            padding: 20px;
            word-break: break-all;
          }

          .header,
          .footer {
            background-color: lighten($blue, 30%);
          }

          .content {
            background-color: lighten($blue, 40%);
          }

          &-sidebar {
            background-color: lighten($blue, 20%);
          }
        }
      `,
    };
  },
};
</script>

<style lang="scss" scoped>
@import '../assets/style/_var.scss';

.demo-layout-1 {
  .layout {
    margin: 1em 0;
  }
  .demo {
    padding: 20px;
    word-break: break-all;
  }

  .header,
  .footer {
    background-color: lighten($blue, 30%);
  }

  .content {
    background-color: lighten($blue, 40%);
  }

  &-sidebar {
    background-color: lighten($blue, 20%);
  }
}
</style>
