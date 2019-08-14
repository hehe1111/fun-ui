<template>
  <div class="demo-table-1 extra-margin">
    <div class="component-container">
      <f-table
        :data-source="dataSource"
        :selected-ids="selectedIds"
        :sort-rules="sortRules"
        @re-sort="reSort"
        :loading="loading"
        :is-id-visible="true"
        :is-check-box-visible="true"
      >
        <f-table-column text="姓名" field="name">
          <template slot-scope="props">
            <a
              :href="`https://www.google.com/search?q=${props.item.moto}`"
              style="color: red; font-weight: bold"
            >{{ props.value }}</a>
          </template>
        </f-table-column>
        <f-table-column text="成绩" field="score" />
        <f-table-column text="班级" field="class" />
        <f-table-column text="座右铭" field="moto">
          <template slot-scope="props">
            <span style="color: gold;">{{ props.value }}</span>
          </template>
        </f-table-column>
        <f-table-column text="操作" field="actions">
          <template slot-scope="props">
            <f-popover>
              <template slot="content">当前行数据：{{JSON.stringify(props.item)}}</template>
              <f-button small>点我弹出</f-button>
            </f-popover>
          </template>
        </f-table-column>
      </f-table>
      <!-- :bordered="true" -->
      <!-- :striped="true" -->
      <!-- :height="200" -->
      <!-- align="left" -->
      <!-- size="small" -->
    </div>

    <code-box>
      <pre>
        <code class="html">{{htmlCode}}</code>
        <code class="javascript">{{javascriptCode}}</code>
      </pre>
    </code-box>
  </div>
</template>

<script>
import FTable from '../../../src/components/table/FTable.vue';
import FTableColumn from '../../../src/components/table/FTableColumn.vue';
import FPopover from '../../../src/components/FPopover.vue';
import FButton from '../../../src/components/button/FButton.vue';
import removePrefixSpace from '../assets/js/remove-prefix-space.js';

