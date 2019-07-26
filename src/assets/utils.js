const getTypeOf = target => {
  const regex = /\[object (.*)\]/;
  const typeString = Object.prototype.toString.call(target);
  return typeString.match(regex)[1].toLowerCase();
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

export { getTypeOf, ajax };
