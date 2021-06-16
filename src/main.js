import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router'
import VueSocketIOExt from 'vue-socket.io-extended';
import { io } from 'socket.io-client';

const socket = io('http://localhost:5000');

Vue.config.productionTip = false

Vue.use(VueSocketIOExt, socket);

new Vue({
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')
