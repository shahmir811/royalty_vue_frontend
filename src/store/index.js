import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

import state from './state';
import * as getters from './getters';
import * as mutations from './mutations';
import * as actions from './actions';

import auth from './modules/auth';
import user from './modules/user';
import location from './modules/location';
import credit from './modules/credit';
import customer from './modules/customer';
import charts from './modules/charts';
import inventory from './modules/inventory';
import tax from './modules/tax';
import purchase from './modules/purchase';
import category from './modules/category';
import items from './modules/items';
import sales from './modules/sales';

export default new Vuex.Store({
	state,
	getters,
	mutations,
	actions,
	modules: {
		auth,
		user,
		location,
		credit,
		customer,
		category,
		charts,
		tax,
		purchase,
		invt: inventory,
		items,
		sales,
	},
});
