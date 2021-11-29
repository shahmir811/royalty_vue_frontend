import Vue from 'vue';
import App from './App.vue';
import localForage from 'localforage';

import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';

import router from './routes/router';
import store from './store';

Vue.config.productionTip = false;

import './styles/styles.scss';

localForage.config({
	driver: localForage.LOCALSTORAGE,
	storeName: 'Royalty',
});

Vue.use(BootstrapVue);
Vue.use(IconsPlugin);

// Following code is used for persistent login
localForage.getItem('authtoken', (err, token) => {
	store.dispatch('auth/attempt', token).then(() => {
		new Vue({
			el: '#app',
			router,
			store,
			render: h => h(App),
		});
	});
});
