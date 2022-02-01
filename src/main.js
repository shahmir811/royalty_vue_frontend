import Vue from 'vue';
import localForage from 'localforage';
import VueSweetalert2 from 'vue-sweetalert2';
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';

import App from './App.vue';
import router from './routes/router';
import store from './store';

Vue.config.productionTip = false;

import './styles/styles.scss';
import 'sweetalert2/dist/sweetalert2.min.css';
import 'devextreme/dist/css/dx.light.css';
import 'vue2-daterange-picker/dist/vue2-daterange-picker.css';

localForage.config({
	driver: localForage.LOCALSTORAGE,
	storeName: 'Royalty',
});

Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
Vue.use(VueSweetalert2);

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
