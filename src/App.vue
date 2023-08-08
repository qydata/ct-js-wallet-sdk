<template>
  <div id="app" class="app">
    <router-view :key="$route.fullPath"/>
  </div>
</template>

<script>

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
    // 使用暗色模式
    let html = document.documentElement
    html.classList.add('dark')
    window.addEventListener('resize', () => {
      this.setViewHeight()
    })
  }
}
</script>

<style>
.app {
  /*--tw-bg-opacity: 1;*/
  /*background-color: rgba(229, 231, 235, var(--tw-bg-opacity));*/
}

.el-form--default {
  --tw-bg-opacity: 1;
  background-color: rgba(229, 231, 235, var(--tw-bg-opacity));
  padding: 20px;
  border-radius: 10px;
}
</style>
