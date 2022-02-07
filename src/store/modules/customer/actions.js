import axios from '../../BaseUrl';
import router from '../../../routes/router';
import { getURL } from '../../../helpers/index';

/////////////////////// Fetch all customers ///////////////////////

export const fetchCustomers = async ({ commit, dispatch }) => {
	commit('startPageLoad');

	const url = (await getURL()) + 'customers';

	try {
		const response = await axios.get(url);

		commit('setCustomersList', response.data.data.customers);

		commit('endPageLoad');
	} catch (error) {
		console.log(error);
		checkAndRedirect(error.response.status, dispatch);
		commit('endPageLoad');
	}
};

/////////////////////// add new customer ///////////////////////

export const addNewCustomer = async ({ commit, dispatch }, data) => {
	commit('setLoading', true);
	commit('clearErrors');

	try {
		const url = (await getURL()) + 'add-customer';

		await axios.post(url, data);

		dispatch(
			'flashMessage',
			{
				message: 'New customer added successfully',
				type: 'success',
			},
			{ root: true }
		);

		commit('setLoading', false);

		router.push('/customers');
	} catch (error) {
		console.log(error);
		commit('setError', error.response.data.errors);
		checkAndRedirect(error.response.status, dispatch);
		commit('setLoading', false);
	}
};

/////////////////////// Update customers ///////////////////////
export const updateCustomerDetails = async ({ commit, dispatch }, data) => {
	commit('setLoading', true);
	commit('clearErrors');

	try {
		const url = (await getURL()) + 'update-customer';

		await axios.post(`${url}/${data.id}`, data);

		dispatch(
			'flashMessage',
			{
				message: 'Customer details updated successfully',
				type: 'success',
			},
			{ root: true }
		);

		commit('setLoading', false);

		router.push('/customers');
	} catch (error) {
		console.log(error);
		commit('setError', error.response.data.errors);
		checkAndRedirect(error.response.status, dispatch);
		commit('setLoading', false);
	}
};

/////////////////////// Fetch All Customers From Update Customer page ///////////////////////
export const fetchCustomersFromUpdateCustomerPage = async ({
	commit,
	dispatch,
}) => {
	commit('setLoading', true);

	const url = (await getURL()) + 'customers';

	return new Promise((resolve, reject) => {
		axios
			.get(url)
			.then(response => {
				commit('setCustomersList', response.data.data.customers);
				commit('setLoading', false);
				resolve();
			})
			.catch(error => {
				console.log(error);
				commit('setLoading', false);
				checkAndRedirect(error.response.status, dispatch);
				reject();
			});
	});
};

/////////////////////// Select specific customer ///////////////////////
export const selectCustomerToUpdate = ({ commit }, id) => {
	commit('clearErrors');
	commit('getCustomerToUpdate', id);
};

/////////////////////// Select specific customer ///////////////////////
export const clearValidationErrors = ({ commit }) => {
	commit('clearErrors');
};

/////////////////////// change customer status ///////////////////////

export const changeCustomerStatus = async (
	{ commit, dispatch },
	customerId
) => {
	const url = (await getURL()) + 'change-customer-status';

	return new Promise((resolve, reject) => {
		axios
			.get(`${url}/${customerId}`)
			.then(() => {
				commit('changeCustomerStatus', customerId);
				resolve();
			})
			.catch(error => {
				console.log(error);
				checkAndRedirect(error.response.status, dispatch);
				reject();
			});
	});
};

/////////////////////// Show Customer Details ///////////////////////

export const showCustomerDetails = async ({ commit, dispatch }, customerId) => {
	commit('startPageLoad');

	const url = (await getURL()) + 'show-customer/' + customerId;

	return new Promise((resolve, reject) => {
		axios
			.get(`${url}`)
			.then(response => {
				commit('setCustomerDetails', response.data.data);
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

/////////////////////// clear Auth State and redirect ///////////////////////
const checkAndRedirect = (status, dispatch) => {
	if (status === 401) {
		dispatch('auth/clearAuth', '', { root: true });
	}
};
