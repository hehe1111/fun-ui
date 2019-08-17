<template>
  <div class="demo-table-10 extra-margin">
    <f-table :data-source="dataSource" :height="200">
      <f-table-column text="姓名" field="name" />
      <f-table-column text="成绩" field="score" />
      <f-table-column text="班级" field="class" />
      <f-table-column text="操作" field="actions">
        <template slot-scope="props">
          <f-popover>
            <template slot="content">{{props.item}}</template>
            <f-button small>Popover info</f-button>
          </f-popover>
        </template>
      </f-table-column>
      <f-table-column text="座右铭" field="moto">
        <template slot-scope="props">
          <a
            :href="`https://www.google.com/search?q=${props.value}`"
            style="color: gold;"
            target="_blank"
          >{{ props.value }}</a>
        </template>
      </f-table-column>
    </f-table>

    <code-box :htmlCode="htmlCode" :javascriptCode="javascriptCode" />
  </div>
</template>

<script>
import FButton from '../../../src/components/button/FButton.vue';
import FPopover from '../../../src/components/FPopover.vue';
import FTable from '../../../src/components/table/FTable.vue';
import FTableColumn from '../../../src/components/table/FTableColumn.vue';
import tableData from '../assets/js/table-data.js';

export default {
  name: 'demo-table-10',
  components: { FButton, FPopover, FTable, FTableColumn },
  data() {
    return {
      dataSource: tableData,

      htmlCode: `
        <f-table :data-source="dataSource" :height="200">
          <f-table-column text="姓名" field="name" />
          <f-table-column text="成绩" field="score" />
          <f-table-column text="班级" field="class" />
          <f-table-column text="操作" field="actions">
            <template slot-scope="props">
              <f-popover>
                <template slot="content">{{props.item}}</template>
                <f-button small>Popover info</f-button>
              </f-popover>
            </template>
          </f-table-column>
          <f-table-column text="座右铭" field="moto">
            <template slot-scope="props">
              <a
                :href="\`https://www.google.com/search?q=\${props.value}\`"
                style="color: gold;"
              >{{ props.value }}</a>
            </template>
          </f-table-column>
        </f-table>
      `,
      javascriptCode: `
        data() {
          return {
            dataSource: tableData,
          }
        }
      `,
    };
  },
};
</script>

<style lang="scss" scoped>
@import '../assets/style/_var.scss';
</style>
