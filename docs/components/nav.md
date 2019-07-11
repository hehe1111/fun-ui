# 导航菜单 Nav

- 横向时，支持两种方式开关子菜单：鼠标悬浮（`hover` 默认方式 ）和单击（`click`）。
- 纵向时，目前暂时只支持单击方式。

## 代码演示

### 横向

- 鼠标悬浮打开/关闭子菜单（默认触发方式）

<ClientOnly>
  <demo-nav-1 />
</ClientOnly>

```vue
<template>
  <div>
    <f-nav :selected="selected">
      <f-nav-item name="home">首页</f-nav-item>
      <f-sub-nav name="about">
        <template slot="title"
          >关于</template
        >
        <f-nav-item name="culture">企业文化</f-nav-item>
        <f-nav-item name="team">团队</f-nav-item>
        <f-sub-nav name="contacts">
          <template slot="title"
            >联系方式</template
          >
          <f-nav-item name="wechat">微信</f-nav-item>
          <f-sub-nav name="qq">
            <template slot="title"
              >QQ</template
            >
            <f-nav-item name="yellow">黄钻</f-nav-item>
            <f-nav-item name="green">绿钻</f-nav-item>
            <f-nav-item name="pink">粉钻</f-nav-item>
          </f-sub-nav>
          <f-sub-nav name="phone">
            <template slot="title"
              >手机</template
            >
            <f-nav-item name="cm">移动</f-nav-item>
            <f-nav-item name="cw">联通</f-nav-item>
            <f-nav-item name="cn">电信</f-nav-item>
          </f-sub-nav>
        </f-sub-nav>
      </f-sub-nav>
      <f-nav-item name="hire">招聘</f-nav-item>
    </f-nav>
  </div>
</template>

<script>
import FNav from "../../../src/components/nav/FNav.vue";
import FSubNav from "../../../src/components/nav/FSubNav.vue";
import FNavItem from "../../../src/components/nav/FNavItem.vue";

export default {
  data() {
    return {
      selected: "cn",
    };
  },
  components: { FNav, FSubNav, FNavItem },
};
</script>
```

- 鼠标单击打开/关闭子菜单

<ClientOnly>
  <demo-nav-2 />
</ClientOnly>

```vue
<template>
  <div>
    <f-nav :selected="selected" trigger="click">
      <f-nav-item name="home">首页</f-nav-item>
      <f-sub-nav name="about">
        <template slot="title"
          >关于</template
        >
        <f-nav-item name="culture">企业文化</f-nav-item>
        <f-nav-item name="team">团队</f-nav-item>
        <f-sub-nav name="contacts">
          <template slot="title"
            >联系方式</template
          >
          <f-nav-item name="wechat">微信</f-nav-item>
          <f-sub-nav name="qq">
            <template slot="title"
              >QQ</template
            >
            <f-nav-item name="yellow">黄钻</f-nav-item>
            <f-nav-item name="green">绿钻</f-nav-item>
            <f-nav-item name="pink">粉钻</f-nav-item>
          </f-sub-nav>
          <f-sub-nav name="phone">
            <template slot="title"
              >手机</template
            >
            <f-nav-item name="cm">移动</f-nav-item>
            <f-nav-item name="cw">联通</f-nav-item>
            <f-nav-item name="cn">电信</f-nav-item>
          </f-sub-nav>
        </f-sub-nav>
      </f-sub-nav>
      <f-nav-item name="hire">招聘</f-nav-item>
    </f-nav>
  </div>
</template>

<script>
import FNav from "../../../src/components/nav/FNav.vue";
import FSubNav from "../../../src/components/nav/FSubNav.vue";
import FNavItem from "../../../src/components/nav/FNavItem.vue";

export default {
  data() {
    return {
      selected: "yellow",
    };
  },
  components: { FNav, FSubNav, FNavItem },
};
</script>
```

### 纵向

<ClientOnly>
  <demo-nav-3 />
</ClientOnly>

```vue
<template>
  <div>
    <f-nav :selected="selected" vertical>
      <f-nav-item name="home">首页</f-nav-item>
      <f-sub-nav name="about">
        <template slot="title"
          >关于</template
        >
        <f-nav-item name="culture">企业文化</f-nav-item>
        <f-nav-item name="team">团队</f-nav-item>
        <f-sub-nav name="contacts">
          <template slot="title"
            >联系方式</template
          >
          <f-nav-item name="wechat">微信</f-nav-item>
          <f-sub-nav name="qq">
            <template slot="title"
              >QQ</template
            >
            <f-nav-item name="yellow">黄钻</f-nav-item>
            <f-nav-item name="green">绿钻</f-nav-item>
            <f-nav-item name="pink">粉钻</f-nav-item>
          </f-sub-nav>
          <f-sub-nav name="phone">
            <template slot="title"
              >手机</template
            >
            <f-nav-item name="cm">移动</f-nav-item>
            <f-nav-item name="cw">联通</f-nav-item>
            <f-nav-item name="cn">电信</f-nav-item>
          </f-sub-nav>
        </f-sub-nav>
      </f-sub-nav>
      <f-nav-item name="hire">招聘</f-nav-item>
    </f-nav>
  </div>
</template>

<script>
import FNav from "../../../src/components/nav/FNav.vue";
import FSubNav from "../../../src/components/nav/FSubNav.vue";
import FNavItem from "../../../src/components/nav/FNavItem.vue";

export default {
  data() {
    return {
      selected: "home",
    };
  },
  components: { FNav, FSubNav, FNavItem },
};
</script>
```

## API

| 参数     | 说明                 | 类型    | 默认值 | 可选值        | 是否必选 |
| -------- | -------------------- | ------- | ------ | ------------- | -------- |
| name     | 区分各个 nav item    | string  | -      | -             | 是       |
| selected | 当前被选中项         | string  | -      | -             | 否       |
| vertical | 是否是纵向           | boolean | false  | false / true  | 否       |
| trigger  | 横向时如何打开子菜单 | string  | hover  | hover / click | 否       |
