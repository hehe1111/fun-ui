<template>
  <div :class="n2c()">
    <f-popover position="bottom" :contentStyle="{ width: '' }">
      <f-input :value="selectedDateString" @focus="onFocus" />
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
                  <f-icon
                    :class="n2c('selector-arrow')"
                    name="up"
                    @click="onClickLastYear"
                  />
                  <div :class="n2c('year-selector')" v-hide-scrollbar>
                    <span
                      v-for="n in yearArray"
                      :key="n"
                      @click="onClickYear(n)"
                      :class="selectedYearClass(n)"
                      >{{ n }}</span
                    >
                  </div>
                  <f-icon
                    :class="n2c('selector-arrow')"
                    name="down"
                    @click="onClickNextYear"
                  />
                </div>
                <div :class="n2c('selector-container')">
                  <f-icon
                    :class="n2c('selector-arrow')"
                    name="up"
                    @click="onClickLastMonth"
                  />
                  <div :class="n2c('month-selector')" v-hide-scrollbar>
                    <span
                      v-for="n in 12"
                      :key="n"
                      @click="onClickMonth(n)"
                      :class="selectedMonthClass(n)"
                      >{{ n }}</span
                    >
                  </div>
                  <f-icon
                    :class="n2c('selector-arrow')"
                    name="down"
                    @click="onClickNextMonth"
                  />
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
                  @click="onClickDate(getDateObjectFromDates(i, j))"
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
import hideScrollbar from '../directives/hide-scrollbar.js';
import {
  optionsName2ClassPrefix,
  getFormattedDate,
  getFirstDateOfMonth,
  getYearMonthDate,
  oneOf,
  getTypeOf,
  range,
} from '../assets/utils.js';

export default {
  name: 'FunUIDatePicker',
  data() {
    return {
      mode: 'yearMonth', // date || yearMonth
    };
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
    yearRange: {
      type: Array,
      default: () => [1900, new Date().getFullYear() + 100],
      validator(value) {
        return value.every(n => getTypeOf(n) === 'number');
      },
    },
  },
  computed: {
    n2c() {
      return optionsName2ClassPrefix(this.$options.name);
    },
    yearArray() {
      return range(...this.yearRange);
    },
    selectedYMD() {
      const [year, month, date] = getYearMonthDate(this.value);
      return { year, month, date };
    },
    selectedDateString() {
      return getFormattedDate(this.value);
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
    onFocus() {
      this.mode = 'date';
    },
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
          [n2c('displaying-month')]:
            dateObj.getFullYear() === value.getFullYear() &&
            dateObj.getMonth() === value.getMonth(),
        },
      ];
    },
    selectedYearClass(year) {
      return {
        [`${this.n2c('selected-year')}`]: year === this.selectedYMD.year,
      };
    },
    selectedMonthClass(month) {
      return {
        [`${this.n2c('selected-month')}`]: month === this.selectedYMD.month + 1,
      };
    },
    emitNewDate({ year, month, date }) {
      const year2 = year || year === 0 ? year : this.selectedYMD.year;
      const month2 = month || month === 0 ? month : this.selectedYMD.month;
      const date2 = date ? date : this.selectedYMD.date;
      const newDateObj = new Date(
        year2,
        month2,
        Math.min(date2, new Date(year2, month2 + 1, 0).getDate())
      );
      this.$emit('input', newDateObj);
      return newDateObj;
    },
    onClickLastYear() {
      this.emitNewDate({ year: this.selectedYMD.year - 1 });
    },
    onClickLastMonth() {
      this.emitNewDate({ month: this.selectedYMD.month - 1 });
    },
    onClickNextMonth() {
      this.emitNewDate({ month: this.selectedYMD.month + 1 });
    },
    onClickNextYear() {
      this.emitNewDate({ year: this.selectedYMD.year + 1 });
    },
    onClickYear(year) {
      if (getTypeOf(year) !== 'number') {
        throw new Error('Param should be a number');
      }
      this.emitNewDate({ year });
    },
    onClickMonth(month) {
      if (getTypeOf(month) !== 'number') {
        throw new Error('Param should be a number');
      }
      this.emitNewDate({ month });
    },
    onClickDate($event) {
      this.$emit('input', $event);
    },
    onToggleYearMonth() {
      this.mode = this.mode === 'date' ? 'yearMonth' : 'date';
    },
    onClickToday() {},
    onClickClear() {},
  },
  components: { FIcon, FInput, FPopover, FButton },
  directives: { hideScrollbar },
  model: {
    // https://cn.vuejs.org/v2/guide/components-custom-events.html#自定义组件的-v-model
    prop: 'value',
    event: 'input',
  },
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
      border-radius: $borderRadius;

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
  &-displaying-month {
    color: $black;
  }

  &-selected-year,
  &-selected-month,
  &-selected-date,
  &-today {
    color: #fff;
  }

  &-selected-year,
  &-selected-month,
  &-selected-date {
    background-color: $blue;
  }

  &-today {
    background-color: $darkGrey;
  }

  &-nav {
    @extend .flex-center;
    padding-top: 1em;
    user-select: none;
  }

  &-icon {
    margin: 0 1em;
  }

  &-year-month {
    margin: auto;
  }

  &-body {
    width: 21em;
    height: 21em;
  }

  &-year-month-selector {
    @extend .flex-center;
    height: 100%;
  }

  &-selector-container {
    @extend .flex-center;
    flex-direction: column;

    &:nth-child(1) {
      margin-right: 1em;
    }
  }

  &-selector-arrow {
    margin: 1em 0;
  }

  &-year-selector,
  &-month-selector {
    height: 14em;
    // https://developer.mozilla.org/en-US/docs/Web/Guide/CSS/Block_formatting_context
    display: inline-block; // trigger BFC
    vertical-align: top;
    > span {
      @extend .flex-center;
      width: 4em;
      padding: 0.2em 0;
      border: 2px solid transparent;
      border-radius: $borderRadius;
      cursor: pointer;
      &:hover {
        border-color: $blue;
        border-radius: $borderRadius;
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
