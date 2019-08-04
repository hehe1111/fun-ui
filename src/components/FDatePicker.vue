<template>
  <div :class="n2c()">
    <f-popover position="bottom" :contentStyle="contentStyle">
      <f-input :value="selectedDate" />
      <template slot="content">
        <div :class="n2c('panel')">
          <div :class="n2c('nav')">
            <f-icon :class="n2c('icon', 'last-year')" name="double-left" />
            <f-icon :class="n2c('icon', 'last-month')" name="left" />
            <span :class="n2c('year-month')" @click="onToggleYearMonth"
              >{{ value.getFullYear() }} 年 {{ value.getMonth() + 1 }} 月</span
            >
            <f-icon :class="n2c('icon', 'next-month')" name="right" />
            <f-icon :class="n2c('icon', 'next-year')" name="double-right" />
          </div>
          <div :class="n2c('body')">
            <!-- eslint-disable-next-line prettier/prettier -->
            <template v-if="mode === 'yearMonth'">选择年和月</template>
            <template v-if="mode === 'date'">
              <div :class="n2c('panel-row', 'weekdays')">
                <span
                  :class="n2c('panel-cell', 'weekday-cell')"
                  v-for="d in weekdays"
                  :key="d"
                  >{{ d }}</span
                >
              </div>
              <div :class="n2c('panel-row')" v-for="i in 6" :key="`row-${i}`">
                <span
                  :class="cellClasses(getDateObjectFromDates(i, j))"
                  v-for="j in 7"
                  :key="`row-${i}-cell-${j}`"
                  @click="onClickCell(getDateObjectFromDates(i, j))"
                  >{{ getDateObjectFromDates(i, j).getDate() }}</span
                >
              </div>
            </template>
          </div>
          <div :class="n2c('footer')">
            <f-button :class="n2c('action')" @click="onClickToday"
              >今天</f-button
            >
            <f-button :class="n2c('action')" @click="onClickClear"
              >清除</f-button
            >
          </div>
        </div>
      </template>
    </f-popover>
  </div>
</template>

<script>
import FIcon from './FIcon.vue';
import FInput from './FInput.vue';
import FPopover from './FPopover.vue';
import FButton from './button/FButton.vue';

import {
  optionsName2ClassPrefix,
  getFormattedDate,
  getFirstDateOfMonth,
  oneOf,
} from '../assets/utils.js';

export default {
  name: 'FunUIDatePicker',
  data() {
    return {
      mode: 'date', // date || yearMonth
      contentStyle: { width: '', padding: 0 },
    };
  },
  model: {
    // https://cn.vuejs.org/v2/guide/components-custom-events.html#自定义组件的-v-model
    prop: 'value',
    event: 'input',
  },
  props: {
    value: {
      type: Date,
      default: () => new Date(),
    },
    startWeekOn: {
      type: [Number, String],
      default: 1,
      validator(value) {
        return oneOf(value, [0, 1, '0', '1']);
      },
    },
    separator: {
      type: String,
      default: '/',
      validator(value) {
        return oneOf(value, ['-', '/']);
      },
    },
  },
  computed: {
    selectedDate() {
      return getFormattedDate(this.value);
    },
    n2c() {
      return optionsName2ClassPrefix(this.$options.name);
    },
    startWeekOnMonday() {
      return `${this.startWeekOn}` === '1';
    },
    weekdays() {
      const tmp = ['一', '二', '三', '四', '五', '六'];
      const sunday = ['日'];
      return this.startWeekOnMonday ? tmp.concat(sunday) : sunday.concat(tmp);
    },
    computeDates() {
      const firstDateOfMonth = getFirstDateOfMonth(this.value);
      const weekdayOfFirstDateOfMonth = firstDateOfMonth.getDay();
      let delta;
      if (this.startWeekOnMonday) {
        delta =
          weekdayOfFirstDateOfMonth === 0 ? 6 : weekdayOfFirstDateOfMonth - 1;
      } else {
        delta = weekdayOfFirstDateOfMonth === 0 ? 0 : weekdayOfFirstDateOfMonth;
      }
      const firstDate = new Date(firstDateOfMonth - delta * 3600 * 24 * 1000);
      const dates = [];
      for (let i = 0; i < 42; i++) {
        dates.push(new Date(firstDate.getTime() + i * 3600 * 24 * 1000));
      }
      return dates;
    },
  },
  methods: {
    getDateObjectFromDates(row, cell) {
      return this.computeDates[7 * (row - 1) + cell - 1];
    },
    cellClasses(dateObj) {
      return [
        this.n2c('panel-cell'),
        {
          [this.n2c('current-month')]:
            dateObj.getFullYear() === this.value.getFullYear() &&
            dateObj.getMonth() === this.value.getMonth(),
          [this.n2c('today')]:
            getFormattedDate(dateObj) === getFormattedDate(new Date()),
          [this.n2c('selected-date')]:
            getFormattedDate(dateObj) === getFormattedDate(this.value),
        },
      ];
    },
    onToggleYearMonth() {
      this.mode = this.mode === 'date' ? 'yearMonth' : 'date';
    },
    onClickCell($event) {
      this.$emit('input', $event);
    },
    onClickToday() {},
    onClickClear() {},
  },
  components: { FIcon, FInput, FPopover, FButton },
};
</script>

<style lang="scss" scoped>
@import '../assets/_var.scss';

.f-date-picker {
  &-panel {
    &-row {
      @extend .flex-center;
    }

    &-cell {
      @extend .inline-flex-center;
      width: 3em;
      height: 3em;
      padding: 1em;
      white-space: nowrap;
      user-select: none;
      color: $darkGrey;

      &:hover {
        border: 2px solid $blue;
      }
    }
  }

  &-weekday-cell,
  &-weekday-cell:hover {
    border: none;
  }

  &-weekday-cell,
  &-current-month {
    color: $black;
  }

  &-today {
    color: #fff;
    background-color: $blue;
  }

  &-selected-date {
    border: 2px solid $blue;
  }

  &-nav {
    @extend .flex-center;
    padding-top: 1em;
    user-select: none;
  }

  &-icon {
    margin: 0 1em;
  }

  &-body {
    width: 21em;
    height: 21em;
  }

  &-year-month {
    margin: auto;
  }

  &-footer {
    @extend .flex-center;
    justify-content: space-between;
  }

  &-action {
    margin: 1em;
  }
}
</style>
