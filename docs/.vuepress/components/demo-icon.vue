<template>
  <div>
    <f-icon name="info" />
    <f-icon name="setting" />
    <f-icon name="loading" />
    <f-icon name="download" />
    <f-icon name="like" />
    <f-icon name="up" />
    <f-icon name="down" />
    <f-icon name="left" />
    <f-icon name="right" />

    <pre><code>{{ code }}</code></pre>
  </div>
</template>


<script>
import FIcon from "../../../src/components/FIcon.vue";

export default {
  components: {
    "f-icon": FIcon,
  },
  data() {
    return {
      code: `
        <f-icon name="info" />
        <f-icon name="setting" />
        <f-icon name="loading" />
        <f-icon name="download" />
        <f-icon name="like" />
        <f-icon name="up" />
        <f-icon name="down" />
        <f-icon name="left" />
        <f-icon name="right" />
      `
        .replace(/ {2}/g, "")
        .trim(),
    };
  },
};
</script>
