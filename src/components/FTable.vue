<template>
  <div
    class="f-table-outer-container"
    :style="outerContainerStyle"
    ref="outerContainerRef"
  >
    <div class="f-table-container">
      <table class="f-table" :class="tableClasses">
        <thead>
          <tr>
            <th
              class="f-table-collapsible-row-icon-container cell-default"
              v-if="isCollapseIconsColumnVisible"
              data-role="exits-to-keep-align"
            >
              <f-icon name="right" class="right-icon" :style="{ opacity: 0 }" />
            </th>
            <th
              v-if="isCheckBoxVisible"
              class="cell-default"
              id="main-checkbox-container"
            >
              <input
                type="checkbox"
                :checked="isMainCheckBoxChecked"
                @change="selectMainCheckBox"
                ref="mainCheckBoxRef"
              />
            </th>
            <th v-if="isIdVisible">#</th>
            <th
              v-for="column in columns"
              :key="column.field"
              :data-name="column.field"
            >
              <div class="f-table-column-title-and-sort-icons">
                <span class="f-table-column-title">{{ column.text }}</span>
                <span
                  v-if="column.field in mutableSortRules"
                  class="f-table-sort-icons"
                  :class="sortIconActiveClass(column.field)"
                  @click="reSort(column.field)"
                >
                  <f-icon name="up" class="icon up" />
                  <f-icon name="down" class="icon down" />
                </span>
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          <template v-for="item in dataSource">
            <tr :key="item.id" :class="highlightClass(item)">
              <td
                class="f-table-collapsible-row-icon-container cell-default"
                @click="toggleRow(item)"
                v-if="isCollapseIconsColumnVisible"
              >
                <f-icon
                  name="right"
                  class="right-icon"
                  :class="downIconClass(item)"
                  v-if="item.description"
                />
              </td>
              <td v-if="isCheckBoxVisible" class="cell-default">
                <input
                  type="checkbox"
                  :checked="getItemCheckBoxState(item)"
                  @change="selectItemCheckBox(item, $event)"
                />
              </td>
              <td v-if="isIdVisible">{{ item.id }}</td>
              <td
                v-for="column in columns"
                :key="column.field"
                :data-name="column.field"
              >
                {{ item[column.field] }}
              </td>
            </tr>
            <transition :key="`${item.id}-collapsible-row`" name="fade">
              <tr
                class="f-table-collapsible-row"
                :class="collapsibleRowClass"
                v-if="isRowCollapsed(item)"
              >
                <td :colspan="colspan">{{ item.description }}</td>
              </tr>
            </transition>
          </template>
        </tbody>
      </table>
    </div>
    <div class="f-table-loading-mask" v-if="loading">
      <f-icon name="loading" class="f-table-loading-icon" />
    </div>
  </div>
</template>

<script>
import FIcon from './FIcon.vue';

