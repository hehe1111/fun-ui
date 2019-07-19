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
              <span
                class="f-table-column-title-and-sort-icons col-head"
                ref="colHeadRef"
              >
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
              </span>
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
                  v-if="item.collapsibleContent"
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
                <span class="col-body" ref="colBodyRef">
                  <template v-if="column.actions">
                    <f-button
                      v-for="action in column.actions"
                      :key="action.text"
                      @click="action.callback(item)"
                      class="f-table-action-button"
                      >{{ action.text }}</f-button
                    >
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
                <td :colspan="colspan">{{ item.collapsibleContent }}</td>
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
import FIcon from './FIcon.vue';
import FButton from './button/FButton.vue';

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
    selectedIds: {
      type: Array,
      default: () => [],
      validator: array => {
        return array.every(id => typeof id === 'string');
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
      mutableSelectedIds: [],
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
  },
  mounted() {
    this.height && this.fixTHead();
    this.updateLoadingMaskStyle();
  },
  destroyed() {
    const { oldTC, newTC, onScrollOldTC, onScrollNewTC, onResize } = this;
    oldTC && oldTC.removeEventListener('scroll', onScrollOldTC);
    newTC && newTC.removeEventListener('scroll', onScrollNewTC);
    newTC.remove();
    window.removeEventListener('resize', onResize);
  },
  methods: {
    updateLoadingMaskStyle() {
      const { tableRef, loadingMaskRef } = this.$refs;
      const { width: tableWidth, height: tableHeight } = getComputedStyle(
        tableRef
      );
      loadingMaskRef.style.width = tableWidth;
      loadingMaskRef.style.height = tableHeight;
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
    toggleRow({ id }) {
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
    },
    hideOldTCVerticalScrollbar() {
      const { offsetHeight, clientHeight } = this.oldTC;
      // PC: offsetHeight > clientHeight
      // mobile: offsetHeight === clientHeight
      if (offsetHeight - clientHeight === 17) {
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
      const { colHeadRef, colBodyRef } = this.$refs;
      const bodyCells = colBodyRef.slice(0, colHeadRef.length);

      const headCellsWidth = colHeadRef.map(
        el => el.getBoundingClientRect().width
      );
      const bodyCellsWidth = bodyCells.map(
        el => el.getBoundingClientRect().width
      );
      colHeadRef.map((el, index) => {
        const cellMaxWidth = Math.max(
          headCellsWidth[index],
          bodyCellsWidth[index]
        );
        el.style.width = `${cellMaxWidth}px`;
        bodyCells[index].style.width = `${cellMaxWidth}px`;
      });

      this.hideNewTCHorizontalScrollbar();
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
  components: { FIcon, FButton },
};
</script>

<style lang="scss" scoped>
@import '../assets/_var.scss';

// collapsible row transition
.fade-enter-active,
.fade-leave-active {
  transition: opacity $duration ease-in-out;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}

// collapsible row icon transition
.f-table-collapsible-row-icon-container > .right-icon {
  transform: scale(0.8);
  transition: transform $duration linear;
  &.down {
    transform: scale(0.8) rotate(90deg);
  }
}

#main-checkbox-container,
.cell-default {
  text-align: center;
  width: 2em;
}

// row highlight
.tbody-row-common {
  &:hover {
    background-color: $greyHover;
  }

  &.highlight {
    background-color: lighten($blue, 10%);
    color: #fff;
  }
}

// col alignment
.col-head,
.col-body {
  display: inline-block;
  vertical-align: top;
}

.f-table-outer-container {
  position: relative;
  .f-table-container {
    .f-table {
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
        white-space: nowrap;
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

        > td > span > .f-table-action-button {
          &:not(:last-child) {
            margin-right: 6px;
          }
        }

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
</style>