export default {
  name: 'demo-table-1',
  components: { FTable, FTableColumn, FPopover, FButton },
  data() {
    return {
      dataSource: [
        {
          id: '1',
          name: '01 ',
          score: 100,
          class: '1 班',
          collapsibleContent: '弹出折叠内容1',
          moto: '天地玄黄，宇宙洪荒',
        },
        {
          id: '22222222222222',
          name: '02 小黄人',
          score: 90,
          class: '2 班',
          collapsibleContent: '弹出折叠内容2',
          moto: '2333333333333333333333333333',
        },
        {
          id: '3',
          name: '03 小黄人',
          score: 100,
          class: '3 班',
          moto: '朕',
        },
        {
          id: '4',
          name: '04 小黄人',
          score: 800,
          class: '3 班',
          moto: 'show me the code',
        },
        {
          id: '5',
          name: '05 小黄人',
          score: 50,
          class: '4 班',
          moto: 'i love banana',
        },
        {
          id: '6',
          name: '06 小黄人',
          score: 70,
          class: '1 班',
          collapsibleContent: '弹出折叠内容6',
          moto: '人的梦想，是不会结束的~！',
        },
        {
          id: '7',
          name: '07 小黄人',
          score: 30,
          class: '3 班',
          collapsibleContent: '弹出折叠内容7',
          moto: '窗外的麻雀，在电线杆上啵嘴~',
        },
        {
          id: '8',
          name: '08 小黄人',
          score: 10,
          class: '2 班',
          collapsibleContent: '弹出折叠内容8',
          moto: 'Error...I hate coding...It works!!!I love coding!!!',
        },
        {
          id: '9',
          name: '09 小黄人',
          score: 60,
          class: '1 班',
          collapsibleContent: '弹出折叠内容9',
          moto: 'hello world',
        },
        {
          id: '10',
          name: '10 小黄人',
          score: 90,
          class: '4 班',
          collapsibleContent: '弹出折叠内容10',
          moto: '010101',
        },
        {
          id: '11',
          name: '11 小黄人',
          score: 20,
          class: '2 班',
          collapsibleContent: '弹出折叠内容11',
          moto: 'i am the king of the world',
        },
        {
          id: '12',
          name: '12 小黄人',
          score: 100,
          class: '4 班',
          collapsibleContent: '弹出折叠内容12',
          moto: 'let your name speak for yourself',
        },
        {
          id: '13',
          name: '13 小黄人',
          score: 50,
          class: '3 班',
          collapsibleContent: '弹出折叠内容13',
          moto: '神罗天征',
        },
      ],
      selectedIds: ['3'],
      // 可传一或多个规则，或不传
      // sortRules: { name: 'ascend' },
      // sortRules: { name: 'ascend', score: 'descend' },
      sortRules: { name: 'ascend', score: 'descend', class: true },
      loading: false,

      htmlCode: removePrefixSpace(`
        <f-table
          :data-source="dataSource"
          :selected-ids="selectedIds"
          :sort-rules="sortRules"
          @re-sort="reSort"
          :loading="loading"
          :is-id-visible="true"
          :is-check-box-visible="true"
        >
          <f-table-column text="姓名" field="name">
            <template slot-scope="props">
              <a
                :href="\`https://www.google.com/search?q=\${props.item.moto}\`"
                style="color: red; font-weight: bold"
              >{{ props.value }}</a>
            </template>
          </f-table-column>
          <f-table-column text="成绩" field="score" />
          <f-table-column text="班级" field="class" />
          <f-table-column text="座右铭" field="moto">
            <template slot-scope="props">
              <span style="color: gold;">{{ props.value }}</span>
            </template>
          </f-table-column>
          <f-table-column text="操作" field="actions">
            <template slot-scope="props">
              <f-popover>
                <template slot="content">当前行数据：{{JSON.stringify(props.item)}}</template>
                <f-button small>点我弹出</f-button>
              </f-popover>
            </template>
          </f-table-column>
        </f-table>
      `),
      javascriptCode: removePrefixSpace(`
        data() {
          return {
            dataSource: [
              {
                id: '1',
                name: '01 ',
                score: 100,
                class: '1 班',
                collapsibleContent: '弹出折叠内容1',
                moto: '天地玄黄，宇宙洪荒',
              },
              {
                id: '22222222222222',
                name: '02 小黄人',
                score: 90,
                class: '2 班',
                collapsibleContent: '弹出折叠内容2',
                moto: '2333333333333333333333333333',
              },
              {
                id: '3',
                name: '03 小黄人',
                score: 100,
                class: '3 班',
                moto: '朕',
              },
              {
                id: '4',
                name: '04 小黄人',
                score: 800,
                class: '3 班',
                moto: 'show me the code',
              },
              {
                id: '5',
                name: '05 小黄人',
                score: 50,
                class: '4 班',
                moto: 'i love banana',
              },
              {
                id: '6',
                name: '06 小黄人',
                score: 70,
                class: '1 班',
                collapsibleContent: '弹出折叠内容6',
                moto: '人的梦想，是不会结束的~！',
              },
              {
                id: '7',
                name: '07 小黄人',
                score: 30,
                class: '3 班',
                collapsibleContent: '弹出折叠内容7',
                moto: '窗外的麻雀，在电线杆上啵嘴~',
              },
              {
                id: '8',
                name: '08 小黄人',
                score: 10,
                class: '2 班',
                collapsibleContent: '弹出折叠内容8',
                moto: 'Error...I hate coding...It works!!!I love coding!!!',
              },
              {
                id: '9',
                name: '09 小黄人',
                score: 60,
                class: '1 班',
                collapsibleContent: '弹出折叠内容9',
                moto: 'hello world',
              },
              {
                id: '10',
                name: '10 小黄人',
                score: 90,
                class: '4 班',
                collapsibleContent: '弹出折叠内容10',
                moto: '010101',
              },
              {
                id: '11',
                name: '11 小黄人',
                score: 20,
                class: '2 班',
                collapsibleContent: '弹出折叠内容11',
                moto: 'i am the king of the world',
              },
              {
                id: '12',
                name: '12 小黄人',
                score: 100,
                class: '4 班',
                collapsibleContent: '弹出折叠内容12',
                moto: 'let your name speak for yourself',
              },
              {
                id: '13',
                name: '13 小黄人',
                score: 50,
                class: '3 班',
                collapsibleContent: '弹出折叠内容13',
                moto: '神罗天征',
              },
            selectedIds: ['3'],
            // 可传一或多个规则，或不传
            // sortRules: { name: 'ascend' },
            // sortRules: { name: 'ascend', score: 'descend' },
            sortRules: { name: 'ascend', score: 'descend', class: true },
            loading: false,
          },
        },
        methods: {
          reSort(rules) {
            this.loading = true;
            // 模拟后端排序
            setTimeout(() => {
              Object.keys(rules).forEach(k => {
                rules[k] === 'ascend' &&
                  this.dataSource.sort((a, b) => {
                    if (a[k] < b[k]) return -1;
                    if (a[k] > b[k]) return 1;
                    return 0;
                  });
                rules[k] === 'descend' &&
                  this.dataSource.sort((a, b) => {
                    if (a[k] < b[k]) return 1;
                    if (a[k] > b[k]) return -1;
                    return 0;
                  });
              });
              this.loading = false;
            }, 3000);
          },
        }
      `),
    };
  },
  methods: {
    reSort(rules) {
      this.loading = true;
      // 模拟后端排序
      setTimeout(() => {
        Object.keys(rules).forEach(k => {
          rules[k] === 'ascend' &&
            this.dataSource.sort((a, b) => {
              if (a[k] < b[k]) return -1;
              if (a[k] > b[k]) return 1;
              return 0;
            });
          rules[k] === 'descend' &&
            this.dataSource.sort((a, b) => {
              if (a[k] < b[k]) return 1;
              if (a[k] > b[k]) return -1;
              return 0;
            });
        });
        this.loading = false;
      }, 3000);
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../assets/style/_var.scss';

.demo-table-1 {
  .component-container {
    padding: 20px;
    border: 2px solid $blue;
    overflow: auto;
  }
}
</style>
