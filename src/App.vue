<template>
  <div id="app">
    <f-dropdown>
      <template slot="dropdown">
        <f-dropdown-item v-for="n in dataSource" :key="n" class="item">
          <span>{{ n }}</span>
        </f-dropdown-item>
      </template>
      <f-button>
        Dropdown
        <f-icon name="down" />
      </f-button>
    </f-dropdown>

    <f-dropdown hide-on-click>
      <template slot="dropdown">
        <f-dropdown-item v-for="n in dataSource" :key="n" class="item">
          <span>{{ n }}</span>
        </f-dropdown-item>
      </template>
      <f-button>
        Dropdown
        <f-icon name="down" />
      </f-button>
    </f-dropdown>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      dataSource: ['海贼王', '进击的巨人', '我的英雄学院', '火影忍者', '死神'],
    };
  },
  methods: {},
};
</script>

<style lang="scss">
@import './assets/_var.scss';

.item {
  @extend .flex-center;
  transition: all $duration ease-in-out;
  &:hover {
    background-color: $blue;
    color: #fff;
  }
}
</style>
