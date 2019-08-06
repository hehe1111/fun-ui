/**
 * convert the value of name option of component into CSS class prefix
 * return a function that receive one or multiple string
 * e.g: optionsName2ClassPrefix('FunUIButton')('a-class', 'b-class')
 * @param {string} input - The value of name option
 */
const optionsName2ClassPrefix = input => {
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replace#Using_an_inline_function_that_modifies_the_matched_characters
  const middle = input
    .match(/^FunUI([A-Za-z]+)$/)[1]
    .replace(/[A-Z]/g, match => {
      return `-${match.toLowerCase()}`;
    });

  return (...appendix) => {
    if (!appendix.length) return `f${middle}`;
    return appendix
      .filter(Boolean)
      .map(n => `f${middle}-${n}`)
      .join(' ');
  };
};

/**
 * return a lower case string of type of given param
 * @param {any} target
 */
const getTypeOf = target => {
  const regex = /\[object (.*)\]/;
  const typeString = Object.prototype.toString.call(target);
  return typeString.match(regex)[1].toLowerCase();
};

/**
 * check if value is in optionalValues array
 * @param value
 * @param {Array} optionalValues
 */
const oneOf = (value, optionalValues) => {
  if (getTypeOf(optionalValues) !== 'array') {
    throw new Error('Param 2 should be an array.');
  }
  return optionalValues.indexOf(value) >= 0;
};

/**
 * for sending HTTP request
 */
const ajax = {
  get(url, options) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.send(options.formData);
  },
  post(url, options) {
    const {
      formData,
      alias,
      handleLoad,
      handleUploadProgress,
      handleAbort,
      handleError,
    } = options;
    const xhr = new XMLHttpRequest();
    xhr.alias = alias;
    xhr.onload = () => handleLoad(xhr);
    xhr.upload.onprogress = () => handleUploadProgress(xhr);
    xhr.onabort = () => handleAbort(xhr);
    xhr.onerror = () => handleError(xhr);
    xhr.open('POST', url);
    xhr.send(formData);
  },
};

/**
 * @param {Date} dateObj
 */
const isDateObject = dateObj => {
  if (getTypeOf(dateObj) !== 'date') {
    throw new Error('Param should be a instance of Date.');
  }
};

/**
 * return [year, month, date] of given param
 * @param {Date} dateObj
 */
const getYearMonthDate = dateObj => {
  if (!dateObj) return [];
  isDateObject(dateObj);
  // Attention: month has been increased by one
  return [dateObj.getFullYear(), dateObj.getMonth(), dateObj.getDate()];
};

/**
 * return 1st
 * @param {Date} dateObj
 */
const getFirstDateOfMonth = dateObj => {
  const [year, month] = getYearMonthDate(dateObj);
  return new Date(year, month, 1);
};

/**
 * return 28th/29th/30th/31st
 * @param {Date} dateObj
 */
const getLastDateOfMonth = dateObj => {
  const [year, month] = getYearMonthDate(dateObj);
  return new Date(year, month + 1, 0);
};

/**
 * return a formatted date string
 * e.g: yy / mm / dd
 * @param {Date} dateObj
 * @param {string} separator
 */
const getFormattedDate = (dateObj, separator = ' / ') => {
  const array = getYearMonthDate(dateObj || new Date());
  array[1] += 1;
  array.forEach((n, i) => n < 10 && (array[i] = `0${n}`));
  return array.join(separator);
};

/**
 * return an array contains a range of sequential number between given params
 * @param {number} start
 * @param {number} end
 */
const range = (start, end) => {
  if (getTypeOf(start) !== 'number' || getTypeOf(end) !== 'number') {
    throw new Error('Param should be a number.');
  }
  const result = [];
  if (start < end) {
    for (let i = start; i <= end; i++) {
      result.push(i);
    }
  } else {
    for (let i = start; i >= end; i--) {
      result.push(i);
    }
  }
  return result;
};

/**
 * @param {Element} el - A HTML element
 * @param {string} direction - Optional value: vertical | horizontal
 */
const hasScrollbar = (el, direction) => {
  if (!oneOf(direction, ['vertical', 'horizontal'])) {
    throw new Error('Param 2 should be either "vertical" or "horizontal"');
  }
  let property;
  direction === 'vertical' && (property = 'Width');
  direction === 'horizontal' && (property = 'Height');
  return (
    el[`offset${property}`] -
      el[`client${property}`] -
      window.parseInt(window.getComputedStyle(el).borderLeftWidth) * 2 >=
    17
  );
};

export {
  ajax,
  getFirstDateOfMonth,
  getFormattedDate,
  getLastDateOfMonth,
  getTypeOf,
  getYearMonthDate,
  hasScrollbar,
  oneOf,
  optionsName2ClassPrefix,
  range,
};
