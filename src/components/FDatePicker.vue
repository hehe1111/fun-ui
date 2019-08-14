<template>
  <div :class="n2c()">
    <f-popover position="bottom" :content-style="popoverContentStyle">
      <f-input
        :value="selectedDateString"
        :clearable="false"
        placeholder="请选择日期"
        ref="inputRef"
        @focus="onFocus"
        @change="onChange"
      />
      <template slot="content" slot-scope="{ close }">
        <div :class="n2c('panel')">
          <div :class="n2c('nav')">
            <f-icon
              :class="n2c('icon')"
              name="fast-left"
              @click="onClickLastYear"
            />
            <f-icon
              :class="n2c('icon')"
              name="left"
              @click="onClickLastMonth"
            />
            <span :class="n2c('year-month')" @click="onToggleYearMonth">
              <span>{{ lazyValue.getFullYear() }}&nbsp;年&nbsp;</span>
              <span>{{ lazyValue.getMonth() + 1 }}&nbsp;月</span>
            </span>
            <f-icon
              :class="n2c('icon')"
              name="right"
              @click="onClickNextMonth"
            />
            <f-icon
              :class="n2c('icon')"
              name="fast-right"
              @click="onClickNextYear"
            />
          </div>
          <div :class="n2c('body')">
            <template v-if="mode === YEAR_MONTH_MODE">
              <div :class="n2c('year-month-picker')">
                <f-scrollable-picker
                  :width-and-height="widthAndHeight"
                  :values="yearScope"
                  :selected="selectedYMD.year"
                  @update:selected="onUpdateYear"
                  :error-message="errorMessage"
                />
                <f-scrollable-picker
                  :width-and-height="widthAndHeight"
                  :values="range(1, 12)"
                  :selected="selectedYMD.month + 1"
                  @update:selected="onUpdateMonth"
                  loop
                />
              </div>
            </template>
            <template v-if="mode === DATE_MODE">
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
                  @click="onClickDate(getDateObjectFromDates(i, j), close)"
                  >{{ getDateObjectFromDates(i, j).getDate() }}</span
                >
              </div>
            </template>
          </div>
          <div :class="n2c('footer')">
            <f-button :class="n2c('action')" @click="onClickToday(close)"
              >今天</f-button
            >
            <f-button :class="n2c('action')" @click="onClickClear(close)"
              >清除</f-button
            >
          </div>
        </div>
      </template>
    </f-popover>
  </div>
</template>

<script>
import Vue from 'vue';
import FIcon from './FIcon.vue';
import FInput from './FInput.vue';
import FPopover from './FPopover.vue';
import FButton from './button/FButton.vue';
import FScrollablePicker from './FScrollablePicker.vue';
import toast from '../plugins/toast.js';
import {
  optionsName2ClassPrefix,
  getFormattedDate,
  getFirstDateOfMonth,
  getYearMonthDate,
  oneOf,
  getTypeOf,
  range,
} from '../assets/utils.js';
Vue.use(toast);

const DATE_MODE = 'dateMode';
const YEAR_MONTH_MODE = 'yearMonthMode';

