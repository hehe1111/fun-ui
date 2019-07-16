<template>
  <div class="f-table-container">
    <table class="f-table" :class="tableClasses">
      <thead>
        <tr>
          <th v-if="isIdVisible">#</th>
          <th>
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
          <td>
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
  },
  data() {
    return {
      mutableSelectedItems: [],
      isMainCheckBoxChecked: false,
      mutableSortRules: {},
    };
  },
  computed: {
    tableClasses() {
      return {
        bordered: this.bordered,
      };
    },
  },
  created() {
    this.mutableSelectedItems = [...this.selectedItems];
    this.mutableSortRules = { ...this.sortRules };
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

.f-table-container {
  position: relative;
  .f-table {
    width: 100%;
    border-collapse: collapse;

    &.bordered,
    &.bordered th,
    &.bordered td {
      border: 1px solid $borderColorLight;
    }

    th,
    td {
      padding: 0.4em 0.8em;
      border-bottom: 1px solid $borderColorLight;
    }

    > thead {
      > tr {
        > th {
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
      }
    }

    > tbody {
      > tr {
        &:nth-child(odd) {
          background-color: $grey;
        }

        &:hover {
          background-color: $greyHover;
        }

        &.highlight {
          background-color: lighten($blue, 10%);
          color: #fff;
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
