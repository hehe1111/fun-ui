<template>
  <div :class="n2c()">
    <f-popover position="bottom" :contentStyle="contentStyle">
      <f-input :value="selectedDate" @focus="onFocus" />
      <template slot="content">
        <div :class="n2c('panel')">
          <div :class="n2c('nav')">
            <f-icon
              :class="n2c('icon')"
              name="double-left"
              @click="onClickLastYear"
            />
            <f-icon
              :class="n2c('icon')"
              name="left"
              @click="onClickLastMonth"
            />
            <span :class="n2c('year-month')" @click="onToggleYearMonth"
              >{{ value.getFullYear() }} 年 {{ value.getMonth() + 1 }} 月</span
            >
            <f-icon
              :class="n2c('icon')"
              name="right"
              @click="onClickNextMonth"
            />
            <f-icon
              :class="n2c('icon')"
              name="double-right"
              @click="onClickNextYear"
            />
          </div>
          <div :class="n2c('body')">
            <!-- eslint-disable-next-line prettier/prettier -->
            <template v-if="mode === 'yearMonth'">
              <div :class="n2c('year-month-selector')">
                <div :class="n2c('selector-container')">
                  <div :class="n2c('year-selector')" v-hide-scrollbar>
                    <span v-for="n in 150" :key="n">{{ 1900 + n }}</span>
                  </div>
                </div>
                <div :class="n2c('selector-container')">
                  <div :class="n2c('month-selector')" v-hide-scrollbar>
                    <span v-for="n in 12" :key="n">{{ n }}</span>
                  </div>
                </div>
              </div>
            </template>
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
  getYearMonthDate,
  oneOf,
} from '../assets/utils.js';
import hideScrollbar from '../directives/hide-scrollbar.js';

export default {
  name: 'FunUIDatePicker',
  data() {
    return {
      mode: 'yearMonth', // date || yearMonth
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
      default: ' / ',
      validator(value) {
        return oneOf(value, ['-', '/', ' / ', ' - ']);
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
      let delta;
      const w = firstDateOfMonth.getDay();
      this.startWeekOnMonday
        ? (delta = w === 0 ? 6 : w - 1)
        : (delta = w === 0 ? 0 : w);
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
      const { n2c, value } = this;
      const f = getFormattedDate;
      return [
        n2c('panel-cell'),
        {
          [n2c('today')]: f(dateObj) === f(new Date()),
          [n2c('selected-date')]: f(dateObj) === f(value),
          [n2c('current-month')]:
            dateObj.getFullYear() === value.getFullYear() &&
            dateObj.getMonth() === value.getMonth(),
        },
      ];
    },
    getNewDate({ y1 = 0, y2 = 0, m1 = 0, m2 = 0, oldDate = this.value } = {}) {
      // y1 | y2: {number} last or next year
      // m1: {number} last or next month
      // m2: {number} to get the number of days of last or next month
      const [year, month, date] = getYearMonthDate(oldDate);
      return new Date(
        year + y1,
        month + m1,
        Math.min(date, new Date(year + y2, month + m2, 0).getDate())
      );
    },
    onFocus() {
      this.mode = 'date';
    },
    onClickLastYear() {
      this.$emit('input', this.getNewDate({ y1: -1, y2: -1, m2: 1 }));
    },
    onClickLastMonth() {
      this.$emit('input', this.getNewDate({ m1: -1 }));
    },
    onClickNextMonth() {
      this.$emit('input', this.getNewDate({ m1: 1, m2: 2 }));
    },
    onClickNextYear() {
      this.$emit('input', this.getNewDate({ y1: 1, y2: 1, m2: 1 }));
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
  directives: { hideScrollbar },
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

  &-year-month-selector {
    @extend .flex-center;
    height: 100%;
  }

  &-year-selector,
  &-month-selector {
    height: 18em;
    // https://developer.mozilla.org/en-US/docs/Web/Guide/CSS/Block_formatting_context
    display: inline-block; // trigger BFC
    vertical-align: top;

    > span {
      @extend .flex-center;
      width: 4em;
      padding: 0.2em 0;
      cursor: pointer;
      &:hover {
        color: #fff;
        background-color: $blue;
      }
    }
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
