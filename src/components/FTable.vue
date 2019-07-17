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
            <th v-if="isIdVisible">#</th>
            <th v-if="isCheckBoxVisible">
              <input
                type="checkbox"
                :checked="isMainCheckBoxChecked"
                @change="selectMainCheckBox"
                ref="mainCheckBoxRef"
              />
            </th>
            <th v-for="column in columns" :key="column.field">
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
          <tr
            v-for="item in dataSource"
            :key="item.id"
            :class="highlightClass(item)"
          >
            <td v-if="isIdVisible">{{ item.id }}</td>
            <td v-if="isCheckBoxVisible">
              <input
                type="checkbox"
                :checked="getItemCheckBoxState(item)"
                @change="selectItemCheckBox(item, $event)"
              />
            </td>
            <td v-for="column in columns" :key="column.field">
              {{ item[column.field] }}
            </td>
          </tr>
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
  },
  created() {
    this.mutableSelectedItems = [...this.selectedItems];
    this.mutableSortRules = { ...this.sortRules };
  },
  mounted() {
    this.height && this.fixTHead();
  },
  beforeDestroy() {
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
    fixTHead() {
      const { outerContainerRef: ref } = this.$refs;
      const oldTableContainer = ref.querySelector('.f-table-container');
      const oldTable = ref.querySelector('table');
      const oldTHead = ref.querySelector('thead');

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

      this.onResize = () => {
        // 窗口大小变化时保持在大部分情况下「列」不错位
        const oldTBody = ref.querySelector('tbody');
        const tds = Array.from(oldTBody.children[0].children);
        const ths = Array.from(oldTHead.children[0].children);
        ths.forEach((th, index) => {
          th.style.width = `${tds[index].getBoundingClientRect().width}px`;
        });
      };

      this.onResize();
      window.addEventListener('resize', this.onResize);
    },
  },
  watch: {
    mutableSelectedItems(newValue, oldValue) {
      this.$emit('update:selectedItems', newValue);
      this.updateMainCheckBoxState();
    },
  },
  components: { FIcon },
};
</script>

<style lang="scss" scoped>
@import '../assets/_var.scss';

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
