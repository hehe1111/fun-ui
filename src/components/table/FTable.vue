<template>
  <div
    class="f-table-outer-container"
    :style="outerContainerStyle"
    ref="outerContainerRef"
  >
    <div class="f-table-container">
      <table class="f-table" :class="tableClasses" ref="tableRef">
        <thead>
          <tr>
            <th v-if="isCollapseIconsColumnVisible">
              <span class="cell-inner">
                <f-icon
                  name="right"
                  class="icon-exits-to-keep-align right-icon"
                />
              </span>
            </th>
            <th v-if="isCheckBoxVisible">
              <span class="cell-inner">
                <input
                  type="checkbox"
                  :checked="isMainCheckBoxChecked"
                  @change="selectMainCheckBox"
                  ref="mainCheckBoxRef"
                />
              </span>
            </th>
            <th v-if="isIdVisible">
              <span class="cell-inner">#</span>
            </th>
            <th
              v-for="column in columns"
              :key="column.field"
              :data-name="column.field"
            >
              <span class="cell-inner">
                <span>{{ column.text }}</span>
                <span
                  v-if="column.field in mutableSortRules"
                  class="f-table-sort-icons"
                  :class="sortIconActiveClass(column.field)"
                  @click="reSort(column.field)"
                >
                  <f-icon name="up" class="icon up" />
                  <f-icon name="down" class="icon down" />
                </span>
              </span>
            </th>
          </tr>
        </thead>
        <tbody>
          <template v-for="item in dataSource">
            <tr :key="item.id" :class="highlightClass(item)">
              <td @click="toggleRow(item)" v-if="isCollapseIconsColumnVisible">
                <span class="cell-inner">
                  <f-icon
                    name="right"
                    class="right-icon"
                    :class="downIconClass(item)"
                    v-if="item.collapsibleContent"
                  />
                </span>
              </td>
              <td v-if="isCheckBoxVisible">
                <span class="cell-inner">
                  <input
                    type="checkbox"
                    :checked="getItemCheckBoxState(item)"
                    @change="selectItemCheckBox(item, $event)"
                  />
                </span>
              </td>
              <td v-if="isIdVisible">
                <span class="cell-inner">{{ item.id }}</span>
              </td>
              <td
                v-for="column in columns"
                :key="column.field"
                :data-name="column.field"
              >
                <span class="cell-inner">
                  <template v-if="column._template">
                    <custom-column-template
                      :vnodes="
                        column._template({
                          value: item[column.field],
                          item: { ...item },
                        })
                      "
                    />
                  </template>
                  <template v-else>{{ item[column.field] }}</template>
                </span>
              </td>
            </tr>
            <transition :key="`${item.id}-collapsible-row`" name="fade">
              <tr
                class="f-table-collapsible-row"
                :class="collapsibleRowClass"
                v-if="isRowCollapsed(item)"
              >
                <td :colspan="colspan">
                  <span>{{ item.collapsibleContent }}</span>
                </td>
              </tr>
            </transition>
          </template>
        </tbody>
      </table>
    </div>
    <div class="f-table-loading-mask" v-show="loading" ref="loadingMaskRef">
      <f-icon name="loading" class="f-table-loading-icon" />
    </div>
  </div>
</template>

<script>
import FIcon from '../FIcon.vue';

