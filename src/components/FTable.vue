<template>
  <table class="f-table">
    <thead>
      <tr>
        <th v-if="isIdVisiable">#</th>
        <th v-for="column in columns" :key="column.field">{{ column.text }}</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in dataSource" :key="item.id">
        <td v-if="isIdVisiable">{{ item.id }}</td>
        <td v-for="column in columns" :key="column.field">
          {{ item[column.field] }}
        </td>
      </tr>
    </tbody>
  </table>
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
  },
};
</script>

<style lang="scss" scoped>
@import '../assets/_var.scss';

.f-table {
  border-collapse: collapse;

  > tbody {
    > tr {
      &:nth-child(odd) {
        background-color: $grey;
      }

      &:hover {
        background-color: $greyHover;
      }
    }
  }

  th,
  td {
    padding: 0.4em 0.8em;
    border-bottom: 1px solid $borderColorLight;
  }
}
</style>
