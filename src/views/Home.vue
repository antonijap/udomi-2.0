<template>
  <div
    style="display: grid; grid-template-columns: repeat(4, 1fr); grid-column-gap: 10px;"
  >
    <div v-for="(item, index) in ads" :key="index">
      <span>{{ item.name }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "home",
  components: {}
};
</script>
