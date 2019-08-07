<template>
  <div :class="n2c()">
    <f-popover position="bottom" :contentStyle="{ width: '' }">
      <f-input
        :value="selectedDateString"
        @focus="onFocus"
        :clearable="false"
      />
      <template slot="content" slot-scope="{ close }">
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
            <span :class="n2c('year-month')" @click="onToggleYearMonth">
              <span>{{ lazyValue.getFullYear() }} 年</span>
              <span>{{ lazyValue.getMonth() + 1 }} 月</span>
            </span>
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
            <template v-if="mode === 'yearMonth'">
              <div :class="n2c('year-month-selector')">
                <div :class="n2c('selector-container')" ref="yearSCRef">
                  <f-icon
                    :class="n2c('selector-arrow')"
                    name="up"
                    @click="onClickLastYear"
                  />
                  <div
                    :class="n2c('year-selector')"
                    v-hide-scrollbar="{
                      width: 'calc(4em + 2px)',
                      height: '14em',
                    }"
                    ref="yearSRef"
                  >
                    <span
                      v-for="n in yearScope"
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
                <div :class="n2c('selector-container')" ref="monthSCRef">
                  <f-icon
                    :class="n2c('selector-arrow')"
                    name="up"
                    @click="onClickLastMonth"
                  />
                  <div
                    :class="n2c('month-selector')"
                    v-hide-scrollbar="{
                      width: 'calc(4em + 2px)',
                      height: '14em',
                    }"
                    ref="monthSRef"
                  >
                    <span
                      v-for="n in 12"
                      :key="n"
                      @click="onClickMonth(n - 1)"
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
import hideScrollbar from '../directives/hide-scrollbar.js';
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

export default {
  name: 'FunUIDatePicker',
  data() {
    return {
      mode: 'yearMonth', // date || yearMonth
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
      default: () => [new Date(2010, 3, 10), new Date(2030, 8, 20)],
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
  },
  updated() {
    const { yearSCRef, yearSRef, monthSCRef, monthSRef } = this.$refs;
    this.updateSelectorScrollTop(yearSCRef, yearSRef, 'selected-year');
    this.updateSelectorScrollTop(monthSCRef, monthSRef, 'selected-month');
  },
  methods: {
    onFocus() {
      this.mode = 'date';
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
      if (flag) this.$toast('超出范围不可选', { state: 'error' });
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
    onClickDate(dateObj, close) {
      if (this.outOfRange(...getYearMonthDate(dateObj))) return;
      close();
      this.$emit('input', dateObj);
    },
    onToggleYearMonth() {
      this.mode = this.mode === 'date' ? 'yearMonth' : 'date';
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
    updateSelectorScrollTop(viewport, parent, childCssSelector) {
      if (!viewport || !parent) return;
      const oldScrollTop = parent.scrollTop;
      const { height: vHeight, top: vTop } = viewport.getBoundingClientRect();
      const { height: pHeight, top: pTop } = parent
        .querySelector(`.${this.n2c(childCssSelector)}`)
        .getBoundingClientRect();

      parent.scrollTop = pTop - vTop - vHeight / 2 + pHeight / 2 + oldScrollTop;
    },
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
  &-selected-date,
  &-selected-date.f-date-picker-selected-date {
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
      user-select: none;
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
