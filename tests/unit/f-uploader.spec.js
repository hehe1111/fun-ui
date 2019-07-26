import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import { mount } from '@vue/test-utils';
import FUploader from '../../src/components/FUploader.vue';
import { ajax } from '../../src/assets/utils.js';
chai.use(sinonChai);

/**
 * util functions and variables
 */
const init = ({ propsData = {}, otherOptions = {} } = {}) => {
  const wrapper = mount(FUploader, {
    propsData: { name: 'myFile', action: '/xxx', parseResponse, ...propsData },
    ...otherOptions,
  });

  // replace wrapper.vm.handleUpload function to avoid invoking ajax.post twice
  const stub = sinon.stub(wrapper.vm, 'handleUpload');
  // equal to
  // wrapper.vm.handleUpload = () => {};

  return { wrapper, stub };
};

const fileName = 'file.txt';
const createFilesObject = (
  content,
  fileName,
  options = { type: 'text/plain' }
) => {
  // https://stackoverflow.com/questions/47119426/how-to-set-file-objects-and-length-property-at-filelist-object-where-the-files-a
  const dataTransfer = new DataTransfer();
  dataTransfer.items.add(new File(content, fileName, options));
  return dataTransfer.files;
};

const previewUrl = '/preview-url';
const fakeXhr = (wrapper, previewUrl) => {
  // https://codeutopia.net/blog/2015/03/21/unit-testing-ajax-requests-with-mocha/
  const xhr = sinon.useFakeXMLHttpRequest();
  const requests = [];
  xhr.onCreate = xhr => requests.push(xhr);

  // invoke target function(in this case is ajax.post)
  // to send fake request and get fake response
  ajax.post('/xxx', {
    alias: wrapper.vm.mutableFileList[0].alias,
    handleLoad: xhr => wrapper.vm.handleLoad(xhr),
    handleUploadProgress: xhr => {},
  });

  // fake response
  requests[0].respond(
    200,
    { 'Content-Type': 'text/json' },
    JSON.stringify({ url: previewUrl })
  );

  return xhr;
};

// parseResponse func is required
const parseResponse = response => ({ url: JSON.parse(response).url });

/**
 * tests
 */
