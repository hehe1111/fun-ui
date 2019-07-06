import { expect } from 'chai';
import { mount } from '@vue/test-utils';
import FPopover from '@/components/FPopover.vue';

describe('FPopover.vue', () => {
  it('存在', () => {
    const wrapper = mount(FPopover);
    expect(wrapper.exists()).to.eq(true);
    wrapper.destroy();
  });

  it('可以接受 position 属性', () => {
    const wrapper = mount(FPopover, {
      propsData: { position: 'bottom' },
      slots: {
        default: '<button>点我 bottom 弹出</button>',
        content: '<div class="popover-content-1">向下弹出内容</div>',
      },
    });
    expect(wrapper.find('.popover-content-1').element).to.not.exist;
    wrapper.find('button').trigger('click');
    expect(wrapper.find('.popover-content-1').element).to.exist;
    expect(wrapper.find('.content-container').classes()).include(
      'position-bottom'
    );
    wrapper.destroy();
  });

  it('可以接受 trigger 属性', () => {
    const wrapper = mount(FPopover, {
      propsData: { trigger: 'hover' },
      slots: {
        default: '<button>点我</button>',
        content: '<div class="popover-content-2">弹出内容</div>',
      },
    });

    expect(wrapper.find('.popover-content-2').element).to.not.exist;
    wrapper.find('.popover').trigger('mouseenter');
    expect(wrapper.find('.popover-content-2').element).to.exist;
    wrapper.destroy();
  });
});
