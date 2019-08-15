import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import { mount } from '@vue/test-utils';
import FNav from '../../src/components/nav/FNav.vue';
import FSubNav from '../../src/components/nav/FSubNav.vue';
import FNavItem from '../../src/components/nav/FNavItem.vue';
chai.use(sinonChai);

const returnOptionsObj = propsData => {
  return {
    propsData,
    stubs: { FNavItem },
    slots: {
      default: `
        <f-nav-item name="x1">内容 1</f-nav-item>
        <f-nav-item name="x2">内容 2</f-nav-item>
        <f-nav-item name="x3">内容 3</f-nav-item>
      `,
    },
  };
};

describe('FNav.vue', () => {
  it('存在', () => {
    const wrapper = mount(FNav, returnOptionsObj());
    expect(wrapper.exists()).to.eq(true);
    wrapper.destroy();
  });

  it('可以接受 selected 属性', () => {
    const wrapper = mount(FNav, returnOptionsObj({ selected: 'x2' }));
    wrapper.vm.$nextTick().then(() => {
      expect(wrapper.find('.f-nav-item[data-name="x2"]').classes()).include(
        'active'
      );
      wrapper.destroy();
    });
  });

  it('可以接受 vertical 属性', () => {
    const wrapper = mount(FNav, returnOptionsObj({ vertical: true }));
    expect(wrapper.find('.f-nav').classes()).include('vertical');
    wrapper.destroy();
  });

  it('可以接受 trigger 属性', () => {
    const wrapper = mount(FNav, {
      propsData: { trigger: 'click' },
      stubs: { FSubNav, FNavItem },
      slots: {
        default: `
          <f-sub-nav name="sub1" class="aaa">
            <template slot="title">子菜单1</template>
            <f-nav-item name="sub1-1">内容1</f-nav-item>
          </f-sub-nav>
        `,
      },
    });
    wrapper.find('.aaa > .f-sub-nav-title-container').trigger('mouseenter');
    wrapper.vm.$nextTick().then(() => {
      expect(wrapper.find('.f-sub-nav').element.style.display).to.eq('none');
      wrapper.find('.aaa > .f-sub-nav-title-container').trigger('click');
      wrapper.vm.$nextTick().then(() => {
        expect(wrapper.find('.f-sub-nav').element.style.display).to.eq('');
        wrapper.destroy();
      });
    });
  });

  it('可以触发 update:selected 事件', () => {
    const fake = sinon.fake();
    const wrapper = mount(FNav, {
      ...returnOptionsObj(),
      listeners: { 'update:selected': fake },
    });
    wrapper.find('.f-nav-item[data-name="x1"]').trigger('click');
    wrapper.vm.$nextTick().then(() => {
      expect(fake).to.have.been.calledWith('x1');
      expect(fake.callCount).to.eq(2);
      wrapper.destroy();
    });
  });

  it('可以获取所有后代 nav item', () => {
    const wrapper = mount(FNav, returnOptionsObj());
    expect(wrapper.vm.navItems.map(vm => vm.name).join(',')).to.eq('x1,x2,x3');
    wrapper.destroy();
  });

  it('可以获取所有子菜单的 title nav item', () => {
    const wrapper = mount(FNav, {
      stubs: { FSubNav, FNavItem },
      slots: {
        default: `
        <f-sub-nav name="sub1">
          <template slot="title">子菜单1</template>
          <f-nav-item name="sub1-1">内容1</f-nav-item>

          <f-sub-nav name="sub1-2">
            <template slot="title">子菜单1-2</template>
            <f-nav-item name="sub1-2-1">内容1-2-1</f-nav-item>
          </f-sub-nav>
        </f-sub-nav>

        <f-sub-nav name="sub2">
          <template slot="title">子菜单2</template>
          <f-nav-item name="sub2-1">内容2</f-nav-item>
        </f-sub-nav>
      `,
      },
    });
    expect(wrapper.vm.titleNavItems.map(vm => vm.name).join(',')).to.eq(
      'sub1-2,sub1,sub2'
    );
    wrapper.destroy();
  });

  xit('可以记录通往被选中项的路径', done => {
    const wrapper = mount(FNav, {
      propsData: { trigger: 'click' },
      stubs: { FSubNav, FNavItem },
      slots: {
        default: `
          <f-sub-nav name="sub1" class="bbb">
            <template slot="title">一级子菜单</template>
            <f-nav-item name="sub1-1">内容1</f-nav-item>

            <f-sub-nav name="sub2" class="ccc">
              <template slot="title">二级子菜单</template>
              <f-nav-item name="sub2-1">内容2</f-nav-item>
            </f-sub-nav>
          </f-sub-nav>
        `,
      },
    });
    wrapper.find('.bbb > .f-sub-nav-title-container').trigger('click');
    wrapper.find('.ccc > .f-sub-nav-title-container').trigger('click');
    wrapper.find('.f-nav-item[data-name="sub2-1"]').trigger('click');
    setTimeout(() => {
      wrapper.destroy();
      done();
    }, 1000);
  });
});
