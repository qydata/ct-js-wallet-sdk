<template>
  <el-dialog :close-on-click-modal="false"
             :close-on-press-escape="false"
             :model-value="visible" :show-close="false" width="500px">
    <div>
      <body style="background: #141414;">
      <div class="loading">
        <span style="--i: 0;"></span>
        <span style="--i: 2;"></span>
        <span style="--i: 4;"></span>
        <span style="--i: 6;"></span>
        <span style="--i: 8;"></span>
        <span style="--i: 10;"></span>
        <span style="--i: 12;"></span>
        <span style="--i: 14;"></span>
        <span style="--i: 16;"></span>
        <span style="--i: 18;"></span>
      </div>
      </body>
      <div style="text-align: center;">
        <h3>加载中</h3>
      </div>
    </div>
  </el-dialog>
</template>

<script>

export default {
  name: 'LoadingModal',
  components: {},
  props: {
    close: Function,
    visible: Boolean
  },
  data() {
    return {
      test: false
    }
  },
  computed: {},
  methods: {
    cancel() {
      this.reset()
      this.close()
    }
  },
  async mounted() {
  },
  setup() {
    return {}
  }
}
</script>

<style scoped>
@keyframes clicked_animation {
  50% {
    transform: scale(1.5, 1.5);
    opacity: 0;
  }
  99% {
    transform: scale(0.001, 0.001);
    opacity: 0;
  }
  100% {
    transform: scale(0.001, 0.001);
    opacity: 1;
  }
}

body {
  padding: 0;
  margin: 0;
  min-height: 150px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.loading {
  width: 50px;
  height: 50px;
  position: relative;
}

.loading > span {
  position: absolute;
  width: 100%;
  height: 100%;
  transform: rotate(calc(var(--i) * 18deg));
}

.loading > span::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: #fff;
  animation: breath 2s linear infinite;
  animation-delay: calc(var(--i) * 0.1s);
}

@keyframes breath {
  0% {
    transform: scale(0);
  }
  10% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(0);
  }
}

</style>