export default {
  name: 'FunUITable',
  props: {
    columns: {
      type: Array,
    },
    dataSource: {
      type: Array,
    },
    isIdVisible: {
      type: Boolean,
      default: false,
    },
    isCheckBoxVisible: {
      type: Boolean,
      default: false,
    },
    selectedItems: {
      type: Array,
      default: () => [],
      validator: array => {
        return array.every(n => typeof n === 'number');
      },
    },
    sortRules: {
      type: Object,
      default: () => ({}),
      validator: obj => {
        return Object.keys(obj).every(key => {
          return ['ascend', 'descend', true].indexOf(obj[key]) >= 0;
        });
      },
    },
    loading: {
      type: Boolean,
      default: false,
    },
    bordered: {
      type: Boolean,
      default: false,
    },
    striped: {
      type: Boolean,
      default: true,
    },
    size: {
      type: String,
      default: undefined,
      validator: value => {
        return [undefined, 'small'].indexOf(value) >= 0;
      },
    },
    height: Number,
  },
  data() {
    return {
      mutableSelectedItems: [],
      isMainCheckBoxChecked: false,
      mutableSortRules: {},
      openedRowIds: [],
    };
  },
  computed: {
    outerContainerStyle() {
      return {
        height: `${this.height}px`,
        borderBottom: this.height ? '1px solid #ddd' : 'none',
      };
    },
    tableClasses() {
      return {
        bordered: this.bordered,
        striped: this.striped,
        small: this.size,
      };
    },
    isCollapseIconsColumnVisible() {
      return this.dataSource.some(n => !!n.description);
    },
    collapsibleRowClass() {
      return { small: this.size };
    },
    colspan() {
      return (
        1 +
        this.columns.length +
        (this.isIdVisible ? 1 : 0) +
        (this.isCheckBoxVisible ? 1 : 0)
      );
    },
  },
  created() {
    this.mutableSelectedItems = [...this.selectedItems];
    this.mutableSortRules = { ...this.sortRules };
  },
  mounted() {
    this.height && this.fixTHead();
  },
  destroyed() {
    this.newTableContainer.remove();
    window.removeEventListener('resize', this.onResize);
  },
  methods: {
    highlightClass(item) {
      return { highlight: this.mutableSelectedItems.indexOf(item.id) >= 0 };
    },
    sortIconActiveClass(field) {
      return {
        ascend: this.mutableSortRules[field] === 'ascend',
        descend: this.mutableSortRules[field] === 'descend',
      };
    },
    selectItemCheckBox({ id }, $event) {
      if ($event.target.checked) {
        this.mutableSelectedItems.push(id);
      } else {
        const index = this.mutableSelectedItems.indexOf(id);
        index >= 0 && this.mutableSelectedItems.splice(index, 1);
      }
    },
    selectMainCheckBox($event) {
      this.mutableSelectedItems = $event.target.checked
        ? this.dataSource.map(n => n.id)
        : [];
    },
    getItemCheckBoxState(item) {
      return this.mutableSelectedItems.indexOf(item.id) >= 0;
    },
    updateMainCheckBoxState() {
      const selectedItemsString = [...this.mutableSelectedItems].sort().join();
      const allItemsString = this.dataSource
        .map(n => n.id)
        .sort()
        .join();

      // 全选
      this.isMainCheckBoxChecked = selectedItemsString === allItemsString;
      // 半选
      if (
        selectedItemsString.length &&
        selectedItemsString !== allItemsString
      ) {
        this.$refs.mainCheckBoxRef.indeterminate = true;
      } else {
        this.$refs.mainCheckBoxRef.indeterminate = false;
      }
    },
    reSort(field) {
      const { mutableSortRules } = this;
      const oldValues = ['ascend', 'descend', true];
      const newValues = ['descend', true, 'ascend'];
      const index = oldValues.indexOf(mutableSortRules[field]);
      index >= 0
        ? (mutableSortRules[field] = newValues[index])
        : this.$set(mutableSortRules, field, 'ascend');
      this.$emit('re-sort', mutableSortRules);
    },
    isRowCollapsed(item) {
      return item.description && this.openedRowIds.indexOf(item.id) >= 0;
    },
    downIconClass({ id }) {
      return { down: this.openedRowIds.indexOf(id) >= 0 };
    },
    toggleRow({ id }) {
      const { openedRowIds } = this;
      const index = openedRowIds.indexOf(id);
      index >= 0 ? openedRowIds.splice(index, 1) : openedRowIds.push(id);
    },
    fixTHead() {
      const { outerContainerRef: ref } = this.$refs;
      const oldTableContainer = ref.querySelector('.f-table-container');
      const oldTable = ref.querySelector('table');
      const oldTHead = ref.querySelector('thead');
      const oldTBody = ref.querySelector('tbody');

      // 挖出 thead，放到新 table 里
      this.newTableContainer = oldTableContainer.cloneNode(false);
      const newTable = oldTable.cloneNode(false);
      newTable.appendChild(oldTHead);
      this.newTableContainer.appendChild(newTable);
      ref.insertBefore(this.newTableContainer, oldTableContainer);

      // 调整样式
      const { height: oldTHeadHeight } = oldTHead.getBoundingClientRect();
      oldTableContainer.style.height = `${this.height - oldTHeadHeight}px`;
      oldTableContainer.style.overflow = 'auto';
      if (this.height < oldTable.getBoundingClientRect().height) {
        // 隐藏出现的竖直滚动条
        oldTableContainer.style.marginRight = '-17px';
        ref.style.overflow = 'hidden';
      }
      // 防止列头和列内容错位
      this.onResize = () => {
        // 这一句必须加，否则在移动端上依然会错位
        oldTable.style.width = getComputedStyle(newTable).width;
        // 只需要让 tbody 的第一行的 td 的宽度等于 th 的宽度即可
        const tds = Array.from(oldTBody.querySelectorAll('tr')[0].children);
        const ths = newTable.querySelectorAll('th');
        tds.forEach((td, index) => {
          td.width = getComputedStyle(ths[index]).width;
        });
      };

      this.onResize();
      window.addEventListener('resize', this.onResize);
    },
  },
  watch: {
    mutableSelectedItems(newValue, oldValue) {
      this.$emit('update:selectedItems', newValue);
      this.isCheckBoxVisible && this.updateMainCheckBoxState();
    },
  },
  components: { FIcon },
};
</script>

