import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import { mount } from '@vue/test-utils';
import FCarousel from '@/components/FCarousel.vue';
import FCarouselItem from '@/components/FCarouselItem.vue';
chai.use(sinonChai);

const returnOptionsObj = propsData => {
  return {
    propsData,
    stubs: { FCarouselItem },
    slots: {
      default: `
          <f-carousel-item name="x1"><div style="height: 100px">x1</div></f-carousel-item>
          <f-carousel-item name="x2"><div style="height: 100px">x2</div></f-carousel-item>
          <f-carousel-item name="x3"><div style="height: 100px">x3</div></f-carousel-item>
        `,
    },
  };
};

describe('FCarousel.vue', () => {
  it('存在，且默认展示第一个子组件', () => {
    const wrapper = mount(FCarousel, returnOptionsObj({ autoPlay: false }));
    expect(wrapper.exists()).to.eq(true);
    wrapper.vm.$nextTick().then(() => {
      expect(wrapper.find('.f-carousel-item > div').text()).to.eq('x1');
      expect(
        wrapper
          .findAll('.dot')
          .at(0)
          .classes()
      ).include('active');
      wrapper.destroy();
    });
  });

  it('可以接收 selected 属性', () => {
    const selected = 'x2';
    const wrapper = mount(
      FCarousel,
      returnOptionsObj({ selected, autoPlay: false })
    );
    wrapper.vm.$nextTick().then(() => {
      expect(wrapper.find('.f-carousel-item > div').text()).to.eq(selected);
      expect(
        wrapper
          .findAll('.dot')
          .at(1)
          .classes()
      ).include('active');
      wrapper.destroy();
    });
  });

  it('可以接收 autoPlay 属性', done => {
    const fake = sinon.fake();
    const wrapper = mount(FCarousel, {
      listeners: { 'update:selected': fake },
      ...returnOptionsObj({
        autoPlay: 0.02,
      }),
    });
    wrapper.vm.$nextTick().then(() => {
      expect(wrapper.find('.f-carousel-item > div').text()).to.eq('x1');
      expect(
        wrapper
          .findAll('.dot')
          .at(0)
          .classes()
      ).include('active');

      setTimeout(() => {
        expect(fake).to.have.been.calledWith('x2');
        expect(wrapper.find('.f-carousel-item > div').text()).to.eq('x2');
        expect(
          wrapper
            .findAll('.dot')
            .at(1)
            .classes()
        ).include('active');

        wrapper.destroy();
        done();
      }, 25);
    });
  });

  it('可以接收 enableArrow 属性', () => {
    const wrapper = mount(
      FCarousel,
      returnOptionsObj({ enableArrow: true, autoPlay: false })
    );
    wrapper.vm.$nextTick().then(() => {
      expect(wrapper.find('.f-carousel-prev').exists()).to.eq(true);
      expect(wrapper.find('.f-carousel-next').exists()).to.eq(true);
      wrapper.destroy();
    });
  });

  it('点击圆点可以进行切换', () => {
    const target = 2; // 1 或 2
    const wrapper = mount(FCarousel, returnOptionsObj({ autoPlay: false }));
    wrapper.vm.$nextTick().then(() => {
      expect(wrapper.find('.f-carousel-item > div').text()).to.eq('x1');
      expect(
        wrapper
          .findAll('.dot')
          .at(0)
          .classes()
      ).include('active');
      wrapper
        .findAll('.dot')
        .at(target)
        .trigger('click');
      wrapper.vm.$nextTick().then(() => {
        expect(wrapper.find('.f-carousel-item > div').text()).to.eq(
          `x${target + 1}`
        );
        expect(
          wrapper
            .findAll('.dot')
            .at(target)
            .classes()
        ).include('active');

        wrapper.destroy();
      });
    });
  });

  it('点击左右箭头可以进行切换', () => {
    const wrapper = mount(
      FCarousel,
      returnOptionsObj({ enableArrow: true, autoPlay: false })
    );
    wrapper.vm.$nextTick().then(() => {
      expect(wrapper.find('.f-carousel-item > div').text()).to.eq('x1');
      expect(
        wrapper
          .findAll('.dot')
          .at(0)
          .classes()
      ).include('active');

      wrapper.find('.f-carousel-prev').trigger('click');

      wrapper.vm.$nextTick().then(() => {
        expect(wrapper.find('.f-carousel-item > div').text()).to.eq('x3');
        expect(
          wrapper
            .findAll('.dot')
            .at(2)
            .classes()
        ).include('active');

        wrapper.find('.f-carousel-next').trigger('click');

        wrapper.vm.$nextTick().then(() => {
          expect(wrapper.find('.f-carousel-item > div').text()).to.eq('x1');
          expect(
            wrapper
              .findAll('.dot')
              .at(0)
              .classes()
          ).include('active');

          wrapper.destroy();
        });
      });
    });
  });
});
