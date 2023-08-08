<template>
  <div class="index">
    <IframeModal :close="close"
                 :connectWalletCallbackUrl="connectWalletCallbackUrl"
                 :tabModelName="tabModelName"
                 :transaction="transaction"
                 :visible="tabModel === 'iframeConnectWallet'"/>
    <h1>测试跨域通讯</h1>

    <el-button type="success" size="large" @click="connectWallet">链接钱包测试</el-button>
    <el-button type="info" size="large" @click="showTrans">Show</el-button>
    <p>信息:{{ connectWalletMessage }}: {{ walletAddress }}</p>
    <el-row type="flex" justify="center" align="middle" :gutter="20">
      <el-col :md="4" :span="24" v-show="showT">
        <div class="mb32">

          <h2>打开窗口发送交易</h2>
          <div>
            <el-form
              label-position="top"
              label-width="100px"
              :model="addressForm"
            >
              <el-form-item label="发送方地址:">
                <el-input placeholder="发送方地址" disabled v-model="walletAddress"/>
              </el-form-item>
              <el-form-item label="接收方地址:">
                <el-input placeholder="接收方地址" v-model="addressForm.to"/>
              </el-form-item>
              <el-form-item label="发送数量:">
                <el-input placeholder="发送数量" v-model="addressForm.value"/>
              </el-form-item>
              <el-form-item label="">
                <el-button type="primary" size="large" @click="postMessage(1)">发送</el-button>
              </el-form-item>
              <el-form-item label="result:">
                {{ addTx }}
              </el-form-item>
            </el-form>
          </div>


        </div>
      </el-col>
      <el-col :md="7" :span="24" v-show="showT">
        <h2>打开窗口合约交互</h2>
        <div>
          <el-form
            label-position="top"
            label-width="100px"
            :model="addressForm"
          >
            <el-form-item label="发送方地址:">
              <el-input placeholder="发送方地址" disabled v-model="walletAddress"/>
            </el-form-item>
            <el-form-item label="发送数量:">
              <el-input placeholder="发送数量" v-model="addressForm.value"/>
            </el-form-item>
            <el-form-item label="合约地址:">
              <el-input placeholder="合约地址" v-model="addressForm.to"/>
            </el-form-item>
            <el-form-item label="合约abi:">
              <el-input placeholder="合约abi" type="textarea" :autosize="{ minRows: 2, maxRows: 8 }"
                        v-model="addressForm.abi"/>
            </el-form-item>
            <el-form-item label="合约方法:">
              <el-input placeholder="合约方法" v-model="addressForm.method"/>
            </el-form-item>
            <el-form-item label="合约参数:">
              <el-input placeholder="合约参数" v-model="addressForm.params"/>
            </el-form-item>
            <el-button size="large" type="primary" @click="postMessage(2)">交互</el-button>
            <el-form-item label="Result:">
              {{ contractTx }}
            </el-form-item>
          </el-form>
        </div>
      </el-col>

      <!--       签名-->
      <el-col :md="4" :span="24">
        <h2>模态框普通交易签名</h2>
        <div class="mb32">
          <div>
            <el-form
              label-position="top"
              label-width="100px"
              :model="addressSignPTJYForm"
            >
              <el-form-item label="发送方地址:">
                <el-input placeholder="发送方地址" v-model="addressSignPTJYForm.from"/>
              </el-form-item>
              <el-form-item label="接收方地址:">
                <el-input placeholder="接收方地址" v-model=" addressSignPTJYForm.to"/>
              </el-form-item>
              <el-form-item label="发送数量:">
                <el-input placeholder="发送数量" v-model=" addressSignPTJYForm.value"/>
              </el-form-item>
              <el-form-item label="发送数量:">
                <el-input placeholder="发送数量" v-model=" nonce"/>
              </el-form-item>
              <el-form-item label="gasPrice:">
                <el-input placeholder="gasPrice" v-model=" addressSignPTJYForm.gasPrice"/>
              </el-form-item>
              <el-form-item label="gasLimit:">
                <el-input placeholder="gasLimit" v-model=" addressSignPTJYForm.gasLimit"/>
              </el-form-item>
              <el-form-item label="Data:">
                <el-input placeholder="Data" v-model=" addressSignPTJYForm.data"/>
              </el-form-item>
              <el-form-item label="">
                <el-button type="primary" size="large" @click="signPTJY">签名普通交易</el-button>
              </el-form-item>
            </el-form>
          </div>
        </div>
      </el-col>
      <el-col :md="7" :span="24">
        <h2>模态框合约交易签名</h2>
        <div>
          <el-form
            label-position="top"
            label-width="100px"
            :model="addressSignHYJYForm"
          >
            <el-form-item label="发送方地址:">
              <el-input placeholder="发送方地址" disabled v-model="walletAddress"/>
            </el-form-item>
            <el-form-item label="发送数量:">
              <el-input placeholder="发送数量" v-model=" addressSignHYJYForm.value"/>
            </el-form-item>
            <el-form-item label="发送数量:">
              <el-input placeholder="发送数量" v-model=" nonce"/>
            </el-form-item>
            <el-form-item label="合约地址:">
              <el-input placeholder="合约地址" v-model=" addressSignHYJYForm.to"/>
            </el-form-item>
            <el-form-item label="合约abi:">
              <el-input placeholder="合约abi" type="textarea" v-model=" addressSignHYJYForm.abi" :autosize="{ minRows: 2, maxRows: 8 }"/>
            </el-form-item>
            <el-form-item label="合约方法:">
              <el-input placeholder="合约方法" v-model=" addressSignHYJYForm.method"/>
            </el-form-item>
            <el-form-item label="合约参数:">
              <el-input placeholder="合约参数" v-model=" addressSignHYJYForm.params"/>
            </el-form-item>
            <el-form-item label="gasPrice:">
              <el-input placeholder="gasPrice"  v-model=" addressSignHYJYForm.gasPrice"/>
            </el-form-item>
            <el-form-item label="gasLimit:">
              <el-input placeholder="gasLimit" v-model=" addressSignHYJYForm.gasLimit"/>
            </el-form-item>
            <el-form-item label="data:">
              <el-input placeholder="data" v-model=" addressSignHYJYForm.data"/>
            </el-form-item>
            <el-button size="large" type="primary" @click="signPreparHYJY">计算手续费和组装data参数</el-button>
            <el-button size="large" type="primary" @click="signHYJY">签名合约交易</el-button>
            <el-form-item label="GasLimitResult:">
              {{ HYJYError }}
            </el-form-item>
          </el-form>
        </div>
      </el-col>
      <el-col :md="8" :span="24">
        <h2>签名数据进行上链广播</h2>
        <el-form
          label-position="top"
          label-width="100px"
          :model="addressSignHYJYForm"
        >
          <el-form-item label="serializedTxStr:">
            <el-input disabled placeholder="serializedTxStr" v-model="serializedTxStr"/>
          </el-form-item>
          <el-button type="primary" size="large" @click="boardcastTransaction">广播交易</el-button>
          <el-form-item label="txResult:">
            <el-input placeholder="txResult" type="textarea" v-model="txResult" :autosize="{ minRows: 2, maxRows: 8 }"/>
          </el-form-item>
        </el-form>
      </el-col>
      <!--      结构化签名交易-->
      <el-col :md="8" :span="24">
        <h2>模态框结构数据签名</h2>
        <div>
          <el-form
            label-position="top"
            label-width="100px"
            :model="stractSignMsg"
          >
            <el-form-item label="chainid:">
              <el-input placeholder="chainid" disabled   v-model="stractSignMsg.chainId"/>
            </el-form-item>
            <el-form-item label="name:">
              <el-input placeholder="签名字符串" type="textarea" v-model="stractSignMsg.name" :autosize="{ minRows: 2, maxRows: 8 }"/>
            </el-form-item>
            <el-form-item label="version:">
              <el-input placeholder="签名字符串" disabled type="textarea" v-model="stractSignMsg.version"/>
            </el-form-item>
            <el-form-item label="verifyingContract:">
              <el-input placeholder="签名字符串" disabled type="textarea" v-model="stractSignMsg.verifyingContract"/>
            </el-form-item>
            <el-form-item label="primaryType:">
              <el-input placeholder="签名字符串" type="textarea" v-model="stractSignMsg.primaryType"/>
            </el-form-item>
            <el-form-item label="msg:">
              <el-input placeholder="签名字符串" type="textarea" v-model="stractSignMsg.msg"/>
            </el-form-item>
            <el-button size="large" type="primary" @click="signJGH">结构化签名</el-button>
            <el-form-item label="Result:">
              {{ contractStractSignTx }}
            </el-form-item>

          </el-form>
        </div>

      </el-col>
    </el-row>
  </div>
