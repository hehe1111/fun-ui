const optionsName2ClassPrefix = input => {
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replace#Using_an_inline_function_that_modifies_the_matched_characters
  const middle = input
    .match(/^FunUI([A-Za-z]+)$/)[1]
    .replace(/[A-Z]/g, match => {
      return `-${match.toLowerCase()}`;
    });

  return (...appendix) => {
    if (!appendix.length) return '';
    return appendix
      .filter(Boolean)
      .map(n => `f${middle}-${n}`)
      .join(' ');
  };
};

const getTypeOf = target => {
  const regex = /\[object (.*)\]/;
  const typeString = Object.prototype.toString.call(target);
  return typeString.match(regex)[1].toLowerCase();
};

const oneOf = (value, optionalValues) => {
  if (getTypeOf(optionalValues) !== 'array') {
    throw new Error('Param 2 should be an array.');
  }
  return optionalValues.indexOf(value) >= 0;
};

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

const isDateObject = dateObj => {
  if (getTypeOf(dateObj) !== 'date') {
    throw new Error('Param should be a instance of Date.');
  }
};

const getYearMonthDate = dateObj => {
  isDateObject(dateObj);
  // Attention: month has been increased by one
  return [dateObj.getFullYear(), dateObj.getMonth(), dateObj.getDate()];
};

const getFirstDateOfMonth = dateObj => {
  const [year, month] = getYearMonthDate(dateObj);
  return new Date(year, month, 1);
};

const getLastDateOfMonth = dateObj => {
  const [year, month] = getYearMonthDate(dateObj);
  return new Date(year, month + 1, 0);
};

const getFormattedDate = (dateObj, separator = '/') => {
  const array = getYearMonthDate(dateObj || new Date());
  array[1] += 1;
  array.forEach((n, i) => n < 10 && (array[i] = `0${n}`));
  return array.join(separator);
};

const range = (begin, end) => {
  if (getTypeOf(begin) !== 'number' || getTypeOf(end) !== 'number') {
    throw new Error('Param should be a number.');
  }
  const result = [];
  if (begin < end) {
    for (let i = begin; i <= end; i++) {
      result.push(i);
    }
  } else {
    for (let i = begin; i >= end; i--) {
      result.push(i);
    }
  }
  return result;
};

export {
  ajax,
  getFirstDateOfMonth,
  getFormattedDate,
  getLastDateOfMonth,
  getTypeOf,
  getYearMonthDate,
  oneOf,
  optionsName2ClassPrefix,
  range,
};
