<template>
  <div id="app">
    <div class="container">
      <b-nav>
        <b-nav-item active>
          <router-link to="/">Home</router-link>
        </b-nav-item>
        <b-nav-item>
          <router-link to="/about">About</router-link>
        </b-nav-item>
      </b-nav>
      <router-view />
    </div>
  </div>
</template>

<style lang="scss">
@import "@/styles/app.scss";
</style>
