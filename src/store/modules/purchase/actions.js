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

/////////////////////// Show Purchase Details ///////////////////////
export const getPurchaseDetails = async ({ commit, dispatch }, id) => {
	commit('startPageLoad');
	commit('clearErrors');

	const url = (await getURL()) + 'show-purchase/' + id;

	return new Promise((resolve, reject) => {
		axios
			.get(url)
			.then(response => {
				commit('setSelectedPurchase', response.data.data.purchase);
				commit('endPageLoad');
				resolve();
			})
			.catch(error => {
				console.log(error);
				commit('endPageLoad');
				checkAndRedirect(error.response.status, dispatch);
				reject();
			});
	});
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

/////////////////////// Remove inventory item from purchase ///////////////////////
export const removedPurchasedItemRecord = async ({ commit, dispatch }, id) => {
	commit('setLoading', true);

	try {
		const url = (await getURL()) + 'remove-purchased-item/' + id;

		await axios.delete(`${url}`);

		commit('removeItem', id);

		dispatch(
			'flashMessage',
			{
				message: 'Purchased item has been removed',
				type: 'success',
			},
			{ root: true }
		);

		commit('setLoading', false);
	} catch (error) {
		console.log(error);
		checkAndRedirect(error.response.status, dispatch);
		commit('setLoading', false);
	}
};

/////////////////////// Change purchase status ///////////////////////
export const changePurchaseStatusOnServer = async (
	{ commit, dispatch },
	id
) => {
	commit('setLoading', true);

	try {
		const url = (await getURL()) + 'change-purchase-status/' + id;

		await axios.get(`${url}`);
		commit('changePurchaseStatus', id);

		commit('setLoading', false);
	} catch (error) {
		console.log(error);
		checkAndRedirect(error.response.status, dispatch);
		commit('setLoading', false);
	}
};

/////////////////////// Remove purchase Order ///////////////////////
export const removePurchaseOrder = async ({ commit, dispatch }, id) => {
	commit('setLoading', true);

	try {
		const url = (await getURL()) + 'remove-purchase-record/' + id;

		await axios.get(`${url}`);
		commit('removePurchase', id);

		commit('setLoading', false);
	} catch (error) {
		console.log(error);
		checkAndRedirect(error.response.status, dispatch);
		commit('setLoading', false);
	}
};

/////////////////////// print Purchase Details on server ///////////////////////
export const printPurchaseDetailsOnServer = async ({ commit }, id) => {
	commit('clearErrors');

	const url = (await getURL()) + 'print-purchase-details/' + id;

	axios
		.get(url, { responseType: 'arraybuffer' })
		.then(response => {
			let blob = new Blob([response.data], { type: 'application/pdf' });
			let link = document.createElement('a');
			link.href = window.URL.createObjectURL(blob);
			link.download = 'purchase_details.pdf';
			link.click();
		})
		.catch(error => {
			console.log(error);
		});
};

/////////////////////// clear Auth State and redirect ///////////////////////
const checkAndRedirect = (status, dispatch) => {
	if (status === 401) {
		dispatch('auth/clearAuth', '', { root: true });
	}
};
