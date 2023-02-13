import Vue from "vue";
Vue.component('vue-picture-swipe', VuePictureSwipe);
import VuePictureSwipe from '@itadori/vue-picture-swipe-control';


//import App from './App.vue'
import app from "./components/app.vue";

import vuetify from "./plugins/vuetify";
import VueZoomer from "vue-zoomer";


Vue.config.productionTip = false;
Vue.use(VueZoomer);

new Vue({
  vuetify,
  render: (h) => h(app),
}).$mount("#app");
