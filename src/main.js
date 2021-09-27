import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import Vuetify from 'vuetify'

Vue.use(VueAxios, axios);
Vue.use(Vuetify)

Vue.config.productionTip = false;

new Vue({
    axios,
    vuetify: new Vuetify(),
    render: (h) => h(App)
}).$mount("#app");