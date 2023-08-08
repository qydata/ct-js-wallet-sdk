<template>
  <div>
    <Modal :close="cancel" :visible="visible">
      <template v-slot:header>
        <h2>{{ tabModelName }}</h2>
      </template>

      <template v-slot:body>
        <div class="pt-15">
          <iframe id="iframeConnectWallet"
                  ref="iframe"
                  name="iframeConnectWallet"
                  title="Inline Frame"
                  @load="iframeLoad"
                  height="800"
                  width="400"
                  :src="connectWalletCallbackUrl">
          </iframe>

        </div>
      </template>

      <template v-slot:footer>
        <div class="px-24 pt-48 border-gray-700 border-solid border-t-default border-opacity-30 pb-54">
          <el-button type="success" size="large" @click="visible = false">关闭</el-button>

        </div>
      </template>

    </Modal>
    <LoadingModal :visible="loading"/>
  </div>
</template>

<script>
import LoadingModal from '@/components/index/LoadingModal'
import * as validation from '@/utils/validation'
import useVuelidate from '@vuelidate/core'
import Modal from '../Modal'

export default {
  name: 'IframeModal',
  components: {
    LoadingModal,
    Modal
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
      walletName: '',
      targetOrigin: 'https://wallet.ctblock.cn',
      // targetOrigin: 'http://localhost:8000',
      address: '',
      privateKey: '',
      publicKey: '',

      password: '',
      passwordError: '',
      canCopy: !!navigator.clipboard,
      loading: false,
      defaultV: 'ERC721Ctnft'
    }
  },
  validations() {
    return {
      password: [
        validation.passwordRequired,
        validation.passwordLength
      ]
    }
  },
  watch: {
    visible(newV, oldV) {
      if (newV == true) {
        this.loading = newV
      }
    }
  },
  computed: {
    canSubmit() {
      return !this.v$.$invalid
    }
  },
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
      this.reset()
      this.close()
    },

    reset() {
      this.password = ''
      this.v$.$reset()
    }
  },
  mounted() {
    this.loading = this.visible
  },
  setup() {
    return {
      v$: useVuelidate()
    }
  }
}
</script>

<style scoped>
.private-key {
  width: 32ch
}

.on-clicked-effect {
  transition: all 0.4s ease-in;
}

.on-clicked-effect:before {
  content: '';
  background-color: aliceblue;
  border-radius: 50%;
  display: block;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  transform: scale(0.001, 0.001);
}

.on-clicked-effect:focus:not(:active) {
  position: relative;
  display: inline-block;
  outline: 0;
}

.on-clicked-effect:focus:not(:active):before {
  animation: clicked_animation 0.8s ease-out;
}

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
