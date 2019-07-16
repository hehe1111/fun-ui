<template>
  <div class="f-table-container">
    <table class="f-table">
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
            {{ column.text }}
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
  </div>
</template>

<script>
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
  },
  data() {
    return {
      mutableSelectedItems: [],
      isMainCheckBoxChecked: false,
    };
  },
  created() {
    this.mutableSelectedItems = [...this.selectedItems];
  },
  methods: {
    highlightClass(item) {
      return { highlight: this.mutableSelectedItems.indexOf(item.id) >= 0 };
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
  },
  watch: {
    mutableSelectedItems(newValue, oldValue) {
      this.$emit('update:selectedItems', newValue);
      this.updateMainCheckBoxState();
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../assets/_var.scss';

.f-table-container {
  .f-table {
    width: 100%;
    border-collapse: collapse;

    th,
    td {
      padding: 0.4em 0.8em;
      border-bottom: 1px solid $borderColorLight;
    }

    > thead {
      > tr {
        > th {
          text-align: left;
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

          > td {
            border-bottom-color: #fff;
          }
        }
      }
    }
  }
}
</style>
