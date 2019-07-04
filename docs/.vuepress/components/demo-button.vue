<template>
  <div>
    <f-button>按钮</f-button>
    <f-button>
      <f-icon name="loading"/>按钮
    </f-button>
    <f-button>
      <f-icon name="left"/>按钮
      <f-icon name="right"/>
    </f-button>

    <pre><code>{{ code }}</code></pre>
  </div>
</template>


<script>
import FIcon from "../../../src/components/FIcon.vue";
import FButton from "../../../src/components/FButton.vue";

export default {
  components: {
    "f-icon": FIcon,
    "f-button": FButton,
  },
  data() {
    return {
      code: `
        <f-button>按钮</f-button>
        <f-button>
          <f-icon name="loading"/>按钮
        </f-button>
        <f-button>
          <f-icon name="left"/>按钮
          <f-icon name="right"/>
        </f-button>
      `
        .replace(/ {2,}/g, "")
        .trim(),
    };
  },
};
</script>
