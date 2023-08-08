// Copyright (C) 2021 CTChain Network Technologies Limited
// Use of this source code is governed by a GNU GPL-style license
// that can be found in the LICENSE.md file. All rights reserved.

import ElementPlus from 'element-plus'
import 'element-plus/theme-chalk/index.css'
/*global process*/
import {createApp} from 'vue'
import App from './App.vue'
import router from './router'

const init = async () => {

  createApp(App)
    .use(router)
    .use(ElementPlus)
    .mount('#app')

}

init()