</template>
<script>

let util = {
  postMessageCallBack: null
}
util.postMessageCallBack = window.location.origin
const Web3 = require('web3')
import IframeModal from '@/components/index/IframeModal'
import {contract_gas_call_override} from '@/contract/ChainCall'
import EIP712 from '@/contract/EIP712'

const ethers = require('ethers')

export default {
  data() {
    return {
      walletAddress: '0x39a1e670db3f586122150067f79937716dd48230',
      stractSignMsg: {
        msg: '["aa":"0x39a1e670db3f586122150067f79937716dd48230","bb":"1000000000000000000"]',
        caddress: '0x39a1e670db3f586122150067f79937716dd48230',
        verifyingContract: '0x845388bFE8e7389B5709867F0Ab0ec379C9FcDe7',
        name: 'Authentication',
        primaryType: 'Authentication',
        version: '1',
        chainId: '27'
      },
      showT: true,
      tabModel: null,
      tabModelName: null,
      transaction: null,
      splashWin: null,
      connectWalletMessage: null,
      addTx: null,
      contractTx: null,
      addSignPTJYTx: null,
      addSignTx: null,
      contractSignTx: null,
      contractStractSignTx: null,
      serializedTxStr: null,
      modal: 'create',
      nonce: 0,
      addressForm: {
        to: '0x39a1e670db3f586122150067f79937716dd48230',
        contractAddress: '0x845388bFE8e7389B5709867F0Ab0ec379C9FcDe7',
        value: '1',
        abi: '[  {  "constant": true,  "inputs": [],  "name": "name",  "outputs": [  {  "name": "",  "type": "string"  }  ],  "payable": false,  "stateMutability": "view",  "type": "function"  },  {  "constant": false,  "inputs": [  {  "name": "_spender",  "type": "address"  },  {  "name": "_value",  "type": "uint256"  }  ],  "name": "approve",  "outputs": [],  "payable": false,  "stateMutability": "nonpayable",  "type": "function"  },  {  "constant": true,  "inputs": [],  "name": "baseTimestamp",  "outputs": [  {  "name": "",  "type": "uint256"  }  ],  "payable": false,  "stateMutability": "view",  "type": "function"  },  {  "constant": true,  "inputs": [],  "name": "totalSupply",  "outputs": [  {  "name": "",  "type": "uint256"  }  ],  "payable": false,  "stateMutability": "view",  "type": "function"  },  {  "constant": false,  "inputs": [  {  "name": "_from",  "type": "address"  },  {  "name": "_to",  "type": "address"  },  {  "name": "_value",  "type": "uint256"  }  ],  "name": "transferFrom",  "outputs": [],  "payable": false,  "stateMutability": "nonpayable",  "type": "function"  },  {  "constant": true,  "inputs": [  {  "name": "",  "type": "address"  }  ],  "name": "balances",  "outputs": [  {  "name": "",  "type": "uint256"  }  ],  "payable": false,  "stateMutability": "view",  "type": "function"  },  {  "constant": true,  "inputs": [],  "name": "decimals",  "outputs": [  {  "name": "",  "type": "uint256"  }  ],  "payable": false,  "stateMutability": "view",  "type": "function"  },  {  "constant": true,  "inputs": [],  "name": "maximumFee",  "outputs": [  {  "name": "",  "type": "uint256"  }  ],  "payable": false,  "stateMutability": "view",  "type": "function"  },  {  "constant": true,  "inputs": [],  "name": "_totalSupply",  "outputs": [  {  "name": "",  "type": "uint256"  }  ],  "payable": false,  "stateMutability": "view",  "type": "function"  },  {  "constant": false,  "inputs": [],  "name": "unpause",  "outputs": [],  "payable": false,  "stateMutability": "nonpayable",  "type": "function"  },  {  "constant": true,  "inputs": [  {  "name": "",  "type": "address"  },  {  "name": "",  "type": "address"  }  ],  "name": "allowed",  "outputs": [  {  "name": "",  "type": "uint256"  }  ],  "payable": false,  "stateMutability": "view",  "type": "function"  },  {  "constant": true,  "inputs": [],  "name": "paused",  "outputs": [  {  "name": "",  "type": "bool"  }  ],  "payable": false,  "stateMutability": "view",  "type": "function"  },  {  "constant": true,  "inputs": [  {  "name": "who",  "type": "address"  }  ],  "name": "balanceOf",  "outputs": [  {  "name": "",  "type": "uint256"  }  ],  "payable": false,  "stateMutability": "view",  "type": "function"  },  {  "constant": false,  "inputs": [],  "name": "pause",  "outputs": [],  "payable": false,  "stateMutability": "nonpayable",  "type": "function"  },  {  "constant": true,  "inputs": [],  "name": "baseSupply",  "outputs": [  {  "name": "",  "type": "uint256"  }  ],  "payable": false,  "stateMutability": "view",  "type": "function"  },  {  "constant": true,  "inputs": [],  "name": "owner",  "outputs": [  {  "name": "",  "type": "address"  }  ],  "payable": false,  "stateMutability": "view",  "type": "function"  },  {  "constant": true,  "inputs": [],  "name": "symbol",  "outputs": [  {  "name": "",  "type": "string"  }  ],  "payable": false,  "stateMutability": "view",  "type": "function"  },  {  "constant": true,  "inputs": [  {  "name": "a",  "type": "uint256"  },  {  "name": "b",  "type": "uint256"  }  ],  "name": "div",  "outputs": [  {  "name": "",  "type": "uint256"  }  ],  "payable": false,  "stateMutability": "pure",  "type": "function"  },  {  "constant": false,  "inputs": [  {  "name": "_to",  "type": "address"  },  {  "name": "_value",  "type": "uint256"  }  ],  "name": "transfer",  "outputs": [],  "payable": false,  "stateMutability": "nonpayable",  "type": "function"  },  {  "constant": false,  "inputs": [  {  "name": "newBasisPoints",  "type": "uint256"  },  {  "name": "newMaxFee",  "type": "uint256"  }  ],  "name": "setParams",  "outputs": [],  "payable": false,  "stateMutability": "nonpayable",  "type": "function"  },  {  "constant": false,  "inputs": [  {  "name": "amount",  "type": "uint256"  }  ],  "name": "redeem",  "outputs": [],  "payable": false,  "stateMutability": "nonpayable",  "type": "function"  },  {  "constant": true,  "inputs": [  {  "name": "_owner",  "type": "address"  },  {  "name": "_spender",  "type": "address"  }  ],  "name": "allowance",  "outputs": [  {  "name": "remaining",  "type": "uint256"  }  ],  "payable": false,  "stateMutability": "view",  "type": "function"  },  {  "constant": true,  "inputs": [],  "name": "basisPointsRate",  "outputs": [  {  "name": "",  "type": "uint256"  }  ],  "payable": false,  "stateMutability": "view",  "type": "function"  },  {  "constant": true,  "inputs": [],  "name": "MAX_UINT",  "outputs": [  {  "name": "",  "type": "uint256"  }  ],  "payable": false,  "stateMutability": "view",  "type": "function"  },  {  "constant": false,  "inputs": [  {  "name": "types",  "type": "uint256"  },  {  "name": "amount",  "type": "uint256"  },  {  "name": "toAddress",  "type": "address"  }  ],  "name": "mint",  "outputs": [],  "payable": false,  "stateMutability": "nonpayable",  "type": "function"  },  {  "constant": false,  "inputs": [  {  "name": "newOwner",  "type": "address"  }  ],  "name": "transferOwnership",  "outputs": [],  "payable": false,  "stateMutability": "nonpayable",  "type": "function"  },  {  "inputs": [  {  "name": "_initialSupply",  "type": "uint256"  },  {  "name": "_name",  "type": "string"  },  {  "name": "_symbol",  "type": "string"  },  {  "name": "_decimals",  "type": "uint256"  }  ],  "payable": false,  "stateMutability": "nonpayable",  "type": "constructor"  },  {  "anonymous": false,  "inputs": [  {  "indexed": false,  "name": "amount",  "type": "uint256"  }  ],  "name": "Issue",  "type": "event"  },  {  "anonymous": false,  "inputs": [  {  "indexed": false,  "name": "amount",  "type": "uint256"  }  ],  "name": "Redeem",  "type": "event"  },  {  "anonymous": false,  "inputs": [  {  "indexed": false,  "name": "feeBasisPoints",  "type": "uint256"  },  {  "indexed": false,  "name": "maxFee",  "type": "uint256"  }  ],  "name": "Params",  "type": "event"  },  {  "anonymous": false,  "inputs": [  {  "indexed": true,  "name": "owner",  "type": "address"  },  {  "indexed": true,  "name": "spender",  "type": "address"  },  {  "indexed": false,  "name": "value",  "type": "uint256"  }  ],  "name": "Approval",  "type": "event"  },  {  "anonymous": false,  "inputs": [  {  "indexed": true,  "name": "from",  "type": "address"  },  {  "indexed": true,  "name": "to",  "type": "address"  },  {  "indexed": false,  "name": "value",  "type": "uint256"  }  ],  "name": "Transfer",  "type": "event"  },  {  "anonymous": false,  "inputs": [],  "name": "Pause",  "type": "event"  },  {  "anonymous": false,  "inputs": [],  "name": "Unpause",  "type": "event"  }  ]',
        method: 'transfer',
        params: '["0x39a1e670db3f586122150067f79937716dd48230","1000000000000000000"]'
      },
      addressSignPTJYForm: {
        from: '0x39a1e670db3f586122150067f79937716dd48230',
        to: '0x39a1e670db3f586122150067f79937716dd48230',
        value: '1',
        gasPrice: '4800',
        gasLimit: '21000',
        data: '0x'

      },
      HYJYError: '',
      addressSignHYJYForm: {
        to: '0x845388bFE8e7389B5709867F0Ab0ec379C9FcDe7',
        value: '1',
        abi: '[  {  "constant": true,  "inputs": [],  "name": "name",  "outputs": [  {  "name": "",  "type": "string"  }  ],  "payable": false,  "stateMutability": "view",  "type": "function"  },  {  "constant": false,  "inputs": [  {  "name": "_spender",  "type": "address"  },  {  "name": "_value",  "type": "uint256"  }  ],  "name": "approve",  "outputs": [],  "payable": false,  "stateMutability": "nonpayable",  "type": "function"  },  {  "constant": true,  "inputs": [],  "name": "baseTimestamp",  "outputs": [  {  "name": "",  "type": "uint256"  }  ],  "payable": false,  "stateMutability": "view",  "type": "function"  },  {  "constant": true,  "inputs": [],  "name": "totalSupply",  "outputs": [  {  "name": "",  "type": "uint256"  }  ],  "payable": false,  "stateMutability": "view",  "type": "function"  },  {  "constant": false,  "inputs": [  {  "name": "_from",  "type": "address"  },  {  "name": "_to",  "type": "address"  },  {  "name": "_value",  "type": "uint256"  }  ],  "name": "transferFrom",  "outputs": [],  "payable": false,  "stateMutability": "nonpayable",  "type": "function"  },  {  "constant": true,  "inputs": [  {  "name": "",  "type": "address"  }  ],  "name": "balances",  "outputs": [  {  "name": "",  "type": "uint256"  }  ],  "payable": false,  "stateMutability": "view",  "type": "function"  },  {  "constant": true,  "inputs": [],  "name": "decimals",  "outputs": [  {  "name": "",  "type": "uint256"  }  ],  "payable": false,  "stateMutability": "view",  "type": "function"  },  {  "constant": true,  "inputs": [],  "name": "maximumFee",  "outputs": [  {  "name": "",  "type": "uint256"  }  ],  "payable": false,  "stateMutability": "view",  "type": "function"  },  {  "constant": true,  "inputs": [],  "name": "_totalSupply",  "outputs": [  {  "name": "",  "type": "uint256"  }  ],  "payable": false,  "stateMutability": "view",  "type": "function"  },  {  "constant": false,  "inputs": [],  "name": "unpause",  "outputs": [],  "payable": false,  "stateMutability": "nonpayable",  "type": "function"  },  {  "constant": true,  "inputs": [  {  "name": "",  "type": "address"  },  {  "name": "",  "type": "address"  }  ],  "name": "allowed",  "outputs": [  {  "name": "",  "type": "uint256"  }  ],  "payable": false,  "stateMutability": "view",  "type": "function"  },  {  "constant": true,  "inputs": [],  "name": "paused",  "outputs": [  {  "name": "",  "type": "bool"  }  ],  "payable": false,  "stateMutability": "view",  "type": "function"  },  {  "constant": true,  "inputs": [  {  "name": "who",  "type": "address"  }  ],  "name": "balanceOf",  "outputs": [  {  "name": "",  "type": "uint256"  }  ],  "payable": false,  "stateMutability": "view",  "type": "function"  },  {  "constant": false,  "inputs": [],  "name": "pause",  "outputs": [],  "payable": false,  "stateMutability": "nonpayable",  "type": "function"  },  {  "constant": true,  "inputs": [],  "name": "baseSupply",  "outputs": [  {  "name": "",  "type": "uint256"  }  ],  "payable": false,  "stateMutability": "view",  "type": "function"  },  {  "constant": true,  "inputs": [],  "name": "owner",  "outputs": [  {  "name": "",  "type": "address"  }  ],  "payable": false,  "stateMutability": "view",  "type": "function"  },  {  "constant": true,  "inputs": [],  "name": "symbol",  "outputs": [  {  "name": "",  "type": "string"  }  ],  "payable": false,  "stateMutability": "view",  "type": "function"  },  {  "constant": true,  "inputs": [  {  "name": "a",  "type": "uint256"  },  {  "name": "b",  "type": "uint256"  }  ],  "name": "div",  "outputs": [  {  "name": "",  "type": "uint256"  }  ],  "payable": false,  "stateMutability": "pure",  "type": "function"  },  {  "constant": false,  "inputs": [  {  "name": "_to",  "type": "address"  },  {  "name": "_value",  "type": "uint256"  }  ],  "name": "transfer",  "outputs": [],  "payable": false,  "stateMutability": "nonpayable",  "type": "function"  },  {  "constant": false,  "inputs": [  {  "name": "newBasisPoints",  "type": "uint256"  },  {  "name": "newMaxFee",  "type": "uint256"  }  ],  "name": "setParams",  "outputs": [],  "payable": false,  "stateMutability": "nonpayable",  "type": "function"  },  {  "constant": false,  "inputs": [  {  "name": "amount",  "type": "uint256"  }  ],  "name": "redeem",  "outputs": [],  "payable": false,  "stateMutability": "nonpayable",  "type": "function"  },  {  "constant": true,  "inputs": [  {  "name": "_owner",  "type": "address"  },  {  "name": "_spender",  "type": "address"  }  ],  "name": "allowance",  "outputs": [  {  "name": "remaining",  "type": "uint256"  }  ],  "payable": false,  "stateMutability": "view",  "type": "function"  },  {  "constant": true,  "inputs": [],  "name": "basisPointsRate",  "outputs": [  {  "name": "",  "type": "uint256"  }  ],  "payable": false,  "stateMutability": "view",  "type": "function"  },  {  "constant": true,  "inputs": [],  "name": "MAX_UINT",  "outputs": [  {  "name": "",  "type": "uint256"  }  ],  "payable": false,  "stateMutability": "view",  "type": "function"  },  {  "constant": false,  "inputs": [  {  "name": "types",  "type": "uint256"  },  {  "name": "amount",  "type": "uint256"  },  {  "name": "toAddress",  "type": "address"  }  ],  "name": "mint",  "outputs": [],  "payable": false,  "stateMutability": "nonpayable",  "type": "function"  },  {  "constant": false,  "inputs": [  {  "name": "newOwner",  "type": "address"  }  ],  "name": "transferOwnership",  "outputs": [],  "payable": false,  "stateMutability": "nonpayable",  "type": "function"  },  {  "inputs": [  {  "name": "_initialSupply",  "type": "uint256"  },  {  "name": "_name",  "type": "string"  },  {  "name": "_symbol",  "type": "string"  },  {  "name": "_decimals",  "type": "uint256"  }  ],  "payable": false,  "stateMutability": "nonpayable",  "type": "constructor"  },  {  "anonymous": false,  "inputs": [  {  "indexed": false,  "name": "amount",  "type": "uint256"  }  ],  "name": "Issue",  "type": "event"  },  {  "anonymous": false,  "inputs": [  {  "indexed": false,  "name": "amount",  "type": "uint256"  }  ],  "name": "Redeem",  "type": "event"  },  {  "anonymous": false,  "inputs": [  {  "indexed": false,  "name": "feeBasisPoints",  "type": "uint256"  },  {  "indexed": false,  "name": "maxFee",  "type": "uint256"  }  ],  "name": "Params",  "type": "event"  },  {  "anonymous": false,  "inputs": [  {  "indexed": true,  "name": "owner",  "type": "address"  },  {  "indexed": true,  "name": "spender",  "type": "address"  },  {  "indexed": false,  "name": "value",  "type": "uint256"  }  ],  "name": "Approval",  "type": "event"  },  {  "anonymous": false,  "inputs": [  {  "indexed": true,  "name": "from",  "type": "address"  },  {  "indexed": true,  "name": "to",  "type": "address"  },  {  "indexed": false,  "name": "value",  "type": "uint256"  }  ],  "name": "Transfer",  "type": "event"  },  {  "anonymous": false,  "inputs": [],  "name": "Pause",  "type": "event"  },  {  "anonymous": false,  "inputs": [],  "name": "Unpause",  "type": "event"  }  ]',
        method: 'transfer',
        params: '["0x39a1e670db3f586122150067f79937716dd48230","1000000000000000000"]',
        gasPrice: '4800',
        gasLimit: '21000',
        data: '0x'
      },
      addressSignForm: {
        to: '0x39a1e670db3f586122150067f79937716dd48230',
        contractAddress: '0x845388bFE8e7389B5709867F0Ab0ec379C9FcDe7',
        value: '1',
        abi: '[  {  "constant": true,  "inputs": [],  "name": "name",  "outputs": [  {  "name": "",  "type": "string"  }  ],  "payable": false,  "stateMutability": "view",  "type": "function"  },  {  "constant": false,  "inputs": [  {  "name": "_spender",  "type": "address"  },  {  "name": "_value",  "type": "uint256"  }  ],  "name": "approve",  "outputs": [],  "payable": false,  "stateMutability": "nonpayable",  "type": "function"  },  {  "constant": true,  "inputs": [],  "name": "baseTimestamp",  "outputs": [  {  "name": "",  "type": "uint256"  }  ],  "payable": false,  "stateMutability": "view",  "type": "function"  },  {  "constant": true,  "inputs": [],  "name": "totalSupply",  "outputs": [  {  "name": "",  "type": "uint256"  }  ],  "payable": false,  "stateMutability": "view",  "type": "function"  },  {  "constant": false,  "inputs": [  {  "name": "_from",  "type": "address"  },  {  "name": "_to",  "type": "address"  },  {  "name": "_value",  "type": "uint256"  }  ],  "name": "transferFrom",  "outputs": [],  "payable": false,  "stateMutability": "nonpayable",  "type": "function"  },  {  "constant": true,  "inputs": [  {  "name": "",  "type": "address"  }  ],  "name": "balances",  "outputs": [  {  "name": "",  "type": "uint256"  }  ],  "payable": false,  "stateMutability": "view",  "type": "function"  },  {  "constant": true,  "inputs": [],  "name": "decimals",  "outputs": [  {  "name": "",  "type": "uint256"  }  ],  "payable": false,  "stateMutability": "view",  "type": "function"  },  {  "constant": true,  "inputs": [],  "name": "maximumFee",  "outputs": [  {  "name": "",  "type": "uint256"  }  ],  "payable": false,  "stateMutability": "view",  "type": "function"  },  {  "constant": true,  "inputs": [],  "name": "_totalSupply",  "outputs": [  {  "name": "",  "type": "uint256"  }  ],  "payable": false,  "stateMutability": "view",  "type": "function"  },  {  "constant": false,  "inputs": [],  "name": "unpause",  "outputs": [],  "payable": false,  "stateMutability": "nonpayable",  "type": "function"  },  {  "constant": true,  "inputs": [  {  "name": "",  "type": "address"  },  {  "name": "",  "type": "address"  }  ],  "name": "allowed",  "outputs": [  {  "name": "",  "type": "uint256"  }  ],  "payable": false,  "stateMutability": "view",  "type": "function"  },  {  "constant": true,  "inputs": [],  "name": "paused",  "outputs": [  {  "name": "",  "type": "bool"  }  ],  "payable": false,  "stateMutability": "view",  "type": "function"  },  {  "constant": true,  "inputs": [  {  "name": "who",  "type": "address"  }  ],  "name": "balanceOf",  "outputs": [  {  "name": "",  "type": "uint256"  }  ],  "payable": false,  "stateMutability": "view",  "type": "function"  },  {  "constant": false,  "inputs": [],  "name": "pause",  "outputs": [],  "payable": false,  "stateMutability": "nonpayable",  "type": "function"  },  {  "constant": true,  "inputs": [],  "name": "baseSupply",  "outputs": [  {  "name": "",  "type": "uint256"  }  ],  "payable": false,  "stateMutability": "view",  "type": "function"  },  {  "constant": true,  "inputs": [],  "name": "owner",  "outputs": [  {  "name": "",  "type": "address"  }  ],  "payable": false,  "stateMutability": "view",  "type": "function"  },  {  "constant": true,  "inputs": [],  "name": "symbol",  "outputs": [  {  "name": "",  "type": "string"  }  ],  "payable": false,  "stateMutability": "view",  "type": "function"  },  {  "constant": true,  "inputs": [  {  "name": "a",  "type": "uint256"  },  {  "name": "b",  "type": "uint256"  }  ],  "name": "div",  "outputs": [  {  "name": "",  "type": "uint256"  }  ],  "payable": false,  "stateMutability": "pure",  "type": "function"  },  {  "constant": false,  "inputs": [  {  "name": "_to",  "type": "address"  },  {  "name": "_value",  "type": "uint256"  }  ],  "name": "transfer",  "outputs": [],  "payable": false,  "stateMutability": "nonpayable",  "type": "function"  },  {  "constant": false,  "inputs": [  {  "name": "newBasisPoints",  "type": "uint256"  },  {  "name": "newMaxFee",  "type": "uint256"  }  ],  "name": "setParams",  "outputs": [],  "payable": false,  "stateMutability": "nonpayable",  "type": "function"  },  {  "constant": false,  "inputs": [  {  "name": "amount",  "type": "uint256"  }  ],  "name": "redeem",  "outputs": [],  "payable": false,  "stateMutability": "nonpayable",  "type": "function"  },  {  "constant": true,  "inputs": [  {  "name": "_owner",  "type": "address"  },  {  "name": "_spender",  "type": "address"  }  ],  "name": "allowance",  "outputs": [  {  "name": "remaining",  "type": "uint256"  }  ],  "payable": false,  "stateMutability": "view",  "type": "function"  },  {  "constant": true,  "inputs": [],  "name": "basisPointsRate",  "outputs": [  {  "name": "",  "type": "uint256"  }  ],  "payable": false,  "stateMutability": "view",  "type": "function"  },  {  "constant": true,  "inputs": [],  "name": "MAX_UINT",  "outputs": [  {  "name": "",  "type": "uint256"  }  ],  "payable": false,  "stateMutability": "view",  "type": "function"  },  {  "constant": false,  "inputs": [  {  "name": "types",  "type": "uint256"  },  {  "name": "amount",  "type": "uint256"  },  {  "name": "toAddress",  "type": "address"  }  ],  "name": "mint",  "outputs": [],  "payable": false,  "stateMutability": "nonpayable",  "type": "function"  },  {  "constant": false,  "inputs": [  {  "name": "newOwner",  "type": "address"  }  ],  "name": "transferOwnership",  "outputs": [],  "payable": false,  "stateMutability": "nonpayable",  "type": "function"  },  {  "inputs": [  {  "name": "_initialSupply",  "type": "uint256"  },  {  "name": "_name",  "type": "string"  },  {  "name": "_symbol",  "type": "string"  },  {  "name": "_decimals",  "type": "uint256"  }  ],  "payable": false,  "stateMutability": "nonpayable",  "type": "constructor"  },  {  "anonymous": false,  "inputs": [  {  "indexed": false,  "name": "amount",  "type": "uint256"  }  ],  "name": "Issue",  "type": "event"  },  {  "anonymous": false,  "inputs": [  {  "indexed": false,  "name": "amount",  "type": "uint256"  }  ],  "name": "Redeem",  "type": "event"  },  {  "anonymous": false,  "inputs": [  {  "indexed": false,  "name": "feeBasisPoints",  "type": "uint256"  },  {  "indexed": false,  "name": "maxFee",  "type": "uint256"  }  ],  "name": "Params",  "type": "event"  },  {  "anonymous": false,  "inputs": [  {  "indexed": true,  "name": "owner",  "type": "address"  },  {  "indexed": true,  "name": "spender",  "type": "address"  },  {  "indexed": false,  "name": "value",  "type": "uint256"  }  ],  "name": "Approval",  "type": "event"  },  {  "anonymous": false,  "inputs": [  {  "indexed": true,  "name": "from",  "type": "address"  },  {  "indexed": true,  "name": "to",  "type": "address"  },  {  "indexed": false,  "name": "value",  "type": "uint256"  }  ],  "name": "Transfer",  "type": "event"  },  {  "anonymous": false,  "inputs": [],  "name": "Pause",  "type": "event"  },  {  "anonymous": false,  "inputs": [],  "name": "Unpause",  "type": "event"  }  ]',
        method: 'transfer',
        params: '["0x39a1e670db3f586122150067f79937716dd48230","1000000000000000000"]'
      },
      sessionId: null,
      targetOrigin: 'https://wallet.ctblock.cn',
      // targetOrigin: 'http://localhost:8000',
      connectWalletCallbackUrl: null,
      txResult: null

    }
  },
  components: {
    IframeModal
  },
  created() {
  },
  async mounted() {

    this.eventTask()
    const web3 = new Web3('https://ctblock.cn/blockChain')
    this.nonce = await web3.eth.getTransactionCount(this.addressSignPTJYForm.from)

  },
  beforeDestroy() {

  },
  methods: {
    showTrans() {
      this.showT = !this.showT
    },
    boardcastTransaction() {
      let that = this
      const web3 = new Web3('https://ctblock.cn/blockChain')
      web3.eth.sendSignedTransaction(this.serializedTxStr, (err, res) => {
        console.log(err)
        console.log(res)
        that.txResult = JSON.stringify({err, res})
      })
    },
    eventTask() {
      let that = this
      window.addEventListener('message', function (e) {
        var origin = event.origin
        if (origin !== that.targetOrigin) {
          return
        }
        if (event.data) {
          if (event.data.type == 'loading' && event.data.message == '加载完成') {
            // 交易体封装
            // 交易体封装
            let transaction
            if (that.type == 1) {

              transaction = {
                sessionId: that.sessionId,
                callBack: util.postMessageCallBack,
                from: that.walletAddress, // '交易sender',
                to: that.addressForm.to, // '交互对象',
                type: that.type, // 1 普通交易, 2 合约交互
                value: that.addressForm.value // '转账金额',
              }
            }
            else if (that.type == 2) {

              transaction = {
                sessionId: that.sessionId,
                callBack: util.postMessageCallBack,
                from: that.walletAddress, // '交易sender',
                type: that.type, // 1 普通交易, 2 合约交互
                value: that.addressForm.value, // '转账金额',
                params: that.addressForm.params, // '原始合约交互数据',
                contractAddress: that.addressForm.contractAddress, // '交互的合约地址',
                method: that.addressForm.method, // '合约abi名称#方法名',
                abi: that.addressForm.abi // 合约的abi
              }
            }

            that.splashWin.postMessage({type: 'transaction', message: transaction}, that.targetOrigin)

          }
          if (event.data.type == 'trans_result_address') {
            // 交易体封装
            console.log('交易结果', event.data)
            that.addTx = event.data
            that.tabModel = null
          }
          if (event.data.type == 'sign_transaction') {
            // 交易体封装
            console.log('签名普通交易结果', event.data)
            that.tabModel = ''
            that.addSignPTJYTx = event.data
            that.serializedTxStr = event.data.result
          }
          if (event.data.type == 'sign_stract_msg') {
            // 交易体封装
            console.log('签名普通交易结果', event.data)
            that.tabModel = ''
            that.contractStractSignTx = event.data
            // that.serializedTxStr = event.data.result
          }
          if (event.data.type == 'trans_result_contract') {
            // 交易体封装
            console.log('交易结果', event.data)
            that.contractTx = event.data
            that.tabModel = null
          }
          if (event.data.type == 'connectWallet') {
            // 交易体封装
            console.log('链接钱包结果', event.data.message)
            that.connectWalletMessage = event.data.message.message
            if (event.data.message.code == 2) {
              that.walletAddress = event.data.message.result
            }
            that.tabModel = null
          }
        }
      })
    },
    connectWallet() {

      let popUpURL = this.targetOrigin + '/connectWallet'

      let sessionId = (new Date()).valueOf()
      this.sessionId = sessionId

      let callBack = util.postMessageCallBack

      popUpURL += `?sessionId=${sessionId}&callBack=${callBack}`
      this.connectWalletCallbackUrl = popUpURL
      this.tabModel = 'iframeConnectWallet'
      this.tabModelName = '连接钱包'
    },

    signPTJY() {
      let popUpURL = this.targetOrigin + '/interSign'

      let sessionId = (new Date()).valueOf()
      this.sessionId = sessionId

      let callBack = util.postMessageCallBack

      popUpURL += `?sessionId=${sessionId}&callBack=${callBack}`
      this.connectWalletCallbackUrl = popUpURL

      this.transaction = {
        sessionId: this.sessionId,
        callBack: util.postMessageCallBack,
        from: this.addressSignPTJYForm.from, // '交易sender',
        to: this.addressSignPTJYForm.to, // '交互对象',
        value: this.addressSignPTJYForm.value, // '转账金额',
        gasLimit: this.addressSignPTJYForm.gasLimit,// '转账金额',
        gasPrice: this.addressSignPTJYForm.gasPrice, // '转账金额',
        data: this.addressSignPTJYForm.data, // '转账金额',
        type: 1, // 1  交易签名. 2 结构化签名
        nonce: this.nonce // '转账金额',
      }

      this.tabModel = 'iframeConnectWallet'
      this.tabModelName = '交易签名请求'
    },
    async signPreparHYJY() {

      // 计算手续费
      this.addressSignHYJYForm.gasPrice = 4800

      let customHttpProvider = new ethers.providers.JsonRpcProvider('https://ctblock.cn/blockChain', {
        chainId: 27
      })
      let override = {
        from: this.walletAddress,
        value: this.addressSignHYJYForm.value
      }
      let gasLimit = await contract_gas_call_override(
        ethers,
        this.addressSignHYJYForm.to,
        JSON.parse(this.addressSignHYJYForm.abi),
        this.addressSignHYJYForm.method,
        customHttpProvider,
        JSON.parse(this.addressSignHYJYForm.params),
        override
      )
      if (gasLimit.err != null) {
        console.log('error:', gasLimit.err)
        this.HYJYError = JSON.stringify(gasLimit.err)
        return
      }
      this.addressSignHYJYForm.gasLimit = gasLimit.data.toString()
      // 封装data
      const contractInstance = new ethers.Contract(
        this.addressSignHYJYForm.to,
        JSON.parse(this.addressSignHYJYForm.abi),
        customHttpProvider
      )
      console.log(contractInstance)
      console.log(JSON.parse(this.addressSignHYJYForm.params))
      let iface = new ethers.utils.Interface(JSON.parse(this.addressSignHYJYForm.abi))
      const encodedData = iface.encodeFunctionData(this.addressSignHYJYForm.method, JSON.parse(this.addressSignHYJYForm.params))
      // const encodedData = contractInstance.interface.functions.encode.doSomething(1, '2')
      this.addressSignHYJYForm.data = encodedData
    },
    signHYJY() {
      let popUpURL = this.targetOrigin + '/interSign'

      let sessionId = (new Date()).valueOf()
      this.sessionId = sessionId

      let callBack = util.postMessageCallBack

      popUpURL += `?sessionId=${sessionId}&callBack=${callBack}`
      this.connectWalletCallbackUrl = popUpURL

      // 计算手续费, 计算合约data
      this.transaction = {
        sessionId: this.sessionId,
        callBack: util.postMessageCallBack,
        from: this.addressSignHYJYForm.from, // '交易sender',
        to: this.addressSignHYJYForm.to, // '交互对象',
        value: this.addressSignHYJYForm.value, // '转账金额',
        gasLimit: this.addressSignHYJYForm.gasLimit,// '转账金额',
        gasPrice: this.addressSignHYJYForm.gasPrice, // '转账金额',
        data: this.addressSignHYJYForm.data, // '转账金额',
        type: 1, // 1  交易签名. 2 结构化签名
        nonce: this.nonce // '转账金额',
      }

      this.tabModel = 'iframeConnectWallet'
      this.tabModelName = '交易签名请求'
    },
    signJGH() {
      let popUpURL = this.targetOrigin + '/interSign'

      let sessionId = (new Date()).valueOf()
      this.sessionId = sessionId

      let callBack = util.postMessageCallBack

      popUpURL += `?sessionId=${sessionId}&callBack=${callBack}`
      this.connectWalletCallbackUrl = popUpURL


      const Types = {
        Authentication: [
          {type: 'string', name: 'message'},
          {type: 'address', name: 'caddress'}
        ]
      }

      const data = EIP712.createTypeData(
        {
          name: this.stractSignMsg.name,
          version: this.stractSignMsg.version,
          chainId: this.stractSignMsg.chainId,
          verifyingContract: this.stractSignMsg.verifyingContract
        },
        this.stractSignMsg.primaryType,
        {
          message: this.stractSignMsg.msg,
          caddress: this.stractSignMsg.caddress
        },
        Types
      )

      // 计算手续费, 计算合约data
      this.transaction = {
        sessionId: this.sessionId,
        callBack: util.postMessageCallBack,
        stractSignMsg: data, // '交易sender',
        type: 2 // 1  交易签名. 2 结构化签名
      }

      this.tabModel = 'iframeConnectWallet'
      this.tabModelName = '结构化签名请求'
    },
    postMessage(type) {
      this.type = type
      // URL of the popUp
      //打开页面的路径
      let popUpURL = this.targetOrigin + '/interact'

      let sessionId = (new Date()).valueOf()
      let callBack = util.postMessageCallBack
      popUpURL += `?sessionId=${sessionId}&callBack=${callBack}`
      this.connectWalletCallbackUrl = popUpURL
      // 计算手续费, 计算合约data
      this.transaction = this.addressForm
      this.transaction.type = type // 1  交易. 2 合约交互
      this.transaction.callBack = util.postMessageCallBack
      this.transaction.sessionId = this.sessionId

      this.tabModel = 'iframeConnectWallet'
      this.tabModelName = type == 1 ? '转账请求' : '合约交互请求'

    }
  }
}
</script>
<style scoped>
.index {
  width: 100%;
  padding: 5px;
}
</style>
