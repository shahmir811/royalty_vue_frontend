import axios from '../../BaseUrl';
import router from '../../../routes/router';
import { getURL } from '../../../helpers/index';

/////////////////////// Fetch all purchases ///////////////////////

export const fetchSalesList = async ({ commit, dispatch }) => {
	commit('startPageLoad');

	const url = (await getURL()) + 'sales-list';

	try {
		const response = await axios.get(url);

		commit('setSalesList', response.data.data.sales);

		commit('endPageLoad');
	} catch (error) {
		console.log(error);
		checkAndRedirect(error.response.status, dispatch);
		commit('endPageLoad');
	}
};

/////////////////////// add new sales record ///////////////////////

export const addNewSaleData = async ({ commit, dispatch }, data) => {
	commit('setLoading', true);
	commit('clearErrors');

	try {
		const url = (await getURL()) + 'add-sale';

		await axios.post(url, data);

		dispatch(
			'flashMessage',
			{
				message: 'New sale data has been added successfully',
				type: 'success',
			},
			{ root: true }
		);

		commit('setLoading', false);

		router.push('/sales');
	} catch (error) {
		console.log(error);
		commit('setError', error.response.data.errors);
		checkAndRedirect(error.response.status, dispatch);
		commit('setLoading', false);
	}
};

/////////////////////// Show Sale Details ///////////////////////
export const getSaleDetails = async ({ commit, dispatch }, id) => {
	commit('startPageLoad');
	commit('clearErrors');

	const url = (await getURL()) + 'show-sale-details/' + id;

	return new Promise((resolve, reject) => {
		axios
			.get(url)
			.then(response => {
				commit('setSelectedSale', response.data.data.sale);
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

/////////////////////// Update Sale Data ///////////////////////
export const updateSaleRecordOnServer = async ({ commit, dispatch }, data) => {
	commit('setLoading', true);
	commit('clearErrors');

	const url = (await getURL()) + 'update-sale-data/' + data.id;

	return new Promise((resolve, reject) => {
		axios
			.post(url, data)
			.then(response => {
				commit('updateSelectedSaleData', response.data.data.sale);
				commit('setLoading', false);
				dispatch(
					'flashMessage',
					{
						message: 'Sale data has been updated',
						type: 'success',
					},
					{ root: true }
				);
				resolve();
			})
			.catch(error => {
				console.log(error);
				commit('setError', error.response.data.errors);
				checkAndRedirect(error.response.status, dispatch);
				commit('setLoading', false);
				reject();
			});
	});
};

/////////////////////// Get All Sales Statuses ///////////////////////
export const getAllSalesStatusFromServer = async ({ commit, dispatch }) => {
	const url = (await getURL()) + 'all-sales-statuses';

	try {
		const response = await axios.get(url);

		commit('setSalesStatuses', response.data.data.statuses);
	} catch (error) {
		console.log(error);
		checkAndRedirect(error.response.status, dispatch);
	}
};

/////////////////////// Get Latest Invoice Number ///////////////////////
export const getLatestInvoiceNumberFromServer = async ({ commit }) => {
	commit('setFetchInvoiceNumber', true);

	const url = (await getURL()) + 'get-latest-sale-invoice';

	return new Promise((resolve, reject) => {
		axios
			.get(url)
			.then(response => {
				commit('setLatestInvoiceNo', response.data.data.invoice_no);
				commit('setFetchInvoiceNumber', false);
				resolve();
			})
			.catch(error => {
				console.log(error);
				commit('setFetchInvoiceNumber', false);
				reject();
			});
	});
};

/////////////////////// clear Auth State and redirect ///////////////////////
const checkAndRedirect = (status, dispatch) => {
	if (status === 401) {
		dispatch('auth/clearAuth', '', { root: true });
	}
};