describe('FUploader.vue', () => {
  it('存在，且可以接受 name action parseResponse 属性', () => {
    const { wrapper, stub } = init();
    expect(wrapper.exists()).to.eq(true);
    stub.restore();
    wrapper.destroy();
  });

  it('可以上传文件, 并会触发 success 事件', () => {
    const fake = sinon.fake();
    const { wrapper, stub } = init({
      otherOptions: { listeners: { success: fake } },
    });
    expect(wrapper.find('.f-uploader-list-li').element).to.not.exist;

    // add file and trigger change event
    const input = wrapper.find('input[type="file"]');
    input.element.files = createFilesObject(['文件内容'], fileName);
    input.trigger('change');

    expect(wrapper.find('.f-uploader-list-li').element).to.exist;

    // fake xhr
    const xhr = fakeXhr(wrapper, previewUrl);

    expect(wrapper.find('.f-uploader-list-li').classes()).to.include(
      'succeeded'
    );
    expect(wrapper.find('.f-uploader-list-li > img').attributes('src')).to.eq(
      previewUrl
    );
    expect(wrapper.find('.f-uploader-file-name').text()).to.eq(fileName);
    expect(fake).to.have.been.calledOnce;
    // fake.lastArg: get the last param that passed to fake
    // https://sinonjs.org/releases/latest/fakes/
    expect(fake.lastArg.fileInfo.status).to.eq('succeeded');

    xhr.restore();
    stub.restore();
    wrapper.destroy();
  });

  it('上传文件过程中会显示 loading icon', () => {
    const { wrapper, stub } = init();
    const input = wrapper.find('input[type="file"]');
    input.element.files = createFilesObject(['文件内容'], fileName);
    input.trigger('change');

    expect(wrapper.find('.f-uploader-list-li').classes()).to.include(
      'uploading'
    );
    expect(wrapper.find('.f-uploader-loading-icon').element).to.exist;
    const xhr = fakeXhr(wrapper, previewUrl);
    expect(wrapper.find('.f-uploader-list-li').classes()).to.include(
      'succeeded'
    );
    expect(wrapper.find('.f-uploader-loading-icon').element).to.not.exist;

    xhr.restore();
    stub.restore();
    wrapper.destroy();
  });

  it('可以接受 fileList 属性，可以触发 update:file-list 事件', () => {
    const fake = sinon.fake();
    const { wrapper, stub } = init({
      propsData: { fileList: [] },
      otherOptions: { listeners: { 'update:file-list': fake } },
    });
    expect(JSON.stringify(wrapper.vm.fileList)).to.eq('[]');

    const input = wrapper.find('input[type="file"]');
    input.element.files = createFilesObject(['文件内容'], fileName);
    input.trigger('change');

    expect(fake.getCall(0).lastArg[0].status).to.eq('uploading');

    const xhr = fakeXhr(wrapper, previewUrl);

    expect(fake.getCall(1).lastArg[0].status).to.eq('succeeded');
    expect(fake).to.have.been.calledTwice; // first at beforeUpload, second at load
    expect(fake.lastArg[0].name).to.eq(fileName);
    expect(fake.lastArg[0].url).to.eq(previewUrl);

    xhr.restore();
    stub.restore();
    wrapper.destroy();
  });

  it('可以接受 listType 属性，默认值为 text', () => {
    const { wrapper, stub } = init({
      otherOptions: { attachToDocument: true },
    });
    const input = wrapper.find('input[type="file"]');
    input.element.files = createFilesObject(['文件内容'], fileName);
    input.trigger('change');
    const xhr = fakeXhr(wrapper, previewUrl);

    const classList1 = wrapper.find('.f-uploader-list-li').classes();
    const style1 = getComputedStyle(
      wrapper.find('.f-uploader-list-li > img').element
    );
    expect(classList1).to.include('text');
    expect(classList1).to.not.include('picture-card');
    expect(style1.display).to.eq('none');

    wrapper.setProps({ listType: 'picture-card' });
    const classList2 = wrapper.find('.f-uploader-list-li').classes();
    const style2 = getComputedStyle(
      wrapper.find('.f-uploader-list-li > img').element
    );
    expect(classList2).to.not.include('text');
    expect(classList2).to.include('picture-card');
    expect(style2.display).to.eq('block');

    xhr.restore();
    stub.restore();
    wrapper.destroy();
  });

  it('可以接受 autoUpload 属性, 默认值为 true', () => {
    const { wrapper: wrapper1, stub: stub1 } = init({
      otherOptions: {
        slots: { submit: '<button class="submit-button">确认上传</button>' },
      },
    });
    expect(wrapper1.find('.submit-button').element).to.not.exist;
    stub1.restore();
    wrapper1.destroy();

    const { wrapper: wrapper2, stub: stub2 } = init({
      propsData: { autoUpload: false },
      otherOptions: {
        slots: { submit: '<button class="submit-button">确认上传</button>' },
      },
    });
    expect(wrapper2.find('.submit-button').element).to.exist;

    const input = wrapper2.find('input[type="file"]');
    input.element.files = createFilesObject(['文件内容'], fileName);
    input.trigger('change');
    expect(wrapper2.vm.mutableFileList[0].status).to.eq('waiting');
    expect(wrapper2.vm.mutableFileList[0].url).to.eq(undefined);
    const xhr2 = fakeXhr(wrapper2, previewUrl);
    expect(wrapper2.vm.mutableFileList[0].status).to.eq('succeeded');
    expect(wrapper2.vm.mutableFileList[0].url).to.eq(previewUrl);
    xhr2.restore();
    stub2.restore();
    wrapper2.destroy();
  });

  it('可以接受 maxSize 属性，文件大小超过 maxSize 的值就会触发 error 事件', () => {
    const fake = sinon.fake();
    const { wrapper, stub } = init({
      propsData: { maxSize: 0.001 }, // file size not large than 1 byte
      otherOptions: { listeners: { error: fake } },
    });
    const input = wrapper.find('input[type="file"]');
    input.element.files = createFilesObject(['文件内容'], fileName);
    input.trigger('change');
    expect(fake).to.have.been.called;
    expect(fake.lastArg.isExceeded).to.eq(true);

    stub.restore();
    wrapper.destroy();
  });

  it('可以接受 multiple 属性，默认值为 false', () => {
    const { wrapper, stub } = init();
    expect(wrapper.find('input[type="file"]').attributes('multiple')).to.not
      .exist;
    wrapper.setProps({ multiple: true });
    expect(wrapper.find('input[type="file"]').attributes('multiple')).to.eq(
      'multiple'
    );

    stub.restore();
    wrapper.destroy();
  });

  it('可以删除已上传文件，并触发 remove 事件', () => {
    const fake = sinon.fake();
    const { wrapper, stub } = init({
      otherOptions: { listeners: { remove: fake } },
    });
    const input = wrapper.find('input[type="file"]');
    input.element.files = createFilesObject(['文件内容'], fileName);
    input.trigger('change');
    const xhr = fakeXhr(wrapper, previewUrl);

    expect(wrapper.find('.f-uploader-list-li').element).to.exist;
    expect(fake).to.not.have.been.called;
    wrapper.find('.f-uploader-remove-icon').trigger('click');
    expect(wrapper.find('.f-uploader-list-li').element).to.not.exist;
    expect(fake).to.have.been.calledOnce;

    xhr.restore();
    stub.restore();
    wrapper.destroy();
  });

  it('可以接受 draggable 属性', () => {
    const { wrapper, stub } = init({
      propsData: { draggable: true },
    });
    const dataTransfer = new DataTransfer();
    dataTransfer.items.add(new File(['xx'], fileName, { type: 'text/plain' }));

    const liWrapper1 = wrapper.find('.f-uploader-list-li');
    expect(liWrapper1.element).to.not.exist;
    // https://vue-test-utils.vuejs.org/zh/api/wrapper/#trigger
    wrapper.find('.f-uploader-trigger-area').trigger('drop', { dataTransfer });
    const liWrapper2 = wrapper.find('.f-uploader-list-li');
    expect(liWrapper2.element).to.exist;
    const xhr = fakeXhr(wrapper, previewUrl);
    expect(liWrapper2.classes()).to.include('succeeded');

    xhr.restore();
    stub.restore();
    wrapper.destroy();
  });
});

/**
 * not tested
 */
// method;
// accept;
