<template>
  <div class="f-table-container">
    <table class="f-table">
      <thead>
        <tr>
          <th v-if="isIdVisiable">#</th>
          <th>
            <input type="checkbox" />
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
          <td v-if="isIdVisiable">{{ item.id }}</td>
          <td>
            <input
              type="checkbox"
              :checked="getItemCheckState(item)"
              @change="selectSingleItem(item, $event)"
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
    isIdVisiable: {
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
    };
  },
  created() {
    this.mutableSelectedItems = [...this.selectedItems];
  },
  methods: {
    highlightClass(item) {
      return { highlight: this.mutableSelectedItems.indexOf(item.id) >= 0 };
    },
    selectSingleItem({ id }, $event) {
      if ($event.target.checked) {
        this.mutableSelectedItems.push(id);
      } else {
        const index = this.mutableSelectedItems.indexOf(id);
        index >= 0 && this.mutableSelectedItems.splice(index, 1);
      }
    },
    getItemCheckState(item) {
      return this.mutableSelectedItems.indexOf(item.id) >= 0;
    },
  watch: {
    mutableSelectedItems(newValue, oldValue) {
      this.$emit('update:selectedItems', newValue);
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
