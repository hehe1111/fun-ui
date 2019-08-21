<template>
  <div class="demo-dropdown-3 extra-margin">
    <f-dropdown>
      <template slot="dropdown">
        <f-dropdown-item
          v-for="(n, index) in dataSource"
          :key="n"
          class="item"
          :disabled="index === 1"
        >
          <span>{{ n }}</span>
        </f-dropdown-item>
      </template>
      <f-button>
        Dropdown
        <f-icon name="down" />
      </f-button>
    </f-dropdown>

    <code-box :code="{ html, javascript }" />
  </div>
</template>

<script>
import FDropdown from '../../../src/components/dropdown/FDropdown.vue';
import FDropdownItem from '../../../src/components/dropdown/FDropdownItem.vue';
import FButton from '../../../src/components/button/FButton.vue';
import FIcon from '../../../src/components/FIcon.vue';

export default {
  name: 'demo-dropdown-3',
  components: { FDropdown, FDropdownItem, FButton, FIcon },
  data() {
    return {
      dataSource: ['海贼王', '进击的巨人', '我的英雄学院', '火影忍者', '死神'],

      html: `
        <f-dropdown>
          <template slot="dropdown">
            <f-dropdown-item
              v-for="(n, index) in dataSource"
              :key="n"
              class="item"
              :disabled="index === 1"
            >
              <span>{{ n }}</span>
            </f-dropdown-item>
          </template>
          <f-button>
            Dropdown
            <f-icon name="down" />
          </f-button>
        </f-dropdown>
      `,
      javascript: `
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