<style lang="scss" scoped>
@import '../assets/_var.scss';

// collapsiable row transition
.fade-enter-active,
.fade-leave-active {
  transition: opacity $duration ease-in-out;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}

#main-checkbox-container,
.cell-default {
  text-align: center;
  width: 2em;
}

.f-table-collapsible-row-icon-container > .right-icon {
  transform: scale(0.8);
  transition: transform $duration linear;
  &.down {
    transform: scale(0.8) rotate(90deg);
  }
}

.tbody-row-common {
  &:hover {
    background-color: $greyHover;
  }

  &.highlight {
    background-color: lighten($blue, 10%);
    color: #fff;
  }
}

.f-table-outer-container {
  position: relative;
  .f-table-container {
    .f-table {
      width: 100%;
      border-collapse: collapse;

      &.bordered,
      &.bordered th,
      &.bordered td {
        border: 1px solid $borderColorLight;
      }

      &.small th,
      &.small td {
        padding: 0.2em;
      }

      th,
      td {
        padding: 0.4em 0.8em;
        border-bottom: 1px solid $borderColorLight;
      }

      > thead > tr > th {
        text-align: left;

        > .f-table-column-title-and-sort-icons {
          @extend .inline-flex-center;

          > span.f-table-sort-icons {
            transform: scale(0.8);
            display: inline-flex;
            flex-direction: column;
            cursor: pointer;
            padding: 0 6px;

            > .icon {
              fill: $darkGrey;

              &.up {
                margin-bottom: -2px;
              }

              &.down {
                margin-top: -2px;
              }
            }

            &.ascend > .icon.up,
            &.descend > .icon.down {
              fill: $blue;
            }
          }
        }
      }

      &.striped > tbody > tr {
        @extend .tbody-row-common;
        &:nth-child(odd) {
          background-color: $grey;
          @extend .tbody-row-common;
        }
      }

      > tbody > tr {
        @extend .tbody-row-common;
        background-color: #fff;

        &.f-table-collapsible-row {
          background-color: #fff !important;
          > td {
            padding: 1em 2em;
          }

          &.small > td {
            padding: 0.2em 2em;
          }
        }
      }
    }
  }

  > .f-table-loading-mask {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background-color: rgba(255, 255, 255, 0.8);
    user-select: none;

    > .f-table-loading-icon {
      @extend .flex-center;
      width: 2em;
      height: 2em;
      position: absolute;
      top: 50%;
      left: 50%;
      // transform: translate(-50%, -50%); 无效
      margin-top: -1em;
      margin-left: -1em;
    }
  }
}
</style>
