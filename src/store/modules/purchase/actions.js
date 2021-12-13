import axios from '../../BaseUrl';
import router from '../../../routes/router';
import { getURL } from '../../../helpers/index';

/////////////////////// Fetch all purchases ///////////////////////

export const fetchPurchases = async ({ commit, dispatch }) => {
	commit('startPageLoad');

	const url = (await getURL()) + 'purchase-list';

	try {
		const response = await axios.get(url);

		commit('setPurchaseList', response.data.data.purchases);

		commit('endPageLoad');
	} catch (error) {
		console.log(error);
		checkAndRedirect(error.response.status, dispatch);
		commit('endPageLoad');
	}
};

/////////////////////// add new purchase item ///////////////////////

export const addNewPurchase = async ({ commit, dispatch }, data) => {
	commit('setLoading', true);
	commit('clearErrors');

	try {
		const url = (await getURL()) + 'add-purchase';

		await axios.post(url, data);

		dispatch(
			'flashMessage',
			{
				message: 'New purchase added successfully',
				type: 'success',
			},
			{ root: true }
		);

		commit('setLoading', false);

		router.push('/purchase');
	} catch (error) {
		console.log(error);
		commit('setError', error.response.data.errors);
		checkAndRedirect(error.response.status, dispatch);
		commit('setLoading', false);
	}
};

/////////////////////// Update Purchase Details ///////////////////////
export const updatePurchaseDetails = async ({ commit, dispatch }, data) => {
	commit('setLoading', true);
	commit('clearErrors');

	try {
		const url = (await getURL()) + 'update-purchase';

		await axios.post(`${url}/${data.id}`, data);

		dispatch(
			'flashMessage',
			{
				message: 'Purchase details have been updated successfully',
				type: 'success',
			},
			{ root: true }
		);

		commit('setLoading', false);

		router.push('/purchase');
	} catch (error) {
		console.log(error);
		commit('setError', error.response.data.errors);
		checkAndRedirect(error.response.status, dispatch);
		commit('setLoading', false);
	}
};

/////////////////////// clear Auth State and redirect ///////////////////////
const checkAndRedirect = (status, dispatch) => {
	if (status === 401) {
		console.log('Check and redirect function');
		router.push('/login');

		dispatch('auth/clearAuth', '', { root: true });
	}
};