export default {
  name: 'FunUIDatePicker',
  components: { FIcon, FInput, FPopover, FButton, FScrollablePicker },
  data() {
    return {
      mode: DATE_MODE, // DATE_MODE || YEAR_MONTH_MODE
      DATE_MODE,
      YEAR_MONTH_MODE,
      range,
      widthAndHeight: { width: '4em', height: '14em' },
      popoverContentStyle: { width: '', 'margin-left': 0, overflow: 'hidden' },
    };
  },
  props: {
    value: {
      type: [Date, Object],
      default: () => new Date(),
      validator(prop) {
        return getTypeOf(prop) === 'date' || getTypeOf(prop) === 'null';
      },
    },
    startWeekOn: {
      type: [Number, String],
      default: 1,
      validator(prop) {
        return oneOf(prop, [0, 1, '0', '1']);
      },
    },
    separator: {
      type: String,
      default: ' / ',
      validator(prop) {
        return oneOf(prop, ['-', '/', ' / ', ' - ']);
      },
    },
    scope: {
      type: Array,
      default: () => [new Date(1900, 0, 1), new Date(2100, 11, 31)],
      validator(prop) {
        return prop.every(n => getTypeOf(n) === 'date');
      },
    },
  },
  computed: {
    n2c() {
      return optionsName2ClassPrefix(this.$options.name);
    },
    lazyValue() {
      return this.value ? this.value : new Date();
    },
    yearScope() {
      return range(this.scope[0].getFullYear(), this.scope[1].getFullYear());
    },
    selectedYMD() {
      const [year, month, date] = getYearMonthDate(this.lazyValue);
      return { year, month, date };
    },
    selectedDateString() {
      if (!this.value) return '';
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
      const firstDateOfMonth = getFirstDateOfMonth(this.lazyValue);
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
    errorMessage() {
      const start = getFormattedDate(this.scope[0]);
      const end = getFormattedDate(this.scope[1]);
      return `<span>可选时间：</span><br/><span>${start} - ${end}</span>`;
    },
  },
  methods: {
    onFocus() {
      this.mode = DATE_MODE;
    },
    onChange(value) {
      // valid value: xxxx - xx - xx  or  xxxx / xx / xx
      const oldValue = this.selectedDateString;
      const regexp = /^(\d{4}\s[-/]\s\d{2}\s[-/]\s\d{2})$/;
      const result = value.match(regexp);
      if (!result) {
        return (this.$refs.inputRef.$refs.inputRef.value = oldValue);
      }

      // split return an array of strings
      const [year, month, date] = result[1].split(/\s[-/]\s/);
      const { parseInt: p } = window;
      const [y1, m1, d1] = [p(year), p(month), p(date)];
      const [y2, m2, d2] = getYearMonthDate(new Date(y1, m1 - 1, d1));
      if (
        y2 !== y1 ||
        m2 + 1 !== m1 ||
        d2 !== d1 ||
        this.outOfRange(y1, m1 - 1, d1)
      ) {
        return (this.$refs.inputRef.$refs.inputRef.value = oldValue);
      }
      this.emitNewDate({ year: y1, month: m1 - 1, date: d1 });
    },
    getDateObjectFromDates(row, cell) {
      return this.computeDates[7 * (row - 1) + cell - 1];
    },
    cellClasses(dateObj) {
      const { n2c } = this;
      const f = getFormattedDate;
      const [dYear, dMonth] = getYearMonthDate(dateObj);
      const [year, month] = getYearMonthDate(this.lazyValue);
      return [
        n2c('panel-cell'),
        {
          [n2c('today')]: f(dateObj) === f(new Date()),
          [n2c('selected-date')]: f(dateObj) === f(this.value),
          [n2c('displaying-month')]: dYear === year && dMonth === month,
        },
      ];
    },
    yearOutOfRange(year) {
      const isBottomReached = year < this.scope[0].getFullYear();
      const isTopReached = year > this.scope[1].getFullYear();
      return isBottomReached || isTopReached;
    },
    monthOutOfRange(year, month) {
      const [year0, month0] = getYearMonthDate(this.scope[0]);
      const [year1, month1] = getYearMonthDate(this.scope[1]);
      const isBottomReached = year === year0 && month < month0;
      const isTopReached = year === year1 && month > month1;
      isBottomReached && this.emitNewDate({ year: year0, month: month0 });
      isTopReached && this.emitNewDate({ year: year1, month: month1 });
      return isBottomReached || isTopReached;
    },
    dateOutOfRange(year, month, date) {
      const [year0, month0, date0] = getYearMonthDate(this.scope[0]);
      const [year1, month1, date1] = getYearMonthDate(this.scope[1]);
      const isBottomReached =
        year === year0 && month === month0 && date < date0;
      const isTopReached = year === year1 && month === month1 && date > date1;
      isBottomReached && this.emitNewDate({ month: month0, date: date0 });
      isTopReached && this.emitNewDate({ month: month1, date: date1 });
      return isBottomReached || isTopReached;
    },
    outOfRange(year, month, date) {
      let flag = false;
      if (this.yearOutOfRange(year)) flag = true;
      if (this.monthOutOfRange(year, month)) flag = true;
      if (this.dateOutOfRange(year, month, date)) flag = true;
      if (flag && this.errorMessage) {
        this.$toast(this.errorMessage, {
          state: 'error',
          enableHTML: true,
          closeIcon: true,
        });
      }
      return flag;
    },
    emitNewDate(obj) {
      if (!obj) return this.$emit('input', null);
      const { year, month, date } = obj;
      const year2 = year || year === 0 ? year : this.selectedYMD.year;
      const month2 = month || month === 0 ? month : this.selectedYMD.month;
      const date2 = date ? date : this.selectedYMD.date;
      if (this.outOfRange(year2, month2, date2)) return;
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
    onUpdateYear(year) {
      if (getTypeOf(year) !== 'number') {
        throw new Error('Param should be a number');
      }
      this.emitNewDate({ year });
    },
    onUpdateMonth(month) {
      if (getTypeOf(month) !== 'number') {
        throw new Error('Param should be a number');
      }
      this.emitNewDate({ month: month - 1 });
    },
    onClickDate(dateObj, close) {
      if (this.outOfRange(...getYearMonthDate(dateObj))) return;
      close();
      this.$emit('input', dateObj);
    },
    onToggleYearMonth() {
      this.mode = this.mode === DATE_MODE ? YEAR_MONTH_MODE : DATE_MODE;
    },
    onClickToday(close) {
      const [year, month, date] = getYearMonthDate(new Date());
      close();
      this.emitNewDate({ year, month, date });
    },
    onClickClear(close) {
      close();
      this.emitNewDate(null);
    },
  },
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
      color: $grey;
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
    color: #000;
  }

  &-selected-date,
  &-today {
    color: #fff;
  }

  &-today {
    background-color: $grey;
  }

  &-selected-date {
    background-color: $blue;
  }

  &-nav {
    @extend .flex-center;
    padding-top: 1em;
    user-select: none;
  }

  &-icon {
    margin: 0 1em;
    user-select: none;
  }

  &-year-month {
    margin: auto;
  }

  &-body {
    width: 21em;
    height: 21em;
  }

  &-year-month-picker {
    @extend .flex-center;
    height: 100%;
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
