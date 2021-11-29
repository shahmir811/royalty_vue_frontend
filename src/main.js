import Vue from 'vue';
import App from './App.vue';

import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';

import router from './routes/router';

Vue.config.productionTip = false;

// import './bootstrap.js';
import './styles/styles.scss';

Vue.use(BootstrapVue);
Vue.use(IconsPlugin);

// new Vue({
// 	render: h => h(App),
// }).$mount('#app');
new Vue({
	el: '#app',
	router,

	render: h => h(App),
});
