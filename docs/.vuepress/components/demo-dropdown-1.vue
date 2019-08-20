<template>
  <div class="demo-dropdown-1 extra-margin">
    <div class="demo-dropdown-1-dropdowns">
      <f-dropdown>
        <template slot="dropdown">
          <f-dropdown-item v-for="n in dataSource" :key="n" class="item">
            <span>{{ n }}</span>
          </f-dropdown-item>
        </template>
        <f-button>
          Hover(default)
          <f-icon name="down" />
        </f-button>
      </f-dropdown>

      <f-dropdown trigger="click">
        <template slot="dropdown">
          <f-dropdown-item v-for="n in dataSource" :key="n" class="item">
            <span>{{ n }}</span>
          </f-dropdown-item>
        </template>
        <f-button>
          Click
          <f-icon name="down" />
        </f-button>
      </f-dropdown>
    </div>

    <code-box :htmlCode="htmlCode" :javascriptCode="javascriptCode" :scssCode="scssCode" />
  </div>
</template>

<script>
import FDropdown from '../../../src/components/dropdown/FDropdown.vue';
import FDropdownItem from '../../../src/components/dropdown/FDropdownItem.vue';
import FButton from '../../../src/components/button/FButton.vue';
import FIcon from '../../../src/components/FIcon.vue';

export default {
  name: 'demo-dropdown-1',
  components: { FDropdown, FDropdownItem, FButton, FIcon },
  data() {
    return {
      dataSource: ['海贼王', '进击的巨人', '我的英雄学院', '火影忍者', '死神'],

      htmlCode: `
        <div class="demo-dropdown-1-dropdowns">
          <f-dropdown>
            <template slot="dropdown">
              <f-dropdown-item v-for="n in dataSource" :key="n" class="item">
                <span>{{ n }}</span>
              </f-dropdown-item>
            </template>
            <f-button>
              Hover(default)
              <f-icon name="down" />
            </f-button>
          </f-dropdown>

          <f-dropdown trigger="click">
            <template slot="dropdown">
              <f-dropdown-item v-for="n in dataSource" :key="n" class="item">
                <span>{{ n }}</span>
              </f-dropdown-item>
            </template>
            <f-button>
              Click
              <f-icon name="down" />
            </f-button>
          </f-dropdown>
        </div>
      `,
      javascriptCode: `
        data() {
          return {
            dataSource: ['海贼王', '进击的巨人', '我的英雄学院', '火影忍者', '死神'],
          };
        },
      `,
      scssCode: `
        .demo-dropdown-1 {
          &-dropdowns {
            display: flex;
            align-items: center;
          }
        }
        .item {
          @extend .flex-center;
          transition: all $duration ease-in-out;
          &:hover {
            background-color: $blue;
            color: #fff;
          }
        }
      `,
    };
  },
};
</script>

<style lang="scss" scoped>
@import '../assets/style/_var.scss';
@import '../assets/style/demo-dropdown.scss';

.demo-dropdown-1 {
  &-dropdowns {
    display: flex;
    align-items: center;
  }
}
</style>
