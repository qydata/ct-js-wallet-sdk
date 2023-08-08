<template>
  <el-dialog :model-value="visible" :show-close="false" width="500px" height="100%">
    <template #header>
      <h2>{{ tabModelName }}</h2>
    </template>

    <iframe id="iframeConnectWallet"
            ref="iframe"
            name="iframeConnectWallet"
            title="Inline Frame"
            @load="iframeLoad"
            height="800"
            width="400"
            :src="connectWalletCallbackUrl">
    </iframe>

    <LoadingModal :visible="loading"/>
  </el-dialog>
</template>

<script>
import LoadingModal from '@/components/index/LoadingModal'

export default {
  name: 'IframeModal',
  components: {
    LoadingModal
  },
  props: {
    transaction: Object,
    close: Function,
    visible: Boolean,
    connectWalletCallbackUrl: String,
    tabModelName: String
  },
  data() {
    return {
      targetOrigin: 'https://wallet.ctblock.cn',
      // targetOrigin: 'http://localhost:8000',
      loading: false
    }
  },
  watch: {
    visible(newV, oldV) {
      if (newV == true) {
        this.loading = newV
      }
    }
  },
  computed: {},
  methods: {
    iframeLoad() {
      let that = this
      window.setTimeout(() => {
        that.loading = false

        if (that.connectWalletCallbackUrl.toString().indexOf('/interSign') != -1) {
          // 签名
          let iframeWindow = window.frames['iframeConnectWallet']
          iframeWindow.postMessage({type: 'transaction', message: JSON.parse(JSON.stringify(that.transaction))},
            that.targetOrigin)
        }
        if (that.connectWalletCallbackUrl.toString().indexOf('/interact') != -1) {
          // 签名
          let iframeWindow = window.frames['iframeConnectWallet']
          iframeWindow.postMessage({type: 'transaction', message: JSON.parse(JSON.stringify(that.transaction))},
            that.targetOrigin)

        }
        if (that.connectWalletCallbackUrl.toString().indexOf('/connectWallet') != -1) {
          // 链接钱包
        }
      }, 1000)

    },
    cancel() {
      this.close()
    }
  },
  mounted() {
    this.loading = this.visible
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

#iframeConnectWallet {
  width: 100%;
}
</style>
