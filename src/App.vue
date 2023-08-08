<template>
  <div id="app" class="app">
    <router-view :key="$route.fullPath"/>
  </div>
</template>

<script>
const ethers = require('ethers')
export default {
  title() {
    return '草田链'
  },

  methods: {
    setViewHeight: function () {
      const vh = window.innerHeight * 0.01
      document.documentElement.style.setProperty('--vh', `${vh}px`)
    }
  },
  mounted: function () {
    this.setViewHeight()
    window.addEventListener('resize', () => {
      this.setViewHeight()
    })
  }
}
</script>

<style>
.app {
  --tw-bg-opacity: 1;
  background-color: rgba(229, 231, 235, var(--tw-bg-opacity));
}
</style>
