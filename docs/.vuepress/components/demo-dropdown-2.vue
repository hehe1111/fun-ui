<template>
  <div class="demo-dropdown-2 extra-margin">
    <f-dropdown :hide-on-click="false">
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

    <code-box :htmlCode="htmlCode" :javascriptCode="javascriptCode" />
  </div>
</template>

<script>
import FDropdown from '../../../src/components/dropdown/FDropdown.vue';
import FDropdownItem from '../../../src/components/dropdown/FDropdownItem.vue';
import FButton from '../../../src/components/button/FButton.vue';
import FIcon from '../../../src/components/FIcon.vue';

export default {
  name: 'demo-dropdown-2',
  components: { FDropdown, FDropdownItem, FButton, FIcon },
  data() {
    return {
      dataSource: ['海贼王', '进击的巨人', '我的英雄学院', '火影忍者', '死神'],

      htmlCode: `
        <f-dropdown :hide-on-click="false">
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
      `,
      javascriptCode: `
        data() {
          return {
            dataSource: ['海贼王', '进击的巨人', '我的英雄学院', '火影忍者', '死神'],
          };
        },
      `,
    };
  },
};
</script>

<style lang="scss" scoped>
@import '../assets/style/_var.scss';
@import '../assets/style/demo-dropdown.scss';
</style>
