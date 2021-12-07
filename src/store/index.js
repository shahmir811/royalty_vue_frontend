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
import customer from './modules/customer';
import inventory from './modules/inventory';
import tax from './modules/tax';

export default new Vuex.Store({
	state,
	getters,
	mutations,
	actions,
	modules: {
		auth,
		user,
		location,
		customer,
		tax,
		invt: inventory,
	},
});
