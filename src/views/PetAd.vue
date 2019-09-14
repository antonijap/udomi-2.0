<template>
  <div>
    <h1>I am a pet add {{ $route.params.id }}</h1>
    <h1>{{ $route.params.name }}</h1>
  </div>
</template>

<script>
export default {
  created() {
    console.log("petAd, created");
  }
};
</script>