export default {
  name: 'FunUITable',
  components: {
    FIcon,
    customColumnTemplate: {
      functional: true,
      render: (h, context) => context.props.vnodes,
    },
  },
  props: {
    dataSource: {
      type: Array,
      validator: array => {
        return array.every(n => typeof n.id === 'string');
      },
    },
    isIdVisible: { type: Boolean, default: false },
    isCheckBoxVisible: { type: Boolean, default: false },
    selectedIds: {
      type: Array,
      default: () => [],
      validator: array => array.every(id => typeof id === 'string'),
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
    loading: { type: Boolean, default: false },
    bordered: { type: Boolean, default: false },
    striped: { type: Boolean, default: true },
    size: {
      type: String,
      default: undefined,
      validator: value => [undefined, 'small'].indexOf(value) >= 0,
    },
    height: Number,
    align: {
      type: String,
      default: 'left',
      validator: value => {
        return ['left', 'center', 'centre', 'right'].indexOf(value) >= 0;
      },
    },
  },
  data() {
    return {
      columns: [],
      mutableSelectedIds: [],
      isMainCheckBoxChecked: false,
      mutableSortRules: {},
      openedRowIds: [],
      ths: [],
      tds: [],
      thCellInners: [],
      tdCellInners: [],
    };
  },
  computed: {
    outerContainerStyle() {
      return {
        height: `${this.height}px`,
      };
    },
    tableClasses() {
      return {
        bordered: this.bordered,
        striped: this.striped,
        small: this.size,
        [`align-${this.align}`]: this.align,
      };
    },
    isCollapseIconsColumnVisible() {
      return this.dataSource.some(n => !!n.collapsibleContent);
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
    this.mutableSelectedIds = [...this.selectedIds];
    this.mutableSortRules = { ...this.sortRules };
    this.converSlotsToColumns();
  },
  mounted() {
    this.getElements();
    this.height && this.fixTHead();
  },
  updated() {
    this.height && this.onResize();
    this.loading && this.updateLoadingMaskStyle();
  },
  beforeDestroy() {
    if (!this.height) return;
    const { oldTC, newTC, onScrollOldTC, onScrollNewTC, onResize } = this;
    oldTC.removeEventListener('scroll', onScrollOldTC);
    newTC.removeEventListener('scroll', onScrollNewTC);
    newTC.remove();
    window.removeEventListener('resize', onResize);
  },
  methods: {
    converSlotsToColumns() {
      this.columns = this.$slots.default
        .filter(node => !!node.tag) // node maybe a empty string TEXT NODE
        .map(node => {
          const { text, field } = node.componentOptions.propsData;
          const _template =
            node.data.scopedSlots && node.data.scopedSlots.default;
          return { text, field, _template };
        });
    },
    getElements() {
      this.ths = Array.from(document.querySelectorAll('thead > tr > th'));
      this.thCellInners = Array.from(
        document.querySelectorAll('thead > tr > th > .cell-inner')
      );
      this.tds = Array.from(
        document.querySelectorAll('tbody > tr:first-child > td')
      );
      this.tdCellInners = Array.from(
        document.querySelectorAll('tbody > tr:first-child > td > .cell-inner')
      );
    },
    updateLoadingMaskStyle() {
      const { tableRef, loadingMaskRef } = this.$refs;
      const { width, height } = window.getComputedStyle(tableRef);
      loadingMaskRef.style.width = width;
      loadingMaskRef.style.height = height;
    },
    highlightClass(item) {
      return { highlight: this.mutableSelectedIds.indexOf(item.id) >= 0 };
    },
    sortIconActiveClass(field) {
      return {
        ascend: this.mutableSortRules[field] === 'ascend',
        descend: this.mutableSortRules[field] === 'descend',
      };
    },
    selectItemCheckBox({ id }, $event) {
      if ($event.target.checked) {
        this.mutableSelectedIds.push(id);
      } else {
        const index = this.mutableSelectedIds.indexOf(id);
        index >= 0 && this.mutableSelectedIds.splice(index, 1);
      }
    },
    selectMainCheckBox($event) {
      this.mutableSelectedIds = $event.target.checked
        ? this.dataSource.map(n => n.id)
        : [];
    },
    getItemCheckBoxState(item) {
      return this.mutableSelectedIds.indexOf(item.id) >= 0;
    },
    updateMainCheckBoxState() {
      const selectedIdsString = [...this.mutableSelectedIds].sort().join();
      const allIdsString = this.dataSource
        .map(n => n.id)
        .sort()
        .join();

      // 全选
      this.isMainCheckBoxChecked = selectedIdsString === allIdsString;
      // 半选
      this.$refs.mainCheckBoxRef.indeterminate =
        selectedIdsString.length && selectedIdsString !== allIdsString;
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
      return this.openedRowIds.indexOf(item.id) >= 0;
    },
    downIconClass(item) {
      return { down: this.isRowCollapsed(item) };
    },
    toggleRow(item) {
      const { id, collapsibleContent } = item;
      if (!collapsibleContent) return;
      const { openedRowIds } = this;
      const index = openedRowIds.indexOf(id);
      index >= 0 ? openedRowIds.splice(index, 1) : openedRowIds.push(id);
    },
    fixTHead() {
      this.appendOldTHeadToNewTable();
      if (!this.isEachHtmlElement([this.newTC, this.newTable])) return;
      this.updateOldTCStyle();
      this.hideOldTCVerticalScrollbar();
      this.onResize();
      window.addEventListener('resize', this.onResize);
      this.syncScroll();
    },
    isEachHtmlElement(array) {
      return array.every(el => el.nodeType === Node.ELEMENT_NODE);
    },
    appendOldTHeadToNewTable() {
      // oldTC: old table container
      // newTC: new table container
      const { outerContainerRef: ref } = this.$refs;
      this.oldTC = ref.querySelector('.f-table-container');
      this.oldTable = ref.querySelector('table');
      this.oldTHead = ref.querySelector('thead');
      this.oldTBody = ref.querySelector('tbody');

      this.newTC = this.oldTC.cloneNode(false);
      this.newTable = this.oldTable.cloneNode(false);
      this.newTable.appendChild(this.oldTHead);
      this.newTC.appendChild(this.newTable);
      ref.insertBefore(this.newTC, this.oldTC);
    },
    updateOldTCStyle() {
      const { newTC, oldTC, height } = this;
      const newTCHeight = newTC.getBoundingClientRect().height;
      oldTC.style.height = `${height - newTCHeight}px`;
      oldTC.style.overflow = 'auto';
      oldTC.style.borderBottomWidth = '1px';
      oldTC.style.borderBottomStyle = 'solid';
    },
    hideOldTCVerticalScrollbar() {
      const { offsetWidth, clientWidth } = this.oldTC;
      // PC: offsetWidth > clientWidth
      // mobile: offsetWidth === clientWidth
      if (offsetWidth - clientWidth === 17) {
        this.oldTC.style.marginRight = '-17px';
        this.oldTC.parentElement.style.overflow = 'hidden';
      }
    },
    hideNewTCHorizontalScrollbar() {
      const { newTC, oldTC } = this;
      newTC.style.overflow = 'auto';

      const { offsetHeight, clientHeight } = newTC;
      oldTC.style.marginTop = offsetHeight > clientHeight ? '-17px' : 0;
    },
    onResize() {
      this.reSizeCells({
        thWidthArray: this.getCellsWidthArray(this.ths),
        tdWidthArray: this.getCellsWidthArray(this.tds),
      });
      this.hideNewTCHorizontalScrollbar();
    },
    getCellsWidthArray(array) {
      return array.map(el => {
        // substract 1 for double count collapsed border
        return (
          el.getBoundingClientRect().width -
          1 -
          2 * window.parseInt(window.getComputedStyle(el).paddingLeft, 10) -
          2 * window.parseInt(window.getComputedStyle(el).borderLeftWidth, 10)
        );
      });
    },
    reSizeCells({ thWidthArray, tdWidthArray }) {
      this.thCellInners.map((el, i) => {
        const cellMaxWidth = Math.max(thWidthArray[i], tdWidthArray[i]);
        el.style.width = `${cellMaxWidth}px`;
        this.tdCellInners[i].style.width = `${cellMaxWidth}px`;
      });
    },
    syncScroll() {
      this.oldTC.addEventListener('scroll', this.onScrollOldTC);
      this.newTC.addEventListener('scroll', this.onScrollNewTC);
    },
    onScrollOldTC() {
      this.newTC.scrollLeft = this.oldTC.scrollLeft;
    },
    onScrollNewTC() {
      this.oldTC.scrollLeft = this.newTC.scrollLeft;
    },
  },
  watch: {
    mutableSelectedIds(newValue, oldValue) {
      this.$emit('update:selectedIds', newValue);
      this.isCheckBoxVisible && this.updateMainCheckBoxState();
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../../assets/_var.scss';

.icon-exits-to-keep-align {
  opacity: 0;
}

// collapsible row transition
.fade-enter-active,
.fade-leave-active {
  transition: opacity $duration ease-in-out;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.cell-inner {
  @extend .inline-flex-center;

  > .right-icon {
    // collapsible row icon transition
    transform: scale(0.8);
    transition: transform $duration linear;
    &.down {
      transform: scale(0.8) rotate(90deg);
    }
  }
}

.f-table {
  &.align-left {
    th,
    td {
      text-align: left;
    }
  }
  &.align-center {
    th,
    td {
      text-align: center;
    }
  }
  &.align-right {
    th,
    td {
      text-align: right;
    }
  }
}

// row highlight
.tbody-row-common {
  &:hover {
    background-color: $hoverGrey;
  }

  &.highlight {
    background-color: lighten($blue, 10%);
    color: #fff;
  }
}

.f-table-outer-container {
  position: relative;
  display: inline-block;
  vertical-align: top;

  > .f-table-container {
    border-bottom-color: $borderColorLight;

    > .f-table {
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
        word-break: break-all;
      }

      > thead > tr > th {
        > .cell-inner {
          > span.f-table-sort-icons {
            transform: scale(0.8);
            display: inline-flex;
            flex-direction: column;
            cursor: pointer;
            padding: 0 6px;

            > .icon {
              fill: $grey;

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
          background-color: $lightGrey;
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
      top: 10%;
      left: 50%;
      // transform: translate(-50%, -50%); 无效
      margin-top: -1em;
      margin-left: -1em;
    }
  }
}

/*
 * invalidate default style of table/th/td in vupress
 */
table,
th,
td {
  border: none;
}
</style>
