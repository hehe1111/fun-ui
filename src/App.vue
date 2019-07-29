<template>
  <div id="app" style="display: flex; justify-content: center;">
    <div style="border: 1px solid red; width: 600px;">
      <div>
        <p>第 1 段落</p>
        <p>第 2 段落</p>
        <p>第 3 段落</p>
        <p>第 4 段落</p>
        <p>第 5 段落</p>
        <p>第 6 段落</p>
        <p>第 7 段落</p>
        <p>第 8 段落</p>
        <p>第 9 段落</p>
        <p>第 10 段落</p>
        <p>第 11 段落</p>
        <p>第 12 段落</p>
        <p>第 13 段落</p>
        <p>第 14 段落</p>
        <p>第 15 段落</p>
        <p>第 16 段落</p>
        <p>第 17 段落</p>
        <p>第 18 段落</p>
        <p>第 19 段落</p>
        <p>第 20 段落</p>
        <p>第 21 段落</p>
        <p>第 22 段落</p>
        <p>第 23 段落</p>
        <p>第 24 段落</p>
        <p>第 25 段落</p>
        <p>第 26 段落</p>
        <p>第 27 段落</p>
        <p>第 28 段落</p>
        <p>第 29 段落</p>
      </div>
      <f-sticky :distance="100">
        <div style="border: 1px solid red;">
          <img src="https://dummyimage.com/600x400/f59a11/ffffff.png" />
          sticky hahahahahahahahahahahahaha
        </div>
      </f-sticky>
      <div>
        <p>第 1 段落</p>
        <p>第 2 段落</p>
        <p>第 3 段落</p>
        <p>第 4 段落</p>
        <p>第 5 段落</p>
        <p>第 6 段落</p>
        <p>第 7 段落</p>
        <p>第 8 段落</p>
        <p>第 9 段落</p>
        <p>第 10 段落</p>
        <p>第 11 段落</p>
        <p>第 12 段落</p>
        <p>第 13 段落</p>
        <p>第 14 段落</p>
        <p>第 15 段落</p>
        <p>第 16 段落</p>
        <p>第 17 段落</p>
        <p>第 18 段落</p>
        <p>第 19 段落</p>
        <p>第 20 段落</p>
        <p>第 21 段落</p>
        <p>第 22 段落</p>
        <p>第 23 段落</p>
        <p>第 24 段落</p>
        <p>第 25 段落</p>
        <p>第 26 段落</p>
        <p>第 27 段落</p>
        <p>第 28 段落</p>
        <p>第 29 段落</p>
      </div>
    </div>
  </div>
</template>

<script>
import FSticky from './components/FSticky.vue';

export default {
  name: 'App',
  components: { FSticky },
};
</script>

<style lang="scss">
@import './assets/_var.scss';

img {
  width: 100%;
}
</style>
